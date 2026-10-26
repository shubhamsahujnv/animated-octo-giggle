/**
 * Service page content model.
 *
 * The `Slot` type is the important part. Every proof point on a service page: * case study numbers, named experts, price bands, is a Slot. A Slot is either
 * confirmed (and renders) or pending (and does not). There is deliberately no
 * third state, because the page strategy forbids publishing unconfirmed
 * numbers, logos and certifications: a page may ship with a proof slot removed,
 * never with one invented.
 *
 * Pending slots render nothing in production. In development they render a
 * visible marker so the gaps stay obvious while the pages are being reviewed.
 */

export interface SlotConfirmed<T> {
  readonly status: "confirmed";
  readonly value: T;
}

export interface SlotPending {
  readonly status: "pending";
  /** What is missing and who must approve it. Shown in development only. */
  readonly note: string;
}

export type Slot<T> = SlotConfirmed<T> | SlotPending;

export const confirmed = <T,>(value: T): SlotConfirmed<T> => ({ status: "confirmed", value });
export const pending = (note: string): SlotPending => ({ status: "pending", note });

export const isConfirmed = <T,>(slot: Slot<T>): slot is SlotConfirmed<T> =>
  slot.status === "confirmed";

/** Resolve a slot to its value, or undefined when still pending. */
export const slotValue = <T,>(slot: Slot<T> | undefined): T | undefined =>
  slot && slot.status === "confirmed" ? slot.value : undefined;

export interface CaseStudy {
  /** Client name, exactly as it may be used publicly. */
  readonly client: string;
  /** What was delivered. */
  readonly work: string;
  /** At least one real, client-approved metric. Required, a case study without
   *  a number is not proof, so the type will not let you ship one. */
  readonly metrics: readonly string[];
  readonly quote?: { readonly text: string; readonly attribution: string };
}

/**
 * A client Pixorama already names publicly, with the work described in its own
 * words. This is weaker proof than a case study, no numbers, but it is real,
 * already published, and costs nothing to confirm.
 *
 * `source` records where the claim is already live, so provenance stays
 * traceable and nobody has to re-litigate whether it was approved.
 */
export interface RosterEntry {
  readonly client: string;
  readonly work: string;
  readonly source: string;
}

export interface Testimonial {
  readonly quote: string;
  readonly attribution: string;
  readonly role?: string;
  readonly site?: string;
  readonly source: string;
}

export interface NamedExpert {
  readonly name: string;
  readonly role: string;
  readonly credentials: string;
}

export interface LabelledItem {
  readonly label: string;
  readonly detail: string;
}

export interface EngagementModel {
  readonly model: string;
  readonly fits: string;
}

/**
 * The page's H2s. They are data, not hard-coded in the component, because the
 * strategy requires close keyword variants in them ("Close variants go in the
 * body and H2s") and assertSectionHeadings() enforces it. Generic headings
 * like "What's included" carry no keyword and were the original defect.
 */
export interface SectionHeadings {
  readonly included: string;
  readonly process: string;
  readonly proof: string;
  readonly cost: string;
  readonly fit: string;
  readonly faq: string;
  readonly cta: string;
}

/** One step of the delivery process, rendered as an H3 under the process H2. */
export interface ProcessStep {
  readonly step: string;
  readonly detail: string;
}

export interface FaqEntry {
  readonly q: string;
  readonly a: string;
}

export interface BlogLink {
  readonly href: string;
  readonly label: string;
  /** Set when the strategy flags this post, e.g. a zero-volume listicle.
   *  Flagged posts are not rendered; the note explains why. */
  readonly flagged?: string;
}

export interface TargetKeyword {
  readonly phrase: string;
  readonly volumePerMonth: number;
  readonly market: string;
  /** Why it is not the slug yet. */
  readonly blockedOn: string;
}

export interface ServiceContent {
  /** URL segment. Also the key used in the registry. Must be the slugified
   *  form of keywordPhrase: enforced by assertServiceContent(). */
  readonly slug: string;

  /** The buyer wording this page is built on: the slug in words, and the words
   *  the title and H1 must open with. Distinct from navLabel because the two
   *  serve different jobs, this one has to match how buyers search. */
  readonly keywordPhrase: string;

  /** Capability name as used in nav, footer and CTAs. Pixorama's own brand
   *  language, which is not always what buyers type. */
  readonly navLabel: string;
  /** <title>. Keep under ~60 characters. */
  readonly title: string;
  readonly metaDescription: string;
  /** Must open with the same words as keywordPhrase, the strategy's
   *  slug/title/H1 rule. Enforced by assertServiceContent(). */
  readonly h1: string;
  readonly eyebrow: string;

  /** 40–60 words, directly under the H1, written to be quoted whole by an
   *  AI assistant. Word count enforced by assertServiceContent(). */
  readonly openingAnswer: string;

  /** Shown above the fold when confirmed. */
  readonly proofLine: Slot<string>;
  /** Used when proofLine is pending. Must contain no unverifiable claim. */
  readonly proofLineFallback: string;

  readonly included: readonly LabelledItem[];
  readonly timelines: readonly string[];
  readonly engagementModels: readonly EngagementModel[];

  /** Clients already named publicly, relevant to this service. Not a Slot:
   *  these are published facts, each carrying its own `source`. Empty is
   *  legitimate: it means no public engagement covers this service. */
  readonly clientRoster: readonly RosterEntry[];

  /** A real, already-published quote. Pending until one exists for this
   *  service; never paraphrased or composed. */
  readonly testimonial: Slot<Testimonial>;

  readonly caseStudy: Slot<CaseStudy>;
  readonly namedExpert: Slot<NamedExpert>;

  readonly costDrivers: readonly LabelledItem[];
  readonly priceBand: Slot<string>;

  readonly forWho: readonly string[];
  readonly notForWho: readonly string[];

  readonly headings: SectionHeadings;

  /** The numbered delivery process. Each step's name becomes an H3. */
  readonly process: readonly ProcessStep[];

  readonly faq: readonly FaqEntry[];

  readonly relatedServices: readonly string[];
  readonly blogLinks: readonly BlogLink[];

  /** ISO date (YYYY-MM-DD) shown as "Last updated" and emitted as
   *  schema.org dateModified. Bump it whenever the copy changes, a stale
   *  freshness date is worse than none. */
  readonly lastUpdated: string;

  /** schema.org Service.serviceType */
  readonly serviceType: string;
  /** schema.org audience.audienceType */
  readonly audienceType: string;

  /** The keyword this page is being aged toward. Documentation only; it does
   *  not affect rendering. */
  readonly targetKeyword?: TargetKeyword;

  /** Internal notes for reviewers. Never rendered. */
  readonly internalNotes?: readonly string[];
}

const WORD_MIN = 40;
const WORD_MAX = 60;

/**
 * Slugify a keyword phrase. Ampersands are dropped rather than expanded, so
 * "Product & Software Engineering" becomes "product-software-engineering"
 * rather than "product-and-software-engineering".
 */
export const slugifyPhrase = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Normalise an ampersand-or-"and" heading for the opening-words comparison. */
const headingKey = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Build-time guard for the page rules that are mechanically checkable.
 * Called once per service in the registry, so a violation fails the build
 * rather than reaching a reviewer.
 */
export function assertServiceContent(c: ServiceContent): ServiceContent {
  const where = `service "${c.slug}"`;

  const words = c.openingAnswer.trim().split(/\s+/).length;
  if (words < WORD_MIN || words > WORD_MAX) {
    throw new Error(
      `${where}: opening answer is ${words} words, must be ${WORD_MIN}–${WORD_MAX}.`,
    );
  }

  // The slug must be the slugified keyword phrase, so the URL and the heading
  // can never drift apart silently.
  const expectedSlug = slugifyPhrase(c.keywordPhrase);
  if (c.slug !== expectedSlug) {
    throw new Error(
      `${where}: slug must be the slugified keywordPhrase. Expected "${expectedSlug}" from "${c.keywordPhrase}".`,
    );
  }

  // Title and H1 must both open with the keyword phrase.
  const label = headingKey(c.keywordPhrase);
  for (const [field, value] of [
    ["h1", c.h1],
    ["title", c.title],
  ] as const) {
    if (!headingKey(value).startsWith(label)) {
      throw new Error(
        `${where}: ${field} must open with "${c.keywordPhrase}" (slug/title/H1 rule). Got: "${value}"`,
      );
    }
  }

  if (c.metaDescription.length > 160) {
    throw new Error(
      `${where}: meta description is ${c.metaDescription.length} chars, keep it under 160.`,
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(c.lastUpdated)) {
    throw new Error(`${where}: lastUpdated must be an ISO date (YYYY-MM-DD). Got: "${c.lastUpdated}"`);
  }

  if (c.faq.length === 0) throw new Error(`${where}: needs at least one FAQ entry.`);

  if (c.process.length < 3) {
    throw new Error(`${where}: the process section needs at least three steps.`);
  }

  // The rule the first draft broke: close variants belong in the H2s.
  // "Cloud Engineering Services" -> a heading must carry "cloud" or "engineering".
  //
  // "services" is dropped as too weak a match on its own; "ai" is kept despite
  // being two letters, because it is the whole distinctive term on that page.
  // Matching is on whole words, so "ai" does not match inside "chain".
  const stop = new Set(["and", "the", "for", "with", "of", "services"]);
  const terms = headingKey(c.keywordPhrase)
    .split(" ")
    .filter((w) => w.length > 1 && !stop.has(w));

  if (terms.length === 0) {
    throw new Error(`${where}: keywordPhrase "${c.keywordPhrase}" yields no distinctive terms.`);
  }

  const carries = (h: string) => {
    const words = new Set(headingKey(h).split(" "));
    return terms.some((t) => words.has(t));
  };

  const headings = Object.entries(c.headings) as [keyof SectionHeadings, string][];
  const withKeyword = headings.filter(([, h]) => carries(h));
  if (withKeyword.length < 5) {
    const missing = headings.filter(([, h]) => !carries(h)).map(([k]) => k);
    throw new Error(
      `${where}: only ${withKeyword.length} of ${headings.length} H2s carry a term from "${c.keywordPhrase}" (need 5). Generic: ${missing.join(", ")}.`,
    );
  }

  // The FAQ is where long-tail questions live, so most of them should name the
  // service the way a buyer would ask about it.
  const faqWithKeyword = c.faq.filter((f) => carries(f.q));
  if (faqWithKeyword.length < Math.ceil(c.faq.length / 2)) {
    throw new Error(
      `${where}: only ${faqWithKeyword.length} of ${c.faq.length} FAQ questions name the service. At least half should.`,
    );
  }

  // A roster entry without provenance is an unsourced claim about a real third
  // party, which is the thing this model exists to prevent.
  for (const entry of c.clientRoster) {
    if (!entry.client.trim() || !entry.work.trim() || !entry.source.trim()) {
      throw new Error(
        `${where}: every clientRoster entry needs a client, the work, and a source.`,
      );
    }
  }

  if (isConfirmed(c.testimonial) && !c.testimonial.value.source.trim()) {
    throw new Error(`${where}: a confirmed testimonial must record where it is published.`);
  }

  if (c.relatedServices.includes(c.slug)) {
    throw new Error(`${where}: relatedServices must not include itself.`);
  }

  // A confirmed case study without a metric is not proof.
  if (isConfirmed(c.caseStudy) && c.caseStudy.value.metrics.length === 0) {
    throw new Error(
      `${where}: a confirmed case study needs at least one approved metric, or it must stay pending.`,
    );
  }

  return c;
}
