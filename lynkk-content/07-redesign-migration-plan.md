# Redesign migration plan

**Decision recorded 22 Oct 2026: staging is the next redesign.** So the four product pages in this folder are the plan.

That settles the content question and opens a structural one. This file covers it.

---

## 1. The problem in one line

**Staging is a single page. The live site is thirty-plus URLs.**

If staging ships as-built, you don't launch a redesign — you delete a site.

Here's what exists live today and has no home in staging's structure:

| Live | Count | In staging? |
|---|---|---|
| `/features/meeting-notes`, `/features/ask-your-meetings`, `/features/workspaces` | 3 | **No** — no product URLs at all |
| `/compare/` — otter, fireflies, granola, fathom, read-ai, notta, circleback, meetgeek, plaud, gong, avoma, clari-copilot | 12 | **No** |
| `/use-cases/` — sales calls, user interviews, standups, field interviews, lectures, customer research, lawyers, 1:1s, real estate agents, financial advisors | 10 | "Solutions" in the nav, no pages behind it |
| `/security`, `/pricing`, `/integrations`, `/how-it-works`, `/faq`, `/blog`, `/slack`, `/demo`, `/support` | 9 | Partly — nav links exist, pages don't |

**The good news: you're doing this at the right time.** The last domain data I have for lynkk.ai is Domain Authority 1 with a single ranking keyword, so there are almost no rankings to lose. A redesign like this on an established site would be a serious event; here it's mostly a planning exercise. *(I couldn't re-check today's figures — Ubersuggest's daily report quota is spent. I'll confirm when it resets, but it won't change the recommendation.)*

What you would lose isn't rankings. It's **well-built pages and the keyword coverage they were designed for** — and that's worth protecting deliberately rather than by accident.

---

## 2. Two live pages the staging structure drops, and shouldn't

### `/features/meeting-notes` — keep it

This is the best-optimised page on the live site. H1: *"The AI note taker that writes your meeting notes when the call ends."* The format — the page *is* a Lynkk note, with margin notes explaining what Lynkk did — is genuinely original.

It also targets the biggest term in the category: **`ai note taker`, 27,100 searches a month**. Not winnable today, but it's the term the whole market funnels through, and the long-tail around it (`ai note taker for in person meetings` at 480/mo with 100% paid competition, `ai note taker for zoom` at 480, `teams ai note taker` at 590) is reachable.

None of staging's four products covers it. "Conversation to Action" is about what happens *after* the note. Account Memory is about what happens *across* notes. The note itself — the thing most people actually search for — has no page in the new structure.

**Keep the URL and the page. Add it to the Product nav as a fifth item.**

### `/features/workspaces` — keep it

Workspaces is a shipped, paid, billable tier. It has its own page, its own buying argument, and its own audience (the admin, not the rep). Staging's four products have no equivalent and nothing absorbs it.

**Keep the URL and the page.** It's the only page that sells the team upgrade.

---

## 3. Recommended structure

Staging's four products, plus the two above:

```
/                                    Homepage — the staging one-pager
/product/account-memory              NEW — 02-account-memory.md
/product/conversation-to-action      NEW — 03-conversation-to-action.md
/product/cue                         NEW — 04-cue-live-coaching.md
/product/personal-assistant          NEW — 05-personal-assistant.md
/features/meeting-notes              KEEP — live page, amendments in 06
/features/workspaces                 KEEP — live page, amendments in 06
/pricing  /security  /integrations  /how-it-works  /faq  /blog  /slack  /demo  /support   KEEP
/compare/*   × 12                    KEEP — untouched
/use-cases/* × 10                    KEEP — wire to staging's "Solutions" nav item
```

**The homepage carries the four product sections as teasers**, each linking to its page. Staging's own nav already implies this — it has a Product dropdown with the four items and their tag lines. Right now those links go nowhere.

---

## 4. Redirect map

One real redirect, the rest are additions:

| From | To | Type |
|---|---|---|
| `/features/ask-your-meetings` | `/product/personal-assistant` | **301** |
| `/features/meeting-notes` | — | keep, no redirect |
| `/features/workspaces` | — | keep, no redirect |
| everything else | — | keep, no redirect |

`/features/ask-your-meetings` is the only live page the new structure genuinely replaces: Ask Lynkk is what staging calls Personal Assistant. 301 it and move its content — the Acme renewal walkthrough on that page is the best product storytelling on the site and must survive the move. It's in `05-personal-assistant.md` as the Sources section, but the live version is longer and better; bring it across in full.

---

## 5. Staging's own structure needs two fixes before build

**1. The nav and footer disagree about what the products are.**

- Nav: Account Memory · Conversation to Action · CUE live coaching · Personal assistant *(4)*
- Footer: Account Memory · Call capture · Follow-ups & CRM · CUE live coaching · Personal assistant *(5)*

"Call capture" and "Follow-ups & CRM" are in the footer but not the nav, and both are really parts of Conversation to Action. Also "Follow-ups & **CRM**" needs renaming — there's no CRM sync.

Settle on five items: the four products plus Meeting Notes.

**2. Four nav links have no pages.** Solutions, Integrations, Pricing, Resources. All four exist live — wire them to the live URLs rather than rebuilding.

---

## 6. Build order

1. **Homepage** (`01-homepage.md`) — biggest change, and it's where the four product links come from.
2. **The four product pages** (`02`–`05`). Nothing links to them until they exist, so they can go up alongside or just after.
3. **The one 301**, on the day the Personal Assistant page goes live. Not before — a redirect to a 404 is worse than no redirect.
4. **Nav and footer**, reconciled per §5.
5. **Amendments to the two kept pages** (`06-live-page-amendments.md`) — no rush, they work as they are.
6. **Submit a fresh sitemap** in Search Console once the new URLs are live.

---

## 7. Three things to get right at launch

**Don't let the new pages launch as orphans.** Each product page should be reachable from the nav, the homepage section, the footer, and the other three product pages. Internal links are specified at the foot of each file. Five connected pages beat five islands, and at Domain Authority 1 internal linking is one of the few signals fully under your control.

**Keep the staging domain `noindex`.** If `lynkk-revenue-story.imsjwagh99.chatgpt.site` gets indexed it competes with production for your own terms, and it's currently a full copy of your homepage.

**Fix `og:url` before launch.** On staging it points at the staging domain. Shipping that means every social share of your new homepage exposes the staging URL.

---

## 8. What I still need from you

From `SOURCE-CONFLICTS.md`, two of the three questions are still open:

- **Is CRM sync on the roadmap?** Staging's footer says "Follow-ups & CRM" and its pricing table lists CRM sync. Live says no. If it's close, the copy can say "coming soon"; if it isn't, that footer label needs renaming.
- **Which price is current, $15 or $19?** Every file says $15, from the live pricing page. Staging says $19. If $19 is the planned launch price, tell me and I'll change all five files.
