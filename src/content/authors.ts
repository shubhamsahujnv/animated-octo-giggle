import ankitaPortrait from "../assets/ankita-patwa.jpg.asset.json";
import tgsLogo from "../assets/tgs-logo.png.asset.json";

export type AuthorProfile = {
  slug: string;
  name: string;
  role: string;
  /** "Person" for a named writer, "Organization" for a desk byline. Drives schema.org output. */
  kind: "Person" | "Organization";
  description: string;
  bio: string[]; // longer profile shown on the author page
  expertise: string[];
  image: string;
  linkedin: string;
};

export const DEFAULT_AUTHOR: AuthorProfile = {
  slug: "tgs-editorial",
  name: "TGS Editorial",
  role: "TheGreensolve research desk",
  kind: "Organization",
  description:
    "The TGS editorial team translates carbon accounting, industrial decarbonisation and climate policy into clear decisions for small and mid-sized manufacturers.",
  bio: [
    "TGS Editorial is the research desk behind The Baseline Journal. It tracks carbon-market methodologies, disclosure rules and the practical realities of measuring emissions inside working plants.",
    "Every editorial piece is written for the person who has to act on it: a plant manager, an EHS lead or a finance team answering a customer questionnaire. Articles are reviewed against primary sources before publication and updated when rules change.",
  ],
  expertise: [
    "Carbon markets and Article 6",
    "Scope 3 accounting for manufacturers",
    "India and US climate disclosure",
    "Carbon removal procurement",
  ],
  image: tgsLogo.url,
  linkedin: "https://www.linkedin.com/company/the-green-solve/",
};

const ANKITA: AuthorProfile = {
  slug: "ankita-patwa",
  name: "Ankita Patwa",
  role: "Founder, TheGreensolve",
  kind: "Person",
  description:
    "An environmental engineer and carbon strategy specialist helping manufacturers turn emissions data into practical compliance, decarbonisation and carbon market decisions.",
  bio: [
    "Ankita Patwa is the founder of TheGreensolve and an environmental engineer who works on carbon strategy for small and mid-sized manufacturers.",
    "Her work starts where most decarbonisation plans skip ahead: building a baseline a reviewer can trust. She helps plants pull Scope 1, 2 and 3 data out of invoices, meters and purchasing records, hold it to ISO 14064-1, and use it to price reduction projects and screen them for carbon credit pathways.",
    "In The Baseline Journal she writes about the practical side of that work: what to measure first, how to keep evidence attached to every number, and why smaller firms are better placed in carbon markets than they assume.",
  ],
  expertise: [
    "GHG inventories to ISO 14064-1",
    "Scope 1, 2 and 3 baselines",
    "Carbon credit eligibility screening",
    "Industrial decarbonisation planning",
  ],
  image: ankitaPortrait.url,
  linkedin: "https://www.linkedin.com/in/ankita-patwa/",
};

/** Keyed by the byline used in `Post.author`. */
export const AUTHORS: Record<string, AuthorProfile> = {
  [ANKITA.name]: ANKITA,
  [DEFAULT_AUTHOR.name]: DEFAULT_AUTHOR,
};

export const AUTHOR_LIST: AuthorProfile[] = [ANKITA, DEFAULT_AUTHOR];

export function authorByName(name: string) {
  return AUTHORS[name] ?? DEFAULT_AUTHOR;
}

export function authorBySlug(slug: string) {
  return AUTHOR_LIST.find((a) => a.slug === slug);
}
