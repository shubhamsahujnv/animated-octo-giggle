import { createFileRoute, Link } from "@tanstack/react-router";
import { AUTHOR_LIST, postsByAuthor } from "../content/authors";
import { BlogFooter, BlogHeader, seo } from "../components/blog-chrome";

export const Route = createFileRoute("/blog/authors")({
  head: () =>
    seo({
      title: "Authors — The Baseline Journal by TGS",
      description: "Meet the writers behind The Baseline Journal: TheGreensolve founder, the TGS editorial desk and invited industry voices.",
      path: "/blog/authors",
    }),
  component: AuthorsPage,
});

function AuthorsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeader />
      <main className="mx-auto max-w-6xl px-5 py-12">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">The Baseline Journal</p>
        <h1 className="tgs-display mt-3">Authors</h1>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {AUTHOR_LIST.map((a) => {
            const n = postsByAuthor(a).length;
            return (
              <Link key={a.slug} to="/blog/author/$slug" params={{ slug: a.slug }} className="group flex gap-5 rounded-2xl border-2 border-foreground/15 bg-card p-6 transition hover:-translate-y-0.5 hover:border-foreground/40">
                <img src={a.image} alt={a.name} className="size-20 shrink-0 rounded-full border-2 border-foreground object-cover" />
                <div className="min-w-0">
                  <h2 className="tgs-h2 group-hover:underline">{a.name}</h2>
                  <p className="mt-1 text-sm font-semibold text-muted-foreground">{a.role}</p>
                  <p className="mt-3 text-sm leading-6 text-foreground/80">{a.description}</p>
                  <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">{n} {n === 1 ? "article" : "articles"}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <BlogFooter />
    </div>
  );
}
