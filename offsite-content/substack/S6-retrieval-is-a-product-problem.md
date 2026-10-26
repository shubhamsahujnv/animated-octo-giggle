---
platform: Substack
post_id: S6
week: 5
title: "Issue 6: Retrieval is a product problem"
subtitle: "The RAG prototype works on 200 documents and falls apart on 10,000. The fix is not technical, or not mostly."
target_keyword: "rag" cluster — "what is rag in ai", "rag vs fine tuning"
canonical: NONE — original
compliance_note: |
  Stands alone. Two main-site links placed as references.
outbound_links:
  - url: https://pixoramagroup.com/blog/rag-that-survives-contact-with-users
    anchor: "retrieval that survives contact with real users"
    type: exact-adjacent
  - url: https://pixoramagroup.com/blog/what-is-rag-in-ai
    anchor: "a plain-English explanation of what RAG is doing"
    type: descriptive
cross_link: H4
---

# Issue 6: Retrieval is a product problem

The RAG prototype works. Two hundred documents, embeddings in a vector store,
and the answers are good enough that somebody says "production".

At 10,000 documents it falls apart. Not gradually — the answers become
confidently wrong, which is worse than becoming vague.

The engineering fixes for this are real and I will summarise them. But the
reason I have titled this issue the way I have is that on the three RAG systems
I have worked on, **the binding constraint was never the retrieval
algorithm.** It was the corpus, and the corpus is a product decision.

## The technical half, briefly

Three things break, in order.

**Chunks lose their context.** The standard 1,000-character sliding window
produces chunks like:

> "...this does not apply where the account has been dormant for more than 90
> days. In those cases the holder must re-verify before any withdrawal..."

What is that about? "This" refers to something 1,400 characters earlier, in a
different chunk. No product name, no section, no document title. At 200
documents it retrieves anyway, because nothing else mentions dormancy. At 10,000
there are 340 chunks mentioning dormancy across 60 products and this one has
nothing to distinguish it.

The fix is to put the context *into* the chunk before embedding it — document
title, product, section path, prepended as a header. In my experience this one
change is worth more than every other retrieval improvement combined, and it is
an afternoon.

**Top-k is the wrong primitive.** `top_k=5` means "always return five things
whether or not any are relevant". At scale, three of the five are superficially
similar and wrong, and the model uses them, because it has no way to know they
are irrelevant. Retrieve fifty, rerank with a cross-encoder, cut at a relevance
floor. **Returning fewer than five is a feature. Returning none and saying so is
a feature.**

**Nobody notices it broke.** The system produces fluent answers throughout. You
need thirty to a hundred real questions with known-correct source documents, run
on every change, gating deploys.

That is the engineering, and it is genuinely most of what people need to hear.
My colleagues wrote up the production side of this as
[retrieval that survives contact with real users](https://pixoramagroup.com/blog/rag-that-survives-contact-with-users),
and if you are debugging a system right now that is the more immediately useful
read.

## The product half, which is the actual problem

Here is what happened on all three systems, and it took me until the third to
recognise the pattern.

We built retrieval over "the company's documentation". Quality was mediocre. We
improved chunking, added reranking, added hybrid search, built the golden set.
Quality got better. Still mediocre.

Then we looked at what we were retrieving *from*, properly, and found:

- **Four versions of the same policy**, three superseded, none marked as such.
  Retrieval was correctly finding the most semantically similar one, which was
  from 2021.
- **Documents that contradicted each other**, because two departments had
  written guidance independently and nobody had reconciled them. No retrieval
  system resolves that; it is not a retrieval question.
- **Answers that existed only in people's heads.** About 20% of the questions
  users asked had no answer anywhere in the corpus. Support staff improvised,
  and the improvisations were inconsistent and mostly fine.
- **Documents written for a different reader.** Internal process docs written
  for someone who already knows the product, retrieved to answer a question from
  someone who does not.

None of that is fixable by better retrieval. It is fixable by deciding what the
corpus is, which is a product and editorial decision about what your company
asserts to be true.

## The forcing function

On one of these, the most valuable thing the project produced was not the
system. It was the process of asking for fifty real questions with correct
answers.

It took eleven weeks to get them. Not because anyone was slow — because:

- Support, sales and product disagreed about correct answers to roughly a third.
- Several correct answers depended on the customer's contract, which meant the
  answer was a function, not a string.
- Four had answers the legal team would not approve in writing.
- Six had no answer anywhere in the company.

By the end, the company had agreed answers to its fifty most common questions,
which it had never had. The support team got measurably better *before* the AI
system shipped.

And the architecture had become obvious: retrieval over the newly-written
canonical answers; the contract-dependent questions routed to a deterministic
lookup because they were not a language problem; the legally-sensitive ones
escalated to a human by design.

We could not have chosen that architecture in week one. The information did not
exist.

## What this means for how you scope one

The implication I would draw, and it runs against how these projects are
usually planned:

**A RAG project is a content project with a retrieval system attached.**

The engineering is maybe a third of the work. The rest is deciding what your
company's canonical answers are, writing the ones that do not exist, retiring
the superseded versions, and reconciling the contradictions — and all of that
requires authority to decide what is true, which engineering does not have.

So the two questions I would ask before starting:

1. **Who can decide what the correct answer is?** If the answer is "it depends
   which department you ask", you have found the project's real first phase.
2. **Is anyone willing to retire documents?** A corpus that only grows will
   degrade indefinitely, because every superseded document competes with its
   replacement. This needs an owner and it is nobody's favourite job.

If both answers are unsatisfying, the retrieval work will produce a system that
faithfully surfaces your organisation's existing confusion. Which is, to be fair,
diagnostically useful — but it is not what was in the business case.

## The uncomfortable version

The most useful framing I have for this: **a retrieval system is a mirror.** It
will show you, with uncomfortable precision, that your documentation is four
years out of date, that two departments disagree, and that a fifth of what your
customers ask is answered by institutional memory rather than by anything
written down.

Teams respond to that by tuning the retrieval, because the retrieval is the part
they own. It does not help. You cannot rank your way out of a corpus that
contains three contradictory answers; whichever one you surface, you are wrong
two-thirds of the time, and the better your retrieval the more confidently you
are wrong.

The grounding for all this — what retrieval is actually doing, and why it beats
retraining for knowledge that changes — is explained more patiently than I have
managed here in
[a plain-English explanation of what RAG is doing](https://pixoramagroup.com/blog/what-is-rag-in-ai),
which is a reasonable thing to send a non-technical stakeholder who is about to
sponsor one of these.

My one practical recommendation: before any engineering, spend two weeks getting
fifty real questions and their agreed answers. If that takes eleven weeks
instead, you have learned the most important thing about the project, and you
have learned it for the price of two weeks rather than two quarters.

Next issue: how to buy engineering capacity, and the four contract clauses that
took me two failures to work out.

---

*I am an engineer at [Pixorama](https://pixoramagroup.com/). Three RAG systems,
anonymised; the eleven-week figure is from one of them and I have rounded
nothing about it, because it is the detail I most want people to believe.*
