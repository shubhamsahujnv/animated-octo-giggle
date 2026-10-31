import { Link } from "@tanstack/react-router";
import { authorFor } from "../content/authors";
import { SITE } from "../content/posts";

export const OG_IMAGE = `${SITE}/og-image.jpg`;

export function seo(opts: { title: string; description: string; path: string; type?: string }) {
  const url = `${SITE}${opts.path}`;
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: opts.type ?? "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: opts.title },
      { name: "twitter:description", content: opts.description },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function jsonLd(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

export function faqLd(faqs: [string, string][]) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  });
}

export function fmtDate(d: string, month: "short" | "long" = "short") {
  return new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month,
    year: "numeric",
    timeZone: "UTC",
  });
}

const navCls = "opacity-80 hover:opacity-100 whitespace-nowrap";

export function BlogHeader() {
  return (
    <header className="border-b-2 border-foreground/10 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-5 gap-y-3 px-5 py-4">
        <Link to="/blog" className="font-display text-sm font-bold tracking-tight">
          The Baseline Journal <span className="opacity-70">by TheGreensolve</span>
        </Link>
        <nav
          aria-label="Blog navigation"
          className="flex w-full flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold sm:w-auto"
        >
          <a href="/" className={navCls}>Platform</a>
          <Link to="/blog" className={navCls} activeOptions={{ exact: true }} activeProps={{ className: "underline underline-offset-4" }}>Blog</Link>
          <Link to="/blog/authors" className={navCls} activeProps={{ className: "underline underline-offset-4" }}>Authors</Link>
          <Link to="/blog/faq" className={navCls} activeProps={{ className: "underline underline-offset-4" }}>FAQ</Link>
          <a href="/netlow" className={navCls}>Net-Low</a>
          <a href="/blog#write" className="whitespace-nowrap rounded-full bg-accent px-3 py-1.5 text-accent-foreground">
            Write with us
          </a>
        </nav>
      </div>
    </header>
  );
}

export function BlogFooter() {
  return (
    <footer className="border-t-2 border-foreground/10 bg-primary px-5 py-10 text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-display text-lg font-bold">The Baseline Journal</div>
          <p className="mt-1 max-w-md text-sm opacity-80">
            Published by TheGreensolve. Carbon intelligence for manufacturers, from Scope 1–3
            accounting to verified credit workflows.
          </p>
        </div>
        <div className="text-sm">
          <div className="font-mono text-xs uppercase tracking-widest opacity-70">Send inquiries here</div>
          <a className="underline" href="mailto:info@thegreensolve.com">info@thegreensolve.com</a>
        </div>
      </div>
      <nav
        aria-label="Journal footer links"
        className="mx-auto mt-7 flex max-w-6xl flex-wrap gap-x-5 gap-y-2 border-t border-primary-foreground/20 pt-5 text-sm font-semibold"
      >
        <a className="underline underline-offset-4" href="/">Platform</a>
        <Link className="underline underline-offset-4" to="/blog">Blog</Link>
        <Link className="underline underline-offset-4" to="/blog/authors">Authors</Link>
        <Link className="underline underline-offset-4" to="/blog/faq">FAQ</Link>
        <a className="underline underline-offset-4" href="mailto:info@thegreensolve.com">Contact</a>
      </nav>
    </footer>
  );
}

export function AuthorLink({ name, className }: { name: string; className?: string }) {
  const a = authorFor(name);
  return (
    <Link
      to="/blog/author/$slug"
      params={{ slug: a.slug }}
      className={className ?? "relative z-10 underline decoration-2 underline-offset-4 hover:opacity-80"}
    >
      {name}
    </Link>
  );
}

export function FaqList({ faqs }: { faqs: [string, string][] }) {
  return (
    <div className="mt-6 border-t border-foreground/15">
      {faqs.map(([question, answer]) => (
        <details key={question} className="group border-b border-foreground/15 py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-display font-semibold">
            {question}
            <span aria-hidden="true" className="text-xl leading-none transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 max-w-[60ch] text-sm leading-6 text-muted-foreground">{answer}</p>
        </details>
      ))}
    </div>
  );
}

export const BLOG_FAQS: [string, string][] = [
  ["What topics does The Baseline Journal cover?", "Carbon accounting under ISO 14064-1 and the GHG Protocol, Scope 1, 2 and 3 measurement, carbon credit eligibility and markets, and reporting rules in India and the United States, written for small and mid-sized manufacturers."],
  ["Who writes for the journal?", "The TGS editorial desk, TheGreensolve founder Ankita Patwa and invited contributors such as plant managers, sustainability leads, auditors, financiers and founders who have done the work they write about."],
  ["How can I contribute an article?", "Use the Write with us form on the blog page to send your name, company, working title and argument to our editors, then attach your draft. Contributions are invite-based, and pitches of 800 to 1,200 words with one clear argument work best."],
  ["What is the editorial and review process?", "Every piece is checked against primary sources, edited with the author for clarity and accuracy, and approved by the TGS editorial team before publishing. Contributors review the final version before it goes live under their name."],
  ["How often are new articles published?", "We publish new field notes regularly, typically a few times a month, with extra pieces when major policy or market changes land."],
  ["Can I share or quote articles?", "Yes. Share links freely and quote short passages with attribution to the author and The Baseline Journal by TheGreensolve, with a link to the original article. For republishing in full, contact the editors first."],
  ["How do I contact the editors?", "Email info@thegreensolve.com with your question, correction or pitch, and the editorial team will reply."],
];
