# Reference grammar extraction

When given a reference film, extract its **grammar** — pacing, transitions, camera, type
behaviour, texture — and rebuild Pixorama's content inside it. Never take its content.

## Hard line

**Take:** shot lengths, transition types, easing feel, camera moves, how type enters and
exits, grain/texture, contrast ratio, composition habits, sound placement.

**Never take:** copy, logos, brand marks, characters, mascots, product UI, footage, frames,
music, or a voice. Never produce something that could be mistaken for the reference's brand.
If the user asks to clone a named company's film, build the grammar and say plainly that the
content stays Pixorama's.

## Procedure

```bash
# 1. get the reference locally (a file the user supplies, or a URL they have the right to use)
#    yt-dlp / curl as appropriate -> ref/source.mp4

# 2. frames every half second
scripts/extract_frames.sh ref/source.mp4 ref/frames/ 0.5

# 3. cut detection — gives real shot lengths rather than guessed ones
ffmpeg -i ref/source.mp4 -filter:v "select='gt(scene,0.3)',showinfo" -f null - 2>&1 \
  | grep showinfo | grep -oE 'pts_time:[0-9.]+'

# 4. dominant palette
ffmpeg -i ref/source.mp4 -vf "fps=1,scale=160:-1,palettegen=max_colors=8" -y ref/palette.png
```

Then **look at the frames** and write `STYLE.md`.

## STYLE.md template

```markdown
# Reference grammar — <reference name>

## Numbers
- Duration: <s> · fps: <n> · aspect: <r>
- Cuts at: <list from scene detection>
- Shot lengths: <list> → median <s>, range <s>–<s>
- Shots per 15s: <n>

## Palette
<swatches with hex, and the ratio each occupies>
Ground: <hex> · Type: <hex> · Accent: <hex, % of frame>

## Type
- Families (apparent): <serif/sans/mono, weight, width>
- Scale: headline <% of frame height>, label <%>
- Entry: <mask-reveal up / per-char stagger Nms / slide+blur / scale-from-0.96>
- Exit: <faster? same? direction?>
- Position habits: <left-anchored, baseline-aligned to a grid, etc.>

## Transitions
| From → to | Type | Duration | Easing feel |
|---|---|---|---|
| shot 1 → 2 | morph | 0.28s | heavy out, no bounce |

## Camera
<push / drift / static ratio; amplitude; whether moves hold at the end>

## Texture
<grain %, vignette, chromatic fringing, scanlines, paper, bloom>

## Sound placement
<where hits land relative to picture changes; music density; silence used?>

## Mapping to Pixorama
| Reference element | Pixorama substitute |
|---|---|
| their product UI | real pixoramagroup.com screenshots |
| their accent #XXXXXX | --violet #7C3AED |
| their display serif | Manrope 800 |
| their mascot | the one-container morph, no character |

## Grammar rules to obey when building
1. <e.g. no shot longer than 2.2s>
2. <e.g. type always left-anchored, never centred>
3. <...>
```

## Then build

Write the shot list for the Pixorama film **in that grammar**, pass the beat-grid gate, and
build. During the critique loop, score "reference fidelity" by comparing your contact sheet
against `ref/frames/` — matching rhythm and type behaviour, not matching pictures.
