---
platform: Hashnode
post_id: H9
week: 7
title: "Evaluating an AI agent in production: traces, golden sets and regression gates"
slug: evaluating-ai-agents-production-traces-golden-sets
subtitle: "You cannot improve an agent you cannot measure, and the metric that matters is not accuracy."
tags: [ai, llm, agents, observability, testing, python]
target_keyword: "ai agents for business" (1000/mo, SD 22, GSC pos 20.1)
canonical: NONE — original post
outbound_links:
  - url: https://pixoramagroup.com/blog/ai-agents-for-business-use-cases
    anchor: "where agents are actually being deployed"
    type: descriptive
  - url: https://pixoramagroup.com/blog/conversational-ai-platform-buyers-guide
    anchor: "survives real production traffic"
    type: partial-match
external_links:
  - OpenTelemetry GenAI semantic conventions
cross_link: M4
---

# Evaluating an AI agent in production: traces, golden sets and regression gates

Here is the conversation that happens about four weeks after an agent ships.

> "Is it working?"
> "Users seem happy."
> "Should we change the prompt to handle the refund case better?"
> "Probably?"
> "Will that break anything else?"
> "...we'd find out."

That is not an engineering practice. And the reason teams end up there is that
agent evaluation looks like a research problem — benchmarks, LLM-as-judge,
accuracy percentages — when the production version is mostly a boring
observability problem with three artefacts.

## Why "accuracy" is the wrong top-line metric

An agent that answers 94% of questions correctly sounds good. It depends
entirely on the 6%.

Six percent wrong answers delivered confidently, in a customer-facing context,
is a worse product than 70% correct answers and 30% "I'll get a human." The
distribution of failure matters more than the rate, and a single accuracy number
deliberately hides it.

So the metrics that are worth putting on a dashboard:

| Metric | What it tells you | Target direction |
|---|---|---|
| **Task completion rate** | Did it finish without escalating? | Up, but not at the expense of the next row |
| **Confident-wrong rate** | Finished, answer was wrong | **Down, hard. This is the one that matters.** |
| **Appropriate escalation rate** | Didn't know, said so | Up — this is a success, not a failure |
| **Loop rate** | Repeated the same call ≥3× | Down; it is a prompt defect |
| **Cost per completed task** | Unit economics | Down, watch for it trading against quality |
| **p95 latency to resolution** | Usability | Down |

The second row is the expensive one to measure, because it needs ground truth.
The others come free from traces.

## Artefact 1: traces that answer questions at 2am

Every run emits one trace. Spans for the run, each model call, each tool call.
This is table stakes and most teams have some version of it; the attributes are
what make it useful.

```python
from opentelemetry import trace
tracer = trace.get_tracer("agent")

def run_agent(task, tools, budget, ctx):
    with tracer.start_as_current_span("agent.run") as run:
        run.set_attributes({
            "gen_ai.operation.name": "chat",
            "gen_ai.system": "anthropic",
            "agent.run_id": ctx.run_id,
            "agent.task_type": classify_task(task),   # <- critical
            "agent.tenant_id": ctx.tenant_id,
            "agent.entry_point": ctx.entry_point,
        })
        try:
            outcome = _loop(task, tools, budget, ctx)
            run.set_attributes({
                "agent.outcome": outcome.kind,          # completed|escalated|aborted
                "agent.turns": budget.turns,
                "agent.tool_calls": budget.tool_calls,
                "agent.cost_usd": budget.cost_usd,
                "agent.max_repeat_count": outcome.max_repeat,
            })
            return outcome
        except BudgetExceeded as e:
            run.set_attributes({"agent.outcome": "aborted", "agent.abort_reason": e.limit})
            raise
```

`agent.task_type` is the attribute that converts traces from anecdotes into
analysis. Without it, your dashboard says "87% completion" across a population
of wildly different tasks. With it, you discover completion is 97% for
`order_status` and 41% for `billing_dispute`, which is an actionable finding and
also the thing you would have found eventually by reading complaints.

Classify cheaply and deterministically — a keyword rule or a small classifier.
Do not use the agent itself to classify its own task type; you need this
attribute to be reliable when the agent is misbehaving.

The [OpenTelemetry GenAI semantic conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/)
define standard names for the model-call attributes (`gen_ai.*`). Use them for
anything they cover so your traces are portable across tooling, and namespace
your own under `agent.*`.

## Artefact 2: the golden set, built from production

Thirty to a hundred real tasks with known-correct outcomes. Not invented tasks —
invented ones are systematically easier, because you write them in the
vocabulary your system already handles.

Harvest from traces:

```python
def harvest_candidates(window_days=14, per_type=12):
    """Pull a stratified sample for human labelling. Deliberately
    oversamples failures, because that is where the information is."""
    buckets = {}
    for run in traces.query(window_days=window_days):
        key = (run["agent.task_type"], run["agent.outcome"])
        buckets.setdefault(key, []).append(run)

    sample = []
    for (task_type, outcome), runs in buckets.items():
        # 2:1 weighting toward non-completed outcomes
        n = per_type if outcome == "completed" else per_type * 2
        sample.extend(random.sample(runs, min(n, len(runs))))
    return sample
```

Then a human labels each: what *should* have happened. This is a day of
someone's time and there is no substitute for it. LLM-as-judge is useful for
scaling a rubric you have already validated against human labels; it is not
useful for establishing the rubric, because its failure modes correlate with the
agent's.

Store each case with the full input context, not just the question:

```python
@dataclass
class GoldenCase:
    id: str
    task_type: str
    input: dict                  # full context, incl. tenant state at the time
    expected_outcome: str        # completed | escalated
    expected_assertions: list    # see below
    notes: str                   # why a human judged it this way
```

**Assertions, not expected strings.** An agent's output is non-deterministic
prose; string-matching it produces a test suite that fails on paraphrase. Assert
on properties:

```python
expected_assertions = [
    Contains("refund"),                      # mentions the right concept
    MentionsAmount(142.50),                  # gets the number right
    NotContains("account number"),           # no PII leakage
    CalledTool("get_order"),                 # did the necessary lookup
    DidNotCallTool("issue_refund"),          # did NOT act autonomously
    ToolCallCountAtMost(6),                  # didn't flail
    Escalated(),                             # handed off appropriately
]
```

`CalledTool` / `DidNotCallTool` assertions are where most of the real value is.
Behavioural assertions on the trajectory are far more stable than assertions on
the final text, and they catch the failures you actually care about — an agent
that reaches the right answer by calling `issue_refund` twice is not a success.

## Artefact 3: the regression gate

Run the golden set on every prompt change, tool change, and model version
change. Block the deploy on regression.

```python
def evaluate(golden_set, agent_version):
    results = []
    for case in golden_set:
        trace = run_agent_isolated(case.input, record_trace=True)
        passed = [a for a in case.expected_assertions if a.check(trace)]
        results.append({
            "case_id": case.id,
            "task_type": case.task_type,
            "assertions_passed": len(passed),
            "assertions_total": len(case.expected_assertions),
            "hard_failures": [
                a for a in case.expected_assertions
                if a.is_hard and not a.check(trace)
            ],
            "cost_usd": trace.cost_usd,
            "tool_calls": trace.tool_call_count,
        })
    return summarise(results)
```

The gate has three conditions, and the second is the one teams forget:

```python
def gate(current, baseline):
    failures = []

    # 1. No hard-assertion failures, ever. PII leakage, autonomous
    #    irreversible actions, wrong monetary amounts.
    if current.hard_failures > 0:
        failures.append(f"{current.hard_failures} hard assertion failures")

    # 2. No per-task-type regression, even if the aggregate improved.
    #    This is the one that catches "fixed refunds, broke returns".
    for task_type, score in current.by_task_type.items():
        prior = baseline.by_task_type.get(task_type)
        if prior and score < prior - 0.05:
            failures.append(f"{task_type} regressed {prior:.2f} -> {score:.2f}")

    # 3. Cost did not balloon for equivalent quality.
    if current.mean_cost > baseline.mean_cost * 1.3:
        failures.append(f"cost +{(current.mean_cost/baseline.mean_cost - 1):.0%}")

    return failures
```

Condition 2 exists because prompt engineering is a zero-sum game more often than
anyone admits. You add an instruction to handle billing disputes better, the
model reweights, and order-status handling quietly degrades. The aggregate score
goes up. The per-type breakdown shows what you actually did.

I would go further: **treat the prompt as code under review**, with the eval
diff attached to the pull request:

```
$ make eval
  baseline: prompt@a3f9c21   current: prompt@HEAD
  
  task_type          baseline  current   delta
  order_status          0.97     0.91    -0.06  REGRESSION
  billing_dispute       0.41     0.78    +0.37
  refund_request        0.88     0.89    +0.01
  address_change        0.94     0.94     0.00
  ---
  aggregate             0.80     0.88    +0.08
  mean cost/task       $0.031   $0.047   +52%   WARN
  hard failures            0        0
  
  GATE: FAILED (order_status regression; cost +52%)
```

That output makes the trade-off explicit and arguable. "Aggregate +8%" would have
shipped it.

## Online: shadow mode, then ramp

Offline evals tell you about the distribution you sampled. Production has a
different one.

**Shadow mode** before anything user-facing: run the new version alongside the
current one, serve the current answer, record both, diff them. The disagreement
rate is your risk estimate, and inspecting fifty disagreements is the fastest
way to find out whether the new version is better or differently-wrong.

**Then ramp by task type, not by percentage.** 5% of all traffic exposes every
task type to the new version. 100% of `order_status` and 0% of everything else
limits the blast radius to the category you have the most evidence about, and it
is much easier to interpret.

Keep the kill switch reachable without a deploy. You will use it.

## The minimum viable version

If this is more than you can build this quarter, the order of return:

1. **Traces with `task_type` and `outcome`.** A day's work. Converts "users seem
   happy" into a number per category.
2. **Thirty golden cases with behavioural assertions.** Another day, mostly
   labelling. This is what makes change safe.
3. **The per-task-type regression gate.** An afternoon, once you have 1 and 2.

That is three days for a practice that holds up for years. Steps 1 and 2 in
either order; step 3 is worthless without both.

For a grounded view of which agent deployments are actually in production and
earning their keep — which is a useful corrective if your roadmap has eleven
agent initiatives on it — Pixorama's survey of
[where agents are actually being deployed](https://pixoramagroup.com/blog/ai-agents-for-business-use-cases)
is a reasonable reality check. And if you are evaluating a vendor platform
rather than building, their buyer's guide on what
[survives real production traffic](https://pixoramagroup.com/blog/conversational-ai-platform-buyers-guide)
asks most of the right questions, particularly about whether you can export
your own traces — which, if you cannot, means you cannot build any of this.

The same test applies to agencies. Pixorama's guide to
[choosing an AI automation agency](https://pixoramagroup.com/blog/best-ai-automation-agencies-in-the-usa-and-australia-for-2026-how-to-c)
separates firms that build from firms that resell, and the cleanest version of
that question is this post's subject: ask what they measure, and whether you
get the traces. An agency that cannot show you a per-task-type breakdown of
their last deployment is describing a demo.

The one-line version: instrument `task_type`, label thirty real cases, gate on
per-type regression. Everything else in agent evaluation is refinement on top of
those three.
