# Deep Internal Linking Plan

This is the highest-leverage document in the set. Pixorama has 2,363 backlinks from 37 referring
domains and ranks for one keyword. Authority is arriving at the site and going nowhere, because
there is no internal structure to distribute it through.

---

## 1. Fix the navigation first — nothing else works until this is done

The header and footer currently link to:

| Current | Change to | Why |
|---|---|---|
| `/#capabilities` | `/services` | An anchor is the homepage. Services cannot rank without a URL. |
| `/#method` | `/process` | Currently a 404. Create the page, then point the nav at it. |
| `/#company` | `/about` | Same problem. |
| `/#contact` | `/contact` | Same problem — and a contact page is a trust signal. |

Nav links are the most repeated internal links on any site. Right now every one of them resolves
to `/`. This single change does more than all the content rewrites combined, because it is what
gives the other pages the ability to receive authority at all.

Keep the anchors as *secondary* in-page jump links if the homepage sections stay. Just do not let
them be the only route to a topic.

---

## 2. Linking rules

Apply these consistently; consistency is what produces the signal.

1. **Every page links up to its hub** within the first screen of content.
2. **Every page links sideways** to two to four siblings in its cluster.
3. **Every page links across** to one or two genuinely related pages in other clusters.
4. **Anchor text is descriptive and varied.** Use the target's keyword naturally — "AI voice
   agent platform", "our custom software development process". Never "click here", and never the
   exact same anchor text from thirty different pages.
5. **Links are in the body copy**, not only in nav, footers or related-post widgets. Contextual
   in-content links carry far more weight than boilerplate.
6. **Three clicks maximum** from the homepage to any page on the site. Several blog posts are
   currently five or more deep in a paginated list.
7. **No orphans.** Every URL must have at least three inbound internal links.

---

## 3. Hub-to-spoke map

### Homepage (`/`)
Links out to: `/services`, all five service children, `/products`, all three product pages,
`/process`, `/engagement-models` and its four children, all four `/industries/*`, all three
`/locations/*`, `/case-studies`, `/about`, `/contact`, plus ~10 contextual blog links.

Receives from: every page on the site (logo link).

### `/products` hub
| Links to | Anchor text |
|---|---|
| `/products/pxo-ai` | AI voice agent platform |
| `/products/echomind` | private AI journal app |
| `/products/ai-device-inspector` | automated device inspection |
| `/process` | how we build |
| `/process/architect` | during architecture |
| `/engagement-models` | engagement models |
| `/blog/how-to-build-an-ai-agent` | how to build an AI agent |
| `/blog/rag-vs-fine-tuning` | RAG vs fine-tuning |
| `/blog/ai-agents-for-business-use-cases` | 15 ways companies are using AI agents |
| `/blog/rag-that-survives-contact-with-users` | retrieval that survives real users |

### `/products/pxo-ai`
| Links to | Anchor text |
|---|---|
| `/products` | AI agent development |
| `/products/pxo-ai/pricing` | PXO AI pricing |
| 5 × `use-cases/*` | AI voice agents for customer service / healthcare / real estate / restaurants / small business |
| `/products/pxo-ai/white-label` | white label programme |
| `/resources/ai-voice-agent-roi-calculator` | estimate your savings |
| `/process` | our five-stage process |
| `/industries/healthcare` | healthcare app development |
| `/blog/conversational-ai-platform-buyers-guide` | buyer's guide to conversational AI platforms |
| `/blog/ai-answering-service-vs-human-receptionist` | AI receptionist vs answering service |

### `/process` hub
Links to: five `/process/*` stage pages, `/engagement-models` + four children, `/products`,
`/contact`, and five contextual blog links (cloud cost, legacy modernisation, zero-trust, cloud
migration strategy, how to build a SaaS product).

### `/blog` — the big fix
Add a category layer and retrofit all 42 posts. Each post then links: up to its category, up to
the relevant service or product page, and sideways to two or three sibling posts.

| Category | Posts (indicative) |
|---|---|
| `/blog/category/ai-and-automation` | how-to-build-an-ai-agent, what-is-rag-in-ai, rag-vs-fine-tuning, ai-agents-for-business-use-cases, conversational-ai-platform-buyers-guide, ai-answering-service-vs-human-receptionist, rag-that-survives-contact-with-users, top-ai-development-companies-india, top-ai-development-companies-australia, best-ai-automation-agencies-usa-australia |
| `/blog/category/cloud-and-devops` | cloud-migration-strategy, cloud-cost-is-an-architecture-problem, zero-trust-without-stopping-delivery, best-devops-consulting-companies-india, best-cloud-migration-companies-india, legacy-application-modernization, legacy-modernization-refactor-rebuild-replace |
| `/blog/category/mobile-development` | react-native-vs-flutter, shipping-mobile-on-two-platforms, best-flutter-development-companies-india, best-react-native-development-companies-india, best-mobile-app-development-companies-india, top-mobile-app-development-companies-usa |
| `/blog/category/hiring-and-engagement` | what-is-staff-augmentation, best-staff-augmentation-companies-india, top-it-staff-augmentation-companies-usa, what-is-a-fractional-cto, how-to-choose-software-development-company, best-software-development-companies-india |
| `/blog/category/cost-and-pricing` | mobile-app-development-cost-india, mobile-app-development-cost-usa-australia |

### Blog → money page links (highest priority retrofits)

These twelve links are where blog authority gets converted into commercial rankings. Each should
be a contextual in-content link, not a footer banner.

| From post | To | Anchor text |
|---|---|---|
| `/blog/journal-prompts-for-self-reflection` | `/products/echomind` | AI journal app |
| `/blog/how-to-build-an-ai-agent` | `/products` | AI agent development company |
| `/blog/conversational-ai-platform-buyers-guide` | `/products/pxo-ai` | AI voice agent platform |
| `/blog/ai-answering-service-vs-human-receptionist` | `/products/pxo-ai/use-cases/customer-service` | AI voice agents for customer service |
| `/blog/ai-agents-for-business-use-cases` | `/products` | AI agent development services |
| `/blog/what-is-rag-in-ai` | `/services/ai-data-intelligence` | AI and data intelligence services |
| `/blog/rag-vs-fine-tuning` | `/products` | custom AI agent development |
| `/blog/what-is-staff-augmentation` | `/engagement-models/staff-augmentation` | IT staff augmentation services |
| `/blog/what-is-a-fractional-cto` | `/engagement-models/advisory-architecture` | advisory and architecture |
| `/blog/how-to-choose-software-development-company` | `/process` | custom software development process |
| `/blog/cloud-migration-strategy-on-premise-to-cloud` | `/services/cloud-platform-engineering` | cloud migration services |
| `/blog/react-native-vs-flutter` | `/services/mobile-app-development` | mobile app development services |

### "Best companies in India/USA/Australia" posts — a note

There are roughly 15 of these. They are listicles where Pixorama is presumably one entry. Each
should link to the matching `/locations/*` page and the matching service page. They are also the
most likely posts to be earning those 2,363 backlinks, which makes them the most valuable
link sources on the site. Retrofit them first.

---

## 4. Breadcrumbs

Add `BreadcrumbList` schema and visible breadcrumbs sitewide:

```
Home › Products › PXO AI › Pricing
Home › Process › Architect
Home › Blog › AI & Automation › How to Build an AI Agent
```

Breadcrumbs create reliable up-links on every page and show as a path in search results.

---

## 5. Sequencing

**Week 1 — unblock everything**
Fix the nav URLs. Create `/process`, `/about`, `/contact` as real pages. Add breadcrumbs.

**Week 2 — split the products hub**
Create `/products/pxo-ai`, `/products/echomind`, `/products/ai-device-inspector`. Rewrite
`/products` as the AI agent development hub. Fix the H1 mismatch.

**Week 3 — rewrite the homepage**
Deploy document `02`. Add FAQPage schema.

**Week 4 — blog categories**
Create the five category pages. Retrofit the 12 blog-to-money-page links above.

**Weeks 5–8 — build out the clusters**
`/engagement-models` and children, `/process` stage pages, `/locations/*`.

**Weeks 9–12 — the low-difficulty wins**
PXO AI use-case pages (SD 15–34), pricing page (SD 15), ROI calculator (SD 11),
`/locations/australia` (SD 6).

Do not reorder this. Building cluster pages before fixing the nav means building pages that
cannot receive authority.
