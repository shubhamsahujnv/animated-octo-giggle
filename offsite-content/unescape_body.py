#!/usr/bin/env python3
"""Restore body_oneline from content-flat.csv back to real markdown.

Single pass, because two sequential replaces corrupt any text containing a
real backslash — H4's body has a Python f-string with a literal \\n in it.

    python3 unescape_body.py H4 > H4.md      # one post
    python3 unescape_body.py --all out/      # all 30 as .md files
"""
import csv, re, sys
from pathlib import Path

UNESC = re.compile(r"\\(.)")
_MAP = {"n": "\n", "\\": "\\"}

def unescape(s: str) -> str:
    return UNESC.sub(lambda m: _MAP.get(m.group(1), m.group(0)), s)

def main():
    rows = list(csv.DictReader(open(Path(__file__).parent / "content-flat.csv",
                                    newline="", encoding="utf-8")))
    if len(sys.argv) > 1 and sys.argv[1] == "--all":
        out = Path(sys.argv[2] if len(sys.argv) > 2 else "posts")
        out.mkdir(parents=True, exist_ok=True)
        for r in rows:
            (out / f"{r['id']}.md").write_text(unescape(r["body_oneline"]), encoding="utf-8")
        print(f"wrote {len(rows)} files to {out}/", file=sys.stderr)
    elif len(sys.argv) > 1:
        want = sys.argv[1].upper()
        hit = next((r for r in rows if r["id"].upper() == want), None)
        if not hit:
            sys.exit(f"no post with id {want}")
        print(unescape(hit["body_oneline"]))
    else:
        sys.exit(__doc__)

if __name__ == "__main__":
    main()
