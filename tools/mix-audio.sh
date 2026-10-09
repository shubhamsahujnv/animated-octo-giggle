#!/usr/bin/env bash
# Mix voiceover + music (music ducked under the voice), loudness-normalise for social (-14 LUFS),
# and mux with silent.mp4 -> final.mp4.
# Usage: tools/mix-audio.sh content/videos/<dir> <output-name>.mp4
set -euo pipefail
D="$1"; OUT="${2:-final.mp4}"
ffmpeg -y -loglevel error -i "$D/voiceover.wav" -i "$D/music.wav" -filter_complex "
  [0:a]aresample=44100,aformat=channel_layouts=stereo,highpass=f=80,acompressor=threshold=-20dB:ratio=3:attack=5:release=80,volume=1.0,asplit=2[vo][key];
  [1:a]volume=0.4[mus];
  [mus][key]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[duck];
  [vo][duck]amix=inputs=2:duration=longest:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[a]" \
  -map "[a]" -ar 44100 "$D/mix.wav"
ffmpeg -y -loglevel error -i "$D/silent.mp4" -i "$D/mix.wav" -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart "$D/$OUT"
echo "wrote $D/$OUT"
