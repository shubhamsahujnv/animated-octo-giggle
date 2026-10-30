---
name: thegreensolve-guardrails
description: Mandatory brand guardrails for every image and video made for The Green Solve (TGS). Combines the editorial-carousel design system (stills: carousels, posts, stories, thumbnails, posters) with the brag launch-video workflow (video, reels, animated posts) under one shared scale of canvas, type, spacing, colour, motion and timing. Use whenever you create, edit or review ANY visual or video for The Green Solve / TGS / thegreensolve, including carousels, LinkedIn or Instagram posts, reels, launch videos, thumbnails, link images, or when /brag or a carousel skill is run on a TGS project, even if the user doesn't mention guardrails.
---

# The Green Solve: image and video guardrails

Everything TGS publishes must look like one brand: an editorial, calm, evidence-led report, not a sales flyer. This skill is the gate every image and video passes through. It joins two systems:

| | Engine | What it supplies |
|---|---|---|
| **Images** | `engines/editorial-carousel-design/` (bundled) | Layouts, components, tokens, render to PNG/PDF |
| **Video** | **brag** (github.com/latent-spaces/brag, install separately) | Story structure, pacing, audio, render to MP4 |
| **Both** | this skill | One scale, one palette, one voice, one checker |

When an engine's default conflicts with a rule here, this skill wins.

## The non-negotiables

1. **Brand source of truth:** `brand/brand.json` (ink #02403D, accent #E2FF4D, surface #D8CAC3, muted #665458, paper #FFFDF8; Libre Baskerville + Helvetica Neue; `brand/logo-*.png`). Never re-type, tweak or add colours or fonts.
2. **One scale:** canvas, type, spacing, colour, motion and reading time come from `references/scale.md`. Nothing ad hoc.
3. **Colour roles only.** Accent marks one thing per frame and is never text on paper/surface. Muted is never text on surface (4.42 : 1); `assets/tgs-overrides.css` enforces this.
4. **Rhythm:** open on ink, close on ink with the large logo, small logo on everything else, never three identical backgrounds in a row.
5. **One idea per slide or scene.** The cover/hook is a surprising, true, specific line, never a topic label.
6. **Every number has a source line** on the same slide/scene. Unverifiable numbers are cut.
7. **Carbon credits mentioned → both disclosures shown** (on-frame and in captions). See `references/copy-and-claims.md`.
8. **Voice:** professional, transparent, hopeful; problem → evidence → solution. No hype, no greenwashing, no "TGS-verified", no guarantees.
9. **Video tone:** `polished` by default; `app-store`, `default`, `deadpan`, restrained `cinematic` allowed; `chaotic` and `yc-parody` banned. 15–25 s.
10. **Nothing ships until** `scripts/check_guardrails.py` passes and you have looked at the rendered output yourself.

## Workflow

### 0. Classify the request
- A still (carousel, post, story, link image, thumbnail, video poster) → **Images**.
- Anything that moves (reel, launch video, animated post, brag) → **Video**, and its poster frame also goes through Images rule checks.
- Both (e.g. a campaign) → do the carousel first; the video reuses its plan, copy, sources and components.

### 1. Set up the brand folder (once per project)
```bash
python3 <skill>/engines/editorial-carousel-design/scripts/make_tokens.py <skill>/brand/brand.json <project>
```
```bash
cp <skill>/assets/tgs-overrides.css <skill>/assets/video-frame.css <project>/brand/
```
Read the contrast report; every line must be OK.

### 2. Plan before designing
Write the plan as one line per slide/scene: purpose, headline, the one fact and its source. Check it against `references/copy-and-claims.md` before building anything. For video, write brag's `brag-plan.md` with the TGS values filled in (tone, format, visual identity, scene durations that sum to 15–25 s).

### 3. Build
- **Images:** follow `references/images.md` (engine workflow plus TGS rules). Load `tokens.css` → `carousel.css` → `tgs-overrides.css`.
- **Video:** follow `references/video.md` (brag workflow plus TGS overrides). Compositions load `tokens.css` → `video-frame.css` and build scenes from `.tgs-stage` / `.tgs-scene` using the animated carousel archetypes.

### 4. Check, look, fix
```bash
python3 <skill>/scripts/check_guardrails.py <output-dir>
```
Fix every ERROR. Read every WARN and either fix it or say why it stands. Then look at the contact sheet (images) or stills from each scene and mid-transition (video): no orphan words, no empty half-frames, nothing in the source band or footer, proportional charts, right logo version.

### 5. Deliver
Images: PNGs, `carousel.pdf`, `caption.md`. Video: `brag.mp4` (poster as frame 0), `brag.jpg`, `share-copy.txt`, `caption.md`, `brag-plan.md`. Tell the user which figures you verified, what you left out and why, and the checker result.

## When the user asks for something off-system
Say which rule it breaks and offer the closest on-brand option (e.g. "chaotic tone is banned for TGS; `cinematic` gives the energy without the flash cuts"). If they still want it, do it as a clearly labelled exception and note it in the delivery message. Never silently drop a disclosure or a source line.

## Files
- `brand/brand.json`, `brand/logo-light.png` (on dark), `brand/logo-dark.png` (on light)
- `references/scale.md`: canvases, type, spacing, colour, motion and time scales
- `references/images.md`: still-image rules on top of the carousel engine
- `references/video.md`: brag overrides, scene archetypes, audio, deliverables
- `references/copy-and-claims.md`: voice, banned phrases, sources, disclosures, captions
- `assets/tgs-overrides.css`: scale tokens and the stone-slide contrast fix
- `assets/video-frame.css`: video canvases, safe zones, video type scale and motion tokens
- `scripts/check_guardrails.py`: the automated gate (stdlib only; uses ffprobe for video)
- `engines/editorial-carousel-design/`: the image engine, unchanged apart from its SKILL.md being renamed `ENGINE.md`
