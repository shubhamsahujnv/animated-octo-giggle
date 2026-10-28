#!/usr/bin/env bash
# Thin wrapper so the skill has one documented render entry point.
# Usage: render.sh <film.html> <out.mp4> [--width N --height N --fps N --duration N ...]
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

command -v node >/dev/null || { echo "render: node not found" >&2; exit 1; }
command -v ffmpeg >/dev/null || { echo "render: ffmpeg not found" >&2; exit 1; }

exec node "$DIR/render.js" "$@"
