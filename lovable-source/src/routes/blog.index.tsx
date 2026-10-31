import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthorLink, BLOG_FAQS, BlogFooter, BlogHeader, FaqList, faqLd, fmtDate, seo } from "../components/blog-chrome";
import { AUTHORS } from "../content/authors";
import { POSTS } from "../content/posts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    ...seo({
      title: "The Baseline Journal — carbon field notes by TGS",
      description:
        "Field notes on carbon accounting, credit eligibility and reporting for SMEs, written by TheGreensolve and invited contributors from industry.",
      path: "/blog",
    }),
    scripts: [faqLd(BLOG_FAQS.slice(0, 3))],
  }),
  component: BlogIndex,
});

const TAGS = ["All", "Carbon markets", "Policy", "Markets", "Practice", "Compliance"];
const fmt = (d: string) => fmtDate(d);

function BlogIndex() {
  const [tag, setTag] = useState("All");
  const featured = POSTS[0]!;
  const rest = tag === "All" ? POSTS.slice(1) : POSTS.filter((p) => p.tag === tag);
  const ankita = AUTHORS["Ankita Patwa"];
  const ankitaPosts = POSTS.filter((post) => post.author === "Ankita Patwa");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeader />

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-5xl px-5 pb-14 pt-10">
          <span className="inline-block rounded-full bg-accent px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-accent-foreground">
            The Baseline Journal
          </span>
          <h1 style={{ color: "inherit" }} className="tgs-display mt-5 max-w-3xl text-balance">
            Carbon writing for the companies that actually run the machines.
          </h1>
          <p className="mt-4 max-w-2xl text-base opacity-90">
            Short, specific field notes on measurement, credit eligibility and reporting, written by
            TheGreensolve and by invited voices from industry. No jargon tax, no hedging, no
            sponsored fog.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#latest" className="tgs-btn tgs-btn-primary bg-accent text-accent-foreground">
              Read the latest
            </a>
            <a href="#write" className="tgs-btn border-primary-foreground/40 text-primary-foreground">
              Contribute an article
            </a>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-5 py-12">
        <article
          id="latest"
          className="group relative rounded-2xl border-2 border-foreground/15 bg-card p-6 transition hover:-translate-y-0.5 hover:border-foreground/40 sm:p-9"
        >
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            aria-label={`Read ${featured.title}`}
            className="absolute inset-0 rounded-2xl"
          />
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="rounded-full bg-accent px-2.5 py-1 text-accent-foreground">Featured</span>
            <span>{featured.tag}</span>
            <span>{fmt(featured.date)}</span>
            <span>{featured.readMins} min</span>
          </div>
          <h2 className="tgs-h1 mt-4 text-balance group-hover:underline">{featured.title}</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">{featured.dek}</p>
          <p className="mt-5 text-sm font-semibold">
            <AuthorLink name={featured.author} /> <span className="font-normal text-muted-foreground">· {featured.role}</span>
          </p>
        </article>

        <h2 className="tgs-h2 mt-14">More from the journal</h2>
        <div role="group" aria-label="Filter by topic" className="mt-4 flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              aria-pressed={tag === t}
              className={`rounded-full border-2 px-3 py-1.5 text-sm font-semibold transition ${tag === t ? "border-foreground bg-primary text-primary-foreground" : "border-foreground/20 hover:border-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>
        {rest.length === 0 && <p className="mt-5 text-sm text-muted-foreground">No articles in this topic yet.</p>}
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {rest.map((p) => (
            <article
              key={p.slug}
              className="group relative flex flex-col rounded-2xl border-2 border-foreground/15 bg-card p-6 transition hover:-translate-y-0.5 hover:border-foreground/40"
            >
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                aria-label={`Read ${p.title}`}
                className="absolute inset-0 rounded-2xl"
              />
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span>{p.tag}</span>
                <span>{p.readMins} min</span>
              </div>
              <h3 className="tgs-h2 mt-3 text-balance group-hover:underline">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.dek}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <AuthorLink name={p.author} /> · {fmt(p.date)}
              </p>
            </article>
          ))}
        </div>

        {ankita ? (
          <section
            className="mt-16 rounded-2xl border-2 border-foreground/15 bg-card p-6 sm:p-9"
          >
            <div className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              About the author
            </div>
            <div className="mt-5 grid gap-7 sm:grid-cols-[8rem_minmax(0,1fr)] sm:items-start">
              <img
                src={ankita.image}
                alt="Ankita Patwa"
                className="h-28 w-28 rounded-full border-2 border-foreground object-cover sm:h-32 sm:w-32"
              />
              <div className="min-w-0">
                <h2 className="tgs-h2"><AuthorLink name={ankita.name} className="hover:underline" /></h2>
                <p className="mt-1 font-display text-sm font-bold text-primary">{ankita.role}</p>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {ankita.description}
                </p>
                <a
                  href={ankita.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex font-semibold underline decoration-2 underline-offset-4 hover:text-primary"
                >
                  View LinkedIn profile ↗
                </a>
              </div>
            </div>

            <div className="mt-7 border-t-2 border-foreground/10 pt-6">
              <h3 className="font-display text-base font-bold">
                {ankitaPosts.length} {ankitaPosts.length === 1 ? "article" : "articles"} by Ankita
              </h3>
              <ul className="mt-3 grid gap-2">
                {ankitaPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="font-semibold underline decoration-2 underline-offset-4 hover:text-primary"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className="mt-16">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Quick answers</p>
          <h2 className="tgs-h1 mt-2">Journal FAQs</h2>
          <FaqList faqs={BLOG_FAQS.slice(0, 3)} />
          <Link to="/blog/faq" className="mt-5 inline-flex font-semibold underline decoration-2 underline-offset-4 hover:text-primary">
            See all FAQs →
          </Link>
        </section>

        <ContributePanel />
      </main>

      <BlogFooter />
    </div>
  );
}

function ContributePanel() {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [title, setTitle] = useState("");
  const [angle, setAngle] = useState("");

  const mailto = () => {
    const subject = `Baseline Journal contribution — ${title || "article pitch"}`;
    const body = [
      `Name: ${name}`,
      `Company / role: ${org}`,
      "",
      `Working title: ${title}`,
      "",
      "The argument in three lines:",
      angle,
      "",
      "Draft attached / draft to follow.",
      "",
      "Sent from the Baseline Journal contributor page.",
    ].join("\n");
    return `mailto:info@thegreensolve.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      id="write"
      className="mt-16 scroll-mt-6 rounded-2xl border-2 border-foreground bg-primary p-6 text-primary-foreground sm:p-10"
    >
      <span className="inline-block rounded-full bg-accent px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-accent-foreground">
        Invited voices
      </span>
      <h2 style={{ color: "inherit" }} className="tgs-h1 mt-4 text-balance">Write one piece. Reach the people building it.</h2>
      <p className="mt-3 max-w-2xl opacity-90">
        The journal is invite-based. We publish plant managers, sustainability leads, auditors,
        financiers and founders who have done the thing they are writing about. Send the draft or
        the idea; if it is right for the readers, we edit it with you and publish it under your
        name, with your company and a link back to your work.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          ["800–1,200 words", "One argument, made properly. No listicles."],
          ["Your byline, your link", "Name, role, company and a link we keep live."],
          ["Shared everywhere", "Newsletter, LinkedIn and inside the Baseline platform."],
        ].map(([h, s]) => (
          <div key={h} className="rounded-xl border border-primary-foreground/25 p-4">
            <div className="font-display text-sm font-bold">{h}</div>
            <p className="mt-1 text-sm opacity-80">{s}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl bg-background p-5 text-foreground sm:p-6">
        <h3 className="tgs-h2">Start your draft</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill this in and we will prepare an email to our editors with your details. Attach the
          draft before you send it.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-semibold">
            Your name
            <input className="tgs-input mt-1" value={name} onChange={(e) => setName(e.target.value)} placeholder="Priya Menon" />
          </label>
          <label className="text-sm font-semibold">
            Company and role
            <input className="tgs-input mt-1" value={org} onChange={(e) => setOrg(e.target.value)} placeholder="Head of EHS, Nexa Components" />
          </label>
          <label className="text-sm font-semibold sm:col-span-2">
            Working title
            <input className="tgs-input mt-1" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What our first Scope 3 inventory got wrong" />
          </label>
          <label className="text-sm font-semibold sm:col-span-2">
            The argument in three lines
            <textarea className="tgs-input mt-1 min-h-28" value={angle} onChange={(e) => setAngle(e.target.value)} placeholder="What you learned, what it cost, what you would tell someone starting today." />
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a className="tgs-btn tgs-btn-primary" href={mailto()}>
            Prepare the email
          </a>
          <a className="tgs-btn" href="mailto:info@thegreensolve.com?subject=Baseline%20Journal%20contributor%20invite">
            Request a contributor invite
          </a>
        </div>
      </div>
    </section>
  );
}
