"use client";

import { useEffect, useRef, useState } from "react";
import { ENGAGEMENT_MODELS } from "@/lib/services";

/**
 * Per-service enquiry form.
 *
 * Reuses the site's existing form markup (form / form__row / field / req /
 * form__foot / btn btn--brand) so it inherits current styles.
 *
 * Three things here are not cosmetic, and are the reason the pages can be
 * measured per page at all:
 *
 *  1. `service` is submitted with every enquiry, so leads are attributable to
 *     the page that produced them rather than to the site as a whole.
 *  2. UTM parameters are read on first landing and persisted for the session,
 *     because the visitor rarely converts on the page they arrived on.
 *  3. "How did you hear about us?" carries an explicit AI-assistant option.
 *     Most assistant-driven visits arrive as `direct`, so without this the AI
 *     channel is invisible no matter how the analytics are configured.
 */

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const UTM_STORE_KEY = "pixorama.utm";

const HEARD_OPTIONS = [
  "Search engine",
  "AI assistant (ChatGPT, Claude, Perplexity etc.)",
  "Referral or word of mouth",
  "Social media",
  "Event or conference",
  "Other",
] as const;

type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/** Read UTMs from the URL, else fall back to what was stored this session. */
function resolveUtm(): Utm {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const fromUrl: Utm = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value;
  }

  try {
    if (Object.keys(fromUrl).length > 0) {
      window.sessionStorage.setItem(UTM_STORE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const stored = window.sessionStorage.getItem(UTM_STORE_KEY);
    return stored ? (JSON.parse(stored) as Utm) : {};
  } catch {
    // Private mode or blocked storage — the form still works without UTMs.
    return fromUrl;
  }
}

type Status = "idle" | "submitting" | "sent" | "error";

export function ServiceEnquiryForm({
  service,
  serviceLabel,
  endpoint = "/api/enquiry",
}: {
  service: string;
  serviceLabel: string;
  endpoint?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const source = useRef<{ pageUrl: string; referrer: string; utm: Utm }>({
    pageUrl: "",
    referrer: "",
    utm: {},
  });

  useEffect(() => {
    source.current = {
      pageUrl: window.location.href,
      referrer: document.referrer,
      utm: resolveUtm(),
    };
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setError(null);

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      engagement: String(data.get("type") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      heardAbout: String(data.get("heard_about") ?? "").trim(),
      service,
      serviceLabel,
      pageUrl: source.current.pageUrl,
      referrer: source.current.referrer,
      ...source.current.utm,
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Enquiry failed with status ${response.status}`);

      setStatus("sent");
      form.reset();

      // GA4 conversion event. `service` is sent as a parameter so leads can be
      // reported per page, which is the number the strategy reports on.
      window.gtag?.("event", "generate_lead", {
        service,
        service_label: serviceLabel,
        heard_about: payload.heardAbout || "(not stated)",
        page_url: payload.pageUrl,
      });
    } catch (cause) {
      setStatus("error");
      setError(
        "That did not send. Please email us instead, or try again in a moment.",
      );
      // Surfaced for diagnosis; never shown raw to the visitor.
      console.error("[enquiry] submit failed", cause);
    }
  }

  if (status === "sent") {
    return (
      <div className="form" role="status" aria-live="polite">
        <p className="lead">Thank you — your enquiry is with us.</p>
        <p className="form__note">
          A senior engineer will reply, usually within one business day.
        </p>
      </div>
    );
  }

  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      <div className="form__row">
        <div className="field">
          <label htmlFor="name">
            Name <span className="req">*</span>
          </label>
          <input id="name" type="text" name="name" placeholder="Jane Doe" required />
        </div>
        <div className="field">
          <label htmlFor="email">
            Work email <span className="req">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="jane@company.com"
            required
          />
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="company">Company</label>
          <input id="company" type="text" name="company" placeholder="Company name" />
        </div>
        <div className="field">
          <label htmlFor="type">Engagement</label>
          <select id="type" name="type" defaultValue="">
            <option value="" disabled>
              Select a model
            </option>
            {ENGAGEMENT_MODELS.map((model) => (
              <option key={model}>{model}</option>
            ))}
            <option>Not sure yet</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">
          What are you building? <span className="req">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          placeholder={`A few lines on the outcome you're chasing, the current state, and any deadlines.`}
        />
      </div>

      <div className="field">
        <label htmlFor="heard_about">How did you hear about us?</label>
        <select id="heard_about" name="heard_about" defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {HEARD_OPTIONS.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="form__foot">
        <p className="form__note">
          We&apos;ll only use your details to respond to this enquiry.
        </p>
      </div>

      {status === "error" && error ? (
        <p className="form__note svc__error" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="btn btn--brand"
        style={{ marginTop: 12 }}
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Send enquiry"}{" "}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="18"
          height="18"
          className="arw"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </form>
  );
}
