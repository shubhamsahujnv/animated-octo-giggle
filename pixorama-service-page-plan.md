# Pixorama — Service Page Strategy for Leads

**Applied from:** Service Page Strategy for Leads, v1.1 (22 Oct 2026)
**Client:** pixoramagroup.com · **Date of research:** 23 Oct 2026
**Markets assessed:** United States (locId 2840), Australia (locId 2036)
**Data sources:** Ubersuggest/NP Digital API (volumes, live SERPs, backlink summaries), site crawl, sitemap, web search

---

## 0. The headline

**Pixorama has no service pages to optimize.** All five capabilities live as sections on the
homepage. `/services`, `/about` and `/contact` return HTTP 200 but serve homepage content and
canonicalise to `https://pixoramagroup.com`, so they cannot rank for anything and are absent
from the sitemap. The nav item "Services" is a dead end as far as search is concerned.

**Of 20 candidate keywords tested, 0 clear Gates 1–4.** Gate 2 is the blocker, and it is not
close: Pixorama has **31 referring domains**, while the *weakest* domain in every SERP tested
has 168–711. The gate threshold is 62.

So the answer to "how do I optimize the service pages" has three parts, in this order:

1. **Fix what is structurally broken** (canonicals, indexation, tracking). Cheap, and nothing
   else works until it is done.
2. **Build five real service pages** — as conversion and AI-answer assets, explicitly *not* as
   ranking bets. They will not rank this quarter. They will still earn leads from referral,
   direct, ads, AI assistants and sales conversations, which today all land on one crowded page.
3. **Run the Step 5b plan**, because it is where Pixorama's leads will actually come from for
   the next two to three quarters. Authority, not page count, is the binding constraint.

Per Section 5b: **do not lower the gates to fill a list.**

---

## 1. Step 1 — Audit of what exists

### Live pages (28 URLs in sitemap.xml)

| Type | Count | Notes |
|---|---|---|
| Homepage | 1 | Carries all five capabilities, 5 `Service` schema entries in an `OfferCatalog` |
| `/products` | 1 | Own canonical, correctly indexed |
| `/blog` + posts | 26 | 25 posts |
| **Service pages** | **0** | — |

### Routes that exist but are not in the sitemap

| URL | Status | Title | Canonical | Verdict |
|---|---|---|---|---|
| `/services` | 200 | *Pixorama · We build AI-powered software…* | `https://pixoramagroup.com` | Serves homepage; cannot rank |
| `/about` | 200 | same as homepage | `https://pixoramagroup.com` | Serves homepage; cannot rank |
| `/contact` | 200 | same as homepage | `https://pixoramagroup.com` | Serves homepage; cannot rank |
| `/process` | 404 | — | — | **Not linked anywhere** — nav points to `/#method`. Harmless. |

Three URLs are indexable (`robots: index, follow`) but canonicalised away, and **none of them is
linked from the nav or footer** — the nav uses homepage anchors (`/#capabilities`, `/#method`,
`/#company`, `/#contact`). They are orphan routes. This is the single biggest structural defect on
the site: duplicate indexable content, and no real URL for any service.

### Visibility

| Metric | Value |
|---|---|
| Ubersuggest domain authority | **5** / 100 |
| Ranking organic keywords (US) | **1** |
| Estimated organic traffic | **~1 visit/month** |
| Paid keywords | 0 |
| Backlinks | 2,356 |
| Referring domains | **31** |
| Referring domains .gov/.edu | 0 |

**Data gaps to flag to the client (per Section 3, Step 1):**
- **Google Search Console is not connected.** Clicks, impressions and query data are unavailable;
  all positions and volumes here come from third-party data. Connect GSC before the first report.
- **GA4 AI-referral data unavailable.** A GA4 tag (`G-1DT0WH31GK`) is present on the homepage, but
  we cannot confirm it is the client's own property, nor whether form-submit events fire.
- **Backlink detail could not be retrieved.** The link-listing endpoint returned no rows across
  repeated calls, so the individual links were not inspected. The summary ratio is worth a manual
  review: **2,356 links from 31 domains (76:1), 0 gov/edu**. A ratio like that is usually either a
  handful of site-wide footer/widget links or low-quality bulk links. Confirm before any link work —
  if it is the latter, it is a cleanup job, not an asset.

### Collision list

Effectively empty — the site ranks for ~1 keyword, so almost nothing can collide. One real collision:

- `/blog/what-is-a-fractional-cto` vs the candidate "fractional cto services" → **improve the blog
  post, do not build a page.**

### Existing blog cluster — a finding

25 posts, and the largest group is self-nominating listicles: *top SaaS development companies USA
Australia*, *top MVP development companies USA*, *top web development companies Australia*, *top AI
development companies Australia*, *best SEO agencies Australia*, *top IT staff augmentation
companies USA*, *best AI automation agencies USA and Australia*.

Two problems:

1. **The Australia-modified keywords these target have no measurable search volume** (see §3).
   The cluster is built on phrases nobody searches — the exact anti-pattern in Section 1
   ("a long-tail phrase with no searches").
2. A firm ranking its own "top companies in X" listicle is competing with the publishers and
   directories that AI assistants actually cite, from DA 5. It is not a winnable format here.

What *is* worth keeping and expanding: the genuinely informational/comparison posts —
`rag-vs-fine-tuning`, `flutter-vs-react-native`, `mobile-app-development-cost-usa-australia`,
`what-is-rag-in-ai`, `cloud-migration-strategy-on-premise-to-cloud`,
`cloud-cost-is-an-architecture-problem`, `zero-trust-without-stopping-delivery`. These are the AEO
assets (Section 5b item 4).

**Remove:** `/blog/journal-prompts-for-self-reflection` — unrelated to anything Pixorama sells, and
it dilutes topical authority.

**Homepage stat problems — three, all live now.** The strategy forbids publishing unconfirmed
numbers. Pixorama's own homepage currently breaks that rule:

| Stat | Problem |
|---|---|
| **Eight `pstat` / `istat` figures** | All render **0** in the server HTML ("0+ Enterprise clients served since 2022", "0.00% Average SLA-backed uptime", "0× Median uplift in deployment frequency", "−0% Typical cloud run-cost reduction", and four more). Most likely scroll-animated counters populated client-side, so a browser may show real numbers — but Google and the AI crawlers the `robots.txt` deliberately welcomes see the zeros. Three of the labels are also measured claims needing a traceable source. |
| **"4.9 / 5 — Average client rating"** | An aggregate rating with no source and **one** displayed testimonial. Not substantiable, and it must not be marked up as `AggregateRating` schema — unverifiable review markup risks a Google structured-data penalty. |
| **"99.98% uptime — SLA-backed reliability"** | A hard figure with no stated measurement basis or SLA document. |

These need either a verifiable source or removal. They are the same category of risk the Gushwork
teardown flagged in Section 1 — claims a client cannot trace.

Precise change list, including where each figure sits in the rendered markup:
`service-pages/homepage-stat-fixes.md`.

---

## 2. Step 2 — Authority band and the Gate 2 margin

| Measure | Pixorama |
|---|---|
| Ubersuggest DA | 5 |
| Referring domains | 31 |
| **Band (Section 3, Step 2)** | **Bottom band** — equivalent to "Under 100" DataForSEO rank |
| Expected pace | Slow |

**Scale substitution, stated openly:** the strategy's Gate 2 margin is written for the DataForSEO
backlink rank (0–1,000), which this session has no access to. The strategy offers a second, scale-
independent form of the same test — *"no more than 2× the client's referring domains"* — so that is
what is used here as the primary Gate 2 rule:

> **Gate 2 pass = at least 3 of the top 10 have ≤ 62 referring domains.**

Ubersuggest DA is reported alongside as context only, never as the deciding number.

Band consequences (Section 5 timeline): early signal at week 4–6, strengthen at day 90, first lead
review at day 120, **prune not before day 180.**

---

## 3. Steps 3–4 — Candidates and the four gates

Seeds taken only from what Pixorama actually sells: the five capabilities, the four delivery models,
and the eight industries named on the site.

### Gate 2 reference: referring domains of the weakest competitors tested

Measured directly, so Gate 2 is traceable rather than inferred:

| Domain | DA | Referring domains | vs Pixorama's 31 | Within 62? |
|---|---|---|---|---|
| jadasquad.com | 13 | **305** | 10× | No |
| bitontree.com | 19 | **168** | 5× | No |
| vstorm.co | 22 | **711** | 23× | No |
| alphacorp.ai | 25 | **376** | 12× | No |

These are the *lowest-authority* pages in their SERPs. Every one is 5–23× above the gate. **Gate 2
fails on every keyword tested**, and testing more of the same category will not change it.

### The deliverable table

| Status | Slug (= keyword) | Searches/mo | Gate 2: ≥3 top-10 within 62 RDs | Gate 3: results match intent | Gate 4: exact-match pages | Gate 5: AI answer | Verdict |
|---|---|---|---|---|---|---|---|
| **B, hold** | rag-development-services | 70 (US) | **Fail** — weakest are 168/376/711 RDs | **Pass** — all 10 are vendor service pages, cleanest intent match found | **Fail — 8** | AI Overview present | Best long-term niche. Revisit at ~80 RDs. |
| **B, hold** | cloud-cost-optimization-services | 140 (US) | **Fail** — DA 24–94 | Mixed — Oracle/IBM/Flexera definitions + tool listicles + 3 vendors | Borderline — 3 | AI Overview present | Closest to viable on intent; blocked on authority |
| **B, hold** | ai-agent-development-services | 480 (US) | **Fail** — DA 30–93 | Pass — vendor service pages | **Fail — ≥6** | AI Overview present | Core service, revisit later |
| **B, hold** | ai-agent-development-company | 590 (US) | **Fail** — DA 13–99 (LinkedIn, Gartner) | Mixed — listicle-dominated, not vendor pages | **Fail — ≥6** | AI Overview present | Listicle SERP; poor fit for a service page |
| **B, hold** | logistics-software-development-company | 480 (US) | **Fail** — DA 25–99 | Pass | **Fail — ≥6** | AI Overview present | Real industry fit; authority-blocked |
| **B, hold** | healthcare-software-development-company | 720 (US) | **Fail** (SD 29, DA 40+ field) | Pass | Fail | — | Real industry fit; authority-blocked |
| **B, hold** | fintech-software-development-company | 480 (US) | **Fail** (SD 38) | Pass | Fail | — | Real industry fit; authority-blocked |
| **Drop** | cloud-platform-engineering-services | 20 (US) | Fail — IBM, Microsoft, Google, AWS, VMware | **Fail — mainly definitions** ("What is platform engineering?") | n/a | — | Gate 3 fail. Exactly their service name, and still wrong. |
| **Drop** | llm-development-company | 110 (US) | n/a | **Fail — navigational intent** | n/a | — | Per Gate 3 |
| **Drop** | fractional-cto-services | 390 (US) | n/a | **Fail — informational intent** | n/a | — | Blog, not a service page. **Collides** with existing post. |
| **Drop** | ai-readiness-assessment | 720 (US) | Fail — DA 48–98 (Cisco, Microsoft, RSM, Avanade) | Fail *as a service page* — intent is a self-serve tool | n/a | — | **Repurpose as a lead magnet — see §5b.1** |
| **Drop** | zero-trust-implementation-services | **0** (US) | n/a | n/a | n/a | n/a | No volume after individual re-check |
| **Drop** | custom-software-development-company | 2,900 (US) | Fail | Pass | Fail | — | Head term, unreachable at DA 5 |
| **Drop** | ai-consulting-services | 2,400 (US) | Fail | Pass | Fail | — | Head term, unreachable |
| **Drop** | legacy-application-modernization | 720 (US) | n/a | Fail — informational intent | n/a | — | Blog |
| **Drop** | custom-software-development-company-australia | **0** (AU) | n/a | n/a | n/a | n/a | No volume |
| **Drop** | ai-consulting-services-australia | **0** (AU) | n/a | n/a | n/a | n/a | No volume |
| **Drop** | it-staff-augmentation-australia | **0** (AU) | n/a | n/a | n/a | n/a | No volume |
| **Drop** | ai-agent-development-company-australia | **0** (AU) | n/a | n/a | n/a | n/a | No volume |
| **B, hold** | *(AU, unmodified)* ai-consulting | 1,000 (AU) | Fail — SD 56 | — | — | — | AU demand is real but only on unmodified terms |
| **B, hold** | *(AU, unmodified)* software-development-company | 480 (AU) | Fail — SD 39 | — | — | — | Same |

Every "0" above was re-checked individually, not read off a batch call (Gate 1 rule).

### The Australia finding

Country-modified terms — "… australia" — return **zero** volume across the board. But unmodified
head terms have real Australian demand: **"ai consulting" 1,000/mo (AU)**, **"software development
company" 480/mo (AU)**.

Two consequences:

1. The existing AU blog cluster is built on phrases with no searches. Reorient it.
2. To compete on unmodified AU terms, Google needs local signals Pixorama does not have — no
   Australian address, entity, or local profiles, and the site names no headquarters at all
   ("remote-first"). **Client question:** is there an AU legal entity or address that can anchor a
   Google Business Profile and local directory listings? If not, AU is a referral and
   outbound market, not an SEO market.

### Tier summary

| Tier | Count |
|---|---|
| **A, lead pages** | **0** |
| **A, high-fit niche** | **0** |
| Pending | 0 |
| **B, hold** | 9 |
| Fold-in | 0 |
| Drop | 11 |

---

## 4. The five service pages to build anyway

Zero Tier A picks means **no page here is a ranking bet.** Build them for four other reasons:
every referral, ad click, AI-assistant visit and sales follow-up currently lands on one homepage
that has to sell five different services at once; AI assistants need per-service pages to cite;
the `Service` schema needs real URLs behind it; and these become the pages that *do* rank once
authority arrives, with 6+ months of age already on them.

Keep it to five — one per real capability. **Do not multiply by industry or city.**

| Slug | Title / H1 opens with | Links to |
|---|---|---|
| `/services/cloud-engineering-services` | "Cloud Engineering Services" | `/services/product-software-engineering`, `/blog/cloud-cost-is-an-architecture-problem`, `/blog/cloud-migration-strategy-on-premise-to-cloud` |
| `/services/ai-development-services` | "AI Development Services" | `/blog/what-is-rag-in-ai`, `/blog/rag-vs-fine-tuning`, `/blog/how-to-build-an-ai-agent` |
| `/services/mobile-app-development` | "Mobile App Development" | `/blog/flutter-vs-react-native`, `/blog/mobile-app-development-cost-usa-australia` |
| `/services/product-software-engineering` | "Product & Software Engineering" | `/blog/how-to-build-saas-product`, `/blog/legacy-application-modernization` |
| `/services/web-development-services` | "Web Development Services" | `/products` |

Note the slug/title discipline from Section 4: slug = the keyword, and title and H1 **open with the
same words**, with the proof hook after — e.g. "Cloud Engineering Services: Built to Be Handed Back
to You". Not "We build AI-powered software that scales your business".

**Slugs use buyer wording, nav keeps brand wording.** Three of the five capability names carry
almost no search demand ("digital growth web" ~0/mo against 5,400 for "web development services"),
so the slug, title and H1 use the phrase buyers type while the nav and CTAs keep Pixorama's own
capability names. See `service-pages/README.md` for the volumes behind each choice.

### Per page, non-negotiable (Section 4)

- **Opening answer, 40–60 words, directly under the H1** — what the service is, who it is for, what
  Pixorama delivers, one proof point. Written so an assistant can quote it whole.
- **Scannable facts** — what is included, timelines, team shape, the four delivery models
  (outcome-based projects, dedicated squads, specialist augmentation, advisory & architecture).
- **Pricing signal** — the site currently says only "scoped and priced to the outcome". That is not a
  pricing signal. Add a starting band, a typical engagement range, or an explicit "what drives cost".
- **Proof** — a named case study with numbers, a named expert with credentials. See §5b.2.
- **Who it is for / not for** — pre-qualifies, and they already have the material (regulated sectors,
  enterprises and funded startups).
- **FAQ** with one-to-three-sentence answers, from People Also Ask.
- **Schema** — `Service` (provider = the `Organization`), `Organization`, `BreadcrumbList`, `FAQPage`.
  Move the five `Service` entries off the homepage `OfferCatalog` onto the pages they describe.
- **Visible "last updated" date.**
- **CTAs** — above the fold, mid-page, end. Their existing CTA wording is strong; keep it.
- **A form on every page** — name, work email, company, need.

### Structural fixes (do these first)

1. **Give `/services`, `/about`, `/contact` their own content, titles and self-referencing canonicals**,
   or 301 them to the homepage. Right now they are indexable duplicates pointing elsewhere.
2. **Add every real page to `sitemap.xml`** — `/services`, `/about`, `/contact` are all missing.
3. **`/process` returns 404 but is not linked** — nav and footer use `/#method`. No action needed; noted so it is not mistaken for a broken link.
4. **Fix the "0 continents of active delivery" counter.**
5. **Unique title and meta description per page.** Four URLs currently share one title.
6. `robots.txt` is already correctly open to every AI crawler — nothing to do, and it is an asset.

### Tracking (Section 4, non-negotiable)

- Confirm `G-1DT0WH31GK` is **the client's own** GA4 property.
- Form-submit events firing, tested end to end, with a test enquiry confirmed received.
- Source captured on every submission: page URL, referrer, UTM.
- **AI referrals as their own channel** — GA4 channel group for chatgpt.com, perplexity.ai,
  gemini.google.com, copilot.microsoft.com.
- **"How did you hear about us?"** with an "AI assistant (ChatGPT etc.)" option — most AI-driven
  visits arrive as direct.
- They route enquiries through WhatsApp and email as well as the form. **Capture WhatsApp as a
  tracked source**, or those leads are invisible. If call tracking is used, it must be on an
  account Pixorama controls.

---

## 5. Step 5b — Where the leads actually come from

This is the real deliverable. Zero Tier A picks means pages alone will not produce leads this
quarter, and the strategy is explicit that the answer is not to lower the gates.

**What to tell the client:** "Google's results for your core services are held by firms with 5 to 20
times your link authority — even the weakest page on those result pages has 168 to 711 referring
domains against your 31. New service pages alone will not rank yet. Here is what closes the gap,
and we will re-run the gates every quarter."

### 5b.1 Get listed where buyers already look — highest priority

Every SERP and AI answer tested for Pixorama's categories is dominated by listicles, directories and
Clutch ratings. A web search for Pixorama by name returns **nothing** — no Clutch, no GoodFirms, no
reviews, no third-party mentions at all. For a firm founded in 2022 with five named clients, that is
the fastest available lead path and the cheapest.

1. **Clutch profile with verified client reviews** — the single highest-leverage asset. Vendor
   shortlists and AI answers cite Clutch ratings directly.
2. **GoodFirms, DesignRush, G2** (for the `/products` side).
3. **Reviews from the five named clients** — BVIVE, Gateways, New Zealand Gateway, Wingwaves,
   Amelia Downie. There is already a testimonial from Amelia Downie on the site; get it onto Clutch
   where it counts.
4. **AU-specific directories** if an Australian entity exists.

### 5b.2 Proof assets

- **Named case studies with numbers** for the five existing clients. Right now they are logos with
  one-line descriptions. "BVIVE: payment recovery platform" is not proof; "recovered $X in Y months"
  is. Needs client permission — **client question**.
- **Named experts with credentials.** The pitch is "senior-only teams"; nobody is named. For
  regulated-sector buyers this is the gap that costs deals.
- **Confirm the logos are permitted** for use (Section 4: no unconfirmed logos).

### 5b.3 Links and digital PR

- Original data or a small survey the trade press will cite — they have shippable material in the
  cloud-cost and RAG-in-production experience.
- Guest pieces on relevant industry sites.
- Partner pages — AWS/Azure/GCP partner directories, if any partnership status exists.
- **First, resolve the 2,356-links-from-31-domains question** (§1). Do not build on an unknown base.

### 5b.4 Blog and AEO content

They already have the cluster; reorient it:

- **Keep and deepen** the comparison and cost posts — `rag-vs-fine-tuning`,
  `flutter-vs-react-native`, `mobile-app-development-cost-usa-australia`,
  `cloud-cost-is-an-architecture-problem`, `zero-trust-without-stopping-delivery`. These earn AI
  citations and build topical authority faster than service pages do.
- **Stop expanding** the self-nominating "top companies in USA/Australia" listicles, which target
  zero-volume phrases from DA 5.
- **Build an "AI readiness assessment" as an interactive tool, not a page.** 720/mo, US. A DA 48
  accounting firm holds #2 with an assessment tool and an estimated 251 clicks — this intent is
  satisfied by *tools*, which is why it failed Gate 3 as a service page. It is the best lead magnet
  available in their category, and it feeds the AI & Data Intelligence page directly.
- **Remove** `/blog/journal-prompts-for-self-reflection`.

### 5b.5 Then the niche picks, when authority arrives

Re-run the gates quarterly. First two to come into reach:

- **`rag-development-services`** (70/mo) — the only SERP tested where all ten results are vendor
  service pages. Gate 3 is a clean pass; it fails only on authority and exact-match count. Watch for
  Pixorama passing ~80 referring domains.
- **`cloud-cost-optimization-services`** (140/mo) — Gate 4 is already borderline-passing at 3.

---

## 6. What counts as a lead — agree before the first report

| Type | Definition |
|---|---|
| **Raw enquiry** | Any form submission, WhatsApp enquiry, or tracked call over 30 seconds from a service page |
| **Qualified lead** | A raw enquiry that is a real prospect for a service Pixorama sells, in a market it serves, and not spam, a job seeker, a vendor pitch or a duplicate. **The client confirms.** |
| **Attributed source** | Google organic, AI assistant, paid, direct, referral — from the form's captured source. Uncertain cases are marked "unknown", never guessed. |

Filters before counting: bot submissions, free-email bulk spam, duplicates within 30 days, job
applications, sales pitches, test entries.

Report **qualified leads as the headline number**, split by source. Keep direct and referral leads
separate from the pages. **Never report page count.**

---

## 7. Measurement timeline (bottom authority band)

| Check | When |
|---|---|
| Indexed, GA4 events firing, test form received by client | Day 1 |
| Early signal: impressions, live position, AI citations (re-run Gate 5) | Week 4–6 |
| Strengthen: proof, internal links, links to pages with no impressions | Day 90 |
| First lead review: qualified leads per page | Day 120 |
| Prune: merge or remove pages with no impressions, no AI citations, no leads | **Not before day 180** |

---

## 8. Client questions — before writing starts

1. **Is there an Australian legal entity or address?** Decides whether AU is an SEO market or a
   referral/outbound market.
2. **Can we name BVIVE, Gateways, New Zealand Gateway, Wingwaves and Amelia Downie in case studies,
   with real numbers?** This is the proof that closes the authority gap.
3. **Are the four client logos confirmed for marketing use?**
4. **Can we name the senior engineers with credentials?** The "senior-only" claim is unevidenced.
5. **Is `G-1DT0WH31GK` Pixorama's own GA4 property?**
6. **Where did the 2,356 backlinks from 31 domains come from?** Needs an answer before any link work.
7. **Can the "4.9 / 5 average client rating" and "99.98% uptime" figures be substantiated?** If not,
   remove them. If the rating comes from a review platform, link it and we can use real `Review`
   markup; otherwise the pages must not carry rating schema at all.
8. **Is `/products` a product line Pixorama wants leads for**, or supporting material? It is the only
   correctly-canonicalised non-homepage page and has no plan here.
9. **Which of the eight listed industries does Pixorama actually want leads for now?** All eight are
   claimed; the strategy only builds for services the client wants leads for and can deliver.

---

## 9. Pre-delivery checklist

- [x] Existing pages audited; GSC unavailable and flagged
- [x] Authority recorded (DA 5, 31 referring domains), bottom band applied, Gate 2 margin set at ≤62 referring domains, scale substitution stated
- [x] Every keyword is a real service Pixorama sells
- [x] Every volume traced to a source; every "no data" re-checked individually
- [x] Gates 2, 3, 4 checked on live SERPs, with competitor referring domains measured directly
- [x] Gate 5 checked at the AI-answer/citation level (AI Overviews present on all core terms; citations are listicles and directories, not vendor pages → listing opportunity, not a page win)
- [x] Collision list checked (one collision: fractional CTO)
- [x] Step 5b plan included — 0 picks passed
- [x] Slug = keyword; title and H1 open with the same words
- [x] Page rules specified: opening answer, schema, proof, pricing signal, CTA, form, internal links
- [x] Tracking requirements specified, including WhatsApp and AI-referral channels
- [x] Lead definition drafted for client agreement
- [x] Review dates set to the bottom band
- [ ] **Client questions answered** (§8)
- [ ] **GSC connected**

