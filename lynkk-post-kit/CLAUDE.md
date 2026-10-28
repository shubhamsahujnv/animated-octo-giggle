# Lynkk post kit: instructions for the coding agent

You make social media posts for **Lynkk** (lynkk.ai, an AI meeting assistant).
Posts are HTML slides built from this kit's blocks, rendered to PNG with
Playwright. You never draw posts in an image tool and never invent a new look.

## Read first, every time

1. `docs/TRUTHS.md`: what the product really does. **Every claim must be in it.**
2. `docs/DESIGN.md`: the visual rules (Grid design system).
3. `docs/COPY.md`: voice and copy rules.
4. `docs/BLOCKS.md`: the classes you build with.
5. Look at the reference images: `posts/example-lynkk-vs-notetakers/out/*.png`
   and `gallery/out/*.png`. Match that level.

## Workflow

```bash
npm run setup                                   # once: installs Playwright + Chromium
node scripts/new.mjs <kebab-name> --slides 5    # --size portrait|square|story|wide|linkedin
# edit posts/<name>/post.html and posts/<name>/captions.md
node scripts/render.mjs posts/<name> --pdf      # checks copy, renders, audits layout
```

1. **Plan in chat first.** For each slide: role (cover, proof, short version,
   CTA), eyebrow, headline in two inks, the one block that proves it, and which
   truth from TRUTHS.md backs each claim. Show the plan if the user is around.
2. **Scaffold** with `new.mjs`, then replace every `TODO`. Reuse blocks from
   the example post and the gallery. Don't restyle the kit.
3. **Render.** `render.mjs` refuses to export while the copy check has errors,
   and prints `LAYOUT` lines for overflow, clipping and text that's too small.
4. **Look at every PNG** with your image viewer or Read tool. Fix what reads
   badly (awkward line breaks, a lonely last word, crowded or empty slides,
   a plate that's too tall). Render again. Repeat until clean.
5. **Write `captions.md`**: Instagram caption, LinkedIn caption, alt text per
   slide, same rules as the slides.
6. Report: where the files are, what each slide says, and any claim you left
   out because TRUTHS.md didn't support it.

## Hard rules

- Claims only from `docs/TRUTHS.md`. If the user asks for a claim that isn't
  there (a number, a feature, a competitor fact), say so and ask. Don't write it.
- No em dashes (U+2014) anywhere in a post file. No competitor names. No prices.
  No phones. No accuracy percentages. No invented customers or quotes.
- Only kit classes and `--gr-*` tokens. No new fonts, no hex colours, no
  gradients, no shadows, no emoji.
- Don't edit `kit/grid/*` (it is the website's design system, copied as is).
  Add reusable blocks to `kit/post.css` **and** a board to `gallery/index.html`.
- Always render and look before saying you're done. "It should look fine" is
  not done.

## Paths

- A post file lives at `posts/<name>/post.html` and links
  `../../kit/post.css` and `../../kit/post.js` (the scaffold does this).
- Output goes to `posts/<name>/out/<slide-id>.png` (2x) and `carousel.pdf`
  with `--pdf`.
- Assets: `kit/assets/plates/*.jpg`, `kit/assets/logos/*.svg`,
  `kit/assets/mark.svg`, `kit/fonts/InterVariable.woff2`. Everything is local;
  rendering needs no network.
