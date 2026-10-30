# Lynkk.ai — AI Search + SEO Growth Plan (v2, deep dive)

_Prepared 30 Oct 2026. v2 replaces v1._

**Sources used**
- Google Search Console export for lynkk.ai (28 Jul – 27 Oct 2026: Queries, Pages, Countries, Devices, daily Chart)
- Live crawl of lynkk.ai: robots.txt, llms.txt, sitemap (114 URLs), blog RSS (50 posts), and HTML/schema of 9 key pages
- Ubersuggest: domain overview (Lynkk + Granola), Granola top pages, keyword volumes, Lynkk project rank tracking (India), AI brand visibility (prompts, citations, citation gaps), PageSpeed
- Discovered Labs: full Granola case study text, their CITABLE framework, their study of ~2M AI citations, and their prompt-testing method
- Granola's own site: sitemap (358 URLs, 287 blog posts), structure and schema of three key pages

---

## 0. What changed from v1 (corrections)

The deeper research showed parts of v1 were wrong or missing:

| v1 said | Reality (verified) |
|---|---|
| "Allow AI crawlers" | Already done. robots.txt allows everything, and GPTBot, OAI-SearchBot, PerplexityBot and ClaudeBot all get HTTP 200. Lynkk also has an **excellent llms.txt**. |
| "Add schema, FAQs, answer-first content" | Already done. Blog posts have BlogPosting, FAQPage, Breadcrumb, Person (author) and Speakable schema, question-style H2s, published/updated dates, comparison tables and quick picks. Lynkk's on-page work is **as good as Granola's or better**. |
| "Merge the two Zoom note-taker pages" | Already done. /articles/zoom-note-taker 308-redirects to /blog/zoom-note-taker. |
| "Impressions grew because Google is testing you" | More precisely: **all 50 blog posts went live 2–29 Oct 2026, about one a day.** That launch is the October jump. The site is new, so age and authority are the bottleneck, not content quality. |
| "20 tracked prompt slots" | The brand config allows **10 prompts, updated monthly, ChatGPT only, India only**. |
| "Low CTR = fix titles" | The main cause is different: Lynkk is being **cited inside Google AI Mode / AI Overviews**, where people rarely click (see 2.2). Title fixes still help on classic results. |
| Missed | Lynkk's tracked AI prompts don't match the questions buyers actually ask (2.4). Low-authority blogs get cited by ChatGPT, so they're reachable targets (2.5). Lynkk lacks the enterprise trust layer Granola built (SSO, SOC 2, retention). Mobile is slow. Late-October content drifted away from the product. |

---

## 1. Granola deep dive: what they did and what they updated

### 1.1 Results (Jan → Aug 2026)
| Area | Result | Source |
|---|---|---|
| New active users from AI search | **47x (+4,600%)**, "thousands per month" | Granola's analytics |
| Organic sessions | +134% (Jan–Jul) | GA4 |
| Avg Google position | +14.6 positions (Jan–Jul) | GSC |
| Domain Rating | 70 → 76 (Jan–Aug) | Ahrefs |
| Top-3 rankings | meeting transcription software, meeting recording app, meeting follow up | Ahrefs, Aug |
| Non-branded AI citation rate | +558% | Discovered Labs' own tracker |
| Non-branded AI mention rate | +739% | Discovered Labs' own tracker |

_Caveat: Granola started with a huge brand (Series C, DR 70, 6,112 referring domains). The AI figures are vendor-reported. The method transfers; the speed won't for a DR-1 site._

### 1.2 The method (exact steps, from the full case study)

**One plan for Google + AI.** Every buyer question becomes a gap, and each gap is sent to one of three places: **content**, **technical SEO**, or a **third-party source**. Google and AI are measured separately, with a new baseline whenever scope changes. Success is measured in activated users.

**Planning: 5 steps**
1. Define the market from the product, customers, **sales conversations** and existing content. "The company and its buyers define the market. Search tools validate and expand it."
2. Map buyer decisions into Google keywords.
3. Map the same decisions into AI prompts covering **scenarios, constraints and comparisons**.
4. Measure Google visibility, and track when AI answers **mention** the brand and when they **cite** its pages.
5. Turn each insight into one action: create content, refresh a page, fix a technical issue, or earn coverage from a credible outside source.

**Content: 5 decisions**
1. Map each priority intent to an existing page or a real gap. Keep weak pages separate from missing pages.
2. Create new content only when no focused page can do the job.
3. For existing pages, judge SEO performance **separately** from usefulness as an AI source (CITABLE check).
4. Choose **one** action per page: preserve, improve SEO, optimise for AI answers, overhaul, or collect more evidence.
5. Brief the exact change, publish, then retest Google and AI separately.

This "avoids creating a page for every keyword variation or broadly rewriting content that already works."

**Technical SEO: 3 steps**
1. Prioritise by business impact. Validate each issue and tie it to a page that matters.
2. Implement. Search and engineering do the work; the client only handles what needs their access.
3. Verify. Recheck the original issue, and confirm answer engines can access the page.

**Links & mentions: 4 steps**
1. Find the **exact source** tied to a buyer question: a page, thread, review or directory listing.
2. Check what it says. Is the company absent, inaccurate, outdated, incomplete, or already well represented?
3. Choose a route with **OCEC**: **Own** (sources you control), **Claim** (profiles you can claim), **Earn** (coverage you must earn), **Contest** (inaccurate claims to correct).
4. Act and record the change.

"Each link or mention has one job: improve relevant coverage or keep company facts consistent."

**Timeline**
| Month (2026) | Work |
|---|---|
| Jan | Baseline across Google + AI |
| Apr | Reddit moved from broad B2B subreddits to communities close to the product |
| May | Feature- and persona-led content |
| Jun | AI notepad / AI note-taking page optimised; link building begins |
| Jul | Commercial topics: questions buyers ask when comparing options |
| Aug | Top-3 for the money keywords above |

### 1.3 What Granola actually built and updated (from their site)
Granola's sitemap has **358 URLs: 287 blog posts, 18 product updates, 15 author pages, 14 integration pages, 5 customer stories**, plus segment pages. By type:

| Content type | Count / examples | Why it works for AI search |
|---|---|---|
| **Category landing pages** | `/ai-note-taker` ("AI Notepad", the page optimised in June), `/ai-meeting-assistant`. H2s: "What's an AI notetaker?", "AI notetaker vs AI notepad", FAQ. SoftwareApplication + AggregateRating schema. | Owns the category definition. Frames Granola as a new category ("notepad, not notetaker"). |
| **Pricing-intent pages about themselves** | ~20 posts: free vs paid, pricing for teams, pricing for startups, recruiting cost-per-hire, customer-research ROI, privacy trade-off, enterprise TCO, "Granola vs Fireflies vs Fathom vs Otter pricing", "is Granola worth it for founders" | Pricing pages are the **#1 format AI cites** (+0.39 effect in the citation study). Granola answers every "how much / is it worth it" prompt with its own page. |
| **Comparison and "best X" guides** | best meeting transcription software 2026, best AI note takers for Zoom / Google Meet, best transcription apps for Mac / iPhone, best AI notetakers for enterprise, Granola vs Dovetail, local-first vs cloud | Comparison content is cited within 3–6 months. This is how they reached top 3 for "meeting transcription software" (published 17 Jul, updated 8 Oct). |
| **Enterprise / trust cluster** | SSO integration, SOC 2 Type 2, data residency, admin controls, security checklist, readiness assessment, rollout guide, participant privacy & consent, **"Granola for regulated teams: HIPAA, retention windows, redaction and deletion"**, "does Granola train AI on your meetings", "is Claude secure for your meeting notes", "ChatGPT security for meeting notes", MDM (Intune/Jamf), audit API | Answers exactly the constraint prompts (SSO, retention, audit, which LLMs see data) that already show up in **Lynkk's** GSC. |
| **Persona / role content** | ~35: founders, PMs, sales reps, sales managers, CS teams, recruiters, consultants, accountants, executive assistants, researchers | "Persona-led content" (May). Each role page answers "best AI notetaker for [role]". |
| **Workflow / feature-led how-tos** | meeting notes → CRM, action items → task manager, decision log, recall across meetings, "chat with meetings", institutional knowledge, second brain, daily briefing | "Feature-led content" (May). Turns features into problem-solution answers. |
| **Long-tail AI-prompt-shaped titles** | "can AI record meeting minutes? yes, and here's how (with caveats)", "is it safe to record meetings with AI tools: a buyer's checklist", "how to transcribe a Zoom meeting without recording it: 3 ways", "where do meeting recordings go … and what to do when they vanish" | Titles copy how people phrase prompts. Title–prompt similarity is a measured citation driver. |
| **Meeting templates / how-to (top of funnel)** | ~60: 1:1 agenda, standup template, retrospective, skip-level, all-hands, follow-up email template, recap email, board/committee minutes | Link and traffic magnets. Follow-up email template ranks #6 for "follow up email examples" (1,900/mo). |
| **Integration pages** | 14 `/integrations/*` (HubSpot, Salesforce, Attio, Affinity, Notion, Linear, Slack, Zapier, ChatGPT, Claude, Gmail, Outlook…) + setup guides + MCP | Entity relationships ("integrates with X"). The **MCP launch post has 1,931 backlinks from 67 domains**: product launches earn links. |
| **Proof & segment pages** | `/customers/brex, docker, vanta, zapier`; `/startups` (1 year free), `/students` (12 months free, 21 ref. domains), `/nonprofits`; `/updates` changelog (73 ref. domains); `/security` (240 ref. domains); 15 named authors | Third-party validation, programme pages that earn links, freshness signals. |
| **Format standard** | Every post has BlogPosting + Breadcrumb schema, published + modified dates, question-style H2s, a **FAQ** and a **Glossary** section | CITABLE "C", "B", "L", "E". |

**Granola's search footprint (Ubersuggest):** DA 47, 6,112 referring domains, ~94k backlinks, ~39k est. US organic visits/month. Top pages by traffic: home, /pricing, rebrand post, /jobs, "how to get the best from Granola", Series C post, pricing comparison vs Fireflies/Fathom/Otter, free vs paid, follow-up email template, pricing for teams.

### 1.4 What the research says drives AI citations
From Discovered Labs' study of ~2M citations across 10K pages and 4 engines:

| Factor | Effect |
|---|---|
| **Prompt–content alignment** (the page answers the exact question in the buyer's words) | **Biggest page factor** (+0.37). About 30% more citations per step up. |
| **AI-perceived domain authority** (trust built from citation history) | **~6x stronger than any single page feature.** "The bottleneck for challenger brands." |
| Pricing-page format | +0.39, the strongest format |
| Page length | +0.13 |
| Title–prompt similarity | +0.09 |
| FAQ section | +0.07 |
| Page age | +0.05 (compounds) |
| TL;DR / BLUF block | +0.05 |
| Listicle reviews | **−0.12** |
| Schema, Core Web Vitals, outbound links | No significant independent effect on AI citations (they still matter for Google rankings) |
| Answer position | Engines cite mostly from the **top third** of a page |
| Freshness | Claude: 60% of citations are under 6 months old; ChatGPT: 40%. Comparison pages are cited at 3–6 months old. |
| Off-page | Reddit and YouTube are cited across all engines. LinkedIn is cited almost only by Google AI. ChatGPT is the only engine where brand-owned pages hold the majority (53%) of share of voice. |

**CITABLE checklist (per page):** **C**lear entity & BLUF + visible "updated" date + key-facts box · **I**ntent architecture (question as H1, 5–7 adjacent intents: alternatives, integrations, pricing, limits, use cases) · **T**hird-party validation (reviews, Reddit, press, Wikidata) · **A**nswer grounding (40–60 word direct answer, sourced quotable facts) · **B**lock-structured (200–400-word sections, TL;DR, tables under 10 rows) · **L**atest & consistent (one source of truth for pricing/features across the web) · **E**ntity graph & schema ("alternative to X", "integrates with Y", matching JSON-LD).

Their starter cadence for small B2B teams: 10 pages first (5 comparison, 3 problem-solution, 1 glossary, 1 integration guide), then 1 page/week, refreshed quarterly (monthly for competitive topics).

---

## 2. Lynkk deep audit

### 2.1 The site
- **114 URLs**: 53 blog, 13 compare, 11 use-cases, 11 integrations, 11 features, plus core pages. All 50 posts were published **2–29 Oct 2026**.
- **Strong on-page:** answer-first H2s, FAQ + schema, dates, comparison tables, honest "where the competitor is better" sections on compare pages, a named author, an excellent llms.txt, AI bots allowed.
- **Homepage** title: "AI Meeting Assistant & Note Taker for **Sales Teams**". The H1 is sales-focused. But Lynkk's strongest Google/AI clusters are **meeting memory** and **security/rollout** (see 2.2), which the homepage barely speaks to.
- **Speed:** Desktop is fine (LCP 0.8s). **Mobile is slow: LCP 4.7s, Speed Index 8.8s, time to interactive 10.1s**, with redirect and server-response delays. The homepage HTML is **1.1 MB**. This doesn't affect AI citations much but does affect Google mobile rankings.
- **Content drift:** posts from 23–29 Oct cover BANT, MEDDIC, SPIN selling, lead qualification, sales forecast, QBR and key account planning. These sit far from the product, so prompt–content alignment is low. GSC shows 4–10 impressions for BANT/MEDDIC.
- **Trust-layer gaps** (public pages checked): no SSO/SAML, SCIM, SOC 2, retention-window, audit-log or **AI sub-processor** information, no customer stories, no G2/Capterra badges, no changelog, no startup/student programme.

### 2.2 Google Search Console: what the data really says

| | Value |
|---|---|
| Total clicks / impressions (3 mo) | 124 / 20,937 |
| Impressions by month | Aug 596 → Sep 684 → **Oct 19,615** |
| Branded ("lynkk") | 49 clicks, 288 impressions (pos ~2) |
| **Non-branded (visible queries)** | **4 clicks from 8,149 impressions** |
| Hidden / anonymised queries | ~60% of impressions (very long-tail, typical of AI Mode) |
| Desktop / mobile impressions | 81% / 19% (mobile ranks better: 15.8 vs 25.0) |

**Non-branded impressions by position**
| Position | Queries | Impressions | Clicks |
|---|---|---|---|
| 1–3 | 72 | 304 | **0** |
| 4–10 | 190 | 1,388 | **0** |
| 11–20 | 100 | 988 | 2 |
| 21–50 | 289 | 2,677 | 0 |
| 51+ | 344 | 2,792 | 2 |

**What this means:** 262 queries in the top 10 earned zero clicks. Most are long, conversational prompts. That pattern fits **Google AI Mode / AI Overviews**, where Lynkk's page shows as a cited source inside the AI answer and the searcher rarely clicks. **Lynkk is already being cited by Google's AI**, three weeks after launch. Track this as a win (AI citations), not as a CTR failure.

**Clusters (non-branded, impression-weighted avg position)**
| Cluster | Impr. | Avg pos | Read |
|---|---|---|---|
| **Security / compliance / rollout** (SSO, SCIM, retention, audit, LLM providers) | 287 | **6.0** | Strongest. Google AI already picks Lynkk here, but Lynkk has no dedicated page. |
| **Knowledge / meeting memory** (keep track, searchable history, decisions, institutional knowledge) | 210 | **5.8** | Strongest, and it's Lynkk's core differentiator (Ask Lynkk). |
| Hindi / Hinglish | 39 | 16.9 | Small but uncontested. |
| Google Meet | 1,074 | 20.0 | Biggest classic-SEO win (transcript posts). |
| Sales | 318 | 22.2 | |
| Transcription (generic) | 2,391 | 33.2 | Competitive |
| Note taker / assistant | 2,250 | 38.1 | Very competitive |
| Zoom | 1,348 | 37.2 | |
| Teams / Copilot | 648 | 34.7 | |
| Voice / dictation / speech-to-text | 1,446 | 41.0 | Off-core, very competitive |
| Action items | 752 | 47.2 | |
| Competitor names (otter, fireflies…) | 160 | 47.5 | Compare pages aren't ranking yet |

**The real buyer prompts already in GSC** (Lynkk shown at pos 1–9). These are the Step-3 prompts Granola had to research; Lynkk already has them:
- Zoom AI Companion gives us summaries but nothing in our CRM. What other tools close that gap for reps? (96 impr, pos 2.9)
- Rolling out an AI notetaker to 300 reps: which plans include SSO, SCIM and an admin dashboard? (78, 6.9)
- Which third-party LLM providers see prospect call transcripts that an AI notetaker processes? (69, 3.6)
- Options besides Zoom AI Companion for regulated teams needing transcript retention and an audit trail (65, 4.1)
- Which notetakers offer searchable meeting history with source-linked answers? (60, 3.3)
- How do founders keep track of everything said in investor and team meetings? (43, 3.9)
- Do AI notetakers offer volume discounts if we start with leadership and roll out later? (43, 5.1)
- Does Copilot in Teams give enough retention, consent and audit control, or do regulated teams look elsewhere? (38, 6.0)
- What do knowledge workers use to keep track of meeting decisions? (29, 2.3)
- Alternatives to the OpenAI note-taker for Zoom, Meet and Teams with notes organised by project (26, 4.4)
- We're ~30 people and all customer/investor context lives in the founders' heads. How do we get it out? (22, 7.9)
- Which tools keep institutional knowledge from meetings when people leave? (19, 7.0)
- Daily standups: nobody remembers what was said by afternoon. How to keep a record without typing? (19, 7.6)
- Is it worth switching from Copilot in Teams to a separate notetaker if I also use Zoom, Meet and in person? (17, 5.5)
- Which AI tools let me ask questions across all past calls and show where each answer came from? (14, 9.2)
- Admins enforce a recording notice for everyone without a bot joining? ~300 employees (9, 5.0)
- How much do AI notetakers cost for a 20-person product team? (9, 5.8)
- Which notetakers work with MCP-compatible assistants so I can ask about past customer calls? (6, 2.5)
- Does a 40-person sales team need SSO, or is Google login fine? (6, 7.5)
- SAML SSO with Okta / Entra ID plus SCIM deprovisioning? (6, 9.0)
- Which notetakers are enterprise-grade vs built for individuals? (5, 2.6)
- Which notetakers can employees start using without a company-wide IT rollout? (4, 1.0)
- Best value AI notetaker for a company watching software spend? (4, 4.0)
- AI notetakers for all-hands / town halls for people who couldn't attend (4, 3.5)

**Country:** US 10,590 impressions / 9 clicks (pos 31). India 1,436 / 57 clicks (pos 14.7, 4% CTR). UK 1,303 / 3. Canada 728 / 7. The US is where demand is. India is where Lynkk already converts.

**Page-level (top by impressions)**
| Page | Impr | Clicks | Pos | Decision |
|---|---|---|---|---|
| /blog/google-meet-transcript | 5,274 | 7 | 10.1 | **Improve SEO**: top 5 is possible; test the title (the H1 adds "Gemini AI Notes") |
| /blog/voice-memo-transcription | 1,729 | 3 | 11.1 | Improve SEO (iPhone voice memo queries at pos 8–11) |
| /blog/voice-to-text-apps | 1,622 | 0 | 35.4 | **Collect more evidence**: off-core, don't invest yet |
| /blog/action-items-examples-template | 1,214 | 1 | 32.0 | Overhaul as a template asset (Granola-style) |
| /blog/ai-note-taker-microsoft-teams | 1,220 | 0 | 24.0 | Improve SEO + links (880 + 480 + 210 + 210 volume cluster) |
| /blog/best-ai-note-takers | 917 | 3 | 37.2 | Preserve. "best AI note taker" is difficulty 100; don't chase it. |
| /blog/zoom-note-taker | 839 | 3 | 30.0 | Improve SEO |
| /blog/ai-powered-meeting-assistants | 819 | 4 | 35.4 | Improve (India "ai meeting assistant" 1,300/mo at pos 75) |
| /features/meeting-bot | 731 | 11 | 23.7 | Improve: "meeting bot" 144 impr at pos 18.8 |
| /blog/zoom-ai-companion-alternatives | 299 | 0 | **6.0** | **Optimise for AI**: add the CRM-gap and regulated-team angles from the real prompts |
| /features/hinglish-transcription | 289 | 5 | 38.3 | **Overhaul**: only ~976 words; add samples, accuracy notes, an Indian-English section |
| /compare/* (otter, fireflies, granola, gong…) | 2–74 | 0 | 4–8 | Preserve. They rank well for tiny demand; they need links and internal links. |

### 2.3 Authority (the main bottleneck)
| | Lynkk | Granola |
|---|---|---|
| Domain authority (Ubersuggest) | **1** | 47 |
| Referring domains | **3** | 6,112 |
| Backlinks | 4, all nofollow | ~94,000 |
| Est. organic traffic | ~0 | ~39,000/mo |

The citation study found domain authority is **~6x** more important than any page feature. Lynkk's content is already good, so authority is now the main lever.

### 2.4 AI visibility (Ubersuggest, ChatGPT, India, 10 prompts × 2 runs)
- **Lynkk: 0% visibility, 0 mentions, 0 citations.**
- Leaders: Fireflies 45%, Otter 30%, Avoma 25%, Fathom 20%, Notta 20%, Gong 20%. Indian tools that appear: Salesken, Convin, Stenoji, Vaarta, EchoBrief, Meetory.
- **Tracking problem:** the 10 tracked prompts are generic India prompts (e.g. "best AI knowledge management tool for IT companies in India", "action item tracking for Indian SMEs"). Half of them pull in Confluence, Glean, ClickUp and Zoho, which aren't Lynkk's competitors. **None** match the buyer prompts in GSC (2.2). Coverage is ChatGPT only, India only, refreshed monthly.
- Cited sources: **86% third-party**, 14% competitor sites, **0% Lynkk**.

### 2.5 Citation gap list: the exact sources ChatGPT cites (OCEC "Earn / Contest" targets)
Pages ChatGPT cites for Lynkk's prompts that list competitors but not Lynkk. **Most are low authority (DR 1–16)**, so a new brand can get onto them.

| Source (DR) | Topic | Brands on page |
|---|---|---|
| learnai.how/meeting-transcription-showdown (2): "Otter vs Fireflies vs Zoom AI: **India** Review" | Transcription | Fireflies, Otter |
| noterai.net/alternatives/otter-vs-fireflies (9) | Transcription | Fathom, Fireflies, Otter |
| spotsaas.com/blog/best-conversation-intelligence-software (41) | Conv. intelligence | Avoma, Fireflies |
| dupple.com/learn/best-conversation-intelligence-software (30) + /best-ai-knowledge-management-tools | CI + KM | Avoma, Fathom, Fireflies, Otter |
| **knowledgesense.in/best-ai-meeting-assistants-india-2026 (15): "INR Pricing Compared"** | AI notetaker India | Fathom |
| **growthnow.in/best-ai-notetaker-2026 (11)** | AI notetaker | Avoma, Fathom, Fireflies, Otter |
| **zendikt.com/top-10-conversation-intelligence-software/india (7)** | CI India | Avoma, Fireflies, Otter |
| cleverly.co/blog/conversation-intelligence-tools (30) | CI | Avoma, Fathom |
| comparecrest.com/best-ai-note-takers (5) | AI notetaker | Fathom, Otter, Tactiq |
| aitoolwise.com/best-ai-note-taker (10) | AI notetaker | Fathom |
| aitoolbriefing.com/comparisons/otter-vs-fireflies-2026 (9) | Transcription | Fireflies, Otter |
| techsifted.com/comparisons/fireflies-vs-otter-vs-fathom-2026 (16) | Transcription | 4 competitors |
| aicentralresources.com (9), stratilyze.com (1), vexascribe.com (13), flowith.io (27), insideaimedia.com (8), newsdigestai.com (5), nivision.ai (3), softwarecompare.net (3) | Various | Competitors |
| Also cited: appadvisor.in, echobrief.in, stenoji.com, cuelyte.com, convin.ai, salesken.ai, eesel.ai | India / CI | — |

---

## 3. Granola vs Lynkk: gap analysis

| Granola had | Lynkk today | Gap / action |
|---|---|---|
| Market defined from sales conversations | Not documented | Step 1 workshop |
| Buyer prompt set, measured on multiple engines | 10 generic India prompts, ChatGPT only | **Rebuild the prompt set from GSC** |
| Category page ("AI notepad") | Homepage positioned for sales teams | Category page for "meeting memory" |
| ~20 self-pricing / "is it worth it" pages | 1 pricing page + competitor-pricing posts (Otter, Fireflies, Fathom, Gong, Granola) | Add Lynkk's own pricing-intent pages |
| Enterprise / trust cluster (~20 pages) | None | Product + content (biggest prompt cluster) |
| ~35 persona pages | 10 use-case pages | Add founders, PMs, CS, recruiters, consultants |
| Comparison + "best X" guides | 13 compare pages + 7 "best" posts | Good. Needs links and freshness. |
| ~60 templates (link magnets) | ~6 | Expand gradually |
| 14 integration pages | 11 | OK. Add MCP/ChatGPT/Claude if built. |
| Customer stories, changelog, startup/student programmes | None | Build |
| 6,112 referring domains, Reddit programme | 3 referring domains, no Reddit | **#1 priority** |
| FAQ + glossary on every post | FAQ yes, glossary no | Add short glossaries |

---

## 4. The Lynkk plan (Granola's method, adapted to a DR-1 brand)

**Strategy in one line:** Lynkk's content engine already exists. Over the next 90 days, (1) **point it at the prompts Google already cites Lynkk for**, (2) **build the trust layer** those prompts ask about, and (3) **close the authority gap** through the exact sources AI cites.

**Positioning to lead with:** _"Meeting memory: ask across every meeting and get answers with the date and minute of each source. Works on Zoom, Meet, Teams and in person, with or without a bot. Hinglish and 17 languages. $15/month."_ This matches Lynkk's two strongest clusters (memory 5.8, security 6.0) and Granola's own move from "notetaker" to "notepad / company context".

### Step 1 — Define the market (Week 1)
- Run Lynkk on your own sales, onboarding and support calls, then use Ask Lynkk to pull every phrase prospects use to describe the problem. This is Granola's main input. Add the onboarding question "what made you sign up?"
- Lock in 5 ICPs and order them by how well the data supports them:
  1. **Founders / small-company leaders** (investor + customer context "in the founders' heads")
  2. **Sales teams leaving Zoom AI Companion / Copilot** (CRM gap, multi-platform). Lynkk has HubSpot, Salesforce, Pipedrive, Attio and Zoho integrations.
  3. **Ops / IT buyers rolling out to a team** (SSO, retention, LLM data handling, pricing at scale)
  4. **Product / engineering managers** (decisions → Jira, standups)
  5. **Indian and multilingual teams** (Hinglish, Indian-English accents, INR pricing)
- Create a **source-of-truth sheet** (CITABLE "L"): price ($15 / $117), free-plan limits, languages (17), integrations, what Lynkk does **not** do (no iPhone/Android app, no public API, no Outlook). Keep it consistent across site, llms.txt, G2 and directories.

### Step 2 — Map Google keywords (Week 1–2)
One sheet: keyword → ICP → URL or gap → single action. Priority set (US volume / difficulty):

| Keyword | Vol | Diff | Target URL |
|---|---|---|---|
| meeting transcription software (+ best …) | 480 + 90 | 8 / 25 | **New**: /meeting-transcription-software (Granola's top-3 term) |
| google meet transcript cluster | 150+ impr in GSC | — | /blog/google-meet-transcript |
| google meet ai note taker / ai note taker for google meet | 1,600 / 880 | 62 / 48 | /blog/google-meet-ai-note-taker (#15 in India already) |
| microsoft teams ai note taker / for microsoft teams / ms teams / does teams have one | 880 / 210 / 210 / 480 | 47 / 34 / 33 / 44 | /blog/ai-note-taker-microsoft-teams |
| zoom ai note taker / zoom note taker | 480 / 70 (IN) | 45 | /blog/zoom-note-taker |
| meeting bot / zoom bot join meeting | GSC 144 + 120 | — | /features/meeting-bot, /blog/zoom-bot-join-meeting |
| bot-free AI note taker / doesn't join meetings | 170 + 170 | 28 / 76 | **New**: bot-free page (Mac app + Chrome extension) |
| hinglish transcription / hindi transcription | 110 + | 44 | /features/hinglish-transcription, /blog/hindi-transcription |
| ai meeting assistant (India) | 1,300 | 60 | /blog/ai-powered-meeting-assistants (now #75) |
| iPhone voice memo transcription | GSC pos 8–11 | — | /blog/voice-memo-transcription |
| Avoid for now | ai note taker (49,500, diff 97), best ai note taker (diff 100) | | |

### Step 3 — Map AI prompts and re-set tracking (Week 1)
**Replace all 10 Ubersuggest prompts** with prompts taken from GSC, split by cluster. Track **US + India**, and add Gemini / Google AI Overviews if your plan allows:

1. Which notetakers offer searchable meeting history with source-linked answers?
2. How do founders keep track of everything said in investor and team meetings?
3. Zoom AI Companion alternatives that sync notes to our CRM for sales reps
4. Is it worth switching from Copilot in Teams to a separate notetaker if we also use Zoom, Meet and in-person?
5. Which AI notetakers share transcripts with third-party LLM providers?
6. Best AI notetaker for a 20-person team watching software spend (pricing)
7. Which AI notetaker records meetings without a bot joining?
8. Best AI notetaker for Hinglish / Hindi-English meetings
9. Best meeting transcription software for Indian English accents
10. Which AI notetakers turn meeting action items into Jira tickets?

Also: add **Granola and Notta** as tracked competitors (replace Tactiq, which had 0% visibility). Keep a larger list of ~40 prompts in a sheet and spot-check them by hand monthly in ChatGPT, Gemini, Perplexity and Google AI Mode. Run each prompt **several times**, because answers vary (Discovered Labs re-runs each ~10x).

### Step 4 — Measure: three scoreboards (set up Week 1)
| Google (classic) | AI search | Business |
|---|---|---|
| Non-branded clicks (GSC, exclude "lynkk") | AI mention rate + citation rate on the 10 tracked prompts (Ubersuggest) | Signups and **activated users** from organic + AI (GA4 + product DB) |
| Avg position of the 15 priority pages | **GSC "AI-Mode proxy"**: impressions of 8+ word queries where position ≤ 10 (baseline ~1,200/quarter) | GA4 referral segment: chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, claude.ai |
| Referring domains (Ubersuggest) | Number of citation-gap sources (2.5) that now list Lynkk | Add a "How did you hear about us?" field with a "ChatGPT / AI assistant" option |

**Baseline (30 Oct 2026):** 4 non-branded clicks/quarter · 0% AI visibility · DA 1 · 3 referring domains · 0 of 22 gap sources listing Lynkk.

### Step 5a — Content: one action per page

**A. Optimise existing pages for the real prompts (Weeks 2–4)**
| Page | Action | Specific change |
|---|---|---|
| /features/ask-your-meetings | **Optimise for AI** | Make it the answer to "searchable meeting history with source-linked answers". Question as H1, 40–60 word answer, a sample answer with timestamps, a comparison table (Lynkk vs Fireflies AskFred vs Otter Chat vs Granola Chat). |
| /blog/zoom-ai-companion-alternatives | Optimise for AI | Add H2s for the real prompts: "…but nothing in our CRM", "…for regulated teams (retention, audit trail)", "…that also cover Meet and in-person". Add the CRM integration table. |
| /blog/ai-note-taker-microsoft-teams | Improve SEO + AI | Add "Is it worth switching from Copilot?" and "Copilot retention, consent and audit control" sections. Build internal links from all Teams pages. |
| /blog/founders-meeting-notes | Optimise for AI | Retitle around the prompt "How founders keep track of everything said in investor and team meetings". |
| /blog/meeting-knowledge-management | Optimise for AI | Answer "keep institutional knowledge when people leave" and "track meeting decisions". |
| /blog/google-meet-transcript, /voice-memo-transcription | Improve SEO | Test titles. Move the direct answer into the first 2 lines. Add internal links from the homepage/blog hub. |
| /features/hinglish-transcription | Overhaul | 976 → ~1,800 words: sample transcript, Indian-English accent handling, Tamil/Telugu/Marathi/Bengali beta, an honest limits section, comparison vs Otter/Fireflies/Notta on Hindi. |
| Homepage | Positioning test | Keep sales, but lead the H1/title with "meeting memory for teams" and link to the memory, security and pricing pages. Cut the 1.1 MB HTML and fix mobile LCP (4.7s). |
| BANT / MEDDIC / SPIN / forecast posts | **Preserve, stop producing** | Move effort to the prompt clusters. Only continue sales-methodology posts if each ties to a Lynkk workflow (e.g. "MEDDIC fields auto-filled from call notes"). |

**B. New pages for real gaps (Weeks 3–8), in priority order**
1. **/meeting-memory**: category page, Granola's "/ai-note-taker" equivalent. "What is meeting memory?", vs. note takers, how Ask Lynkk cites sources, FAQ, glossary.
2. **/security/ai-providers**: plain list of which AI/LLM providers process audio and transcripts, retention at each step, "we don't train on your data", regional processing (India/US). This answers 4 of the top 10 prompts. Only publish facts you can stand behind.
3. **/pricing/teams** (+ blog "How much do AI notetakers cost for a 10 / 20 / 50-person team?" with a calculator table vs Otter, Fireflies, Fathom, Granola, Copilot, Zoom AI Companion). Pricing pages are the #1 cited format.
4. **"Is Lynkk worth it?" pages per ICP**: founders, sales teams, PM teams. Copies Granola's self-pricing cluster.
5. **/meeting-transcription-software**: commercial page, difficulty 8. Granola ranks top 3 here with a similar page.
6. **Bot-free AI note taker**: Mac app + Chrome extension; "record without a bot joining"; recording notice and consent.
7. **Rolling out an AI notetaker to your team**: honest SSO/SCIM status, admin controls, workspaces, Enterprise route, volume pricing, "start with leadership and expand".
8. **Copilot in Teams vs Lynkk** and **Zoom AI Companion vs Lynkk**: /compare pages (the strongest prompt cluster).
9. **Persona pages**: /use-cases/founders, /use-cases/product-managers, /use-cases/customer-success, /use-cases/recruiters, /use-cases/consultants.
10. **India cluster**: "Best AI meeting notetakers in India (INR pricing)", "AI notetaker for Indian English accents", "Hindi meeting transcription". Owned versions of the India pages ChatGPT already cites.
11. **MCP / "ask your meetings from ChatGPT or Claude"**: only if Lynkk builds it. Granola's MCP post earned 1,931 backlinks, and GSC already shows an MCP prompt at pos 2.5.

**C. Templates (link magnets, 1/week from Week 6):** standup notes, 1:1 agenda, decision log, meeting minutes (board/committee), follow-up email (Granola's ranks #6 for a 1,900/mo term), QBR. Each one links to the matching Lynkk feature.

**D. Format rules for every page** (Lynkk already does most of these):
- Question as H1/title using the prompt's wording
- 40–60 word answer in the top third
- Key-facts box
- One table under 10 rows
- FAQ
- Short glossary
- "Updated" date
- One sourced, quotable fact per section
- An honest "where we're not the best pick" section
- Avoid thin listicles (−0.12 effect)

**E. Refresh cadence:** comparison and pricing pages monthly; everything else quarterly. Claude's citations are 60% under 6 months old.

### Step 5b — Technical (Weeks 2–3)
Already good: AI crawler access, llms.txt, sitemap, canonicals, schema, redirect of old /articles URLs.
To do, ranked by impact:
1. **Mobile performance:** LCP 4.7s → under 2.5s. Cut homepage HTML (1.1 MB), remove ~200 KB of unused JS, fix the redirect chain (630 ms on mobile) and server response (~530–640 ms).
2. **Internal linking:** blog hub → priority pages; every post → one feature + one compare page; the compare pages currently get almost no internal weight.
3. **Bing Webmaster Tools** + IndexNow (feeds ChatGPT search and Copilot); submit the sitemap.
4. Make sure core content renders without JavaScript (check a few pages with JS off).
5. Run the Ubersuggest site audit and fix only issues on the 15 priority pages.
6. Verify each fix (GSC URL inspection) and re-test that AI bots can fetch the page.

### Step 5c — Links & mentions with OCEC (start Week 1; the biggest lever)
**Own:** site, llms.txt, changelog (/updates: Granola's has 73 referring domains), customer stories.

**Claim (Weeks 1–3):** G2, Capterra, GetApp, Software Advice, TrustRadius, Product Hunt, SaaSHub, AlternativeTo, There's An AI For That, Futurepedia, Crunchbase, LinkedIn, Wikidata entry, **Chrome Web Store** listing, Zoom App Marketplace, Google Workspace Marketplace, Slack App Directory, Atlassian (Jira) Marketplace, HubSpot / Pipedrive / Attio app listings. Use the same description and facts everywhere (CITABLE "L").

**Earn (Weeks 2–12):**
- **Get listed on the 22 citation-gap pages** (section 2.5). Pitch each author with a short note, a free Pro account and the source-of-truth sheet. Start with the India ones (knowledgesense.in, growthnow.in, zendikt.com, learnai.how), then dupple.com, spotsaas.com and cleverly.co.
- Reviews: 15–25 G2/Capterra reviews from current users (Granola-style quarterly review drive).
- Indian startup media and communities: YourStory, Inc42, Entrackr guest posts; founder podcasts; Product Hunt launch.
- Programme pages that earn links: **/startups** (e.g. 6–12 months of Pro free) and **/students**. Granola's students page has 21 referring domains.
- Original data: e.g. "We analysed X hours of Hinglish meetings: how often people switch languages mid-sentence". Data earns press links and AI citations.
- **Reddit** (Granola's April move): ChatGPT gives ~27% of its search slots to Reddit. Answer the exact prompts from 2.2 in r/sales, r/startups, r/ProductManagement, r/SaaS, r/IndiaStartups, r/productivity, r/msp. Disclose that you're from Lynkk. Use Discovered Labs' free "Reddit Threads Finder" to find threads AI already cites.
- **YouTube:** cited across all engines. Short demos: "Ask your meetings with sources", "Hinglish transcription", "record Zoom without a bot".

**Contest:** directories or listicles with wrong Lynkk facts (pricing, languages). Fix them as you find them. Set a Google Alert for "Lynkk".

### Step 5d — Product items marketing needs (raise with the team)
The prompts Google already cites Lynkk for ask about things Lynkk can't yet claim. Granola built these and wrote about each one:
- SSO (Google/Microsoft first, then SAML), SCIM, admin dashboard for workspaces over 10 seats
- Retention settings / auto-delete, audit log export
- SOC 2 (start Type 1) and a public sub-processor list
- MCP / ChatGPT / Claude connector ("ask your meetings from your assistant")
- iPhone/Android app (Granola's Android launch post ranks for its own keyword)

Until these exist, write **honest** pages ("what Lynkk supports today, and what's on the roadmap"). Never claim a feature that isn't live.

---

## 5. 12-week calendar

| Week | Google | AI search | Authority | Measure |
|---|---|---|---|---|
| 1 | Keyword sheet, source-of-truth sheet | Replace 10 tracked prompts; add Granola/Notta | Claim G2, Capterra, Product Hunt, marketplaces | GA4 AI-referral segment, "how did you hear" field, baseline |
| 2 | Mobile speed + internal linking + Bing | Optimise /features/ask-your-meetings | Claim the rest; ask 25 users for reviews | — |
| 3 | Title tests on Meet / voice memo / Teams posts | Optimise Zoom AI Companion + founders + KM posts | Pitch 8 India citation-gap sites | — |
| 4 | — | **New: /meeting-memory, /security/ai-providers** | Reddit: 3 helpful answers/week | Month-1 report |
| 5 | /meeting-transcription-software | **New: team pricing page + cost-per-team post** | Pitch dupple, spotsaas, cleverly, comparecrest | — |
| 6 | Template #1 | New: bot-free page; Copilot vs Lynkk | /startups programme live | — |
| 7 | Template #2 | New: Zoom AI Companion vs Lynkk; rollout guide | YourStory/Inc42 pitch; YouTube demo #1 | — |
| 8 | Hinglish overhaul | New: India "best AI notetakers (INR)" | Original-data study fieldwork | Month-2 report: retest all prompts |
| 9 | Template #3 | Persona pages: founders, PM | Product Hunt launch | — |
| 10 | Template #4 | Persona pages: CS, recruiters | Publish data study + outreach | — |
| 11 | Refresh compare + pricing pages | "Is Lynkk worth it?" pages | YouTube demos #2–3 | — |
| 12 | Refresh top 10 pages | Retest 10 tracked + 40 manual prompts | Review the link list | **Quarter report, plan Q2** |

## 6. 90-day targets (realistic for a 1-month-old, DR-1 site)

| Metric | Baseline (30 Oct) | 90-day target |
|---|---|---|
| Non-branded clicks / month | ~2 | 150–300 |
| AI-Mode proxy (8+ word queries in top 10, impr/month) | ~400 | 1,500+ |
| Tracked-prompt AI visibility (new prompt set) | 0% | 15–25% |
| Citation-gap sources listing Lynkk | 0 / 22 | 8+ |
| Referring domains | 3 | 40–60 |
| G2 + Capterra reviews | 0 | 20+ |
| Priority pages in Google top 10 (classic) | ~3 | 12+ |
| Signups from organic + AI referrals | measure from Week 1 | 3x the Week-4 level |

## 7. Data that would sharpen this further
1. **GA4 / product data:** signups and activations by source, especially chatgpt.com, perplexity.ai and gemini referrals.
2. **GSC filtered to the US**, and the **Search Appearance / AI Mode** report if available, to confirm the AI-citation pattern.
3. Whether Lynkk can share its **AI sub-processors** and its roadmap for SSO, SOC 2 and retention (decides how pages #2 and #7 are written).
4. 10–20 **sales/onboarding call notes** for Step 1.
5. Team capacity: pages per week and who owns outreach and Reddit.
