# Content guardrail: The Green Solve (TGS) brand kit

**This rule is mandatory for every piece of content created in this repository:** carousels, reels/videos, blogs, social posts, thumbnails, covers, PDFs and any other graphic or copy. No exceptions unless the user explicitly overrides it for a specific piece.

The brand kit lives in [`brand/`](brand/). Read `brand/README.md` and `brand/TGS-Brand-Guide.pdf` before creating anything.

## 1. Colours: use only these

| Name | HEX | Use |
|---|---|---|
| Deep Teal | `#02403D` | Primary: dark backgrounds, headings, navigation |
| Lime | `#E2FF4D` | Accent: highlights, key numbers, calls to action (use sparingly) |
| Taupe | `#D8CAC3` | Secondary surfaces, cards, dividers |
| Mauve | `#665458` | Supporting text, captions, source lines |
| Cream | `#FFFDF8` | Main light background |

- Do not introduce other hues. Tints/shades of these colours (opacity) are allowed for depth and motion graphics.
- Lime text only on Deep Teal (never Lime on Cream; it fails contrast).
- Machine-readable values: `brand/brand-colors.json`.

## 2. Fonts

- **Headings:** Libre Baskerville (regular, bold; italic for selective emphasis). Files bundled in `brand/fonts/` (SIL Open Font License, from Google Fonts).
- **Body:** Helvetica Neue / Helvetica, falling back to Arial / Liberation Sans / sans-serif. Do not bundle Helvetica without a licence.
- No other display fonts.

## 3. Logos

- `brand/logo-dark.png`: Deep Teal logo for light (Cream/Taupe) backgrounds.
- `brand/logo-light.png`: Lime logo for dark (Deep Teal) backgrounds.
- The logo must appear on every carousel (cover and final slide at minimum) and in every video (end card at minimum).
- Never stretch, recolour, rotate, add effects, animate the logo shape itself (fades/slides of the whole logo are fine) or place it on busy imagery.

## 4. Voice and claims

- Professional, transparent, fact-based. Audience: sustainability managers, auditors, consultants and informed professionals. Tone for this series: India-focused and **hopeful** (problem → evidence → solution), without consumer gimmicks or hype.
- Every statistic needs a named source (and year) shown on the slide or in the video's source frame. Prefer primary sources (IEA, MNRE, CEA, MeitY, NPCI, CPCB) and state which measure a number uses when reports differ.
- Keep environmental claims conservative. No unsupported guarantees, no greenwashing.
- Never write "TGS-verified" and never imply TGS issues, verifies or certifies carbon credits. TGS is a marketplace facilitator.
- **Whenever carbon credits are mentioned**, include both required disclosures:
  - "Carbon credits do not eliminate emissions and should be used as part of a broader decarbonization strategy."
  - "Credits listed on this platform are issued and certified by third-party standards. The Green Solve acts as a marketplace facilitator."

## 5. Formats

- **Carousels:** 1080×1350 px (4:5), exported as PNG slides plus one PDF (for LinkedIn document posts). Cover slide with hook, one idea per slide, source line on stat slides, closing slide with logo and CTA.
- **Reels/videos:** 1080×1920 px (9:16), 30 fps, MP4 (H.264 + AAC), 30–60 s. Strong hook line in the first 2 seconds, motion-graphic style, Indian-English female voiceover, low background music ducked under the voice, burned-in captions, logo end card. Keep text and key visuals out of the bottom ~260 px and top ~180 px (Instagram/LinkedIn interface zones); captions sit around y 1440–1680.
- Every carousel cover and every video opening must carry a hook: a short, surprising, fact-backed line (e.g. "The internet is thirsty."), not a topic label.
- Keep examples professional and brand-appropriate. Avoid casual street-life or trivial purchase scenarios (e.g. chai-stall payments) and don't repeat the same example across pieces; each carousel and video gets its own topic and angle.
- Use only assets we create ourselves or that are licensed for reuse (original SVG/PNG graphics, synthesised music). No unlicensed stock, music or third-party logos.

## 6. Checklist before delivering any content

- [ ] Only brand colours and fonts used
- [ ] Logo present and unaltered, correct variant for the background
- [ ] Every number has a source and year
- [ ] Disclosures included if carbon credits are mentioned
- [ ] No "TGS-verified" or certification claims
- [ ] Correct size/format for the platform (Instagram + LinkedIn)

## 7. Production pipeline (how content in `content/` is built)

- Carousels: write `content/carousels/<nn-slug>/slides.html` (one `<section class="slide">` per slide, using `brand/tgs.css` + shared layout `brand/carousel.css`), then
  `NODE_PATH=$(npm root -g) node tools/render-carousel.js content/carousels/<nn-slug>` → `png/slide-NN.png` + `carousel.pdf`.
- Videos: write `script.json` (scenes + voiceover lines + sources) and `video.html` (scenes inside `#frame`, built on the shared engine `brand/motion.css` + `brand/motion.js`: `chrome()`, `captions()`, `scene()`, `endCard()`, `finish()`; see `content/videos/02-*` for a template), then:
  1. `KOKORO_DIR=<dir with kokoro.onnx + voices.bin> python3 tools/make-voiceover.py <video dir>`: Indian-English female voice (`hf_beta`), writes `timeline.json`
  2. `python3 tools/make-music.py <video dir>`: original synthesised background music + SFX (optional `"music": {"lift": <scene id>, "impacts": [s]}` in script.json)
  3. `NODE_PATH=$(npm root -g) node tools/render-video.js <video dir>`: frames → `silent.mp4` (`--stills 1,5,9` for quick previews)
  4. `tools/mix-audio.sh <video dir> <name>.mp4`: ducked music, -14 LUFS, final MP4
- Check the voiceover with a speech-recognition round trip; add pronunciation fixes to `LEXICON` in `tools/make-voiceover.py`.
- Each piece gets a `caption.md` with Instagram and LinkedIn captions, hashtags and sources.
