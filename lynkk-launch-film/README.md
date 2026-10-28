# Lynkk for Mac: launch film

A 78 second launch film rendered from code. `shots.md` is the approved script,
`brand.md` and `style.md` are the rules, `beats.json` is the 120 BPM grid,
`index.html` is the timeline (every frame is a pure function of time),
`score.py` writes the music and sound design, `render.mjs` renders and encodes.

```bash
./make.sh          # whole film -> out/lynkk-mac-launch_0-78s.mp4
./make.sh 0:12     # a slice
node render.mjs --stills 3.5,8.2 --outdir stills   # look at single frames
```

Needs Node, Chromium via Playwright, ffmpeg and Python 3 with numpy.
Claims follow `../lynkk-post-kit/docs/TRUTHS.md`.
