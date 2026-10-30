#!/usr/bin/env python3
"""Turn a brand.json into a ready-to-use brand folder for the editorial carousel system.

Usage:
    python3 make_tokens.py <brand.json> <project-dir>

Creates <project-dir>/brand/ with:
    tokens.css         colour roles + font faces + contrast-aware emphasis rules
    carousel.css       the shared layout/components (copied from the skill's assets)
    fonts/             font files (copied from local paths or downloaded from Google Fonts)
    logo-on-dark.png   logo for dark (ink) slides, transparent margins trimmed
    logo-on-light.png  logo for light (paper/surface) slides, transparent margins trimmed

It also prints a contrast report so you can catch unreadable colour pairs before designing.
brand.json format: see assets/brand.template.json.
"""
import json, os, re, shutil, sys, urllib.request

SKILL_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def hex_rgb(h):
    h = h.lstrip('#')
    if len(h) == 3: h = ''.join(c * 2 for c in h)
    return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))

def luminance(h):
    def ch(c): return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (ch(c) for c in hex_rgb(h))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def contrast(a, b):
    la, lb = sorted((luminance(a), luminance(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)

def google_font(family, dest, label):
    """Download regular, bold and italic TTFs of a Google Font. Returns {style: filename}."""
    url = ("https://fonts.googleapis.com/css2?family=" + family.replace(' ', '+') +
           ":ital,wght@0,400;0,700;1,400")
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/4.0"})   # old UA -> TTF urls
    css = urllib.request.urlopen(req, timeout=30).read().decode()
    files = {}
    for block in re.findall(r"@font-face\s*{[^}]*}", css):
        style = re.search(r"font-style:\s*(\w+)", block).group(1)
        weight = re.search(r"font-weight:\s*(\d+)", block).group(1)
        src = re.search(r"url\((https://[^)]+)\)", block).group(1)
        key = "italic" if style == "italic" else ("bold" if weight == "700" else "regular")
        name = f"{label}-{key}.ttf"
        urllib.request.urlretrieve(src, os.path.join(dest, name))
        files[key] = name
    if not files:
        sys.exit(f"Could not find Google Font '{family}'. Check the spelling on fonts.google.com.")
    return files

def local_font(spec, base, dest, label):
    files = {}
    for key, path in spec.get("files", {}).items():
        src = path if os.path.isabs(path) else os.path.join(base, path)
        ext = os.path.splitext(src)[1]
        name = f"{label}-{key}{ext}"
        shutil.copy(src, os.path.join(dest, name))
        files[key] = name
    return files

def font_faces(family_alias, files):
    out = []
    for key, name in files.items():
        weight = 700 if key == "bold" else 400
        style = "italic" if key == "italic" else "normal"
        out.append(f'@font-face {{ font-family: "{family_alias}"; src: url("fonts/{name}"); '
                   f'font-weight: {weight}; font-style: {style}; }}')
    return out

def trim_logo(src, dst):
    try:
        from PIL import Image
        im = Image.open(src).convert("RGBA")
        box = im.split()[3].getbbox()
        (im.crop(box) if box else im).save(dst)
    except ImportError:
        shutil.copy(src, dst)

def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    brand_path, project = sys.argv[1], sys.argv[2]
    base = os.path.dirname(os.path.abspath(brand_path))
    b = json.load(open(brand_path))
    c = b["colors"]
    for role in ("ink", "accent", "surface", "muted", "paper"):
        if role not in c:
            sys.exit(f"brand.json colors needs '{role}'. Roles: ink, accent, surface, muted, paper.")

    out = os.path.join(project, "brand")
    fonts_dir = os.path.join(out, "fonts")
    os.makedirs(fonts_dir, exist_ok=True)

    # fonts
    faces, stacks = [], {}
    for slot, fallback in (("heading", 'Georgia, "Times New Roman", serif'),
                           ("body", 'Helvetica, Arial, "Liberation Sans", sans-serif')):
        spec = b.get("fonts", {}).get(slot, {})
        family = spec.get("family")
        alias = f"Brand {slot.title()}"
        files = {}
        if spec.get("google"):
            files = google_font(spec["google"], fonts_dir, slot)
            family = family or spec["google"]
        elif spec.get("files"):
            files = local_font(spec, base, fonts_dir, slot)
        if files:
            faces += font_faces(alias, files)
            stacks[slot] = f'"{alias}", {spec.get("fallback", fallback)}'
        else:   # system font only (e.g. Helvetica you can't redistribute)
            stacks[slot] = f'{json.dumps(family) + ", " if family else ""}{spec.get("fallback", fallback)}'

    # contrast-aware roles
    accent_on_ink = c["accent"] if contrast(c["accent"], c["ink"]) >= 3 else c["paper"]
    on_accent = c["ink"] if contrast(c["ink"], c["accent"]) >= contrast(c["paper"], c["accent"]) else c["paper"]
    accent_readable_on_paper = contrast(c["accent"], c["paper"]) >= 3
    if accent_readable_on_paper:
        light_em = ".light em, .stone em { color: var(--accent); }"
    else:  # bright accent: use it as a highlighter-pen underlay instead of text colour
        light_em = (".light em, .stone em { color: var(--ink); background: linear-gradient(transparent 62%, "
                    "color-mix(in srgb, var(--accent) 90%, transparent) 62%); padding: 0 4px; }")

    lines = [f"/* {b.get('name', 'Brand')}: generated by make_tokens.py, edit brand.json instead. */", *faces, "",
             ":root {"]
    for role in ("ink", "accent", "surface", "muted", "paper"):
        lines.append(f"  --{role}: {c[role]};")
    lines += [f"  --accent-on-ink: {accent_on_ink};", f"  --on-accent: {on_accent};",
              f"  --font-head: {stacks['heading']};", f"  --font-body: {stacks['body']};", "}", light_em, ""]
    open(os.path.join(out, "tokens.css"), "w").write("\n".join(lines))
    shutil.copy(os.path.join(SKILL_DIR, "assets", "carousel.css"), os.path.join(out, "carousel.css"))

    # logos
    logos = b.get("logos", {})
    for key, name in (("on_dark", "logo-on-dark.png"), ("on_light", "logo-on-light.png")):
        if logos.get(key):
            src = logos[key] if os.path.isabs(logos[key]) else os.path.join(base, logos[key])
            trim_logo(src, os.path.join(out, name))
        else:
            print(f"! No logos.{key} given: add one before publishing (slides reference brand/{name}).")

    # contrast report
    checks = [("ink text on paper", c["ink"], c["paper"], 7.0),
              ("paper text on ink", c["paper"], c["ink"], 7.0),
              ("muted text on paper", c["muted"], c["paper"], 4.5),
              ("ink text on surface", c["ink"], c["surface"], 4.5),
              ("accent on ink (numbers, emphasis)", accent_on_ink, c["ink"], 3.0),
              ("text on accent (large bold pill/card text)", on_accent, c["accent"], 3.0)]
    print(f"Brand folder written to {out}")
    print("Contrast check (WCAG ratio; target in brackets):")
    for label, fg, bg, target in checks:
        r = contrast(fg, bg)
        print(f"  {'OK ' if r >= target else 'LOW'} {r:5.2f}  {label}  [{target}]")
    print("Emphasis on light slides:", "accent-coloured text" if accent_readable_on_paper else "highlighter underlay")

if __name__ == "__main__":
    main()
