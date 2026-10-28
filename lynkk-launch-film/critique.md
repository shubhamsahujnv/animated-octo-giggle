# Critique log

Rubric from the motion skill: 1 to 10 per axis, iterate until nothing is below 8.

## Round 1: shots 0.1 to 1.3 (0 to 12 s)

Found by looking at stills and at frames pulled from the encoded MP4:

| Problem | Fix |
|---|---|
| Mark landed on the clock, not its menu-bar slot (slot was hardcoded) | Slot is measured from the DOM; the desktop scales around it, so it never moves; the menu bar takes over the mark when it docks |
| Menu bar, clock and callout too small to read on video | Menu bar 54 px, 23 px type, 30 px mark, 34 px callout with its caret on the mark |
| Cursor covered the "d" in Record | Cursor lands beside the word |
| Dock tiles read as grey placeholders | Quieter glass tiles |
| 2-frame black dip on the 3.0 s cut | Tiles hard cut in on the beat |
| "Play from 12:04" tile lingered next to the formed mark | All six tiles collapse together and fade before the mark completes |
| Score: pad rang through the pre-drop gap, low end muddied the thud | Sections stop dead; pad notes under A3 at 40% |

Scores after fixes:

| Axis | Score | Note |
|---|---|---|
| Composition | 8 | Fragments are true macro crops; collage ring is balanced |
| Motion | 8 | One easing family (lynkk.ai's), masked reveals, no bounce |
| Type | 8 | Schibsted for headlines, Inter for UI, holds meet 0.3 s per word |
| Colour | 9 | Night band, night plate, red only on the live dot, violet only on the chip |
| Sound sync | 8 | Measured onsets at 0.5, 1.0 ... 3.0, 4.0, 8.0 s, all on the grid. Not listened to by ear: checked by spectrogram and level only |
| Brand fidelity | 9 | Tokens, mark, plates and copy from the kit and lynkk.ai |
| Legibility | 8 | Menu bar and callout fixed this round |
| Story | 8 | "Something new exists" then "it lives in your menu bar" lands in 12 s |

Open for next round: the `fn` and `⌘` keycaps could use a touch more depth;
the collage could carry a faint motion trail on the collapse.

## Round 2: music (feedback: "more fast and engaging")

Tempo stays at 120 BPM so every cut stays on the grid; the speed comes from
density and arrangement instead.

| Before | After |
|---|---|
| Sparse clicks and a low pulse until 4 s, drums only from 8 s | Four-on-the-floor kick from frame 0, one under every fragment |
| 8th-note hats | 16th hats with accents and an open hat on the off-beat |
| Long bass notes | Rolling 16th bass on the off-beats, the kick owns the downbeat |
| Slow pad chords | 16th arpeggio that opens up over the film, supersaw stabs on the "and" |
| No melody | A plucked lead hook (A minor, 2 bars) on every drop |
| One riser | Snare rolls (8ths, 16ths, 32nds) and risers into 4 s, 8 s, 32 s and 72 s |
| Groove looped to the end | Full 78 s arrangement: verse and hook sections per chapter, breakdown under the install, final hit at 72 s |
| Single-pass loudnorm (dynamic mode, rides the gain) | Two-pass linear loudnorm (`loudness.sh`): one fixed gain, builds keep their shape |

Measured: -14.0 LUFS, peak -2.0 dBFS, no clipping, about 28 onsets per second
in the drop, both pre-drop gaps about 30 dB under the music around them. The
drop is 3.5 dB fuller in the mids and 5 dB in the highs than the groove before
it. Not listened to by ear.

## Round 3: chapters 01 to 06 (12 to 78 s) on the approved score

Music: `assets/music/score-approved.m4a` (round 2's track, chosen by the client)
is used unchanged. `foley.py` adds only the UI sounds for 12 to 78 s.

Found by looking at stills, transition frames and the DOM:

| Problem | Fix |
|---|---|
| Call window empty from 12.0 to 15.5 s: the crossfade gave a still layer zero opacity | A layer that is not changing shape shows at full opacity |
| Column overlapped the call window's right edge | Call window moved left and narrowed |
| "Hold fn. Talk. Let go." never appeared; the lockup headline would not have either | `maskIn` default `outAt = Infinity` made `Infinity - Infinity = NaN`; no exit now means no exit |
| Wi-Fi drop would have dimmed the Lynkk mark (selector matched the mark's svg first) | Selector narrowed to the Wi-Fi icon; slash placed from measured coordinates |
| Kanban drop landed off-centre (placeholder card shorter than the real one) | Placeholders carry the real card's text |
| Notch island text too small for video | 60 px island, 23 px type |
| "Available now" wrapped to two lines | No wrap |
| `atempo=1.0` resynthesised the approved music and shifted it 2 ms (correlation 0.69) | No stretch or seek when they are no-ops; correlation now 1.0000, level change 0.00 dB |
| `loudnorm` fell back to dynamic gain at the -1 dBTP ceiling | Not needed: the mix is -14.0 LUFS as it stands |
| Descenders of the 8.5 s headline linger 2 frames into the call window | Exit tightened to finish by 11.98 s |

Scores (whole film, after fixes): composition 8, motion 8, type 8, colour 9,
sound sync 8 (measured, not heard), brand fidelity 9, legibility 8, story 8.
