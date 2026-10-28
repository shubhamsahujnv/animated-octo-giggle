# The beat grid (gate)

Before any animation code, print the state list on the beat grid and stop for approval.
The grid is cheap to change; 450 frames of code is not.

At 120 BPM: 1 beat = 0.5s = 15 frames @ 30fps. 1 bar (4 beats) = 2s = 60 frames.

## Format

One row per **state**, not per shot — a shot with three states gets three rows.

| # | In | Out | Bar.beat | Container | Content | Type on screen | Transition in | Camera | Sound |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 0.00 | 1.50 | 1.1 | 420×260 r22 ink | PX mark drawing | — | stroke draw-on | still | sub thump |
| 2 | 1.50 | 3.00 | 1.4 | 980×560 r16 dark-2 | architecture diagram | "Platforms that scale." | morph + blur swap | push 1.00→1.03 | whoosh |
| 3 | 3.00 | 4.00 | 2.3 | 980×560 | k8s pods filling | — | content swap | still | 4 ticks on beat |
| … | | | | | | | | | |
| n | 13.80 | 15.00 | 8.2 | 560×320 r30 | PX + wordmark | tagline | scale-through | still | thump + tail |

Also state above the table:
- **Film in one line.**
- **Duration / fps / format.**
- **Palette slice** actually used (don't use all ten).
- **The one idea** each third carries — hook (0–4s), proof (4–11s), payoff (11–15s).

## Rules the grid must satisfy

- Shot lengths vary; no two adjacent rows the same duration.
- Every `Out` equals the next `In` — no gaps, no overlaps, no black.
- Row boundaries land on a beat; shot (not state) boundaries land on a **downbeat**.
- No more than 7 words in any `Type on screen` cell.
- Every row's `Transition in` is named and justified by meaning (morph / push / scale-through /
  mask-reveal), never "fade".
- At most one camera move per shot, and at least two full stills in a 15s film.
- The last row holds ≥ 1.2s on logo + tagline.
- Every `Sound` entry has a visible cause in the same row.

## After approval

Freeze the grid into `SHOTLIST.md` and derive timings from it in code as named constants:

```js
const BEATS = [
  { id: 'mark',    in: 0.00, out: 1.50 },
  { id: 'arch',    in: 1.50, out: 3.00 },
  // ...
];
```

so a timing change is a one-line edit, not a hunt through the animation.

If the user asks for a change after code exists, change the grid first, then the constants.
