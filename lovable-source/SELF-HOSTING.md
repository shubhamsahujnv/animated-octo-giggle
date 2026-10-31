# Full React source of thegreensolve.com (Lovable project "Project Navigator")

Exported from the Lovable project `7cd52853-c5c0-4b1d-a47a-618f565cd191` at commit
`fcdb8c5635da41afdddaeb016a4364f4bba9edce` (latest as of 31 Oct 2026). All of the
project's files are here except `bun.lock`. That is Bun's lockfile, and `package-lock.json`
(npm) replaces it.

## What's inside

| Path | What it is |
|------|-----------|
| `index.html` | The "Baseline" carbon platform: a single 530 KB static page served at `/`. |
| `src/routes/index.tsx` | Serves `index.html` verbatim at `/`. |
| `src/routes/blog.*.tsx`, `src/content/` | "The Baseline Journal" blog: index, articles, authors, FAQ. |
| `src/routes/_authenticated/netlow*.tsx` | Net-Low employee dashboard (Supabase login required). |
| `src/routes/auth.tsx` | Sign-in / sign-up page for Net-Low. |
| `src/routes/api/public/*` | Server endpoints: AI baseline insights, Net-Low data-feed ingest. |
| `src/integrations/supabase/` | Supabase client, auth middleware and generated DB types. |
| `supabase/migrations/` | Full database schema, row-level security policies and seed emission factors. |
| `src/components/ui/` | shadcn/ui component kit (Lovable's copies; no page currently uses them). |
| `.lovable/` | Lovable's own planning notes. |

Stack: TanStack Start + React 19 + Vite 8 + Tailwind CSS 4, Supabase (Postgres, Auth, Storage).

## Run it locally

```sh
npm install
npm run dev        # http://localhost:3000 (or the port Vite prints)
npm run build      # production build into .output/
```

`.env` holds the Supabase URL and **publishable** key, which are safe to ship to browsers.
The data-feed endpoint (`/api/public/hooks/netlow-ingest`) also needs
`SUPABASE_SERVICE_ROLE_KEY`, and the AI insights endpoint needs `LOVABLE_API_KEY`. Neither
secret is in this export; Lovable keeps them server-side.

## Important: why only the home page shows on the live site

Lovable's build (Nitro) treats a root-level `index.html` as the HTML template for
**every** route. So on thegreensolve.com, `/blog`, `/netlow`, `/auth` and every other URL
return the same Baseline page, and the React blog and Net-Low pages never render. This
export keeps that behaviour exactly as it is.

To make the blog and Net-Low reachable, move the page out of the project root:

1. `mv index.html src/baseline.html`
2. In `src/routes/index.tsx`, change `"../../index.html?raw"` to `"../baseline.html?raw"`.

We tested this on a copy: `/` still serves the Baseline page, and `/blog`, the articles,
author pages and FAQ render as React pages. Unknown URLs then return a real 404.

## Hosting on Hostinger

* **Shared / Premium web hosting (Apache, no Node):** upload `../public_html/` (the static
  Baseline site). That reproduces today's live site. The React parts cannot run there.
* **Hostinger plans with Node.js apps (Business / Cloud) or a VPS:** build a Node server
  and run it:

  ```sh
  NITRO_PRESET=node-server npm run build
  node .output/server/index.mjs        # listens on $PORT (default 3000)
  ```

  Upload or clone the project, run the build there (or upload the `.output/` folder), and
  set the app's start command to `node .output/server/index.mjs`. Set the environment
  variables from `.env` (plus the two secrets above if you need those endpoints).

The Supabase database stays where it is (project `jwevmmwpmxpoodzxmwki`), so login and
Net-Low data keep working from any host. "Continue with Google" uses Lovable's OAuth
broker (`@lovable.dev/cloud-auth-js`) and may not work off Lovable without reconfiguring
Google sign-in directly in Supabase. Email and password sign-in works.

## Images

The logo and author photo were stored on Lovable's CDN under `/__l5e/assets-v1/…`. Copies
are in `src/assets/` and also in `public/__l5e/assets-v1/…`, so the existing URLs keep
working when self-hosted.
