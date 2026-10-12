import { createFileRoute } from "@tanstack/react-router";
import { AUTHOR_LIST } from "../content/authors";
import { POSTS, SITE, postsByAuthor } from "../content/posts";

// Generated from the content files so new posts and authors are listed automatically.
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const newest = (dates: string[]) => dates.sort().at(-1);
        const entries: { loc: string; lastmod?: string | undefined }[] = [
          { loc: `${SITE}/` },
          { loc: `${SITE}/blog`, lastmod: newest(POSTS.map((p) => p.updated ?? p.date)) },
          ...POSTS.map((p) => ({ loc: `${SITE}/blog/${p.slug}`, lastmod: p.updated ?? p.date })),
          { loc: `${SITE}/blog/authors` },
          ...AUTHOR_LIST.map((a) => ({
            loc: `${SITE}/blog/authors/${a.slug}`,
            lastmod: newest(postsByAuthor(a.name).map((p) => p.updated ?? p.date)),
          })),
        ];
        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...entries.map(
            (e) =>
              `  <url>\n    <loc>${e.loc}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ""}\n  </url>`,
          ),
          "</urlset>",
          "",
        ].join("\n");
        return new Response(xml, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
