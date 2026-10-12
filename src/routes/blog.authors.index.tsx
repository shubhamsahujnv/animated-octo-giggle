import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthorAvatar } from "../components/author-avatar";
import { Breadcrumbs, SiteFooter, SiteHeader } from "../components/site-chrome";
import { AUTHOR_LIST } from "../content/authors";
import { postsByAuthor, SITE } from "../content/posts";
import { authorEntity, breadcrumbs, graph, organization } from "../lib/schema";

const PAGE_URL = `${SITE}/blog/authors`;
const TITLE = "Authors — The Baseline Journal";
const DESCRIPTION =
  "Meet the people behind The Baseline Journal: TheGreensolve founder Ankita Patwa and the TGS editorial desk, writing on carbon accounting and carbon markets for manufacturers.";

export const Route = createFileRoute("/blog/authors/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { property: "og:image", content: `${SITE}/og-image.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      {
        "script:ld+json": graph(
          organization(),
          {
            "@type": "CollectionPage",
            "@id": `${PAGE_URL}#page`,
            url: PAGE_URL,
            name: TITLE,
            description: DESCRIPTION,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: AUTHOR_LIST.map((a, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: authorEntity(a),
              })),
            },
          },
          breadcrumbs([
            ["Home", `${SITE}/`],
            ["Blog", `${SITE}/blog`],
            ["Authors", PAGE_URL],
          ]),
        ),
      },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
  component: AuthorsIndex,
});

function AuthorsIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-5xl px-5 pb-12 pt-6">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Blog", to: "/blog" },
              { label: "Authors" },
            ]}
          />
          <h1 style={{ color: "inherit" }} className="tgs-display mt-6 max-w-3xl text-balance">
            The people behind the journal.
          </h1>
          <p className="mt-4 max-w-2xl opacity-90">
            Every article is written by someone who has done the work: measuring emissions inside
            plants, screening projects for credits, or reading the rulebooks so you do not have to.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-5 py-12">
        <div className="grid gap-6">
          {AUTHOR_LIST.map((author) => {
            const posts = postsByAuthor(author.name);
            return (
              <article
                key={author.slug}
                className="grid gap-6 rounded-2xl border-2 border-foreground/15 bg-card p-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:p-8"
              >
                <AuthorAvatar author={author} className="size-24 text-2xl sm:size-28" />
                <div className="min-w-0">
                  <h2 className="tgs-h1">
                    <Link
                      to="/blog/authors/$slug"
                      params={{ slug: author.slug }}
                      className="hover:underline"
                    >
                      {author.name}
                    </Link>
                  </h2>
                  <p className="mt-1 font-display text-sm font-bold text-primary">{author.role}</p>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                    {author.description}
                  </p>
                  {posts.length ? (
                    <ul className="mt-5 grid gap-1.5 border-t-2 border-foreground/10 pt-4 text-sm">
                      {posts.slice(0, 3).map((p) => (
                        <li key={p.slug}>
                          <Link
                            to="/blog/$slug"
                            params={{ slug: p.slug }}
                            className="font-semibold underline decoration-2 underline-offset-4 hover:text-primary"
                          >
                            {p.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <Link
                    to="/blog/authors/$slug"
                    params={{ slug: author.slug }}
                    className="tgs-btn tgs-btn-sm mt-5"
                  >
                    View profile · {posts.length} {posts.length === 1 ? "article" : "articles"}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <section className="mt-12 rounded-2xl border-2 border-foreground bg-primary p-7 text-primary-foreground sm:p-10">
          <h2 style={{ color: "inherit" }} className="tgs-h1 max-w-xl text-balance">
            Done the work? Write about it.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 opacity-85">
            We publish plant managers, sustainability leads, auditors, financiers and founders under
            their own name, with a link back to their work.
          </p>
          <a href="/blog#write" className="tgs-btn mt-6 bg-accent text-accent-foreground">
            Pitch an article
          </a>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
