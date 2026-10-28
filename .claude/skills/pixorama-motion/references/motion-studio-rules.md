# Motion studio rules

Four contracts: **render**, **look**, **sound**, **loop**. Read before writing animation code.

---

## 1. Render contract

**Time is a parameter.** A film is a pure function of `t`.

```js
window.__motion = {
  width: 1920, height: 1080, fps: 30, duration: 15,
  seek(t) { /* position everything from t alone */ },
  ready: Promise.all([document.fonts.ready]),   // optional; renderer awaits it
};
```

Required:

- One `index.html` per film (route A). Inline CSS/JS. External files only for fonts and
  `assets/`.
- `seek(t)` positions **every** animated element. Nothing animates on its own.
- Banned in the render path: `requestAnimationFrame` driving motion, CSS `animation` and
  `transition`, `Date.now()` / `performance.now()`, `setTimeout`, video autoplay,
  `Math.random()` without a seeded PRNG, lazy-loaded images.
- Seeded randomness only: a small xorshift/mulberry32 keyed off a constant, so grain and
  jitter are identical on every render.
- Fonts, images and SVG sprites loaded and decoded before frame 0.
- Fixed stage: a `#stage` element at exactly `width × height`, `overflow: hidden`,
  `transform-origin: 0 0`. Screenshot the stage, not the viewport.
- Device scale factor 2 for crisp type, then downscale in encode — or render at 1× and keep
  type ≥ 28px.

Local timing helpers every film should carry:

```js
const clamp01 = x => x < 0 ? 0 : x > 1 ? 1 : x;
// normalized progress of a window [a,b] in seconds
const p = (t, a, b) => clamp01((t - a) / (b - a));
// house easing, cubic-bezier(0.22, 1, 0.36, 1) approximated
const easeOut = x => 1 - Math.pow(1 - x, 3);
const easeInOut = x => x < .5 ? 4*x*x*x : 1 - Math.pow(-2*x + 2, 3) / 2;
const lerp = (a, b, x) => a + (b - a) * x;
const spring = (x, k = 1.7) => 1 - Math.cos(x * Math.PI * k) * Math.pow(1 - x, 2.2);
```

Render with `scripts/render.sh`. It steps `t = n / fps`, calls `seek(t)`, screenshots, and
encodes with ffmpeg (`-pix_fmt yuv420p`, CRF 16, `+faststart`). Any dropped or duplicated
frame is a contract violation, not a render setting.

**Frame budget.** 15s @ 30fps = 450 frames. Keep per-frame screenshot work under ~120ms or a
render blows past 2 minutes; prefer transforms and opacity over layout, blur and large
box-shadows on many elements.

---

## 2. The look contract

### Banned

- Centred headline over a purple gradient as an entire shot.
- Cut to black between shots (letterbox and vignette are fine; a cut to pure black is not).
- Stock glow blobs, lens flare, bokeh, confetti, "neural network" node-and-line wireframes
  used as decoration, globe-with-arcs, binary rain.
- Type whose only motion is `opacity: 0 → 1`.
- More than two type families; anything outside Manrope / JetBrains Mono.
- Emoji as iconography; cartoon illustration; 3-D bevelled "app icon" renders.
- Invented metrics, invented client logos, invented UI.
- Every shot the same length. Every transition the same transition.
- Text smaller than 24px at 1080p, or any text on screen under 0.6s.
- More than 7 words on a card.

### House grammar

- **One container, no cuts.** The hero is a single surface that changes size, radius and fill
  across the film. States swap *behind* a 6–10px blur over ~160ms while the container morphs.
  This is Pixorama's signature move: software being built, continuously.
- **Transitions carry meaning.** Morph for "same thing, new state". Push for "next step in
  the pipeline". Scale-through for "zoom into detail". Pick per shot; write it in the grid.
- **Type enters on a transform with intent** — mask-reveal up for headlines, per-character
  stagger (18–26ms) for mono, slide + 2px blur for labels. It leaves faster than it entered.
- **Mono is the machine voice.** Terminals, logs, agent output, file paths, metrics: JetBrains
  Mono, `--on-dark-2`, caret where something is being typed.
- **Gradient is accent.** Violet→magenta on a stroke, a progress bar, a glow under the hero
  card, a single word. Never a whole background.
- **Hairlines and grids.** `rgba(255,255,255,.09)` 1px rules and a faint 8px dot grid give the
  dark ground structure. Parallax them at ~0.3× the hero's motion.
- **Grain.** A static seeded 2–3% noise overlay stops the frame reading as flat vector.
- **Camera.** One continuous move per shot at most: a slow push (1.00 → 1.04 scale) or a
  lateral drift. Never both. Hold perfectly still for emphasis beats.
- **Shot rhythm.** Mix lengths: 0.8s stabs, 1.6s beats, one 3s hold for the payoff. The grid
  decides; the code obeys.
- **Logo.** Appears once, at the end, on its own hold of ≥ 1.2s with the tagline. Never
  watermarked in a corner for the whole film.

### Safe areas

1920×1080: keep type inside a 96px margin. For the 1080×1920 cutdown, everything essential
inside the centre 1080×1350; for 1080×1080, inside the centre square. Check the cutdowns
before declaring done — don't crop and hope.

---

## 3. Sound contract

See `references/audio-sync.md` for the pipeline. The contract:

- Three layers on one timeline: **music**, **SFX**, **picture**. Never bake sound into the
  picture render.
- Music synthesized in code at **120 BPM** (2 beats/sec — lands cleanly on a 30fps grid:
  1 beat = 15 frames).
- `beats.json` is the clock: `{ bpm, beats: [], downbeats: [], hits: [] }`.
- The picture is **retimed to the JSON**, not the reverse. Shot boundaries land on downbeats;
  type hits land on beats.
- Every visible impact has a sound: click on a cursor press, whoosh on a container morph,
  tick on a counter, thump on the logo. Every sound has a visible cause.
- Mix: music −18 LUFS bed, SFX −12 peaks, VO −16 and ducking music by 6dB. Master to
  −14 LUFS, true peak ≤ −1 dBTP.
- Always ship a silent variant — most feeds autoplay muted, so the film must read without sound.

---

## 4. Feedback loop contract

No film is delivered on its first render.

1. Render.
2. `scripts/extract_frames.sh out/film.mp4 qc/ 0.5` — pull a frame every half second and
   **look at them**. Read your own film as a contact sheet.
3. Self-score on the 8 axes in `references/critique-loop.md`.
4. Fix only what scored < 8, cheapest fix first.
5. Re-render, re-score. Typically 3 rounds. Stop when every axis is ≥ 8, or when the user
   says ship.
6. Log each round's scores in `CRITIQUE.md` so rounds don't regress each other.

Ambitious films are not one-shot: expect dozens of render/critique cycles for anything
character-driven or over 30 seconds.
