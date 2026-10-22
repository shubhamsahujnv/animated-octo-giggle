# Project rules

## Copy style

**Never use em dashes (—) in content.** This is a hard rule with no exceptions. It applies to all website copy, meta titles and descriptions, headings, body text, FAQ answers and any other deliverable.

Use instead, depending on the job the dash was doing:

| Instead of an em dash | Use |
|---|---|
| Joining a label to its content (`**Capture** — Zoom, Meet`) | A colon inside the bold: `**Capture:** Zoom, Meet` |
| Separating a step number from its line (`01 · Capture — Every call`) | A full stop: `01 · Capture. Every call` |
| Introducing a list or explanation | A colon |
| A parenthetical aside | Commas, or split into two sentences |
| An abrupt turn in a sentence | A full stop and a new sentence |
| Attribution or a metadata separator | A middle dot (·) |

Avoid en dashes (–) in content too. Write number ranges as "150 to 158" or with a hyphen.

## Customer stories and testimonials

Do not write placeholder testimonials, and do not leave blanks like `[NAME]`, `[TITLE]` or `[COMPANY]` in copy. A blank still implies a testimonial the client may not have.

Write customer scenarios in the second person instead ("You inherit an account in week two of a new job...") and label them *Illustrative scenario.* No name, title, company or quote is then needed. If real references become available, those sections are where they go.

Never invent a customer name, quote, statistic or result.

## Product claims

Every factual claim about the product must be verifiable against the live site or confirmed by the product team. Mark anything unconfirmed as `[CONFIRM: ...]` rather than writing a plausible guess.

Known constraints as of 22 October 2026, verified against lynkk.ai:

- **No CRM sync.** Briefs are copied into Salesforce or HubSpot by hand. Action items go to Jira.
- **Pro is $19 a month** (client-confirmed launch price, replacing the $15 then live).
- **Cue is beta, on Pro, Mac app, by invite**, and is visible on a screen share by design.
- **17 languages** plus Hinglish and auto-detect.
- In-room recording is the **Mac app and the browser**, not a phone.
- **No SOC 2 claim.** The security page lists only what Lynkk does today, and SOC 2 is not on it.

## Deliverables

Client-facing files live in `lynkk-content/client-ready/`. They carry the page URL, meta tags, the copy in page order, image alt text and a short build note. No keyword data, difficulty scores, SEO rationale or working commentary.

The annotated working versions stay in `lynkk-content/`.
