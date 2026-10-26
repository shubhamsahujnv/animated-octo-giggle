# Priority 3, applied: rebalancing the links already there

**I cannot edit the live site from this session** — only
`shubhamsahujnv/animated-octo-giggle` is attached and it holds a README. Attach
the repo that holds the site and I will apply these directly and open a PR.

---

## My plan's assumption about this priority was wrong

`INTERNAL-LINKING-PLAN.md` §Priority 3 said the links to
`zero-trust-without-stopping-delivery` were mostly generic "and security
matters" asides that should be repointed at commercial targets.

I extracted the surrounding sentence for all 12 of them. **That was wrong.**
Eight are genuinely topical, specific, and well placed — least-privilege in the
AI agent posts, landing-zone guardrails in the migration guide, access controls
in the answering-service piece. Repointing those would make the pages worse.

What the audit *did* find is narrower and more serious: **three mismatched or
wasted anchors across all 157 internal edges**, two of which are real defects,
plus three instances of duplicated boilerplate.

So this priority is much smaller than planned — and one of the two defects is on
your highest-impression page.

---

## Part A — Two real defects

### A1. `best-seo-agencies-australia` — the worst one

This page has **2,982 GSC impressions** (your largest single source) at position
75. It has exactly **one** internal blog link, and it is this:

```html
It does SEO and <a href="https://pixoramagroup.com/blog/rag-that-survives-contact-with-users" rel="noreferrer">AI search</a> only, has won <strong>4 APAC Search Awards</strong>
```

The phrase "AI search" — inside a sentence describing **StudioHawk's service
offering** — links to your engineering essay about RAG retrieval chunking.

Three things wrong with it:

1. **It misleads the reader.** Someone clicking "AI search" while reading about
   an SEO agency expects to learn about AI search as a service. They land on a
   post about retrieval quality in production LLM systems.
2. **It attributes a third party's service to your content.** The link makes
   StudioHawk's "AI search" offering read as something you are documenting.
3. **It is this page's only internal link.** Your biggest impression source
   passes equity nowhere useful.

**Fix — remove the link, keep the sentence:**

```html
It does SEO and AI search only, has won <strong>4 APAC Search Awards</strong>
```

Then let the Related reading block from priority 2 carry this page's outbound
links, where they belong.

---

### A2. `what-is-a-fractional-cto` — misleading anchor in a table cell

Inside the "What is a fractional CTO responsible for day to day?" table:

```html
<tr><td>Risk</td><td>Security, <a href="https://pixoramagroup.com/blog/zero-trust-without-stopping-delivery" rel="noreferrer">compliance readiness</a>, uptime, key-person risk</td></tr>
```

The anchor "compliance readiness" points at a post about zero-trust controls in
delivery pipelines. Compliance readiness is not what that post is about, and a
table cell listing CTO responsibilities is a poor link context — the reader is
scanning a reference table, not following an argument.

**Fix — unlink the table cell:**

```html
<tr><td>Risk</td><td>Security, compliance readiness, uptime, key-person risk</td></tr>
```

If you want the zero-trust link on this page, it belongs in prose. There is a
natural place in the same section, after the table:

```html
<p>Risk is the responsibility founders most often underestimate, because it is
invisible until it is not. The security half of it is better engineered into
delivery than bolted on before a funding round, which is the case we make in
<a href="/blog/zero-trust-without-stopping-delivery" rel="noreferrer">zero-trust without bringing delivery to a halt</a>.</p>
```

---

## Part B — One wasted anchor

### B1. `react-native-vs-flutter` — "this post"

```html
Our own view on shipping one product to two platforms without doubling headcount is in <a href="/blog/shipping-mobile-on-two-platforms" rel="noreferrer">this post</a>, which covers the team structure rather than the framework choice.
```

The destination is correct and the sentence is good. The anchor is just wasted —
"this post" describes nothing. The descriptive phrase is sitting right next to
it, unlinked.

**Fix — move the anchor onto the description:**

```html
Our own view on <a href="/blog/shipping-mobile-on-two-platforms" rel="noreferrer">shipping one product to two platforms without doubling headcount</a> covers the team structure rather than the framework choice.
```

Not a defect, and worth two minutes.

---

## Part C — Three instances of duplicated boilerplate

The same sentence appears, near-verbatim, in the "what matters more than
location" list on three different listicles:

| Page | Current text |
|---|---|
| `best-ai-automation-agencies-...` | "**Security practice**, which we treat as part of delivery rather than an add-on, as described in …" |
| `top-saas-development-companies-usa-australia` | "**Security practice**, which we build into delivery as described in …" |
| `top-mobile-app-development-companies-usa` | "**Security:** documented access controls, which we treat as part of delivery, as described in …" |

All three link to zero-trust with the identical anchor "zero-trust without
bringing delivery to a halt". The links are not *wrong* — security is a genuine
selection criterion in all three lists — but near-duplicate sentences across
pages are a weak signal, and three identical anchors is the kind of pattern
worth not having.

Keep one as-is. Differentiate the other two, which is also where the two
additions my plan named belong.

### C1. `top-saas-development-companies-usa-australia`

Keep the security point, and add the migration link the plan called for. The
existing `cloud-cost-is-an-architecture-problem` link on this page is well
placed — leave it.

**Replace:**
```html
<li><strong>Security practice</strong>, which we build into delivery as described in <a href="https://pixoramagroup.com/blog/zero-trust-without-stopping-delivery" rel="noreferrer">zero-trust without bringing delivery to a halt</a>.</li>
```

**With:**
```html
<li><strong>Security practice</strong>, engineered into delivery rather than audited in afterwards — the case for that is in <a href="/blog/zero-trust-without-stopping-delivery" rel="noreferrer">security that does not halt delivery</a>.</li>
<li><strong>Infrastructure experience.</strong> A SaaS build usually inherits an existing estate, so ask what they have actually migrated; we set out the sequence in <a href="/blog/cloud-migration-strategy-on-premise-to-cloud" rel="noreferrer">a practical on-premise to cloud migration strategy</a>.</li>
```

### C2. `top-mobile-app-development-companies-usa`

The zero-trust link is the weakest of the three here — documented access
controls matter less in a mobile listicle than cost and framework choice, which
are the questions this reader actually has next.

**Replace:**
```html
<li><strong>Security:</strong> documented access controls, which we treat as part of delivery, as described in <a href="https://pixoramagroup.com/blog/zero-trust-without-stopping-delivery" rel="noreferrer">zero-trust without bringing delivery to a halt</a>.</li>
```

**With:**
```html
<li><strong>Security:</strong> documented access controls, handled as part of delivery rather than a pre-launch scramble.</li>
<li><strong>Cost transparency:</strong> a build quote is a fraction of a three-year total, which we break down in <a href="/blog/mobile-app-development-cost-usa-australia" rel="noreferrer">what an app costs in the USA and Australia</a>.</li>
<li><strong>Framework fit:</strong> ask why they would pick cross-platform or native for your app specifically — the trade-offs are in <a href="/blog/react-native-vs-flutter" rel="noreferrer">React Native vs Flutter</a>.</li>
```

### C3. `best-ai-automation-agencies-...` — leave as-is

This is the one to keep. It is the page priority 1 is driving links *into*, and
its security sentence is the least templated of the three. Changing it adds
risk to the page you are trying to move.

---

## Part D — The 13 links to leave alone

Recording this explicitly, because my own plan said otherwise and someone
following it would degrade these pages.

**Well-placed links to `zero-trust-without-stopping-delivery` (8) — do not touch:**

| Page | Why it works |
|---|---|
| `how-to-build-an-ai-agent` | "least privilege … the same principle behind zero-trust security" — specific and correct |
| `ai-agents-for-business-use-cases` | same least-privilege framing, in the controls list |
| `cloud-migration-strategy-on-premise-to-cloud` | landing-zone security guardrails — exactly the post's subject |
| `how-to-build-saas-product` | RBAC, SSO, audit logs, then "engineering this in rather than bolting it on" |
| `how-to-choose-software-development-company` | "ask how access, secrets and data are handled" — a real diligence point |
| `ai-answering-service-vs-human-receptionist` | "is access locked down with zero-trust controls?" |
| `rag-vs-fine-tuning` | enterprise data permissions and audit |
| `mobile-app-development-cost-usa-australia` | follows a HIPAA / Privacy Act 1988 compliance point |

**Well-placed links to `rag-that-survives-contact-with-users` (5) — do not touch:**
`how-to-build-an-ai-agent`, `what-is-rag-in-ai`, `top-ai-development-companies-australia`,
`ai-answering-service-vs-human-receptionist`, `ai-agents-for-business-use-cases`.
All five are about grounding and retrieval quality, which is the post's subject.

Both essays stop being pure sinks once the priority 2 blocks are in, so their
high inbound count becomes useful rather than a dead end. That was the real
problem — not the inbound links themselves.

---

## Part E — One consistency item

Internal `href` style is mixed across the site: **123 relative** (`/blog/...`)
against **76 absolute** (`https://pixoramagroup.com/blog/...`).

No SEO impact — both resolve identically and pass equity the same way. It is
worth standardising on **relative** at some point, because it keeps staging and
preview environments working without rewriting links. The priority 2 blocks and
every fix above use relative, matching your existing Related reading blocks.

Not urgent. Do not make a separate pass for it; fix them as pages are edited.

---

## Summary

| | Count | Action |
|---|---|---|
| **Real defects** | 2 | A1 (SEO page, misleading anchor), A2 (fractional CTO table cell) |
| **Wasted anchor** | 1 | B1 (`react-native-vs-flutter` "this post") |
| **Boilerplate** | 3 | C1, C2 rewritten; C3 left alone |
| **Leave alone** | 13 | Part D — my plan was wrong about these |
| **Net new links** | +3 | from C1 and C2 |

Total edits: **6 pages.** Perhaps an hour.

**Do A1 first.** It is one deletion, on the page with 2,982 impressions, and it
is currently sending your highest-volume audience to the wrong article.

---

## After publishing

Re-run the mismatch scan to confirm nothing new has crept in. It is in
`priority-2/` alongside the block generator — the scan logic flags any body link
whose anchor shares no meaningful word with its destination slug, which is how
all three of these were found:

```bash
cd offsite-content/priority-2

# fetch the live pages and scan
python3 scan_anchors.py

# or scan HTML you already have
python3 scan_anchors.py --cache /path/to/fetched/pages
```

It exits non-zero when it finds anything, so it drops into CI as-is. Verified
against the cached pages: it reproduces exactly these three and nothing else.

Three mismatches in 157 edges is a good baseline. Worth re-checking whenever a
batch of posts goes up.

---

## A note on applying the find-and-replace

Every "replace this" block above was checked against the live HTML and appears
**exactly once** on its page, so the replacements are unambiguous.

One caveat: the site serves its HTML minified, with no whitespace between tags.
The blocks above are quoted in that same form. If your CMS stores the source
with line breaks and indentation inside the `<li>` or `<tr>`, a literal
find-and-replace will miss. In that case match on the distinctive text instead —
`"compliance readiness"`, `"AI search"`, `"this post"`, or the
`Security practice` / `Security:` list items — and edit around it.
