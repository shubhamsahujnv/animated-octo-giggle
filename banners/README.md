# PXO AI — "Listen In" Ep. 1 (Dental Clinic) campaign assets

Social banners for the PXO AI *Listen In* series, matched to the video's visual
language: dark teal gradient field, the Aria orb (cyan → mint conic ring),
Inter Display headline, JetBrains Mono eyebrow, and the end-card line
**"Closed. Still answering."**

The PXO mark is rebuilt as vector (traced from the video end card), so it stays
crisp at 2560px with no background bleed.

## Output

| File | Size | Use |
|---|---|---|
| `pxo-banner-x-header-1500x500.png` | 1500×500 | X / Twitter header |
| `pxo-banner-linkedin-profile-1584x396.png` | 1584×396 | LinkedIn personal profile |
| `pxo-banner-linkedin-company-1128x191.png` | 1128×191 | LinkedIn company page |
| `pxo-banner-youtube-channel-2560x1440.png` | 2560×1440 | YouTube channel art |
| `pxo-banner-og-card-1200x630.png` | 1200×630 | OG / link preview, Facebook share |

### Layout notes

- **YouTube** — all text sits inside the 1546×423 safe area, so nothing clips on
  the mobile or desktop crop. The two orbs sit outside that strip by design and
  only show on the TV-size render.
- **LinkedIn profile** — text is held left of 55% width so the profile photo
  overlay doesn't cover it.
- **LinkedIn company page** — at 191px tall the proof chips are dropped and the
  subhead shortened.
- **OG card** — uses the stacked end-card composition (mark inside the orb),
  since the canvas is near-square.

## Regenerating

```bash
node banners/render.js banners/
```

Edit `banners/render.js` to change copy or add sizes (e.g. Instagram 1080×1350
or 1080×1080); `banners/banner.html` holds the layout engine and the three
layout modes (`left`, `stacked`, `wide`).

Requires Playwright + Chromium, and the Inter Display / JetBrains Mono fonts
installed locally.
