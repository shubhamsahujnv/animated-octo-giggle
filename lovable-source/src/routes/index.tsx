import { createFileRoute } from "@tanstack/react-router";

// The Baseline app is a finished, self-contained static HTML document.
// It is served verbatim at "/" — no React rendering, no rewriting.
export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: async () => {
        const { default: html } = await import("../../index.html?raw");
        return new Response(html, {
          headers: { "content-type": "text/html; charset=utf-8" },
        });
      },
    },
  },
  component: Index,
});

function Index() {
  return null;
}
