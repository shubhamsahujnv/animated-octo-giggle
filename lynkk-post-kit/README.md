# Lynkk post kit

Everything needed to make Lynkk social posts that match lynkk.ai: the design
system, fonts, brand mark, photo plates, platform logos, a block library, the
product facts you're allowed to claim, and three scripts that scaffold a post,
check its copy, and render it to PNG.

Posts are written as HTML (one `<section>` per slide) and rendered with a
headless browser. That makes them easy for Claude Code, Cursor, Codex or any
coding agent to write and fix, and every post comes out pixel-consistent.

## Setup (once)

Needs Node 18 or later.

```bash
cd lynkk-post-kit
npm run setup        # npm install + downloads Chromium for Playwright (~150 MB)
```

## Make a post

```bash
node scripts/new.mjs launch-week --slides 5          # creates posts/launch-week/
# edit posts/launch-week/post.html (open it in a browser to preview)
node scripts/render.mjs posts/launch-week --pdf      # PNGs + a PDF carousel in posts/launch-week/out/
```

Sizes: `--size portrait` (1080x1350, default), `square` (1080x1080), `story`
(1080x1920), `wide` (1600x900), `linkedin` (1200x1200). PNGs export at 2x.

`render.mjs` first runs the copy check (em dashes, competitor names, claims the
product can't back, prices...). It won't export while there are errors. Then it
audits each slide for overflow, clipping and text too small to read on a phone.

Other commands:

```bash
node scripts/check.mjs posts/launch-week              # copy check only
node scripts/render.mjs posts/launch-week --only s2   # one slide
npm run gallery                                       # re-render the block gallery
```

## With an AI coding agent

Open this folder in the agent and ask for what you want, e.g.

> Make a 5 slide Instagram carousel about the Mac app recording calls without a bot.

`CLAUDE.md` (Claude Code) and `AGENTS.md` (Codex, Cursor and others) tell the
agent how to work: read the docs, plan, scaffold, write, render, look at every
PNG, fix, and write captions. Ask it to show you the plan first if you want to
steer.

## What's inside

| Path | What |
|---|---|
| `CLAUDE.md`, `AGENTS.md` | Instructions for coding agents |
| `docs/DESIGN.md` | Visual rules: the Grid laws for posts, sizes, type, plates, slide anatomy, carousel arc |
| `docs/COPY.md` | Voice and copy rules |
| `docs/TRUTHS.md` | What Lynkk really does, the numbers you may use, and what never to claim |
| `docs/BLOCKS.md` | Class reference with snippets |
| `kit/post.css` | The poster layer and block library |
| `kit/post.js` | Draws each slide's frame (rails, top bar, foot), icons, mark, logos |
| `kit/grid/` | Grid tokens and components, copied unchanged from lynkk.ai |
| `kit/assets/` | Sphere mark, six photo plates, platform logos |
| `kit/fonts/` | Inter (SIL Open Font License, see OFL.txt) |
| `gallery/` | One board per block, size and band. `gallery/out/*.png` is the visual reference |
| `posts/example-lynkk-vs-notetakers/` | A finished 5 slide carousel with captions. Copy its patterns |
| `scripts/` | `new.mjs`, `check.mjs`, `render.mjs` |

## Keeping it true

`docs/TRUTHS.md` was checked against the product on 2026-09-29. Features change;
when they do, update that file first (and the checker's patterns in
`scripts/check.mjs` if a rule changes). `kit/grid/` should be re-copied from the
website's `design-lab/grid/` when the design system changes.
