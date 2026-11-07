#!/usr/bin/env python3
"""
GreenSolve Diwali wish video — "The Little Diya That Cleared the Sky".

Everything (artwork, animation and music) is generated procedurally with
Pillow + NumPy and encoded with ffmpeg. No stock assets are used.

    python3 make_video.py            # renders greensolve_diwali.mp4
    python3 make_video.py --preview  # renders a few still frames to ./preview

Optional: drop a `logo.png` (transparent PNG) next to this script and it will
replace the drawn leaf-diya mark + wordmark on the closing card.
"""
import math
import os
import subprocess
import sys
from multiprocessing import Pool

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

from story import BRAND, CAPTIONS, CARD, STORY_CAPTIONS

HERE = os.path.dirname(os.path.abspath(__file__))
FPS = 30
WW, SH = 1920, 1080  # the town "world" strip is always authored at 1920x1080
W, H = 1920, 1080    # output canvas (changed by configure())
OY = 0               # where the town strip sits vertically inside the canvas
VERTICAL = False
DURATION = 55.0
STORY_DURATION = 15.0

# per-format layout. "reel" = the full story in 9:16, "story" = a 15 s Instagram Story greeting
LAYOUTS = {
    "landscape": dict(size=(1920, 1080), oy=0, cap_y=36, cap_w=1560, cap_size=46, quote_size=54,
                      rc=(960, 600), fg_panel_x=1560, pots=[1085, 1255],
                      card=dict(center=(960, 700), swags=3, title_size=210, title_w=1800, title_y=370,
                                sub_size=48, sub_w=1700, sub_y=540, logo_y=655, wish_w=1700, wish_y=815,
                                diyas=11, diya_y=1035, diya_margin=110)),
    "vertical": dict(size=(1080, 1920), oy=700, cap_y=330, cap_w=900, cap_size=52, quote_size=60,
                     rc=(540, 1010), fg_panel_x=790, pots=[1100, 1260],
                     card=dict(center=(540, 1150), swags=2, title_size=250, title_w=900, title_y=640,
                               sub_size=54, sub_w=880, sub_y=930, logo_y=1175, wish_w=700, wish_y=1360,
                               diyas=6, diya_y=1660, diya_margin=110)),
}
L = LAYOUTS["landscape"]
RC = L["rc"]


def configure(fmt):
    global W, H, OY, VERTICAL, L, RC
    L = LAYOUTS["landscape" if fmt == "landscape" else "vertical"]
    W, H = L["size"]
    OY = L["oy"]
    VERTICAL = fmt != "landscape"
    RC = L["rc"]
SS = 3  # supersampling factor for anti-aliased vector artwork


def font(name, size, variation=None):
    f = ImageFont.truetype(os.path.join(HERE, "fonts", name), size)
    if variation:
        f.set_variation_by_name(variation)
    return f


# --------------------------------------------------------------------------
# small math helpers
# --------------------------------------------------------------------------
def clamp(x, a=0.0, b=1.0):
    return a if x < a else b if x > b else x


def smooth(x):
    x = clamp(x)
    return x * x * (3 - 2 * x)


def ramp(t, a, b):
    return smooth((t - a) / (b - a))


def window(t, a, b, fi=0.7, fo=0.7):
    return min(ramp(t, a, a + fi), 1 - ramp(t, b - fo, b))


def lerp(a, b, x):
    return a + (b - a) * x


# --------------------------------------------------------------------------
# raster helpers (float32 RGB canvases, values 0..255)
# --------------------------------------------------------------------------
def to_arr(im):
    a = np.asarray(im.convert("RGBA"), dtype=np.float32).copy()
    a[..., 3] /= 255.0
    return a


def vector_layer(w, h, draw_fn, ss=SS):
    """Draw at ss× resolution with ImageDraw, downsample for anti-aliasing."""
    im = Image.new("RGBA", (int(w * ss), int(h * ss)), (0, 0, 0, 0))
    draw_fn(ImageDraw.Draw(im), ss)
    return to_arr(im.resize((int(w), int(h)), Image.LANCZOS))


def blend(base, spr, x, y, k=1.0):
    """Alpha-blend an RGBA float sprite onto an RGB float canvas."""
    if k <= 0.004:
        return
    h, w = spr.shape[:2]
    x, y = int(round(x)), int(round(y))
    x0, y0 = max(x, 0), max(y, 0)
    x1, y1 = min(x + w, base.shape[1]), min(y + h, base.shape[0])
    if x0 >= x1 or y0 >= y1:
        return
    s = spr[y0 - y:y1 - y, x0 - x:x1 - x]
    a = s[..., 3:4] * k
    region = base[y0:y1, x0:x1]
    region *= 1 - a
    region += s[..., :3] * a


_glow_cache = {}


def glow_sprite(r):
    r = max(2, int(r))
    if r not in _glow_cache:
        ax = np.arange(-r, r + 1, dtype=np.float32) / r
        d = np.sqrt(ax[None, :] ** 2 + ax[:, None] ** 2)
        g = 0.65 * np.exp(-d * d * 7.0) + 0.35 * np.exp(-d * 3.2)
        g *= np.clip((1 - d) / 0.35, 0, 1)
        _glow_cache[r] = g.astype(np.float32)
    return _glow_cache[r]


def add_glow(light, cx, cy, r, color, k):
    """Additive light (for flames, bulbs, stars, bokeh)."""
    if k <= 0.004:
        return
    g = glow_sprite(r)
    h, w = g.shape
    x, y = int(round(cx)) - h // 2, int(round(cy)) - h // 2
    x0, y0 = max(x, 0), max(y, 0)
    x1, y1 = min(x + w, light.shape[1]), min(y + h, light.shape[0])
    if x0 >= x1 or y0 >= y1:
        return
    s = g[y0 - y:y1 - y, x0 - x:x1 - x]
    light[y0:y1, x0:x1] += s[..., None] * (np.asarray(color, np.float32) * k)


def noise_tex(w, h, cx, cy, seed, blur):
    r = np.random.default_rng(seed).random((cy, cx))
    im = Image.fromarray((r * 255).astype(np.uint8), "L").resize((w, h), Image.BICUBIC)
    im = im.filter(ImageFilter.GaussianBlur(blur))
    return np.asarray(im, np.float32) / 255.0


def vgrad(stops, h=None):
    h = h or H
    pos = np.linspace(0, 1, h)
    out = np.zeros((h, 1, 3), np.float32)
    for c in range(3):
        out[:, 0, c] = np.interp(pos, [s[0] for s in stops], [s[1][c] for s in stops])
    return out


# --------------------------------------------------------------------------
# vector shapes
# --------------------------------------------------------------------------
def teardrop(d, cx, base, h, r, col, lean=0.0):
    """Flame-like teardrop standing on `base`, height h, bulb radius r."""
    cy = base - r
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=col)
    left, right = [], []
    n = 28
    for i in range(n + 1):
        u = i / n
        y = cy - u * (h - r)
        hw = r * (1 - u) ** 0.8
        sx = lean * (u ** 2) * h * 0.25
        left.append((cx - hw + sx, y))
        right.append((cx + hw + sx, y))
    d.polygon(left + right[::-1], fill=col)


def petal_pts(cx, cy, ang, r0, length, width, both_pointy=False, n=22):
    ca, sa = math.cos(ang), math.sin(ang)
    left, right = [], []
    for i in range(n + 1):
        u = i / n
        if both_pointy:
            hw = width / 2 * math.sin(math.pi * u)
        else:
            hw = width / 2 * (math.sin(math.pi * u) ** 0.55) * (1 - 0.25 * u)
        rr = r0 + u * length
        px, py = cx + rr * ca, cy + rr * sa
        left.append((px - hw * sa, py + hw * ca))
        right.append((px + hw * sa, py - hw * ca))
    return left + right[::-1]


def catenary(x0, x1, y, sag, step):
    n = max(2, int(abs(x1 - x0) / step))
    pts = []
    for i in range(n + 1):
        u = i / n
        pts.append((lerp(x0, x1, u), y + sag * 4 * u * (1 - u)))
    return pts


# --------------------------------------------------------------------------
# palette
# --------------------------------------------------------------------------
FAR_COL = (66, 50, 88, 255)
MID_COL = (38, 27, 50, 255)
TREE_COL = (24, 38, 36, 255)
FG_COL = (40, 24, 28, 255)
SIL_COL = (14, 9, 16, 255)
WARM = np.array([255, 150, 60], np.float32)
WARM_SOFT = np.array([255, 120, 45], np.float32)
BULB_COLS = [(255, 205, 110), (255, 140, 60), (130, 235, 150), (255, 240, 205)]

CAM_MAX = 120.0
K_FAR, K_MID, K_FG = 0.35, 0.65, 1.0
MEERA_X = 520
MAIN_DIYA = (652, 880)
LEDGE_Y = 880

# story timings (seconds)
T_MEERA = 9.0
T_IGNITE = 12.0
T_RANGOLI_IN, T_RANGOLI_OUT = 26.4, 35.6
T_CARD = 44.6
XF = 0.8  # crossfade length


CAM_KEYS_V = [(0, 520), (8.0, 420), (10.2, 70), (18.4, 70), (26.4, 640), (35.6, 70), (36.6, 70),
              (44.6, 330), (60, 330)]


def cam(t):
    if not VERTICAL:
        return CAM_MAX * smooth(t / 45.0)
    for (t0, c0), (t1, c1) in zip(CAM_KEYS_V, CAM_KEYS_V[1:]):
        if t <= t1:
            return lerp(c0, c1, ramp(t, t0, t1))
    return CAM_KEYS_V[-1][1]


def clarity(t):
    return 0.45 * ramp(t, 18.5, 26.5) + 0.55 * ramp(t, 36.4, 41.5)


# --------------------------------------------------------------------------
# resource construction (runs once, inherited by worker processes)
# --------------------------------------------------------------------------
R = {}


def make_flame(scale, hm, lean):
    fw, fh = int(30 * scale) + 6, int(56 * scale) + 6

    def d(dr, s):
        cx, base = fw * s / 2, (fh - 3) * s
        h, r = 34 * scale * hm * s, 6.5 * scale * s
        teardrop(dr, cx, base, h, r, (255, 140, 35, 230), lean)
        teardrop(dr, cx, base - 1.0 * s * scale, h * 0.74, r * 0.68, (255, 205, 95, 255), lean * 0.8)
        teardrop(dr, cx, base - 2.0 * s * scale, h * 0.42, r * 0.40, (255, 250, 225, 255), lean * 0.5)
        # little blue base of the flame
        dr.ellipse([cx - r * 0.45, base - r * 0.8, cx + r * 0.45, base], fill=(120, 140, 255, 150))

    return vector_layer(fw, fh, d), fw / 2, fh - 3


def make_diya(scale):
    bw, bh = int(70 * scale) + 6, int(30 * scale) + 6

    def d(dr, s):
        cx, top = (bw / 2 - 4 * scale) * s, (bh - 24 * scale - 3) * s
        rx, depth = 27 * scale * s, 20 * scale * s
        # spout (towards the right)
        dr.polygon([(cx + rx * 0.55, top - 1 * s), (cx + rx + 10 * scale * s, top - 4 * scale * s),
                    (cx + rx * 0.7, top + 8 * scale * s)], fill=(160, 70, 32, 255))
        # bowl body: lower half-ellipse
        dr.chord([cx - rx, top - depth, cx + rx, top + depth], 0, 180, fill=(168, 74, 34, 255))
        dr.chord([cx - rx * 0.9, top - depth * 0.6, cx + rx * 0.9, top + depth * 0.95], 20, 160,
                 fill=(132, 54, 26, 255))
        # rim + oil
        dr.ellipse([cx - rx, top - 4 * scale * s, cx + rx, top + 4 * scale * s], fill=(205, 112, 52, 255))
        dr.ellipse([cx - rx * 0.82, top - 2.6 * scale * s, cx + rx * 0.82, top + 2.6 * scale * s],
                   fill=(110, 58, 18, 255))
        # painted dots
        for i in range(5):
            px = cx + (i - 2) * rx * 0.33
            py = top + depth * 0.42 + abs(i - 2) * -1.5 * scale * s
            rr = 1.9 * scale * s
            col = (255, 215, 120, 255) if i % 2 == 0 else (255, 250, 235, 255)
            dr.ellipse([px - rr, py - rr, px + rr, py + rr], fill=col)

    arr = vector_layer(bw, bh, d)
    # anchor: bottom-centre of bowl; flame base relative to anchor
    ax, ay = bw / 2 - 4 * scale, bh - 3
    top_local = bh - 24 * scale - 3
    return dict(arr=arr, ax=ax, ay=ay, fdx=27 * scale + 6 * scale, fdy=(top_local - 3 * scale) - ay)


def build_flames():
    hms = np.linspace(0.78, 1.2, 8)
    leans = np.linspace(-1, 1, 5)
    out = {}
    for sc in (1.0, 0.55, 1.25):
        out[sc] = {(i, j): make_flame(sc, hm, ln) for i, hm in enumerate(hms) for j, ln in enumerate(leans)}
    return out


def draw_diya(base, light, x, y, sc, flame, t, seed, glow_big=None):
    """x, y = bottom-centre of diya in screen space. flame in 0..1."""
    dy = R["diyas"][sc]
    blend(base, dy["arr"], x - dy["ax"], y - dy["ay"])
    fx, fy = x + dy["fdx"], y + dy["fdy"]
    if flame <= 0.01:
        return
    fl = 0.5 + 0.5 * (0.6 * math.sin(t * 11.0 + seed * 3.1) + 0.4 * math.sin(t * 23.0 + seed * 1.7))
    lean = 0.5 + 0.5 * math.sin(t * 5.3 + seed * 2.3)
    hi = int(clamp(fl * flame, 0, 0.999) * 8)
    li = int(clamp(lean, 0, 0.999) * 5)
    spr, sax, say = R["flames"][sc][(hi, li)]
    blend(base, spr, fx - sax, fy - say, min(1.0, flame * 1.4))
    flick = 0.88 + 0.12 * fl
    add_glow(light, fx, fy - 10 * sc, 26 * sc, (255, 200, 120), 0.85 * flame * flick)
    add_glow(light, fx, fy - 8 * sc, 90 * sc, WARM, 0.32 * flame * flick)
    if glow_big:
        add_glow(light, fx, fy, glow_big, WARM_SOFT, 0.24 * flame * flick)


def build_town():
    rng = np.random.default_rng(11)

    # ---- sky ---------------------------------------------------------------
    def sky(stops, top):
        # stops are authored for the 1080-tall strip; extend upwards for tall canvases
        st = [((OY + f * SH) / H, c) for f, c in stops]
        if OY:
            st = [(0.0, top)] + st
        return vgrad(st)
    R["sky_smog"] = sky([(0, (46, 42, 52)), (0.45, (82, 74, 76)), (0.72, (122, 106, 96)), (1, (128, 110, 98))],
                        (34, 31, 40))
    R["sky_clear"] = sky([(0, (5, 8, 32)), (0.4, (18, 18, 62)), (0.62, (52, 30, 82)),
                          (0.76, (118, 56, 84)), (1, (140, 70, 70))], (3, 4, 20))
    sh = OY + 900
    tex = 0.6 * noise_tex(2 * WW, sh, 26, 7 + OY // 130, 1, 40) + \
        0.4 * noise_tex(2 * WW, sh, 70, 18 + OY // 50, 2, 14)
    R["smog_tex"] = np.clip((tex - 0.22) / 0.6, 0, 1).astype(np.float32)
    R["haze_v"] = np.clip(np.linspace(0, 1, 450) / 0.45, 0, 1)[:, None, None].astype(np.float32) ** 1.5
    R["smog_w"] = (0.35 + 0.65 * np.linspace(0, 1, sh) ** 0.8)[:, None].astype(np.float32)

    n = int(420 * W * (OY + 700) / (1920 * 700))
    R["stars"] = dict(
        x=rng.uniform(0, W - 2, n), y=rng.uniform(0, OY + 700, n),
        b=rng.uniform(0.25, 1.0, n) ** 1.6, ph=rng.uniform(0, 6.28, n), fr=rng.uniform(1.0, 3.5, n),
        big=rng.random(n) < 0.09)

    # smoke puffs for firecrackers
    puffs = []
    for i, size in enumerate((180, 280, 400)):
        nt = noise_tex(size, size, 6, 6, 30 + i, size / 14)
        ax = np.linspace(-1, 1, size)
        d = np.sqrt(ax[None, :] ** 2 + ax[:, None] ** 2)
        a = np.clip(1 - d, 0, 1) ** 1.5 * (0.5 + 0.8 * nt)
        arr = np.zeros((size, size, 4), np.float32)
        arr[..., 0], arr[..., 1], arr[..., 2] = 150, 140, 136
        arr[..., 3] = np.clip(a, 0, 1)
        puffs.append(arr)
    R["puffs"] = puffs
    R["bursts"] = [(1.0, 420, 300, (255, 120, 60)), (2.5, 1350, 230, (255, 200, 90)),
                   (3.9, 860, 360, (255, 90, 90)), (5.3, 1650, 330, (255, 170, 70)),
                   (6.6, 300, 220, (240, 220, 160)), (7.8, 1100, 270, (255, 130, 80))]
    if VERTICAL:  # squeeze the fireworks into the narrow frame, higher up in the tall sky
        R["bursts"] = [(bt, 120 + (bx - 300) / 1400 * 840, by + OY * 0.55, c) for bt, bx, by, c in R["bursts"]]
    R["burst_dirs"] = [(rng.uniform(0, 6.283, 40), rng.uniform(150, 260, 40)) for _ in R["bursts"]]

    # ---- far skyline -------------------------------------------------------
    fw = WW + 80
    fy0 = 470
    blocks = []
    x = -20
    while x < fw:
        w = int(rng.uniform(60, 150))
        top = int(rng.uniform(600, 720))
        if 260 < x < 760:  # keep the sky clear behind Meera's head
            top = max(top, 700)
        blocks.append((x, w, top))
        x += w - 4

    far_windows = []

    def far(d, s):
        for (bx, bw, top) in blocks:
            d.rectangle([bx * s, (top - fy0) * s, (bx + bw) * s, (920 - fy0) * s], fill=FAR_COL)
            if rng.random() < 0.35:  # little water tank
                tx = bx + bw * rng.uniform(0.2, 0.6)
                d.rectangle([tx * s, (top - 16 - fy0) * s, (tx + 18) * s, (top - fy0) * s], fill=FAR_COL)
            for wy in range(top + 14, 900, 22):
                for wx in range(bx + 8, bx + bw - 8, 16):
                    if rng.random() < 0.28:
                        far_windows.append((wx, wy))
        # temple shikhara
        tx, tb = 1280, 690
        pts = []
        for i in range(31):
            u = i / 30
            pts.append((tx - 70 * (1 - u) ** 0.7, tb - 190 * u))
        pts += [(2 * tx - px, py) for px, py in pts[::-1]]
        d.polygon([(px * s, (py - fy0) * s) for px, py in pts], fill=FAR_COL)
        d.rectangle([(tx - 110) * s, (tb - fy0) * s, (tx + 110) * s, (920 - fy0) * s], fill=FAR_COL)
        d.ellipse([(tx - 10) * s, (tb - 205 - fy0) * s, (tx + 10) * s, (tb - 185 - fy0) * s], fill=FAR_COL)
        d.line([(tx * s, (tb - 200 - fy0) * s), (tx * s, (tb - 250 - fy0) * s)], fill=FAR_COL, width=3 * s)
        d.polygon([(tx * s, (tb - 250 - fy0) * s), ((tx + 30) * s, (tb - 241 - fy0) * s),
                   (tx * s, (tb - 232 - fy0) * s)], fill=(220, 120, 50, 255))
        # domed building
        dx, db = 1880, 680
        d.rectangle([(dx - 90) * s, (db - fy0) * s, (dx + 90) * s, (920 - fy0) * s], fill=FAR_COL)
        d.chord([(dx - 70) * s, (db - 80 - fy0) * s, (dx + 70) * s, (db + 60 - fy0) * s], 180, 360, fill=FAR_COL)
        d.rectangle([(dx - 3) * s, (db - 105 - fy0) * s, (dx + 3) * s, (db - 70 - fy0) * s], fill=FAR_COL)
        # far trees
        for (cx, cy, r) in [(120, 650, 46), (170, 630, 40), (980, 655, 50), (1030, 640, 38), (1620, 650, 52),
                            (1665, 630, 40), (640, 690, 36)]:
            for j in range(5):
                ox, oy = rng.uniform(-r * 0.6, r * 0.6), rng.uniform(-r * 0.4, r * 0.3)
                rr = r * rng.uniform(0.55, 0.8)
                d.ellipse([(cx + ox - rr) * s, (cy + oy - rr - fy0) * s, (cx + ox + rr) * s,
                           (cy + oy + rr - fy0) * s], fill=(52, 58, 82, 255))
            d.rectangle([(cx - 5) * s, (cy - fy0) * s, (cx + 5) * s, (920 - fy0) * s], fill=(52, 58, 82, 255))

    R["far"] = (vector_layer(fw, 920 - fy0, far, ss=2), fy0)
    fwin = np.zeros((920 - fy0, fw, 4), np.float32)
    for (wx, wy) in far_windows:
        fwin[wy - fy0:wy - fy0 + 6, wx:wx + 5] = (255, 196, 110, 1.0)
    R["far_win"] = fwin

    # ---- mid houses --------------------------------------------------------
    houses = [(-10, 210, 720, "flat", True), (190, 170, 668, "flat", False), (352, 140, 765, "tree", False),
              (490, 236, 742, "flat", False), (722, 196, 660, "dome", False), (912, 250, 702, "flat", True),
              (1156, 176, 742, "flat", False), (1326, 220, 682, "flat", False), (1540, 150, 735, "tree", False),
              (1688, 236, 664, "flat", True), (1920, 130, 712, "flat", False)]
    R["houses"] = houses
    mw, my0 = WW + 120, 540
    mid_win_a, mid_win_b = [], []

    def mid(d, s):
        for (hx, hw, top, kind, tank) in houses:
            if kind == "tree":
                cx = hx + hw / 2
                d.rectangle([(cx - 9) * s, (top + 40 - my0) * s, (cx + 9) * s, (900 - my0) * s], fill=TREE_COL)
                for j in range(9):
                    ox = rng.uniform(-hw * 0.42, hw * 0.42)
                    oy = rng.uniform(-10, 70)
                    rr = rng.uniform(32, 52)
                    d.ellipse([(cx + ox - rr) * s, (top + oy - my0) * s, (cx + ox + rr) * s,
                               (top + oy + 2 * rr - my0) * s], fill=TREE_COL)
                continue
            d.rectangle([hx * s, (top - my0) * s, (hx + hw) * s, (900 - my0) * s], fill=MID_COL)
            d.rectangle([(hx - 5) * s, (top - 8 - my0) * s, (hx + hw + 5) * s, (top + 2 - my0) * s],
                        fill=(50, 36, 64, 255))
            if kind == "dome":
                cx = hx + hw / 2
                d.chord([(cx - 62) * s, (top - 70 - my0) * s, (cx + 62) * s, (top + 50 - my0) * s], 180, 360,
                        fill=MID_COL)
                d.rectangle([(cx - 3) * s, (top - 96 - my0) * s, (cx + 3) * s, (top - 60 - my0) * s], fill=MID_COL)
                d.ellipse([(cx - 7) * s, (top - 104 - my0) * s, (cx + 7) * s, (top - 90 - my0) * s], fill=MID_COL)
            if tank:
                tx = hx + hw - 70
                d.rectangle([tx * s, (top - 52 - my0) * s, (tx + 44) * s, (top - 8 - my0) * s], fill=MID_COL)
                d.ellipse([tx * s, (top - 60 - my0) * s, (tx + 44) * s, (top - 44 - my0) * s], fill=(50, 36, 64, 255))
            # windows (arched)
            cols = max(1, int((hw - 30) / 52))
            gap = (hw - cols * 26) / (cols + 1)
            for row, wy in enumerate(range(top + 34, 880, 74)):
                for c in range(cols):
                    wx = hx + gap + c * (26 + gap)
                    (mid_win_a if rng.random() < 0.55 else mid_win_b).append((wx, wy))

    R["mid"] = (vector_layer(mw, 900 - my0, mid, ss=2), my0)

    def win_layer(lst):
        def d(dr, s):
            for (wx, wy) in lst:
                dr.rectangle([wx * s, (wy + 10 - my0) * s, (wx + 26) * s, (wy + 40 - my0) * s], fill=(255, 190, 105, 255))
                dr.ellipse([wx * s, (wy - my0) * s, (wx + 26) * s, (wy + 22 - my0) * s], fill=(255, 190, 105, 255))
                dr.line([((wx + 13) * s, (wy + 2 - my0) * s), ((wx + 13) * s, (wy + 40 - my0) * s)],
                        fill=(90, 50, 40, 255), width=2 * s)
        return vector_layer(mw, 900 - my0, d, ss=2)

    R["mid_win_a"], R["mid_win_b"] = win_layer(mid_win_a), win_layer(mid_win_b)

    # solar panels, fairy lights and roof diyas on the flat roofs
    panels, bulbs, roofdiyas = [], [], []
    flats = [h for h in houses if h[3] == "flat"]
    order = sorted(flats, key=lambda h: abs(h[0] + h[1] / 2 - MAIN_DIYA[0]))
    for rank, (hx, hw, top, kind, tank) in enumerate(order):
        t_on = 19.4 + 0.62 * rank
        pw = min(118, hw - 70 if tank else hw - 40)
        if tank:
            px = hx + 18
        else:
            px = hx + (hw - pw) / 2
        panels.append((px, top - 8, int(pw), t_on))
        pts = []
        spans = max(1, int(hw / 75))
        for sp in range(spans):
            a, b = hx + 4 + sp * (hw - 8) / spans, hx + 4 + (sp + 1) * (hw - 8) / spans
            pts += catenary(a, b, top + 12, 12, 15)[:-1]
        for i, (bx, by) in enumerate(pts):
            bulbs.append((bx, by, i % 4, t_on + 0.6 + i * 0.015))
        nd = int((hw - 20) / 42)
        for i in range(nd):
            dx = hx + 22 + i * (hw - 44) / max(1, nd - 1)
            if tank and dx > hx + hw - 80:
                continue
            roofdiyas.append((dx, top - 7, 36.8 + 0.0016 * abs(dx - MAIN_DIYA[0]) + rng.uniform(0, 0.4)))
    for (hx, hw, top, kind, tank) in houses:
        if kind == "dome":
            for i in range(4):
                dx = hx + 25 + i * (hw - 50) / 3
                roofdiyas.append((dx, top - 7, 37.0 + 0.0016 * abs(dx - MAIN_DIYA[0])))
    R["roofdiyas"] = roofdiyas
    R["bulbs"] = bulbs
    R["bulb_core"] = {i: vector_layer(9, 9, lambda d, s, c=c: d.ellipse([1 * s, 1 * s, 8 * s, 8 * s], fill=c + (255,)))
                      for i, c in enumerate(BULB_COLS)}
    R["bulb_wire"] = None

    def panel_sprite(pw, ph=40, legs=10):
        def d(dr, s):
            inset = 10
            quad = [(inset * s, 2 * s), ((pw - inset) * s, 2 * s), (pw * s, ph * s), (0, ph * s)]
            dr.line([(pw * 0.25 * s, ph * s), (pw * 0.25 * s, (ph + legs) * s)], fill=(110, 115, 130, 255), width=3 * s)
            dr.line([(pw * 0.75 * s, ph * s), (pw * 0.75 * s, (ph + legs) * s)], fill=(110, 115, 130, 255), width=3 * s)
            dr.polygon(quad, fill=(150, 160, 178, 255))
            q2 = [((inset + 1.5) * s, 4 * s), ((pw - inset - 1.5) * s, 4 * s), ((pw - 2.5) * s, (ph - 2) * s),
                  (2.5 * s, (ph - 2) * s)]
            dr.polygon(q2, fill=(26, 48, 104, 255))
            for c in range(1, 5):
                u = c / 5
                dr.line([(lerp(inset + 1.5, 2.5, 0) + u * (pw - 2 * inset - 3)) * s, 4 * s,
                         (2.5 + u * (pw - 5)) * s, (ph - 2) * s], fill=(80, 120, 185, 255), width=max(1, s))
            for r_ in range(1, 3):
                v = r_ / 3
                y = lerp(4, ph - 2, v)
                x0 = lerp(inset + 1.5, 2.5, v)
                dr.line([(x0 * s, y * s), ((pw - x0) * s, y * s)], fill=(80, 120, 185, 255), width=max(1, s))
            # glint
            dr.polygon([((pw * 0.55) * s, 4 * s), ((pw * 0.66) * s, 4 * s), ((pw * 0.42) * s, (ph - 2) * s),
                        ((pw * 0.31) * s, (ph - 2) * s)], fill=(150, 190, 255, 70))
        return vector_layer(pw, ph + legs, d)

    R["panels"] = [(px, py, panel_sprite(pw, 34, 8), t_on) for (px, py, pw, t_on) in panels]
    R["fg_panel"] = panel_sprite(250, 92, 26)

    # ---- foreground ledge ----------------------------------------------------
    lw = WW + 160
    lh = 210 + (H - OY - SH)  # tall canvases: the wall continues to the bottom of the frame

    def ledge(d, s):
        d.rectangle([0, 18 * s, lw * s, lh * s], fill=FG_COL)
        d.rectangle([0, 0, lw * s, 18 * s], fill=(92, 56, 48, 255))
        d.rectangle([0, 0, lw * s, 3 * s], fill=(128, 82, 66, 255))
        d.rectangle([0, 18 * s, lw * s, 26 * s], fill=(30, 17, 21, 255))
        for px in range(-40, lw, 380):
            d.rectangle([px * s, 26 * s, (px + 60) * s, lh * s], fill=(48, 29, 33, 255))
        # jali (lattice) panels between pillars
        for px in range(-40, lw, 380):
            for i in range(6):
                cx = px + 95 + i * 42
                for j in range(int((lh - 40) / 60)):
                    cy = 70 + j * 60
                    d.ellipse([(cx - 13) * s, (cy - 20) * s, (cx + 13) * s, (cy + 20) * s], fill=(30, 18, 22, 255))
    R["ledge"] = vector_layer(lw, lh, ledge, ss=2)

    ledge_diyas = []
    pots = L["pots"]
    for x in range(70, int(lw) - 20, 96):
        if abs(x - MAIN_DIYA[0]) < 60 or any(abs(x - p) < 70 for p in pots):
            continue
        ledge_diyas.append((x, 36.4 + 0.0021 * abs(x - MAIN_DIYA[0])))
    R["ledge_diyas"] = ledge_diyas
    R["pots"] = pots

    # ---- Meera -------------------------------------------------------------
    def meera(d, s, col=SIL_COL, flower=True):
        ox, oy = 440, 560  # sprite origin in world space
        cx = MEERA_X

        def P(x, y):
            return ((x - ox) * s, (y - oy) * s)

        def E(x, y, r):
            d.ellipse([*P(x - r, y - r), *P(x + r, y + r)], fill=col)

        # braid
        for i in range(9):
            u = i / 8
            E(cx - 24 - 12 * u ** 1.3, 622 + 108 * u, 10.5 - 4 * u)
        E(cx - 37, 738, 6)
        E(cx - 2, 607, 31)   # hair / head
        E(cx + 3, 612, 28)   # face
        d.polygon([P(cx + 27, 602), P(cx + 37, 615), P(cx + 28, 619)], fill=col)  # nose
        d.polygon([P(cx + 26, 626), P(cx + 31, 627), P(cx + 27, 632)], fill=col)  # lips/chin
        d.rectangle([*P(cx - 8, 632), *P(cx + 10, 655)], fill=col)               # neck
        d.polygon([P(cx - 30, 652), P(cx + 26, 652), P(cx + 36, 700), P(cx + 52, 890), P(cx - 58, 890),
                   P(cx - 40, 700)], fill=col)                                    # kurta
        # dupatta draped over the shoulder
        d.polygon([P(cx - 33, 655), P(cx - 18, 650), P(cx - 50, 800), P(cx - 64, 795)], fill=col)
        # arm reaching to the diya on the ledge
        sh, el, hd = (cx + 14, 668), (cx + 56, 738), (cx + 102, 842)
        d.line([P(*sh), P(*el)], fill=col, width=int(19 * s))
        d.line([P(*el), P(*hd)], fill=col, width=int(16 * s))
        E(*sh, 10)
        E(*el, 8.5)
        E(hd[0] + 4, hd[1] + 4, 10)
        if flower:  # marigold in her hair
            for (fx, fy, r, c) in [(cx - 22, 586, 8, (245, 135, 25, 255)), (cx - 30, 592, 6, (255, 190, 40, 255)),
                                   (cx - 16, 595, 5, (255, 200, 60, 255))]:
                d.ellipse([*P(fx - r, fy - r), *P(fx + r, fy + r)], fill=c)

    R["meera"] = (vector_layer(260, 330, meera), 440, 560)
    R["meera_rim"] = vector_layer(260, 330, lambda d, s: meera(d, s, col=(150, 75, 32, 255), flower=False))

    # ---- pots & saplings -----------------------------------------------------
    def pot(d, s):
        d.polygon([(4 * s, 10 * s), (70 * s, 10 * s), (60 * s, 62 * s), (14 * s, 62 * s)], fill=(160, 74, 38, 255))
        d.rectangle([0, 2 * s, 74 * s, 14 * s], fill=(192, 98, 54, 255))
        d.ellipse([6 * s, 0, 68 * s, 8 * s], fill=(62, 38, 26, 255))
        for i in range(4):
            x = 18 + i * 13
            d.ellipse([(x - 2.5) * s, 34 * s, (x + 2.5) * s, 39 * s], fill=(245, 225, 190, 255))
    R["pot"] = vector_layer(74, 64, pot)

    saplings = []
    for k in range(40):
        g = k / 39

        def sap(d, s, g=g):
            cx, by = 70, 138
            hgt = 105 * g
            stem = []
            for i in range(21):
                u = i / 20
                stem.append(((cx + 6 * math.sin(u * 2.4) * g) * s, (by - hgt * u) * s))
            if g > 0.02:
                d.line(stem, fill=(70, 130, 60, 255), width=max(1, int(4 * s * (0.4 + 0.6 * g))), joint="curve")
            for (hf, side, ang) in [(0.3, -1, 0.55), (0.48, 1, 0.5), (0.66, -1, 0.45), (0.82, 1, 0.4), (1.0, -1, 0.15),
                                    (1.0, 1, 0.25)]:
                lg = clamp((g - hf * 0.6) / 0.4)
                if lg <= 0:
                    continue
                u = hf
                bx = cx + 6 * math.sin(u * 2.4) * g
                byy = by - hgt * u
                a = -math.pi / 2 + side * (math.pi / 2 - ang * 1.6)
                L = 34 * lg * (0.7 if hf == 1.0 else 1.0)
                d.polygon([(px * s, py * s) for px, py in petal_pts(bx, byy, a, 0, L, L * 0.45, True, 16)],
                          fill=(64, 168, 84, 255))
                d.line([(bx * s, byy * s), ((bx + L * 0.85 * math.cos(a)) * s, (byy + L * 0.85 * math.sin(a)) * s)],
                       fill=(150, 220, 140, 255), width=max(1, s))
        saplings.append(vector_layer(140, 140, sap, ss=2))
    R["saplings"] = saplings


def build_common():
    R["flames"] = build_flames()
    R["diyas"] = {sc: make_diya(sc) for sc in (1.0, 0.55, 1.25)}
    cap_font = font("PlayfairDisplay.ttf", L["cap_size"], "Regular")
    quote_font = font("PlayfairDisplay-Italic.ttf", L["quote_size"], "Medium Italic")

    def caps(lst):
        out = []
        for (t0, t1, text, style) in lst:
            f = quote_font if style == "quote" else cap_font
            col = (255, 214, 130) if style == "quote" else (255, 244, 228)
            out.append((t0, t1, text_sprite(text, f, col, maxw=L["cap_w"], shadow=True)))
        return out
    R["captions"] = caps(CAPTIONS)
    R["story_captions"] = caps(STORY_CAPTIONS)


def wrap(text, f, maxw):
    words, lines, cur = text.split(), [], ""
    for w_ in words:
        trial = (cur + " " + w_).strip()
        if f.getlength(trial) > maxw and cur:
            lines.append(cur)
            cur = w_
        else:
            cur = trial
    lines.append(cur)
    return lines


def text_sprite(text, f, col, maxw=1600, shadow=True, glow=None, gradient=None, spacing=14, tracking=0):
    lines = wrap(text, f, maxw)
    asc, desc = f.getmetrics()
    lh = asc + desc
    widths = [line_width(l, f, tracking) for l in lines]
    tw = int(max(widths)) + 80
    th = int(lh * len(lines) + spacing * (len(lines) - 1)) + 80
    mask = Image.new("L", (tw, th), 0)
    d = ImageDraw.Draw(mask)
    for i, l in enumerate(lines):
        x = (tw - widths[i]) / 2
        y = 40 + i * (lh + spacing)
        draw_tracked(d, x, y, l, f, tracking)
    m = np.asarray(mask, np.float32) / 255.0
    out = np.zeros((th, tw, 4), np.float32)
    if shadow:
        sh = np.asarray(mask.filter(ImageFilter.GaussianBlur(7)), np.float32) / 255.0
        sh = np.roll(np.roll(sh, 3, 0), 2, 1)
        out[..., 3] = np.clip(sh * 1.1, 0, 0.85)
    if glow is not None:
        gcol, grad_r, gk = glow
        gl = np.asarray(mask.filter(ImageFilter.GaussianBlur(grad_r)), np.float32) / 255.0 * gk
        a = np.clip(gl, 0, 1)
        out[..., :3] = np.asarray(gcol, np.float32)
        out[..., 3] = np.maximum(out[..., 3], a)
    if gradient is not None:
        top, bot = gradient
        g = np.linspace(0, 1, th)[:, None, None]
        rgb = np.asarray(top, np.float32) * (1 - g) + np.asarray(bot, np.float32) * g
        rgb = np.broadcast_to(rgb, (th, tw, 3))
    else:
        rgb = np.broadcast_to(np.asarray(col, np.float32), (th, tw, 3))
    a0 = out[..., 3:4]
    am = m[..., None]
    out_a = am + a0 * (1 - am)
    out[..., :3] = (rgb * am + out[..., :3] * a0 * (1 - am)) / np.maximum(out_a, 1e-6)
    out[..., 3] = out_a[..., 0]
    return out


def line_width(s, f, tracking):
    if not tracking:
        return f.getlength(s)
    return sum(f.getlength(c) for c in s) + tracking * (len(s) - 1)


def draw_tracked(d, x, y, s, f, tracking):
    if not tracking:
        d.text((x, y), s, font=f, fill=255)
        return
    for c in s:
        d.text((x, y), c, font=f, fill=255)
        x += f.getlength(c) + tracking


# --------------------------------------------------------------------------
# rangoli close-up
# --------------------------------------------------------------------------


def build_rangoli():
    rng = np.random.default_rng(5)
    size = 860
    c = size / 2
    elems = []  # (kind, args, reveal_time)
    t0 = 27.3
    # (kind, radius, count, length/size, width/offset, (dark, light) colours)
    bands = [(52, 100, (250, 192, 38)), (100, 152, (226, 98, 22)), (152, 214, (172, 22, 72)),
             (214, 278, (38, 118, 58))]
    rings = [
        ("petal", 76, 8, 46, 30, ((222, 92, 18), (255, 150, 48))),
        ("petal", 126, 12, 50, 32, ((250, 200, 40), (255, 238, 140))),
        ("dots", 152, 36, 5, 0, ((255, 250, 240), None)),
        ("petal", 183, 16, 58, 32, ((240, 200, 215), (255, 252, 252))),
        ("dots", 214, 40, 4.5, 0.5, ((255, 214, 60), None)),
        ("leaf", 246, 20, 62, 28, ((96, 178, 92), (160, 225, 140))),
        ("marigold", 312, 36, 24, 0, ((235, 120, 15), (255, 165, 35))),
        ("dots", 352, 48, 7.5, 0, ((255, 250, 240), None)),
        ("dots", 370, 48, 4.5, 0.5, ((255, 205, 50), None)),
    ]
    for k, (r0, r1, col) in enumerate(bands):
        start = t0 + 0.75 * [0, 1, 3, 5][k] - 0.2
        nseg = 48
        for i in range(nseg):
            elems.append(("band", (r0, r1, i, nseg, col), start + 1.25 * i / nseg))
    for k, (kind, r, n, a, b, cols) in enumerate(rings):
        start = t0 + 0.75 * k
        for i in range(n):
            off = b if kind == "dots" else 0
            ang = (i + off) / n * 2 * math.pi - math.pi / 2
            elems.append((kind, (r, ang, a, b, cols, i), start + 1.25 * i / n))

    def draw_all(d, s, reveal=False):
        for (kind, args, rt) in elems:
            if kind == "band":
                r0, r1, i, nseg, col = args
                a0 = (i - 0.08) / nseg * 2 * math.pi - math.pi / 2
                a1 = (i + 1.08) / nseg * 2 * math.pi - math.pi / 2
                arc = [a0 + (a1 - a0) * q / 6 for q in range(7)]
                pts = [(c + r1 * math.cos(q), c + r1 * math.sin(q)) for q in arc] + \
                      [(c + r0 * math.cos(q), c + r0 * math.sin(q)) for q in arc[::-1]]
                d.polygon([(x * s, y * s) for x, y in pts], fill=rt if reveal else col + (255,))
                continue
            r, ang, a, b, cols, i = args
            fill_dark = rt if reveal else cols[0] + (255,)
            fill_lt = rt if reveal else (cols[1] + (255,) if cols[1] else None)
            if kind in ("petal", "leaf"):
                pts = petal_pts(c, c, ang, r - a / 2, a, b, kind == "leaf")
                d.polygon([(x * s, y * s) for x, y in pts], fill=fill_dark)
                if not reveal:
                    pts2 = petal_pts(c, c, ang, r - a / 2 + a * 0.12, a * 0.72, b * 0.55, kind == "leaf")
                    d.polygon([(x * s, y * s) for x, y in pts2], fill=fill_lt)
                    if kind == "leaf":
                        x0, y0 = c + (r - a / 2) * math.cos(ang), c + (r - a / 2) * math.sin(ang)
                        x1, y1 = c + (r + a / 2) * math.cos(ang), c + (r + a / 2) * math.sin(ang)
                        d.line([(x0 * s, y0 * s), (x1 * s, y1 * s)], fill=(160, 220, 140, 255), width=max(1, int(1.5 * s)))
                    else:
                        x0, y0 = c + (r - a * 0.2) * math.cos(ang), c + (r - a * 0.2) * math.sin(ang)
                        rr = 3.2
                        d.ellipse([(x0 - rr) * s, (y0 - rr) * s, (x0 + rr) * s, (y0 + rr) * s], fill=(255, 245, 225, 255))
            elif kind == "dots":
                x0, y0 = c + r * math.cos(ang), c + r * math.sin(ang)
                d.ellipse([(x0 - a) * s, (y0 - a) * s, (x0 + a) * s, (y0 + a) * s], fill=fill_dark)
            elif kind == "marigold":
                x0, y0 = c + r * math.cos(ang), c + r * math.sin(ang)
                if not reveal:
                    base = cols[0] if i % 2 == 0 else (250, 180, 20)
                    lt = cols[1] if i % 2 == 0 else (255, 215, 70)
                    d.ellipse([(x0 - a) * s, (y0 - a) * s, (x0 + a) * s, (y0 + a) * s], fill=base + (255,))
                    for j in range(9):
                        aa = j / 9 * 6.283 + i
                        rr = a * 0.55
                        px, py = x0 + rr * math.cos(aa), y0 + rr * math.sin(aa)
                        d.ellipse([(px - 5) * s, (py - 5) * s, (px + 5) * s, (py + 5) * s], fill=lt + (255,))
                    d.ellipse([(x0 - 6) * s, (y0 - 6) * s, (x0 + 6) * s, (y0 + 6) * s], fill=(200, 90, 10, 255))
                else:
                    d.ellipse([(x0 - a - 1) * s, (y0 - a - 1) * s, (x0 + a + 1) * s, (y0 + a + 1) * s], fill=fill_dark)

    R["rangoli"] = vector_layer(size, size, lambda d, s: draw_all(d, s), ss=2)
    rev = Image.new("F", (size, size), 1e9)
    rd = ImageDraw.Draw(rev)
    draw_all(rd, 1, reveal=True)
    rev = np.asarray(rev, np.float32)
    # dilate by one pixel so anti-aliased edges reveal together with their element
    padded = np.pad(rev, 1, constant_values=1e9)
    rev = np.minimum.reduce([padded[1 + dy:size + 1 + dy, 1 + dx:size + 1 + dx]
                             for dy in (-1, 0, 1) for dx in (-1, 0, 1)])
    R["rangoli_rev"] = rev

    # centre diya, top view
    def cd(d, s):
        k = 70
        d.ellipse([(k - 56) * s, (k - 56) * s, (k + 56) * s, (k + 56) * s], fill=(255, 248, 235, 255))
        d.ellipse([(k - 48) * s, (k - 48) * s, (k + 48) * s, (k + 48) * s], fill=(150, 64, 28, 255))
        d.ellipse([(k - 40) * s, (k - 40) * s, (k + 40) * s, (k + 40) * s], fill=(195, 105, 50, 255))
        d.ellipse([(k - 32) * s, (k - 32) * s, (k + 32) * s, (k + 32) * s], fill=(130, 78, 18, 255))
        d.ellipse([(k - 22) * s, (k - 22) * s, (k + 22) * s, (k + 22) * s], fill=(170, 110, 30, 255))
        d.line([((k - 4) * s, k * s), ((k + 26) * s, (k - 12) * s)], fill=(240, 230, 210, 255), width=max(1, int(3 * s)))
        for i in range(12):
            a = i / 12 * 6.283
            px, py = k + 44 * math.cos(a), k + 44 * math.sin(a)
            d.ellipse([(px - 2.5) * s, (py - 2.5) * s, (px + 2.5) * s, (py + 2.5) * s], fill=(255, 220, 120, 255))
    R["topdiya"] = vector_layer(140, 140, cd)
    R["topdiya_s"] = vector_layer(98, 98, lambda d, s: cd(d, s * 0.7))

    # floor
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    dist = np.sqrt(((xx - RC[0]) / 900) ** 2 + ((yy - RC[1]) / 700) ** 2)
    tex = noise_tex(W, H, 200, 110, 9, 1.2) * 0.6 + noise_tex(W, H, 30, 16, 10, 20) * 0.4
    floor = np.zeros((H, W, 3), np.float32)
    shade = np.clip(1.15 - dist * 0.85, 0.25, 1.15)
    for ch, v in enumerate((70, 42, 38)):
        floor[..., ch] = v * (0.75 + 0.5 * tex) * shade
    R["floor"] = floor
    # a few loose petals scattered on the floor
    loose = []
    for i in range(26):
        a = rng.uniform(0, 6.283)
        r = rng.uniform(430, 900)
        x, y = RC[0] + r * math.cos(a) * 1.25, RC[1] + r * math.sin(a) * 0.75
        if 0 < x < W and 0 < y < H:
            loose.append((x, y, rng.uniform(0, 6.283), rng.choice([0, 1, 2])))
    pcols = [(240, 140, 30), (255, 200, 50), (200, 40, 70)]

    def lp(d, s):
        for (x, y, a, ci) in loose:
            pts = petal_pts(x, y, a, 0, 22, 12, False, 10)
            d.polygon([(px * s, py * s) for px, py in pts], fill=pcols[ci] + (220,))
    R["loose"] = vector_layer(W, H, lp, ss=2)
    R["corner_diyas"] = [(RC[0] + 470 * math.cos(a), RC[1] + 470 * 0.62 * math.sin(a))
                         for a in (math.pi * 0.25, math.pi * 0.75, math.pi * 1.25, math.pi * 1.75)]


# --------------------------------------------------------------------------
# closing card
# --------------------------------------------------------------------------
def build_card():
    rng = np.random.default_rng(3)
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    C = L["card"]
    d = np.sqrt(((xx - C["center"][0]) / 1100) ** 2 + ((yy - C["center"][1]) / (800 if not VERTICAL else 1100)) ** 2)
    bg = np.zeros((H, W, 3), np.float32)
    for ch, (a, b) in enumerate(((84, 10), (30, 6), (52, 26))):
        bg[..., ch] = lerp(a, b, np.clip(d, 0, 1) ** 0.9)
    R["card_bg"] = bg

    # marigold toran (garland) across the top
    def toran(dr, s):
        swags = C["swags"]
        for i in range(swags):
            x0 = -30 + i * (W + 60) / swags
            x1 = -30 + (i + 1) * (W + 60) / swags
            pts = catenary(x0, x1, 18, 105, 25)
            dr.line([(x * s, y * s) for x, y in pts], fill=(60, 100, 40, 255), width=3 * s)
            for j, (x, y) in enumerate(pts):
                col = (238, 120, 18) if j % 2 == 0 else (255, 190, 30)
                lt = (255, 165, 40) if j % 2 == 0 else (255, 220, 90)
                r = 15
                dr.ellipse([(x - r) * s, (y - r) * s, (x + r) * s, (y + r) * s], fill=col + (255,))
                for q in range(6):
                    a = q / 6 * 6.283 + j
                    px, py = x + 7 * math.cos(a), y + 7 * math.sin(a)
                    dr.ellipse([(px - 4.5) * s, (py - 4.5) * s, (px + 4.5) * s, (py + 4.5) * s], fill=lt + (255,))
            # hanging strand at the junction
            hx = x1
            for q in range(4):
                y = 30 + q * 26
                col = (238, 120, 18) if q % 2 == 0 else (255, 190, 30)
                dr.ellipse([(hx - 13) * s, (y - 13) * s, (hx + 13) * s, (y + 13) * s], fill=col + (255,))
            for side in (-1, 1):
                pts = petal_pts(hx, 30 + 4 * 26 - 8, math.pi / 2 + side * 0.35, 0, 46, 18, True, 14)
                dr.polygon([(x * s, y * s) for x, y in pts], fill=(50, 140, 60, 255))
        # mango leaves along the top
        for i in range(0, W + 40, 64):
            pts = petal_pts(i, 0, math.pi / 2 + 0.25 * math.sin(i), 0, 60, 22, True, 14)
            dr.polygon([(x * s, y * s) for x, y in pts], fill=(42, 128, 58, 255))
    R["toran"] = vector_layer(W, 230, toran, ss=2)

    R["bokeh"] = [dict(x=rng.uniform(0, W), y=rng.uniform(0, H), r=rng.uniform(14, 46), sp=rng.uniform(18, 46),
                       col=[(255, 190, 90), (255, 140, 60), (150, 230, 140), (255, 225, 160)][rng.integers(0, 4)],
                       k=rng.uniform(0.12, 0.3), ph=rng.uniform(0, 6.28)) for _ in range(48)]

    title = text_sprite(CARD["title"], font("GreatVibes-Regular.ttf", C["title_size"]), (255, 210, 120),
                        maxw=C["title_w"], spacing=-60,
                        shadow=False, glow=((255, 140, 40), 16, 0.75),
                        gradient=((255, 236, 170), (232, 150, 40)))
    R["card_title"] = title
    R["card_sub"] = text_sprite(CARD["subtitle"], font("PlayfairDisplay-Italic.ttf", C["sub_size"], "Italic"),
                                (255, 238, 215), maxw=C["sub_w"])
    R["card_wish"] = text_sprite(CARD["wish"], font("Poppins-Regular.ttf", 30 if not VERTICAL else 32),
                                 (245, 215, 175), maxw=C["wish_w"], tracking=2, spacing=10)

    logo_path = os.path.join(HERE, "logo.png")
    if os.path.exists(logo_path):
        im = Image.open(logo_path).convert("RGBA")
        sc = 150 / im.height
        im = im.resize((int(im.width * sc), 150), Image.LANCZOS)
        R["card_logo"] = to_arr(im)
        R["logo_flame"] = None
    else:
        R["card_logo"], R["logo_flame"] = build_logo()


def build_logo():
    """Leaf-shaped diya (green bowl, golden flame) + two-tone wordmark."""
    icon = 130

    def ic(d, s):
        cx, cy = icon / 2, icon * 0.68
        # leaf bowl
        top, bot = [], []
        for i in range(41):
            u = i / 40
            x = cx - 58 + 116 * u
            top.append((x, cy - 6 * math.sin(math.pi * u) + 8 * u ** 3 * -1))
            bot.append((x, cy + 34 * math.sin(math.pi * u) ** 0.9 - 10 * u ** 3))
        pts = top + bot[::-1]
        d.polygon([(x * s, y * s) for x, y in pts], fill=(52, 160, 82, 255))
        inner = [(x, y + 6) for x, y in top[6:35]] + [(x, y - 7) for x, y in bot[6:35][::-1]]
        d.polygon([(x * s, y * s) for x, y in inner], fill=(84, 192, 104, 255))
        mid = [(cx - 52 + 104 * (i / 30), cy + 12 * math.sin(math.pi * i / 30) - 3) for i in range(31)]
        d.line([(x * s, y * s) for x, y in mid], fill=(190, 240, 180, 255), width=int(2.4 * s))
        for i in range(1, 6):
            u = i / 6
            x0, y0 = cx - 52 + 104 * u, cy + 12 * math.sin(math.pi * u) - 3
            d.line([(x0 * s, y0 * s), ((x0 + 9) * s, (y0 + 13) * s)], fill=(190, 240, 180, 200), width=int(1.6 * s))
        # flame
        teardrop(d, cx * s, (cy - 4) * s, 66 * s, 15 * s, (255, 150, 35, 255), 0.25)
        teardrop(d, cx * s, (cy - 7) * s, 46 * s, 10 * s, (255, 210, 90, 255), 0.2)
        teardrop(d, cx * s, (cy - 9) * s, 25 * s, 5.5 * s, (255, 250, 230, 255), 0.1)
    icon_arr = vector_layer(icon, icon, ic)

    f = font("Poppins-SemiBold.ttf", 84)
    name = BRAND
    a_txt, b_txt = (name[:5], name[5:]) if name.lower().startswith("green") else (name, "")
    wa, wb = f.getlength(a_txt), f.getlength(b_txt)
    asc, desc = f.getmetrics()
    tw, th = int(wa + wb) + 20, asc + desc + 10
    im = Image.new("RGBA", (tw, th), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.text((5, 0), a_txt, font=f, fill=(112, 210, 122, 255))
    d.text((5 + wa, 0), b_txt, font=f, fill=(255, 246, 232, 255))
    word = to_arr(im)

    gap = 22
    lw = icon + gap + word.shape[1]
    lh = max(icon, word.shape[0] + 12)
    out = np.zeros((lh, lw, 4), np.float32)
    blend_rgba(out, icon_arr, 0, (lh - icon) // 2)
    blend_rgba(out, word, icon + gap, (lh - word.shape[0]) // 2 + 6)
    return out, (icon / 2, (lh - icon) // 2 + icon * 0.68 - 30)


def blend_rgba(dst, src, x, y):
    h, w = src.shape[:2]
    region = dst[y:y + h, x:x + w]
    sa = src[..., 3:4]
    da = region[..., 3:4]
    oa = sa + da * (1 - sa)
    region[..., :3] = (src[..., :3] * sa + region[..., :3] * da * (1 - sa)) / np.maximum(oa, 1e-6)
    region[..., 3:4] = oa


# --------------------------------------------------------------------------
# scene renderers
# --------------------------------------------------------------------------
def render_town(t):
    c = clarity(t)
    cm = cam(t)
    sky = R["sky_smog"] * (1 - c) + R["sky_clear"] * c
    canvas = np.broadcast_to(sky, (H, W, 3)).copy()
    glow = np.zeros((H, W, 3), np.float32)
    # the town strip (authored at 1920x1080) is drawn through views into the canvas
    base, light = canvas[OY:OY + SH], glow[OY:OY + SH]
    sx = W / 1920  # horizontal scale for sky events

    # stars
    st = R["stars"]
    vis = c ** 1.4
    if vis > 0.01:
        tw = 0.65 + 0.35 * np.sin(t * st["fr"] + st["ph"])
        b = st["b"] * tw * vis * 255
        xs = st["x"].astype(int)
        ys = st["y"].astype(int)
        for dy in (0, 1):
            for dx in (0, 1):
                glow[ys + dy, xs + dx] += (b * (0.8 if dx or dy else 1.0))[:, None] * np.array([0.9, 0.95, 1.0])
        for i in np.nonzero(st["big"])[0]:
            add_glow(glow, st["x"][i], st["y"][i], 7, (200, 215, 255), b[i] / 255 * 0.9)

    # shooting star
    if 41.0 < t < 42.0:
        u = (t - 41.0) / 0.9
        for j in range(24):
            uu = u - j * 0.012
            if 0 <= uu <= 1:
                x, y = lerp(1650, 1050, uu) * sx, lerp(90, 330, uu) + OY * 0.5
                add_glow(glow, x, y, 6 if j else 10, (230, 235, 255), (1 - j / 24) * math.sin(math.pi * clamp(u)) * 1.2)

    # firecrackers (only in the smoggy opening)
    for bi, (bt, bx, by, bcol) in enumerate(R["bursts"]):
        age = t - bt
        if 0 <= age < 1.4:
            angs, spd = R["burst_dirs"][bi]
            fade = (1 - age / 1.4) ** 1.5
            for tr in (0.0, 0.05, 0.1):
                a2 = max(0.0, age - tr)
                px = bx + np.cos(angs) * spd * a2
                py = by + np.sin(angs) * spd * a2 + 70 * a2 * a2
                for k in range(len(px)):
                    add_glow(glow, px[k], py[k], 7, bcol, fade * (1 - tr * 6) * 0.9)
            if age < 0.12:
                glow += np.array(bcol, np.float32) * 0.07 * (1 - age / 0.12)
        if 0.1 <= age < 7.0:
            pa = ramp(age, 0.1, 0.7) * (1 - ramp(age, 2.5, 7.0)) * 0.55
            idx = 0 if age < 1.2 else 1 if age < 3.0 else 2
            p = R["puffs"][idx]
            blend(canvas, p, bx - p.shape[1] / 2 + age * 12, by - p.shape[0] / 2 - age * 10, pa * (1 - c))

    # smog
    off = int(t * 22) % WW
    tex = R["smog_tex"][:, off:off + W] * R["smog_w"]
    a = (tex * (1 - c) * 0.6)[..., None]
    reg = canvas[:OY + 900]
    reg *= 1 - a
    reg += np.array([118, 106, 100], np.float32) * a

    # far skyline
    far, fy0 = R["far"]
    fx = -cm * K_FAR
    blend(base, far, fx, fy0)
    blend(base, R["far_win"], fx, fy0, 0.45 + 0.35 * ramp(t, 18, 27) + 0.2 * ramp(t, 36.5, 41))

    # mid houses
    mid, my0 = R["mid"]
    mx = -cm * K_MID
    blend(base, mid, mx, my0)
    blend(base, R["mid_win_a"], mx, my0, 0.55 + 0.25 * ramp(t, 18, 26) + 0.15 * ramp(t, 36.5, 41))
    blend(base, R["mid_win_b"], mx, my0, 0.85 * ramp(t, 20, 26) + 0.1 * ramp(t, 36.5, 41))

    # haze in front of the town while the air is smoggy
    hz = R["smog_tex"][OY + 450:OY + 900, (off + 400):(off + 400 + W)][..., None] * (1 - c) * 0.32 * R["haze_v"]
    reg = base[450:900]
    reg *= 1 - hz
    reg += np.array([112, 100, 96], np.float32) * hz

    for (px, py, spr, t_on) in R["panels"]:
        p = ramp(t, t_on, t_on + 0.6)
        if p > 0:
            blend(base, spr, px + mx, py - spr.shape[0] + 8 + (1 - p) * 14, p)
            gl = math.exp(-((t - t_on - 0.7) / 0.25) ** 2)
            add_glow(light, px + mx + spr.shape[1] * 0.5, py - 20, 26, (150, 200, 255), gl * 0.8)

    for i, (bx, by, ci, t_on) in enumerate(R["bulbs"]):
        p = ramp(t, t_on, t_on + 0.25)
        if p > 0:
            tw = 0.7 + 0.3 * math.sin(t * 3.2 + i * 0.9)
            blend(base, R["bulb_core"][ci], bx + mx - 4.5, by - 4.5, p)
            add_glow(light, bx + mx, by, 13, BULB_COLS[ci], 0.55 * p * tw)

    for i, (dx, dy, t_on) in enumerate(R["roofdiyas"]):
        if t > t_on - 0.3:
            draw_diya(base, light, dx + mx, dy, 0.55, ramp(t, t_on, t_on + 0.35), t, i)

    # flush town lights now so foreground (Meera, ledge) occludes them
    canvas += glow
    glow[:] = 0

    # foreground
    fgx = -cm * K_FG
    panel_p = ramp(t, 18.3, 19.3)
    if panel_p > 0:
        sp = R["fg_panel"]
        blend(base, sp, L["fg_panel_x"] + fgx, LEDGE_Y - sp.shape[0] + 30 + (1 - panel_p) * 110)
        gl = math.exp(-((t - 19.5) / 0.3) ** 2)
        add_glow(light, L["fg_panel_x"] + fgx + 140, LEDGE_Y - 70, 60, (160, 210, 255), gl * 0.9)

    mp = ramp(t, T_MEERA, T_MEERA + 1.4)
    lit = ramp(t, T_IGNITE, T_IGNITE + 0.6)
    if mp > 0:
        ms, mox, moy = R["meera"]
        slide = (1 - mp) * -40
        blend(base, R["meera_rim"], mox + fgx + 3 + slide, moy - 1, mp * lit)
        blend(base, ms, mox + fgx + slide, moy, mp)

    blend(canvas, R["ledge"], fgx, OY + LEDGE_Y - 4)

    # pots + saplings
    pot_p = ramp(t, 22.0, 22.8)
    grow = 0.15 * ramp(t, 22.5, 26.0) + 0.85 * ramp(t, 36.4, 42.0)
    if pot_p > 0:
        for j, px in enumerate(R["pots"]):
            g = clamp(grow * (1 - 0.12 * j))
            sap = R["saplings"][int(g * 39)]
            blend(base, sap, px + fgx - 70 + 2, LEDGE_Y - 62 - 136, pot_p)
            blend(base, R["pot"], px + fgx - 37, LEDGE_Y - 62, pot_p)

    # Meera's diya
    if mp > 0:
        dx = MAIN_DIYA[0] + fgx + (1 - mp) * -40
        draw_diya(base, light, dx, MAIN_DIYA[1] + 2, 1.25, lit, t, 99, glow_big=360)
        if T_IGNITE <= t < T_IGNITE + 0.8:  # ignition sparkle
            u = (t - T_IGNITE) / 0.8
            fx_, fy_ = dx + R["diyas"][1.25]["fdx"], MAIN_DIYA[1] + R["diyas"][1.25]["fdy"] - 14
            for k in range(14):
                a2 = k / 14 * 6.283
                add_glow(light, fx_ + math.cos(a2) * 70 * u, fy_ + math.sin(a2) * 70 * u, 7, (255, 220, 150),
                         (1 - u) * 0.9)
            add_glow(light, fx_, fy_, 120, (255, 200, 120), (1 - u) * 0.6)

    for i, (x, t_on) in enumerate(R["ledge_diyas"]):
        if t > t_on - 0.4:
            draw_diya(base, light, x + fgx, LEDGE_Y + 2, 1.0, ramp(t, t_on, t_on + 0.4), t, i + 7, glow_big=170)

    return canvas + glow


def render_rangoli(t):
    base = R["floor"].copy()
    light = np.zeros((H, W, 3), np.float32)
    blend(base, R["loose"], 0, 0)
    rg = R["rangoli"].copy()
    rg[..., 3] *= np.clip((t - R["rangoli_rev"]) / 0.3, 0, 1)
    size = rg.shape[0]
    blend(base, rg, RC[0] - size / 2, RC[1] - size / 2)
    td = R["topdiya"]
    blend(base, td, RC[0] - 70, RC[1] - 70)
    fl = 0.9 + 0.1 * math.sin(t * 13) * math.sin(t * 7.3)
    add_glow(light, RC[0] + 22, RC[1] - 12, 24, (255, 245, 210), 1.0 * fl)
    add_glow(light, RC[0] + 22, RC[1] - 12, 70, (255, 190, 90), 0.75 * fl)
    add_glow(light, RC[0], RC[1], 420, WARM_SOFT, 0.22 * fl)
    for i, (x, y) in enumerate(R["corner_diyas"]):
        f2 = 0.85 + 0.15 * math.sin(t * 11 + i * 2)
        blend(base, R["topdiya_s"], x - 49, y - 49)
        add_glow(light, x + 15, y - 8, 16, (255, 245, 210), 0.9 * f2)
        add_glow(light, x + 15, y - 8, 150, WARM, 0.25 * f2)
    # sparkles that follow the drawing
    out = base + light
    # slow push-in
    z = (1.14 if VERTICAL else 1.0) + 0.07 * ramp(t, T_RANGOLI_IN, T_RANGOLI_OUT + XF)
    if z > 1.001:
        img = Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))
        cw, ch = W / z, H / z
        cx = W / 2
        cy = min(max(RC[1], ch / 2), H - ch / 2)
        box = (cx - cw / 2, cy - ch / 2, cx + cw / 2, cy + ch / 2)
        img = img.resize((W, H), Image.BICUBIC, box=box)
        out = np.asarray(img, np.float32)
    return out


def render_card(t, lt=None):
    C = L["card"]
    base = R["card_bg"].copy()
    light = np.zeros((H, W, 3), np.float32)
    lt = t - T_CARD if lt is None else lt
    for b in R["bokeh"]:
        y = (b["y"] - b["sp"] * lt) % (H + 100) - 50
        x = b["x"] + 20 * math.sin(lt * 0.6 + b["ph"])
        add_glow(light, x, y, b["r"], b["col"], b["k"] * (0.8 + 0.2 * math.sin(lt * 2 + b["ph"])))

    tor = R["toran"]
    blend(base, tor, 0, -230 + 230 * (1 - (1 - ramp(lt, 0.4, 2.0)) ** 2))

    # row of diyas along the bottom
    n = C["diyas"]
    for i in range(n):
        x = C["diya_margin"] + i * (W - 2 * C["diya_margin"]) / (n - 1)
        dc = abs(i - (n - 1) / 2)
        on = ramp(lt, 0.8 + dc * 0.12, 1.2 + dc * 0.12)
        draw_diya(base, light, x, C["diya_y"], 1.25, on, t, i * 3, glow_big=200)

    title = R["card_title"]
    tp = ramp(lt, 1.0, 2.8)
    if tp > 0:
        wipe = title.copy()
        xs = np.linspace(0, 1, wipe.shape[1])[None, :]
        wipe[..., 3] *= np.clip((tp * 1.25 - xs) / 0.25, 0, 1)
        blend(base, wipe, (W - title.shape[1]) / 2, C["title_y"] - title.shape[0] / 2)
    sub = R["card_sub"]
    blend(base, sub, (W - sub.shape[1]) / 2, C["sub_y"] + (1 - ramp(lt, 2.6, 3.6)) * 20, ramp(lt, 2.6, 3.6))

    logo = R["card_logo"]
    lp = ramp(lt, 3.8, 4.8)
    ly = C["logo_y"] + (1 - lp) * 24
    lx = (W - logo.shape[1]) / 2
    blend(base, logo, lx, ly, lp)
    if R["logo_flame"] is not None and lp > 0:
        fx, fy = R["logo_flame"]
        add_glow(light, lx + fx, ly + fy, 80, (255, 170, 70), 0.45 * lp * (0.9 + 0.1 * math.sin(t * 9)))
    wish = R["card_wish"]
    blend(base, wish, (W - wish.shape[1]) / 2, C["wish_y"] + (1 - ramp(lt, 4.8, 5.8)) * 16, ramp(lt, 4.8, 5.8))
    return base + light


def draw_captions(out, t, caps):
    for (t0, t1, spr) in caps:
        if t0 - 0.1 < t < t1 + 0.1:
            k = window(t, t0, t1, 0.6, 0.6)
            blend(out, spr, (W - spr.shape[1]) / 2, L["cap_y"] + (1 - ramp(t, t0, t0 + 0.6)) * 10, k)


def finish(out, i, t, dur, caps):
    out = np.clip(out, 0, 255)
    draw_captions(out, t, caps)
    out *= ramp(t, 0, 1.0) * (1 - ramp(t, dur - 1.8, dur - 0.1))
    # gentle grain + dither to avoid banding in the dark gradients
    rng = np.random.default_rng(i)
    out += rng.normal(0, 1.6, (H, W, 1)).astype(np.float32)
    return np.clip(out, 0, 255).astype(np.uint8).tobytes()


# Instagram Story (15 s): the rangoli blooms around a diya, then the greeting card.
STORY_RANGOLI = (26.9, 1.3)  # rangoli time = 26.9 + t * 1.3
STORY_CARD_AT = 5.8


def render_story(i):
    t = i / FPS
    tr = STORY_RANGOLI[0] + t * STORY_RANGOLI[1]
    if t < STORY_CARD_AT:
        out = render_rangoli(tr)
    elif t < STORY_CARD_AT + XF:
        k = ramp(t, STORY_CARD_AT, STORY_CARD_AT + XF)
        out = render_rangoli(tr) * (1 - k) + render_card(t, lt=t - STORY_CARD_AT) * k
    else:
        out = render_card(t, lt=t - STORY_CARD_AT)
    return finish(out, i, t, STORY_DURATION, R["story_captions"])


def render(i):
    t = i / FPS
    if t < T_RANGOLI_IN:
        out = render_town(t)
    elif t < T_RANGOLI_IN + XF:
        k = ramp(t, T_RANGOLI_IN, T_RANGOLI_IN + XF)
        out = render_town(t) * (1 - k) + render_rangoli(t) * k
    elif t < T_RANGOLI_OUT:
        out = render_rangoli(t)
    elif t < T_RANGOLI_OUT + XF:
        k = ramp(t, T_RANGOLI_OUT, T_RANGOLI_OUT + XF)
        out = render_rangoli(t) * (1 - k) + render_town(t) * k
    elif t < T_CARD:
        out = render_town(t)
    elif t < T_CARD + XF:
        k = ramp(t, T_CARD, T_CARD + XF)
        out = render_town(t) * (1 - k) + render_card(t) * k
    else:
        out = render_card(t)
    return finish(out, i, t, DURATION, R["captions"])


def build_all():
    build_common()
    build_town()
    build_rangoli()
    build_card()


# --------------------------------------------------------------------------
# main
# --------------------------------------------------------------------------
OUTPUTS = {
    "landscape": ("greensolve_diwali.mp4", DURATION),
    "reel": ("greensolve_diwali_reel.mp4", DURATION),
    "story": ("greensolve_diwali_story.mp4", STORY_DURATION),
}


def arg(name, default=None):
    return sys.argv[sys.argv.index(name) + 1] if name in sys.argv else default


def main():
    fmt = arg("--format", "landscape")
    if fmt not in OUTPUTS:
        sys.exit(f"--format must be one of {', '.join(OUTPUTS)}")
    configure(fmt)
    frame_fn = render_story if fmt == "story" else render
    name, dur = OUTPUTS[fmt]
    print(f"[{fmt}] {W}x{H}, {dur:.0f}s — building artwork…", flush=True)
    build_all()

    if "--preview" in sys.argv:
        os.makedirs(os.path.join(HERE, "preview"), exist_ok=True)
        times = [float(a) for a in sys.argv[sys.argv.index("--preview") + 1:] if not a.startswith("-")] or \
            ([1.5, 4.0, 7.5, 10.5, 14.0] if fmt == "story" else [3.0, 14.5, 24.0, 33.5, 43.0, 51.5])
        for tt in times:
            buf = frame_fn(int(tt * FPS))
            im = Image.frombytes("RGB", (W, H), buf)
            p = os.path.join(HERE, "preview", f"{fmt}_{tt:05.1f}.jpg")
            im.save(p, quality=90)
            print("wrote", p)
        return

    import soundtrack
    wav = os.path.join(HERE, f"soundtrack_{fmt}.wav")
    print("composing soundtrack…", flush=True)
    if fmt == "story":
        soundtrack.make_story_soundtrack(wav, dur)
    else:
        soundtrack.make_soundtrack(wav, dur)

    out = os.path.join(HERE, name)
    n = int(dur * FPS)
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
           "-r", str(FPS), "-i", "-", "-i", wav, "-c:v", "libx264", "-preset", "slow", "-crf", "19",
           "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", out]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    with Pool(os.cpu_count()) as pool:
        for k, buf in enumerate(pool.imap(frame_fn, range(n), chunksize=4)):
            proc.stdin.write(buf)
            if k % 60 == 0:
                print(f"  frame {k}/{n}", flush=True)
    proc.stdin.close()
    proc.wait()
    os.remove(wav)
    print("done:", out)


if __name__ == "__main__":
    main()
