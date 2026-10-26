#!/usr/bin/env python3
"""Build content-calendar.csv from the 30 post files.

Link columns are parsed from the post BODY, not the front matter, so they
reflect the third link added to each post after the live-site audit.
"""
import csv, re
from pathlib import Path

FM = re.compile(r"\A---\n(.*?)\n---\n(.*)\Z", re.S)
MDLINK = re.compile(r"\[([^\]]+)\]\((https?://[^)]+)\)")

def front_matter(raw):
    """Flat parse: top-level 'key: value' only. Enough for these files, and
    it avoids a yaml dependency. Block scalars and nested lists are skipped."""
    out, depth_skip = {}, False
    for line in raw.split("\n"):
        if not line.strip():
            continue
        if re.match(r"^\s", line):          # continuation / nested
            continue
        m = re.match(r"^([a-z_]+):\s*(.*)$", line)
        if not m:
            continue
        k, v = m.group(1), m.group(2).strip()
        if v in ("|", ">", ""):             # block scalar or list follows
            out.setdefault(k, "")
            continue
        out[k] = v.strip('"')
    return out

rows = []
for d, plat in (("hashnode", "Hashnode"), ("medium", "Medium"), ("substack", "Substack")):
    for f in sorted(Path(d).glob("[HMS]*.md")):
        m = FM.match(f.read_text())
        if not m:
            raise SystemExit(f"no front matter: {f}")
        fm, body = front_matter(m.group(1)), m.group(2).strip()

        site, ext = [], []
        for anchor, url in MDLINK.findall(body):
            (site if "pixoramagroup.com" in url else ext).append((anchor, url))

        # byline employer disclosure is not a content link
        site_content = [(a, u) for a, u in site
                        if u.rstrip("/") != "https://pixoramagroup.com"]
        byline = [u for a, u in site if u.rstrip("/") == "https://pixoramagroup.com"]

        r = {
            "id": fm.get("post_id", f.stem.split("-")[0]),
            "platform": plat,
            "publish_week": fm.get("week", ""),
            "title": fm.get("title", ""),
            "subtitle": fm.get("subtitle", ""),
            "slug": fm.get("slug", ""),
            "target_keyword": fm.get("target_keyword", ""),
            "tags": fm.get("tags", "").strip("[]"),
            "canonical": fm.get("canonical", ""),
            "follow": "dofollow" if plat == "Hashnode" else "nofollow",
            "word_count": len(body.split()),
            "site_links": len(site_content),
            "byline_disclosure": "yes" if byline else "no",
            "external_links": " | ".join(u for a, u in ext),
            "cross_link": fm.get("cross_link", ""),
            "file": str(f),
            "body_markdown": body,
        }
        for i in range(3):
            a, u = site_content[i] if i < len(site_content) else ("", "")
            r[f"link{i+1}_anchor"] = a
            r[f"link{i+1}_url"] = u
        rows.append(r)

COLS = ["id","platform","publish_week","title","subtitle","slug","target_keyword","tags",
        "canonical","follow","word_count","site_links","byline_disclosure",
        "link1_anchor","link1_url","link2_anchor","link2_url","link3_anchor","link3_url",
        "external_links","cross_link","file","body_markdown"]

rows.sort(key=lambda r: (int(r["publish_week"] or 99), r["platform"]))
with open("content-calendar.csv", "w", newline="", encoding="utf-8") as fh:
    w = csv.DictWriter(fh, fieldnames=COLS, quoting=csv.QUOTE_ALL)
    w.writeheader()
    w.writerows(rows)

print(f"content-calendar.csv — {len(rows)} rows, {len(COLS)} columns")
print(f"  total words: {sum(r['word_count'] for r in rows):,}")
print(f"  site links:  {sum(r['site_links'] for r in rows)}")
missing = [r["id"] for r in rows if r["site_links"] == 0]
print(f"  posts with no site link: {missing or 'none'}")
