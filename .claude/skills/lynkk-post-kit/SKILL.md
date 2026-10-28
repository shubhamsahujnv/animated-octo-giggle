---
name: lynkk-post-kit
description: >
  Design and render Lynkk-branded visual work in the Grid design system: social posts
  and carousels (Instagram, LinkedIn, X, Stories), link images, blog headers, and any
  other Lynkk-branded still or motion piece that must match lynkk.ai. Use whenever the
  task involves Lynkk and visual design, Lynkk brand colors, fonts or tokens, a Lynkk
  claim, a Lynkk post, slide, carousel, caption or alt text, or a Lynkk launch video,
  animation or motion graphic. It carries the authoritative product truths, the brand
  voice rules and the real design tokens, so read it before writing any Lynkk copy or
  drawing any Lynkk pixel, even when the output is not a post.
---

# Lynkk post kit (Grid design system)

The kit lives at **`lynkk-post-kit/`** in the repository root. It is the source of
truth for Lynkk brand work. Do not restyle it, and do not invent a Lynkk look.

## Read before doing anything

Read these in order, every time, from `lynkk-post-kit/`:

1. `CLAUDE.md` — the operating instructions for this kit.
2. `docs/TRUTHS.md` — **what the product really does. Every claim must be in it.**
3. `docs/DESIGN.md` — the visual laws (night band, ruled column, two inks, plates,
   violet as a label, no shadows, Inter 400/500 only, system radii).
4. `docs/COPY.md` — voice: no em dashes, no filler words, no competitor names, no
   prices, no exclamation marks.
5. `docs/BLOCKS.md` — the classes to build with.
6. The reference renders: `posts/example-lynkk-vs-notetakers/out/*.png` and
   `gallery/out/*.png`. Match that level.

`kit/grid/tokens.css` and `kit/grid/components.css` are copied unchanged from the
lynkk.ai design system. Never edit them. New reusable blocks go in `kit/post.css`
**and** get a board in `gallery/index.html`.

## Workflow for a post

```bash
cd lynkk-post-kit
npm run setup                                   # once: Playwright + Chromium
node scripts/new.mjs <kebab-name> --slides 5    # --size portrait|square|story|wide|linkedin
# edit posts/<name>/post.html and posts/<name>/captions.md, replacing every TODO
node scripts/render.mjs posts/<name> --pdf      # checks copy, renders 2x PNGs, audits layout
```

Plan the slides in chat first. Then scaffold, fill, render, **look at every PNG with
the Read tool**, fix what reads badly, render again. `render.mjs` refuses to export
while the copy check has errors and prints `LAYOUT` lines for overflow, clipping and
text too small to read on a phone. "It should look fine" is not done.

Finish with `captions.md` (Instagram caption, LinkedIn caption, alt text per slide)
and a report of any claim you left out because `TRUTHS.md` did not support it.

## In this environment

Chromium and Playwright are preinstalled at `/opt/pw-browsers`. Do **not** run
`npx playwright install` — it fetches a second copy that will not be found. Instead:

```bash
cd lynkk-post-kit && ln -s /opt/node22/lib/node_modules/playwright node_modules/playwright
```

or set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` before `npm install --ignore-scripts`.

## Beyond posts

For Lynkk work the kit has no block for (a launch video, an animation, an app-store
screenshot set), the kit still governs: take the tokens from `kit/grid/tokens.css`,
the visual laws from `docs/DESIGN.md`, the voice from `docs/COPY.md` and **every
factual claim** from `docs/TRUTHS.md`. Build the new thing outside `posts/`, and say
in the handover which rules you had to extend and why.
