#!/usr/bin/env bash
# Render both formats, put the soundtrack on them, and verify the finished files.
#   bash scripts/finish.sh            render + mux + verify
#   bash scripts/finish.sh --verify   only mux + verify (pictures already rendered)
# Run from the film folder. Writes out/<film>-reel.mp4 and out/<film>-post.mp4.
set -euo pipefail
cd "$(dirname "$0")/.."
FILM="$(basename "$PWD")"
KIT="$(cd ../.. 2>/dev/null && pwd)"
[ -d "$KIT/.claude/skills/real-sound" ] || KIT="$(cd .. && pwd)"
MUX="$KIT/.claude/skills/real-sound/scripts/mux.mjs"
PY="${EARSHOT_PY:-$(cat "$KIT/.earshot-python" 2>/dev/null || true)}"

node scripts/check-copy.mjs
npm run -s cues

if [ "${1:-}" != "--verify" ]; then
  for c in Reel Post; do
    l=$(echo "$c" | tr 'A-Z' 'a-z')
    npx remotion render src/index.tsx "$c" "out/picture-$l.mp4" --codec h264 --crf 16 --muted --log=error
  done
fi

if [ ! -f out/audio/soundtrack.wav ]; then
  echo "No out/audio/soundtrack.wav yet: pictures are in out/picture-*.mp4 (silent)."
  exit 0
fi

for l in reel post; do
  node "$MUX" --video "out/picture-$l.mp4" --audio out/audio/soundtrack.wav --out "out/$FILM-$l.mp4"
done

echo
echo "== Loudness per 2 bars (4 s): a lull after the first act shows up here"
for s in 0 4 8 12 16 20 24 28; do
  printf "  %2s-%2s s: " "$s" "$((s + 4))"
  ffmpeg -nostats -ss "$s" -t 4 -i "out/$FILM-reel.mp4" -vn -af ebur128 -f null - 2>&1 | grep -E "^\s+I:" | tail -1 | tr -s ' '
done

if [ -n "$PY" ] && [ -x "$PY" ]; then
  mkdir -p out/qa
  for l in reel post; do
    "$PY" -m earshot timeline "out/$FILM-$l.mp4" --cues out/cues.json --json --out "out/qa/timeline_$l.json" >/dev/null 2>&1 || true
  done
  python3 - "$FILM" <<'PY'
import json, re, sys
film = sys.argv[1]
for f in ["reel", "post"]:
    try:
        t = json.load(open(f"out/qa/timeline_{f}.json"))
    except Exception as e:
        print(f"{f}: no earshot timeline ({e})"); continue
    s, txt = t["summary"], t["text"]
    loud = re.search(r"Loudness .*?LRA [\d.]+ LU", s)
    sync = re.search(r"Sync to \d+ cues:[^;]*;[^;]*", s)
    offs = []
    for m in re.finditer(r"\| (.*)$", txt, re.M):
        for part in m.group(1).split(";"):
            mm = re.match(r"\s*(\w+) ([+-]\d+) ms (OK|near|far)", part)
            if mm and mm.group(1) != "cut":
                offs.append((int(mm.group(2)), mm.group(1)))
    out = [o for o in offs if not -45 <= o[0] <= 75]
    print(f"{film}-{f}.mp4: {loud.group(0) if loud else '?'}")
    print(f"  {sync.group(0) if sync else '?'}")
    print(f"  outside -45..+75 ms: {out or 'none'}")
    for l in txt.splitlines():
        if "NO HIT" in l and "CUE" in l:
            print("  " + l.strip()[:110])
PY
else
  echo "earshot not set up (.earshot-python missing): skipped the sync check. Run ./setup.sh at the kit root."
fi
ls -la out/"$FILM"-*.mp4
