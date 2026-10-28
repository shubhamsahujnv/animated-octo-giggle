#!/usr/bin/env bash
# Build the film: UI sounds over the approved score, then picture and mux.
#   ./make.sh            whole film -> out/lynkk-mac-launch_0-78s.mp4
#   ./make.sh 0:12       a slice
# The approved score (assets/music/score-approved.m4a) is used as is: no stretch,
# no re-normalisation. score.py regenerates it if the music ever changes.
set -euo pipefail
cd "$(dirname "$0")"
RANGE="${1:-0:78}"
python3 foley.py
python3 mix_track.py assets/music/score-approved.m4a --offset 0 --bpm 120 \
  --fx out/foley_raw.wav --music-gain 1.0 --fx-gain 0.32 --fade-out 0.01 --out out/film_audio.wav
node render.mjs --range "$RANGE" --audio out/film_audio.wav --out "out/lynkk-mac-launch_${RANGE/:/-}s.mp4"
