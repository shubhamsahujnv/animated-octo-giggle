# Research Brief: The Green Solve Article Wave (aeo-article skill, Phases 1–4)

Generated 2026-11-20. This covers Phases 1–4 of the `aeo-article` skill. It is the confirmation checkpoint the skill requires before Phase 5, the writing phase.

> ⚠️ **Superseded in part (2026-11-20, during writing):** the live site was checked directly and turned out to be rebuilt. The `.php` pages below now 404; the homepage is the Baseline product; a blog (*The Baseline Journal*) exists with 5 posts; the brand is written TheGreensolve/TGS in British English. Cannibalization was re-rated (two 🟡 overlaps, handled by linking). See `_handoff.md` → *Site findings that changed the plan*.

## What could and couldn't be run here

| Skill step | Status | Substitute used |
|---|---|---|
| Phase 1: project context (Unveilr DB via kubectl) | ❌ No Unveilr project_id, cluster or DB access | Public pages of thegreensolve.com, found through web search (the site returns HTTP 403 to automated fetches) |
| Phase 2: DataForSEO keyword volumes | ❌ No DataForSEO credentials | Google Autocomplete (fan-out source 3) plus SERP decomposition (source 4). **No search volumes**, so keywords are picked by intent and autocomplete presence |
| Fan-out source 1 (`get_chatgpt_qfo`) / source 2 (PAA) / source 5 (GSC) | ❌ Not available | Sources 3 and 4 only. Each H2 below is tagged with its source |
| Phase 3: GSC cannibalization | ❌ No GSC connection, so it was skipped (the skill allows this when GSC isn't connected) | `site:thegreensolve.com` audit (see below) |
| Phase 4: deep research | ✅ Done with WebSearch, using primary sources where available | — |
| Phase 7: Seedream banner (Novita) | ❌ No API key | Skipped. A banner prompt and alt text are provided per article |
| Phase 8: humanizer | ⚠️ No client humanizer exists for this brand | Model-side rewrite following the skill's Phase 8 rules |

## Phase 1: Brand context (from the live site's indexed pages)

- **Brand:** The Green Solve (TGS). Positions itself as a platform that simplifies carbon accounting and ESG compliance using AI and blockchain.
- **Markets:** India and the US. Baseline ships India and US emission-factor packs, and the contact number is +1 (312). Compliance coverage named on the homepage: SEC climate disclosure rules, EPA GHGRP, BRSR.
- **Products and pages (all live per search index):**
  - `/` (homepage): Measure / Comply / Act. Also the "1000 Initiative", which aims to help 1,000 businesses with sustainability by 2027
  - `/carbon-accounting.php` (**Baseline**): carbon intelligence for manufacturers. Scope 1–3 inventory per **ISO 14064-1:2018 + GHG Protocol Corporate Standard**, **IPCC AR6 100-year GWPs**, editable emission factors, country-switching grid factors, project screening against India and US carbon-credit programmes with a **0–100 score** (additionality, baseline, MRV, fit)
  - `/net-low.php` (**Net-Low**): employee engagement. Logged green actions are aggregated into company-level offsets, with challenges and an ESG reporting dashboard
  - `/sustainability-partner.php`: partner network (renewables, waste, sustainable agriculture) and access to carbon experts
  - `/contact.php`
- **Voice (inferred, no writing_style available):** professional, approachable, plain English. US spelling, because the site and its US phone number suggest a US audience.

## Phase 3: Cannibalization verdict

`site:thegreensolve.com` returns 5 pages and **no blog or article pages**. No existing page targets any keyword below as an informational query. Baseline (`/carbon-accounting.php`) is the commercial page, so the articles **link to it** and do not target its head term ("carbon accounting platform for manufacturers"). **Verdict: 🟢 for all five topics** (no GSC, so this is unconfirmed by impression data).

⚠️ **Internal-link shortfall (flag):** the skill wants 8–14 internal links, but the domain has only 5 live pages. Sibling cross-links between these five articles can't be added as hyperlinks until the articles are published, because the skill forbids links to not-yet-live URLs. Each article lists its sibling cross-links in its handoff, to be added after publishing.

## Winnability screen (ChatGPT search-trigger)

All five H1s include **"Top" and "2026"** (as you asked earlier). Per the skill's table, year prompts trigger web search ~100% of the time and "top" prompts 92%, so all five are **winnable for AI citation**.
Trade-off the skill notes: "Top N" styling ranks higher but gets **cited less at equal position**, and the year slightly hurts citation. Per the skill, **slugs stay evergreen (no year)**.

## Keyword + fan-out plan

Source tags: **AC** = Google Autocomplete, **SERP** = SERP/competitor decomposition.

### Article 1: carbon accounting software (listicle: signs/reasons)
- H1: *Top 10 Signs Your Business Needs Carbon Accounting Software in 2026*
- Primary: `carbon accounting software` · Secondary: `carbon accounting spreadsheet`, `ghg accounting software`, `carbon accounting software india`, `how does carbon accounting work`
- Fan-out H2s: what is carbon accounting software (AC) · how does carbon accounting work (AC) · carbon accounting spreadsheet / template: is it enough (AC) · top signs you need software (SERP) · best ghg accounting software features (AC) · carbon accounting software pricing (AC) · carbon accounting software india (AC)

### Article 2: Scope 1, 2, 3 examples
- H1: *Top 15 Scope 1, 2 and 3 Emissions Examples Every Business Should Know in 2026*
- Primary: `scope 1 2 3 emissions examples` · Secondary: `what is included in scope 3 emissions`, `scope 3 categories list`, `is purchased electricity scope 2`, `scope 1 emissions refrigerants`
- Fan-out H2s: what is the main difference between scope 1 2 and 3 emissions (AC) · scope 1 emissions examples (AC) · is electricity scope 1 or 2 (AC) · scope 3 emissions examples (AC) · scope 3 categories 1-15 (AC) · how to calculate scope 3 emissions (AC) · refrigerant emissions scope 1 (AC)

### Article 3: ISO 14064 baseline
- H1: *Top 7 Steps to Build an ISO 14064-1 Carbon Baseline for Manufacturers in 2026*
- Primary: `carbon baseline` · Secondary: `iso 14064-1`, `base year emissions`, `iso 14064-1 vs ghg protocol`, `iso 14064-1 categories`, `iso 14064 certification`
- Fan-out H2s: carbon baseline meaning (AC) · iso 14064-1 vs ghg protocol (AC) · iso 14064-1 categories (AC) · base year emissions / recalculation (AC) · carbon footprint calculator for manufacturing (AC) · iso 14064-3 verification / certification cost (AC)

### Article 4: carbon accounting mistakes
- H1: *Top 9 Carbon Accounting Mistakes to Avoid in 2026 and How to Fix Them*
- Primary: `carbon accounting mistakes` · Secondary: `double counting scope 3 emissions`, `market based vs location based scope 2`, `emission factors 2026`, `base year recalculation`
- Fan-out H2s: double counting scope 3 emissions (AC) · market based vs location based scope 2 (AC) · emission factors 2026 / database (AC) · refrigerant emissions scope 1 (AC) · base year recalculation ghg protocol (AC) · carbon offset vs reduction (AC) · greenwashing examples 2026 (AC) · ghg reporting deadline 2026 (AC) · unit / boundary errors (SERP)

### Article 5: decarbonization for manufacturers
- H1: *Top 10 Decarbonization Strategies Manufacturers Can Use to Cut Emissions in 2026*
- Primary: `decarbonization strategies` · Secondary: `industrial decarbonization strategies`, `how to reduce co2 emissions in manufacturing`, `industrial heat pumps`, `waste heat recovery system`, `carbon credits for companies`
- Fan-out H2s: what is decarbonization (AC) · how to reduce co2 emissions in manufacturing (AC) · decarbonization levers examples (AC) · industrial heat pumps explained (AC) · waste heat recovery system (AC) · carbon credits for companies (AC) · industrial decarbonization roadmap (AC) · india industrial decarbonization strategies (AC)

## Verified fact anchors (Phase 4 / Round 1 inputs)

| # | Claim | Source |
|---|---|---|
| F1 | Scope 3 supply-chain emissions average **26×** operational (Scope 1+2) emissions (2023 CDP disclosures). Retail averages 92× | CDP/BCG June 2024: https://www.cdp.net/press-releases/corporates-supply-chain-scope-3-emissions-are-26-times-higher-than-their-operational-emissions |
| F2 | Only **15%** of CDP disclosers have set upstream Scope 3 targets | same as F1 |
| F3 | GHG Protocol Scope 3 Standard has **15 categories** (8 upstream, 7 downstream), designed to be mutually exclusive | https://ghgprotocol.org/scope-3-frequently-asked-questions |
| F4 | Scope 2 Guidance (2015) requires **dual reporting** (location- and market-based) for companies with operations in markets with contractual instruments. The method is under revision; the current requirement stands | https://ghgprotocol.org/sites/default/files/2023-03/Scope%202%20Guidance.pdf |
| F5 | ISO 14064-1:2018 uses **6 categories**: (1) direct, (2) imported energy, (3) transportation, (4) products used by the organization, (5) use of the organization's products, (6) other | Vendor explainers consistent with ISO/TS 14064-4:2025 preview (secondary: **COULD NOT VERIFY against the ISO text**, which is paywalled) |
| F6 | AR6 GWP100: HFC-134a **1,530**, HFC-32 **771**, fossil CH₄ **29.8**, N₂O **273** | GHG Protocol GWP table (Aug 2024): https://ghgprotocol.org/sites/default/files/2024-08/Global-Warming-Potential-Values%20%28August%202024%29.pdf |
| F7 | Compressed-air leaks can waste **20–30%** of compressor output in poorly maintained systems; well-maintained systems should be under 10% | DOE/Compressed Air Challenge Fact Sheet 7: https://www.compressedairchallenge.org/data/sites/1/media/library/factsheets2026/fact-sheet-7-compressed-air-system-leaks_updated2026.pdf |
| F8 | Electric motor systems use **72%** of industrial electricity | IEA 4E policy brief (Dec 2025): https://www.iea-4e.org/wp-content/uploads/2025/12/4E-Policy-Brief-EMSA-9-20251218.pdf |
| F9 | ~**75%** of heat demand in less energy-intensive industries is below **200 °C** (heat-pump range) | IEA commentary: https://www.iea.org/commentaries/can-low-temperature-heat-in-factories-be-electrified-competitively |
| F10 | Electricity's share of global industrial process heat is forecast to go from **4% (2024) to 12% (2030)** | IEA Renewables 2025: https://www.iea.org/reports/renewables-2025/renewable-heat |
| F11 | EU CBAM definitive regime began **1 January 2026**. Importers over the **50-tonne** threshold need authorised-declarant status. Certificate sales start **1 February 2027** | European Commission: https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en |
| F12 | California SB 253: companies with **>$1B** revenue doing business in CA report Scope 1 and 2. First deadline moved to **10 November 2026**. Scope 3 from 2027 | CARB: https://ww2.arb.ca.gov/node/49176 |
| F13 | SEBI BRSR Core glide path reaches the **top 1,000** listed companies in **FY 2026-27**. "Assessment or assurance" wording since the March 2025 circular | SEBI circular via NSE: https://nsearchives.nseindia.com/web/sites/default/files/inline-files/SEBI_Circular_12072023.pdf |
| F14 | India CCTS (2023): GHG emission-intensity targets notified for aluminium, cement, chlor-alkali, pulp & paper (Oct 2025; **282** plants), then refinery, petrochemicals, textiles, secondary aluminium (Jan 2026; **208** entities). FY 2023-24 baseline | PIB: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2217239 · ICAP: https://icapcarbonaction.com/en/news/india-notifies-emission-intensity-targets-nine-sectors-under-carbon-credit-trading-scheme |
| F15 | Base-year recalculation is required for significant structural changes. GHG Protocol is **polling a 5%** significance threshold (draft, not adopted) | GHG Protocol CS revision minutes: https://ghgprotocol.org/sites/default/files/2025-05/CS-group1-Meeting7-Minutes-20250513.pdf |

Not used, because they couldn't be verified: an "IEA: heat = two-thirds of industrial energy" figure (no source found), and AR6 values for the R-404A/R-410A blends (no clean primary source).
