# /process/build

| Field | Value |
|---|---|
| Primary keyword | iterative software development process |
| Secondary keywords | agile software development process steps (480 / SD 9), two-week sprints, code ownership software development, ci/cd from day one |
| Title tag | Build: Two-Week Increments, Code You Own From Day One \| Pixorama |
| Meta description | How we build software: two-week production increments, code in your repository from the first commit, automated tests and CI/CD, and demos instead of status reports. |
| H1 | Build: working software every two weeks, in your repository from day one |
| Schema | `WebPage` + `FAQPage` + `BreadcrumbList` (Process › Build) |
| Target length | ~700 words |

---

## Page copy

### H1: Build: working software every two weeks, in your repository from day one

Build is the third of our [five stages](/process). Starting from the running slice, we ship production-quality increments every two weeks. You see progress as software you can use, not as a percentage on a status report.

---

### H2: How a two-week increment works

| Day | What happens |
|---|---|
| **Day 1** | Planning: agree the increment goal and the stories that deliver it |
| **Days 2 to 9** | Build: small pull requests, reviewed and merged daily behind a green pipeline |
| **Day 10** | Demo: working software in a staging or production environment, plus retro and re-plan |

Every week you also get a short written update: what shipped, what's next, risks, and decisions we need from you.

---

### H2: You own the code from the first commit

- Code lives in **your** GitHub or GitLab organisation, not ours.
- Infrastructure is defined as code in your repo and deployed to **your** cloud accounts.
- You have commit and admin access throughout. There's no big reveal at the end, because nothing is hidden until then.
- There's no final-payment hostage situation, no licence-back and no retained components.

If you ever want to stop working with us, you already have everything.

---

### H2: Engineering standards we don't negotiate on

- **Trunk-based development, reviewed.** Small changes merged daily, with review on every change.
- **Automated tests**: unit, integration and end-to-end where it matters, run on every pull request.
- **CI/CD from day one.** Every merge is deployable.
- **Security in the pipeline**: dependency scanning, static analysis, secrets detection.
- **Feature flags** so unfinished work can ship safely.
- **Observability as we go.** Logs, metrics and traces are added with the feature, not after it.

---

### H2: Handling change without chaos

Requirements change. That's normal. What matters is that change is visible:

- New requests go into the backlog with an estimate.
- For [fixed-scope projects](/engagement-models/outcome-based-projects), we show the written impact on cost and timeline before anything changes, and you decide.
- For [squads](/engagement-models/dedicated-squads), you re-prioritise freely, and we show what moves out.

---

### H2: Building AI features

AI features follow the same rhythm, plus three extra habits:

- **Evaluation sets** built from real examples, run on every change.
- **Cost and latency tracking** per request.
- **Guardrails and fallbacks** designed in, not added later.

See [how to build an AI agent](/blog/how-to-build-an-ai-agent) and [RAG vs fine-tuning](/blog/rag-vs-fine-tuning) for how we approach it.

---

### H2: Frequently asked questions

**How often will we see progress?**
A demo every two weeks and a written update every week. You can also watch the repo and staging environment any time.

**Can our engineers contribute?**
Yes. Mixed teams are common, and the same review and pipeline rules apply to everyone.

**Do you use Scrum?**
We use short iterations, planning, demos and retros. We adapt to your ceremonies if you have them.

---

### Navigation
**[← Architect](/process/architect)** · **[Harden: security and reliability built in →](/process/harden)**

---

## Internal links
- Out to: `/process`, `/process/architect`, `/process/harden`, `/engagement-models/outcome-based-projects`, `/engagement-models/dedicated-squads`, `/blog/how-to-build-an-ai-agent`, `/blog/rag-vs-fine-tuning`, `/blog/shipping-mobile-on-two-platforms`
- In from: `/process`
