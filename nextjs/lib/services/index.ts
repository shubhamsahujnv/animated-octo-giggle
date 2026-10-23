import { assertServiceContent, type ServiceContent } from "./types";
import { cloudEngineeringServices } from "./content/cloud-engineering-services";
import { aiDevelopmentServices } from "./content/ai-development-services";
import { mobileAppDevelopment } from "./content/mobile-app-development";
import { productSoftwareEngineering } from "./content/product-software-engineering";
import { webDevelopmentServices } from "./content/web-development-services";

/**
 * Registry of service pages, in the order they should appear in nav and footer.
 *
 * Every entry passes through assertServiceContent, so the mechanically
 * checkable page rules: opening answer length, slug/title/H1 alignment, meta
 * description length, a metric on any confirmed case study, fail the build
 * rather than reaching review.
 */
export const SERVICES: readonly ServiceContent[] = [
  cloudEngineeringServices,
  aiDevelopmentServices,
  mobileAppDevelopment,
  productSoftwareEngineering,
  webDevelopmentServices,
].map(assertServiceContent);

const BY_SLUG = new Map(SERVICES.map((s) => [s.slug, s] as const));

// Cross-page check, which assertServiceContent cannot do on its own: every
// related-service slug must resolve. Without this a typo or a renamed slug
// silently drops the link, because relatedServices() filters what it cannot
// resolve.
for (const service of SERVICES) {
  for (const slug of service.relatedServices) {
    if (!BY_SLUG.has(slug)) {
      throw new Error(
        `service "${service.slug}": relatedServices points at "${slug}", which is not a registered service.`,
      );
    }
  }
}

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
