# Data centre video scripts, part 3: AI and tech

Five new short-form video scripts (Scripts 11–15) for YouTube Shorts, Instagram Reels and LinkedIn, about 90–120 seconds each. They follow on from Parts 1 and 2 (Scripts 1–10) and the earlier TGS carousels and reels.

This batch covers the **technology** behind AI data centres: how they behave on the grid, how they are cooled, where they get built, and the plan to put them in orbit. Facts are as of **31 October 2026**. Every script ends with a fact sheet giving the date and source of each number it uses.

> **Sourcing caveat:** most figures come from search-result extracts of the cited pages. The research tools could not open many primary documents in full. Check headline numbers against the primary source before publishing. ⚠️ marks figures that are secondary, conflicting or unverified. Where sources disagree, the voiceover hedges or uses a range.

---

## How this batch avoids repeating earlier content

Topics already covered, and not reused as the main idea here:

| Already made | Where |
|---|---|
| Power bills and PJM capacity auctions | Script 1 |
| Microsoft's 10x emissions jump (RECs, market-based accounting) | Script 2 |
| Nuclear deals vs gas reality | Script 3 |
| Hidden water at power plants | Script 4 |
| Carbon removal market | Script 5 |
| Efficiency and the Jevons paradox | Script 6 |
| Embodied carbon in buildings and chips | Script 7 |
| Diesel backup generators and permits | Script 8 |
| Waste heat in Europe | Script 9 |
| "AI will save the climate" claim | Script 10 |
| US climate cost of AI (long explainer) | `ai-data-centers-climate` video |
| Data centre power use, why India is building them, old servers, PUE, solar cloud, water, per-answer electricity, myth vs fact | TGS carousels 01–05 and reels 01–03 |

## New insights found for this batch

| # | Insight | Key figure | Date / source | Script |
|---|---|---|---|---|
| 11 | Data centres can suddenly drop off the grid together and destabilise it | ~1,500 MW lost at 60 points (Jul 2024); ~3,800 MW (Jul 2026), PJM's largest ever. NERC then issued its highest-level alert | NERC incident review, Jan 2025; PJM via Utility Dive, Aug 2026; NERC Level 3 Alert, 4 May 2026 | ✅ 11 |
| 12 | Data centres that pause briefly could unlock huge grid capacity | 76–126 GW of new US load if curtailed 0.25–1% of the time. Live trials cut AI power 25–40% on request | Duke Nicholas Institute, Feb 2025; EPRI/Emerald AI; National Grid, 2026 | ✅ 12 |
| 13 | AI chips are too hot for air, so cooling is moving to liquid | Typical rack ~11 kW vs ~120 kW (GB200 NVL72) and ~600 kW planned (2027) | Uptime Institute 2026 survey; NVIDIA reporting | ✅ 13 |
| 14 | Data centres in space: real tests, unproven economics | Google launched 4 TPUs to orbit (1 Oct 2026). SpaceX filed for up to 1 million compute satellites | Google, Oct 2026; DCD / IEEE Spectrum, 2026 | ✅ 14 |
| 15 | AI is splitting into "factories" (training) and "counters" (inference), which changes where data centres get built, including in India | Inference ≈ two-thirds of AI compute in 2026. Google's 1 GW Vizag hub broke ground Apr 2026 | Deloitte via reports; Google / Business Standard, Apr 2026 | ✅ 15 |

**Why these five:** each is about how AI infrastructure *works*, not only how much it emits. Together they cover the grid, cooling hardware, orbit, and siting, and two of them (12 and 15) carry the hopeful, India-relevant angle the TGS series aims for.

---

## Script 11: "60 data centres vanished from the grid"

- **Thumbnail text:** "4 GW gone in seconds"
- **Core insight:** Data centres protect themselves by jumping to backup power at the first flicker. When dozens do it at once, the grid suddenly loses a power-plant-sized load, and AI training adds new power swings on top.
- **Runtime:** ~115 seconds

| Time | Voiceover | On-screen / B-roll |
|---|---|---|
| 0–5s | "In July 2026, about 3,800 megawatts of data centres disconnected from America's biggest grid. In seconds. Nobody switched them off." | Big text: **3,800 MW**. Grid map lights blinking out. |
| 5–20s | "It started with a routine fault on a power line in Northern Virginia, the world's biggest data centre cluster. Grid operator PJM says the fault was cleared normally. But the data centres didn't wait to find out." | Animated 230 kV line with a spark. "Fault cleared ✓". |
| 20–40s | "Data centres are built to never go down. So when the voltage dips, even for a moment, they switch to their own batteries and generators. One site doing that is fine. Dozens doing it together is like a small city vanishing from the grid." | Servers flipping from "GRID" to "BACKUP", one by one, then all at once. |
| 40–55s | "Here's why that's dangerous. Power stations are still producing for demand that just disappeared. Voltage and frequency swing. PJM called it the largest event of its kind in its history." | Seesaw: generation side shoots up as load drops. Frequency trace wobbling. |
| 55–70s | "It wasn't the first time. In July 2024, about 1,500 megawatts dropped off the same grid, across 60 connection points, after a similar fault. Grid planners hadn't expected it." | Timeline: Jul 2024 (1,500 MW) → Feb 2025 → Jul 2026 (3,800 MW). |
| 70–85s | "AI adds a new twist. When a model trains, thousands of chips switch between idle and full power together. That can make the whole site's demand pulse, sending ripples into the grid." | GPU grid flashing in sync; square-wave power trace. |
| 85–100s | "So in May 2026, NERC, the body that sets reliability rules for North America's grid, issued its highest-level alert on these loads. Texas already lets its grid operator order big new loads to cut power in an emergency." | "NERC Level 3 Alert, 4 May 2026" card. Texas outline: "SB 6: loads ≥75 MW". |
| 100–115s | "The fixes exist: 'ride-through' rules so sites stay connected through brief faults, and batteries that smooth out AI's power pulses. As AI grows, data centres have to become good grid citizens. Should that be the law? Tell me below." | End card: "Good grid citizens?" + logo. |

**60-second cut:** keep 0–40s, 55–70s (one line), 100–115s.

**Fact sheet**
- 22 July 2026: ~3,800 MW of data centre load tripped offline in Northern Virginia after a 230 kV line fault in Dominion's zone that was cleared normally; PJM's largest such event. PJM said on 11 Aug 2026 it is considering ride-through standards. Source: Utility Dive; Data Center Knowledge. ⚠️ One analysis puts it at ~3.1 GW, so the script says "about 3,800" and attributes it to PJM.
- 10 July 2024: ~1,500 MW of voltage-sensitive data centre load lost across 60 points and 25 substations after a 230 kV line fault; operators had not anticipated it. Source: NERC incident review, "1500 MW Data Center Load Loss", 8 Jan 2025.
- 17 Feb 2025: a similar ~1,500 MW load transfer in the Dominion zone. Source: PJM Inside Lines / APPA.
- NERC Level 3 "Essential Action" alert on computational loads, 4 May 2026 (its highest alert level); responses due 3 Aug 2026; not a mandatory standard. Source: Utility Dive; Morgan Lewis; Renewable Energy World.
- AI training load oscillations from synchronised GPUs are named in the NERC alert as a forced-oscillation risk. Source: arXiv review 2610.09060 citing NERC. ⚠️ Secondary citation.
- Texas SB 6 (signed June 2025): covers loads ≥75 MW in ERCOT; new large loads interconnecting after 31 Dec 2025 must support curtailment in emergencies. Source: Utility Dive; McGuireWoods; Perkins Coie.
- "Small city" is a qualitative comparison, not a measured equivalence. Do not convert to a number of homes on screen.

---

## Script 12: "The data centre that can take a break"

- **Thumbnail text:** "Pause AI. Unlock 100 GW?"
- **Core insight:** If AI data centres agree to dial down for a few hours a year, the existing grid can connect far more of them, faster, without building as many new power plants. Trials show it works.
- **Runtime:** ~110 seconds

| Time | Voiceover | On-screen / B-roll |
|---|---|---|
| 0–5s | "What if the fix for AI's power problem is simply... letting it take a break?" | A server rack with a "PAUSE ⏸" button. |
| 5–20s | "Grids are built for the hottest afternoon of the year. Most of the time, a lot of that capacity sits unused. The trouble is those few peak hours." | Demand curve over a year; tall spikes highlighted, lots of empty headroom below the line. |
| 20–40s | "A Duke University study asked: what if new data centres agreed to cut their power for a tiny slice of the year? Across the US, the answer was 76 to 126 gigawatts of new load the existing grid could take." | Counter: 0.25% → 76 GW, 1% → 126 GW. "Duke Nicholas Institute, Feb 2025". |
| 40–55s | "At the low end, those cuts add up to about 85 hours a year, and usually only partial. In return, data centres could connect years sooner." | Calendar: 8,760 hours with ~85 shaded. "Connect sooner" arrow. |
| 55–75s | "AI is good at this, because a lot of it can wait. Training a model or processing a batch job can slow down for an hour. Answering your search can't. So you pause the patient work and protect the urgent work." | Two lanes: "Urgent (search, maps)" stays on; "Patient (training, batch)" dims. |
| 75–95s | "It's already being tested. In Phoenix, an Oracle AI site cut power by 25% for three hours during a heatwave peak. In London, a trial with National Grid cut AI demand by up to 40% while critical work kept running. And Google signed deals with two US utilities to scale back machine-learning work when the grid is stressed." | Three cards: Phoenix –25% / London –40% / Google + I&M + TVA. |
| 95–110s | "For fast-growing grids like India's, where solar floods the afternoon and evenings run tight, flexible data centres could be part of the answer. Would you let your AI wait an hour to keep the lights on? Comment below." | India map with sun icon; evening demand curve. End card: "Flexible by design" + logo. |

**60-second cut:** keep 0–40s, 75–95s (Phoenix + London only), last line.

**Fact sheet**
- Duke University Nicholas Institute, *Rethinking Load Growth* (Feb 2025): the 22 largest US balancing authorities (95% of US load) could absorb ~76 GW at a 0.25% curtailment rate, ~98 GW at 0.5% and ~126 GW at 1%. Curtailment would occur in ~85, ~177 and ~366 hours a year respectively, mostly partial. Source: Duke report; Facilities Dive. ⚠️ One summary pairs the numbers differently; check the PDF. Critics argue it should not be used to lower interconnection obligations for individual sites (opinion piece, Medium).
- Phoenix: Emerald AI reduced an Oracle data centre's AI power demand by 25% over three hours at peak, as part of EPRI's DCFlex initiative with Salt River Project (2025). Source: Emerald AI; Renewable Energy World.
- London: Emerald AI, EPRI, National Grid, Nebius and NVIDIA trial cut demand by up to 40% while critical workloads ran (2026). Source: National Grid press release. ⚠️ Date reported as March 2026 by secondary sources.
- Google demand-response agreements with Indiana Michigan Power (Fort Wayne) and TVA, announced Aug 2025, the first to target machine-learning workloads; Indiana regulators later approved the I&M arrangement. Google says flexibility is early-stage and limited by reliability needs of services like Search and Maps. Source: Google blog; DCD; The Register.
- India solar-afternoon / tight-evening framing is qualitative. Do not add a peak-demand number without a current CEA/Grid-India source.

---

## Script 13: "Why AI is moving from air to liquid"

- **Thumbnail text:** "Too hot for fans"
- **Core insight:** One AI server rack now draws as much power as about ten ordinary racks, and air can't carry that heat away. Liquid cooling is taking over, and if it is designed as a closed loop it can also cut water use.
- **Runtime:** ~110 seconds

| Time | Voiceover | On-screen / B-roll |
|---|---|---|
| 0–5s | "A typical server rack runs on about 11 kilowatts. The newest AI racks? Over 120. And the next ones are planned at 600." | Three bars: 11 kW → 120 kW → 600 kW, the last bar shooting off-screen. |
| 5–20s | "Every watt a chip uses turns into heat. Pack more AI chips into one cabinet and you get a space heater the size of a fridge. Actually, more like a hundred space heaters." | Rack glowing; thermal-camera colour shift to white-hot. |
| 20–35s | "For decades, data centres cooled servers with fans and cold air. Indian operators put the practical limit at around 15 to 20 kilowatts a rack. AI blew past that." | Fan icon with a red "limit: ~20 kW" line. |
| 35–55s | "So the industry is switching to liquid. Here's the physics: a litre of water can soak up roughly 3,500 times more heat than a litre of air. In 'direct-to-chip' cooling, a cold plate sits right on top of the processor, and liquid carries the heat away." | Side-by-side: a box of air vs a box of water, heat bar ×3,500. Cutaway of a cold plate on a GPU. |
| 55–70s | "Or you go further and dunk the entire server in a special fluid that doesn't conduct electricity. That's immersion cooling." | Server lowered into a tank of clear fluid; no sparks. |
| 70–90s | "Does liquid cooling mean more water? Not necessarily. In a closed loop, the same liquid circulates again and again. Microsoft says its new design evaporates zero water for cooling, saving over 125 million litres a year per site. Those sites start coming online from late 2027." | Loop animation. "125M litres/yr (Microsoft claim)". |
| 90–100s | "The catch: if the heat is still dumped through evaporating cooling towers, water use comes back. And skipping evaporation can need a bit more electricity. Design matters." | Fork: "closed loop" vs "cooling tower → evaporation". |
| 100–110s | "India's AI data centres are already going liquid, and liquid-cooling kit is now made in Bengaluru. Next time you hear 'AI data centre', picture plumbing, not fans. Follow for more." | Navi Mumbai skyline card. End card: "Plumbing, not fans." + logo. |

**60-second cut:** 0–20s, 35–55s, 70–90s, last line.

**Fact sheet**
- Typical rack: Uptime Institute Global Data Center Survey 2026 puts the *modal* rack density at 11 kW (up from 9 kW in 2025); average excluding >30 kW facilities ~7.8 kW. Source: Uptime Institute 2026; Data Center Knowledge. ⚠️ AFCOM's 2026 survey reports a 27 kW average for a different sample; don't mix the two.
- NVIDIA GB200 NVL72: ~120 kW nominal per rack (~124–140 kW reported in practice). Vera Rubin NVL72: ~190–230 kW reported. Rubin Ultra "Kyber" NVL576: ~600 kW planned for 2027, with a shift to 800 V DC power. Source: SemiAnalysis; Tom's Hardware; Introl. ⚠️ Rubin/Kyber figures are mostly secondary reporting.
- Air-cooling practical limit ~15–20 kW per rack; direct liquid and immersion enable 80 kW+; all of Yotta's GPU/AI load is liquid-cooled. Source: Yotta Data Services executive interview (tele.net.in, 2026). ⚠️ Single company source.
- "~3,500 times": water's volumetric heat capacity (~4,180 kJ/m³·K) vs air's (~1.2 kJ/m³·K) at room conditions. Standard physics constants; sources quote ranges, so the script says "roughly".
- Direct-to-chip removes roughly 70–90% of a rack's heat at the source; immersion uses dielectric fluid. Source: Data Center Knowledge; TechTarget.
- Microsoft zero-water-evaporation design (announced Aug 2024): avoids >125 million litres per data centre per year; pilots in Phoenix and Mt Pleasant (2026); sites online from late 2027; "nominal" energy increase. Source: Microsoft via Data Centre Magazine; Sustainability Magazine. ⚠️ Microsoft's own projection, not independently measured.
- Schneider Electric opened a liquid-cooling factory in Bengaluru in early 2026. Source: market report via DCD/credence research. ⚠️ Verify against Schneider's announcement before naming the company on screen.

---

## Script 14: "Data centres in space: genius or fantasy?"

- **Thumbnail text:** "AI in orbit?"
- **Core insight:** Tech companies are now testing AI chips in orbit for constant solar power and no land fights. The tests are real, but cooling in a vacuum and launch costs mean it's an experiment, not an escape from Earth's energy choices.
- **Runtime:** ~120 seconds

| Time | Voiceover | On-screen / B-roll |
|---|---|---|
| 0–5s | "On the first of October 2026, Google launched AI chips into space. Not to study the stars. To see if data centres belong up there." | Rocket launch (original illustration). "1 Oct 2026". |
| 5–20s | "It's called Project Suncatcher: a satellite, built with Planet, carrying four of Google's AI chips. It's testing how they cope with radiation, launch shock and extreme heat and cold." | Satellite with four glowing chips; labels: radiation, shock, thermal. |
| 20–35s | "And Google isn't alone. A startup called Starcloud put an Nvidia H100 chip in orbit in November 2025 and trained a small AI model on it. SpaceX has asked US regulators to approve up to one million computing satellites." | Starcloud card (Nov 2025). FCC filing card: "up to 1,000,000". |
| 35–50s | "Why bother? In the right orbit, solar panels get sunlight almost all the time. No land to buy. No local water. No neighbours protesting." | Sun-synchronous orbit diagram; checklist ✓ sun ✓ land ✓ water. |
| 50–75s | "Here's the catch: cooling. On Earth, we blow air or pump water over chips. In space, there's no air. The only way to lose heat is to radiate it, using huge panels. One World Economic Forum analysis estimates about 100 tonnes of ISS-style radiators for just one megawatt. That's heavier than the computers." | Chip in a vacuum, heat waves glowing outward. Scale: "Radiators ≈ 100 t per MW (WEF estimate)". |
| 75–90s | "Others say newer radiators are far lighter. Both sides agree the real decider is launch cost. One analysis finds it only competes if launches get down to around 100 dollars a kilo." | Two opinions as speech bubbles. Price dial: "$/kg → ~100". |
| 90–105s | "And there are costs back on Earth: rocket emissions, crowded orbits and brighter night skies for astronomers." | Night sky with satellite streaks. |
| 105–120s | "So space data centres are a real experiment, not a free pass. The power AI needs this decade still has to be clean down here. Would you trust your data to a satellite? Comment below." | End card: "Clean power, down here first." + logo. |

**60-second cut:** 0–20s, 35–75s, last line.

**Fact sheet**
- Google Project Suncatcher: prototype satellite with four TPUs, built with Planet, launched on SpaceX Transporter-18 on 1 Oct 2026 to test radiation, physical stress and thermal extremes; two more satellites planned in 2027 to test optical links. Source: Google (X post, Oct 2026); Fortune, 10 Oct 2026; CNN, 1 Oct 2026.
- Google ground-tested Trillium TPUs with a 67 MeV proton beam; no critical failures up to the maximum dose tested. Source: Google research via Interesting Engineering.
- Starcloud-1 reached orbit on 2 Nov 2025 with one Nvidia H100; trained nanoGPT and ran inference on Google's Gemma. Starcloud-2 has slipped from Oct 2026 to 2027. Source: Starcloud; Digit; GeekWire. The script says "a small AI model", not a frontier model.
- SpaceX filed with the FCC in late Jan 2026 for up to one million orbital data-centre satellites; SpaceX and xAI completed their merger on 2 Feb 2026. Still at filing stage. Source: DCD; IEEE Spectrum; NPR, 3 Apr 2026.
- Radiator mass: WEF (Jun 2026) estimates ~100 t of ISS-style radiators for a 1 MW facility, possibly ~10x the compute mass. Counterpoint: Mach33 analysis found radiators at 10–20% of mass for a 100 kW platform. Source: WEF; SpaceComputer blog. ⚠️ Estimates vary hugely with scale and design.
- Launch cost threshold: Forethought finds orbital data centres could compete with a bullish terrestrial build-out at ~$100/kg launch cost. Source: Forethought research, 2026. ⚠️ Model result, not a forecast.
- Rocket emissions, debris and sky brightness are widely documented concerns; no number used in the script.

---

## Script 15: "AI's factories and AI's shop counters"

- **Thumbnail text:** "Why Vizag? Why Jamnagar?"
- **Core insight:** AI data centres are splitting in two. Training "factories" can go wherever power is cheap and clean. Inference "counters", which answer your questions, have to sit near people. That split explains where India's new AI campuses are going and how green they can be.
- **Runtime:** ~120 seconds

| Time | Voiceover | On-screen / B-roll |
|---|---|---|
| 0–5s | "Every AI has two jobs. Learning, and answering. And they need very different data centres." | Split screen: "LEARN" (factory icon) / "ANSWER" (counter icon). |
| 5–25s | "Learning is called training. It happens once per model, on tens of thousands of chips, for weeks. It doesn't matter if it's a few milliseconds away from you. So training campuses go where power and land are plentiful, often hundreds of megawatts to gigawatts." | Giant campus in open land next to solar and wind farms. |
| 25–45s | "Answering is called inference. It happens every time you type a prompt. And by 2026, it's roughly two-thirds of all AI computing. Inference has to be fast, so it needs to be close to you." | Phone prompt → nearby building lights up. "Inference ≈ 2/3 of AI compute (2026)". |
| 45–60s | "Physics sets the limit. Light in fibre covers about 200 kilometres per millisecond. Send a question from Mumbai to a server in the US and back, and you lose at least 130 milliseconds before the AI even starts thinking." | Globe: Mumbai → US East Coast, round trip; stopwatch "≥130 ms". |
| 60–85s | "That's why AI capacity is now being built in India. In April 2026, Google broke ground on a 15-billion-dollar, one-gigawatt AI hub in Visakhapatnam, with a new subsea cable gateway. Reliance is bringing its first 120 megawatts of AI compute online in Jamnagar this year, on its own green energy, with Jio's network for fast answers. And the government's IndiaAI Mission has onboarded over 38,000 GPUs for startups and researchers." | India map: Vizag pin (1 GW, $15B), Jamnagar pin (120 MW), "IndiaAI: 38,000+ GPUs". |
| 85–105s | "Here's the climate angle. Training factories can be placed right next to solar and wind, and paused when the sun goes down. Inference counters sit in or near our cities, so they run on city grids. That makes clean power for urban grids the real test." | Two lanes: factory beside solar park (green tick); city counter on grid (meter dial). |
| 105–120s | "So next time a company announces an AI data centre, ask two questions: is it a factory or a counter? And where does its power come from? Follow for more." | End card: "Factory or counter? Whose power?" + logo. |

**60-second cut:** 0–5s, 25–45s, 60–85s (Vizag + IndiaAI only), 105–120s.

**Fact sheet**
- Inference ≈ two-thirds of AI compute in 2026: Deloitte forecast, widely cited. Gartner: inference spending ($23.3B) overtook training ($19B) in 2025. Source: industry summaries. ⚠️ Secondary; estimates of inference's *energy* share (80–90%) are weakly sourced and are not used.
- Siting split: training is latency-tolerant and can be remote (100 MW to multi-GW); inference is latency-sensitive (regional 20–100 MW hubs, edge <10 MW). Source: Hitachi Energy blog (Jun 2026); Analysys Mason (May 2025); McKinsey. ⚠️ Vendor/consultancy views. An arXiv paper (2605.03090) notes some inference stays at big campuses because of "data gravity", so the script keeps the split simple but not absolute.
- Latency: light in optical fibre travels at ~200,000 km/s (~200 km per ms). Mumbai to the US East Coast is ~13,000 km in a straight line, so the round trip is ≥130 ms even before routing detours. Physics estimate; real-world latency is higher.
- Google Visakhapatnam AI hub: ground broken late April 2026; $15B over 2026–2030; ~1 GW; developed with AdaniConnex and Airtel's Nxtra; includes a subsea gateway adding route diversity to Mumbai and Chennai landings. Source: W.Media; Business Standard via Vision IAS, 29 Apr 2026; Drishti IAS.
- Reliance Jamnagar: >120 MW of AI compute coming online in H2 2026, NVIDIA GB300 GPUs, powered by Reliance's own green energy, with Jio edge compute for low-latency inference; part of a ₹10 lakh crore, seven-year AI commitment (Feb 2026). Source: TechCrunch, 19 Feb 2026; Let's Data Science. ⚠️ "Online in 2026" is Reliance's own target; confirm commissioning before publishing.
- IndiaAI Mission: >38,000 GPUs onboarded on the AI compute portal (MeitY, 25 Mar 2026); total outlay ₹10,371 crore over five years. Source: Digital India / MeitY press release. ⚠️ Later "45,000+" figures are unconfirmed and not used.

---

## Suggested posting order for this batch

11 (grid blackout risk) → 12 (flexibility fix) → 13 (liquid cooling) → 15 (factories vs counters, India) → 14 (space).

Start with the most dramatic real event, follow it immediately with the hopeful fix, go inside the hardware, bring it home to India, and finish with the most talked-about future idea.

## Brand checklist (TGS)

- Use only brand colours (Deep Teal, Lime, Taupe, Mauve, Cream) and fonts (Libre Baskerville headings, Helvetica body).
- Logo on every end card. Source line on every stat frame (source + year).
- No company logos on screen (Google, Microsoft, NVIDIA, SpaceX, Reliance): use names in text only, with original illustrations.
- None of these scripts mention carbon credits, so the credit disclosures are not needed. If a caption adds credits, include both required disclosures.

---

## Sources

Grid events and rules (Script 11)
- [NERC/APPA: incident review on 1,500 MW data centre load loss](https://www.publicpower.org/periodical/article/nerc-incident-review-examines-risks-challenges-tied-integration-large-loads)
- [PJM Inside Lines: PJM, Dominion review large load transfer event](https://insidelines.pjm.com/pjm-dominion-review-large-load-transfer-event/)
- [DCD: Virginia narrowly avoided power cuts when 60 data centers dropped off the grid](https://datacenterdynamics.com/en/news/virginia-narrowly-avoided-power-cuts-when-60-data-centers-dropped-off-the-grid-at-once)
- [Utility Dive: PJM eyes data center reliability requirements after 3.8 GW trips offline](https://www.utilitydive.com/news/pjm-nerc-data-center-crypto-reliability-standards/827653/)
- [Data Center Knowledge: 3.8 GW load drop prompts potential PJM rules](https://www.datacenterknowledge.com/regulations/3-8-gw-load-drop-prompts-potential-pjm-rules)
- [Utility Dive: NERC issues rare Level 3 alert over data center load losses](https://www.utilitydive.com/news/nerc-issues-rare-level-3-alert-over-data-center-load-losses/819295/)
- [Morgan Lewis: NERC alert signals growing reliability focus on data centers](https://www.morganlewis.com/blogs/datacenterbytes/2026/05/nerc-alert-signals-growing-reliability-focus-on-data-centers)
- [arXiv 2610.09060: AI data centers meet electrical grids (review)](https://arxiv.org/html/2610.09060v1)
- [Utility Dive: Texas law gives grid operator power to disconnect data centers](https://www.utilitydive.com/news/texas-law-gives-grid-operator-power-to-disconnect-data-centers-during-crisis/751587)
- [McGuireWoods: Texas SB 6 expands oversight over large loads](https://www.mcguirewoods.com/client-resources/alerts/2025/7/texas-senate-bill-6-significantly-expands-regulatory-oversight-over-large-loads-in-ercot/)

Flexibility (Script 12)
- [Duke Nicholas Institute: Rethinking Load Growth (PDF)](https://nicholasinstitute.duke.edu/sites/default/files/publications/rethinking-load-growth.pdf)
- [Facilities Dive: US grid headroom for flexible load](https://www.facilitiesdive.com/news/us-grid-headroom-flexible-load-data-center-ai-ev-duke-report/739938/)
- [Medium: critique of how the Duke study is used](https://medium.com/@brianwhandshy/dukes-rethinking-load-growth-study-is-being-misused-in-the-interconnection-debate-b7d3d981e8ca)
- [National Grid: UK-first trial of AI grid technology](https://www.nationalgrid.com/uk-first-trial-ai-grid-technology-successfully-demonstrates-ability-data-centres-adjust-power-needs)
- [Renewable Energy World: Can grid-responsive data centers unlock capacity?](https://www.renewableenergyworld.com/power-grid/grid-modernization/can-grid-responsive-data-centers-help-unlock-more-capacity/)
- [APPA: Silicon Valley Power and Emerald AI pilot](https://www.publicpower.org/periodical/article/silicon-valley-power-emerald-ai-launch-pilot-demonstrate-flexible-data-centers-and-unlock-power)
- [Google blog: making data centers more flexible to benefit power grids](https://blog.google/inside-google/infrastructure/how-were-making-data-centers-more-flexible-to-benefit-power-grids/)
- [DCD: Google partners with I&M and TVA on demand response](https://www.datacenterdynamics.com/en/news/google-partners-with-im-and-tva-to-expand-use-of-demand-response-at-its-ai-data-centers/)
- [DCD: Google and I&M gain regulatory approval](https://www.datacenterdynamics.com/en/news/google-and-im-gain-regulatory-approval-for-demand-response-system-at-fort-wayne-data-center-in-indiana/)

Cooling (Script 13)
- [Uptime Institute Global Data Center Survey 2026](https://intelligence.uptimeinstitute.com/resource/uptime-institute-global-data-center-survey-2026)
- [Data Center Knowledge: AI drives uncertainty in Uptime's 2026 survey](https://www.datacenterknowledge.com/ai-data-centers/ai-drives-data-center-uncertainty-in-uptime-s-2026-survey)
- [SemiAnalysis: GB200 hardware architecture](https://semianalysis.substack.com/p/gb200-hardware-architecture-and-component)
- [Tom's Hardware: Vera Rubin NVL72 and 800 VDC at NVIDIA's lab](https://www.tomshardware.com/tech-industry/artificial-intelligence/behind-the-scenes-at-nvidias-engineering-superlab-vera-rubin-nvl72-running-openai-workloads-800vdc-demonstrated-and-more)
- [Introl: Vera Rubin and 600 kW racks](https://introl.com/blog/nvidia-vera-rubin-gpu-600kw-racks-2027)
- [Data Center Knowledge: liquid cooling options](https://www.datacenterknowledge.com/cooling/liquid-cooling-options-rdhx-direct-to-chip-immersion)
- [Data Centre Magazine: Microsoft zero-water cooling](https://datacentremagazine.com/articles/microsoft-unveils-zero-water-cooling-for-ai-data-centres)
- [tele.net.in: Yotta interview on liquid cooling](https://tele.net.in/?p=204901)
- [DCD: Planning liquid cooling for new AI builds in India](https://www.datacenterdynamics.com/en/opinions/planning-liquid-cooling-for-new-ai-data-center-builds-in-india/)

Space (Script 14)
- [Google on X: Suncatcher prototype launch](https://x.com/Google/status/2105803583648100611)
- [Fortune: Google takes the data center race off-planet](https://fortune.com/2026/10/10/google-project-suncatcher-ai-data-centers-space-satellite-launch-orbital-computing-spacex-blue-origin-artificial-intelligence-energy-demand/)
- [CNN: Google launching its first test of an orbital AI data center](https://www.cnn.com/2026/10/01/science/google-ai-data-center-satellites-space)
- [Interesting Engineering: Suncatcher TPU radiation test](https://interestingengineering.com/ai-robotics/google-project-suncatcher-tpu-chips-space-test)
- [Digit: first LLM trained in space on an H100](https://www.digit.in/features/general/worlds-1st-llm-trained-in-space-from-earth-to-orbit-on-nvidia-h100-gpus.html)
- [GeekWire: Starcloud valuation and plans](https://www.geekwire.com/2026/orbital-ai-seattle-area-startup-starcloud-hits-1-1b-valuation-to-build-space-based-data-centers/)
- [DCD: SpaceX files for million-satellite orbital data center constellation](https://www.datacenterdynamics.com/en/news/spacex-files-for-million-satellite-orbital-ai-data-center-megaconstellation/)
- [IEEE Spectrum: why thermodynamics rules orbital data centers](https://spectrum.ieee.org/orbital-data-centers-heat)
- [NPR: Can data centers in space work?](https://www.npr.org/2026/04/03/nx-s1-5718416/ai-data-centers-in-space-spacex-elon-musk)
- [CNBC: Do space-based AI data centers make economic sense?](https://www.cnbc.com/2026/06/21/do-space-based-ai-data-centers-make-economic-sense.html)
- [WEF: Why cooling is the real obstacle to space data centres](https://www.weforum.org/stories/2026/06/space-data-centres-cooling/)
- [SpaceComputer: cooling vs power debate](https://blog.spacecomputer.io/orbital-data-center-cooling-vs-power/)
- [Forethought: Will we really put data centers in space?](https://www.forethought.org/research/will-we-really-put-data-centers-in-space)

Training vs inference and India (Script 15)
- [Hitachi Energy: AI data centers 2030–2035, the power shift](https://www.hitachienergy.com/news-and-events/blogs/2026/06/ai-data-centers-2030-2035-the-power-shift)
- [Analysys Mason: AI is reshaping data-centre site strategy](https://www.analysysmason.com/consulting/articles/ai-data-centre/)
- [McKinsey: next big shifts in AI workloads](https://mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-next-big-shifts-in-ai-workloads-and-hyperscaler-strategies)
- [arXiv 2605.03090: AI data center / power grid co-design](https://arxiv.org/pdf/2605.03090)
- [Presenc: inference vs training compute split 2026](https://presenc.ai/research/inference-vs-training-compute-split-2026)
- [W.Media: Google breaks ground on $15B Visakhapatnam AI hub](https://w.media/google-breaks-ground-for-us-15-billion-india-ai-hub-in-vishakhapatnam/)
- [Vision IAS (Business Standard summary): work begins on 1 GW centre](https://visionias.in/current-affairs/upsc-daily-news-summary/article/2026-04-29/business-standard/science-and-technology/google-kicks-off-15-bn-project-in-ai-patnam-work-begins-on-1-gw-centre)
- [TechCrunch: Reliance unveils $110B AI investment plan](https://techcrunch.com/2026/02/19/reliance-unveils-110b-ai-investment-plan-as-india-ramps-up-tech-ambitions)
- [Let's Data Science: Reliance Intelligence 120 MW AI backbone in Jamnagar](https://letsdatascience.com/news/reliance-intelligence-operationalises-120mw-ai-backbone-in-j-e028b01c)
- [Digital India: IndiaAI Mission expands compute](https://www.digitalindia.gov.in/press_release/indiaai-mission-expands-ai-ecosystem-with-affordable-compute-and-startup-support/)
