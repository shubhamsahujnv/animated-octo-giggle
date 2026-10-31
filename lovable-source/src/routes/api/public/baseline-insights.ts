import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Body = z.object({
  region: z.string().max(8).optional(),
  year: z.string().max(12).optional(),
  baseline: z
    .object({ s1: z.number(), s2loc: z.number(), s2mkt: z.number(), s3: z.number(), total: z.number() })
    .partial()
    .optional(),
  inventory: z
    .object({
      s1: z.number().nullable(),
      s2loc: z.number().nullable(),
      s2mkt: z.number().nullable(),
      s3: z.number().nullable(),
      total: z.number().nullable(),
    })
    .partial()
    .nullable()
    .optional(),
  categories: z
    .array(z.object({ name: z.string().max(120), scope: z.number(), tco2e: z.number() }))
    .max(30)
    .optional(),
});

const REGION = { US: "United States", IN: "India", GL: "international default" } as const;

export const Route = createFileRoute("/api/public/baseline-insights")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return new Response("AI is not configured.", { status: 500 });

        let parsed;
        try {
          parsed = Body.parse(await request.json());
        } catch {
          return new Response("Invalid request.", { status: 400 });
        }

        const region = REGION[(parsed.region ?? "GL") as keyof typeof REGION] ?? "international default";
        const prompt = [
          `Region and factor set: ${region}. Baseline year: ${parsed.year || "not stated"}.`,
          `Reported baseline (tCO2e): ${JSON.stringify(parsed.baseline ?? {})}`,
          `Inventory calculated from activity data (tCO2e): ${JSON.stringify(parsed.inventory ?? null)}`,
          `Category breakdown: ${JSON.stringify(parsed.categories ?? [])}`,
        ].join("\n");

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": apiKey,
            "X-Lovable-AIG-SDK": "fetch",
          },
          body: JSON.stringify({
            model: "google/gemini-3.8-flash",
            stream: true,
            messages: [
              {
                role: "system",
                content:
                  "You are a corporate GHG accounting reviewer (ISO 14064-1, GHG Protocol). Given a company's reported baseline versus its calculated inventory, write a short, plain-English brief: 1) the biggest gaps between baseline and inventory and the likely cause of each (missing activity lines, boundary difference, stale factor), 2) the top emission hotspots, 3) three to five concrete reduction actions ranked by likely impact, with the relevant region's regulatory context. Max 350 words. Use short headed sections and simple bullet lines, no markdown symbols.",
              },
              { role: "user", content: prompt },
            ],
          }),
        });

        if (!res.ok || !res.body) {
          const detail = await res.text().catch(() => "");
          const message =
            res.status === 429
              ? "Too many requests right now. Try again in a moment."
              : res.status === 402
                ? "AI credits are exhausted for this workspace."
                : `AI request failed (${res.status}). ${detail.slice(0, 200)}`;
          return new Response(message, { status: res.status });
        }

        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        let buffer = "";

        const transform = new TransformStream<Uint8Array, Uint8Array>({
          transform(chunk, controller) {
            buffer += decoder.decode(chunk, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;
              const data = trimmed.slice(5).trim();
              if (!data || data === "[DONE]") continue;
              try {
                const json = JSON.parse(data);
                const delta = json?.choices?.[0]?.delta?.content;
                if (delta) controller.enqueue(encoder.encode(delta));
              } catch {
                /* partial event */
              }
            }
          },
          flush(controller) {
            controller.enqueue(encoder.encode("\u0000"));
          },
        });

        return new Response(res.body.pipeThrough(transform), {
          headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
        });
      },
    },
  },
});
