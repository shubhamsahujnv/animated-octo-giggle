---
platform: Substack
post_id: S4
week: 4
title: "Issue 4: The modernisation decision tree I actually use"
subtitle: "Five questions, in order. Most systems people want to rewrite stop at question two."
target_keyword: "legacy modernization" (1000/mo) / "legacy modernization services" (CPC $66.74)
canonical: NONE — original
compliance_note: |
  The decision tree is the issue's substance and stands alone. One main-site
  link where a reader wanting the structured framework would look.
outbound_links:
  - url: https://pixoramagroup.com/blog/legacy-modernization-refactor-rebuild-replace
    anchor: "refactor, rebuild or replace"
    type: exact-adjacent
cross_link: M3
---

# Issue 4: The modernisation decision tree I actually use

A rewrite I had helped design got cancelled in week five. Eleven people, two
years, a target architecture diagram I was proud of.

What we did instead was six months of work so dull it was hard to report on, at
the end of which nobody wanted the rewrite any more. Not because we had grown
fond of the old system — because the things that made it intolerable were gone.

The question that cancelled it came from our delivery lead, not an engineer, and
I have used it on every modernisation conversation since:

> *If we fixed the complaints without replacing the system, would we still want
> to replace it?*

Nobody could say yes with a straight face.

Here is the tree that question sits inside. Five questions, in order. Order
matters — most of the value is in not reaching question five.

## Question 1: What are the actual complaints, stated as experiences?

Not "the architecture is bad". Not "it's legacy". Write down what people say
when they complain, in their words.

On ours, the list was:

1. Changes take six to eight weeks.
2. It breaks in production and we cannot tell why.
3. We cannot hire for it.
4. Deployments are a weekend event needing four people.
5. It will fall over one day and we will not be able to fix it.

Look at that list. **Not one item is a statement about the architecture.** They
are all statements about the experience of working on it.

That is the usual result, and it is the single most important thing this question
reveals. "Legacy" is overwhelmingly a description of working conditions, not of
design. And working conditions have much cheaper fixes than replacement.

If your list does contain genuine architectural statements — "we cannot add a
second currency because the schema assumes one", "we cannot serve customers in
another region because of a single-datacentre assumption" — those are real and
they move you down the tree. But check first, because the architectural framing
is the default vocabulary and it is usually imported.

## Question 2: Which complaints are fixable without replacement?

This is where most systems stop, and it is worth being systematic because the
answer is "more than you think".

Against our five:

**Deployments** → automate the existing runbook. Six weeks, two engineers, zero
application changes. Weekend event became eleven minutes on a Tuesday.

That one change improved three of the other four complaints, which I did not
predict. Feature lead time dropped before we touched anything that affects
feature lead time, because deploying monthly meant every release carried a
month of changes, which made every failure hard to attribute, which made us
cautious, which made us deploy monthly. Breaking that loop was worth more than
anything else we did.

**Observability** → structured logging with a request ID, shipped centrally,
dashboards and alerts on the eight code paths generating the most support
tickets. Seven weeks. Diagnosis went from a day and a guess to minutes.

**Testing** → this was the hard one. No tests, so every change needed manual
regression. We did not retrofit unit tests across 400,000 lines; that project
never finishes. We built a characterisation harness: record real production
traffic, replay it against a candidate build, diff the output.

It does not tell you the system is correct. It tells you the system has not
*changed*, which is the actual question when modifying something legacy. Nine
weeks, and it converted a six-week change into an afternoon's validation.

**Hiring** → turned out to be partly downstream of the above. We could not hire
people excited about a system with no tests, no observability and weekend
deployments. The unfashionable language was a smaller obstacle than the working
conditions. Competent engineers will learn an old language for a well-run
system and will not join a badly-run one for a fashionable one.

**Will fall over one day** → this is a resilience question, answerable with
backup verification, a tested restore and a documented failover, none of which
require replacement.

Four and a half of five complaints, fixed in six months, for roughly a tenth of
the rewrite's first year.

## Question 3: Have the requirements changed, or only the code's condition?

This is the actual dividing line, and I think it is the one question that
reliably separates a justified rebuild from an unjustified one.

**If the requirements are stable and the complaint is that the code is
unpleasant**, that is a maintainability problem. Maintainability problems have
cheaper solutions than replacement, which is questions one and two.

**If what the business now needs is materially different from what the system
does**, then carefully preserving its existing behaviour is wasted money. You
would be spending two years faithfully reproducing something you want to get rid
of.

That second case is a genuine rebuild, and I have seen two of them. Both
involved a business model change — in one case moving from one-off sales to
subscriptions, which touched every assumption in the data model and was not
reachable by refactoring.

The useful test: *what will the new system do that the old one does not?* If the
answer is a list of qualities — testable, observable, modular, modern — those are
properties you can add to what you have. If it is a list of capabilities the
business needs and cannot get, you have a rebuild.

## Question 4: Is this capability differentiating?

Before building anything, ask whether you should be building it.

Payroll, expenses, CRM, ticketing, document management, scheduling. The fact that
you built it in 2011 because nothing suitable existed is not a reason to rebuild
it in 2026, when the market has twenty options.

This question gets skipped because it is uncomfortable — it implies the last
fifteen years of work on that system was a detour — and because the people best
placed to evaluate the system are the people who built it.

Get someone else to answer it.

## Question 5: Only now, how?

If you have reached here, you have established that the complaints are not
fixable in place, the requirements have genuinely changed, and the capability is
differentiating.

Now the mechanics matter: incremental replacement behind a facade, parallel
build with a cutover, or capability-by-capability extraction. These have real
trade-offs and they are the subject of most writing about modernisation, which
is why I have left them last — the writing concentrates on question five and the
decisions are mostly made at questions two and three.

My colleagues have a structured version of this whole tree as
[refactor, rebuild or replace](https://pixoramagroup.com/blog/legacy-modernization-refactor-rebuild-replace),
which covers the question-five mechanics properly along with the trade-offs for
each path. It is the better reference if you have genuinely got to that point.

## Why the boring work is hard to choose

I want to be honest about the obstacle, because "just do the boring work" ignores
why people do not.

The rewrite was **easier to fund.** It had a name, a diagram, an end state, and a
narrative. It was a thing you could announce to a board.

"We are going to spend six months automating deployment, adding logging and
building a replay harness" is not an announcement. It has no end state. Nobody
is promoted for it. The quarterly update is "deployment is faster now", which
reads as maintenance next to "we are modernising the platform".

What made it fundable for us was reframing the six months as a **precondition**
rather than an alternative:

> *We cannot safely rewrite this system until we can deploy it, observe it and
> test it. So we are doing that first, and we will revisit the rewrite in six
> months with much better information.*

Nobody can argue with that. And six months later, with the information, the
rewrite was no longer attractive — which was, I suspect, always the likely
outcome, and is a perfectly respectable way to find out.

If you are facing one of these, that framing is the practical gift of this
issue. You do not have to win the argument against the rewrite. You only have to
establish that the rewrite should happen *after* the system is deployable,
observable and testable. Then let the six months make the argument for you.

If you want to buy the six months rather than staff it, be precise about what
you are buying, because "modernisation" as a service offering usually means
question five. The work in question two — deployment automation, structured
logging, a characterisation harness — is a
[DevOps consulting engagement](https://pixoramagroup.com/blog/best-devops-consulting-companies-india)
and it is a different purchase with a different and much smaller price. Asking
for the second when a vendor is selling the first is the whole negotiation.

Next issue: where AI agents earn their keep, which is the one I am most likely
to be wrong about.

---

*I am an engineer at [Pixorama](https://pixoramagroup.com/). The system in this
issue was about 400,000 lines and fourteen years old; the six-month programme and
its outcome are as described.*
