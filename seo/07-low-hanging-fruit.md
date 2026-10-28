# Low-Hanging Fruit — Easy-to-Target Keywords

A second research pass run specifically for winnability, using Ubersuggest's domain filter
(`pixoramagroup.com`) so results are constrained to difficulty achievable at Domain Authority 6,
rather than my judgement of what looked soft.

It changed three of my earlier recommendations. Those corrections are in section 2 — they matter
more than the new long-tail list.

**How I filtered.** The domain-filtered output is flooded with SD 4–6 terms at 0–10 volume, much
of it nonsense from unrelated industries ("bicycle pump saas development", "panty liner saas
development" — Ubersuggest template spam, not real queries). Ranking #1 for a 0-volume keyword
is worth nothing. So I kept only terms that are **relevant to Pixorama's actual services**, have
**≥20 monthly searches**, and **SD ≤ 27**. Everything below passes all three.

---

## 1. The headline finds

| Keyword | Volume | SD | CPC | Intent | Target page |
|---|---|---|---|---|---|
| **staff augmentation** | **1,900** | **11** | $53.75 | Informational | `/blog/what-is-staff-augmentation` (exists) |
| **cloud migration** | **1,000** | **14** | $40.33 | Commercial | `/services/cloud-platform-engineering` |
| ai voice agent platform | 1,000 | **7** | $46.36 | — | `/products/pxo-ai` |
| custom software development company | 2,900 | **13** | $78.98 | Commercial | Homepage |
| ai agent development company | 590–720 | **11–18** | $20–58 | Commercial | `/products` |
| healthcare software development | 480 | **23** | $46.38 | Commercial | `/industries/healthcare` |
| devops consulting | 880 | 26 | $156.26 | Commercial | `/services/cloud-platform-engineering` |
| it staff augmentation services | 720 | 27 | $428.93 | Commercial | `/engagement-models/staff-augmentation` |

`staff augmentation` is the single best opportunity on the site and I missed it in the first
pass — I had only researched the narrower `it staff augmentation services` (720 / SD 27). The
bare term is **2.6× the volume at less than half the difficulty**, and it is stable: 12-month
range 1,300–2,900, no sign of being a spike.

---

## 2. Corrections to the earlier documents

### 2.1 `staff augmentation` should be a Tier 1 priority, and the blog post is the right page

Intent is **Informational**, not commercial. People searching it want to know what staff
augmentation *is*. So the ranking asset is not the engagement-model page — it is
`/blog/what-is-staff-augmentation`, which **already exists**.

That is as cheap as SEO gets: optimise one published post rather than write anything new.

- Make the H1 target the term directly: "What Is Staff Augmentation? A Plain-English Guide"
- Answer the definition in the first 50 words, before any preamble — that is what wins the
  snippet
- Add H2s for the sibling queries found below: `staff augmentation vs staffing` (20 / SD 5),
  `what is resource and staff augmentation` (20 / SD 5), `staff augmentation roles and
  responsibilities` (10 / SD 5), `it staff augmentation cost` (20 / SD 5)
- Add FAQPage schema
- Link down to `/engagement-models/staff-augmentation` for the commercial query

This moves "optimise `what-is-staff-augmentation`" into week 1 of the sequencing plan in
document `05`.

### 2.2 Target `cloud migration`, not `cloud migration services`

Document `01` assigned `cloud migration services` (1,900 / SD 31). The shorter
**`cloud migration` is 1,000 / SD 14** — roughly half the volume at less than half the
difficulty, and winnable now where SD 31 is a 6–12 month fight.

Use `cloud migration` in the H1 and `cloud migration services` as a secondary in an H2. You pick
up both, and you rank for the achievable one first.

### 2.3 `/industries/healthcare` should move up the priority list

`healthcare software development` at **480 / SD 23** is better than I assumed when I put
industry pages in Tier 6. Healthcare also has the softest PXO AI vertical (`ai voice agent for
healthcare`, 110 / SD 15) and `conversational ai technology in healthcare` (50 / SD 5), plus an
existing blog post to link from. Three low-difficulty terms converging on one industry is a
cluster worth building early — promote it to Tier 3.

---

## 3. Quick-win long tail

Real queries, genuinely easy, grouped by the page they belong on. None of these need a new page
beyond what documents `03`–`06` already specify — they are H2/H3 sections and FAQ entries.

### 3.1 Staff augmentation cluster → `/engagement-models/staff-augmentation` + the blog post

| Keyword | Volume | SD |
|---|---|---|
| short term staff augmentation | 50 | 6 |
| it staff augmentation cost | 20 | 5 |
| it staff augmentation providers | 20 | 5 |
| staff augmentation vs staffing | 20 | 5 |
| what is resource and staff augmentation | 20 | 5 |
| project management staff augmentation | 20 | 5 |
| embedded software staff augmentation | 20 | 5 |
| staff augmentation roles and responsibilities | 10 | 5 |
| it staff augmentation challenges | 10 | 5 |

### 3.2 Cloud cluster → `/services/cloud-platform-engineering`

| Keyword | Volume | SD |
|---|---|---|
| aws devops consulting company | 110 | 5 |
| managed cloud migration services | 70 | 6 |
| cloud migration consulting firm | 70 | 5 |
| services for cloud migration | 70 | 5 |
| it cloud migration services | 50 | 5 |
| solutions for cloud migration | 40 | 5 |
| cloud migration for enterprise | 20 | 5 |
| challenges with cloud migration | 20 | 5 |
| cloud transformation vs cloud migration | 20 | 6 |
| cloud migration wave planning | 20 | 5 |
| outsourced devops consulting services | 10 | 5 |

`cloud migration services near me` (210 / SD 5) looks tempting but skip it — "near me" is a
local-intent query and you have no offices. You cannot win it honestly and it would not convert.

### 3.3 AI cluster → `/products` and `/products/pxo-ai`

| Keyword | Volume | SD |
|---|---|---|
| conversational ai voice assistants | 140 | 5 |
| ai agent development solutions | 90 | 6 |
| conversational ai technology in healthcare | 50 | 5 |
| conversational ai chatbot solution | 40 | 5 |
| conversational ai platform software | 20 | 5 |
| best conversational ai platform software | 20 | 5 |
| how to build a conversational ai | 20 | 5 |
| conversational ai in finance | 20 | 5 |
| conversational ai for contact centers | 10 | 5 |
| difference between conversational ai and chatbots | 10 | 5 |
| multi language ai voice agent | 10 | 5 |

Do **not** target the branded variants (`lindy ai voice agent` 320 / SD 5, and the retell /
elevenlabs / vapi / synthflow / bland equivalents). SD 5 and real volume, but they are
navigational searches for other companies' products. You would rank for a term whose searchers
want someone else, and the traffic will not convert.

### 3.4 Vertical software → `/industries/*`

| Keyword | Volume | SD | Page |
|---|---|---|---|
| financial custom software development | 110 | 5 | `/industries/fintech` |
| custom software development for internet of things | 110 | 6 | `/services/product-software-engineering` |
| custom software development for real estate industry | 90 | 5 | New: `/industries/real-estate` |
| transportation and logistics software development company | 30 | 5 | `/industries/logistics` |
| supply chain management logistics software | 30 | 5 | `/industries/logistics` |
| healthcare software development outsourcing | 20 | 5 | `/industries/healthcare` |
| logistics software solutions development | 20 | 5 | `/industries/logistics` |

Two of these point at verticals you have not claimed: **real estate** (90 / SD 5, plus
`ai voice agent for real estate` at 70 / SD 34) and IoT. Real estate in particular has both a
services term and a PXO AI use case — worth adding as a fifth industry page.

### 3.5 Cost and definition pages

| Keyword | Volume | SD | Page |
|---|---|---|---|
| custom software development prices | 50 | 6 | New: `/pricing` or `/resources/cost-calculator` |
| ai voice agent pricing | 70 | 15 | `/products/pxo-ai/pricing` |
| ai agent development cost | 140 | 36 | `/products` |
| what is custom software development company | 10 | 5 | `/resources/glossary` |
| custom software development definition | 10 | 5 | `/resources/glossary` |
| why custom software development | 10 | 5 | Homepage FAQ |
| a custom software development timeline includes | 10 | 5 | `/process` FAQ |

### 3.6 Australia — still the softest geography

| Keyword | Volume | SD |
|---|---|---|
| ai development company in australia | 20 | 6 |
| custom software development sydney | 10 | 5 |
| custom software development services australia | 10 | 5 |

Low volume, but near-zero difficulty, four existing Australia blog posts to link from, and
essentially no competition. Cheap to claim and it compounds as the market grows.

---

## 4. Where there is no low-hanging fruit

Worth stating plainly so nobody wastes a quarter on these:

- **MVP development** (880 / SD 37), **SaaS development** (390 / SD 38), **fractional CTO**
  (1,600 / SD 33). I swept all three and the long tail came back as either zero-volume or
  template spam. The head terms are mid-difficulty with no soft entry point. Your existing blog
  posts can chip at these, but do not build commercial pages expecting early rankings.
- **`conversational ai`** (246,000 / SD 67). Enormous and unwinnable at DA 6. Ignore the head
  term; the cluster in 3.3 is how you enter this topic.
- **`ai voice agent`** (6,600 / SD 40). Still the right H1 for PXO AI because it frames the
  page and the vertical children feed it — but expect the SD 7 platform term and the SD 15–20
  use cases to rank months before it does. Do not read slow movement on this one as failure.
- **Legacy modernization** (1,000 / SD 35). Mid-difficulty, no soft long tail. Keep it as blog
  content, which is what you already have.

---

## 5. Revised priority order

Replaces the tier ordering in document `06`. Same navigation prerequisite — none of this
performs until the nav stops pointing at homepage anchors.

**Phase 1 — free wins on content that already exists (week 1)**
1. Fix the nav URLs (document `05`, section 1)
2. Optimise `/blog/what-is-staff-augmentation` for `staff augmentation` (1,900 / SD 11)
3. Create `/process`, `/about`, `/contact`

**Phase 2 — the SD 7–14 pages (weeks 2–4)**
4. `/products/pxo-ai` for `ai voice agent platform` (1,000 / SD 7)
5. `/products` hub for `ai agent development company` (SD 11–18)
6. Homepage for `custom software development company` (2,900 / SD 13)
7. `/services/cloud-platform-engineering` retargeted to `cloud migration` (1,000 / SD 14)

**Phase 3 — the SD 15–27 cluster (weeks 5–8)**
8. `/engagement-models/staff-augmentation` (720 / SD 27)
9. `/industries/healthcare` (480 / SD 23) + the healthcare voice-agent use case (SD 15)
10. `/products/pxo-ai/pricing` (SD 15) and the SD 19–20 use-case pages
11. `/resources/ai-voice-agent-roi-calculator` (SD 11)

**Phase 4 — long tail and geography (weeks 9–12)**
12. Fold the section 3 long-tail terms into the pages above as H2/H3 and FAQ sections
13. `/industries/fintech`, `/industries/real-estate`, `/industries/logistics`
14. `/locations/australia` (SD 6)

Phase 1 is the part to notice: three of the four items are free in content terms. Fixing the nav
and re-optimising one existing blog post goes after 1,900 monthly searches at SD 11 without
writing a new page.
