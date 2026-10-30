# Data centre video scripts, part 2

Five more short-form scripts (Scripts 6–10), following on from `Data centre video scripts.md`. Each is built on **one insight from the research notes** that Part 1 did not cover. Facts are as of **30 October 2026**.

> Sourcing caveat: most figures come from search-result extracts of the cited pages, because the research tools could not open many source pages in full. Check headline numbers against the primary source before publishing. ⚠️ marks secondary, conflicting or unverified items. The voiceover hedges them or leaves them out.

---

## New insights found for this batch

| # | Insight | Key figure | Date / source | Script |
|---|---|---|---|---|
| 6 | Efficiency gains are real, yet total power use keeps climbing (the Jevons paradox) | Google's electricity rose 37% in 2025 even as it reported per-prompt energy at 0.24 Wh. Google's data-centre electricity grew 3.7x (2016–22) vs 2.5x globally | ESG Dive (2026); Google (Aug 2025); arXiv 2411.11540 | ✅ 6 |
| 7 | Most of a data centre's carbon is in the building and chips, not the electricity | Scope 3 is ~80% (Google) to ~86% (Microsoft) of footprints. Construction alone was ~2.3 Mt for Google in 2025 | ESG Dive; Microsoft 2026 ESR | ✅ 7 |
| 8 | Thousands of diesel generators sit under "minor" permits | 13,500+ backup generators in Virginia; 189 of 197 data-centre air permits are "minor". One campus ran diesel for ~24h during a Code Red smog alert | Technical.ly; EPOnline, 15 Oct 2026 | ✅ 8 |
| 9 | Europe throws away almost all data-centre heat | Only 67 EU data centres reported any waste-heat reuse in the first reporting round | Freshfields on EU rating scheme, Sep 2026 | ✅ 9 |
| 10 | "AI will cut 5–10% of emissions" traces back to one consultancy blog | The 2021 BCG blog, repeated in a 2023 report Google commissioned. A Feb 2026 review found no verified material cuts from generative AI | arXiv 2506.15572; Beyond Fossil Fuels / Euronews, Feb 2026 | ✅ 10 |

---

## Script 6: "AI got 33x more efficient. So why is it using more power?"

- **Thumbnail text:** "More efficient = more power?"
- **Core insight:** Each AI prompt is getting cheaper in energy terms, and that cheapness is exactly why total data-centre electricity keeps rising.
- **Runtime:** ~115 seconds

| Time | Voiceover | On-screen / B-roll |
|---|---|---|
| 0–5s | "Google says its AI prompts now use 33 times less energy than a year ago. Its electricity use still went up 37%." | "−33x per prompt" vs "+37% total". |
| 5–25s | "Per prompt, AI is becoming remarkably efficient. Google puts a median Gemini text prompt at about 0.24 watt-hours, roughly a few seconds of a microwave." | Phone typing a prompt; tiny energy bar. |
| 25–45s | "But in 2025, Google's total electricity demand rose 37%. This isn't new. Between 2016 and 2022, Google's data-centre electricity grew 3.7 times, faster than data centres worldwide, despite efficiency gains." | Line chart: Google ×3.7 vs global ×2.5. |
| 45–65s | "Economists call this the Jevons paradox. When something gets cheaper to use, we use far more of it. Cheaper AI means AI in every app, every search, every email." | 1865 coal-and-steam illustration morphing into server racks. |
| 65–85s | "And the building itself has little efficiency left to give. PUE measures how much extra power a data centre uses beyond its computers. The industry average is about 1.5, and newer large sites are about 1.36. That's close to the practical limit." | PUE gauge: 1.52 average, 1.36 capacity-weighted. |
| 85–100s | "So the IEA expects global data-centre electricity to roughly double, from about 485 terawatt-hours in 2025 to about 950 by 2030." | Bar: 485 → 950 TWh. "≈1.5% → ≈3% of world electricity". |
| 100–115s | "Efficiency is good. But it doesn't replace limits, clean power or honest reporting. Next time a company boasts 'more efficient AI', ask: and total use? Follow for more." | End card: "Efficient… but total?" |

**Fact sheet**
- Google median Gemini text prompt: 0.24 Wh (Aug 2025 disclosure). Google claims a 33x energy cut in a year. Source: Google technical paper via scope2_scope3 notes. ⚠️ Not independently verified; no token count given.
- Google electricity demand +37% in 2025. Source: ESG Dive (Google 2026 Environmental Report).
- Google's data-centre electricity grew 3.7x (2016–2022) vs 2.5x globally. Source: arXiv 2411.11540.
- PUE: 1.52 industry average, 1.36 capacity-weighted. Source: Uptime Institute 2026 survey.
- IEA (Apr 2026): 485 TWh in 2025 (~1.5%), ~950 TWh by 2030 (~3%).
- The microwave comparison is an illustrative analogy (~0.24 Wh ≈ 1 second of a ~1 kW microwave). Adjust the wording to "about a second" if you want to be precise.

---

## Script 7: "The carbon is in the concrete (and the chips)"

- **Thumbnail text:** "80% of the carbon isn't the electricity"
- **Core insight:** Renewable certificates only cover electricity. Most of a hyperscaler's footprint comes from building data centres and making chips, and that share is growing.
- **Runtime:** ~120 seconds

| Time | Voiceover | On-screen / B-roll |
|---|---|---|
| 0–5s | "Even if every data centre ran on 100% clean power, about 80% of Big Tech's carbon would still be there." | "80%" with a concrete-pour shot. |
| 5–25s | "Climate reports split emissions into scopes. Scope 3 is everything in the supply chain: steel, concrete, servers, chips. In 2025, Scope 3 was about 80% of Google's footprint. For Microsoft in fiscal 2025, it was about 86%." | Pie charts: Google 80%, Microsoft 86%. |
| 25–45s | "For Google, just constructing data centres caused about 2.3 million tonnes of CO₂ in 2025, around a fifth of its whole supply-chain footprint." | Crane time-lapse. "Construction ≈ 2.3 Mt". |
| 45–70s | "Then there are the chips. NVIDIA's own footprint estimate for one H100 board of eight GPUs is about 1.3 tonnes of CO₂ before it's ever switched on. The newer B200 board is about 2.3 tonnes. NVIDIA's Scope 3 nearly doubled in a year, to about 6.9 million tonnes." | GPU board render. Bars 1,312 kg → 2,274 kg. "NVIDIA Scope 3: 3.6 → 6.9 Mt". |
| 70–85s | "And the factories that make the chips? TSMC's direct emissions rose from about 1.6 million tonnes in 2023 to about 2.2 million in 2025, including super-potent fluorinated gases." | Cleanroom B-roll. Line rising 1.60 → 1.83 → 2.20 Mt. |
| 85–100s | "When the hardware is retired, it becomes waste. A Nature study estimated that generative AI could create 1.2 to 5 million tonnes of e-waste between 2020 and 2030." | E-waste pile. "1.2–5 Mt cumulative, 2020–2030". |
| 100–110s | "There are fixes. Microsoft is building data centres partly from timber and estimates about 35% less embodied carbon than steel construction, a design estimate, not yet measured." | Timber frame shot. "−35% (design estimate)". |
| 110–120s | "So '100% renewable' is the start, not the finish. The real climate test for AI is what it takes to build it. Follow for part 8." | End card: "Built carbon counts." |

**Fact sheet**
- Google 2025: Scope 3 ~11.6 Mt, ~80% of ~14.5 Mt total. Construction ~2.3 Mt (~20% of Scope 3). Source: ESG Dive; The Planet Brief.
- Microsoft FY25: Scope 3 ~85.8% of ~20.3 Mt. Source: BiocharToday summary of the Microsoft 2026 ESR. ⚠️ Secondary summary.
- NVIDIA HGX H100 8-GPU baseboard ~1,312 kgCO₂e (partial-scope PCF). Source: Introl; arXiv 2607.05408. ⚠️ Secondary.
- HGX B200 baseboard ~2,274 kgCO₂e. Source: MECLA, Apr 2026. ⚠️ Via MECLA, not NVIDIA directly.
- NVIDIA Scope 3: 3,638,432 t (FY24) → 6,912,577 t (FY25). Source: NVIDIA FY2025 Sustainability Report.
- TSMC gross Scope 1: 1,596,031 t (2023), 1,825,872 (2024), 2,196,516 (2025). PFCs 335,714 → 403,167 t. Source: TSMC SASB index; TSMC 2025 SR.
- E-waste: 1.2–5.0 Mt cumulative 2020–2030 (Wang et al., Nature Computational Science, 28 Oct 2024). Do not say "5 Mt per year".
- Microsoft timber data centres: ~35% less embodied carbon than steel, ~65% less than precast concrete (design estimates). Source: Microsoft Source, 2024.

---

## Script 8: "13,500 diesel generators and a 'minor' permit"

- **Thumbnail text:** "Diesel during a smog alert?!"
- **Core insight:** Behind the clean-cloud image, Virginia's data centres sit on thousands of diesel backup generators, mostly under "minor" air permits. When one campus ran them for a day during a smog alert, the regulator said it had no power to stop it.
- **Runtime:** ~120 seconds

| Time | Voiceover | On-screen / B-roll |
|---|---|---|
| 0–5s | "During a Code Red smog alert, a data centre ran diesel generators for almost 24 hours. The regulator said it couldn't stop them." | Hazy skyline. "CODE RED" alert banner. |
| 5–25s | "Every data centre needs backup power in case the grid fails, usually huge diesel generators. Virginia, the world's biggest data-centre hub, has more than 13,500 of them, nearly half in one county: Loudoun." | Map of Loudoun dotted with generator icons. "13,500+". |
| 25–45s | "A review found 189 of Virginia's 197 data-centre air permits are classed as 'minor'. That's a lighter category of oversight." | Stamp: "MINOR" ×189 of 197. |
| 45–65s | "In July 2026, Vantage's campus in Sterling lost its gas-turbine plant and switched to diesel backup for nearly a day, during a Code Red air-quality alert. It used an emergency exemption. Virginia's environmental regulator later said it had no authority to stop it." | Timeline of the day. Quote card: "no authority to stop". |
| 65–80s | "Neighbours also complain about the noise. One resident measured about 60 decibels at his property line, against a reported night limit of 55. In July, Loudoun's supervisors asked staff to find ways to regulate existing generators." | Sound-meter animation 60 dB vs 55 dB. Council meeting B-roll. |
| 80–100s | "This is why the backlash is growing. One tracker, Data Center Watch, counted about $130 billion of US projects blocked or delayed in the first quarter of 2026 alone, and another $68 billion in the second. Virginia's huge Digital Gateway project was killed in court. More than half of Indiana's counties now restrict data centres." | Counter "$130B (Q1)", "$68B (Q2)". "Digital Gateway: dead". Indiana map half shaded. |
| 100–112s | "To be fair, backup generators rarely run, and they exist to keep hospitals' and banks' data online. But rare isn't never, and the rules were written for a far smaller industry." | Text: "Rare ≠ never." |
| 112–120s | "Would you want 100 diesel generators next door? Tell me below." | End card: "Next door?" |

**Fact sheet**
- 13,500+ backup generators in Virginia, nearly half in Loudoun. 189 of 197 data-centre air permits are "minor" (91 in Loudoun), per a WUSA9 review. Source: Technical.ly.
- Vantage VA2, Sterling: diesel for nearly 24 hours during a Code Red alert (July 2026) under an emergency exemption, after its gas-turbine plant failed. DEQ said it had no authority to stop it. Source: EPOnline, 15 Oct 2026.
- Noise ~60 dB vs a reported 55 dB night limit (resident's own measurement). Source: Patch; WJLA. ⚠️ Resident measurement.
- Loudoun supervisors (22 Jul 2026) asked staff to explore regulating existing generators. Source: The Cool Down.
- Data Center Watch: ~$130B (75 projects) blocked or delayed in Q1 2026; $68B (45) in Q2 2026. Sources: Data Center Watch; Bloomberg, 21 Sep 2026.
- Prince William Digital Gateway ended after QTS withdrew (July 2026). Source: WTOP.
- More than half of Indiana counties restrict data centres. Source: WFYI, 21 Oct 2026.
- "Rarely run" is a general characterisation, not a sourced statistic. ⚠️ Keep it as framing.

---

## Script 9: "Europe's data centres are heating the sky"

- **Thumbnail text:** "Only 67 reuse their heat"
- **Core insight:** Almost all of the electricity a data centre uses ends up as heat. Across the EU, only 67 sites reported reusing any of it, and Germany is now loosening its rules.
- **Runtime:** ~115 seconds

| Time | Voiceover | On-screen / B-roll |
|---|---|---|
| 0–5s | "Every data centre is basically a giant heater. In Europe, almost all that heat is thrown away." | Thermal-camera shot of a data centre glowing. |
| 5–25s | "The EU now makes data centres report their energy, water and heat reuse. In the first reporting round, only 67 data centres reported reusing any waste heat at all." | EU map; "67" highlighted. |
| 25–45s | "Where it works, it really works. In Stockholm, the city's heat utility buys heat from more than 30 data centres, and that heat is worth about 2 million Swedish krona per megawatt per year to the sellers. In Denmark, Meta's Odense site heats about 11,000 homes." | Stockholm skyline; heat-pipe animation into homes. "~11,000 homes". |
| 45–65s | "In Finland, energy company Fortum and Microsoft are building the biggest version yet. When it's complete, data-centre heat should cover about 40% of district heating for around 250,000 people near Helsinki. Microsoft's heat starts flowing from 2027." | Espoo aerial; "40% · ~250,000 users · from 2027". |
| 65–85s | "Germany wrote this into law. New data centres must reuse 10%, then 15%, then 20% of their energy as heat. But in June 2026 the government approved changes that loosen efficiency limits and add exemptions. Final approval was still pending in October." | Law text overlay; arrows 10 → 15 → 20%; "loosened?" stamp. |
| 85–100s | "The catch: heat reuse needs a district-heating network next door. In hot places like Arizona, India or Malaysia, there's little use for the heat, so there the bigger fight is over water." | Split map: cold Nordics vs hot regions. |
| 100–115s | "From 2027, the EU plans A-to-G labels for data centres, like the ones on fridges, with a 'waste heat reuse ready' status. Should every new data centre be forced to heat homes? Comment below." | Mock energy label A–G. End card. |

**Fact sheet**
- Only 67 data centres reported some waste-heat reuse in the first EED reporting period. EU rating scheme adopted 21 Sep 2026; proposed A–G labels with "waste heat reuse ready" status from Aug 2027. Sources: Freshfields; European Commission, 21 Sep 2026. ⚠️ Label start date is proposed.
- Stockholm Exergi: 30+ data centres from 16 providers; heat worth ~SEK 2m per MW per year. Source: Eurelectric.
- Meta Odense: ~11,000 households (some sources say 12,000+). ⚠️ Secondary.
- Fortum–Microsoft, Espoo/Kirkkonummi: plants started 6 May 2026; Microsoft heat from 2027; ~40% of ~2 TWh/yr for ~250,000 users. Source: DCD.
- Germany EnEfG: heat reuse 10% / 15% / 20% for new sites from 1 Jul 2026 / 2027 / 2028. The cabinet amendment of 24 Jun 2026 relaxes PUE limits and adds exemptions; passage was unconfirmed as of 30 Oct 2026. Sources: MVV; CMS; cloudmagazin.
- "Almost all electricity becomes heat" is basic physics, not a sourced statistic in the notes.

---

## Script 10: "Where does 'AI will save the climate' come from?"

- **Thumbnail text:** "The 5–10% claim, traced"
- **Core insight:** The most-quoted claim that AI could cut 5–10% of global emissions traces back to a single 2021 consultancy blog post. A 2026 review couldn't find a single verified material cut from generative AI.
- **Runtime:** ~115 seconds

| Time | Voiceover | On-screen / B-roll |
|---|---|---|
| 0–5s | "'AI could cut 5 to 10% of global emissions.' You've heard it. I traced where it comes from." | Headline collage with the 5–10% stat. Magnifying glass. |
| 5–25s | "The number goes back to a 2021 blog post by the consultancy BCG, extrapolated from its own client projects. It was then repeated in a 2023 BCG report that Google commissioned." | Document trail: 2021 blog → 2023 report → headlines. |
| 25–45s | "Researchers reviewing AI climate claims in 2025 said extrapolating from a handful of projects to the whole planet's emissions 'lacks any scientific grounding'." | Quote card from the arXiv paper. |
| 45–65s | "In February 2026, a report by campaigners looked for real cases where tools like ChatGPT, Gemini or Copilot had cut emissions in a material, verifiable way. They found none. Their conclusion: evidence of AI's climate benefits is weak, while evidence of harm is strong." | "0 verified cases" stat. Report cover. |
| 65–85s | "Meanwhile, the harm is measurable. Google's ambition-based emissions were 51% above 2019 in its 2025 report. Microsoft's rose 25% in a single year. Both cite data-centre growth." | Bars: Google +51% vs 2019; Microsoft +25% y/y. |
| 85–100s | "In fairness, AI can help, for example in grids and energy systems. The IEA has suggested savings of up to about 5% by 2035 from energy-sector uses. But that's a different, narrower claim." | Grid control-room B-roll. "IEA: up to ~5% by 2035 (energy sector)". |
| 100–115s | "And regulators are catching up. Since September 2026, the EU bans product claims like 'carbon neutral' that are based on offsets. So when someone says 'AI will save the climate', ask: says who, and measured how? Follow for more." | EU flag. "Banned: offset-based 'carbon neutral' product claims". End card. |

**Fact sheet**
- 5–10% claim: 2021 BCG blog extrapolated from client work, repeated in a 2023 BCG report commissioned by Google. Critique: "lacks any scientific grounding". Source: Luccioni et al., "Misinformation by Omission", arXiv 2506.15572 (Jun 2025).
- Feb 2026 report "The AI Climate Hoax" (Beyond Fossil Fuels; authorship as reported) found no example of generative AI delivering "material, verifiable and substantial" cuts. Source: report PDF; Euronews, 17 Feb 2026. The voiceover calls the authors "campaigners", which is accurate framing.
- IEA: AI could cut emissions by up to ~5% by 2035 via energy-sector applications (as reported by Euronews). ⚠️ IEA primary text not fetched.
- Google: +51% vs 2019 (2025 report). Source: regulation notes. Microsoft: +25% y/y to ~20.3 Mt (FY25). Source: Microsoft 2026 ESR.
- EU Empowering Consumers Directive 2024/825 applies from 27 Sep 2026 and bans offset-based "carbon neutral" product claims. Source: regulation notes.

---

## Suggested posting order for the full 10-part series

1 (bills) → 3 (gas) → 8 (diesel) → 2 (accounting) → 6 (efficiency) → 4 (water) → 7 (embodied carbon) → 9 (heat) → 5 (carbon removal) → 10 (AI-for-climate claim).

Open with the most local and relatable topics (bills, smoke, noise), move into accounting and hidden impacts, and finish with offsets and claims.
