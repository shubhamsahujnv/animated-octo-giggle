"""Rebuild public_html/ (the files to upload) from original/ (the live files, untouched).

Run from site-fixes/:  python3 patch.py
Every replacement asserts how many times it matched, so nothing changes silently.
"""
import json
import re
import shutil
from pathlib import Path

O, P = Path('original'), Path('public_html')
SITE = 'https://thegreensolve.com'
LOV = 'https://tgs-baseline.lovable.app/'
VER = 'v1'  # bump when the extracted homepage assets change (they are cached for a year)

if P.exists():
    shutil.rmtree(P)


def read(rel):
    return (O / rel).read_text(encoding='utf-8')


def write(rel, text):
    out = P / rel
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(text, encoding='utf-8')


def sub(s, old, new, count=1):
    n = s.count(old)
    assert n == count, f'{old[:70]!r}: found {n}x, expected {count}'
    return s.replace(old, new)


def fix_lovable_urls(s):
    s = s.replace(LOV + 'og-image.jpg', SITE + '/og-image.jpg').replace(LOV, SITE + '/')
    assert 'tgs-baseline.lovable.app' not in s
    return s


SUMMARY = '<summary class="flex cursor-pointer list-none items-start justify-between gap-5 font-display font-semibold">'


def wrap_faq_questions(s, tag, count):
    """Put each FAQ question in a heading, matching the patched React component."""
    pat = re.compile(re.escape(SUMMARY) + r'(.*?)(<span aria-hidden="true")')
    s, n = pat.subn(lambda m: f'{SUMMARY}<{tag} style="font:inherit;margin:0">{m.group(1)}</{tag}>{m.group(2)}', s)
    assert n == count, f'faq summaries: {n}, expected {count}'
    return s


def edit_head(s, fn):
    i, j = s.index('<head>'), s.index('</head>')
    return s[:i] + fn(s[i:j]) + s[j:]


# ---------------------------------------------------------------- homepage
s = read('index.html')
s = sub(s, f'<link rel="canonical" href="{LOV}">', f'<link rel="canonical" href="{SITE}/">')
s = sub(s, f'<meta property="og:url" content="{LOV}">', f'<meta property="og:url" content="{SITE}/">')
s = sub(s, f'<meta property="og:image" content="{LOV}og-image.jpg">', f'<meta property="og:image" content="{SITE}/og-image.jpg">')
s = sub(s, f'<meta name="twitter:image" content="{LOV}og-image.jpg">',
        f'<meta name="twitter:image" content="{SITE}/og-image.jpg">\n'
        '<meta name="twitter:title" content="Baseline | TGS Carbon Intelligence">\n'
        '<meta name="twitter:description" content="Monitor project feasibility, track Scope 1–3 emissions to ISO 14064, '
        'and screen decarbonization projects for carbon credit pathways.">')
s = sub(s, '<link rel="apple-touch-icon" href="/favicon.png">', '<link rel="apple-touch-icon" href="/apple-touch-icon.png">')
assert 'lovable.app' not in s

# pdf.js: load only when a PDF is uploaded
s = sub(s, '<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js"></script>', '')
s = sub(s, """  if(window.pdfjsLib){
    try{ pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC; }catch(e){}
  }""", """  // pdf.js is loaded only when a PDF is actually uploaded, not on every page view
  var PDF_LIB_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js';
  var pdfLibPromise = null;
  function loadPdfJs(){
    if(window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
    if(pdfLibPromise) return pdfLibPromise;
    pdfLibPromise = new Promise(function(resolve, reject){
      var s = document.createElement('script');
      s.src = PDF_LIB_SRC;
      s.onload = function(){
        try{ pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC; }catch(e){}
        resolve(window.pdfjsLib);
      };
      s.onerror = function(){ pdfLibPromise = null; reject(new Error('pdf-lib-unavailable')); };
      document.head.appendChild(s);
    });
    return pdfLibPromise;
  }""")
s = sub(s, """  function extractTextFromPdfFile(file){
    return new Promise(function(resolve, reject){""", """  function extractTextFromPdfFile(file){
    return loadPdfJs().then(function(){ return new Promise(function(resolve, reject){""")
s = sub(s, """      reader.readAsArrayBuffer(file);
    });
  }

  function renderPermitStats(){""", """      reader.readAsArrayBuffer(file);
    }); });
  }

  function renderPermitStats(){""")

# broken Bureau of Energy Efficiency links (both pages now 404) -> BEE home page
s = sub(s, 'https://beeindia.gov.in/en/approved-sectors-in-offset-mechanism-under-ccts-by-central-government', 'https://beeindia.gov.in/', 3)
s = sub(s, 'https://beeindia.gov.in/en/programmes/perform-achieve-and-trade-pat', 'https://beeindia.gov.in/', 2)

# Organization + WebSite structured data (first </head>; a second one lives inside a JS string)
ld = {"@context": "https://schema.org", "@graph": [
    {"@type": "Organization", "@id": f"{SITE}/#org", "name": "TheGreensolve", "alternateName": "TGS",
     "url": f"{SITE}/", "logo": f"{SITE}/apple-touch-icon.png", "email": "info@thegreensolve.com",
     "sameAs": ["https://www.linkedin.com/company/the-green-solve/"]},
    {"@type": "WebSite", "@id": f"{SITE}/#website", "url": f"{SITE}/", "name": "Baseline by TGS",
     "publisher": {"@id": f"{SITE}/#org"}}]}
i = s.index('</head>')
s = s[:i] + '<script type="application/ld+json">\n' + json.dumps(ld, indent=1, ensure_ascii=False) + '\n</script>\n' + s[i:]

# Move the inline CSS and JS into cached files (same order, same position, same blocking behaviour)
n_css = n_js = 0
def ext_style(m):
    global n_css
    n_css += 1
    name = f'assets/baseline-home-{n_css}.{VER}.css'
    write(name, m.group(1))
    return f'<link rel="stylesheet" href="/{name}">'
s = re.sub(r'<style>(.*?)</style>', ext_style, s, flags=re.S)
def ext_script(m):
    global n_js
    n_js += 1
    name = f'assets/baseline-home-{n_js}.{VER}.js'
    write(name, m.group(1))
    return f'<script src="/{name}"></script>'
s = re.sub(r'<script>(.*?)</script>', ext_script, s, flags=re.S)
assert (n_css, n_js) == (3, 5), (n_css, n_js)
write('index.html', s)

# ---------------------------------------------------------------- React app bundle (blog, Net-Low, sign-in)
AUTHOR_DESC = {
    'ankita-patwa': 'Ankita Patwa, founder and CEO of TheGreensolve, writes on carbon strategy for manufacturers: '
                    'turning plant emissions data into credits and reports.',
    'tgs-editorial': 'The TGS editorial desk explains carbon accounting, industrial decarbonisation and climate '
                     'policy for small and mid-sized manufacturers.',
}
j = read('assets/index-CPOOPUfN.js')
j = sub(j, f'content:`{LOV}`', f'content:`{SITE}/`')
j = sub(j, f'content:`{LOV}og-image.jpg`', f'content:`{SITE}/og-image.jpg`', 2)
j = sub(j, 'title:`${t.title} — The Baseline Journal`', 'title:`${t.title} | TGS`')
j = sub(j, 'title:`${t.name}, ${t.role} — The Baseline Journal`', 'title:`${t.name}, ${t.role} | TGS`')
j = sub(j, 'datePublished:t.date,image:', 'datePublished:t.date,dateModified:t.updated??t.date,image:')
j = sub(j, 'description:`${t.description} Read every article by ${t.name} on The Baseline Journal.`.slice(0,300)',
        'description:' + json.dumps(AUTHOR_DESC) + '[t.slug]??`${t.description} Read every article by ${t.name} on The Baseline Journal.`.slice(0,300)')
j = sub(j, 'function $h({faqs:e}){', 'function $h({faqs:e,level:__lvl}){')
j = sub(j, "children:[e,(0,P.jsx)(`span`,{\"aria-hidden\":`true`,className:`text-xl leading-none transition-transform group-open:rotate-45`",
        "children:[(0,P.jsx)(__lvl||`h3`,{style:{font:`inherit`,margin:0},children:e}),(0,P.jsx)(`span`,{\"aria-hidden\":`true`,className:`text-xl leading-none transition-transform group-open:rotate-45`")
write('assets/index-CPOOPUfN.js', j)

f = read('assets/blog.faq-DGkZz2q0.js')
f = sub(f, '(0,a.jsx)(n,{faqs:r})', '(0,a.jsx)(n,{faqs:r,level:`h2`})')
write('assets/blog.faq-DGkZz2q0.js', f)

# ---------------------------------------------------------------- pre-rendered pages (must match the bundle)
ARTICLES = {
    'carbon-credits-are-not-just-for-big-companies': '2026-08-04',
    'un-article-6-4-n2o-methodology': '2026-07-21',
    'what-jpmorgan-buying-removals-tells-smes': '2026-06-30',
    'scope-3-for-manufacturers-without-a-data-team': '2026-05-19',
    'india-and-us-reporting-what-changes': '2026-04-12',
}
for slug, date in ARTICLES.items():
    rel = f'blog/{slug}/index.html'
    s = read(rel)
    s = edit_head(s, lambda h: sub(h, ' — The Baseline Journal', ' | TGS', 3))
    s = sub(s, f'"datePublished":"{date}",', f'"datePublished":"{date}","dateModified":"{date}",')
    s = wrap_faq_questions(s, 'h3', 3)
    write(rel, s)

for slug, desc in AUTHOR_DESC.items():
    rel = f'blog/author/{slug}/index.html'
    s = read(rel)
    s = edit_head(s, lambda h: sub(h, ' — The Baseline Journal"', ' | TGS"', 2).replace(' — The Baseline Journal</title>', ' | TGS</title>'))
    old = re.search(r'<meta name="description" content="([^"]*)"/>', s).group(1)
    s = sub(s, f'content="{old}"', f'content="{desc}"', 3)
    write(rel, s)

write('blog/index.html', wrap_faq_questions(read('blog/index.html'), 'h3', 3))
s = wrap_faq_questions(read('blog/faq/index.html'), 'h2', 7)
write('blog/faq/index.html', s)

for rel in ['auth/index.html'] + [str(p.relative_to(O)) for p in sorted((O / 'netlow').rglob('index.html'))]:
    write(rel, fix_lovable_urls(read(rel)))

# ---------------------------------------------------------------- small text files
t = read('llms.txt')
t, n = re.subn(r'- \[Net-Low\]\(https://thegreensolve.com/netlow\)[^\n]*\n', '', t)
assert n == 1
write('llms.txt', t)

lastmod = {'': '2026-11-05', 'blog': '2026-11-05', **{f'blog/{k}': v for k, v in ARTICLES.items()},
           'blog/authors': '2026-11-05', 'blog/author/ankita-patwa': '2026-11-05',
           'blog/author/tgs-editorial': '2026-11-05', 'blog/faq': '2026-11-05'}
write('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
      + ''.join(f'  <url>\n    <loc>{SITE}/{k}</loc>\n    <lastmod>{v}</lastmod>\n  </url>\n' for k, v in lastmod.items())
      + '</urlset>\n')

for extra in ['404.html', '.htaccess']:
    shutil.copy(Path('new') / extra, P / extra)
for binary in ['authors/ankita-patwa.png', 'apple-touch-icon.png']:
    (P / binary).parent.mkdir(parents=True, exist_ok=True)
    shutil.copy(Path('new') / binary, P / binary)

# ================================================================ round 2 (remaining issues)
def rP(rel): return (P / rel).read_text(encoding='utf-8')
def wP(rel, text): (P / rel).write_text(text, encoding='utf-8')
TAP_CSS = '<link rel="stylesheet" href="/assets/tgs-tap-targets.v1.css"/>'
DESC = {  # fuller meta descriptions for the two articles whose dek is under 110 characters
    'carbon-credits-are-not-just-for-big-companies':
        'The smallest factory on the street can hold a credit-eligible project. Most never find out. What qualifies, what blocks SMEs and where to start.',
    'scope-3-for-manufacturers-without-a-data-team':
        'Fifteen categories, one spreadsheet and no analyst. The sequence that gets a manufacturer a defensible Scope 3 number without a data team.',
}
AUTHORS_LD = {"@context": "https://schema.org", "@type": "CollectionPage", "name": "Authors — The Baseline Journal by TGS",
              "url": f"{SITE}/blog/authors",
              "mainEntity": {"@type": "ItemList", "itemListElement": [
                  {"@type": "ListItem", "position": 1, "url": f"{SITE}/blog/author/ankita-patwa", "name": "Ankita Patwa"},
                  {"@type": "ListItem", "position": 2, "url": f"{SITE}/blog/author/tgs-editorial", "name": "TGS Editorial"}]}}
AUTHORS_LD_JSON = json.dumps(AUTHORS_LD, ensure_ascii=False, separators=(',', ':'))

# main bundle: per-article social image, fuller descriptions, authors page schema
j = rP('assets/index-CPOOPUfN.js')
j = sub(j, '{property:`og:image`,content:Wh}', '{property:`og:image`,content:e.image??Wh}')
j = sub(j, '{name:`twitter:image`,content:Wh}', '{name:`twitter:image`,content:e.image??Wh}')
j = sub(j, 'description:t.dek,path:`/blog/${t.slug}`,type:`article`',
        'description:' + json.dumps(DESC, ensure_ascii=False) + '[t.slug]??t.dek,path:`/blog/${t.slug}`,type:`article`,image:`${Lh}/og/${t.slug}.jpg`')
j = sub(j, 'image:`${Lh}/og-image.jpg`,mainEntityOfPage', 'image:`${Lh}/og/${t.slug}.jpg`,mainEntityOfPage')
j = sub(j, 'ig=Is(`/blog/authors`)({head:()=>Gh({', 'ig=Is(`/blog/authors`)({head:()=>({scripts:[Kh(' + AUTHORS_LD_JSON + ')],...Gh({')
j = sub(j, 'path:`/blog/authors`}),component:', 'path:`/blog/authors`})}),component:')
wP('assets/index-CPOOPUfN.js', j)

# avatar images get width/height so the browser reserves their space
IMG = {
    'assets/blog._slug-DWMgzRWd.js': ('(0,u.jsx)(`img`,{src:h.image,alt:h.name,', 80),
    'assets/blog.author._slug-CZy-b9qF.js': ('(0,s.jsx)(`img`,{src:e.image,alt:e.name,', 128),
    'assets/blog.authors-CGuBXbSk.js': ('(0,o.jsx)(`img`,{src:e.image,alt:e.name,', 80),
    'assets/blog.index-D13TUyN9.js': ('(0,p.jsx)(`img`,{src:g.image,alt:`Ankita Patwa`,', 128),
}
for rel, (old, size) in IMG.items():
    write(rel, sub(read(rel), old, old + f'width:{size},height:{size},'))
def size_imgs(s):
    for cls, size in (('size-20 shrink-0', 80), ('h-32 w-32', 128), ('h-28 w-28', 128)):
        s = re.sub(r'(<img src="[^"]+" alt="[^"]+")( class="' + cls + ')', r'\1' + f' width="{size}" height="{size}"' + r'\2', s)
    return s

blog_pages = sorted(str(p.relative_to(O)) for p in (O / 'blog').rglob('index.html'))
for rel in blog_pages:
    s = rP(rel) if (P / rel).exists() else read(rel)
    s = size_imgs(s)
    slug = rel.split('/')[1]
    if slug in ARTICLES:
        img = f'{SITE}/og/{slug}.jpg'
        s = edit_head(s, lambda h: sub(sub(h, '<meta property="og:image" content="https://thegreensolve.com/og-image.jpg"/>', f'<meta property="og:image" content="{img}"/>'),
                                       '<meta name="twitter:image" content="https://thegreensolve.com/og-image.jpg"/>', f'<meta name="twitter:image" content="{img}"/>'))
        s = sub(s, '"image":"https://thegreensolve.com/og-image.jpg"', f'"image":"{img}"')
        if slug in DESC:
            dek = re.search(r'<meta name="description" content="([^"]*)"/>', s).group(1)
            s = edit_head(s, lambda h: h.replace(f'content="{dek}"', f'content="{DESC[slug]}"'))
            assert s.count(f'content="{DESC[slug]}"') == 3
    if rel == 'blog/authors/index.html':
        s = edit_head(s, lambda h: sub(h, '<link rel="canonical" href="https://thegreensolve.com/blog/authors"/>',
              '<link rel="canonical" href="https://thegreensolve.com/blog/authors"/><script type="application/ld+json">' + AUTHORS_LD_JSON + '</script>'))
    write(rel, s)

# tap-target stylesheet on every page
for rel in blog_pages + ['auth/index.html'] + [str(p.relative_to(O)) for p in sorted((O / 'netlow').rglob('index.html'))]:
    wP(rel, sub(rP(rel), '</head>', TAP_CSS + '</head>'))
h = rP('index.html')
i = h.index('</head>'); wP('index.html', h[:i] + '<link rel="stylesheet" href="/assets/tgs-tap-targets.v1.css">\n' + h[i:])

for extra in ['favicon.ico', 'assets/tgs-tap-targets.v1.css'] + [f'og/{k}.jpg' for k in ARTICLES]:
    (P / extra).parent.mkdir(parents=True, exist_ok=True)
    shutil.copy(Path('new') / extra, P / extra)
print('ok:', sorted(str(p.relative_to(P)) for p in P.rglob('*') if p.is_file()))
