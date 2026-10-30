# Lynkk.ai — AI Search + SEO Growth Plan (based on the Granola playbook)

_Prepared 30 Oct 2026. Data sources: Google Search Console export (last 3 months, 28 Jul – 27 Oct 2026), Ubersuggest (domain overview, keyword data, Lynkk project + AI brand visibility), and the Discovered Labs Granola case study._

---

## Part 1 — What Granola did (the playbook)

Discovered Labs ran a **5-step SEO + AEO (answer engine optimisation) system** for Granola. Results from Jan → Aug 2026: AI-attributed new active users **+4,600% (47x)**, organic sessions **+134%**, average Google position **+14.6 places**, Ahrefs DR **70 → 76**, non-branded AI citations **+558%**, AI mentions **+739%**, top 3 on Google for "meeting transcription software", "meeting recording app" and "meeting follow up".

| Step | What they did | Key idea |
|---|---|---|
| **1. Define the market** | Built the market map from the product, customer conversations, sales calls and existing content — not from a keyword tool. | Start from buyer decisions, not search volume. |
| **2. Map Google keywords** | Turned those buyer decisions into the keywords people type into Google. | Classic SEO layer. |
| **3. Map AI prompts** | Turned the same decisions into the longer questions people ask ChatGPT / Gemini / AI Overviews — scenarios, constraints ("for regulated teams", "with SSO"), and comparisons ("X vs Y", "alternatives to Z"). | A keyword export can't show these. |
| **4. Measure (separately)** | Tracked Google rankings and AI mentions/citations as two separate scoreboards. Re-baselined when scope changed. Success = **activated users**, not visibility. | GA4 + GSC + Ahrefs + AI visibility tracker. |
| **5. Act** — on three fronts | **Content**, **Technical SEO**, **Links & mentions** (below). | One action per page. |

**5a. Content (the "five content decisions")**
1. Map each priority intent to an existing page — or mark it as a real gap.
2. Create new pages *only* where no focused page exists.
3. Score every existing page twice: for SEO and for AI-answer usefulness.
4. Pick **one action per page**: preserve · improve SEO · optimise for AI · overhaul · gather more evidence.
5. Brief → publish → retest on both Google and AI.

Content checked against **CITABLE**: clear, grounded (facts/proof), structured (headings, tables, lists), current (dated, updated).
Sequence: feature- and persona-led pages (May) → their core "AI notepad" page optimised (June) → commercial topics (July).

**5b. Technical SEO** — prioritise by business impact → implement with engineering → verify (crawl, index, speed, and *can AI crawlers read the page*).

**5c. Links & mentions** — Reddit moved from broad B2B subs to subs close to the product (April); link building started (June); targeted the exact third-party pages AI answers were citing. Used **OCEC** per source: **O**wn (your site), **C**laim (profiles, directories, G2), **E**arn (reviews, press, roundups), **C**ontest (lists where a competitor sits and you don't).

---

## Part 2 — Where Lynkk stands today (the data)

### Google Search Console (last 3 months)

| Metric | Value |
|---|---|
| Clicks | **124** |
| Impressions | **20,937** |
| Avg CTR | ~0.6% |
| Branded clicks ("lynkk") | 48 (≈40% of all clicks) |
| Homepage clicks | 61 (≈50%) |

**Impressions exploded in October:** Aug 596 → Sep 684 → **Oct 19,615** (≈29x). Clicks went 19 → 34 → 70. Google is now testing Lynkk for many more queries, but CTR is very low (~0.36% in Oct). This is the moment to convert visibility into clicks.

**Countries:** USA = 10,590 impressions but only **9 clicks** (avg position 31). India = 57 clicks at position 14.7 (best CTR, 4%). UK 1,303 impr / 3 clicks.
**Devices:** Desktop is 81% of impressions — matches a B2B work tool.

### The most important finding: Google is already showing Lynkk for AI-style prompts

155 of the top 1,000 queries are long, conversational, prompt-like questions (8+ words) — these come from Google's AI Mode / AI Overviews. Lynkk ranks **position 2–8** on many of them, with zero clicks:

| Prompt-style query | Impr. | Pos. |
|---|---|---|
| zoom ai companion gives us summaries but nothing in our crm. what other tools could close that gap for reps? | 96 | 2.9 |
| rolling out an ai notetaker to 300 reps: which plans include sso, scim and an admin dashboard? | 78 | 6.9 |
| which third-party llm providers get to see prospect call transcripts that an ai notetaker processes? | 69 | 3.6 |
| options besides zoom ai companion for regulated teams that need configurable transcript retention and an audit trail | 65 | 4.1 |
| which notetakers offer searchable meeting history with source-linked answers? | 60 | 3.3 |
| how do founders keep track of everything said in investor and team meetings? | 43 | 3.9 |
| do ai notetakers offer volume discounts if we start with just the leadership team…? | 43 | 5.1 |
| does microsoft copilot in teams give us enough retention, consent and audit control…? | 38 | 6.0 |
| what do knowledge workers use to keep track of meeting decisions? | 29 | 2.3 |
| which tools help a team keep institutional knowledge from meetings when people leave? | 19 | 7.0 |

These are exactly Granola's "Step 3" prompts — and they line up with Lynkk's real differentiators (Ask Lynkk with cited answers, knowledge graph, security). **Clusters:** (1) Zoom AI Companion / Copilot alternatives, (2) security, compliance & data privacy, (3) team rollout, SSO/SCIM & pricing, (4) institutional memory / searchable history, (5) founders.

### Page-level opportunities (from Pages.csv)

| Page | Impr. | Clicks | Pos. | Problem |
|---|---|---|---|---|
| /blog/google-meet-transcript | 5,274 | 7 | 10.1 | Page 1 edge, CTR 0.13% → snippet + push to top 5 |
| /blog/voice-memo-transcription | 1,729 | 3 | 11.1 | Striking distance |
| /blog/voice-to-text-apps | 1,622 | 0 | 35.4 | Weak vs. competitors |
| /blog/ai-note-taker-microsoft-teams | 1,220 | 0 | 24.0 | Commercial intent, page 3 |
| /blog/action-items-examples-template | 1,214 | 1 | 32.0 | Needs overhaul |
| /blog/best-ai-note-takers | 917 | 3 | 37.2 | Very hard SERP |
| /features/meeting-bot | 731 | 11 | 23.7 | "meeting bot" 144 impr @ 18.8 |
| /blog/zoom-ai-companion-alternatives | 299 | 0 | **6.0** | Already page 1 — fix title/CTR |
| /compare/otter, /fireflies, /granola, /gong | 14–74 | 0 | 4.8–7.7 | Rank well, little demand → need links + internal links |
| /blog/zoom-note-taker **and** /articles/zoom-note-taker | 839 / 354 | 3 / 1 | 30 / 27 | **Duplicate — cannibalising** |
| /features/hinglish-transcription | 289 | 5 | 38.3 | Lynkk's unique angle, under-optimised |

Note: `/features/multilingual-transcription` sits at position 71 for 132 impressions — likely competing with the Hinglish page.

### Ubersuggest

| | Lynkk.ai | Granola.ai |
|---|---|---|
| Domain authority | **1** | 47 |
| Referring domains | **3** | 6,112 |
| Backlinks | 4 (all nofollow) | 93,974 |
| Est. organic traffic | ~0 | ~39,000/mo |

**AI brand visibility (Ubersuggest, ChatGPT, 10 prompts / 20 answers):** Lynkk **0%** visibility, 0 mentions. Competitors: Fireflies 45%, Otter 30%, Avoma 25%, Fathom 20%, Notta 20%, Gong 20%. Indian players (Salesken, Convin, Vaarta) also show up — so AI answers *do* include smaller/regional tools when sources mention them.

**Keyword targets (US volume, PD = paid difficulty proxy):**

| Keyword | Vol. | Diff. | Notes |
|---|---|---|---|
| meeting transcription software | 480 | **8** | Low competition. Granola now ranks top 3 here. Priority. |
| best meeting transcription software | 90 | 25 | Same page |
| google meet ai note taker | 1,600 | 62 | |
| ai note taker for google meet | 880 | 48 | |
| microsoft teams ai note taker | 880 | 47 | Existing page at #24 |
| ms teams / ai note taker for microsoft teams | 210 + 210 | 33–34 | Same page |
| zoom ai note taker | 480 | 45 | Merge the two zoom pages |
| does teams have an ai note taker | 480 | 44 | FAQ block |
| bot free ai note taker / doesn't join meetings | 170 + 170 | 28–76 | Lynkk Mac app records locally — strong fit |
| hinglish transcription | 110 | 44 | Lynkk at ~#7.5 already; own it |
| ai note taker | 49,500 | 97 | **Avoid as a target** for now |

---

## Part 3 — The Lynkk plan (Granola's 5 steps, adapted)

### Step 1 — Define the market (Week 1)
Lynkk's positioning: **"the meeting memory for teams" — searchable, source-linked answers across every meeting, plus Hinglish/multilingual support.**

Priority buyers (from the Ubersuggest business summary + GSC prompts):
1. Founders / execs (investor + team calls)
2. Sales teams leaving Zoom AI Companion / Copilot (CRM gap)
3. Product & engineering managers (decisions → Jira)
4. Regulated / security-conscious teams (retention, audit, LLM data handling)
5. Indian & multilingual teams (Hinglish, code-switching)

Action: pull 20–30 real phrases from sales calls, support tickets and onboarding answers ("why did you sign up?"). Use Lynkk itself on your own sales calls to mine this.

### Step 2 — Map Google keywords (Week 1–2)
Build one sheet: keyword → buyer → existing URL or "gap" → action. Start with the table above plus GSC striking-distance terms (positions 4–20): google meet transcript(s), meeting bot, zoom note taker, voice memo transcription iphone, action items example, stand up meeting agenda.

### Step 3 — Map AI prompts (Week 2)
Track **20 prompts** in Ubersuggest (you have 20 tracked-prompt slots unused; currently 10 prompts tracked). Use GSC's prompt-style queries as the seed list — they are real. Suggested set:

- Best AI note taker that answers questions across all past meetings with sources
- Zoom AI Companion alternatives that sync to CRM
- Copilot in Teams alternatives for teams also using Zoom and Google Meet
- AI notetaker for regulated teams with retention controls and audit trail
- Which AI notetakers share transcripts with third-party LLM providers?
- AI notetaker with SSO, SCIM and admin dashboard for 300 users
- How do founders keep track of investor and team meetings?
- How to keep institutional knowledge from meetings when people leave
- Best AI notetaker for Hinglish / Hindi-English meetings
- AI note taker that doesn't join the meeting as a bot
- Meeting notes to Jira tickets automatically
- Best meeting transcription software 2026
- Lynkk vs Otter / Fireflies / Granola / Fathom (comparison prompts)

Also add competitors Granola and Notta to the Ubersuggest project (or swap out Tactiq).

### Step 4 — Measure (set up in Week 1, review weekly)
Two scoreboards, as Granola did:

| Google | AI search | Business |
|---|---|---|
| Non-branded clicks (GSC, filter out "lynkk") | AI visibility % (Ubersuggest) | Signups / activated users from organic + AI referrals (GA4) |
| Avg position of priority pages | Mentions & citations per prompt | Referral traffic from chatgpt.com, perplexity.ai, gemini, copilot |
| CTR of top-20 impression pages | Share of voice vs Fireflies/Otter | |

**Baseline today:** 124 clicks / 3 months (≈76 non-branded), 0% AI visibility, DA 1, 3 referring domains.

### Step 5a — Content (one action per page)

**Month 1 — Fix what Google already shows (fastest wins)**

| Action | Page(s) |
|---|---|
| **Improve SEO (CTR)** — rewrite titles/meta descriptions, add a direct answer in the first 2 lines | /blog/google-meet-transcript (5,274 impr), /blog/zoom-ai-companion-alternatives (#6), /blog/voice-memo-transcription, /compare/* pages |
| **Optimise for AI** — add a 40–60 word answer box, a comparison table, FAQ section + FAQ schema, "last updated" date | /blog/zoom-ai-companion-alternatives, /features/ask-your-meetings, /security, /pricing |
| **Merge** — 301 /articles/zoom-note-taker → /blog/zoom-note-taker | Zoom note taker pages |
| **Overhaul** — target "microsoft teams ai note taker" cluster (880 + 210 + 210 + 480 FAQ) | /blog/ai-note-taker-microsoft-teams |
| **Overhaul** | /features/hinglish-transcription (own "hinglish transcription", "hindi transcription", "transcribe hinglish") and decide whether /features/multilingual-transcription links to it or is merged |

**Month 2 — Create pages for the real gaps (the AI-prompt clusters)**

1. **Meeting transcription software** — a focused commercial page (low difficulty, Granola's #1 target). Distinct from "best AI note takers".
2. **Zoom AI Companion vs Lynkk** and **Microsoft Copilot in Teams vs Lynkk** — CRM, multi-platform, retention, in-person meetings.
3. **AI notetaker security & data handling** — which LLM providers process transcripts, retention, audit trail, encryption, GDPR. Plain facts, a table. (This answers 4 of the top 10 prompts.)
4. **Rolling out an AI notetaker to your team** — SSO, SCIM, admin dashboard, volume pricing.
5. **Searchable meeting memory / institutional knowledge** — Lynkk's core differentiator (knowledge graph + cited answers). Hub page linking to features.
6. **Founders use case** — /use-cases/founders (investor + team calls).
7. **Bot-free AI note taker** — Mac app records locally without a bot joining.
8. **Meeting notes → Jira** — extend /integrations/jira (currently #31).

**Month 3 — Commercial + comparison depth**
- Refresh and expand /compare pages (add Granola, Fathom, tl;dv, Notta; honest tables, pricing, "who should choose which").
- "Best AI note taker for Google Meet / Teams / Zoom" roundups (include Lynkk honestly with competitors — AI engines cite balanced lists).
- India-specific pages: "AI meeting notes for Indian teams", "Hindi meeting transcription".

**CITABLE checklist for every page:** clear answer up top · grounded (numbers, screenshots, real examples, sources) · structured (H2s as questions, tables, lists) · current (visible updated date, 2026 data) · named author with bio (the author page already gets clicks — keep using it).

### Step 5b — Technical SEO (Month 1, then ongoing)
1. Run Ubersuggest site audit; fix by impact (indexing, broken links, redirects, Core Web Vitals on desktop).
2. **Allow AI crawlers** in robots.txt / CDN (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Bingbot). Check Cloudflare bot settings aren't blocking them.
3. Make sure key content renders without JavaScript (AI crawlers often don't run JS).
4. Add schema: Organization, SoftwareApplication (with pricing), FAQPage, Article with author, BreadcrumbList.
5. Fix duplicates/cannibalisation: /articles vs /blog, Hinglish vs multilingual.
6. Internal linking: every blog post → relevant feature page + one compare page; hub pages per cluster.
7. Submit to Bing Webmaster Tools (powers ChatGPT search and Copilot).
8. Verify: re-check indexation in GSC and test that pages are fetchable after each fix.

### Step 5c — Links & mentions (start Month 1 — biggest gap)
Lynkk has 3 referring domains vs Granola's 6,112. AI answers are built from third-party pages, so this matters most for the 0% AI visibility.

Use **OCEC**:
- **Own** — Lynkk site, blog, docs, changelog.
- **Claim** (Month 1) — G2, Capterra, GetApp, Product Hunt, SaaSHub, AlternativeTo, There's An AI For That, Futurepedia, Crunchbase, LinkedIn page, Chrome Web Store, Mac App Store listing. Fill every profile fully with the same description.
- **Earn** (Month 1–3) — ask first users for G2/Capterra reviews; founder posts on LinkedIn; guest posts / podcast spots on Indian startup & SaaS media (YourStory, Inc42), product-management and sales blogs; integration listings (Jira/Atlassian marketplace, Zoom App Marketplace, Google Workspace Marketplace, Slack directory).
- **Contest** (Month 2–3) — find the "best AI note takers" / "Otter alternatives" / "Fireflies alternatives" articles that ChatGPT cites (Ubersuggest `brand citation gaps`) and pitch the authors to add Lynkk.

**Reddit / communities** (Granola's April move): be helpful in subs close to the product — r/productivity, r/ProductManagement, r/sales, r/startups, r/IndiaStartups, r/SaaS — answering the exact prompts above. Disclose you work on Lynkk. No spam.

---

## 90-day timeline

| Week | Focus | Deliverables |
|---|---|---|
| 1 | Setup | Market map, keyword + prompt sheet, 20 tracked prompts, GA4 AI-referral segment, baseline report |
| 2 | Technical | Site audit fixes, AI crawler access, schema, 301 merges, Bing Webmaster |
| 3–4 | Quick wins | Rewrite titles/meta + answer boxes on top 10 impression pages; claim 10+ directory profiles |
| 5–8 | New pages | 8 gap pages (security, Zoom AI Companion vs, Copilot vs, meeting transcription software, rollout, founders, bot-free, institutional knowledge) |
| 5–12 | Links | 15+ reviews, 3 marketplace listings, 5 guest posts/podcasts, 10 "best of" list pitches, weekly Reddit answers |
| 9–12 | Commercial | Compare pages refresh, platform roundups, India pages; retest all prompts; report |

## 90-day targets (realistic for DA 1)

| Metric | Today | Target |
|---|---|---|
| Non-branded clicks / month | ~25–40 | 300+ |
| CTR on top 10 impression pages | ~0.2% | 1.5%+ |
| Referring domains | 3 | 40+ |
| AI visibility (Ubersuggest tracked prompts) | 0% | 10–15% |
| Pages in GSC top 10 | few | 15+ |
| Organic + AI signups | measure first | baseline → 3x |

---

## Data I'd still like (to sharpen the plan)
1. **GA4** — signups/activations by channel, and referral traffic from chatgpt.com / perplexity.ai / gemini.
2. **GSC filtered to the last 28 days** and a **US-only** export (to see why US impressions don't convert).
3. **Ubersuggest site audit results** and the list of the 10 currently tracked prompts + cited sources (`brand_citation_gaps`).
4. Your **sales call / onboarding notes** — the best source for Step 1 (Granola's main input).
5. Team capacity: how many pages/week can you publish and who handles outreach?
