# /process/architect

| Field | Value |
|---|---|
| Primary keyword | software architecture design process |
| Secondary keywords | architecture decision records, adr software architecture, technology selection, walking skeleton, software architecture review |
| Title tag | Architect: Decision Records and a Running Slice \| Pixorama |
| Meta description | How we design software architecture: target design, security model, architecture decision records (ADRs) and a running slice that proves the riskiest choices early. |
| H1 | Architect: design the system, then prove it with a running slice |
| Schema | `WebPage` + `FAQPage` + `BreadcrumbList` (Process › Architect) |
| Target length | ~750 words |

---

## Page copy

### H1: Architect: design the system, then prove it with a running slice

Architecture is the second of our [five stages](/process). We design the target system, write down why each major choice was made, and then build one thin, real path through it, so the riskiest decisions are tested on real infrastructure before the budget is committed.

---

### H2: What we design

- **System shape:** services or modules, boundaries and how they communicate
- **Data model:** what's stored where, ownership, retention and migration
- **Integrations:** third-party APIs, legacy systems, event flows
- **Hosting and infrastructure:** cloud provider, environments, infrastructure-as-code
- **Identity and security model:** authentication, authorisation, secrets, data protection, zero-trust boundaries
- **Observability:** what we'll measure, log and alert on
- **AI components** (if any): model choice, retrieval design, evaluation approach, guardrails, cost per request

---

### H2: Architecture decision records (ADRs)

Every significant choice gets a short written record:

> **ADR-007: Use PostgreSQL for the transactional store**
> **Context:** relational data, strong consistency needed for payments, team familiarity.
> **Options considered:** PostgreSQL, DynamoDB, MongoDB.
> **Decision:** PostgreSQL (managed).
> **Consequences:** vertical scaling limits around X; revisit if write volume exceeds Y.

ADRs live in your repository. They make decisions reviewable, stop the same debates recurring, and mean a new engineer, auditor or acquirer can understand *why* the system looks the way it does.

---

### H2: Technology selection without fashion

We choose technology on four tests:

1. **Does it fit the problem**, the data and the scale actually expected?
2. **Can your team run it** after handover?
3. **What does it cost** to run at expected and peak load?
4. **What's the exit?** How hard is it to replace later?

We work across AWS, Azure and Google Cloud, with TypeScript, Python, Go and Rust, and data tools from PostgreSQL to Snowflake, Kafka and ClickHouse. We'll recommend boring technology when boring is right. Related: [cloud cost is an architecture problem](/blog/cloud-cost-is-an-architecture-problem).

---

### H2: The running slice

A running slice (sometimes called a walking skeleton) is one end-to-end path through the real system: a real UI, a real API, a real database, real deployment pipelines and real monitoring, doing one small thing.

It proves the things diagrams can't:

- Will latency hold with this integration?
- Can the legacy API take the load?
- Does retrieval return the right answers on *your* documents?
- Does the deployment pipeline actually work end to end?

The slice is usually live within the first few weeks. It becomes the foundation of the [build stage](/process/build), not a throwaway prototype.

---

### H2: What you walk away with

- Target architecture documentation and diagrams
- A security model and threat model outline
- ADRs for every significant decision
- A running slice deployed to your cloud account
- CI/CD pipelines and infrastructure-as-code in your repository
- An updated delivery plan and cost envelope

---

### H2: Architecture only?

If you have a team to build but want senior architecture first, we offer this stage on its own as an [architecture review or design engagement](/engagement-models/advisory-architecture).

---

### H2: Frequently asked questions

**How long does the architect stage take?**
Typically one to three weeks, including the running slice.

**Will you use our existing cloud account?**
Yes. Everything is built in your accounts from day one.

**What if the running slice disproves an assumption?**
That's the point. We update the ADR, the plan and the envelope, and you decide how to proceed, early and cheaply.

---

### Navigation
**[← Discover](/process/discover)** · **[Build: production increments from week one →](/process/build)**

---

## Internal links
- Out to: `/process`, `/process/discover`, `/process/build`, `/engagement-models/advisory-architecture`, `/blog/cloud-cost-is-an-architecture-problem`, `/blog/zero-trust-without-stopping-delivery`
- In from: `/process`, `/engagement-models/advisory-architecture`
