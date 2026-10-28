# Blocks: the class reference

Everything below is in `kit/post.css`. See each one rendered in
`gallery/out/*.png` (source: `gallery/index.html`). Copy from the gallery or the
example post rather than writing from scratch.

## The slide

```html
<section class="post" id="s1" data-size="portrait" data-count="01 / 05" data-next="Swipe">
  <main class="post-body" data-dots>
    ...blocks...
  </main>
</section>
```

- `id`: becomes the PNG name (`out/s1.png`). Unique per file.
- `data-size`: portrait | square | story | wide | linkedin.
- `data-count`: "01 / 05". Leave it off for a single image.
- `data-next`: the foot hint ("Swipe", "Last one"). Optional.
- `data-band="day"`: white slide. Default is night.
- `data-dots` on `.post-body`: dot field behind the body. Covers only.
- `.post-body.center`: centre everything (quote cards, one-liners).

`kit/post.js` (loaded once at the end of `<body>`) adds the rails, top bar and
foot. Don't write them by hand.

## Type

`.eyebrow` (`data-tone="quiet"` on covers), `.t-display`, `.t-h2`, `.t-h3`,
`.t-lead`, `.t-body`, `.t-small`, `.ink-2`, `.ink-3`. Inside `.t-lead`,
`.t-body`, `.t-small`, `<b>` switches to the first ink (not bold).

Spacing: `.mt-s` `.mt-m` `.mt-l` `.mt-xl` `.mt-auto`, `.grow` (fill the rest).

## Buttons and chips

```html
<span class="btn">Try it free at lynkk.ai</span>
<span class="btn btn-accent">Start free</span>      <!-- once per carousel -->
<span class="btn btn-glass">See how it works</span> <!-- on a plate -->
<div class="chips"><span class="chip"><i data-icon="mic"></i>Records both sides</span></div>
```

## Icons, mark, logos

```html
<i data-icon="list-checks"></i>   <!-- names: gallery/out/g06-icons.png -->
<i data-mark></i>                 <!-- the Lynkk sphere, currentColor -->
<img data-logo="zoom">            <!-- zoom, zoom-wordmark, meet, teams, slack, webex, jira -->
```

Size an icon by sizing the `<i>` (the parent block usually does).

## Plates, glass, windows

```html
<div class="plate plate-meadow scene mt-l" data-rings style="--scene-h: 320px; --card-w: 560px">
  <div class="glass" data-size="l">
    <div class="glass-title">Who can see this note</div>
    <div class="glass-body">
      <div class="m-option"><span class="m-radio on"></span><span>Admins can see this note</span><span class="m-chip">Default</span></div>
      <div class="m-option"><span class="m-radio"></span><span>Personal</span></div>
      <div class="m-fine">Recordings stay with the owner.</div>
    </div>
  </div>
</div>
```

- Plates: `plate-ember`, `plate-dusk`, `plate-sky`, `plate-meadow`,
  `plate-night`, `plate-field`. `.is-off` greys one out (for "missing").
- `.scene`: a plate across the column with one card centred. `--scene-h`,
  `--card-w`.
- `.glass` (`data-size="l"` for bigger text) > `.glass-title` + `.glass-body`.
- `.window` > `.window-bar` (`.window-dots` + title) + `.window-body`.
  `data-dock` stands it on the plate's bottom edge.

Mock parts (inside `.glass-body` / `.window-body`):

| Class | What |
|---|---|
| `.m-row` with `.m-k` / `.m-t` | a ruled row with a grey key or time |
| `.m-title` | a slightly larger first line |
| `.m-option` + `.m-radio[.on]` / `.m-check[.on]` + `.m-chip` | a setting or task row |
| `.m-live` + `.gr-live-dot` | recording indicator |
| `.m-level` (`style="--v: 60%"`) `<span>You</span><i></i>` | an audio level |
| `.m-quote` | a line of transcript or an answer |
| `.m-cite` | a citation chip in an answer |
| `.m-btn` | a small dark button |
| `.m-fine` | grey fine print |

## Layout blocks

**Stages**: plates in a row with captions (the cover).

```html
<div class="stages mt-l">
  <figure class="stage is-off">
    <div class="plate plate-sky" data-rings> <div class="glass">...</div> </div>
    <figcaption><span>Before</span><span class="ink-2">Nothing</span></figcaption>
  </figure>
  ...
</div>
```

**Compare**: the other side generic, Lynkk raised with the bar.

```html
<div class="compare mt-l">   <!-- style="--cols: 124px 1fr 1.3fr" to change widths -->
  <div class="row head"><span></span><span>A typical notetaker</span><span class="us"><span class="tile"><i data-mark></i></span>Lynkk</span></div>
  <div class="row"><span>Before</span><span>Starts when the recording starts.</span><span class="us">A morning email ...</span></div>
</div>
```

**Cells**: ruled facts, 2 across (or `data-n="3"`).

```html
<div class="cells mt-l">
  <div class="cell"><p class="cell-t">Up to 10 seats</p><p class="cell-b">Owner, admins and members.</p></div>
</div>
```

**Rows**: icon chip, title, line.

```html
<div class="rows mt-l">
  <div class="row"><span class="icon-chip" data-c="orange"><i data-icon="audio-lines"></i></span>
    <div><p class="row-t">One app for the whole meeting</p><p class="row-b">...</p></div></div>
</div>
```

Chip colours (`data-c`): orange (meeting notes), lavender (Ask), pink (Slack),
violet (workspaces), leaf (extension), forest, quiet.

**Steps**: numbered columns (`style="--n: 3"`).

```html
<div class="steps mt-l">
  <div class="step"><span class="step-n">01</span><p class="step-t">Paste a link</p><p class="step-b">...</p></div>
</div>
```

**Stats**: big true numbers only (see TRUTHS.md > Numbers you may use).

```html
<div class="stats"><div><p class="stat-n">17</p><p class="stat-l">languages for meeting notes</p></div></div>
```

**Logos**: `<div class="logos"><span class="logo-tile"><img data-logo="meet"></span></div>`

**Pull**: a line said in a meeting, inside a product story. Not a testimonial.

```html
<figure class="pull"><q>Let's ship the beta on the 21st.</q><figcaption>Design review, 12:04.</figcaption></figure>
```

**Split** (made for `wide`): copy left, plate right.

```html
<div class="split"><div>...eyebrow, headline, lead...</div><div class="plate plate-ember scene" data-rings>...</div></div>
```

**CTA**: the closing plate.

```html
<div class="plate plate-ember cta" data-rings>
  <span class="cta-tag">Start free</span>
  <h2 class="t-display">Stop taking notes. Start finishing meetings.</h2>
  <p class="cta-sub">One sentence of what Lynkk does.</p>
  <span class="btn">Try it free at lynkk.ai</span>
  <div class="facts">
    <div class="fact"><span class="fact-t">17 languages</span><span class="fact-b">Four of them in beta</span></div>
  </div>
</div>
```

## When no block fits

Write the CSS in the post's own `<style>`, using tokens only
(`var(--gr-ink)`, `var(--gr-line)`, `var(--gr-raised)` ...). If it's worth
reusing, move it into `kit/post.css` and add a board for it to
`gallery/index.html`.
