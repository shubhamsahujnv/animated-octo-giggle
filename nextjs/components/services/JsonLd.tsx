/**
 * Renders a JSON-LD graph. Server component — no client JS.
 *
 * Next.js escapes nothing inside a script tag, so the payload is serialised
 * with `<` escaped to stop a stray sequence in copy from closing the tag.
 */
export function JsonLd({ data }: { data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- JSON-LD has no other injection route
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
