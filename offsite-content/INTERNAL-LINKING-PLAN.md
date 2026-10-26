# Internal linking plan for pixoramagroup.com/blog

Audit of all 42 live posts, 2026-10-26. All 42 return HTTP 200.

This is the companion to the off-site programme and, on current evidence, the
**higher-return half**. Internal links have no platform guidelines to satisfy,
are entirely under your control, are `dofollow`, and can be shipped this week.

---

## 1. What the audit found

### 1.1 The site has two different linking regimes

**The India cluster is properly interlinked.** `best-software-development-companies-india`
carries a **"Related reading"** block pointing at seven siblings
(`top-ai-development-companies-india`, `best-mobile-app-development-companies-india`,
`legacy-modernization-refactor-rebuild-replace`, `best-staff-augmentation-companies-india`,
`react-native-vs-flutter`, `mobile-app-development-cost-india`,
`best-flutter-development-companies-india`). Equity circulates well inside this
cluster.

**Nothing else has a Related reading block.** The USA/Australia pages and the
essays carry only two or three ad-hoc body links each, and they mostly point at
the same two destinations.

### 1.2 The highest-value page on the site has no inbound internal links

`best-ai-automation-agencies-in-the-usa-and-australia-for-2026-how-to-c`

| Metric | Value |
|---|---|
| Ubersuggest, "ai automation agency" | **4,400/mo, SD 13, CPC $17.80** |
| GSC "ai automation agencies in usa" | **position 11** |
| GSC "best ai automation agencies" | **position 19** |
| GSC "top ai automation agencies" | **position 19** |
| GSC page total | 14 impressions, position 24.07 |
| Inbound internal links | **0** |
| Outbound internal blog links | 1 (`zero-trust-without-stopping-delivery`) |

**SD 13 is the lowest difficulty of any commercially valuable term on this
site** — lower than staff augmentation (17) and on-prem-to-cloud migration (17)
— and the volume is the second highest after "how to build an ai agent" (2,900).
Volume is also growing: Ubersuggest shows 8,100/mo in January, March and April
2026 against 4,400 now.

It is already on page 2 for three variants. And eight sibling pages in the AI
cluster could link to it. None do.

I checked `ai-agents-for-business-use-cases` (position 20) and
`how-to-build-an-ai-agent` (position 5) directly. Neither links to it. Both link
to `zero-trust-without-stopping-delivery` and `rag-that-survives-contact-with-users`
instead.

**This is the single most correctable thing found in this audit.**

### 1.3 Equity is pooling in a page with no commercial value

`zero-trust-without-stopping-delivery` receives body links from nearly every
page I inspected — the AI agent posts, the SaaS listicles, the mobile listicles,
the AI automation guide, the cloud migration guide.

It is a good essay. It has no commercial keyword behind it and no GSC
impressions. It has become the site's most internally-linked page by accident,
most likely because it is a convenient "and security matters" reference.

The same is true to a lesser degree of `rag-that-survives-contact-with-users`.

Those links are not wasted exactly — they pass equity within the site — but
they are pointing at a page that cannot convert it into rankings, while
`cloud-migration-strategy-on-premise-to-cloud` (position 31, SD 17, CPC $59)
and the AI automation page (position 11-19, SD 13) sit under-linked.

---

## 2. The changes, in priority order

### Priority 1 — Feed the AI automation page (8 links, one afternoon)

> **Paste-ready copy for this priority is in `PRIORITY-1-PASTE-READY.md`.** All 8
> pages were read, insertion points located by heading and quote, and the copy
> written to match the house voice — 10 links from 8 pages, no repeated anchors.
> The table below is the summary; that file is what you paste.


Add one contextual body link to `best-ai-automation-agencies-in-the-usa-and-australia-for-2026-how-to-c`
from each of these, with varied anchors:

| From | Suggested anchor | Natural placement |
|---|---|---|
| `ai-agents-for-business-use-cases` | "choosing an agency to build one" | After the use-case list, before the closing section |
| `how-to-build-an-ai-agent` | "hiring an AI automation agency instead" | In the build-versus-buy discussion |
| `conversational-ai-platform-buyers-guide` | "agencies that build rather than resell" | In the vendor-evaluation section |
| `ai-answering-service-vs-human-receptionist` | "AI automation agencies in the USA and Australia" | Where implementation partners come up |
| `top-ai-development-companies-australia` | "automation agencies specifically" | Distinguishing dev firms from automation shops |
| `top-ai-development-companies-india` | "the automation-agency equivalent" | Same distinction |
| `what-is-rag-in-ai` | "a partner to implement this" | Closing section |
| `rag-vs-fine-tuning` | "agencies who do this work" | Closing section |

Do not use the same anchor twice. Avoid exact-match "best AI automation
agencies" more than once.

**Why this first:** a page at position 11 with SD 13 and zero internal links is
the cheapest ranking movement available anywhere on this site. Eight internal
links plus the three off-site links now in the content set is a realistic push
to page 1.

### Priority 2 — Add a Related reading block to the 12 pages without one

The India cluster proves this pattern works on your own site. Extend it.

Four to six links per block, to topical siblings, not to whatever essay was
convenient. Suggested blocks:

**Cloud / platform cluster** — on `cloud-cost-is-an-architecture-problem`,
`legacy-application-modernization`, `legacy-modernization-refactor-rebuild-replace`,
`zero-trust-without-stopping-delivery`, `best-cloud-migration-companies-india`:
```
Related reading
- Moving from on-prem to cloud with a practical migration strategy   ← priority target
- Cloud cost is an architecture problem wearing a finance costume
- Legacy application modernization: strategies, options and benefits
- Legacy modernization: refactor, rebuild or replace
- Zero-trust without bringing delivery to a halt
```

**AI cluster** — on `how-to-build-an-ai-agent`, `ai-agents-for-business-use-cases`,
`what-is-rag-in-ai`, `rag-vs-fine-tuning`, `rag-that-survives-contact-with-users`,
`conversational-ai-platform-buyers-guide`, `ai-answering-service-vs-human-receptionist`:
```
Related reading
- Best AI automation agencies in the USA and Australia      ← priority target
- AI agents for business: 15 ways companies are using them
- How to build an AI agent
- RAG vs fine-tuning: which does your project need?
- What is RAG in AI?
```

**Engagement-model cluster** — on `top-it-staff-augmentation-companies-usa`,
`best-staff-augmentation-companies-india`, `what-is-a-fractional-cto`,
`how-to-choose-software-development-company`:
```
Related reading
- What is staff augmentation, and when does it beat a project team?   ← priority target
- What is a fractional CTO? Role, rates and when to hire one
- In-house or outsourced? Choosing a software development company
- Top IT staff augmentation companies in the USA
```

**Mobile cluster** — on `top-mobile-app-development-companies-usa`,
`mobile-app-development-cost-usa-australia`, `shipping-mobile-on-two-platforms`,
`best-mobile-app-development-companies-india`:
```
Related reading
- React Native vs Flutter: how to choose
- Shipping one mobile product on two platforms
- Mobile app development cost: USA and Australia compared
- What mobile app development costs in India
```

**Australia cluster** — on `top-web-development-companies-australia`,
`top-ai-development-companies-australia`, `top-saas-development-companies-usa-australia`:
```
Related reading
- Best SEO agencies in Australia for 2026     ← priority target, needs AU topical signal
- 9 top web development companies in Australia
- 8 top AI development companies in Australia
```

### Priority 3 — Rebalance the links already there

Not a removal exercise. Where an existing body link points at
`zero-trust-without-stopping-delivery` purely as a generic "security matters"
aside, consider whether the sentence would carry a link to a priority target
instead. Specifically:

- On `top-saas-development-companies-usa-australia`, the existing
  `cloud-cost-is-an-architecture-problem` link is well placed. Add
  `cloud-migration-strategy-on-premise-to-cloud` alongside it.
- On `top-mobile-app-development-companies-usa`, the zero-trust link is a weak
  fit for a mobile listicle. `mobile-app-development-cost-usa-australia` and
  `react-native-vs-flutter` are the natural siblings.

Keep zero-trust links where security is genuinely the subject. Stop using it as
the default outbound link.

### Priority 4 — Decide about `journal-prompts-for-self-reflection`

34 impressions at position 23.6, and entirely off-topic for an enterprise
engineering firm. It receives and sends no topical links, and it dilutes the
site's subject focus.

Options: leave it unlinked and ignored (current state, costs little), move it to
a separate property, or remove it. It gets no links in either the off-site or
internal plan. Worth a deliberate decision rather than drift.

---

## 3. Anchor text discipline

The same rules as the off-site programme:

- Vary anchors. Eight links to one page with the same anchor is a pattern.
- Mix descriptive partial-match ("the on-prem to cloud migration strategy"),
  natural-language ("we wrote this up properly"), and occasional exact-match.
- Place links where a reader would want them, mid-argument, not stacked at the
  end — the Related reading blocks are the one deliberate exception, and those
  are a recognised pattern Google handles fine.
- One link per destination per page. Repeating a link to the same URL on one
  page passes nothing extra.

---

## 4. Expected effect and how to read it

Internal links move rankings more slowly than people expect but more reliably
than off-site links on a DA 6 domain, because there is no discovery delay and no
trust discount.

**Check at week 4 and week 8**, per cluster:

| Page | Now | Watch for |
|---|---|---|
| `best-ai-automation-agencies-...` | pos 11-24 | **Page 1 on "ai automation agencies in usa"** — primary KPI for this plan |
| `cloud-migration-strategy-on-premise-to-cloud` | pos 31 | Movement toward the teens |
| `what-is-staff-augmentation` | no impressions | Any impressions at all |
| `ai-agents-for-business-use-cases` | pos 20 | Top 10 |

The AI automation page is the one to watch. It is at position 11 on one query
with zero internal links and SD 13. If the eight links in priority 1 do not move
it within two months, that tells you something important about the domain's
overall authority ceiling — which would be worth knowing before investing
further in the off-site programme.

---

## 5. Sequencing against the off-site programme

Do priority 1 **this week**, before publishing off-site post H5 (week 6 of the
publishing calendar, the first off-site link to the AI automation page). A page
with eight internal links already in place converts an inbound external link
better than an orphan does.

Priorities 2 and 3 can run alongside weeks 1-10 of the off-site calendar.
