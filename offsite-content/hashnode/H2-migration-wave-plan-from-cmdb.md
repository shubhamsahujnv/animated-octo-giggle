---
platform: Hashnode
post_id: H2
week: 2
title: "Generating a migration wave plan from your CMDB instead of a spreadsheet"
slug: migration-wave-plan-from-cmdb-dependency-graph
subtitle: "Wave planning is a graph problem. Treating it as a spreadsheet problem is why wave three always slips."
tags: [cloud, python, devops, architecture, migration, graph]
target_keyword: "on premise to cloud migration strategy" (SD 30, CPC $34.55)
canonical: NONE — original post
outbound_links:
  - url: https://pixoramagroup.com/blog/cloud-migration-strategy-on-premise-to-cloud
    anchor: "wave planning in context"
    type: partial-match
  - url: https://pixoramagroup.com/blog/legacy-application-modernization
    anchor: "legacy application modernization"
    type: exact-adjacent
external_links:
  - AWS Prescriptive Guidance — portfolio assessment
cross_link: S2
---

# Generating a migration wave plan from your CMDB instead of a spreadsheet

Every migration programme produces a wave plan in a spreadsheet. Wave 1, wave 2,
wave 3, with applications assigned to each and a date on top. And every
migration programme discovers somewhere around wave 3 that an application in
wave 5 is a synchronous dependency of an application in wave 2, so either wave 2
is not done or wave 5 just moved.

This is not a diligence failure. It is a representation failure. Dependencies
form a directed graph, and a spreadsheet cannot hold a graph — it can only hold
one flattening of it, chosen before you knew which flattening was feasible.

So: build the graph, compute the waves, regenerate when the graph changes.

## What you need from the CMDB

Less than you think. Three things:

```
applications:  id, name, criticality, owner, data_classification
dependencies:  source_app, target_app, kind (sync | async | batch | data)
constraints:   app_id, kind (freeze_window | licence | compliance | hardware_eol), detail
```

Your CMDB is wrong, by the way. Everyone's is. Expect 20-40% of dependencies to
be missing. The graph is still worth building, because a graph with known gaps
beats a spreadsheet with unknown ones — and the graph tells you *where* to spend
your discovery budget, which is the part that actually reduces risk.

Supplement from flow logs, which do not lie about what talks to what:

```python
# Netflow/VPC-flow-derived edges, intersected with CMDB-declared edges.
# The interesting set is the difference, not the union.
declared = set(cmdb_edges)
observed  = set(flow_edges)

undeclared = observed - declared   # these are your real risk
stale       = declared - observed  # these may be decommissioned, verify
```

Run that before you plan anything. The `undeclared` set is where wave 3 breaks.

## Dependency kinds are not equal

The single most useful modelling decision: edge weight by coupling type, because
they constrain the plan differently.

- **`sync`** — A calls B and waits. If they are separated across the WAN, A's
  latency budget absorbs the round trip. These must move together or you must
  accept the latency. Hard constraint.
- **`async`** — A queues to B. Tolerates separation well, as long as the queue
  is reachable from both sides. Soft constraint.
- **`batch`** — A reads B's extract nightly. Tolerates separation for a whole
  day. Nearly free.
- **`data`** — A and B share a database. These are not two applications for
  migration purposes; they are one unit. Collapse them.

Collapse `data` edges first. It usually shrinks the node count by 15-25% and
removes most of the apparent cycles.

```python
import networkx as nx

def build_graph(apps, deps):
    g = nx.DiGraph()
    for a in apps:
        g.add_node(a["id"], **a)
    for d in deps:
        g.add_edge(d["source_app"], d["target_app"], kind=d["kind"])
    return g

def collapse_shared_data(g):
    """Apps sharing a database migrate as one unit. Merge them into a
    single node so the wave algorithm cannot split them."""
    data_graph = nx.Graph()
    data_graph.add_nodes_from(g.nodes)
    data_graph.add_edges_from(
        (u, v) for u, v, k in g.edges(data="kind") if k == "data"
    )
    for group in nx.connected_components(data_graph):
        if len(group) > 1:
            keep, *rest = sorted(group)
            for other in rest:
                g = nx.contracted_nodes(g, keep, other, self_loops=False)
            g.nodes[keep]["merged_from"] = sorted(group)
    return g
```

`contracted_nodes` takes one pair at a time, so the group is folded pairwise
into its lowest-sorted member. Keeping `merged_from` on the surviving node
matters later: when the wave plan says "APP-0455 moves in wave 4", someone will
ask which seven things that actually means.

## Cycles are the real finding

Run a strongly-connected-components pass. Every SCC with more than one member is
a set of applications that mutually depend on each other and therefore *cannot
be ordered*. They move together, or you break the cycle first.

```python
def report_cycles(g):
    sccs = [c for c in nx.strongly_connected_components(g) if len(c) > 1]
    for c in sorted(sccs, key=len, reverse=True):
        print(f"cycle of {len(c)}: {sorted(c)}")
    return sccs
```

The first time you run this on a real estate, you will find one SCC with
somewhere between 8 and 40 members. That is your monolith, and it does not
matter that the architecture diagram shows it as separate applications.

This output is the single most valuable artefact of the whole exercise, because
it reframes the question. You are no longer asking "which wave does app X go
in?" You are asking "do we move these 23 things in one weekend, or do we spend
six weeks breaking three edges first?"

That is a
[legacy application modernization](https://pixoramagroup.com/blog/legacy-application-modernization)
question rather than a migration question, and it is much better to meet it in
planning than in wave 3.

## Computing waves

With cycles collapsed, the graph is a DAG, and waves are a topological
generation walk — but inverted. Dependencies move *first*, so you want to layer
from the leaves of the dependency direction:

```python
def compute_waves(g, max_wave_size=12):
    """Wave N contains apps whose sync/data dependencies are all in waves < N."""
    hard = nx.DiGraph()
    hard.add_nodes_from(g.nodes)
    hard.add_edges_from(
        (u, v) for u, v, k in g.edges(data="kind") if k in ("sync", "data")
    )

    waves, placed = [], set()
    while len(placed) < hard.number_of_nodes():
        ready = [
            n for n in hard.nodes
            if n not in placed
            and all(dep in placed for dep in hard.successors(n))
        ]
        if not ready:
            raise ValueError("cycle remains — collapse SCCs first")

        # Deterministic, risk-ascending order within the wave
        ready.sort(key=lambda n: (
            g.nodes[n].get("criticality", 99),
            -hard.out_degree(n),
            n,
        ))
        wave = ready[:max_wave_size]
        waves.append(wave)
        placed.update(wave)
    return waves
```

Two details that matter more than the algorithm:

**`max_wave_size`** is a capacity constraint, not an architectural one. Set it
from how many applications your migration team can actually cut over in a
window. Twelve is a reasonable starting guess for a team of six with a weekend
window; measure after wave 1 and correct.

**Sorting by ascending criticality within a wave** means each wave starts with
its least critical members. If a wave runs out of time, you have deferred the
least important things, not whichever happened to be alphabetically last.

## Applying freeze windows and other constraints

The graph gives you a feasible order. Reality gives you a calendar: a retailer
cannot touch anything in November, a payroll system cannot move mid-month,
a licence expires in March, hardware goes EOL in June.

Do not encode these into the graph. Keep them as a separate filter applied to
the computed order, so that when the calendar changes you do not recompute
dependencies:

```python
def schedule(waves, constraints, calendar):
    """Assign dates to waves, deferring any wave whose members are
    frozen in the next available window."""
    plan, cursor = [], calendar.first_window()
    for wave in waves:
        while any(c.blocks(app, cursor) for app in wave for c in constraints):
            cursor = calendar.next_window(cursor)
        plan.append((cursor, wave))
        cursor = calendar.next_window(cursor)
    return plan
```

Hardware EOL deserves special handling, because it is the one constraint that
runs the other way: it is a *deadline*, not a blackout. An application on
hardware that dies in June must be in a wave before June, regardless of where
the topological order wants to put it. If the order says otherwise, you have
found a forced modernization: break the dependency, or accept a hybrid period
where that application runs in the cloud while its dependency is still on-prem.

Finding that in month one instead of month five is the entire return on building
this.

## Regenerate, don't maintain

The output is a plan, and plans are wrong. The value is not the first plan; it
is that the second one takes four minutes.

Put the graph build and wave computation in CI, triggered on changes to the
dependency source. Every run emits the wave plan, the cycle report, and a diff
against the last run. When a team discovers an undeclared dependency in week
seven — and they will — the question "what does this do to the plan?" is
answered by a commit rather than a workshop.

```
$ make wave-plan
  nodes: 247 (312 before data-collapse)
  cycles: 2 SCCs of size 23 and 4
  waves: 14 (max size 12)
  diff vs HEAD~1:
    APP-0912 moved wave 4 -> wave 7 (new sync dep on APP-0455)
    wave 9 now exceeds window capacity by 2
```

That diff is the artefact that makes the programme manageable. A spreadsheet
cannot produce it.

---

AWS's
[application portfolio assessment guide](https://docs.aws.amazon.com/prescriptive-guidance/latest/application-portfolio-assessment-guide/introduction.html)
covers the data-collection side of this in more detail, including what to pull
from discovery tooling. It is worth pairing with this, because the graph is only
as good as the inventory feeding it.

For where wave planning sits in the overall sequence — assessment, landing zone,
the per-application 7 Rs decision, then waves, then optimisation — Pixorama put
[wave planning in context](https://pixoramagroup.com/blog/cloud-migration-strategy-on-premise-to-cloud)
in their full migration walkthrough.

One closing opinion: the reason wave plans live in spreadsheets is that
spreadsheets are what the steering committee reads. Fine — generate the
spreadsheet *from* the graph. Just never let it become the source of truth,
because the moment someone edits a cell to make a date work, the graph and the
plan have diverged and only one of them knows about the dependency.
