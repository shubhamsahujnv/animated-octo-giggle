import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  isManager,
  useCompanySubmissions,
  useInvalidateNetlow,
  useMe,
  useProfiles,
  writeAudit,
} from "@/hooks/use-netlow";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES, fmt, isVerifiable } from "@/lib/netlow";

export const Route = createFileRoute("/_authenticated/netlow/review")({
  head: () => ({ meta: pageMeta("Activity Review Queue — Net-Low", "Review employee sustainability evidence and approve reported reductions.") }),
  component: ReviewQueue,
});

function pageMeta(title: string, description: string) {
  return [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }];
}

function ReviewQueue() {
  const { data: me } = useMe();
  const manager = isManager(me);
  const { data: subs = [] } = useCompanySubmissions(manager);
  const { data: profiles = [] } = useProfiles();
  const invalidate = useInvalidateNetlow();
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">("pending");
  const [note, setNote] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);

  if (!manager) {
    return <p className="text-sm text-muted-foreground">Reviewers and administrators only.</p>;
  }

  const rows = subs.filter((s) => s.status === status);
  const nameOf = (id: string) => profiles.find((p) => p.id === id)?.full_name || "Employee";
  const deptOf = (id: string) => profiles.find((p) => p.id === id)?.department || "—";

  async function decide(id: string, decision: "approved" | "rejected") {
    if (!me) return;
    setBusy(id);
    const row = subs.find((s) => s.id === id);
    const { error } = await supabase
      .from("activity_submissions")
      .update({
        status: decision,
        reviewed_by: me.userId,
        reviewed_at: new Date().toISOString(),
        review_note: note[id] || null,
      })
      .eq("id", id);
    if (!error) {
      await writeAudit({
        company_id: me.profile.company_id,
        actor_id: me.userId,
        actor_name: me.profile.full_name || me.email,
        entity: "activity_submission",
        entity_id: id,
        action: decision,
        detail: {
          note: note[id] ?? "",
          reduction_kg: Number(row?.reduction_kg ?? 0),
          reduction_type: row?.reduction_type,
        },
      });
      invalidate();
    }
    setBusy(null);
  }

  async function openEvidence(path: string) {
    const { data } = await supabase.storage.from("evidence").createSignedUrl(path, 300);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank", "noopener");
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="tgs-h1">Review queue</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Only approved activities enter company reporting. Every decision is written to the audit
          log and cannot be edited afterwards.
        </p>
      </header>

      <div className="flex gap-1 rounded-lg bg-muted p-1 text-sm">
        {(["pending", "approved", "rejected"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`flex-1 rounded-md px-3 py-1.5 font-medium capitalize transition-colors ${
              status === s ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            {s} ({subs.filter((x) => x.status === s).length})
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {rows.map((s) => (
          <article key={s.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {nameOf(s.user_id)}{" "}
                  <span className="font-normal text-muted-foreground">· {deptOf(s.user_id)}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {CATEGORIES.find((c) => c.key === s.category)?.label ?? s.category} ·{" "}
                  {s.activity_date} · {s.location ?? "no location"} · {s.frequency}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-primary">
                  {fmt(Number(s.reduction_kg))} kg CO₂e
                </p>
                <p className="text-xs capitalize text-muted-foreground">
                  {s.reduction_type} · {s.scope} {s.ghg_category}
                </p>
              </div>
            </div>

            <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-4">
              <Cell label="Baseline" value={`${s.baseline_mode ?? "—"} · ${fmt(Number(s.baseline_kg))} kg`} />
              <Cell label="Alternative" value={`${s.alternative_mode ?? "avoided"} · ${fmt(Number(s.actual_kg))} kg`} />
              <Cell label="Quantity" value={`${s.quantity} ${s.unit} × ${s.occurrences}`} />
              <Cell
                label="Evidence"
                value={`${s.evidence_type}${isVerifiable(s.evidence_type) ? " (verifiable)" : ""}`}
              />
            </dl>

            {(s.evidence_note || s.source_system) && (
              <p className="mt-2 text-xs text-muted-foreground">
                {s.evidence_note} {s.source_system ? `· feed: ${s.source_system}` : ""}
              </p>
            )}

            {s.evidence_path && (
              <button
                onClick={() => {
                  if (s.evidence_path) openEvidence(s.evidence_path);
                }}
                className="mt-2 text-xs font-medium text-primary hover:underline"
              >
                Open attached evidence
              </button>
            )}

            {status === "pending" ? (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <input
                  value={note[s.id] ?? ""}
                  onChange={(e) => setNote((n) => ({ ...n, [s.id]: e.target.value }))}
                  placeholder="Review note (optional)"
                  className="tgs-input min-w-[200px] flex-1"
                />
                <button
                  disabled={busy === s.id}
                  onClick={() => decide(s.id, "approved")}
                  className="tgs-btn tgs-btn-primary tgs-btn-sm"
                >
                  Approve
                </button>
                <button
                  disabled={busy === s.id}
                  onClick={() => decide(s.id, "rejected")}
                  className="rounded-md border border-destructive/40 px-3 py-2 text-xs font-semibold text-destructive disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            ) : (
              <p className="mt-3 text-xs text-muted-foreground">
                {s.status} on {s.reviewed_at ? String(s.reviewed_at).slice(0, 10) : "—"}
                {s.review_note ? ` · ${s.review_note}` : ""}
              </p>
            )}
          </article>
        ))}
        {rows.length === 0 && (
          <p className="text-sm text-muted-foreground">Nothing in this list.</p>
        )}
      </div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted px-3 py-2">
      <dt className="text-[11px] text-muted-foreground">{label}</dt>
      <dd className="text-xs capitalize text-foreground">{value}</dd>
    </div>
  );
}
