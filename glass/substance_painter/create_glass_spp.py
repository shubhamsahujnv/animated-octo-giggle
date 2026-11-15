"""Build and save the wine-glass Substance Painter project (wine_glass.spp).

Run inside Adobe Substance 3D Painter (8.3 or later):
    Python > (Plugins folder) -- or simply paste into the Python console:
    exec(open(r"<repo>/glass/substance_painter/create_glass_spp.py").read())

What it does
  1. Creates a project from ../mesh/wine_glass.obj (2K, OpenGL normals) using the
     "PBR - Metallic Roughness Alpha-blend" template when it can find it, so the
     viewport shows real transparency.
  2. Adds an Opacity channel to the M_Glass texture set.
  3. Builds a starter glass layer stack:
        - Clear Glass      base: near-white, metal 0, roughness 0.04, opacity 0.12
        - Rim Frost        thin frosted band, slightly rougher/more opaque (mask by hand)
        - Fingerprints     placeholder fill, disabled, for smudge grunge
  4. Saves wine_glass.spp next to this script.

Every step after project creation is wrapped so that one API difference between
Painter versions never stops the .spp from being saved.
"""
import os
import glob

import substance_painter.project as project
import substance_painter.textureset as textureset

HERE = os.path.dirname(os.path.abspath(__file__))
MESH = os.path.normpath(os.path.join(HERE, "..", "mesh", "wine_glass.obj"))
OUT_SPP = os.path.join(HERE, "wine_glass.spp")


def log(msg):
    print("[wine_glass] " + msg)


def find_alpha_blend_template():
    """Look for the shipped alpha-blend project template (.spt)."""
    roots = []
    for env in ("PROGRAMFILES", "PROGRAMW6432"):
        if os.environ.get(env):
            roots.append(os.path.join(os.environ[env], "Adobe"))
    roots += ["/Applications", "/opt/Adobe", os.path.expanduser("~/Documents/Adobe")]
    for root in roots:
        hits = glob.glob(os.path.join(root, "**", "*lpha*blend*.spt"), recursive=True)
        if hits:
            return hits[0]
    return None


# --------------------------------------------------------------------------
# 1. Create the project
# --------------------------------------------------------------------------
if project.is_open():
    project.close()

settings = project.Settings(
    normal_map_format=project.NormalMapFormat.OpenGL,
    default_texture_resolution=2048,
    import_cameras=False,
)
template = find_alpha_blend_template()
if template:
    log("using template " + template)
    project.create(mesh_file_path=MESH, template_file_path=template, settings=settings)
else:
    log("alpha-blend template not found; using default template "
        "(switch shader to pbr-metal-rough-alpha-blend in Shader Settings)")
    project.create(mesh_file_path=MESH, settings=settings)

# --------------------------------------------------------------------------
# 2. Opacity channel
# --------------------------------------------------------------------------
stack = None
try:
    stack = textureset.get_active_stack()
    if not stack.has_channel(textureset.ChannelType.Opacity):
        stack.add_channel(textureset.ChannelType.Opacity, textureset.ChannelFormat.L8)
    log("opacity channel ready")
except Exception as exc:  # pragma: no cover - depends on Painter version
    log("could not add opacity channel: %s" % exc)

# --------------------------------------------------------------------------
# 3. Starter layer stack
# --------------------------------------------------------------------------
LAYERS = [
    # name,          base color,            rough, metal, opacity, enabled
    ("Clear Glass", (0.96, 0.98, 1.00), 0.04, 0.0, 0.12, True),
    ("Rim Frost", (0.92, 0.95, 0.97), 0.35, 0.0, 0.45, False),
    ("Fingerprints", (0.90, 0.90, 0.90), 0.55, 0.0, 0.30, False),
]

try:
    import substance_painter.layerstack as layerstack
    import substance_painter.colormanagement as cm

    CT = textureset.ChannelType
    for name, col, rough, metal, opac, enabled in LAYERS:
        pos = layerstack.InsertPosition.from_textureset_stack(stack)
        fill = layerstack.insert_fill(pos)
        fill.set_name(name)
        fill.active_channels = {CT.BaseColor, CT.Roughness, CT.Metallic, CT.Opacity}
        fill.set_source(CT.BaseColor, cm.Color(*col))
        fill.set_source(CT.Roughness, cm.Color(rough, rough, rough))
        fill.set_source(CT.Metallic, cm.Color(metal, metal, metal))
        fill.set_source(CT.Opacity, cm.Color(opac, opac, opac))
        fill.set_visible(enabled)
        if name != "Clear Glass":
            try:
                fill.add_mask(layerstack.MaskBackground.Black)
            except Exception:
                pass
    log("starter layers created")
except Exception as exc:  # pragma: no cover
    log("layer setup skipped (%s); add a fill layer by hand, see README" % exc)

# --------------------------------------------------------------------------
# 4. Save
# --------------------------------------------------------------------------
project.save_as(OUT_SPP, project.ProjectSaveMode.Full)
log("saved " + OUT_SPP)
