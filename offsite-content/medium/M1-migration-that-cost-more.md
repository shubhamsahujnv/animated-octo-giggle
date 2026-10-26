---
platform: Medium
post_id: M1
week: 1
title: "The cloud migration that cost more after we finished"
subtitle: "We hit every milestone, moved every workload, and the bill went up 18%. The post-mortem took longer than the migration."
tags: [cloud-computing, software-engineering, devops, technology, cloud-migration]
target_keyword: "on premise to cloud migration" (SD 17, CPC $58.99, GSC pos 31)
canonical: NONE — original post, not a republish
distribution_notes: |
  First-person narrative with a specific claim and a number. Not a listicle,
  not a summary of other sources, no round-up — meets Medium's General
  Distribution standards. Two outbound links, both first-party (permitted),
  placed where a reader wants the longer version. Links are nofollow; value
  here is reach, referral and AI citation.
outbound_links:
  - url: https://pixoramagroup.com/blog/cloud-migration-strategy-on-premise-to-cloud
    anchor: "we wrote the whole process up properly"
    type: natural-language
  - url: https://pixoramagroup.com/blog/cloud-cost-is-an-architecture-problem
    anchor: "a finance costume"
    type: partial-match
bio_link: https://pixoramagroup.com/blog
cross_link: H1
---

# The cloud migration that cost more after we finished

We finished a migration on time. Ninety-one workloads out of two data centres,
fourteen months, every wave inside its window. The programme closed, people were
thanked, and somebody made a slide with a green tick on it.

Four months later the monthly infrastructure bill was 18% higher than the
data-centre run rate it replaced.

Nobody had lied in the business case. The compute forecast was almost exactly
right — within 6%, which for a fourteen-month projection is good. The storage
forecast was fine. What we had done was model the cloud as a cheaper place to
run the same thing, which is the one assumption that guarantees this outcome.

I want to be specific about where the money went, because the generic version of
this story — "cloud cost optimisation is important" — is useless. The actual
causes were four, they were all architectural, and three of them were decided
before the first workload moved.

## 1. We paid for a hybrid period we told ourselves was temporary

The wave plan moved applications in order of business risk. Low-risk first,
critical last. Sensible, and it is what every methodology recommends.

It also meant that for eleven of the fourteen months, roughly a third of our
application dependencies ran across the boundary between the cloud and a data
centre. Every one of those calls was a charge. Reads that had been free on our
own switched network became metered egress.

The number was about $11,000 a month, averaged over the hybrid period. We had
budgeted zero, because at planning time nobody asked what the traffic between
wave 2 and wave 9 looked like.

The information was available. Flow logs existed. We had a dependency inventory.
What we did not have was anyone joining those two things and multiplying by a
price, which is an afternoon's work and would have changed the wave order.

The fix is not better forecasting. It is sequencing applications by *data
adjacency* rather than business risk, which is a different plan with a different
order and some uncomfortable conversations about moving a critical workload in
wave 3.

## 2. Lift and shift preserved the shape of a sizing decision made in 2017

About sixty of the ninety-one workloads were rehosted essentially as-is. That
was deliberate — a time-bound exit from a lease, and rehosting is the fastest
way out.

What it meant in practice: those VMs were sized for hardware bought in 2017 on a
three-year refresh cycle, which means they were sized for peak load plus a
growth margin plus a safety margin, because adding capacity meant a purchase
order and a six-week lead time.

That sizing logic is completely rational on owned hardware. The cost of
over-provisioning is a one-off capital inefficiency, and the cost of
under-provisioning is an outage you cannot fix quickly. Of course you oversize.

In the cloud that same logic is a recurring monthly charge for capacity you do
not use, and the under-provisioning risk it was protecting against no longer
exists, because you can resize in minutes.

We rehosted the machines *and the assumption*. Average CPU utilisation across
that estate, measured six months in, was 11%.

The honest version of the lift-and-shift decision is: this is a migration
strategy, not a cost strategy, and it defers the cost work rather than avoiding
it. We knew that. We said it in the steering committee. What we did not do was
put a date and an owner on the deferred work, so it did not happen.

## 3. Nobody could tell which team's spend was which

The first invoice was one number. By the third month people were asking why
cloud was expensive, and the only available answer was a breakdown by service
type — so much compute, so much storage, so much data transfer.

That is not an answer anyone can act on. "Compute is 40% of the bill" does not
tell a team that their batch job runs on an instance three sizes too large.

Tagging had been part of the landing zone design. It was a *policy* rather than
an *enforcement* — resources were supposed to carry owner and cost-centre tags.
Actual coverage, when we finally measured it, was 58%.

Fifty-eight percent coverage is functionally zero for attribution, because the
42% is not randomly distributed. It is concentrated in things created in a hurry
during cutover weekends, which is also where the oversized instances are.

We spent six weeks retro-tagging. Some resources we could not attribute at all
and had to trace through CloudTrail to find who created them. Two we switched
off to see who complained.

Making tags mandatory at creation — the resource simply cannot exist without
them — is a one-line policy change that would have saved all of it. It feels
bureaucratic in month one. It is the difference between having a cost
conversation and having an argument.

## 4. The architecture had a cost shape, and we had never looked at it

This is the one that actually mattered, and it is why the other three kept
coming back.

Six months post-migration we ran a cost-optimisation programme. Rightsizing,
reserved capacity, deleting orphaned volumes, scheduling non-production
environments off overnight. It worked: the bill came down 23% in a quarter.

Then it went back up over the following two quarters, to roughly where it had
been.

Because none of that touched the structure. The things we fixed were
consequences. The causes were a multi-AZ messaging cluster replicating across
zones on every write, a reporting service pulling full table extracts from
another service's database because there was no event stream, a batch pipeline
re-reading the same reference data forty times per run, and a chatty service
boundary in a request path that had been drawn around team ownership rather than
data locality.

Every one of those is a recurring cost generated by a design decision. Pricing
levers reduce the unit cost of running them. They do not stop you running them.

This is the part I would most want to transplant into the head of anyone about
to start: the cloud bill is a readout of your architecture. It is
[a finance costume](https://pixoramagroup.com/blog/cloud-cost-is-an-architecture-problem)
over a design problem, and a cost programme that only pulls pricing levers buys
exactly one good quarter.

## What we would do differently

Not "plan better". Four specific things, in the order they would happen:

**Join the flow logs to the wave plan, before the wave plan is approved.** Price
every cross-boundary dependency by the number of months it will span the
boundary. Resequence around the top five. This is an afternoon and it was worth
about $120,000 on this programme.

**Make the lift-and-shift deferral explicit, with a date.** "Rehost now,
rightsize within 90 days of each wave, owner named per workload." The deferral is
fine. The deferral without a date is how 11% utilisation survives for a year.

**Enforce tags preventively, not by policy.** Cannot create the resource without
`workload`, `env`, `owner`, `cost-centre`. Accept the friction in week one.

**Cost-review the architecture, not the invoice.** Once per quarter, pick the
three largest line items and ask what design decision produces them. Not "can we
get a discount on this" — "why does this exist". The answers are usually a
missing cache, a missing event stream, or a service boundary in the wrong place.

## The part that is genuinely hard

I do not want to make this sound like a process failure with a process fix.

The real difficulty is that the people who can see the cost shape of an
architecture are the architects, and they are fully occupied with the migration;
while the people who own the cost conversation are in finance, and they cannot
read an architecture. The gap between those two groups is where this money goes,
and no amount of dashboards closes it — dashboards give finance more detailed
numbers about things they still cannot act on.

What closed it for us, eventually, was putting one engineer in the monthly
finance review with a standing agenda item: here are the three largest cost
drivers, here is the design decision behind each, here is what changing it would
cost in engineering time. That meeting is where the batch pipeline got its
cache and the reporting service got its event stream.

It took us two years to set that meeting up. It should have existed in month
one, before the migration started, so that the hybrid-period egress forecast had
somewhere to be discussed.

---

If you are at the planning stage of one of these,
[we wrote the whole process up properly](https://pixoramagroup.com/blog/cloud-migration-strategy-on-premise-to-cloud)
— the assessment work, how to choose a strategy per application rather than per
programme, how to sequence waves, and what to modernise during the move versus
after. The part I would read twice is the assessment phase, because almost
everything in this post was knowable there and we did not look.

The migration itself was a success, for what it is worth. Ninety-one workloads,
on time, no major incident. We just measured it against the wrong thing.
