# Which source wins: staging vs live

**The two sites disagree on eight product facts.** This file says which I used and why, and lists the three that need your ruling.

- **Staging** — `lynkk-revenue-story.imsjwagh99.chatgpt.site`, re-crawled 22 Oct 2026. Byte-for-byte identical content to my 21 Oct crawl; nothing has changed.
- **Live** — `lynkk.ai`, verified 22 Oct 2026 by string match across six pages.

---

## What I did

**Structure, narrative, voice and the four-product line-up: from staging.** That's what staging is good for, and it's the brief — four products, each with its own page. The homepage H1 from staging also shipped live verbatim, so the positioning is settled.

**Every product fact: from the live site.** Staging is a design mock, and its pricing table and feature list are stale or aspirational. Publishing them would mean advertising a CRM sync that doesn't exist, the wrong price, and a privacy promise the product deliberately doesn't make.

---

## The eight disagreements

| # | Staging says | Live says | Used |
|---|---|---|---|
| 1 | Step 04 is **"Update CRM"**; "CRM sync" listed as a Pro feature | **"No CRM sync yet. Copy any brief into Salesforce or HubSpot."** Step 04 is **"Hand off"** — Jira, Slack, copy to CRM | **Live** |
| 2 | Free = **5 meetings per month** | Free = **unlimited notes, up to 2 hours each**, plus your first **5 hours of AI summaries** (lifetime, not monthly) | **Live** |
| 3 | Pro = **$19 / month** | Pro = **$15 / month**, or $117 a year | **Staging — confirmed by the client 22 Oct** |
| 4 | **Team, $39 / seat, "coming soon"** | **Enterprise, custom price**, up to 10 seats — and shipped | **Live** |
| 5 | CUE "is a **private assistant visible to you**" | Cue is **"never hidden from screen shares or recordings"** — deliberately so | **Live** |
| 6 | In-person via **"mobile recording"** and phone | **The Mac app and the browser** record in the room | **Live** |
| 7 | **15+ languages** | **17 languages**, plus Hinglish and auto-detect | **Live** |
| 8 | CUE presented as a full product | **Cue is beta, on Pro, Mac app, by invite** | **Live** |

Numbers 1, 3 and 5 are the ones that would have caused real problems: a feature that doesn't exist, a price that's wrong by $4, and a privacy claim that's the opposite of the truth.

---

## Three things only you can rule on

**1. ~~Is staging the next redesign, or a parked concept?~~ ANSWERED 22 Oct: staging is the next redesign.**
So the four product pages are the plan. This has a structural consequence the content alone doesn't cover — staging is one page, the live site is thirty-plus URLs, and staging's structure drops two live pages worth keeping. See `07-redesign-migration-plan.md`.

**2. Is CRM sync on the roadmap?**
Staging treats it as shipped; live says not yet. If it's close, the copy can say "coming soon" rather than going silent — but it cannot say it works. Right now every page says what live says.

**3. Which pricing is current?**
**Answered 22 Oct: $19 is correct.** All files now say $19. The yearly price is removed rather than guessed — live offers $117/year against $15/month, which doesn't carry over to $19. Add a yearly figure if there is one.

**Two parts of staging's pricing table are still unconfirmed, and I have not followed staging on either:**

| | Staging | Live, shipped | What the files say |
|---|---|---|---|
| Free | 5 meetings per month | Unlimited notes up to 2 hours each, plus first 5 hours of AI summaries | **Live** |
| Third tier | Team, $39/seat, "coming soon" | Enterprise, custom, up to 10 seats, shipped | **Live** |

My reasoning: staging predates the Workspaces launch, so its "coming soon" tier is stale. And cutting a shipped free tier from unlimited notes down to 5 meetings a month is a takeaway from people already using it — not something to publish on my assumption. If the whole staging table is the new pricing and not just the Pro price, say so and I'll switch both.

---

## Naming

Staging uses **CUE** (capitals); live uses **Cue**. I've used **Cue**, matching live. Pick one and use it everywhere — it appears in the announcement bar, the product nav and the FAQ.

Staging calls the fourth product **Personal assistant**. Live calls the underlying feature **Ask Lynkk** and, in the footer, **Conversational brain** — three names for one thing. I've kept **Personal Assistant** as the page name (staging's IA) and **Ask Lynkk** as the product name inside it, which is how live uses it on the homepage. Still worth consolidating.
