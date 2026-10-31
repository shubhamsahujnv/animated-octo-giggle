# Episode 13 explainer: Why AI is moving from air to liquid

- **Format:** vertical 1080×1920 (Reels, Shorts) or landscape 1920×1080 (YouTube, LinkedIn), 30 fps
- **Length:** ~90 seconds (~230 words of voiceover)
- **Tone:** polished, calm, evidence-led (The Green Solve guardrails)
- **Facts as of:** 31 October 2026

> **Exception to the TGS skill, labelled as the skill requires:** TGS videos are capped at 15–25 s. This explainer runs ~90 s because the brief asks for an informative script. All other TGS rules still apply: open with a hook on ink, one idea per scene, a source line on every number, brand colours and fonts only, close on ink with the large logo. The 22 s reel version is in `brag-plan.md`.

**Hook:** "The newest AI chips run so hot that fans can't cool them. So data centres are turning into plumbing."

| Time | Voiceover | On screen | Source line |
|---|---|---|---|
| 0–6s | "The newest AI chips run so hot that fans can't cool them. So data centres are turning into plumbing." | Ink. Headline: **Too hot for *fans*.** A rack glows; a pipe slides in beside it. | none (no number) |
| 6–16s | "A data centre is rows of racks: fridge-sized cabinets full of servers. For years, a typical rack drew about 11 kilowatts. That's roughly seven home air conditioners running at once." | Paper. Rack illustration. Stat: **11 kW**, "the most common rack today". Small icon row: 7 × AC unit (labelled illustrative). | Source: Uptime Institute, Global Data Center Survey (2026). AC comparison illustrative (1.5-ton AC ≈ 1.5 kW). |
| 16–30s | "AI changed that. Nvidia's GB200 NVL72 packs 72 AI chips into a single rack, wired together with more than 5,000 copper cables so they behave like one giant chip. Copper only works over short distances, so the chips have to sit close together. The result: about 120 kilowatts in one rack. That's more than ten times the usual." | Surface. Cutaway of one rack: 72 chip tiles, a dense cable spine at the back. Bar: 11 kW → **~120 kW**. | Source: NVIDIA GB200 NVL72 (2024), via The Register and SemiAnalysis. |
| 30–42s | "Every watt a chip uses ends up as heat. Fans and chilled air can carry away roughly 15 to 20 kilowatts a rack. Past that, you simply can't push enough air through. And Nvidia's roadmap points to racks of around 600 kilowatts in 2027." | Paper. Bar chart grows: 11 → 120 → 600 kW (labelled "planned"), dashed line at **~20 kW: limit for air**. | Source: Yotta Data Services (2026), air limit; NVIDIA roadmap (reported, 2027). |
| 42–58s | "Liquid is the answer, because per litre, water holds about 3,500 times more heat than air. There are three main ways to use it. A rear-door heat exchanger: a radiator fixed to the back of the rack. Direct-to-chip: a cold plate sits on each processor and carries away most of the heat at the source. Or immersion: the whole server sinks into a fluid that doesn't conduct electricity." | Ink. Stat: **~3,500×**. Then three cards arrive one by one: Rear door · Direct-to-chip (70–90% of heat at source) · Immersion. | Source: physical constants (volumetric heat capacity); Data Center Knowledge (2025), direct-to-chip share. |
| 58–74s | "Does liquid cooling mean more water? It depends where the heat goes next. The liquid inside the building runs in a closed loop and never evaporates. Outside, the heat is dumped either through dry coolers, which use no water but more electricity, or evaporative towers, which use water. Microsoft says its new zero-evaporation design saves more than 125 million litres a year per site. Its first sites come online from late 2027." | Paper. Two-loop diagram: inside loop (closed) → handover → outside: "dry cooler" vs "evaporative tower". Stat: **125 million litres / year / site** (company estimate). | Source: Microsoft (Aug 2024), company projection, not independently measured. |
| 74–84s | "This matters for India. In a hot, humid climate, air cooling works hard. Indian operators such as Yotta say their GPU loads already run fully on liquid. The trade-offs are real: higher upfront cost, leak risk, and older buildings that are hard to retrofit." | Surface. India map with Navi Mumbai pin. Checklist of trade-offs: cost · leaks · retrofits. | Source: Yotta Data Services executive interview (2026). |
| 84–92s | "So next time you hear 'AI data centre', ask two questions. How is it cooled? And where does the heat go?" | Ink. **How is it cooled? Where does the heat go?** Large logo, pill: Follow The Green Solve. Next: data centres in space? | none |

## Full voiceover (~235 words)

> The newest AI chips run so hot that fans can't cool them. So data centres are turning into plumbing.
>
> A data centre is rows of racks: fridge-sized cabinets full of servers. For years, a typical rack drew about 11 kilowatts. That's roughly seven home air conditioners running at once.
>
> AI changed that. Nvidia's GB200 NVL72 packs 72 AI chips into a single rack, wired together with more than 5,000 copper cables so they behave like one giant chip. Copper only works over short distances, so the chips have to sit close together. The result: about 120 kilowatts in one rack. That's more than ten times the usual.
>
> Every watt a chip uses ends up as heat. Fans and chilled air can carry away roughly 15 to 20 kilowatts a rack. Past that, you simply can't push enough air through. And Nvidia's roadmap points to racks of around 600 kilowatts in 2027.
>
> Liquid is the answer, because per litre, water holds about 3,500 times more heat than air. There are three main ways to use it. A rear-door heat exchanger: a radiator fixed to the back of the rack. Direct-to-chip: a cold plate sits on each processor and carries away most of the heat at the source. Or immersion: the whole server sinks into a fluid that doesn't conduct electricity.
>
> Does liquid cooling mean more water? It depends where the heat goes next. The liquid inside the building runs in a closed loop and never evaporates. Outside, the heat is dumped either through dry coolers, which use no water but more electricity, or evaporative towers, which use water. Microsoft says its new zero-evaporation design saves more than 125 million litres a year per site. Its first sites come online from late 2027.
>
> This matters for India. In a hot, humid climate, air cooling works hard. Indian operators such as Yotta say their GPU loads already run fully on liquid. The trade-offs are real: higher upfront cost, leak risk, and older buildings that are hard to retrofit.
>
> So next time you hear "AI data centre", ask two questions. How is it cooled? And where does the heat go?

## Fact sheet

| Claim | Source | Status |
|---|---|---|
| Typical rack ~11 kW | Uptime Institute Global Data Center Survey 2026: modal (most common) density 11 kW, up from 9 kW | Verified via survey coverage (Data Center Knowledge) |
| 7 home ACs | 11 kW ÷ ~1.5 kW per 1.5-ton split AC | Illustrative; labelled on screen |
| 72 GPUs, 5,000+ copper cables, acts as one GPU | NVIDIA GB200 NVL72 launch (Mar 2024); LightCounting counts 5,184 copper cables; The Register; DCD | Verified ("one giant GPU" is NVIDIA's framing) |
| ~120 kW per AI rack | SemiAnalysis: ~120 kW nominal, ~124–140 kW observed | Verified, rounded |
| Air limit ~15–20 kW per rack | Yotta Data Services executive (tele.net.in, 2026) | ⚠️ Single company source; widely cited industry range |
| ~600 kW racks in 2027 | NVIDIA Rubin Ultra "Kyber" roadmap, via Introl and others | ⚠️ Roadmap, reported; labelled "planned" |
| ~3,500× | Water ~4,180 kJ/m³·K vs air ~1.2 kJ/m³·K | Physics |
| Direct-to-chip removes 70–90% of heat at source | Data Center Knowledge; TechTarget | Industry estimate |
| 125 million litres/yr per site; online from late 2027 | Microsoft (Aug 2024) | ⚠️ Company projection; labelled on screen |
| Yotta GPU loads fully on liquid | Yotta executive interview (2026) | ⚠️ Company statement |

Nothing in this piece covers offsets or credit markets, so the TGS disclosures are not needed.
