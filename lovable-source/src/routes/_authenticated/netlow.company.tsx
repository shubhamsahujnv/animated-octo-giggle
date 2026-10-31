import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import {
  isManager,
  useChallenges,
  useCompanySubmissions,
  useMe,
  useProfiles,
} from "@/hooks/use-netlow";
import { CATEGORIES, dataQualityScore, fmt, kgToT } from "@/lib/netlow";

export const Route = createFileRoute("/_authenticated/netlow/company")({
  head: () => ({ meta: pageMeta("Company Impact Dashboard — Net-Low", "Review company participation, emissions reductions, evidence quality and performance.") }),
  component: CompanyDashboard,
});

function pageMeta(title: string, description: string) {
  return [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }];
}

function CompanyDashboard() {
  const { data: me } = useMe();
  const manager = isManager(me);
  const { data: subs = [] } = useCompanySubmissions(manager);
  const { data: profiles = [] } = useProfiles();
  const { data: challenges = [] } = useChallenges();
  const [groupBy, setGroupBy] = useState<"department" | "facility">("department");
  const [from, setFrom] = useState(me?.company?.reporting_period_start ?? "");
  const [to, setTo] = useState(me?.company?.reporting_period_end ?? "");

  if (!manager) {
    return <p className="text-sm text-muted-foreground">Reviewers and administrators only.</p>;
  }

  const inPeriod = subs.filter((s) => {
    const d = String(s.activity_date);
    return (!from || d >= from) && (!to || d <= to);
  });
  const approved = inPeriod.filter((s) => s.status === "approved");
  const measured = approved.filter((s) => s.reduction_type === "measured");
  const estimated = approved.filter((s) => s.reduction_type === "estimated");

  const sum = (rows: typeof approved) => rows.reduce((n, s) => n + Number(s.reduction_kg ?? 0), 0);
  const participants = new Set(approved.map((s) => s.user_id)).size;
  const rate = profiles.length ? Math.round((participants / profiles.length) * 100) : 0;
  const points = approved.reduce((n, s) => n + (s.points ?? 0), 0);
  const quality = dataQualityScore(
    approved.map((s) => ({ evidence_type: s.evidence_type, evidence_path: s.evidence_path })),
  );
  const withEvidence = approved.filter((s) => s.evidence_path).length;
  const completeness = approved.length ? Math.round((withEvidence / approved.length) * 100) : 0;

  const byScope = groupSum(approved, (s) => `${s.scope} · ${s.ghg_category}`);
  const byCategory = groupSum(approved, (s) => String(s.category));
  const byUnit = groupSum(approved, (s) => {
    const p = profiles.find((x) => x.id === s.user_id);
    return (groupBy === "department" ? p?.department : p?.facility) || "Unassigned";
  });

  const completedChallenges = challenges.filter((c) => !c.active || c.end_date < new Date().toISOString().slice(0, 10)).length;

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="tgs-h1">Company dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {me?.company?.name} · reporting period {from || "—"} to {to || "—"}
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <label className="text-xs text-muted-foreground">
            From
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="tgs-input tgs-input-sm ml-2"
            />
          </label>
          <label className="text-xs text-muted-foreground">
            To
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="tgs-input tgs-input-sm ml-2"
            />
          </label>
          <Link
            to="/netlow/reports"
            className="tgs-btn tgs-btn-primary tgs-btn-sm"
          >
            Reports
          </Link>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Participation rate" value={`${rate}%`} note={`${participants} of ${profiles.length} people`} />
        <Stat label="Challenges completed" value={String(completedChallenges)} note={`${challenges.length} total`} />
        <Stat label="Net-Low points" value={points.toLocaleString()} note="Engagement reward" />
        <Stat label="Awaiting approval" value={String(inPeriod.filter((s) => s.status === "pending").length)} />
      </section>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat
          label="Measured reductions"
          value={`${fmt(kgToT(sum(measured)), 3)} tCO₂e`}
          note="Evidence backed"
        />
        <Stat
          label="Estimated avoided emissions"
          value={`${fmt(kgToT(sum(estimated)), 3)} tCO₂e`}
          note="Reported separately"
        />
        <Stat label="Data quality score" value={`${quality}%`} note="Evidence strength" />
        <Stat label="Evidence completeness" value={`${completeness}%`} note="Files attached" />
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Emissions reductions by scope and category">
          <Bars rows={byScope} />
        </Panel>
        <Panel title="By activity category">
          <Bars
            rows={byCategory.map((r) => ({
              ...r,
              key: CATEGORIES.find((c) => c.key === r.key)?.label ?? r.key,
            }))}
          />
        </Panel>
      </div>

      <Panel
        title={`By ${groupBy}`}
        action={
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as "department" | "facility")}
            className="tgs-input tgs-input-sm"
          >
            <option value="department">Department</option>
            <option value="facility">Facility</option>
          </select>
        }
      >
        <Bars rows={byUnit} />
      </Panel>

      <p className="rounded-lg bg-muted px-4 py-3 text-xs text-muted-foreground">
        Estimated avoided emissions are shown separately from measured reductions and are not
        combined into a single reduction claim. Net-Low points are an engagement reward only.
      </p>
    </div>
  );
}

function groupSum<T extends { reduction_kg: number | string }>(
  rows: T[],
  key: (r: T) => string,
): { key: string; kg: number }[] {
  const map: Record<string, number> = {};
  for (const r of rows) map[key(r)] = (map[key(r)] ?? 0) + Number(r.reduction_kg ?? 0);
  return Object.entries(map)
    .map(([k, kg]) => ({ key: k, kg }))
    .sort((a, b) => b.kg - a.kg);
}

function Bars({ rows }: { rows: { key: string; kg: number }[] }) {
  const max = Math.max(1, ...rows.map((r) => r.kg));
  if (!rows.length) return <p className="text-sm text-muted-foreground">No approved data yet.</p>;
  return (
    <ul className="space-y-2">
      {rows.map((r) => (
        <li key={r.key}>
          <div className="flex items-center justify-between text-xs">
            <span className="truncate capitalize text-foreground">{r.key.replace(/_/g, " ")}</span>
            <span className="whitespace-nowrap text-muted-foreground">
              {fmt(kgToT(r.kg), 3)} t
            </span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-primary" style={{ width: `${(r.kg / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Panel({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="tgs-h2">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold text-foreground">{value}</p>
      {note && <p className="text-[11px] text-muted-foreground">{note}</p>}
    </div>
  );
}
