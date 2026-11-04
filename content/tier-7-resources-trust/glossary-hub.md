# /resources/glossary

| Field | Value |
|---|---|
| Primary keyword | ai glossary (260 / SD 61). Hard; this page wins on its child pages, not the head term |
| Secondary keywords | ai glossary of terms (70 / SD 59), generative ai glossary (30 / SD 35), **voice ai glossary**, ai and software engineering glossary |
| Title tag | AI and Software Engineering Glossary: Plain-English Definitions |
| Meta description | Plain-English definitions of AI, voice agent, cloud and software engineering terms, from RAG and guardrails to ADRs and staff augmentation. |
| H1 | AI and software engineering glossary |
| Schema | `DefinedTermSet` with each term as `DefinedTerm` (name, description, url) + `BreadcrumbList` |
| Target length | ~1,200 words (about 30 short entries) |

> **Purpose:** a hub for "what is X" queries and a strong source for AI-answer citations (Google AI Overviews, ChatGPT, Perplexity). Each entry is a short, quotable 1 to 2 sentence definition, linking to a full term page where one exists or to the most relevant existing post. Start with these entries. Promote the highest-volume ones to their own pages over time, following the `/resources/glossary/ai-voice-agent` model.

---

## Page copy

### H1: AI and software engineering glossary

Plain-English definitions of the terms we use every day. Each one is written so you could repeat it in a meeting.

**Jump to:** [AI & voice](#ai) · [Engineering & delivery](#eng) · [Cloud & security](#cloud) · [Engagement models](#models)

---

### H2: AI and voice agents {#ai}

**AI agent**
Software that uses an AI model to decide what to do next, such as answering, looking something up or taking an action, in pursuit of a goal, rather than following a fixed script. [How to build one →](/blog/how-to-build-an-ai-agent)

**AI voice agent**
An AI agent that holds spoken phone conversations: it listens, understands, replies in natural speech and can take actions like booking appointments. [Full definition →](/resources/glossary/ai-voice-agent)

**AI receptionist**
An AI voice agent set up to answer a business's phone line: greeting callers, answering common questions, booking appointments and taking messages. [AI receptionist vs answering service →](/blog/ai-answering-service-vs-human-receptionist)

**Conversational AI**
Technology that lets software hold a natural conversation in text or speech. [Buyer's guide →](/blog/conversational-ai-platform-buyers-guide)

**Large language model (LLM)**
An AI model trained on large amounts of text that can understand and generate language. LLMs power most modern chat and voice agents.

**Retrieval-augmented generation (RAG)**
A technique where an AI system looks up relevant information from your own documents before answering, so responses are grounded in your content rather than the model's memory. [What is RAG? →](/blog/what-is-rag-in-ai)

**Fine-tuning**
Further training an existing AI model on your own examples to change its behaviour or style. [RAG vs fine-tuning →](/blog/rag-vs-fine-tuning)

**Embedding**
A list of numbers that represents the meaning of a piece of text, so a computer can find text with similar meaning. Embeddings make RAG search work.

**Vector database**
A database designed to store embeddings and quickly find the closest matches to a query.

**Guardrails**
Rules applied to an AI system's inputs and outputs to keep it within safe, approved behaviour, for example blocking certain topics or requiring a disclosure.

**Hallucination**
When an AI model states something false with confidence. Retrieval, guardrails and evaluation reduce it.

**Evaluation (evals)**
A repeatable set of test cases used to measure an AI system's quality, so you can tell whether a change made it better or worse.

**Prompt injection**
An attack where text supplied to an AI system tries to override its instructions, for example a document that says "ignore your rules."

**Speech-to-text (STT) / text-to-speech (TTS)**
STT turns spoken audio into text, and TTS turns text into natural-sounding speech. A voice agent uses both on every turn.

**Latency (in voice AI)**
The delay between a caller finishing speaking and the agent starting to reply. Long latency is what makes voice bots feel robotic.

**Warm transfer**
Handing a call from an AI agent to a person along with a summary of the conversation, so the caller doesn't have to repeat themselves.

**Containment rate**
The share of calls or chats an AI agent resolves without handing over to a person.

**White-label AI**
An AI product that a reseller can sell under their own brand. [PXO AI white label →](/products/pxo-ai/white-label)

---

### H2: Engineering and delivery {#eng}

**Architecture decision record (ADR)**
A short document recording a significant technical decision: the context, the options considered, the choice and its consequences. [How we use ADRs →](/process/architect)

**Running slice / walking skeleton**
A thin end-to-end version of a system, with real UI, API, database and deployment, built early to prove the riskiest assumptions. [More →](/process/architect)

**Cost envelope**
A cost and timeline range for a project, with each end tied to written assumptions. [More →](/process/discover)

**Discovery phase**
A short, structured piece of work at the start of a project to agree goals, scope, risks and cost before building. [More →](/process/discover)

**CI/CD (continuous integration / continuous delivery)**
Automatically testing every code change and keeping the software always ready to deploy.

**MVP (minimum viable product)**
The smallest version of a product that delivers real value to real users and tests your main assumption. [MVP partners in India →](/blog/best-mvp-development-companies-india)

**Multi-tenancy**
A software design where one system serves many customers ("tenants") while keeping their data separate. Central to SaaS. [More →](/industries/saas)

**Legacy modernisation**
Updating an old system by refactoring, rebuilding or replacing it. [How to decide →](/blog/legacy-modernization-refactor-rebuild-replace)

**Observability**
Being able to understand what a system is doing from its outputs: logs, metrics and traces. [More →](/process/harden)

**SLA / SLO**
A service-level agreement is a contractual promise, such as 99.9% uptime. A service-level objective is the internal target used to keep it.

---

### H2: Cloud and security {#cloud}

**Infrastructure as code (IaC)**
Defining servers, networks and cloud resources in code (for example Terraform) so they're versioned, reviewable and repeatable.

**Kubernetes**
An open-source system for running and scaling containerised applications across many machines.

**Cloud migration**
Moving applications and data from on-premise servers to a cloud provider. [Step-by-step strategy →](/blog/cloud-migration-strategy-on-premise-to-cloud)

**Zero trust**
A security approach where no user or system is trusted by default, even inside the network. Every request is verified. [Zero trust without stopping delivery →](/blog/zero-trust-without-stopping-delivery)

**DevOps**
Practices that bring development and operations together so software is built, shipped and run reliably. [DevOps consultancies in India →](/blog/best-devops-consulting-companies-india)

---

### H2: Engagement models {#models}

**Staff augmentation**
Adding external engineers to your own team, under your direction, for a defined period. [What it is →](/blog/what-is-staff-augmentation) · [Our service →](/engagement-models/staff-augmentation)

**Dedicated development team**
A persistent external team, with its own leadership, that works only on your product. [Our squads →](/engagement-models/dedicated-squads)

**Fractional CTO**
An experienced technology leader who works with a company part-time. [What it is →](/blog/what-is-a-fractional-cto) · [Our service →](/engagement-models/advisory-architecture)

**Fixed-scope (outcome-based) project**
An engagement with agreed scope, milestones and payments tied to delivery. [More →](/engagement-models/outcome-based-projects)

---

## Internal links
- This page is a link hub. Every existing post that defines a term should link back to its glossary entry.

## Writer notes
- Keep each definition under 40 words, starting with the term in plain language. Those are the sentences AI answers quote.
- Next term pages to build, in order of volume and difficulty: "what is an ai receptionist" (50 / SD 18), "what is staff augmentation" (590 / SD 33, though the existing post may already cover it), "what is rag", "what is a fractional cto".
