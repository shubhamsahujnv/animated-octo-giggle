---
platform: Substack
post_id: S2
week: 2
title: "Issue 2: The four numbers that decide a migration"
subtitle: "Every business case I have reviewed models compute accurately and omits all four of these. Three of them are an afternoon's work to find."
target_keyword: "on premise to cloud migration" cluster (supports GSC pos 31 page)
canonical: NONE — original
compliance_note: |
  Stands alone without the links — the four numbers and how to compute them are
  the issue's substance. One main-site link, placed where a reader who wants
  the full sequence would look for it. No CTA.
outbound_links:
  - url: https://pixoramagroup.com/blog/cloud-migration-strategy-on-premise-to-cloud
    anchor: "the long version of this"
    type: natural-language
cross_link: H2
---

# Issue 2: The four numbers that decide a migration

Last issue I claimed that expensive technology surprises are structural
decisions showing up late. Migration is the cleanest example, so let me start
there.

I have reviewed a reasonable number of cloud migration business cases. They are
not bad documents. The compute forecast is usually within 10%, which for an
eighteen-month projection is respectable work.

They are also missing the same four numbers every time, and those four numbers
are what actually determine whether the programme comes in under its run-rate.

## Number one: cross-boundary gigabytes per wave-month

During a migration, some of your applications are in the cloud and some are
not. Every dependency that spans that boundary generates metered traffic that
was previously free, because it ran on a switch you already owned.

The number you want is: **for each dependency, the daily traffic volume
multiplied by the number of months its two endpoints will be on opposite sides of
the boundary.**

You can compute this. Flow logs tell you what talks to what and how much. The
wave plan tells you when each thing moves. Join them:

```
for each dependency (A -> B):
    gb_per_day     = flow_logs[A][B] / 30
    months_split   = abs(wave_of(A) - wave_of(B)) * months_per_wave
    cost           = gb_per_day * 30 * months_split * price_per_gb
```

On one programme I was close to, this came out at about $11,000 a month averaged
across an eleven-month hybrid period. Budgeted: zero. The information was
sitting in flow logs the whole time.

The reason nobody computes it is that it falls between two people. The
infrastructure team has the flow logs and does not own the business case. The
programme office owns the business case and has never seen a flow log.

What makes this number worth more than its own size: it is also a **resequencing
instruction**. A dependency carrying 80GB/day whose endpoints are six waves
apart is telling you to move those two applications together. Every time I have
seen this query run, it has changed the wave order.

## Number two: current utilisation of the machines you are about to copy

Not capacity. Utilisation. Average and p95 CPU and memory, over at least a
month, for every VM in scope.

The number is almost always lower than people expect — I have seen estates
average 8-20% — and the reason is structural and completely rational. On owned
hardware, you size for peak plus growth plus a safety margin, because adding
capacity means a purchase order and a six-week lead time. Over-provisioning
costs you a one-off capital inefficiency. Under-provisioning costs you an
outage you cannot fix quickly.

In the cloud, that same sizing logic is a recurring monthly charge for capacity
you do not use, protecting against a risk that no longer exists.

So if you rehost as-is, you are copying the machines *and the assumption*. The
number tells you how much that costs: the gap between what you are provisioning
and what you are using, priced monthly, from the day each wave lands.

I am not arguing against rehosting. It is frequently correct, and I will defend
it in a future issue. I am arguing that the deferral should have a number and a
date attached, because "we'll rightsize later" with no number and no owner
reliably becomes 11% utilisation a year later.

## Number three: tag coverage, measured not assumed

What percentage of your existing infrastructure can be attributed to a specific
business owner and cost centre, today, from metadata rather than from someone's
memory?

Measure it. Do not ask whether you have a tagging policy — everyone has a
tagging policy. Measure actual coverage.

In my experience the honest answer is somewhere between 50% and 70%, and the
missing portion is not randomly distributed. It is concentrated in things
created in a hurry, which is also where the oversized instances and the orphaned
volumes are.

Why this number decides the migration: at 60% coverage you cannot have a cost
conversation. The invoice arrives as one figure, finance asks why cloud is
expensive, and the only available answer is a breakdown by service type —
"compute is 40% of the bill" — which no team can act on.

The fix costs one policy change: make the tags mandatory at resource creation,
so the resource cannot exist without them. It feels bureaucratic in week one. It
is the difference between a cost conversation and an argument, and retro-tagging
later is six weeks of archaeology through audit logs.

## Number four: how long your engineering team takes to ship an infrastructure change

This is the one nobody thinks belongs in a migration business case, and I now
think it is the most predictive of the four.

Measure: from "we agree this change is needed" to "it is in production", for a
routine infrastructure change. Median, over the last ten.

If that number is two days, your migration will go roughly as planned, because
when you discover something — and you will discover something every week — you
can respond.

If it is six weeks, the migration will take much longer than the plan says,
regardless of how good the plan is. Every discovery becomes a six-week
decision, and discoveries are serial because each one changes what you look at
next.

This number is a property of your organisation, not your technology, and it is
the one you cannot buy your way out of. A migration programme with excellent
tooling and a six-week change cycle will be paced by the six weeks.

The useful consequence: if that number is bad, **fix it before the migration, not
during.** Six weeks spent on the deployment pipeline before wave one is
recovered several times over. I have watched a team do exactly this and it was
the highest-return decision of their programme, though it looked like a delay at
the time.

## What the four have in common

None of them are about the cloud.

Number one is about your dependency graph. Two is about a procurement cycle from
2017. Three is about governance discipline. Four is about your delivery
capability.

The cloud is where they become visible, because the cloud prices things that
were previously free or capital. That is the whole mechanism of the "cloud is
more expensive than we thought" conversation: not that the cloud is expensive,
but that it meters things your previous environment did not, and the meter is a
readout of structure you had never had to look at.

Which is last issue's claim, in a specific setting: the structural decisions were
made years ago. The migration just moved them somewhere with a price tag.

## If you are about to start one

Compute one, two and three this week. They are genuinely an afternoon each, and
between them they will tell you more about your migration's cost than another
month of planning.

Four takes longer because you have to look at your last ten changes honestly,
and the answer is often unwelcome.

Then put all four in the business case as explicit lines, including the ones that
make the saving look smaller. A business case that shows a modest saving and
survives contact with the invoice is worth considerably more than one that shows
a large saving and does not — not least because the second kind damages the
credibility of the next programme.

For the full sequence around all this — the assessment work, choosing a strategy
per application rather than per programme, how to build the landing zone before
wave one, and what to modernise during the move versus after — my colleagues
wrote
[the long version of this](https://pixoramagroup.com/blog/cloud-migration-strategy-on-premise-to-cloud)
with the steps laid out properly. The part I would read twice is the assessment
phase, because all four of these numbers belong there and it is the phase most
programmes compress.

Next issue: why cost-optimisation programmes get exactly one good quarter.

---

*I am an engineer at [Pixorama](https://pixoramagroup.com/), where I work on
cloud and platform engineering. Figures in this issue come from three migration
programmes, anonymised and rounded. The ratios transfer better than the absolute
numbers.*
