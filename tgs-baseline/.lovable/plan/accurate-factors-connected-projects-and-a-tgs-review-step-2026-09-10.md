# Accurate factors, connected projects, and a TGS review step

Three changes to the Baseline app, all inside the existing single-file app so nothing else moves.

## 1. Real, current emission factors

Refresh every factor in the GHG inventory with published values and show where each one comes from.

- Replace the fuel, refrigerant, travel, freight, waste, water and material factors with the latest published sets: UK DESNZ 2025 conversion factors, US EPA GHG Emission Factors Hub, IPCC AR6 100-year GWPs for refrigerants and gases, IEA/CEA/eGRID/EEA national grid factors for electricity.
- Add a source and vintage to each factor (for example "DESNZ 2025", "EPA 2025", "CEA 2024-25", "IPCC AR6"), shown in the factor list and carried into the CSV export and the annual report so a reviewer can trace every number.
- Grid list expanded and refreshed with the newest published national averages, each labelled with its source year.
- Factors stay editable; the published value remains visible as the default so an edited number is obvious.

## 2. Add project tab connected to the pipeline

The form already captures cost, annual emission reduction, additionality, baseline/monitoring and credit screening. The work is to connect it to the footprint.

- New "Which part of your footprint does this cut?" field on the project form: pick one or more inventory categories (for example 1.1 Stationary combustion, 2.1 Purchased electricity, 3.4 Upstream transport). Options come straight from the inventory, so only categories you actually report appear first.
- Show live context next to that field: current emissions for the chosen category, and what the entered annual reduction represents as a share of it. Flags a reduction larger than the measured category so unrealistic entries get caught.
- Cost per tonne abated (capex / lifetime reduction) shown on the project card alongside payback and the credit screening result.
- Portfolio dashboard gains a line under the footprint panel: total annual reduction planned across projects, the residual footprint after those projects, and how many hotspot categories still have no project against them, each linking to the Add project form pre-filled with that category.
- Credit opportunities screening reads the same category link, so a project's screening result is traceable back to the measured emissions it targets.

## 3. TGS review tab

A new tab between "Credit opportunities" and "Permits & consent" that holds the submission workflow.

- Submit for review: choose the reporting year, attach the draft report snapshot (totals, factors used, activity register), add a note, and submit. Status becomes Submitted, with a timestamp.
- Review queue: a reviewer view where an item is marked Approved or Rejected, with required reviewer name, date, and comments. Rejection lists the discrepancies to fix and sends the item back to Draft so data can be corrected and re-submitted.
- Status trail on every submission: Draft → Submitted → Under review → Approved / Rejected, with each transition timestamped and commented, kept as an audit history.
- An approved submission unlocks the final report export: same annual report, watermark removed, stamped with approval reference, reviewer name, and approval date, marked submission-ready. Anything not approved still exports with the DRAFT — NOT FOR SUBMISSION watermark.
- Portfolio dashboard shows the current review status and a link to the tab.

## Technical notes

All work stays in `index.html`. Factor tables gain two fields (source, vintage) which the existing `ef()`, CSV export, and annual report builders read. Project records gain a `ghgLinks` array of category ids plus derived cost-per-tonne. Review submissions persist in localStorage under their own key alongside the existing project, permit and GHG state, and are included in the existing JSON backup export/import.

## Open point

Reviewer approval here is a role inside this browser, not a separate logged-in TGS account — the app stores data locally with no server. If real TGS staff need to review submissions on their own machines, that needs a backend with accounts; say the word and I can plan that separately.
