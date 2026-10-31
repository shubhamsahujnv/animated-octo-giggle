/**
 * Copied verbatim from the Lynkk repo, apps/decibel-web/src/components/landing/grid/dot/expressions.ts.
 *
 * Dot's faces. Every value is relative to neutral: eye size and lid are
 * multipliers, offsets are in viewBox units (the body is drawn in 0..100).
 * dot-body.tsx springs between these, so a new face is one entry here.
 */
export type Expression =
  "neutral" | "happy" | "curious" | "listening" | "thinking" | "sleepy" | "dizzy" | "grumpy" | "wave" | "blink";

export type Face = {
  /** Eye width and height, times neutral. */
  eyeW: number;
  eyeH: number;
  /** Per-eye lid, times eyeH: a wink is one lid near 0. */
  lidL: number;
  lidR: number;
  /** Where the eyes sit and look, added to neutral. */
  eyeX: number;
  eyeY: number;
  /** Extra space between the eyes. */
  gap: number;
  /** Mouth: how visible (0..1), how curved (-1 frown .. 1 smile), half width. */
  mouth: number;
  smile: number;
  mouthW: number;
  /** Body: half width and height added to neutral, superellipse roundness, tilt in degrees. */
  bodyW: number;
  bodyH: number;
  round: number;
  tilt: number;
  /** The waving hand, 0..1. */
  hand: number;
};

export const NEUTRAL: Face = {
  eyeW: 1,
  eyeH: 1,
  lidL: 1,
  lidR: 1,
  eyeX: 0,
  eyeY: 0,
  gap: 0,
  mouth: 0,
  smile: 0,
  mouthW: 5,
  bodyW: 0,
  bodyH: 0,
  round: 2.35,
  tilt: 0,
  hand: 0,
};

const face = (f: Partial<Face>): Face => ({ ...NEUTRAL, ...f });

export const EXPRESSIONS: Record<Expression, Face> = {
  neutral: NEUTRAL,
  happy: face({ eyeH: 0.42, eyeY: -1, mouth: 1, smile: 1, mouthW: 6, bodyH: 1, round: 2.8 }),
  curious: face({ eyeW: 1.1, eyeH: 1.15, lidL: 0.8, eyeX: 2, gap: 1, tilt: 6 }),
  listening: face({ eyeW: 1.05, eyeH: 1.1, eyeY: -1, mouth: 0.8, smile: 0, mouthW: 2.5, bodyH: 1 }),
  thinking: face({ eyeW: 0.9, eyeH: 0.85, eyeX: 4, eyeY: -5, mouth: 1, smile: -0.2, mouthW: 3, tilt: -4 }),
  sleepy: face({ eyeH: 0.14, eyeY: 3, mouth: 0.6, smile: 0, mouthW: 2, bodyW: 2, bodyH: -3, round: 2.3, tilt: -5 }),
  dizzy: face({ lidL: 1.35, lidR: 0.55, eyeY: -1, mouth: 1, smile: -0.4, mouthW: 4, tilt: 9, round: 2.2 }),
  grumpy: face({ eyeH: 0.5, eyeY: 1, gap: -1, mouth: 1, smile: -0.7, mouthW: 4, bodyW: 1, round: 2.4 }),
  wave: face({ eyeH: 0.42, eyeY: -1, mouth: 1, smile: 1, mouthW: 6, tilt: -6, hand: 1 }),
  blink: face({ eyeH: 0.1 }),
};
