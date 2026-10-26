---
platform: Substack
post_id: S7
week: 7
title: "Issue 7: How to buy engineering capacity"
subtitle: "Two failed augmentation engagements, both predictable from the contract we signed. The four clauses that fixed it."
target_keyword: "staff augmentation" (1900/mo, SD 17, CPC $53.75) — zero GSC impressions today
canonical: NONE — original
compliance_note: |
  The four clauses are the issue's substance and stand alone. Two main-site
  links as references at the engagement-model decision point.
outbound_links:
  - url: https://pixoramagroup.com/blog/what-is-staff-augmentation
    anchor: "when it beats hiring a project team"
    type: descriptive
  - url: https://pixoramagroup.com/blog/what-is-a-fractional-cto
    anchor: "the fractional CTO version of this question"
    type: descriptive
cross_link: M6
---

# Issue 7: How to buy engineering capacity

I have been part of two failed staff augmentation engagements and one that
worked well enough that two of those engineers are now employees, four years on.

Nothing changed between attempt two and attempt three about the model, the
vendor quality, or our engineering practice. What changed was four clauses in
the contract.

I am writing this because the standard post-mortem for these is "the contractors
weren't good enough", and in both of our failures that was false and also
convenient.

## Failure one: we bought headcount when the constraint was context

Brief: four backend engineers, six months. We got four competent backend
engineers.

What went wrong: we had a system with fourteen years of undocumented context,
and we had assumed "backend engineer" was a fungible unit. The first eight weeks
were onboarding, during which our two most senior people were unavailable for
anything else because they were answering questions.

So for two months we had **negative capacity.** Six engineers' worth of cost
producing less than the two we started with.

Net across six months: maybe two or three person-months of gain for six
person-months of spend. Then the engagement ended and the context left.

This is Brooks, fifty years old, which I had read and had not internalised.
Adding people to a context-heavy system subtracts capacity before it adds any.

## Failure two: nobody owned the output

Smarter brief: two engineers, twelve months, one specific subsystem.

The vendor's engineers reported to a vendor delivery manager. Our team lead gave
them work. When priorities conflicted — constantly, because the vendor tracked a
statement of work and we tracked a sprint — the engineers were in an impossible
position and resolved it by following whoever asked most recently.

The subsystem got built and worked. It also did not match how the rest of our
system was built, because the code review that would have caught that happened
inconsistently: our engineers reviewed when they had time, and when they did not,
the vendor's delivery manager approved to keep the SOW on schedule.

Four months of rework afterwards, in nobody's cost model.

My mistake: I treated it as a delivery contract when I needed a capacity
contract. A delivery contract makes the vendor accountable for an outcome, which
sounds better and means **they** control the process. For work inside your own
codebase, you need to control the process.

## The four clauses

Third attempt, same model, comparable vendor.

### 1. Our definition of done, by reference

> *Work is complete when it satisfies the Client's engineering standards as
> published at [internal URL], including code review approval by a Client
> engineer, test coverage thresholds and documentation requirements. The
> Supplier's internal completion criteria do not apply.*

Prevents a vendor marking work complete against their own standard. Makes our
review the gate, so the vendor's schedule pressure cannot route around it. Also
means tightening our standards mid-engagement is not a change request.

### 2. Named individuals, with substitution control

> *The Supplier shall provide the individuals named in Schedule A. Substitution
> requires 30 days' written notice and Client approval. Any replacement shall be
> subject to Client technical assessment. The Supplier shall provide 4 weeks of
> overlap at no charge for any substitution initiated by the Supplier.*

Rotation is the most expensive thing that happens in these engagements and the
default contract permits it freely. Every rotation resets the context cost from
failure one.

The **unpaid overlap** is the clause that bites. It makes rotation expensive for
the vendor rather than for you, which aligns the incentive properly. We invoked
it once and the replacement was noticeably more carefully chosen than the first
substitution proposed.

### 3. One reporting line

> *Augmented personnel shall take technical direction solely from the Client
> engineering lead. The Supplier shall not assign, reprioritise or approve work
> for these individuals. The Supplier's account management role is limited to
> commercial and HR matters.*

This fixed failure two. It reads as aggressive and no vendor has objected,
because it is simpler for them — they are selling capacity, not managing a
project.

**One caution, and please take advice on it.** This clause makes the arrangement
look more like employment, and worker-classification tests in Australia, the UK
and much of the US weigh direction and control. In practice the tests turn more
on who sets hours, who provides equipment, and whether there is an obligation to
accept work than on who approves a pull request — but I am an engineer, not a
lawyer, and the consequences of getting this wrong land on your finance team.
Have someone qualified read it.

### 4. An exit that transfers context, not just code

> *In the final 4 weeks, Supplier personnel shall produce handover documentation
> covering architecture decisions, known defects, operational runbooks and open
> questions, and shall conduct walkthrough sessions with nominated Client
> engineers. 20% of the final invoice is contingent on Client acceptance of
> handover.*

The withheld 20% is what makes it real. Handover is the first thing dropped when
the next engagement starts, because the engineers have mentally moved on and the
vendor has nothing left to gain.

We invoked this once, mildly. Documentation was thin, we asked for more, we had
it in a week.

## What this model is actually for

Having now done it properly:

**Good:** a well-defined piece of work with a clear boundary, where you need
intense capacity for a bounded period and then none. A compliance deadline. A
platform migration. A subsystem whose interface you control. Deep specialist
skills for eight weeks that you cannot justify hiring — the Postgres expert, the
iOS build engineer, the person who genuinely understands Kafka.

**Bad:** core product development on a long horizon. If the work is permanent,
hire. Augmentation's cost per unit of output is higher than employment once you
count context loss, and the entire advantage is optionality — which you are not
using if the engagement keeps renewing.

**Worst:** augmentation as a hiring substitute because headcount is frozen but
contractor budget is not. Extremely common, and it is an accounting arbitrage
rather than an engineering decision. You pay more, lose the context annually, and
the organisation never confronts that it needs more engineers.

The framing that has served me: **augmentation buys time-boxed capacity with a
specific skill, and context transfer is the price.** If the work runs long enough
that you will pay that price more than twice, you wanted an employee.

My colleagues lay out that comparison — augmentation versus a managed project
team versus hiring — in their piece on
[when it beats hiring a project team](https://pixoramagroup.com/blog/what-is-staff-augmentation),
and it is worth reading before writing a brief, because the choice between those
three is usually made implicitly and should be made on purpose.

If the gap you are filling is judgement rather than hands — nobody on the team
has designed a multi-tenant system or passed an enterprise security review —
that is a different purchase, and
[the fractional CTO version of this question](https://pixoramagroup.com/blog/what-is-a-fractional-cto)
has its own failure modes, mostly about who owns the roadmap. I may do an issue
on that.

## The thing I would tell my 2019 self

Both failures were visible in the contract before anyone wrote code.

Attempt one's contract said "four backend engineers" with no ramp assumption, no
onboarding plan and no handover. The negative-capacity period was fully
predictable from that document.

Attempt two's had milestones and a vendor delivery manager. The
conflicting-priorities failure was the only available outcome of that structure.

So the lesson is not about vendor selection, which is where everyone looks and
where the comparison articles concentrate. The vendors were comparable — one
failure was with a well-regarded firm. The lesson is that **the contract encodes
the failure mode**, and engineering leaders mostly do not read it, because it
arrives as a procurement document and looks like someone else's job.

Read it. Four clauses, an afternoon with your legal team, and it is the
difference between the model working and not.

Next issue: shipping on two platforms, and why "one codebase" is the least
interesting part of cross-platform mobile.

---

*I am an engineer at [Pixorama](https://pixoramagroup.com/). Three engagements,
anonymised. The clause text above is paraphrased from contracts I have worked
under; it is illustrative and not legal drafting.*
