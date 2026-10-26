---
platform: Medium
post_id: M7
week: 8
title: "The fractional CTO question is really about who owns the roadmap"
subtitle: "Companies hire a fractional CTO to get technical judgement. The ones where it works have decided, in advance, what the person is allowed to decide."
tags: [startup, leadership, engineering-management, cto, technology]
target_keyword: "fractional cto" / engagement-model cluster
canonical: NONE — original post
distribution_notes: |
  Advisory essay with a specific diagnostic framework. Narrative, first-person,
  no vendor list.
outbound_links:
  - url: https://pixoramagroup.com/blog/what-is-a-fractional-cto
    anchor: "rates in the US and Australia and when the role makes sense"
    type: descriptive
  - url: https://pixoramagroup.com/blog/what-is-staff-augmentation
    anchor: "augmenting the team you have"
    type: partial-match
bio_link: https://pixoramagroup.com/blog
cross_link: S7
---

# The fractional CTO question is really about who owns the roadmap

I have watched four fractional CTO arrangements. Two worked extremely well. Two
were expensive and ended awkwardly, and in both of those cases everyone involved
was competent and acting in good faith.

The difference was not the person. It was whether the company had decided, before
the engagement started, what the fractional CTO was allowed to decide — and
specifically whether they owned the technical roadmap or advised on it.

That sounds like a semantic distinction. It is the whole thing.

## The two failure modes

### The advisor with accountability

A company hires a fractional CTO two days a week. The brief is strategic
guidance: architecture, hiring, vendor selection, technical risk.

They are, implicitly, accountable for technical outcomes. They are also not
present when most decisions get made, because decisions happen in the three days
a week they are not there.

So they arrive on Tuesday to find that a choice has been made — a vendor
selected, a schema designed, a library adopted — and their options are to
accept it or to relitigate it. Accepting it repeatedly means they are not doing
the job. Relitigating it repeatedly makes them an obstacle, and the team learns
to route around them.

I watched this one end with the fractional CTO described as "not commercial
enough" and the engineering lead described as "not strategic enough", when the
actual problem was that two people had the same job and neither had been told.

### The decision-maker without context

The mirror image. A company gives the fractional CTO real authority — they own
technical decisions.

They make good decisions, judged on their merits. They also make them with
one-fifth of the context of a full-time person: they do not know that the
customer who drove the last architecture change is about to churn, that the
senior engineer is interviewing elsewhere, that the sales team has promised a
feature in a demo, or that the "temporary" integration is load-bearing for the
largest account.

Good decisions made on incomplete context look like bad decisions in retrospect,
and the person who made them is not there to adjust when the context surfaces.

## What the two successful ones had in common

Both drew an explicit line, in writing, before starting. Not a job description —
a decision-rights document. It looked roughly like this:

**Fractional CTO decides:**
- Architecture at the system-boundary level: what services exist, what owns what
  data, what the integration contracts are
- Build-versus-buy for anything over a threshold
- Technical hiring bar and the interview process
- Vendor selection for infrastructure and platform
- Security and compliance posture

**Engineering lead decides:**
- Everything inside a service boundary
- Sprint content and sequencing
- Libraries, patterns, tooling within the agreed architecture
- Day-to-day prioritisation and trade-offs

**Jointly, with the CEO breaking ties:**
- Roadmap sequencing against commercial commitments
- Anything that changes the hiring plan or the budget

The specific genius of that split, which I did not appreciate until I saw it
work, is that **it assigns decisions by how long they take to reverse, not by
how important they are.** The fractional CTO owns the decisions that are
expensive to undo and therefore benefit from experience and deliberation. The
full-time lead owns the decisions that need context and speed and are cheap to
revisit.

That maps naturally onto the actual constraint: the fractional person has
judgement but not presence. Give them the decisions where judgement dominates
and presence does not matter much. Two days a week is plenty of time to decide
what services exist. It is not enough to decide what the team does on Thursday.

## The diagnostic

If you are considering this, the question is not "should we hire a fractional
CTO". It is: **which of these three problems do you have?**

**Problem 1: nobody on the team has made these decisions before.** You have
capable engineers who have never designed a multi-tenant system, chosen between
managed services at scale, or built a security posture that passes enterprise
procurement. They will make these decisions anyway, by default, and some will be
expensive.

*This is the fractional CTO case.* Judgement is the scarce resource and it is
needed episodically. Two days a week is genuinely sufficient.

**Problem 2: you do not have enough engineers.** The decisions are fine; the
throughput is not.

*This is not the fractional CTO case*, and it is the most common mis-diagnosis.
A fractional CTO will not write your features, and hiring one when the
constraint is capacity produces a well-architected system that ships slowly.
What you want is
[augmenting the team you have](https://pixoramagroup.com/blog/what-is-staff-augmentation)
or permanent hires, depending on whether the need is bounded.

**Problem 3: nobody is accountable for technical outcomes.** There is no
engineering leadership at all. Decisions are made by whoever cares most, which is
sometimes a product manager and sometimes the loudest engineer.

*This is also not the fractional CTO case*, or rather, it is a case where a
fractional CTO will fail. You cannot part-time your way into being the person
who holds a function together. A fractional person can provide judgement to an
existing structure; they cannot be the structure. Hire a full-time engineering
lead, even a less experienced one, and give them a fractional CTO to learn from.

That third configuration — a full-time lead with less experience plus a
fractional CTO with more — is, in my observation, the arrangement with the best
results and it is rarely what people set out to buy. It is cheaper than a
full-time experienced CTO, it develops someone internally, and it covers both
presence and judgement.

## The practical conditions

For the engagement to work, four things that are easy to get wrong:

**Fixed days, not flexible hours.** "Two days a week, whenever" means the
fractional CTO is never reliably available, so the team stops waiting for them.
Fixed days mean decisions can be scheduled.

**Attendance at the meeting where the roadmap is set.** Not a written update
afterwards. If they are not in that room, they are advising on a plan rather
than shaping it, and the first failure mode above is already in progress.

**A direct line to the CEO or founder.** The value of an experienced technologist
is largely in saying "that commercial commitment is not achievable" to the person
who made it. Routed through a layer, that message gets softened into
uselessness.

**An explicit end state.** Either the arrangement converts to full-time, or it
tapers as the internal lead grows into the role, or it ends at a milestone. An
open-ended fractional CTO engagement at month thirty is a sign that the company
has outsourced a permanent function, which costs more and builds nothing
internally.

On rates and the commercial shape — day rates, retainer versus equity, what the
market actually pays in the US versus Australia — Pixorama has
[rates in the US and Australia and when the role makes sense](https://pixoramagroup.com/blog/what-is-a-fractional-cto)
written up with the numbers, which is useful because the published rates vary
enormously and the variance is mostly about scope rather than seniority.

## The uncomfortable bit

The reason this gets decided badly is that the decision-rights conversation is
awkward in a way that the hiring conversation is not.

Telling an incoming experienced technologist "you do not own sprint
prioritisation" feels like diminishing the role. Telling your existing
engineering lead "you do not own architecture any more" feels like a demotion.
Both conversations are easier to avoid, and avoiding them produces the
two-people-one-job failure.

Have them anyway, in week zero, with both people in the room. The version of
that conversation held in month seven, after an argument about a vendor choice,
is considerably worse.

The single question I would make anyone answer before signing: *when the
fractional CTO and the engineering lead disagree about an architecture decision,
who decides, and does everyone involved already know the answer?*

If the answer is "we'd work it out", the engagement has a predictable ending.
