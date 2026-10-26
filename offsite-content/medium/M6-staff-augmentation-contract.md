---
platform: Medium
post_id: M6
week: 7
title: "Staff augmentation failed us twice before we wrote the contract properly"
subtitle: "The model is sound. Both failures were procurement failures dressed up as engineering ones, and the fixes were four clauses."
tags: [engineering-management, outsourcing, startup, hiring, software-development]
target_keyword: "staff augmentation" (1900/mo, SD 17, CPC $53.75) — zero GSC impressions today
canonical: NONE — original post
distribution_notes: |
  First-person account with a specific, reusable artefact (the four clauses).
  Narrative structure, not a listicle of vendors.
outbound_links:
  - url: https://pixoramagroup.com/blog/what-is-staff-augmentation
    anchor: "what staff augmentation is and when it beats hiring a project team"
    type: descriptive
  - url: https://pixoramagroup.com/blog/top-it-staff-augmentation-companies-usa
    anchor: "the firms operating in this space"
    type: descriptive
bio_link: https://pixoramagroup.com/blog
cross_link: S7
---

# Staff augmentation failed us twice before we wrote the contract properly

We tried staff augmentation twice and got burned twice. The third time it worked
well enough that two of those engineers are still on the team four years later,
as employees.

Nothing changed about the model, the vendor quality, or our engineering practice
between attempt two and attempt three. What changed was four clauses in the
contract, and in retrospect both earlier failures were entirely predictable from
the documents we signed.

I am writing this because the standard post-mortem for a failed augmentation
engagement is "the contractors weren't good enough", and in both of our cases
that was false and also convenient.

## Failure one: we bought headcount instead of capability

The brief was "four backend engineers for six months." We got four backend
engineers. They were, on paper and in interview, fine.

What went wrong: we had a system with fourteen years of accumulated context, and
we had assumed that "backend engineer" was a fungible unit. The first eight
weeks were spent on onboarding, during which our two most senior people were
unavailable for anything else because they were answering questions.

So for two months we had *negative* capacity. Six engineers' worth of salary
producing less output than the two we started with. The engagement was six
months, which meant we got four months of productive work from four people,
minus two months of our seniors' time — call it a net gain of two or three
person-months for six person-months of cost.

Then the engagement ended and the context left with them.

**What I got wrong:** I was solving for a headcount gap when the actual
constraint was context. Adding people to a context-heavy system does not add
capacity in the short term; it subtracts it. This is the thing Brooks wrote down
fifty years ago and I had read and had not internalised.

## Failure two: nobody owned the output

Second attempt, smarter brief: two engineers, twelve months, one specific
subsystem.

Better. And it failed differently.

The vendor's engineers reported to a vendor delivery manager. Our team lead gave
them work. When priorities conflicted — and they did, constantly, because the
vendor was tracking against a statement of work and we were tracking against a
sprint — the engineers were put in an impossible position and resolved it by
following whoever asked most recently.

The subsystem got built. It worked. It also did not match how the rest of our
system was built, because the code review that would have caught that never
happened consistently — our engineers reviewed the vendor's PRs when they had
time, and when they did not, the vendor's own delivery manager approved them to
keep the SOW on schedule.

We spent four months after the engagement ended reworking it. That rework was
not in anyone's cost model.

**What I got wrong:** I treated the engagement as a delivery contract when I
needed it to be a capacity contract. A delivery contract makes the vendor
accountable for an outcome, which sounds good and means they control the
process. For work inside your own codebase, you want to control the process.

## The four clauses

Third attempt. Same model, same category of vendor. These four things were in
the contract.

### 1. Our definition of done, in the contract, by reference

> "Work is complete when it satisfies the Client's engineering standards as
> published at [internal URL], including code review approval by a Client
> engineer, test coverage thresholds, and documentation requirements. The
> Supplier's internal completion criteria do not apply."

The specific thing this prevents: a vendor marking work complete against their
own standard. The clause makes our review the gate, which means the vendor's
schedule pressure cannot route around it. It also means that when we tighten our
standards mid-engagement, that is not a change request.

### 2. Named individuals, with substitution control

> "The Supplier shall provide the individuals named in Schedule A. Substitution
> requires 30 days' written notice and Client approval. Any replacement shall be
> subject to Client technical assessment. The Supplier shall provide 4 weeks of
> overlap at no charge for any substitution initiated by the Supplier."

Rotation is the most expensive thing that happens in these engagements and the
default contract permits it freely. Every rotation resets the context cost.

The unpaid overlap is the clause that actually bites — it makes rotation
expensive for the vendor rather than for us, which aligns the incentive. We
invoked it once and the replacement was, unsurprisingly, more carefully chosen
than the first substitution they had proposed.

### 3. One reporting line, explicitly

> "Augmented personnel shall take technical direction solely from the Client
> engineering lead. The Supplier shall not assign, reprioritise or approve work
> for these individuals. The Supplier's account management role is limited to
> commercial and HR matters."

This is the clause that fixed failure two. It sounds aggressive and no vendor has
objected to it, because it is also simpler for them — they are selling capacity,
not managing a project.

It is also the clause that makes the engagement legally *look* more like
employment, which matters depending on jurisdiction. Get advice. In Australia,
the UK and parts of the US, direction-and-control is a key test for employment
classification, and the answer that works is usually about who sets hours, who
provides equipment, and whether there is an obligation to accept work — not
about who reviews the PR. But do not take my word for it.

### 4. An exit that transfers context, not just code

> "In the final 4 weeks of the engagement, Supplier personnel shall produce
> handover documentation covering architecture decisions, known defects,
> operational runbooks and open questions, and shall conduct walkthrough sessions
> with nominated Client engineers. 20% of the final invoice is contingent on
> Client acceptance of handover."

The withheld 20% is the part that makes this real. Handover is the first thing
dropped when the next engagement starts, because the engineers have already
moved on mentally and the vendor has nothing left to gain.

We have invoked this once, mildly — the documentation was thin, we asked for
more, we got it in a week.

## What augmentation is actually good for

Having now done it successfully, my view on the shape that works:

**Good:** a well-defined piece of work with a clear boundary, where you need
intense capacity for a bounded period and then none. A compliance deadline. A
platform migration. Building out a subsystem whose interface you control. Deep
specialist skills you need for eight weeks and cannot justify hiring — the
Postgres expert, the iOS build engineer, the person who actually understands
Kafka.

**Bad:** core product development on a long horizon. If the work is permanent,
hire. Augmentation's cost per unit of output is higher than employment once you
include context loss, and the whole advantage is the optionality — which you are
not using if the engagement keeps renewing.

**Worst:** augmentation as a hiring substitute because headcount is frozen but
contractor budget is not. This is extremely common and it is an accounting
arbitrage, not an engineering decision. You pay more, lose the context annually,
and the organisation never confronts the fact that it needs more engineers.

The framing I find most useful: augmentation buys you *time-boxed capacity with a
specific skill*, and the context transfer is the cost. If the work is long enough
that you will pay that cost more than twice, you wanted an employee. Pixorama's
breakdown of
[what staff augmentation is and when it beats hiring a project team](https://pixoramagroup.com/blog/what-is-staff-augmentation)
makes the same distinction with the engagement-model comparison laid out, which
is worth reading before you write a brief — the choice between augmentation, a
managed project team, and hiring is usually made implicitly and should be made
explicitly.

## The thing I would tell myself in 2019

Both failures were visible in the contract before anyone wrote any code.

Attempt one's contract said "four backend engineers" with no mention of
onboarding, no ramp assumption, and no handover. The negative-capacity period was
fully predictable from that document.

Attempt two's contract had a statement of work with milestones and a vendor
delivery manager. The conflicting-priorities failure was the only possible
outcome of that structure.

So the lesson is not about vendor selection, which is where everyone looks. The
vendors were comparable; one of the two failures was with a well-regarded firm
that appears on most of
[the firms operating in this space](https://pixoramagroup.com/blog/top-it-staff-augmentation-companies-usa).
The lesson is that the contract encodes the failure mode, and engineering leaders
mostly do not read it, because it arrives as a procurement document and looks
like someone else's job.

Read it. The four clauses above took an afternoon with our legal team and they
are the difference between the model working and not.

One practical note if you are sourcing offshore, which most people doing this
are: clause two matters considerably more in markets with high engineer
mobility, because substitution is more frequent and the vendor's cost of
replacing someone is lower. Pixorama's write-up on
[what to put in the contract when augmenting from India](https://pixoramagroup.com/blog/best-staff-augmentation-companies-india)
goes into the sourcing side, and it is the one of these comparisons I have read
that leads with the contract rather than the vendor list.
