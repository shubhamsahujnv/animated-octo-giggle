# /process/harden

| Field | Value |
|---|---|
| Primary keyword | secure software development process (40 / SD 60) |
| Secondary keywords | software security review, load testing before launch, production readiness checklist, observability setup, devsecops |
| Title tag | Harden: Security Review, Load Testing and Observability \| Pixorama |
| Meta description | How we harden software before launch: threat modelling, security review, load and failure testing, and full observability, built into the pipeline from day one. |
| H1 | Harden: security, performance and reliability built in, not bolted on |
| Schema | `WebPage` + `FAQPage` + `BreadcrumbList` (Process › Harden) |
| Target length | ~700 words |

---

## Page copy

### H1: Harden: security, performance and reliability built in, not bolted on

Harden is the fourth of our [five stages](/process), but it doesn't start at the end. Security and performance checks run in the pipeline from the first week of [build](/process/build). Before launch, we add the tests that need a near-finished system and prove it's ready for real traffic.

---

### H2: Security review

- **Threat modelling** against the risks logged in [discovery](/process/discover): who might attack, what they'd want, and how.
- **Application security review:** authentication, authorisation, input handling, session management, data exposure.
- **Cloud security review:** IAM least privilege, network boundaries, encryption, secrets management, logging. Related: [zero-trust without stopping delivery](/blog/zero-trust-without-stopping-delivery).
- **Dependency and supply-chain checks:** known vulnerabilities, licences, pinned versions.
- **AI-specific risks** where relevant: prompt injection, data leakage through retrieval, unsafe outputs.
- **Third-party penetration test** coordinated if your risk or compliance profile needs one. `[[CONFIRM: do we partner with a pen-testing firm?]]`

We engineer to practices aligned with SOC 2 and ISO 27001, the frameworks your auditors will ask about, plus OWASP guidance for application security. We build to the controls; certification is between you and your auditor.

---

### H2: Performance and load testing

- **Load tests** at expected traffic, and at 2 to 5× for peaks.
- **Soak tests** over hours to catch memory leaks and slow degradation.
- **Latency budgets** per endpoint, checked in the pipeline.
- **Cost under load:** what the system costs to run at peak, before you find out on the invoice.

---

### H2: Reliability and failure testing

- What happens when a dependency is slow or down?
- Do retries, timeouts and circuit breakers behave as designed?
- Can we restore from backup, and how long does it take?
- Does auto-scaling kick in before users notice?

We test these on purpose, in staging, rather than discovering them in production.

---

### H2: Observability

You can't operate what you can't see. Before launch, every system we build has:

- **Structured logs** you can search
- **Metrics and dashboards** for traffic, errors, latency and saturation
- **Distributed traces** across services (OpenTelemetry)
- **Alerts** routed to the people who'll respond, with runbooks linked
- **Service-level objectives (SLOs)** agreed with you

Tooling we commonly use: Prometheus, Grafana, OpenTelemetry and Datadog.

---

### H2: Production readiness checklist

Before go-live we review together:

☐ Security findings resolved or formally accepted
☐ Load test results within targets
☐ Backups and restore tested
☐ Alerts and on-call defined
☐ Runbooks for common failures
☐ Rollback plan tested
☐ Data migration rehearsed (if any)

---

### H2: Frequently asked questions

**How long does hardening take?**
Typically two to four weeks. You keep the test suites, load profiles and the security review.

**Is hardening an extra cost?**
No. It's part of every engagement. Third-party penetration testing, if needed, is quoted separately.

**Can you harden a system someone else built?**
Yes. That's often done as an [architecture and security review](/engagement-models/advisory-architecture).

**Do you help with compliance audits?**
We build systems that meet the technical controls auditors look for and provide evidence. We aren't an auditor.

---

### Navigation
**[← Build](/process/build)** · **[Scale & operate: run it, improve it, hand it over →](/process/scale-and-operate)**

---

## Internal links
- Out to: `/process`, `/process/build`, `/process/scale-and-operate`, `/process/discover`, `/engagement-models/advisory-architecture`, `/blog/zero-trust-without-stopping-delivery`
- In from: `/process`, `/industries/fintech`, `/industries/healthcare`
