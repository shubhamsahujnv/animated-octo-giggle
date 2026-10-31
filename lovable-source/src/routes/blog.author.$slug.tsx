import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { authorBySlug, postsByAuthor } from "../content/authors";
import { SITE } from "../content/posts";
import { BlogFooter, BlogHeader, fmtDate, jsonLd, seo } from "../components/blog-chrome";

export const Route = createFileRoute("/blog/author/$slug")({
  loader: ({ params }) => {
    const author = authorBySlug(params.slug);
    if (!author) throw notFound();
    return { author };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Author not found" }, { name: "robots", content: "noindex" }] };
    const a = loaderData.author;
    const base = seo({
      title: `${a.name}, ${a.role} — The Baseline Journal`,
      description: `${a.description} Read every article by ${a.name} on The Baseline Journal.`.slice(0, 300),
      path: `/blog/author/${a.slug}`,
      type: "profile",
    });
    return {
      ...base,
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Person",
          name: a.name,
          jobTitle: a.role,
          description: a.description,
          url: `${SITE}/blog/author/${a.slug}`,
          sameAs: [a.linkedin],
          worksFor: { "@type": "Organization", name: "TheGreensolve", url: SITE },
        }),
      ],
    };
  },
  component: AuthorPage,
});

function AuthorPage() {
  const { author: a } = Route.useLoaderData();
  const posts = postsByAuthor(a);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeader />
      <main className="mx-auto max-w-5xl px-5 py-12">
        <section className="grid gap-7 rounded-2xl border-2 border-foreground/15 bg-card p-6 sm:grid-cols-[9rem_minmax(0,1fr)] sm:p-9">
          <img src={a.image} alt={a.name} className="h-32 w-32 rounded-full border-2 border-foreground object-cover" />
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Author</p>
            <h1 className="tgs-display mt-2">{a.name}</h1>
            <p className="mt-2 font-display text-sm font-bold text-primary">{a.role}</p>
            {a.bio.map((b) => <p key={b} className="mt-4 max-w-2xl text-sm leading-6 text-foreground/80">{b}</p>)}
            <a href={a.linkedin} target="_blank" rel="noreferrer" className="mt-4 inline-flex font-semibold underline decoration-2 underline-offset-4 hover:text-primary">View LinkedIn profile ↗</a>
          </div>
        </section>
        <h2 className="tgs-h1 mt-14">{posts.length} {posts.length === 1 ? "article" : "articles"} by {a.name}</h2>
        <div className="mt-5 grid gap-5">
          {posts.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group block rounded-2xl border-2 border-foreground/15 bg-card p-6 transition hover:border-foreground/40">
              <div className="flex flex-wrap gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span>{p.tag}</span><span>{fmtDate(p.date)}</span><span>{p.readMins} min</span>
              </div>
              <h3 className="tgs-h2 mt-3 group-hover:underline">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.dek}</p>
            </Link>
          ))}
        </div>
      </main>
      <BlogFooter />
    </div>
  );
}
