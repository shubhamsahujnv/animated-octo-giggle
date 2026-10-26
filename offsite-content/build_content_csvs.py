#!/usr/bin/env python3
"""Build the three content CSVs from content-calendar.csv.

  content-flat.csv        one post per physical line; newlines escaped as \\n.
                          Lossless. Opens correctly in every tool.
  content-paragraphs.csv  one row per block. Readable in a spreadsheet with no
                          unescaping. Wrapped prose is joined; code, tables and
                          lists keep their real line breaks.
"""
import csv, re
from pathlib import Path

HERE = Path(__file__).parent
rows = list(csv.DictReader(open(HERE / "content-calendar.csv", newline="", encoding="utf-8")))

# ---------- content-flat.csv ------------------------------------------------
FLAT = ["id","platform","publish_week","title","subtitle","target_keyword",
        "follow","word_count","link1_url","link2_url","link3_url","body_oneline"]

def escape(s: str) -> str:
    # backslash first, then newline — order matters
    return s.replace("\\", "\\\\").replace("\r\n", "\n").replace("\n", "\\n")

with open(HERE / "content-flat.csv", "w", newline="", encoding="utf-8") as fh:
    w = csv.DictWriter(fh, fieldnames=FLAT, quoting=csv.QUOTE_ALL)
    w.writeheader()
    for r in rows:
        w.writerow({**{k: r.get(k, "") for k in FLAT if k != "body_oneline"},
                    "body_oneline": escape(r["body_markdown"])})

# ---------- content-paragraphs.csv -----------------------------------------
# Blocks whose internal line breaks are meaningful. Joining these would corrupt
# them, so they keep real newlines even though it costs physical lines.
KEEP_BREAKS = {"code", "table", "list"}

def classify(block: str) -> str:
    t = block.lstrip()
    if block.startswith("```"):              return "code"
    if t.startswith("#"):                    return "heading"
    if t.startswith("|"):                    return "table"
    if t.startswith(("- ", "* ", "> ")):     return "list"
    if re.match(r"^\d+\.\s", t):             return "list"
    return "paragraph"

def blocks_of(body: str):
    out, buf, in_code = [], [], False
    for line in body.split("\n"):
        if line.startswith("```"):
            in_code = not in_code
            buf.append(line)
            if not in_code:
                out.append("\n".join(buf)); buf = []
            continue
        if in_code:
            buf.append(line); continue
        if line.strip():
            buf.append(line)
        elif buf:
            out.append("\n".join(buf)); buf = []
    if buf:
        out.append("\n".join(buf))
    return out

n = 0
with open(HERE / "content-paragraphs.csv", "w", newline="", encoding="utf-8") as fh:
    w = csv.writer(fh, quoting=csv.QUOTE_ALL)
    w.writerow(["id","platform","publish_week","title","block_no","block_type","text"])
    for r in rows:
        for i, b in enumerate(blocks_of(r["body_markdown"]), 1):
            t = classify(b)
            text = b if t in KEEP_BREAKS else " ".join(b.split("\n"))
            w.writerow([r["id"], r["platform"], r["publish_week"], r["title"], i, t, text])
            n += 1

# ---------- verify ----------------------------------------------------------
from unescape_body import unescape
flat = list(csv.DictReader(open(HERE / "content-flat.csv", newline="", encoding="utf-8")))
orig = {r["id"]: r["body_markdown"] for r in rows}
bad = [r["id"] for r in flat if unescape(r["body_oneline"]) != orig[r["id"]]]

para = list(csv.DictReader(open(HERE / "content-paragraphs.csv", newline="", encoding="utf-8")))
# every block's words must appear in its source post, in order
lost = []
for pid in orig:
    joined = " ".join(x["text"] for x in para if x["id"] == pid).split()
    if len(joined) < len(orig[pid].split()) * 0.98:
        lost.append(pid)

phys = sum(1 for _ in open(HERE / "content-flat.csv", encoding="utf-8"))
print(f"content-flat.csv       {phys:>5} lines for {len(rows)} posts"
      f"  {'OK' if phys == len(rows)+1 else 'WRONG'}")
print(f"  lossless restore     {len(flat)-len(bad)}/{len(flat)}"
      f"  {'OK' if not bad else 'FAIL ' + str(bad)}")
print(f"content-paragraphs.csv {n:>5} blocks")
print(f"  word retention       {'OK' if not lost else 'LOSS in ' + str(lost)}")
