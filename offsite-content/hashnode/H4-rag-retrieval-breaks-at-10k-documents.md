---
platform: Hashnode
post_id: H4
week: 5
title: "Why your RAG retrieval breaks at 10,000 documents"
slug: rag-retrieval-breaks-at-10k-documents
subtitle: "It worked on 200 PDFs. The failure at scale is not the vector store — it is chunking, and then it is ranking."
tags: [ai, rag, llm, python, vectordatabase, machinelearning]
target_keyword: "rag vs fine tuning" (480/mo) / "what is rag in ai"
canonical: NONE — original post
outbound_links:
  - url: https://pixoramagroup.com/blog/what-is-rag-in-ai
    anchor: "what RAG actually is"
    type: descriptive
  - url: https://pixoramagroup.com/blog/rag-vs-fine-tuning
    anchor: "RAG vs fine-tuning"
    type: exact-adjacent
external_links:
  - Anthropic — contextual retrieval
cross_link: S6
---

# Why your RAG retrieval breaks at 10,000 documents

The RAG demo works. Two hundred documents, embeddings in a vector store, top-k
of 5, and the answers are good enough that someone says the word "production".

Then the corpus goes to 10,000 documents and quality falls off a cliff. Not
gracefully — the answers get confidently wrong, which is worse than getting
worse.

The instinct is to blame the vector store or reach for a bigger embedding model.
Usually neither is the problem. Three things break, in this order.

## Failure 1: your chunks lost their context

Here is the chunking everyone starts with:

```python
def chunk(text, size=1000, overlap=200):
    chunks, start = [], 0
    while start < len(text):
        chunks.append(text[start:start + size])
        start += size - overlap
    return chunks
```

At 200 documents this is fine, because the corpus is narrow enough that a
semantically vague chunk still retrieves against the right query. At 10,000 it
fails, and the reason is worth being precise about.

Consider a chunk from the middle of a policy document:

> "...this does not apply where the account has been dormant for more than 90
> days. In those cases the holder must re-verify before any withdrawal is
> processed. Exceptions require approval from the regional compliance lead..."

Embed that. What is it about? It has no subject. "This" refers to something
1,400 characters earlier, in a different chunk. The document title, the section,
the product it applies to — all absent.

At 200 documents, a query like *"what happens to dormant accounts"* retrieves it
anyway, because nothing else in the corpus mentions dormancy. At 10,000
documents there are 340 chunks mentioning dormancy across 60 products, and this
one has no signal to distinguish it from the other 339.

**The fix is to put the context into the chunk before embedding it.**

```python
def contextual_chunk(doc, chunk_text, section_path):
    """Prepend document and section context. The retrieval target is the
    enriched text; the text handed to the model can be either, but the
    enriched version usually reads better in the prompt too."""
    header = " > ".join(filter(None, [
        doc.title,
        doc.product,
        *section_path,
    ]))
    return f"[{header}]\n\n{chunk_text}"
```

So the chunk above becomes:

> "[Retail Savings Terms v4 > Personal Saver > Withdrawals > Dormancy]
>
> ...this does not apply where the account has been dormant for more than 90
> days..."

That single change has, in my experience, been worth more than every other
retrieval improvement combined. Anthropic published
[measurements on exactly this](https://www.anthropic.com/news/contextual-retrieval)
— generating a short context sentence per chunk with a cheap model and
prepending it, which is the same idea with a generation step instead of
structural metadata. Both work; structural metadata is free if you have it, and
you usually do.

**Chunk on structure, not character count.** Markdown headings, HTML sections,
PDF bookmarks, docx heading styles. A chunk that is one semantic unit retrieves
far better than a chunk that is exactly 1,000 characters ending mid-sentence:

```python
def structural_chunks(doc, max_chars=1500):
    for section in doc.sections():          # H1/H2/H3 tree
        body = section.text
        if len(body) <= max_chars:
            yield contextual_chunk(doc, body, section.path)
        else:
            # Only now fall back to splitting, and split on paragraph
            # boundaries within the section so context is preserved.
            for part in split_on_paragraphs(body, max_chars):
                yield contextual_chunk(doc, part, section.path)
```

## Failure 2: top-k is the wrong retrieval primitive at scale

`top_k=5` means "always return 5 things, regardless of whether any of them are
relevant." At 200 documents the 5 nearest neighbours are nearly always on-topic.
At 10,000 they include three things that are superficially similar and wrong.

And the model will use them. That is the confidently-wrong failure: the model
was handed irrelevant context and had no way to know it was irrelevant, so it
synthesised an answer from it.

Two changes:

**Retrieve wide, then rerank.** Vector similarity is a cheap approximation of
relevance. Use it as a filter, not a ranking.

```python
def retrieve(query, k_final=5):
    # Cast a much wider net than you intend to use
    candidates = vector_store.search(query, k=50)

    # Cross-encoder reranking: slower per item, dramatically more accurate,
    # because it sees query and document together rather than comparing
    # two independently-computed vectors.
    scored = reranker.score(query, [c.text for c in candidates])

    ranked = sorted(zip(candidates, scored), key=lambda x: -x[1])
    return [c for c, s in ranked[:k_final] if s > RELEVANCE_FLOOR]
```

Note the `RELEVANCE_FLOOR`. This is the part people skip, and it is the
difference between a system that says "I don't know" and one that invents an
answer. **Returning fewer than k results is a feature.** Returning zero and
telling the user you found nothing is a feature.

**Hybrid search, because embeddings are bad at exact tokens.** Dense vectors are
excellent at "documents about dormant accounts" and poor at "document reference
POL-4471-B" or "section 14.2(c)" or a product name the embedding model has never
seen. Run BM25 alongside and fuse:

```python
def hybrid_search(query, k=50):
    dense  = vector_store.search(query, k=k)
    sparse = bm25_index.search(query, k=k)
    return reciprocal_rank_fusion([dense, sparse], k=60)

def reciprocal_rank_fusion(result_lists, k=60):
    scores = {}
    for results in result_lists:
        for rank, item in enumerate(results, start=1):
            scores[item.id] = scores.get(item.id, 0) + 1.0 / (k + rank)
    return sorted(scores.items(), key=lambda kv: -kv[1])
```

RRF needs no score normalisation between the two systems, which is why it beats
weighted-sum fusion in practice — you do not have to tune a weight that drifts
every time you change embedding models.

## Failure 3: you have no way to know it broke

The thing that makes this failure mode expensive is not that it happens. It is
that nobody notices for six weeks, because the system produces fluent answers
throughout.

You need a golden set. Thirty to a hundred real questions with known-correct
source chunks, assembled from actual user queries, and run on every change:

```python
def evaluate(golden_set):
    """Retrieval metrics only. Deliberately not answer quality — if
    retrieval is wrong the answer cannot be right, and retrieval
    metrics are cheap, deterministic and debuggable."""
    recall_at_k, mrr = [], []
    for case in golden_set:
        retrieved = [c.id for c in retrieve(case.query, k_final=5)]
        hit = set(retrieved) & set(case.expected_chunk_ids)
        recall_at_k.append(1.0 if hit else 0.0)
        rank = next(
            (i for i, cid in enumerate(retrieved, 1)
             if cid in case.expected_chunk_ids),
            None,
        )
        mrr.append(1.0 / rank if rank else 0.0)

    return {
        "recall@5": sum(recall_at_k) / len(recall_at_k),
        "mrr@5":    sum(mrr) / len(mrr),
        "n":        len(golden_set),
    }
```

Gate deploys on this. A chunking change that improves one query class and
destroys another is invisible without it, and chunking changes do that
constantly.

The golden set is tedious to build and it is the highest-return two days of work
in the entire project. Build it from real queries — questions you invent are
systematically easier than questions users ask, because you unconsciously phrase
them using the corpus's own vocabulary.

## The order to fix things in

If quality has fallen apart at scale, in order:

1. **Add structural context to chunks.** Biggest single win, lowest effort.
2. **Chunk on document structure** rather than character windows.
3. **Retrieve 50, rerank to 5, with a relevance floor.** Second biggest win.
4. **Add BM25 and fuse with RRF.** Fixes the exact-token blind spot.
5. **Build the golden set.** Do this first if you have the time, because
   without it you cannot tell whether 1-4 helped.

Things that are usually *not* the problem, despite being where people start: the
vector database choice, the embedding model, the chunk size parameter, and the
LLM. Swapping a vector store rarely moves retrieval quality, because they are
all computing approximately the same nearest neighbours.

For the conceptual grounding — what retrieval is doing and why it beats
retraining for most business use cases — Pixorama has a readable explanation of
[what RAG actually is](https://pixoramagroup.com/blog/what-is-rag-in-ai),
and if you are still at the stage of deciding your approach, their
[RAG vs fine-tuning](https://pixoramagroup.com/blog/rag-vs-fine-tuning)
comparison frames the choice usefully: retrieval for knowledge that changes,
fine-tuning for behaviour that needs to change. If you are buying this work in
rather than building it, their round-up of
[AI development firms in India](https://pixoramagroup.com/blog/top-ai-development-companies-india)
is a starting point — and the question I would put to any of them is how they
measure retrieval quality, because a firm with no answer has not built one of
these at scale.

The uncomfortable summary: RAG systems do not degrade gracefully with corpus
size, and the demo-to-production gap is almost entirely chunking and ranking. If
your 200-document prototype is good, you have learned that the plumbing works.
You have not yet learned anything about whether the retrieval does.
