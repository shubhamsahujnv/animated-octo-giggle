"""Check the generated OBJ (watertight, UVs in 0-1, no UV overlap) and draw the UV layout."""
import sys
from collections import Counter
from PIL import Image, ImageDraw

path = sys.argv[1]
out_png = sys.argv[2]
V, VT, F = [], [], []
for line in open(path):
    if line.startswith("v "):
        V.append(tuple(map(float, line.split()[1:])))
    elif line.startswith("vt "):
        VT.append(tuple(map(float, line.split()[1:])))
    elif line.startswith("f "):
        F.append([tuple(int(x) for x in t.split("/")) for t in line.split()[1:]])

edges = Counter()
for f in F:
    ids = [t[0] for t in f]
    for a, b in zip(ids, ids[1:] + ids[:1]):
        if a != b:
            edges[tuple(sorted((a, b)))] += 1
open_edges = sum(1 for c in edges.values() if c == 1)
nonmanifold = sum(1 for c in edges.values() if c > 2)
us = [t[0] for t in VT]; vs = [t[1] for t in VT]
print(f"verts={len(V)} faces={len(F)} open_edges={open_edges} nonmanifold_edges={nonmanifold}")
print(f"uv range u[{min(us):.4f},{max(us):.4f}] v[{min(vs):.4f},{max(vs):.4f}]")

# Rasterise UV triangles on a grid (pixel centres); a pixel hit twice = overlap.
import numpy as np
R = 1024
count = np.zeros((R, R), np.int32)
for f in F:
    uv = [VT[t[1] - 1] for t in f]
    tris = [uv[:3]] if len(uv) == 3 else [[uv[0], uv[1], uv[2]], [uv[0], uv[2], uv[3]]]
    for (ax, ay), (bx, by), (cx, cy) in tris:
        ax, ay, bx, by, cx, cy = [c * R for c in (ax, ay, bx, by, cx, cy)]
        x0, x1 = int(max(0, min(ax, bx, cx))), int(min(R - 1, max(ax, bx, cx)))
        y0, y1 = int(max(0, min(ay, by, cy))), int(min(R - 1, max(ay, by, cy)))
        if x1 < x0 or y1 < y0:
            continue
        xs, ys = np.meshgrid(np.arange(x0, x1 + 1) + 0.5, np.arange(y0, y1 + 1) + 0.5)
        den = (by - cy) * (ax - cx) + (cx - bx) * (ay - cy)
        if abs(den) < 1e-12:
            continue
        l1 = ((by - cy) * (xs - cx) + (cx - bx) * (ys - cy)) / den
        l2 = ((cy - ay) * (xs - cx) + (ax - cx) * (ys - cy)) / den
        inside = (l1 > 1e-9) & (l2 > 1e-9) & (1 - l1 - l2 > 1e-9)
        count[y0:y1 + 1, x0:x1 + 1] += inside
print(f"uv coverage={np.mean(count > 0) * 100:.1f}% overlapping_pixels={(count > 1).sum()}")

S = 2048
img = Image.new("RGB", (S, S), (18, 22, 28))
d = ImageDraw.Draw(img)
for f in F:
    uv = [VT[t[1] - 1] for t in f]
    d.polygon([(u * S, (1 - v) * S) for u, v in uv], outline=(90, 170, 210))
img.save(out_png)
print("uv layout written:", out_png)
