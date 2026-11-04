# /process

| Field | Value |
|---|---|
| Primary keyword | custom software development process (50 / SD 12) |
| Secondary keywords | software development process methodology (880 / SD 34), agile software development process steps (480 / SD 9), software development process for startups (30 / SD 27), enterprise software development process (90 / SD 32) |
| Title tag | Our Custom Software Development Process, in Five Stages \| Pixorama |
| Meta description | How Pixorama takes software from idea to production: discover, architect, build, harden, scale and operate. Fixed cost envelope, code you own from day one. |
| H1 | A custom software development process built for speed and certainty |
| Schema | `WebPage` + `HowTo` (five steps) + `FAQPage` + `BreadcrumbList` |
| Target length | ~1,300 words |

---

## Page copy

### H1: A custom software development process built for speed and certainty

Most software projects don't fail because the engineers can't code. They fail because nobody agreed what "done" meant, the architecture was guessed rather than tested, and security turned up a week before launch.

Our process is designed around those three failure points. It has five stages. Each one ends with something you can see, check and keep, whether or not you carry on with us.

**[Book a discovery call]** **[See engagement models]**

---

### H2: The five stages at a glance

| Stage | What happens | What you walk away with |
|---|---|---|
| **1. Discover** | Goals, constraints, users and success metrics | A scope, a risk register and a **cost envelope** |
| **2. Architect** | Target architecture, security model, delivery plan | Architecture decision records and a **running slice** |
| **3. Build** | Short cycles that ship production increments | Working software every two weeks, in your repo |
| **4. Harden** | Security, performance and reliability testing | Test reports, load results, an observability stack |
| **5. Scale & operate** | Run, observe, optimise, hand over | Runbooks, documentation, trained team, SLA if needed |

---

### H2: Stage 1, Discover: agree what success looks like before anyone writes code

Discovery is short and fixed-price, usually two to three weeks. A senior engineer and a product lead work with your team to pin down:

- **The business goal.** What changes for the business if this works? Revenue, cost, risk or speed.
- **The users and their jobs.** Who uses it, how often, and what they do today instead.
- **The constraints.** Budget, deadlines, regulation, existing systems, data you can and can't move.
- **The success metrics.** Two or three numbers we'll both be held to.

You leave discovery with a written scope, a ranked risk register and a **cost envelope**: a range for what the build will cost and how long it will take, with the assumptions written down. You're not committed to anything else. If you want to take the scope to another firm, it's yours.

[Read more about discovery →](/process/discover)

---

### H2: Stage 2, Architect: prove the design with a running slice

Diagrams don't fail in production. Systems do. So we don't stop at a diagram.

During architecture we design the target system: services, data model, integrations, hosting, identity and the security model. Every significant choice gets an **architecture decision record (ADR)**, a short document that says what we chose, what we rejected and why. Six months later, when someone asks "why Postgres and not DynamoDB?", the answer is in the repo.

Then we build a **running slice**: one thin path through the real system, deployed to real infrastructure. It proves the riskiest assumptions, such as latency, an awkward integration or a data-volume question, before the budget is committed to them.

[Read more about architecture →](/process/architect)

---

### H2: Stage 3, Build: production increments from week one

We work in two-week increments. Each one ends with working software deployed to a staging or production environment, not a slide that says "60% complete".

- **You own the code from day one.** It lives in your GitHub or GitLab organisation, not ours.
- **Automated tests and CI/CD run from the first commit.** Nothing merges without review and a green pipeline.
- **You see progress in software, not status reports.** A demo every two weeks, a written update every week.
- **Scope changes are visible.** If something new comes in, we show you what it displaces or what it adds to the envelope.

[Read more about the build stage →](/process/build)

---

### H2: Stage 4, Harden: security and reliability built in, not bolted on

Hardening isn't a phase we start at the end. Security scanning, dependency checks and performance tests run in the pipeline from the start. Before launch we add the checks that need a near-finished system:

- Threat modelling and a security review against the risks we logged in discovery
- Load and soak testing at realistic and peak traffic
- Failure testing: what happens when a dependency is slow or down
- Observability: logs, metrics, traces and alerts wired to the people who'll respond

[Read more about hardening →](/process/harden)

---

### H2: Stage 5, Scale & operate: run it, improve it, hand it over

After launch we can run the system for you under an SLA, train your team to run it, or both. Either way the goal is that you are never dependent on us.

Handover includes runbooks, architecture documentation, recorded walkthroughs and paired on-call shifts. All code, infrastructure-as-code and credentials transfer to you. There is no licence-back, no retained components and no hosting lock-in.

[Read more about scale and operate →](/process/scale-and-operate)

---

### H2: How this differs from a textbook SDLC

If you've read about the software development life cycle, the stages will look familiar. The differences are in what we refuse to skip:

| Common practice | What we do instead |
|---|---|
| Estimate after a sales call | Estimate after a paid discovery, with assumptions written down |
| Architecture as a diagram | Architecture as ADRs plus a running slice |
| Code in the vendor's repo until final payment | Code in your repo from the first commit |
| Security review before launch | Security checks in the pipeline from week one |
| "Handover" as a zip file | Handover as runbooks, training and paired on-call |

We use agile practices such as short iterations, backlog grooming and demos, but we don't sell "Scrum" as a product. The method serves the outcome, not the other way round.

---

### H2: The process works with every engagement model

The five stages stay the same whether you hire us for a fixed-scope project, a dedicated squad or a few specialists.

- **[Outcome-based projects](/engagement-models/outcome-based-projects):** we run all five stages against a fixed scope.
- **[Dedicated squads](/engagement-models/dedicated-squads):** the squad runs the build-harden-operate loop on your roadmap.
- **[Staff augmentation](/engagement-models/staff-augmentation):** our engineers slot into your process and bring these habits with them.
- **[Advisory & architecture](/engagement-models/advisory-architecture):** we run discovery and architecture only, and your team builds.

---

### H2: Frequently asked questions

**How long does discovery take?**
Usually two to three weeks, depending on how many stakeholders and systems are involved. It's priced as a fixed, separate piece of work.

**Do I get a fixed price?**
You get a cost envelope at the end of discovery: a range with written assumptions. For outcome-based projects we then agree milestone-based commercials against that envelope.

**When do we see working software?**
The running slice at the end of architecture is the first working software, usually within four to six weeks of starting. After that, every two weeks.

**Who owns the code?**
You do, from the first commit. It lives in your repository.

**Can you work inside our existing process?**
Yes. Augmented engineers and squads adopt your tooling and ceremonies. We'll suggest changes only where they reduce risk.

**What if we only want help with architecture?**
That's our [advisory & architecture](/engagement-models/advisory-architecture) engagement. We run discovery and architecture and hand your team the ADRs and running slice.

---

### CTA block

**Have an idea? We'll build it, and you'll own it.**
Start with a two-to-three-week discovery. You'll leave with a scope, a risk register and a cost envelope, whether or not you build with us.

**[Book a discovery call]**

---

## Internal links

- Out to: the five stage pages, all four engagement model pages, `/contact`, `/resources/software-development-cost-calculator`
- In from: homepage process section, main nav, every engagement model page, `/blog/how-to-choose-software-development-company`, `/blog/how-to-build-saas-product`

## Writer notes

- Keep the five stage names exactly as the homepage uses them.
- The `HowTo` schema should mirror the five H2 stages and the "walk away with" column.
- Don't add sections on V-model or waterfall (see "Pages I would not build" in doc 06).
