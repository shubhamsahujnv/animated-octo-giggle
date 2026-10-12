import { useEffect, useRef, useState } from "react";
import type { AuthorProfile } from "../content/authors";

// Author portrait that falls back to initials when the image is missing
// (e.g. before public/images/ankita-patwa.jpg has been uploaded).
export function AuthorAvatar({
  author,
  className = "",
}: {
  author: AuthorProfile;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // An image that failed during SSR, before hydration, never fires onError.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  const base = `shrink-0 rounded-full border-2 border-foreground ${className}`;

  if (failed) {
    const initials = author.name
      .split(/\s+/)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return (
      <span
        role="img"
        aria-label={author.name}
        className={`${base} inline-flex items-center justify-center bg-accent font-display font-bold text-accent-foreground`}
      >
        {initials}
      </span>
    );
  }

  return (
    <img
      ref={ref}
      src={author.image}
      alt={author.name}
      onError={() => setFailed(true)}
      className={`${base} bg-card ${author.kind === "Organization" ? "object-contain p-2" : "object-cover"}`}
    />
  );
}
