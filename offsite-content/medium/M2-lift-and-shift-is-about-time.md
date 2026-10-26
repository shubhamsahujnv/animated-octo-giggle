---
platform: Medium
post_id: M2
week: 2
title: "Lift and shift is a decision about time, not architecture"
subtitle: "Everyone treats rehosting as the lazy option. It is the correct option more often than the purists admit — if you are honest about what you are buying."
tags: [cloud-computing, software-architecture, technology, devops, engineering-management]
target_keyword: "on premise to cloud migration" / "cloud migration strategy" (1000/mo)
canonical: NONE — original post
distribution_notes: |
  Argumentative essay taking a contrarian position with a defended thesis.
  Original claim, no round-up structure, no derivative summarising.
outbound_links:
  - url: https://pixoramagroup.com/blog/cloud-migration-strategy-on-premise-to-cloud
    anchor: "the 7 Rs broken down application by application"
    type: partial-match
  - url: https://pixoramagroup.com/blog/legacy-modernization-refactor-rebuild-replace
    anchor: "refactor, rebuild or replace"
    type: exact-adjacent
bio_link: https://pixoramagroup.com/blog
cross_link: S2
---

# Lift and shift is a decision about time, not architecture

There is a received wisdom about cloud migration that goes roughly: lift and
shift is what you do if you lack ambition. You will not get the benefits of the
cloud. You will move your problems rather than solve them. Do it properly —
refactor, go cloud-native, use managed services.

I have run migrations both ways and I think this wisdom is mostly wrong, or
rather, it is right about a thing that does not matter as much as it claims.

Here is the reframing I would offer: **rehosting is not an architectural choice
that happens to be fast. It is a scheduling choice that happens to have
architectural consequences.** Once you see it that way, the question stops being
"is lift and shift good" — a question with no answer — and becomes "what am I
buying with the time, and have I priced what I am deferring".

## The case against the received wisdom

The argument for refactoring during migration is that you are touching the
application anyway, so the marginal cost of improving it is low.

This is true for the code and false for everything else. Here is what actually
happens.

Migrating a workload as-is has a *bounded* set of unknowns. The application
behaves the same way; what changes is the infrastructure underneath it. When
something breaks, the cause is in a short list: networking, identity, storage
performance, a hardcoded hostname, a licence check pinned to a MAC address.
Painful, but enumerable.

Refactoring during migration has an *unbounded* set of unknowns, because now
both the infrastructure and the application have changed. When something breaks,
you do not know which half did it. And debugging that question — did the
behaviour change because we moved it or because we rewrote it — is where
migration schedules go to die. I have watched a two-week cutover become eleven
weeks over a single question of that shape.

There is a second problem, which is organisational. A refactor needs the people
who understand the application's business logic. A migration needs the people
who understand infrastructure. These are different people, and on a
sixty-workload programme you cannot have the first group available for all of
it. So the refactoring happens to whichever applications happen to be in the
wave when the domain expert is free, which is not a strategy.

## So what are you buying with the time?

This is the only question that matters, and it has real answers:

**An exit from a lease or a contract.** The most common and most legitimate. The
data centre contract ends in eleven months. A rehost fits in eleven months; a
refactor-everything programme does not. The alternative is not "a better
migration" — it is paying for a lease extension, which is a real number you can
compare against the cost of deferred modernisation.

**Hardware that is going to die.** Storage arrays out of support, a mainframe
with no spares, a database version the vendor stopped patching. The deadline is
set by physics and procurement, not by you.

**A data-centre event you want to stop fearing.** If you are one UPS failure
away from a bad week, getting out fast has a risk value that is hard to put on a
slide but is entirely real.

**Organisational attention.** This one is underrated. Migrations are funded by a
window of executive interest that does not last. A programme that delivers
something visible in six months can ask for another six. A programme that
delivers its first workload in month nine often does not get asked back.

Those are good reasons, and all four are about time. None of them is about
architecture.

## And what are you deferring?

The reason lift-and-shift gets a bad reputation is not that it is wrong. It is
that the deferred work is almost never scheduled, so "defer" silently becomes
"never", and two years later someone writes a blog post about how the cloud did
not deliver.

Be specific about the bill you are running up:

**Rightsizing.** Your VMs are sized for a procurement cycle, not for actual
load. Expect average utilisation somewhere between 8% and 20%. That is a
recurring overpayment starting the day the workload lands.

**Managed-service substitution.** A self-managed database on a VM costs you
patching, backup verification, failover testing and the engineer-hours to do all
three. Some of that is worth keeping. Most is not.

**Elasticity you cannot use.** A monolith that scales vertically cannot respond
to load by adding instances, so you pay for peak capacity continuously. This is
usually the largest single item and the hardest to fix.

**Resilience you now pay for differently.** On-prem redundancy was capital
already spent. In the cloud, multi-AZ is a recurring charge on every write that
crosses a zone. Keeping the on-prem resilience *pattern* in a cloud *pricing
model* is one of the quieter cost surprises.

Put numbers on those four, per workload, at planning time. Then the deferral is
a financing decision — we are paying X per month extra for Y months in exchange
for finishing Z months sooner — rather than an unexamined default.

## The decision rule I would actually use

Not per programme. Per application, which is the part most programmes get wrong
by choosing one strategy for everything.

**Rehost when:** the application works, the deadline is external, the business
logic is stable, and nobody on the team is frightened of it. Most applications
in most estates.

**Replatform** (same application, managed database or container runtime
underneath) **when:** the operational burden is the main cost and the
application does not care where its database lives. This is the highest
return-per-unit-risk option available and it is chronically under-used. Moving a
self-managed Postgres to a managed one is often a connection-string change and
eliminates a whole class of 3am work.

**Refactor when:** the application is actively blocking the business, *and* you
have the domain expert, *and* the cost shape is bad enough to justify it. Three
conditions, all required. Two out of three means wait.

**Replace** (buy something) **when:** the capability is not differentiating.
Payroll, expenses, CRM, ticketing. The fact that you built it in 2011 is not a
reason to keep it.

**Retire when:** you can find no user. Run this check properly — it is routine to
find 10-20% of an application estate has no meaningful traffic, and every one of
those is a workload you do not migrate, test, or pay for. Retiring is the only
strategy with a negative cost, and it is the one least likely to have an owner.

**Retain when:** the thing cannot move for a reason outside your control —
latency to a physical process, a regulatory constraint, a vendor licence that
forbids virtualisation. Say so explicitly and plan the hybrid rather than
discovering it.

The useful discipline is making this choice per application with a written
reason, which is what the 7 Rs framework is for — Pixorama has
[the 7 Rs broken down application by application](https://pixoramagroup.com/blog/cloud-migration-strategy-on-premise-to-cloud)
along with how to sequence the resulting mix, which is the harder half.

## The one thing I would not defer

If I were setting a single rule, it would be this: **lift and shift the
application, never the landing zone.**

Rehosting an application is a reversible, bounded compromise. Compromising on
identity, account structure, network topology, guardrails and cost attribution
is not. Those are the things everything else is built on top of, and retrofitting
them means touching every workload you already moved.

The migrations I have seen fail — genuinely fail, not just cost more than
planned — failed because the environment was built in parallel with the first
wave under deadline pressure, and it was never governable afterwards. The
applications were fine. They were fine in a place nobody could manage.

So: be as pragmatic as you like about the applications. Be inflexible about the
foundation. That asymmetry is, I think, the whole art of it.

## Where this leaves the received wisdom

"Lift and shift means you won't get cloud benefits" is true and incomplete. You
will not get cost or elasticity benefits. You will get out of the data centre,
on a deadline, with a bounded risk profile — and if that is what you needed, you
got what you paid for.

The failure mode is not choosing rehost. It is choosing rehost and then not
writing down what you deferred, because the deferred list is the entire second
half of the project and it has no champion once the migration programme closes
and everyone is thanked.

If the deferred work is genuinely a modernisation question rather than a
rightsizing one — if the answer involves changing what the application *is* —
then it is worth separating that out as its own decision rather than smuggling
it into a migration. The
[refactor, rebuild or replace](https://pixoramagroup.com/blog/legacy-modernization-refactor-rebuild-replace)
question has a different shape and a different cost curve, and migrations that
try to answer it mid-flight tend to answer it badly.
