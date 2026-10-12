import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Building2,
  FileText,
  FolderUp,
  LayoutDashboard,
  LogOut,
  Plug,
  Sparkles,
  Trophy,
} from "lucide-react";

import { TgsLogo } from "@/components/tgs-brand";
import { isAdmin, isManager, useMe } from "@/hooks/use-netlow";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/netlow")({
  component: NetlowLayout,
});

function NetlowLayout() {
  const { data: me, isLoading } = useMe();
  const navigate = useNavigate();

  const links = [
    { to: "/netlow", label: "My dashboard", show: true, icon: LayoutDashboard },
    { to: "/netlow/challenges", label: "Challenges", show: true, icon: Trophy },
    { to: "/netlow/log", label: "Log activity", show: true, icon: Activity },
    { to: "/netlow/documents", label: "Documents", show: true, icon: FolderUp },
    { to: "/netlow/review", label: "Review queue", show: isManager(me), icon: Sparkles },
    { to: "/netlow/company", label: "Company dashboard", show: isManager(me), icon: BarChart3 },
    { to: "/netlow/reports", label: "Reports", show: isManager(me), icon: FileText },
    { to: "/netlow/integrations", label: "Integrations", show: isAdmin(me), icon: Plug },
  ];

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", search: { redirect: undefined } });
  }

  return (
    <div className="netlow-shell min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b-2 border-foreground bg-card">
        <div className="h-2 bg-signal" />
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <TgsLogo />
            <span className="h-9 w-0.5 bg-foreground" aria-hidden="true" />
            <div className="min-w-0">
              <p className="font-display whitespace-nowrap text-xl font-bold leading-none text-foreground">NET-LOW</p>
              <p className="mt-1 truncate text-[11px] font-medium text-muted-foreground">
                {me?.company?.name ?? "Employee engagement platform"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            {me?.roles.map((r) => (
              <span
                key={r}
                className="border-2 border-foreground bg-signal px-2 py-1 font-bold uppercase text-primary"
              >
                {r}
              </span>
            ))}
            <a
              href="/"
              className="tgs-btn tgs-btn-sm"
            >
              <Building2 className="size-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Baseline</span>
            </a>
            <Link to="/blog" className="tgs-btn tgs-btn-sm">
              Blog
            </Link>
            <button
              onClick={signOut}
              aria-label="Sign out"
              className="tgs-btn tgs-btn-sm size-9 p-0"
            >
              <LogOut className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        <nav className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6">
          <ul className="flex min-w-max gap-2 pb-3">
            {links
              .filter((l) => l.show)
              .map((l) => {
                const Icon = l.icon;
                return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    activeOptions={{ exact: l.to === "/netlow" }}
                    activeProps={{ className: "bg-primary text-primary-foreground shadow-[3px_3px_0_var(--color-signal)]" }}
                    inactiveProps={{ className: "bg-card text-foreground hover:bg-signal hover:text-primary" }}
                    className="flex min-h-10 items-center gap-2 whitespace-nowrap rounded-sm border-2 border-foreground px-3 py-1.5 text-sm font-bold transition-all"
                  >
                    <Icon className="size-3.5" aria-hidden="true" />
                    {l.label}
                  </Link>
                </li>
                );
              })}
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading your workspace…</p>
        ) : (
          <Outlet />
        )}
      </main>

      <footer className="mx-auto flex max-w-7xl flex-wrap items-start gap-3 border-t border-border px-4 pb-10 pt-5 text-xs text-muted-foreground sm:px-6">
        <TgsLogo className="mt-0.5 w-7 opacity-70" />
        <p className="min-w-0 flex-1">
          Net-Low points are engagement rewards. They are not carbon credits, are not tradable, and
          are never assigned to individual employees as verified reductions.
        </p>
        <Link to="/blog" className="font-semibold underline underline-offset-4 hover:text-foreground">
          Blog
        </Link>
      </footer>
    </div>
  );
}
