import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  isManager,
  useAuditLog,
  useCompanySubmissions,
  useFactors,
  useMe,
  useProfiles,
} from "@/hooks/use-netlow";
import { CALC_VERSION, CATEGORIES, download, fmt, kgToT, toCsv } from "@/lib/netlow";

export const Route = createFileRoute("/_authenticated/netlow/reports")({
  head: () => ({ meta: pageMeta("Impact Reports — Net-Low", "Export audit-ready company sustainability activity and emissions reduction reports.") }),
  component: Reports,
});

function pageMeta(title: string, description: string) {
  return [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }];
}

const EXCLUSIONS = [
  "Activities awaiting approval or rejected are excluded from all reported figures.",
  "Self-reported activities without verifiable evidence are reported as estimated avoided emissions and are never combined with measured reductions.",
  "Water conservation is reported as an environmental KPI; associated supply and treatment emissions are listed separately.",
  "Net-Low points are an engagement reward. They are not carbon credits, are not tradable, and no verified reduction is assigned to an individual employee.",
];

const ASSUMPTIONS = [
  "Baseline emissions use the employee's stated usual activity for the same distance, weight, energy or volume.",
  "Reductions are the difference between baseline and actual emissions, floored at zero.",
  "Emission factors are captured as an immutable snapshot on each submission, including source, geography, year and version.",
  "Duplicate submissions are blocked by a deterministic activity fingerprint per employee and date.",
];

function Reports() {
  const { data: me } = useMe();
  const manager = isManager(me);
  const { data: subs = [] } = useCompanySubmissions(manager);
  const { data: profiles = [] } = useProfiles();
  const { data: factors = [] } = useFactors();
  const { data: audit = [] } = useAuditLog();
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
  const nameOf = (id: string) => profiles.find((p) => p.id === id)?.full_name || "Employee";
  const deptOf = (id: string) => profiles.find((p) => p.id === id)?.department || "";

  const activityRows = approved.map((s) => {
    const snap = (s.factor_snapshot ?? {}) as {
      baseline?: { source?: string; geography?: string; year?: number; version?: string };
    };
    return {
      employee: nameOf(s.user_id),
      department: deptOf(s.user_id),
      date: s.activity_date,
      category: CATEGORIES.find((c) => c.key === s.category)?.label ?? s.category,
      treatment: `${s.scope} ${s.ghg_category}`,
      location: s.location ?? "",
      frequency: s.frequency,
      occurrences: s.occurrences,
      baseline_activity: s.baseline_mode ?? "",
      alternative_activity: s.alternative_mode ?? "avoided",
      quantity: s.quantity,
      unit: s.unit,
      baseline_kgco2e: s.baseline_kg,
      actual_kgco2e: s.actual_kg,
      reduction_kgco2e: s.reduction_kg,
      reduction_type: s.reduction_type,
      factor_source: snap.baseline?.source ?? "",
      factor_geography: snap.baseline?.geography ?? "",
      factor_year: snap.baseline?.year ?? "",
      factor_version: snap.baseline?.version ?? "",
      calc_version: s.calc_version,
      evidence_type: s.evidence_type,
      evidence_file: s.evidence_path ? "attached" : "none",
      evidence_note: s.evidence_note ?? "",
      source_system: s.source_system ?? "",
      status: s.status,
      reviewed_at: s.reviewed_at ?? "",
      submission_id: s.id,
    };
  });

  const auditRows = audit.map((a) => ({
    timestamp: a.created_at,
    actor: a.actor_name ?? "",
    entity: a.entity,
    entity_id: a.entity_id ?? "",
    action: a.action,
    detail: JSON.stringify(a.detail ?? {}),
  }));

  const factorRows = factors.map((f) => ({
    activity_key: f.activity_key,
    label: f.label,
    unit: f.unit,
    kg_co2e_per_unit: f.kg_co2e_per_unit,
    scope: f.scope,
    ghg_category: f.ghg_category,
    source: f.source,
    geography: f.geography,
    year: f.year,
    version: f.version,
  }));

  const evidenceIndex = approved
    .filter((s) => s.evidence_path || s.evidence_note)
    .map((s) => ({
      submission_id: s.id,
      employee: nameOf(s.user_id),
      date: s.activity_date,
      evidence_type: s.evidence_type,
      file_reference: s.evidence_path ?? "",
      note: s.evidence_note ?? "",
    }));

  const base = `netlow-${me?.company?.slug ?? "company"}-${from || "start"}-${to || "end"}`;

  function exportCsv() {
    download(`${base}-activity-data.csv`, toCsv(activityRows), "text/csv;charset=utf-8");
  }

  function exportExcel() {
    const sheet = (title: string, rows: Record<string, unknown>[]) => {
      if (!rows.length) return `<h3>${title}</h3><p>No rows.</p>`;
      const headers = Object.keys(rows[0]!);
      return `<h3>${title}</h3><table border="1"><tr>${headers
        .map((h) => `<th>${h}</th>`)
        .join("")}</tr>${rows
        .map((r) => `<tr>${headers.map((h) => `<td>${escapeHtml(String(r[h] ?? ""))}</td>`).join("")}</tr>`)
        .join("")}</table>`;
    };
    const html = `<html><head><meta charset="utf-8"></head><body>
      <h2>Net-Low report — ${escapeHtml(me?.company?.name ?? "")}</h2>
      <p>Reporting period ${from} to ${to} · calculation ${CALC_VERSION}</p>
      ${sheet("Activity data", activityRows)}
      ${sheet("Emission factors", factorRows)}
      ${sheet("Evidence index", evidenceIndex)}
      ${sheet("Approval and audit history", auditRows)}
    </body></html>`;
    download(`${base}.xls`, html, "application/vnd.ms-excel");
  }

  function exportPdf() {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(reportHtml());
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 400);
  }

  function reportHtml() {
    const tbl = (rows: Record<string, unknown>[], limit = 500) => {
      if (!rows.length) return "<p>No rows.</p>";
      const headers = Object.keys(rows[0]!);
      return `<table><thead><tr>${headers.map((h) => `<th>${h.replace(/_/g, " ")}</th>`).join("")}</tr></thead><tbody>${rows
        .slice(0, limit)
        .map((r) => `<tr>${headers.map((h) => `<td>${escapeHtml(String(r[h] ?? ""))}</td>`).join("")}</tr>`)
        .join("")}</tbody></table>`;
    };
    const list = (items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
    return `<!doctype html><html><head><meta charset="utf-8"><title>Net-Low report</title>
    <style>
      body{font-family:Arial,Helvetica,sans-serif;color:#12312f;margin:32px;font-size:12px}
      h1{font-size:20px;margin:0} h2{font-size:14px;margin:22px 0 6px;border-bottom:1px solid #ccc;padding-bottom:4px}
      table{border-collapse:collapse;width:100%;font-size:10px} th,td{border:1px solid #ddd;padding:4px;text-align:left}
      th{background:#f2f6f5} .kpi{display:flex;gap:12px;flex-wrap:wrap;margin-top:10px}
      .kpi div{border:1px solid #ddd;border-radius:6px;padding:8px 12px;min-width:150px}
      .muted{color:#667}
    </style></head><body>
      <h1>Net-Low report — ${escapeHtml(me?.company?.name ?? "")}</h1>
      <p class="muted">Prepared ${new Date().toISOString().slice(0, 10)} · calculation version ${CALC_VERSION} · a TGS product</p>

      <h2>Reporting boundary and period</h2>
      <p>Boundary: employee engagement activities of ${escapeHtml(me?.company?.name ?? "")}, covering
      ${profiles.length} registered employees. ${escapeHtml(me?.company?.boundary_note ?? "")}</p>
      <p>Reporting period: ${from} to ${to}.</p>

      <h2>Headline results</h2>
      <div class="kpi">
        <div><strong>${fmt(kgToT(sum(measured)), 3)} tCO₂e</strong><br><span class="muted">Measured reductions</span></div>
        <div><strong>${fmt(kgToT(sum(estimated)), 3)} tCO₂e</strong><br><span class="muted">Estimated avoided (separate)</span></div>
        <div><strong>${approved.length}</strong><br><span class="muted">Approved activities</span></div>
        <div><strong>${new Set(approved.map((s) => s.user_id)).size}</strong><br><span class="muted">Participating employees</span></div>
      </div>

      <h2>Scope and category allocation</h2>
      ${tbl(
        Object.entries(
          approved.reduce<Record<string, number>>((acc, s) => {
            const k = `${s.scope} · ${s.ghg_category}`;
            acc[k] = (acc[k] ?? 0) + Number(s.reduction_kg ?? 0);
            return acc;
          }, {}),
        ).map(([allocation, kg]) => ({ allocation, reduction_tco2e: fmt(kgToT(kg), 3) })),
      )}

      <h2>Calculation methodology</h2>
      <p>Each submission records the employee's baseline activity and the alternative actually taken.
      Baseline emissions and actual emissions are each computed as quantity × occurrences ×
      emission factor, converted to the factor's native unit. The reported reduction is the
      difference, floored at zero. Each submission stores an immutable factor snapshot and the
      calculation version so results can be reproduced.</p>
      ${list(ASSUMPTIONS)}

      <h2>Emission factors and sources</h2>
      ${tbl(factorRows)}

      <h2>Assumptions and exclusions</h2>
      ${list(EXCLUSIONS)}

      <h2>Activity data</h2>
      ${tbl(activityRows)}

      <h2>Supporting evidence index</h2>
      ${tbl(evidenceIndex)}

      <h2>Approval and audit history</h2>
      ${tbl(auditRows, 300)}

      <p class="muted" style="margin-top:24px">Net-Low points are engagement rewards. They are not
      carbon credits, are not tradable, and no verified carbon credit is assigned to an individual
      employee. Estimated avoided emissions are reported separately from measured reductions.</p>
    </body></html>`;
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="tgs-h1">Reports</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Audit-ready export of boundary, activity data, methodology, factors, approvals and
          evidence.
        </p>
      </header>

      <section className="flex flex-wrap items-end gap-3 rounded-xl border border-border bg-card p-4">
        <label className="text-xs text-muted-foreground">
          Period start
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="tgs-input tgs-input-sm ml-2"
          />
        </label>
        <label className="text-xs text-muted-foreground">
          Period end
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="tgs-input tgs-input-sm ml-2"
          />
        </label>
        <div className="ml-auto flex flex-wrap gap-2">
          <button
            onClick={exportPdf}
            className="tgs-btn tgs-btn-primary tgs-btn-sm"
          >
            PDF report
          </button>
          <button
            onClick={exportExcel}
            className="tgs-btn tgs-btn-sm"
          >
            Excel workbook
          </button>
          <button
            onClick={exportCsv}
            className="tgs-btn tgs-btn-sm"
          >
            CSV activity data
          </button>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Measured reductions" value={`${fmt(kgToT(sum(measured)), 3)} tCO₂e`} />
        <Stat label="Estimated avoided" value={`${fmt(kgToT(sum(estimated)), 3)} tCO₂e`} />
        <Stat label="Approved activities" value={String(approved.length)} />
        <Stat label="Evidence records" value={String(evidenceIndex.length)} />
      </section>

      <section className="rounded-xl border border-border bg-card p-4">
        <h2 className="tgs-h2">Included in every export</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Reporting boundary and period</li>
          <li>Activity data with quantities, units and occurrences</li>
          <li>Calculation methodology and version history</li>
          <li>Emission factors with source, geography and year</li>
          <li>Assumptions and exclusions</li>
          <li>Approval and audit history</li>
          <li>Scope and category allocation</li>
          <li>Estimated avoided emissions reported separately</li>
          <li>Supporting evidence index</li>
        </ul>
      </section>

      <section className="rounded-xl border border-border bg-card p-4">
        <h2 className="tgs-h2">Audit log (latest)</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="py-2">When</th>
                <th>Actor</th>
                <th>Entity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {audit.slice(0, 15).map((a) => (
                <tr key={a.id} className="border-t border-border">
                  <td className="py-2 whitespace-nowrap">{String(a.created_at).slice(0, 19).replace("T", " ")}</td>
                  <td>{a.actor_name}</td>
                  <td className="capitalize">{a.entity.replace(/_/g, " ")}</td>
                  <td className="capitalize">{a.action}</td>
                </tr>
              ))}
              {audit.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-3 text-sm text-muted-foreground">
                    No entries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold text-foreground">{value}</p>
    </div>
  );
}
