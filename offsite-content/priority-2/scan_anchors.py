#!/usr/bin/env python3
"""Flag internal body links whose anchor text does not match their destination.

This is how the three mismatches in priority 3 were found:
  - best-seo-agencies-australia: "AI search" -> rag-that-survives-...
  - what-is-a-fractional-cto:    "compliance readiness" -> zero-trust-...
  - react-native-vs-flutter:     "this post" -> shipping-mobile-...

Links inside a Related reading block are skipped: those are navigational by
design and use the destination's title, so the heuristic does not apply.

Usage:
    python3 scan_anchors.py                  # fetch live pages, then scan
    python3 scan_anchors.py --cache DIR      # scan already-fetched HTML
"""
import argparse, html, re, sys, urllib.request
from pathlib import Path

BASE = "https://pixoramagroup.com/blog/"

# Words too generic to count as a topical match between anchor and slug.
STOP = set("""a an the and or of for for to in on with without your you we our us is are be
how what when which why does do it its that this from as at by not more than into
guide guides best top companies company 2026 2025 vs""".split())

LINK = re.compile(
    r'<a href="(?:https://pixoramagroup\.com)?/blog/([a-z0-9-]+)"[^>]*>(.*?)</a>', re.S)


def text(frag: str) -> str:
    return html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", frag))).strip()


def words(s: str):
    return {w for w in re.findall(r"[a-z]+", s.lower()) if w not in STOP and len(w) > 2}


def matches(anchor: str, slug: str) -> bool:
    aw, dw = words(anchor), words(slug.replace("-", " "))
    if aw & dw:
        return True
    # tolerate morphological variation: migrate/migration, develop/development
    return any(a[:5] == d[:5] for a in aw for d in dw)


def scan(pages):
    flagged = []
    for slug, doc in pages.items():
        cut = doc.find('id="related-reading"')
        cut = cut if cut != -1 else len(doc)
        for m in LINK.finditer(doc):
            dest, anchor = m.group(1), text(m.group(2))
            if dest == slug or m.start() > cut or not anchor:
                continue
            if not matches(anchor, dest):
                flagged.append((slug, anchor, dest))
    return flagged


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--cache", help="directory of pre-fetched <slug>.html files")
    ap.add_argument("--slugs", default="live_slugs.txt",
                    help="file with one slug per line")
    a = ap.parse_args()

    slugs = Path(a.slugs).read_text().split()
    pages = {}
    for s in slugs:
        if a.cache:
            f = Path(a.cache) / f"{s}.html"
            if not f.exists():
                print(f"  missing from cache, skipped: {s}", file=sys.stderr)
                continue
            pages[s] = f.read_text(encoding="utf-8", errors="replace")
        else:
            with urllib.request.urlopen(BASE + s, timeout=30) as r:
                pages[s] = r.read().decode("utf-8", "replace")

    flagged = scan(pages)
    total = sum(len(LINK.findall(d)) for d in pages.values())
    print(f"scanned {len(pages)} pages, {total} internal link instances\n")
    if not flagged:
        print("no anchor/destination mismatches found")
        return 0
    for i, (src, anchor, dest) in enumerate(flagged, 1):
        print(f"[{i}] {src}\n      anchor -> \"{anchor}\"\n      dest   -> /blog/{dest}\n")
    print(f"{len(flagged)} mismatch(es). Baseline at 2026-10-26 was 3.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
