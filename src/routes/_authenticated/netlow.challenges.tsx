import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import {
  isAdmin,
  useChallenges,
  useCompanySubmissions,
  useInvalidateNetlow,
  useMe,
  writeAudit,
} from "@/hooks/use-netlow";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES, fmt, kgToT } from "@/lib/netlow";

export const Route = createFileRoute("/_authenticated/netlow/challenges")({
  head: () => ({ meta: pageMeta("Sustainability Challenges — Net-Low", "Join and manage company sustainability challenges with measured outcomes.") }),
  component: Challenges,
});

function pageMeta(title: string, description: string) {
  return [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }];
}

function Challenges() {
  const { data: me } = useMe();
  const { data: challenges = [] } = useChallenges();
  const { data: subs = [] } = useCompanySubmissions(!!me);
  const invalidate = useInvalidateNetlow();
  const admin = isAdmin(me);
  const [creating, setCreating] = useState(false);

  const { data: participants = [] } = useQuery({
    queryKey: ["netlow", "participants"],
    queryFn: async () => {
      const { data, error } = await supabase.from("challenge_participants").select("*");
      if (error) throw error;
      return data ?? [];
    },
  });

  async function join(challengeId: string, teamName: string | null) {
    if (!me) return;
    await supabase.from("challenge_participants").insert({
      challenge_id: challengeId,
      user_id: me.userId,
      company_id: me.profile.company_id,
      team_name: teamName,
    });
    invalidate();
  }

  async function leave(challengeId: string) {
    if (!me) return;
    await supabase
      .from("challenge_participants")
      .delete()
      .eq("challenge_id", challengeId)
      .eq("user_id", me.userId);
    invalidate();
  }

  async function toggleActive(id: string, active: boolean) {
    await supabase.from("challenges").update({ active }).eq("id", id);
    invalidate();
  }

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="tgs-h1">Challenges</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Individual or team challenges, scoped by company, location or department.
          </p>
        </div>
        {admin && (
          <button
            onClick={() => setCreating((v) => !v)}
            className="tgs-btn tgs-btn-primary"
          >
            {creating ? "Close" : "New challenge"}
          </button>
        )}
      </header>

      {creating && admin && me && <CreateForm onDone={() => setCreating(false)} />}

      <div className="grid gap-3 md:grid-cols-2">
        {challenges.map((c) => {
          const joined = participants.some(
            (p) => p.challenge_id === c.id && p.user_id === me?.userId,
          );
          const rows = subs.filter((s) => s.challenge_id === c.id && s.status === "approved");
          const kg = rows.reduce((n, s) => n + Number(s.reduction_kg ?? 0), 0);
          const pts = rows.reduce((n, s) => n + (s.points ?? 0), 0);
          const people = participants.filter((p) => p.challenge_id === c.id).length;
          const progress = c.target_value ? Math.min(100, (kg / Number(c.target_value)) * 100) : null;

          return (
            <article key={c.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="tgs-h2">{c.title}</h2>
                  <p className="text-xs text-muted-foreground">
                    {c.team_based ? "Team" : "Individual"} ·{" "}
                    {CATEGORIES.find((x) => x.key === c.category)?.label ?? c.category} ·{" "}
                    {c.start_date} to {c.end_date}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    c.active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {c.active ? "Open" : "Closed"}
                </span>
              </div>

              {c.description && (
                <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
              )}

              <dl className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <Mini label="Participants" value={String(people)} />
                <Mini label="Reduction" value={`${fmt(kgToT(kg), 3)} t`} />
                <Mini label="Points" value={pts.toLocaleString()} />
              </dl>

              {progress != null && (
                <div className="mt-3">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {fmt(progress, 0)}% of {c.target_value} {c.target_unit ?? "kg CO₂e"}
                  </p>
                </div>
              )}

              {(c.reward || c.department || c.facility) && (
                <p className="mt-3 text-[11px] text-muted-foreground">
                  {c.reward ? `Reward: ${c.reward}. ` : ""}
                  {c.department ? `Department: ${c.department}. ` : ""}
                  {c.facility ? `Facility: ${c.facility}.` : ""}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {joined ? (
                  <button
                    onClick={() => leave(c.id)}
                    className="tgs-btn tgs-btn-sm"
                  >
                    Leave
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      join(c.id, c.team_based ? (me?.profile.department ?? "Team") : null)
                    }
                    disabled={!c.active}
                    className="tgs-btn tgs-btn-primary tgs-btn-sm"
                  >
                    Join
                  </button>
                )}
                {admin && (
                  <button
                    onClick={() => toggleActive(c.id, !c.active)}
                    className="tgs-btn tgs-btn-sm"
                  >
                    {c.active ? "Close" : "Reopen"}
                  </button>
                )}
              </div>
            </article>
          );
        })}
        {challenges.length === 0 && (
          <p className="text-sm text-muted-foreground">No challenges yet.</p>
        )}
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted px-2 py-2">
      <dt className="text-[11px] text-muted-foreground">{label}</dt>
      <dd className="text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}

function CreateForm({ onDone }: { onDone: () => void }) {
  const { data: me } = useMe();
  const invalidate = useInvalidateNetlow();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "commuting",
    start_date: new Date().toISOString().slice(0, 10),
    end_date: new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10),
    team_based: false,
    points_per_unit: "10",
    target_value: "",
    target_unit: "kg CO₂e",
    department: "",
    facility: "",
    reward: "",
  });
  const [err, setErr] = useState<string | null>(null);
  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!me) return;
    const { data, error } = await supabase
      .from("challenges")
      .insert({
        company_id: me.profile.company_id,
        title: form.title,
        description: form.description || null,
        category: form.category,
        start_date: form.start_date,
        end_date: form.end_date,
        team_based: form.team_based,
        points_per_unit: Number(form.points_per_unit) || 10,
        target_value: form.target_value ? Number(form.target_value) : null,
        target_unit: form.target_unit || null,
        department: form.department || null,
        facility: form.facility || null,
        reward: form.reward || null,
        created_by: me.userId,
      })
      .select("id")
      .single();
    if (error) return setErr(error.message);
    await writeAudit({
      company_id: me.profile.company_id,
      actor_id: me.userId,
      actor_name: me.profile.full_name || me.email,
      entity: "challenge",
      entity_id: data?.id,
      action: "created",
      detail: { title: form.title },
    });
    invalidate();
    onDone();
  }

  const cls =
    "tgs-input";

  return (
    <form onSubmit={save} className="rounded-xl border border-border bg-card p-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <L label="Title">
          <input required value={form.title} onChange={(e) => set("title", e.target.value)} className={cls} />
        </L>
        <L label="Category">
          <select value={form.category} onChange={(e) => set("category", e.target.value)} className={cls}>
            {CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
            <option value="any">Any activity</option>
          </select>
        </L>
        <L label="Reward (employer funded)">
          <input value={form.reward} onChange={(e) => set("reward", e.target.value)} className={cls} />
        </L>
        <L label="Start">
          <input type="date" value={form.start_date} onChange={(e) => set("start_date", e.target.value)} className={cls} />
        </L>
        <L label="End">
          <input type="date" value={form.end_date} onChange={(e) => set("end_date", e.target.value)} className={cls} />
        </L>
        <L label="Points per kg CO₂e">
          <input type="number" value={form.points_per_unit} onChange={(e) => set("points_per_unit", e.target.value)} className={cls} />
        </L>
        <L label="Target (optional)">
          <input type="number" value={form.target_value} onChange={(e) => set("target_value", e.target.value)} className={cls} />
        </L>
        <L label="Department (optional)">
          <input value={form.department} onChange={(e) => set("department", e.target.value)} className={cls} />
        </L>
        <L label="Facility (optional)">
          <input value={form.facility} onChange={(e) => set("facility", e.target.value)} className={cls} />
        </L>
        <L label="Description">
          <input value={form.description} onChange={(e) => set("description", e.target.value)} className={cls} />
        </L>
        <label className="flex items-center gap-2 self-end text-sm text-foreground">
          <input
            type="checkbox"
            checked={form.team_based}
            onChange={(e) => set("team_based", e.target.checked)}
          />
          Team based
        </label>
      </div>
      {err && <p className="mt-3 text-sm text-destructive">{err}</p>}
      <button className="tgs-btn tgs-btn-primary mt-4">
        Create challenge
      </button>
    </form>
  );
}

function L({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
