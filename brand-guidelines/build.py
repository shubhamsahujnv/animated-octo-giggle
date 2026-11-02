"""Build brand-guidelines/index.html from src/index.template.html, embedding logos as data URIs."""
import base64, io, pathlib, sys
from PIL import Image

root = pathlib.Path(__file__).parent

def data_uri(path, width):
    im = Image.open(root / path).convert("RGBA")
    im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "PNG", optimize=True)
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()

body = (root / "src/index.template.html").read_text()
body = body.replace("{{YOBY}}", data_uri("assets/yobytech-logo.webp", 640))
body = body.replace("{{YODR}}", data_uri("assets/yodr-logo.png", 360))

# Standalone page for the repo (opens directly in a browser).
page = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        + body.replace("<style>", "<style>\n:root{padding-block:env(safe-area-inset-top,0px) env(safe-area-inset-bottom,0px)}\nimg{max-width:100%}\n[hidden]{display:none!important}", 1)
              .replace("</style>", "</style>\n</head>\n<body>", 1)
        + "\n</body>\n</html>\n")
(root / "index.html").write_text(page)

# Optional: body-only fragment for hosts that add their own <html> skeleton.
if len(sys.argv) > 1:
    pathlib.Path(sys.argv[1]).write_text(body)
print("built", len(page), "bytes")
