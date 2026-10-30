# Images: the editorial carousel system

Every TGS still (carousel, single post, story, link image, thumbnail, video poster) is built with the editorial-carousel-design engine bundled at `engines/editorial-carousel-design/`. Its full spec is `engines/editorial-carousel-design/references/design-system.md`; its workflow is `engines/editorial-carousel-design/ENGINE.md`. This file lists what the guardrail adds or tightens.

## Set up the brand folder once per project
```bash
python3 <skill>/engines/editorial-carousel-design/scripts/make_tokens.py <skill>/brand/brand.json <project>
```
```bash
cp <skill>/assets/tgs-overrides.css <skill>/assets/video-frame.css <project>/brand/
```
Always use `<skill>/brand/brand.json`. Never re-type the hex values or swap fonts. The contrast report prints one known `LOW`-adjacent pair (muted on surface, 4.42 : 1); `tgs-overrides.css` resolves it by switching stone-slide supporting text to ink.

In every `slides.html`, link `tokens.css`, then `carousel.css`, then `tgs-overrides.css`.

## Rules on top of the engine

1. **Canvas from `scale.md` §1 only.** Carousels and single posts are `portrait` 1080×1350 unless the platform needs otherwise. A new size gets added to `scale.md` first.
2. **Scale from `scale.md` §2–3 only.** Type sizes and gaps come from the token tables (static column). No ad-hoc sizes.
3. **Colour roles only.** `var(--ink)`, `var(--accent)`, `var(--surface)`, `var(--muted)`, `var(--paper)` and `color-mix()` tints of them. No other hex values in slide markup.
4. **Rhythm.** Cover and close on ink; never three slides with the same background in a row; large logo on the close, small logo in every footer, right version for the background.
5. **One idea, one accent per slide.** Accent text never sits on paper or surface.
6. **Every number has a source line** on the same slide (see `copy-and-claims.md`).
7. **Carbon-credit disclosures** whenever credits are mentioned.
8. **No stock photos, gradients, drop shadows (except the pill pop), country maps or symbol-like icons.** Real TGS product screenshots or TGS-supplied project photos are allowed only inside a 26 px-radius card, never full-bleed behind text.
9. **Link images and thumbnails** (`link`, `thumb`): ink background, one headline (≥ 64 px native) with one italic phrase, logo. Nothing else.

## Render and gate
```bash
node <skill>/engines/editorial-carousel-design/scripts/render.js <project>/carousels/<nn-slug>
```
```bash
python3 <skill>/scripts/check_guardrails.py <project>/carousels/<nn-slug>
```
Then look at `contact-sheet.png` and run the engine's review list (orphan words, empty bottom thirds, proportional charts, logo on every slide, `CHECK:` warnings resolved). Deliver PNGs, `carousel.pdf`, `caption.md`, and anything you could not verify or left out.
