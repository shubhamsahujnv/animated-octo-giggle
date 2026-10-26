import { type ServiceContent, confirmed, pending } from "../types";

import { HOMEPAGE_LOGOWALL, HOMEPAGE_ROSTER } from "./_sources";

export const productSoftwareEngineering: ServiceContent = {
  slug: "product-software-engineering",
  keywordPhrase: "Product & Software Engineering",
  navLabel: "Product & Software Engineering",
  title: "Product & Software Engineering | Senior-Led | Pixorama",
  metaDescription:
    "MVPs, SaaS platforms and legacy modernisation, built by senior engineers. Production increment in the first fortnight, and you own the code and documentation.",
  h1: "Product & Software Engineering: Stalled Roadmaps into Shipped Software",
  eyebrow: "Capability",

  openingAnswer:
    "Product & Software Engineering is how Pixorama turns an idea or a stalled roadmap into shipped, scalable software you own: MVPs, SaaS platforms, legacy modernisation and the engineering controls that keep velocity safe. It is for enterprises and funded startups in regulated sectors. Pixorama ships a production increment inside the first fortnight.",

  // Three named, already-published engagements. No numbers yet; see caseStudy.
  proofLine: confirmed(
    "Platforms shipped for BVIVE, Gateways and New Zealand Gateway.",
  ),
  proofLineFallback:
    "Senior-led from day one, with no ramp-up tax, and full ownership of the code at the end.",

  included: [
    {
      label: "MVP builds",
      detail:
        "A narrow, real product in front of real users, built to be extended rather than thrown away.",
    },
    {
      label: "SaaS platforms",
      detail: "Multi-tenancy, billing, roles and permissions, admin tooling.",
    },
    {
      label: "Legacy modernisation",
      detail:
        "Incremental replacement with a working system at every step, not a big-bang rewrite.",
    },
    {
      label: "API & integration work",
      detail:
        "The integration surface that usually decides whether a platform ships on time.",
    },
    {
      label: "Engineering controls",
      detail: "Testing, CI, review and release practice that keep speed from breaking things.",
    },
    {
      label: "Security by design",
      detail:
        "Zero-trust architecture and a hardened delivery pipeline, with SOC 2 and ISO 27001 readiness as a by-product.",
    },
    {
      label: "Discovery",
      detail: "A process designed to get senior engineers productive in a new domain quickly.",
    },
    {
      label: "Handover",
      detail:
        "Code, infrastructure and documentation, with handover designed in from the start.",
    },
  ],

  timelines: [
    "Production increment inside the first fortnight. Senior-led from day one, no ramp-up tax.",
    "Then short, continuous cycles.",
  ],

  engagementModels: [
    {
      model: "Outcome-based project",
      fits:
        "A defined build: an MVP, a platform, a modernisation phase. Milestone-based commercials.",
    },
    {
      model: "Dedicated squad",
      fits: "A continuous roadmap needing embedded senior capacity.",
    },
    {
      model: "Specialist augmentation",
      fits: "One critical capability missing from an otherwise capable team.",
    },
    {
      model: "Advisory & architecture",
      fits:
        "A review, a target architecture, or a second opinion before committing budget.",
    },
  ],

  clientRoster: [
    {
      client: "BVIVE",
      work: "Payment recovery platform",
      source: HOMEPAGE_LOGOWALL,
    },
    {
      client: "Gateways",
      work: "Platform support and development",
      source: HOMEPAGE_LOGOWALL,
    },
    {
      client: "New Zealand Gateway",
      work: "Education platform",
      source: HOMEPAGE_LOGOWALL,
    },
  ],

  testimonial: pending(
    "No published testimonial covers platform or product work.",
  ),

  caseStudy: pending(
    "Named case study with numbers. Candidates: New Zealand Gateway (education platform), Gateways (platform support and development), BVIVE (payment recovery platform). At least one needs permission to name with a real metric: time to launch, throughput, cost per transaction, or incident reduction.",
  ),
  namedExpert: pending(
    'Named engineers with credentials. The entire pitch is "senior-only teams, outcomes not hours" and no engineer is named anywhere on the site. This is the highest-value unfilled slot across all five pages.',
  ),

  costDrivers: [
    {
      label: "Scope and stage",
      detail: "A first MVP versus a platform replacing a system in production.",
    },
    {
      label: "Integration surface",
      detail: "How many existing systems must be read from and written to.",
    },
    {
      label: "Compliance load",
      detail: "The controls and evidence your sector requires.",
    },
    {
      label: "Starting state",
      detail: "A clean build, or a legacy estate to work around safely.",
    },
    {
      label: "Model",
      detail: "Fixed-scope project with milestone commercials, versus an embedded squad.",
    },
    {
      label: "Handover depth",
      detail: "How much documentation and enablement your own team needs.",
    },
  ],
  priceBand: pending("Starting price or typical engagement band."),

  forWho: [
    "Enterprises and funded startups across financial services, healthcare and life sciences, retail and eCommerce, logistics and mobility, SaaS and technology, public sector, energy and utilities, and education",
    "Teams with a stalled roadmap and a deadline that has not moved",
    "Teams carrying a legacy system they cannot afford to stop or to rewrite wholesale",
    "Teams who want the system handed back, documented, and runnable by their own engineers",
  ],
  notForWho: [
    "Teams wanting hourly junior capacity billed by the seat",
    "Anyone wanting a fixed price for a scope that has not been defined; we would scope it first",
    "Teams wanting a permanent outsourced black box; handover is designed in, not optional",
  ],

  headings: {
    included: "What Our Product & Software Engineering Services Include",
    process: "Our Five-Step Software Engineering Process",
    proof: "Software Engineering Work We Can Name",
    cost: "What Product & Software Engineering Costs",
    fit: "Who Our Product & Software Engineering Services Are For",
    faq: "Frequently Asked Questions About Product & Software Engineering",
    cta: "Scope a Software Engineering Engagement",
  },

  process: [
    { step: "Discovery against production reality", detail: "The existing system, the constraints and the deadline that has not moved." },
    { step: "Agree the slice that ships first", detail: "The narrowest thing that is genuinely useful in production." },
    { step: "Ship a production increment", detail: "Inside the first fortnight, senior-led, with the engineering controls already in place." },
    { step: "Replace the legacy incrementally", detail: "A working system at every step, never a big-bang rewrite." },
    { step: "Hand over with documentation and enablement", detail: "Your team runs and extends it; there is no lock-in by obscurity." },
  ],

  faq: [
    {
      q: "What do your product and software engineering services cover?",
      a: "Pixorama is an engineering-led software company. We design, build, and operate cloud platforms, AI and data products, mobile apps, and security-hardened systems for enterprises and funded startups. In short: we turn an idea or a stalled roadmap into shipped, scalable software you own.",
    },
    {
      q: "How do software engineering engagements and pricing work?",
      a: "Choose the model that fits your stage: outcome-based fixed-scope projects, a dedicated squad embedded in your roadmap, specialist augmentation for a critical capability, or advisory and architecture reviews. Every model is staffed with senior people and run against clear, measurable outcomes.",
    },
    {
      q: "Which industries do your software engineering teams work in?",
      a: "We work across regulated, high-stakes sectors: financial services, healthcare and life sciences, retail and eCommerce, logistics and mobility, SaaS and technology, public sector, energy and utilities, and education. Our discovery process gets us productive in a new domain quickly.",
    },
    {
      q: "Can your software engineering team modernise a legacy system without stopping delivery?",
      a: "That is the default approach: incremental replacement with a working system at every step, rather than a big-bang rewrite.",
    },
    {
      q: "Where is the engineering team based, and do you work remotely?",
      a: "We are remote-first and senior-led, with distributed teams that align to your time zone and work with clients across regions. Founded in 2022, we operate as a hands-on engineering partner rather than a body shop.",
    },
  ],

  relatedServices: [
    "cloud-engineering-services",
    "ai-development-services",
    "mobile-app-development",
  ],
  blogLinks: [
    { href: "/blog/how-to-build-saas-product", label: "How to build a SaaS product" },
    {
      href: "/blog/legacy-application-modernization",
      label: "Legacy application modernization",
    },
    {
      href: "/blog/how-to-choose-software-development-company",
      label: "How to choose a software development company",
    },
    {
      href: "/blog/zero-trust-without-stopping-delivery",
      label: "Zero trust without stopping delivery",
    },
  ],

  lastUpdated: "2026-10-23",

  serviceType: "Custom software development",
  audienceType: "Enterprises and funded startups in regulated sectors",

  targetKeyword: {
    phrase: "healthcare / fintech / logistics software development company",
    volumePerMonth: 720,
    market: "US",
    blockedOn:
      "Gate 2. Pick one industry once the client confirms which sectors they want leads for. Do not build all three.",
  },

  internalNotes: [
    "This page is the hub of the cluster. Link it from all four others.",
    '"product engineering services" is 320/mo but navigational intent, so it is a weak target. The long-term home is "custom software development company" (2,900/mo), a head term better earned later than claimed now.',
  ],
};
