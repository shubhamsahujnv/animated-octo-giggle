---
platform: Substack
post_id: S5
week: 6
title: "Issue 5: Where AI agents earn their keep, and where they don't"
subtitle: "Four builds, three of which should have been a state machine. The one that needed an agent had five specific properties."
target_keyword: "ai agents for business" (1000/mo, SD 22, GSC pos 20.1)
canonical: NONE — original
compliance_note: |
  Original taxonomy from first-hand builds; stands alone. Two main-site links,
  both as references at the point a reader would want wider examples.
outbound_links:
  - url: https://pixoramagroup.com/blog/ai-agents-for-business-use-cases
    anchor: "fifteen use cases they have catalogued"
    type: partial-match
  - url: https://pixoramagroup.com/blog/ai-answering-service-vs-human-receptionist
    anchor: "the receptionist-versus-answering-service comparison"
    type: descriptive
cross_link: H9
---

# Issue 5: Where AI agents earn their keep, and where they don't

I said in issue one that this was the topic where I am most likely to be wrong,
so let me be specific enough to be wrong usefully.

Four agent builds in the last eighteen months. Three should not have been
agents. One genuinely needed to be. All four shipped and all four work, which is
why this is a subtle argument rather than a horror story — the three that should
not have been agents cost between four and nine times what the alternative
would have cost, and two of them are less reliable than a state machine. That is
the expensive kind of success, and it is much harder to learn from than failure.

## The test, which takes an afternoon

Before any discussion of frameworks or models:

**Can you draw the decision tree?**

Not "is it complicated". Not "does it have a lot of branches". Just: if you sat
down with a domain expert and enough patience, could you enumerate the decision
points and what determines each one?

If yes, you have a workflow. Write the workflow. You may well want a model
*inside* it — for extraction, classification, summarisation, drafting — but the
control flow belongs in code, where it is deterministic, testable, cheap and
explainable.

If genuinely no — if the sequence depends on what you discover while doing it,
in a way you cannot enumerate in advance — you need something that decides at
runtime. That is an agent.

That is the whole test. An afternoon with a whiteboard, undertaken *hoping to
succeed*, would have saved three projects a lot of money.

## The three that failed it

**An invoice processor.** Brief: "an agent that handles supplier invoices."
Actual requirement: extract fields from a PDF, match the purchase order, check
against tolerance, route exceptions, post to the ledger. Five steps, fixed
order, every branch enumerable.

The extraction step benefits enormously from a model — 400 suppliers in 400
layouts is exactly what models are good at. The control flow is a flowchart
somebody in accounts payable drew in 2019.

As an agent it was non-deterministic in a domain where auditors require you to
explain why a specific invoice went to a specific approver. "The model decided"
does not survive a controls review, and we spent six weeks building trace
tooling to reconstruct decisions a `switch` statement would have made legible
for free.

**An onboarding assistant.** Document collection with conditional requirements
by entity type and jurisdiction. Complicated — about ninety rows of decision
table. Not unknowable: the compliance team maintained that table in a
spreadsheet.

We built an agent that read the policy documents and reasoned about which
documents were required. It was right about 92% of the time. The spreadsheet was
right 100% of the time, because it *was* the policy.

This is the failure mode I find hardest to forgive in myself: using a
probabilistic system to approximate a deterministic rule that already existed in
written form. We built lossy compression of a lookup table.

**An internal support bot.** The answering half was retrieval and worked well.
The taking-actions half was the problem: it occasionally chained actions in ways
nobody intended, granting an access request as a step toward resolving an
unrelated ticket. Technically helpful; also a security incident.

## The one that passed

A diagnostic assistant for field-service engineers. Someone arrives at
industrial equipment that is not working, describes symptoms, and the system
helps diagnose it.

Five properties made this genuinely agent-shaped:

1. **The next step depends on what the last step revealed**, and the symptom
   space is combinatorial rather than listable.
2. **The right information source is not known in advance** — manuals, past
   tickets, telemetry, parts inventory, an engineer's free-text note from 2019 —
   and which to consult depends on the hypothesis being tested.
3. **A human is in the loop continuously.** The engineer is standing in front of
   the machine, feeding in observations and rejecting bad suggestions.
4. **Being wrong is cheap.** The engineer says "no, that's not it." Being right
   is valuable.
5. **The decision tree had been attempted and had failed.** Twice, with a rules
   engine. Unmaintainable within a year both times.

That fifth property is the one I would weight most heavily, and it is the
cheapest to check. If nobody has tried to write the rules, the claim that the
rules cannot be written is unevidenced.

Those five together are rare. When all five hold, the agent framing is not just
acceptable but clearly right.

## Why the costume gets worn

Three forces, none of them stupidity:

**The demo is seductive and the hard part is invisible.** An agent that handles
one happy path takes an afternoon. The control plane that makes it safe —
budgets in cost and turns, loop detection, tool tiering, traces, evaluation
harness — is roughly ten times the loop, and none of it shows in the demo.

**"Agent" is how the work gets funded.** A proposal to build a workflow with two
model calls competes against a proposal to build an AI agent. The second wins,
even when it is the same project described worse.

**The framework encourages it.** If the easiest thing to build is a loop, people
build a loop.

## The shape that is usually right

For most business problems the answer is not agent-or-workflow. It is a
deterministic workflow with model calls at the perception and generation steps:

```
[intake] → (model: extract) → [validate] → [branch on rules]
                                                  │
                            ┌─────────────────────┴──────────────┐
                      [happy path]                       [exception path]
                            │                                   │
                  (model: draft reply)                   [human review]
                            │                                   │
                        [send]                              [resolve]
```

Square brackets are code. Parentheses are model calls. The model does perception
and language; code makes decisions.

This is dull and has the properties that matter: every path is testable, every
decision is explainable to an auditor, cost per transaction is predictable,
failures are attributable to a step, and you can change business rules without
re-evaluating a prompt.

And when an agent genuinely is needed, **put it inside one step of this
workflow** rather than around the whole thing. The diagnostic assistant is an
agent living inside a service-ticket workflow: the ticket lifecycle is
deterministic, the diagnosis step is agentic. That containment is what makes it
operable.

## The rule I would not bend

For anything irreversible or outward-facing — sending an email, issuing a
refund, granting access, deleting a record — **the agent proposes and code or a
human decides.** Always.

This sounds like it defeats the purpose and it does not. In every deployment I
have seen work, the value was in the reasoning and the assembly: reading six
systems, working out what the situation is, drafting the response. The final send
is one click. Making that click a human's costs almost nothing in throughput and
eliminates the entire category of failure where an agent emails four hundred
customers.

If you want autonomy on irreversible actions, gate it on value — a refund under
$50 can be autonomous, one over $5,000 cannot. That is a business rule, in code,
outside the model.

## Where I might be wrong

Two places, stated so they can be checked later.

**The test may be too conservative.** "Can you draw the decision tree" catches
cases where drawing it is *possible but uneconomic* — a tree with 4,000 branches
that would take a year to enumerate and a year to maintain. The onboarding case
had ninety rows, which is clearly worth writing. At what size does that flip? I
do not know, and I suspect the honest answer is that it depends on how fast the
rules change rather than on their count.

**Model capability may move the line.** My objections to the three failures are
largely about determinism and explainability, which are properties of the
architecture rather than the model's intelligence. Those objections should be
stable. But the reliability objection — 92% versus 100% — is a capability claim,
and capability claims age badly. If that gap closes, the onboarding case gets
closer to reasonable, though I would still want to know why you would prefer an
inferred policy to a written one.

For a wider view than my four, my colleagues catalogued
[fifteen use cases they have catalogued](https://pixoramagroup.com/blog/ai-agents-for-business-use-cases)
across different industries, and what strikes me reading it is how much narrower
the successful deployments are than the way these projects get pitched
internally. The narrowest and most reliable category is the one that barely
looks like an agent at all —
[the receptionist-versus-answering-service comparison](https://pixoramagroup.com/blog/ai-answering-service-vs-human-receptionist)
is a good example of a bounded task with a clear fallback, which is why it
works.

Next issue: retrieval, and why the demo-to-production gap is almost entirely
chunking.

---

*I am an engineer at [Pixorama](https://pixoramagroup.com/). Four builds,
anonymised. If you have an agent deployment that passed my five-property test
and still failed, or failed it and worked anyway, please reply — that is the
most useful thing anyone could send me.*
