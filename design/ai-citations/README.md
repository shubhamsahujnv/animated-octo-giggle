# AI citation domains — Pixorama social card

1080×1350 (4:5), rendered at 2× → 2160×2700 PNG.

## Design source
Tokens lifted directly from the live pixoramagroup.com stylesheet
(`/_next/static/css/1d8142b12372d992.css`, `:root` block):

- Type: Manrope (800 for headings), JetBrains Mono (eyebrows/labels, `.26em` tracking)
- Ink `#0a0b18` · ink-2 `#3a3d55` · muted `#6a6d88`
- Brand gradient `linear-gradient(118deg, #3a33c9, #7c3aed 52%, #b23fc9)`
- Radii `--r-lg: 22px`, lines `#e7e9f4`, `--shadow-sm` / `--shadow`
- PX logo mark is the site's own inline SVG

Fonts in `fonts/` are the site's self-hosted latin woff2 subsets, so the
type matches exactly without a network call at render time.

## Re-render
    node shot.js

## Chart note
All bars share one global scale (max = 32.3%, AI Overviews / youtube.com),
so bar length is comparable across all six panels — same as the source chart.

## Takeaway band
The three figures in the lower band are derived from the panel data, not
asserted. Verified before use:

- `27x` — youtube.com, 32.3% (AI Overviews) vs 1.2% (Gemini)
- `4 of 5` — engines with reddit.com in their top five; Perplexity is the exception
- `Zero` — social/video domains (youtube/facebook/instagram) in ChatGPT's or
  Perplexity's top five

Note "4 of 5" counts the five engines only, excluding the "All five AI
engines" aggregate panel.
