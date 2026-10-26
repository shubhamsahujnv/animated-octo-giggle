# Teardown: originshq.com

**Why:** shared as a reference for how to build service pages. Examined 26 October 2026.

**Short version:** take their on-page keyword placement, which is genuinely good and fixed a real
defect in our pages. Do not take their site architecture, which is the exact pattern the Service
Page Strategy for Leads was written against.

---

## 1. What their site is

| Signal | Finding |
|---|---|
| `/feeds/service/<keyword>/` pages | **9**, e.g. `rag-development-services`, `ai-agent-development-services`, `llm-development-services` |
| Other `/feeds/` pages | ~136 (comparisons, listicles, "best X companies") |
| `/locations/<city>/<service>/` pages | **303** = 35 cities x 9 services |
| Total in `page-sitemap.xml` | 345, of which 303 are location pages |

Two things follow.

**The `/feeds/service/<keyword>/` pattern is Gushwork's.** Section 1 of the strategy names it
directly: *"The URL slug holds the keyword... slug `study-abroad-consultants-bhopal`"*, served under
`/feeds/`. Our own page-build rules use `/feeds/service/cati-services` as the worked example because
that is where those pages live. originshq.com is running the same playbook.

**303 location pages is service x city multiplication**, the first entry in the strategy's
"Don't copy" column. The teardown of 1,249 such pages found **6%** ranked for their own slug, and
about **1%** for brands under 100 authority.

So the volume of pages is not evidence the approach works. It is the thing we measured and rejected.

## 2. Their two page types are not equally good

### `/services-ai/` (hand-built): do not copy

- **Four `<h1>` elements on one page**: "Reimagine today With Our Artificial Intelligence Services",
  "Reinvent Tomorrow With Our Artificial Intelligence Services", "Why Choose Our AI Consulting
  Services?", "Partner to Boost your Business with AI".
- H2s carry no keyword and little meaning: "Our USP", "Turning Business into AI-First Avatar",
  "See our Excellence being validated", and twice just "50+".
- H3s used for bare statistics ("100%", "3X") and all-caps slogans ("IIT/IIM LED EXPERTISE").
- Carries `AggregateRating` schema, the same unverifiable-rating risk we flagged on Pixorama's own
  homepage.

### `/feeds/service/rag-development-services/` (keyword page): worth learning from

Single H1, and the heading structure does the work:

| Element | Theirs |
|---|---|
| H1 | RAG Development Services for US Enterprise Search |
| Title | identical to the H1 |
| H2 | Our **RAG Development Services** for Internal Knowledge |
| H2 | Our 5-Step **RAG Development** Process |
| H2 | When a managed knowledge platform is enough |
| H2 | Why Choose Origins AI to Build Your **AI Knowledge Management System**? |
| H2 | The team that builds the retrieval layer |
| H2 | Frequently asked questions about **RAG development services** |
| H2 | Scope a **RAG Development** Pilot |

**4 of 8 H2s carry the keyword or a close variant.** Ours carried it in **0 of 7**.

Their FAQ H3s are the long-tail phrasings buyers actually type: *"What are RAG development
services?"*, *"Why do RAG development services need more than a vector database?"*, *"How much do
RAG development services cost?"*, *"Can RAG development services run inside our own network?"*

## 3. What we took, and what it fixed

| Taken | Where it landed |
|---|---|
| Keyword or close variant in every H2 | All five pages, **7 of 7** H2s each, enforced at build time |
| FAQ questions that name the service | Rewritten on all five pages, at least half per page, enforced |
| A numbered process section, step names as H3 | New section, five steps per page |
| A CTA heading that carries the keyword | "Scope a Cloud Engineering Engagement", and equivalents |
| A named-team section | Already our highest-value open proof slot; they do it, we cannot until Pixorama names engineers |
| Cost answered in the FAQ | Already planned; the FAQ is the right home for the pricing signal |

The H2 point was not originshq's insight, strictly. Section 4 of our own strategy already says
close variants belong in the body and H2s. The first draft of these pages simply did not follow it,
and the reference site made that obvious.

## 4. What we did not take

- **Service x city multiplication.** 303 pages for 35 cities. Pixorama has no office in any of them,
  and the strategy forbids pages for locations a client does not serve.
- **A `/feeds/` page farm** separate from the main site.
- **Four H1s on a page.**
- **`AggregateRating` schema** without verifiable reviews.
- **Stat H3s** ("100%", "3X") with no source.

## 5. The honest comparison

Their keyword pages are better built than our first draft on heading structure, and we have fixed
that. Their *strategy* is a volume play that our own teardown measured at a 6% hit rate, which is
why Pixorama gets five pages rather than three hundred.

Worth re-checking in two quarters: whether any of those 303 location pages actually ranks. If a
material share do, the strategy's position deserves re-examination on the evidence. That is a
measurement, not an assumption, and it is cheap to run.
