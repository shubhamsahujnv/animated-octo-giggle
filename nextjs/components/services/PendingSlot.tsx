import type { Slot } from "@/lib/services";

/**
 * Renders a proof slot, or nothing.
 *
 * A pending slot renders null in production — that is the whole point: an
 * unconfirmed claim cannot reach a visitor. In development it renders a
 * visible marker, so the open gaps are obvious while the pages are reviewed
 * rather than buried in a data file.
 */
export function PendingSlot<T>({
  slot,
  children,
  label,
}: {
  slot: Slot<T>;
  children: (value: T) => React.ReactNode;
  label: string;
}) {
  // Narrow on the discriminant rather than a type-guard call: TypeScript does
  // not reliably narrow a generic union through a custom predicate.
  if (slot.status === "confirmed") return <>{children(slot.value)}</>;

  if (process.env.NODE_ENV === "production") return null;

  return (
    <p className="svc__pending" role="note">
      <strong>Unconfirmed — {label}.</strong> {slot.note}
    </p>
  );
}
