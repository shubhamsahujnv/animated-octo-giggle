/**
 * Service page content model.
 *
 * The `Slot` type is the important part. Every proof point on a service page —
 * case study numbers, named experts, price bands — is a Slot. A Slot is either
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
  /** At least one real, client-approved metric. Required — a case study without
   *  a number is not proof, so the type will not let you ship one. */
  readonly metrics: readonly string[];
  readonly quote?: { readonly text: string; readonly attribution: string };
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

export interface FaqEntry {
  readonly q: string;
  readonly a: string;
}

export interface BlogLink {
  readonly href: string;
  readonly label: string;
  /** Set when the strategy flags this post — e.g. a zero-volume listicle.
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
  /** URL segment. Also the key used in the registry. */
  readonly slug: string;
  /** Capability name as used in nav and footer. */
  readonly navLabel: string;
  /** <title>. Keep under ~60 characters. */
  readonly title: string;
  readonly metaDescription: string;
  /** Must open with the same words as navLabel — the strategy's slug/title/H1
   *  rule. Enforced by assertServiceContent(). */
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

  readonly caseStudy: Slot<CaseStudy>;
  readonly namedExpert: Slot<NamedExpert>;

  readonly costDrivers: readonly LabelledItem[];
  readonly priceBand: Slot<string>;

  readonly forWho: readonly string[];
  readonly notForWho: readonly string[];

  readonly faq: readonly FaqEntry[];

  readonly relatedServices: readonly string[];
  readonly blogLinks: readonly BlogLink[];

  /** ISO date (YYYY-MM-DD) shown as "Last updated" and emitted as
   *  schema.org dateModified. Bump it whenever the copy changes — a stale
   *  freshness date is worse than none. */
  readonly lastUpdated: string;

  /** schema.org Service.serviceType */
  readonly serviceType: string;
  /** schema.org audience.audienceType */
  readonly audienceType: string;

  /** The keyword this page is being aged toward. Documentation only — it does
   *  not affect rendering. */
  readonly targetKeyword?: TargetKeyword;

  /** Internal notes for reviewers. Never rendered. */
  readonly internalNotes?: readonly string[];
}

const WORD_MIN = 40;
const WORD_MAX = 60;

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

  // Title and H1 must both open with the capability name.
  const label = headingKey(c.navLabel);
  for (const [field, value] of [
    ["h1", c.h1],
    ["title", c.title],
  ] as const) {
    if (!headingKey(value).startsWith(label)) {
      throw new Error(
        `${where}: ${field} must open with "${c.navLabel}" (slug/title/H1 rule). Got: "${value}"`,
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
