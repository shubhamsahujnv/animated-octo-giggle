"""Export a static copy of the public site that opens by double-clicking index.html.

Usage: npm run build && npm start   (in another terminal)
       python3 scripts/export-static.py [http://localhost:3000] [static-site]

Renders the home page, the blog and every article from the running server,
strips the JavaScript (browsers block module scripts on file://), and rewrites
absolute links such as /blog/slug to relative file paths such as blog/slug.html.
Pages that need the server (Net-Low, sign-in) link to the live site instead.
"""
import os, re, shutil, sys, urllib.request
from posixpath import relpath, dirname

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000"
OUT = sys.argv[2] if len(sys.argv) > 2 else "static-site"
LIVE = "https://thegreensolve.com"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def fetch(path):
    with urllib.request.urlopen(BASE + path) as r:
        return r.read().decode("utf-8")


def file_for(url_path):
    """Map a site URL to the static file that holds it, or None if it needs the server."""
    path = url_path.split("#")[0].split("?")[0]
    if path in ("", "/"):
        return "index.html"
    if path == "/blog":
        return "blog/index.html"
    if path.startswith("/blog/"):
        return "blog/" + path[len("/blog/"):] + ".html"
    if path.startswith(("/assets/", "/images/")) or path in ("/favicon.png", "/og-image.jpg"):
        return path.lstrip("/")
    return None


def rewrite(html, page_file):
    here = dirname(page_file) or "."

    def repl(m):
        attr, url = m.group(1), m.group(2)
        target = file_for(url)
        if target is None:
            return f'{attr}="{LIVE}{url}"'
        frag = "#" + url.split("#", 1)[1] if "#" in url else ""
        return f'{attr}="{relpath(target, here)}{frag}"'

    return re.sub(r'\b(href|src)="(/[^"/][^"]*|/)"', repl, html)


def strip_scripts(html):
    html = re.sub(r"<script\b[^>]*>.*?</script>", "", html, flags=re.S)
    return re.sub(r'<link rel="modulepreload"[^>]*/?>', "", html)


def slugs():
    posts = open(os.path.join(ROOT, "src/content/posts.ts"), encoding="utf-8").read()
    published = posts.split("export const DRAFT_POSTS")[0]
    return re.findall(r'slug: "([^"]+)"', published)


def main():
    if os.path.exists(OUT):
        shutil.rmtree(OUT)
    os.makedirs(os.path.join(OUT, "blog"))

    # Home page is a self-contained static document: keep its scripts.
    home = open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
    open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(rewrite(home, "index.html"))

    pages = [("/blog", "blog/index.html")] + [(f"/blog/{s}", f"blog/{s}.html") for s in slugs()]
    for url, target in pages:
        html = rewrite(strip_scripts(fetch(url)), target)
        open(os.path.join(OUT, target), "w", encoding="utf-8").write(html)
        print("wrote", target)

    public = os.path.join(ROOT, "public")
    for name in os.listdir(public):
        src = os.path.join(public, name)
        (shutil.copytree if os.path.isdir(src) else shutil.copy)(src, os.path.join(OUT, name))
    shutil.copytree(os.path.join(ROOT, ".output/public/assets"), os.path.join(OUT, "assets"),
                    ignore=shutil.ignore_patterns("*.js", "*.js.map"))
    print("done:", OUT)


main()
