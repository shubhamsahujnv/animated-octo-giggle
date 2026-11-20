"""Draw a 1200x630 social image per article in the website's own style:
the homepage hero's dark green panel, lime label chip, cream text and the tgs logo."""
from PIL import Image, ImageDraw, ImageFont
import sys
S = sys.argv[1]  # folder holding fonts/ and tgs-logo.png
POSTS = [
 ("carbon-credits-are-not-just-for-big-companies", "Carbon credits are not just for big companies", "Ankita Patwa", "4 Aug 2026"),
 ("un-article-6-4-n2o-methodology", "The UN just opened a door for N₂O projects", "TGS Editorial", "21 Jul 2026"),
 ("what-jpmorgan-buying-removals-tells-smes", "What a bank buying removals tells the rest of us", "TGS Editorial", "30 Jun 2026"),
 ("scope-3-for-manufacturers-without-a-data-team", "Scope 3 for manufacturers without a data team", "TGS Editorial", "19 May 2026"),
 ("india-and-us-reporting-what-changes", "Reporting in India and the US: what actually differs", "TGS Editorial", "12 Apr 2026"),
]
# colours taken from the live site's CSS (homepage hero and chip)
PAGE, PANEL, CREAM, LIME, MUTED = "#F5F5F0", "#02403D", "#FFFDF8", "#E2FF4D", "#A9C2BE"
W, H, PAD, R = 1200, 630, 22, 18
fonts = f"{S}/fonts"
mono = ImageFont.truetype(f"{fonts}/IBMPlexMono600.ttf", 21)
meta = ImageFont.truetype(f"{fonts}/DMSans.ttf", 27)
def title_font(size): return ImageFont.truetype(f"{fonts}/SpaceGrotesk600.ttf", size)

# logo recoloured to cream, keeping its shape from the alpha channel
src = Image.open(f"{S}/tgs-logo.png").convert("RGBA")
src = src.resize((118, round(118 * src.height / src.width)), Image.LANCZOS)
logo = Image.new("RGBA", src.size, CREAM); logo.putalpha(src.getchannel("A"))

def wrap(text, font, width, d):
    lines, cur = [], ""
    for w in text.split():
        t = f"{cur} {w}".strip()
        if d.textlength(t, font=font) <= width: cur = t
        else: lines.append(cur); cur = w
    return lines + [cur]

for slug, title, author, date in POSTS:
    im = Image.new("RGB", (W, H), PAGE)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([PAD, PAD, W - PAD, H - PAD], radius=R, fill=PANEL)
    x = 84
    # lime label chip, like "CARBON INTELLIGENCE PLATFORM" on the homepage
    label = "THE BASELINE JOURNAL"
    tw = d.textlength(label, font=mono)
    d.rounded_rectangle([x, 78, x + tw + 36, 78 + 42], radius=21, fill=LIME)
    d.text((x + 18, 78 + 21), label, font=mono, fill=PANEL, anchor="lm")
    for size in (74, 66, 58):
        f = title_font(size); lines = wrap(title, f, 900, d)
        if len(lines) <= 3: break
    # balance the lines: narrowest width that keeps the same number of lines
    n = len(lines)
    for width in range(900, 400, -10):
        cand = wrap(title, f, width, d)
        if len(cand) != n: break
        lines = cand
    y = 162
    for ln in lines:
        d.text((x, y), ln, font=f, fill=CREAM); y += round(size * 1.1)
    # lime rule + byline, echoing the hero's lime side bar
    d.rectangle([x, H - 136, x + 5, H - 86], fill=LIME)
    d.text((x + 24, H - 111), f"{author}  ·  {date}", font=meta, fill=MUTED, anchor="lm")
    im.paste(logo, (W - PAD - 62 - logo.width, H - PAD - 52 - logo.height), logo)
    im.save(f"new/og/{slug}.jpg", quality=88, optimize=True, progressive=True)
    print(slug, len(lines), "lines at", size)
