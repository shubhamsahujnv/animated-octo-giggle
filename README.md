1.⁠ ⁠Tools Installed
I installed Cursor IDE and Git. For Claude Code and Codex, I used their web versions instead of installing extensions. I also used GitHub to create and manage the repository.

2.⁠ ⁠Steps Completed
First, I installed Cursor and Git on my system. After that, I logged in to Claude Code and Codex, created a public GitHub repository, opened it in Cursor, created the README.md file, and added the required details. Finally, I committed the changes and pushed the repository to GitHub.

3.⁠ ⁠The main issue I faced was installing Git on Mac. During the installation, there were some setup and configuration issues in the terminal, which took some time to fix. After completing the installation and configuration properly, Git started working fine. Other than that, I did not face any major issues.

###################################################################################
## Pixorama Motion Studio skill

`.claude/skills/pixorama-motion/` — a Claude Code skill that generates branded
motion-graphics videos for [pixoramagroup.com](https://pixoramagroup.com): launch films,
product/UI films, case-study reels and social cutdowns, written as code and rendered
deterministically to MP4.

Invoke it by asking for a video, launch film, motion graphics or animated UI demo for
Pixorama, or with `/pixorama-motion`.

```
.claude/skills/pixorama-motion/
  SKILL.md                     pipeline, render contract, gates, banned looks
  references/
    brand.md                   palette, type, geometry, voice — read from the live site CSS
    motion-studio-rules.md     render / look / sound / loop contracts
    beat-grid.md               the pre-code gate
    directors-brief.md         12-section brief for ambitious films
    reference-grammar.md       extracting grammar from a reference film
    audio-sync.md              120 BPM beat map, SFX vocabulary, mixing
    critique-loop.md           8-axis scoring, fix order
    shipping.md                formats, checks, deliverable set
  scripts/
    render.sh / render.js      headless Chromium frame stepper + ffmpeg encode
    extract_frames.sh          contact sheet for QC or reference reading
    beats.js                   beats.json + synthesized music bed
    shoot_site.js              deterministic real screenshots for assets
  templates/
    film-template.html         working 15s reference film in the house grammar
```

Requires Node with Playwright and `ffmpeg` on PATH.

```bash
.claude/skills/pixorama-motion/scripts/render.sh \
  .claude/skills/pixorama-motion/templates/film-template.html out/film.mp4
```
