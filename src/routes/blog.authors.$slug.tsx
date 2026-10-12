import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AuthorAvatar } from "../components/author-avatar";
import { Breadcrumbs, SiteFooter, SiteHeader } from "../components/site-chrome";
import { authorBySlug } from "../content/authors";
import { postsByAuthor, SITE } from "../content/posts";
import { authorUrl, breadcrumbs, graph, organization, profilePage } from "../lib/schema";

export const Route = createFileRoute("/blog/authors/$slug")({
  loader: ({ params }) => {
    const author = authorBySlug(params.slug);
    if (!author) throw notFound();
    return { author, posts: postsByAuthor(author.name) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Author not found" }, { name: "robots", content: "noindex" }] };
    }
    const { author, posts } = loaderData;
    const url = authorUrl(author);
    const title = `${author.name}, ${author.role} — The Baseline Journal`;
    return {
      meta: [
        { title },
        { name: "description", content: author.description },
        { property: "og:title", content: title },
        { property: "og:description", content: author.description },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: url },
        { property: "og:image", content: `${SITE}/og-image.jpg` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: `${SITE}/og-image.jpg` },
        {
          "script:ld+json": graph(
            organization(),
            profilePage(author, posts),
            breadcrumbs([
              ["Home", `${SITE}/`],
              ["Blog", `${SITE}/blog`],
              ["Authors", `${SITE}/blog/authors`],
              [author.name, url],
            ]),
          ),
        },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: AuthorPage,
});

function fmt(d: string) {
  return new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function AuthorPage() {
  const { author, posts } = Route.useLoaderData();
  const topics = [...new Set(posts.map((p) => p.tag))];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-5xl px-5 pb-12 pt-6">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Blog", to: "/blog" },
              { label: "Authors", to: "/blog/authors" },
              { label: author.name },
            ]}
          />
          <div className="mt-8 grid gap-7 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-center">
            <AuthorAvatar author={author} className="size-28 text-3xl sm:size-36" />
            <div className="min-w-0">
              <span className="inline-block rounded-full bg-accent px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-accent-foreground">
                {author.kind === "Person" ? "Author" : "Editorial desk"}
              </span>
              <h1 style={{ color: "inherit" }} className="tgs-display mt-4 text-balance">
                {author.name}
              </h1>
              <p className="mt-2 font-display text-lg font-semibold opacity-90">{author.role}</p>
              <p className="mt-3 max-w-2xl opacity-90">{author.description}</p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-5xl gap-12 px-5 py-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="min-w-0">
          <section aria-labelledby="about-heading">
            <h2 id="about-heading" className="tgs-h1">
              About {author.kind === "Person" ? author.name.split(" ")[0] : "the desk"}
            </h2>
            {author.bio.map((para) => (
              <p key={para} className="mt-4 text-[1.05rem] leading-8 text-foreground/90">
                {para}
              </p>
            ))}
          </section>

          <section aria-labelledby="articles-heading" className="mt-14">
            <h2 id="articles-heading" className="tgs-h1">
              {posts.length} {posts.length === 1 ? "article" : "articles"} by {author.name}
            </h2>
            {posts.length === 0 ? (
              <p className="mt-4 text-muted-foreground">No published articles yet.</p>
            ) : (
              <div className="mt-6 grid gap-5">
                {posts.map((p) => (
                  <article
                    key={p.slug}
                    className="group relative rounded-2xl border-2 border-foreground/15 bg-card p-6 transition hover:-translate-y-0.5 hover:border-foreground/40"
                  >
                    <Link
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      aria-label={`Read ${p.title}`}
                      className="absolute inset-0 rounded-2xl"
                    />
                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      <span>{p.tag}</span>
                      <time dateTime={p.date}>{fmt(p.date)}</time>
                      <span>{p.readMins} min read</span>
                    </div>
                    <h3 className="tgs-h2 mt-3 text-balance group-hover:underline">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.dek}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="grid content-start gap-8">
          <section
            aria-labelledby="expertise-heading"
            className="rounded-2xl border-2 border-foreground/15 bg-card p-5"
          >
            <h2
              id="expertise-heading"
              className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Areas of expertise
            </h2>
            <ul className="mt-4 grid gap-2.5 text-sm font-semibold">
              {author.expertise.map((e) => (
                <li key={e} className="flex gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-2 shrink-0 rounded-full bg-primary"
                  />
                  {e}
                </li>
              ))}
            </ul>
          </section>

          {topics.length ? (
            <section aria-labelledby="topics-heading">
              <h2
                id="topics-heading"
                className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground"
              >
                Writes about
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {topics.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border-2 border-foreground/15 px-3 py-1 text-xs font-semibold"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section aria-labelledby="connect-heading">
            <h2
              id="connect-heading"
              className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Connect
            </h2>
            <div className="mt-3 grid gap-2 text-sm font-semibold">
              <a
                href={author.linkedin}
                target="_blank"
                rel="noreferrer me"
                className="underline decoration-2 underline-offset-4 hover:text-primary"
              >
                LinkedIn ↗
              </a>
              <a
                href="mailto:info@thegreensolve.com"
                className="underline decoration-2 underline-offset-4 hover:text-primary"
              >
                info@thegreensolve.com
              </a>
            </div>
          </section>

          <a href="/blog#write" className="tgs-btn tgs-btn-primary justify-center">
            Write for the journal
          </a>
        </aside>
      </main>

      <SiteFooter />
    </div>
  );
}
