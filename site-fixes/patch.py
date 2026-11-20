import re, sys, json
O, P = 'original/', 'public_html/'
def sub1(s, old, new, count=1):
    n = s.count(old)
    assert n == count, f'{old[:60]!r} found {n}x, expected {count}'
    return s.replace(old, new)

# ---------- homepage ----------
s = open(O+'index.html', encoding='utf-8').read()
L = 'https://tgs-baseline.lovable.app/'
s = sub1(s, f'<link rel="canonical" href="{L}">', '<link rel="canonical" href="https://thegreensolve.com/">')
s = sub1(s, f'<meta property="og:url" content="{L}">', '<meta property="og:url" content="https://thegreensolve.com/">')
s = sub1(s, f'<meta property="og:image" content="{L}og-image.jpg">', '<meta property="og:image" content="https://thegreensolve.com/og-image.jpg">')
s = sub1(s, f'<meta name="twitter:image" content="{L}og-image.jpg">',
 '<meta name="twitter:image" content="https://thegreensolve.com/og-image.jpg">\n'
 '<meta name="twitter:title" content="Baseline | TGS Carbon Intelligence">\n'
 '<meta name="twitter:description" content="Monitor project feasibility, track Scope 1–3 emissions to ISO 14064, and screen decarbonization projects for carbon credit pathways.">')
assert 'lovable.app' not in s, 'lovable.app still present'
ld = {"@context":"https://schema.org","@graph":[
 {"@type":"Organization","@id":"https://thegreensolve.com/#org","name":"TheGreensolve","alternateName":"TGS","url":"https://thegreensolve.com/","logo":"https://thegreensolve.com/favicon.png","email":"info@thegreensolve.com","sameAs":["https://www.linkedin.com/company/the-green-solve/"]},
 {"@type":"WebSite","@id":"https://thegreensolve.com/#website","url":"https://thegreensolve.com/","name":"Baseline by TGS","publisher":{"@id":"https://thegreensolve.com/#org"}}]}
i = s.index('</head>'); s = s[:i] + '<script type="application/ld+json">\n'+json.dumps(ld, indent=1, ensure_ascii=False)+'\n</script>\n' + s[i:]
# pdf.js: load on demand
s = sub1(s, '<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js"></script>', '')
s = sub1(s, """  if(window.pdfjsLib){
    try{ pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC; }catch(e){}
  }""", """  // pdf.js is loaded only when a PDF is actually uploaded (keeps it off the page load)
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
s = sub1(s, """  function extractTextFromPdfFile(file){
    return new Promise(function(resolve, reject){
      if(!window.pdfjsLib){ reject(new Error('pdf-lib-unavailable')); return; }""",
"""  function extractTextFromPdfFile(file){
    return loadPdfJs().then(function(){ return new Promise(function(resolve, reject){
      if(!window.pdfjsLib){ reject(new Error('pdf-lib-unavailable')); return; }""")
s = sub1(s, """      reader.readAsArrayBuffer(file);
    });
  }

  function renderPermitStats(){""", """      reader.readAsArrayBuffer(file);
    }); });
  }

  function renderPermitStats(){""")
open('pdf_fn_check.txt','w').write(s[s.find('function extractTextFromPdfFile'):][:3000])
# broken BEE links -> BEE home page
s = sub1(s, 'https://beeindia.gov.in/en/approved-sectors-in-offset-mechanism-under-ccts-by-central-government', 'https://beeindia.gov.in/', 3)
s = sub1(s, 'https://beeindia.gov.in/en/programmes/perform-achieve-and-trade-pat', 'https://beeindia.gov.in/', 2)
open(P+'index.html','w',encoding='utf-8').write(s)

# ---------- netlow ----------
n = open(O+'netlow/index.html', encoding='utf-8').read()
n = sub1(n, f'<meta property="og:url" content="{L}"/>', '<meta name="robots" content="noindex, nofollow"/><link rel="canonical" href="https://thegreensolve.com/netlow"/><meta property="og:url" content="https://thegreensolve.com/netlow"/>')
n = sub1(n, f'<meta property="og:image" content="{L}og-image.jpg"/>', '<meta property="og:image" content="https://thegreensolve.com/og-image.jpg"/>')
n = sub1(n, f'<meta name="twitter:image" content="{L}og-image.jpg"/>', '<meta name="twitter:image" content="https://thegreensolve.com/og-image.jpg"/>')
assert 'lovable.app' not in n
open(P+'netlow/index.html','w',encoding='utf-8').write(n)

# ---------- llms.txt ----------
t = open(O+'llms.txt', encoding='utf-8').read()
t = re.sub(r'- \[Net-Low\]\(https://thegreensolve.com/netlow\)[^\n]*\n', '', t)
assert 'netlow' not in t
open(P+'llms.txt','w',encoding='utf-8').write(t)
print('patched ok')
