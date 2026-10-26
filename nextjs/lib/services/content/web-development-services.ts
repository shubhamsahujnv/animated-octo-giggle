import { type ServiceContent, confirmed, pending } from "../types";

import { HOMEPAGE_LOGOWALL, HOMEPAGE_ROSTER, HOMEPAGE_TESTIMONIAL } from "./_sources";

export const webDevelopmentServices: ServiceContent = {
  slug: "web-development-services",
  keywordPhrase: "Web Development Services",
  navLabel: "Digital Growth & Web",
  title: "Web Development Services | Sites That Convert | Pixorama",
  metaDescription:
    "Web development services: marketing sites, product catalogues and commerce front-ends, plus the analytics and search work that makes them earn enquiries.",
  h1: "Web Development Services: Sites Built to Earn Enquiries",
  eyebrow: "Capability",

  openingAnswer:
    "Web Development Services from Pixorama build and grow the web surface of your business: marketing sites, product catalogues, commerce front-ends and the analytics and search work that makes them earn enquiries. They are for enterprises and funded startups that need a site to perform, not just launch.",

  proofLine: confirmed(
    "Website and product catalogue for Wingwaves, and website and SEO for Amelia Downie, in her own words below.",
  ),
  proofLineFallback:
    "Built to be measured: technical SEO, analytics and attribution are part of the same engagement.",

  included: [
    {
      label: "Marketing sites",
      detail: "Fast, accessible and measurable, built on a stack your team can edit.",
    },
    {
      label: "Product catalogues",
      detail: "Structured catalogue data, search and filtering that works at scale.",
    },
    {
      label: "Commerce front-ends",
      detail: "Storefront build and integration with your commerce and payment stack.",
    },
    {
      label: "Technical SEO",
      detail:
        "Crawlability, indexation, canonicals, sitemaps, structured data, Core Web Vitals.",
    },
    {
      label: "Content structure",
      detail:
        "Service and category architecture that can actually rank, rather than one page doing everything.",
    },
    {
      label: "AI answer readiness (AEO)",
      detail:
        "Answer-ready openings, schema and FAQ structure so assistants can quote and cite your pages.",
    },
    {
      label: "Analytics & attribution",
      detail:
        "GA4 set up properly, conversion events, source capture, AI-referral channels.",
    },
    { label: "Handover", detail: "Full ownership of the code and the content, documented." },
  ],

  timelines: [
    "Production increment inside the first fortnight, senior-led from day one.",
    "Search and growth work compounds over months, not weeks. We say so rather than imply otherwise.",
  ],

  engagementModels: [
    {
      model: "Outcome-based project",
      fits: "A defined site or catalogue build. Milestone-based commercials.",
    },
    { model: "Dedicated squad", fits: "Continuous growth work." },
    { model: "Specialist augmentation", fits: "A single capability: search, analytics, front-end." },
    { model: "Advisory & architecture", fits: "An audit of an existing site." },
  ],

  clientRoster: [
    {
      client: "Wingwaves",
      work: "Website and product catalogue",
      source: HOMEPAGE_LOGOWALL,
    },
    {
      client: "Amelia Downie",
      work: "Website and SEO",
      source: HOMEPAGE_ROSTER,
    },
  ],

  // Verbatim from the homepage. Not paraphrased, not trimmed for punch.
  testimonial: confirmed({
    quote:
      "I engaged Pixorama to build my website and undertake SEO work. I found them to be professional, knowledgeable, and trustworthy throughout the process. I would confidently recommend their services to anyone looking to improve their online presence.",
    attribution: "Amelia Downie",
    role: "Land Healing Practitioner",
    site: "ameliadownie.com.au",
    source: HOMEPAGE_TESTIMONIAL,
  }),

  caseStudy: pending(
    "Wingwaves, website and product catalogue. Permission plus a metric: catalogue size, load time improvement, conversion or enquiry change. And Amelia Downie: website and SEO; the testimonial is already public, so add a metric (rankings, traffic, enquiries) and move the quote onto this page.",
  ),
  namedExpert: pending("Named web/search specialist with credentials."),

  costDrivers: [
    {
      label: "Page and template count",
      detail: "And how much is bespoke versus systematised.",
    },
    {
      label: "Catalogue size and data quality",
      detail: "Clean structured product data, or data work first.",
    },
    {
      label: "Commerce integration",
      detail: "Which platform, and how many systems it must talk to.",
    },
    {
      label: "Content",
      detail: "Written and ready, or produced as part of the engagement.",
    },
    {
      label: "Migration",
      detail:
        "Replacing a live site carries redirect and indexation work a new build does not.",
    },
    {
      label: "Ongoing growth work",
      detail: "A build, versus a build plus a continuing growth engagement.",
    },
  ],
  priceBand: pending("Starting price or typical band."),

  forWho: [
    "Enterprises and funded startups whose site launched and then stopped producing enquiries",
    "Teams with a product catalogue that has outgrown its current structure or search",
    "Teams who need attribution they can trust before spending more on acquisition",
    "Teams who want AI assistants to be able to quote and cite their pages",
  ],
  notForWho: [
    "Anyone wanting a template site at template prices",
    "Anyone wanting ranking guarantees; nobody can give them honestly",
    "Teams wanting volume content production disconnected from a service they actually sell",
  ],

  headings: {
    included: "What Our Web Development Services Include",
    process: "Our Five-Step Web Development Process",
    proof: "Web Development Work We Can Name",
    cost: "What Web Development Services Cost",
    fit: "Who Our Web Development Services Are For",
    faq: "Frequently Asked Questions About Web Development Services",
    cta: "Scope a Web Development Project",
  },

  process: [
    { step: "Audit what the current site earns", detail: "Traffic, enquiries and attribution, so the build has a baseline to beat." },
    { step: "Structure before design", detail: "Service and category architecture that can rank, rather than one page doing everything." },
    { step: "Build on a stack your team can edit", detail: "Fast, accessible and measurable, with the analytics wired from day one." },
    { step: "Migrate with redirects mapped", detail: "The step that is usually skipped and most often causes the traffic drop." },
    { step: "Measure, then compound", detail: "Search and growth work reported against the baseline, month over month." },
  ],

  faq: [
    {
      q: "Do your web development services include SEO?",
      a: "Yes. Technical SEO, content structure and analytics are part of the same engagement. A site that launches and cannot be found has not finished.",
    },
    {
      q: "What is AI answer readiness, and should web development include it?",
      a: "Structuring pages so assistants can quote and cite them: an answer-ready opening, scannable facts, schema and a direct FAQ. It matters because an increasing share of buyers ask an assistant before they search, and those visits often arrive as direct traffic.",
    },
    {
      q: "Can your web development team migrate our site without losing traffic?",
      a: "Yes. Migration work is redirect mapping, canonical and indexation handling, and monitoring after launch. It is the part that is usually skipped and most often causes a traffic drop.",
    },
    {
      q: "Will we be able to edit the site your web development team builds?",
      a: "Yes. You get full ownership of the code and content, documented, on a stack your own team can edit. There is no lock-in by obscurity.",
    },
    {
      q: "How long after a web development project before we see results?",
      a: "Build work ships in the first fortnight and continues in short cycles. Search results compound over months. Anyone promising rankings on a fixed date is guessing.",
    },
  ],

  relatedServices: ["product-software-engineering", "ai-development-services"],
  blogLinks: [
    {
      href: "/blog/how-to-choose-software-development-company",
      label: "How to choose a software development company",
    },
    {
      href: "/blog/best-seo-agencies-australia",
      label: "Best SEO agencies Australia",
      flagged:
        "Self-nominating listicle targeting a zero-volume phrase. Per the strategy, stop expanding this format: either repoint it at a question buyers actually ask, or leave it unlinked.",
    },
  ],

  lastUpdated: "2026-10-23",

  serviceType: "Web development and digital growth",
  audienceType: "Enterprises and funded startups",

  targetKeyword: {
    phrase: "web development services",
    volumePerMonth: 5400,
    market: "US",
    blockedOn:
      "Gate 2, head term, long horizon. Now the page's own slug, so this is what it is aged toward rather than a phrase to migrate to later.",
  },

  internalNotes: [
    "Credibility prerequisite: Pixorama's own site currently has three orphan indexable URLs under a homepage canonical, no service pages, and eight homepage stats rendering as zeros in the server HTML. Selling technical SEO and analytics from that position is a weak hand. Fix the site before this page ships.",
    'Slug decided from Ubersuggest data: "digital growth web" has roughly zero demand; "web development services" is 5,400/mo, SD 36, commercial. The nav keeps the brand label "Digital Growth & Web".',
    "Thinnest supporting blog cluster of the five, because most existing web/SEO content is in the listicle format the strategy advises against. Worth filling with real buyer questions: site migration without losing traffic, catalogue SEO at scale, what AEO changes.",
  ],
};
