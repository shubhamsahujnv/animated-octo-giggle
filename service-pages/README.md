# Pixorama — Service Page Drafts

Five drafts, one per real capability, built to Section 4 of the Service Page Strategy for Leads (v1.1).

| File | Slug | Status |
|---|---|---|
| `01-cloud-platform-engineering.md` | `/services/cloud-platform-engineering` | Ready to implement, proof slots open |
| `02-ai-data-intelligence.md` | `/services/ai-data-intelligence` | Ready to implement, proof slots open |
| `03-mobile-app-development.md` | `/services/mobile-app-development` | Ready to implement, **no client reference exists** |
| `04-product-software-engineering.md` | `/services/product-software-engineering` | Ready to implement, proof slots open |
| `05-digital-growth-web.md` | `/services/digital-growth-web` | Ready to implement, proof slots open |

## Read this before implementing

**These are not ranking bets.** Per the gate analysis in `../pixorama-service-page-plan.md`, zero
keywords cleared Gates 1–4 — Pixorama has 31 referring domains against a gate threshold of 62, and
the weakest competitor in every SERP tested has 168–711. These pages exist to convert the traffic
that already arrives, to give AI assistants something per-service to cite, to put real URLs behind
the `Service` schema, and to be aged and ready when authority arrives. Judge them on qualified
leads at day 120, and do not prune before day 180.

**Every claim in these drafts is traceable to Pixorama's own site** — the homepage FAQ, the
capability sections, and the delivery models. Nothing is invented.

**`[CONFIRM: …]` marks a slot that must not ship unfilled.** These are the proof points — case study
numbers, named experts, pricing bands. The strategy forbids unconfirmed numbers, logos and
certifications, so each is marked rather than guessed. A page can ship with the slot *removed*; it
must never ship with the slot *invented*.

Note in particular: the site claims **SOC 2 and ISO 27001 *readiness*** — a way of building, not a
held certification. The drafts keep that wording exactly. Do not upgrade it to "certified" or
"compliant".

## Do these first (blockers)

From the audit — these break the pages regardless of copy quality:

1. `/services`, `/about` and `/contact` currently serve homepage content and canonicalise to
   `https://pixoramagroup.com`. Each new page needs its **own self-referencing canonical**.
2. Add all five pages to `sitemap.xml`.
3. Move the five `Service` entries out of the homepage `OfferCatalog` onto the pages they describe.
   Leave `Organization` and `WebSite` on the homepage.
4. Split the homepage's 9-question `FAQPage` across these pages by topic. A question should live on
   one page only — duplicate `FAQPage` markup across pages competes with itself.
5. Fix or remove the `/process` nav and footer link (currently 404).
6. Fix the "Continents of active delivery" counter rendering a literal `0`.

## Shared components

### Form (every page)

Fields: **Name · Work email · Company · What you need**. Phone only if Pixorama calls leads back.

Hidden fields captured on every submission:

| Field | Value |
|---|---|
| `page_url` | Full URL of the submitting page |
| `referrer` | `document.referrer` |
| `utm_source` / `utm_medium` / `utm_campaign` | From query string, persisted across the session |
| `service` | The page's service name — so leads are attributable per page |

Visible final field: **"How did you hear about us?"** with options including **"AI assistant
(ChatGPT, Claude, Perplexity etc.)"**. Most AI-driven visits arrive as `direct`, so without this the
AI channel is invisible.

### Tracking

- Confirm `G-1DT0WH31GK` is Pixorama's own GA4 property. `[CONFIRM: GA4 property ownership]`
- `generate_lead` event on form submit, tested end to end with a submission the client confirms receiving.
- GA4 channel group for `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`.
- **WhatsApp enquiries must be tracked.** The site routes enquiries through WhatsApp and email as
  well as the form; untracked, those leads cannot be attributed to a page and the pages will look
  like they are failing.

### Organization schema (shared, stays on homepage)

Referenced by `@id` from each page's `Service` block, so it is declared once:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://pixoramagroup.com/#organization",
  "name": "Pixorama",
  "url": "https://pixoramagroup.com",
  "foundingDate": "2022",
  "description": "Engineering-led software company building cloud platforms, AI and data products, mobile apps and security-hardened systems for enterprises and funded startups.",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "url": "https://pixoramagroup.com/contact"
  }
}
```

### CTA wording

Keep the existing wording — it is already good and consistent:
primary **"Book a discovery call"**, mid-page **"Talk to us about {Service}"**, closing **"Let's talk"**,
form button **"Send enquiry"**.

### Internal linking rule

Each page links to its **matching** capability, 2–3 related service pages, and its supporting blog
posts. Every page links to at least one other service page, so the five form a cluster rather than
five dead ends.

---

## Keyword map per page (Ubersuggest, US, 23 Oct 2026)

The strategy's rule is **slug = keyword**. With zero keywords passing Gates 1–4, these slugs use
Pixorama's own capability names instead — defensible, since the pages are conversion and AEO assets
rather than ranking bets. But it is worth knowing what each name is worth as a search phrase, and
where the brand naming actively costs demand.

| Page | Slug as a search phrase | Vol/mo | Intent | Verdict on the slug |
|---|---|---|---|---|
| Cloud & Platform Engineering | "cloud platform engineering services" | **20** | — | Weak. SERP is Microsoft/Google/AWS definitions — Gate 3 fail. |
| | *alternative:* "cloud engineering services" | **110** | Commercial | **Better slug.** SD 22, commercial intent, 5× the demand. |
| AI & Data Intelligence | "ai data intelligence" | **30** | Commercial | Brand-invented phrase, near-zero demand. |
| | *alternative:* "ai agent development services" | **480** | Commercial | Real demand, matches what they actually sell. |
| Mobile App Development | "mobile app development company" | **3,600** | Commercial | **Strong.** Slug already sits inside the phrase. Keep as is. |
| Product & Software Engineering | "product engineering services" | **320** | **Navigational** | Navigational intent — people want a specific company. Weak target. |
| | *alternative:* "custom software development company" | **2,900** | Commercial | Real demand, unreachable for now, right long-term home. |
| Digital Growth & Web | "digital growth web" | **~0** | — | Brand-invented. No demand. |
| | *alternative:* "web development services" | **5,400** | Commercial | SD 36. The phrase buyers actually use. |

### Recommended slug changes

Keep the **nav labels** as the capability names — they are good brand language. Change the **slugs
and H1 openings** to the buyer wording on the three where it costs nothing and gains real optionality:

| From | To |
|---|---|
| `/services/digital-growth-web` | `/services/web-development-services` |
| `/services/cloud-platform-engineering` | `/services/cloud-engineering-services` |
| `/services/ai-data-intelligence` | `/services/ai-development-services` *(verify against a live SERP before committing)* |

Leave `/services/mobile-app-development` and `/services/product-software-engineering` as drafted —
the first is already well-formed, and the second's buyer phrase ("custom software development
company") is a head term better earned later than claimed now.

**Decide this before launch.** Changing a slug after publication costs a redirect and resets the
page's age, which is the main asset these pages are accumulating.

### Growth-into targets (re-run the gates quarterly)

Each page should have a target keyword it is being aged toward, taken from the B-hold list:

| Page | Growth-into target | Vol/mo | Blocked on |
|---|---|---|---|
| AI & Data Intelligence | `rag-development-services` | 70 | Gate 2 (and Gate 4 at 8 exact-match) — cleanest Gate 3 pass found |
| Cloud & Platform Engineering | `cloud-cost-optimization-services` | 140 | Gate 2 only; Gate 4 already borderline-passing at 3 |
| Mobile App Development | `mobile-app-development-company` | 3,600 | Gate 2 — head term, long horizon |
| Product & Software Engineering | `healthcare-` / `fintech-` / `logistics-software-development-company` | 480–720 | Gate 2; pick one industry per client answer §8.8, do not build all three |
| Digital Growth & Web | `web-development-services` | 5,400 | Gate 2 — head term, long horizon |

One target per page. **Do not create separate pages for these** — they are what the existing page
grows into, and the strategy forbids synonym pages that compete with each other.
