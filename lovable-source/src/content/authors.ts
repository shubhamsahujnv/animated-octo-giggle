import tgsLogo from "../assets/tgs-logo.png.asset.json";
import { POSTS } from "./posts";

/** One role in an author's work history, newest first. */
export type ExperienceEntry = {
  title: string;
  org: string;
  period: string;
  place?: string;
  note?: string;
};

export type AuthorProfile = {
  slug: string;
  name: string;
  role: string;
  description: string;
  bio: string[];
  image: string;
  linkedin: string;
  pronouns?: string;
  location?: string;
  experience?: ExperienceEntry[];
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
    role: "Founder & CEO, TheGreensolve",
    description:
      "Climate tech founder and carbon strategy specialist for manufacturing, working on the practical end of the problem: turning the emissions data a plant already produces into compliance, decarbonisation and carbon market decisions.",
    pronouns: "She/Her",
    location: "United States",
    bio: [
      "Climate tech founder and carbon strategy specialist for manufacturing. Ankita works on the practical end of the problem: turning the emissions data a plant already produces into compliance, decarbonisation and carbon market decisions.",
      "She founded TheGreensolve in 2025 to build a carbon intelligence platform that helps manufacturers measure emissions, quantify sustainability ROI and navigate compliance with confidence, and she leads the development of Baseline, the TGS platform for inventories, reduction projects and carbon credit screening.",
      "She writes from inside the industry rather than about it. Since 2022 she has worked at Foxconn, first as an Environmental Engineer in Lordstown, Ohio and since 2023 as an Environmental Manager. She is also a founding member of The Women in STEM Network.",
    ],
    experience: [
      {
        title: "Founder & CEO",
        org: "TheGreensolve",
        period: "2025 — present",
        note: "Building a carbon intelligence platform that helps manufacturers measure emissions, quantify sustainability ROI and navigate compliance with confidence.",
      },
      {
        title: "Environmental Manager",
        org: "Foxconn",
        period: "May 2023 — present",
        place: "On-site",
      },
      {
        title: "Environmental Engineer",
        org: "Foxconn",
        period: "May 2022 — May 2023",
        place: "Lordstown, Ohio, United States",
      },
      {
        title: "Founding Member",
        org: "The Women in STEM Network",
        period: "Mar 2025 — present",
        place: "Hertfordshire, England, United Kingdom · Remote",
      },
    ],
    // Drop the real portrait at public/authors/ankita-patwa.png to replace the
    // placeholder. It is used on the author page, the blog index author card and
    // every article byline, so one file updates all of them.
    image: "/authors/ankita-patwa.png",
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
