// schema.org JSON-LD builders for the public pages. Pass the result to a route's
// head() as `{ "script:ld+json": graph(...) }` and TanStack renders the <script>.
import type { AuthorProfile } from "../content/authors";
import { authorByName } from "../content/authors";
import type { Faq, Post } from "../content/posts";
import { SITE, wordCount } from "../content/posts";

type Node = Record<string, unknown>;

export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;
export const BLOG_ID = `${SITE}/blog#blog`;
export const OG_IMAGE = `${SITE}/og-image.jpg`;

export const authorUrl = (a: AuthorProfile) => `${SITE}/blog/authors/${a.slug}`;
export const postUrl = (p: Post) => `${SITE}/blog/${p.slug}`;
const authorId = (a: AuthorProfile) =>
  a.kind === "Person" ? `${authorUrl(a)}#person` : `${authorUrl(a)}#organization`;

const abs = (path: string) => (path.startsWith("http") ? path : `${SITE}${path}`);

export function graph(...nodes: Node[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function organization(): Node {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "TheGreensolve",
    alternateName: "TGS",
    url: `${SITE}/`,
    logo: { "@type": "ImageObject", url: `${SITE}/images/tgs-logo.png` },
    email: "info@thegreensolve.com",
    sameAs: ["https://www.linkedin.com/company/the-green-solve/"],
  };
}

export function website(): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE}/`,
    name: "Baseline by TheGreensolve",
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function breadcrumbs(items: [name: string, url: string][]): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, url], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: url,
    })),
  };
}

export function faqPage(faqs: Faq[], url: string): Node {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Full Person/Organization node for an author; used on the author page. */
export function authorEntity(a: AuthorProfile): Node {
  if (a.kind === "Organization") {
    return {
      "@type": "Organization",
      "@id": authorId(a),
      name: a.name,
      url: authorUrl(a),
      description: a.description,
      logo: abs(a.image),
      parentOrganization: { "@id": ORG_ID },
      knowsAbout: a.expertise,
    };
  }
  return {
    "@type": "Person",
    "@id": authorId(a),
    name: a.name,
    url: authorUrl(a),
    jobTitle: a.role.split(",")[0]?.trim() ?? a.role,
    description: a.description,
    image: abs(a.image),
    sameAs: [a.linkedin],
    worksFor: { "@id": ORG_ID },
    knowsAbout: a.expertise,
  };
}

/** Compact author reference for embedding in a BlogPosting. */
function authorRef(a: AuthorProfile): Node {
  return { "@type": a.kind, "@id": authorId(a), name: a.name, url: authorUrl(a) };
}

export function blogPosting(p: Post): Node {
  const url = postUrl(p);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: p.title,
    description: p.dek,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [OG_IMAGE],
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    author: authorRef(authorByName(p.author)),
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": BLOG_ID },
    articleSection: p.tag,
    wordCount: wordCount(p),
    timeRequired: `PT${p.readMins}M`,
    inLanguage: "en",
  };
}

/** Lightweight posting reference for lists (blog index, author page). */
export function blogPostingSummary(p: Post): Node {
  return {
    "@type": "BlogPosting",
    "@id": `${postUrl(p)}#article`,
    headline: p.title,
    url: postUrl(p),
    datePublished: p.date,
    author: authorRef(authorByName(p.author)),
  };
}

export function blog(posts: Post[]): Node {
  return {
    "@type": "Blog",
    "@id": BLOG_ID,
    name: "The Baseline Journal",
    description:
      "Practical carbon accounting, reporting and carbon-market guidance for small and mid-sized manufacturers.",
    url: `${SITE}/blog`,
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "en",
    blogPost: posts.map(blogPostingSummary),
  };
}

export function profilePage(a: AuthorProfile, posts: Post[]): Node {
  const url = authorUrl(a);
  return {
    "@type": "ProfilePage",
    "@id": `${url}#profile`,
    url,
    name: `${a.name} — The Baseline Journal`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: authorEntity(a),
    hasPart: posts.map(blogPostingSummary),
  };
}
