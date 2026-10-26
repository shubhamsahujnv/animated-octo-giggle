import type { FaqEntry } from "@/lib/services";

/**
 * FAQ list, using the site's existing faq__* markup and the native
 * <details>/<summary> pattern already in use on the homepage, so it inherits
 * the current styles and needs no client JS.
 *
 * Keep each question on exactly one page. Duplicate FAQPage markup across
 * pages competes with itself.
 */
export function ServiceFaq({ entries, title }: { entries: readonly FaqEntry[]; title: string }) {
  return (
    <section className="section faq" id="faq" aria-labelledby="faq-heading">
      <div className="wrap">
        <div className="reveal head head--center" style={{ transitionDelay: "0ms" }}>
          <span className="eyebrow eyebrow--center">Answers</span>
          <h2 className="h2" id="faq-heading">
            {title}
          </h2>
        </div>

        <div className="reveal faq__list" style={{ transitionDelay: "0ms" }}>
          {entries.map((entry, i) => (
            <details className="faq__item" key={entry.q} open={i === 0}>
              <summary className="faq__q">
                <span>{entry.q}</span>
                <span className="faq__ico" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="16"
                    height="16"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="faq__a">
                <p>{entry.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
