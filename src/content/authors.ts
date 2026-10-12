import ankitaPortrait from "../assets/ankita-patwa.jpg.asset.json";
import tgsLogo from "../assets/tgs-logo.png.asset.json";

export type AuthorProfile = {
  name: string;
  role: string;
  description: string;
  image: string;
  linkedin: string;
};

export const DEFAULT_AUTHOR: AuthorProfile = {
  name: "TGS Editorial",
  role: "TheGreensolve research desk",
  description:
    "The TGS editorial team translates carbon accounting, industrial decarbonisation and climate policy into clear decisions for small and mid-sized manufacturers.",
  image: tgsLogo.url,
  linkedin: "https://www.linkedin.com/company/the-green-solve/",
};

export const AUTHORS: Record<string, AuthorProfile> = {
  "Ankita Patwa": {
    name: "Ankita Patwa",
    role: "Founder, TheGreensolve",
    description:
      "An environmental engineer and carbon strategy specialist helping manufacturers turn emissions data into practical compliance, decarbonisation and carbon market decisions.",
    image: ankitaPortrait.url,
    linkedin: "https://www.linkedin.com/in/ankita-patwa/",
  },
  "TGS Editorial": DEFAULT_AUTHOR,
};