import ankitaPortrait from "../assets/ankita-patwa.jpg.asset.json";
import tgsLogo from "../assets/tgs-logo.png.asset.json";
import { POSTS } from "./posts";

export type AuthorProfile = {
  slug: string;
  name: string;
  role: string;
  description: string;
  bio: string[];
  image: string;
  linkedin: string;
};

export const DEFAULT_AUTHOR: AuthorProfile = {
  slug: "tgs-editorial",
  name: "TGS Editorial",
  role: "TheGreensolve research desk",
  description:
    "The TGS editorial team translates carbon accounting, industrial decarbonisation and climate policy into clear decisions for small and mid-sized manufacturers.",
  bio: [
    "The TGS editorial team translates carbon accounting, industrial decarbonisation and climate policy into clear decisions for small and mid-sized manufacturers.",
    "The desk follows reporting rules in India and the United States, carbon market methodologies and the practical realities of plants in automotive parts, metals, electroplating, pharmaceuticals and laboratories. Every piece is reviewed against primary sources before it is published.",
  ],
  image: tgsLogo.url,
  linkedin: "https://www.linkedin.com/company/the-green-solve/",
};

export const AUTHORS: Record<string, AuthorProfile> = {
  "Ankita Patwa": {
    slug: "ankita-patwa",
    name: "Ankita Patwa",
    role: "Founder, TheGreensolve",
    description:
      "An environmental engineer and carbon strategy specialist helping manufacturers turn emissions data into practical compliance, decarbonisation and carbon market decisions.",
    bio: [
      "An environmental engineer and carbon strategy specialist helping manufacturers turn emissions data into practical compliance, decarbonisation and carbon market decisions.",
      "Ankita founded TheGreensolve to make credible carbon accounting reachable for small and mid-sized industrial companies, and leads the development of Baseline, the TGS platform for inventories, reduction projects and carbon credit screening.",
    ],
    image: ankitaPortrait.url,
    linkedin: "https://www.linkedin.com/in/ankita-patwa/",
  },
  "TGS Editorial": DEFAULT_AUTHOR,
};

export const AUTHOR_LIST: AuthorProfile[] = Object.values(AUTHORS);

export function authorFor(name: string): AuthorProfile {
  return AUTHORS[name] ?? DEFAULT_AUTHOR;
}

export function authorBySlug(slug: string) {
  return AUTHOR_LIST.find((a) => a.slug === slug);
}

/** Published posts only; drafts are never included. */
export function postsByAuthor(a: AuthorProfile) {
  return POSTS.filter((p) => authorFor(p.author).slug === a.slug);
}
