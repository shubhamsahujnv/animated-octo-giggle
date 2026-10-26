---
platform: Medium
post_id: M4
week: 4
title: "Most AI agent projects are workflow projects wearing a costume"
subtitle: "Three of the four agent builds I have been close to should have been a state machine. The fourth genuinely needed a model, and it is instructive why."
tags: [artificial-intelligence, llm, ai-agents, software-engineering, technology]
target_keyword: "ai agents for business" (1000/mo, SD 22, GSC pos 20.1)
canonical: NONE — original post
distribution_notes: |
  Contrarian thesis with a concrete taxonomy drawn from first-hand builds.
  Not a round-up of tools, not a summary of other articles.
outbound_links:
  - url: https://pixoramagroup.com/blog/ai-agents-for-business-use-cases
    anchor: "fifteen things companies are actually doing with agents right now"
    type: natural-language
  - url: https://pixoramagroup.com/blog/how-to-build-an-ai-agent
    anchor: "how to build one"
    type: partial-match
bio_link: https://pixoramagroup.com/blog
cross_link: H5
---

# Most AI agent projects are workflow projects wearing a costume

I have been close to four agent builds in the last eighteen months. Three of
them should not have been agents. One of them genuinely needed to be, and the
difference between those two categories turns out to be sharp, cheap to test
for, and almost never tested for.

The three that should not have been agents all shipped. They all work. They all
cost between four and nine times what the non-agent version would have cost, and
two of them are less reliable than a state machine would have been. That is the
expensive kind of success.

## The test

Here is the question I now ask first, before any discussion of frameworks,
models or tools:

**Can you draw the decision tree?**

Not "is it complicated". Not "does it have many branches". Just: if you sat down
with a domain expert and enough patience, could you enumerate the decision
points and what determines each one?

If yes, you have a workflow. Write the workflow. You may well want a model
*inside* it — for classification, extraction, summarisation, generation — but the
control flow belongs in code, where it is deterministic, testable, debuggable and
cheap.

If genuinely no — if the sequence of steps depends on what you discover while
doing it, in a way you cannot enumerate in advance — then you need something
that decides at runtime, and that is an agent.

That is the whole test. It takes an afternoon with a whiteboard and it would
have saved three projects a lot of money.

## The three that failed the test

### The invoice processor

Brief: "an agent that handles incoming supplier invoices."

What it actually needed to do: extract fields from a PDF, match the purchase
order, check the amount against tolerance, route exceptions to the right
approver, post to the ledger.

That is five steps in a fixed order. Every branch is enumerable: match found or
not, within tolerance or not, approver available or not. The *extraction* step
benefits enormously from a model — PDFs from 400 suppliers in 400 layouts is
exactly what models are good at. The *control flow* is a flowchart somebody in
accounts payable drew in 2019.

Built as an agent, it was non-deterministic in a domain where the auditors
require you to explain why a specific invoice was routed to a specific person.
"The model decided" is not an acceptable answer in a controls review, and we
spent six weeks building trace tooling to reconstruct decisions that a
`switch` statement would have made legible for free.

The right shape: deterministic pipeline, model called twice (extraction,
and a fuzzy supplier-name match), every branch in code.

### The onboarding assistant

Brief: "an agent that onboards new customers."

Reality: a sequence of document collections with conditional requirements based
on entity type and jurisdiction. Complicated — a decision table with about 90
rows. Not unknowable; the compliance team maintained that table in a
spreadsheet.

We built an agent that read the policy documents and reasoned about which
documents were required. It was right about 92% of the time.

The spreadsheet was right 100% of the time, because it *was* the policy.

This is the failure mode I find most painful: using a probabilistic system to
approximate a deterministic rule that already exists in written form. The agent
was doing lossy compression of a lookup table.

The right shape: the decision table, in code, generated from the compliance
team's spreadsheet. Model used for one thing — reading an uploaded document and
telling you whether it is the type of document it claims to be, which is a real
perception problem.

### The internal support bot

Brief: "an agent that answers employee IT questions and takes actions."

The answering part was a retrieval problem and worked well. The *taking actions*
part was where the agent framing caused damage: password resets, access
requests, software installs, each with an approval rule.

As an agent, it occasionally chained actions in ways nobody intended — granting
an access request as a step toward resolving a different ticket, which is
technically helpful and a security incident.

The right shape: retrieval for answering, and a fixed catalogue of actions each
gated by its own deterministic approval rule. The model proposes; code decides.

## The one that passed

A diagnostic assistant for a field-service operation. An engineer arrives at a
piece of industrial equipment that is not working. They describe symptoms. The
system helps them diagnose it.

Why this one genuinely needs an agent:

**The next step depends on what the previous step revealed, and the space is not
enumerable.** The equipment has thousands of failure modes, many in combination.
"Check the pressure reading" is the right next action only if the earlier
symptoms point there, and the number of symptom combinations is combinatorial
rather than listable.

**The information sources are heterogeneous and the right one is not known in
advance.** Manuals, past tickets, telemetry, parts inventory, an engineer's
free-text note from 2019. Which to consult depends on the hypothesis currently
being tested.

**The human is in the loop continuously.** The engineer is standing in front of
the machine, providing observations and overriding bad suggestions. The cost of
a wrong suggestion is low — the engineer says "no, that's not it" — and the cost
of a right suggestion is high.

**There is no existing decision tree, and the attempt to build one had already
failed.** They had tried, twice, with a rules engine. The tree was unmaintainable
within a year both times.

That is an agent. And notice the shape of it: **exploratory, human-supervised,
cheap-to-be-wrong, heterogeneous tools, genuinely unenumerable.** Those five
properties together are rare, and when they are all present the agent framing is
not just acceptable but clearly correct.

## Why the costume gets worn

I do not think people are being stupid. Three forces push toward agents:

**The demo is seductive and the hard part is invisible.** An agent that handles
one happy-path case takes an afternoon. The control plane that makes it safe —
budgets, loop detection, tool tiering, traces, evaluation — is roughly ten times
the loop itself, and none of it is visible in the demo.

**"Agent" is how the work gets funded.** A proposal to build a workflow with a
model in two steps competes for budget against a proposal to build an AI agent.
The second one wins, even when it is the same project described differently and
worse.

**The framework encourages it.** Agent frameworks make the loop trivial and the
deterministic alternative feel like a step backwards. If the easiest thing to
build is a loop, people build a loop.

## The hybrid that is usually right

The honest answer for most business problems is not agent-or-workflow. It is a
deterministic workflow with model calls at the perception and generation steps:

```
[intake] -> (model: extract)  -> [validate] -> [branch on rules]
                                                     |
                              +----------------------+
                              |                      |
                        [happy path]           [exception path]
                              |                      |
                      (model: draft reply)     [human review]
                              |                      |
                          [send]                 [resolve]
```

Everything in square brackets is code. Everything in parentheses is a model
call. The model does perception and language; the code does decisions.

This architecture is dull and it has properties that matter: every path is
testable, every decision is explainable to an auditor, the cost per transaction
is predictable, failures are attributable to a specific step, and you can change
the business rules without re-evaluating a prompt.

And when a genuine agent is needed, **put it inside one step of this
workflow**, not around the whole thing. The diagnostic assistant above is an
agent that lives inside a service-ticket workflow — the ticket lifecycle is
deterministic, the diagnosis step is agentic. That containment is what makes it
operable.

## What I would ask before approving one

1. **Draw the decision tree.** If it can be drawn, build it.
2. **Does a written rule already exist?** A policy document, a decision table, a
   runbook. If so, encode it; do not ask a model to infer it.
3. **What is the cost of a wrong action?** If it is high, the model proposes and
   code or a human decides. Always.
4. **Is a human in the loop continuously, or only at the end?** Continuous
   supervision makes agents much safer and much more likely to be the right
   choice.
5. **Who is on call for it?** An agent's failure modes are statistical. If there
   is no plan for traces, golden sets and regression gates, the project is not
   ready regardless of its architecture.

If you are at the stage of scoping this, Pixorama's survey of
[fifteen things companies are actually doing with agents right now](https://pixoramagroup.com/blog/ai-agents-for-business-use-cases)
is a decent calibration exercise — what strikes me reading it is how narrow the
successful deployments are compared to how they get pitched internally. And
their walkthrough of
[how to build one](https://pixoramagroup.com/blog/how-to-build-an-ai-agent)
is a reasonable starting point once you have established that you should.

If you are buying this rather than building it, the five questions above are
the ones to put to an agency, and "draw me the decision tree for our use case"
is the single most informative thing you can ask in a sales meeting. A firm
that draws it has just told you the work is a workflow and quoted you for an
agent. Their guide to
[choosing an AI automation agency](https://pixoramagroup.com/blog/best-ai-automation-agencies-in-the-usa-and-australia-for-2026-how-to-c)
covers the builder-versus-reseller distinction, which is the same distinction
from the buyer's side.

The claim I would defend: the most valuable thing you can do on an agent project
is spend one afternoon trying to draw the decision tree, specifically hoping to
succeed. Three times out of four you will, and you will have saved yourself a
year.
