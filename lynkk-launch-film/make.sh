#!/usr/bin/env bash
# Build the film: score, loudness, picture, mux.
#   ./make.sh            whole film
#   ./make.sh 0:12       a slice
set -euo pipefail
cd "$(dirname "$0")"
RANGE="${1:-0:78}"
python3 score.py
ffmpeg -y -loglevel error -i out/score_raw.wav -af loudnorm=I=-14:TP=-1.0:LRA=11 -ar 48000 out/score.wav
node render.mjs --range "$RANGE" --audio out/score.wav --out "out/lynkk-mac-launch_${RANGE/:/-}s.mp4"
