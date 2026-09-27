import { useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import type { EmissionFactor } from "@/lib/netlow";

export type Role = "employee" | "admin" | "reviewer";

export type Me = {
  userId: string;
  email: string;
  profile: {
    id: string;
    company_id: string;
    full_name: string;
    email: string;
    department: string | null;
    facility: string | null;
    data_consent: boolean;
  };
  company: {
    id: string;
    name: string;
    slug: string;
    reporting_period_start: string;
    reporting_period_end: string;
    boundary_note: string | null;
  };
  roles: Role[];
};

export function useMe() {
  return useQuery({
    queryKey: ["netlow", "me"],
    queryFn: async (): Promise<Me | null> => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return null;
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      if (error) throw error;
      if (!profile) return null;
      const [{ data: company }, { data: roles }] = await Promise.all([
        supabase.from("companies").select("*").eq("id", profile.company_id).maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", user.id),
      ]);
      return {
        userId: user.id,
        email: user.email ?? "",
        profile: profile as Me["profile"],
        company: company as Me["company"],
        roles: (roles ?? []).map((r) => r.role as Role),
      };
    },
  });
}

export const isManager = (me?: Me | null) =>
  !!me && (me.roles.includes("admin") || me.roles.includes("reviewer"));
export const isAdmin = (me?: Me | null) => !!me && me.roles.includes("admin");

export function useFactors() {
  return useQuery({
    queryKey: ["netlow", "factors"],
    queryFn: async (): Promise<EmissionFactor[]> => {
      const { data, error } = await supabase
        .from("emission_factors")
        .select("*")
        .eq("active", true)
        .order("label");
      if (error) throw error;
      return (data ?? []) as unknown as EmissionFactor[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useChallenges() {
  return useQuery({
    queryKey: ["netlow", "challenges"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("challenges")
        .select("*")
        .order("start_date", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useMySubmissions(userId?: string) {
  return useQuery({
    enabled: !!userId,
    queryKey: ["netlow", "submissions", "mine", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("activity_submissions")
        .select("*")
        .eq("user_id", userId!)
        .order("activity_date", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useCompanySubmissions(enabled: boolean) {
  return useQuery({
    enabled,
    queryKey: ["netlow", "submissions", "company"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("activity_submissions")
        .select("*")
        .order("activity_date", { ascending: false })
        .limit(2000);
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useProfiles() {
  return useQuery({
    queryKey: ["netlow", "profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useAuditLog() {
  return useQuery({
    queryKey: ["netlow", "audit"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("audit_log")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) throw error;
      return data ?? [];
    },
  });
}

export async function writeAudit(entry: {
  company_id: string;
  actor_id: string;
  actor_name: string;
  entity: string;
  entity_id?: string | null;
  action: string;
  detail?: Record<string, unknown>;
}) {
  await supabase.from("audit_log").insert({ detail: {}, ...entry } as never);
}

export function useInvalidateNetlow() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: ["netlow"] });
}
