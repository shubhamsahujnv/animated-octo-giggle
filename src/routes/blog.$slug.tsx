import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AuthorAvatar } from "../components/author-avatar";
import { FaqList } from "../components/faq-list";
import { Breadcrumbs, SiteFooter, SiteHeader } from "../components/site-chrome";
import { authorByName } from "../content/authors";
import { faqsForPost, postBySlug, POSTS, SITE } from "../content/posts";
import { blogPosting, breadcrumbs, faqPage, graph, organization } from "../lib/schema";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = postBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.post;
    const url = `${SITE}/blog/${p.slug}`;
    return {
      meta: [
        ...(p.draft ? [{ name: "robots", content: "noindex, nofollow" }] : []),
        { title: `${p.title} — The Baseline Journal` },
        { name: "description", content: p.dek },
        { name: "author", content: p.author },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.dek },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: `${SITE}/og-image.jpg` },
        { property: "article:published_time", content: p.date },
        { property: "article:modified_time", content: p.updated ?? p.date },
        { property: "article:section", content: p.tag },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: `${SITE}/og-image.jpg` },
        ...(p.draft
          ? []
          : [
              {
                "script:ld+json": graph(
                  organization(),
                  blogPosting(p),
                  breadcrumbs([
                    ["Home", `${SITE}/`],
                    ["Blog", `${SITE}/blog`],
                    [p.title, url],
                  ]),
                  faqPage(faqsForPost(p), url),
                ),
              },
            ]),
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: Article,
});

function fmt(d: string) {
  return new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function Article() {
  const { post } = Route.useLoaderData();
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const headings = post.body
    .filter((line) => line.startsWith("## "))
    .map((line) => ({ label: line.slice(3), id: headingId(line.slice(3)) }));
  const author = authorByName(post.author);
  const faqs = faqsForPost(post);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {post.draft && (
        <div className="bg-accent px-5 py-3 text-center font-mono text-xs font-semibold uppercase tracking-widest text-accent-foreground">
          Draft preview — this article is not published and is hidden from the journal.
        </div>
      )}
      <SiteHeader />
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-6">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Blog", to: "/blog" },
              { label: post.title },
            ]}
          />
          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest">
            <span className="rounded-full bg-accent px-2.5 py-1 text-accent-foreground">
              {post.tag}
            </span>
            <time dateTime={post.date} className="opacity-80">
              {fmt(post.date)}
            </time>
            {post.updated ? (
              <span className="opacity-80">
                Updated <time dateTime={post.updated}>{fmt(post.updated)}</time>
              </span>
            ) : null}
            <span className="opacity-80">{post.readMins} min read</span>
          </div>
          <h1 style={{ color: "inherit" }} className="tgs-display mt-5 text-balance">
            {post.title}
          </h1>
          <p className="mt-4 text-lg opacity-90">{post.dek}</p>
          <p className="mt-6 text-sm font-semibold">
            By{" "}
            <Link
              to="/blog/authors/$slug"
              params={{ slug: author.slug }}
              rel="author"
              className="underline decoration-2 underline-offset-4"
            >
              {post.author}
            </Link>{" "}
            <span className="font-normal opacity-80">· {post.role}</span>
          </p>
        </div>
      </section>

      <main className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[12rem_minmax(0,1fr)_13rem] lg:gap-12">
        <aside className="order-2 lg:order-1">
          <div className="lg:sticky lg:top-8">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Related journal
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 lg:gap-8">
              {more.map((p, index) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group block border-t border-foreground/15 pt-4"
                >
                  <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                    {String(index + 1).padStart(2, "0")} · {p.tag}
                  </span>
                  <h3 className="mt-2 text-sm font-semibold leading-snug group-hover:underline">
                    {p.title}
                  </h3>
                  <span className="mt-2 block text-xs text-muted-foreground">
                    {p.readMins} min read
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <article className="order-1 min-w-0 lg:order-2">
          <details className="mb-8 border-y border-foreground/15 py-4 lg:hidden">
            <summary className="cursor-pointer font-mono text-xs font-semibold uppercase tracking-widest">
              On this page
            </summary>
            <nav aria-label="On this page" className="mt-4 flex flex-col gap-3">
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {heading.label}
                </a>
              ))}
              <a
                href="#frequently-asked-questions"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Frequently asked questions
              </a>
            </nav>
          </details>

          <div className="mx-auto max-w-[42rem]">
            {post.body.map((line, i) => {
              if (line.startsWith("## ")) {
                const label = line.slice(3);
                return (
                  <h2
                    key={i}
                    id={headingId(label)}
                    className="tgs-h1 mb-4 mt-12 scroll-mt-6 text-balance"
                  >
                    {label}
                  </h2>
                );
              }
              if (line.startsWith("> ")) {
                return (
                  <blockquote
                    key={i}
                    className="my-9 border-l-4 border-accent bg-card px-6 py-5 font-display text-lg font-semibold leading-relaxed"
                  >
                    {line.slice(2)}
                  </blockquote>
                );
              }
              return (
                <p key={i} className="mt-5 text-[1.05rem] leading-8 text-foreground/90">
                  {line}
                </p>
              );
            })}

            <section
              aria-labelledby="about-author"
              className="mt-16 border-y border-foreground/15 py-8"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <AuthorAvatar author={author} className="size-20 text-xl" />
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    About the author
                  </p>
                  <h3 id="about-author" className="mt-2 font-display text-xl font-bold">
                    <Link
                      to="/blog/authors/$slug"
                      params={{ slug: author.slug }}
                      rel="author"
                      className="hover:underline"
                    >
                      {author.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-muted-foreground">{author.role}</p>
                  <p className="mt-3 text-sm leading-6 text-foreground/80">{author.description}</p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                    <Link
                      to="/blog/authors/$slug"
                      params={{ slug: author.slug }}
                      className="underline underline-offset-4"
                    >
                      More from {author.kind === "Person" ? author.name.split(" ")[0] : author.name}
                    </Link>
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 underline underline-offset-4"
                    >
                      LinkedIn <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="frequently-asked-questions" className="mt-16">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Quick answers
              </p>
              <h2 id="frequently-asked-questions" className="tgs-h1 mt-2 scroll-mt-6">
                Frequently asked questions
              </h2>
              <FaqList faqs={faqs} />
            </section>

            <section className="mt-16 border-2 border-foreground bg-primary p-7 text-primary-foreground sm:p-10">
              <p className="font-mono text-xs uppercase tracking-widest opacity-75">
                From footprint to action
              </p>
              <h2 style={{ color: "inherit" }} className="tgs-h1 mt-3 max-w-xl">
                Turn your emissions data into a defensible next step.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 opacity-85">
                Build the inventory, compare the baseline and prepare your evidence for TGS review.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/#ghg" className="tgs-btn bg-accent text-accent-foreground">
                  Start your GHG inventory
                </a>
                <a
                  href="mailto:info@thegreensolve.com?subject=TGS%20carbon%20strategy%20conversation"
                  className="tgs-btn tgs-btn-on-dark"
                >
                  Talk to TGS
                </a>
              </div>
            </section>
          </div>
        </article>

        <aside className="order-3 hidden lg:block">
          <div className="sticky top-8 border-l border-foreground/15 pl-7">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              On this page
            </h2>
            <nav aria-label="On this page" className="mt-5 flex flex-col gap-4">
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className="text-sm font-medium leading-snug text-muted-foreground transition hover:text-foreground hover:underline"
                >
                  {heading.label}
                </a>
              ))}
              <a
                href="#frequently-asked-questions"
                className="text-sm font-medium leading-snug text-muted-foreground transition hover:text-foreground hover:underline"
              >
                Frequently asked questions
              </a>
            </nav>
          </div>
        </aside>
      </main>

      <SiteFooter />
    </div>
  );
}
