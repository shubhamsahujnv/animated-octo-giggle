# Audit: live site vs. my draft content

**Reviewed:** `https://lynkk.ai/` — live site crawled 22 Oct 2026. Homepage, `/pricing`, `/security`, `/features/meeting-notes`, `/features/ask-your-meetings`, `/features/workspaces`.

**Re-verified:** 22 Oct 2026, 19:15 UTC — every finding below was re-checked by string match against a fresh crawl of the homepage, `/pricing`, `/security`, `/faq`, `/features/meeting-notes` and `/integrations`. All nine stand. The re-check also corrected one error of my own, in §6 (language count).

**Verdict:** the live site shipped a different and more complete product than the staging page I wrote from. **Nine factual claims in my draft are wrong.** Four would have been actively damaging if published. This file lists every one, what I changed, and what I'm recommending now.

---

## 1. What shipped that I didn't know about

The live site is far bigger than the staging one-pager. It has a real information architecture:

| Live page | What it is |
|---|---|
| `/features/meeting-notes` | **AI note taker** — the core product page |
| `/features/ask-your-meetings` | **Ask Lynkk** (Pro) — answers across every call |
| `/features/workspaces` | **Workspaces** — teams up to 10 |
| `/slack` | Lynkk for Slack |
| `/compare/` × 12 | Otter, Fireflies, Granola, Fathom, Read AI, Notta, Circleback, MeetGeek, Plaud, Gong, Avoma, Clari Copilot |
| `/use-cases/` × 10 | Sales calls, user interviews, standups, field interviews, lectures, customer research, lawyers, 1:1s, real estate agents, financial advisors |
| `/security`, `/pricing`, `/how-it-works`, `/integrations`, `/faq`, `/blog` | All live |

**The comparison pages I recommended already exist.** All twelve. That recommendation is closed — see §5 for the one gap that remains.

**The feature pages are already well optimised.** `/features/meeting-notes` has the H1 *"The AI note taker that writes your meeting notes when the call ends"* — keyword-bearing, specific, strong. These do not need rewriting, and I haven't rewritten them. §4 lists surgical fixes only.

---

## 2. The nine errors in my draft

### Critical — would have been damaging

**1. CRM updates. My draft claimed a feature that does not exist.**
My copy said "Update CRM", "automated CRM updates", "CRM data entry automation", "CRM fields filled from the conversation", and a meta title reading *"Agentic AI Sales Assistant — Follow-ups & CRM Updates"*.
The live site states plainly: **"No CRM sync yet. Copy any brief into Salesforce or HubSpot."** Step 04 of the workflow is **"Hand off"** — Jira, Slack, and copy-to-CRM. Not sync.
→ Every CRM-sync claim removed. Step 04 renamed "Hand off". Added the honest line about copying briefs.

**2. Cue privacy. My answer was the opposite of the truth.**
I wrote: *"No. CUE is private and visible only to you during the call."*
The live site: *"Only if you share your screen. Cue is a panel on your Mac, so it is not part of the call. It is never hidden from screen shares or recordings, so if you share your screen, it shows."*
That visibility is a **deliberate design choice** — Lynkk is taking an explicit anti-cheating position, which is a credit to them and a real differentiator against tools marketed as undetectable. My version would have made a privacy promise the product intentionally does not make.
→ Rewritten to the live answer, and the deliberate-visibility stance is now a selling point.

**3. Pricing. Every number was wrong, and it appears in every CTA.**

| | My draft | Live |
|---|---|---|
| Free | 5 meetings/month | **$0 forever.** Unlimited notes, up to 2 hours each. First **5 hours of AI summaries** (lifetime total, not monthly) |
| Pro | $19/month | **$15/month**, or $117/year (save 35%) |
| Third tier | "Team $39/seat, coming soon" | **Enterprise, custom price**, up to 10 seats — and Workspaces has **shipped** |

"5 free meetings a month" was in the closing CTA of all five of my files.
→ Pricing block rebuilt from the live page. All CTAs changed to "Start for free".

**4. SOC 2. I had it as a claim to confirm. It should be removed.**
The `/security` page says it *"only lists what Lynkk does today"* — and SOC 2 is not among them. So it isn't pending confirmation; it isn't true yet.
→ Removed. Replaced with what the security page actually substantiates (below).

### Material

**5. In-person capture is the Mac app and browser, not a phone.**
I wrote "records from your phone" and "mobile recording" repeatedly. The live FAQ: *"the Mac app and the browser record conversations in the room."* Capture is **four ways in** — Mac app, Chrome extension, meeting bot, in the room.
→ Corrected throughout.

**6. Follow-ups are on request, not automatic.**
I implied automatic drafting and listed "Auto follow-up drafts" as a Pro feature. Live: *"Follow-up, **ready when you ask**"* — you ask Ask Lynkk, then *"you copy it into your email and send it."* Separately there is an **Email summary** that does send to participants, after you confirm.
→ Split into the two distinct things and worded accurately.

**7. The assistant is called Ask Lynkk.**
I called it "Personal Assistant". That's the homepage section heading; the product is **Ask Lynkk**, and it's Pro.
→ Corrected.

**8. I missed the Tasks board.**
Live has a full Tasks board — list and kanban, assignees, due dates, overdue count, completion rate — plus Jira, **on the Free plan**. I only said "raises the ticket".
→ Added.

**9. I missed Summary Shapes.**
A Pro feature: the same meeting rendered as Brief, Sales Call, General Meeting or Customer Interview, without changing the transcript or tasks. It's a genuine differentiator and I had nothing on it.
→ Added.

---

## 2b. Verification record

Re-checked 22 Oct 2026, 19:15 UTC by string match against a fresh crawl. Each row is the exact phrase searched for and where it was found.

| # | Claim | Evidence phrase found live | Where |
|---|---|---|---|
| 1 | No CRM sync | "No CRM sync yet" | homepage |
| 1 | Step 04 is Hand off, not Update CRM | "Hand off" | homepage |
| 2 | Cue is visible on a screen share | "never hidden from screen shares" | homepage |
| 2 | Cue is beta, Mac, by invite | "In beta in the Mac app, by invite" | homepage |
| 3 | Pro is $15 | "$15 / month" | homepage, /pricing |
| 3 | Pro yearly $117 | "117" | /pricing, /faq |
| 3 | Free = first 5 hours of summaries | "first 5 hours of AI summaries" | homepage, /pricing, /faq |
| 3 | Those 5 hours are a lifetime allowance | "life of your account, not per month" | /pricing |
| 3 | Third tier is Enterprise | "Enterprise" | homepage, /pricing |
| 3 | My "5 meetings per month" | **not found anywhere** | — |
| 3 | My "$19" | **not found anywhere** | — |
| 4 | SOC 2 is not claimed | "SOC 2" / "soc 2" — **not found anywhere** | — |
| 5 | In-room capture is Mac app + browser | "the Mac app and the browser record conversations in the room" | homepage |
| 5 | My "mobile recording" | **not found anywhere** | — |
| 6 | Follow-ups are on request | "ready when you ask" | homepage |
| 6 | You send it yourself | "send it yourself" | homepage |
| 7 | Three names for one product | "Ask Lynkk" **and** "Conversational brain" | both on all 6 pages checked |
| 8 | Tasks board exists | "Tasks board" | /pricing |
| 9 | Summary Shapes exists | "Summary Shapes" | homepage, /pricing, /faq, /features/meeting-notes |
| 11 | No AI training | "does not use your recordings" | /security, /faq |

All nine findings stand. The re-check corrected one error of my own — see §6 on the language count.

---

## 3. What my draft got right, and I've kept

- **The H1 shipped unchanged** — *"Your revenue lives in your conversations. Don't lose it."* The revenue-team positioning is live, so the homepage structure in my draft was broadly correct.
- **The "Sound familiar?" three scenarios** are live and still the strongest copy on the site.
- **The H2s still carry no searchable terms.** Every one is brand poetry — *"The deal didn't go cold. The context did."* My eyebrow-label fix still applies and still needs no design change. This is the main SEO value left in my homepage file.
- **No "what is conversation intelligence?" block on the homepage.** Still missing, still worth adding: AI Overviews appear on four of five target search results pages, and `what is conversation intelligence` is 210/mo.
- **Trust is still not on the homepage.** `/security` is excellent but linked only from the footer. The strongest claim on it — no AI training — belongs where buyers decide.

---

## 4. Files in this delivery

| File | Status |
|---|---|
`01-homepage.md` | **Revised.** All nine errors fixed; SEO improvements kept.
`02-features-cue.md` | **New.** Cue has no page of its own — see §5.
`03-live-page-amendments.md` | **New.** Surgical fixes to the three live feature pages and `/pricing`. No rewrites.
`archive/` | My four original product-page drafts, moved here. They described pages that don't exist — Account Memory, Conversation to Action and Personal Assistant are homepage *sections*, not URLs. Kept for reference; don't brief from them.

---

## 5. Two recommendations

**1. Cue needs its own page.** It's the most differentiated thing Lynkk has — real-time, screen-aware, and deliberately visible rather than hidden — and right now it exists only as a homepage section and a beta invite. Competitors with weaker live-coaching stories have full pages. Draft is in `02-features-cue.md`. Keyword cluster sits at difficulty 4–5, so it's cheap to own before the category grows.

**2. The `/compare/` pages cover the wrong half of the demand.** `/compare/gong` targets "lynkk vs gong". But the money term is **`gong competitors` — 320 searches/month, difficulty 14, $80.49 CPC** — and that search results page is held entirely by *numbered roundups*: "11 Best Gong Alternatives", "Top 6 Gong competitors". Sites at domain authority 10, 23 and 27 rank there. A 1-v-1 page will not win it. One roundup post that includes Lynkk honestly alongside the others would, and it's the single best-value page left to write.

---

## 6. Still to confirm with the product team

Short list now — the live site answered most of what I'd flagged.

- **Languages: the live site gives three different numbers.** I had this partly wrong in the first version of this audit and a re-check corrected it. What the site actually says:
  - `/features/meeting-notes`: *"13 languages besides Hinglish, with four more in beta"* — totals 17
  - `/faq` and `/pricing`: *"17 languages, plus Hinglish and auto-detect"*
  - homepage **meta description**: 17 languages
  - homepage **body**: *"15+ languages"*, in four separate places

  So **17 is the correct figure** and the homepage body is the stale one. `01-homepage.md` now says 17 throughout. Four instances to fix on the live homepage.
- **Naming consistency for Ask Lynkk.** It appears as "Ask Lynkk", "Ask your meetings" (URL and page title) and "Conversational brain" (footer). Three names for one product splits brand recall and search signal.
- **Customer stories.** Every story in my files still has `[NAME]`, `[TITLE]`, `[COMPANY]` blank. They need a real reference or the story comes out — I haven't written an invented customer quote, and the live site is equally careful, labelling all its product data "Illustrative". Worth keeping that discipline.
