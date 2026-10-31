import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import {
  useChallenges,
  useFactors,
  useInvalidateNetlow,
  useMe,
  useMySubmissions,
  writeAudit,
} from "@/hooks/use-netlow";
import { supabase } from "@/integrations/supabase/client";
import {
  CALC_VERSION,
  CATEGORIES,
  EVIDENCE_TYPES,
  FREQUENCIES,
  calculate,
  categoryByKey,
  dedupeHash,
  fmt,
  type CategoryKey,
  type EmissionFactor,
} from "@/lib/netlow";

export const Route = createFileRoute("/_authenticated/netlow/log")({
  head: () => ({ meta: pageMeta("Log Sustainability Activity — Net-Low", "Log evidence-backed employee sustainability activities and calculate emissions reductions.") }),
  component: LogActivity,
});

function pageMeta(title: string, description: string) {
  return [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }];
}

const today = () => new Date().toISOString().slice(0, 10);

function LogActivity() {
  const { data: me } = useMe();
  const { data: factors = [] } = useFactors();
  const { data: challenges = [] } = useChallenges();
  const { data: mine = [] } = useMySubmissions(me?.userId);
  const invalidate = useInvalidateNetlow();

  const [category, setCategory] = useState<CategoryKey>("commuting");
  const [activityDate, setActivityDate] = useState(today());
  const [location, setLocation] = useState("");
  const [frequency, setFrequency] = useState("one-off");
  const [occurrences, setOccurrences] = useState("1");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("km");
  const [baselineKey, setBaselineKey] = useState("");
  const [altKey, setAltKey] = useState("");
  const [evidenceType, setEvidenceType] = useState("self-reported");
  const [evidenceNote, setEvidenceNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [challengeId, setChallengeId] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const cat = categoryByKey(category);
  const byKey = useMemo(() => {
    const m: Record<string, EmissionFactor> = {};
    for (const f of factors) m[f.activity_key] = f;
    return m;
  }, [factors]);

  const baselineFactor = byKey[baselineKey] ?? null;
  const altFactor = byKey[altKey] ?? null;
  const chosenChallenge = challenges.find((c) => c.id === challengeId);

  const preview = calculate({
    category,
    quantity: Number(quantity) || 0,
    unit,
    occurrences: Number(occurrences) || 1,
    baselineFactor,
    actualFactor: altFactor,
    evidenceType,
    pointsPerKg: chosenChallenge ? Number(chosenChallenge.points_per_unit) : 10,
  });

  function pickCategory(key: CategoryKey) {
    const c = categoryByKey(key);
    setCategory(key);
    setUnit(c.units[0]!);
    setBaselineKey("");
    setAltKey("");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!me) return;
    setErr(null);
    setOk(null);

    if (!baselineKey) return setErr("Choose the baseline activity.");
    if (!(Number(quantity) > 0)) return setErr("Enter a quantity greater than zero.");
    if (!consent) return setErr("Consent is required before your activity data can be used.");

    const hash = dedupeHash([
      me.userId,
      category,
      activityDate,
      baselineKey,
      altKey,
      quantity,
      unit,
      occurrences,
      challengeId,
    ]);
    if (mine.some((m) => m.dedupe_hash === hash)) {
      return setErr("You already logged this exact activity on that date.");
    }

    setBusy(true);
    try {
      let evidencePath: string | null = null;
      if (file) {
        const path = `${me.userId}/${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
        const { error: upErr } = await supabase.storage.from("evidence").upload(path, file);
        if (upErr) throw upErr;
        evidencePath = path;
      }

      const result = calculate({
        category,
        quantity: Number(quantity),
        unit,
        occurrences: Number(occurrences) || 1,
        baselineFactor,
        actualFactor: altFactor,
        evidenceType,
        pointsPerKg: chosenChallenge ? Number(chosenChallenge.points_per_unit) : 10,
      });

      const { data: inserted, error } = await supabase
        .from("activity_submissions")
        .insert({
          company_id: me.profile.company_id,
          user_id: me.userId,
          challenge_id: challengeId || null,
          category,
          activity_date: activityDate,
          location: location || me.profile.facility || null,
          frequency,
          occurrences: Number(occurrences) || 1,
          baseline_mode: baselineKey,
          alternative_mode: altKey || null,
          quantity: Number(quantity),
          unit,
          baseline_factor_id: baselineFactor?.id ?? null,
          actual_factor_id: altFactor?.id ?? null,
          factor_snapshot: result.factor_snapshot as never,
          baseline_kg: result.baseline_kg,
          actual_kg: result.actual_kg,
          reduction_kg: result.reduction_kg,
          scope: result.scope,
          ghg_category: result.ghg_category,
          reduction_type: result.reduction_type,
          evidence_type: evidenceType,
          evidence_path: evidencePath,
          evidence_note: evidenceNote || null,
          points: result.points,
          status: "pending",
          consent: true,
          calc_version: CALC_VERSION,
          dedupe_hash: hash,
        })
        .select("id")
        .single();
      if (error) throw error;

      await writeAudit({
        company_id: me.profile.company_id,
        actor_id: me.userId,
        actor_name: me.profile.full_name || me.email,
        entity: "activity_submission",
        entity_id: inserted?.id,
        action: "submitted",
        detail: { category, activity_date: activityDate, reduction_kg: result.reduction_kg },
      });

      invalidate();
      setOk("Submitted for approval. It counts towards reporting once a reviewer approves it.");
      setQuantity("");
      setEvidenceNote("");
      setFile(null);
    } catch (e2) {
      const m = e2 instanceof Error ? e2.message : "Could not save your activity.";
      setErr(m.includes("duplicate key") ? "That activity was already submitted." : m);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="tgs-h1">Log an activity</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tell us what you would normally have done and what you did instead. Evidence turns an
          estimate into a measured reduction.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => pickCategory(c.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              category === c.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <section className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">
              {cat.treatment} · {cat.help}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="Date">
                <input
                  type="date"
                  value={activityDate}
                  max={today()}
                  onChange={(e) => setActivityDate(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Location or facility">
                <input
                  value={location}
                  placeholder={me?.profile.facility ?? "Site or city"}
                  onChange={(e) => setLocation(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Frequency">
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className={inputCls}
                >
                  {FREQUENCIES.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Number of occurrences">
                <input
                  type="number"
                  min={1}
                  value={occurrences}
                  onChange={(e) => setOccurrences(e.target.value)}
                  className={inputCls}
                />
              </Field>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-4">
            <h2 className="tgs-h2">Baseline and alternative</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="Baseline activity (what normally happens)">
                <select
                  value={baselineKey}
                  onChange={(e) => setBaselineKey(e.target.value)}
                  className={inputCls}
                >
                  <option value="">Select…</option>
                  {cat.baselineKeys.map((k) => (
                    <option key={k} value={k} disabled={!byKey[k]}>
                      {byKey[k]?.label ?? k}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="What you did instead">
                <select
                  value={altKey}
                  onChange={(e) => setAltKey(e.target.value)}
                  className={inputCls}
                  disabled={cat.alternativeKeys.length === 0}
                >
                  <option value="">
                    {cat.alternativeKeys.length ? "Nothing / fully avoided" : "Fully avoided"}
                  </option>
                  {cat.alternativeKeys.map((k) => (
                    <option key={k} value={k} disabled={!byKey[k]}>
                      {byKey[k]?.label ?? k}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={cat.quantityLabel}>
                <input
                  type="number"
                  step="any"
                  min={0}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Unit">
                <select value={unit} onChange={(e) => setUnit(e.target.value)} className={inputCls}>
                  {cat.units.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-4">
            <h2 className="tgs-h2">Evidence</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="Evidence type">
                <select
                  value={evidenceType}
                  onChange={(e) => setEvidenceType(e.target.value)}
                  className={inputCls}
                >
                  {EVIDENCE_TYPES.map((e) => (
                    <option key={e.key} value={e.key}>
                      {e.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Attach a file (optional)">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="w-full text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-xs file:font-medium"
                />
              </Field>
              <Field label="Note or reference">
                <input
                  value={evidenceNote}
                  onChange={(e) => setEvidenceNote(e.target.value)}
                  placeholder="Ticket number, meter ID, route…"
                  className={inputCls}
                />
              </Field>
              <Field label="Link to a challenge (optional)">
                <select
                  value={challengeId}
                  onChange={(e) => setChallengeId(e.target.value)}
                  className={inputCls}
                >
                  <option value="">No challenge</option>
                  {challenges
                    .filter((c) => c.active && (c.category === category || c.category === "any"))
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                </select>
              </Field>
            </div>
            <label className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5"
              />
              <span>
                I consent to my company using this activity data, and any file attached, for
                emissions reporting and internal verification.
              </span>
            </label>
          </section>
        </div>

        <aside className="space-y-3 lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-4">
            <h2 className="tgs-h2">Calculated result</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <Row label="Baseline" value={`${fmt(preview.baseline_kg)} kg CO₂e`} />
              <Row label="Actual" value={`${fmt(preview.actual_kg)} kg CO₂e`} />
              <Row
                label="Reduction"
                value={`${fmt(preview.reduction_kg)} kg CO₂e`}
                strong
              />
              <Row label="Accounting" value={`${preview.scope} · ${preview.ghg_category}`} />
              <Row label="Reduction type" value={preview.reduction_type} />
              <Row label="Net-Low points" value={String(preview.points)} />
              <Row label="Calc version" value={CALC_VERSION} />
            </dl>
            {preview.reduction_type === "estimated" && (
              <p className="mt-3 rounded-md bg-muted px-3 py-2 text-[11px] text-muted-foreground">
                Self-reported activities earn points but are held as estimated. Add a receipt, GPS
                record, meter reading or system feed to make it measured.
              </p>
            )}
            {cat.kpiOnly && (
              <p className="mt-3 rounded-md bg-muted px-3 py-2 text-[11px] text-muted-foreground">
                Water is reported as a KPI. Associated emissions are shown separately in reports.
              </p>
            )}
          </div>

          {err && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</p>
          )}
          {ok && <p className="rounded-md bg-primary/10 px-3 py-2 text-sm text-primary">{ok}</p>}

          <button
            type="submit"
            disabled={busy}
            className="tgs-btn tgs-btn-primary w-full"
          >
            {busy ? "Saving…" : "Submit for approval"}
          </button>
        </aside>
      </form>
    </div>
  );
}

const inputCls =
  "tgs-input";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd
        className={`text-right text-sm capitalize ${
          strong ? "font-semibold text-primary" : "text-foreground"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
