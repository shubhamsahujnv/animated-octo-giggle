import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/services/JsonLd";
import { ServicePage } from "@/components/services/ServicePage";
import {
  ENGAGEMENT_MODELS,
  ORGANIZATION_ID,
  SITE_URL,
  getService,
  serviceSlugs,
  type ServiceContent,
} from "@/lib/services";

/**
 * /services/[slug], one page per real capability.
 *
 * Statically generated, with `dynamicParams: false` so an unknown slug 404s at
 * build time rather than rendering an empty page. The five slugs are the
 * registry's, and nothing else resolves.
 */

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return serviceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const url = `${SITE_URL}/services/${service.slug}`;

  return {
    title: service.title,
    description: service.metaDescription,
    // Self-referencing canonical. The existing /services, /about and /contact
    // routes canonicalise to the homepage; these pages must not.
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: service.title,
      description: service.metaDescription,
      url,
      siteName: "Pixorama",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.metaDescription,
    },
  };
}

/** Service + BreadcrumbList + FAQPage for one page.
 *  Organization lives on the homepage and is referenced here by @id. */
function schemaFor(service: ServiceContent) {
  const url = `${SITE_URL}/services/${service.slug}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      // The keyword phrase, matching the H1. The breadcrumb below keeps the
      // brand label, which is what the nav shows.
      name: service.keywordPhrase,
      serviceType: service.serviceType,
      url,
      description: service.openingAnswer,
      dateModified: service.lastUpdated,
      provider: { "@id": ORGANIZATION_ID },
      areaServed: "Worldwide",
      audience: {
        "@type": "BusinessAudience",
        audienceType: service.audienceType,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Engagement models",
        itemListElement: ENGAGEMENT_MODELS.map((model) => ({
          "@type": "Offer",
          name: model,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: service.navLabel, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: service.faq.map((entry) => ({
        "@type": "Question",
        name: entry.q,
        acceptedAnswer: { "@type": "Answer", text: entry.a },
      })),
    },
  ];

  // Review / AggregateRating deliberately omitted: permitted only when the
  // reviews are real and shown on the page. Add once the Clutch reviews exist.
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <main id="main">
      <JsonLd data={schemaFor(service)} />
      <ServicePage service={service} />
    </main>
  );
}
