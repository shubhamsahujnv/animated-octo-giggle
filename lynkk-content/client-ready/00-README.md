# Lynkk website copy

Homepage and four product pages, ready to build.

| File | Page | URL |
|---|---|---|
| `01-homepage.md` | Homepage | `/` |
| `02-account-memory.md` | Account Memory | `/product/account-memory` |
| `03-conversation-to-action.md` | Conversation to Action | `/product/conversation-to-action` |
| `04-cue-live-coaching.md` | Cue Live Coaching | `/product/cue` |
| `05-personal-assistant.md` | Personal Assistant | `/product/personal-assistant` |

---

## How to read a file

Each file has the page's URL and meta tags at the top, then the copy section by section in page order, then a short build note at the end.

- `## Section headings` are labels for the build, not copy.
- **BOLD CAPS LINES** are eyebrow labels that sit above the headline.
- *Image alt:* lines are the alt text for that section's image.
- Anything in square brackets needs filling in before launch.

---

## To supply before launch

**Customer stories.** Each product page opens with a scenario written in the second person and labelled illustrative. No customer names, titles or quotes are used, so nothing needs filling in and no testimonial has been invented. If real references become available later, these sections are the natural place for them.

**CRM list.** Several places say "your CRM" without naming which. Buyers assume exclusion when a tool isn't listed.

**Four answers for the Cue page.** Windows support, whether a manager can see a rep's Cue history, language coverage during beta, and the invite request link.

**Yearly price for Pro**, if there is one. Pro is $19 a month throughout.

---

## Three decisions still open

**Is CRM sync on the roadmap?** The copy says what's true today: no sync, briefs copy into Salesforce or HubSpot, action items go to Jira. If sync is close, the pages can say "coming soon" instead.

**The Free plan and third tier.** The copy describes them as currently shipped: Free is unlimited notes up to two hours each plus the first five hours of AI summaries, and the third tier is Enterprise. The staging design showed Free at five meetings a month and a Team tier at $39 a seat marked coming soon. Confirm which is launching.

**Product naming.** Two to settle: **Cue** or **CUE** (the copy uses Cue), and what to call the assistant, which is currently "Ask Lynkk" in the app, "Ask your meetings" in the URL and "Conversational brain" in the footer.

---

## Technical requirements

- One H1 per page. Meta titles are under 60 characters, descriptions 150 to 158.
- Schema: `Organization` and `WebSite` on the homepage; `SoftwareApplication`, `FAQPage` and `BreadcrumbList` on each product page; `Product` and `Offer` on the homepage pricing block.
- `FAQPage` markup matters on all five pages: the FAQ answers are written at the length search engines pull for featured answers.
- Each product page links to the other three. Links are listed at the foot of each file.
- Set `og:url` to the production URL, add `og:image` at 1200×630, and add a self-referencing canonical tag to every page.
- Keep any staging domain set to `noindex`.
