# Baseline Journal banner template

This template reproduces the existing `/og/<slug>.jpg` journal banners: a 1200×630 JPEG with the teal card, the lime
"THE BASELINE JOURNAL" pill, the Space Grotesk title, the author and date line, and the tgs mark (`tgs-mark.png`, cut from a live banner).
Long titles shrink automatically to fit, and line breaks are balanced.

To regenerate, run this from this folder. It needs Node with Playwright, and network access for Google Fonts.

```bash
node render.js '[{"t":"Article title","a":"TGS Editorial","d":"20 Nov 2026","out":"../my-slug.jpg"}]'
```

Use a non-breaking space (` `) to keep a phrase on one line, e.g. `Scope 1, 2 and 3`.
