#!/usr/bin/env python3
"""banners.csv — Cover Studio settings for all 30 posts.

Every column maps to a control in the Pixorama Cover Studio artifact
(https://claude.ai/artifact/K9GCrPoX2UCp5cv2oNro8T), so a banner is produced by
typing the row in, not by redesigning anything.

Constraints taken from the template's own spec sheet:
  - titles around 9 words; auto-fit shrinks type and anything under 44px at OG
    size reads badly in a feed
  - *asterisks* tint words with the brand accent
  - 'paper' background maps a white accent to #7c3aed, so paper rows use violet
    or magenta explicitly
  - WebP q82 at 2x for the blog; keep covers under ~300KB
  - never put "SOC 2 certified" or "ISO 27001 certified" on a cover
"""
import csv, re
from pathlib import Path

HERE = Path(__file__).parent

# banner_title: shortened to <=9 words, with the 1-3 most distinctive words
# marked for accent tinting. bg/accent are assigned by topical cluster so the
# three tracks stay visually distinguishable in a feed.
SPEC = {
 # id    banner_title                                                 kicker                        bg       accent
 "H1": ("The landing zone checklist we run *before wave one*",        "Cloud · Engineering",        "depth", "cyan"),
 "H2": ("A migration wave plan is a *graph problem*",                 "Cloud · Engineering",        "depth", "cyan"),
 "H3": ("The strangler fig, and *where it actually breaks*",          "Engineering · Legacy",       "ink",   "magenta"),
 "H4": ("Why RAG retrieval breaks at *10,000 documents*",             "AI & Data · Engineering",    "wash",  "violet"),
 "H5": ("Give your agent a *budget* and a *kill switch*",             "AI & Data · Engineering",    "wash",  "violet"),
 "H6": ("Egress is the cloud bill you *didn't model*",                "Cloud · FinOps",             "depth", "cyan"),
 "H7": ("Delete the *static access keys* in your CI",                 "Security · DevOps",          "ink",   "magenta"),
 "H8": ("Cross-platform is a *build-system* problem",                 "Mobile · Engineering",       "ink",   "cyan"),
 "H9": ("Evaluating an agent: traces, golden sets, *regression gates*","AI & Data · Observability", "wash",  "violet"),
 "H10":("Multi-tenant isolation, and the *migration you'll regret*",  "Product · Engineering",      "ink",   "magenta"),

 "M1": ("The cloud migration that *cost more* after we finished",     "Cloud",                      "depth", "cyan"),
 "M2": ("Lift and shift is a decision about *time*",                  "Cloud · Architecture",       "depth", "cyan"),
 "M3": ("We replaced a rewrite with *boring work*",                   "Engineering · Legacy",       "ink",   "magenta"),
 "M4": ("Most AI agent projects are *workflow projects*",             "AI & Data",                  "wash",  "violet"),
 "M5": ("How to read an agency pitch *without getting sold*",         "Digital Growth",             "paper", "violet"),
 "M6": ("Staff augmentation failed twice before we *fixed the contract*","Engagement Models",       "paper", "violet"),
 "M7": ("A fractional CTO question about *who owns the roadmap*",     "Leadership",                 "paper", "magenta"),
 "M8": ("What a mobile app costs *after the quote*",                  "Mobile · Product",           "ink",   "cyan"),
 "M9": ("RAG or fine-tuning is the *wrong first question*",           "AI & Data",                  "wash",  "violet"),
 "M10":("Why every *top-10 list* looks the same",                     "Digital Growth",             "paper", "magenta"),

 "S1": ("What we mean by the *software backbone*",                    "Notes from the build",       "ink",   "violet"),
 "S2": ("The four numbers that *decide a migration*",                 "Cloud",                      "depth", "cyan"),
 "S3": ("Architecture debt shows up on the *finance dashboard*",      "Cloud · FinOps",             "depth", "magenta"),
 "S4": ("The modernisation decision tree we *actually use*",          "Engineering · Legacy",       "ink",   "magenta"),
 "S5": ("Where AI agents *earn their keep*",                          "AI & Data",                  "wash",  "violet"),
 "S6": ("Retrieval is a *product problem*",                           "AI & Data",                  "wash",  "violet"),
 "S7": ("How to buy *engineering capacity*",                          "Engagement Models",          "paper", "violet"),
 "S8": ("Two platforms, *one team*",                                  "Mobile",                     "ink",   "cyan"),
 "S9": ("Security that *doesn't stop delivery*",                      "Security",                   "ink",   "magenta"),
 "S10":("How to run a *vendor shortlist*",                            "Digital Growth",             "paper", "magenta"),
}

# Per-platform output. All three platforms crop, so the safe-area guide in the
# studio is the thing to check before exporting.
# Platform cover sizes are inconsistent and some are undocumented, so this
# standardises on the one size every platform accepts.
#
#   Hashnode's own docs give two different figures - 1600x840 in the cover-photo
#   article, 1200x630 in the writing guide - and its community notes say
#   2400x1260 works well. Substack documents 1200x630 for the social preview and
#   a 600x600 minimum for the publication cover. Medium publishes no figure.
#
# So: the studio's "Social / OG" preset (1200x630, 1.91:1) at 2x = 2400x1260 is
# the single export that satisfies all three. Substack additionally needs a
# square publication cover, which the Square preset covers.
PLATFORM = {
 # platform     primary (every post)                       scale  secondary                              lockup      footer right
 "Hashnode":  ("og — 1200x630 @2x = 2400x1260",            "2x",  "",                                     "markword", "Engineering notes"),
 "Medium":    ("og — 1200x630 @2x = 2400x1260",            "2x",  "",                                     "markword", "Engineering partner · Est. 2022"),
 "Substack":  ("og — 1200x630 @2x = 2400x1260",            "2x",  "square — 1080x1080 (publication cover)","mark",     None),
}

rows = []
for r in csv.DictReader(open(HERE / "content-calendar.csv", newline="", encoding="utf-8")):
    pid = r["id"]
    title, kicker, bg, accent = SPEC[pid]
    fmt, scale, fmt2, lockup, foot_r = PLATFORM[r["platform"]]
    if foot_r is None:                        # Substack carries the issue number
        n = re.match(r"Issue (\d+)", r["title"])
        foot_r = f"Notes from the build · Issue {n.group(1)}" if n else "Notes from the build"
    words = len(re.sub(r"\*", "", title).split())
    rows.append({
        "id": pid, "platform": r["platform"], "publish_week": r["publish_week"],
        "post_title": r["title"],
        "banner_title": title,
        "title_words": words,
        "over_9_words": "YES" if words > 9 else "",
        "kicker": kicker,
        "standfirst": "",
        "background": bg,
        "accent": accent,
        "lockup": lockup,
        "footer_left": "pixoramagroup.com",
        "footer_right": foot_r,
        "format_primary": fmt,
        "format_secondary": fmt2,
        "export_scale": scale,
        "export_file": "WebP q82",
        "toggles": "grid on · glow on · hairline on",
    })

COLS = list(rows[0])
with open(HERE / "banners.csv", "w", newline="", encoding="utf-8") as fh:
    w = csv.DictWriter(fh, fieldnames=COLS, quoting=csv.QUOTE_ALL)
    w.writeheader(); w.writerows(rows)

over = [r["id"] for r in rows if r["over_9_words"]]
print(f"banners.csv — {len(rows)} rows, {len(COLS)} columns")
print(f"  titles over 9 words: {over or 'none'}")
print(f"  longest: {max(r['title_words'] for r in rows)} words")
import collections
for k in ("background", "accent", "lockup"):
    c = collections.Counter(r[k] for r in rows)
    print(f"  {k:<11} " + ", ".join(f"{v}x {n}" for n, v in c.most_common()))
