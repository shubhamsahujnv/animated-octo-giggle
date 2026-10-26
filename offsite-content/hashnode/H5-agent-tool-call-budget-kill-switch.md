---
platform: Hashnode
post_id: H5
week: 6
title: "Giving an AI agent a tool-call budget and a kill switch"
slug: ai-agent-tool-call-budget-kill-switch
subtitle: "The difference between an agent demo and an agent in production is almost entirely the control plane around the loop."
tags: [ai, llm, agents, python, architecture, observability]
target_keyword: "how to build an ai agent" (2900/mo, pos 5 already) / "ai agents for business"
canonical: NONE — original post
outbound_links:
  - url: https://pixoramagroup.com/blog/how-to-build-an-ai-agent
    anchor: "how to build an AI agent"
    type: exact-adjacent
  - url: https://pixoramagroup.com/blog/ai-agents-for-business-use-cases
    anchor: "fifteen ways companies are using them right now"
    type: natural-language
external_links:
  - Model Context Protocol specification
cross_link: M4
---

# Giving an AI agent a tool-call budget and a kill switch

An agent is a loop: model decides, tool runs, result goes back, repeat until
done. Forty lines of code. The demo is genuinely impressive and takes an
afternoon.

Then you put it in front of real inputs and discover what the loop does when it
is confused. It does not stop. It retries the same failing tool eleven times. It
calls a paid API in a cycle. It decides that the way to resolve an ambiguous
instruction is to try every interpretation. One of ours, early on, spent $340 in
nineteen minutes re-reading the same document because a downstream parse error
made it believe each read had failed.

None of that is a model problem. It is a missing control plane. Here is the one
I would build on day one now, rather than day forty.

## The loop, unguarded

For reference, the thing we are hardening:

```python
def run_agent(task, tools, max_turns=20):
    messages = [{"role": "user", "content": task}]
    for _ in range(max_turns):
        response = model.complete(messages=messages, tools=tools)
        if not response.tool_calls:
            return response.text
        messages.append(response.as_message())
        for call in response.tool_calls:
            result = tools[call.name](**call.arguments)
            messages.append(tool_result(call.id, result))
    raise MaxTurnsExceeded()
```

`max_turns` is the only guard, and it is the wrong unit. Twenty turns can mean
two cheap calls or two hundred expensive ones, depending on how many tool calls
the model batches per turn.

## Budget in the units that actually hurt

Track three things, because they fail independently:

```python
from dataclasses import dataclass, field

@dataclass
class Budget:
    max_turns: int = 20
    max_tool_calls: int = 50
    max_cost_usd: float = 2.00
    max_wall_seconds: float = 300.0

    turns: int = 0
    tool_calls: int = 0
    cost_usd: float = 0.0
    started_at: float = field(default_factory=time.monotonic)

    def check(self):
        if self.turns >= self.max_turns:
            raise BudgetExceeded("turns", self.turns)
        if self.tool_calls >= self.max_tool_calls:
            raise BudgetExceeded("tool_calls", self.tool_calls)
        if self.cost_usd >= self.max_cost_usd:
            raise BudgetExceeded("cost", self.cost_usd)
        if time.monotonic() - self.started_at >= self.max_wall_seconds:
            raise BudgetExceeded("wall_clock", None)

    def remaining_note(self):
        """Told to the model, so it can prioritise rather than be
        cut off mid-thought."""
        return (
            f"Budget: {self.max_turns - self.turns} turns, "
            f"{self.max_tool_calls - self.tool_calls} tool calls, "
            f"${self.max_cost_usd - self.cost_usd:.2f} remaining."
        )
```

`remaining_note` is the non-obvious one and it changes behaviour a lot. An agent
that knows it has two turns left will summarise and conclude. An agent that is
killed at turn twenty produces nothing. Telling the model its budget converts a
hard failure into a degraded success.

**Per-tool budgets too**, because the aggregate does not catch the pathological
case:

```python
@dataclass
class ToolPolicy:
    max_calls: int = 10
    max_identical_calls: int = 2   # the one that saved us $340
    cost_per_call_usd: float = 0.0
    requires_approval: bool = False
```

`max_identical_calls` deserves its own paragraph. The single most common agent
pathology is calling the same tool with the same arguments repeatedly, because
the result did not change the model's situation and so the model's reasoning
arrives at the same next step. Hash the call:

```python
def call_signature(name, arguments):
    canonical = json.dumps(arguments, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(f"{name}:{canonical}".encode()).hexdigest()[:16]
```

On the third identical call, do not execute it. Return a synthetic result that
tells the model what is happening:

```python
if seen[sig] > policy.max_identical_calls:
    return tool_result(
        call.id,
        "This exact call has already been made and returned the same result. "
        "Do not repeat it. Either use the result you already have, try a "
        "different approach, or report that you cannot complete the task.",
        is_error=True,
    )
```

Models respond to this well. It breaks the loop about 80% of the time without
aborting the task.

## The kill switch has to work from outside the process

A flag checked at the top of the loop is not a kill switch if the loop is
running in a worker you cannot reach. You need two levels.

**Level 1 — cooperative, checked every iteration:**

```python
def run_agent(task, tools, budget, control):
    messages = [{"role": "user", "content": task}]
    while True:
        budget.check()
        if control.should_stop(run_id):      # external store, not in-process
            return halt(messages, reason=control.reason(run_id))
        ...
```

`control` reads from somewhere operationally reachable — Redis, a feature flag
service, a database row. The property that matters: an on-call engineer can stop
a running agent in under thirty seconds without a deploy and without finding the
right pod.

**Level 2 — a global circuit breaker**, because the thing you most often need to
stop is not one agent but all of them:

```python
class AgentCircuitBreaker:
    """Opens on error rate or spend rate across all runs. The failure
    we were protecting against: a provider returning malformed tool
    calls, which made every concurrent agent retry-loop at once."""

    def __init__(self, error_rate_threshold=0.25, spend_per_min_usd=10.0):
        self.error_rate_threshold = error_rate_threshold
        self.spend_per_min_usd = spend_per_min_usd

    def check(self):
        window = metrics.window(seconds=60)
        if window.error_rate > self.error_rate_threshold and window.count > 20:
            self.open("error_rate")
        if window.spend_usd > self.spend_per_min_usd:
            self.open("spend_rate")
        if self.is_open:
            raise CircuitOpen(self.reason)
```

Spend rate is the one to implement first. It is the failure that gets noticed by
finance rather than by monitoring, which is a bad way to find out.

## Classify tools by what they can destroy

Not all tools need the same treatment. Three tiers:

```python
TOOL_TIERS = {
    # Read-only. Cheap, idempotent, no approval.
    "search_documents":  Tier.READ,
    "get_customer":      Tier.READ,

    # Writes to systems we control and can undo.
    "create_draft":      Tier.REVERSIBLE,
    "update_ticket":     Tier.REVERSIBLE,

    # Outward-facing or irreversible. Never autonomous.
    "send_email":        Tier.IRREVERSIBLE,
    "issue_refund":      Tier.IRREVERSIBLE,
    "delete_record":     Tier.IRREVERSIBLE,
}
```

The rule we settled on: **`IRREVERSIBLE` tools are never called by the agent.**
The agent *proposes* them, the proposal goes to a human or to a deterministic
rule engine, and the action executes outside the loop.

This sounds like it defeats the purpose. It does not. In the deployments that
have actually worked, the agent's value was in the reasoning and the
assembly — reading six systems, working out what the situation is, drafting the
response. The final send is one click. Making that click a human's costs almost
nothing in throughput and removes the entire category of failure where an agent
emails four hundred customers.

If you do want autonomous irreversible actions, gate them on value:

```python
if tier is Tier.IRREVERSIBLE:
    if estimated_impact(call) > AUTONOMY_CEILING:
        return propose_for_approval(call)
    # Below the ceiling, act — and log loudly.
    audit.record(call, autonomous=True)
```

A refund under $50 can be autonomous. A refund over $5,000 cannot. That is a
business rule, written in code, outside the model.

## Traces, or you are debugging blind

Every run emits one trace, with a span per model call and per tool call, and the
attributes you need at 2am:

```python
with tracer.start_span("agent.run") as run_span:
    run_span.set_attributes({
        "agent.run_id": run_id,
        "agent.task_type": task_type,
        "agent.budget.max_cost_usd": budget.max_cost_usd,
    })
    ...
    with tracer.start_span("agent.tool_call") as span:
        span.set_attributes({
            "tool.name": call.name,
            "tool.tier": TOOL_TIERS[call.name].name,
            "tool.signature": sig,
            "tool.repeat_count": seen[sig],
            "tool.duration_ms": duration_ms,
            "tool.is_error": is_error,
        })
```

`tool.signature` and `tool.repeat_count` are what let you find loop pathologies
in aggregate rather than one anecdote at a time. Query for runs where any
signature repeated more than twice and you have a list of your prompt's
weaknesses, ranked by frequency.

The OpenTelemetry project has
[semantic conventions for GenAI spans](https://opentelemetry.io/docs/specs/semconv/gen-ai/)
now; using them rather than inventing attribute names means your traces work in
whatever tooling you adopt later.

## What this adds up to

The loop is 40 lines. The control plane around it is maybe 400, and that ratio
is the honest shape of agent engineering. Budget in three units, per-tool call
limits with identical-call detection, an out-of-process kill switch, a spend-rate
circuit breaker, a tool tier model where irreversible actions are proposals, and
traces with call signatures.

None of it is clever. All of it is the difference between a demo and something
you can leave running.

If you are at the start of this, Pixorama's guide on
[how to build an AI agent](https://pixoramagroup.com/blog/how-to-build-an-ai-agent)
covers the loop and the tool-definition side in more detail than I have here,
and their survey of
[fifteen ways companies are using them right now](https://pixoramagroup.com/blog/ai-agents-for-business-use-cases)
is a useful sanity check on scope — most of the deployments that work are
narrower than the ones people plan.

The [Model Context Protocol spec](https://modelcontextprotocol.io/) is also
worth reading before you design your tool layer, if only because standardising
on it means your tool definitions outlive your framework choice.
