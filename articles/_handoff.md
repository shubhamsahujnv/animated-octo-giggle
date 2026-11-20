# Handoff: The Green Solve Article Wave (aeo-article skill)

Generated 2026-11-20. Covers Phases 5–9 of `aeo-article`. The research and keyword checkpoint is in `_research-brief.md`.

## Articles

| File | H1 | Words | H2s | Internal links | Citations |
|---|---|---|---|---|---|
| `carbon-accounting-software-signs.md` | Top 10 Signs Your Business Needs Carbon Accounting Software in 2026 | 1,960 | 7 | 7 | 13 |
| `scope-1-2-3-emissions-examples.md` | Top 15 Scope 1, 2 and 3 Emissions Examples Every Business Should Know in 2026 | 1,845 | 7 | 6 | 8 |
| `iso-14064-carbon-baseline-steps.md` | Top 7 Steps to Build an ISO 14064-1 Carbon Baseline for Manufacturers in 2026 | 1,768 | 7 | 6 | 7 |
| `carbon-accounting-mistakes.md` | Top 9 Carbon Accounting Mistakes to Avoid in 2026 and How to Fix Them | 1,760 | 6 | 6 | 12 |
| `decarbonisation-strategies-manufacturers.md` | Top 10 Decarbonisation Strategies Manufacturers Can Use to Cut Emissions in 2026 | 1,738 | 6 | 8 | 12 |

Each file follows the skill's Phase 9 format: frontmatter, article, `---CITATIONS---`, `---SCHEMA---` (Organization, Article, FAQPage, BreadcrumbList, plus HowTo on the ISO article), and `---FAQ_JSON---`. The schema and FAQ JSON are generated from the visible text, so they match it word for word.

## External links

Every article links out to its authority sources in 3 ways:
- **Descriptive links** on the first mention of each key source, 6–8 per article (for example, "CDP's latest analysis" or "The GHG Protocol's Scope 2 Guidance")
- **Clickable citation markers:** each `[N]` links to its source
- **A visible Sources list** at the end of each article

The `---CITATIONS---` block is unchanged, for publishing tools. All external URLs were checked: most return 200/206. ghgprotocol.org's Scope 3 FAQ and two IEA pages return 403 only to automated clients, and the NSE-hosted SEBI circular timed out from this host, so open those in a browser.

## Automated quality checks (Phase 6): all pass

- **Clip rule:** 85–100% of sections open with a number in the first ~200 characters (skill target ≥50%), and no throat-clearing openers
- **FAQs:** 6 per article, each 40–80 words with a number, no brand mentions
- **Sections:** none over 300 words
- **Brand:** at most 1 mention in each body
- **Formatting:** no em or en dashes in the body (an AI-tell signal), and inline `[N]` citations match the citation list
- **Meta:** `meta_title` ≤60 characters, `meta_description` 150–160 characters, and the primary keyword appears in the meta fields and the first 100 words
- **Length:** word count is within ±10% of the skill's 1,800-word default

## Site findings that changed the plan (corrections to the research brief)

- **The site was rebuilt.** The `.php` pages in the search index (`/carbon-accounting.php`, `/contact.php`, `/net-low.php`, `/sustainability-partner.php`) now return **404**. The homepage is now the Baseline product. Live pages: `/`, `/#contact`, `/netlow`, `/blog`, and 5 journal posts. All internal links now point at these live URLs.
- **The blog exists: *The Baseline Journal*.** The cannibalization check was updated to match:
  - `/blog/scope-3-for-manufacturers-without-a-data-team` overlaps 🟡 with the Scope 3 calculation section of the scopes article. It takes a different angle (an SME sequence, not a methods taxonomy), so I **linked to it instead of competing with it**.
  - `/blog/india-and-us-reporting-what-changes` overlaps 🟡 with the "2026 reporting rules" section of the software article. Same approach: it's linked, not duplicated.
  - No 🔴 conflicts.
- **Brand voice:** the site writes the brand as **TheGreensolve / TGS** and uses **British spelling** (decarbonisation, programme). The articles now match, and `author` is set to "TGS Editorial".
- ⚠️ **Editorial conflict to decide:** the journal's contributor guidelines say *"One argument, made properly. No listicles."* These pieces are listicles because that's what was requested. They may suit a separate content hub or a landing-page cluster better than the Journal itself.
- **Product claims** were checked line by line against the live homepage text: ISO 14064-1:2018 + GHG Protocol, IPCC AR6 100-year GWPs, every emission factor editable, India + US factor packs, dual Scope 2 reporting, row-level evidence review, credit-pathway screening with a 0–100 score, and Net-Low employee engagement. One unsupported word ("versioned" factors) was removed.

## Factual verification (Phase 5.5)

**Round 1: primary-source check.** Each claim was confirmed either by downloading the primary PDF and finding the figure (✅ PDF), or from search excerpts of the primary or official source (✅ search). Nothing was marked verified from memory.

| Claim | Status |
|---|---|
| AR6 GWP100: HFC-134a 1,530; HFC-32 771; N₂O 273 (AR5 HFC-134a 1,300) | ✅ PDF (GHG Protocol GWP table) |
| EPA: natural gas 53.06 kg CO₂/MMBtu; diesel 10.21 kg CO₂/gal | ✅ PDF (EPA Emission Factors Hub 2024) |
| eGRID2022 US average 823.1 lb CO₂/MWh | ✅ PDF |
| Compressed-air leaks 20–30% (poorly maintained), under 10% (well maintained) | ✅ PDF (CAC/DOE fact sheet, 2026 update) |
| Motor systems = 72% of industrial electricity | ✅ PDF (IEA 4E brief) |
| SB 253 first report due 10 Nov 2026; enforcement discretion; assurance optional for the 2026 cycle | ✅ PDF (CARB guidance) |
| SBTi CNZS V2.0 (June 2026, effective 1 Feb 2027): shall recalculate base year; assurance required for Category A | ✅ PDF. **The text was corrected**: an earlier draft overstated assurance as applying to all companies |
| Scope 3 Category 1 methods: supplier-specific, hybrid, average-data, spend-based | ✅ PDF (GHG Protocol Chapter 1) |
| Scope 2 dual reporting | ✅ PDF (Scope 2 Guidance §7.4) |
| GHG Protocol revision poll favouring a 5% threshold (not adopted) | ✅ PDF (May 2025 minutes) |
| CDP: Scope 3 = 26× operational; 92× retail; 15% upstream targets; 2× likelier to measure Scope 1–2 | ✅ search (CDP press release) |
| 15 Scope 3 categories, mutually exclusive within one inventory | ✅ search (GHG Protocol FAQ; the page returns 403 to automated clients) |
| CBAM definitive regime from 1 Jan 2026; 50-tonne threshold; certificate sales from 1 Feb 2027 | ✅ search (European Commission) |
| EU Directive 2024/825 binding from 27 Sep 2026; offset-based product claims banned | ✅ search (EUR-Lex linked) |
| CCTS: FY 2023-24 baseline; 282 plants (Oct 2025); refinery, petrochemicals, textiles added (Jan 2026) | ✅ search (ICAP, PIB) |
| BRSR Core reaches the top 1,000 listed companies in FY 2026-27 | ✅ search. ⚠️ The SEBI/NSE link timed out from this host, so check it in a browser |
| ~75% of heat in less energy-intensive industries is below 200 °C; electricity 4% → 12% of process heat 2024–2030 | ✅ search (IEA, which returns 403 to automated clients) |
| Heat pumps above 200 °C are early prototypes only | ✅ search (Carbon Brief, reporting IEA) |
| EPA GHGRP 25,000 t CO₂e threshold | ✅ search (EPA) |
| SB 253 covers US-formed entities only (US subsidiaries of foreign groups can qualify) | ✅ search (CARB regulation text via law-firm summaries) |
| ISO 14064-1:2018 six categories; part 2 covers projects, part 3 verification | ⚠️ **COULD NOT VERIFY against the ISO text** (paywalled). Consistent across ISO news, ANSI and multiple secondary sources |
| VSD savings ~25% | Marked "(industry estimate)" in the text |

**Rounds 2, 3 and 5** (completeness, internal contradictions, grammar): done by reading every article end to end. Fixes included past-tense SB 253 deadlines (today is 20 Nov 2026), softened ISO-to-Scope-3 mappings, the SBTi assurance nuance, and removal of unsourced numbers. **Round 4** (Search Console heading cannibalization) couldn't run because Search Console isn't connected here.

## Fan-out source per H2 (skill hard rule)

Sources: **AC** = Google Autocomplete, **SERP** = SERP decomposition, **MANDATED** = the skill's required "what happens after" section. ChatGPT query fan-out, People Also Ask and Search Console weren't available.

- **Software:** what is carbon accounting software (AC) · how does carbon accounting work (AC) · carbon accounting spreadsheet/template (AC) · top signs (SERP) · best GHG accounting software (AC) · carbon accounting software India / GHG reporting deadline 2026 (AC) · after (MANDATED)
- **Scopes:** difference between scope 1 2 and 3 (AC) · scope 1 emissions examples (AC) · is electricity scope 1 or 2 (AC) · scope 3 emissions examples (AC) · scope 3 categories 1-15 (AC) · how to calculate scope 3 emissions (AC) · after (MANDATED)
- **ISO baseline:** carbon baseline meaning (AC) · iso 14064-1 vs ghg protocol (AC) · steps (SERP) · iso 14064-1 categories (AC) · base year emissions / recalculation (AC) · carbon footprint calculator for manufacturing (AC) · after (MANDATED)
- **Mistakes:** carbon accounting challenges (AC) · mistakes list (SERP) · emission factors 2026 (AC) · greenwashing examples 2026 (AC) · ghg inventory report (AC) · after (MANDATED)
- **Decarbonisation:** what is decarbonization (AC) · top strategies / how to reduce co2 emissions in manufacturing (AC) · decarbonization levers examples (AC) · india industrial decarbonization strategies / carbon credits for companies (AC) · industrial decarbonization roadmap (AC) · after (MANDATED)

## To do at publish time (skill hard rules)

**1. Sibling cross-links.** These can't be live until the pages exist, and the skill forbids links to not-yet-live URLs. Add them once the articles are published at `/blog/<slug>`:

| From | Add link to | Suggested anchor and spot |
|---|---|---|
| Software (sign 4, Scope 3) | scopes article | "Scope 3 emissions examples" |
| Software (sign 7, refrigerants) | mistakes article | "common carbon accounting mistakes" |
| Software (sign 10, targets) | ISO baseline article | "build an ISO 14064-1 baseline" |
| Scopes (after section) | ISO baseline article | "set a base year" |
| Scopes (Scope 2 FAQ) | mistakes article | "reporting only market-based Scope 2" |
| ISO baseline (step 5) | scopes article | "Scope 1, 2 and 3 examples" |
| ISO baseline (after section) | decarbonisation article | "decarbonisation strategies for manufacturers" |
| Mistakes (mistake 1) | scopes article | "all 15 Scope 3 categories" |
| Mistakes (mistake 7) | ISO baseline article | "base-year recalculation policy" |
| Decarbonisation (strategy 1) | ISO baseline article | "Scope 1 to 3 baseline" |
| Decarbonisation (strategy 1) | software article | "signs you need carbon accounting software" |

With these added, every article reaches 8–10 internal links, inside the skill's 8–14 band.

**2. Inbound links** (hard rule: at least 1–2 from existing live pages). Suggested source pages:
- **Software:** `/blog/india-and-us-reporting-what-changes` ("The part that travels" section)
- **Scopes:** `/blog/scope-3-for-manufacturers-without-a-data-team` (intro or "Start with the four categories")
- **ISO baseline:** `/blog/carbon-credits-are-not-just-for-big-companies` and the homepage "How this works" section
- **Mistakes:** `/blog/scope-3-for-manufacturers-without-a-data-team` ("Spend data is a starting point")
- **Decarbonisation:** `/blog/carbon-credits-are-not-just-for-big-companies` and `/blog/un-article-6-4-n2o-methodology`

Check that each inbound link is live after publishing.

## Banners (Phase 7): done

All 5 banners are in `images/<slug>.jpg` (1200×630 JPEG). Each article's frontmatter now has `featured_image_path`, `featured_image_alt` and `featured_image_size`.

- **Matched to the journal's existing template, not AI-generated.** The live journal posts all use one locked OG template (`/og/<slug>.jpg`). I rebuilt it in HTML and checked it against a live banner: title line positions match within 2px, using the same fonts, colours and tgs mark. This follows the skill's "brand templates locked, composited deterministically" rule and avoids garbled AI text.
- **Byline and date:** "Ankita Patwa · 20 Nov 2026". If the publish date differs, re-render with the template in `images/_template/` (one command).
- **At publish time:** upload each banner as `/og/<slug>.jpg` to match the existing posts, then add an `image` field to the Article JSON-LD. It was left out for now because the skill forbids URLs that aren't live yet.

## Deviations from the skill, stated plainly

- **No DataForSEO volumes and no Search Console data.** Keywords were chosen from autocomplete and intent, not volume.
- **No `/aeo-score` or `/seo-score` run.** Those scoring skills need Unveilr tools. `aeo_score` is left as "not scored", and the Phase 6 checks above were applied by script instead.
- **Phase 8 humanization** was applied while drafting (varied paragraph length, second person, casual connectors, no em dashes). There's no client humanizer for this brand and no `.original` backup. Run `/humanize-verify` if a humanizer is set up.
- **H1s keep "Top N … 2026"** at your request. The skill notes this styling is placed higher but cited somewhat less. Slugs are evergreen (no year).
- **Banners use the house template**, not Seedream; see the Banners section above.
- **Published 20 Nov 2026 on request** (see *Publishing* below).

## Publishing (done 20 Nov 2026, author Ankita Patwa)

Live URLs:
- https://thegreensolve.com/blog/carbon-accounting-software-signs
- https://thegreensolve.com/blog/scope-1-2-3-emissions-examples
- https://thegreensolve.com/blog/iso-14064-carbon-baseline-steps
- https://thegreensolve.com/blog/carbon-accounting-mistakes
- https://thegreensolve.com/blog/decarbonisation-strategies-manufacturers

**How it was published.** thegreensolve.com is a static export of the Lovable "Project Navigator" app, hosted on Hostinger (`public_html`). The Lovable source is older than the live export: the live site has per-post OG images, "| TGS" titles and an enquiry popup that the source lacks. So nothing was rebuilt or redeployed. Instead, files were added over the Hostinger file API:
- `blog/<slug>/index.html` ×5: built by `site-build/build_pages.py` from Ankita's live post as the template (same header, author box, FAQ, CTA and CSS), with a small inline style block for tables, lists and citation links. **The React hydration script is deliberately left out**: the bundled post list doesn't know these slugs, so hydration would replace the article with "not found". Navigation links still work as normal page loads.
- `og/<slug>.jpg` ×5: the banners, used as `og:image`, like the existing posts
- `sitemap.xml` and `llms.txt`: the 5 URLs added. The originals were backed up on the server as `sitemap.xml.backup-2026-11-20` and `llms.txt.backup-2026-11-20` (copies are also in `site-build/backups/`)

**Not yet done (needs an app rebuild).** The blog index (`/blog`), Ankita's author page and the "Related journal" rail on older posts are rendered by React from the bundled post list. Hand-adding cards there would be wiped out by hydration. To list the new articles, add them to `src/content/posts.ts` in the app source, rebuild the static export, and redeploy. Keep these five static pages, or port their content.

**Rollback:** delete `blog/<slug>/` and `og/<slug>.jpg` for the 5 slugs and restore the two `.backup-2026-11-20` files.
