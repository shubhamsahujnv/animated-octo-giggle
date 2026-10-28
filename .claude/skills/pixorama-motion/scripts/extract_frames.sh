#!/usr/bin/env bash
# Contact sheet for QC or for reading a reference film.
# Usage: extract_frames.sh <video> <out-dir> [interval-seconds, default 0.5]
set -euo pipefail
VIDEO="${1:?usage: extract_frames.sh <video> <out-dir> [interval]}"
OUTDIR="${2:?usage: extract_frames.sh <video> <out-dir> [interval]}"
INTERVAL="${3:-0.5}"

command -v ffmpeg >/dev/null || { echo "extract_frames: ffmpeg not found" >&2; exit 1; }
mkdir -p "$OUTDIR"

FPS=$(awk -v i="$INTERVAL" 'BEGIN{printf "%.6f", 1/i}')
ffmpeg -y -hide_banner -loglevel error -i "$VIDEO" \
  -vf "fps=${FPS}" -q:v 2 "$OUTDIR/frame-%03d.jpg"

# a single sheet is easier to read than 30 files
COUNT=$(find "$OUTDIR" -name 'frame-*.jpg' | wc -l | tr -d ' ')
if [ "$COUNT" -gt 1 ]; then
  COLS=$(awk -v n="$COUNT" 'BEGIN{c=int(sqrt(n)+0.999); if(c>6)c=6; print c}')
  ffmpeg -y -hide_banner -loglevel error -pattern_type glob -i "$OUTDIR/frame-*.jpg" \
    -filter_complex "scale=480:-1,tile=${COLS}x$(( (COUNT + COLS - 1) / COLS ))" \
    -frames:v 1 "$OUTDIR/contact-sheet.jpg" || true
fi

echo "extract_frames: ${COUNT} frames every ${INTERVAL}s in $OUTDIR"
[ -f "$OUTDIR/contact-sheet.jpg" ] && echo "extract_frames: sheet at $OUTDIR/contact-sheet.jpg"
exit 0
