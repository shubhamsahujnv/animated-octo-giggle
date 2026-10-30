# Video: brag, held to the TGS system

Every TGS video goes through the **brag** workflow (github.com/latent-spaces/brag, MIT): inspect → plan → compose → check/render → deliver. brag supplies the story structure, pacing, audio and render pipeline. The TGS system supplies the look, the scale and the claims rules. Where they conflict, TGS wins.

Install brag if it isn't present (any one of these):
```bash
npx skills add https://github.com/latent-spaces/brag --skill brag
```
```bash
npx skills add https://github.com/latent-spaces/brag --skill brag-slim
```
brag needs Node 22+, FFmpeg and the Hyperframes CLI (`npx hyperframes doctor`). brag-slim needs only tools already on the machine. Either is fine; the overrides below apply to both.

## Overrides to brag

### Tone
| brag tone | TGS status | How to use it |
|---|---|---|
| `polished` | **Default** | 3–4 scenes, 4–6 s each, soft crossfade `--t-xfade` |
| `app-store` | Allowed | Product/feature launches; clean slide or wipe 0.35–0.45 s |
| `default` | Allowed | Lighter explainers; crossfade or clean slide |
| `deadpan` | Allowed | Myth-busting a single fact; long holds, big empty space |
| `cinematic` | Allowed, restrained | Major campaign only; scale 0.95→1 entrances, no epic claims without a source |
| `chaotic` | **Banned** | ALL CAPS, tilted words, flash and zoom cuts break the scale and the voice |
| `yc-parody` | **Banned** | Parody undermines trust on a greenwashing-sensitive topic |

A freeform tone maps to the nearest allowed preset. If the user insists on a banned tone, explain why and offer `deadpan` or `cinematic` instead.

### Look
- Colours, fonts and logos come from `brand/brand.json` via `brand/tokens.css`, plus `assets/video-frame.css`. brag's "Visual identity" block in `brag-plan.md` and `composition-brief.md` is filled with: Background `#02403D` (ink) or `#FFFDF8` (paper), Text `#FFFDF8` / `#02403D`, Accent `#E2FF4D`, Display font Libre Baskerville, Body font Helvetica Neue.
- Canvas, safe zones, type sizes and motion come from `references/scale.md` (video columns). Format: `landscape` 1920×1080 (default), `vertical` 1080×1920, `square` 1080×1080, all 30 fps.
- Scene backgrounds follow the carousel rhythm: hook on ink, then alternate paper / ink / surface (never three alike in a row), close on ink with the large logo (150 px) held ≥ 1.5 s. Small logo (54 px) in the footer of every other scene.
- Scenes centre their content in the safe box (`.tgs-scene.center`) unless a chart needs the full height; an empty half-frame reads as unfinished.
- Accent marks one thing per scene. No gradients, glows, particle systems, waveform/equalizer visuals, stock footage or full-bleed photos behind text.

### Scenes are animated carousel archetypes
"Show the thing" for TGS means the real platform UI when the video is about the product, and otherwise the carousel's evidence components brought to life. Build scenes from these, one idea per scene:

| Carousel archetype | Scene version |
|---|---|
| Hook cover | Headline settles in (`tgs-in-rise`), italic phrase last; holds ≥ 1.8 s |
| Definition (3 icon cards) | Cards arrive one by one (`--stagger`), then hold as a set |
| Explainer rows | Rows rise in turn; each holds to its reading floor |
| Before/after bars | Bars grow 0 → true value with `--ease-out`, value label lands with the bar end |
| Ranking bars | Leader bar in accent (dark) / ink (light) grows last |
| Big stat | Counter ticks 0 → value over ≤ 1.2 s, then holds ≥ 1.5 s with its source line |
| Progress ring | Arc draws to the true share, then holds |
| Timeline | Max 3 events, revealed in order |
| Checklist | Ticks appear one per beat (every other beat if < 0.6 s apart) |
| CTA close | Ink, large logo, one pill, next-in-series line |
| Product flow (platform UI) | Entry → key action → result, with a simulated cursor; fictional data only |

### Audio
- Music bed 0.25–0.35 volume (never above 0.5); 0.12–0.18 for `deadpan`.
- 2–4 subtle SFX total (`polished` posture), 0.55–0.7 volume, aligned to the start of the motion. No casino, glitch or heavy impact sounds.
- Strong-cue locks: 1–3 per video, within ±0.15 s; sequential beats within ±0.10 s.
- Voiceover only when asked (`--voice`); music ducks to 0.12–0.15 under it. Narration never extends the 15–25 s window.

### Length and pacing
15–25 s, target 18–22 s. Reading floors from `scale.md` §6 are hard limits: if a scene carries more text than its time allows, cut copy or split the scene; never speed text up. When carbon credits are mentioned, the closing disclosure card may add up to 5 s.

## Deliverables (brag + TGS)
`brag.mp4` (poster baked as frame 0), `brag.jpg` (strongest settled frame, which must itself pass the image rules), `brag-plan.md`, `composition-brief.md`, `share-copy.txt` (with disclosures when needed), `caption.md` (Instagram + LinkedIn, see `copy-and-claims.md`), and `composition/`.

## Gate
Before delivering:
1. `npx hyperframes check` passes with zero errors (brag), or brag-slim's still review shows no overflow, collisions or low contrast.
2. `python3 <skill>/scripts/check_guardrails.py <output-dir>` passes: canvas size, fps, duration, scene sum, tone, palette, fonts, banned phrases, sources, disclosures.
3. Look at stills from every scene and from mid-transition. A crossfade between two busy layouts must stagger (old out, then new in) or dip through ink/paper.
