"""Procedurally generate a tulip wine glass, ready for Substance Painter.

Output: mesh/wine_glass.obj + mesh/wine_glass.mtl (units: centimetres, Y up).

The glass is a closed, watertight solid of revolution with real wall thickness
(outer bowl, rounded rim, inner bowl, stem, domed foot). It is split into UV
islands that never overlap and all share one texel density, packed into 0-1,
so it can be baked and painted in Substance Painter straight away.

Run:  python3 glass/tools/generate_glass.py
"""
import math
import os

SEGMENTS = 96  # radial subdivisions

# --------------------------------------------------------------------------
# Profile: list of (radius, height) control points per part, in cm.
# The full profile runs from the axis under the foot, around the outside,
# over the rim, and back down the inside of the bowl to the axis.
# --------------------------------------------------------------------------
PARTS = [
    # name,            control points,                                   samples, uv mode
    ("foot_bottom", [(0.0, 0.22), (1.2, 0.15), (2.6, 0.05), (3.62, 0.0)], 18, "planar"),
    ("foot_edge",   [(3.62, 0.0), (3.78, 0.03), (3.82, 0.11), (3.74, 0.19)], 8, "lathe"),
    ("foot_top",    [(3.74, 0.19), (2.8, 0.32), (1.6, 0.5), (0.85, 0.75), (0.5, 1.2)], 20, "lathe"),
    ("stem",        [(0.5, 1.2), (0.40, 2.4), (0.37, 5.0), (0.38, 7.6), (0.46, 9.0), (0.62, 9.7)], 30, "lathe"),
    ("bowl_outer",  [(0.62, 9.7), (1.7, 10.35), (3.25, 11.6), (4.12, 13.4), (4.25, 15.3),
                     (3.98, 17.6), (3.58, 19.8), (3.42, 21.4)], 60, "lathe"),
    ("rim",         None, 10, "lathe"),  # filled in below (half-round bead)
    ("bowl_inner",  [(3.27, 21.4), (3.43, 19.8), (3.83, 17.6), (4.10, 15.3), (3.97, 13.4),
                     (3.12, 11.7), (1.55, 10.62), (0.0, 10.42)], 60, "lathe"),
]

RIM_A, RIM_B = (3.42, 21.4), (3.27, 21.4)


def catmull_rom(points, samples):
    """Centripetal-ish Catmull-Rom through points, resampled by arc length."""
    pts = [points[0]] + points + [points[-1]]
    dense = []
    for i in range(1, len(pts) - 2):
        p0, p1, p2, p3 = pts[i - 1], pts[i], pts[i + 1], pts[i + 2]
        for s in range(40):
            t = s / 40.0
            t2, t3 = t * t, t * t * t
            dense.append(tuple(
                0.5 * ((2 * p1[k]) + (-p0[k] + p2[k]) * t
                       + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2
                       + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3)
                for k in range(2)))
    dense.append(points[-1])
    return resample(dense, samples)


def resample(dense, samples):
    lengths = [0.0]
    for a, b in zip(dense, dense[1:]):
        lengths.append(lengths[-1] + math.dist(a, b))
    total = lengths[-1]
    out, j = [], 0
    for i in range(samples + 1):
        target = total * i / samples
        while j < len(lengths) - 2 and lengths[j + 1] < target:
            j += 1
        seg = lengths[j + 1] - lengths[j] or 1.0
        f = (target - lengths[j]) / seg
        a, b = dense[j], dense[j + 1]
        out.append((a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f))
    out[0], out[-1] = dense[0], dense[-1]
    return out


def rim_points(samples):
    cx, cy = (RIM_A[0] + RIM_B[0]) / 2, RIM_A[1]
    rad = (RIM_A[0] - RIM_B[0]) / 2
    return [(cx + rad * math.cos(math.pi * i / samples),
             cy + rad * math.sin(math.pi * i / samples)) for i in range(samples + 1)]


# --------------------------------------------------------------------------
# Build profile polylines per part
# --------------------------------------------------------------------------
profiles = []
for name, ctrl, samples, mode in PARTS:
    pts = rim_points(samples) if name == "rim" else catmull_rom(ctrl, samples)
    profiles.append((name, pts, mode))

# Global profile (for continuous smooth normals across island seams)
global_pts = []
for _, pts, _ in profiles:
    global_pts.extend(pts if not global_pts else pts[1:])


def profile_normal(idx):
    a = global_pts[max(idx - 1, 0)]
    b = global_pts[min(idx + 1, len(global_pts) - 1)]
    dr, dy = b[0] - a[0], b[1] - a[1]
    # Profile runs outward along the bottom then up the outside: the outward
    # normal is the tangent rotated clockwise -> (dy, -dr)
    n = (dy, -dr)
    ln = math.hypot(*n) or 1.0
    return (n[0] / ln, n[1] / ln)


def arc_len(pts):
    return sum(math.dist(a, b) for a, b in zip(pts, pts[1:]))


# --------------------------------------------------------------------------
# UV layout: one shared texel density for every island, packed into 0-1.
# Lathe strips: width = circumference at their widest radius, height = arc
# length. Very wide strips are cut into 2-4 angular pieces so they pack well.
# Planar island (foot underside): disc of diameter 2*r_max.
# --------------------------------------------------------------------------
islands = []
offset = 0
for name, pts, mode in profiles:
    rmax = max(p[0] for p in pts)
    if mode == "lathe":
        w_full, h = 2 * math.pi * rmax, arc_len(pts)
        k = max(1, min(4, math.ceil(w_full / (2.2 * h))))
        while SEGMENTS % k:
            k -= 1
        for piece in range(k):
            islands.append(dict(name=f"{name}_{piece + 1}" if k > 1 else name, pts=pts, mode=mode,
                                w=w_full / k, h=h, gstart=offset,
                                c0=piece * SEGMENTS // k, c1=(piece + 1) * SEGMENTS // k))
    else:
        islands.append(dict(name=name, pts=pts, mode=mode, w=2 * rmax, h=2 * rmax,
                            gstart=offset, c0=0, c1=SEGMENTS))
    offset += len(pts) - 1

PAD = 0.5  # padding between islands, in cm (scaled with everything else)


def shelf_pack(row_width):
    x = y = row_h = 0.0
    place = {}
    for i, isl in enumerate(sorted(range(len(islands)), key=lambda j: -islands[j]["h"])):
        w, h = islands[isl]["w"] + PAD, islands[isl]["h"] + PAD
        if x > 0 and x + w > row_width:
            x, y, row_h = 0.0, y + row_h, 0.0
        place[isl] = (x + PAD / 2, y + PAD / 2)
        x += w
        row_h = max(row_h, h)
    return place, max(row_width, y + row_h)


min_w = max(i["w"] for i in islands) + PAD
best = min((shelf_pack(min_w + 0.1 * t) for t in range(600)), key=lambda r: r[1])
for idx, (ox, oy) in best[0].items():
    islands[idx]["ox"], islands[idx]["oy"] = ox, oy
scale = 1.0 / best[1]

# --------------------------------------------------------------------------
# Emit geometry (positions are welded afterwards)
# --------------------------------------------------------------------------
V, VT, VN, F = [], [], [], []


def add(lst, item):
    lst.append(item)
    return len(lst)  # OBJ is 1-based


for isl in islands:
    pts, mode, c0, c1 = isl["pts"], isl["mode"], isl["c0"], isl["c1"]
    cum = [0.0]
    for a, b in zip(pts, pts[1:]):
        cum.append(cum[-1] + math.dist(a, b))
    grid = []
    for r, (rad, hgt) in enumerate(pts):
        nr, ny = profile_normal(isl["gstart"] + r)
        on_axis = rad < 1e-6
        row = []
        for c in range(c0, c1 + 1):
            th = 2 * math.pi * c / SEGMENTS
            ct, st = math.cos(th), math.sin(th)
            vi = add(V, (rad * ct, hgt, rad * st))
            nn = (0.0, math.copysign(1.0, ny), 0.0) if on_axis else (nr * ct, ny, nr * st)
            ni = add(VN, nn)
            if mode == "lathe":
                u = isl["ox"] + isl["w"] * (c - c0) / (c1 - c0)
                v = isl["oy"] + cum[r]
            else:  # planar disc
                u = isl["ox"] + isl["w"] / 2 + rad * ct
                v = isl["oy"] + isl["h"] / 2 + rad * st
            ti = add(VT, (u * scale, v * scale))
            row.append((vi, ti, ni))
        grid.append(row)
    for r in range(len(pts) - 1):
        for c in range(c1 - c0):
            a, b = grid[r][c], grid[r][c + 1]
            d, e = grid[r + 1][c], grid[r + 1][c + 1]
            if pts[r][0] < 1e-6:
                F.append((a, e, d))
            elif pts[r + 1][0] < 1e-6:
                F.append((a, b, d))
            else:
                F.append((a, b, e, d))

# Verify winding against normals; flip all faces if they point inward.
def face_check():
    score = 0
    for f in F[:: max(1, len(F) // 400)]:
        p = [V[i[0] - 1] for i in f[:3]]
        u = [p[1][k] - p[0][k] for k in range(3)]
        w = [p[2][k] - p[0][k] for k in range(3)]
        cr = (u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0])
        n = VN[f[0][2] - 1]
        score += 1 if sum(cr[k] * n[k] for k in range(3)) > 0 else -1
    return score

if face_check() < 0:
    F = [tuple(reversed(f)) for f in F]

# Weld positions shared by neighbouring islands so the mesh is one connected,
# watertight shell (UV seams are kept: the same position may use several vt).
remap, uniq, V_w = {}, {}, []
for i, p in enumerate(V, 1):
    key = tuple(round(c, 5) for c in p)
    if key not in uniq:
        V_w.append(p)
        uniq[key] = len(V_w)
    remap[i] = uniq[key]
V = V_w
F = [tuple((remap[a], b, c) for a, b, c in f) for f in F]

here = os.path.dirname(os.path.abspath(__file__))
out_dir = os.path.join(here, "..", "mesh")
os.makedirs(out_dir, exist_ok=True)
with open(os.path.join(out_dir, "wine_glass.mtl"), "w") as fh:
    fh.write("# Wine glass material (one texture set in Substance Painter)\n"
             "newmtl M_Glass\nKd 0.95 0.97 0.98\nKs 1.0 1.0 1.0\nNs 900\nNi 1.5\nd 0.15\nillum 7\n")
with open(os.path.join(out_dir, "wine_glass.obj"), "w") as fh:
    fh.write("# Tulip wine glass - generated by glass/tools/generate_glass.py\n")
    fh.write("# Units: centimetres, Y up. Height %.1f cm, rim diameter %.1f cm.\n"
             % (max(v[1] for v in V), 2 * RIM_A[0]))
    fh.write("mtllib wine_glass.mtl\no WineGlass\n")
    for v in V:
        fh.write("v %.5f %.5f %.5f\n" % v)
    for t in VT:
        fh.write("vt %.6f %.6f\n" % t)
    for n in VN:
        fh.write("vn %.5f %.5f %.5f\n" % n)
    fh.write("usemtl M_Glass\ns 1\n")
    for f in F:
        fh.write("f " + " ".join("%d/%d/%d" % i for i in f) + "\n")

tris = sum(len(f) - 2 for f in F)
print(f"vertices={len(V)} faces={len(F)} triangles={tris} uv_islands={len(islands)}")
print("UV islands:", ", ".join(i["name"] for i in islands))
