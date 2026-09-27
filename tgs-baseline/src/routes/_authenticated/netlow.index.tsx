import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FilePlus2, Trophy, Zap } from "lucide-react";

import {
  useChallenges,
  useMe,
  useMySubmissions,
  useProfiles,
  useCompanySubmissions,
  isManager,
} from "@/hooks/use-netlow";
import { BADGES, fmt, kgToT, streakDays } from "@/lib/netlow";

export const Route = createFileRoute("/_authenticated/netlow/")({
  head: () => ({ meta: pageMeta("Net-Low Dashboard", "Track your sustainability actions, points, challenges and approved emissions reductions.") }),
  component: MyDashboard,
});

function pageMeta(title: string, description: string) {
  return [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }];
}

function MyDashboard() {
  const { data: me } = useMe();
  const { data: subs = [] } = useMySubmissions(me?.userId);
  const { data: challenges = [] } = useChallenges();
  const { data: profiles = [] } = useProfiles();
  const { data: all = [] } = useCompanySubmissions(!!me);

  const approved = subs.filter((s) => s.status === "approved");
  const pending = subs.filter((s) => s.status === "pending");
  const points = approved.reduce((n, s) => n + (s.points ?? 0), 0);
  const reduction = approved.reduce((n, s) => n + Number(s.reduction_kg ?? 0), 0);
  const measured = approved.filter((s) => s.reduction_type === "measured").length;
  const streak = streakDays(approved.map((s) => String(s.activity_date)));
  const stats = { approved: approved.length, streak, reduction_kg: reduction, measured };
  const earned = BADGES.filter((b) => b.test(stats));

  const board = Object.values(
    all
      .filter((s) => s.status === "approved")
      .reduce<Record<string, { id: string; points: number; kg: number }>>((acc, s) => {
        const k = s.user_id;
        acc[k] = acc[k] ?? { id: k, points: 0, kg: 0 };
        acc[k]!.points += s.points ?? 0;
        acc[k]!.kg += Number(s.reduction_kg ?? 0);
        return acc;
      }, {}),
  )
    .sort((a, b) => b.points - a.points)
    .slice(0, 8);

  const nameOf = (id: string) =>
    profiles.find((p) => p.id === id)?.full_name || (id === me?.userId ? "You" : "Colleague");

  const openChallenges = challenges.filter((c) => c.active);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="tgs-h1">
          Make impact{me?.profile.full_name ? `, ${me.profile.full_name.split(" ")[0]}.` : "."}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Choose an action. Keep the evidence. Build the result.</p>
      </header>

      <section className="tgs-action-grid">
        <Link to="/netlow/log" className="tgs-action-tile">
          <Zap className="size-7" aria-hidden="true" />
          <span className="flex items-end justify-between gap-3 font-display text-xl font-bold">Log activity <ArrowRight className="size-5" /></span>
        </Link>
        <Link to="/netlow/challenges" className="tgs-action-tile">
          <Trophy className="size-7 text-mauve" aria-hidden="true" />
          <span className="flex items-end justify-between gap-3 font-display text-xl font-bold">Join a challenge <ArrowRight className="size-5" /></span>
        </Link>
        <Link to="/netlow/reports" className="tgs-action-tile">
          <FilePlus2 className="size-7 text-primary" aria-hidden="true" />
          <span className="flex items-end justify-between gap-3 font-display text-xl font-bold">Open reports <ArrowRight className="size-5" /></span>
        </Link>
      </section>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Net-Low points" value={points.toLocaleString()} note="Engagement reward" />
        <Stat
          label="Approved reductions"
          value={`${fmt(kgToT(reduction), 3)} tCO₂e`}
          note={`${measured} measured`}
        />
        <Stat label="Current streak" value={`${streak} day${streak === 1 ? "" : "s"}`} />
        <Stat label="Awaiting approval" value={String(pending.length)} note="Not yet counted" />
      </section>

      <section className="rounded-sm border-2 border-foreground bg-card p-4">
        <h2 className="tgs-h2">Badges</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {BADGES.map((b) => {
            const has = earned.some((e) => e.key === b.key);
            return (
              <span
                key={b.key}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  has
                    ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {b.label}
              </span>
            );
          })}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-sm border-2 border-foreground bg-card p-4">
          <div className="flex items-center justify-between">
            <h2 className="tgs-h2">Open challenges</h2>
            <Link to="/netlow/challenges" className="text-xs text-primary hover:underline">
              View all
            </Link>
          </div>
          {openChallenges.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Nothing running yet. {isManager(me) ? "Create one from Challenges." : "Check back soon."}
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {openChallenges.slice(0, 5).map((c) => (
                <li
                  key={c.id}
                  className="rounded-lg border border-border px-3 py-2 text-sm text-foreground"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{c.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {c.team_based ? "Team" : "Individual"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {c.start_date} to {c.end_date} · {c.points_per_unit} pts per kg CO₂e
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-sm border-2 border-foreground bg-card p-4">
          <h2 className="tgs-h2">Leaderboard</h2>
          {board.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">No approved activities yet.</p>
          ) : (
            <ol className="mt-3 space-y-1">
              {board.map((row, i) => (
                <li
                  key={row.id}
                  className={`flex items-center justify-between rounded-md px-3 py-2 text-sm ${
                    row.id === me?.userId ? "bg-primary/10 text-primary" : "text-foreground"
                  }`}
                >
                  <span className="truncate">
                    {i + 1}. {nameOf(row.id)}
                  </span>
                  <span className="whitespace-nowrap text-xs">
                    {row.points.toLocaleString()} pts · {fmt(kgToT(row.kg), 3)} t
                  </span>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>

      <section className="rounded-sm border-2 border-foreground bg-card p-4">
        <div className="flex items-center justify-between">
          <h2 className="tgs-h2">My recent activity</h2>
          <Link
            to="/netlow/log"
            className="tgs-btn tgs-btn-primary tgs-btn-sm"
          >
            Log activity
          </Link>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="py-2">Date</th>
                <th>Activity</th>
                <th>Reduction</th>
                <th>Type</th>
                <th>Points</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {subs.slice(0, 12).map((s) => (
                <tr key={s.id} className="border-t border-border">
                  <td className="py-2 whitespace-nowrap">{s.activity_date}</td>
                  <td className="capitalize">{String(s.category).replace(/_/g, " ")}</td>
                  <td>{fmt(Number(s.reduction_kg), 2)} kg</td>
                  <td className="capitalize">{s.reduction_type}</td>
                  <td>{s.status === "approved" ? s.points : "—"}</td>
                  <td>
                    <StatusPill status={String(s.status)} />
                  </td>
                </tr>
              ))}
              {subs.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-4 text-sm text-muted-foreground">
                    Nothing logged yet.
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

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-sm border-2 border-foreground bg-card p-4 shadow-[4px_4px_0_var(--color-foreground)]">
      <p className="text-xs font-bold uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-foreground">{value}</p>
      {note && <p className="text-[11px] text-muted-foreground">{note}</p>}
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const tone =
    status === "approved"
      ? "bg-primary/10 text-primary"
      : status === "rejected"
        ? "bg-destructive/10 text-destructive"
        : "bg-muted text-muted-foreground";
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${tone}`}>
      {status}
    </span>
  );
}
