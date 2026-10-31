// Vendored from the Lynkk repo (design-lab/grid/tokens.ts) on 2026-10-29, so the kit runs on its own.
// If the brand changes, copy the file again; never edit it here.
/**
 * Grid · the Lynkk design system, v3. TypeScript mirror of tokens.css for
 * consumers that cannot read CSS variables (React Native, email templates,
 * OG image routes, framer motion). tokens.css is the source of truth.
 */

export const palette = {
  black: "#111111",
  coal: "#171717",
  coal2: "#1d1d1d",
  coal3: "#2e2e2e",
  ruleNight: "#292c31",
  white: "#ffffff",
  paper: "#f9f9fa",
  mist: "#f5f5f5",
  ruleDay: "#e0e3e9",
  sand: "#ece9e2",
  sand2: "#eeebe4",
  stone: "#dbdad6",
  glassLine: "rgb(218 215 208 / 0.3)",
  ring: "rgb(255 255 255 / 0.1)",
  violet: "#7063be",
  violetTint: "#e2e0f2",
  lavender: "#beb4fb",
  orange: "#f57b3a",
  forest: "#235634",
  leaf: "#93b45c",
  pink: "#f7b7ef",
  live: "#ff3b30",
} as const;

/** Fixed categorical order. Validated; do not reorder or cycle. */
export const series = {
  day: ["#e0692a", "#7063be", "#2f7a4a", "#c24fb0", "#7a9a3e"],
  night: ["#e06a2b", "#8a80dc", "#3b8e5b", "#c965b9", "#8f9f3f"],
} as const;
export const sequential = ["#e2e0f2", "#beb4fb", "#978bdc", "#7063be", "#4c418f"] as const;

export const band = {
  day: {
    bg: palette.white,
    surface: palette.white,
    raised: palette.paper,
    ink: palette.black,
    ink2: "rgba(17,17,17,0.5)",
    ink3: "rgba(17,17,17,0.3)",
    line: palette.ruleDay,
  },
  night: {
    bg: palette.black,
    surface: palette.coal,
    raised: palette.coal2,
    ink: palette.white,
    ink2: "rgba(255,255,255,0.5)",
    ink3: "rgba(255,255,255,0.3)",
    line: palette.ruleNight,
  },
} as const;

export const font = {
  family: "Inter",
  regular: 400,
  medium: 500,
  trackTight: "-0.04em",
  trackSnug: "-0.02em",
} as const;

/** [size px, line-height] at 1920. */
export const type = {
  display: [50, 1.2],
  displayCta: [50, 1.3],
  h2: [40, 1.3],
  h3: [30, 1.3],
  lead: [22, 1.5],
  bodyLg: [18, 1.5],
  title: [16, 1.25],
  body: [15, 1.5],
  label: [14, 1.2],
  eyebrow: [12, 1.5],
  ui: [11, 1.5],
  uiXs: [9, 1.5],
} as const;

export const space = { 1: 5, 2: 10, 3: 20, 4: 30, 5: 40, 6: 60, 7: 100 } as const;
export const radius = { xs: 8, btn: 5, card: 10, windowBody: 12, inner: 15, pill: 20, glass: 21, window: 24, shell: 25, full: 999 } as const;
export const layout = { col: 1350, rail: 140, gutter: 30, navH: 70, divider: 140, btnH: 43 } as const;

export const motion = {
  easeOut: [0.22, 1, 0.36, 1] as const,
  easeInOut: [0.65, 0, 0.35, 1] as const,
  fast: 0.15,
  base: 0.25,
  slow: 0.7,
  stagger: 0.06,
  rise: 16,
} as const;
