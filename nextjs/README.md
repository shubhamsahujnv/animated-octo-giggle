# Pixorama service pages — Next.js implementation

App Router components for the five service pages drafted in `../service-pages/`.
Typechecked against Next.js 15.0.3 / React 18.3.1 / TypeScript 5.6.3 (`tsc --noEmit`, clean).

## File tree

```
app/
  services/page.tsx              Hub page listing the five (replaces the current orphan route)
  services/[slug]/page.tsx       The service route: metadata, canonical, JSON-LD
  api/enquiry/route.ts           Form endpoint — STUB, must be wired before launch
components/services/
  ServicePage.tsx                Page layout in the strategy's prescribed order
  ServiceFaq.tsx                 FAQ using the site's existing faq__* / <details> markup
  ServiceEnquiryForm.tsx         Client component: per-page attribution, UTMs, GA4 event
  PendingSlot.tsx                Renders a proof slot, or nothing
  JsonLd.tsx                     JSON-LD injector
  gtag.d.ts                      window.gtag declaration
lib/services/
  types.ts                       Content model + build-time guards
  organization.ts                Shared Organization @id, engagement models
  index.ts                       Registry, lookup, related-service resolution
  content/*.ts                   One file per page — all copy lives here:
                                   cloud-engineering-services.ts
                                   ai-development-services.ts
                                   mobile-app-development.ts
                                   product-software-engineering.ts
                                   web-development-services.ts
styles/services.css              New `svc` block only
```

Drop `app/`, `components/` and `lib/` into the existing project root, import the
stylesheet, and the routes exist. The `@/*` path alias is assumed — it is the
Next.js default and the components use it throughout.

## How it is put together, and why

**Copy is data, not JSX.** All five pages share one layout component and differ
only by a typed content object. Editing copy means editing `lib/services/content/`,
which a non-developer can review in one place, and the layout cannot drift
between pages.

**Unconfirmed proof cannot render.** Every proof point — case study, named
expert, price band, above-the-fold proof line — is a `Slot`, which is either
`confirmed` or `pending`. A pending slot renders `null` in production and a loud
dashed marker in development. This is the strategy's rule ("no unconfirmed
client logos, numbers or certifications") made mechanical: a page can ship with
a proof slot removed, never with one invented. **All 20 proof slots are
currently pending** — 4 on each of the 5 pages — so today these pages render
their fallback lines and no proof. Filling them is the client-question work in
`../pixorama-service-page-plan.md` §8.

**The page rules are enforced at build time.** `assertServiceContent` runs on
every entry as the registry is constructed, so a violation fails the build
rather than reaching review. It checks:

| Rule | Check |
|---|---|
| Opening answer is 40–60 words | word count |
| The slug is the slugified `keywordPhrase` | derived comparison |
| Title and H1 open with the `keywordPhrase` | normalised prefix match (`&` ≡ `and`) |
| Meta description under 160 characters | length |
| `lastUpdated` is a real ISO date | format |
| A page does not link to itself as "related" | membership |
| A confirmed case study carries at least one metric | array length |

The registry adds one check `assertServiceContent` cannot do alone: every
`relatedServices` slug must resolve to a registered service. Without it a typo
or a renamed slug silently drops the link, because `relatedServices()` filters
what it cannot resolve.

Verified: all five pass; **eight** seeded violations are each rejected with a
specific message, and a deliberately broken related-slug fails at import.

### Slug wording vs nav wording

Three of the five capability names carry almost no search demand, so the model
keeps two separate fields:

| Field | Used for | Example |
|---|---|---|
| `keywordPhrase` | slug, title, H1, `Service.name` | "Web Development Services" |
| `navLabel` | nav, footer, CTAs, breadcrumb, related lists | "Digital Growth & Web" |

The build asserts the slug is the slugified `keywordPhrase` and that the title
and H1 open with it, so a URL and its heading cannot drift apart. Buyers get the
wording they search for; Pixorama keeps its own brand language on screen.

| Slug | Nav label |
|---|---|
| `/services/cloud-engineering-services` | Cloud & Platform Engineering |
| `/services/ai-development-services` | AI & Data Intelligence |
| `/services/mobile-app-development` | Mobile App Development |
| `/services/product-software-engineering` | Product & Software Engineering |
| `/services/web-development-services` | Digital Growth & Web |

**Styling reuses what exists.** The site is hand-written BEM — `wrap`,
`section`, `head`, `eyebrow`, `lead`, `h2`, `gt`, `btn`, `btn--brand`, `arw`,
`reveal`, `field`, `form__row`, `form__foot`, `req`, `faq__*`, `engcard`. The
components use those directly, so the pages inherit current styles and theming.
`styles/services.css` adds only the new `svc` block and references existing CSS
variables with fallbacks rather than introducing colours. If a variable name
there does not match the real stylesheet, map it rather than hardcoding a value.

**The FAQ needs no JavaScript.** It reuses the homepage's native
`<details>`/`<summary>` pattern.

## Lead attribution — the part that makes the pages measurable

`ServiceEnquiryForm` submits, with every enquiry:

- `service` — the page slug, so leads are attributable per page rather than to
  the site as a whole. This is the number the strategy reports on.
- `pageUrl` and `referrer`.
- `utm_*` — read on first landing and persisted in `sessionStorage` for the
  session, because visitors rarely convert on the page they arrived on. Every
  storage access is wrapped; the form works with storage blocked.
- `heardAbout` — including an explicit **"AI assistant (ChatGPT, Claude,
  Perplexity etc.)"** option. Most assistant-driven visits arrive as `direct`,
  so without this the AI channel is invisible however the analytics are set up.

On success it fires GA4 `generate_lead` with `service` as a parameter.

The server route validates required fields, checks the email shape, and rejects
a `service` value that is not a registered slug, so the attribution field cannot
write arbitrary values into a lead record.

## Before launch

1. **Wire `app/api/enquiry/route.ts`.** It currently logs in development and
   returns **501 in production** — deliberately, so a half-wired form cannot look
   successful to a real visitor. Point it at whatever already handles
   `/#contact` submissions rather than adding a second path.
2. **Confirm `G-1DT0WH31GK` is Pixorama's own GA4 property** before trusting any
   event.
3. **Track WhatsApp enquiries.** The site routes enquiries through WhatsApp and
   email too. Untracked, those leads cannot be attributed and these pages will
   look like they are failing when they are not.
4. **Add the five routes to `sitemap.xml`**, plus `/services`.
5. **Point the footer's "Capabilities" column at the five pages.** All five
   entries currently link to `#capabilities` — five links to one anchor.
6. **Point the nav's "Services" item at `/services`** instead of `/#capabilities`.
7. ~~Decide the slug question.~~ **Done** — slugs use buyer wording, nav keeps
   brand wording (see above). No redirects needed, since none of these pages has
   been published. If any slug changes after launch it needs a 301, and it resets
   the page age that is the main asset these pages accumulate.
8. **Move the five `Service` entries off the homepage `OfferCatalog`** — they now
   live on the pages they describe. Leave `Organization` and `WebSite` on the
   homepage; the service pages reference `Organization` by `@id`.
9. **Remove the migrated FAQ questions from the homepage.** Nine questions were
   split across these pages by topic; duplicate `FAQPage` markup competes with
   itself.
10. **`/about` and `/contact`** are still orphan routes serving homepage content
    under a homepage canonical. Build them out or remove them. (`/process` 404s
    but is linked from nowhere — no action needed.)

## What these pages are not

They are not ranking bets. Zero keywords cleared Gates 1–4: Pixorama has 31
referring domains against a gate threshold of 62, and the weakest competitor in
every SERP tested has 168–711. These pages exist to convert traffic that already
arrives, to give AI assistants something per-service to cite, to put real URLs
behind the `Service` schema, and to be aged and ready when authority arrives.

Judge them on qualified leads per page at **day 120**, and do not prune before
**day 180** — the bottom authority band in the strategy's timeline. The lead path
for the next two to three quarters is the Step 5b plan, not these pages.
