# Director's brief

For anything ambitious — over 30s, character-driven, narrated, or a client deliverable.
Fill all twelve sections before building. Short films can collapse 7 and 8.

Save as `BRIEF.md` in the working directory.

---

```markdown
# <Film name> — director's brief

You are the director, animator, sound designer, and render engineer for <film name>,
a film made in code for Pixorama.

## 1. Film in one line
<One sentence. The whole film. If it needs two, the film isn't focused yet.>

## 2. References
- <url or local path> — take: <pacing / transition grammar / type behaviour / palette feel>
- <...>
Take the grammar of a reference, never its content, logos, characters, or footage.
Run the extraction in references/reference-grammar.md and commit STYLE.md.

## 3. Audience and placement
<Who sees this, where, at what size, with sound on or off. Drives type size and the
silent-variant decision.>

## 4. Tools and keys
- Route: <A code-drawn / B framework / C mixed / D edit>
- Renderer: scripts/render.sh (headless Chromium + ffmpeg)
- Skills/MCPs loaded: <e.g. Fish Audio MCP for VO, Figma MCP for source frames>
- APIs available: <image/video model, if route C>
- Anything NOT available: <state it, so the plan doesn't assume it>

## 5. Brand bible
Inherit references/brand.md. Record here only the deltas for this film:
- Palette slice: <4–5 tokens, not all ten>
- Type: Manrope 800 headlines / JetBrains Mono machine voice
- Logo use: <when and once>
- Copy register: <sample lines, in Pixorama's voice>

## 6. Subject bible
For each recurring subject — a UI surface, a pipeline, a character, a device — define it
once and never contradict it:
- Identity: <what it is>
- States: <rest / active / loading / success / error>
- Proportions and radii: <exact>
- Palette: <exact tokens>
- How it moves: <morph, never cut; easing; typical duration>
- Never: <things that would break it>
A character also needs: silhouette, three-quarter/profile/front, expression set, scale
relative to the frame, and what it never does.

## 7. Beat sheet
<Prose version of the arc: hook / proof / payoff, with approximate seconds. The table lives
in SHOTLIST.md after the grid gate.>

## 8. Text on screen
<Every word that appears, verbatim, in order, with its shot number. Nothing improvised at
code time. ≤ 7 words per card.>

## 9. Sound
- Music: <synthesized in code, 120 BPM / supplied file / none>
- SFX: <inventory, each tied to a visible cause>
- VO: <script verbatim, voice, or none>
- beats.json drives the picture; see references/audio-sync.md

## 10. Workflow gates
1. STYLE.md written (if a reference was given) — stop, show it.
2. Beat grid printed — stop, wait for approval.
3. First render + contact sheet — stop, show it.
4. Critique rounds until every axis ≥ 8 — show the score table each round.
5. Formats rendered and checked for crop safety — then deliver.
Do not pass a gate silently.

## 11. Critique loop
Score the 8 axes in references/critique-loop.md after every render. Fix only < 8. Log all
rounds in CRITIQUE.md. Target: all ≥ 8.

## 12. Deliverables
- out/film-1920x1080.mp4 (master, H.264, yuv420p, CRF 16, +faststart)
- out/film-1080x1920.mp4, out/film-1080x1080.mp4
- out/film-silent.mp4
- out/poster.png
- SHOTLIST.md, STYLE.md, BRIEF.md, CRITIQUE.md, CREDITS.md
```

---

## Notes on using it

- "Go all out" in the ask is an effort multiplier on top of high/max reasoning effort — it
  licenses more shots, more detail, more critique rounds, not more decoration.
- A film that names its genre ("show reel", "launch film", "case-study reel") inherits that
  genre's rules; say which genre in section 1.
- Long runs are normal for ambitious work: many model calls and many render/critique cycles.
  Checkpoint by committing `BRIEF.md`, `SHOTLIST.md`, `STYLE.md` and each round's render so
  a long run can resume.
