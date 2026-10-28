# Design rules for Lynkk posts

Posts use **Grid**, the design system of lynkk.ai. `kit/grid/tokens.css` and
`kit/grid/components.css` are copied unchanged from the website's system;
`kit/post.css` scales them to a social post. A post should look like a section
of the website, cut out and put in a feed.

Open `gallery/out/*.png` and `posts/example-lynkk-vs-notetakers/out/*.png`
before designing anything. They are the reference.

## The laws

1. **Night band by default.** `#111` background, white ink. A slide can be a day
   band (`data-band="day"`: white, black ink) but keep a carousel on one band.
2. **The ruled column.** Every slide has the same frame: a dotted rail on each
   side, a hairline where rail meets column, a top bar (sphere mark + "Lynkk",
   slide count) and a foot ("lynkk.ai", the swipe hint). `kit/post.js` draws it.
   Never remove it or restyle it.
3. **Two inks.** One colour at 100% to read and 50% to skim. Emphasis in a
   headline is done by putting the second half in `.ink-2`, never with colour,
   bold or underline.
4. **Colour lives in plates.** Orange, green, sky and dusk only appear as the
   blurred, grained photographs in `kit/assets/plates`, with glass UI floating
   on them. Flat fills are black, white and the greys the tokens give you. No
   CSS gradients, no coloured text.
5. **Violet is a label.** The eyebrow pill, the Lynkk tile in a compare header,
   a citation chip in a mock. Never a background, never headline text. The
   violet button (`.btn-accent`) at most once per carousel.
6. **No shadows.** Depth comes from glass (blur) and plates.
7. **Inter, 500 and 400 only.** Medium speaks, Regular reads. Tight tracking at
   display sizes (already set). No bold, no light, no other font.
8. **Red means live.** `.gr-live-dot` marks something recording right now and
   nothing else. No red crosses, no green ticks for "us vs them": use the two
   inks and the raised "us" column instead.
9. **Radius follows the system.** Buttons 8, plates and cards 16, glass 30.
   Don't round things up to make them feel friendlier.

## Sizes

Set `data-size` on each `<section class="post">`.

| data-size | Pixels | Use |
|---|---|---|
| `portrait` (default) | 1080 x 1350 | Instagram and LinkedIn feed, carousels |
| `square` | 1080 x 1080 | Instagram grid, X |
| `story` | 1080 x 1920 | Stories, Reels cover |
| `wide` | 1600 x 900 | X, LinkedIn link images, blog headers |
| `linkedin` | 1200 x 1200 | LinkedIn single image |

Everything exports at 2x (a 1080 post becomes 2160 wide). A carousel uses one
size for every slide.

## Type scale (posts)

| Class | Size | Use |
|---|---|---|
| `.t-display` | 84 | Cover headline, CTA line. One per slide. |
| `.t-h2` | 66 | Headline on every other slide |
| `.t-h3` | 44 | Headline when the slide carries a lot |
| `.t-lead` | 30 | The line under a headline, or the closing line of a cover |
| `.t-body` | 26 | Rows, cells, anything scanned |
| `.t-small` | 22 | Captions, fine print. **Nothing on the band is smaller.** |
| mock text | 15 to 22 | Inside glass cards and windows only |

A 1080 post shows about 390 wide on a phone. Text under 20px on the band is
unreadable there; the renderer flags it.

## Plates

| Plate | Mood | Good for |
|---|---|---|
| `ember` | orange into dark | The CTA plate, "after", results |
| `dusk` | warm cream, rose, amber | Ask, conversations, people |
| `sky` | pale blue and rose | Calendar, mornings, "before" |
| `meadow` | pale green and blue | Teams, privacy, calm settings |
| `night` | dark red and brown | Mac app, calls, evenings |
| `field` | green, yellow, blue | Outdoors, in person, a change of pace |

One plate per block. In a carousel, vary plates across slides and end on ember.
Rings (`data-rings`) sit behind glass on a plate; leave them on.

## Slide anatomy

Every content slide follows the same order, top to bottom:

1. **Eyebrow** (`.eyebrow`): 2 to 5 words naming the slide's topic. The cover
   uses the quiet eyebrow (`data-tone="quiet"`).
2. **Headline**: one statement, then the turn in `.ink-2`.
   "Everyone gets Pro. / The company keeps the record."
3. **One block** that proves the headline: a scene (plate + glass), a compare
   table, rows, cells, steps, stats. Two blocks at most.
4. Optional **lead** at the bottom (`.t-lead .mt-auto`).

Space blocks with `.mt-s` (16), `.mt-m` (32), `.mt-l` (48), `.mt-xl` (72) or
`.mt-auto` (push to the bottom). Don't add ad hoc margins.

## The carousel arc

The example (`posts/example-lynkk-vs-notetakers`) is the pattern:

1. **Cover**: the tension in one line, with a visual that makes it obvious.
2. **Proof 1**: a comparison or the product doing the thing.
3. **Proof 2**: who it is for, or the detail that decides it.
4. **The short version**: three rows, each one benefit.
5. **CTA**: ember plate, tag, the closing line, one sentence, one button, three
   true facts.

Foot hints: "Swipe", "Keep swiping", "One more", "Last one", "Follow for more".

## Product UI in posts

Draw product UI with the mock parts (`.glass`, `.window`, `.m-row`,
`.m-option`, `.m-level`, `.m-live` ...). Keep it simple and faithful: only draw
what the product has (see `TRUTHS.md`). Use believable, neutral sample data
(Acme renewal, Design review, Sam, Priya, "Beta on the 21st"). No real customer
names, no real people's faces, no screenshots of other companies' apps. Real
platform logos (Zoom, Meet, Teams, Slack, Webex, Jira) only in a "works with"
row, from `kit/assets/logos`.

## Don't

- Don't use the old purple-gradient, Poppins, bold-highlight look.
- Don't add emoji, stock photos, 3D renders, or AI-generated people.
- Don't put ticks and crosses in green and red.
- Don't fill every pixel. Empty space on the band is fine and on-brand.
- Don't restyle the kit per post. If a block is missing, add it to
  `kit/post.css` and the gallery so everyone gets it.
