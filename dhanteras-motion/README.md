# Green Dhanteras — TheGreenSolve motion graphic

`dhanteras-tgs.mp4`: 1080×1920 (9:16 Reels/Stories), 30 fps, 22 s, H.264 + AAC.

**Brand:** TGS deep teal `#02403D`, lime `#E2FF4D`, cream `#FFFDF8`; Space Grotesk (display) and DM Sans (body); official `tgs` leaf logo on the end card.

| Time | Scene |
|---|---|
| 0–3.6 s | Night sky, a mango-leaf and marigold toran drops in, a clay diya lights: "शुभ धनतेरस / Happy Dhanteras" |
| 3.6–8.6 s | Gold coins rain into a kalash and turn lime as they fall, then a sapling sprouts: "This Dhanteras, green is the new gold." |
| 8.6–13.8 s | Hills with wind turbines and solar panels rise, and the sapling becomes a tree. Three tips: clay diyas, solar/LED lights, gift a sapling |
| 13.8–17.6 s | A leaf and marigold rangoli blooms around a diya: "Invest in wealth that grows." |
| 17.6–22 s | Cream wipe to the end card: TGS logo, "Wishing you a prosperous & sustainable Dhanteras", thegreensolve.com |

## Banners
- `banner-landscape-1920x1080.png`: 16:9, for LinkedIn, X, YouTube, website hero or email header
- `banner-square-1080x1080.png`: 1:1, for an Instagram or Facebook feed post
- `banner-story-1080x1920.png`: 9:16, for Instagram and Facebook Stories, WhatsApp status or a Reels cover

Both are drawn by `banner.html` (`?size=landscape`, `?size=square` or `?size=story`) with the same drawing kit as the video (`lib.js`).

## Rebuild
```bash
python3 make_audio.py   # synthesised soundtrack -> assets/soundtrack.wav
node render.js          # renders index.html frame-by-frame -> dhanteras-tgs.mp4
node render.js --banners  # -> banner-*.png
```
To preview live, serve the folder (for example with `python3 -m http.server`) and open `index.html`. Add `?t=12` to freeze on one moment.
