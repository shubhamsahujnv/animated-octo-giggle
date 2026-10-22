# Lynkk website content — client delivery

Five pages, one file each. Copy is final and ready to implement.

| File | Page | URL | Primary keyword | Vol / Difficulty |
|---|---|---|---|---|
| `01-homepage.md` | Homepage | `/` | conversation intelligence software for sales teams | 30 / 38 |
| `02-account-memory.md` | Account Memory | `/product/account-memory` | account intelligence software | 10 / 20 |
| `03-conversation-to-action.md` | Conversation to Action | `/product/conversation-to-action` | agentic ai sales assistant | 140 / 18 |
| `04-cue-live-coaching.md` | CUE Live Coaching | `/product/cue` | real time sales coaching software | 20 / 5 |
| `05-personal-assistant.md` | Personal Assistant | `/product/personal-assistant` | real time ai meeting assistant | 110 / 59 |

Keyword data: Ubersuggest, United States, October 2026.

---

## How to use these files

Each file contains, in order: the page's SEO header (URL, keywords, meta title, meta description), then the copy section by section in page order, then a short build-notes block at the end listing open items and technical requirements.

Section headings in the files (`## Hero`, `## Definition`, `## FAQ`) are labels for the build, not copy. The copy is everything under them. Bold lines in caps are eyebrow labels that sit above the headline.

---

## Two things before anything goes live

**1. Items marked `[TO CONFIRM]` need an answer from the product team.** They are mostly in three areas: which CRMs are supported, the security and training-data position, and whether the no-bot option exists. Each is listed in the build notes of the page it affects.

**2. Items in square brackets inside the customer stories — `[NAME]`, `[TITLE]`, `[COMPANY]` — need a real reference or the story should be removed.** The stories are written as structure with the specifics left blank on purpose. Publishing an invented customer quote or result is a real risk, so none has been written.

---

## Technical requirements

Applies across all five pages:

- One H1 per page. The primary keyword appears in the URL, meta title, the first 100 words, and one H2.
- Meta titles under 60 characters, descriptions 150–158 characters.
- Image alt text is specified inline wherever an image appears.
- Internal links use the keyword anchor text given, not "learn more" or "click here".
- Schema: `Organization` and `WebSite` on the homepage; `SoftwareApplication`, `FAQPage` and `BreadcrumbList` on each product page; `Product` and `Offer` on the homepage pricing block.
- `FAQPage` markup matters more than usual here: AI Overviews appear on four of the five target search results pages, and the FAQ answers are written at the length those features pull.

**Two fixes on the current build:**

- `og:url` points at the staging domain. Change it to the production URL before launch, or every social share will expose the staging site.
- Add `og:image` (1200×630) and a self-referencing canonical tag to all five pages. Keep the staging domain set to `noindex`.

---

## What these pages will and won't do

The product pages target keywords they can realistically win at the domain's current authority — difficulty 5 to 38. Terms in the 50–60 difficulty band (`conversation intelligence platform`, `ai meeting assistant`) are not primary targets on any page, because the sites ranking for them have 30 to 90 times this domain's authority.

Those head terms are reachable, but through supporting content rather than product pages: the search results for them are held by listicles and definition guides, not product pages, and sites with domain authority as low as 10 rank there. The separate SEO plan covers which guides to write and in what order. `gong competitors` is the strongest single opportunity — 320 searches a month at difficulty 14.
