# Shipping

## Formats

Master first, cutdowns from the master's source — re-render at the target size when type
would break under a crop, which it usually does for 9:16.

```bash
# master (the renderer already produces this)
scripts/render.sh film/index.html out/film-1920x1080.mp4

# vertical and square: re-render, don't crop, so type can re-layout
scripts/render.sh film/index.html out/film-1080x1920.mp4 --width 1080 --height 1920
scripts/render.sh film/index.html out/film-1080x1080.mp4 --width 1080 --height 1080

# silent variant
ffmpeg -i out/film-1920x1080.mp4 -an -c:v copy out/film-silent.mp4

# poster frame (pick the payoff hold, not frame 0)
ffmpeg -ss 13.2 -i out/film-1920x1080.mp4 -frames:v 1 -y out/poster.png
```

Make the film responsive to `window.__motion.width/height` — read the stage size in `seek`
and switch layout at `height > width`. A 9:16 film is not a cropped 16:9 film.

Encode settings for all deliverables: H.264 High, `-pix_fmt yuv420p`, CRF 16,
`-movflags +faststart`, AAC 256k. Keep a lossless intermediate only if a client asks.

## Final checks

- [ ] First and last frame clean (no half-animated element, no missing font).
- [ ] Plays in QuickTime and in a browser `<video>` tag.
- [ ] Reads muted.
- [ ] Nothing essential outside the safe area in each format — open each one and look.
- [ ] No invented metric, client logo, or UI anywhere in frame.
- [ ] `CREDITS.md` names the source of every asset.
- [ ] Every axis in `CRITIQUE.md` ≥ 8.

## Deliverable set

```
out/
  film-1920x1080.mp4     master
  film-1080x1920.mp4     stories / reels / shorts
  film-1080x1080.mp4     feed
  film-silent.mp4
  poster.png
BRIEF.md     the director's brief
SHOTLIST.md  the approved beat grid
STYLE.md     reference grammar, if one was used
CRITIQUE.md  every scoring round
CREDITS.md   asset provenance
film/index.html  the film itself — the source of truth, re-renderable
audio/       beats.json, music.wav, sfx.wav, vo.wav
```

Keep `film/index.html` in the repo. It is the editable master: a timing change is a constant,
a copy change is a string, and the whole film re-renders in a couple of minutes.

## Reuse

Pixorama films should get cheaper each time. After delivery, promote anything generic out of
the film and into the skill:

- A component the film invented (a k8s pod grid, a RAG pipeline diagram, a terminal) →
  add it to `SPEC.md` in the project, and if it is reusable across films, describe it in
  `references/brand.md`.
- A grammar rule that worked → add it to `references/motion-studio-rules.md`.
- A defect that recurred across two films → add it to the banned list.

That is the compounding part: the harness, not the prompt.
