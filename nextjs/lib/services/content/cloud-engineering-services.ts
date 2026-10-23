import { type ServiceContent, confirmed, pending } from "../types";

import { HOMEPAGE_ROSTER, HOMEPAGE_LOGOWALL } from "./_sources";

export const cloudEngineeringServices: ServiceContent = {
  slug: "cloud-engineering-services",
  keywordPhrase: "Cloud Engineering Services",
  navLabel: "Cloud & Platform Engineering",
  title: "Cloud Engineering Services | Senior-Led | Pixorama",
  metaDescription:
    "Cloud engineering services: landing zones, Kubernetes, CI/CD and infrastructure as code, built and operated by senior engineers. First increment in a fortnight.",
  h1: "Cloud Engineering Services: Built to Be Handed Back to You",
  eyebrow: "Capability",

  openingAnswer:
    "Cloud Engineering Services from Pixorama design, build and operate the cloud foundations your product runs on — landing zones, Kubernetes platforms, CI/CD and infrastructure as code. They are for enterprises and funded startups in regulated sectors. Pixorama ships a production increment inside the first fortnight, and you own the code, infrastructure and documentation outright.",

  // Factual and already public. Carries no number, because no approved number
  // exists yet — see caseStudy, still pending.
  proofLine: confirmed(
    "Platform support and development for Gateways — live client work, not a capability claim.",
  ),
  proofLineFallback: "Senior-led from day one, with no ramp-up tax.",

  included: [
    {
      label: "Landing zones & foundations",
      detail:
        "Multi-account or multi-subscription structure, network topology, identity, baseline guardrails.",
    },
    {
      label: "Kubernetes & runtime platforms",
      detail: "Cluster design, workload onboarding, autoscaling, service networking.",
    },
    {
      label: "CI/CD & delivery",
      detail:
        "Pipeline design, environment promotion, release automation, a hardened delivery pipeline.",
    },
    {
      label: "Infrastructure as code",
      detail: "Everything reproducible from source — no hand-built environments.",
    },
    {
      label: "Observability & cost",
      detail:
        "Metrics, logs, traces, alerting and cost visibility built in rather than retrofitted.",
    },
    {
      label: "Security & compliance posture",
      detail:
        "Zero-trust architecture, automated evidence collection, and SOC 2 and ISO 27001 readiness as a continuous by-product of how we build.",
    },
    {
      label: "Migration",
      detail: "On-premise to cloud, or cloud to cloud, with a rollback path at every step.",
    },
    {
      label: "Handover",
      detail:
        "Code, infrastructure and documentation, with handover designed in from the start.",
    },
  ],

  timelines: [
    "Production increment inside the first fortnight. Senior-led from day one, no ramp-up tax.",
    "Then short, continuous delivery cycles with the engineering controls that keep velocity from breaking things.",
  ],

  engagementModels: [
    {
      model: "Outcome-based project",
      fits:
        "Scope is clear — a migration, a landing zone, a platform build. Milestone-based commercials.",
    },
    {
      model: "Dedicated squad",
      fits: "Platform work is continuous and embedded in your roadmap.",
    },
    {
      model: "Specialist augmentation",
      fits: "You need one critical capability your team lacks.",
    },
    {
      model: "Advisory & architecture",
      fits:
        "You need a review, a target architecture, or a second opinion before committing.",
    },
  ],

  clientRoster: [
    {
      client: "Gateways",
      work: "Platform support and development",
      source: HOMEPAGE_LOGOWALL,
    },
  ],

  testimonial: pending(
    "No published testimonial covers platform or cloud work. The only public quote is from Amelia Downie about website and SEO, which belongs on the web development page.",
  ),

  caseStudy: pending(
    "Named case study with numbers. Candidate: Gateways (platform support and development). Needs permission to name plus at least one real metric — cost reduction, deployment frequency, incident reduction or uptime.",
  ),
  namedExpert: pending(
    'Named engineer with credentials. The "senior-only" claim is currently unevidenced anywhere on the site, and for regulated-sector buyers this is the gap that costs deals.',
  ),

  costDrivers: [
    { label: "Scope", detail: "A single landing zone versus a multi-region platform." },
    { label: "Estate size", detail: "How many workloads, accounts and environments move." },
    { label: "Compliance load", detail: "The evidence and controls your sector requires." },
    {
      label: "Starting state",
      detail: "Reproducible infrastructure already, or hand-built environments.",
    },
    {
      label: "Model",
      detail: "Fixed-scope project with milestone commercials, versus an embedded squad.",
    },
  ],
  priceBand: pending(
    "Starting price or typical engagement band. A range beats silence — the strategy accepts a range, a starting price, or what drives cost, and the first two convert better.",
  ),

  forWho: [
    "Enterprises and funded startups in financial services, healthcare and life sciences, logistics and mobility, public sector, energy and utilities",
    "Teams whose cloud spend is rising faster than their delivery speed",
    "Teams who need SOC 2 or ISO 27001 readiness without stalling the roadmap",
    "Teams who want the platform handed back, running, to their own engineers",
  ],
  notForWho: [
    "Single-server or static-site hosting — the engagement model is heavier than the need",
    "Teams wanting a body shop staffed by junior engineers billed by the hour",
    "Teams wanting a platform run as a permanent black box; handover is designed in, not optional",
  ],

  faq: [
    {
      q: "How do you keep software secure and compliant?",
      a: "Security is engineered in, not bolted on. We use zero-trust architecture, automate evidence collection, and harden the delivery pipeline so SOC 2 and ISO 27001 readiness becomes continuous rather than an end-of-cycle scramble.",
    },
    {
      q: "How quickly can you start delivering?",
      a: "Engagements are senior-led from day one with no ramp-up tax. We ship a production increment inside the first fortnight, then keep shipping in short cycles.",
    },
    {
      q: "Do we own the code and the infrastructure?",
      a: "Completely. You get full ownership of the code, infrastructure and documentation, with handover designed in from the start. There is no lock-in by obscurity.",
    },
    {
      q: "Can you take over a platform someone else built?",
      a: "Yes. Advisory and architecture reviews exist for exactly this. We assess what is there, agree a target architecture, and work to it incrementally rather than demanding a rewrite.",
    },
  ],

  relatedServices: ["product-software-engineering", "ai-development-services"],
  blogLinks: [
    {
      href: "/blog/cloud-cost-is-an-architecture-problem",
      label: "Cloud cost is an architecture problem",
    },
    {
      href: "/blog/cloud-migration-strategy-on-premise-to-cloud",
      label: "Cloud migration strategy: on-premise to cloud",
    },
    {
      href: "/blog/zero-trust-without-stopping-delivery",
      label: "Zero trust without stopping delivery",
    },
  ],

  lastUpdated: "2026-10-23",

  serviceType: "Cloud platform engineering",
  audienceType: "Enterprises and funded startups in regulated sectors",

  targetKeyword: {
    phrase: "cloud cost optimization services",
    volumePerMonth: 140,
    market: "US",
    blockedOn: "Gate 2 only; Gate 4 already borderline-passing at 3 exact-match pages.",
  },

  internalNotes: [
    'Slug decided from Ubersuggest data: "cloud engineering services" is 110/mo with commercial intent, against 20/mo for "cloud platform engineering services" whose SERP is Microsoft/Google/AWS definitions (a Gate 3 fail). The nav keeps the brand label "Cloud & Platform Engineering".',
    'An unanswered FAQ belongs here once confirmed: which cloud providers, and any partner status. Do not claim a partnership that does not exist.',
  ],
};
