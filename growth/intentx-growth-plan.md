# IntentX — Inbound & Growth Plan

**Domain:** intentx.run · **Product:** AI-native browser (Mac GA, Windows preview)
**Prepared:** 27 Oct 2026 · **Horizon:** 12 months, with a detailed first 90 days

---

## 1. Executive summary

IntentX is a late entrant in a category where the head terms are already owned by $10B+ brands, and it is starting from a literal zero: **Domain Authority 1, one referring domain, five ranking keywords, ~1 visit/month of organic traffic.** Trying to win "ai browser" head-on in year one would be a waste of budget.

But the category just cracked open. **OpenAI shut down ChatGPT Atlas on 9 August 2026**, orphaning a cohort of macOS users who had already self-selected into "I want an AI browser." IntentX is Mac-first. That is the single best-timed demand pocket available right now, and almost nobody is competing for it.

The strategy has three legs:

| Leg | What it means | Why it works |
|---|---|---|
| **1. Harvest the refugees** | Own every "Atlas alternative / Atlas shut down / what do I use now" query and community thread | Zero competition, highest-intent audience in the category, works at DA 1 |
| **2. Own the connected-work wedge** | Position against Comet/Dia on *MCP + connected apps + approval-gated actions*, not on "AI in a browser" | Comet owns search-flavoured browsing; nobody owns "my browser does work in my actual tools" |
| **3. Win on trust** | Make IntentX the browser that is safe to let act — prompt injection, approvals, audit | Prompt injection is the category's #1 unresolved objection; it is a moat *and* a content goldmine |

**The one-line positioning:** *Comet reads the web for you. IntentX does the work in your tools — and asks before it acts.*

**Year-one targets:** 25k monthly organic sessions, 1,200 referring domains → DA 25–30, 60k downloads, 18% D30 retention, CAC under $9 blended.

---

## 2. Baseline audit (measured, not estimated)

### 2.1 Where intentx.run stands today

| Metric | Value | Read |
|---|---|---|
| Organic keywords | 5 | Effectively unindexed for anything commercial |
| Est. organic traffic | ~1/mo | Zero |
| Domain Authority | 1 | No link equity whatsoever |
| Backlinks / referring domains | 1 / 1 | The single biggest constraint on everything below |
| Paid keywords | 0 | No paid presence |

The only three keywords ranking are all from one blog post (`/blog/why-do-we-still-have-so-many-tabs-open/`) at positions **43, 50 and 76** — for "how many tabs are open" (40/mo), "why do i have so many tabs open" (40/mo), "many tabs open" (210/mo). Informational, non-commercial, and not even on page 4. This tells you the content engine is producing but has no authority behind it.

**Implication:** for the first ~6 months, *link acquisition and community distribution matter more than content volume*. Publishing 100 posts at DA 1 gets you 100 posts at position 50. Fix the authority problem in parallel or nothing ranks.

### 2.2 Technical baseline

PageSpeed, measured:

| Metric | Desktop | Mobile |
|---|---|---|
| LCP | 681 ms ✅ | **3.4 s ⚠️** |
| FCP | 368 ms ✅ | 1.4 s ✅ |
| Speed Index | 838 ms ✅ | **4.5 s ⚠️** |
| TBT | 0 ms ✅ | 48 ms ✅ |
| CLS | 0 ✅ | 0 ✅ |

Desktop is genuinely excellent. Mobile LCP at 3.4s fails Core Web Vitals (<2.5s), and **a redirect chain is costing 630ms on mobile / 190ms on desktop** — the single cheapest fix on the whole site. Mobile matters here even though the product is desktop-only: a large share of discovery traffic (Reddit, X, LinkedIn, Google) arrives on a phone, reads, and installs later on desktop. A slow mobile page kills the top of that funnel.

### 2.3 Site architecture gaps

Current structure: `/`, `/how-it-works`, `/connections`, `/agents` (+ per-agent pages), `/automations`, `/blog`, `/releases`, `/privacy`, `/security`, `/support`.

Two structural misses:

- **`/connections` is a single page listing 10 integrations with icons and no links.** Gmail, Google Drive, Docs, Sheets, WordPress, Atlassian, Canva, GitHub, Sentry, Asana — ten high-intent commercial entities, all collapsed into one URL that can rank for none of them. This is the largest untapped SEO asset on the site.
- **`/agents` does it right** — six agents, each with its own URL (`/agents/job-search/`, `/agents/market-scout/`). That pattern is correct and should be extended aggressively.

There is also **no `/compare/` directory and no `/alternatives/` directory** — the two page types that drive essentially all organic traffic for every competitor in this space.

---

## 3. Competitive landscape

### 3.1 The field, tiered by threat

**Tier 1 — Distribution giants (cannot be beaten, must be flanked)**

| Player | Position | Real weakness to attack |
|---|---|---|
| **Chrome + Gemini** | Default for ~3B users; Gemini auto-browse rolled out broadly in 2026 | Generic, shallow, no real third-party tool actions, zero project organisation. Google will never ship deep MCP connections to competitors' apps. |
| **Edge + Copilot** | Enterprise default, mature admin controls | Only compelling inside a Microsoft estate; weak for Google Workspace / Atlassian / GitHub-centric teams |

Do not bid on these brands or write "IntentX vs Chrome" as a feature war. Write it as *"you don't have to leave Chrome to try this"* — a migration-anxiety page, not a comparison.

**Tier 2 — Direct rivals (the actual battleground)**

| Player | Position | Weakness to attack |
|---|---|---|
| **Perplexity Comet** | The category's default answer. Free across Mac/Win/iOS/Android since 2026. DA 77, 93.5k referring domains. Brand demand is enormous: *"comet ai browser"* = **18,100/mo** | It's a *search* browser. Agentic actions roll out cautiously. Its architecture took the public prompt-injection hit (Brave's research on hidden-text attacks pulling OTPs from email). Thin on connected-app write-actions and project structure. |
| **Dia (The Browser Company / Atlassian)** | Design-led, "skills", knowledge-work framing | Limited availability — Windows still gated well into 2026. Design-forward but shallow on integrations. Atlassian ownership makes it Jira-flavoured, which cuts both ways. |
| **Opera Neon** | Agentic, went free Aug 2026 after launching at $19.90/mo | Little mindshare in US knowledge work; Opera brand reads consumer/gaming |
| **Sigma Browser** | The SEO machine of the category (see 3.3) | Weak product differentiation; wins on content, not capability |
| **Fellou, Genspark, Tabbit, Ace, Strawberry, Norton Neo** | Long tail of 2026 entrants, 40–260/mo brand volume each | All fighting for the same scraps; each is a cheap comparison page for IntentX |

**Tier 3 — Adjacent substitutes**

ChatGPT / Claude desktop apps + Chrome extensions, Brave Leo (privacy pick, local chats), browser-automation frameworks (Browser Use, Playwright MCP, Axiom). These matter because they are what your prospect is *actually* doing today: copy-pasting a page into a chat window. IntentX's homepage already names this ("Stop copying content into AI chats") — that is the right enemy.

**The vacated seat: ChatGPT Atlas.** Mac-only, shut down 9 Aug 2026, folded into ChatGPT/Codex. Bookmarks had to be exported manually; tabs, history and logins did not transfer. Residual brand demand is still live and measurable: *"atlas ai browser"* 480/mo, *"open ai browser atlas"* 210/mo, *"atlas open ai browser"* 90/mo, *"ai browser atlas"* 50/mo, *"chatgpt atlas alternative"* 30/mo at **$8.07 CPC** (plus "…for windows" at 10/mo). Individually small; collectively a few hundred monthly searches of people with proven intent, no product, and a known migration pain (manual export). **At DA 1 these are winnable within weeks.** Nobody else is treating this as a campaign.

### 3.2 Competitive positioning map

Two axes that matter: **breadth of what the AI can act on** (read-only ↔ writes into your real tools) and **how much the user trusts it** (opaque ↔ auditable + approval-gated).

- Chrome/Gemini, Brave Leo: read-only, opaque-ish → *commodity assistance*
- Comet, Neon: broad action, thin controls → *fast but scary*
- Dia: medium action, good taste → *pleasant but shallow*
- **IntentX's target quadrant: broad action + explicit approvals + MCP openness** → *"agentic you can actually deploy"*

That quadrant is open, and it is the only one an enterprise buyer can say yes to.

### 3.3 The playbook to copy: Sigma Browser

Sigma is not the best product in this category but it is winning the most search traffic, and its method is fully legible:

| Sigma, measured | Value |
|---|---|
| Domain Authority | 31 |
| Organic keywords | 4,972 |
| Est. monthly organic traffic | 12,390 |
| Referring domains | 942 |
| Trajectory | 141 visits (Jan 2025) → 12,390 (Sep 2026) |

Its entire top-pages list is one of three templates:

1. **`X vs Y` comparisons** — "opera vs chrome", "brave vs opera", "firefox vs edge", "duckduckgo vs firefox", "zen browser vs firefox". These rank at positions 4–6 on 140–480/mo terms and compound.
2. **`N best / alternatives` listicles** — "9 best brave browser alternatives", "best chromium-based browsers", "best private browsers for iphone".
3. **Adjacent-pain explainers** — "why do i keep getting logged out of websites", "is safari private browsing really private", "what is lateral reading".

It reached 12k/mo at DA 31 and 942 referring domains. **That is a realistic, evidenced 12-month target for IntentX, and the template is free to take.** Note that it also writes comparisons between browsers *that aren't Sigma* — that's how you build topical authority on a brand nobody searches for yet.

---

## 4. Positioning, messaging and ICP

### 4.1 The wedge

Everyone in this category sells "AI in your browser." That claim is now worthless — Chrome ships it to three billion people for free. IntentX has to sell something Chrome structurally cannot ship:

> **Your browser, working inside the tools you already pay for — with a hand on the brake.**

Three proof pillars, each mapped to a competitor weakness:

| Pillar | Message | Attacks |
|---|---|---|
| **Connected, not just conversational** | MCP + AutoConnect + 10 named apps. It files the Jira ticket, updates the Sheet, drafts in Docs. | Comet (reads), Gemini (can't touch your stack) |
| **Approval-gated by default** | "Nothing submitted until you review." Drafts are editable. External changes need a yes. | Comet's injection exposure; every enterprise ban on agentic browsers |
| **Projects, not tabs** | Spaces group tabs *and* apps per project | Chrome's tab sprawl; the pain your own best-performing blog post already ranks for |

### 4.2 ICP segments, ranked by winnability

| # | Segment | Why them | Entry hook |
|---|---|---|---|
| 1 | **Atlas refugees (Mac, prosumer)** | Proven intent, no product, migration pain | "Coming from Atlas? Here's your 5-minute move" |
| 2 | **Solo operators / indie founders** | Already stitching AI into Docs/Sheets/GitHub by hand; decide alone | MarketScout, revenue/churn questions |
| 3 | **Technical ICs using MCP** | MCP fluency = they immediately get the differentiator; high-signal evangelists | "Bring your own MCP server" |
| 4 | **Small product/ops teams (5–50)** | Jira/Asana/Sentry loop is exactly the demoable workflow | "Feedback → follow-ups → Jira issues, after approval" |
| 5 | **Recruiters / job seekers** | The Job Search agent is a standalone wedge with its own huge search universe | Job Search agent |
| 6 | **Enterprise (defer to month 9+)** | Needs SSO, admin policy, audit logs, SOC 2 — don't market ahead of the product | Security/trust content now, sales later |

---

## 5. Keyword research

All volumes US monthly, SD = SEO difficulty (0–100), CPC in USD. Ordered by priority, not volume.

### 5.1 Cluster A — Atlas migration (ship first; winnable at DA 1)

| Keyword | Vol | SD | CPC | Target URL |
|---|---|---|---|---|
| atlas ai browser | 480 | 64 | $11.32 | `/alternatives/chatgpt-atlas` |
| open ai browser atlas | 210 | 64 | — | same |
| atlas open ai browser | 90 | 69 | — | same |
| chatgpt atlas alternative | 30 | 21 | $8.07 | same |
| ai browser atlas | 50 | 25 | $4.55 | same |
| atlas agentic browser | 10 | 19 | — | same |
| chatgpt atlas alternative for windows | 10 | 10 | $2.71 | `/alternatives/chatgpt-atlas-windows` |

**Note the SD split.** The brand terms (SD 64–69) are hard because news sites own them. The *intent* terms — "alternative", "for windows" — are SD 10–25 and genuinely available. Build one strong hub at `/alternatives/chatgpt-atlas` plus a Windows variant, and a "how to move your bookmarks from Atlas" utility post that earns links from the news coverage.

### 5.2 Cluster B — Competitor conquest (the Sigma template)

| Keyword | Vol | SD | CPC |
|---|---|---|---|
| comet ai browser | **18,100** | 51 | $14.46 |
| perplexity comet ai browser | 1,600 | 52 | $6.02 |
| perplexity ai browser | 1,000 | 56 | $2.23 |
| is comet ai browser safe | 320 | 33 | — |
| comet ai browser download | 390 | 59 | $1.97 |
| dia ai browser | 260 | 40 | — |
| genspark ai browser | 320 | 41 | $8.72 |
| opera ai browser | 210 | 71 | $1.84 |
| sigma ai browser | 210 | 28 | $7.97 |
| ace ai browser | 260 | 21 | $5.95 |
| fellou ai browser | 140 | 20 | $9.49 |
| neo ai browser | 110 | 26 | **$16.77** |
| comet ai browser review | 50 | 28 | — |
| comet browser alternative | 30 | 30 | — |
| comet ai browser reddit | 90 | 30 | — |
| is ace ai browser safe | 110 | 29 | — |

**Strategy:** do not chase "comet ai browser" (18,100/mo, SD 51) — Perplexity owns it with DA 77. Chase the *modifier* layer, where SD collapses to 28–33 and intent is sky-high: **"is comet ai browser safe" (320, SD 33)**, "comet ai browser review" (50, SD 28), "comet browser alternative" (30, SD 30), "comet ai browser reddit" (90, SD 30). Someone searching *"is Comet safe"* is pre-sold on the category and actively anxious about exactly the thing IntentX is built to answer. That is the highest-conversion query in this entire research set.

Low-SD brand terms worth a comparison page each: Ace (21), Fellou (20), Sigma (28), Neo (26 — and $16.77 CPC, meaning real commercial value).

### 5.3 Cluster C — Category head & mid terms (months 4–12)

| Keyword | Vol | SD | CPC |
|---|---|---|---|
| ai browser | **9,900** | 30 | $4.38 |
| agentic browser | 1,300 | 39 | **$14.14** |
| ai browser extension | 1,000 | 53 | $5.61 |
| best ai browser | 880 | 29 | $6.32 |
| ai browser agent | 320 | 54 | **$14.72** |
| ai native browser | 260 | 41 | $2.54 |
| new ai browser | 210 | 47 | $5.87 |
| ai browser automation | 170 | 57 | $11.32 |
| agentic ai browser | 140 | 34 | $3.58 |
| what is an ai browser | 140 | 43 | — |
| best agentic browser | 90 | 32 | $13.55 |
| what is an agentic browser | 90 | 28 | $1.25 |
| ai browser for windows | 110 | 43 | $12.71 |
| best ai browser for mac | 50 | 26 | $11.41 |
| ai browser for mac | 50 | 29 | $7.31 |
| best ai browser for windows | 40 | 33 | $6.10 |
| top ai browser | 70 | 27 | $7.98 |
| free ai browser | 110 | 42 | $6.69 |

**"ai browser" at 9,900/mo and SD 30 is the prize** — unusually soft difficulty for that volume, because the category is young and the SERP is full of churn-y listicles rather than entrenched authority. It is a month-6+ target, not a month-1 target, and it needs the link profile from Cluster A/B first.

`best ai browser` (880, SD 29) and `best agentic browser` (90, SD 32, $13.55) are self-listicle plays — write the honest roundup that includes competitors, place IntentX by use-case, and keep it genuinely updated. Sigma proves this ranks.

**Platform modifiers are cheap and convert:** "best ai browser for mac" (SD 26), "ai browser for mac" (SD 29), "best ai browser for windows" (SD 33). Ship `/ai-browser-for-mac` and `/ai-browser-for-windows` as proper landing pages, not blog posts.

### 5.4 Cluster D — The trust/safety cluster (highest strategic value)

| Keyword | Vol | SD | CPC |
|---|---|---|---|
| is comet ai browser safe | 320 | 33 | — |
| comet ai browser is it safe | 110 | 39 | — |
| is ace ai browser safe | 110 | 29 | — |
| ai browser prompt injection | 10 | 7 | **$28.85** |
| ai browser security | 20 | 30 | — |
| safest ai browser | <10 | 12 | — |
| is ai browser safe to use | 10 | 15 | — |
| agentic browser security indirect prompt injection | <10 | 4 | — |
| prompt injection attacks ai browser | <10 | 4 | — |
| gartner ai browser risks | 50 | 5 | — |
| ai browser security flaws | 10 | 5 | — |
| is opera ai browser safe | 10 | 5 | — |
| ai browser exploit | <10 | 12 | — |

Volumes here are small. **Ignore the volumes.** Three reasons this cluster is the most valuable on the list:

1. **"ai browser prompt injection" carries a $28.85 CPC at SD 7.** A CPC that high on a volume that low means advertisers with enterprise deal sizes are bidding. That is an enterprise-buyer fingerprint.
2. **"gartner ai browser risks" (50/mo, SD 5)** is someone building an internal risk memo about whether to allow AI browsers. Be the page they cite.
3. This is the cluster that LLMs quote when asked "are AI browsers safe?" — which is the AEO play in §8.

The research backdrop is strong and citable: Brave's work showing hidden page text could steer Comet into cross-site actions (retrieving OTPs from email, opening banking portals) from nothing but a summarise request; Anthropic reporting an unprotected browser agent followed hidden malicious instructions **23.6%** of the time, reduced to **11.2%** with mitigations, and a later Sonnet 4.6 system card reporting **1.29%** scenario ASR on best-of-N browser injection, down from **49.36%** on Sonnet 4.5; academic work on agentic browsers bypassing same-origin policy by acting across domains on the user's behalf; and CSA research on indirect prompt injection in the wild. Treat vendor-reported figures as indicative and always cite the primary source.

**Tone discipline:** publish this as rigorous category education that names IntentX's *own* residual risk, not as FUD against Comet. Fear-mongering about a competitor's CVE gets you dismissed by exactly the technical audience you need. "Here is the attack class, here is what no one has solved, here is specifically what we gate and what we still can't guarantee" earns citations, Hacker News front page, and enterprise trust simultaneously.

### 5.5 Cluster E — MCP / connected work (own this outright)

| Keyword | Vol | SD |
|---|---|---|
| mcp browser | 140 | 29 |
| mcp browser tools | 40 | 27 |
| mcp browser automation | 30 | 46 |
| claude mcp browser | 20 | 14 |
| mcp browser control | 10 | 14 |
| agent mcp browser | <10 | 12 |
| what is mcp browser | <10 | 4 |
| ai mcp browser | <10 | 12 |

Tiny today. **Growing fast, and uncontested.** No browser vendor is ranking for MCP terms. IntentX ships AutoConnect MCP discovery — this is a genuine first-mover claim on a term set that will be 10–20x larger in 18 months. Build `/mcp-browser` as a cornerstone page now and let it age into authority.

### 5.6 Cluster F — Jobs-to-be-done long tail (volume at near-zero difficulty)

Map these to existing agent pages so they convert, not just rank:

| Keyword | Vol | SD | Maps to |
|---|---|---|---|
| many tabs open | 210 | 32 | Spaces (already ranks #76 — fix it) |
| how many tabs are open | 40 | 34 | Spaces (ranks #43) |
| why do i have so many tabs open | 40 | 29 | Spaces (ranks #50) |
| ai browser to apply for jobs | <10 | 4 | `/agents/job-search` |
| comet ai browser job automation | 10 | 5 | `/agents/job-search` |
| best ai browser for automation | <10 | 4 | `/automations` |
| ai browser for canvas quiz / school work | <10 | 4 | **avoid — academic cheating intent** |
| real estate ai browser | <10 | 4 | vertical agent page |
| seo research with mcp browser | <10 | 4 | MarketScout |
| ai browser with local llm | <10 | 4 | privacy/security hub |
| open source agentic browser | 30 | 45 | — |
| ai browser for linux | 30 | 27 | roadmap/waitlist page |

Two flags. **First:** the tab cluster is 290/mo of combined volume where you *already rank* (43/50/76) and where the pain maps perfectly onto Spaces. Rewriting that one post into a proper pillar with internal links to `/how-it-works#spaces` is the highest-ROI single action available on existing content. **Second:** exclude the exam/homework-cheating queries entirely. They convert to users who churn, generate support load, and create brand risk with the enterprise buyers in §4.2.

### 5.7 Keyword prioritisation summary

| Phase | Clusters | Rationale |
|---|---|---|
| **Month 1–2** | A (Atlas), D (safety modifiers), F (tabs) | SD 4–33, winnable at DA 1, high intent |
| **Month 3–4** | B (conquest), E (MCP) | Needs ~50–150 referring domains |
| **Month 5–8** | C mid-tail, platform pages | Needs 300+ referring domains |
| **Month 9–12** | "ai browser", "agentic browser" | Needs 600+ referring domains + topical authority |

---

## 6. SEO plan

### 6.1 Technical (week 1–2 — do these before writing anything)

1. **Kill the redirect chain.** 630ms mobile / 190ms desktop, measured. Likely `http→https→www` or trailing-slash hops. Single biggest perf win, costs one config change.
2. **Fix mobile LCP (3.4s → <2.5s).** Preload the hero asset, serve AVIF/WebP at correct dimensions, inline critical CSS, `font-display: swap`. Desktop is already 681ms so the bottleneck is almost certainly unoptimised hero media on mobile viewports.
3. **Canonical hygiene.** Ubersuggest sees `http://intentx.run/...` in indexed URLs — confirm every internal link, canonical and sitemap entry uses one scheme and one host form.
4. **Schema markup:**
   - `SoftwareApplication` on `/` and `/download` (name, OS, price, rating, screenshots) — this is what wins the rich result for "ai browser" type queries
   - `FAQPage` on security, how-it-works, each comparison page
   - `HowTo` on migration and setup guides
   - `Article` + `author` + `datePublished` on all blog posts (E-E-A-T)
   - `BreadcrumbList` sitewide
   - `Organization` with `sameAs` to all social profiles
5. **XML sitemaps split by type** (`pages`, `blog`, `agents`, `connections`, `compare`) for cleaner Search Console diagnostics.
6. **Instrument properly now:** GSC + Bing Webmaster + GA4 (or Plausible) + a download→activation→retention event chain. You cannot optimise what you are not measuring, and retrofitting attribution after a launch spike is painful.
7. **`llms.txt` at root** plus clean semantic HTML — see §8.

### 6.2 Information architecture — the pages that don't exist yet

```
/
├─ /download                      (+ /download/mac, /download/windows)
├─ /how-it-works
├─ /ai-browser-for-mac            ← NEW, targets SD 26–29 platform terms
├─ /ai-browser-for-windows        ← NEW
├─ /mcp-browser                   ← NEW, cornerstone, uncontested
├─ /connections                   ← EXPLODE into children:
│   ├─ /connections/gmail
│   ├─ /connections/google-sheets
│   ├─ /connections/google-docs
│   ├─ /connections/google-drive
│   ├─ /connections/github
│   ├─ /connections/jira  (+ /atlassian)
│   ├─ /connections/asana
│   ├─ /connections/sentry
│   ├─ /connections/canva
│   ├─ /connections/wordpress
│   └─ /connections/mcp-servers
├─ /agents                        ← already correct; extend to 25–30
├─ /automations
├─ /compare/                      ← NEW directory
│   ├─ /compare/intentx-vs-comet
│   ├─ /compare/intentx-vs-dia
│   ├─ /compare/intentx-vs-chrome-gemini
│   ├─ /compare/intentx-vs-edge-copilot
│   ├─ /compare/intentx-vs-opera-neon
│   ├─ /compare/comet-vs-dia            ← rank without mentioning yourself
│   └─ /compare/comet-vs-chrome-gemini
├─ /alternatives/                 ← NEW directory
│   ├─ /alternatives/chatgpt-atlas       ← PRIORITY ONE
│   ├─ /alternatives/chatgpt-atlas-windows
│   ├─ /alternatives/comet
│   ├─ /alternatives/dia
│   └─ /alternatives/ai-browsers         (the honest roundup)
├─ /security                      ← expand into a trust hub
│   ├─ /security/prompt-injection
│   ├─ /security/approvals
│   └─ /security/data-handling
├─ /blog
└─ /releases
```

**The `/connections/*` build is the highest-leverage structural move.** Ten pages, each targeting `[app] + ai browser`, `ai agent for [app]`, `[app] mcp`, `automate [app]`. Each is template-generated with genuinely distinct content: 3–5 real workflows for that app, the exact permissions requested, what requires approval, a short demo clip, and setup steps. Generic doorway pages will get filtered by Google — these must carry real, app-specific utility. Done right it's ~40–60 new ranking keywords per page.

Same logic for agents: 6 → 25–30 pages, each targeting a job-to-be-done ("ai agent for competitor research", "ai agent to apply for jobs", "ai agent for standup notes").

### 6.3 On-page rules

- One primary keyword per URL, in `<title>` (≤60 chars), H1, first 100 words, and URL slug
- Title pattern for comparisons: `IntentX vs Comet: Which AI Browser in 2026? [Tested]`
- Every comparison page carries a scannable spec table — this is what gets extracted into AI Overviews and LLM answers
- Internal linking: every blog post links to ≥1 agent page and ≥1 connection page with descriptive anchors; every connection page links back to `/how-it-works` and `/download`
- Real author bylines with real credentials on every post (E-E-A-T is heavily weighted for software/security topics)
- Add `dateModified` and actually update pages — comparison content decays fast in this category (Atlas died inside 10 months of launch)

### 6.4 Link building (the binding constraint — treat as the #1 priority)

To reach Sigma's 942 referring domains in 12 months you need ~80/month. Ranked by expected yield per hour:

| Tactic | Expected RDs | Effort | Notes |
|---|---|---|---|
| **Original research / benchmarks** | 50–200 each | High | The single best tactic. See below. |
| **Product directories** | 150–250 | Low | Product Hunt, AlternativeTo, Slant, G2, Capterra, SaaSHub, There's An AI For That, Futurepedia, Toolify, AI tool aggregators. Mostly nofollow but drives real traffic + brand entity signals. |
| **Being in competitors' listicles** | 100–200 | Medium | Every "best AI browser 2026" post is a link target. Pitch the ~40 authors already writing these — they update constantly and want new entrants. |
| **Open-source / MCP ecosystem** | 40–80 | Medium | Publish MCP servers, agent templates, a browser-automation eval harness on GitHub. Awesome-lists, MCP registries, dev newsletters. High-quality dofollow. |
| **HARO / journalist sourcing** | 20–40 | Medium | AI-browser security is an active beat; be a quotable source |
| **Podcasts & YouTube reviews** | 30–60 | Medium | Founder-led; send free Pro + a tailored demo to AI-tool reviewers |
| **Digital PR off the Atlas shutdown** | 15–40 | Low | A "where Atlas users went" data story is pitchable right now |
| **Guest posts** | 20–40 | Medium | Only on genuinely relevant dev/productivity/security publications |

**Four link-earning research assets worth building:**

1. **"The Agentic Browser Safety Benchmark"** — a reproducible, open-source suite that tests Comet, Dia, Neon, Gemini-in-Chrome *and IntentX* against a public corpus of indirect prompt-injection attacks. Publish the harness, the corpus, the numbers, and IntentX's own failures. Repeat quarterly. This is simultaneously the best link magnet, the best AEO asset, the best proof of the §4.1 trust pillar, and the hardest thing for a competitor to copy without looking defensive. Run it past a security advisor and coordinate responsible disclosure before publishing anything that is effectively a live exploit against a named vendor.
2. **"The Tab Tax"** — survey 1,000 knowledge workers on open tabs, context-switching cost, hours lost. You already rank for the tab cluster; this converts that topical foothold into a citable statistic journalists reuse for years.
3. **"State of MCP Adoption"** — annual report. Owns the §5.5 cluster and makes IntentX the category's data source.
4. **"AI Browser Feature Matrix"** — a continuously maintained, honest, 20-browser × 40-feature comparison table. Becomes the reference everyone links to instead of rebuilding it.

---

## 7. Content marketing

### 7.1 Editorial model

Four tracks, running concurrently, ~10–12 pieces/month at steady state:

| Track | Share | Purpose | Format |
|---|---|---|---|
| **Conquest** | 30% | Capture competitor + alternative demand | Comparisons, alternatives, migration guides |
| **Trust** | 25% | Own the safety narrative; earn links & citations | Research, benchmarks, deep technical explainers |
| **Jobs-to-be-done** | 30% | Convert; feed agent & connection pages | "How to [task] without leaving your browser" |
| **Category POV** | 15% | Brand, PR, founder voice | Essays, teardowns, predictions |

**Non-negotiable quality bar:** every piece includes something nobody else has — original screenshots of the actual product, real timings, a reproducible test, or a number you measured. At DA 1, a 1,500-word rehash of what's already on page 1 will rank at position 50 forever. That is exactly what has happened to the existing tab post. Differentiated, demonstrably first-hand content is the only thing that breaks through from zero.

### 7.2 First 90 days

**Month 1 — Harvest + foundations**

| # | Piece | Cluster | Target |
|---|---|---|---|
| 1 | Moving from ChatGPT Atlas: the complete 2026 guide (incl. manual bookmark export walkthrough) | A | `/alternatives/chatgpt-atlas` |
| 2 | ChatGPT Atlas alternatives for Windows | A | landing page |
| 3 | Is Comet AI Browser safe? An honest technical look | B/D | 320/mo, SD 33 |
| 4 | What is an agentic browser? (definitional pillar) | C | SD 28 |
| 5 | Why you still have 47 tabs open — rewrite of existing post into a Spaces pillar | F | fix 43/50/76 rankings |
| 6 | IntentX vs Comet: tested on 10 real workflows | B | `/compare/` |
| 7 | Prompt injection in AI browsers: the attack no one has fully solved | D | $28.85 CPC cluster |
| 8 | What an AI browser should ask permission for (approvals POV) | D | brand |

**Month 2 — Depth + the first research drop**

| # | Piece | Cluster |
|---|---|---|
| 9 | **The Agentic Browser Safety Benchmark v1** (flagship) | D |
| 10 | Best AI browsers in 2026: honest roundup incl. competitors | C |
| 11 | What is an MCP browser? | E |
| 12 | IntentX vs Dia | B |
| 13 | Comet vs Dia (no self-mention — pure authority play) | B |
| 14–18 | First 5 `/connections/*` pages: Gmail, Sheets, GitHub, Jira, Docs | — |
| 19 | How to turn customer feedback into Jira issues without copy-paste | JTBD |
| 20 | AI browser for Mac (landing page) | C |

**Month 3 — Scale + the data story**

| # | Piece | Cluster |
|---|---|---|
| 21 | **The Tab Tax: 1,000 knowledge workers surveyed** | PR |
| 22–26 | Remaining 5 `/connections/*` pages | — |
| 27 | IntentX vs Chrome + Gemini | B |
| 28 | IntentX vs Edge + Copilot | B |
| 29–34 | 6 new agent pages w/ JTBD content | F |
| 35 | AI browser for Windows (landing) | C |
| 36 | Gartner-style AI browser risk assessment for IT teams | D |
| 37 | Building your first MCP connection in IntentX | E |

**Months 4–12 (steady state):** 4 comparisons/mo until all 20+ competitors are covered · 2 trust pieces/mo · quarterly benchmark refresh · 4 JTBD/mo · all connection and agent pages updated quarterly with `dateModified`.

### 7.3 Repurposing chain

One flagship piece → 1 blog post → 1 YouTube walkthrough → 3–5 short clips → 1 LinkedIn carousel → 1 X thread → 1 Reddit comment-with-context (never a drive-by link) → 1 newsletter issue → 1 conference/podcast talking point. Build the asset once, distribute eight times. At a small team size this is the only way to hit the cadence above.

---

## 8. AEO / GEO (Answer & Generative Engine Optimisation)

For a product whose *users are AI-native*, a meaningful share of discovery already happens inside ChatGPT, Claude, Perplexity, Gemini and AI Overviews rather than on blue links. Optimise for being the cited answer.

### 8.1 Why this matters disproportionately here

Your buyer's literal behaviour is asking an LLM "what's the best AI browser?" If IntentX isn't in the training data, the retrieval index, or the citation set, it does not exist to that buyer. And unlike classic SEO, **you can compete here at DA 1** — LLMs cite clear, specific, well-structured, recently-updated sources far more readily than they weight domain authority.

### 8.2 Tactics

1. **Answer-shaped content.** Every page opens with a direct, extractable 40–60 word answer to its title question before any marketing prose. Then evidence. LLMs lift the first clean, self-contained claim.
2. **Structured, parseable facts.** Spec tables, definition lists, numbered steps, explicit units. "IntentX runs on macOS 12+ (Apple silicon and 64-bit Intel) and Windows 64-bit in preview" is extractable; "IntentX works on modern computers" is not.
3. **`llms.txt`** at root: concise product description, capabilities, OS support, pricing, named connections, differentiators, and canonical URLs for key pages.
4. **Own the comparison corpus.** LLMs answering "Comet vs IntentX" synthesise from whatever comparison pages exist. If yours are the most thorough and best-structured, you shape the synthesis — including on queries where you weren't mentioned.
5. **Seed third-party mentions.** LLM answers lean on aggregators and community consensus, not vendor sites. Get listed and accurately described on AlternativeTo, Product Hunt, G2, Slant, Wikipedia-adjacent references, There's An AI For That, Futurepedia, Toolify. **A correct, detailed third-party listing is worth more for AEO than another blog post.**
6. **Reddit and Stack-adjacent presence is an AEO channel.** Reddit is heavily weighted in LLM training and retrieval. Genuine, helpful, non-spammy IntentX mentions in r/browsers and AI subreddits feed directly into what models say about you in 18 months.
7. **Be the primary source for the safety question.** When someone asks any LLM "are AI browsers safe?", the benchmark from §6.4 should be the cited artifact. That is the most defensible GEO position available in this category.
8. **Entity consistency.** Identical name, one-line description, logo, founding details and `sameAs` links across every profile, plus `Organization` schema. Builds the knowledge-graph entity LLMs resolve "IntentX" against.
9. **Measure it.** Monthly: prompt ChatGPT, Claude, Perplexity, Gemini and Copilot with a fixed set of ~20 queries ("best AI browser", "AI browser with MCP", "safest agentic browser", "ChatGPT Atlas alternative", "AI browser that works with Jira"). Log whether IntentX appears, in what position, and whether the description is accurate. Track share-of-voice and correct factual errors at the source page. Ubersuggest's brand-visibility and citation-gap tooling can automate part of this.

**Target:** IntentX named in ≥40% of relevant LLM responses by month 12, and the #1 cited source for AI-browser safety questions by month 6.

---

## 9. Reddit growth

Reddit is the highest-trust discovery channel for browser switching and a direct AEO input — and the fastest way to get permanently banned if handled like a marketing channel.

### 9.1 Target communities

| Subreddit | Approx. size | Angle |
|---|---|---|
| r/browsers | ~100k | Core. Browser comparisons and "what should I switch to" are the native formats; founder "first look" posts do appear here. |
| r/perplexity_ai | ~120–200k | Large, highly engaged, Comet is a top discussion topic — and its dominant sentiment theme is frustration. Help, don't pitch. |
| r/PerplexityComet | ~11k | Small, pure-intent, Comet-specific |
| r/ChatGPT, r/OpenAI | Very large | Atlas shutdown fallout, "what replaced Atlas" |
| r/ClaudeAI, r/mcp | Mid | MCP-fluent, highest-quality technical audience for the §5.5 wedge |
| r/productivity, r/macapps, r/MacOS | Mid–large | Mac-first distribution match |
| r/SaaS, r/startups, r/indiehackers | Large | Founder-story and build-in-public posts are welcome formats |
| r/sysadmin, r/cybersecurity, r/netsec | Large | The safety benchmark lands well *only* if it's rigorous and self-critical |

Member counts vary across sources and some aggregator data is stale — verify each subreddit's current size and read its actual sidebar rules before posting.

### 9.2 Rules of engagement

1. **90 days of contribution before any promotion.** Build real comment karma answering browser/AI questions with no link. Most of these subs auto-filter new accounts and low-karma link posts.
2. **Read every sidebar.** Rules differ wildly; several ban self-promotion outright, some have a dedicated weekly self-promo thread. One violation can cost you the subreddit permanently.
3. **Founder account, clearly flaired.** One real, named human with "building IntentX" in the flair. Never sockpuppets — Reddit detects them, and getting caught is an unrecoverable brand event in exactly the communities you need.
4. **Lead with utility.** The Atlas migration guide and the safety benchmark are genuinely useful to these communities. Post the *content*, answer questions in the thread, mention the product only when directly asked.
5. **Disclose always.** "Disclosure: I build IntentX" in any comment where it's relevant. Reddit forgives a disclosed vendor; it never forgives a hidden one.
6. **Answer the complaints.** r/perplexity_ai's dominant sentiment is frustration with Comet. Being the helpful person who solves someone's actual problem — even by recommending a non-IntentX fix — is worth more than ten posts.

### 9.3 Cadence

- **Daily:** 3–5 genuine, unlinked helpful comments across target subs
- **Weekly:** 1 substantive post in an allowed sub (AMA, teardown, benchmark result, build-in-public update)
- **Monthly:** 1 flagship drop (benchmark, survey) in r/browsers + r/netsec
- **Monitoring:** alerts on "ai browser", "comet", "atlas alternative", "agentic browser", "intentx" — respond within hours while threads are live

### 9.4 Specific openings available now

- "I built a migration guide for Atlas users — here's what does and doesn't transfer" (r/ChatGPT, r/browsers)
- "We tested 5 agentic browsers against 200 prompt-injection attacks, including our own. Here's the data." (r/netsec, r/cybersecurity — only with real data and own failures included)
- "What would make you trust a browser agent enough to let it touch your email?" (r/browsers — genuine research question, generates product insight *and* goodwill)

---

## 10. Social media

### 10.1 X / Twitter — primary social channel

The AI-tools conversation lives here and demos travel.

- **Founder account > brand account.** 80% of reach will come from a named human. The brand handle handles support and release notes.
- **Format that works:** 15–45 second screen recordings of one agent doing one real task end to end, with the approval step visible. No voiceover needed. Caption states the task and the time saved.
- **Cadence:** 1 demo clip/day, 2 threads/week, constant replies in AI-browser threads.
- **Thread templates:** "I gave 5 AI browsers the same task. Here's what happened." · "The prompt injection problem, explained in 8 tweets." · "We shipped X. Here's why we gated it behind approval."
- **Engage the beat reporters and AI-tool accounts** who already cover this category — they need new entrants to write about.

### 10.2 YouTube — the compounding channel

Search demand for "best ai browser", "comet review", "ai browser comparison" is heavily video-served, and YouTube results surface in Google SERPs *and* get cited by LLMs.

- **Pillar videos (8–15 min):** "IntentX vs Comet: 10 real tasks tested" · "Every AI browser compared (2026)" · "I let an AI browser do my inbox for a week"
- **Utility videos (3–6 min):** one per connection, one per agent — these rank for "[app] + ai automation" long tail forever
- **Shorts:** clip the pillars, 3–5/week
- **Optimise descriptions for AEO** — full transcripts, timestamps, spec tables in the description

**Creator seeding:** identify 30–50 AI-tool reviewers at 10k–300k subs, send free Pro access plus a *tailored* demo relevant to their niche. At this stage earned reviews beat paid sponsorships on both cost and credibility.

### 10.3 TikTok / Instagram Reels

Secondary. Same clips, different hook. Works best on the "I didn't know a browser could do this" reveal format. Low effort via repurposing; don't build bespoke.

### 10.4 Discord / Slack communities

MCP, AI-engineering, indie-hacker and Mac-productivity servers. High-signal, low-volume. Also: consider an IntentX Discord once you have >2k active users — agent-sharing is a natural community mechanic (see §13).

### 10.5 Hacker News

Not a cadence channel — a 2–3 times/year channel. The safety benchmark and a "how we architected approval gating" engineering deep-dive are the two front-page-capable assets. Technical, specific, self-critical, no marketing language. One good HN front page is worth ~50 referring domains and a genuine user spike.

---

## 11. LinkedIn growth

LinkedIn is where the team/enterprise motion (§4.2 segments 4–6) gets built, and where the trust content finds its buyer.

### 11.1 Founder-led, not brand-led

Brand pages get ~2% of the organic reach of a personal profile. Budget: 80% founder, 20% company page.

**Founder content pillars:**
1. **Building in public** — architecture decisions, what you cut, the approval-gating design, real numbers
2. **Category POV** — "why the AI browser wars are actually about trust, not models", the Atlas post-mortem
3. **Customer workflows** — anonymised before/after of a real team's busywork loop
4. **Safety leadership** — this is what makes a CISO or IT lead follow you

**Cadence:** 4–5 posts/week. Text + single image or native-uploaded clip outperforms links (LinkedIn suppresses outbound links — put the URL in the first comment). Carousels work well for comparisons and frameworks.

### 11.2 Tactics

- **Comment strategy before posting strategy.** 10 substantive comments/day on posts from AI/productivity/security voices with your ICP in their audience. This builds reach faster than posting at zero followers.
- **Repurpose the benchmark into a carousel** — "We tested 5 AI browsers against 200 injection attacks" is a high-save, high-share LinkedIn format.
- **Company page:** release notes, hiring, customer logos. Keep it alive, don't over-invest.
- **Employee amplification:** every team member reposts with their own one-line take. Multiplies reach at zero cost.
- **LinkedIn newsletter** once you have ~2k followers — subscribers get notified, which is free distribution LinkedIn no longer gives posts.
- **Targeted outreach, not spam:** connect with heads of ops/product/eng at 20–200 person companies, lead with the relevant workflow, never pitch in the connection request.

**Paid (small, late):** once the free motion has product-market signal, test Sponsored Content promoting the *benchmark* (not the download) to job titles IT Manager / Head of Ops / Eng Manager, company size 20–500. Gate nothing. The goal is credibility and retargeting-pool construction, not MQLs. LinkedIn CPCs of $8–14 only make sense against a team/enterprise ACV, so hold this until there's a paid tier to sell.

---

## 12. Paid ads

### 12.1 The honest strategic read

**Paid should be a small, surgical fraction of spend in year one.** The economics are hostile:

- Category CPCs are brutal: "agentic browser" $14.14, "ai browser agent" $14.72, "comet ai browser" $14.46, "neo ai browser" $16.77, "ai browser prompt injection" $28.85
- The product appears to be free to download, so there is no immediate revenue to offset CAC
- Google's own browser is the ad platform; Microsoft's own browser is the other one
- Competing on head terms against Perplexity's and OpenAI's budgets is a losing trade

Paid is for **capturing demand you've already created and defending your brand**, not for generating demand. Suggested year-one split: **65% content/SEO, 20% community & creator seeding, 15% paid.**

### 12.2 Where paid actually works

| Priority | Campaign | Why |
|---|---|---|
| **1** | **Brand defence** — bid on "intentx", "intentx browser", "intentx download" | Cents per click. Stops competitors and typo-squatters intercepting your own demand. Non-negotiable. |
| **2** | **Atlas migration** — "chatgpt atlas alternative" ($8.07), "atlas browser replacement", "atlas shut down" | Tiny volume, enormous intent, almost no competing bidders. Cheap wins. |
| **3** | **Safety-intent conquest** — "is comet ai browser safe", "ai browser security", "agentic browser risks" | Highest-converting intent in the category; lands on your strongest asset |
| **4** | **Retargeting** — site visitors, benchmark readers, YouTube viewers | Cheapest conversions you will get. Build the pools from day one even if you don't spend against them until month 3. |
| **5** | **Competitor brand terms** — "comet ai browser", "dia browser", "fellou" | Only after LP conversion is proven. Expensive, legally fine (don't use their marks in ad copy), and the comparison page must be genuinely useful or you're paying $14 for a bounce. |
| **6** | **YouTube in-feed against review videos** | Cheap CPVs, demo-friendly format, perfect intent match |
| **Avoid** | Head terms: "ai browser" (9,900/mo, $4.38) | Looks cheap, converts poorly — mostly research intent, and you'll fight Google and Perplexity for it. Revisit only once organic has proven the SERP converts. |

### 12.3 Execution

- **Budget ramp:** $1.5–2.5k/mo months 1–3 (brand + Atlas + retargeting only), scale to $8–12k/mo only once CAC→D30-retention is proven
- **One landing page per ad group.** Atlas ads → Atlas migration page. Safety ads → safety hub. Never route paid to the homepage.
- **Search Partners off. Display Network off.** Display will burn 60% of budget on junk placements.
- **Measure to activation, not install.** Optimise toward *first successful agent run*, not download. Installs are a vanity metric for a browser; the install→activation drop-off is where the money is lost.
- **Reddit Ads** are worth a $500 test targeting the §9.1 subreddits — cheap CPMs, exact audience, and tolerable creative requirements.
- **Product Hunt / newsletter sponsorships** (TLDR, Ben's Bites, Superhuman, The Rundown) often beat Google on CAC for dev/AI-tool audiences. Test one $1–2k newsletter placement before scaling search.

---

## 13. Website & conversion optimisation

### 13.1 The funnel problem specific to a browser

A browser has the hardest conversion ask in consumer software: *download a 100MB+ app, then change a daily habit, then re-authenticate everything.* The homepage already acknowledges that sign-ins don't carry over from Chrome — honest, and also the single biggest objection in the funnel. Every CRO decision should reduce perceived switching cost.

### 13.2 Fixes, ranked

1. **Show the product immediately.** An autoplaying, muted, 20-second loop of one agent completing one real task — with the approval step visible — above the fold. For agentic software, a demo converts several times better than any headline. This is the highest-leverage change on the site.
2. **Make "you don't have to switch" the hero sub-message.** Reframe from "replace Chrome" to "run it alongside Chrome for the tasks that hurt." Massively lowers the commitment barrier. Add an explicit "Keep using Chrome — IntentX doesn't have to be your default" line.
3. **Add a credible import path.** Even partial bookmark/profile import, clearly explained, removes the top objection. If it exists, feature it prominently; if it doesn't, build it — the Atlas migration campaign depends on it.
4. **Platform-aware CTA.** Detect OS and serve "Download for Mac" / "Download for Windows (Preview)" automatically. Label the Windows preview honestly — surprise instability costs more than the extra installs.
5. **Add social proof.** The site currently has none visible. Download counts, named users, review quotes, Product Hunt badge, GitHub stars on your MCP repos — anything. For an unknown brand asking for an install, absence of proof reads as risk.
6. **Surface the security story on the homepage, not just `/security`.** "Nothing submitted until you review" is your single best differentiator and it's buried. Put it above the fold with a link to the trust hub.
7. **Link the connection icons.** Ten integration logos that aren't clickable is both an SEO loss (§6.2) and a CRO loss — "does it work with my stack?" is a top-three pre-install question.
8. **Add an interactive agent gallery** with filtering by tool and by job. Lets a visitor find *their* use case rather than reading about someone else's.
9. **Post-install onboarding is where retention is won or lost.** First-run should walk the user into one successful agent run inside 3 minutes, with one connection authorised. Instrument every step; the drop-off curve here matters more than any acquisition channel.
10. **Pricing page, even with no paid tier.** "Free while in beta, paid plans coming — here's roughly what they'll look like" beats silence. Absent pricing makes evaluators assume enterprise pricing or abandonment risk, and it blocks you from ranking for "[competitor] pricing" comparison queries.
11. **Build the email list from day one.** Windows waitlist, Linux waitlist, benchmark updates, agent-of-the-week. Email is the only channel you own and the only reliable way to re-engage someone who downloaded and drifted.
12. **A/B test in this order:** hero video vs. static → headline variants → CTA copy ("Download free" vs "Try IntentX" vs "Get IntentX for Mac") → social-proof placement → single vs. dual CTA.

---

## 14. Growth hacks & unconventional plays

Ordered by expected impact per unit of effort.

1. **The Atlas refugee campaign (run this week).** Dedicated landing page + migration utility + Reddit/X presence in every "Atlas is dead" thread + a $500 search campaign. This window closes as the cohort settles elsewhere. Highest-urgency item in the entire plan.
2. **Agent marketplace / shareable agents.** Let users publish an agent as a public URL that others can one-click install. Every shared agent is a landing page, a backlink, and a viral loop. This is the single best structural growth mechanic available to this product — it turns power users into a distribution channel and creates programmatic SEO that writes itself. Needs abuse review and a sandbox, so scope carefully.
3. **Publish MCP servers as open source.** Builds credibility with the §5.5 audience, earns dofollow links from MCP registries and awesome-lists, and makes IntentX the browser MCP developers recommend. Cheap and compounding.
4. **The quarterly safety benchmark as an institution.** Not a one-off post — a recurring, versioned, open-source artifact. Becomes the thing the category cites, including by competitors. Owning the measurement is a stronger position than winning it.
5. **"Busywork audit" lead magnet.** A short interactive tool: answer 8 questions about your week, get an estimate of hours lost to copy-paste and tab-switching, plus the specific IntentX agents that address them. Generates emails, shares, and sales conversations.
6. **Free Pro for a named cohort.** Open-source maintainers, student journalists, indie researchers, job seekers. Each is a public, vocal, link-generating user with a sympathetic story. Cheap goodwill with real distribution.
7. **Build-in-public release cadence.** A visible, frequent `/releases` page with real changelogs is a retention tool, an SEO asset, and a trust signal. Ship weekly and say so.
8. **Comparison tool, not just comparison pages.** An interactive filterable matrix of 20 AI browsers × 40 features. Becomes the canonical reference, earns links passively, and gets lifted wholesale by LLMs.
9. **Partner with MCP-adjacent tools** (Jira/Asana/Sentry ecosystem apps, Claude/Cursor-adjacent devtools) for co-marketing, mutual listings and integration docs. Each partner is a backlink and a pre-qualified audience.
10. **Referral mechanic with a real reward** — early feature access, higher agent limits, or a named spot in the community. Comet's referral loop is well-known in this category; don't ignore the format.
11. **Reverse-engineer competitor listicle authors.** ~40 publications maintain "best AI browser" posts and update them constantly. A tracked outreach list with a short, genuinely useful pitch (plus access) converts at a surprisingly high rate and is the fastest path to 100+ relevant referring domains.
12. **Local/vertical agent pages** — real estate, recruiting, legal research, e-commerce ops. Near-zero keyword difficulty, high intent, and each one is a self-contained wedge into a vertical.

---

## 15. Measurement & targets

### 15.1 North star

**Weekly active users completing ≥1 successful agent run.** Not downloads. For a browser, installs are noise; the agent run is the moment of value and the only leading indicator of retention.

### 15.2 KPI tree

| Layer | Metric | Month 3 | Month 6 | Month 12 |
|---|---|---|---|---|
| **Awareness** | Organic sessions/mo | 800 | 6,000 | 25,000 |
| | Referring domains | 120 | 450 | 1,200 |
| | Domain Authority | 10 | 20 | 28 |
| | Ranking keywords | 400 | 1,800 | 5,000 |
| | LLM citation share (20-query panel) | 10% | 25% | 40% |
| **Acquisition** | Downloads/mo | 2,000 | 12,000 | 40,000 |
| | Blended CAC | <$15 | <$12 | <$9 |
| **Activation** | Install → first agent run | 35% | 50% | 60% |
| | ≥1 connection authorised | 30% | 45% | 55% |
| **Retention** | D30 | 10% | 14% | 18% |
| | WAU/MAU | 25% | 35% | 45% |
| **Advocacy** | Shared agents/mo | — | 200 | 2,000 |
| | NPS | — | 30 | 45 |

Targets are benchmarked off Sigma Browser's observed trajectory (141 → 12,390 monthly organic visits in 20 months at DA 31 / 942 referring domains) and are deliberately ambitious on the link side, because that is the binding constraint.

### 15.3 Reporting rhythm

- **Weekly:** downloads, activation rate, publishing cadence, new referring domains, top Reddit/X threads
- **Monthly:** full KPI tree, keyword movement by cluster, LLM citation panel, CAC by channel, content performance audit
- **Quarterly:** competitive re-scan (this category churns fast — Atlas launched and died inside 10 months), benchmark refresh, strategy revision

---

## 16. 30/60/90 and beyond

### Days 1–30 — Fix the foundation, harvest Atlas
- Kill the redirect chain; mobile LCP under 2.5s
- Full schema, split sitemaps, GSC/Bing/GA4, `llms.txt`
- Download→activation→retention event instrumentation
- Ship `/alternatives/chatgpt-atlas` + Windows variant + migration utility
- Hero demo video live; platform-aware CTA; security message above the fold
- 8 content pieces (§7.2 Month 1)
- Brand-defence + Atlas search campaigns live ($1.5k)
- Reddit/X/LinkedIn founder accounts begin contributing (no promotion yet)
- Submit to 30 directories; build the listicle-author outreach list

### Days 31–60 — Differentiate
- Launch the Agentic Browser Safety Benchmark v1 → HN, r/netsec, press outreach
- First 5 `/connections/*` pages live
- `/mcp-browser` cornerstone + first open-source MCP server published
- `/compare/intentx-vs-comet` and `-vs-dia` live
- YouTube channel: 2 pillars + 10 shorts
- Creator seeding: 30 reviewers contacted
- Retargeting pools live

### Days 61–90 — Scale
- Remaining 5 connection pages; 6 new agent pages
- The Tab Tax survey published → PR push
- Product Hunt launch (sequenced *after* the benchmark earns credibility, not before)
- Reddit promotion begins (90-day contribution threshold met)
- Safety-intent paid campaigns live
- Agent-sharing mechanic in beta
- First full quarterly review

### Months 4–12 — Compound
Comparison coverage to all 20+ competitors · quarterly benchmark refresh · State of MCP Adoption report · attack "ai browser" and "agentic browser" head terms once link profile supports it · enterprise motion (SSO, admin policy, audit logs, SOC 2) with LinkedIn paid behind it · agent marketplace GA · Linux and mobile waitlist conversion.

---

## 17. Risks & honest caveats

| Risk | Severity | Mitigation |
|---|---|---|
| **A giant ships your differentiator.** Google adding deep third-party MCP connections to Chrome would compress the wedge overnight. | High | Move fast on MCP breadth and the trust position — Google has structural reasons (competitive, privacy-optics, antitrust) not to let Chrome write into Jira and Gmail on a user's behalf. Depth and openness are defensible; "AI in a browser" is not. |
| **A security incident involving IntentX.** One injection-driven data leak would be existential for a trust-positioned brand. | High | Don't over-claim. Publish your own residual risk. Approval-gate by default. Have an incident comms plan written *before* you need it. Never market safety beyond what the product provably does. |
| **Category consolidation.** Atlas died in 10 months. Several Tier-2 players won't survive 2027. | Medium | Treat comparison content as perishable; keep `dateModified` honest and re-scan quarterly. A dead competitor's brand terms become migration opportunities — have the playbook ready. |
| **Link building underdelivers.** Everything in §6 is gated on authority. 80 referring domains/month is demanding. | High | This is the most likely plan failure mode. Over-invest in the original-research assets (§6.4) — one benchmark that earns 150 domains beats 50 guest posts. If RD growth lags by month 4, cut content volume and reallocate entirely to research + PR. |
| **No revenue model stated.** Free product, expensive CPCs, no pricing page. | Medium | Define and publish the paid tier by month 6. Paid acquisition cannot be scaled rationally without a revenue number, and §12's budget ramp assumes one exists. |
| **Windows preview quality.** Half the addressable market is on a preview build. | Medium | Be explicit in all Windows-targeted content and ads. Over-promising on an unstable build poisons reviews, and reviews are the Tier-2 battleground. |

---

## 18. Source notes

Quantitative baselines (traffic, keywords, volumes, SD, CPC, DA, backlinks, PageSpeed) are measured via Ubersuggest and PageSpeed, Oct 2026, US/English — treat as directional estimates, not ground truth. Competitive and market claims are drawn from the sources below, most of which are vendor blogs or secondary comparisons with affiliate incentives; **pricing, availability and platform details in this category change monthly and should be re-verified against vendor sites before being published in any IntentX content.** Subreddit member counts come from aggregator snapshots that may be stale — verify live before planning around them. Vendor-reported security figures (Anthropic's injection-resistance rates, Brave's Comet findings) are not independently verified; cite primary sources.

**Market & competitive landscape:** [Fast.io — 8 Best AI Browsers 2026](https://fast.io/resources/best-ai-browsers-2026/) · [Digital Applied — AI Browser Landscape 2026](https://www.digitalapplied.com/blog/ai-browser-landscape-2026-atlas-comet-arc-dia) · [NoHacks — Agentic Browser Landscape 2026](https://nohacks.co/blog/agentic-browser-landscape-2026) · [TechRepublic — 5 Best AI Browsers 2026](https://www.techrepublic.com/article/news-best-ai-browsers-2026/) · [Firecrawl — Best Browser Agents](https://www.firecrawl.dev/blog/best-browser-agents) · [Sigma — Comet Alternatives](https://www.sigmabrowser.com/blog/9-best-comet-browser-alternatives-in-2026-ai-search-research-agents) · [TestGrid — AI Browsers Tested](https://testgrid.io/blog/ai-browsers/) · [TechRadar — Are AI browsers a fad?](https://www.techradar.com/computing/artificial-intelligence/ai-web-browsers-are-the-new-trend-but-will-chatgpt-and-perplexity-chrome-competitors-turn-out-to-be-a-fad)

**Atlas shutdown:** [Wikipedia — ChatGPT Atlas](https://en.wikipedia.org/wiki/ChatGPT_Atlas) · [MacRumors — Atlas Shutting Down](https://www.macrumors.com/2026/07/10/openais-chatgpt-atlas-browser-shutting-down/) · [BGR — Atlas Discontinued](https://www.bgr.com/2212396/openai-chatgpt-browser-atlas-discontinued/) · [The Rundown AI — Atlas](https://www.therundown.ai/tools/atlas) · [Second Talent — Atlas Review](https://www.secondtalent.com/resources/chatgpt-atlas-review-ai-browser/) · [Sigma — Atlas Shutting Down](https://www.sigmabrowser.com/blog/chatgpt-atlas-is-shutting-down-what-happened-and-the-best-alternatives)

**Security & prompt injection:** [WitnessAI — 6 Enterprise Security Risks](https://witness.ai/blog/ai-browser-agent-security-risks/) · [The Hacker News — When Your Browser Becomes The Attacker](https://thehackernews.com/expert-insights/2026/02/when-your-browser-becomes-attacker-ai.html) · [CSA — Indirect Prompt Injection in the Wild](https://labs.cloudsecurityalliance.org/research/csa-research-note-indirect-prompt-injection-in-the-wild-2026/) · [arXiv — Building Browser Agents](https://arxiv.org/pdf/2511.19477) · [arXiv — ceLLMate: Sandboxing Browser AI Agents](https://arxiv.org/pdf/2512.12594) · [ITCares — The Prompt Injection Risk No One Can Patch](https://itcares.ca/en/blog/ai-browser-agents-security-risks-2026.html)

**Community:** [r/browsers](https://gummysearch.com/r/browsers) · [r/perplexity_ai](https://gummysearch.com/r/perplexity_ai/) · [r/PerplexityComet](https://gummysearch.com/r/PerplexityComet/)
