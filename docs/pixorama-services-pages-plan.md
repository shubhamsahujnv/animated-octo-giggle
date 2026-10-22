# Pixorama Group — Services Pages: Analysis & Growth Plan

**Domain:** pixoramagroup.com
**Prepared:** 22 October 2026
**Data sources:** Ubersuggest (domain overview, keyword metrics, backlinks, PageSpeed), live crawl of the site and its sitemap.

---

## 1. The headline finding

**Pixorama has no services pages.**

The header nav item labelled "Services" points to `/#capabilities` — an anchor on the homepage. The five
offerings in the design (Cloud & Platform Engineering, AI & Data Intelligence, Mobile App Development,
Product & Software Engineering, Digital Growth & Web) exist only as an accordion inside that one page.

The sitemap confirms it. All 28 URLs:

| Type | Count | URLs |
|---|---|---|
| Core pages | 3 | `/`, `/products`, `/blog` |
| Blog posts | 25 | `/blog/*` |
| **Service pages** | **0** | — |

So the five highest-intent, highest-value things the business sells have **zero indexable URLs** between
them. Every commercial search — "custom software development company", "ai agent development company",
"devops consulting services" — has to be won by the homepage, competing against agencies that have a
dedicated, deep page for each one.

This is the whole problem in one sentence, and fixing it is the whole plan.

### What the accordion costs on top of that

In the current design only item `01` is expanded. Items `02`–`05` render as a number, a title and a `+`.
A visitor who lands on the homepage sees four of the five service lines as nothing but a label. The one
that *is* open carries a three-word description ("Platforms that scale."). There is no scope, no
deliverable, no tech stack, no proof, no price signal, and no per-service call to action anywhere on the
site.

The `/products` page repeats the problem: it lists the same five capability names **with no descriptions at
all**, in ~850 words total, with no case studies, no testimonials and no pricing.

---

## 2. Where the site stands today

| Metric | Value | Read |
|---|---|---|
| Domain Authority | 5 | Effectively a new domain |
| Organic keywords | 1 | Invisible in search |
| Organic traffic | ~1 visit/month | Invisible in search |
| Backlinks | 2,356 | See the warning below |
| Referring domains | 31 | **76 links per domain** |
| Follow / nofollow | 2,340 / 16 | Almost entirely follow |
| .gov / .edu referrers | 0 | No authority signal |

### Backlink profile warning

2,356 links from only 31 domains is a ratio of roughly **76:1**. Healthy profiles sit in the low single
digits. A ratio this high almost always means sitewide footer links, blogroll links, or directory/spam
networks — a large number of links repeated across every page of a handful of sites. They pass very little
value and, at volume, carry some risk. **Audit these 31 domains before building any more links.** The DA of
5 despite 2,356 links is itself the evidence that Google is already discounting them.

### Performance

| Metric | Desktop | Mobile |
|---|---|---|
| Largest Contentful Paint | 0.78 s | **3.1 s** |
| First Contentful Paint | 0.62 s | 2.2 s |
| Time to Interactive | 1.1 s | **4.7 s** |
| Total Blocking Time | 34 ms | 145 ms |
| Cumulative Layout Shift | 0 | 0 |

Desktop is genuinely good and CLS is perfect — the design is not the problem. Mobile needs work:
LCP 3.1 s is above the 2.5 s "good" threshold, and TTI of 4.7 s is slow for a page this light.

Two fixes, both cheap:
- **Redirects cost 630 ms on mobile** (190 ms desktop). This is a redirect chain on the entry URL —
  likely `http → https → www` or similar. Collapse it to a single hop. Largest single win available.
- **99 KB of unused JavaScript.** Code-split the homepage bundle.

---

## 3. Content strategy is inverted

25 of the site's 28 URLs are blog posts. Zero are service pages. The investment has gone almost entirely
into top-of-funnel content while the pages that actually convert do not exist.

Worse, much of that blog content is **listicle content that competes with directories**:

- `/blog/top-mobile-app-development-companies-usa`
- `/blog/top-saas-development-companies-usa-australia`
- `/blog/top-it-staff-augmentation-companies-usa`
- `/blog/best-ai-automation-agencies-in-the-usa-and-australia-for-2026-...`
- `/blog/top-web-development-companies-australia`
- `/blog/best-seo-agencies-australia`

These "top N companies" posts are fighting Clutch, G2, GoodFirms and DesignRush — sites with DA 80+ whose
entire business model is those rankings. A DA 5 domain will not win them. And even if one ranked, the
searcher is comparison-shopping a *list*; they are not looking to hire Pixorama.

Note the self-defeating logic: Pixorama publishes "top mobile app development companies USA" while having
no mobile app development service page of its own. It is reviewing the market it should be competing in.

The genuinely good content is the technical, opinionated writing — `rag-that-survives-contact-with-users`,
`cloud-cost-is-an-architecture-problem`, `zero-trust-without-stopping-delivery`, `shipping-mobile-on-two-platforms`.
That is real expertise and it is exactly what should be linked **from** the service pages as proof.

One stray post, `/blog/journal-prompts-for-self-reflection`, has nothing to do with the business and
dilutes topical focus. Remove or move it.

---

## 4. The keyword opportunity

All figures from Ubersuggest. **SD** = SEO difficulty (lower is easier). **CPC** indicates commercial value.

### United States — primary market

| Keyword | Volume/mo | SD | CPC | Intent |
|---|---|---|---|---|
| web development agency | 3,600 | 31 | $32.00 | Commercial |
| mobile app development company | 3,600 | 28 | $54.20 | Commercial |
| custom software development company | **2,900** | **12** | **$78.98** | Commercial |
| ai development services | 2,900 | 37 | $100.83 | Commercial |
| dallas mobile app development company | 1,900 | 13 | $48.45 | Commercial |
| us mobile app development company | 1,900 | 41 | $38.65 | Commercial |
| top rated mobile app development company | 1,600 | 12 | $30.30 | Commercial |
| mobile app development company in dallas | 1,600 | 29 | $107.32 | Commercial |
| mobile app development company usa | 1,600 | 19 | $60.55 | Commercial |
| generative ai development services | 880 | 12 | $78.76 | Commercial |
| cross platform mobile app development company | 880 | 18 | $19.08 | Commercial |
| ai agent development company | 590 | 18 | $58.21 | Commercial |
| devops consulting services | 590 | 27 | $15.21 | Commercial |
| saas development company | 590 | 36 | $43.60 | Commercial |
| custom mobile app development company | 590 | 33 | $34.48 | Commercial |
| enterprise mobile app development company | 390 | 25 | $26.33 | Commercial |
| agentic ai development services | 170 | 29 | $80.60 | Commercial |
| custom ai development services | 170 | 7 | $34.65 | Commercial |

**The standout is `custom software development company`: 2,900 searches/month at difficulty 12 with a
$78.98 CPC.** That combination — high volume, low difficulty, high commercial value — is rare. It is
winnable by a new domain with one well-built page. It should be the first page you create.

`generative ai development services` (880, SD 12, $78.76) and `custom ai development services` (170, SD 7,
$34.65) are the same shape: cheap to win, expensive to buy.

### Australia — secondary market

| Keyword | Volume/mo | SD | CPC |
|---|---|---|---|
| software development company australia | 170 | **10** | $29.24 |
| ai development company australia | 0 | 4 | $0.00 |

Australia is real but small. `software development company australia` at SD 10 is a cheap win worth taking.
But **`ai development company australia` has no measurable search volume** — the AU + AI angle that several
blog posts target does not have demand behind it. Treat Australia as a credibility and sales-territory
story, not an SEO channel, beyond that one keyword.

### What to stop chasing

`cloud platform engineering services` — the literal name of service 01 — gets **20 searches/month**. The
brand-style category names in the design are not what buyers type. This matters: the page can be *titled*
"Cloud & Platform Engineering" for brand consistency, but it must be *optimised* for "devops consulting
services", "cloud migration services" and "cloud cost optimization" — the words with demand behind them.

---

## 5. The plan

### Phase 1 — Ship the five service pages (weeks 1–3)

This is the unlock. Everything else depends on it.

```
/services                                    ← hub page
/services/custom-software-development        ← Product & Software Engineering
/services/ai-data-intelligence               ← AI & Data Intelligence
/services/mobile-app-development             ← Mobile App Development
/services/cloud-platform-engineering         ← Cloud & Platform Engineering
/services/digital-growth-web                 ← Digital Growth & Web
```

Change the nav item "Services" from `/#capabilities` to `/services`. Keep the accordion on the homepage as
a *summary* — but make each row link to its full page, and expand all five by default or show a real
two-line description per row rather than a bare title behind a `+`.

**Keyword assignment, one primary target per page, no overlap:**

| Page | Primary keyword | Vol | SD | Supporting terms |
|---|---|---|---|---|
| `/services/custom-software-development` | custom software development company | 2,900 | 12 | saas development company, mvp development, software development company australia |
| `/services/ai-data-intelligence` | ai development services | 2,900 | 37 | generative ai development services, custom ai development services, ai agent development company, agentic ai |
| `/services/mobile-app-development` | mobile app development company | 3,600 | 28 | cross platform, custom, enterprise, flutter vs react native |
| `/services/cloud-platform-engineering` | devops consulting services | 590 | 27 | cloud migration services, cloud cost optimization, zero trust |
| `/services/digital-growth-web` | web development agency | 3,600 | 31 | seo agency, web design and development services |

**Page template** — every service page carries all of these, in this order:

1. **H1 using the keyword, not the brand category.** "Custom Software Development Company" — not
   "Product & Software Engineering". Use the brand name as the H2 or the nav label.
2. **One-sentence outcome statement.** What the client gets, not what you do.
3. **Scope block** — the 5–8 concrete deliverables inside this service.
4. **Process** — reuse the existing `/#method` content, scoped to this service.
5. **Tech stack** — named, specific. This is a trust signal buyers actively scan for.
6. **Proof** — 1–2 case studies with a number in them. *(See the gap note below.)*
7. **Related thinking** — link the relevant existing blog posts. `cloud-cost-is-an-architecture-problem`
   belongs on the cloud page; `rag-vs-fine-tuning` and `how-to-build-an-ai-agent` on the AI page;
   `flutter-vs-react-native` and `shipping-mobile-on-two-platforms` on the mobile page.
8. **FAQ, 5–6 questions**, marked up with `FAQPage` schema. Target the question-shaped long tail
   ("how to choose a mobile app development company" has volume and is already a blog post you can adapt).
9. **Dedicated CTA** — "Book a discovery call" scoped to this service, not the generic homepage one.

**Target 1,200–1,800 words per page.** The current `/products` page at ~850 words with no descriptions is
roughly a quarter of what ranks for these terms.

**Technical requirements:**
- `Service` schema on each page, `Organization` schema sitewide, `BreadcrumbList` on all.
- Unique title tag and meta description per page, keyword-led.
- Add all six new URLs to `sitemap.xml`.
- Internal links: homepage accordion → service page; every blog post → its matching service page;
  service hub ↔ each service page.

### Phase 2 — Fix what's already there (weeks 2–4, parallel)

- **Collapse the redirect chain.** 630 ms on mobile, single biggest performance win.
- **Code-split the 99 KB of unused JS** to pull mobile LCP under 2.5 s.
- **Audit the 31 referring domains.** Identify the sitewide/footer link sources. Disavow anything that
  looks like a link network. Stop any ongoing link building until this is understood.
- **Rewrite `/products`** to actually describe the three products (PXO AI, EchoMind, AI Device Inspector),
  and move the five capability names out of it — they belong on `/services` now.
- **Remove or relocate** `/blog/journal-prompts-for-self-reflection`.
- **Retarget the listicle posts.** Rather than deleting them, reframe each from "top N companies" toward a
  buyer-guide angle you can actually win and that converts — e.g.
  `top-mobile-app-development-companies-usa` → "How to choose a mobile app development company in the US:
  cost, timeline and red flags". Then link it to `/services/mobile-app-development`.

### Phase 3 — Depth (months 2–4)

Only after Phase 1 pages are live and indexed.

**Sub-service pages** for the high-value long tail:

```
/services/ai-data-intelligence/ai-agent-development        (590/mo, SD 18, $58 CPC)
/services/ai-data-intelligence/generative-ai-development    (880/mo, SD 12, $79 CPC)
/services/custom-software-development/saas-development      (590/mo, SD 36)
/services/custom-software-development/mvp-development
/services/cloud-platform-engineering/cloud-migration
```

**Location pages — with a caution.** The Dallas cluster is genuinely attractive:
"dallas mobile app development company" (1,900/mo, SD 13) and "mobile app development company in dallas"
(1,600/mo, SD 29, **$107.32 CPC**). But thin, templated city pages are a well-known penalty risk and
Google has got better at spotting them. Build a location page **only** where there is a real presence,
real local clients, or real case studies to put on it. One substantial Dallas page beats twenty empty ones.

**Case studies.** This is currently the biggest conversion gap on the site — there are no case studies,
no testimonials and no client names anywhere. "Recent Deployments" lists project names and version numbers
with no outcomes. Three real case studies with numbers in them will lift conversion across every service
page more than any further SEO work. If client confidentiality is the blocker, publish anonymised ones
("a Series A fintech in Sydney") with the metrics intact.

---

## 6. What to expect

Be realistic about the starting point: DA 5, one ranking keyword, and a backlink profile that needs
cleaning rather than extending.

| Horizon | Expectation |
|---|---|
| Month 1 | Six new pages indexed. Traffic still near zero — this is normal. |
| Months 2–3 | First rankings on low-difficulty long tail (custom ai development services SD 7, software development company australia SD 10, custom software development company SD 12). |
| Months 4–6 | Page 1–2 for the SD 12–20 cluster. First inbound enquiries from organic. |
| Months 6–12 | Competing for the SD 28–37 head terms, assuming case studies and clean links are in place. |

**Measure these, not rankings alone:**
- Indexed service URLs (target: 6, currently 0)
- Ranking keywords (target: 50+ by month 6, currently 1)
- Discovery calls booked, attributed by landing page
- Referring domains from *distinct, legitimate* sites (target: 50 real domains — more valuable than the
  current 2,356 links from 31)

---

## 7. If you only do three things

1. **Build `/services` and the five service pages.** Five product lines with zero URLs is the entire
   reason the site is invisible. Nothing else matters until this is done.
2. **Lead with `custom software development company`** — 2,900/mo at difficulty 12 and a $78.98 CPC is the
   single best keyword available to this domain, and it is winnable now.
3. **Audit the 31 referring domains before building another link.** 2,356 links producing DA 5 means
   those links are already being discounted; adding more of the same compounds the risk.

---

## Appendix — data provenance

- Domain, backlink and keyword metrics: Ubersuggest, retrieved 22 October 2026.
- PageSpeed: Ubersuggest PageSpeed audit (lab metrics), desktop and mobile, 22 October 2026.
- Site structure: live crawl of `pixoramagroup.com` and `pixoramagroup.com/sitemap.xml`, 22 October 2026.
- Search volumes are Ubersuggest estimates and fluctuate month to month; several of these keywords show
  strong seasonality (e.g. `custom software development company` ranged 1,300–9,900 over the last 13
  months). Treat them as relative signals of opportunity, not absolute forecasts.
