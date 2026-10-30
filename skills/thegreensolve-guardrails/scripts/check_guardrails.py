#!/usr/bin/env python3
"""The Green Solve guardrail check for images, videos and their copy.

Usage:
    python3 check_guardrails.py <file-or-dir> [more ...] [--brand path/to/brand.json]

Point it at a carousel folder, a brag output folder, or single files. It checks:
    images   .png/.jpg   canvas is one of the sizes in references/scale.md (review sheets named
                         contact-sheet*.png / storyboard-*.png are skipped)
    videos   .mp4/.mov   size, fps, duration 15-25 s (+5 s for a disclosure card), audio track
    markup   .html/.css  palette roles only, brand fonts only, no unfilled [placeholders],
                         a source line on every slide/scene that shows a number, slide rhythm
    copy     all text    banned phrases, flagged claims, carbon-credit disclosures,
                         caption numbers that don't appear on the slides
    plans    brag-plan.md  allowed tone, scene durations summing to 15-25 s, format size

Exit code 1 if any ERROR is found. WARN lines need a human look but don't fail the check.
Standard library only; ffprobe is used for videos when it is on PATH.
"""
import html as htmllib, json, os, re, shutil, struct, subprocess, sys

SKILL_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# canvases from references/scale.md (also accepted at 2x)
IMAGE_SIZES = {(1080, 1350): "portrait", (1080, 1080): "square", (1080, 1920): "vertical",
               (1920, 1080): "landscape", (1200, 630): "link", (1280, 720): "thumb"}
VIDEO_SIZES = {(1920, 1080): "landscape", (1080, 1920): "vertical", (1080, 1080): "square"}
SKIP_DIRS = {"node_modules", ".git", "fonts", "work", "__pycache__"}
SKIP_FILES = {"tokens.css", "carousel.css", "tgs-overrides.css", "video-frame.css"}

BANNED = [r"tgs[- ]verified", r"tgs[- ]certified", r"guarantee[ds]?", r"100\s?% carbon neutral",
          r"completely offset", r"erase your (carbon )?footprint", r"cancel out your emissions",
          r"revolutionary", r"game[- ]changing", r"supercharge", r"\bunlock\b", r"\belevate\b",
          r"streamline your workflow", r"excited to share"]
FLAGGED = [r"carbon[- ]neutral", r"net[- ]zero", r"eco[- ]friendly", r"\boffset (your|our|their|its) "]
DISCLOSURE_KEYS = ["do not eliminate emissions", "marketplace facilitator"]
FONT_OK = {"libre baskerville", "helvetica neue", "helvetica", "arial", "liberation sans",
           "sans-serif", "serif", "inherit", "brand heading", "georgia", "times new roman"}

errors, warns = [], []
def err(path, msg): errors.append(f"ERROR {path}: {msg}")
def warn(path, msg): warns.append(f"WARN  {path}: {msg}")

# ---------- helpers ----------
def image_size(path):
    with open(path, "rb") as f:
        head = f.read(26)
        if head[:8] == b"\x89PNG\r\n\x1a\n":
            return struct.unpack(">II", head[16:24])
        if head[:2] == b"\xff\xd8":                      # JPEG: walk to the SOF marker
            f.seek(2)
            while True:
                marker = f.read(2)
                if len(marker) < 2 or marker[0] != 0xFF: return None
                length = struct.unpack(">H", f.read(2))[0]
                if marker[1] in (0xC0, 0xC1, 0xC2):
                    h, w = struct.unpack(">xHH", f.read(5))
                    return w, h
                f.seek(length - 2, 1)
    return None

def size_ok(size, table):
    w, h = size
    if (w, h) in table: return table[(w, h)]
    return table.get((w // 2, h // 2)) if w % 2 == 0 and h % 2 == 0 else None

def visible_text(markup):
    t = re.sub(r"(?is)<(script|style)\b.*?</\1>", " ", markup)
    t = re.sub(r"(?s)<!--.*?-->", " ", t)
    t = re.sub(r"<br\s*/?>", " ", t)
    t = re.sub(r"<[^>]+>", " ", t)
    return re.sub(r"\s+", " ", htmllib.unescape(t)).strip()

STAT = re.compile(r"(?<![\w#])(\d[\d,]*(?:\.\d+)?)\s*(%|bn\b|billion\b|million\b|crore\b|lakh\b|gw\b|mw\b|twh\b|"
                  r"kt\b|mt\b|gt\b|tco2e?\b|tonnes?\b|x\b|×)?", re.I)
def stat_numbers(text):
    """Numbers that read as data: anything with a unit, or 2+ digits that isn't a year."""
    found = []
    for m in STAT.finditer(text):
        num, unit = m.group(1), m.group(2)
        digits = num.replace(",", "").split(".")[0]
        if unit: found.append(m.group(0).strip())
        elif len(digits) >= 2 and not re.fullmatch(r"(19|20)\d\d|0\d", digits): found.append(num)   # skip years, "01" labels
    return found

def phrase_checks(path, text):
    low = text.lower()
    for p in BANNED:
        m = re.search(p, low)
        if m: err(path, f"banned phrase \"{m.group(0)}\" (references/copy-and-claims.md)")
    for p in FLAGGED:
        m = re.search(p, low)
        if m: warn(path, f"claim \"{m.group(0).strip()}\" needs a qualifier and a source, or rewording")

# ---------- per-type checks ----------
def check_image(path):
    size = image_size(path)
    if not size: return warn(path, "could not read image size")
    if not size_ok(size, IMAGE_SIZES):
        err(path, f"{size[0]}x{size[1]} is not a TGS canvas (allowed: " +
            ", ".join(f"{k} {w}x{h}" for (w, h), k in IMAGE_SIZES.items()) + ")")

def check_video(path, brand, has_disclosure):
    if not shutil.which("ffprobe"): return warn(path, "ffprobe not found; video not checked")
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries",
                          "stream=codec_type,width,height,r_frame_rate:format=duration", "-of", "json", path],
                         capture_output=True, text=True)
    try: info = json.loads(out.stdout)
    except ValueError: return err(path, "ffprobe could not read the file")
    streams = info.get("streams", [])
    v = next((s for s in streams if s.get("codec_type") == "video"), None)
    if not v: return err(path, "no video stream")
    size = (int(v["width"]), int(v["height"]))
    if not size_ok(size, VIDEO_SIZES):
        err(path, f"{size[0]}x{size[1]} is not a TGS video canvas (1920x1080, 1080x1920, 1080x1080)")
    num, den = (v.get("r_frame_rate") or "0/1").split("/")
    fps = float(num) / float(den or 1)
    want = brand.get("video", {}).get("fps", 30)
    if abs(fps - want) > 0.5: warn(path, f"{fps:.2f} fps; TGS standard is {want}")
    lo, hi = brand.get("video", {}).get("duration_s", [15, 25])
    hi_allowed = hi + 5 if has_disclosure else hi
    dur = float(info.get("format", {}).get("duration", 0))
    if not lo <= dur <= hi_allowed + 0.05:
        err(path, f"duration {dur:.1f} s; allowed {lo}-{hi} s" + (" (+5 s disclosure card)" if has_disclosure else ""))
    if not any(s.get("codec_type") == "audio" for s in streams):
        warn(path, "no audio track; brag default is a music bed + subtle SFX")

def check_css_text(path, css, palette):
    for m in re.finditer(r"#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b", css):
        h = m.group(1).lower()
        if len(h) == 3: h = "".join(c * 2 for c in h)
        h = "#" + h[:6]
        if h in ("#ffffff", "#000000"):
            err(path, f"pure {'white' if h == '#ffffff' else 'black'} {m.group(0)}; use var(--paper) / var(--ink)")
        elif h not in palette:
            err(path, f"off-palette colour {m.group(0)}; use a colour role (var(--ink) etc.)")
    for m in re.finditer(r"\b(rgba?|hsla?)\(", css):
        warn(path, f"{m.group(0)}...) colour; use a role or color-mix() of a role")
    for m in re.finditer(r"font-family\s*:\s*([^;}]+)", css):
        for fam in m.group(1).split(","):
            fam = fam.strip().strip("'\"").lower()
            if fam and not fam.startswith("var(") and fam not in FONT_OK:
                err(path, f"font \"{fam}\" is not a TGS font (Libre Baskerville / Helvetica Neue)")
    if re.search(r"linear-gradient|radial-gradient|conic-gradient", css):
        warn(path, "gradient found; only role tints are allowed")

UNITS = re.compile(r"\d[\d,.]*\s*(?:%|(?:bn|billion|million|crore|lakh|gw|mw|twh|kt|mt|gt|tco2e?|tonnes?)\b)", re.I)

def check_html(path, markup, palette, slide_numbers):
    style_bits = re.findall(r"(?is)<style\b[^>]*>(.*?)</style>", markup)
    style_bits += re.findall(r"style\s*=\s*\"([^\"]*)\"", markup)
    style_bits += re.findall(r"(?:fill|stroke|stop-color|color)\s*=\s*\"(#[^\"]*)\"", markup)
    check_css_text(path, "\n".join(style_bits), palette)

    text = visible_text(markup)
    phrase_checks(path, text)
    for m in re.finditer(r"\[[^\[\]]{2,80}\]", text):
        err(path, f"unfilled placeholder {m.group(0)}")

    # split into slides (<section class="slide ...">) or video scenes (class="... tgs-scene ...")
    starts = [(m.start(), m.group(1)) for m in re.finditer(r"<(?:section|div)\b[^>]*class=\"([^\"]*\b(?:slide|tgs-scene)\b[^\"]*)\"", markup)]
    bgs = []
    for i, (pos, cls) in enumerate(starts):
        chunk = markup[pos: starts[i + 1][0] if i + 1 < len(starts) else len(markup)]
        bg = next((c for c in ("dark", "light", "stone") if re.search(rf"\b{c}\b", cls)), "?")
        bgs.append(bg)
        has_source = re.search(r"class=\"[^\"]*\b(source|tgs-source)\b", chunk) or re.search(r"(?i)\bsource:", visible_text(chunk))
        body = re.sub(r"(?is)<(div|footer)\b[^>]*class=\"[^\"]*\b(footer|tgs-footer|source|tgs-source)\b[^\"]*\".*?</\1>", " ", chunk)
        nums = stat_numbers(visible_text(body))
        slide_numbers.update(n.lower().replace(" ", "") for n in nums)
        label = f"{path} [{'slide' if 'slide' in cls else 'scene'} {i + 1}]"
        if nums and not has_source:
            err(label, f"shows {', '.join(nums[:4])} but has no source line")
    if bgs:
        if bgs[0] != "dark": warn(path, "first slide/scene should be on ink (dark)")
        if bgs[-1] != "dark": warn(path, "closing slide/scene should be on ink (dark) with the large logo")
        for i in range(len(bgs) - 2):
            if bgs[i] == bgs[i + 1] == bgs[i + 2] != "?":
                warn(path, f"slides/scenes {i + 1}-{i + 3} share the same background ({bgs[i]})")

def check_plan(path, text, brand):
    vid = brand.get("video", {})
    m = re.search(r"(?im)^\s*-\s*Preset:\s*`?([\w-]+)", text)
    if m:
        tone = m.group(1).lower()
        if tone in vid.get("banned_tones", []):
            err(path, f"tone '{tone}' is banned for TGS (use {', '.join(vid.get('allowed_tones', []))})")
        elif tone not in vid.get("allowed_tones", []) and not tone.startswith("["):
            warn(path, f"tone '{tone}' is not a known preset")
    durs = [float(d) for d in re.findall(r"(?im)^#{2,4}\s*Scene\b.*?[—–-]\s*([\d.]+)\s*s\b", text)]
    if durs:
        total = sum(durs)
        lo, hi = vid.get("duration_s", [15, 25])
        disclosure = any(k in text.lower() for k in DISCLOSURE_KEYS) or "disclosure" in text.lower()
        if not lo <= total <= (hi + 5 if disclosure else hi):
            err(path, f"scene durations sum to {total:g} s; allowed {lo}-{hi} s")
    f = re.search(r"(?im)^#*\s*Format:.*?(\d{3,4})\s*[x×]\s*(\d{3,4})", text)
    if f and not size_ok((int(f.group(1)), int(f.group(2))), VIDEO_SIZES):
        err(path, f"format {f.group(1)}x{f.group(2)} is not a TGS video canvas")

# ---------- main ----------
def main(argv):
    brand_path = os.path.join(SKILL_DIR, "brand", "brand.json")
    if "--brand" in argv:
        i = argv.index("--brand"); brand_path = argv[i + 1]; del argv[i:i + 2]
    if not argv: sys.exit(__doc__)
    brand = json.load(open(brand_path))
    palette = {v.lower() for v in brand["colors"].values()}

    files = []
    for target in argv:
        if os.path.isdir(target):
            for root, dirs, names in os.walk(target):
                dirs[:] = [d for d in dirs if d not in SKIP_DIRS and not (d == "brand" and root == target)]
                files += [os.path.join(root, n) for n in sorted(names)]
        elif os.path.exists(target): files.append(target)
        else: err(target, "not found")

    texts = {}
    for f in files:
        name = os.path.basename(f)
        if name in SKIP_FILES: continue
        ext = os.path.splitext(name)[1].lower()
        if ext in (".html", ".htm", ".css", ".md", ".txt"):
            texts[f] = open(f, encoding="utf-8", errors="replace").read()
    all_text = " ".join(visible_text(t) if f.endswith((".html", ".htm")) else t for f, t in texts.items()).lower()
    mentions_credits = re.search(r"carbon[- ]credits?", all_text) is not None
    has_disclosure = all(k in all_text for k in DISCLOSURE_KEYS)

    slide_numbers = set()
    for f, t in texts.items():
        if f.endswith((".html", ".htm")): check_html(f, t, palette, slide_numbers)
        elif f.endswith(".css"): check_css_text(f, t, palette)
    for f, t in texts.items():
        name = os.path.basename(f).lower()
        if not f.endswith((".md", ".txt")): continue
        if name == "brag-plan.md":
            check_plan(f, t, brand)
            continue
        if name in ("composition-brief.md", "readme.md"): continue
        phrase_checks(f, t)
        if slide_numbers and name in ("caption.md", "share-copy.txt"):
            for m in UNITS.finditer(t):
                if m.group(0).lower().replace(" ", "") not in slide_numbers:
                    warn(f, f"\"{m.group(0)}\" is in the caption but not on any slide/scene")

    for f in files:
        name = os.path.basename(f)
        ext = os.path.splitext(name)[1].lower()
        if name in SKIP_FILES or "/brand/" in f.replace(os.sep, "/"): continue
        if ext in (".png", ".jpg", ".jpeg") and not name.startswith(("contact-sheet", "storyboard-")): check_image(f)
        elif ext in (".mp4", ".mov", ".webm", ".m4v"): check_video(f, brand, has_disclosure)

    if mentions_credits and not has_disclosure:
        missing = [k for k in DISCLOSURE_KEYS if k not in all_text]
        err("bundle", "carbon credits are mentioned but the required disclosures are missing "
                      f"({'; '.join(missing)}); see references/copy-and-claims.md")

    for line in errors + warns: print(line)
    print(f"\nTGS guardrail check: {len(errors)} error(s), {len(warns)} warning(s) across {len(files)} file(s).")
    print("PASS" if not errors else "FAIL")
    return 1 if errors else 0

if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
