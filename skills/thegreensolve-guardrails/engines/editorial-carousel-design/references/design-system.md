# Editorial carousel design system: the spec

This is the system behind the template. Read it when you need to design a slide the template doesn't cover, or when something looks "off" and you need to know which rule it breaks.

## Contents
1. Look and feel
2. Canvas and grid
3. Colour roles and how to use them
4. Typography scale
5. Slide rhythm (which background when)
6. Component catalogue
7. Data visualisation rules
8. Iconography and graphics
9. Common mistakes

---

## 1. Look and feel

Editorial, calm, evidence-led: the feel of a well-designed annual report or a quality magazine, not a sales flyer. Four things create it:
- a **serif headline** with a single **italic phrase** carrying the emphasis
- a **deep, saturated ink colour** paired with **one bright accent**, used sparingly
- **generous margins** and one idea per slide
- **sources printed on the slide**, small and quiet

If a slide feels loud, remove things before adding any.

## 2. Canvas and grid

| Spec | Value | Why |
|---|---|---|
| Slide size | 1080 × 1350 px (4:5) | Largest feed format on Instagram; also clean as a LinkedIn PDF page |
| Side margins | 88 px | Keeps text clear of Instagram's crop and feels premium |
| Top padding | 96 px | Space for the kicker above the headline |
| Footer baseline | 56 px from bottom | Slide counter (left) + small logo (right) |
| Source line | 132 px from bottom | Sits just above the footer, never collides with content |
| Content safe zone | y ≈ 96 → 1160 | Keep cards and charts out of the bottom 190 px |
| Card radius | 22–28 px | Soft, consistent; bars 10–14 px |
| Gaps | 18–24 px between cards; 44–80 px between sections | One rhythm everywhere |

## 3. Colour roles and how to use them

Five roles. Every brand maps its palette onto these, and the CSS only ever uses the roles.

| Role | Used for | Rule of thumb |
|---|---|---|
| `ink` | Dark slides, headings on light slides, dark cards, leading bar | The brand's deepest colour. ≥ 7:1 against paper |
| `accent` | Key numbers, italic emphasis on dark slides, CTA pill, the one highlighted bar/arc | Use it for one thing per slide, two at most. It loses power if it's everywhere |
| `surface` | Third slide background, card borders, secondary bars, dividers | A soft, low-chroma tone |
| `muted` | Lead paragraphs, captions, source lines on light slides | ≥ 4.5:1 against paper |
| `paper` | Light slide background, text on ink | Slightly warm white beats pure #FFF |

Derived tokens (computed by `make_tokens.py`):
- `--accent-on-ink`: the accent if it reads on ink (≥ 3:1), else paper.
- `--on-accent`: whichever of ink or paper reads best on the accent (pill text, accent cards).
- **Emphasis on light slides:** a bright accent (like lime or yellow) can't be used as text on paper, so `<em>` becomes a **highlighter underlay** under ink text. A darker accent (like coral or blue) stays as coloured text. The script picks this automatically.

Tints: use `color-mix(in srgb, var(--role) N%, transparent)` for depth (glass cards, faint tracks, translucent text). Don't introduce new hues.

## 4. Typography scale

| Element | Font | Size / line-height | Notes |
|---|---|---|---|
| Kicker | body, 600, uppercase, 0.18em tracking | 22 px | Preceded by a 44 px rule; accent on dark, muted on light |
| Cover headline (`h1`) | heading, 700 | 80–92 px / 1.12 | Max ~5 lines. Italic punch phrase in 400 italic |
| Slide headline (`h2`) | heading, 700 | 60–72 px / 1.14 | 2–3 lines; force line breaks with `<br>` so no single word sits alone on a line |
| Lead | body | 34–36 px / 1.45 | muted on light; 86% paper on dark |
| Card title (`.ttl`) | heading, 700 | 36–44 px / 1.2 | |
| Body / sub | body | 26–33 px / 1.4 | Never below 24 px except source lines |
| Big stat | heading, 700 | 120–210 px / 1 | Unit at ~40% size beside it ("958M", "24bn") |
| Source line | body | 20–21 px / 1.4 | "**Source:** Publisher, report (year)." |
| Footer | body, 500, 0.08em tracking | 22 px | "02 / 09" counter |

Italic emphasis: one phrase per headline, the part that carries the meaning ("*more electricity than Japan*", "*getting cleaner.*").

## 5. Slide rhythm

A 9-slide carousel alternates backgrounds so each swipe feels like a new beat:

| # | Purpose | Background |
|---|---|---|
| 1 | Hook cover | dark |
| 2 | Basics / definition | light |
| 3–6 | Evidence: one idea per slide | mix light, dark, stone; never 3 of the same in a row |
| 7 | The hopeful turn + honest caveat | dark |
| 8 | What to do (checklist / questions) | light or stone |
| 9 | Takeaway + next-in-series + CTA | dark |

Cover and closing slide are always dark with the large logo on the close. Every slide carries the small logo in the footer.

## 6. Component catalogue

All are in `assets/template.html` (copy the markup) and styled by `carousel.css`.

| Component | Class / markup | Use for |
|---|---|---|
| Kicker | `.kicker` | Section label above every headline |
| Icon cards (3-up) | `.grid3 > .card.ink` | Definitions: "Store / Process / Deliver" |
| Explainer rows | `.stack > .card.paper.row` | 2–3 causes or drivers, icon + title + sentence |
| Numbered tiles (2×2) | `.grid2 > .card` with `.num` | 4 drivers / reasons; one tile in ink or accent for emphasis |
| Table of contents | `.toc` | "5 reasons" preview slide |
| Big stat | `.stat` | One headline number with unit and label |
| Ranking bars | `.bars > .bar` | Shares, city/segment comparisons; leader in `i.lead` |
| Before/after bars | inline SVG (slide 4 of template) | Growth between two years |
| Progress ring | SVG circle with `stroke-dasharray` | Share of a target (e.g. 54%, 300 of 500 GW) |
| Timeline | `.timeline > .ev` | Policy or history, 3 events max |
| Quote / analogy | `.quote` | A memorable one-liner |
| Note | `.note` with `<b>` lead-in | "Honest note:", "The result:", "Why it matters:" |
| Checklist | `.check` | Questions to ask, actions to take |
| Next card + pills | `.next`, `.ctas > .pill` | Closing slide CTA |

## 7. Data visualisation rules

- One chart per slide, one message per chart. Title the slide with the takeaway, not the chart type.
- The thing you want people to see gets `accent` (on dark) or `ink` (on light); everything else is `surface` / `muted`.
- Label values directly on or beside bars; skip axes and legends where possible.
- Bar widths must be proportional to the real numbers (state the measure if reports disagree).
- If a chart is illustrative rather than exact, say so in the source line ("Chart is illustrative of the trend.").
- Rings: `stroke-dasharray = "<2πr × share> <2πr>"`; for r = 150, 2πr ≈ 942.5.

## 8. Iconography and graphics

- Simple geometric line or solid icons drawn as inline SVG, 4–6 px strokes, round caps.
- Colour icons with the roles only (`var(--accent-on-ink)` on dark cards, `var(--ink)` on light).
- Illustrations are flat and diagrammatic (buildings, racks, panels, pins), built from rectangles and paths. No stock photos, no gradients beyond role tints, no drop shadows except the stamp/pill pop.
- Avoid drawing country maps (borders are politically sensitive); use pins, labelled bars or cards instead.

## 9. Common mistakes

| Mistake | Fix |
|---|---|
| Headline wraps leaving one word alone on the last line | Add `<br>` or rephrase |
| Empty bottom third of a slide | Enlarge cards/stats (padding 56–72 px), add a note or quote, or increase type |
| Text over the logo or source line | Keep content above y ≈ 1160 |
| Accent text on a light background | Use the highlighter `em` or ink text |
| Three similar slides in a row | Change background or layout archetype |
| Numbers without a source | Add a `.source` line; if unsure of the figure, cut it |
| Ornamental icons that read as symbols (a cross, a religious sign) | Pick a clearly functional icon (plug, leaf, chip) |
