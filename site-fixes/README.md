# thegreensolve.com: technical SEO fixes (applied 20 Nov 2026)

These fixes are **live** on thegreensolve.com (Hostinger, `public_html`).

| Folder | What it is |
|---|---|
| `original/` | The live files exactly as they were before the fixes. Use these to roll back. |
| `new/` | Hand-written new files: `.htaccess`, `404.html`, Apple touch icon, resized author photo. |
| `patch.py` | Builds `public_html/` from `original/` + `new/`. Every edit checks it matched. |
| `public_html/` | What was uploaded. |

The previous `.htaccess` is also saved on the server as `.htaccess.backup-2026-11-20`
(it can't be downloaded from the web). To roll back the server rules, rename it to `.htaccess`
in hPanel File Manager.

## What changed

- **Homepage:** canonical, og:url, og:image and twitter:image point to thegreensolve.com, not
  tgs-baseline.lovable.app. Organization + WebSite structured data added. Inline CSS and JS moved
  to cached files in `/assets/baseline-home-*.v1.*`, so the HTML is 84 KB instead of 532 KB
  (19 KB compressed). pdf.js loads only when a PDF is uploaded. 5 broken BEE links now go to
  beeindia.gov.in. The Apple touch icon is now a proper 180 px icon.
- **.htaccess:** unknown URLs return a real 404 with `404.html`. `/index.html`, `/blog/index.html`
  and trailing-slash URLs 301 to one version. `/netlow/*` and `/auth` send `X-Robots-Tag: noindex`.
  HSTS and X-Frame-Options headers added.
- **Blog (static HTML + `assets/index-CPOOPUfN.js` + `assets/blog.faq-*.js`, kept in sync so
  React hydration matches):** article and author titles end in "| TGS" (all under 60 characters),
  articles have `dateModified`, author meta descriptions trimmed to under 155 characters, FAQ
  questions are headings (h2 on /blog/faq, h3 elsewhere).
- **Net-Low and sign-in pages:** social tags no longer point at lovable.app.
- `sitemap.xml` has `<lastmod>`; `llms.txt` no longer lists Net-Low; author photo 479 KB → 93 KB.

## Important: the Lovable project

The blog and Net-Low pages are built by the Lovable project "Project Navigator". If that project
is rebuilt and uploaded again, it will overwrite the blog and app fixes. Before the next rebuild,
make the same changes in the source:

- `src/routes/__root.tsx`: og:url `https://thegreensolve.com/`, og:image and twitter:image
  `https://thegreensolve.com/og-image.jpg`
- Article head title: `${post.title} | TGS`; author head title: `${author.name}, ${author.role} | TGS`
- Article JSON-LD: add `dateModified`
- Author meta description: use the short versions in `patch.py` (`AUTHOR_DESC`)
- FAQ list component: wrap each question in a heading (`level` prop, h2 on the FAQ page)

The homepage (`index.html`), `.htaccess`, `404.html`, `sitemap.xml` and `llms.txt` are not built
by Lovable.
