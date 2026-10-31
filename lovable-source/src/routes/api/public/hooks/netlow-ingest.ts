import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { CALC_VERSION, calculate, categoryByKey, dedupeHash } from "@/lib/netlow";
import type { CategoryKey, EmissionFactor } from "@/lib/netlow";

const RowSchema = z.object({
  employee_email: z.string().trim().email().max(255),
  activity_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: z.string().trim().max(40).optional(),
  baseline_mode: z.string().trim().max(60),
  alternative_mode: z.string().trim().max(60).optional().nullable(),
  quantity: z.number().nonnegative().max(1_000_000),
  unit: z.string().trim().max(10).default("km"),
  occurrences: z.number().int().positive().max(1000).default(1),
  location: z.string().trim().max(120).optional(),
  frequency: z.string().trim().max(20).default("one-off"),
  external_ref: z.string().trim().max(120).optional(),
  note: z.string().trim().max(500).optional(),
});

const BodySchema = z.object({ rows: z.array(RowSchema).min(1).max(500) });

export const Route = createFileRoute("/api/public/hooks/netlow-ingest")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = request.headers.get("x-netlow-key");
        if (!key || key.length < 20) return json({ error: "Missing feed key" }, 401);

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return json({ error: "Invalid JSON body" }, 400);
        }
        const parsed = BodySchema.safeParse(body);
        if (!parsed.success) return json({ error: "Invalid payload", issues: parsed.error.issues }, 400);

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { data: integration } = await supabaseAdmin
          .from("integrations")
          .select("id, company_id, system, name, default_category")
          .eq("inbound_key", key)
          .maybeSingle();
        if (!integration) return json({ error: "Unknown feed key" }, 401);

        const { data: factorRows } = await supabaseAdmin
          .from("emission_factors")
          .select("*")
          .eq("active", true);
        const factors = new Map<string, EmissionFactor>();
        for (const f of (factorRows ?? []) as unknown as EmissionFactor[]) {
          if (f.company_id == null || f.company_id === integration.company_id) {
            factors.set(f.activity_key, f);
          }
        }

        const emails = [...new Set(parsed.data.rows.map((r) => r.employee_email.toLowerCase()))];
        const { data: people } = await supabaseAdmin
          .from("profiles")
          .select("id, email")
          .eq("company_id", integration.company_id)
          .in("email", emails);
        const byEmail = new Map((people ?? []).map((p) => [p.email.toLowerCase(), p.id]));

        let accepted = 0;
        const rejected: { row: number; reason: string }[] = [];

        for (const [i, row] of parsed.data.rows.entries()) {
          const userId = byEmail.get(row.employee_email.toLowerCase());
          if (!userId) {
            rejected.push({ row: i, reason: "employee not found in this company" });
            continue;
          }
          const baseline = factors.get(row.baseline_mode);
          if (!baseline) {
            rejected.push({ row: i, reason: `unknown baseline activity ${row.baseline_mode}` });
            continue;
          }
          const alternative = row.alternative_mode ? factors.get(row.alternative_mode) : null;
          const category = (row.category ??
            integration.default_category ??
            "business_travel") as CategoryKey;
          const cat = categoryByKey(category);

          const result = calculate({
            category: cat.key,
            quantity: row.quantity,
            unit: row.unit,
            occurrences: row.occurrences,
            baselineFactor: baseline,
            actualFactor: alternative ?? null,
            evidenceType: "system",
          });

          const hash = dedupeHash([
            userId,
            cat.key,
            row.activity_date,
            row.baseline_mode,
            row.alternative_mode ?? "",
            row.quantity,
            row.unit,
            row.occurrences,
            row.external_ref ?? "",
          ]);

          const { error } = await supabaseAdmin.from("activity_submissions").insert({
            company_id: integration.company_id,
            user_id: userId,
            category: cat.key,
            activity_date: row.activity_date,
            location: row.location ?? null,
            frequency: row.frequency,
            occurrences: row.occurrences,
            baseline_mode: row.baseline_mode,
            alternative_mode: row.alternative_mode ?? null,
            quantity: row.quantity,
            unit: row.unit,
            baseline_factor_id: baseline.id,
            actual_factor_id: alternative?.id ?? null,
            factor_snapshot: result.factor_snapshot as never,
            baseline_kg: result.baseline_kg,
            actual_kg: result.actual_kg,
            reduction_kg: result.reduction_kg,
            scope: result.scope,
            ghg_category: result.ghg_category,
            reduction_type: result.reduction_type,
            evidence_type: "system",
            evidence_note: row.note ?? null,
            source_system: `${integration.system}:${integration.name}`,
            external_ref: row.external_ref ?? null,
            points: result.points,
            status: "pending",
            consent: true,
            calc_version: CALC_VERSION,
            dedupe_hash: hash,
          });

          if (error) {
            rejected.push({
              row: i,
              reason: error.message.includes("duplicate") ? "duplicate activity" : "insert failed",
            });
          } else {
            accepted++;
          }
        }

        await supabaseAdmin
          .from("integrations")
          .update({
            last_sync_at: new Date().toISOString(),
            last_sync_rows: accepted,
            status: "connected",
          })
          .eq("id", integration.id);

        await supabaseAdmin.from("audit_log").insert({
          company_id: integration.company_id,
          actor_name: `${integration.system} feed`,
          entity: "integration",
          entity_id: integration.id,
          action: "ingested",
          detail: { accepted, rejected: rejected.length } as never,
        });

        return json({ accepted, rejected }, 200);
      },
    },
  },
});

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
