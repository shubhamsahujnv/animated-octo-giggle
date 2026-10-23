import { type ServiceContent, pending } from "../types";

export const aiDevelopmentServices: ServiceContent = {
  slug: "ai-development-services",
  keywordPhrase: "AI Development Services",
  navLabel: "AI & Data Intelligence",
  title: "AI Development Services | Production AI | Pixorama",
  metaDescription:
    "AI development services on your own data: LLM copilots, RAG, agents and ML models with guardrails, evaluation and monitoring. From the outcome, not a demo.",
  h1: "AI Development Services: Production AI on Your Own Data",
  eyebrow: "Capability",

  openingAnswer:
    "AI Development Services from Pixorama build production-grade AI on your own data: LLM assistants and copilots, retrieval-augmented generation, agents and machine-learning models, each with guardrails, evaluation and monitoring. They are for enterprises and funded startups that need AI in production, not a demo. Pixorama starts from the outcome and the data.",

  proofLine: pending(
    "One-line proof with a number. Candidate: BVIVE (payment recovery platform), a financial services use case. Needs permission to name and one real metric.",
  ),
  proofLineFallback:
    "We start from the outcome and the data, not the demo — so what ships is safe and measurable.",

  included: [
    {
      label: "LLM assistants & copilots",
      detail: "In-product assistants grounded in your own content and permissions.",
    },
    {
      label: "Retrieval-augmented generation (RAG)",
      detail:
        "Retrieval pipelines, chunking and indexing strategy, grounding, citation of sources.",
    },
    {
      label: "AI agents",
      detail:
        "Scoped, tool-using agents with human checkpoints where the stakes require them.",
    },
    {
      label: "Machine-learning models",
      detail: "Where a model beats a prompt — forecasting, scoring, classification.",
    },
    {
      label: "Guardrails",
      detail:
        "Input and output filtering, permission-aware retrieval, refusal behaviour, audit trails.",
    },
    {
      label: "Evaluation",
      detail:
        "An evaluation set before launch, and regression evaluation on every change — not vibes.",
    },
    {
      label: "Monitoring",
      detail: "Live quality, cost and latency monitoring, with alerting on drift.",
    },
    {
      label: "Data foundations",
      detail: "The pipelines and data quality work the AI actually depends on.",
    },
  ],

  timelines: [
    "Production increment inside the first fortnight — typically a narrow, evaluable slice rather than a broad demo.",
    "Then short cycles, with the evaluation set growing alongside the feature.",
  ],

  engagementModels: [
    {
      model: "Outcome-based project",
      fits: "A defined build with milestone-based commercials.",
    },
    { model: "Dedicated squad", fits: "A continuous AI roadmap needing embedded senior capacity." },
    {
      model: "Specialist augmentation",
      fits: "One critical AI or data capability missing from an otherwise capable team.",
    },
    {
      model: "Advisory & architecture",
      fits:
        "The common entry point here — an AI readiness and feasibility review before committing budget.",
    },
  ],

  caseStudy: pending(
    "Named case study with numbers. Candidate: BVIVE, payment recovery platform. Needs permission to name plus a real metric — recovery rate, volume processed, or manual review reduction.",
  ),
  namedExpert: pending(
    "Named AI/ML engineer with credentials. Highest-value proof slot on the site for this service — regulated-sector AI buyers buy the people.",
  ),

  costDrivers: [
    {
      label: "Data readiness",
      detail: "Clean, accessible, permissioned data, or work needed before any AI is useful.",
    },
    {
      label: "Scope",
      detail: "One grounded assistant versus a multi-workflow agent system.",
    },
    {
      label: "Accuracy bar",
      detail:
        "The evaluation and guardrail work scales with the consequence of being wrong.",
    },
    {
      label: "Integration surface",
      detail: "How many systems the AI must read from and write to.",
    },
    {
      label: "Compliance load",
      detail: "Audit, retention and explainability requirements in your sector.",
    },
    {
      label: "Run cost",
      detail: "Inference and retrieval cost, which we design against rather than discover later.",
    },
  ],
  priceBand: pending("Starting price or typical band for an AI engagement."),

  forWho: [
    "Enterprises and funded startups with real proprietary data and a real workflow to improve",
    "Teams who have run an AI pilot that impressed in a demo and failed in production",
    "Regulated sectors needing guardrails, evaluation and an audit trail, not just a model",
    "Teams who want the AI system handed back, documented and runnable by their own engineers",
  ],
  notForWho: [
    "Teams wanting a demo or a proof-of-concept with no route to production",
    "Teams with no usable data yet — we would be doing data engineering, and would say so",
    "Anyone wanting AI added because it is expected, with no outcome attached",
  ],

  faq: [
    {
      q: "Can you build AI into our product?",
      a: "Yes. We build production-grade AI on top of your data: LLM assistants and copilots, retrieval-augmented generation, agents and machine-learning models, all with guardrails, evaluation and monitoring. We start from the outcome and the data, not the demo, so what ships is safe and measurable.",
    },
    {
      q: "RAG or fine-tuning — which do we need?",
      a: "Usually RAG first. It grounds answers in your current content, cites sources, and updates when your data updates. Fine-tuning earns its place for form and behaviour, rarely for knowledge.",
    },
    {
      q: "How do you stop it hallucinating?",
      a: "Permission-aware retrieval, grounding with citations, explicit refusal behaviour, and an evaluation set that runs on every change. The goal is a system whose failure modes are known and monitored.",
    },
    {
      q: "Do we own the AI system you build?",
      a: "Completely — code, infrastructure, prompts, evaluation sets and documentation, with handover designed in from the start.",
    },
  ],

  relatedServices: ["product-software-engineering", "cloud-engineering-services"],
  blogLinks: [
    { href: "/blog/what-is-rag-in-ai", label: "What is RAG in AI?" },
    { href: "/blog/rag-vs-fine-tuning", label: "RAG vs fine-tuning" },
    {
      href: "/blog/rag-that-survives-contact-with-users",
      label: "RAG that survives contact with users",
    },
    { href: "/blog/how-to-build-an-ai-agent", label: "How to build an AI agent" },
    {
      href: "/blog/ai-agents-for-business-use-cases",
      label: "AI agents for business: use cases",
    },
  ],

  lastUpdated: "2026-10-23",

  serviceType: "AI and data engineering",
  audienceType: "Enterprises and funded startups in regulated sectors",

  targetKeyword: {
    phrase: "rag development services",
    volumePerMonth: 70,
    market: "US",
    blockedOn:
      "Gate 2, and Gate 4 at 8 exact-match pages. Cleanest Gate 3 pass found — all ten results are vendor service pages.",
  },

  internalNotes: [
    "Strongest existing content cluster on the site. These posts are the realistic near-term source of AI-assistant citations, which the service page itself will not earn for several quarters.",
    'An unanswered FAQ belongs here once confirmed: whether client data is used to train a provider model. It is the first question every regulated buyer asks and the site answers it nowhere.',
    'Recommended addition: an interactive AI readiness assessment, entry point on this page. "ai readiness assessment" is 720/mo US and failed Gate 3 as a service page precisely because the intent wants a tool.',
    'Slug decision, now verified against a live SERP (23 Oct 2026): "ai development services" is 2,900/mo US, SD 37, commercial intent, and its top 10 is vendor service pages — a clean Gate 3 pass. It beats "ai development company" (also 2,900/mo but SD 48) and dwarfs "ai data intelligence" (30/mo). Applied as the slug; the nav keeps the brand label "AI & Data Intelligence".',
    'RAG is a sub-service, not a separate page yet. Per the strategy\'s fold-in rule it belongs as an H2 section on this page now, and graduates to its own page only if rag-development-services clears the gates later.',
  ],
};
