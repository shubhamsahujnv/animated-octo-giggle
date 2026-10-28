#!/usr/bin/env bash
# Render in 4 parallel parts (one Chromium per core), join them losslessly,
# then mux the audio.
#   ./render_parallel.sh [out.mp4]                                   the film
#   HTML="index.html?edl=teaser" DUR=25.5 AUDIO=out/teaser_score.wav \
#     ./render_parallel.sh out/lynkk-mac-teaser.mp4                  the teaser
set -euo pipefail
cd "$(dirname "$0")"
OUT="${1:-out/lynkk-mac-launch_0-78s.mp4}"
HTML="${HTML:-index.html}"
DUR="${DUR:-78}"
AUDIO="${AUDIO:-out/film_audio.wav}"
FPS=30
mkdir -p out/parts
rm -f out/parts/*.mp4
# Split on frame boundaries; every part uses the same encoder settings, so the
# concat can copy the streams without re-encoding.
FRAMES=$(python3 -c "print(round($DUR * $FPS))")
B=($(python3 -c "n=$FRAMES; print(' '.join(str(round(n*k/4)/$FPS) for k in range(5)))"))
for i in 0 1 2 3; do
  node render.mjs --html "$HTML" --range "${B[$i]}:${B[$((i+1))]}" --out "out/parts/p$i.mp4" > "out/parts/p$i.log" 2>&1 &
done
wait
for i in 0 1 2 3; do echo "file 'p$i.mp4'"; done > out/parts/list.txt
ffmpeg -y -loglevel error -f concat -safe 0 -i out/parts/list.txt -c copy out/parts/video.mp4
ffmpeg -y -loglevel error -i out/parts/video.mp4 -i "$AUDIO" -map 0:v -map 1:a \
  -c:v copy -c:a aac -b:a 256k -shortest -movflags +faststart "$OUT"
echo "wrote $OUT"
