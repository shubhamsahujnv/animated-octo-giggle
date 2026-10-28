#!/usr/bin/env bash
# Render the film in 4 parallel parts (one Chromium per core), join them
# losslessly, then mux the audio.
#   ./render_parallel.sh [out/lynkk-mac-launch_0-78s.mp4]
# Needs out/film_audio.wav (make.sh writes it).
set -euo pipefail
cd "$(dirname "$0")"
OUT="${1:-out/lynkk-mac-launch_0-78s.mp4}"
mkdir -p out/parts
rm -f out/parts/*.mp4
# Part boundaries sit on frame boundaries at 30 fps; every part is encoded with
# the same settings, so the concat can copy the streams without re-encoding.
RANGES=("0:19.5" "19.5:39" "39:58.5" "58.5:78")
for i in "${!RANGES[@]}"; do
  node render.mjs --range "${RANGES[$i]}" --out "out/parts/p$i.mp4" > "out/parts/p$i.log" 2>&1 &
done
wait
for i in "${!RANGES[@]}"; do echo "file 'p$i.mp4'"; done > out/parts/list.txt
ffmpeg -y -loglevel error -f concat -safe 0 -i out/parts/list.txt -c copy out/parts/video.mp4
ffmpeg -y -loglevel error -i out/parts/video.mp4 -i out/film_audio.wav -map 0:v -map 1:a \
  -c:v copy -c:a aac -b:a 256k -shortest -movflags +faststart "$OUT"
echo "wrote $OUT"
