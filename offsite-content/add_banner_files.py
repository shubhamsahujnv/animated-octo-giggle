#!/usr/bin/env python3
"""Record the generated file and its real size in the CSVs."""
import csv, json
from pathlib import Path
HERE = Path(__file__).parent
man = {m["id"]: m for m in json.load(open(HERE/"banners"/"_manifest.json"))}

for name in ("banners.csv", "content-calendar.csv", "content-flat.csv"):
    p = HERE/name
    rows = list(csv.DictReader(open(p, newline="", encoding="utf-8")))
    cols = list(rows[0]); body = cols[-1]
    add = [c for c in ("banner_file","banner_px","banner_kb") if c not in cols]
    new = [c for c in cols if c != body] + add + [body]
    for r in rows:
        m = man[r["id"]]
        r["banner_file"] = "banners/" + m["file"]
        r["banner_px"]   = f'{m["w"]}x{m["h"]}'
        r["banner_kb"]   = str(round(m["bytes"]/1024))
    with open(p, "w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=new, quoting=csv.QUOTE_ALL)
        w.writeheader(); w.writerows(rows)
    print(f"{name}: {len(new)} columns")
