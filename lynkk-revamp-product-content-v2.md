# Lynkk Revamp — Product Content Rewrite (v2)

**Source:** `https://lynkk-revenue-story.imsjwagh99.chatgpt.site/` — crawled 21 Oct 2026, full page text and heading structure.
**Supersedes:** v1 (`lynkk-product-content-and-seo-research.md`), which was written without site access and got two things wrong. Corrections in §1.
**Keyword data:** Ubersuggest (`marketing@lynkk.ai`), US (2840) and **India (2356)** — India added after I saw the Hinglish positioning.

---

## 1. Corrections to v1, now that I've seen the site

| v1 assumed | Actually | Impact |
|---|---|---|
| "CE" = Conversational Engine | **CUE** — a named product. "MEET CUE / Your unfair advantage." A private real-time co-pilot. | I misheard CE for CUE. CUE is a genuine brand asset, like Gong's "Call Spotlight". Treat it as a proper noun and build equity in it. |
| Account and Memory are two products | **"Account Memory" is one product.** Your nav: *Account Memory · Conversation to action · CUE live coaching · Personal assistant* | This is why you said "four products" then listed five. There are **four**. v1's split pages were wrong; this version has four. |
| Pricing unknown | Free $0 (5 meetings) · **Pro $19/mo** · Team $39/seat (coming soon) | Note: the old lynkk.ai listed Pro at $15. Make sure that's intentional. |
| Market unknown | **15+ languages, Hindi + Hinglish**, `admin@lynkk.ai` | Biggest finding in this round. Changes the whole keyword strategy — see §3. |

**What your current copy gets right, and I did not touch:**

- **The voice.** Two-beat headlines — "It's listened. Now let it help." / "The deal didn't go cold. The context did." — are genuinely good. Confident, short, no SaaS jargon. I kept this throughout and matched it.
- **The problem framing.** The three "SOUND FAMILIAR?" scenarios are the strongest section on the page. Real, specific, recognisable.
- **Honest labelling.** "Illustrative account data", "Illustrative call", "You review before sending" — you're already careful not to pass mock-ups off as real results. Rare and worth keeping.
- **The FAQ answers.** Already plain-English and non-defensive. I've kept most and added the ones buyers search for.

---

## 2. The one structural problem — and it's a big one

**You have four products on one page.** Every product is a section of the homepage. There are no product URLs.

A single page can realistically rank for **one** topic. You're asking one page to rank for account intelligence, CRM automation, real-time sales coaching *and* AI meeting assistants. Google will pick one and ignore the rest.

**Worse: your headings carry no keywords at all.** Here is your actual H2 set:

> "The deal didn't go cold. The context did." · "Every conversation. One connected memory." · "Good conversations deserve great follow-through." · "While you're talking, it's connecting the dots." · "It's listened. Now let it help." · "A shared memory. A personal advantage." · "Same calendar. A very different day." · "Your tools. Now in the loop." · "Real conversations. Real-world selling." · "Start free. Upgrade when you're hooked." · "A little context. A better sales day." · "Let's clear things up." · "Make every conversation count."

Thirteen H2s. **Not one contains a term a buyer would search.** No "account intelligence", no "AI meeting assistant", no "sales coaching", no "CRM". It's beautifully written and completely invisible to search. Your H1 — "Your revenue lives in your conversations. Don't lose it." — has the same problem.

**The fix is not to ruin the writing.** It's to give each product its own page, and on each page let the keyword live in the H1 and one H2 while the poetry moves up to an eyebrow line or down to a subhead. You lose nothing visually. §5 shows exactly how, line by line.

**Recommended structure:**

```
/                                  Home — the one-pager you have (keep the story flow)
/product/account-memory            Account Memory
/product/conversation-to-action    Conversation to Action
/product/cue                       CUE live coaching
/product/personal-assistant        Personal Assistant
/platform                          Hub page (see §7, item 1)
```

Your footer already lists these as separate items — *Account Memory · Call capture · Follow-ups & CRM · CUE live coaching · Personal assistant*. The information architecture is already in your head. It just needs URLs.

**Also fix:** `og:url` is pointing at the staging domain (`lynkk-revenue-story.imsjwagh99.chatgpt.site`). Update before launch or your social cards will leak the staging URL. There's also no `og:image` and no canonical tag.

---

## 3. Market call: go India-first

Your site speaks Hinglish — "Let's close this. हाँ, let's do it." That's not a localisation afterthought, it's positioning. So I pulled India data. The difficulty gap is large enough to change the plan:

| Keyword | US vol / SD | India vol / SD | Verdict |
|---|---|---|---|
| `conversation intelligence platforms` | 1,000 / 49 | 140 / **15** | India winnable now |
| `real time ai meeting assistant` | 110 / 59 | 70 / **6** | India near-free |
| `ai sales coaching` | 390 / 40 | 70 / **18** | India winnable now |
| `ai sales assistant` | 590 / 39 | 140 / **21** | India winnable now |
| `ai sales assistant software` | 90 / 39 · CPC $187 | 40 / **10** · CPC $65 | India winnable now |
| `conversation intelligence software` | 390 / 40 | 70 / **22** | India winnable now |
| `google meet ai note taker` | 590 / 40 | 170 / **21** | India winnable now |
| `ai note taker for microsoft teams` | 110 / 26 | 10 / **8** | India near-free |
| `best conversation intelligence software` | 90 / 40 | 20 / **10** | India winnable now |
| `ai meeting assistant` | 4,400 / 60 | 1,300 / 60 | Hard in both |

At DA 1 with 3 referring domains, US difficulty 40 is a 9–12 month fight. India difficulty 10–21 is a this-quarter fight. **Win India, build authority, then use it to attack the US terms.** Trying both at once from DA 1 wins neither.

Two things follow:
1. **Lean into Hinglish in content, not just in a feature box.** No competitor — Gong, Avoma, Fireflies, Sybill, Granola — is writing for a seller who switches between Hindi and English mid-call. That's a defensible position, and it's currently one small card near the bottom of your page. It deserves its own page.
2. **Pricing reads differently in India.** $19/mo is roughly ₹1,700. Against that, "5 free meetings per month" is your main acquisition lever — make the free tier louder.

---

## 4. Keyword map — four products, four pages, no overlap

| Page | Primary keyword | India vol/SD | US vol/SD | Secondary |
|---|---|---|---|---|
| **Home** `/` | `conversation intelligence platform` | 40 / **17** | 880 / 37 | `revenue intelligence platform` (US 1,300/33), `ai powered revenue intelligence platform` (US 390/**6**) |
| **Account Memory** | `account intelligence` + `conversation intelligence software` | 70 / **22** | 390 / 40 | `b2b account intelligence`, `what is account intelligence`, `account intelligence platform` |
| **Conversation to Action** | `ai sales assistant` | 140 / **21** | 590 / 39 | `agentic ai sales assistant` (US 140/**18**), `crm data entry automation` (SD 5), `meeting action items` |
| **CUE live coaching** | `ai sales coaching` | 70 / **18** | 390 / 40 | `real time sales coaching` (US 30/24), `real time sales coaching software` (US 20/**5**), `ai sales coaching tools` (CPC $153) |
| **Personal Assistant** | `ai meeting assistant` | 1,300 / 60 | 4,400 / 60 | `real time ai meeting assistant` (India 70/**6**), `ai meeting assistant for sales`, `ai powered meeting assistant` (US 40,500, pd 0.01) |
| **Hinglish page** (new) | `hinglish meeting transcription` | low | low | `hindi english meeting notes`, `ai note taker hindi` — untested volume, zero competition |

**Two traps I avoided.** `ai memory` (US 2,900) is semiconductor-stock content — `ai memory stocks`, `ai memory etf`, Micron. Wrong audience entirely, so the Account Memory page does not target it. And `revenue intelligence` (US) is polluted by `directorate of revenue intelligence` (74,000/mo — India's customs agency), which matters doubly now you're targeting India. Use `revenue intelligence platform`, never bare `revenue intelligence`.

---

## 5. Rewritten content

### 5.0 — Homepage: keep the poetry, add the plumbing

This is the technique for the whole site, so here it is once in full.

**Current H1:**
> Your revenue lives in your conversations. Don't lose it.

Keep it. It's your best line. But it needs a keyword-bearing companion. Add an eyebrow above and extend the subhead:

**Rewrite:**

> `[eyebrow]` CONVERSATION INTELLIGENCE FOR REVENUE TEAMS
>
> # Your revenue lives in your conversations. Don't lose it.
>
> The call ends. The opportunity shouldn't. Lynkk is the conversation intelligence platform that remembers every customer conversation — online, in person, in Hindi or English — and turns it into follow-ups, CRM updates, and your next best move.
>
> Start free · ▶ See how it works
> No credit card · 15+ languages · Online + in person

One phrase added to the subhead and an eyebrow line. The headline is untouched. The page can now rank.

**Apply the same move to your section H2s.** Keep the line, add the keyword as an eyebrow:

| Current H2 (keep as display headline) | Add this eyebrow above it |
|---|---|
| "Every conversation. One connected memory." | ACCOUNT MEMORY — *you already have this eyebrow. Change it to* **ACCOUNT INTELLIGENCE, AUTOMATICALLY** |
| "Good conversations deserve great follow-through." | FROM FIRST HELLO TO CLOSED-WON → **AI SALES ASSISTANT · FOLLOW-UPS & CRM UPDATES** |
| "While you're talking, it's connecting the dots." | INTRODUCING CUE → **CUE · REAL-TIME SALES COACHING** |
| "It's listened. Now let it help." | YOUR PERSONAL ASSISTANT → **YOUR AI MEETING ASSISTANT** |
| "Real conversations. Real-world selling." | THOUGHTFULLY BUILT → **HINGLISH, IN-PERSON, AND EVERY CALL AFTER** |

You already use eyebrow labels throughout. This costs you zero design work — just better words in a slot that already exists.

---

### 5.1 — ACCOUNT MEMORY

**URL:** `/product/account-memory`
**Meta title:** Account Memory — Every Customer Conversation, Connected | Lynkk *(62 chars)*
**Meta description:** Lynkk's account memory connects every call, meeting and commitment into one timeline. Ask what changed, what's blocking a deal, what you promised — and get a cited answer. *(170 — trim to 155)*
**H1:** Every conversation. One connected memory.
**Eyebrow:** ACCOUNT INTELLIGENCE, BUILT AUTOMATICALLY

**Hero** *(your current copy, tightened)*

> The budget from Tuesday. The objection from last month. The promise made in the hallway.
>
> Your account finally has a memory.

I'd keep this almost exactly — it's the strongest paragraph on your site. One change: you currently write "Finally, your account has a memory." Moving "finally" to the end lands harder.

**CTA:** Take the memory for a spin → *(secondary: Start free)*

---

**THE STORY** *(you have no story here — this is the gap)*

Your Acme Corp timeline is good but it's a *demo*, not a *story*. It shows mechanics. It doesn't show stakes. Add this above it:

> **"The deal didn't die. It changed hands."**
>
> `[PLACEHOLDER NAME]` inherited the Acme account in week two of a new job. The rep before had left. There was no handover — just a CRM record with four lines in it and a note that said "good relationship".
>
> The old way: ask around, read what you can, then walk into a ₹40-lakh renewal and ask questions the customer has already answered twice. Buyers notice. It costs you trust before you've earned any.
>
> Instead, `[NAME]` opened the account the night before. Eight months were already there. The $30K budget mentioned in the October discovery. The IT team brought in after the demo. The stretch to $50K, pending approval. The security review nobody had logged.
>
> `[NAME]` opened the call by picking up where the last rep left off — on the security review.
>
> "They thought I'd been on the account a year." — `[PLACEHOLDER: name, title, company]`

Then your Acme timeline follows as the proof. Story first, demo second.

---

**H2: What account intelligence actually means**

*(Targets "what is account intelligence" — definition in the first two sentences, snippet-ready.)*

Account intelligence means everything your company knows about one customer, in one current view — every conversation, every person, every commitment, every open issue. Instead of hunting through notes and asking colleagues, you open one page and see the whole relationship.

Lynkk builds it as you talk. You don't fill anything in.

**H2: What's in an account memory**

Your current section lists *"People, decisions, and commitments. Connected."* — true, but thin. Buyers want to know what they actually get:

**One timeline, every conversation.** Zoom, Google Meet, Teams, phone calls and in-person meetings. Your whole team's conversations, not just yours. In order, searchable.

**People, as they change.** Who you've met, what they care about, who went quiet, who got promoted, who joined late. The Acme story is a stakeholder story — your timeline already shows this well.

**Commitments, both directions.** What you promised them. What they promised you. Tracked until closed, so nothing quietly disappears.

**Decisions and what moved them.** Budget identified. New stakeholder. Budget updated. Your timeline already labels these — that labelling *is* the product. Say so.

**Answers with their source attached.** Ask "what did Acme say about budget across our last 3 calls?" and get an answer that cites the moment it was said. You never take the AI's word for it.

**H2: Gets richer with every call**

*(You have this line near the bottom of the page. It belongs here — it's the core argument for memory over notes.)*

A note-taker's value is flat. Every meeting gets the same summary and nothing accumulates.

Memory compounds. The first call is a transcript. The tenth call knows the budget cycle, which stakeholder actually decides, and the objection that has come up four times. Your next conversation starts ahead of where your last one ended.

**H2: Built for the handover**

Reps move. Territories change. Normally the context walks out with them.

The account keeps its own memory. The next owner inherits eight months of history, not four lines in a CRM field.

**H2: FAQ**

**What is account intelligence?**
One current view of everything your company knows about a customer — conversations, people, commitments and open issues — gathered automatically rather than typed in.

**How is this different from my CRM?**
Your CRM holds what someone remembered to type. Account memory holds what was actually said — and then fills your CRM in for you.

**How is Lynkk different from a meeting notetaker?** *(your existing answer — keep it, it's good)*
A notetaker helps you revisit a call. Lynkk connects conversations across an account, so you can ask what changed, track a commitment over time, and get answers with the original context.

**Does it work for B2B accounts with lots of stakeholders?**
That's the case it's built for. Multiple contacts, multiple colleagues on your side, conversations spread over months — one timeline.

**What happens when a rep leaves?**
The account keeps its memory. The next owner opens the page and has the full history.

**CTA:** Give your accounts a memory → *Start free · 5 meetings a month*

---

### 5.2 — CONVERSATION TO ACTION

**URL:** `/product/conversation-to-action`
**Meta title:** AI Sales Assistant — Follow-ups, CRM Updates, Done | Lynkk *(58 chars)*
**Meta description:** Lynkk turns conversations into finished work: follow-ups drafted, action items assigned, CRM updated — grounded in what was actually said. You review before anything sends. *(173 — trim to 155)*
**H1:** Good conversations deserve great follow-through.
**Eyebrow:** AI SALES ASSISTANT · FOLLOW-UPS & CRM UPDATES

**Hero** *(current + sharpened)*

> One connected workflow. Less admin between you and your next deal.
>
> Most tools tell you what to do after the call. Lynkk does it — then shows you before anything leaves your hands.

That second line is the one I'd add. Your current hero says what it is; it doesn't say why it beats the alternative.

**CTA:** See it on your own calls → *(secondary: Start free)*

---

**THE STORY**

> **"I used to lose Friday afternoons."**
>
> `[PLACEHOLDER NAME]` runs `[N]` customer calls a week. The calls were never the problem. The hour after each one was.
>
> Write the notes. Remember the three things promised. Update the CRM — or honestly, don't, and tell yourself Friday is for catching up. Then Friday arrives with six days of half-remembered calls at once, and some commitments have quietly vanished.
>
> Now the call ends and the work is waiting, done. Notes written. The two promises are tasks with owners and dates. The bug the customer mentioned is a ticket, with their own words attached. The CRM fields are filled from what was said, not from memory four days later.
>
> `[NAME]` reads it over. A minute, maybe two. Then the next call.
>
> "My pipeline is accurate for the first time. Not because I got disciplined — because I stopped needing to be." — `[PLACEHOLDER]`

---

**H2: The admin tax nobody budgets for**

Your "SOUND FAMILIAR?" section already nails this — *"I'll send that by the end of the day."* / Follow-up to Priya / Still in drafts. Pull that scenario onto this page. It is the single best piece of copy you have, and right now it's buried on the homepage.

Then the arithmetic:

Every call creates work. Write it up. Remember what was promised and by whom. Update the CRM so the forecast means something. Raise the ticket. Send the follow-up before the customer wonders whether you were listening.

Do it properly and you lose an hour per call. Skip it and your CRM becomes fiction — *"CRM: Looking good. Call: budget is on hold."* Your own pipeline-review scenario is exactly this. That gap is what this product closes.

Most teams skip it. Not from laziness. From arithmetic.

**H2: Capture. Connect. Follow up. Update CRM.**

You have these four steps as labels with no explanation. Buyers need the detail:

**01 · Capture.** Every conversation — Zoom, Meet, Teams, phone, in person. 15+ languages, Hinglish included.

**02 · Connect.** The conversation joins the account's memory. People, decisions and commitments link to what came before.

**03 · Follow up.** A draft, grounded in what was actually said — not a template with the name swapped. You review, edit, send.

**04 · Update CRM.** Fields filled from the conversation. Next steps, commitments, budget signals, blockers. `[VERIFY: MEDDPICC / BANT / custom field mapping? Sybill's entire pitch is built on this and buyers will ask directly.]`

**H2: Nothing slips through**

Your homepage says *"Nothing slips through. 3 action items · 2 commitments."* Good line, underused. Expand it:

Action items get an owner and a date — not a bullet list, actual tasks assigned to the person who agreed to them. Commitments are tracked both ways, yours and theirs, until they close.

**H2: Agentic, but on a short leash**

*(Targets `agentic ai sales assistant` — US 140/mo, **SD 18**. Easy win and it answers the real objection.)*

"Agentic AI" usually means software acting without asking. Being nervous about that is reasonable.

Lynkk prepares the whole job — draft, tasks, fields, ticket — and shows you before anything is written or sent. You approve, edit, or bin it. Your own site already promises this: *"You review before sending."* Say it louder. It's a selling point, not a disclaimer.

**H2: Your tools, in the loop**

Google Meet · Zoom · Microsoft Teams · in-person · phone · Gmail · Calendar · CRM. Pipedrive and custom MCP workflows coming.

*(Note: "MCP workflows" means nothing to a sales buyer. Either explain it in six words — "connect Lynkk to your own internal tools" — or move it to a developer page.)*

**H2: FAQ**

**Will Lynkk send follow-ups without my review?** *(your existing answer, kept)*
No. Lynkk drafts follow-ups using the conversation's context. You review, edit, and send when you're ready.

**What does it update automatically?**
Follow-up drafts, action items with owners and dates, and CRM fields. All reviewable before anything is written.

**How accurate are the action items?**
They come from what was said, and each one links back to that moment so you can check it in a click.

**Which CRMs does it work with?**
`[PLACEHOLDER: list them. "CRM integration" without names loses deals — buyers assume you don't support theirs.]`

**CTA:** End the post-call admin → *Start free*

---

### 5.3 — CUE LIVE COACHING

**URL:** `/product/cue`
**Meta title:** CUE — Real-Time AI Sales Coaching, Live on the Call | Lynkk *(58 chars)*
**Meta description:** CUE is your private real-time co-pilot. Account context, objection handling and live battlecards on your screen while you're still talking. Only you can see it. *(159)*
**H1:** While you're talking, it's connecting the dots.
**Eyebrow:** CUE · REAL-TIME AI SALES COACHING

> **Expectation-setting, internally:** `real time sales coaching` is 30/mo in the US and `live ai sales coaching` is 0/mo. The category isn't searched yet. Judge this page on **sales enablement and differentiation**, not traffic. The flip side: difficulty on the whole cluster is 4–5, so you can own it cheaply before it wakes up. This is also your head-to-head page against **Clari Copilot**, whose flagship is exactly this.

**Hero** *(current copy — strong, keep)*

> Your private, real-time co-pilot. The right context, the right answer, right when you need it.
>
> Listening. Connecting. One step ahead.

Add one line for the searcher:

> CUE is real-time sales coaching that arrives during the call — not in a review a week later.

**CTA:** See CUE on a live call → *(secondary: Start free)*

---

**THE STORY**

Your current example — *"How does this compare to what you quoted us last time?"* — is a perfectly chosen question. It's unanswerable from memory and completely ordinary. Build the story on it:

> **"The hardest question of my career, in week two."**
>
> `[PLACEHOLDER NAME]` had been selling for nine days. Commercials call, Acme Corp. Then: *"How does this compare to what you quoted us last time?"*
>
> Nine days in, there is no answer to that. There's "let me come back to you" — which, to a buyer mid-negotiation, means you don't know your own account.
>
> It was on screen before the sentence finished. The previous quote. What had changed. Why.
>
> `[NAME]` answered it properly, and the call moved on.
>
> "My manager asked afterwards who'd briefed me. Nobody briefed me. It was just there." — `[PLACEHOLDER]`

---

**H2: Why coaching after the call is too late**

Call reviews are useful. They're also a week late.

By the time a manager has listened back, the deal has moved, the objection was fumbled, and the rep has repeated it in four more calls. Nobody can review every call, so most calls are never coached at all.

Reps don't need more feedback. They need help at the moment it's hard.

**H2: What CUE does, live**

You have four feature labels. They're good — they just need one line each:

**Instant account context.** What this customer already told you, surfaced as the topic comes up. No tabbing away mid-sentence.

**Objection handling.** Your next best response, drawn from how these objections have actually been handled before — your team's language, not a generic script.

**Live battlecards.** Walk in with a point of view. Competitor comparisons and positioning, there when the question lands.

**Commitment tracking.** Every promise made in the call, visible as it happens, so nothing needs remembering afterwards.

**H2: Only you can see it**

*(Your existing FAQ answers this. Promote it to an H2 — it's the first thing a rep worries about.)*

CUE is on your screen and nowhere else. Nothing for the customer to see or hear. No bot announcing itself, no pause while you check a tab. You stay in the conversation — *present, not preoccupied*, as your own copy puts it.

**H2: It helps reps. It doesn't replace them.**

*(Targets `ai sales coaching augment vs replace` and `ai sales coaching job security` — both real Google autocomplete terms, and **no competitor is answering them**. This is the biggest unanswered question in the category and the main thing that kills adoption when a manager rolls out call AI.)*

The honest position:

CUE doesn't sell for you. It doesn't score you for your manager behind your back. It doesn't replace judgement built over years of difficult conversations.

It does the part that was never a test of skill — remembering the right fact at the right second. New reps get to sound like they've been on the account a year. Experienced reps stop losing deals to a number they couldn't recall.

`[VERIFY: can a rep see their own CUE history before their manager does? If yes, say so plainly here. Rep-trust is the documented reason live-coaching tools fail to get adopted — Clari Copilot's reported weakness is exactly this.]`

**H2: FAQ**

**What is AI sales coaching?**
Software that helps a rep improve their conversations — either live during the call with context and suggestions on screen, or afterwards with feedback on what was missed.

**Can the customer see my CUE suggestions?** *(your existing answer, kept)*
No. CUE is private and visible only to you during the call.

**Does AI sales coaching actually improve performance?**
Honestly: it depends on whether reps use it. Live help gets used, because it solves a problem in the moment. Post-call scorecards often don't, because they feel like surveillance. CUE leads with the live help. `[PLACEHOLDER: add your own data when you have it — don't borrow anyone else's.]`

**Will my manager see everything?**
`[VERIFY and answer plainly. Every rep asks this first.]`

**Does it work in Hindi and English?**
Yes — including calls that switch between them mid-sentence.

**CTA:** Get your edge on every call → *Start free*

---

### 5.4 — PERSONAL ASSISTANT

**URL:** `/product/personal-assistant`
**Meta title:** AI Meeting Assistant That Preps, Joins and Follows Up | Lynkk *(60 chars)*
**Meta description:** An AI powered meeting assistant with the context to do more than answer. Ask what you promised, prep for next week, or draft a follow-up — grounded in real conversations. *(169 — trim to 155)*
**H1:** It's listened. Now let it help.
**Eyebrow:** YOUR AI MEETING ASSISTANT

> **Note:** `ai meeting assistant` is SD 60 in both US and India — a deliberate stretch. This page will rank slowest of the four, and the long-tail terms (`real time ai meeting assistant`, India SD **6**) are where it starts. Don't judge it at 90 days.

**Hero** *(current copy, which is already strong)*

> An assistant with the context to do more than answer. Turn what was discussed into the work that moves a deal forward.

Add the search-facing line:

> Most AI meeting assistants hand you a summary. This one has read every conversation your team has had — and can act on them.

**CTA:** Meet your assistant → *(secondary: Start free)*

---

**THE STORY**

Your "Same calendar. A very different day." section is already a story — and it's good. 09:00 walk in warm · 02:00 stay in the conversation · 02:52 follow through faster. Keep it. Move it here, and make it a person rather than an abstraction:

> **A DAY WITH LYNKK · `[PLACEHOLDER NAME]`, `[ROLE]` at `[COMPANY]`**
>
> **09:00 — Walk in warm.** Seven meetings today, no prep time, because there's never prep time. On the way in, `[NAME]` reads the account brief on a phone: yesterday's blocker, last month's quote, today's next step. Ninety seconds. *Less searching. More selling.*
>
> **11:20 — Ask, don't guess.** Mid-call, a question about last quarter's volumes. `[NAME]` asks out loud. The answer comes back — from a conversation in August, with a colleague who's since changed teams.
>
> **14:00 — Stay in the conversation.** `[NAME]` listens to the customer. CUE surfaces the context. Lynkk captures the commitments. *Present, not preoccupied.*
>
> **14:52 — Follow through, faster.** The draft is ready to review. The CRM has the details. *The momentum stays with you.*
>
> **17:30 — Nothing waiting.** No admin backlog, because it was done after each call.

Your existing copy is almost all of this. It just needs a name on it and one more beat (the 11:20 ask).

---

**H2: Note-taking was never the hard part**

There are dozens of AI note-takers. Most do one thing: you have a meeting, you get a summary.

But the summary was never hard. Walking into a meeting already knowing where you left off is hard. Getting a number you can't recall while the customer waits is hard. Finding out what happened in the meeting you missed without watching fifty minutes of video is hard. Clearing the admin so it doesn't pile up to Friday is hard.

That's an assistant. The rest is transcription.

**H2: Ask it anything**

Your four example prompts are well chosen — *"Draft a follow-up to Priya." / "What did I promise this week?" / "Help me prep for next week." / "Create a deal summary."* Keep all four and group them so the range is obvious:

- **Prep** — "Help me prep for next week." · "What's blocking the Acme deal?"
- **Recall** — "What did I promise this week?" · "What did they say about budget?"
- **Act** — "Draft a follow-up to Priya." · "Create a deal summary."

**H2: Before, during and after**

**Before.** An account brief, automatically, before every meeting. What happened last time, what's still open, what changed.

**During.** Ask out loud, get an answer. CUE handles the live coaching; the assistant handles the questions. *(Link to [CUE](/product/cue).)*

**After.** Notes, action items, CRM updates and a follow-up draft, waiting for your review. *(Link to [Conversation to Action](/product/conversation-to-action).)*

**H2: Catch up on meetings you missed**

Don't watch the recording. Ask the question. "What did they decide?" "Was my team mentioned?" "What do I need to do?"

**H2: Your team's knowledge, not just yours**

This is the part a personal note-taker can't do. The assistant answers from your organisation's conversations, not only the ones you attended. A colleague's call in June is available to you in October — within your permissions. `[VERIFY permission model.]`

This is also your Team tier's whole argument — *"A memory you can share."* Make the connection explicit.

**H2: FAQ**

**What is an AI meeting assistant?**
A tool that helps with the whole meeting rather than just the notes — preparing you beforehand, answering questions during, and finishing the follow-up work after.

**Which AI meeting assistant is best?**
Depends what you need. For tidy notes from one call, the simple note-takers are fine and cheap. If you need meetings to connect to each other, to accounts and to your CRM, you need memory. That's what Lynkk is built for. *(Honest comparison pages belong here — §7.)*

**Does it work for in-person meetings too?** *(your existing answer, kept)*
Yes. Alongside Zoom, Google Meet and Teams, Lynkk captures in-person and phone conversations through mobile recording.

**Can it answer questions about meetings I wasn't in?**
Yes, within your access permissions.

**Can I use it without a bot joining?**
`[VERIFY]` — `ai meeting assistant without bot` and `bot free ai meeting assistant` are real search terms and Granola built a brand on them. If you support it, say so; if you don't, say that too.

**CTA:** Get an assistant, not a note-taker → *Start free*

---

### 5.5 — NEW PAGE: Hinglish and in-person selling

Your strongest differentiator currently sits in a small card. Give it a page.

**URL:** `/hinglish-sales-calls` **H1:** Speaks your language. Even when it's two at once.

> "Let's close this. हाँ, let's do it."
>
> Real sales calls don't pick a language and stay there. They switch mid-sentence. Most AI note-takers break on that — they transcribe one language and lose the rest, or they mangle both.
>
> Lynkk handles 15+ languages, Hinglish included, because that's how conversations actually happen.

Then: how it handles code-switching, which languages, in-person capture, phone calls.

**Why this page matters:** no competitor — Gong, Avoma, Fireflies, Sybill, Granola, Otter — is writing for a seller who switches between Hindi and English. Zero competition, and it's the most credible reason an Indian revenue team picks you over Fireflies. Pair it with in-person capture: `ai note taker for in person meetings` is 480/mo in the US with 100% paid competition — advertisers are fighting over it, and bot-based rivals mostly can't serve it.

---

## 6. Specific fixes on the current page

| # | Issue | Fix |
|---|---|---|
| 1 | `og:url` points at the staging domain | Update to the production URL before launch |
| 2 | No `og:image`, no canonical tag | Add both |
| 3 | 13 H2s, zero keywords | Add eyebrow labels per §5.0 — no design change needed |
| 4 | Four products, one URL | Split per §2 |
| 5 | "custom MCP workflows" in a sales section | Explain in six words or move to a developer page |
| 6 | "CRM sync" / "CRM integration" with no CRM named | Name them. Buyers assume exclusion. |
| 7 | No security or privacy section — only a footer link to the policy | Add a visible trust block. See below. |
| 8 | Pro is $19 here, $15 on lynkk.ai | Reconcile |
| 9 | Resources section has 3 placeholder guides | Ship them — they're your only link-earning assets |
| 10 | No FAQPage schema | Add it. Your 7 FAQs are well written and could win AI Overviews. |

**On the trust block (#7).** Competitors make this prominent and there's live controversy you can use — Otter reportedly trains its AI on de-identified user recordings by default and faces a 2025 consent class action (unresolved); Gong is criticised for US-only data storage. For an Indian buyer, data residency is a real procurement question. If these are true for Lynkk, they're high-leverage claims:

- `[VERIFY]` We never train AI models on your conversations
- `[VERIFY]` Choose where your data is stored
- `[VERIFY]` SOC 2 Type II
- `[VERIFY]` Delete any conversation, any time

Your FAQ currently says *"If your team has specific requirements, talk to us before you connect your tools."* That's honest, but it reads as "we may not meet your requirements". Replace it with the actual answers.

---

## 7. What to build next, ranked

**1. Split the four products into four pages.** Everything else depends on it. Nothing can rank while four products share one URL.

**2. A `/platform` hub.** `revenue intelligence platform` (US 1,300/mo, SD 33) and `ai powered revenue intelligence platform` (US 390/mo, **SD 6**) have no home. The SD 6 term is close to free traffic.

**3. Comparison pages — your biggest gap.** Sybill and Avoma rank on each other's brand names with large libraries. You have none, and buyers search these at the decision stage:

| Page | India vol/SD | US vol/SD |
|---|---|---|
| Lynkk vs Fireflies | 1,600 / **32** | 4,400 / 63 |
| Lynkk vs Fathom | 1,300 / **43** | 5,400 / 45 |
| Lynkk vs Otter | — | 5,400 / 57 |
| Lynkk vs Granola | — | 1,300 / **30** |
| Lynkk vs Gong | 10 / **19** | 210 / 36 |
| Lynkk vs Avoma | 10 / **11** | — |

India difficulty on `fireflies ai note taker` is **32** against 63 in the US. Write these honestly — name where the competitor is better. Buyers can tell, and dishonest ones don't convert.

**4. The Hinglish page** (§5.5). Zero competition, maximum differentiation.

**5. Integration pages.** Real demand: `google meet ai note taker` (India 170/**21**, US 590/40), `ai note taker for microsoft teams` (India 10/**8**), `ai note taker for zoom` (US 480/33). You already rank #39 for `zoom meeting bot` on lynkk.ai/features/meeting-bot — proof the pattern works.

**6. Answer what the category avoids.** `ai sales coaching augment vs replace`, `ai sales coaching job security`. Nobody is writing for these. They're what reps actually think, and what blocks adoption.

**7. Ship the three Resources guides.** "Walk into your next call with the whole story" / "A follow-up that proves you were listening" / "Build an account memory your team can trust" are good titles sitting on placeholder pages. You have 3 referring domains. Content is how that number moves.

---

## 8. Before launch — checklist

**Must do:**
- [ ] Replace every `[PLACEHOLDER]` with a real name, figure or quote — or cut the sentence. **No invented customer results.** You're already disciplined about this ("illustrative") — hold that line in the stories.
- [ ] Resolve every `[VERIFY]`: CRM list, MEDDPICC/BANT support, no-bot option, rep-visibility of CUE history, permission model, SOC 2, data residency, training-data policy.
- [ ] Fix `og:url` — it currently exposes the staging domain.
- [ ] Reconcile Pro pricing ($19 vs $15 on lynkk.ai).
- [ ] Decide the lynkk.ai question — see below.

**Should do:**
- [ ] Four product URLs, one primary keyword each (§4).
- [ ] Eyebrow keyword labels on existing H2s (§5.0) — cheapest SEO win available.
- [ ] FAQPage schema on all FAQ blocks.
- [ ] Set the India-first expectation internally: India SD 10–22 terms can move in 2–3 months; `ai meeting assistant` (SD 60) is a 12-month target and needs links, not just copy.

**The lynkk.ai decision — worth making deliberately.**
You said lynkk.ai has a separate use case. Right now Google has lynkk.ai filed as a *meeting-notes tool*: it ranks for `zoom meeting bot` and its indexed blog is all note-taker content (Teams, Zoom, Google Meet transcripts). The revamp is positioned completely differently — "your revenue team's memory", for reps, leaders and RevOps.

Three options, and they're genuinely different bets:

1. **Revamp replaces lynkk.ai.** Cleanest. One domain, all authority compounds, keyword map as written above. The existing blog becomes top-of-funnel for it.
2. **Two separate products on two domains.** Viable, but they'll compete for overlapping terms (`ai note taker`, `ai meeting assistant`) and neither inherits the other's authority. At DA 1 you can't afford to split a thin signal in two.
3. **lynkk.ai stays the note-taker; revamp becomes the revenue product.** Workable if the note-taker content funnels into the revenue product with real internal links — self-serve note-taker as the free tier, revenue platform as the upsell. That story is actually consistent with your pricing ladder.

My recommendation is **1 or 3, not 2.** Tell me which and I'll redo the keyword map accordingly — the split matters more than any individual page's copy.

---

## 9. Sources

**Site:** `lynkk-revenue-story.imsjwagh99.chatgpt.site` crawled 21 Oct 2026 — full text, headings, meta tags. Single-page site; the only outbound links are to lynkk.ai (privacy, terms, sign-up) and `admin@lynkk.ai`.

**Keyword data:** Ubersuggest MCP (`marketing@lynkk.ai`, tier 1) — `domain_overview`, `match_keywords`, `google_suggestions`, `content_ideas`, `location_suggest`. US (2840) and India (2356), October 2026. lynkk.ai: DA 1, 1 organic keyword (`zoom meeting bot`, position 39), 0 traffic, 4 nofollow backlinks from 3 domains.

**Competitor context** (third-party and competitor-authored — verify before public use):
[Avoma: Clari vs Gong](https://www.avoma.com/blog/clari-vs-gong) · [Clari Copilot vs Gong](https://theaiagentindex.com/compare/clari-copilot-vs-gong) · [Allego: conversation intelligence software](https://www.allego.com/blog/top-conversation-intelligence-software/) · [Sybill vs Avoma](https://www.sybill.ai/blogs/sybill-vs-avoma) · [ZoomInfo: Avoma alternatives](https://pipeline.zoominfo.com/sales/avoma-alternatives) · [Gong Trust & Security](https://www.gong.io/platform/trust) · [Circleback: notetaker security](https://circleback.ai/blog/ai-meeting-notetaker-security) · [SOC 2 notetakers](https://meetingnotes.com/blog/soc-2-ai-meeting-notetaker) · [Lynkk](https://lynkk.ai/)
