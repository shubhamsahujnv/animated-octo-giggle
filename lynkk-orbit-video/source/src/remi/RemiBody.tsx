import React from "react";
import { palette } from "../lib";
import { NEUTRAL, type Face } from "./expressions";

/**
 * Remi, drawn: a port of apps/decibel-web/src/components/landing/grid/dot/dot-body.tsx.
 * Same geometry, same viewBox, same flame. On the site every number is a
 * motion value; here every number comes from the frame (see remi/flight.ts),
 * and the CSS keyframes (bob, flame flicker, live pulse) are frame maths.
 */

const CX = 50;
const CY = 57;
const HALF_W = 40;
const HALF_H = 37;
const EYE_Y = 55;
const EYE_GAP = 26;
const EYE_W = 9.5;
const EYE_H = 13.5;
const MOUTH_Y = 68;
const LOOK_X = 6;
const LOOK_Y = 3.5;
const SHOULDER = { x: 86, y: 64 };
const ARM = 20;

// The site's colours, inlined: --dot-body is violet 80% with white, --dot-shade
// violet 70% with black (both in oklab; these are the measured results).
export const REMI = {
  body: "#8d83cb",
  shade: "#4e4585",
  visor: "#16151f",
  eye: "#f4f2ff",
  live: palette.live,
  glow: palette.violet,
};

function blob(a: number, b: number, n: number, cy = CY) {
  const steps = 48;
  const e = 2 / n;
  let d = "";
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const c = Math.cos(t);
    const si = Math.sin(t);
    const x = CX + a * Math.sign(c) * Math.abs(c) ** e;
    const y = cy + b * Math.sign(si) * Math.abs(si) ** e;
    d += `${i ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return `${d}Z`;
}

export type Rig = {
  face: Face;
  /** Where Remi looks, -1..1. */
  lookX: number;
  lookY: number;
  /** Eye openness, 1 open .. 0 shut. */
  blink: number;
  squashX: number;
  squashY: number;
  /** Thruster, 0 off .. 1 full burn. */
  thrust: number;
  /** The arm: how far out (0..1) and its angle (0 right, 90 down). */
  arm: number;
  armAngle: number;
  /** Eyes and antenna tip go live red (listening). 0..1. */
  live: number;
  /** The body in the dark (the hook): 0 lit .. 1 black, eyes and flame still glow. */
  dark: number;
  /** The frame, for the flicker and the live pulse. */
  frame: number;
};

export const RIG_REST: Omit<Rig, "frame"> = {
  face: NEUTRAL,
  lookX: 0,
  lookY: 0,
  blink: 1,
  squashX: 1,
  squashY: 1,
  thrust: 0.4,
  arm: 0,
  armAngle: 20,
  live: 0,
  dark: 0,
};

// dot-flicker: 0.42 s in 6 steps; dot-flicker-core: 0.3 s in 5 steps.
const FLICKER = [
  [1, 1],
  [0.92, 1.12],
  [1.06, 0.86],
  [0.96, 1.08],
  [1.04, 0.92],
  [1, 1],
];
const FLICKER_CORE = [
  [1, 1],
  [0.9, 1.15],
  [1.08, 0.88],
  [0.95, 1.06],
  [1, 1],
];
const step = (frame: number, period: number, n: number) => Math.floor(((frame / 30) % period) / (period / n)) % n;

const mix = (a: string, b: string, t: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(",")})`;
};

export const RemiBody: React.FC<{ rig: Rig; id: string }> = ({ rig, id }) => {
  const f = rig.face;
  const bw = f.bodyW;
  const bh = f.bodyH;
  const body = blob(HALF_W + bw, HALF_H + bh, f.round);
  const visor = blob((HALF_W + bw) * 0.72, (HALF_H + bh) * 0.46, 3.2, CY + 1);

  const mx = CX + rig.lookX * LOOK_X * 0.7;
  const my = MOUTH_Y + rig.lookY * LOOK_Y * 0.6;
  const mouth = `M${mx - f.mouthW} ${my}Q${mx} ${my + f.smile * 5} ${mx + f.mouthW} ${my}`;

  const tongue = (t: number, scale: number) => {
    const top = CY + HALF_H + bh + 1;
    const len = (13 + t * 26) * scale;
    const w = (6.5 + t * 2.5) * scale;
    const tip = top + len;
    return `M${CX - w} ${top}C${CX - w} ${top + len * 0.45} ${CX - 1.2} ${top + len * 0.78} ${CX} ${tip}C${CX + 1.2} ${top + len * 0.78} ${CX + w} ${top + len * 0.45} ${CX + w} ${top}Z`;
  };
  const flameOpacity = rig.thrust < 0.02 ? 0 : 0.7 + Math.min(1, rig.thrust) * 0.3;
  const fo = FLICKER[step(rig.frame, 0.42, 6)];
  const fc = FLICKER_CORE[step(rig.frame, 0.3, 5)];
  const top = CY + HALF_H + bh + 1;

  const reach = Math.max(rig.arm, f.hand);
  const a = (rig.armAngle * Math.PI) / 180;
  const tipX = SHOULDER.x + Math.cos(a) * ARM * (0.25 + reach * 0.75);
  const tipY = SHOULDER.y + Math.sin(a) * ARM * (0.25 + reach * 0.75);

  const night = (c: string) => (rig.dark > 0 ? mix(c, "#050507", rig.dark) : c);
  const bodyFill = night(REMI.body);
  const shadeFill = night(REMI.shade);

  // --gr-live pulses 1.2 s between full and 0.45 while Remi listens.
  const livePulse = 1 - 0.55 * (0.5 - 0.5 * Math.cos(((rig.frame / 30) * Math.PI * 2) / 1.2));
  const eyeFill = rig.live > 0 ? mix(REMI.eye, REMI.live, rig.live) : REMI.eye;
  const tipFill = rig.live > 0 ? mix(REMI.body, REMI.live, rig.live) : night(REMI.body);
  const liveOpacity = 1 - rig.live * (1 - livePulse);

  const eye = (side: -1 | 1) => {
    const lid = side < 0 ? f.lidL : f.lidR;
    const w = EYE_W * f.eyeW;
    const h = Math.max(1.2, EYE_H * f.eyeH * lid * rig.blink);
    const cx = CX + side * (EYE_GAP / 2 + f.gap / 2) + f.eyeX + rig.lookX * LOOK_X;
    const cy = EYE_Y + f.eyeY + rig.lookY * LOOK_Y;
    const r = Math.min(w, h) / 2;
    return <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={r} ry={r} fill={eyeFill} opacity={liveOpacity} />;
  };

  return (
    <svg viewBox="-8 -4 116 108" style={{ display: "block", width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}o`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd27a" />
          <stop offset="0.45" stopColor="#ff9a3d" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ff6a2b" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}c`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#fff1c2" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffe08a" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}g`}>
          <stop offset="0" stopColor="#ffb45a" stopOpacity="0.7" />
          <stop offset="1" stopColor="#ffb45a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform={`translate(50 100) scale(${rig.squashX} ${rig.squashY}) translate(-50 -100)`}>
        <g transform={`rotate(${f.tilt} 50 90)`}>
          <g opacity={flameOpacity}>
            <ellipse cx={CX} cy={CY + HALF_H + 5} rx={15} ry={9} fill={`url(#${id}g)`} />
            <path d={tongue(rig.thrust, 1)} fill={`url(#${id}o)`} transform={`translate(${CX} ${top}) scale(${fo[0]} ${fo[1]}) translate(${-CX} ${-top})`} />
            <path d={tongue(rig.thrust, 0.52)} fill={`url(#${id}c)`} transform={`translate(${CX} ${top}) scale(${fc[0]} ${fc[1]}) translate(${-CX} ${-top})`} />
          </g>
          <rect x={CX - 7} y={CY + HALF_H - 3} width={14} height={7} rx={3} fill={shadeFill} />
          <line x1={CX} y1={CY - HALF_H + 2} x2={CX + 3} y2={CY - HALF_H - 11} stroke={shadeFill} strokeWidth={2.6} strokeLinecap="round" />
          <circle cx={CX + 3} cy={CY - HALF_H - 13} r={4.2} fill={tipFill} opacity={liveOpacity} />
          <g opacity={Math.min(1, reach * 3)}>
            <line x1={SHOULDER.x} y1={SHOULDER.y} x2={tipX} y2={tipY} stroke={bodyFill} strokeWidth={6.5} strokeLinecap="round" />
            <circle cx={tipX} cy={tipY} r={4.6} fill={bodyFill} />
          </g>
          <path d={body} fill={bodyFill} />
          <path d={visor} fill={REMI.visor} />
          {eye(-1)}
          {eye(1)}
          <path d={mouth} fill="none" stroke={eyeFill} strokeWidth={2.6} strokeLinecap="round" opacity={f.mouth} />
        </g>
      </g>
    </svg>
  );
};
