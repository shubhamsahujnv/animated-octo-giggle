# TheGreensolve (thegreensolve.com): source code and Hostinger deployment

## Where this code comes from

thegreensolve.com is built and hosted on **Lovable** (project "Project Navigator",
`lovp_25gjgbx5ma85fabdrcxzs3e35j`, in the "Ankita's Lovable" workspace).

The live site is **one self-contained HTML file**. In the Lovable project, the `/` route
serves `index.html` as-is. Every URL on the live domain (`/`, `/blog`, `/netlow`, …)
returns that same page, and all of the CSS, JavaScript, logo and data are inline in it.
It has no backend: the visitor gate, the inventories and the contact form all save to
the visitor's browser (`localStorage`).

`public_html/` holds that live page, cleaned up for self-hosting:

| File | What it is |
|------|-----------|
| `index.html` | The full site (HTML + CSS + JS in one file) |
| `favicon.png`, `og-image.jpg` | Site icon and social-share image |
| `robots.txt`, `sitemap.xml`, `llms.txt` | SEO files, copied from the live site |
| `.htaccess` | Apache rules: HTTPS, www → bare domain, every path → `index.html` |

What changed compared with the copy Lovable serves:

* Removed the "Edit with Lovable" badge (its HTML, CSS and script).
* Removed Lovable's hosting-only analytics scripts (`/~flock.js` and `/__l5e/events…js`).
  They only work on Lovable's servers and would return 404 on Hostinger.
* Changed `og:url`, `og:image`, `twitter:image` and `canonical` from
  `tgs-baseline.lovable.app` to `thegreensolve.com`.

Everything else is byte-for-byte what is live today.

## Deploy to Hostinger (shared / Premium / Business hosting)

1. hPanel → **Websites** → your site → **File Manager** → open `public_html`.
2. Delete Hostinger's placeholder `default.php` / `index.php`, if present.
3. Upload `thegreensolve-hostinger.zip` and **Extract** it inside `public_html`
   (or upload the 7 files from `public_html/` directly). Make sure `.htaccess` is
   uploaded: File Manager hides dot-files unless "Show hidden files" is on.
4. hPanel → **Security → SSL**: install the free SSL certificate.
5. **Domain DNS.** The domain currently points to Lovable (Cloudflare). To move it:
   * If the domain is registered at Hostinger: hPanel → Domains → DNS / Nameservers →
     use Hostinger's nameservers (`ns1.dns-parking.com`, `ns2.dns-parking.com`).
   * Otherwise: at your registrar, set the `A` record for `@` and `www` to the IP
     shown in hPanel → Websites → Dashboard → "IP address".
   * Then, in Lovable, remove the custom domain from the project
     (Project Settings → Domains) so the two hosts don't conflict.
6. Wait for DNS to propagate (minutes to a few hours), then open https://thegreensolve.com.

## Editing the site later

All the content lives in `public_html/index.html`:

* Colours and fonts: the `:root { --bg … --tgs-gold … }` tokens near the top.
* Page text: search the file for the sentence you want to change.
* Re-zip and re-upload after editing, or edit the file directly in Hostinger's File Manager.

## Full React source (`lovable-source/`)

`lovable-source/` contains the complete Lovable codebase: the TanStack Start + React app
with the blog, the Net-Low dashboard, Supabase integration, database migrations and the
UI kit. It is also available as `thegreensolve-react-source.zip`. See
`lovable-source/SELF-HOSTING.md` for how to run it, why only the home page shows on the
live domain, and how to host it on a Hostinger Node.js plan.
