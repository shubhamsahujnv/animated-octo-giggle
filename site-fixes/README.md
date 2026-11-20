# thegreensolve.com: technical SEO fixes

Corrected files for the live site, ready to upload to Hostinger
(hPanel → Websites → thegreensolve.com → File Manager → `public_html`).

`original/` holds unchanged copies of the live files, downloaded on 20 Nov 2026,
for rollback. `patch.py` recreates `public_html/` from them.

## Upload these (replace the existing file at the same path)

| File in `public_html/` | What changed |
|---|---|
| `index.html` | Canonical, og:url, og:image and twitter:image now point to thegreensolve.com instead of tgs-baseline.lovable.app. Twitter title and description added. Organization + WebSite structured data added. pdf.js now loads only when someone uploads a PDF (tested: extraction works the same as before). The 5 broken beeindia.gov.in links now go to the BEE home page. |
| `netlow/index.html` | `noindex, nofollow` added so the sign-in app stays out of Google. Canonical and social tags fixed. |
| `sitemap.xml` | `<lastmod>` date added to every URL. |
| `llms.txt` | Net-Low line removed, since it's now noindexed. |
| `404.html` | **New file.** Shown for pages that don't exist. |
| `authors/ankita-patwa.png` | Resized from 692 px / 479 KB to 256 px / 93 KB. Same file name, so no page changes are needed. |

## Then edit `.htaccess`

Follow `htaccess-additions.txt`. It turns on real 404s, removes the duplicate
`/index.html` URLs, makes www redirect in one hop, and adds security headers.
**Download a backup of your current `.htaccess` first.** If anything breaks,
upload the backup again.

## After uploading

1. Open https://thegreensolve.com/ and a blog post to confirm they look normal.
2. Run the checks at the bottom of `htaccess-additions.txt`.
3. In Google Search Console: Sitemaps → resubmit `sitemap.xml`, then
   URL Inspection → `https://thegreensolve.com/` → Request indexing.

## Not in this folder

These are produced by the site's build in Lovable, so they need to be fixed
in the Lovable project and then rebuilt and uploaded again:

- Article titles over 60 characters, Twitter tags, and `dateModified` on articles
- Author page meta descriptions, FAQ page headings
- React hydration error #418 on /netlow
- The lovable.app URLs in `src/routes/__root.tsx` (otherwise the next build puts them back)
