# Off-Site Content & Interlinking Strategy
## 30 posts across Medium, Hashnode and Substack → pixoramagroup.com

Built from: GSC Performance export (last 3 months, to 2026-10-24), Ubersuggest
keyword + domain data, the 42 live posts on pixoramagroup.com/blog, and the
current published guidelines of all three target platforms.

---

## 1. Read the data first

### 1.1 What GSC actually says

Totals for the window: **16 clicks, 5,575 impressions, 0.29% CTR, avg position ~46.**

Two query clusters produce almost all non-brand impressions:

| Cluster | Impressions | Avg position | Landing page |
|---|---|---|---|
| "seo agency australia" family | ~2,982 | **74.97** | `/blog/best-seo-agencies-australia` |
| "on prem(ise) to cloud migration" family | ~824 | **30.82** | `/blog/cloud-migration-strategy-on-premise-to-cloud` |
| "ai agents for business" family | ~51 | 20.10 | `/blog/ai-agents-for-business-use-cases` |
| "journal prompts for self reflection" | ~34 | 23.56 | `/blog/journal-prompts-for-self-reflection` |
| brand ("pixorama" + misspellings) | ~1,355 | 5.69 | `/` |

The chart data shows the inflection clearly. Through 15 October the site ran
~35 impressions/day at **position 5-6**. On 16 October impressions jumped to 152,
then 429-618/day, and average position collapsed to **46-62**. That is the SEO
agency page entering the index and pulling thousands of page-6-to-8 impressions
into the average. The old position-5 performance did not get worse; it got
diluted. Read the two clusters separately from here on, never as one average.

### 1.2 What that means for priority

- **`cloud-migration-strategy-on-premise-to-cloud` is the highest-leverage page
  on the site.** Position 30.8 is the bottom of page 3. Ubersuggest puts
  "on premise to cloud migration" at **SD 17, 320/mo US, CPC $58.99** — low
  difficulty and very high commercial value. This page needs the fewest links
  to reach page 1 of any page you own.
- **`best-seo-agencies-australia` has the volume but the longest road.** 2,982
  impressions at position 75 means Google knows the page exists and finds it
  relevant, but ranks ~70 domains above it. The blockers are authority and
  topical trust, not content.
- **Authority is the actual constraint.** Ubersuggest: **DA 6, 37 referring
  domains, 2,363 backlinks.** The backlink-to-domain ratio (~64:1) suggests
  a small number of sitewide or repeated links rather than earned editorial
  coverage. 37 referring domains cannot support a page-1 ranking for
  "seo agency australia", where the incumbents hold hundreds.

**So: this programme's job is referring-domain diversity and topical
reinforcement, concentrated on the cloud-migration and AI-agent clusters first,
with the SEO-agency cluster treated as a long play.**

### 1.3 Ubersuggest validation of the target keywords

| Keyword | Vol (US/mo) | SD | CPC | Verdict |
|---|---|---|---|---|
| staff augmentation | 1,900 | **17** | $53.75 | Best unclaimed opportunity |
| it staff augmentation services | 720 | 27 | **$428.93** | Extreme commercial value |
| legacy modernization services | 1,300 | 30 | $66.74 | Strong, page exists |
| ai agents for business | 1,000 | 22-36 | $39.35 | Already pos 20, push it |
| how to build an ai agent | 2,900 | 51 | $19.78 | Already pos 5, defend it |
| on premise to cloud migration | 320 | **17** | $58.99 | Priority one |
| managed services vs staff augmentation | 390 | **13** | — | Near-free win |
| rag vs fine tuning | 480 | 51 | $17.67 | Supporting |
| cloud migration strategy | 1,000 | 57 | $15.75 | Harder head term |

Note the pattern: the pages that are *hardest* to rank (SEO agency terms) are
the ones currently getting impressions, and the pages that are *easiest* to rank
(staff augmentation, SD 17, CPC up to $429) are getting none. That asymmetry is
where this programme should spend its links.

---

## 2. Platform guidelines — what each one actually permits

This is the part that changes the plan, so it is worth being exact. All three
platforms prohibit what a naive backlink programme looks like.

### 2.1 Substack — the binding constraint

From Substack's Content Guidelines (updated 29 Sept 2026), section **Marketing
and Promotion**:

> "Substack is intended for high quality editorial content, not conventional
> email marketing. We don't permit publications whose primary purpose is to
> advertise external products or services, drive traffic to third party sites,
> distribute offers and promotions, **enhance search engine optimization**, or
> similar activities."

It also notes: *"Brands and commercial organizations publishing on Substack may
be subject to additional verification."*

**Consequence:** a Substack built to pass link equity to pixoramagroup.com is a
guidelines violation on its face, and Pixorama publishing as a company invites
the verification step. The Substack track is therefore designed as a genuine
serialized publication with its own editorial reason to exist, where links to
the main site appear as *references inside an argument* — the way a columnist
cites their own earlier work. Links are capped at 1-2 per issue and never the
point of the issue. Substack links are `nofollow` anyway, so there is no SEO
loss in this restraint; the value is referral traffic, brand search (which GSC
shows is already 1,355 impressions) and AI-citation surface.

### 2.2 Medium

From Medium's rules and distribution standards:

- **First-party promotion is allowed.** You may link to your own business,
  website, or mailing list. Third-party advertising and sponsorship are not.
- **Ineligible for General Distribution:** unoriginal, derivative and generic
  content; summaries of content from other sources; link "round-ups";
  link-farming; stories tagging large numbers of users.
- Medium's handbook: *"the more promotion, the less likely it is to reach a
  wider readership"*, and it allows only stories whose primary purpose is to
  tell a story rather than sell something.
- **Medium outbound links are `nofollow`.** No PageRank passes.

**Consequence:** Medium cannot be a syndication dump of the main site's buyer's
guides — those are exactly the "derivative content" and "round-up" shapes that
lose distribution. The Medium track is first-person narrative with a specific
claim, and the link to pixoramagroup.com is the "here is the long version"
reference at the point where a reader would want it. Value is reach,
referral traffic and AI/LLM citation, not link equity.

### 2.3 Hashnode

From Hashnode's Code of Conduct:

- Prohibited (§2): *"Automated or bulk posting, engagement farming, misleading
  links, **SEO abuse**"*, and *"using the platform primarily for self-promotion
  without contributing to the community."*
- Permitted and encouraged (§1.5): linking to relevant references —
  documentation, repositories, articles and code samples.
- §3.1: posts must be your original work, or clearly attributed.

**Hashnode is the only one of the three where outbound links are generally
`dofollow`.** That makes it the SEO-carrying track. The caveat: posts on a
`*.hashnode.dev` subdomain do not inherit hashnode.com's authority, so if you
want these to count as referring domains with real weight, publish them on a
Hashnode blog on a **subdomain of a domain you control** or at minimum keep them
on one consistent Hashnode publication so they accrue as a single trusted source.

**Consequence:** Hashnode gets the technical, code-bearing posts. Links are
framed as references, which is explicitly welcome, and each post has to teach
something a developer can execute. "SEO abuse" is the named violation, so no
keyword-stuffed anchors and no thin posts whose only purpose is the link.

### 2.4 The canonical question — get this right

A common and costly mistake: setting `canonical` on these posts back to
pixoramagroup.com.

**Do not do that here.** A canonical tag tells Google "the version at this other
URL is the original; index that one instead." It is correct when you *republish*
an existing article. All 30 posts in this programme are **original pieces written
for their platform** — they do not exist on the main site. Setting a canonical
to a main-site URL would:
- point Google at a page whose content does not match, and
- throw away the indexable off-site footprint you are trying to build.

So: **no canonical on any of these 30.** Each is original, indexed on its own,
and links to the main site as a reference.

If you later *do* want to republish a main-site post verbatim, then yes — set
`originalArticleURL` on Hashnode and use Medium's import tool, both pointing at
the pixoramagroup.com URL. Keep the two activities separate and never mix them.

### 2.5 Summary table

| | Medium | Hashnode | Substack |
|---|---|---|---|
| Link type | nofollow | **dofollow** | nofollow |
| Primary value | Reach, referral, AI citation | **Link equity**, dev trust | Audience, brand search |
| Content that works | First-person narrative with a claim | Technical depth + runnable code | Serialized editorial with a view |
| Banned shape | Round-ups, derivative summaries, link-farming | SEO abuse, thin self-promo, misleading links | Publications whose purpose is SEO/traffic |
| Links per post | 1-2 body + 1 bio | 2-3 as references | 1-2 as references |
| Canonical | None (original) | None (original) | None (original) |

---

## 3. The interlinking map

### 3.1 Rules applied to every post

1. **2-3 pixoramagroup.com links maximum.** More reads as link-farming on
   Medium and SEO abuse on Hashnode.
2. **Every post also carries 1-2 genuinely authoritative external links**
   (AWS Prescriptive Guidance, Microsoft Learn, CNCF, Flexera, vendor docs).
   A post that only links to one commercial domain is a footprint.
3. **Anchor text is varied and never exact-match twice.** Distribution across
   the 30: ~40% descriptive partial-match, ~25% natural-language sentence,
   ~20% branded, ~15% naked URL or "here".
4. **Cross-link within the programme.** Each post links to 1-2 of the other 29.
   This builds three small topical hubs that reinforce each other and look like
   an author with a body of work rather than 30 orphans.
5. **Deep links, not the homepage.** Only 4 of 30 point at `/` — the rest point
   at the specific blog post that answers the question the post raises.
6. **Links sit where a reader would want them** — at the moment the post says
   "the full version of this is longer than a post." Never in the first
   paragraph, never stacked in a closing list.

### 3.2 Link allocation by target page

Weighted by GSC opportunity × Ubersuggest difficulty. Cloud migration gets the
most because it is closest to page 1 on the lowest-difficulty high-CPC term.

| Target page | GSC now | Links | Why this weight |
|---|---|---|---|
| `/blog/cloud-migration-strategy-on-premise-to-cloud` | 824 imp, pos 31 | **11** | SD 17, CPC $59, bottom of page 3 — cheapest win on the site |
| `/blog/ai-agents-for-business-use-cases` | 51 imp, pos 20 | **7** | Vol 1,000, SD 22, pos 20 — one push from page 1-2 |
| `/blog/legacy-application-modernization` | — | **6** | Vol 1,300, SD 30, CPC $67, zero impressions = zero links |
| `/blog/what-is-staff-augmentation` | — | **6** | Vol 1,900, **SD 17**, CPC $54-429, completely unclaimed |
| `/blog/rag-vs-fine-tuning` + `/blog/what-is-rag-in-ai` | — | **5** | Supports the AI cluster's topical depth |
| `/blog/cloud-cost-is-an-architecture-problem` | 1 imp, pos 10 | **5** | Already pos 10; small push, real return |
| `/blog/how-to-build-an-ai-agent` | 6 imp, pos 5.2 | **4** | Vol 2,900 at pos 5 — defend and lift |
| `/blog/best-seo-agencies-australia` | 2,982 imp, pos 75 | **4** | Long play; 4 links will not move pos 75, but starts the clock |
| `/blog/zero-trust-without-stopping-delivery` | — | **4** | Security topical proof for the cloud cluster |
| `/blog/react-native-vs-flutter` | 4 imp, pos 32 | **4** | Pos 32, one cluster away |
| `/blog/how-to-build-saas-product` | 5 imp, pos 6.2 | **3** | Already pos 6 |
| `/blog/what-is-a-fractional-cto` | — | **3** | Engagement-model cluster |
| `/blog/mobile-app-development-cost-usa-australia` | — | **3** | Commercial, no links yet |
| `/blog/legacy-modernization-refactor-rebuild-replace` | — | **3** | Second modernization page |
| `/blog/top-it-staff-augmentation-companies-usa` | — | **3** | CPC $429 cluster |
| `/blog/conversational-ai-platform-buyers-guide` | — | **2** | AI cluster support |
| `/blog/shipping-mobile-on-two-platforms` | — | **2** | Mobile cluster support |
| `/blog/ai-answering-service-vs-human-receptionist` | — | **2** | AI cluster support |
| `/blog/top-web-development-companies-australia` | — | **2** | AU geo signal for the SEO cluster |
| `/blog/rag-that-survives-contact-with-users` | — | **2** | Essay-voice counterpart |
| `/blog` index + `/` homepage | — | **4** | Author-bio links only |

**Total: 81 outbound links to pixoramagroup.com across 30 posts** (measured,
avg 2.7), of which the 30 from Hashnode are `dofollow`.

*Revised 2026-10-26 after the live-site audit — see §9. 16 links were added to
reach 9 live posts that the first pass left unlinked, including the
`best-ai-automation-agencies` page, which the audit showed to be the single
highest-value unclaimed target on the site.*

### 3.3 Why the SEO-agency page only gets 4 links

It is the biggest impression source, so under-weighting it looks wrong. It isn't:

- At position 75 with DA 6 against incumbents holding hundreds of referring
  domains, 4 links and 40 links produce the same result this quarter: nothing.
- "seo agency australia" is also the single least credible thing for Pixorama
  to be linked about from a developer platform. A Hashnode post about SEO
  agencies is off-topic for the audience and reads as the "SEO abuse" the Code
  of Conduct names.
- The honest route to that page is AU-market topical authority built through
  adjacent, credible subjects — web development in Australia, how to run a
  vendor shortlist, how to read an agency pitch. Those are the 4 links it gets,
  and they are editorially defensible.

**Recommendation:** treat `best-seo-agencies-australia` as a 2-3 quarter play
and do not judge this programme on its position. Judge it on
`cloud-migration-strategy-on-premise-to-cloud` moving from 31 toward 15, and on
`staff-augmentation` and `legacy-modernization` getting their first impressions.

---

## 4. Publishing cadence

30 posts dropped in a week is a footprint. Spread over 10 weeks, 3/week, one per
platform:

| Week | Hashnode | Medium | Substack |
|---|---|---|---|
| 1 | H1 landing zone | M1 migration that cost more | S1 what we mean by backbone |
| 2 | H2 wave plan as code | M2 lift and shift is about time | S2 four numbers of a migration |
| 3 | H6 egress + data gravity | M3 we replaced a rewrite | S3 architecture debt on the finance dashboard |
| 4 | H3 strangler fig | M4 agent projects in costume | S4 the modernization decision tree |
| 5 | H4 RAG at 10k documents | M9 RAG or fine-tuning | S6 retrieval is a product problem |
| 6 | H5 agent with a kill switch | M5 reading an agency pitch | S5 where agents earn their keep |
| 7 | H9 evaluating agents in prod | M6 staff augmentation contract | S7 how to buy engineering capacity |
| 8 | H7 zero-trust CI | M7 the fractional CTO question | S9 security that doesn't stop delivery |
| 9 | H8 two platforms, one codebase | M8 what an app costs after the quote | S8 two platforms without doubling |
| 10 | H10 multi-tenant isolation | M10 why every top-10 list is the same | S10 how to run a vendor shortlist |

Order is deliberate: weeks 1-4 concentrate on the cloud-migration and
modernization clusters, because those are the pages closest to a ranking change.
The AI cluster follows in 5-7. The engagement-model and AU/vendor material lands
in 8-10, once the publication has a body of work and a link from it looks earned.

---

## 5. What to measure, and when

Do not look for movement before week 6. Links need discovery and reassessment.

**Week 6 and week 12 checks, per cluster, never as a site average:**

1. **Position of `cloud-migration-strategy-on-premise-to-cloud`** on
   "on prem to cloud migration" (now 26.3) and "on premise to cloud migration"
   (now 32.6). Target: single-digit-teens by week 12. This is the primary KPI.
2. **First impressions for `/blog/what-is-staff-augmentation`** — currently
   zero. Any impressions at all is the signal that links have been counted.
3. **Referring domains** (Ubersuggest: 37 today). Target 55-65. The number that
   matters is *domains*, not the 2,363 backlinks.
4. **`ai-agents-for-business-use-cases` position** (now 20.1). Target top 10.
5. **Referral sessions** from medium.com, hashnode.dev and substack.com. This is
   where Medium and Substack earn their place despite nofollow.
6. **Brand search volume** for "pixorama" — 1,355 impressions at 0.52% CTR today.
   The CTR is poor because much of that volume is people looking for other
   brands ("pixaroma", "pixoroma", "pixarama", "pixora" all appear in the
   export). Watch whether *correctly spelled* brand impressions rise.

**Leave `best-seo-agencies-australia` out of the week-6 review entirely.** It
will still be at position 70+. Reviewing it early produces the wrong conclusion
about the whole programme.

---

## 6. Honest risks

1. **Substack is the weakest link in the plan.** Its guidelines name SEO as a
   prohibited primary purpose, and brands get extra verification. The 10 issues
   here are written to stand as real editorial, but if Substack's intent is a
   backlink channel, it is the wrong channel and the account is at risk. It is
   in the plan because the user asked for it; it earns its place on audience and
   referral, not links.
2. **Nofollow on 20 of 30 posts.** Medium and Substack pass no PageRank. If the
   goal is purely DA, two-thirds of this programme does not serve it directly.
   The indirect case — AI citation, referral, brand search, and the correlation
   between brand signals and rankings — is real but slower and harder to attribute.
3. **One author, 30 posts, three new accounts, same link target.** That is a
   detectable pattern. The 10-week cadence, varied anchors, cross-linking and
   external citations all reduce it, but they do not eliminate it. Publishing
   under 2-3 genuine named authors from the team would reduce it much further,
   and the main site already credits a real author (Udesh Bhan) with a LinkedIn
   profile — use real bylines.
4. **The biggest ranking constraint is not addressed by content at all.** DA 6
   and 37 referring domains against page-1 competitors for "seo agency
   australia" is a gap that 30 self-published posts will not close. This
   programme is worth running for the cloud and AI clusters, where the maths
   works. For the SEO-agency page, the honest answer is digital PR, real
   editorial placements, and AU-market citations — a different and more
   expensive activity.
5. **`/blog/journal-prompts-for-self-reflection`** gets 34 impressions at
   position 23.6 and is entirely off-topic for an enterprise engineering firm.
   It dilutes topical focus. No links are allocated to it; consider whether it
   belongs on this domain at all.

---

## 7. File index

```
offsite-content/
├── STRATEGY.md              ← this file
├── INTERLINKING-MAP.csv     ← every post, every link, every anchor
├── hashnode/   H1-H10       ← technical, dofollow, code-bearing
├── medium/     M1-M10       ← narrative, nofollow, reach
└── substack/   S1-S10       ← serialized editorial
```

Each post file carries a front-matter block with its title, target keyword,
outbound links with exact anchor text, tags, and the platform-specific
publishing notes.

---

## 8. Verification record

**Date: 2026-10-26.**

- All **24 unique pixoramagroup.com URLs** referenced across the 30 posts were
  requested and returned **HTTP 200**. No broken internal link targets.
- All **10 external authority URLs** were checked. Two were corrected:
  - H2's AWS Prescriptive Guidance link 404'd; replaced with the current
    `application-portfolio-assessment-guide` path.
  - H6's Flexera link pointed at a generic press centre; now points at the
    State of the Cloud report.
- `canonical: NONE` confirmed on all 30 posts.
- Per-post site-link counts confirmed within limits: Hashnode 2 body links,
  Medium 2 body links (plus profile bio link, set in profile rather than post),
  Substack 1-2 body links plus a byline employer disclosure.
- `https://token.actions.githubusercontent.com` appears in H7 only inside JSON
  and HCL configuration values as the OIDC issuer identifier. It is not a
  hyperlink and will return 404 to a checker. This is correct.

**Word counts:** Hashnode ~15,500 · Medium ~15,900 · Substack ~14,700 ·
total ~46,000 across 30 posts.

---

## 9. Live-site audit and revised allocation (2026-10-26)

A full audit of all 42 live posts changed the allocation. Recorded here because
the revision matters more than the original §3.2 weighting.

### 9.1 All 42 live posts verified

Every one of the 42 posts listed on `/blog` returns **HTTP 200**. No dead or
mis-slugged pages. The `best-ai-automation-agencies-in-the-usa-and-australia-for-2026-how-to-c`
slug is genuinely truncated at `-how-to-c` — that is the real URL, not a
truncation artefact of the GSC export.

### 9.2 The first pass missed the best target on the site

`best-ai-automation-agencies-in-the-usa-and-australia-for-2026-how-to-c`
received **zero links** in the first pass. That was wrong. Ubersuggest and GSC
together:

| Metric | Value |
|---|---|
| "ai automation agency" | **4,400/mo, SD 13, CPC $17.80** |
| Volume trend | 8,100/mo in Jan/Mar/Apr 2026 — growing category |
| GSC "ai automation agencies in usa" | **position 11** |
| GSC "best ai automation agencies" / "top ai automation agencies" | **position 19** |
| Inbound internal links | **0** |

**SD 13 is the lowest difficulty of any commercially valuable keyword on this
site**, below staff augmentation (17) and on-prem-to-cloud migration (17), at
higher volume than either. The page is already on page 2 for three variants.

It now has **3 off-site links** (H5, H9, M4 — all genuinely agent/automation
posts) and is **priority 1 in `INTERNAL-LINKING-PLAN.md`** with 8 internal links
specified.

### 9.3 The India cluster is a closed loop

`best-software-development-companies-india` carries a **"Related reading"** block
linking seven siblings. Equity circulates well inside the cluster — but nothing
links into it from outside, so it has no authority to circulate.

Ubersuggest on this cluster: "software development companies in india" 590/mo
**SD 14, CPC $114.44**; "mobile software development companies in india" 1,300/mo
**SD 10**; "offshore software development companies in india" **CPC $171.99**;
"custom software development companies in india" **CPC $146.52**. Low difficulty,
exceptional commercial value, and zero GSC impressions.

One caveat worth stating: Pixorama's pages mostly target the **"best …"**
variants, and "best software development companies in india" is **SD 68** — far
harder than the plain form at SD 14. The titles are competing for the hardest
version of their own keyword.

Because the cluster self-distributes internally, the off-site links target the
**hub** (`best-software-development-companies-india`, 2 links) plus five cluster
entry points, rather than spraying links at all 14 India pages.

### 9.4 Equity is pooling in a page that cannot use it

`zero-trust-without-stopping-delivery` receives internal body links from nearly
every page audited — both AI agent posts, the SaaS and mobile listicles, the AI
automation guide, the migration guide. It has no commercial keyword and no GSC
impressions.

It has become the site's most internally-linked page by accident, apparently as
the default "and security matters" reference. Meanwhile the two pages with the
best difficulty-to-value ratio sit under-linked. Priority 3 of the internal plan
addresses this.

### 9.5 Revised link allocation

16 links added, reaching 9 previously-unlinked live posts:

| Target | Links | Placed in |
|---|---|---|
| `best-ai-automation-agencies-...` | **3** | H5, H9, M4 |
| `best-cloud-migration-companies-india` | 3 | H2, H6, S2 |
| `best-devops-consulting-companies-india` | 3 | H1, H7, S4 |
| `best-software-development-companies-india` | 2 | H3, M10 |
| `top-ai-development-companies-india` | 1 | H4 |
| `best-mobile-app-development-companies-india` | 1 | H8 |
| `best-saas-development-companies-india` | 1 | H10 |
| `best-staff-augmentation-companies-india` | 1 | M6 |
| `mobile-app-development-cost-india` | 1 | M8 |

Per-post caps respected: Hashnode 3 body links (its Code of Conduct explicitly
welcomes reference links), Medium 2-3, Substack 1-2 body plus byline.

### 9.6 Eleven live posts remain unlinked, deliberately

`best-flutter-development-companies-india`, `best-healthcare-app-development-companies-india`,
`best-mvp-development-companies-india`, `best-react-native-development-companies-india`,
`fintech-software-development-companies-india`, `logistics-software-development-companies-india`,
`top-mvp-development-companies-usa`, `top-mobile-app-development-companies-usa`,
`top-ai-development-companies-australia`, `top-saas-development-companies-usa-australia`,
`journal-prompts-for-self-reflection`.

These are not oversights. There is no credible editorial path from a post about
cloud migration wave planning to "best Flutter development companies in India",
and manufacturing one is precisely the "misleading links" and "SEO abuse" that
Hashnode's Code of Conduct names as prohibited. Forcing them would put the
dofollow track — the only one carrying link equity — at risk to reach pages with
no search traction.

**The right instrument for these is internal linking, not off-site content.**
Six of the India pages are already fed by the cluster hub. The four USA/Australia
listicles need Related reading blocks, which is priority 2 of
`INTERNAL-LINKING-PLAN.md`. `journal-prompts-for-self-reflection` is off-topic
for the domain and gets links in neither plan; see priority 4.

### 9.7 Verification

All 9 newly-linked URLs return **HTTP 200**. No post exceeds 4 total
pixoramagroup.com references. Measured total: **81 body links across 30 posts**.
