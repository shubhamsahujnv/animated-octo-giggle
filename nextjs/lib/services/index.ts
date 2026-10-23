import { assertServiceContent, type ServiceContent } from "./types";
import { cloudPlatformEngineering } from "./content/cloud-platform-engineering";
import { aiDataIntelligence } from "./content/ai-data-intelligence";
import { mobileAppDevelopment } from "./content/mobile-app-development";
import { productSoftwareEngineering } from "./content/product-software-engineering";
import { digitalGrowthWeb } from "./content/digital-growth-web";

/**
 * Registry of service pages, in the order they should appear in nav and footer.
 *
 * Every entry passes through assertServiceContent, so the mechanically
 * checkable page rules — opening answer length, slug/title/H1 alignment, meta
 * description length, a metric on any confirmed case study — fail the build
 * rather than reaching review.
 */
export const SERVICES: readonly ServiceContent[] = [
  cloudPlatformEngineering,
  aiDataIntelligence,
  mobileAppDevelopment,
  productSoftwareEngineering,
  digitalGrowthWeb,
].map(assertServiceContent);

const BY_SLUG = new Map(SERVICES.map((s) => [s.slug, s] as const));

export const getService = (slug: string): ServiceContent | undefined => BY_SLUG.get(slug);

export const serviceSlugs = (): string[] => SERVICES.map((s) => s.slug);

/** Resolve the related-service slugs on a page to full entries, skipping any
 *  that are not registered. */
export const relatedServices = (service: ServiceContent): ServiceContent[] =>
  service.relatedServices
    .map((slug) => BY_SLUG.get(slug))
    .filter((s): s is ServiceContent => Boolean(s));

export * from "./types";
export { ENGAGEMENT_MODELS, ORGANIZATION_ID, SITE_URL, organizationSchema } from "./organization";
