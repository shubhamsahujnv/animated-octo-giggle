1.⁠ ⁠Tools Installed
I installed Cursor IDE and Git. For Claude Code and Codex, I used their web versions instead of installing extensions. I also used GitHub to create and manage the repository.

2.⁠ ⁠Steps Completed
First, I installed Cursor and Git on my system. After that, I logged in to Claude Code and Codex, created a public GitHub repository, opened it in Cursor, created the README.md file, and added the required details. Finally, I committed the changes and pushed the repository to GitHub.

3.⁠ ⁠The main issue I faced was installing Git on Mac. During the installation, there were some setup and configuration issues in the terminal, which took some time to fix. After completing the installation and configuration properly, Git started working fine. Other than that, I did not face any major issues.

###################################################################################

## The Green Solve: image and video guardrails

`skills/thegreensolve-guardrails/` is a Claude skill that every TGS image and video must go through. It combines:

- **editorial-carousel-design** (bundled under `engines/`) for stills: carousels, posts, stories, thumbnails, posters
- **brag** ([latent-spaces/brag](https://github.com/latent-spaces/brag)) for video: launch videos, reels, animated posts

They share one scale (`references/scale.md`): canvases and safe zones, type, spacing, the five colour roles, motion and reading-time floors. The skill also covers TGS voice and claim rules, including the required carbon-credit disclosures.

| Path | What it is |
|---|---|
| `skills/thegreensolve-guardrails/SKILL.md` | The guardrail: non-negotiables and workflow |
| `skills/thegreensolve-guardrails/references/` | `scale.md`, `images.md`, `video.md`, `copy-and-claims.md` |
| `skills/thegreensolve-guardrails/assets/` | `tgs-overrides.css` (stills), `video-frame.css` (video) |
| `skills/thegreensolve-guardrails/scripts/check_guardrails.py` | The automated gate |
| `dist/thegreensolve-guardrails.skill` | The same skill packaged for upload to Claude |
| `examples/tgs-sample/` | A carousel and a video storyboard built with the guardrails; both pass the check |

Check any output folder:

```bash
python3 skills/thegreensolve-guardrails/scripts/check_guardrails.py examples/tgs-sample
```
