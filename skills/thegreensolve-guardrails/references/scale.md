# The TGS scale

One scale for every image and every video frame The Green Solve publishes. It is the editorial-carousel scale (engines/editorial-carousel-design/references/design-system.md), extended to more canvases and to motion using brag's timing rules.

All pixel values are at the **reference short side of 1080 px**. On any other canvas multiply by `s = short side ÷ 1080` (a 4K landscape video has s = 2; a 1200×630 link image has s ≈ 0.58). Every 1080-based format below has s = 1, so the numbers are used as written.

## 1. Canvases

| Key | Size (px) | Used for | Side margin | Top pad | Content must end by (y) | Footer baseline |
|---|---|---|---|---|---|---|
| `portrait` | 1080 × 1350 | Instagram carousel & single post, LinkedIn PDF page | 88 | 96 | 1160 | 56 from bottom |
| `square` | 1080 × 1080 | Instagram/LinkedIn single post, square video | 88 | 88 | 890 | 56 from bottom |
| `vertical` | 1080 × 1920 | Reels, Stories, Shorts, brag `--format vertical` | 120 (platform buttons sit on the right) | 260 | 1400 (the bottom ~380 px is covered by platform UI) | 400 from bottom |
| `landscape` | 1920 × 1080 | brag default, YouTube, LinkedIn/web video | 120 | 96 | 890 | 56 from bottom |
| `link` | 1200 × 630 | Open Graph / link previews | 64 | 56 | 560 | none (logo top-left or bottom-right) |
| `thumb` | 1280 × 720 | YouTube thumbnail | 72 | 64 | 656 | none |

Rules that apply to all canvases:
- The **source line** sits 132 px (× s) above the bottom edge on `portrait`, `square` and `landscape`, and 476 px above the bottom on `vertical` (y ≈ 1444), just above its raised footer. Nothing else may enter that band.
- `link` and `thumb` carry **one headline + logo only**: no source lines, no paragraphs, headline ≥ 64 px at native size.
- Any canvas not in this table must be added here (with margins) before it is used.

## 2. Type scale

Same two fonts everywhere: **Libre Baskerville** (headings, stats, quotes) and **Helvetica Neue** with the Helvetica/Arial/Liberation Sans fallback (everything else).

| Token | Role | Font / weight | Static image | Video (minimum) | Line height |
|---|---|---|---|---|---|
| `--fs-source` | Source line, disclosures | body 400, `<b>` 700 | 21 | 24 | 1.4 |
| `--fs-kicker` | Kicker (uppercase, 0.18em tracking, 44 px rule) | body 600 | 22 | 26 | 1 |
| `--fs-footer` | Slide counter | body 500, 0.08em | 22 | 22 | 1 |
| `--fs-body` | Card body, sub, note | body 400 | 28 | 34 | 1.4 |
| `--fs-lead` | Lead paragraph | body 400 | 36 | 40 | 1.45 |
| `--fs-title` | Card title `.ttl` | heading 700 | 40 | 44 | 1.2 |
| `--fs-h2` | Slide / scene headline | heading 700 | 66 | 72 | 1.14 |
| `--fs-h1` | Cover / hook headline | heading 700, italic phrase 400 | 86 | 96 | 1.12 |
| `--fs-stat` | Big number (unit at ~40%) | heading 700 | 120–210 | 160–260 | 1 |

Video sizes are larger because moving text is read in less time, usually on a phone. Never go below 24 px (× s) for anything a viewer must read; only the source line may sit at 21 px, and only on static images.

One italic emphasis phrase per headline. Headlines: h1 ≤ 5 lines, h2 ≤ 3 lines, no single word alone on the last line.

## 3. Spacing scale

Use only these steps (× s). They are the values the carousel CSS already uses.

| Token | px | Typical use |
|---|---|---|
| `--sp-1` | 8 | icon-to-label nudge |
| `--sp-2` | 16 | kicker rule gap, tight stacks |
| `--sp-3` | 22 | gap between cards |
| `--sp-4` | 32 | lead below headline |
| `--sp-5` | 44 | card padding, max motion travel |
| `--sp-6` | 56 | footer baseline, roomy card padding |
| `--sp-7` | 72 | section gap |
| `--sp-8` | 88 | side margin (portrait, square) |
| `--sp-9` | 96 | top padding |
| `--sp-10` | 132 | source line offset |

Radii: cards 22–28, bars 10–14, pills 999.

## 4. Colour scale

Five roles only (from `brand/brand.json`). No other hues, no gradients beyond `color-mix()` tints of a role, no pure #FFFFFF or #000000.

| Role | Hex | Allowed on | Never |
|---|---|---|---|
| `ink` | #02403D | backgrounds (hook, close, dark scenes), headings on light | — |
| `accent` | #E2FF4D | key number, italic emphasis on ink, CTA pill, the one highlighted bar/arc | as text on paper or surface (1.1 : 1); more than ~15% of any frame |
| `surface` | #D8CAC3 | stone backgrounds, card borders, secondary bars | as text |
| `muted` | #665458 | supporting text **on paper only** (6.95 : 1) | as text on surface: 4.42 : 1 fails AA for small text; use ink there |
| `paper` | #FFFDF8 | light backgrounds, text on ink (11.5 : 1) | — |

Measured contrast for this palette: ink/paper 11.46, accent/ink 10.34, muted/paper 6.95, ink/surface 7.30, **muted/surface 4.42 (fails)**, accent/paper 1.11 (fails). `assets/tgs-overrides.css` fixes the muted/surface case automatically.

## 5. Motion scale (video and animated posts)

From brag's timing rules, held to TGS restraint.

| Token | Value | Use |
|---|---|---|
| `--t-micro` | 200 ms | ticks, glows, dot accents |
| `--t-exit` | 300 ms | element exits |
| `--t-enter` | 450 ms (range 300–600) | element entrances |
| `--t-xfade` | 700 ms (range 600–800) | scene crossfade (`polished`) |
| `--t-slow` | 1000 ms | `deadpan` / `cinematic` transitions |
| `--stagger` | 120–180 ms | between sibling non-text items |
| `--ease-out` | cubic-bezier(0.22, 1, 0.36, 1) | entrances |
| `--ease-in-out` | cubic-bezier(0.65, 0, 0.35, 1) | crossfades, wipes |

Movement limits: travel ≤ 44 px (`--sp-5`); scale only 0.95 → 1.00; no rotation, no tilted words, no zoom cuts, no flash frames, no strobing or pulsing (accessibility and brand). Bars, rings and counters animate from 0 to the true value and then hold.

## 6. Time scale (reading floors)

A line counts as "on screen" only once it is fully in and settled.

| Item | Minimum settled time |
|---|---|
| Label of 1–3 words | 0.8 s |
| Headline or sentence | 0.3 s per word, at least 1.2 s |
| Hook line (scene 1) | 1.8 s |
| Big stat + its label | 1.5 s |
| Source line | the whole time its number is visible, and at least 1.5 s |
| Carbon-credit disclosure | in the source band of every scene that mentions credits, plus a closing disclosure card held ≥ 3 s; total on-screen time ≥ 0.25 s per word |
| Logo on close | 1.5 s |

Total length: 15–25 s (18–22 s is the target). The closing disclosure card, when required, may add up to 5 s beyond 25 s; nothing else may (narration never extends the window). Sequential text on a fast beat snaps to every other beat or holds as a set.
