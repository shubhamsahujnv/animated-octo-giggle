import type { Faq } from "../content/posts";

// Accessible disclosure list. Content stays in the DOM when collapsed, so it matches
// the FAQPage schema emitted alongside it.
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="mt-6 border-t border-foreground/15">
      {faqs.map(({ q, a }, i) => (
        <details key={q} open={i === 0} className="group border-b border-foreground/15 py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-display font-semibold [&::-webkit-details-marker]:hidden">
            <h3 className="text-base">{q}</h3>
            <span
              aria-hidden="true"
              className="text-xl leading-none transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-[65ch] text-sm leading-6 text-muted-foreground">{a}</p>
        </details>
      ))}
    </div>
  );
}
