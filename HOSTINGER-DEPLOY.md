# TheGreensolve (thegreensolve.com): source code and Hostinger deployment

## Where this code comes from

thegreensolve.com is built and hosted on **Lovable** (project "Project Navigator",
`lovp_25gjgbx5ma85fabdrcxzs3e35j`, in the "Ankita's Lovable" workspace). This repository
holds its full source plus a ready-to-upload build.

| Folder | What it is |
|--------|-----------|
| **`hostinger-deploy/`** | **Upload this.** The whole site built as static files: Baseline home page, blog, Net-Low admin panel. Also packed as `thegreensolve-hostinger.zip`. |
| `lovable-source/` | The complete React source code (see `lovable-source/SELF-HOSTING.md`). |
| `public_html/` | The earlier home-page-only build, kept for reference. |

## What is in the combined build

One upload, no Node.js needed. Every page is a real file on disk:

| URL | What it serves |
|-----|----------------|
| `/` | `index.html` — the Baseline carbon platform, one self-contained page |
| `/blog`, `/blog/<article>`, `/blog/authors`, `/blog/author/<name>`, `/blog/faq` | Pre-rendered React pages: real HTML, so search engines and social previews read them |
| `/auth` | Net-Low sign-in and sign-up |
| `/netlow`, `/netlow/challenges`, `/log`, `/documents`, `/review`, `/company`, `/reports`, `/integrations` | The Net-Low admin panel, which boots in the browser and talks to your Supabase database |
| anything else | Falls back to the Baseline page, the same as the site does today |

This is a change from the live site, where **every** URL returns the Baseline page and the
blog and admin panel are unreachable. Both now work.

## Deploy to Hostinger (shared / Premium / Business — all work)

1. hPanel → **Websites** → your site → **File Manager** → open `public_html`.
2. Delete what is already in there (the placeholder `default.php`, or the previous upload).
3. Upload `thegreensolve-hostinger.zip` and **Extract** it inside `public_html`.
4. Turn on **Show hidden files** in File Manager and confirm `.htaccess` is present. The
   blog and admin panel URLs will not work without it.
5. hPanel → **Security → SSL**: install the free SSL certificate.
6. **Point the domain at Hostinger.** It currently points to Lovable (Cloudflare).
   * Registered at Hostinger: hPanel → Domains → DNS / Nameservers → use Hostinger's
     nameservers (`ns1.dns-parking.com`, `ns2.dns-parking.com`).
   * Elsewhere: at your registrar, set the `A` record for `@` and `www` to the IP in
     hPanel → Websites → Dashboard.
   * Then remove the custom domain from the Lovable project (Project Settings → Domains),
     so the two hosts do not fight over it.
7. Wait for DNS to propagate (minutes to a few hours), then open https://thegreensolve.com.

## Two things to know

**The admin panel needs your Supabase database.** Net-Low reads and writes Supabase project
`jwevmmwpmxpoodzxmwki`, which is unchanged and keeps running wherever the site is hosted, so
existing accounts and data keep working. Email-and-password sign-in works as-is. **"Continue
with Google" will not**, because it is routed through Lovable's login service: to keep it,
set Google sign-in up directly in Supabase (Authentication → Providers) and add
`https://thegreensolve.com` to the allowed redirect URLs.

**One Baseline feature needs a server.** The "AI insights" button on the Baseline calculator
calls `/api/public/baseline-insights`, which only exists on Lovable. On static hosting it
shows "Could not generate insights right now" and everything else keeps working. The same
applies to the Net-Low data-feed webhook, which is only shown as documentation text on the
Integrations page. To get both back, host `lovable-source/` as a Node.js app instead
(Business, Cloud or VPS) — see `lovable-source/SELF-HOSTING.md`.

## Rebuilding after a content change

Blog posts live in `lovable-source/src/content/posts.ts`; the Baseline page is
`lovable-source/src/baseline.html`. After editing:

```bash
cd lovable-source && npm install && npm run build
```

Then copy `.output/public/` over `hostinger-deploy/`, keeping `.htaccess`, and re-upload.
