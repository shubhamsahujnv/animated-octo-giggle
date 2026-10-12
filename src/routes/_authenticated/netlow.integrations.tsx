import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { isAdmin, useInvalidateNetlow, useMe, writeAudit } from "@/hooks/use-netlow";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES } from "@/lib/netlow";

export const Route = createFileRoute("/_authenticated/netlow/integrations")({
  head: () => ({ meta: pageMeta("Data Integrations — Net-Low", "Connect workforce, travel, waste, utility and mobility data to Net-Low.") }),
  component: Integrations,
});

function pageMeta(title: string, description: string) {
  return [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }];
}

const SYSTEMS = [
  { key: "hr", label: "HR / HRIS", note: "Headcount, departments, facilities" },
  { key: "travel", label: "Travel booking", note: "Trips booked, cancelled and replaced" },
  { key: "waste", label: "Waste contractor", note: "Weighbridge tickets and diversion routes" },
  { key: "utility", label: "Utility / meter", note: "Half-hourly or monthly consumption" },
  { key: "mobility", label: "Mobility / fleet", note: "Trip distances and modes" },
];

function Integrations() {
  const { data: me } = useMe();
  const admin = isAdmin(me);
  const invalidate = useInvalidateNetlow();
  const [system, setSystem] = useState("travel");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("business_travel");
  const [err, setErr] = useState<string | null>(null);

  const { data: rows = [] } = useQuery({
    enabled: admin,
    queryKey: ["netlow", "integrations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("integrations")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  if (!admin) {
    return <p className="text-sm text-muted-foreground">Administrators only.</p>;
  }

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!me) return;
    setErr(null);
    const { data, error } = await supabase
      .from("integrations")
      .insert({
        company_id: me.profile.company_id,
        system,
        name: name || SYSTEMS.find((s) => s.key === system)?.label || system,
        default_category: category,
        status: "connected",
      })
      .select("id")
      .single();
    if (error) return setErr(error.message);
    await writeAudit({
      company_id: me.profile.company_id,
      actor_id: me.userId,
      actor_name: me.profile.full_name || me.email,
      entity: "integration",
      entity_id: data?.id,
      action: "created",
      detail: { system },
    });
    setName("");
    invalidate();
  }

  async function remove(id: string) {
    await supabase.from("integrations").delete().eq("id", id);
    invalidate();
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <div className="space-y-5">
      <header>
        <h1 className="tgs-h1">Integrations</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Connect HR, travel, waste, utility and mobility systems. Each feed gets its own inbound
          endpoint and key; rows arrive as system-sourced activity data, which counts as verifiable
          evidence.
        </p>
      </header>

      <form onSubmit={create} className="grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-4">
        <L label="System">
          <select value={system} onChange={(e) => setSystem(e.target.value)} className={cls}>
            {SYSTEMS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </L>
        <L label="Name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Amex GBT feed"
            className={cls}
          />
        </L>
        <L label="Default activity category">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={cls}>
            {CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </L>
        <div className="flex items-end">
          <button className="tgs-btn tgs-btn-primary w-full">
            Add feed
          </button>
        </div>
        {err && <p className="text-sm text-destructive sm:col-span-4">{err}</p>}
      </form>

      <div className="space-y-3">
        {rows.map((r) => (
          <article key={r.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">
                  {SYSTEMS.find((s) => s.key === r.system)?.label ?? r.system} ·{" "}
                  {r.default_category ?? "no default category"} ·{" "}
                  {r.last_sync_at ? `last sync ${String(r.last_sync_at).slice(0, 16).replace("T", " ")}` : "never synced"}{" "}
                  · {r.last_sync_rows} rows
                </p>
              </div>
              <button
                onClick={() => remove(r.id)}
                className="tgs-btn tgs-btn-sm"
              >
                Remove
              </button>
            </div>
            <div className="mt-3 space-y-2 rounded-lg bg-muted p-3 text-xs">
              <p className="font-medium text-foreground">Send activity rows to</p>
              <code className="block break-all text-muted-foreground">
                POST {origin}/api/public/hooks/netlow-ingest
              </code>
              <p className="font-medium text-foreground">Header</p>
              <code className="block break-all text-muted-foreground">
                x-netlow-key: {r.inbound_key}
              </code>
              <p className="font-medium text-foreground">Body</p>
              <code className="block whitespace-pre-wrap break-all text-muted-foreground">
{`{ "rows": [ { "employee_email": "person@company.com", "activity_date": "2026-03-04",
  "baseline_mode": "travel_air_short", "alternative_mode": "travel_virtual_meeting",
  "quantity": 820, "unit": "km", "occurrences": 1, "external_ref": "TRIP-1029" } ] }`}
              </code>
              <p className="text-muted-foreground">
                Rows land in the review queue as pending, tagged as a system feed, and duplicates
                are rejected automatically.
              </p>
            </div>
          </article>
        ))}
        {rows.length === 0 && (
          <p className="text-sm text-muted-foreground">No feeds configured yet.</p>
        )}
      </div>

      <section className="rounded-xl border border-border bg-card p-4">
        <h2 className="tgs-h2">What each system contributes</h2>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          {SYSTEMS.map((s) => (
            <li key={s.key}>
              <span className="font-medium text-foreground">{s.label}:</span> {s.note}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const cls =
  "tgs-input";

function L({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
