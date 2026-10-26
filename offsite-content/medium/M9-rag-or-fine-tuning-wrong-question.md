---
platform: Medium
post_id: M9
week: 5
title: "RAG or fine-tuning is the wrong first question"
subtitle: "It gets asked in week one of every AI project. The answer is almost always 'neither, yet', and the real first question is much less interesting."
tags: [artificial-intelligence, machine-learning, llm, rag, technology]
target_keyword: "rag vs fine tuning" (480/mo)
canonical: NONE — original post
distribution_notes: |
  Reframing essay. Takes a widely-asked question and argues it is premature,
  with a replacement framework. Original argument, no summarising.
outbound_links:
  - url: https://pixoramagroup.com/blog/rag-vs-fine-tuning
    anchor: "RAG vs fine-tuning in 2026"
    type: exact-adjacent
  - url: https://pixoramagroup.com/blog/rag-that-survives-contact-with-users
    anchor: "retrieval that survives contact with real users"
    type: exact-adjacent
bio_link: https://pixoramagroup.com/blog
cross_link: H4
---

# RAG or fine-tuning is the wrong first question

It comes up in week one, every time. Someone has read that there are two
approaches to making a language model work on your data, and they want to know
which one the project is going to use, so it can go on the architecture slide.

The honest answer is "neither, probably, and certainly not yet", and the reason
is that the question assumes a problem shape that most projects do not have.

## What the two things actually do

Worth being precise, because the question is usually asked with a slightly wrong
model of both.

**Retrieval augments the model's *knowledge*.** At inference time you find
relevant documents and put them in the prompt. The model's behaviour does not
change; its available facts do. Knowledge updates the moment you update the
documents.

**Fine-tuning changes the model's *behaviour*.** You train on examples, and the
model learns a format, a tone, a task structure, a classification scheme. It is
poor at learning facts — you can teach a model that your return policy is 30
days and it will reproduce that with roughly the reliability of a half-remembered
fact, which is to say, not reliably enough for a policy.

So the actual distinction is **knowledge versus behaviour**, and framed that way
the question answers itself in most cases: if your problem is "the model does not
know our stuff", that is retrieval. If your problem is "the model does not do the
task in the right shape", that is fine-tuning. These are rarely the same problem
and they are not alternatives.

But that still is not the first question.

## The first question

**What does the correct output look like, and who decides?**

This sounds trivially simple and it is where projects fail. Not at the model
layer — at the specification layer.

A worked example. A client wanted an assistant that answered customer questions
about their products. Reasonable. We asked for fifty real questions with
correct answers.

It took eleven weeks to get them.

Not because anyone was slow. Because:

- Support, sales and the product team disagreed about correct answers to about a
  third of the questions.
- Several correct answers depended on the customer's contract, which meant the
  "correct answer" was a function, not a string.
- Four questions had answers that were correct but the legal team would not
  approve in writing.
- Six had no answer anywhere in the company; support staff improvised, and the
  improvisations were inconsistent and mostly fine.

By the time we had the fifty questions, the project had changed shape entirely.
About 40% of the value turned out to be in the *forcing function* — the company
now had agreed answers to its fifty most common questions, which it had not had
before, and which made the support team measurably better regardless of the AI.

And the technical approach had become obvious: retrieval over the newly-written
canonical answers, no fine-tuning, with contract-dependent questions routed to a
deterministic lookup because they were not a language problem at all.

We could not have chosen that architecture in week one. Nobody could have. The
information required to choose it did not exist.

## Why the question gets asked anyway

Three reasons, all structural rather than foolish:

**It is the only question with two named answers.** "RAG or fine-tuning" is
tractable. "What does correct look like" is an open-ended organisational
question that implicates several departments. People reach for the tractable one.

**It feels like an architecture decision, and architecture decisions are
supposed to come first.** But this is not architecture; it is implementation
detail. The architecture decision is what the system is for and what it is
allowed to do.

**Vendors ask it.** If you are evaluating platforms, they ask which approach you
need, because their product is better at one. That pushes the question earlier
than it belongs.

## The sequence I would actually follow

**1. Write down fifty real inputs and their correct outputs.** Real ones,
harvested from what users actually ask — not invented, because invented examples
are systematically easier and use your own internal vocabulary.

Expect this to be hard, slow and politically awkward. That difficulty is
information: it tells you the specification does not exist, and no model choice
compensates for that.

**2. Notice what the disagreements are about.** This is the highest-value output
of step one. Disagreements fall into categories:

- *We never decided* → you have a policy gap, and the AI project just found it
- *It depends on the customer* → deterministic lookup, not a language problem
- *Legal will not approve a written answer* → out of scope, route to a human
- *Genuinely ambiguous* → the system must be allowed to say so

Each category has a different solution and only one of them is a model problem.

**3. Now classify what remains.** With the fifty cases in hand, the technical
question is finally answerable:

- Outputs require facts from your corpus → retrieval
- Outputs require a consistent non-obvious structure or style → fine-tuning,
  possibly
- Outputs require multi-step work whose steps vary → an agent, maybe
- Outputs are a deterministic function of structured inputs → **not AI**. Write
  the function.

In my experience the split lands around: 60% retrieval, 25% not-AI-at-all, 10%
agent-shaped, 5% genuine fine-tuning candidates. The 25% is the surprising one
and it is pure profit — the cheapest, most reliable part of the system is the
part you did not build with a model.

**4. Build the evaluation before the system.** Your fifty cases are now a test
suite. This is the thing that makes every later decision empirical instead of
argumentative.

**5. Then pick retrieval or fine-tuning**, and discover that it was not a
difficult decision once steps one to four were done.

## When fine-tuning is genuinely right

To be fair to it, since I have been dismissive. Fine-tuning earns its place
when:

- You need a **consistent output format** that is awkward to prompt reliably — a
  specific JSON shape, a house style, a classification into forty categories
  with subtle boundaries.
- You have **thousands of examples** of the task being done correctly, as a
  natural by-product of existing work. Not examples you would have to create.
- **Latency or cost** matters enough that a smaller fine-tuned model beating a
  large prompted one is worth the training pipeline.
- The task is **narrow and stable**. Fine-tuning a model for something whose
  definition changes quarterly means retraining quarterly.

Classification and extraction at volume are the strongest cases. Question
answering over changing documents is the weakest, and is the thing people most
often propose fine-tuning for.

The trap worth naming: **fine-tuning does not fix hallucination.** It is
frequently proposed as a solution to it, on the theory that training on correct
facts produces correct facts. It does not; it produces a model that is more
confident in the vicinity of those facts, which is worse. Hallucination is
addressed by grounding the answer in retrieved text and by letting the system
decline to answer.

Pixorama's
[RAG vs fine-tuning in 2026](https://pixoramagroup.com/blog/rag-vs-fine-tuning)
comparison is a fair treatment of the trade-off if you have reached step five
and genuinely need to choose. The thing I would add to any such comparison is
that the answer is "both, eventually, for different parts of the system" more
often than it is either one.

## The uncomfortable conclusion

The most useful AI projects I have been near spent their first month not doing AI.
They spent it establishing what correct means, which revealed that a quarter of
the scope was a deterministic rules problem, a quarter was an organisational
policy gap, and the remaining half was a well-specified retrieval problem.

The projects that started with the architecture question spent their first month
building a system and their next six discovering what it should have done.

And once you are into retrieval, the failure modes are entirely about corpus
quality, chunking and ranking rather than model choice — Pixorama's
[retrieval that survives contact with real users](https://pixoramagroup.com/blog/rag-that-survives-contact-with-users)
is about that second phase, which is where the actual engineering difficulty of
these systems lives.

So when someone asks in week one whether you are doing RAG or fine-tuning, the
useful reply is: *show me fifty questions and the answers you want.* The ensuing
eleven weeks are not a delay. They are the project.
