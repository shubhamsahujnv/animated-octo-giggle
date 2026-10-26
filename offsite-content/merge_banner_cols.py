#!/usr/bin/env python3
"""Add the banner columns to content-calendar.csv and content-flat.csv so the
content and its cover settings travel together."""
import csv
from pathlib import Path

HERE = Path(__file__).parent
ban = {r["id"]: r for r in csv.DictReader(open(HERE/"banners.csv", newline="", encoding="utf-8"))}
ADD = ["banner_title","kicker","background","accent","lockup",
       "footer_left","footer_right","format_primary","format_secondary",
       "export_scale","export_file"]

for name in ("content-calendar.csv", "content-flat.csv"):
    p = HERE/name
    rows = list(csv.DictReader(open(p, newline="", encoding="utf-8")))
    cols = list(rows[0])
    body = cols[-1]                      # keep the big body column last
    new = [c for c in cols if c != body] + [c for c in ADD if c not in cols] + [body]
    for r in rows:
        for c in ADD:
            r[c] = ban[r["id"]][c]          # overwrite, so re-runs refresh
    with open(p, "w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=new, quoting=csv.QUOTE_ALL)
        w.writeheader(); w.writerows(rows)
    print(f"{name}: {len(new)} columns ({len(cols)} + {len(new)-len(cols)}), body last")
