#!/usr/bin/env bash
# Two-pass, linear loudness normalisation to -14 LUFS, -1 dBTP.
# Single-pass loudnorm falls back to dynamic mode and rides the gain through
# the track, flattening the builds; linear mode applies one fixed gain.
set -euo pipefail
IN="$1"; OUT="$2"
J=$(ffmpeg -hide_banner -i "$IN" -af loudnorm=I=-14:TP=-1:LRA=20:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
get() { echo "$J" | python3 -c "import sys,json; print(json.load(sys.stdin)['$1'])"; }
ffmpeg -y -loglevel error -i "$IN" -af "loudnorm=I=-14:TP=-1:LRA=20:linear=true:measured_I=$(get input_i):measured_TP=$(get input_tp):measured_LRA=$(get input_lra):measured_thresh=$(get input_thresh):offset=$(get target_offset)" -ar 48000 "$OUT"
