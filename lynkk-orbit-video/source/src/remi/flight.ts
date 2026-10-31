import { clamp, inOut, lerp, springAt, tween } from "../lib";
import { EXPRESSIONS, NEUTRAL, type Expression, type Face } from "./expressions";
import { RIG_REST, type Rig } from "./RemiBody";

/**
 * Remi's moves as numbers from the frame. A scene writes a FlightPlan (where
 * Remi is on which frame, which face, and any stunts) and remiAt() turns it
 * into a position, a rotation and a rig for RemiBody. Thrust and banking come
 * from the speed, the bob and the blinks run on their own, as on the site.
 */

/** Faces the teaser needs that the site does not have. */
export const EXTRA = {
  worried: { ...NEUTRAL, eyeW: 1.05, eyeH: 1.2, lidL: 0.85, lidR: 0.85, eyeY: -1.5, gap: -1, mouth: 1, smile: -0.55, mouthW: 3.5, tilt: 4 },
  shrug: { ...NEUTRAL, eyeH: 0.7, eyeY: -1, mouth: 1, smile: -0.15, mouthW: 4, tilt: -9, hand: 0 },
  wow: { ...NEUTRAL, eyeW: 1.15, eyeH: 1.25, eyeY: -1, mouth: 1, smile: 0.35, mouthW: 2.5, bodyH: 1 },
} satisfies Record<string, Face>;

export type FaceName = Expression | keyof typeof EXTRA;
const faceOf = (n: FaceName): Face => (n in EXPRESSIONS ? EXPRESSIONS[n as Expression] : EXTRA[n as keyof typeof EXTRA]);

/** A position on a frame. `arc` lifts the leg that arrives here (px, + is up). */
export type Key = { f: number; x: number; y: number; arc?: number; ease?: (t: number) => number };

export type FlightPlan = {
  path: Key[];
  faces: [number, FaceName][];
  /** Stunts: extra rotation, offsets and rig overrides on top of the path. */
  stunts?: ((f: number) => Partial<Stunt>)[];
  /** Turn off the auto blink (the hook does its own). */
  noBlink?: boolean;
};

export type Stunt = { rot: number; dx: number; dy: number; scale: number; opacity: number } & Partial<Omit<Rig, "frame" | "face">>;

export const pathAt = (path: Key[], f: number) => {
  if (f <= path[0].f) return { x: path[0].x, y: path[0].y };
  for (let i = 1; i < path.length; i++) {
    const a = path[i - 1];
    const b = path[i];
    if (f <= b.f) {
      const t = (b.ease ?? inOut)(clamp((f - a.f) / Math.max(1, b.f - a.f)));
      const lift = (b.arc ?? 0) * Math.sin(Math.PI * t);
      return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) - lift };
    }
  }
  const z = path[path.length - 1];
  return { x: z.x, y: z.y };
};

/** Spring from the previous face into the current one, like dot-body's useFace. */
export const faceAt = (faces: [number, FaceName][], f: number): Face => {
  let i = 0;
  while (i + 1 < faces.length && faces[i + 1][0] <= f) i++;
  const [at, name] = faces[i];
  const target = faceOf(name);
  if (i === 0 || f < at) return target;
  const prev = faceAt(faces.slice(0, i), at);
  const k = springAt(f, at, { stiffness: 380, damping: 24, mass: 0.8 });
  const out = { ...target };
  for (const key of Object.keys(target) as (keyof Face)[]) out[key] = lerp(prev[key], target[key], k);
  return out;
};

export type RemiState = { x: number; y: number; rot: number; scale: number; opacity: number; rig: Rig };

export const remiAt = (plan: FlightPlan, f: number): RemiState => {
  const p = pathAt(plan.path, f);
  const p0 = pathAt(plan.path, f - 1);
  const vx = p.x - p0.x;
  const vy = p.y - p0.y;
  const speed = Math.hypot(vx, vy);

  // The site's bob: 4 of 108 units, 2.6 s, eased.
  const bob = -4 * (0.5 - 0.5 * Math.cos(((f / 30) * Math.PI * 2) / 2.6));
  // A blink every 3.4 s, 5 frames long.
  const bf = (f + 40) % 102;
  const autoBlink = plan.noBlink ? 1 : bf < 5 ? 1 - Math.sin((bf / 5) * Math.PI) * 0.95 : 1;

  const st: Stunt = { rot: 0, dx: 0, dy: 0, scale: 1, opacity: 1 };
  const rig: Rig = { ...RIG_REST, frame: f, face: faceAt(plan.faces, f), blink: autoBlink, thrust: clamp(0.3 + speed * 0.035, 0, 1) };
  for (const s of plan.stunts ?? []) {
    const o = s(f);
    if (o.rot !== undefined) st.rot += o.rot;
    if (o.dx !== undefined) st.dx += o.dx;
    if (o.dy !== undefined) st.dy += o.dy;
    if (o.scale !== undefined) st.scale *= o.scale;
    if (o.opacity !== undefined) st.opacity *= o.opacity;
    for (const k of ["lookX", "lookY", "squashX", "squashY", "thrust", "arm", "armAngle", "live", "dark"] as const) {
      if (o[k] !== undefined) rig[k] = o[k]!;
    }
    if (o.blink !== undefined) rig.blink = Math.min(rig.blink, o.blink);
  }
  // Bank into horizontal moves, as the site's flight tilts the craft.
  const bank = clamp(vx * 0.9, -22, 22);
  return { x: p.x + st.dx, y: p.y + st.dy + bob * 0.9, rot: st.rot + bank, scale: st.scale, opacity: st.opacity, rig };
};

// ------------------------------------------------------------------ stunts

/** A full barrel roll over `dur` frames. */
export const roll360 = (at: number, dur = 18) => (f: number) => ({ rot: 360 * tween(f, at, at + dur, 0, 1, inOut) });

/** A vertical loop of radius r (screen px), with the body turning through it. */
export const loop = (at: number, dur: number, r: number) => (f: number) => {
  const t = tween(f, at, at + dur, 0, 1, inOut);
  const th = t * Math.PI * 2;
  return { dx: r * Math.sin(th), dy: -r * (1 - Math.cos(th)), rot: (th * 180) / Math.PI };
};

/** The waving hand: arm up and out, swinging. */
export const wave = (at: number, dur = 30) => (f: number) => {
  if (f < at || f > at + dur) return {};
  const on = tween(f, at, at + 5) * (1 - tween(f, at + dur - 5, at + dur));
  return { arm: on, armAngle: -55 + 22 * Math.sin(((f - at) / 30) * Math.PI * 2 * 3) };
};

/** Point the arm at an angle between two frames. */
export const point = (at: number, until: number, angle: number) => (f: number) => {
  const on = tween(f, at, at + 5) * (1 - tween(f, until - 5, until));
  return on > 0 ? { arm: on, armAngle: angle } : {};
};

/** A poke's squish: squash on contact, wobble back. */
export const squish = (at: number, amount = 0.2) => (f: number) => {
  if (f < at) return {};
  const t = (f - at) / 30;
  const k = amount * Math.exp(-t * 7) * Math.cos(t * 28);
  return { squashX: 1 + k, squashY: 1 - k };
};

/** A little hop: up and back down with a squish at the bottom. */
export const hop = (at: number, h = 40, dur = 12) => (f: number) => {
  const t = clamp((f - at) / dur);
  return t > 0 && t < 1 ? { dy: -h * Math.sin(Math.PI * t) } : {};
};

/** Look somewhere from a frame on (eases in over 6 frames). */
export const look = (at: number, x: number, y: number, until = 1e9) => (f: number) => {
  const k = tween(f, at, at + 6) * (1 - tween(f, until, until + 6));
  return k > 0 ? { lookX: x * k, lookY: y * k } : {};
};

/** Eyes and antenna go red while Remi listens. */
export const listen = (at: number, until: number) => (f: number) => {
  const k = tween(f, at, at + 6) * (1 - tween(f, until, until + 8));
  return k > 0 ? { live: k } : {};
};
