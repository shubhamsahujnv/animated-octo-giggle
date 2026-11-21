"""Rebuild the Baseline Journal listing pages so the five new articles appear, with banner images.

Usage: python3 build_blog_pages.py <live_dir> <articles_dir> <out_dir>

live_dir holds freshly downloaded copies of the live pages. The pages are rewritten as plain static
HTML (the TanStack hydration layer is removed) because the client bundle only knows the five original
posts and would otherwise replace the listing with the old one on navigation. Everything the hydration
layer actually did on these pages is reimplemented in a few lines of vanilla JS: the topic filter and
the contributor form's mailto builder.
"""
import html, json, re, sys, pathlib

LIVE, ART, OUT = map(pathlib.Path, sys.argv[1:4])
DATE_SHORT = "20 Nov 2026"

NEW = [  # slug, tag, author display order (newest first)
    ("carbon-accounting-software-signs", "Practice"),
    ("scope-1-2-3-emissions-examples", "Practice"),
    ("iso-14064-carbon-baseline-steps", "Compliance"),
    ("carbon-accounting-mistakes", "Compliance"),
    ("decarbonisation-strategies-manufacturers", "Practice"),
]
FEATURED = "carbon-credits-are-not-just-for-big-companies"

EXTRA_CSS = """<style id="tgs-journal-extras">
.tgs-card-img{display:block;width:calc(100% + 3rem);max-width:none;margin:-1.5rem -1.5rem 1.25rem;border-radius:calc(1rem - 2px) calc(1rem - 2px) 0 0;border-bottom:2px solid color-mix(in oklab,var(--foreground) 15%,transparent);aspect-ratio:40/21;object-fit:cover;background:var(--muted)}
.tgs-featured-img{display:block;width:calc(100% + 3rem);max-width:none;margin:-1.5rem -1.5rem 1.5rem;border-radius:calc(1rem - 2px) calc(1rem - 2px) 0 0;border-bottom:2px solid color-mix(in oklab,var(--foreground) 15%,transparent);aspect-ratio:40/21;object-fit:cover;background:var(--muted)}
@media (min-width:640px){.tgs-featured-img{width:calc(100% + 4.5rem);margin:-2.25rem -2.25rem 1.75rem}}
.tgs-author-card{display:grid;gap:1.1rem}
@media (min-width:640px){.tgs-author-card{grid-template-columns:17rem minmax(0,1fr);gap:1.5rem;align-items:start}}
.tgs-author-img{display:block;width:100%;aspect-ratio:40/21;object-fit:cover;border-radius:.7rem;border:2px solid color-mix(in oklab,var(--foreground) 15%,transparent);background:var(--muted)}
</style>"""

EXTRA_JS = """<script id="tgs-journal-js">
(function(){
  var group=document.querySelector('[aria-label="Filter by topic"]');
  var grid=document.getElementById('tgs-grid');
  if(group&&grid){
    var base='rounded-full border-2 px-3 py-1.5 text-sm font-semibold transition ';
    var on='border-foreground bg-primary text-primary-foreground';
    var off='border-foreground/20 hover:border-foreground';
    var btns=Array.prototype.slice.call(group.querySelectorAll('button'));
    var cards=Array.prototype.slice.call(grid.children);
    btns.forEach(function(b){
      b.addEventListener('click',function(){
        var tag=b.textContent.trim();
        btns.forEach(function(x){
          var active=x===b;
          x.setAttribute('aria-pressed',active?'true':'false');
          x.className=base+(active?on:off);
        });
        cards.forEach(function(c){
          c.hidden=!(tag==='All'||c.getAttribute('data-tag')===tag);
        });
      });
    });
  }
  var write=document.getElementById('write');
  if(write){
    var fields=write.querySelectorAll('.tgs-input');
    var link=write.querySelector('a[href^="mailto:"]');
    if(link&&fields.length>=4){
      var build=function(){
        var body='Name: '+fields[0].value+'\\nCompany / role: '+fields[1].value+
          '\\n\\nWorking title: '+fields[2].value+
          '\\n\\nThe argument in three lines:\\n'+fields[3].value+
          '\\n\\nDraft attached / draft to follow.\\n\\nSent from the Baseline Journal contributor page.';
        link.href='mailto:info@thegreensolve.com?subject='+
          encodeURIComponent('Baseline Journal contribution \\u2014 article pitch')+
          '&body='+encodeURIComponent(body);
      };
      Array.prototype.forEach.call(fields,function(f){f.addEventListener('input',build);});
      build();
    }
  }
})();
</script>"""


def dehydrate(doc: str) -> str:
    """Remove the SPA layer. The server-rendered HTML already contains the whole page."""
    doc = re.sub(r'<link rel="modulepreload"[^>]*/>', "", doc)
    doc = re.sub(r'<script class="\$tsr".*?</script>', "", doc, flags=re.S)
    doc = re.sub(r'<script type="module" async="" src="/assets/index-[^"]*"></script>', "", doc)
    doc = re.sub(r'<script>\(function\(a,f\).*?</script>', "", doc, flags=re.S)
    assert "$_TSR" not in doc and "modulepreload" not in doc
    return doc


def meta_of(slug):
    src = (ART / f"{slug}.md").read_text(encoding="utf-8")
    fm = re.match(r"---\n(.*?)\n---\n", src, re.S).group(1)
    out = {}
    for line in fm.splitlines():
        k, _, v = line.partition(":")
        v = v.strip()
        out[k.strip()] = json.loads(v) if v.startswith(('"', "[")) else v
    page = (OUT / "blog" / slug / "index.html").read_text(encoding="utf-8")
    out["mins"] = re.search(r'<span class="opacity-80">(\d+)<!-- --> min read</span>', page).group(1)
    return out


def img(slug, cls, eager=False):
    load = 'loading="eager" fetchpriority="high"' if eager else 'loading="lazy"'
    return (f'<img src="/og/{slug}.jpg" alt="" width="1200" height="630" {load} '
            f'decoding="async" class="{cls}"/>')


live_blog = (LIVE / "blog_live.html").read_text(encoding="utf-8")
posts = {s: meta_of(s) for s, _ in NEW}

# ---------------------------------------------------------------- /blog ----
doc = live_blog

# 1. banner on the featured card, straight after its overlay link
feat_anchor = re.search(r'(<article id="latest".*?</a>)', doc, re.S).group(1)
doc = doc.replace(feat_anchor, feat_anchor + img(FEATURED, "tgs-featured-img", eager=True), 1)

# 2. existing grid cards: tag them for the filter and give each its banner
grid_open = '<div class="mt-5 grid gap-5 sm:grid-cols-2">'
grid_start = doc.index(grid_open)
grid_end = doc.index("</div>", doc.rindex("</article>", grid_start))
grid_html = doc[grid_start + len(grid_open):grid_end]
cards = re.findall(r"<article.*?</article>", grid_html, re.S)
assert len(cards) == 4, len(cards)
rebuilt = []
for card in cards:
    slug = re.search(r'href="/blog/([^"]+)"', card).group(1)
    tag = re.search(r'tracking-widest text-muted-foreground"><span>([^<]+)</span>', card).group(1)
    card = card.replace("<article ", f'<article data-tag="{tag}" ', 1)
    anchor = re.search(r"(<a aria-label.*?</a>)", card, re.S).group(1)
    rebuilt.append(card.replace(anchor, anchor + img(slug, "tgs-card-img"), 1))

# 3. cards for the new articles, newest first
card_tpl = cards[0]
new_cards = []
for slug, tag in NEW:
    m = posts[slug]
    title = html.escape(m["title"])
    new_cards.append(
        f'<article data-tag="{tag}" class="group relative flex flex-col rounded-2xl border-2 '
        f'border-foreground/15 bg-card p-6 transition hover:-translate-y-0.5 hover:border-foreground/40">'
        f'<a aria-label="Read {title}" href="/blog/{slug}" class="absolute inset-0 rounded-2xl"></a>'
        + img(slug, "tgs-card-img")
        + '<div class="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest '
          f'text-muted-foreground"><span>{tag}</span><span>{m["mins"]}<!-- --> min</span></div>'
          f'<h3 class="tgs-h2 mt-3 text-balance group-hover:underline">{title}</h3>'
          f'<p class="mt-2 flex-1 text-sm text-muted-foreground">{html.escape(m["meta_description"])}</p>'
          '<p class="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">'
          '<a href="/blog/author/ankita-patwa" class="relative z-10 underline decoration-2 '
          f'underline-offset-4 hover:opacity-80">Ankita Patwa</a> · <!-- -->{DATE_SHORT}</p></article>')
doc = doc[:grid_start] + '<div id="tgs-grid" class="mt-5 grid gap-5 sm:grid-cols-2">' \
      + "".join(new_cards + rebuilt) + doc[grid_end:]

# 4. "N articles by Ankita" block on the listing page
li_cls = re.search(r'<ul class="mt-3 grid gap-2"><li><a href="/blog/[^"]+" class="([^"]+)"', doc).group(1)
items = "".join(
    f'<li><a href="/blog/{s}" class="{li_cls}">{html.escape(posts[s]["title"])}</a></li>' for s, _ in NEW)
old_block = re.search(r'<h3 class="font-display text-base font-bold">1<!-- --> <!-- -->article'
                      r'<!-- --> by Ankita</h3><ul class="mt-3 grid gap-2">(<li>.*?</li>)</ul>', doc, re.S)
doc = doc.replace(old_block.group(0),
                  '<h3 class="font-display text-base font-bold">6<!-- --> <!-- -->articles'
                  '<!-- --> by Ankita</h3><ul class="mt-3 grid gap-2">'
                  + items + old_block.group(1) + "</ul>", 1)

doc = dehydrate(doc).replace("</head>", EXTRA_CSS + "</head>", 1).replace("</body>", EXTRA_JS + "</body>", 1)
(OUT / "blog").mkdir(parents=True, exist_ok=True)
(OUT / "blog" / "index.html").write_text(doc, encoding="utf-8")
print("blog/index.html", len(doc), "bytes,", len(new_cards) + len(rebuilt), "cards")

# ------------------------------------------------- /blog/author/ankita ----
doc = (LIVE / "author_ankita.html").read_text(encoding="utf-8")
old_h = re.search(r'<h2 class="tgs-h1 mt-14">1<!-- --> <!-- -->article<!-- --> by <!-- -->Ankita Patwa</h2>'
                  r'<div class="mt-5 grid gap-5">(<a href=.*?</a>)</div>', doc, re.S)
existing_card = old_h.group(1)
link_cls = re.search(r'<a href="/blog/[^"]+" class="([^"]+)"', existing_card).group(1)


def author_card(slug, tag, date, mins, title, dek):
    """One card: banner thumbnail on the left, text on the right."""
    return (f'<a href="/blog/{slug}" class="{link_cls} tgs-author-card">'
            + img(slug, "tgs-author-img")
            + '<div><div class="flex flex-wrap gap-3 font-mono text-xs uppercase tracking-widest '
              f'text-muted-foreground"><span>{tag}</span><span>{date}</span>'
              f'<span>{mins}<!-- --> min</span></div>'
              f'<h3 class="tgs-h2 mt-3 group-hover:underline">{title}</h3>'
              f'<p class="mt-2 text-sm text-muted-foreground">{dek}</p></div></a>')


# rebuild the existing card in the same shape, reusing its own copy
e_tag, e_date, e_mins = re.search(
    r'<span>([^<]+)</span><span>([^<]+)</span><span>(\d+)<!-- --> min</span>', existing_card).groups()
e_title = re.search(r'<h3 class="tgs-h2 mt-3 group-hover:underline">(.*?)</h3>', existing_card).group(1)
e_dek = re.search(r'<p class="mt-2 text-sm text-muted-foreground">(.*?)</p>', existing_card).group(1)
cards_html = [author_card(s_, t_, DATE_SHORT, posts[s_]["mins"], html.escape(posts[s_]["title"]),
                          html.escape(posts[s_]["meta_description"])) for s_, t_ in NEW]
cards_html.append(author_card(FEATURED, e_tag, e_date, e_mins, e_title, e_dek))
doc = doc.replace(old_h.group(0),
                  '<h2 class="tgs-h1 mt-14">6<!-- --> <!-- -->articles<!-- --> by <!-- -->Ankita Patwa</h2>'
                  '<div class="mt-5 grid gap-5">' + "".join(cards_html) + "</div>", 1)
doc = dehydrate(doc).replace("</head>", EXTRA_CSS + "</head>", 1)
(OUT / "blog" / "author" / "ankita-patwa").mkdir(parents=True, exist_ok=True)
(OUT / "blog" / "author" / "ankita-patwa" / "index.html").write_text(doc, encoding="utf-8")
print("blog/author/ankita-patwa/index.html", len(doc), "bytes, 6 cards")

# ------------------------------------------------------- /blog/authors ----
doc = (LIVE / "authors_live.html").read_text(encoding="utf-8")
old = '<p class="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">1<!-- --> <!-- -->article</p>'
assert doc.count(old) == 1
doc = dehydrate(doc.replace(old, old.replace("1<!-- --> <!-- -->article", "6<!-- --> <!-- -->articles")))
(OUT / "blog" / "authors").mkdir(parents=True, exist_ok=True)
(OUT / "blog" / "authors" / "index.html").write_text(doc, encoding="utf-8")
print("blog/authors/index.html", len(doc), "bytes")

# ------------------------- pages that only need the SPA layer removed ----
for name, dest in [("faq_live.html", "blog/faq"), ("author_tgs.html", "blog/author/tgs-editorial")] + [
        (f"post_{s}.html", f"blog/{s}") for s in
        ["carbon-credits-are-not-just-for-big-companies", "un-article-6-4-n2o-methodology",
         "what-jpmorgan-buying-removals-tells-smes", "scope-3-for-manufacturers-without-a-data-team",
         "india-and-us-reporting-what-changes"]]:
    doc = dehydrate((LIVE / name).read_text(encoding="utf-8"))
    (OUT / dest).mkdir(parents=True, exist_ok=True)
    (OUT / dest / "index.html").write_text(doc, encoding="utf-8")
    print(dest + "/index.html", len(doc), "bytes (static)")
