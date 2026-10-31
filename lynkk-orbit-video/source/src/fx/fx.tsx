import React from "react";
import { noise2D } from "@remotion/noise";
import { BEAT } from "../timing";
import { INTER, clamp, expoOut, palette, springAt, tween, useFmt } from "../lib";

// --------------------------------------------------------------- shake

/**
 * A camera shake that kicks on each impact frame and dies away in ~12 frames.
 * Returned as a transform for the frame's outer wrapper.
 */
export const shakeAt = (f: number, hits: readonly { f: number; amp: number }[]) => {
  let x = 0;
  let y = 0;
  let r = 0;
  for (const h of hits) {
    const t = f - h.f;
    if (t < 0 || t > 16) continue;
    const k = h.amp * Math.exp(-t / 4.2);
    x += noise2D("sx", h.f, t * 0.55) * k * 26;
    y += noise2D("sy", h.f, t * 0.55) * k * 26;
    r += noise2D("sr", h.f, t * 0.5) * k * 1.1;
  }
  return `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) rotate(${r.toFixed(3)}deg)`;
};

/** A white flash that blooms on a frame and fades. */
export const Flash: React.FC<{ f: number; at: number; peak?: number; dur?: number; color?: string }> = ({ f, at, peak = 0.7, dur = 8, color = "#fff" }) => {
  const o = f < at ? 0 : peak * (1 - clamp((f - at) / dur));
  return o > 0 ? <div style={{ position: "absolute", inset: 0, background: color, opacity: o, pointerEvents: "none" }} /> : null;
};

// --------------------------------------------------------------- titles

export type Word = { text: string; at: number; accent?: boolean; br?: boolean };

/**
 * Big type that slams in word by word on the beat: each word drops from 2x,
 * blurred, and lands with a little overshoot. Leaves with a quick fall at `out`.
 * Positioned on the format's title line, with a soft scrim behind it.
 */
export const TitleSlam: React.FC<{
  f: number;
  words: Word[];
  out?: number;
  scale?: number;
  y?: number;
  scrim?: boolean;
  color?: string;
}> = ({ f, words, out = 1e9, scale = 1, y, scrim = true, color = palette.white }) => {
  const fmt = useFmt();
  const size = fmt.title.size * scale;
  const first = words[0]?.at ?? 0;
  if (f < first - 1) return null;
  const gone = tween(f, out, out + 7, 0, 1, expoOut);
  if (gone >= 1) return null;
  const cy = y ?? fmt.title.y;
  const scrimO = tween(f, first, first + 6) * (1 - gone);
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {scrim ? (
        <div
          style={{
            position: "absolute",
            left: -100,
            right: -100,
            top: cy - size * 2.4,
            height: size * 4.8,
            background: "radial-gradient(50% 50% at 50% 50%, rgba(8,8,12,0.62), rgba(8,8,12,0))",
            opacity: scrimO,
          }}
        />
      ) : null}
      <div
        style={{
          position: "absolute",
          left: (fmt.W - fmt.title.width) / 2,
          width: fmt.title.width,
          top: cy,
          transform: `translateY(-50%) translateY(${gone * 60}px)`,
          opacity: 1 - gone,
          textAlign: "center",
          fontFamily: INTER,
          fontWeight: 700,
          fontSize: size,
          lineHeight: 1.02,
          letterSpacing: "-0.045em",
          color,
          textShadow: "0 8px 40px rgba(0,0,0,0.45)",
        }}
      >
        {words.map((w, i) => {
          const k = springAt(f, w.at, { stiffness: 420, damping: 22, mass: 0.7 });
          const vis = f >= w.at;
          const s = 1 + (1 - k) * 0.6;
          const blur = Math.max(0, (1 - tween(f, w.at, w.at + 4)) * 14);
          return (
            <React.Fragment key={i}>
              {w.br ? <br /> : null}
              <span
                style={{
                  display: "inline-block",
                  margin: "0 0.12em",
                  opacity: vis ? clamp((f - w.at + 1) / 2.5) : 0,
                  transform: `scale(${s})`,
                  filter: blur > 0.2 ? `blur(${blur}px)` : undefined,
                  color: w.accent ? palette.lavender : undefined,
                }}
              >
                {w.text}
              </span>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

/** Words on consecutive beats from `at`. */
export const onBeats = (text: string, at: number, every = BEAT, accent: string[] = []): Word[] =>
  text.split(" ").map((t, i) => ({ text: t, at: at + i * every, accent: accent.includes(t) }));

// --------------------------------------------------------------- trail

/**
 * Remi's thruster trail: the last `len` frames of a path, as a ribbon that
 * thins and fades toward its tail. `pos(g)` is the screen position on frame g.
 */
export const Trail: React.FC<{
  f: number;
  pos: (g: number) => { x: number; y: number };
  len?: number;
  width?: number;
  from?: number;
  color?: string;
  opacity?: number;
}> = ({ f, pos, len = 14, width = 18, from = -1e9, color = palette.lavender, opacity = 1 }) => {
  const pts: { x: number; y: number }[] = [];
  const steps = len * 2;
  for (let i = 0; i <= steps; i++) {
    const g = f - (i / steps) * len;
    if (g < from) break;
    pts.push(pos(g));
  }
  if (pts.length < 2) return null;
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none", opacity }}>
      {pts.slice(1).map((p, i) => {
        const q = pts[i];
        // A camera cut or ramp jumps the screen position: no streak across it.
        if (Math.hypot(p.x - q.x, p.y - q.y) > 140) return null;
        const t = i / (pts.length - 1);
        return (
          <line
            key={i}
            x1={q.x}
            y1={q.y}
            x2={p.x}
            y2={p.y}
            stroke={color}
            strokeWidth={width * (1 - t * 0.85)}
            strokeLinecap="round"
            opacity={(1 - t) * 0.9}
            style={{ filter: "drop-shadow(0 0 10px rgba(112,99,190,0.9))" }}
          />
        );
      })}
    </svg>
  );
};

// --------------------------------------------------------------- speed lines

/** Radial streaks for the speed ramp, `k` 0..1. */
export const SpeedLines: React.FC<{ k: number; cx: number; cy: number; seed?: string }> = ({ k, cx, cy, seed = "sl" }) => {
  const fmt = useFmt();
  if (k <= 0.01) return null;
  const n = 46;
  return (
    <svg style={{ position: "absolute", inset: 0, width: fmt.W, height: fmt.H, pointerEvents: "none" }}>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2 + noise2D(seed, i, 0) * 0.2;
        const r0 = 260 + noise2D(seed, i, 1) * 120;
        const r1 = r0 + 300 + 500 * k;
        return (
          <line
            key={i}
            x1={cx + Math.cos(a) * r0}
            y1={cy + Math.sin(a) * r0}
            x2={cx + Math.cos(a) * r1}
            y2={cy + Math.sin(a) * r1}
            stroke="white"
            strokeWidth={2 + noise2D(seed, i, 2) * 1.5}
            opacity={k * 0.45}
          />
        );
      })}
    </svg>
  );
};

// --------------------------------------------------------------- shatter

/**
 * The smash cut: `children` (the frame as it was) breaks into a grid of
 * shards that burst outward from the centre and fall, from frame `at`.
 */
export const Shatter: React.FC<{ f: number; at: number; cols: number; rows: number; dur?: number; children: React.ReactNode }> = ({
  f,
  at,
  cols,
  rows,
  dur = 16,
  children,
}) => {
  const fmt = useFmt();
  if (f < at) return <>{children}</>;
  const t = clamp((f - at) / dur);
  if (t >= 1) return null;
  const e = 1 - (1 - t) ** 2.2;
  const cw = fmt.W / cols;
  const ch = fmt.H / rows;
  const shards = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = (c + 0.5) * cw;
      const cy = (r + 0.5) * ch;
      const n = noise2D("shard", c * 1.7, r * 2.3);
      const dx = (cx - fmt.W / 2) * (0.9 + n * 0.5) * e;
      const dy = (cy - fmt.H * 0.45) * (0.7 + n * 0.4) * e + 900 * t * t;
      const rot = n * 70 * e;
      shards.push(
        <div
          key={`${r}-${c}`}
          style={{
            position: "absolute",
            inset: 0,
            clipPath: `polygon(${c * cw}px ${r * ch}px, ${(c + 1) * cw + 1}px ${r * ch + n * 8}px, ${(c + 1) * cw + 1}px ${(r + 1) * ch + 1}px, ${c * cw - n * 6}px ${(r + 1) * ch + 1}px)`,
            transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(${1 - 0.25 * e})`,
            transformOrigin: `${cx}px ${cy}px`,
            opacity: 1 - t * t,
          }}
        >
          {children}
        </div>,
      );
    }
  }
  return <>{shards}</>;
};

// --------------------------------------------------------------- whip

/**
 * A whip-pan across a cut: the outgoing scene flies off to the left over
 * [outFrom, outTo), the incoming one arrives from the right over [inFrom, inTo),
 * both blurred along the move. Wrap each scene's picture in one of these.
 */
export const Whip: React.FC<{ f: number; out?: [number, number]; into?: [number, number]; id: string; children: React.ReactNode }> = ({ f, out, into, id, children }) => {
  const fmt = useFmt();
  const off = (g: number) => {
    let x = 0;
    if (out) x -= tween(g, out[0], out[1], 0, 1, (t) => t * t * t) * fmt.W * 1.1;
    if (into) x += (1 - tween(g, into[0], into[1], 0, 1, expoOut)) * fmt.W * 1.1;
    return x;
  };
  const x = off(f);
  const v = Math.abs(x - off(f - 1));
  const blur = Math.min(60, v * 0.35);
  return (
    <>
      {blur > 1 ? (
        <svg width={0} height={0} style={{ position: "absolute" }}>
          <filter id={`${id}-whip`} x="-20%" y="0%" width="140%" height="100%">
            <feGaussianBlur stdDeviation={`${blur.toFixed(1)} 0`} />
          </filter>
        </svg>
      ) : null}
      <div style={{ position: "absolute", inset: 0, transform: `translateX(${x.toFixed(1)}px)`, filter: blur > 1 ? `url(#${id}-whip)` : undefined }}>{children}</div>
    </>
  );
};
