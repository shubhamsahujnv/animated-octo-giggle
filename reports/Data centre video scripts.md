# Data centre video scripts

Five short-form video scripts (YouTube Shorts / Reels / LinkedIn, ~2 min each). Every script is built on **one specific insight** pulled from the research notes in `research_notes/Carbon credits and data centres/`. Facts are as of **30 October 2026**. Each script ends with a fact sheet giving the date and source of every number it uses.

> Sourcing caveat: the research tools could not open many source pages in full, so most figures come from search-result extracts of the cited pages. Check the headline numbers against the linked primary source before publishing. Figures marked ⚠️ are secondary, conflicting or unverified, and the voiceover either hedges them or leaves them out.

---

## Insight shortlist (what the research found)

| # | Insight | Key figure | Date / source | Used? |
|---|---|---|---|---|
| 1 | Households are paying for data-centre grid capacity | Data centres drove $29.4B of $63.6B (46%) of capacity costs across four PJM auctions | PJM Independent Market Monitor via mgrid.org, 23 Jul 2026 | ✅ Script 1 |
| 2 | A ~10x emissions jump caused by honest accounting, not new pollution | Microsoft market-based Scope 2: ~0.26 Mt (FY24) → ~2.7 Mt (FY25) after it dropped unbundled RECs | Microsoft 2026 ESR; ESG Dive; Trellis | ✅ Script 2 |
| 3 | Nuclear deals make the headlines, but gas supplies the power | ~13 nuclear deals (~9.8 GW), mostly delivering 2027–2032+; Meta backing ~10 gas plants (~7.5 GW) for Hyperion | Trackers, May 2026; TechCrunch, 1 Apr 2026 | ✅ Script 3 |
| 4 | Most of AI's water is used at the power plant, not the data centre | US 2023: ~17B gallons direct vs ~211B gallons indirect | LBNL 2024 report (2023 data) | ✅ Script 4 |
| 5 | One company is almost the entire carbon-removal market, and it hit pause | Microsoft held 78.5% of all durable CDR ever contracted, then reportedly paused purchases | CDR.fyi, 13 Apr 2026; Heatmap, Apr 2026 | ✅ Script 5 |
| 6 | Ireland's data centres use nearly as much power as all its homes | 23% of metered electricity in 2025 vs 28% for all households | CSO via Irish Times, 7 Jul 2026 | Used inside Script 1 |
| 7 | Backlash is now an investment risk | ~$130B of US projects blocked or delayed in Q1 2026 | Data Center Watch, Q1 2026 | Not chosen (overlaps Script 1) |
| 8 | Diesel backup generators ran during a smog alert | Vantage VA2 ran diesel generators ~24h during a Code Red alert; regulator said it couldn't stop it | EPOnline, 15 Oct 2026 | Not chosen (single local case) |
| 9 | Even Google's 24/7 clean-power push has stalled | Hourly carbon-free energy share ~64% → 66% → ~65% (2023–2025) | Google environmental reports via notes | Used inside Script 2 |
| 10 | AI got more efficient per prompt and still used more power | Google electricity +37% in 2025; 0.24 Wh per median Gemini prompt | ESG Dive; Google technical paper Aug 2025 | Not chosen (abstract; harder to visualise) |

**Why these five:** each covers a different issue (bills, accounting, power supply, water, carbon removal), each rests on a hard number from a named source, and each overturns a common assumption.

---

## Script 1: "Your power bill is building AI"

- **Thumbnail text:** "46% of the bill?"
- **Core insight:** On the largest US grid, data centres account for almost half the recent capacity costs, and those costs land on ordinary customers.
- **Runtime:** ~120 seconds

| Time | Voiceover | On-screen / B-roll |
|---|---|---|
| 0–5s | "Almost half the money paid in America's biggest power auctions went to one thing. Not homes. Data centres." | Big text: **$29.4 BILLION**. Fast cut to a server hall. |
| 5–20s | "PJM runs the grid for 13 US states plus DC, around 65 million people. Every year it holds an auction to buy enough power capacity for the future." | Animated map of PJM territory. |
| 20–40s | "Before the AI boom, that capacity cost about $29 a megawatt-day. Now it's hitting the price cap, about $325 to $333, auction after auction. The July 2026 auction cost $16.4 billion and still came up almost 7 gigawatts short." | Line chart: $28.92 → $269.92 → $329 → $333 → $325 (cap). Red "SHORT 6.8 GW" stamp. |
| 40–60s | "PJM's own independent market monitor did the maths. Across four auctions, data centres drove $29.4 billion of $63.6 billion. That's 46%." | Pie chart: 46% highlighted "data centres". Citation lower-third. |
| 60–80s | "Who pays? Utility customers. In Virginia, the world's data centre capital, regulators approved a Dominion rate rise worth about $11 to $16 a month for a typical home in 2026. Virginia also gave up $1.6 billion in data centre tax breaks in a single year." | Household bill graphic +$11–16. Virginia map. "$1.6B tax break, FY2025". |
| 80–95s | "And it's not just America. In Ireland, data centres used 23% of the country's electricity in 2025. All the households in the country used 28%." | Ireland bar: Data centres 23% vs homes 28%. |
| 95–110s | "To be fair, a Rutgers study found no clear bill impact *yet* where rates are set, and regulators are starting to make data centres pay upfront for grid upgrades." | Text: "Fair point: impact 'mostly not… yet'". Virginia "GS-5 rate class" card. |
| 110–120s | "But the question is no longer whether AI uses a lot of power. It's who pays for it. Should Big Tech cover the full cost? Tell me below." | End card: "Who should pay?" + follow. |

**Fact sheet**
- PJM capacity price: $28.92/MW-day (2024/25) → $269.92 (2025/26, July 2024 auction). Source: IEEFA.
- 2026/27 cleared at the cap of $329.17 (July 2025); 2027/28 at $333.44 (Dec 2025). Sources: IEEFA notes; ChargedUp. ⚠️ Secondary.
- 2028/29 auction (results 14 Jul 2026): $325/MW-day cap, $16.4B total, 6,831 MW short. Source: Utility Dive.
- Data centres drove $29.4B of $63.6B (46%) across four auctions, and $6.3B (38%) of the latest. Source: PJM Independent Market Monitor via mgrid.org, 23 Jul 2026.
- Virginia Dominion rate case: +$565.7M (2026), about +$11.24/month (7.5%) per one tracker, about +$16/month per Inside Climate News. ⚠️ Sources differ, so the script says "$11 to $16".
- Virginia data centre tax exemption cost $1.6B in FY2025. Source: The Register, 7 Jan 2026.
- Ireland: 7,663 GWh, 23% of metered electricity in 2025; households 28%. Source: CSO via Irish Times, 7 Jul 2026.
- Counterpoint: Rutgers NJ State Policy Lab, "mostly not. Yet."
- "13 states + DC, ~65 million people": standard PJM description, not in the research notes. ⚠️ Verify or cut.

---

## Script 2: "The 10x emissions jump that wasn't new pollution"

- **Thumbnail text:** "Emissions up 10x… overnight?"
- **Core insight:** When Microsoft stopped counting cheap renewable certificates, its reported electricity emissions rose about tenfold. That jump shows how much accounting choices had been hiding.
- **Runtime:** ~130 seconds

| Time | Voiceover | On-screen / B-roll |
|---|---|---|
| 0–5s | "Microsoft's power-related emissions jumped about ten times in a single year. The servers didn't change. The accounting did." | "0.26 Mt → 2.7 Mt". Glitch effect. |
| 5–25s | "Companies can report electricity emissions two ways. Location-based: what the local grid actually burned to power you. Market-based: what you get to claim after buying clean-energy certificates." | Split screen: smokestack grid vs a stack of certificates labelled "REC". |
| 25–45s | "A REC, or renewable energy certificate, is proof that one megawatt-hour of clean power was made somewhere. 'Unbundled' RECs are bought separately from the power itself, often cheaply and often from far away. They rarely get new wind or solar built." | Animation: wind farm in one state, certificate flying to a data centre in another. |
| 45–65s | "In fiscal 2024, Microsoft's location-based number was about 10 million tonnes of CO₂. Its market-based number was about 260 thousand. That's a gap of roughly 38 times." | Two bars: 9.96 Mt vs 0.26 Mt. |
| 65–85s | "Then in fiscal 2025, Microsoft stopped counting unbundled RECs. Its market-based Scope 2 went from about 0.26 to about 2.7 million tonnes. One accounting choice moved 2.4 million tonnes." | Bar grows ~10x. Text: "Same servers. New honesty." |
| 85–105s | "It's not just one company. A 2024 Guardian analysis estimated Big Tech's real data-centre emissions in 2020–22 were about 7.6 times higher than reported. And Amazon employees said in 2024 that 68% of Amazon's certificates were unbundled. Amazon disputes that." | Guardian headline card, labelled "2024 analysis". Amazon card with "disputed". |
| 105–120s | "The better fix is hourly matching: clean power in the same place, at the same hour you use it. Google has tried. Its hourly clean share has stalled at around two-thirds while its electricity demand rose 37% in a year. And most companies in the global rule-setting consultation opposed making hourly matching mandatory." | Clock graphic with 24 hours, 65% lit. "GHG Protocol consultation: majority opposed". |
| 120–130s | "So next time you see '100% renewable', ask: matched when, and where? Follow for the rest of the series." | End card: "100% renewable… when? where?" |

**Fact sheet**
- Microsoft FY24: location-based Scope 2 9,955,368 tCO₂e vs ~259,090 market-based (~38x). Source: Microsoft 2025 Environmental Data Fact Sheet.
- Microsoft FY25: market-based Scope 2 2,707,428 t, up from 258,217 t, after it stopped using non-additional unbundled RECs. Sources: ESG Dive; Trellis; Microsoft 2026 ESR.
- Guardian (15 Sep 2024, 2020–22 data): in-house data-centre emissions ~7.62x (662%) higher than reported. Source: eceee summary of the Guardian. ⚠️ Estimate; dated data.
- Amazon Employees for Climate Justice (Jul 2024, 2023 data): 68% of RECs unbundled. Amazon called the figures incorrect. Source: Fast Company.
- Google hourly carbon-free energy: 64% (2023), 66% (2024), ~65% (2025); electricity demand +37% in 2025. Source: ESG Dive; Google reports via notes.
- GHG Protocol Scope 2 consultation (closed 31 Jan 2026; results 29 Jul 2026): ~70% of all respondents gave little or no support to hourly matching, and 82% of companies opposed it per a separate summary. ⚠️ Figures vary by source, so the script says "most companies".

---

## Script 3: "Nuclear headlines, gas reality"

- **Thumbnail text:** "Nuclear-powered AI? Not yet."
- **Core insight:** Big Tech has signed roughly 10 GW of nuclear deals, but most deliver years from now. The power for today's AI build-out is coming from gas.
- **Runtime:** ~125 seconds

| Time | Voiceover | On-screen / B-roll |
|---|---|---|
| 0–5s | "Big Tech has signed about 10 gigawatts of nuclear deals. Here's how much of it powers AI today: almost none." | Cooling tower → hard cut to text "~0". |
| 5–25s | "Trackers counted about 13 hyperscaler nuclear deals by May 2026, close to 10 gigawatts. Microsoft is restarting Three Mile Island, now renamed Crane. Google is restarting Duane Arnold in Iowa. Meta signed up to 6.6 gigawatts." | Logo grid with GW figures. |
| 25–50s | "Now look at the dates. Crane targets 2027. Duane Arnold has slipped to early 2029. Meta's TerraPower reactors deliver no power before 2032. Amazon's X-energy reactors are expected in the early 2030s. A Carnegie Endowment analysis says Meta's 6.6 gigawatts is a maximum development portfolio, not power it has bought." | Timeline 2026 → 2035, each deal dropping onto its year. "You are here: 2026" marker. |
| 50–75s | "So what's actually powering the build-out right now? Gas. Meta is backing about 10 gas plants, about 7.5 gigawatts, for its Hyperion AI campus in Louisiana. One press estimate says that could emit around 12 million tonnes of CO₂ a year, about half as much again as Meta's entire 2024 footprint. In July 2026 Meta reportedly quit the RE100 renewables pledge." | Louisiana map, gas plant icons x10. "~12.4 Mt/yr (press estimate)". |
| 75–95s | "Even gas has a queue. Mitsubishi says new large turbine orders now face delivery around 2031. So some developers just build power on site. In Mississippi, reporting in July 2026 found xAI had installed 59 gas turbines for its Colossus 2 supercomputer without federal clean-air permits. The NAACP is challenging its permits." | Turbine backlog graphic. Southaven aerial B-roll. "59 turbines (Jul 2026 reporting)". |
| 95–110s | "Nuclear deals still matter. They secure clean power for the 2030s, and restarts add real carbon-free supply. But they don't cover the next five years." | Two lanes: "2026–2030: gas" / "2030s: nuclear?" |
| 110–125s | "When a tech company says 'nuclear', check the start date. Would you trust a climate plan built on power that arrives in 2032? Comment below." | End card: "Check the start date." |

**Fact sheet**
- ~13 hyperscaler nuclear deals, ~9.8 GW (May 2026). Sources: presenc.ai; SMR Intel. ⚠️ Aggregator counts vary.
- Crane (ex-TMI Unit 1, ~835 MW): target 2027. ⚠️ Sources split between 2027 and 2028. Source: SMR Intel.
- Duane Arnold (615 MW, Google 25-yr PPA): DOE loan up to $1.9B closed 8 Sep 2026; restart slipped to early 2029. Source: World Nuclear News; mgrid.
- Meta (9 Jan 2026): Vistra, TerraPower and Oklo, up to 6.6 GW by 2035; TerraPower Natrium delivers no power until at least 2032. Sources: Axios; Utility Dive.
- Carnegie Endowment (Jun 2026): commitments are "maximum supply and development portfolios". ⚠️ Full text not accessed.
- Amazon–X-energy: first units early 2030s. Source: SMR Intel.
- Meta Hyperion: ~10 gas plants, ~7.5 GW; ~12.4 MtCO₂/yr, ~50% more than Meta's 2024 footprint (TechCrunch estimate from DOE data, 1 Apr 2026). ⚠️ Press estimate, so the script says "one press estimate".
- Meta reportedly quit RE100. Source: Electrek, 27 Jul 2026. ⚠️ "Reportedly".
- Mitsubishi Power: large-frame orders face delivery around 2031. Source: Energy News Beat.
- xAI: 59 turbines installed without federal clean-air permits (Technology.org, 15 Jul 2026). Mississippi permitted 41 turbines on 10 Mar 2026. The NAACP (SELC/Earthjustice) appealed. ⚠️ Status of legal action after Jul 2026 unconfirmed.

---

## Script 4: "The water you don't see"

- **Thumbnail text:** "AI's real water bill is hidden"
- **Core insight:** The debate over how much water an AI prompt uses is really an argument about scope. Most of a data centre's water is used at the power plant, not on site.
- **Runtime:** ~115 seconds

| Time | Voiceover | On-screen / B-roll |
|---|---|---|
| 0–5s | "Google says an AI prompt uses five drops of water. Researchers say it's closer to a sip. They're both measuring something real." | Water drop vs a glass. "0.26 mL vs 10–50 mL". |
| 5–25s | "First, the big picture. Google's water consumption rose 34% in 2025 to about 10.9 billion gallons. That's more than double 2021, and data centres drove most of it." | Rising bar chart 2021 → 2025. |
| 25–50s | "Here's the part almost nobody talks about. Data centres use water two ways. Directly, to cool servers. And indirectly, at the power plants that make their electricity, because coal, gas and nuclear plants evaporate huge amounts of water for cooling." | Split animation: cooling tower at a data centre vs steam at a power plant. |
| 50–70s | "In the US in 2023, data centres used about 17 billion gallons directly. The water used to generate their electricity was about 211 billion gallons, roughly 12 times more." | Two tanks: 17B (small) vs 211B (huge). Source: LBNL. |
| 70–85s | "That's why the numbers clash. Google's 0.26 millilitres per prompt counts on-site cooling only. The UC Riverside study counts power-plant water too, and lands at roughly 10 to 50 millilitres per response. And no, it's not 500 millilitres per query. That's a misquote." | "MYTH: 500 mL per query" stamped and crossed out. |
| 85–100s | "Location matters most. Projects in Arizona, Texas, Spain's Aragon region and Malaysia's Johor state now face fights over water. Johor stopped approving new lower-tier data centres and requires reclaimed water." | Map pins: Tucson, Texas, Aragon, Johor. |
| 100–115s | "So the cleanest power is also the lowest-water power, because wind and solar use almost none. Next time someone quotes AI's water use, ask: does that include the power plant? Follow for more." | End card: "Ask: including the power plant?" |

**Fact sheet**
- Google 2025 water consumption: ~10.9B gallons, +34% y/y, more than double 2021. Source: Axios, 30 Jun 2026. ⚠️ From a search summary; verify against Google's 2026 report.
- LBNL 2024 report (2023 data): ~17B gallons direct, ~211B gallons indirect. Source: The Conversation via AIhub, Sep 2025. ⚠️ Older data; US only.
- Google median Gemini text prompt: 0.26 mL (on-site only). Source: Google technical paper, Aug 2025, via The Register.
- UC Riverside "Making AI Less Thirsty" (2023): ~500 mL per 10–50 responses, i.e. ~10–50 mL each; "500 mL per query" is a misquote. Sources: NBC News; fact-checks.
- Johor: banned new Tier 1/2 approvals (Nov 2025) and requires reclaimed water. Source: water research notes.
- Tucson Project Blue and Aragon (Amazon ~$40B; first lawsuit by Ecologistas en Acción). Source: water research notes.

---

## Script 5: "One buyer is the whole carbon-removal market"

- **Thumbnail text:** "78% of the market. Then: pause."
- **Core insight:** Carbon removal, which tech firms rely on to offset AI emissions, is mostly one company's contracts. Those tonnes are bought, but mostly not yet delivered.
- **Runtime:** ~130 seconds

| Time | Voiceover | On-screen / B-roll |
|---|---|---|
| 0–5s | "Of all the permanent carbon removal ever bought, almost 80% was bought by a single company." | "78.5%" huge, with the Microsoft logo silhouette. |
| 5–20s | "As its data centres grow, Microsoft's emissions rose 25% in one year, to about 20 million tonnes. Its promise is to be carbon negative by 2030. The plan relies on paying to pull CO₂ back out of the air." | Emissions arrow up. "Carbon negative by 2030" banner. |
| 20–40s | "So it went shopping. Burning biomass and capturing the CO₂ in Sweden, Denmark and the US. Trees in the American South. Storing biomass underground. By April 2026 Microsoft held about 36 million tonnes, 78.5% of all durable carbon removal ever contracted." | Map pins of deals. Counter climbing to 36.4 Mt. |
| 40–60s | "Then in April 2026, Heatmap reported that Microsoft told suppliers it was pausing new purchases. Microsoft says the programme 'has not ended'. But BloombergNEF estimates its buying fell about 80% year on year through mid-July." | Headline card "pause" plus Microsoft quote card. Downward arrow −80%. |
| 60–85s | "Here's the catch: contracted is not delivered. Buyers other than Microsoft and the Frontier coalition hold just 17% of contracted tonnes, but 90% of the tonnes actually delivered. Most of Microsoft's tonnes are promises for the future." | Two bars: "contracted" (Microsoft dominant) vs "delivered" (others 90%). |
| 85–105s | "And the flagship technology is behind schedule. Climeworks' Mammoth direct-air-capture plant in Iceland is built for 36,000 tonnes a year. In the first half of 2026 it removed 675. Direct air capture still costs around $500 to $1,000 a tonne." | Mammoth plant B-roll. Gauge: 675 / 36,000. |
| 105–118s | "And the cheaper option, classic carbon credits? A 2024 Nature Communications study found less than 16% of credits issued represented real emission cuts." | "<16% real" stat card, labelled "Nature Communications, 2024". |
| 118–130s | "Removal isn't useless. Most climate pathways need it. But you can't offset a power-hungry AI build-out with tonnes that haven't been delivered yet. Should Big Tech cut first and offset last? Tell me." | End card: "Cut first. Offset last?" |

**Fact sheet**
- Microsoft FY2025 emissions ~20.3 MtCO₂e, +25% y/y. Source: Microsoft 2026 ESR; ESG Dive.
- Microsoft held 36,439,157 t (78.5%) of disclosed durable CDR ever contracted. Others (excluding Frontier) held 17.5% of contracted tonnes but 90% of delivered and 94% of retired tonnes. Source: CDR.fyi demand snapshot, 13 Apr 2026. ⚠️ Page not fetched in full.
- Pause: Heatmap, ~10–11 Apr 2026. Microsoft: programme "has not ended". Sources: Heatmap; ESG Dive; MIT Technology Review, 16 Apr 2026.
- BNEF: Microsoft buying down ~80% y/y through mid-July 2026. Source: carbon credits notes. ⚠️ Secondary.
- Post-pause deals exist (Svante 626,000 t; BioCirc 650,000 t, 20 May 2026), so the voiceover says "pausing new purchases" as reported, not "stopped".
- Climeworks Mammoth: 36,000 t/yr nameplate; 675 t net removal in H1 2026. Sources: Gasworld; Net Zero Compare.
- DAC cost $500–1,000/t (average reported ~$516/t). Source: carbon credits notes.
- Probst et al., Nature Communications, Nov 2024: <16% of issued credits were real emission reductions.

---

## Production notes

- **Series name idea:** "The Real Cost of the Cloud" (5 parts). Post in the order 1 → 3 → 2 → 4 → 5 so the most relatable (bills) and most visual (gas turbines) go first.
- **On-screen citations:** show the source name and date as a lower-third whenever a number appears. It builds trust and protects against "greenwashing the greenwashing" accusations.
- **Before publishing:** re-check every ⚠️ item against the primary source, especially the CDR.fyi share, the Google water total and the Crane restart year.
