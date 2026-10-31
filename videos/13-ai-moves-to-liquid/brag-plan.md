# brag plan: Why AI is moving from air to liquid (Script 13)

Built with **The Green Solve guardrails** skill (`thegreensolve-guardrails`): brag video workflow, held to the TGS scale, palette, voice and claims rules. Facts as of 31 October 2026.

## Brief

- **Series:** Data centres, AI and tech, Episode 13
- **One idea:** AI chips now make too much heat for air, so cooling is moving to liquid, and a closed loop can also save water.
- **Arc:** problem (heat) → evidence (rack power vs the air limit) → solution (liquid) → hopeful twist (water saved) → close.
- **Audience:** sustainability managers, auditors, consultants and informed professionals in India.

## Settings

- Preset: polished
- Format: vertical 1080×1920, 30 fps (Reels, Shorts, Stories). Landscape 1920×1080 re-layout allowed for YouTube/LinkedIn.
- Length: 22 s (TGS window 15–25 s, target 18–22 s)
- Transitions: soft crossfade `--t-xfade` 700 ms, dipping through ink/paper between busy layouts
- Audio: original synthesised music bed at 0.30; 3 subtle SFX at 0.6; music ducks to 0.13 under the voiceover
- Voiceover: optional (use only with `--voice`). Indian-English female voice. It fits inside the 22 s and never extends it.

## Visual identity

- Background: `#02403D` (ink) / `#FFFDF8` (paper) / `#D8CAC3` (surface)
- Text: `#FFFDF8` on ink, `#02403D` on paper and surface
- Accent: `#E2FF4D`, one thing per scene, never as text on paper or surface
- Display font: Libre Baskerville. Body font: Helvetica Neue.
- Logo: large `logo-light.png` (150 px) on the close; small logo (54 px) in the footer of scenes 2 and 4.
- Rhythm: ink → paper → surface → paper → ink (never three alike in a row).
- No stock footage, glows, gradients or company logos. Racks, cold plates and loops are original flat illustrations.

## Hook options

| Option | Line | Why |
|---|---|---|
| **A (chosen)** | "One AI rack now draws *10× the power* of a typical one." | Specific, true, surprising, and it sets up the heat problem in one beat |
| B | "Fans can't keep up with AI anymore." | Strong but less specific; no number to anchor it |
| C | "The future of AI looks like *plumbing*." | Intriguing, but it gives away the answer and works better as the close line |

---

### Scene 1 – Hook – 4.5 s

- **Background:** ink
- **Archetype:** Hook cover (headline settles with `tgs-in-rise`, italic phrase last)
- **On screen:**
  - Kicker: AI DATA CENTRES
  - Headline (h1, 96 px): One AI rack now draws *10× the power* of a typical one.
  - Source line: Source: Uptime Institute, Global Data Center Survey (2026), typical rack 11 kW; NVIDIA GB200 NVL72 (2024), about 120 kW.
- **Accent:** the italic phrase "10× the power"
- **Motion:** headline rises 44 px over 450 ms; italic phrase lands last at 0.9 s; settled from 1.0 s to 4.5 s (3.5 s ≥ 1.8 s hook floor and ≥ 12 words × 0.3 s = 3.6 s minus entrance overlap; trim the kicker if it reads slow)
- **SFX:** soft low tone on the italic phrase landing (1 of 3)
- **Voiceover:** "One AI rack now draws ten times a normal rack's power."

### Scene 2 – The air limit – 5 s

- **Background:** paper
- **Archetype:** Before/after bars, with a dashed threshold line
- **On screen:**
  - Headline (h2, 72 px): Air runs out at about *20 kW* a rack.
  - Bars (proportional, growing 0 → value with `--ease-out`):
    - Typical rack: 11 kW (surface)
    - AI rack today: ~120 kW (ink)
    - Planned for 2027: ~600 kW (ink, outlined, label "planned")
  - Dashed line at 20 kW labelled "practical limit for air"
  - Source line: Source: Uptime Institute (2026); NVIDIA GB200 NVL72 (2024) and Rubin Ultra roadmap (2027, planned); air limit per Yotta Data Services (2026).
- **Accent:** none on paper (ink leads); the 600 kW bar is ink outline so the chart stays calm
- **Motion:** bars grow one by one, 150 ms stagger; dashed line draws last; settled ≥ 2.5 s
- **Footer:** small logo
- **SFX:** none
- **Voiceover:** "All that power becomes heat. And air runs out at about twenty kilowatts."

### Scene 3 – The fix – 4.5 s

- **Background:** surface
- **Archetype:** Big stat
- **On screen:**
  - Kicker: SO COOLING IS GOING LIQUID
  - Stat (Libre Baskerville, 220 px): ~3,500×
  - Label (40 px): more heat held by a litre of water than a litre of air
  - Small diagram under the label: cold plate sitting on a chip, liquid loop carrying heat away (direct-to-chip)
  - Source line: Source: standard physical constants, volumetric heat capacity of water vs air at room temperature.
- **Accent:** none (surface scene; ink text only, muted is never used as text on surface)
- **Motion:** counter ticks 0 → 3,500 over 1.1 s; holds 2.4 s with its source line (≥ 1.5 s floor)
- **SFX:** gentle tick when the counter lands (2 of 3)
- **Voiceover:** "So cooling goes liquid. Water holds about 3,500 times more heat than air."

### Scene 4 – The water twist – 5 s

- **Background:** paper
- **Archetype:** Big stat with a loop diagram
- **On screen:**
  - Headline (h2): A closed loop can *save water*, too.
  - Stat: 125 million litres
  - Label: a year, per site, in Microsoft's zero-evaporation design (company estimate). First sites from late 2027.
  - Loop diagram: the same liquid circling chip → chiller → chip
  - Source line: Source: Microsoft (Aug 2024), company projection, not independently measured.
- **Accent:** none on paper; the stat is ink
- **Motion:** loop draws once (no pulsing); stat counts up 0 → 125 over 1.0 s; holds 2.5 s
- **Footer:** small logo
- **SFX:** none
- **Voiceover:** "Closed loops reuse the same liquid. Microsoft expects 125 million litres saved per site, each year."

### Scene 5 – Close – 3 s

- **Background:** ink
- **Archetype:** CTA close
- **On screen:**
  - Line (h2): Picture *plumbing*, not fans.
  - Large logo (150 px), held ≥ 1.5 s
  - Pill (accent on ink): Follow The Green Solve
  - Next-in-series: Next: data centres in space?
- **Accent:** the pill
- **Motion:** line rises; logo fades in at 0.6 s and holds to the end (2.4 s)
- **SFX:** soft resolve chord under the logo (3 of 3)
- **Voiceover:** "Picture plumbing, not fans."

---

## Timing check

| Scene | Seconds | Background |
|---|---|---|
| 1 Hook | 4.5 | ink |
| 2 Air limit | 5 | paper |
| 3 The fix | 4.5 | surface |
| 4 Water twist | 5 | paper |
| 5 Close | 3 | ink |
| **Total** | **22** | |

Note: the polished preset suggests 3–4 content scenes; this plan has 4 content scenes plus the close card.

## Voiceover script (optional, about 52 words)

> One AI rack now draws ten times a normal rack's power. All that power becomes heat. And air runs out at about twenty kilowatts. So cooling goes liquid. Water holds about 3,500 times more heat than air. Closed loops reuse the same liquid. Microsoft expects 125 million litres saved per site, each year. Picture plumbing, not fans.

## Claims check (copy-and-claims.md)

| Figure on screen | Source | Status |
|---|---|---|
| Typical rack 11 kW | Uptime Institute Global Data Center Survey 2026 (modal density) | Verified via survey coverage. Note: it is the most common value, not the average. |
| AI rack ~120 kW | NVIDIA GB200 NVL72, ~120 kW nominal (SemiAnalysis) | Verified, rounded with "~" |
| ~600 kW planned for 2027 | NVIDIA Rubin Ultra "Kyber" roadmap (reported) | ⚠️ Roadmap figure. Labelled "planned" on screen. Cut the bar if NVIDIA's own material can't be confirmed before render. |
| 10× | 120 ÷ 11 ≈ 10.9, so "10×" is conservative | Derived from the two figures above |
| Air limit ~20 kW | Yotta Data Services executive interview (2026), "15–20 kW" | ⚠️ One company source; the upper end of its range is used |
| ~3,500× | Water ~4,180 kJ/m³·K vs air ~1.2 kJ/m³·K | Physics constant, per volume |
| 125 million litres/year per site | Microsoft announcement (Aug 2024) | ⚠️ Company projection; labelled "company estimate" on screen |

Left out on purpose:
- The honest caveat that water use comes back if the heat is dumped through evaporating cooling towers. There isn't room for it in a 5 s scene, so it goes in the LinkedIn caption.
- The Bengaluru liquid-cooling factory (single market-report source).
- Liquid-cooling adoption percentages (sources conflict: 19% vs 36%).

Nothing in this piece covers offsets or credit markets, so the two TGS disclosures are not needed.
