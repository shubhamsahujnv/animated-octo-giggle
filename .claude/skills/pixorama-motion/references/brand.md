# Pixorama brand kit

Source of truth: `https://pixoramagroup.com` (design tokens read from the site's own CSS).
If the site has moved on, re-read its CSS custom properties and update this file.

## Identity

- **Name:** Pixorama (legal/longform: Pixorama Group). Logo: a `PX` mark beside the
  `Pixorama` wordmark.
- **Tagline:** *We build AI-powered software that scales your business.*
- **One line:** engineering-led software firm, founded 2022 — cloud platforms, AI and data
  products, mobile apps, security-hardened systems, for enterprises and funded startups.
- **Positioning line used on site:** "Senior-only teams, outcomes not hours."

## Palette

Exact tokens from the site.

| Token | Hex | Use in film |
|---|---|---|
| `--ink` | `#0A0B18` | primary dark ground |
| `--dark` | `#06060F` | deepest ground, letterbox, vignette |
| `--dark-2` | `#0B0C1C` | panel ground on dark |
| `--dark-3` | `#10122A` | elevated panel on dark |
| `--paper` | `#FFFFFF` | light ground |
| `--paper-2` | `#F7F8FC` | light panel |
| `--paper-3` | `#EEF0F8` | light panel, recessed |
| `--line` | `#E7E9F4` | hairline on light |
| `--dark-line` | `rgba(255,255,255,0.09)` | hairline on dark |
| `--dark-elev` | `rgba(255,255,255,0.035)` | panel fill on dark |
| `--ink-2` | `#3A3D55` | secondary text on light |
| `--muted` | `#6A6D88` | tertiary text on light |
| `--on-dark` | `#EEF0FB` | primary text on dark |
| `--on-dark-2` | `#B7BAD8` | secondary text on dark |
| `--on-dark-muted` | `#7F82AA` | tertiary text on dark |
| `--blue` | `#3A33C9` | gradient stop 0 |
| `--violet` | `#7C3AED` | **primary brand accent**, gradient stop 1 |
| `--magenta` | `#B23FC9` | gradient stop 2 |
| `--cyan` | `#18BCCF` | cool accent, data/telemetry only |

Gradients:

```css
--grad:      linear-gradient(118deg, #3A33C9 0%, #7C3AED 52%, #B23FC9 100%);
--grad-soft: linear-gradient(118deg, #4F48E0, #8B5CF6 50%, #C065DA);
--grad-cool: linear-gradient(118deg, #18BCCF, #7C3AED, #B23FC9);
```

Brand glow (use sparingly, on the hero element only):
`box-shadow: 0 18px 50px -18px rgba(90,60,220,.55)`

**Ratio discipline:** ≈ 70% ink/dark ground, ≈ 25% on-dark text and hairlines, ≈ 5% gradient
accent. The gradient is a highlight, never the background of a whole shot.

## Type

- **Sans / everything:** **Manrope** — headings at weight 800, body 400–500.
- **Mono / machine voice:** **JetBrains Mono** — terminal, logs, code, metrics, file paths,
  anything an agent or pipeline "says".
- No third family. Headline tracking slightly tight; mono at normal tracking.

Load in a film from Google Fonts, and await `document.fonts.ready` before frame 0.

## Geometry and motion feel

From the site's tokens — reuse them so film and site read as one system.

- Radii: `10px` (sm) · `16px` (default) · `22px` (lg) · `30px` (xl) · `999px` (pill).
- Spacing scale: 4, 8, 16, 24, 32, 48, 64, 96, 128, 160.
- **House easing:** `cubic-bezier(0.22, 1, 0.36, 1)` — the site's `--ease`. Use it for
  entrances and morphs. Exits may be faster and sharper.
- Shadows: `0 4px 12px rgba(16,18,42,.06), 0 18px 40px -12px rgba(16,18,42,.12)`.

## Voice

Confident, direct, pragmatic. Short declaratives. Engineering reality over hype.
On-screen copy in the site's register:

- "Platforms that scale." · "Shipped fast, run reliably." · "Measured in outcomes, not hours."
- "Five capabilities, one engineering standard." · "Senior-only teams."

Never: "revolutionary", "game-changing", "unlock the power of", "in today's fast-paced world".

## Capabilities — the five, for shot content

1. **Cloud & Platform Engineering** — cloud-native architecture, Kubernetes, DevOps, IaC,
   legacy modernization.
2. **AI & Data Intelligence** — LLM assistants, RAG, agents, ML models, with evaluation and
   monitoring.
3. **Mobile App Development** — native iOS/Android, or React Native / Flutter.
4. **Product & Software Engineering** — custom product builds.
5. **Digital Growth & Web** — websites, SEO, product catalogues.

Delivery method (good 5-beat spine for a film): **Discover → Architect → Build → Harden →
Scale & operate.**

Engagement models: outcome-based projects · dedicated squads · specialist augmentation ·
advisory & architecture reviews. Clients own code, infrastructure, documentation.

Industries: financial services, healthcare, retail & eCommerce, logistics, SaaS, public
sector, energy, education.

## Asset sourcing

Before building, gather real assets into `assets/`:

1. Logo: pull the `PX` mark and wordmark from the site; keep an SVG if available.
2. UI/product screenshots: capture real pages with
   `node scripts/shoot_site.js https://pixoramagroup.com assets/shots/` (headless Chromium,
   deterministic viewport) — or whatever page the film is about.
3. Client logos only with permission, and only ones actually on the site.
4. Write every asset's origin into `CREDITS.md`.

Never invent a screenshot, a client name, a metric, or a logo. If a number is needed and none
is published, leave the slot out of the grid rather than filling it.
