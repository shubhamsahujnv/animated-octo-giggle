import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { TgsLogo } from "@/components/tgs-brand";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in — Net-Low by TGS" },
      {
        name: "description",
        content:
          "Sign in to Net-Low, the TGS employee engagement platform for sustainability challenges, activity evidence and audit-ready emissions reporting.",
      },
      { property: "og:title", content: "Sign in — Net-Low by TGS" },
      {
        property: "og:description",
        content: "Run sustainability challenges, capture evidence and report defensible reductions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search["redirect"] === "string" ? (search["redirect"] as string) : undefined,
  }),
  component: AuthPage,
});

function safePath(p?: string) {
  return p && p.startsWith("/") && !p.startsWith("//") ? p : "/netlow";
}

function AuthPage() {
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/auth" });
  const dest = safePath(redirect);

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [department, setDepartment] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: dest });
    });
  }, [dest, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setMsg(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}${dest}`,
            data: { full_name: fullName, company_name: companyName, department },
          },
        });
        if (error) throw error;
        const { data: s } = await supabase.auth.getSession();
        if (s.session) navigate({ to: dest });
        else setMsg("Check your inbox to confirm your address, then sign in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: dest });
      }
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    setErr(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setErr("Google sign-in did not complete.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: dest });
  }

  return (
    <main className="netlow-shell min-h-screen bg-background px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 flex items-center justify-between border-b-4 border-foreground pb-4">
          <div>
            <p className="font-mono text-xs font-bold uppercase text-primary">TGS workspace</p>
            <h1 className="tgs-display mt-1">NET-LOW.</h1>
          </div>
          <div className="flex size-16 items-center justify-center border-4 border-foreground bg-primary shadow-[5px_5px_0_var(--color-signal)]">
            <TgsLogo className="w-10 brightness-0 invert" />
          </div>
        </div>

        <div className="rounded-sm border-4 border-foreground bg-card p-6 shadow-[8px_8px_0_var(--color-foreground)] sm:p-8">
          <p className="mb-6 text-sm font-bold uppercase text-primary">Enter the workspace</p>
          <div className="mb-5 grid grid-cols-2 gap-2">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`rounded-sm border-2 border-foreground px-3 py-2 text-sm font-bold transition-colors ${
                  mode === m
                    ? "bg-signal text-primary"
                    : "bg-card text-foreground hover:bg-muted"
                }`}
              >
                {m === "signin" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            {mode === "signup" && (
              <>
                <Field label="Full name" value={fullName} onChange={setFullName} required />
                <Field
                  label="Company"
                  value={companyName}
                  onChange={setCompanyName}
                  required
                  hint="The first person to register a company becomes its administrator."
                />
                <Field label="Department (optional)" value={department} onChange={setDepartment} />
              </>
            )}
            <Field label="Work email" value={email} onChange={setEmail} type="email" required />
            <Field
              label="Password"
              value={password}
              onChange={setPassword}
              type="password"
              required
            />

            {err && (
              <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</p>
            )}
            {msg && (
              <p className="rounded-md bg-primary/10 px-3 py-2 text-sm text-primary">{msg}</p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="tgs-btn tgs-btn-primary w-full uppercase"
            >
              {busy ? "Working…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            onClick={onGoogle}
            className="tgs-btn w-full font-bold"
          >
            Continue with Google
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Net-Low points are engagement rewards. They are not carbon credits and cannot be traded.
        </p>
        <p className="mt-3 text-center text-xs">
          <a href="/" className="text-primary underline-offset-4 hover:underline">
            Back to Baseline
          </a>
        </p>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="tgs-input"
      />
      {hint && <span className="mt-1 block text-[11px] text-muted-foreground">{hint}</span>}
    </label>
  );
}
