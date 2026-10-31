import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { noise2D } from "@remotion/noise";
import { BEAT, T } from "../timing";
import { radius } from "../brand/tokens";
import { INTER, MARK_PATHS, MARK_VIEWBOX, clamp, expoInOut, expoOut, lerp, palette, per, springAt, tween, useFmt, type Fmt } from "../lib";
import { Flash, TitleSlam, Trail } from "../fx/fx";
import { Remi } from "../remi/Remi";
import { hop, loop, roll360, remiAt, squish, wave, type FlightPlan, type RemiState } from "../remi/flight";
import {
  RINGS,
  centreAt,
  endSphere,
  foldAt,
  polar,
  popAt,
  ringR,
  scaleAt,
  sweepAt,
  tileDeg,
  tilePos,
  type Tile,
} from "./orbit-geo";
import { endLayout } from "./EndCard";

/**
 * The whole film's picture except the end card's type. The Lynkk sphere sits
 * in the centre; Remi flies one circle per ring and its trail draws it; the
 * apps pop on as Remi passes them; each ring locks on a beat and starts to
 * turn; light streams from every app into the sphere; on bar 6 the rings fold
 * into the sphere, which becomes the end card's logo.
 */

const LAV = palette.lavender;

// ------------------------------------------------------------------ Remi

const remiSize = (fmt: Fmt) => fmt.remi * 0.62;

/** Where Remi is on screen (before stunts). Segments blend into each other. */
const remiPos = (fmt: Fmt, f: number) => {
  const c = centreAt(fmt, f);
  const sleep = polar(c, RINGS[0].r * scaleAt(fmt, f) * 1.28, 42);
  const ringTop = (i: number) => polar(c, ringR(fmt, i, f), -90);
  const onRing = (i: number) => polar(c, ringR(fmt, i, f), -90 + RINGS[i].dir * 360 * sweepAt(i, f));
  const perch1 = polar(c, ringR(fmt, 0, f) + per(fmt, 105, 85), -38);
  const perch2 = polar(c, ringR(fmt, 1, f) + per(fmt, 95, 80), -40);
  const perch3 = polar(c, RINGS[2].r * scaleAt(fmt, f) * 0.84, 62);
  const L = endLayout(fmt);
  const endPerch = { x: fmt.W / 2 + L.button.w / 2 - 70, y: L.button.y - L.button.h / 2 - remiSize(fmt) * 0.34 };

  const segs: { at: number; blend: number; p: { x: number; y: number }; arc?: number }[] = [
    { at: 0, blend: 0, p: sleep },
    { at: T.launch, blend: T.ring1From - T.launch, p: ringTop(0), arc: 60 },
    { at: T.ring1From, blend: 0, p: onRing(0) },
    { at: RINGS[0].to, blend: 12, p: perch1 },
    { at: RINGS[1].from - 10, blend: 10, p: ringTop(1), arc: 30 },
    { at: RINGS[1].from, blend: 3, p: onRing(1) },
    { at: RINGS[1].to, blend: 12, p: perch2 },
    { at: RINGS[2].from - 10, blend: 10, p: ringTop(2), arc: 30 },
    { at: RINGS[2].from, blend: 3, p: onRing(2) },
    { at: RINGS[2].to, blend: 12, p: perch3 },
    { at: T.collapse, blend: T.button - T.collapse, p: endPerch, arc: 140 },
  ];
  let k = 0;
  while (k + 1 < segs.length && segs[k + 1].at <= f) k++;
  const s = segs[k];
  if (k === 0 || f >= s.at + s.blend) return s.p;
  const prev = segs[k - 1].p;
  const t = expoInOut(clamp((f - s.at) / Math.max(1, s.blend)));
  return { x: lerp(prev.x, s.p.x, t), y: lerp(prev.y, s.p.y, t) - (s.arc ?? 0) * Math.sin(Math.PI * t) };
};

const remiPlan: FlightPlan = {
  path: [{ f: 0, x: 0, y: 0 }],
  noBlink: false,
  faces: [
    [0, "sleepy"],
    [T.eyesOpen + 3, "curious"],
    [T.launch, "wow"],
    [T.lock1, "happy"],
    [RINGS[1].from - 10, "curious"],
    [T.lock2, "happy"],
    [T.pull, "wow"],
    [T.lock3, "happy"],
    [T.collapse, "wow"],
    [T.button, "happy"],
    [T.button + 5, "wave"],
  ],
  stunts: [
    (f) => ({ blink: f < T.eyesOpen ? 0.05 : f < T.eyesOpen + 4 ? (f - T.eyesOpen) / 4 : 1 }),
    (f) => ({ dark: 0.6 * (1 - tween(f, T.eyesOpen, T.launch + 6)) }),
    hop(T.lock1, 34, 12),
    roll360(T.lock2 + 2, 18),
    hop(T.lock3, 40, 14),
    loop(T.loop, 28, 70),
    ...T.hops.map((h) => hop(h, 30, 12)),
    squish(T.button, 0.24),
    wave(T.button + 5, 50),
  ],
};

const remiState = (fmt: Fmt, f: number): RemiState => {
  const base = remiAt(remiPlan, f);
  const p = remiPos(fmt, f);
  const q = remiPos(fmt, f - 1);
  const speed = Math.hypot(p.x - q.x, p.y - q.y);
  const bank = clamp((p.x - q.x) * 0.7, -24, 24);
  const thrust =
    f < T.eyesOpen ? 0 : f < T.launch ? [0.4, 0.1, 0.5, 0.15, 0.45, 0.3, 0.4, 0.35][f - T.eyesOpen] ?? 0.4 : f >= T.button ? 0.12 : clamp(0.3 + speed * 0.04, 0, 1);
  return { ...base, x: p.x + base.x, y: p.y + base.y, rot: base.rot + bank, rig: { ...base.rig, thrust } };
};

// ------------------------------------------------------------------ parts

/** FaceTime has no usable logo file: its green tile with a white camera, drawn. */
const FaceTimeMark: React.FC<{ size: number }> = ({ size }) => (
  <svg viewBox="0 0 24 24" width={size * 0.62} height={size * 0.62}>
    <rect x="2.5" y="7" width="12.5" height="10" rx="2.6" fill="#fff" />
    <path d="M16 11.2 21 8v8l-5-3.2z" fill="#fff" />
  </svg>
);

const AppTile: React.FC<{ tile: Tile; size: number; check?: number }> = ({ tile, size, check = 0 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.24,
      background: tile.bg === "facetime" ? "linear-gradient(180deg, #5cf27a, #10c43b)" : "#ffffff",
      display: "grid",
      placeItems: "center",
      overflow: "visible",
      boxShadow: `inset 0 0 0 ${Math.max(1, size * 0.015)}px rgba(0,0,0,0.08), 0 ${size * 0.12}px ${size * 0.35}px rgba(0,0,0,0.45)`,
      position: "relative",
    }}
  >
    {tile.bg === "facetime" ? (
      <FaceTimeMark size={size} />
    ) : tile.logo ? (
      <Img
        src={staticFile(`logos/${tile.logo}`)}
        style={
          tile.full
            ? { width: size, height: size, borderRadius: size * 0.24, objectFit: "cover" }
            : { width: size * (tile.wide ? 0.88 : 0.68), height: size * (tile.wide ? 0.88 : 0.68), objectFit: "contain" }
        }
      />
    ) : null}
    {check > 0 ? (
      <div
        style={{
          position: "absolute",
          right: -size * 0.18,
          top: -size * 0.18,
          width: size * 0.46,
          height: size * 0.46,
          borderRadius: "50%",
          background: LAV,
          color: palette.black,
          display: "grid",
          placeItems: "center",
          fontFamily: INTER,
          fontWeight: 700,
          fontSize: size * 0.3,
          transform: `scale(${check})`,
          boxShadow: "0 0 18px rgba(190,180,251,0.9)",
        }}
      >
        ✓
      </div>
    ) : null}
  </div>
);

/** A small pill next to a tile ("Auto-join", "@Lynkk"). */
const Chip: React.FC<{ x: number; y: number; text: string; k: number; size: number }> = ({ x, y, text, k, size }) =>
  k <= 0 ? null : (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -100%) scale(${0.6 + 0.4 * k})`,
        transformOrigin: "50% 100%",
        opacity: clamp(k * 1.5),
        padding: `${size * 0.35}px ${size * 0.7}px`,
        borderRadius: radius.full,
        background: "rgba(22,22,26,0.92)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14), 0 10px 30px rgba(0,0,0,0.4)",
        color: palette.white,
        fontFamily: INTER,
        fontWeight: 600,
        fontSize: size,
        letterSpacing: "-0.02em",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );

/** The ring line: an arc while Remi draws it, a full circle once it locks. */
const RingLine: React.FC<{ fmt: Fmt; i: number; f: number }> = ({ fmt, i, f }) => {
  const ring = RINGS[i];
  if (f < ring.from) return null;
  const c = centreAt(fmt, f);
  const r = ringR(fmt, i, f);
  if (r < 2) return null;
  const sweep = sweepAt(i, f);
  const flash = f >= ring.lock ? Math.exp(-(f - ring.lock) / 5) : 0;
  const S = scaleAt(fmt, f);
  const w = (2.6 + 4 * flash) * Math.max(0.8, S) * per(fmt, 1, 0.9);
  const op = (0.5 + 0.5 * flash) * clamp(foldAt(f) * 1.4);
  if (f < ring.lock && sweep < 0.999) {
    const n = 90;
    const pts: string[] = [];
    for (let s = 0; s <= n; s++) {
      const p = polar(c, r, -90 + ring.dir * 360 * sweep * (s / n));
      pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
    }
    return (
      <polyline points={pts.join(" ")} fill="none" stroke={LAV} strokeWidth={w} strokeLinecap="round" opacity={0.85} style={{ filter: "drop-shadow(0 0 8px rgba(112,99,190,0.9))" }} />
    );
  }
  return <circle cx={c.x} cy={c.y} r={r} fill="none" stroke={LAV} strokeWidth={w} opacity={op} style={{ filter: "drop-shadow(0 0 10px rgba(112,99,190,0.9))" }} />;
};

/** How much light streams into the sphere. */
const streamAt = (f: number) =>
  0.45 * tween(f, T.streamOn, T.streamOn + 20) + 0.55 * tween(f, T.drop - 4, T.drop + 4) - tween(f, T.collapse, T.collapse + 24);

// ------------------------------------------------------------------ ambient motion

/** Drifting star dust and two slow colour glows, behind everything. */
const Atmosphere: React.FC<{ fmt: Fmt; f: number; c: { x: number; y: number }; S: number }> = ({ fmt, f, c, S }) => {
  const dots: React.ReactNode[] = [];
  for (let i = 0; i < 90; i++) {
    const depth = 0.3 + 0.7 * ((noise2D("dd", i, 0) + 1) / 2);
    const bx = ((noise2D("dx", i, 0) + 1) / 2) * fmt.W * 1.4 - fmt.W * 0.2;
    const by = ((noise2D("dy", i, 0) + 1) / 2) * fmt.H * 1.4 - fmt.H * 0.2;
    // drift up slowly; nearer dust drifts faster and follows the camera's zoom more
    const y0 = by - f * 0.35 * depth;
    const y = ((y0 % (fmt.H * 1.4)) + fmt.H * 1.4) % (fmt.H * 1.4) - fmt.H * 0.2;
    const z = 1 + (S - 1) * 0.25 * depth;
    const x = c.x + (bx - c.x) * z;
    const yy = c.y + (y - c.y) * z;
    const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(f / (9 + (i % 7)) + i));
    dots.push(<circle key={i} cx={x} cy={yy} r={(0.8 + 1.8 * depth) * per(fmt, 1.2, 1)} fill={i % 5 === 0 ? LAV : "#ffffff"} opacity={0.08 + 0.32 * depth * tw} />);
  }
  const g1 = { x: fmt.W * (0.25 + 0.1 * Math.sin(f / 70)), y: fmt.H * (0.3 + 0.06 * Math.cos(f / 55)) };
  const g2 = { x: fmt.W * (0.78 + 0.08 * Math.cos(f / 60)), y: fmt.H * (0.62 + 0.07 * Math.sin(f / 80)) };
  return (
    <>
      <div style={{ position: "absolute", left: g1.x - 420, top: g1.y - 420, width: 840, height: 840, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(112,99,190,0.22), rgba(112,99,190,0))" }} />
      <div style={{ position: "absolute", left: g2.x - 380, top: g2.y - 380, width: 760, height: 760, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(247,183,239,0.10), rgba(247,183,239,0))" }} />
      <svg style={{ position: "absolute", inset: 0, width: fmt.W, height: fmt.H }}>{dots}</svg>
    </>
  );
};

/** Slow light rays turning behind the sphere. */
const Rays: React.FC<{ c: { x: number; y: number }; size: number; f: number; k: number }> = ({ c, size, f, k }) =>
  k <= 0.01 ? null : (
    <div
      style={{
        position: "absolute",
        left: c.x - size / 2,
        top: c.y - size / 2,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "repeating-conic-gradient(from 0deg, rgba(190,180,251,0.22) 0deg 4deg, rgba(190,180,251,0) 4deg 22deg)",
        WebkitMaskImage: "radial-gradient(closest-side, black 18%, transparent 100%)",
        maskImage: "radial-gradient(closest-side, black 18%, transparent 100%)",
        transform: `rotate(${f * 0.35}deg)`,
        opacity: k,
      }}
    />
  );

// ------------------------------------------------------------------ scene

export const Orbit: React.FC = () => {
  const fmt = useFmt();
  const f = useCurrentFrame();
  const c = centreAt(fmt, f);
  const S = scaleAt(fmt, f);
  const Sn = S / per(fmt, 1, 0.8); // the same zoom, format-free
  const fold = foldAt(f);
  const end = endSphere(fmt);

  // The sphere: stripes light in the dark, pulse on 1.0 s, then breathe on the bar (on every beat after the drop).
  const toEnd = tween(f, T.collapse, T.logo, 0, 1, expoInOut);
  const lock = springAt(f, T.logo, { stiffness: 320, damping: 14 });
  let beatPulse = 0;
  const beatsFrom = f >= T.drop ? BEAT : f >= T.lock1 ? BEAT * 4 : 1e9;
  if (beatsFrom < 1e9 && f < T.collapse) {
    const since = (f - T.lock1) % beatsFrom;
    beatPulse = Math.exp(-since / 5) * (f >= T.drop ? 0.07 : 0.04);
  }
  const centrePulse = f >= T.centre ? Math.exp(-(f - T.centre) / 6) * 0.12 : 0;
  const sphereSize = lerp(per(fmt, 150, 120) * Math.min(Sn, 1.35), end.s, toEnd) * (1 + beatPulse + centrePulse) * (f >= T.logo ? 1 + (lock - 1) * 0.25 : 1);
  const glow = 0.35 + 0.45 * clamp(streamAt(f)) + 0.6 * (f >= T.logo ? Math.exp(-(f - T.logo) / 12) : 0);

  // The ripple at 1.0 s ("At the centre...").
  const rip = tween(f, T.centre, T.centre + 34, 0, 1, expoOut);

  // Particles from every live tile into the sphere.
  const stream = clamp(streamAt(f));
  const particles: React.ReactNode[] = [];
  if (stream > 0.01) {
    RINGS.forEach((ring, i) => {
      if (f < ring.lock) return;
      const live = tween(f, ring.lock, ring.lock + 12);
      ring.tiles.forEach((_, j) => {
        const P = tilePos(fmt, i, j, f);
        const n = f >= T.drop ? 3 : 2;
        for (let k = 0; k < n; k++) {
          const period = 34 + i * 6;
          const ph = (((f + j * 11 + i * 7) / period + k / n) % 1 + 1) % 1;
          const e = ph * ph;
          const dx = c.x - P.x;
          const dy = c.y - P.y;
          const bend = 0.22 * (noise2D("pb", i * 10 + j, k) > 0 ? 1 : -1);
          const ctrl = { x: P.x + dx * 0.5 - dy * bend, y: P.y + dy * 0.5 + dx * bend };
          const x = (1 - e) * (1 - e) * P.x + 2 * (1 - e) * e * ctrl.x + e * e * c.x;
          const y = (1 - e) * (1 - e) * P.y + 2 * (1 - e) * e * ctrl.y + e * e * c.y;
          const size = per(fmt, 10, 8) * (1 - 0.5 * e) * Math.max(0.8, Sn);
          particles.push(
            <circle key={`${i}-${j}-${k}`} cx={x} cy={y} r={size / 2} fill={k === 0 ? "#ffffff" : LAV} opacity={stream * live * Math.sin(Math.PI * ph) * 0.95} />,
          );
        }
      });
    });
  }

  // On the drop, the apps link up across the rings for a moment.
  const net = f >= T.drop && f < T.collapse + 10 ? tween(f, T.drop, T.drop + 6) * (1 - tween(f, T.collapse - 20, T.collapse + 10)) : 0;
  const netLines: React.ReactNode[] = [];
  if (net > 0) {
    RINGS[2].tiles.forEach((_, j) => {
      const a = tilePos(fmt, 2, j, f);
      const b = tilePos(fmt, 1, j % 2, f);
      const d = tilePos(fmt, 0, (j * 3) % 7, f);
      const beatK = 0.55 + 0.45 * Math.exp(-((f - T.drop) % BEAT) / 6);
      netLines.push(<line key={`n1-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={LAV} strokeWidth={1.6} opacity={net * 0.45 * beatK} />);
      netLines.push(<line key={`n2-${j}`} x1={b.x} y1={b.y} x2={d.x} y2={d.y} stroke={LAV} strokeWidth={1.6} opacity={net * 0.35 * beatK} />);
    });
  }

  // Tiles, labels and the two chips.
  const tileBase = per(fmt, 78, 64) * clamp(Sn, 0.95, 1.3);
  const labelSize = per(fmt, 27, 23) * clamp(Sn, 0.95, 1.2);
  const tiles: React.ReactNode[] = [];
  RINGS.forEach((ring, i) => {
    const labels = 1 - tween(f, ring.labelsOut, ring.labelsOut + 8);
    ring.tiles.forEach((tile, j) => {
      const at = popAt(i, j);
      if (f < at) return;
      const k = springAt(f, at, { stiffness: 380, damping: 15, mass: 0.7 });
      const size = tileBase * k * (0.35 + 0.65 * fold);
      if (size < 2) return;
      const p = tilePos(fmt, i, j, f);
      const deg = tileDeg(i, j, f);
      const below = Math.sin((deg * Math.PI) / 180) > 0.55; // tiles near the bottom put their label under
      const check = i === 2 && j === 0 ? springAt(f, T.noteLand, { stiffness: 420, damping: 14 }) * clamp(fold * 2) : 0;
      tiles.push(
        <div key={`${i}-${j}`} style={{ position: "absolute", left: p.x - size / 2, top: p.y - size / 2, opacity: clamp(k * 2) * clamp(fold * 3) }}>
          <AppTile tile={tile} size={size} check={check} />
          {labels > 0 ? (
            <div
              style={{
                position: "absolute",
                left: size / 2,
                top: below ? size + 8 : size + 8,
                transform: "translateX(-50%)",
                whiteSpace: "nowrap",
                fontFamily: INTER,
                fontWeight: 600,
                fontSize: labelSize,
                letterSpacing: "-0.02em",
                color: "rgba(255,255,255,0.92)",
                textShadow: "0 2px 12px rgba(0,0,0,0.8)",
                opacity: labels * clamp((f - at) / 6),
              }}
            >
              {tile.name}
            </div>
          ) : null}
        </div>,
      );
    });
  });

  const chipK = springAt(f, T.chips, { stiffness: 380, damping: 16 }) * (1 - tween(f, T.ring3From, T.ring3From + 8));
  const cal = tilePos(fmt, 1, 0, f);
  const slack = tilePos(fmt, 1, 1, f);
  const chipSize = per(fmt, 26, 22);
  const chipOff = tileBase * 0.62 + 8;

  // The note card: from the sphere into HubSpot after the outer ring locks.
  const noteT = tween(f, T.noteFly, T.noteLand, 0, 1, expoInOut);
  const hub = tilePos(fmt, 2, 0, f);
  const note = f >= T.noteFly && f < T.noteLand + 3 ? { x: lerp(c.x, hub.x, noteT), y: lerp(c.y, hub.y, noteT) - Math.sin(Math.PI * noteT) * 80, s: 1 - 0.55 * noteT } : null;

  // Shockwaves and tile pings when a ring locks; comets of light running round the locked rings.
  const waves: React.ReactNode[] = [];
  RINGS.forEach((ring, i) => {
    const t = (f - ring.lock) / 22;
    if (t >= 0 && t < 1 && fold > 0.5) {
      const r0 = ringR(fmt, i, f);
      waves.push(<circle key={`w${i}`} cx={c.x} cy={c.y} r={r0 + expoOut(t) * per(fmt, 220, 170)} fill="none" stroke={LAV} strokeWidth={6 * (1 - t) + 0.5} opacity={(1 - t) * 0.7} />);
      ring.tiles.forEach((_, j) => {
        const tj = (f - ring.lock - j * 2) / 14;
        if (tj < 0 || tj >= 1) return;
        const p = tilePos(fmt, i, j, f);
        waves.push(<circle key={`p${i}-${j}`} cx={p.x} cy={p.y} r={tileBase * (0.55 + 0.6 * expoOut(tj))} fill="none" stroke="#ffffff" strokeWidth={3 * (1 - tj)} opacity={(1 - tj) * 0.8} />);
      });
    }
    if (f > ring.lock && fold > 0.05) {
      const r = ringR(fmt, i, f);
      for (let k = 0; k < 2; k++) {
        const head = -90 + ring.dir * ((f - ring.lock) * (2.4 - i * 0.5) + k * 180);
        const on = tween(f, ring.lock, ring.lock + 10) * clamp(fold * 2);
        for (let q = 0; q < 10; q++) {
          const p = polar(c, r, head - ring.dir * q * 1.6);
          waves.push(<circle key={`c${i}-${k}-${q}`} cx={p.x} cy={p.y} r={(per(fmt, 6, 5) * (1 - q / 11))} fill={q === 0 ? "#ffffff" : LAV} opacity={on * (1 - q / 10) * 0.9} />);
        }
      }
    }
  });

  // The logo's sparkle burst.
  const sparkles: React.ReactNode[] = [];
  const sb = (f - T.logo) / 26;
  if (sb >= 0 && sb < 1) {
    for (let k = 0; k < 18; k++) {
      const a = (k / 18) * Math.PI * 2 + noise2D("sp", k, 0) * 0.3;
      const d = sphereSize * 0.55 + expoOut(sb) * per(fmt, 260, 200) * (0.7 + 0.3 * noise2D("sd", k, 1));
      const x = c.x + Math.cos(a) * d;
      const y = c.y + Math.sin(a) * d;
      const r = per(fmt, 7, 6) * (1 - sb);
      sparkles.push(
        <path key={k} d={`M${x} ${y - r * 2}L${x + r * 0.5} ${y - r * 0.5}L${x + r * 2} ${y}L${x + r * 0.5} ${y + r * 0.5}L${x} ${y + r * 2}L${x - r * 0.5} ${y + r * 0.5}L${x - r * 2} ${y}L${x - r * 0.5} ${y - r * 0.5}Z`} fill={k % 3 ? LAV : "#ffffff"} opacity={1 - sb} />,
      );
    }
  }

  const remi = remiState(fmt, f);
  const rSize = remiSize(fmt);

  return (
    <AbsoluteFill>
      <Atmosphere fmt={fmt} f={f} c={c} S={Sn} />
      {/* the dark at the very start */}
      <AbsoluteFill style={{ background: "#050408", opacity: 1 - tween(f, 10, T.centre + 10) }} />
      <Rays c={c} size={sphereSize * 4.2} f={f} k={(0.35 + 0.65 * clamp(streamAt(f))) * tween(f, T.lock1 - 10, T.lock1 + 10) + (f >= T.logo ? 0.6 * Math.exp(-(f - T.logo) / 20) : 0)} />
      {/* glow behind the sphere */}
      <div
        style={{
          position: "absolute",
          left: c.x - sphereSize * 2.2,
          top: c.y - sphereSize * 2.2,
          width: sphereSize * 4.4,
          height: sphereSize * 4.4,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(112,99,190,0.55), rgba(112,99,190,0))",
          opacity: glow * tween(f, T.sphereIn, T.centre),
        }}
      />
      <svg style={{ position: "absolute", inset: 0, width: fmt.W, height: fmt.H, overflow: "visible" }}>
        {rip > 0 && rip < 1 ? (
          <circle cx={c.x} cy={c.y} r={sphereSize * 0.5 + rip * per(fmt, 520, 420)} fill="none" stroke={LAV} strokeWidth={3 * (1 - rip) + 0.5} opacity={(1 - rip) * 0.8} />
        ) : null}
        {netLines}
        {RINGS.map((_, i) => (
          <RingLine key={i} fmt={fmt} i={i} f={f} />
        ))}
        {particles}
        {waves}
      </svg>
      {/* the sphere */}
      <div style={{ position: "absolute", left: c.x - sphereSize / 2, top: c.y - sphereSize / 2, width: sphereSize, height: sphereSize }}>
        <svg viewBox={MARK_VIEWBOX} width={sphereSize} height={sphereSize} style={{ overflow: "visible", filter: "drop-shadow(0 0 24px rgba(190,180,251,0.45))" }}>
          {MARK_PATHS.map((d, j) => {
            const k = tween(f, T.sphereIn + j * 1.6, T.sphereIn + j * 1.6 + 8, 0, 1, expoOut);
            return <path key={j} d={d} fill={palette.white} opacity={k} transform={`translate(${(1 - k) * (j % 2 ? 24 : -24)} 0)`} />;
          })}
        </svg>
      </div>
      {tiles}
      <Chip x={cal.x} y={cal.y - chipOff} text="Auto-join" k={chipK} size={chipSize} />
      <Chip x={slack.x} y={slack.y - chipOff} text="@Lynkk" k={chipK} size={chipSize} />
      {note ? (
        <div
          style={{
            position: "absolute",
            left: note.x,
            top: note.y,
            width: per(fmt, 170, 140),
            padding: per(fmt, 16, 13),
            borderRadius: radius.inner,
            background: "rgba(22,22,26,0.95)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.16), 0 14px 40px rgba(0,0,0,0.5)",
            transform: `translate(-50%, -50%) scale(${note.s})`,
            opacity: 1 - tween(f, T.noteLand - 2, T.noteLand + 2),
          }}
        >
          {[0.9, 0.7, 0.8].map((w, k) => (
            <div key={k} style={{ height: per(fmt, 9, 8), width: `${w * 100}%`, borderRadius: 5, background: k === 0 ? LAV : "rgba(255,255,255,0.4)", marginTop: k ? 9 : 0 }} />
          ))}
        </div>
      ) : null}
      <svg style={{ position: "absolute", inset: 0, width: fmt.W, height: fmt.H, overflow: "visible" }}>{sparkles}</svg>
      <Trail f={f} from={T.launch} pos={(g) => remiPos(fmt, g)} len={12} width={per(fmt, 18, 14)} opacity={1 - tween(f, T.button - 8, T.button)} />
      <Remi s={remi} size={rSize} id="remi-orbit" glow={0.55} />

      <Flash f={f} at={T.lock3} peak={0.12} dur={8} color="#e2e0f2" />
      <Flash f={f} at={T.drop} peak={0.22} dur={9} color="#ffffff" />

      <TitleSlam f={f} out={T.ring2From - 6} words={T.titleRecords.map((at, i) => ({ text: ["Records", "every", "call."][i], at, accent: i === 2 }))} />
      <TitleSlam
        f={f}
        out={T.pull - 3}
        words={[
          { text: "Your", at: T.titleCal[0] },
          { text: "calendar.", at: T.titleCal[1], accent: true },
          { text: "Your", at: T.titleCal[2], br: true },
          { text: "Slack.", at: T.titleCal[3] },
        ]}
      />
      <TitleSlam
        f={f}
        out={T.drop - 3}
        words={[
          { text: "Your", at: T.titleCrm[0] },
          { text: "CRM.", at: T.titleCrm[1], accent: true },
        ]}
      />
      <TitleSlam
        f={f}
        out={T.collapse - 3}
        words={[
          { text: "Every", at: T.titleMemory[0] },
          { text: "call.", at: T.titleMemory[1] },
          { text: "One", at: T.titleMemory[2], br: true },
          { text: "memory.", at: T.titleMemory[3], accent: true },
        ]}
      />
      <TitleSlam
        f={f}
        out={T.titleWorkOut}
        words={[
          { text: "Connects", at: T.titleWork[0] },
          { text: "where", at: T.titleWork[1] },
          { text: "you", at: T.titleWork[2] },
          { text: "work.", at: T.titleWork[3], accent: true },
        ]}
      />
    </AbsoluteFill>
  );
};
