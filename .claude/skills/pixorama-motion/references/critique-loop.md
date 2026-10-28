# Critique loop (gate)

After every render: pull a contact sheet, look at it, score, fix only what is weak, repeat.

```bash
scripts/extract_frames.sh out/film.mp4 qc/round-1/ 0.5
```

Then read the frames — actually read them — and score.

## The eight axes

Score 1–10. Anything < 8 is a defect with a named fix.

| # | Axis | 8+ means |
|---|---|---|
| 1 | **Brand fidelity** | palette, type, radii, easing all match `brand.md`; gradient is accent not ground; logo used once |
| 2 | **Composition** | clear focal point per frame; type inside safe area; nothing tangent to an edge; deliberate asymmetry |
| 3 | **Motion quality** | house easing throughout; no linear moves; no pops; morphs read as one object; no jitter |
| 4 | **Rhythm** | shot lengths vary; boundaries on downbeats; at least one still hold; the payoff gets room |
| 5 | **Depth** | foreground/ground separation via hairlines, blur, parallax, shadow; frame is not flat vector |
| 6 | **Legibility** | every word readable at 0.25× scale; nothing on screen under 0.6s; ≤ 7 words a card |
| 7 | **Message** | a stranger can state what Pixorama does after one watch, muted |
| 8 | **Craft** | no clipped edges, no half-loaded asset, no z-fighting, no banding, grain consistent, first and last frame clean |

Plus, when a reference was given: **reference fidelity** — does the rhythm and type behaviour
match `STYLE.md`'s rules (not its pictures)?

## Fix order

Cheapest structural fix first, decoration last:

1. Timing (grid constants) — fixes rhythm, legibility, message.
2. Composition and type scale.
3. Easing and transition type.
4. Depth cues: hairlines, parallax, blur, shadow.
5. Texture: grain, vignette.

Never fix a low score by adding a glow.

## Log every round

`CRITIQUE.md`:

```markdown
## Round 1
| Axis | Score | Defect | Fix |
|---|---|---|---|
| Brand fidelity | 9 | — | — |
| Composition | 6 | headline tangent to top safe edge in shots 2–4 | drop to 128px baseline |
| Motion quality | 7 | counter ticks linearly | easeOut on the value, ticks stay on beat |
| Rhythm | 8 | — | — |
| Depth | 5 | flat; no separation behind hero card | add dot-grid parallax 0.3x + hairline |
| Legibility | 9 | — | — |
| Message | 7 | "what they do" unclear muted | add capability labels on shots 3–5 |
| Craft | 8 | — | — |

## Round 2
<...only the axes that were < 8, plus a check that nothing regressed>
```

Re-score **all** axes each round — a depth fix often costs legibility. Three rounds is
typical; stop when every axis is ≥ 8 or the user says ship. Show the user the table each
round rather than silently iterating.
