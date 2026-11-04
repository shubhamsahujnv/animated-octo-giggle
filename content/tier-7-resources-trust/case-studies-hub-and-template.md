# /case-studies and /case-studies/[client]

This file has two parts: **(A)** the hub page copy and **(B)** the individual case-study template, with a pre-filled draft for each recent client named on the homepage. The drafts contain only what's public on the site today. Every outcome, number and quote is a `[[ADD]]` for the team to get from the client, **with written permission to publish.**

---

# A. /case-studies (hub)

| Field | Value |
|---|---|
| Primary keyword | pixorama case studies (branded) |
| Secondary keywords | software development case studies, ai development case study, payment recovery platform case study |
| Title tag | Case Studies: Software, AI and Cloud Work We've Shipped \| Pixorama |
| Meta description | Real projects, real outcomes: payment platforms, education platforms, websites and AI systems Pixorama has designed, built and handed over. |
| H1 | Work we've shipped, and what changed because of it |
| Schema | `CollectionPage` + `ItemList` of case studies + `BreadcrumbList` |
| Target length | ~350 words + cards |

## Page copy

### H1: Work we've shipped, and what changed because of it

We measure ourselves on outcomes, not hours. Here's some of the work we've designed, built and handed over, with what changed for the client.

**Filter:** All · AI & Data · Cloud & Platform · Product & Software · Mobile · Web & Growth · *Industry:* Fintech · Education · Retail · Professional services

### Case study cards (one per client)

Each card: client logo · one-line problem · headline result (number) · capability tags · "Read the case study →"

| Client | Card line | Headline result | Tags |
|---|---|---|---|
| **BVIVE** | A payment recovery platform built to recover failed payments | `[[ADD metric]]` | Product & Software · Fintech |
| **Gateways** | Platform support and ongoing development | `[[ADD metric]]` | Product & Software · Cloud |
| **New Zealand Gateway** | An education platform | `[[ADD metric]]` | Product & Software · Education |
| **Wingwaves** | A website and product catalogue | `[[ADD metric]]` | Web & Growth · Retail |
| **Amelia Downie** | A website and SEO for a land healing practice | `[[ADD metric, e.g. ranking or enquiry growth]]` | Web & Growth |
| **White Oak Artisans** | A website for an interior design studio | `[[ADD metric]]` | Web & Growth |

### Closing block
**Your project could be next.** [Book a discovery call](/contact)

### Writer notes
- **Lead with BVIVE.** It's the strongest fit for the AI/fintech/product positioning. The website projects support "Digital Growth & Web" but shouldn't be first in the grid.
- Publish nothing with invented numbers. If a client won't share metrics, use qualitative outcomes ("launched in X weeks", "replaced three manual tools") plus a quote.
- Where a client can't be named, use an anonymised study ("a Series A US fintech") rather than skipping it.

---

# B. /case-studies/[client] (template)

| Field | Value |
|---|---|
| Primary keyword | [client] case study / [problem] case study, e.g. "payment recovery platform development" |
| Title tag | [Client]: [Outcome in 6 to 8 words] \| Pixorama Case Study |
| Meta description | How Pixorama [did what] for [client], [result]. [Capability], [stack highlights]. |
| H1 | [Outcome-led headline] |
| Schema | `Article` (about: Organization [client]) + `BreadcrumbList`. Add `Review` only with a real, attributed quote. |
| Target length | 800 to 1,200 words |

## Template structure

```
H1: [Outcome-led headline]

At a glance (sidebar or top box)
- Client: [name + one line about them]
- Industry: [ ]
- Market: [India / USA / Australia / NZ]
- Engagement model: [Outcome-based project / Dedicated squad / Staff augmentation / Advisory]
- Timeline: [ ]
- Team: [roles]
- Stack: [ ]
- Results: [3 headline numbers]

H2: The challenge
What was broken, slow, expensive or missing, and why it mattered to the business. 2 to 3 paragraphs.

H2: What we did
Walk through the five stages (discover → architect → build → harden → operate) as they actually happened.
Include one or two real decisions with their trade-offs (from the ADRs). This is the E-E-A-T content: specific, technical, true.

H2: The results
Numbers first, then qualitative outcomes. Before/after where possible.

H2: In their words
Attributed quote: name, role, company. With permission.

H2: What we'd do the same, and differently
1 short paragraph. Honest reflection is rare and builds trust.

CTA: "Facing something similar? [Book a discovery call]"
Related: 2 case studies in the same capability or industry, plus the relevant service and industry page.
```

---

## Draft: /case-studies/bvive

| Field | Value |
|---|---|
| Title tag | BVIVE: Building a Payment Recovery Platform \| Pixorama Case Study |
| Meta description | How Pixorama designed and built BVIVE's payment recovery platform: `[[ADD result]]`. |
| H1 | Building a payment recovery platform for BVIVE |

**At a glance:** Client: BVIVE, `[[ADD: one line about BVIVE]]` · Industry: Fintech / payments · Market: `[[ADD]]` · Model: `[[ADD]]` · Timeline: `[[ADD]]` · Team: `[[ADD]]` · Stack: `[[ADD]]` · Results: `[[ADD ×3]]`

**The challenge.**
`[[ADD: the problem BVIVE needed to solve. For example: failed and declined payments were costing revenue, recovery was manual, and there was no visibility into recovery rates.]]`

**What we did.**
- **Discover:** `[[ADD]]`
- **Architect:** `[[ADD: e.g. retry scheduling design, idempotency, provider integrations, ledger and reconciliation approach]]`
- **Build:** `[[ADD]]`
- **Harden:** `[[ADD: e.g. PCI scope reduction, load testing at peak payment volumes]]`
- **Operate / handover:** `[[ADD]]`

**The results.** `[[ADD: e.g. recovery rate, revenue recovered, manual effort removed, time to launch]]`

**In their words.** `[[ADD: attributed quote]]`

**Related:** [Custom fintech software development](/industries/fintech) · [Outcome-based projects](/engagement-models/outcome-based-projects)

---

## Drafts: remaining clients

Use the same template for each, opening as below:

- **/case-studies/gateways**: H1 "Ongoing platform support and development for Gateways". Angle: long-term squad or support, reliability, how the platform evolved. Links: `/engagement-models/dedicated-squads`, `/process/scale-and-operate`.
- **/case-studies/new-zealand-gateway**: H1 "Building an education platform for New Zealand Gateway". Angle: product build for an education provider in NZ. Links: `/locations/australia` (ANZ market), `/engagement-models/outcome-based-projects`.
- **/case-studies/wingwaves**: H1 "A website and product catalogue for Wingwaves". Angle: catalogue structure, performance, SEO. Links: Digital Growth & Web service page.
- **/case-studies/amelia-downie**: H1 "A website and SEO that bring in enquiries for Amelia Downie". Angle: local SEO results for an Australian practitioner, using the existing testimonial ("professional, knowledgeable, and trustworthy"). Links: `/locations/australia`, `/blog/best-seo-agencies-australia`.
- **/case-studies/white-oak-artisans**: H1 "A portfolio website for White Oak Artisans, an interior design studio". Angle: visual portfolio, enquiry conversion.
