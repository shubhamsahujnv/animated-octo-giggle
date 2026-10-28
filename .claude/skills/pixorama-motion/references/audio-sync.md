# Audio and beat sync

Three layers on one timeline: **music**, **SFX**, **picture**. The beat map is the clock.

## Why 120 BPM

2 beats/second. At 30fps a beat is exactly 15 frames and a bar exactly 60. Every shot
boundary can land on a frame with no rounding drift. Use 120 unless the user asks otherwise;
if they do, pick a BPM where `1800 / bpm` is an integer number of frames (90, 100, 120, 150).

## Pipeline

```bash
# 1. beat map first — it is what the picture obeys
node scripts/beats.js --bpm 120 --duration 15 --out audio/beats.json

# 2. synthesize music and UI sounds to WAV (route A: in code, no samples needed)
node scripts/beats.js --bpm 120 --duration 15 --out audio/beats.json --render-music audio/music.wav

# 3. retime the picture: shot boundaries -> downbeats, type hits -> beats
#    edit SHOTLIST.md + the BEATS constants, then re-render the picture

# 4. mix onto the picture
ffmpeg -i out/picture.mp4 -i audio/music.wav -i audio/sfx.wav -i audio/vo.wav \
  -filter_complex "[1:a]volume=-18dB[m];[2:a]volume=-12dB[s];[3:a]volume=-16dB[v];\
                   [m][v]sidechaincompress=threshold=0.05:ratio=6[md];\
                   [md][s][v]amix=inputs=3:normalize=0,loudnorm=I=-14:TP=-1[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 256k -shortest out/film.mp4
```

`beats.json` shape:

```json
{
  "bpm": 120, "fps": 30, "duration": 15,
  "beats":     [0, 0.5, 1.0, 1.5, "..."],
  "downbeats": [0, 2.0, 4.0, 6.0, "..."],
  "hits":      [{ "t": 2.0, "kind": "whoosh", "cause": "container morph shot 2" }]
}
```

Every `hits` entry names its visible cause. A sound with no cause gets cut; a visible impact
with no sound gets one.

## SFX vocabulary for Pixorama films

Synthesize in code — short, dry, no reverb tails on UI sounds.

| Event | Sound | Shape |
|---|---|---|
| cursor press / click | click | 8ms noise burst, 2kHz band-pass, −18dB |
| container morph | whoosh | 180ms filtered noise sweep 400→1800Hz, sine-in/out envelope |
| content swap behind blur | soft tick | 20ms sine at 1.2kHz |
| counter / metric ticking | tick | 12ms square at 900Hz, one per value change |
| success / check mark | two-note rise | 240ms, perfect fifth, triangle wave |
| error | low knock | 90ms, 180Hz sine, fast decay |
| terminal line appears | key | 6ms noise, 3kHz, −24dB, one per line not per char |
| logo reveal | thump | 400ms, 55Hz sine with pitch drop, plus a 1-bar tail |

Music bed: sparse. A sub pulse on downbeats, a filtered pad holding the key, and one arpeggio
that enters at the proof section. It is a bed, not a track — if you notice the music more than
the picture, it is too loud or too busy.

## Voice-over

If the **Fish Audio MCP** is connected, use it: generate the VO from the verbatim script in
`BRIEF.md` section 8, pick one voice and keep it across all Pixorama films, and save to
`audio/vo.wav`. Otherwise ask the user for a file or ship silent — do not substitute a
different provider's voice without asking, and never clone a voice without the speaker's
explicit say-so.

Write the script to the grid, not the grid to the script: a 15s film holds about 35 words.
Duck music 6dB under VO (the `sidechaincompress` above does it).

## Levels and the silent variant

- Master: −14 LUFS integrated, true peak ≤ −1 dBTP (`loudnorm` above).
- Always render `out/film-silent.mp4`. Social feeds autoplay muted; if the film only works
  with sound, the picture is underbuilt — fix the picture.
