/**
 * The site already loads gtag.js (G-1DT0WH31GK on the homepage). This declares
 * it for TypeScript without pulling in a dependency.
 *
 * Confirm the measurement ID is Pixorama's own GA4 property before relying on
 * these events — ownership is an open client question.
 */
declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

export {};
