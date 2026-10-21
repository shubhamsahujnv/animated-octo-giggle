# Lynkk — Product Page Content Rewrite + SEO & Competitor Research

**Prepared:** 21 October 2026
**Scope:** Keyword research (Ubersuggest, connected account `marketing@lynkk.ai`), competitor content research, and rewritten copy for five product pages — Accounts, Memory, Conversational Action, Live Coaching (CE), and Personal Assistant.
**Status:** Draft v1 for review.

---

## 0. Read this first — two things that shaped the draft

**1. I could not open your staging page.** `lynkk-revenue-story.imsjwagh99.chatgpt.site` and `lynkk.ai` were both blocked by this environment's network policy. So this is **not a line-by-line rewrite of your existing copy** — it is a fresh, research-led rewrite built from what I could verify about Lynkk through search results and your own indexed pages. If you paste the current page text (or allow the domain), I will diff it against this draft and keep anything strong you already have.

> To unblock it: in the session title bar, open the cloud environment menu → Edit → Network access. Either raise the access level, or add `lynkk-revenue-story.imsjwagh99.chatgpt.site` and `lynkk.ai` under Allowed domains, leaving "Allow package managers" ticked. Steps: https://code.claude.com/docs/en/cloud-environments#network-access

**2. Two naming questions I made assumptions about.** Flagging rather than guessing silently:

| Your term | What I assumed | Confirm? |
|---|---|---|
| **Account** | Account-level intelligence — every conversation, person and commitment for one customer account, rolled into one view. | Is this the product, or the user's login/profile area? If it's login/profile, that page is not an SEO page and should be cut from this set. |
| **CE Live Coaching** | "CE" = Conversational Engine / Conversation Engagement, i.e. live in-call coaching. I have written it as **Live Coaching** with CE as an internal label. | What does CE stand for publicly? If it's an acronym customers don't know, I recommend keeping it out of the H1 and URL — nobody searches for it. |

**3. All numbers and names in the stories are placeholders.** Every statistic, customer name and quote below is marked `[PLACEHOLDER]`. Do not publish any of them until your team supplies real figures. Publishing invented customer results would be a real legal and trust problem, so I have deliberately not written any that look real.

---

## 1. Research summary

### 1.1 Where lynkk.ai stands today (Ubersuggest, US)

| Metric | Value | What it means |
|---|---|---|
| Domain Authority | **1** | Effectively a brand-new domain in Google's eyes. |
| Organic keywords | **1** | You rank for one term: `zoom meeting bot` (vol 20) at **position 39**, via `/features/meeting-bot`. |
| Monthly organic traffic | **0** | No meaningful search traffic yet. |
| Backlinks / ref. domains | **4 / 3** | All 4 are nofollow. No link equity. |

**The strategic consequence, and it drives every keyword choice below:** at DA 1 you cannot win head terms. `conversation intelligence` (1,900/mo) has a Search Difficulty of **60**. `ai meeting assistant` (4,400/mo) is **60**. `ai note taker` (27,100/mo) is **48** with 100% paid competition. Chasing those now wastes the next six months.

So each page below is built to a **two-tier keyword plan**: a realistic primary target in the SD 5–40 band that you can rank for this quarter, plus one aspirational head term woven in naturally for when your authority catches up.

### 1.2 The highest-value keyword findings

**Finding A — the money is in commercial long-tail, and the CPCs prove it.**
Low volume does not mean low value here. These terms have very high commercial intent:

| Keyword | Volume | SD | CPC | Note |
|---|---|---|---|---|
| `ai sales assistant` | 590 | 39 | **$64.51** | Advertisers pay $64 a click. Winnable. |
| `ai sales coaching tools` | 50 | 40 | **$153.69** | Tiny volume, enormous intent. |
| `ai sales assistant software` | 90 | 39 | **$187.71** | Highest CPC found in the whole study. |
| `conversation intelligence tools` | 90 | 37 | $126.46 | |
| `revenue intelligence platform` | 1,300 | **33** | $36.99 | Best volume-to-difficulty ratio in the set. |
| `best conversation intelligence software` | 90 | 40 | $56.51 | Comparison intent. |
| `ai powered revenue intelligence platform` | 390 | **6** | $42.91 | SD 6. Near-free win. |

`revenue intelligence platform` (1,300/mo, SD 33) and `ai powered revenue intelligence platform` (390/mo, **SD 6**) are the two strongest opportunities in this entire research set. Neither currently has a home on your site. **Recommendation: build a platform/hub page to own them**, and link all five product pages from it.

**Finding B — do NOT optimise the Memory page for "ai memory".**
`ai memory` looks attractive at 2,900/mo. It is a trap. The SERP is dominated by semiconductor investing: `ai memory stocks` (8,100), `ai memory stock` (6,600), `ai memory etf`, `ai memory shortage`, `ai memory chip stocks micron sandisk`. You would be competing with stock-picking sites for people who want to buy Micron shares. Zero buyers. The Memory page targets meeting-recall language instead.

**Finding C — same trap on "revenue intelligence", partially.**
`directorate of revenue intelligence` pulls **74,000/mo** — it is India's customs enforcement agency. When you look at `revenue intelligence` data, strip the DRI terms out or your volume estimates will be badly inflated. The clean commercial terms are `revenue intelligence platform`, `revenue intelligence software`, `revenue intelligence tools`.

**Finding D — "account intelligence" is weak and mostly navigational.**
`account intelligence` is only 90/mo and Ubersuggest classes the intent as **Navigational** — autocomplete shows `account intelligence view salesforce`, `account intelligence view accounts salesforce`, `how to enable account intelligence view in salesforce`. Most searchers want a Salesforce setting, not a product. The Accounts page therefore leads on plain-English problem language ("everything we know about this customer") and keeps `account intelligence` as a supporting term only.

**Finding E — one surprising high-volume, low-competition term.**
`ai powered meeting assistant` — **40,500/mo, SD 50, paid competition 0.01**. That volume is far above the plain `ai meeting assistant` (4,400) and the near-zero paid competition is unusual for a term that size. It may be inflated or seasonally spiking, so treat it as a bet, not a certainty — but it costs nothing to include the exact phrase on the Personal Assistant page, which is what I have done.

**Finding F — "live coaching" barely exists as a search term, so sell it, don't SEO it.**
`real time sales coaching` is 30/mo. `live ai sales coaching`, `real time ai sales coaching`, `live call coaching software` are all **0/mo**. This category is not searched yet. Two implications: (a) do not expect the Live Coaching page to pull traffic — judge it as a **sales-enablement and differentiation page**; (b) because almost nobody has written for these terms (SD 4–5), you can own them cheaply before the category wakes up. That is a land-grab worth making now.

**Finding G — question keywords for FAQ blocks (straight from Google autocomplete).**
Real questions people type, pulled from the suggestions data. Each FAQ below uses these verbatim, which is what wins AI Overviews and featured snippets:
- "what is conversation intelligence", "what is conversation intelligence software"
- "what is ai sales coaching", "does ai sales coaching improve performance"
- "what is ai meeting assistant", "which ai meeting assistant is best", "ai meeting assistant without bot"
- "ai meeting notes without recording", "ai note taker for in person meetings"
- "what is account intelligence", "b2b account intelligence"
- "ai sales coaching augment vs replace", "ai sales coaching job security" — these two are objection-shaped. Reps are scared of being replaced and managers are asking about it. Nobody in the category is answering them. Big content gap.

### 1.3 Competitor research

Sources were third-party comparisons and vendor blogs — I could not load competitors' own pages directly, so treat specifics as secondhand and verify before using any of it in public claims.

**Positioning map**

| Competitor | How the market describes it | The gap it leaves you |
|---|---|---|
| **Gong** | The benchmark. Strongest on deal-risk detection and forecasting from conversation data. Enterprise price and enterprise complexity. | Heavy, expensive, built for large RevOps teams. Leaves the mid-market and the individual rep underserved. |
| **Clari Copilot** (ex-Wingman) | The one real live-coaching competitor — battlecards and objection prompts during live calls. | Reported adoption friction with recording dependencies. Live coaching is their flagship, so this is where you must be sharply differentiated. |
| **Avoma** | Accessible all-in-one for smaller teams: AI summaries, scorecards, topic tracking, CRM updates, built-in scheduler. | Deal intelligence described as lighter than Gong's. Competes on breadth, not depth. |
| **Sybill** | Owns the "CRM Autofill" message — fills MEDDPICC / BANT / custom fields after calls. | Post-call only. Nothing live. |
| **Fireflies / Otter / Fathom / Granola** | Note-takers. Volume play, low price, consumer-ish. | No account memory, no coaching, no CRM depth. They capture meetings; they don't connect them. |

**Four content patterns every serious competitor uses, that you should match**

1. **A named feature vocabulary.** Gong has "Call Spotlight" and "AI Tasker". Sybill has "CRM Autofill". Clari has "Copilot". Naming a capability makes it quotable, linkable and searchable. Your five product names are already good — use them consistently as proper nouns.
2. **Aggressive comparison content.** Sybill and Avoma both run large libraries of "X vs Y" pages — `avoma vs fathom`, `fireflies vs avoma`, `sybill vs avoma`, `clari vs gong`. They rank on competitors' brand names. **You have none.** This is your single biggest content gap, and the keyword data backs it: `gong conversation intelligence` (210), `gong revenue intelligence platform` (210, SD 27), `hubspot conversation intelligence` (110), `salesforce conversation intelligence` (50), `clari revenue intelligence` (30), `salesloft conversation intelligence` (30, SD **20**, CPC $84.55). Low difficulty, high intent, buyers in-market. See §4.
3. **Trust and compliance as a visible section, not a footer link.** The pattern is consistent: SOC 2 Type II first, then GDPR, then tier-gated HIPAA, SSO and SCIM. Two live controversies make this sharper than usual — Otter is reported to train its AI on de-identified user recordings by default and is facing a 2025 consent class action (unresolved, so treat carefully), and Gong is criticised for US-only data storage. **"We never train on your conversations" and "choose your data region" are therefore high-leverage claims — if and only if they are true for Lynkk.** Verify with engineering before publishing. I have left them as `[VERIFY]`.
4. **"Without a bot" as a wedge.** `ai meeting assistant without bot`, `ai meeting notes without recording`, `bot free ai meeting assistant`, `ai meeting assistant that doesn't join by bot`, `ai sales coaching software no meeting bots` all appear in autocomplete. Granola built a brand on it. You have both a bot and in-person capture — so you can answer it better than Granola can, by offering the choice.

**Where Lynkk is genuinely differentiated** — this is the spine of all five pages below:

> Competitors analyse **meetings**. The note-takers capture one call at a time. Gong analyses calls to score deals. Nobody connects every conversation — online, in person, across months and across people — into one continuous memory that then **acts**: answering you live by voice mid-call, updating the CRM, and opening the ticket.
>
> **The one-line wedge: others remember the meeting. Lynkk remembers the relationship.**

In-person capture is worth pushing hard: `ai note taker for in person meetings` is 480/mo with 100% paid competition — advertisers are fighting over it, and most bot-based competitors simply cannot serve it.

---

## 2. Keyword map — one primary target per page, no cannibalisation

| Page | Primary keyword | Vol | SD | Secondary keywords | Aspirational |
|---|---|---|---|---|---|
| **(New) Platform hub** | `revenue intelligence platform` | 1,300 | 33 | `ai powered revenue intelligence platform` (390, **SD 6**), `revenue intelligence software`, `revenue intelligence tools` | `conversation intelligence platform` (880) |
| **Accounts** | `account intelligence platform` | 90 | 38 | `account intelligence software`, `b2b account intelligence`, `what is account intelligence`, `account intelligence` | `revenue intelligence` (320) |
| **Memory** | `ai meeting notes` | 1,000 | 38 | `ai note taker for in person meetings` (480), `searchable meeting notes`, `ai memory layer` (30), `ai meeting notes without recording` | `ai note taker` (27,100) |
| **Conversational Action** | `ai sales assistant` | 590 | 39 | `agentic ai sales assistant` (140, **SD 18**), `meeting action items` (70), `crm data entry automation` (SD 5), `ai sales assistant platform` | `ai sales assistant software` (CPC $187) |
| **Live Coaching (CE)** | `ai sales coaching` | 390 | 40 | `real time sales coaching` (30, SD 24), `real time sales coaching software` (20, **SD 5**), `call coaching software` (30), `ai sales coaching tools` (CPC $153) | `conversation intelligence` (1,900) |
| **Personal Assistant** | `ai meeting assistant` | 4,400 | 60 | `ai powered meeting assistant` (40,500, pd 0.01), `real time ai meeting assistant` (110), `live ai meeting assistant` (170), `ai meeting assistant for sales` | `meeting assistant ai` (3,600) |

**Rules applied:** one primary per page, no two pages competing for the same term, every primary in the SD 5–40 band except the two deliberate stretches (`ai meeting assistant`, `conversation intelligence`). Each primary appears in the URL, meta title, H1, first 100 words, and one H2 — and nowhere else forced.

---

## 3. The rewritten product pages

**House style used throughout** — because you asked for copy a user can easily understand:
- Short sentences. One idea each. Target reading age ~13 (Grade 8).
- No jargon in headlines. "Everything you know about a customer, in one place" beats "unified account intelligence layer".
- Lead with the problem the reader already feels, then the fix.
- Every feature states a plain outcome: "so you stop…" / "so you can…".
- Second person. "You", not "users" or "sales professionals".

---

### 3.1 — ACCOUNTS

**URL:** `/products/accounts`
**Meta title:** Account Intelligence Platform | Every Customer Conversation in One View — Lynkk *(59 chars)*
**Meta description:** See everything your team knows about a customer in one place. Lynkk's account intelligence platform connects every call, meeting and commitment — automatically. *(158 chars)*
**H1:** Everything you know about a customer, in one place

**Hero**

> Your company has met this customer eleven times. The notes are in five different people's heads, three note apps and one CRM field nobody updated.
>
> Lynkk puts all of it on one page. Every conversation, every person, every promise — organised by account, updated automatically, ready before you walk in.

**CTA:** See your accounts come to life → *(secondary: Watch a 2-minute tour)*

---

**THE STORY** *(all details placeholder — replace with a real customer)*

> **"I walked in and knew more about their business than they expected."**
>
> [PLACEHOLDER NAME] took over a key account three weeks into a new job. The previous owner had left. There was no handover.
>
> The old way: read a CRM record with four lines in it, ask colleagues what they remembered, then walk into the renewal and ask questions the customer had already answered twice. Customers notice that. It costs you trust before you have earned any.
>
> With Lynkk, [NAME] opened the account page the night before. Fourteen months of conversations were already there. Who had said what. The integration complaint from March that was never closed out. The budget cycle the CFO had mentioned in passing. The two champions who had since been promoted.
>
> [NAME] opened the renewal by referencing the March complaint and what had been done about it.
>
> "They assumed I'd been on the account for a year." — [PLACEHOLDER: name, title, company]
>
> *[PLACEHOLDER: outcome metric, e.g. renewal closed in X days]*

---

**H2: Why account history keeps getting lost**

You already know this feeling:

- The person who owned the relationship left, and the context left with them.
- Notes live in whoever's app — Notion, a notebook, the back of a boarding pass.
- The CRM has fields for this. Nobody fills them in after a long day of calls.
- Four people from your side have met this customer. None of them know what the others heard.

None of this is a discipline problem. It's a plumbing problem. Information from conversations has never had anywhere automatic to go.

**H2: What account intelligence actually means**

*(Targets "what is account intelligence" — written as a snippet-ready definition in the first two sentences.)*

Account intelligence means bringing together everything your company knows about one customer — every conversation, email, commitment and open issue — into a single, current view. Instead of hunting through notes and asking colleagues, you open one page and see the whole relationship.

Lynkk builds that view on its own. You don't fill anything in.

**H2: What you get on every account page**

**One timeline, every conversation.** Online calls, in-person meetings, across months and across your whole team. In order. Searchable.

**The people map.** Who you've met, what they care about, who has gone quiet, who got promoted. Relationships change; the page keeps up.

**Open commitments.** Every "we'll get back to you" from both sides, pulled out of conversations and tracked until it is closed. Nothing quietly dropped.

**Themes over time.** The objection that has come up in four of the last six calls. The feature asked for twice a quarter. Patterns you cannot see one meeting at a time.

**Pre-meeting brief.** Before every call, a short page: what happened last time, what is still open, what changed. Read it in ninety seconds.

**H2: Built for the handover**

Reps move. Territories change. Accounts get reassigned. Normally the knowledge walks out of the door.

With Lynkk the account keeps its own memory. A new owner inherits fourteen months of context instead of four lines in a CRM field. *(Tie-in: this is [Memory](/products/memory) working underneath.)*

**H2: Works with the tools you already use**
`[PLACEHOLDER: integration logos — Salesforce, HubSpot, Slack, Jira, Google Meet, Zoom, Teams]`

**H2: Your data stays yours**
`[VERIFY WITH ENGINEERING before publishing any of these]`
- SOC 2 Type II `[VERIFY]`
- GDPR-ready, with data export and deletion `[VERIFY]`
- **We do not train AI models on your conversations** `[VERIFY — if true this is a major differentiator against Otter, which is reported to train on de-identified user recordings by default]`
- Choose where your data is stored `[VERIFY — directly counters Gong's reported US-only storage]`
- SSO and SCIM `[VERIFY: which tier?]`

**H2: FAQ**

**What is account intelligence?**
It is a single, always-current view of everything your company knows about one customer — conversations, people, commitments and open issues — gathered automatically instead of typed in by hand.

**How is this different from my CRM?**
Your CRM holds what someone remembered to type in. Lynkk holds what was actually said, and fills your CRM in for you.

**Does it work for B2B accounts with lots of stakeholders?**
That is exactly the case it is built for. Multiple contacts, multiple colleagues from your side, conversations spread over months — all on one timeline.

**What happens when a rep leaves?**
The account keeps its memory. The next owner opens the page and has the full history.

**CTA:** Put your accounts on one page → *Book a 15-minute walkthrough*

---

### 3.2 — MEMORY

**URL:** `/products/memory`
**Meta title:** AI Meeting Notes That Remember Everything | Lynkk Memory *(56 chars)*
**Meta description:** Lynkk turns every meeting — online or in person — into searchable AI meeting notes that connect to each other. Ask a question, get the answer from any conversation. *(163 chars)*
**H1:** AI meeting notes that remember everything, not just today

> **SEO note:** this page deliberately does **not** target "ai memory" (2,900/mo). That SERP is semiconductor stock content — `ai memory stocks`, `ai memory etf`, `ai memory chip shortage`. Wrong audience entirely. We target `ai meeting notes` (1,000/mo, SD 38) and own "memory" as your product name, not your keyword.

**Hero**

> Notes are easy. Remembering is hard.
>
> Most AI note takers hand you a tidy summary and forget it the moment the call ends. Lynkk Memory connects every conversation to every other one — so three months later you can ask "what did they say about the migration?" and get a straight answer.

**CTA:** Start remembering → *(secondary: See how Memory works)*

---

**THE STORY** *(placeholder)*

> **"It was in a conversation from February. Nobody remembered having it."**
>
> A deal was stuck on pricing. [PLACEHOLDER NAME]'s team had been round the same argument for three weeks.
>
> [NAME] asked Lynkk one question: what has this customer told us about budget?
>
> Memory returned a moment from February — a different call, a different colleague, a throwaway line from the customer's finance lead about their budget being approved annually in Q1 and impossible to move mid-year.
>
> The team had been negotiating a discount. The real problem was timing. They restructured the start date instead of cutting the price.
>
> *[PLACEHOLDER: outcome, e.g. deal closed at full price]*
>
> That line had been said once, eight months earlier, to someone who had since moved teams. No person was going to remember it. Memory did.

---

**H2: The problem with notes that don't connect**

A summary per meeting looks useful. But your work doesn't happen one meeting at a time.

- The answer you need was in a call you weren't on.
- It was said in March. You're looking in October.
- You remember someone said something about it. You can't remember who.
- Searching twelve transcripts for one sentence is not searching. It's archaeology.

**H2: How Memory works**

**1. It captures everything.** Online calls through the meeting bot. In-person meetings straight from your phone — the kitchen-table meeting, the corridor chat, the conference stand. No laptop needed.

**2. It structures as it goes.** Within about 30 seconds of the end, you have notes, decisions, action items and the people involved. `[VERIFY timing claim]`

**3. It connects.** This is the part others skip. Every conversation is linked to the account, the people and the topics it touches. One meeting becomes part of a web, not a file in a folder.

**4. You just ask.** Plain English. "What did their CTO say about security?" "What have we promised this account?" "When did the migration first come up?" You get the answer, plus the exact moment it was said, so you can check it yourself.

**H2: Ask questions, not search queries**

Search gives you ten transcripts to read. Memory gives you the answer and shows its working.

Every answer links back to the moment in the conversation. You never have to take the AI's word for it.

**H2: Captures the meetings other tools miss**

*(Targets `ai note taker for in person meetings` — 480/mo, 100% paid competition, and most bot-based rivals genuinely cannot do it.)*

Bot-based note takers need a calendar invite and a video call. Real selling doesn't work like that. Site visits. Coffees. Trade shows. The corridor conversation after the formal meeting, where the actual objection comes out.

Lynkk records in person from your phone, and those conversations land in the same memory as everything else.

**H2: Prefer no bot in the room? You choose.**

*(Targets `ai meeting assistant without bot`, `bot free ai meeting assistant`, `ai meeting notes without recording`.)*

Some customers don't want a visible bot joining the call. Some teams don't want recordings kept at all. Lynkk lets you pick per meeting: bot or no bot, keep the recording or keep only the notes. `[VERIFY these options against the actual product]`

**H2: One account, everywhere**

Phone and web, synced in real time. Capture on your phone in a car park; search it from your laptop ten minutes later.

**H2: FAQ**

**Is this just another AI note taker?**
Note takers summarise one meeting. Memory connects every meeting, so you can ask questions across months of conversations and get one answer.

**Does it work for in-person meetings?**
Yes — record from your phone. In-person conversations go into the same memory as your video calls.

**Can I use it without recording the meeting?**
`[VERIFY]` You can choose what is kept. Options include keeping notes without keeping the recording.

**How far back can it remember?**
As far back as your history goes. Memory gets more useful over time, not less — that is the whole point.

**Do I need to tag or organise anything?**
No. Linking conversations to accounts, people and topics happens automatically.

**CTA:** Give your team a memory → *Try Lynkk free*

---

### 3.3 — CONVERSATIONAL ACTION

**URL:** `/products/conversational-action`
**Meta title:** AI Sales Assistant That Does the Admin After Every Call | Lynkk *(62 chars)*
**Meta description:** Lynkk's AI sales assistant turns conversations into finished work — action items assigned, CRM fields updated, tickets raised. No admin after calls. *(149 chars)*
**H1:** Your conversations become finished work, not a to-do list

> **Naming note:** "Conversational Action" is a strong internal product name but nobody searches it. Keep it as the product name on the page; let the H1 and URL carry the language buyers actually use. `agentic ai sales assistant` (140/mo, **SD 18**) is a notably easy win and is used as an H2 below.

**Hero**

> Most tools tell you what to do after a call. Lynkk does it.
>
> Action items assigned to real people with real dates. CRM fields filled in. Tickets raised. Follow-up emails drafted. Done while you're still saying goodbye.

**CTA:** Stop doing post-call admin → *(secondary: See what it automates)*

---

**THE STORY** *(placeholder)*

> **"I used to lose Friday afternoons."**
>
> [PLACEHOLDER NAME] runs [PLACEHOLDER: N] customer calls a week. The calls were never the problem. The hour afterwards was.
>
> Write the notes. Remember the three things promised. Update the CRM — or more honestly, don't, and tell yourself Friday is for catching up. Then Friday arrives and it's six days of half-remembered calls at once. Some commitments just quietly disappear.
>
> Now the call ends and the work is already done. The notes are written. The two things promised are tasks with owners and dates. The bug the customer mentioned is a Jira ticket. The CRM fields are filled in — from what was actually said, not from memory four days later.
>
> [NAME] checks it over. Takes a minute. Then goes to the next call.
>
> "My pipeline is accurate for the first time since I started. Not because I got disciplined — because I stopped having to be." — [PLACEHOLDER: name, title, company]
>
> *[PLACEHOLDER: time-saved metric]*

---

**H2: The admin tax nobody budgets for**

Every call generates work. Someone has to:

- write up what happened
- remember what was promised, and by whom
- update the CRM so the forecast means something
- raise the ticket for the bug the customer mentioned
- send the follow-up before the customer wonders if you listened

Do it properly and you lose an hour per call. Skip it and your CRM becomes fiction, commitments get dropped, and your forecast is a guess.

Most teams skip it. Not from laziness — from arithmetic.

**H2: What gets done automatically**

**Action items with owners and dates.** Not a list of bullet points. Real tasks, assigned to the person who agreed to them, with the date they agreed to.

**CRM fields, filled from the conversation.** Next steps, decision criteria, competitors mentioned, budget signals, qualification fields in your framework. `[VERIFY: does Lynkk support MEDDPICC / BANT / custom field mapping? Sybill's whole message is built on this — it needs a direct answer.]`

**Tickets in the tools you already run.** A bug mentioned becomes a Jira ticket with the customer's own words attached, so your engineers get the real context.

**Follow-up emails, drafted.** Built from what was actually agreed. You read, adjust, send.

**Commitments tracked until they close.** Both directions — what you promised them, and what they promised you. Open items don't evaporate.

**H2: Agentic, but on a short leash**

*(Targets `agentic ai sales assistant`, 140/mo, SD 18.)*

"Agentic AI" usually means software doing things without asking. That's a reasonable thing to be nervous about.

Lynkk works on a review-then-act basis. It prepares the whole job — tasks, fields, tickets, email — and shows you before anything is written to your systems. You approve, or edit, or bin it. As trust builds you can let specific routine actions run on their own. `[VERIFY this matches actual product behaviour]`

**H2: Your CRM finally reflects reality**

A CRM is only as good as the last person who remembered to update it. That's why forecasts drift.

When fields are filled from what was actually said on the call, the pipeline stops being a story people tell their manager and starts being a record of what happened.

**H2: FAQ**

**What does it update automatically?**
Action items, CRM fields, tickets in tools like Jira, and draft follow-up emails. You can review anything before it is written.

**Will it change my CRM without asking?**
No. Default behaviour is review first. You decide what runs automatically.

**How accurate are the action items?**
They are taken from what was said, and each one links back to the moment in the conversation so you can check it in a click.

**Does it work with my CRM?**
`[PLACEHOLDER: list supported CRMs]`

**CTA:** End the post-call admin → *See it on your own calls*

---

### 3.4 — LIVE COACHING (CE)

**URL:** `/products/live-coaching`
**Meta title:** AI Sales Coaching, Live in the Call — Not a Week Later | Lynkk *(61 chars)*
**Meta description:** Lynkk gives reps real-time sales coaching during the call: the answer, the proof point, the next question. Plus honest feedback after. *(135 chars)*
**H1:** AI sales coaching that arrives during the call, not a week later

> **Expectations note:** this page will not drive much traffic — `real time sales coaching` is 30/mo and `live ai sales coaching` is literally 0/mo. The category is not searched yet. Judge this page on **sales enablement and differentiation**, not sessions. The upside: difficulty on these terms is 4–5, so you can own the whole cluster now, before the category exists. **This is also your head-to-head page against Clari Copilot**, whose flagship is live in-call coaching.

**Hero**

> Coaching usually arrives on Thursday, about a call you lost on Monday.
>
> Lynkk coaches you while the call is still happening. The customer raises the objection — the answer is on your screen. They ask about the integration — the proof point is there. You don't have to say "let me get back to you."

**CTA:** Coach your team in the moment → *(secondary: Watch a live call)*

---

**THE STORY** *(placeholder)*

> **"The hardest question of my career, in week two."**
>
> [PLACEHOLDER NAME] had been selling for nine days. On a call with a prospect's technical lead, the question came: how do you handle [PLACEHOLDER: technical objection] compared with [COMPETITOR]?
>
> Nine days in, there is no good answer to that. There is "that's a great question, let me come back to you" — which, to a technical buyer, means you don't know your own product.
>
> The answer appeared on [NAME]'s screen. The real comparison, in two lines, with the proof point their own engineering team uses.
>
> [NAME] answered it properly. The call carried on.
>
> "My manager listened back afterwards and asked who told me that. Nobody told me. It was just there." — [PLACEHOLDER: name, title, company]
>
> *[PLACEHOLDER: ramp-time metric]*

---

**H2: Why coaching after the call is too late**

Call reviews are useful. They are also a week late.

By the time your manager has listened back, the deal has moved on, the objection has been fumbled, and the rep has repeated the same mistake in four more calls. Nobody can listen to every call, so most calls are never coached at all.

Reps don't need more feedback. They need help at the moment it is hard.

**H2: What live coaching looks like**

**Answers when the question lands.** Pricing, security, integrations, the awkward competitor comparison — the answer is on screen while the question is still in the air.

**Proof at the right moment.** The relevant case study, number or reference, surfaced when it is actually relevant, not hunted for afterwards.

**The next question to ask.** Gentle nudges towards what is still unqualified. The thing you'll wish you had asked.

**Objection handling that has worked before.** Drawn from how your best reps have handled the same objection. Not a generic script — your team's actual language.

**Live context from Memory.** It knows what this account has already said, so it never suggests a question they've answered twice. *(Powered by [Memory](/products/memory).)*

**H2: Ask for help out loud, mid-call**

You can ask Lynkk a question during the meeting and get an answer by voice. It pulls from past conversations and your documents. `[VERIFY: available in which meeting types?]`

**H2: Honest feedback after, too**

Live help gets you through the call. Review makes you better at the next one.

After every call: what went well, what was missed, which commitments were made. Every call reviewed — not the 5% a manager has time for.

For managers: patterns across the team. Who is strong on discovery and weak on pricing. Which objection is costing you deals across every rep. What your best reps do that the others don't. *(Add per-call scorecards if Lynkk supports them — `[VERIFY]`; Avoma and Gong both lead with scoring and buyers will compare.)*

**H2: This helps reps. It doesn't replace them.**

*(Targets `ai sales coaching augment vs replace` and `ai sales coaching job security` — both appear in Google autocomplete, and **no competitor is answering them**. Keep this section. It is the biggest unmet content gap in the whole category and it is the first thing a rep thinks when a manager rolls out call AI.)*

Here is the honest position.

Lynkk does not sell for you. It does not score you for your manager behind your back. It does not replace the judgement you build over years of difficult conversations.

It does the part that was never a test of skill: remembering the right fact at the right second. New reps get to sound like they've been there a year. Experienced reps stop losing deals to a number they couldn't recall.

Reps should be able to see their own feedback first. `[VERIFY: is that how Lynkk's permissions work? If yes, say it loudly — it is the single biggest driver of rep adoption, and competitor adoption friction is a documented weakness.]`

**H2: FAQ**

**What is AI sales coaching?**
Software that helps a rep improve their conversations — either live during the call, with answers and prompts on screen, or afterwards with feedback on what went well and what was missed.

**Does AI sales coaching actually improve performance?**
The honest answer: it depends on whether reps use it. Live help gets used because it solves a problem in the moment. Post-call scorecards often don't, because they feel like surveillance. Lynkk leads with the live help. *[PLACEHOLDER: add your own data when you have it — do not borrow anyone else's]*

**Will my manager see everything?**
`[VERIFY and answer plainly. This is the question every rep asks first.]`

**Does the customer know I'm being coached?**
The prompts are on your screen only. There is nothing for them to see or hear.

**Is this replacing sales training?**
No. Training teaches the skill. This helps in the moment the skill is needed.

**CTA:** Coach every call, not every tenth call → *Book a live demo*

---

### 3.5 — PERSONAL ASSISTANT

**URL:** `/products/personal-assistant`
**Meta title:** AI Meeting Assistant That Preps, Joins and Follows Up | Lynkk *(60 chars)*
**Meta description:** An AI powered meeting assistant that briefs you before, helps during and finishes the work after. Ask it anything about your meetings, by voice or text. *(152 chars)*
**H1:** An AI meeting assistant that works before, during and after

> **SEO note:** `ai meeting assistant` (4,400/mo) is SD 60 — a deliberate stretch target, not a quick win. The exact phrase `ai powered meeting assistant` shows **40,500/mo with paid competition of 0.01**, which is unusual enough that it may be inflated or spiking; it is included verbatim in the meta description and first paragraph because doing so costs nothing. Expect this page to rank slowest of the five. The long-tail terms are where it will start.

**Hero**

> Everyone's AI meeting assistant takes notes. Yours should do the whole job.
>
> Lynkk briefs you before the meeting, helps you during it, and finishes the work after. Ask it anything — by voice or by typing — and it answers from everything your team has ever discussed.

**CTA:** Meet your assistant → *(secondary: See a day with Lynkk)*

---

**THE STORY** *(placeholder)*

> **"Seven meetings. No prep time. No gaps."**
>
> [PLACEHOLDER NAME] has seven meetings on Tuesday. Back to back. There is no prep time, because there is never prep time.
>
> **8:50am.** Walking in, [NAME] reads a ninety-second brief on the phone: who's attending, what happened last time, two things still open from three weeks ago, one thing that changed since.
>
> **11:20am.** Mid-call, a question about last quarter's volumes. [NAME] asks out loud. The answer comes back by voice, from a conversation in August.
>
> **2:00pm.** A meeting [NAME] couldn't attend. Instead of a 50-minute recording, one question: what did they decide about the timeline? One answer.
>
> **5:30pm.** No admin backlog. It was done after each call.
>
> "I don't prepare for meetings any more. I just show up prepared." — [PLACEHOLDER: name, title, company]
>
> *[PLACEHOLDER: hours-saved metric]*

---

**H2: Note taking is the easy part**

There are dozens of AI note takers. Most do one thing: you have a meeting, you get a summary.

But the summary was never the hard part. The hard part is walking into a meeting already knowing where you left off. Getting a number you can't recall while the customer is waiting. Finding out what happened in the meeting you missed without watching an hour of video. Clearing the admin so it doesn't pile up until Friday.

That is an assistant. The rest is transcription.

**H2: Before the meeting — you arrive prepared**

A short brief, automatically, before every meeting: who's attending and what you know about them, what happened last time, what is still open, what changed. Ninety seconds on your phone on the way in.

**H2: During the meeting — help without leaving the conversation**

*(Targets `real time ai meeting assistant` (110) and `live ai meeting assistant` (170).)*

Ask out loud, mid-meeting, and get an answer by voice. It pulls from past conversations and your documents. No tabbing away. No "let me check and come back to you."

**H2: After the meeting — the work is already done**

Notes written. Action items assigned. CRM updated. Tickets raised. Follow-up drafted. You review rather than write. *(Powered by [Conversational Action](/products/conversational-action).)*

**H2: Catch up on meetings you missed**

Don't watch the recording. Ask the question. "What did they decide?" "Was my team's bit mentioned?" "What do I need to do?"

**H2: In the room or on a call — both work**

Video calls through the meeting bot. In-person meetings from your phone. Same assistant either way.

**H2: One assistant, your whole team's knowledge**

This is the part a personal note taker can't do. Your assistant answers from your organisation's conversations, not just the ones you were in. Someone else's call from June is available to you in October — within your permissions. `[VERIFY permission model]`

**H2: FAQ**

**What is an AI meeting assistant?**
A tool that helps with the whole meeting, not just the notes — preparing you beforehand, answering questions during, and finishing the follow-up work after.

**Which AI meeting assistant is best?**
Depends what you need. For tidy notes from one call, the simple note takers are fine and cheap. If you need meetings to connect to each other, to accounts, and to your CRM, you need something with memory. That is what Lynkk is built for. *(Add honest comparison pages here — see §4.)*

**Can I use it without a bot joining the meeting?**
`[VERIFY]` Options are available. This is a common requirement and worth answering plainly.

**Does it work for in-person meetings?**
Yes, recorded from your phone.

**Can it answer questions about meetings I wasn't in?**
Yes, within your access permissions.

**Can I ask it things by voice during a call?**
Yes — ask out loud and get an answer by voice.

**CTA:** Get an assistant, not a note taker → *Start free*

---

## 4. What to build next (ranked by impact for effort)

**1. A platform hub page — highest single opportunity.**
`revenue intelligence platform` (1,300/mo, SD 33, CPC $36.99) and `ai powered revenue intelligence platform` (390/mo, **SD 6**) have no home on your site. Build `/platform`, target both, link all five products from it. The SD 6 term in particular is close to free traffic.

**2. Comparison pages — your biggest competitive gap.**
Sybill and Avoma rank on each other's brand names with large comparison libraries. You have none. Buyers at the decision stage search these, and difficulty is low:

| Page | Supporting keywords | Vol | SD |
|---|---|---|---|
| Lynkk vs Gong | `gong conversation intelligence`, `gong revenue intelligence platform` | 210 + 210 | 36 / **27** |
| Lynkk vs Fireflies | `fireflies ai note taker`, `fireflies ai meeting notes` | 4,400 + 140 | 63 / 44 |
| Lynkk vs Otter | `otter ai note taker`, `otter ai meeting notes` | 5,400 + 720 | 57 / 68 |
| Lynkk vs Fathom | `fathom ai note taker` | 5,400 | 45 |
| Lynkk vs Granola | `granola ai note taker` | 1,300 | **30** |
| Lynkk vs Avoma / Clari Copilot | `clari revenue intelligence`, `salesloft conversation intelligence` | 30 + 30 | 36 / **20** |

Write them honestly — say where the competitor is genuinely better. Buyers can tell, and the dishonest ones don't convert.

**3. Own the bot-free question cluster.**
`ai meeting assistant without bot`, `bot free ai meeting assistant`, `ai meeting notes without recording`, `ai sales coaching software no meeting bots`. Granola built a brand here. You can answer it better because you offer the choice rather than one dogma.

**4. Answer the questions the category is avoiding.**
`ai sales coaching augment vs replace` and `ai sales coaching job security`. Nobody is writing for these. They are exactly what a rep thinks when call AI is rolled out, and exactly what blocks adoption. One strong post could own the topic and help your own deals close.

**5. Integration landing pages.**
Real, specific demand: `microsoft teams ai note taker` (590), `google meet ai note taker` (590), `ai note taker for zoom` (480), `teams ai meeting notes` (390), `ai note taker for microsoft teams` (110, **SD 26**). You already rank #39 for `zoom meeting bot` on `/features/meeting-bot` — that page is proof the structure works and is worth expanding into one page per platform.

**6. Fix the easiest existing win.**
You rank position 39 for `zoom meeting bot`. Position 39 is page four — invisible. One focused pass on that page is the cheapest ranking improvement available to you.

**7. A visible trust page.**
SOC 2 → GDPR → HIPAA/SSO/SCIM, plus a clear statement on training data and data region. Competitor weaknesses here are documented and current. If Lynkk doesn't train on customer conversations, that sentence belongs on every product page, not buried in a footer.

---

## 5. Before this goes live — checklist

**Must verify (I have marked each in the copy):**
- [ ] Every `[PLACEHOLDER]` replaced with a real figure, name or quote — or the sentence cut. **Do not publish invented customer results or statistics.**
- [ ] Every `[VERIFY]` claim confirmed with engineering: 30-second turnaround, no-bot options, MEDDPICC/BANT field support, voice Q&A availability, permission model, review-before-write behaviour, SOC 2 / GDPR / data region / training-data policy, call scoring.
- [ ] "CE" confirmed or dropped from public copy.
- [ ] "Account" confirmed as a product, not the login area.
- [ ] Competitor claims checked against competitors' live pages — my competitor research came from third-party and competitor-authored sources, several with obvious bias.

**Recommended:**
- [ ] One primary keyword per page, as mapped in §2 — don't let two pages chase the same term.
- [ ] Internal links between products, as marked in the copy (Accounts ↔ Memory ↔ Conversational Action ↔ Live Coaching ↔ Personal Assistant). Five connected pages beat five islands, especially at DA 1.
- [ ] FAQ marked up with FAQPage schema — the questions are taken verbatim from Google autocomplete, which is what earns AI Overview and snippet placement.
- [ ] Set realistic expectations internally: at DA 1 with 3 referring domains, the long-tail pages can move within 2–3 months; `ai meeting assistant` and `conversation intelligence` are 12-month targets and need links, not just copy.

---

## 6. Sources

Keyword and domain data: Ubersuggest MCP (`marketing@lynkk.ai`, tier 1) — `domain_overview`, `match_keywords`, `google_suggestions`, `content_ideas`, `competitors`, US location 2840, October 2026. Competitor organic data was unavailable for lynkk.ai because the domain has insufficient ranking history.

Product and competitor context (secondhand — verify before public use):
- [Lynkk](https://lynkk.ai/) · [Lynkk blog: Teams AI note takers](https://lynkk.ai/blog/ai-note-taker-microsoft-teams)
- [Avoma: Clari vs Gong](https://www.avoma.com/blog/clari-vs-gong) · [Avoma: best conversation intelligence software](https://www.avoma.com/blog/best-conversation-intelligence-software)
- [Clari Copilot vs Gong](https://theaiagentindex.com/compare/clari-copilot-vs-gong) · [Allego: top conversation intelligence software](https://www.allego.com/blog/top-conversation-intelligence-software/)
- [Sybill vs Avoma](https://www.sybill.ai/blogs/sybill-vs-avoma) · [ZoomInfo: Avoma alternatives](https://pipeline.zoominfo.com/sales/avoma-alternatives)
- [Trust and Security at Gong](https://www.gong.io/platform/trust) · [Circleback: notetaker security](https://circleback.ai/blog/ai-meeting-notetaker-security) · [SOC 2 compliant notetakers](https://meetingnotes.com/blog/soc-2-ai-meeting-notetaker)
- [Variant-01: Lynkk case study](https://variant-01.com/casestudies/lynkk) · [HubSpot conversation intelligence](https://www.hubspot.com/products/conversation-intelligence)
