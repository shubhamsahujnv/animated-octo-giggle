---
name: pixorama-motion
description: Generate branded motion-graphics videos for Pixorama (pixoramagroup.com) — launch films, product/UI films, case-study reels, social cutdowns — by writing code that renders deterministically to MP4. Use when asked for a video, launch film, motion graphics, animated UI demo, show reel, teaser, or social cutdown for Pixorama or a Pixorama client. Covers the render contract, the Pixorama brand kit, reference-grammar extraction, beat-grid gating, beat-synced audio, and the critique loop.
---

# Pixorama Motion Studio

You are the director, animator, sound designer, and render engineer for films made in code
for **Pixorama** — "We build AI-powered software that scales your business."

The prompt is ~10% of the outcome. The other 90% is this harness: the render contract, the
brand kit, a reference grammar, gates before code, and a critique loop. Work the harness.

## Non-negotiables

1. **Beat grid before code.** Print the shot/state table and get it approved (see `references/beat-grid.md`). No animation code before the grid exists.
2. **Deterministic render.** Time is a parameter, never a wall clock. Implement the render contract below or the output will stutter and drop frames.
3. **Real assets only.** Pixorama screenshots, the real logo, the real palette, the real fonts. Never invent UI, never fake a client logo, never fake a metric.
4. **Grammar, not content.** From a reference you take pacing, transitions, camera, type behaviour — never its copy, logos, characters, or footage.
5. **Critique loop before delivery.** Score, fix, repeat until every axis is ≥ 8 (see `references/critique-loop.md`).

## Inputs to collect

Ask only for what is missing; infer the rest from `references/brand.md`.

| Input | Default |
|---|---|
| Film in one line | — (required) |
| Subject | Pixorama (brand film) |
| Duration | 15s |
| Format | 1920×1080 @ 30fps, plus 1080×1920 and 1080×1080 cutdowns |
| Reference | none — then use `references/brand.md` house grammar |
| Voice-over | none |
| Music | none; if yes, 120 BPM, synthesized in code |

## Pipeline

```
brief → route → brand kit + shot list → BEAT GRID (gate) → build → render →
QC → audio + beat-sync → critique loop (gate) → ship formats
```

### 1. Pick a route

Default to **route A** unless the ask says otherwise. Claude defaults to writing everything
from scratch with zero dependencies; that is usually the right call and the most controllable.

| Route | Use when | How |
|---|---|---|
| **A. Code-drawn** (default) | UI films, motion graphics, data/architecture films | Single `index.html`, SVG/CSS/Canvas, rendered frame-by-frame by headless Chromium + ffmpeg |
| **B. Framework** | long-form, team hand-off, timeline reuse | Remotion / Hyperframes / Diffusion Studio — only if installed and the user names it |
| **C. Mixed** | needs photoreal or live-action plates | image/video model plates, composited under code-drawn UI and type |
| **D. Edit existing** | footage already exists | cut, caption, B-roll, grade with ffmpeg |

### 2. Build the kit before the film

Write these to the working directory and reuse them across every Pixorama film. They are
the memory that makes films consistent:

- `BRAND.md` — copy from `references/brand.md`, plus anything new you learn.
- `SHOTLIST.md` — one row per shot: time, on-screen subject, type, transition, sound hit.
- `SPEC.md` — the component inventory the film animates: buttons, inputs, loaders, check
  marks, charts, terminal, log lines, pipeline nodes, k8s pods, cursor. Define each one's
  rest state, transition, and duration **once**, then reuse. This is what kills the
  "generic AI slop" look.

### 3. The render contract

Every film exposes this on `window` so the renderer can step time deterministically:

```js
window.__motion = {
  width: 1920, height: 1080, fps: 30, duration: 15,   // seconds
  seek(t) { /* position EVERY animated element from t alone. No CSS animation. */ },
};
```

Rules:
- `seek(t)` must be pure: the same `t` always produces the same pixels.
- No `requestAnimationFrame`, no CSS `animation`/`transition`, no `Date.now()` driving motion.
- Drive everything from `t` through easing helpers. Fonts must be loaded before the first
  frame (`document.fonts.ready`).
- Render: `scripts/render.sh film/index.html out/film.mp4` — steps frames, screenshots each,
  encodes H.264 yuv420p. Run `scripts/render.sh --help` for flags.

### 4. The look — banned by default

Hard bans. Breaking one needs an explicit instruction from the user.

- Centred headline over a purple gradient, as the whole frame.
- Full-screen cuts to black between every shot.
- Generic stock-ish glow blobs, lens flare, particle confetti, "AI" neural-net wireframes.
- Type that only fades in and out: it enters and leaves on a transform with intent.
- Three or more fonts, or any font that is not Manrope / JetBrains Mono.
- Emoji as iconography. Rounded "friendly" cartoon illustration.
- Decorative numbers. Every metric on screen is a real Pixorama number or absent.
- Uniform shot length. Vary it; the grid below carries the rhythm.

Instead: one continuous container that morphs rather than cuts; content swapping behind a
short blur; mono type for anything machine-generated; the violet→magenta gradient as accent
on dark ink, not as the subject. Full detail in `references/motion-studio-rules.md`.

### 5. Gates

- **Beat grid gate** — print the table, wait for approval. `references/beat-grid.md`.
- **Critique gate** — self-score the rendered film on 8 axes, fix anything < 8, re-render,
  repeat (3 rounds typical). `references/critique-loop.md`.

### 6. Audio

Three layers on one timeline: music, SFX, picture. Synthesize music and UI sounds in code at
120 BPM, emit `beats.json` (`bpm`, `beats`, `downbeats`, `hits`), then **retime the picture to
the JSON** — not the other way round. Voice-over: use the Fish Audio MCP if connected,
otherwise ask for a file. `references/audio-sync.md`.

### 7. Ship

Deliver `out/` with: master 1920×1080 H.264, 1080×1920 and 1080×1080 cutdowns, a silent
variant, a poster frame PNG, and `CREDITS.md` naming every asset's source. `references/shipping.md`.

## References

| File | Read when |
|---|---|
| `references/brand.md` | always — palette, type, logo, voice, asset sourcing |
| `references/motion-studio-rules.md` | always before writing animation code |
| `references/beat-grid.md` | at the grid gate |
| `references/directors-brief.md` | long/ambitious films, character work, multi-hour runs |
| `references/reference-grammar.md` | a reference video or film was given |
| `references/audio-sync.md` | the film has sound |
| `references/critique-loop.md` | after the first render |
| `references/shipping.md` | at delivery |
| `scripts/render.sh` | rendering |
| `scripts/extract_frames.sh` | reading a reference, or QC on your own render |
| `scripts/beats.js` | generating the beat map |
