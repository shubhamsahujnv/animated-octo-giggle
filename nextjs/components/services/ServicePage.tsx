import Link from "next/link";
import { relatedServices, type ServiceContent } from "@/lib/services";
import { PendingSlot } from "./PendingSlot";
import { ServiceEnquiryForm } from "./ServiceEnquiryForm";
import { ServiceFaq } from "./ServiceFaq";

/**
 * Service page layout, in the order the strategy prescribes:
 *
 *   opening answer → proof line → primary CTA → what's included → timelines
 *   → engagement models → proof → pricing signal → mid CTA → who it's for /
 *   not for → FAQ → internal links → closing CTA + form → last updated
 *
 * Reuses the site's existing classes (wrap, section, eyebrow, lead, h2, gt,
 * btn, btn--brand, reveal) and adds a `svc` block for what is new.
 */

/** Staggered reveal delay, matching the homepage's pattern. */
const delay = (i: number) => ({ transitionDelay: `${i * 60}ms` });

function SectionHead({ eyebrow, heading }: { eyebrow: string; heading: string }) {
  return (
    <div className="reveal head" style={delay(0)}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="h2">{heading}</h2>
    </div>
  );
}

export function ServicePage({ service }: { service: ServiceContent }) {
  const related = relatedServices(service);
  const visibleBlogLinks = service.blogLinks.filter((link) => !link.flagged);

  return (
    <>
      {/* ---------- Above the fold ---------- */}
      <section className="section svc__hero" id="top">
        <div className="wrap wrap-wide">
          <div className="reveal" style={delay(0)}>
            <span className="eyebrow">{service.eyebrow}</span>
            <h1>{service.h1}</h1>

            {/* The answer block. Kept as a single paragraph so an assistant can
                quote it whole: do not split it for visual rhythm. */}
            <p className="lead svc__answer">{service.openingAnswer}</p>

            <PendingSlot slot={service.proofLine} label="above-the-fold proof line">
              {(line) => <p className="svc__proofline">{line}</p>}
            </PendingSlot>
            {service.proofLine.status === "pending" ? (
              <p className="svc__proofline">{service.proofLineFallback}</p>
            ) : null}

            <div className="svc__ctas">
              <Link className="btn btn--brand" href="#enquire">
                Book a discovery call
              </Link>
              <Link className="btn" href="#included">
                See what&apos;s included
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- What's included ---------- */}
      <section className="section" id="included">
        <div className="wrap">
          <SectionHead eyebrow="Scope" heading={service.headings.included} />
          <dl className="reveal svc__grid" style={delay(1)}>
            {service.included.map((item) => (
              <div className="svc__item" key={item.label}>
                <dt className="svc__item-label">{item.label}</dt>
                <dd className="svc__item-detail">{item.detail}</dd>
              </div>
            ))}
          </dl>

          <div className="reveal svc__timelines" style={delay(2)}>
            <h3 className="svc__h3">Timelines</h3>
            <ul className="svc__list">
              {service.timelines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section className="section" id="process">
        <div className="wrap">
          <SectionHead eyebrow="Method" heading={service.headings.process} />
          <ol className="reveal svc__process" style={delay(1)}>
            {service.process.map((step, i) => (
              <li className="svc__step" key={step.step}>
                <span className="svc__step-n" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="svc__h3">{step.step}</h3>
                  <p>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Engagement models ---------- */}
      <section className="section" id="engagement">
        <div className="wrap">
          <SectionHead eyebrow="How we work" heading="Engagement models" />
          <div className="reveal svc__models" style={delay(1)}>
            {service.engagementModels.map((model) => (
              <div className="engcard" key={model.model}>
                <div className="engcard__top">{model.model}</div>
                <p>{model.fits}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Proof ---------- */}
      <section className="section" id="proof">
        <div className="wrap">
          <SectionHead eyebrow="Proof" heading={service.headings.proof} />

          {/* Clients already named publicly. Real, sourced, and carrying no
              numbers, which is why the case-study slot below stays separate. */}
          {service.clientRoster.length > 0 ? (
            <ul className="reveal svc__roster" style={delay(1)}>
              {service.clientRoster.map((entry) => (
                <li className="svc__roster-item" key={entry.client}>
                  <span className="svc__roster-client">{entry.client}</span>
                  <span className="svc__roster-work">{entry.work}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <PendingSlot slot={service.testimonial} label="testimonial">
            {(t) => (
              <figure className="reveal svc__testimonial" style={delay(2)}>
                <blockquote>
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption>
                  <strong>{t.attribution}</strong>
                  {t.role ? <span>, {t.role}</span> : null}
                  {t.site ? <span className="svc__testimonial-site"> · {t.site}</span> : null}
                </figcaption>
              </figure>
            )}
          </PendingSlot>

          <div className="reveal" style={delay(3)}>
            <PendingSlot slot={service.caseStudy} label="case study">
              {(study) => (
                <article className="svc__case">
                  <h3 className="svc__h3">
                    {study.client}, {study.work}
                  </h3>
                  <ul className="svc__metrics">
                    {study.metrics.map((metric) => (
                      <li key={metric}>{metric}</li>
                    ))}
                  </ul>
                  {study.quote ? (
                    <blockquote className="svc__quote">
                      <p>{study.quote.text}</p>
                      <cite>{study.quote.attribution}</cite>
                    </blockquote>
                  ) : null}
                </article>
              )}
            </PendingSlot>

            <PendingSlot slot={service.namedExpert} label="named expert">
              {(expert) => (
                <p className="svc__expert">
                  <strong>{expert.name}</strong>, {expert.role}, {expert.credentials}
                </p>
              )}
            </PendingSlot>
          </div>

          {visibleBlogLinks.length > 0 ? (
            <div className="reveal svc__reading" style={delay(2)}>
              <h3 className="svc__h3">Further reading</h3>
              <ul className="svc__list">
                {visibleBlogLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {/* ---------- Pricing signal ---------- */}
      <section className="section" id="cost">
        <div className="wrap">
          <SectionHead eyebrow="Commercials" heading={service.headings.cost} />

          <div className="reveal" style={delay(1)}>
            <PendingSlot slot={service.priceBand} label="price band">
              {(band) => <p className="lead svc__band">{band}</p>}
            </PendingSlot>

            <dl className="svc__grid">
              {service.costDrivers.map((driver) => (
                <div className="svc__item" key={driver.label}>
                  <dt className="svc__item-label">{driver.label}</dt>
                  <dd className="svc__item-detail">{driver.detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="reveal svc__ctas" style={delay(2)}>
            <Link className="btn btn--brand" href="#enquire">
              Talk to us about {service.navLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Qualification ---------- */}
      <section className="section" id="fit">
        <div className="wrap">
          <SectionHead eyebrow="Fit" heading={service.headings.fit} />
          <div className="reveal svc__fit" style={delay(1)}>
            <div className="svc__fit-col">
              <h3 className="svc__h3">Who it&apos;s for</h3>
              <ul className="svc__list">
                {service.forWho.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="svc__fit-col svc__fit-col--not">
              <h3 className="svc__h3">Who it&apos;s not for</h3>
              <ul className="svc__list">
                {service.notForWho.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <ServiceFaq entries={service.faq} title={service.headings.faq} />

      {/* ---------- Related services ---------- */}
      {related.length > 0 ? (
        <section className="section" id="related">
          <div className="wrap">
            <SectionHead eyebrow="Also" heading="Related capabilities" />
            <ul className="reveal svc__related" style={delay(1)}>
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/services/${item.slug}`}>{item.navLabel}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* ---------- Closing CTA + form ---------- */}
      <section className="section svc__enquire" id="enquire">
        <div className="wrap">
          <div className="reveal head" style={delay(0)}>
            <span className="eyebrow">Next step</span>
            <h2 className="h2">{service.headings.cta}</h2>
            <p className="lead">
              Tell us the outcome you&apos;re chasing. A senior engineer replies, not a
              sales team.
            </p>
          </div>
          <div className="reveal" style={delay(1)}>
            <ServiceEnquiryForm service={service.slug} serviceLabel={service.navLabel} />
          </div>

          <p className="svc__updated">
            Last updated:{" "}
            <time dateTime={service.lastUpdated}>
              {new Date(`${service.lastUpdated}T00:00:00Z`).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              })}
            </time>
          </p>
        </div>
      </section>
    </>
  );
}
