/**
 * The Organization node, declared once and referenced by @id from every
 * Service block. Keep this emitted on the homepage only; service pages
 * reference it rather than repeating it.
 */

export const SITE_URL = "https://pixoramagroup.com";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Pixorama",
  url: SITE_URL,
  foundingDate: "2022",
  description:
    "Engineering-led software company building cloud platforms, AI and data products, mobile apps and security-hardened systems for enterprises and funded startups.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: `${SITE_URL}/contact`,
  },
} as const;

/** The four delivery models, used in the form select and in Service schema. */
export const ENGAGEMENT_MODELS = [
  "Outcome-based project",
  "Dedicated squad",
  "Specialist augmentation",
  "Advisory & architecture",
] as const;
