---
platform: Medium
post_id: M3
week: 3
title: "We replaced a rewrite with six months of boring work"
subtitle: "The rewrite was approved, scoped and staffed. Cancelling it was the best engineering decision I have been part of."
tags: [software-engineering, legacy-code, technical-debt, software-architecture, engineering-management]
target_keyword: "legacy modernization" (1000/mo, SD 35) / "legacy modernization services" (CPC $66.74)
canonical: NONE — original post
distribution_notes: |
  Narrative with a reversal and a concrete outcome. No list structure,
  no summarising of external sources. First-party links only.
outbound_links:
  - url: https://pixoramagroup.com/blog/legacy-application-modernization
    anchor: "legacy application modernization"
    type: exact-adjacent
  - url: https://pixoramagroup.com/blog/legacy-modernization-refactor-rebuild-replace
    anchor: "how to decide between the three"
    type: descriptive
bio_link: https://pixoramagroup.com/blog
cross_link: H3
---

# We replaced a rewrite with six months of boring work

The rewrite had a name, a budget, a two-year timeline and eleven people assigned
to it. It had a slide deck with a diagram of the target architecture, and the
diagram was genuinely good. I had helped make it.

We cancelled it in week five.

What we did instead was six months of work so unexciting that it was difficult
to report on. At the end of those six months, the system that was going to be
replaced was still there, still running the business, and nobody wanted to
replace it any more. Not because we had grown fond of it — because the things
that had made it intolerable were gone.

I have thought about this a lot since, because the decision was nearly the other
way, and the argument that changed it was not an engineering argument.

## What was actually wrong

The system was fourteen years old. Roughly 400,000 lines, a language two versions
out of support, a schema with 200 tables and some genuinely alarming design
decisions in it. Four people understood it; two of them were close to retirement.

Everyone agreed it had to go. When I asked people *why*, I got these answers:

1. Changes take too long. A small feature was six to eight weeks.
2. It breaks in production and we cannot tell why.
3. We cannot hire for it.
4. Deployments are a weekend event requiring four people.
5. It is going to fall over one day and we will not be able to fix it.

That list is what justified the rewrite. And looking at it now, the thing I
notice is that **not one of those five items is a statement about the
architecture.** They are all statements about the *experience of working on it*.

That distinction is what the week-five conversation turned on. Someone in a
review — not an engineer, our delivery lead — asked a question that I have
reused many times since: *if we fixed the five complaints without replacing the
system, would we still want to replace it?*

Nobody could say yes with a straight face.

## The six months

So we took the five complaints as the backlog. In order of how much they were
hurting:

### Deployments (6 weeks)

A weekend deployment needing four people meant we deployed monthly, which meant
every release carried a month of changes, which meant every failure was hard to
attribute, which meant we were cautious, which meant we deployed monthly.

We did not change the application. We automated the existing runbook. The
runbook was a 40-step Word document; it became a script, then a pipeline. Six
weeks, two engineers, no application code modified.

Deployment went from a staffed weekend to eleven minutes on a Tuesday.

This single change did more for the other four complaints than anything else we
did, which I did not expect. Feature lead time dropped before we had touched
anything that affects feature lead time, because the batch size collapsed.

### Observability (7 weeks)

"It breaks and we cannot tell why" was literally true: the application logged to
local files on each of six servers, with no correlation between them, and the
logs were rotated daily.

We added structured logging with a request ID threaded through the entry points,
shipped it centrally, and put up four dashboards and about a dozen alerts. We
did not instrument the whole system — we instrumented the eight code paths that
generated the most support tickets.

Mean time to diagnose went from "a day and a guess" to minutes for the common
cases. Two long-standing intermittent bugs were identified in the first
fortnight, because for the first time we could see them happen.

### The test harness (9 weeks)

This was the hardest part and the highest value. There were almost no tests. Any
change therefore required manual regression testing, which is where most of the
six-to-eight weeks went.

We did not try to retrofit unit tests across 400,000 lines; that is the project
that never finishes. We built a characterisation harness at the boundary: record
real requests and responses in production, replay them against a candidate
build, diff the outputs.

```
record (prod, 2 weeks of traffic) -> 140,000 request/response pairs
replay (candidate build)          -> diff
```

This is a crude technique and it was transformative. It does not tell you the
system is correct; it tells you the system has not *changed*, which is the actual
question when modifying a legacy system. Within a month, a change that had
required six weeks of manual regression could be validated in an afternoon.

It also found three places where the system's behaviour differed from its
documentation, which was educational for everyone who had been planning to
rewrite it from the documentation.

### Modularisation at the seams (10 weeks)

Only now did we touch the architecture, and only at the edges.

Two capabilities were genuinely separable and genuinely painful: a reporting
layer that locked tables during business hours, and a notification system that
nobody wanted to be near. We extracted both. New services, new code, clean
interfaces, with the characterisation harness proving the old behaviour was
preserved.

That is maybe 8% of the system by line count. It was most of the daily pain.

### Hiring (ongoing, mostly solved by the above)

"We cannot hire for it" turned out to be partly false. We could not hire people
excited about a system with no tests, no observability, and weekend deployments
— which is a different problem, and we had just fixed it. The language was a
smaller obstacle than the working conditions; competent engineers will learn an
unfashionable language for a well-run system, and will not join a badly-run one
for a fashionable one.

## What the rewrite would have actually cost

The two-year estimate was wrong in the way all rewrite estimates are wrong, and
I want to be precise about the mechanism rather than just asserting it.

The estimate was built from the *known* requirements — the documented behaviour,
the current feature set, the integrations we knew about. That part was probably
about right.

What it omitted:

**The undocumented behaviour.** Our characterisation harness found three
divergences in the eight code paths we instrumented. Extrapolated across the
system, there were hundreds of behaviours nobody had written down, each one load
-bearing for some customer, discoverable only by breaking it.

**The two-system period.** During a rewrite, both systems need maintenance.
Every feature request in those two years gets built twice or deferred. The
business does not stop for your migration, and the rewrite team's velocity
assumption generally pretends it does.

**The convergence problem.** The old system keeps changing while you rebuild it,
so the target keeps moving. Teams solve this by freezing the old system, which
the business overrules by month four.

My honest estimate is three and a half to four years, and a 40% chance of
abandonment somewhere in year two — at which point you have the original system
plus a half-finished replacement plus a demoralised team.

The six months of boring work cost roughly a tenth of the rewrite's first year
and delivered most of what people actually wanted.

## When the rewrite is right

I am not arguing rewrites are never correct. I have seen two that were, and they
had a common feature: **the requirements had changed, not just the code.**

If what the business needs is now materially different from what the system
does, then carefully preserving its existing behaviour is wasted effort — you are
spending money to keep something you want to get rid of. That is a genuine
rebuild case.

The rewrite that is usually wrong is the one where the requirements are stable
and the complaint is that the code is unpleasant. That is a maintainability
problem, and maintainability problems have cheaper solutions than replacement.

The question I would put to any rewrite proposal: *what will the new system do
that the old one does not?* If the answer is a list of qualities — it will be
testable, observable, modular, modern — those are properties you can add to the
system you have. If the answer is a list of capabilities the business needs and
cannot get, that is a rebuild.

Pixorama's framing of
[how to decide between the three](https://pixoramagroup.com/blog/legacy-modernization-refactor-rebuild-replace)
— refactor, rebuild or replace — is a more structured version of the same test,
and their broader piece on
[legacy application modernization](https://pixoramagroup.com/blog/legacy-application-modernization)
covers the option space including buying a product, which in our case was
genuinely considered and rejected for one capability and accepted for another.

## The part that is hard to replicate

I will be honest about why this is difficult, because "just do the boring work"
is advice that ignores the real obstacle.

The rewrite was *easier to fund*. It had a narrative, a target architecture
diagram, a name, and an end state that sounded like progress. It was a thing you
could announce.

"We are going to spend six months automating the deployment, adding logging and
building a replay harness" is not an announcement. It has no end state. Nobody
gets promoted for it. The quarterly update is "deployment is faster now", which
is unglamorous next to "we are modernising the platform".

What made it possible for us was reframing the six months as **a precondition**
rather than an alternative. The pitch was not "do this instead of the rewrite".
It was: *we cannot safely rewrite this system until we can deploy it, observe it
and test it — so we are doing that first, and we will revisit the rewrite in six
months with much better information.*

That got funded. And six months later, with the information, nobody wanted it.

Which was, I think, always the likely outcome, and is a reasonable way to find
out.
