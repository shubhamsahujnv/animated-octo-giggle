# Pixorama Group — Keyword Research, Topical Structure & Internal Linking Plan

Prepared 28 October 2026. Keyword data: Ubersuggest, US location (locId 2840), English.
Scope note: the **Services page is excluded** from the content rewrite as instructed. Services
still appears in the linking and architecture plans, because it is a hub that other pages must
link into.

---

## 1. Where the site stands today

Ubersuggest domain data for `pixoramagroup.com`:

| Metric | Value |
|---|---|
| Organic keywords ranking | **1** |
| Estimated organic traffic | **1–2 visits/month** |
| Domain Authority | 6 |
| Backlinks | 2,363 |
| Referring domains | 37 |

This is the diagnostic that shapes everything below. The site has 42 blog posts and over two
thousand backlinks, and ranks for one keyword. That is not a content-volume problem. It is an
**architecture problem**, and there are four specific causes:

**1. The primary navigation points at anchors, not pages.**
Header and footer link to `/#capabilities`, `/#method`, `/#company`, `/#contact`. An anchor is
the homepage. So every nav link — the strongest, most repeated internal link on the site —
funnels authority back into the one URL that already has it. Services, Process and About have
no URL of their own to rank, so they cannot rank.

**2. `/process` is a 404.** It is in the nav as `/#method`. There is no process page to optimise;
it has to be created. Section 4 of document `03` is written as a new page at `/process`.

**3. The blog is a flat list of 42 posts with no hubs.** No category pages, no topic hubs, no
related-posts links. Each post is an island reachable only from a long paginated index. Posts
that deep in a flat list accumulate no internal authority, which is why 2,363 backlinks have
produced one ranking keyword.

**4. The Products page targets one product in its H1 while listing three.** Its H1 is
"AI voice agents that sound human and get real work done" — that is PXO AI's H1, on a hub page
covering PXO AI, EchoMind and AI Device Inspector. One page cannot rank for an AI voice platform,
an AI journalling app and a device inspection tool. These need to be split.

---

## 2. Keyword research

All figures are US monthly search volume, SD = Ubersuggest SEO Difficulty (0–100), CPC in USD.
I have prioritised by *volume relative to difficulty at DA 6* — at this authority, SD under ~25
is realistically winnable, SD 25–45 is a 6–12 month target, SD above 50 is not worth targeting
yet.

### 2.1 Primary commercial head terms

| Keyword | Volume | SD | CPC | Intent | Assign to |
|---|---|---|---|---|---|
| ai development company | 2,900 | 22 | $72.30 | Commercial | **Homepage (primary)** |
| custom software development company | 2,900 | **13** | $78.98 | Commercial | **Homepage (secondary)** |
| mobile app development company | 3,600 | 22 | $54.20 | Commercial | Services child page |
| cloud migration services | 1,900 | 31 | $64.18 | Commercial | Services child page |
| ai voice agent | 6,600 | 40 | $51.22 | Commercial | **/products/pxo-ai** |
| it staff augmentation services | 720 | 27 | $428.93 | Commercial | Engagement model page |
| ai agent development company | 590–720 | **11–18** | $20–58 | Commercial | **/products (hub)** |
| ai agent development services | 480 | 20 | $38.81 | Commercial | /products (hub) |
| software development process | 720 | 50 | $33.48 | Informational | **/process (primary)** |
| product engineering services | 320 | 25 | $62.13 | Navigational | Services child page |
| dedicated development team | 320 | 41 | $1,396.82 | Navigational | Engagement model page |

The two standouts: **`custom software development company` at 2,900 volume and SD 13** is an
unusually soft head term for that volume and a $78.98 CPC — that is the single best commercial
opportunity on the list. And **`ai agent development company` at SD 11–18** is winnable now,
which is why the Products hub should be framed as an AI agent development page rather than a
generic product catalogue.

### 2.2 PXO AI cluster (AI voice agents)

| Keyword | Volume | SD | Intent | Assign to |
|---|---|---|---|---|
| ai voice agent | 6,600 | 40 | Commercial | /products/pxo-ai (H1) |
| conversational ai voice agent | 1,300 | 53 | Transactional | /products/pxo-ai (H2) |
| ai voice agent platform | 1,000 | **7** | — | /products/pxo-ai (H2) |
| ai voice agent platform (variant) | 880 | 36 | Commercial | same |
| best ai voice agent | 210 | 40 | Commercial | Comparison page |
| ai voice agent agency | 170 | 50 | Commercial | /products/pxo-ai |
| ai voice agent services for businesses | 140 | 35 | Commercial | /products/pxo-ai (H3) |
| ai voice agent for customer service | 140 | 42 | Transactional | Use-case page |
| ai voice agent for healthcare | 110 | **15** | — | Use-case page |
| what is an ai voice agent | 110 | 37 | Informational | Blog/glossary |
| white label ai voice agent | 90 | 33 | Commercial | /products/pxo-ai (H3) |
| ai voice agent pricing | 70 | **15** | Commercial | Pricing page |
| ai voice agent for small business | 70 | 20 | Commercial | Use-case page |
| ai voice agent for real estate | 70 | 34 | Commercial | Use-case page |
| ai voice agent for restaurants | 50–70 | 19–21 | Commercial | Use-case page |
| outbound ai voice agent | 30 | **15** | Commercial | /products/pxo-ai (H3) |
| ai voice agent roi calculator | 20 | **11** | Commercial | Tool page |

`ai voice agent platform` at **SD 7 with 1,000 volume** is the cheapest meaningful win on the
entire site. It belongs in an H2 on the PXO AI page, worded exactly.

Note the vertical pattern: healthcare (SD 15), small business (SD 20), restaurants (SD 19),
pricing (SD 15), ROI calculator (SD 11) are all soft. The branded competitor terms
(retell/elevenlabs/vapi/synthflow/bland ai voice agent) are **not** targets — those are
navigational searches for other products.

### 2.3 EchoMind cluster

| Keyword | Volume | SD | Intent | Assign to |
|---|---|---|---|---|
| ai journal app | 720 | 31 | Transactional | /products/echomind (H1) |
| best ai journal app | 140 | 25 | Commercial | /products/echomind (H2) |

EchoMind already has supporting content: the existing post
`/blog/journal-prompts-for-self-reflection` is a textbook top-of-funnel feeder. It currently
links nowhere useful. Fix that (see internal linking, document `04`).

### 2.4 Process page cluster

| Keyword | Volume | SD | Intent |
|---|---|---|---|
| software development process | 720 | 50 | Informational |
| software development process methodology | 880 | 34 | Informational |
| software development process cycle | 720 | 52 | Informational |
| software development process stages | 320 | 58 | Informational |
| software development process models | 320 | 38 | Informational |
| steps in software development process | 170 | 42 | Informational |
| software development process improvement | 140 | 33 | Informational |
| enterprise software development process | 90 | 32 | Informational |
| **custom software development process** | 50 | **12** | **Commercial** |
| secure software development process | 40 | 60 | Informational |
| software development process best practices | 40 | 63 | Commercial |

Important judgement call here: the high-volume process terms are **informational and
academic** — `agile software development process scrum` (4,400), `what is agile software
development process` (3,600), `software development process v model`, `cs 6300 software
development process`, `omscs software development process`. Those are students and exam
revision, not buyers. Chasing them would rank the page for traffic that never converts.

So `/process` should target **`custom software development process` (SD 12, Commercial intent)**
as its primary, with the broader `software development process` and `software development
process stages` as secondary. That keeps the page a sales asset rather than a textbook. The
academic angles belong in blog posts if anywhere.

### 2.5 Geographic layer

The firm is remote-first with a +91 WhatsApp number, and the blog already targets India, USA
and Australia. The geo terms confirm that is the right spread:

| Keyword | Volume | SD |
|---|---|---|
| mobile app development company in india | 880 | 28 |
| mobile app development company usa | 1,600 | 19 |
| mobile app development company in usa | 880 | 26 |
| custom software development company in usa | 320 | 37 |
| ai development company in usa | 320 | 31 |
| ai development company in india | 210 | 28 |
| custom software development company in india | 170 | 31 |
| ai development company in australia | 20 | **6** |
| best mobile app development company india | 110 | 46 |

`ai development company in australia` at **SD 6** is nearly free. Australia is under-served
across the board and the blog already has four Australia posts to support it.

---

## 3. Topical structure

A topical map works by having one page own one topic, a hub owning each cluster, and every page
in a cluster linking to its hub and its siblings. Right now Pixorama has 45-odd URLs and
effectively no clusters. Here is the target structure.

```
pixoramagroup.com/
│
├── / .................................... HUB 0 — "ai development company",
│                                          "custom software development company"
│
├── /services/ ........................... HUB 1 (exists — excluded from rewrite)
│   ├── /services/ai-data-intelligence
│   ├── /services/cloud-platform-engineering
│   ├── /services/mobile-app-development
│   ├── /services/product-software-engineering
│   └── /services/digital-growth-web
│
├── /products/ ........................... HUB 2 — "ai agent development company"
│   ├── /products/pxo-ai .............. "ai voice agent platform"
│   │   ├── /products/pxo-ai/pricing
│   │   ├── /products/pxo-ai/use-cases/customer-service
│   │   ├── /products/pxo-ai/use-cases/healthcare
│   │   ├── /products/pxo-ai/use-cases/real-estate
│   │   ├── /products/pxo-ai/use-cases/restaurants
│   │   └── /products/pxo-ai/white-label
│   ├── /products/echomind ............ "ai journal app"
│   └── /products/ai-device-inspector . "ai device inspection software"
│
├── /process/ ............................ HUB 3 — "custom software development process"
│   ├── /process/discover
│   ├── /process/architect
│   ├── /process/build
│   ├── /process/harden
│   └── /process/scale-and-operate
│
├── /engagement-models/ .................. HUB 4 (new)
│   ├── /engagement-models/outcome-based-projects
│   ├── /engagement-models/dedicated-squads ..... "dedicated development team"
│   ├── /engagement-models/staff-augmentation ... "it staff augmentation services"
│   └── /engagement-models/advisory-architecture
│
├── /industries/ ......................... HUB 5 (new)
│   ├── /industries/fintech
│   ├── /industries/healthcare
│   ├── /industries/logistics
│   └── /industries/saas
│
├── /locations/ .......................... HUB 6 (new)
│   ├── /locations/india
│   ├── /locations/usa
│   └── /locations/australia
│
├── /case-studies/ ....................... HUB 7 (new)
├── /resources/ .......................... HUB 8 (new — tools, calculators, glossary)
├── /blog/ ............................... HUB 9 (exists, needs category layer)
│   ├── /blog/category/ai-and-automation
│   ├── /blog/category/cloud-and-devops
│   ├── /blog/category/mobile-development
│   ├── /blog/category/hiring-and-engagement
│   └── /blog/category/cost-and-pricing
├── /about/ .............................. (give it a real URL, not /#company)
├── /contact/ ............................ (give it a real URL, not /#contact)
└── /news/
```

### 3.1 The clustering rule to apply

Every page gets exactly three kinds of outbound internal link:

1. **Up** — one link to its hub, in the first screen of content.
2. **Sideways** — two to four links to sibling pages in the same cluster.
3. **Across** — one or two links to a different cluster where the topic genuinely overlaps
   (e.g. `/products/pxo-ai` → `/process`, because buyers of the platform want to know how it
   gets built and customised).

This is what converts 42 orphaned blog posts into a topical authority signal. Nothing else in
this document matters as much as this rule.
