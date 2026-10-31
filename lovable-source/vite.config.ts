// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Routes rendered to real HTML files at build time, so Apache/Hostinger can serve
// them with no Node.js process. Everything else (Net-Low, /auth) is client-only
// and is served through the SPA shell by the .htaccess fallback.
const PRERENDERED = [
  "/",
  "/blog",
  "/blog/faq",
  "/blog/authors",
  "/blog/author/ankita-patwa",
  "/blog/author/tgs-editorial",
  "/blog/carbon-credits-are-not-just-for-big-companies",
  "/blog/un-article-6-4-n2o-methodology",
  "/blog/what-jpmorgan-buying-removals-tells-smes",
  "/blog/scope-3-for-manufacturers-without-a-data-team",
  "/blog/india-and-us-reporting-what-changes",
];

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Client-only routes (/auth, /netlow/*) each get their own prerendered shell,
    // which boots the React app in the browser — no SPA-wide shell needed.
    pages: PRERENDERED.map((path) => ({ path, prerender: { enabled: true } })),
    prerender: { enabled: true, crawlLinks: true },
  },
});
