import { NextResponse } from "next/server";
import { getService } from "@/lib/services";

/**
 * Enquiry endpoint: STUB.
 *
 * This validates and logs the payload so the form works end to end in
 * development, but it does not yet deliver anywhere. Wire ONE of these before
 * launch, or enquiries will be silently lost:
 *
 *   - the CRM or inbox Pixorama already uses for /#contact submissions
 *     (preferred, reuse the existing path rather than adding a second one)
 *   - a transactional email provider
 *   - a webhook into the existing enquiry workflow
 *
 * Until then the route returns 200 in development and 501 in production, so a
 * half-wired form cannot look successful to a real visitor.
 */

interface EnquiryPayload {
  name: string;
  email: string;
  message: string;
  service: string;
  company?: string;
  engagement?: string;
  heardAbout?: string;
  pageUrl?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const isNonEmpty = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const payload = body as Partial<EnquiryPayload>;

  // Minimal server-side validation: never trust the client's `required`.
  const missing = (["name", "email", "message", "service"] as const).filter(
    (field) => !isNonEmpty(payload[field]),
  );
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email!)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  // Reject a service slug that is not one of ours, so the attribution field
  // cannot be used to write arbitrary values into the lead record.
  if (!getService(payload.service!)) {
    return NextResponse.json({ error: "Unknown service" }, { status: 400 });
  }

  if (process.env.NODE_ENV === "production") {
    console.error("[enquiry] endpoint not wired, enquiry NOT delivered", {
      service: payload.service,
      pageUrl: payload.pageUrl,
    });
    return NextResponse.json(
      { error: "Enquiry delivery is not configured." },
      { status: 501 },
    );
  }

  console.info("[enquiry] received (development stub)", payload);
  return NextResponse.json({ ok: true });
}
