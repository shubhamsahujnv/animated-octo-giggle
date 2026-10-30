# AI's Climate Bill — 60-second narrated explainer

**File:** `explainer-60s.mp4` · 1080×1920 vertical · 30fps · 61.9s · poster `explainer-60s.jpg` · subtitles `explainer-60s.srt`
**Design:** *editorial-carousel-design* (The Green Solve brand) — serif headlines with one italic emphasis, ink #02403D + lime #E2FF4D, one idea per scene, a source line on every number
**Motion:** */brag* rules — hook first, cuts on the beat, staggered transitions, every frame postable, settled hook frame baked in as frame 0
**Voice:** Kokoro `af_heart` at 1.1× speed (the open-source narrator /brag uses), generated locally by `work/voiceover.py`
**Music:** original, 96 BPM, A minor (Am–F–C–G), ducked under the voice with a sidechain compressor; final mix −16.3 LUFS, peak −1.5 dBFS

The on-screen headlines carry the whole story, so the video also works muted. `explainer-60s.srt` adds word-level subtitles for platforms that burn them in.

---

## Scene table

| # | Time | Scene | Background | On screen | Narration |
|---|---|---|---|---|---|
| 1 | 0:00–0:06.9 | **Hook** | dark | "America's AI boom could eat up ***44% of its power-sector climate budget***" + ring counting to 44% | "America's AI boom could eat up forty-four percent of its power-sector climate budget. Here's how." |
| 2 | 0:06.9–0:14.4 | The scale | light | Columns: ~4% (183 TWh, 2024) → 9–12% (2030) | "Data centres used about four percent of US power in 2024. By 2030, up to twelve." |
| 3 | 0:14.4–0:20.6 | Old coal, new life | stone | 15 plant icons flip from "due to close" to "kept running" | "To keep up, at least fifteen coal plants that were due to close kept running last year." |
| 4 | 0:20.6–0:26.9 | Always on | dark | "40%+" counts up, bar fills 40% | "AI needs power around the clock, and gas already supplies over forty percent of it." |
| 5 | 0:26.9–0:34.4 | Pledges under pressure | light | Ranked bars: Amazon +182%, Microsoft +155%, Meta +145%, Alphabet +138% | "Big Tech's own emissions rose by up to 182 percent between 2020 and 2023." |
| 6 | 0:34.4–0:40.6 | Thirsty servers | stone | Drop + 10 person icons (1 = 1 million Americans) | "Cooling those servers could take 1.1 billion cubic metres of water a year." |
| 7 | 0:40.6–0:46.9 | The air we breathe | light | "$20bn+" + cards: ~1,300 deaths a year; 90%+ from power plants | "And the pollution could cost over twenty billion dollars a year in public health, by 2030." |
| 8 | 0:46.9–0:53.1 | The hopeful part | dark | 44% (fossil) vs 4% (renewable) bars + "what changes it" note | "The good news? On clean power, the same boom uses just four percent of that budget." |
| 9 | 0:53.1–1:01.9 | **Call to action** | dark | "AI's future is an energy choice. ***Let's make it clean.***" + comment question + Save / Share / Follow The Green Solve + logo | "The future of AI is an energy choice. Should it run on clean power? Comment below, and follow The Green Solve." |

## Sources on screen

| Claim | Source |
|---|---|
| 44% of the 2035 power-sector budget (and 4% on renewables) | Center for Biological Diversity, *Data Crunch* (2025). Projection. |
| 183 TWh / ~4% in 2024; 9–12% by 2030 | Pew Research / IEA (2024 use); EPRI (2024) and LBNL (2024) projections |
| 15 coal plants kept running in 2025 | DeSmog analysis of US EIA retirement data (Dec 2025) |
| Gas over 40% of US data-centre power | IEA, *Energy and AI* (2025) |
| Operational emissions +138–182%, 2020→2023 | ITU & World Benchmarking Alliance, *Greening Digital Companies* (2025) |
| Up to 1.1 billion m³ of water a year by 2030 | Cornell University, *Nature Sustainability* (2025). Upper end of a 731–1,125 million m³ range. |
| $20bn+ a year in health costs; ~1,300 deaths | UC Riverside & Caltech, *The Unpaid Toll* (2024). **Preprint, not peer-reviewed** — labelled as such on the slide. |

## Checks run

- **Layout:** stills of every scene and of mid-transition moments. No single words left alone on a last line, no text colliding with source lines (smallest gap 55px), no empty bottom thirds, no overflow.
- **Transitions:** old content exits before the new scene fades in, so no muddy double exposure.
- **Audio:** the rendered MP4 was transcribed back with Whisper. All nine lines are intelligible and inside their scenes. Mix is −16.3 LUFS, peak −1.5 dBFS.
- **Video:** 1080×1920, 30fps, 61.87s, H.264 + AAC, faststart. Frame 0 is the settled hook poster.

## Left out on purpose

- **"One AI query = 10× a web search."** From a 2024 EPRI estimate (2.9 Wh vs 0.3 Wh). Newer estimates from Epoch AI, OpenAI and Google put a typical query near 0.24–0.34 Wh, so the ratio is disputed and it isn't used.
- **"150% rise in structural carbon emissions."** The Google AI Mode answer attributed this to construction, but it is the ITU average rise in *operational* emissions, already covered in scene 5.

## Rebuilding

```bash
python3 work/voiceover.py af_heart
```

```bash
python3 work/music.py work/music-explainer.wav 61.875 6.875 14.375 20.625 26.875 34.375 40.625 46.875 53.125
```

```bash
node work/render-video.js explainer-60s.html work/music-explainer.wav explainer-60s.mp4 4.0
```

Changing the narration changes the scene lengths, since `work/voiceover.py` lays scenes out from the measured voice-over length rounded to the beat. Copy the new `start`/`dur` values from `work/vo/timings.json` into the `data-start` / `data-dur` attributes in `explainer-60s.html` and update `TOTAL`.
