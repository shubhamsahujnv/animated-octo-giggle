"""Build static Baseline Journal pages for the five articles from a live post page template.

Usage: python3 build_pages.py <template.html> <articles_dir> <out_dir>
The template is a live journal post by Ankita Patwa (blog/<slug>/index.html). The output pages keep the
site's markup and CSS but omit the React hydration scripts, so rich content (tables, lists, links) stays as written.
"""
import html, json, math, re, sys, pathlib
import markdown

TPL, ART, OUT = map(pathlib.Path, sys.argv[1:4])
SITE = "https://thegreensolve.com"
POSTS = {  # existing live posts for the "Related journal" rail
 "carbon-credits-are-not-just-for-big-companies": ("Carbon markets", "Carbon credits are not just for big companies", 5),
 "un-article-6-4-n2o-methodology": ("Policy", "The UN just opened a door for N₂O projects", 4),
 "what-jpmorgan-buying-removals-tells-smes": ("Markets", "What a bank buying removals tells the rest of us", 4),
 "scope-3-for-manufacturers-without-a-data-team": ("Practice", "Scope 3 for manufacturers without a data team", 6),
 "india-and-us-reporting-what-changes": ("Compliance", "Reporting in India and the US: what actually differs", 6),
}
ARTICLES = {
 "carbon-accounting-software-signs": ("Practice", ["india-and-us-reporting-what-changes", "scope-3-for-manufacturers-without-a-data-team", "carbon-credits-are-not-just-for-big-companies"]),
 "scope-1-2-3-emissions-examples": ("Practice", ["scope-3-for-manufacturers-without-a-data-team", "india-and-us-reporting-what-changes", "un-article-6-4-n2o-methodology"]),
 "iso-14064-carbon-baseline-steps": ("Compliance", ["carbon-credits-are-not-just-for-big-companies", "india-and-us-reporting-what-changes", "scope-3-for-manufacturers-without-a-data-team"]),
 "carbon-accounting-mistakes": ("Compliance", ["scope-3-for-manufacturers-without-a-data-team", "india-and-us-reporting-what-changes", "what-jpmorgan-buying-removals-tells-smes"]),
 "decarbonisation-strategies-manufacturers": ("Practice", ["carbon-credits-are-not-just-for-big-companies", "un-article-6-4-n2o-methodology", "what-jpmorgan-buying-removals-tells-smes"]),
}
DATE_ISO, DATE_LONG = "2026-11-20", "20 November 2026"
ARTICLE_CSS = """<style id="tgs-article-extras">
.tgs-article h3{font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:1.3rem;line-height:1.3;margin:2.25rem 0 .25rem;color:var(--foreground)}
.tgs-article ul,.tgs-article ol{margin:1.25rem 0 0;padding-left:1.4rem;font-size:1.05rem;line-height:1.75rem;color:color-mix(in oklab,var(--foreground) 90%,transparent)}
.tgs-article ul{list-style:disc}.tgs-article ol{list-style:decimal}.tgs-article li{margin:.45rem 0;padding-left:.2rem}
.tgs-article ul.tgs-checklist{list-style:none;padding-left:0}.tgs-article ul.tgs-checklist li::before{content:"\\2610";margin-right:.6rem}
.tgs-article .tgs-table{overflow-x:auto;margin:1.75rem 0;border:1px solid var(--border);border-radius:.5rem}
.tgs-article table{width:100%;border-collapse:collapse;font-size:.95rem;line-height:1.5}
.tgs-article th,.tgs-article td{text-align:left;vertical-align:top;padding:.65rem .8rem;border-bottom:1px solid var(--border)}
.tgs-article th{background:var(--muted);font-weight:600}.tgs-article tr:last-child td{border-bottom:0}
.tgs-article a{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px;font-weight:500}
.tgs-article a.tgs-cite{font-size:.75em;vertical-align:super;text-decoration:none;color:var(--muted-foreground);font-weight:600;margin-left:1px}
.tgs-article a.tgs-cite:hover{color:var(--foreground)}
.tgs-article blockquote.tgs-quick p{margin:0;font-family:inherit}
.tgs-article .tgs-sources{margin-top:3.5rem;border-top:1px solid var(--border);padding-top:1.5rem}
.tgs-article .tgs-sources ol{font-size:.9rem;line-height:1.5rem}
.tgs-faq-answer a{text-decoration:underline;text-underline-offset:3px}.tgs-faq-answer a.tgs-cite{font-size:.75em;vertical-align:super;text-decoration:none}
</style>"""

def hid(t):  # same as headingId() in the site's blog route
    return re.sub(r"(^-|-$)", "", re.sub(r"[^a-z0-9]+", "-", t.lower()))

tpl = TPL.read_text(encoding="utf-8")
def between(s, start, end_tag, from_idx=0):
    i = s.index(start, from_idx); j = s.index(end_tag, i) + len(end_tag); return s[i:j]

# Template fragments
P_CLS = re.search(r'<p class="(mt-5 text-\[1\.05rem\][^"]*)"', tpl).group(1)
H2_CLS = re.search(r'<h2 id="[^"]+" class="(tgs-h1 mb-4[^"]*)"', tpl).group(1)
BQ_CLS = re.search(r'<blockquote class="([^"]*)"', tpl).group(1)
head_end = tpl.index("</head>")
body_start = tpl.index("<body")
blog_header = between(tpl, '<header class="border-b-2', "</header>", body_start)
post_header = between(tpl, '<header class="bg-primary', "</header>", body_start)
aside_left = between(tpl, '<aside class="order-2 lg:order-1">', "</aside>")
rel_item_tpl = re.search(r'(<a href="/blog/[^"]+" class="group block[^"]*">.*?</a>)', aside_left).group(1)
details_nav = between(tpl, '<details class="mb-8', "</details>")
mob_item_cls = re.search(r'<a href="#[^"]+" class="([^"]*)"', details_nav).group(1)
author_sec = between(tpl, '<section aria-labelledby="about-author"', "</section>")
faq_sec = between(tpl, '<section aria-labelledby="frequently-asked-questions"', "</section>")
faq_item_tpl = re.search(r"(<details .*?</details>)", faq_sec[faq_sec.index("<div"):], re.S).group(1)
cta_start = tpl.index("</section>", tpl.index(faq_sec) ) + len("</section>")
cta_sec = between(tpl, "<section", "</section>", cta_start)
aside_right = between(tpl, '<aside class="order-3 hidden lg:block">', "</aside>")
desk_item_cls = re.search(r'<a href="#[^"]+" class="([^"]*)"', aside_right).group(1)
footer = between(tpl, '<footer', "</footer>")
main_open = re.search(r'<main class="[^"]*">', tpl).group(0)

def md_to_html(md):
    md = re.sub(r"^- \[ \] ", "- ", md, flags=re.M) if False else md
    h = markdown.markdown(md, extensions=["tables", "sane_lists"])
    return h

def decorate(h):
    h = re.sub(r"<p>", f'<p class="{P_CLS}">', h)
    def h2(m):
        t = re.sub("<[^>]+>", "", m.group(1)); return f'<h2 id="{hid(html.unescape(t))}" class="{H2_CLS}">{m.group(1)}</h2>'
    h = re.sub(r"<h2>(.*?)</h2>", h2, h)
    h = re.sub(r"<h3>(.*?)</h3>", lambda m: f'<h3 id="{hid(html.unescape(re.sub("<[^>]+>","",m.group(1))))}">{m.group(1)}</h3>', h)
    h = re.sub(r"<table>", '<div class="tgs-table"><table>', h).replace("</table>", "</table></div>")
    h = re.sub(r'<a href="([^"]+)">\[(\d+)\]</a>', r'<a class="tgs-cite" href="\1" target="_blank" rel="noopener" aria-label="Source \2">[\2]</a>', h)
    h = re.sub(r'<a href="(https?://(?!thegreensolve\.com)[^"]+)">', r'<a href="\1" target="_blank" rel="noopener">', h)
    h = h.replace('href="https://thegreensolve.com/', 'href="/')
    # checklist
    h = re.sub(r"<ul>\n(<li>\[ \] .*?)</ul>", lambda m: '<ul class="tgs-checklist">\n' + m.group(1).replace("<li>[ ] ", "<li>") + "</ul>", h, flags=re.S)
    return h

for slug, (tag, related) in ARTICLES.items():
    src = (ART / f"{slug}.md").read_text(encoding="utf-8")
    fm_txt, rest = re.match(r"---\n(.*?)\n---\n(.*)", src, re.S).groups()
    meta = {}
    for line in fm_txt.splitlines():
        k, _, v = line.partition(":"); v = v.strip()
        meta[k.strip()] = json.loads(v) if v.startswith(("\"", "[")) else v
    body_md = rest.split("---CITATIONS---")[0]
    schema = re.search(r'<script type="application/ld\+json">\n(.*?)\n</script>', rest, re.S).group(1)
    faqs = json.loads(rest.split("---FAQ_JSON---")[1])
    title = meta["title"]
    # article body: drop H1 + last-updated line, split off FAQ and sources
    main_md = body_md.split("## Frequently asked questions")[0]
    faq_md = body_md.split("## Frequently asked questions")[1].split("\n**Sources**")[0]
    sources_md = body_md.split("\n**Sources**")[1]
    main_md = re.sub(r"^# .*\n", "", main_md, count=1, flags=re.M)
    main_md = re.sub(r"^\*Last updated:.*\n", "", main_md, count=1, flags=re.M)
    qa = re.search(r"^> \*\*Quick answer:\*\*(.*)$", main_md, re.M)
    main_md = main_md.replace(qa.group(0), "@@QUICK@@")
    body_html = decorate(md_to_html(main_md))
    qa_html = decorate(md_to_html("**Quick answer:**" + qa.group(1))).replace(f'<p class="{P_CLS}">', "<p>")
    body_html = re.sub(r'<p class="[^"]*">@@QUICK@@</p>', f'<blockquote class="{BQ_CLS} tgs-quick">{qa_html}</blockquote>', body_html)
    sources_html = decorate(md_to_html(sources_md)).replace('<ol>', '<ol>')
    body_html += f'<section class="tgs-sources" aria-labelledby="sources"><p id="sources" class="font-mono text-xs uppercase tracking-widest text-muted-foreground">Sources</p>{sources_html}</section>'
    words = len(re.sub("<[^>]+>", " ", body_html).split()); read = max(1, math.ceil(words / 220))
    heads = re.findall(r'<h2 id="([^"]+)" class="[^"]*">(.*?)</h2>', body_html)
    # FAQ items from the visible FAQ markdown (keeps citation links)
    faq_items = re.findall(r"### (.+?)\n\n(.+?)(?=\n### |\Z)", faq_md, re.S)
    assert len(faq_items) == len(faqs)
    faq_html = ""
    ans_cls_m = re.search(r"<p class=\"([^\"]*)\">", faq_item_tpl)
    for q, a in faq_items:
        a_html = decorate(md_to_html(a.strip())).replace(f'<p class="{P_CLS}">', "").replace("</p>", "")
        item = re.sub(r"(<summary[^>]*>).*?(<span aria-hidden)", lambda m: m.group(1) + html.escape(q.strip()) + m.group(2), faq_item_tpl, flags=re.S)
        item = re.sub(r"(<p class=\"[^\"]*)\">.*?</p>", lambda m: m.group(1) + ' tgs-faq-answer">' + a_html + "</p>", item, flags=re.S)
        faq_html += item
    faq_block = faq_sec[: faq_sec.index("<div", faq_sec.index("</h2>"))] + re.match(r"<div[^>]*>", faq_sec[faq_sec.index("<div", faq_sec.index("</h2>")):]).group(0) + faq_html + "</div></section>"
    # navs
    mob = "".join(f'<a href="#{i}" class="{mob_item_cls}">{t}</a>' for i, t in heads) + f'<a href="#frequently-asked-questions" class="{mob_item_cls}">Frequently asked questions</a>'
    desk = "".join(f'<a href="#{i}" class="{desk_item_cls}">{t}</a>' for i, t in heads) + f'<a href="#frequently-asked-questions" class="{desk_item_cls}">Frequently asked questions</a>'
    details = re.sub(r"(<nav[^>]*>).*?(</nav>)", lambda m: m.group(1) + mob + m.group(2), details_nav, flags=re.S)
    right = re.sub(r"(<nav[^>]*>).*?(</nav>)", lambda m: m.group(1) + desk + m.group(2), aside_right, flags=re.S)
    rel = ""
    for n, r in enumerate(related, 1):
        t, ttl, mins = POSTS[r][0], POSTS[r][1], POSTS[r][2]
        it = re.sub(r'href="/blog/[^"]+"', f'href="/blog/{r}"', rel_item_tpl)
        it = re.sub(r"(<span class=\"font-mono[^\"]*\">).*?(</span>)", lambda m: f"{m.group(1)}{n:02d}<!-- --> · <!-- -->{t}{m.group(2)}", it, count=1)
        it = re.sub(r"(<h3[^>]*>).*?(</h3>)", lambda m: m.group(1) + html.escape(ttl) + m.group(2), it)
        it = re.sub(r"(<span class=\"mt-2 block[^\"]*\">).*?(</span>)", lambda m: f"{m.group(1)}{mins}<!-- --> min read{m.group(2)}", it)
        rel += it
    left = aside_left[: aside_left.index(rel_item_tpl)] + rel + "</div></div></aside>"
    ph = post_header
    ph = re.sub(r'(<span class="rounded-full bg-accent[^"]*">).*?(</span>)', lambda m: m.group(1) + tag + m.group(2), ph, count=1)
    ph = re.sub(r'(<span class="opacity-80">)[^<]*(</span>)', lambda m: m.group(1) + DATE_LONG + m.group(2), ph, count=1)
    ph = re.sub(r'(<span class="opacity-80">)\d+(<!-- --> min read</span>)', lambda m: f"{m.group(1)}{read}{m.group(2)}", ph, count=1)
    ph = re.sub(r"(<h1[^>]*>).*?(</h1>)", lambda m: m.group(1) + html.escape(title) + m.group(2), ph)
    ph = re.sub(r'(<p class="mt-4 text-lg opacity-90">).*?(</p>)', lambda m: m.group(1) + html.escape(meta["meta_description"]) + m.group(2), ph)
    page_body = (tpl[body_start:tpl.index(">", body_start) + 1] + '<div class="min-h-screen bg-background text-foreground">' + blog_header + ph + main_open
                 + left + '<article class="order-1 min-w-0 lg:order-2">' + details + '<div class="mx-auto max-w-[42rem] tgs-article">'
                 + body_html + author_sec + faq_block + cta_sec + "</div></article>" + right + "</main>" + footer + "</div></body></html>")
    # head
    head = tpl[:head_end]
    head = re.sub(r'<link rel="modulepreload"[^>]*/>', "", head)
    head = re.sub(r'<script type="application/ld\+json">.*?</script>', "", head, flags=re.S)
    tt = meta["meta_title"] + " | TGS"; desc = html.escape(meta["meta_description"], quote=True)
    url = f"{SITE}/blog/{slug}"; og = f"{SITE}/og/{slug}.jpg"
    head = re.sub(r"<title>.*?</title>", f"<title>{html.escape(tt)}</title>", head)
    for prop, val in [("og:title", tt), ("og:description", meta["meta_description"]), ("og:url", url), ("og:image", og)]:
        head = re.sub(rf'<meta property="{prop}" content="[^"]*"/>', f'<meta property="{prop}" content="{html.escape(val, quote=True)}"/>', head)
    for name, val in [("description", meta["meta_description"]), ("twitter:title", tt), ("twitter:description", meta["meta_description"]), ("twitter:image", og), ("author", "Ankita Patwa")]:
        head = re.sub(rf'<meta name="{name}" content="[^"]*"/>', f'<meta name="{name}" content="{html.escape(val, quote=True)}"/>', head)
    head = re.sub(r'<meta property="article:published_time" content="[^"]*"/>', f'<meta property="article:published_time" content="{DATE_ISO}"/><meta property="og:image:width" content="1200"/><meta property="og:image:height" content="630"/><meta property="og:image:alt" content="{html.escape(meta["featured_image_alt"], quote=True)}"/>', head)
    head = re.sub(r'<link rel="canonical" href="[^"]*"/>', f'<link rel="canonical" href="{url}"/>', head)
    head += f'<script type="application/ld+json">{json.dumps(json.loads(schema), ensure_ascii=False, separators=(",", ":"))}</script>' + ARTICLE_CSS
    out = head + "</head>" + page_body
    # sanity: no hydration left
    assert "$tsr" not in out and "index-CPOOPUfN.js" not in out and "modulepreload" not in out
    (OUT / slug).mkdir(parents=True, exist_ok=True)
    (OUT / slug / "index.html").write_text(out, encoding="utf-8")
    print(slug, f"{len(out)} bytes, {words} words, {read} min, {len(heads)} h2, {len(faq_items)} faqs")
