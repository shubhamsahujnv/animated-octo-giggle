# Banner images — 30 covers from the Cover Studio

Studio: **Pixorama Cover Studio** — https://claude.ai/artifact/K9GCrPoX2UCp5cv2oNro8T

It is a canvas generator locked to the pixoramagroup.com identity, not a static
image, so there is nothing to design here. `banners.csv` holds one row per post
and every column maps to a control in the studio. Type the row in, export, done
— about two minutes a cover.

The same ten columns are also merged into `content-calendar.csv` and
`content-flat.csv`, so a post and its cover settings travel together.

---

## Filling in the studio

| Studio control | CSV column |
|---|---|
| Post title | `banner_title` |
| Kicker — post tags | `kicker` |
| Standfirst | `standfirst` (empty for all 30 — see below) |
| Format | `format_primary` |
| Background | `background` |
| Accent | `accent` |
| Logo lockup | `lockup` |
| Footer line, left / right | `footer_left` / `footer_right` |
| Grid / glow / hairline | all three on |
| File type + Quality | WebP, q82 |
| Export scale | `export_scale` (2×) |

`banner_title` already contains the `*asterisks*` the studio uses to tint words
with the brand accent. Paste it verbatim — the markers are the design.

---

## Export size

**One export per post: the `Social / OG` preset at 2×, which is 2400 × 1260.**

That single file covers all three platforms, which is deliberate, because their
documented sizes do not agree:

- **Hashnode** publishes two different figures — 1600 × 840 in its cover-photo
  article, 1200 × 630 in its writing guide — and its community notes say
  2400 × 1260 works well.
- **Substack** documents 1200 × 630 for the social preview and a 600 × 600
  minimum for the publication cover.
- **Medium** publishes no figure at all.

1200 × 630 (1.91:1) is the only size every platform accepts, and at 2× it is
comfortably above Medium's practical floor of about 1400px wide.

**Substack also needs a square publication cover** — that is the `square`
preset, 1080 × 1080, and it is needed once for the publication, not per issue.
The ten Substack rows carry it in `format_secondary`.

**Turn on "Show safe area" before every export.** All three platforms crop
covers, at different ratios. The guide is in the studio for exactly this.

Watch the size readout. The studio's own guidance is that a cover over about
300 KB works against the page it sits on; WebP q82 at 2× should land well
under that.

---

## How the settings were chosen

**Titles are shortened to 9 words or fewer.** The studio auto-fits type, and its
spec sheet notes that anything under 44px at OG size reads badly in a crowded
feed. A 14-word post title would shrink below that, so each banner title is a
compressed version of the post title, not the post title itself. Longest is
exactly 9 words; none is over.

**Background is assigned by topic cluster**, so the tracks stay apart in a feed:

| Cluster | Background | Accent | Count |
|---|---|---|---|
| Cloud, migration, FinOps | `depth` | cyan | 7 |
| AI, agents, RAG | `wash` | violet | 7 |
| Engineering, legacy, security, mobile | `ink` | magenta / cyan | 10 |
| Buyer guides, engagement models, growth | `paper` | violet / magenta | 6 |

Paper rows use violet or magenta explicitly, never white — in `paper` mode the
studio maps a white accent to `#7c3aed` anyway, so naming it avoids a surprise.

**Lockup differs by track.** Hashnode and Medium use `PX + wordmark`, because
those posts are company-attributed. The ten Substack issues use `Mark only`,
because that publication runs under a named personal byline and a full company
wordmark on the cover would undercut it — the same reason its compliance note
says to publish under a real author.

**`standfirst` is empty on all 30.** The banner titles are already doing the
work, and a second line of deck copy at OG size pushes the title's auto-fit
down toward the 44px floor. Add one only if a specific cover looks thin.

**Footer right carries the track.** Hashnode "Engineering notes", Medium
"Engineering partner · Est. 2022", Substack "Notes from the build · Issue N"
with the real issue number pulled from each post title.

---

## One content rule from the studio's own spec

Its "Don't" card says never to put **"SOC 2 certified"** or **"ISO 27001
certified"** on a cover — the brand line is *aligned* or *readiness*. None of
these 30 banner titles touch certification claims, so nothing here trips it, but
it applies to any cover made later.

---

## Regenerating

```bash
python3 build_banners.py       # banners.csv from the spec table
python3 merge_banner_cols.py   # merge the columns into the two content CSVs
```

`build_banners.py` fails loudly if any banner title exceeds 9 words, so edits to
the spec table are checked. `merge_banner_cols.py` overwrites the merged columns,
so re-running it refreshes them rather than leaving stale values.

Sources for the size figures: [Hashnode cover photo](https://support.hashnode.com/en/articles/6423236-adding-cover-photo-to-your-blog-post) ·
[Hashnode writing a post](https://support.hashnode.com/en/articles/6420682-writing-a-blog-post) ·
[Hashnode cover images guide](https://townhall.hashnode.com/how-to-create-cover-images-for-your-devblog-posts) ·
[Substack sizes](https://moda.app/resources/sizes/substack)
