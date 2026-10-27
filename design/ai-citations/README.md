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
