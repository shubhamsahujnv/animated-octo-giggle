import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/services/JsonLd";
import { SERVICES, SITE_URL } from "@/lib/services";

/**
 * /services — the hub for the five capability pages.
 *
 * This route currently serves homepage content under a homepage canonical and
 * is linked from nowhere (the nav uses /#capabilities). Replacing it with this
 * fixes the duplicate-content problem, gives the breadcrumbs an honest target,
 * and gives the nav something real to point at.
 */

const title = "Services | Pixorama";
const description =
  "Five engineering capabilities: cloud and platform, AI and data, mobile, product and software engineering, and digital growth and web.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/services` },
  robots: { index: true, follow: true },
};

export default function ServicesIndexPage() {
  return (
    <main id="main">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Services",
          url: `${SITE_URL}/services`,
          hasPart: SERVICES.map((service) => ({
            "@type": "Service",
            name: service.navLabel,
            url: `${SITE_URL}/services/${service.slug}`,
          })),
        }}
      />

      <section className="section" id="top">
        <div className="wrap">
          <div className="reveal head" style={{ transitionDelay: "0ms" }}>
            <span className="eyebrow">Capabilities</span>
            <h1>
              Five capabilities, <span className="gt">one engineering team.</span>
            </h1>
            <p className="lead">
              Senior-led, outcome-based, and built to be handed back to you.
            </p>
          </div>

          <ul className="reveal svc__index" style={{ transitionDelay: "60ms" }}>
            {SERVICES.map((service) => (
              <li className="svc__index-item" key={service.slug}>
                <Link href={`/services/${service.slug}`}>
                  <h2 className="svc__h3">{service.navLabel}</h2>
                </Link>
                <p>{service.openingAnswer}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
