---
platform: Hashnode
post_id: H10
week: 10
title: "Multi-tenant data isolation for an early SaaS, and the migration you will regret"
slug: multi-tenant-data-isolation-early-saas
subtitle: "Shared schema with a tenant column is the right default. The part that matters is making it impossible to forget the WHERE clause."
tags: [saas, postgresql, architecture, security, backend]
target_keyword: "how to build saas product" (GSC pos 6.2) / supports staff augmentation cluster
canonical: NONE — original post
outbound_links:
  - url: https://pixoramagroup.com/blog/how-to-build-saas-product
    anchor: "how to build a SaaS product"
    type: exact-adjacent
  - url: https://pixoramagroup.com/blog/what-is-staff-augmentation
    anchor: "bringing in specialist capacity for a defined piece of work"
    type: natural-language
external_links:
  - PostgreSQL documentation — Row Security Policies
cross_link: M6
---

# Multi-tenant data isolation for an early SaaS, and the migration you will regret

There are three ways to isolate tenant data, everyone picks the simplest one,
and that is correct. The mistake is not the choice — it is implementing the
simplest one in a way that makes moving to the others impossible, and then
hitting the quarter where an enterprise prospect's security review requires it.

## The three models, honestly

**Shared schema, tenant column.** One database, one set of tables, every row
carries `tenant_id`. Cheapest to run, simplest to migrate, easiest to query
across tenants for analytics. Isolation is enforced entirely by application
correctness, which is the problem.

**Schema per tenant.** One database, one schema per tenant, identical tables.
Isolation is structural. Costs you migration complexity (N schemas to migrate,
transactionally, with partial-failure handling) and connection-pool pressure.
Breaks down somewhere between 200 and 1,000 tenants depending on your migration
tooling.

**Database per tenant.** Full isolation, per-tenant backup and restore,
per-tenant encryption keys, straightforward data residency. Operationally
heaviest by a wide margin, and the only model that satisfies the strictest
procurement requirements.

**Pick shared schema.** For almost any new SaaS, at any plausible early scale,
it is the right answer, and the people who tell you to start with
database-per-tenant are describing an operational burden that will consume the
runway you needed for product work.

The rest of this post is about implementing it so that the day you need
per-tenant databases for your three largest customers, you can do it.

## The failure that defines the problem

```python
# Shipped. Reviewed. Passed tests.
def get_invoices(user, status=None):
    q = "SELECT * FROM invoices WHERE tenant_id = %s"
    params = [user.tenant_id]
    if status:
        q += " AND status = %s"
        params.append(status)
    return db.query(q, params)


# Shipped three months later, by someone else, on a Friday.
def get_invoice_summary(user):
    return db.query(
        "SELECT status, COUNT(*), SUM(amount) FROM invoices GROUP BY status"
    )
```

That second function returns every tenant's financial data to whoever calls it.
It passes code review, because the reviewer is looking at a summary query and
nothing about it looks dangerous. It passes tests, because the test database has
one tenant.

This is not a hypothetical class of bug. It is *the* multi-tenancy bug, it is
reported in real products regularly, and the reason it keeps happening is that
correctness depends on a developer remembering something, on every query,
forever.

So do not depend on that.

## Enforce isolation below the application

PostgreSQL row-level security moves the `WHERE` clause from the application into
the database. The query above returns zero rows instead of everyone's.

```sql
-- Every tenant-scoped table gets this treatment.
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices FORCE ROW LEVEL SECURITY;   -- applies to table owner too

CREATE POLICY tenant_isolation ON invoices
  USING      (tenant_id = current_setting('app.tenant_id', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.tenant_id', true)::uuid);
```

Two details that matter:

**`FORCE ROW LEVEL SECURITY`.** Without it, the table owner bypasses the policy.
Your application frequently connects as the owner, which would make the whole
thing decorative.

**`WITH CHECK` as well as `USING`.** `USING` filters reads; `WITH CHECK`
constrains writes. Without the second one, a tenant can insert rows belonging to
another tenant — a less obvious but equally real hole.

Then set the tenant once per request, in one place:

```python
from contextlib import contextmanager

@contextmanager
def tenant_scope(conn, tenant_id):
    """set_config(..., true) makes it transaction-local, so it cannot
    leak to the next request that borrows this pooled connection.
    Getting this wrong is worse than having no RLS at all."""
    with conn.cursor() as cur:
        cur.execute("SELECT set_config('app.tenant_id', %s, true)", (str(tenant_id),))
    try:
        yield conn
    finally:
        pass   # transaction end clears it
```

The `true` third argument is load-bearing. `set_config(..., false)` is
session-scoped, and with a connection pool that means request N+1 inherits
request N's tenant. That is a worse bug than the one you were preventing,
because it is intermittent and load-dependent.

Wire it into the request lifecycle so no handler can skip it:

```python
@app.middleware("http")
async def scope_to_tenant(request, call_next):
    tenant_id = resolve_tenant(request)          # from JWT claim, not a header
    if tenant_id is None:
        return JSONResponse({"error": "no tenant"}, status_code=403)
    async with db.transaction() as conn:
        async with tenant_scope(conn, tenant_id):
            request.state.db = conn
            return await call_next(request)
```

`resolve_tenant` reads a signed token claim. Never a request header or a URL
path segment the client controls — that converts your isolation boundary into a
parameter the attacker supplies.

## The escape hatch, and how to make it loud

You will need cross-tenant queries: platform analytics, support tooling,
billing reconciliation. The temptation is a connection that bypasses RLS,
used "carefully".

Make it a separate role, a separate pool, and audited:

```sql
CREATE ROLE platform_admin BYPASSRLS;

-- Application role, which cannot bypass, is what 99% of traffic uses.
CREATE ROLE app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
```

```python
# Deliberately awkward to call. The awkwardness is the feature.
@requires_role("platform_admin")
@audited(reason_required=True)
def cross_tenant_query(sql, params, *, reason: str):
    log.warning("cross-tenant query", sql=sql, reason=reason, actor=current_actor())
    with admin_pool.connection() as conn:
        return conn.execute(sql, params)
```

If a developer can reach cross-tenant data by picking a different connection
from the same pool, they will, under deadline, and it will not be noticed in
review. If it requires a decorator, a role, and a written reason that lands in
an audit log, it gets used for the four legitimate cases and nothing else.

## Testing isolation, which is the part that gets skipped

One test, parameterised over every tenant-scoped table, that fails if a table
is missing its policy:

```python
TENANT_SCOPED_TABLES = discover_tables_with_column("tenant_id")

@pytest.mark.parametrize("table", TENANT_SCOPED_TABLES)
def test_rls_enabled(db, table):
    row = db.query_one("""
        SELECT relrowsecurity, relforcerowsecurity
        FROM pg_class WHERE relname = %s
    """, (table,))
    assert row.relrowsecurity, f"{table} has tenant_id but RLS is OFF"
    assert row.relforcerowsecurity, f"{table} does not FORCE RLS"


@pytest.mark.parametrize("table", TENANT_SCOPED_TABLES)
def test_cannot_read_other_tenant(db, table, two_tenants):
    a, b = two_tenants
    seed_row(table, tenant_id=b)
    with tenant_scope(db, a):
        rows = db.query(f"SELECT * FROM {table}")
        assert all(r.tenant_id == a for r in rows)
```

Discovering the table list from the schema rather than hardcoding it is the
whole point: the test fails when someone adds a new table with a `tenant_id` and
forgets the policy, which is exactly the moment you want to find out.

Also: **make your test and dev databases multi-tenant by default.** Seed two
tenants, always. The single-tenant dev database is why the summary-query bug
survives to production.

## Keeping the door open to per-tenant databases

The migration you will eventually be asked for: move tenant 7 to its own
database, because they signed a contract that requires it.

Three things, done now, make that a week instead of a quarter:

**1. Resolve tenants to a connection, not to a constant.**

```python
# Even while every tenant is on the same database, route through
# a lookup. Today it returns the same DSN for everyone. The day it
# doesn't, nothing above this layer changes.
class TenantRouter:
    def dsn_for(self, tenant_id):
        placement = self.placements.get(tenant_id)
        return placement.dsn if placement else self.default_dsn
```

This is maybe thirty lines and it is the difference between a configuration
change and a refactor of every call site.

**2. Keep `tenant_id` on every row even when it becomes redundant.** In a
per-tenant database it is technically unnecessary. Keep it anyway: it makes the
extraction a straightforward filtered copy, it keeps the schema identical across
placements, and it means the RLS policies still work and still protect you if a
tenant is ever consolidated back.

**3. Never let a foreign key cross tenants.** Enforce it:

```sql
-- Composite FKs including tenant_id make cross-tenant references
-- structurally impossible, and make per-tenant extraction a clean cut.
ALTER TABLE invoice_lines
  ADD CONSTRAINT fk_invoice
  FOREIGN KEY (tenant_id, invoice_id)
  REFERENCES invoices (tenant_id, id);
```

A single-column FK to `invoices(id)` permits a row in tenant A to reference a
row in tenant B. It will happen through a bug, and it will be the thing that
makes extraction impossible — you cannot cleanly separate a graph that has edges
across the cut.

That composite-key discipline is the single highest-value decision in this post.
It costs a wider index. It buys you the ability to ever change isolation model.

## The summary

Shared schema with `tenant_id`. RLS with `FORCE` and `WITH CHECK`.
Transaction-local `set_config`. Tenant from a token claim, set in middleware.
A deliberately awkward audited escape hatch. Schema-discovered isolation tests.
Composite foreign keys including `tenant_id`. A tenant-to-connection router that
does nothing yet.

That is a day or two of work at the start of a project and it removes the entire
category of cross-tenant data exposure, while keeping every future isolation
model available.

Pixorama's guide on
[how to build a SaaS product](https://pixoramagroup.com/blog/how-to-build-saas-product)
covers the surrounding decisions — stages, stack, costs, timelines — and this
isolation work sits inside its architecture phase. If the security-review
deadline arrives before your team has the Postgres depth for the RLS and
extraction work, that is a well-defined, time-boxed piece of specialist work,
which is the one case where
[bringing in specialist capacity for a defined piece of work](https://pixoramagroup.com/blog/what-is-staff-augmentation)
tends to beat hiring — you need it intensely for six weeks and then not at all.

The PostgreSQL
[row security policies documentation](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
is short and worth reading end to end before you rely on it, particularly the
section on how policies combine, which is not intuitive when you have more than
one.
