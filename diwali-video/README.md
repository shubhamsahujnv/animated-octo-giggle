# GreenSolve · Diwali wish videos

| File | Format | Length | Use |
|------|--------|--------|-----|
| `greensolve_diwali_story.mp4` | 1080×1920 (9:16) | 15 s | **Instagram Story**: a short Diwali wish |
| `greensolve_diwali_reel.mp4` | 1080×1920 (9:16) | 55 s | **Instagram Reel**: the full story, reframed for vertical |
| `greensolve_diwali.mp4` | 1920×1080 (16:9) | 55 s | YouTube, LinkedIn, WhatsApp and presentations |

All three are 30 fps H.264 with AAC stereo music.

## Instagram Story: the Diwali wish (15 s)

A flower rangoli blooms ring by ring around a glowing diya under the line *"This Diwali, let's light up lives, not the sky."* It then turns into the greeting card: a marigold toran, **Happy Diwali**, *May your light be bright, and your footprint light.*, the GreenSolve mark, and a row of diyas. Text stays inside Instagram's safe zone, clear of the profile bar at the top and the reply bar at the bottom.

## Reel and landscape video

### The story: *The Little Diya That Cleared the Sky*

| # | Time | Scene | Narration |
|---|------|-------|-----------|
| 1 | 0–9 s | A rooftop view of Meera's town on Diwali night. Firecrackers burst, and smog hangs over the rooftops. | *Every Diwali, Meera's little town glowed with a thousand lights… but every year, the sky above it grew a little more grey.* |
| 2 | 9–18 s | Meera steps onto her terrace, places a single clay diya on the ledge, and the flame catches. | *One evening, Meera placed a single clay diya on the ledge and wondered: "What if our light didn't have to cost the Earth?"* |
| 3 | 18–27 s | A solar panel rises on her terrace. Then, house by house, panels and solar fairy lights appear across the town. Saplings are planted, and the smog starts to thin. | *So her family switched to solar: sunshine, saved for the night. Then the neighbours followed, one rooftop at a time.* |
| 4 | 27–36 s | Close-up: a flower-petal rangoli is drawn ring by ring around a glowing diya. | *They painted rangoli with flower petals instead of chemical colours… and gifted saplings instead of firecrackers.* |
| 5 | 36–45 s | Diyas light up across every rooftop, the saplings grow, the sky clears to a deep starry night, and a shooting star passes. | *That Diwali, the whole town shone brighter than ever, and for the first time in years, they could see the stars.* |
| 6 | 45–55 s | Greeting card with a marigold toran, a row of diyas and rising bokeh: **Happy Diwali** · *May your light be bright, and your footprint light.* · GreenSolve leaf-diya mark · *Wishing you a bright, green & prosperous Diwali*. | |

In the Reel, the camera follows the story across the rooftops: it pans along with the solar panels as they appear, then follows the wave of diyas. Captions sit in the open night sky at the top of the frame.

The soundtrack is also generated in code. It has a tanpura drone and a santoor-like melody in raag Bhupali. Distant firecrackers play in the opening, a chime sounds when the diya is lit, and a sparkle plays for each ring of the rangoli. It ends on a warm closing chord.

## Re-rendering / customising

Requirements: Python 3, `numpy`, `Pillow`, and `ffmpeg` on the PATH.

```bash
cd diwali-video
python3 make_video.py --format story      # 15 s Instagram Story  (1080x1920)
python3 make_video.py --format reel       # 55 s Instagram Reel   (1080x1920)
python3 make_video.py --format landscape  # 55 s landscape video  (1920x1080)
python3 make_video.py --format reel --preview 14 43   # still frames written to ./preview/
```

* **Change the words**: edit `story.py` (story captions, Story-greeting caption, card text, brand name).
* **Use the real company logo**: put a transparent `logo.png` in this folder. It replaces the drawn leaf-diya mark and the wordmark on the closing card.
* **Music**: edit `soundtrack.py`.

## Credits

All artwork, animation and music are original and generated procedurally. The fonts come from Google Fonts under the SIL Open Font License (see `fonts/OFL-*.txt`): Playfair Display, Poppins and Great Vibes.
