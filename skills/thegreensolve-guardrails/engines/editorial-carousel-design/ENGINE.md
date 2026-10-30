---
name: editorial-carousel-design
description: Design polished, editorial-style social carousels (Instagram 1080×1350 + LinkedIn PDF) for any brand or product, using a proven layout system (serif headlines with italic emphasis, deep ink + one bright accent, hook cover, one idea per slide, sourced stats, CTA close) and exporting PNG slides, a PDF and a contact sheet. Use this whenever the user wants a carousel, slide post, LinkedIn document post, Instagram swipe post or "design like The Green Solve / TGS" for a brand, product or campaign, including when they supply a brand kit, logo, colours or fonts and want consistent on-brand social graphics, even if they don't say "carousel".
---

# Editorial carousel design

A reusable design system for evidence-led social carousels, originally built for The Green Solve. The layout, typography, rhythm and components stay the same. Each brand plugs in its own five colours, two fonts and logos through a `brand.json`.

## What you produce
For each carousel: `slides.html` (source), `png/slide-01…NN.png` (1080×1350, for Instagram), `carousel.pdf` (for a LinkedIn document post), `contact-sheet.png` (for review) and a `caption.md` with Instagram and LinkedIn captions.

## Workflow

### 1. Set up the brand once per product
Collect from the user, or from their brand kit: brand name, 5 colours, heading and body fonts, and two transparent logo PNGs (one for dark backgrounds, one for light). Map their palette onto the five **roles**:

| Role | What to pick from their palette |
|---|---|
| `ink` | Their deepest brand colour (navy, forest, aubergine…) |
| `accent` | One bright, high-energy colour, used sparingly |
| `surface` | A soft neutral or tint for cards and dividers |
| `muted` | A mid-dark grey/brown for supporting text |
| `paper` | A warm off-white background |

If the brand has no clear ink colour, darken their primary until it reaches roughly 7:1 contrast with white. If they give only one or two colours, derive the rest and tell them what you chose.

Copy `assets/brand.template.json` to the project as `brand.json`, fill it in, then run:
```bash
python3 <skill>/scripts/make_tokens.py brand.json <project-dir>
```
This writes `<project-dir>/brand/` (tokens.css, carousel.css, fonts, trimmed logos). It also prints a **contrast report**: fix any `LOW` line by adjusting the colour before designing, because unreadable text can't be rescued later. `examples/the-green-solve/brand.json` is a complete worked example.

Fonts: `{"google": "Family"}` downloads from Google Fonts; `{"files": {...}}` uses licensed local files; `{"family": "Name"}` references a system font without bundling it (use this for fonts like Helvetica that can't be redistributed).

### 2. Plan the carousel before designing
Write the slide plan as a short list first: one line per slide with its purpose, headline and the one fact it carries. Then follow the 9-slide rhythm in `references/design-system.md` §5 (hook cover → basics → evidence → hopeful turn → what to do → CTA). Content rules that make this style work:
- **The cover is a hook, not a topic label.** It should be a surprising, true, specific line ("By 2030, data centres could use more electricity than Japan does today."), not "All about data centres".
- **One idea per slide.** If a slide needs two headlines, it's two slides.
- **Every number has a source line** (publisher + year) on that slide. Verify figures before using them; if reports disagree, say which measure you used. Leave out any figure you can't stand behind.
- **Problem → evidence → solution.** Include an honest caveat where needed; it builds trust with professional audiences.
- Follow the brand's voice and any required disclosures from `brand.json`.

### 3. Build the slides
Copy `assets/template.html` to `<project>/carousels/<nn-slug>/slides.html`. Each of its 9 slides is a different layout archetype (hook cover, definition, explainer rows, before/after bars, ranking bars, timeline, progress ring, checklist, CTA close), so keep, reorder, duplicate or delete them as the plan needs. Replace every `[bracketed]` placeholder. Use only role variables (`var(--ink)`, `var(--accent)`, …) for colour, so the design stays on-brand automatically.

For anything the template doesn't cover, read `references/design-system.md`: canvas and grid, type scale, component catalogue, data-viz rules and common mistakes.

### 4. Render and review
```bash
node <skill>/scripts/render.js <project>/carousels/<nn-slug>
```
(If Playwright isn't found: `NODE_PATH="$(npm root -g)" node …`, or `npm i -D playwright && npx playwright install chromium`.)

Then **look at `contact-sheet.png`** and fix what you see before delivering. Rendering is cheap, so iterate:
- no headline leaves a single word alone on its last line, and no text runs into the source line or footer
- no slide has an empty bottom third (enlarge cards, stats or type, or add a note)
- charts are proportional and labelled; the accent highlights only the key thing
- logo is on every slide (small in the footer, large on the close) and is the right version for the background
- the renderer's `CHECK:` warnings are resolved or deliberately accepted

### 5. Write captions
Add `caption.md` beside the slides with an **Instagram caption** (hook line + emoji, 3–5 short lines or ✅ points, a question CTA, 8–12 hashtags including the brand tag) and a **LinkedIn caption** (professional, data-forward, bullet or arrow list, a discussion question, a sources line, 3–5 hashtags). Never invent statistics in captions that aren't on the slides.

### 6. Deliver
Give the user the PNGs (zipped if many), the PDF and the captions. Mention anything you couldn't verify or chose to leave out.

## Files in this skill
- `assets/carousel.css`: layout + components, colour-role based (copied into each project by make_tokens)
- `assets/template.html`: 9-slide starter covering every layout archetype
- `assets/brand.template.json`: brand config to fill in
- `scripts/make_tokens.py`: brand.json → tokens, fonts, logos, contrast report
- `scripts/render.js`: slides.html → PNGs, PDF, contact sheet, overflow and missing-file checks
- `references/design-system.md`: full spec (grid, roles, type, rhythm, components, data viz, mistakes)
- `examples/the-green-solve/`: the original brand, as a worked example
