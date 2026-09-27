# Deploying to Hostinger (Node.js)

This app is a server-rendered TanStack Start site. It builds to a standalone
Node.js server, so it needs a Hostinger plan with **Node.js web apps** (Business
or Cloud hosting, or a VPS) — plain shared hosting file upload will not work.

## Hostinger Node.js app settings

| Setting         | Value            |
| --------------- | ---------------- |
| Node.js version | 22.x (22.12+)    |
| Install command | `npm install`    |
| Build command   | `npm run build`  |
| Start command   | `npm start`      |
| Entry file      | `.output/server/index.mjs` (if asked) |

The server listens on the `PORT` environment variable, which Hostinger sets.

## Environment variables

`npm start` loads `.env` automatically if the file is uploaded. You can instead
add these in Hostinger's environment variable settings:

- `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`
  (needed at **build** time)
- `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_PROJECT_ID`
  (needed at **run** time)

## Images

Images are served from `public/images/`. Add Ankita's portrait as
`public/images/ankita-patwa.jpg` before deploying.

## Lovable-only features

These depend on Lovable's hosted services and may not work elsewhere:

- AI baseline insights (`/api/public/baseline-insights`) needs `LOVABLE_API_KEY`.
- Sign-in on `/auth` uses Lovable Cloud auth.

The public site and the blog do not depend on either.
