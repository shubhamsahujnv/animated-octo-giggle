# SOUND BRIEF: Lynkk integrations film (lynkk-orbit), soundtrack from professional recordings

Picture final: 16.0 s, 30 fps, cut on a 120 BPM grid (1 beat = 0.5 s = 15 frames, 1 bar = 2.0 s, 8 bars). Cue events:
`out/cues.json` (written by `npm run cues`; never re-timed by hand).

Only real, professionally recorded or produced audio: one licensed music track edited at bar lines, real SFX placed on
the cues. Code selects, trims, places, levels, EQs, pitches by resampling and masters; it never generates a sound.

## Sound concept
- Personality: warm tech with a playful robot (Remi). One material palette: metal latch locks, air swishes, soft
  plastic / pop ticks, a felt low hit, and a real glockenspiel for Remi's voice.
- **Client changes (2026-10-31):** (1) the music is the LEAD element, loud and prominent, SFX tucked inside it but
  audible on the locks (4.0, 7.5, 9.5) and the logo (13.5); the voiceover headroom note is withdrawn. (2) a different
  track from "Ramp It Up": loud, energetic, punchy from the start.
- Music: "Better Times are Coming" (A. M., Mixkit), 120 BPM, Ab minor. Groove in by 2.0 (from the first bar, ridden
  down under the dark hook), one continuous take to 9.5, one-beat pull-back, DROP on 10.0, final strong beat on 14.0
  ringing out to 16.0.
- Remi's blips: glockenspiel notes retuned to the key (B6, D#7, E7); the logo note a glockenspiel B5.
- Ambience (client change 3, 2026-10-31): a soft real wind + air bed under the whole film (Mixkit 'Wind in the top of the mountain' + 'Desert ambience'), clearly present in 0-2 s, about 12 dB under the music after 2 s, fading with the ring-out.

## Picture map
| t (s) | on screen | cue | sound |
|---|---|---|---|
| 0.0-2.0 | dark, sphere lights stripe by stripe | riser hook:swell | the music (ridden -5 dB), no SFX |
| 1.0 | sphere pulse + ripple | hit hook:sphere:pulse | soft deep hit (Short bass hit, low-passed) |
| 1.33 | Remi opens its eyes | blip hook:remi:eyes | glock D#7 |
| 1.6-2.07 | Remi takes off (apex 1.83) | whoosh hook:remi:launch | quick swoosh, apex on 1.83 |
| 2.07-3.6 | first circle (apex 2.83) | whoosh ring1:draw | swirling whoosh, apex 2.83 |
| 4.0 | ring 1 LOCKS | hit ring1:lock | metal latch (Safe lock) |
| 4.0, 4.5, 5.0 | title words | tick ring1:title:0-2 | soft clicks, cycled |
| 6.13-7.4 | second circle (apex 6.77) | whoosh ring2:draw | air woosh |
| 7.5 | ring 2 locks | hit ring2:lock | second latch take (Gear metallic lock, last click) |
| 7.57-8.17 (apex 7.87) | Remi barrel roll | whoosh ring2:remi:roll | small light swish (Short wind swoosh +3 st) |
| 7.8 | chips pop | pop ring2:chips | pop |
| 8.0 (apex 8.27) | camera pulls back | whoosh ring3:pull | fast air sweep |
| 8.13-9.4 (apex 8.77) | third circle | whoosh ring3:draw | windy swoosh, quieter |
| 9.5 | BIGGEST lock | hit ring3:lock | latch -1 st, +2 dB, + low end |
| 9.97 | note card lands | pop ring3:note:land | pop |
| **10.0** | **DROP** | drop drop:downbeat | the music's lift downbeat |
| 10.07, 11.0, 11.5 | Remi loops and hops | blip drop:remi:* | glock E7, B6, D#7 |
| 12.0-13.5 (apex 13.28) | rings fold into the sphere | whoosh end:collapse | wind woosh building into the lock |
| 13.5 | sphere locks with "Lynkk" | hit end:logo:impact | first beat of Deep heartbeat impact |
| 13.7 | wordmark | bell end:logo:note | glock B5 |
| 13.53 | sparkle burst from the logo | shimmer end:logo:sparkles | Magic wand sparkle |
| **14.0** | Remi lands on "Start for free" | blip end:remi:land | glock B6 + the music's final beat, ring-out to 16.0 |
| 15.0-15.53 (middle 15.27) | light sweep over the button | shimmer end:button:shine | very soft Crystal chime, by its peak |
| 0.0-16.0 | star dust, whole film | ambience amb:bed | the wind + air bed (amb bus) |

## Licences
Allowed: CC0, public domain, CC BY 2.0-4.0, Mixkit free licences, Pixabay. Never NC, ND, SA, Sampling+.
Mixkit licence text read 2026-10-31 (https://mixkit.co/license/). Music licence: web, social, ads; not TV/radio
broadcast, CDs/DVDs, games. Never register the film with Content ID.

## Quality bar and sandbox limits
- -14 LUFS integrated, <= -1 dBTP (WAV gate <= -1.5), the drop the loudest moment, sync -45..+75 ms (whooshes by apex).
- earshot is not available in this sandbox: realness, describe/match/rank and listening were NOT run; files were
  chosen from their source descriptions and measured with analyze.py / arrange.py / qa.py / own numpy checks.

## Files
Downloads `audio/assets/<category>/`, manifests `audio/assets/manifests/`, design `audio/sounddesign.json` +
`audio/design/*.json`, review `out/audio-review/`, QA `out/qa/`. Python: /tmp/soundenv/bin/python -I.
