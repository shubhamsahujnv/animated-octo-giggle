---
platform: Hashnode
post_id: H3
week: 4
title: "The strangler fig in practice: routing traffic off a monolith without a rewrite"
slug: strangler-fig-routing-traffic-off-monolith
subtitle: "The pattern is well known. The routing layer, the data problem and the exit criteria are where it actually goes wrong."
tags: [architecture, legacy, microservices, refactoring, devops]
target_keyword: "legacy modernization" (SD 35, 1000/mo) / "legacy modernization services" (SD 30, CPC $66.74)
canonical: NONE — original post
outbound_links:
  - url: https://pixoramagroup.com/blog/legacy-modernization-refactor-rebuild-replace
    anchor: "refactor, rebuild or replace"
    type: exact-adjacent
  - url: https://pixoramagroup.com/blog/legacy-application-modernization
    anchor: "the modernization options laid out"
    type: descriptive
external_links:
  - martinfowler.com — StranglerFigApplication
cross_link: M3
---

# The strangler fig in practice: routing traffic off a monolith without a rewrite

Everyone knows the strangler fig pattern. Put a facade in front of the legacy
system, route one capability at a time to new code, repeat until the old thing
has no traffic, delete it.

The pattern is right. What nobody tells you is that roughly 70% of the work is
in three things the diagram does not show: where the routing decision lives, what
happens to the data, and how you decide you are finished. Get those wrong and
you end up in the failure mode that is genuinely worse than not starting — a
permanent two-system estate where every feature has to be built twice.

I have been through this four times. Here is what the diagram leaves out.

## The routing layer is a product, not a config file

The naive version: nginx with a growing list of path rules.

```nginx
# This works for about three months.
location /api/invoices { proxy_pass http://new-invoices; }
location /api/customers { proxy_pass http://legacy; }
location /api/orders    { proxy_pass http://legacy; }
```

It breaks the first time a migration is not clean along a path boundary — which
is the first time, because legacy systems are not organised by URL. You will
need to route on things like:

- **Tenant.** Migrate customer by customer, not endpoint by endpoint. Far lower
  risk, because a bug affects one tenant.
- **Percentage.** Ramp 1% → 5% → 25% → 100% on a single endpoint.
- **Request shape.** `GET /api/invoices` to the new service, `POST` still
  legacy, because reads are safe and writes are not.
- **A manual kill switch** that does not require a deploy.

That is four orthogonal dimensions, which means the routing decision is a
function, not a table:

```python
def route(request, flags):
    key = f"{request.method}:{request.route_pattern}"
    rule = flags.get(key)

    if rule is None or rule.disabled:
        return LEGACY

    if rule.tenant_allowlist and request.tenant_id in rule.tenant_allowlist:
        return NEW
    if rule.tenant_blocklist and request.tenant_id in rule.tenant_blocklist:
        return LEGACY

    # Stable per-tenant hash, so a tenant does not flap between
    # systems on consecutive requests. This matters enormously and
    # is the bug everyone ships first.
    if rule.percentage > 0:
        bucket = stable_hash(f"{key}:{request.tenant_id}") % 100
        if bucket < rule.percentage:
            return NEW

    return LEGACY
```

The stable hash is the detail I would underline. A naive `random() < 0.05`
means the same tenant hits the new service on one request and the legacy one on
the next. If the two have any state divergence at all — and they do — you get
intermittent, unreproducible bugs that cost a fortnight to diagnose.

Keep the flags in a store you can change without deploying, and make the kill
switch a single call that forces every rule to `LEGACY`. You will use it. The
first time you use it, the fact that it takes 20 seconds rather than a 40-minute
rollback deploy is the entire justification for building it.

## The data problem, which is the actual problem

Routing reads is easy. The hard question is what owns the data.

Three options, in increasing order of both difficulty and value:

### Option A: new service reads the legacy database

Fastest to ship. The new service is a read-model over the legacy schema.

```
[client] -> [router] -> [new-invoices] -> (reads) -> [legacy DB]
                     -> [legacy app]    -> (writes) -> [legacy DB]
```

Honest assessment: this is not modernization, it is a new UI. You have not
decoupled anything — the legacy schema is still the contract, and you cannot
delete the legacy system because it still owns writes. Useful as a first step to
build confidence. Dangerous if you stop here, because it *feels* like progress
and it is a dead end.

### Option B: dual write, legacy is source of truth

The new service writes to its own store and to the legacy one. Legacy stays
authoritative. Reads can come from either, and you compare them.

```python
def create_invoice(payload):
    legacy_result = legacy_client.create_invoice(payload)   # authoritative
    try:
        new_store.upsert(from_legacy(legacy_result))
    except Exception:
        # Never fail the request because the shadow write failed.
        metrics.increment("shadow_write.failure")
        log.exception("shadow write failed", invoice=legacy_result.id)
    return legacy_result
```

The point of this phase is not the writes — it is the **comparison**. Run the
new read path in shadow mode: serve the legacy answer, compute the new answer,
diff them, log the mismatches, serve nothing from the new path.

```python
def get_invoice(invoice_id):
    legacy = legacy_client.get_invoice(invoice_id)
    if flags.shadow_compare("get_invoice"):
        try:
            candidate = new_store.get(invoice_id)
            diff = compare(legacy, candidate, ignore=["updated_at"])
            if diff:
                metrics.increment("shadow.mismatch", tags=[f"fields:{len(diff)}"])
                log.warning("shadow mismatch", id=invoice_id, diff=diff)
        except Exception:
            metrics.increment("shadow.error")
    return legacy
```

Run this for weeks. The mismatch rate is your readiness metric, and it will be
appalling at first — in one case we started at 11% and spent five weeks getting
to 0.02%, and every one of those mismatches was a real behaviour in the legacy
system that nobody had documented. Rounding on partial refunds. A timezone
assumption in a date field. A status that could be `NULL` only for records
created before 2019.

**This is where the value of the whole exercise is.** The shadow comparison is
how you discover the actual specification. Skip it and you ship a new service
that is correct according to the requirements and wrong according to the
business.

### Option C: new service owns the data

Cut over writes. Legacy reads from the new service, or gets a feed, or is
decommissioned for that capability.

Only go here when the mismatch rate is near zero and stays there under a full
business cycle — which for most domains means a month-end, and for some means a
year-end.

## Exit criteria, decided in advance

Here is the failure mode that actually kills these programmes. Not technical
failure. Stalling.

You migrate the three easy capabilities, the ones with clean boundaries and low
risk. Momentum is great, the demo is impressive. Then you reach the capability
that touches everything — usually pricing, entitlements or whatever the
equivalent of "the billing engine" is in your domain. It is 40% of the monolith's
logic, it has no clean boundary, and the business case for migrating it is weak
because it works.

So it doesn't get migrated. And now you have two systems forever. Every feature
is built twice, every incident is diagnosed in two places, and the team that
owns the legacy system cannot be disbanded. The total cost of this steady state
is higher than either finishing or never starting.

Avoid it by writing down, before the first route is moved:

1. **The full capability inventory**, including the horrible one. If you cannot
   name an approach for the horrible one, you are not ready to start — you are
   planning to build a permanent hybrid and should decide that explicitly.
2. **A decommission date for the legacy system**, in the programme plan, with a
   named owner. Not "when migration completes". A date.
3. **A rule that the legacy system takes no new features** from day one.
   This is the one that gets violated, and every violation extends the
   endgame.
4. **The sequence ending with the hardest capability, not beginning with it** —
   but with the hardest one's approach designed first. Build confidence on easy
   wins, but design for the hard case, or your facade will not support it.

On point 4: if the horrible capability needs request-shape routing and
tenant-level data partitioning, build the facade with those from the start. A
routing layer designed for three clean path-based migrations will need to be
rebuilt for the fourth, and rebuilding the facade mid-programme is where
schedules die.

## When not to do this

Strangler fig is the right answer when the legacy system is large, works, and
carries business knowledge nobody has written down. It is the wrong answer when:

- **The system is small.** Under maybe 30k lines of comprehensible code, a
  rewrite with a shadow-compare period is cheaper than the facade.
- **You are replacing it with a commercial product.** Then the question is data
  migration and process change, not routing.
- **The business logic genuinely is obsolete.** If the requirements have changed
  such that you do not want the legacy behaviour, preserving it through careful
  shadow comparison is wasted effort. Rebuild.

That decision — whether this is a refactor, a rebuild or a replace — is upstream
of everything in this post, and getting it wrong means executing a pattern
beautifully in service of the wrong strategy. Pixorama's write-up on
[refactor, rebuild or replace](https://pixoramagroup.com/blog/legacy-modernization-refactor-rebuild-replace)
is a reasonable framework for making it, and they have
[the modernization options laid out](https://pixoramagroup.com/blog/legacy-application-modernization)
with the trade-offs for each.

Martin Fowler's
[original write-up of the pattern](https://martinfowler.com/bliki/StranglerFigApplication.html)
remains the clearest statement of why it works, and is short.

---

The summary I would give a team starting this on Monday: the pattern is not the
hard part, and the new services are not the hard part. Build the routing layer as
a real product with a kill switch and stable per-tenant hashing. Spend
disproportionate time in shadow comparison, because that is where you learn what
the system actually does. And write the decommission date down before you start,
because the only version of this that fails is the one that never ends.
