import React from "react";
import { AbsoluteFill, Img, Sequence, staticFile } from "remotion";
import { FORMATS, FmtContext, INTER, MARK_PATHS, MARK_VIEWBOX, palette, per, type Fmt, type FmtName } from "./lib";
import { Orbit } from "./scenes/Orbit";
import { Remi } from "./remi/Remi";
import { remiAt, wave } from "./remi/flight";
import { T } from "./timing";

/**
 * Cover images for the two videos, built to stop the scroll: a crossed-out
 * old habit, the hook, the orbit at full spin with a stack of notifications
 * landing on it, Remi with a line, a FREE TO START sticker and a hand-drawn
 * arrow to "Link in bio". Rendered as stills.
 */
const FRAME = T.drop + 32; // every ring spinning, light streaming in

type Box = { x: number; y: number };

/** A phone-style notification. Strings describe what Lynkk really does (TRUTHS, Integrations). */
const Toast: React.FC<{ at: Box; w: number; logo: string; app: string; title: string; body: string; rot: number; s: number }> = ({ at, w, logo, app, title, body, rot, s }) => (
  <div
    style={{
      position: "absolute",
      left: at.x,
      top: at.y,
      width: w,
      transform: `translate(-50%, -50%) rotate(${rot}deg)`,
      display: "flex",
      gap: 18 * s,
      alignItems: "center",
      padding: `${18 * s}px ${22 * s}px`,
      borderRadius: 28 * s,
      background: "rgb(28,27,34)",
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14), 0 24px 60px rgba(0,0,0,0.55)",
      fontFamily: INTER,
    }}
  >
    <div style={{ width: 70 * s, height: 70 * s, borderRadius: 17 * s, background: "#fff", display: "grid", placeItems: "center", flexShrink: 0 }}>
      <Img src={staticFile(`logos/${logo}`)} style={{ width: 50 * s, height: 50 * s, objectFit: "contain" }} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 * s, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>
        <span>{app.toUpperCase()}</span>
        <span>now</span>
      </div>
      <div style={{ fontSize: 31 * s, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginTop: 2 * s }}>{title}</div>
      <div style={{ fontSize: 25 * s, color: "rgba(255,255,255,0.75)", marginTop: 2 * s, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{body}</div>
    </div>
  </div>
);

/** A hand-drawn arrow from a to b, curving. */
const Scribble: React.FC<{ fmt: Fmt; a: Box; b: Box; bend: number; color: string; w: number }> = ({ fmt, a, b, bend, color, w }) => {
  const mx = (a.x + b.x) / 2 + bend;
  const my = (a.y + b.y) / 2 - Math.abs(bend) * 0.4;
  const ang = Math.atan2(b.y - my, b.x - mx);
  const h = w * 4.2;
  const l = { x: b.x - h * Math.cos(ang - 0.5), y: b.y - h * Math.sin(ang - 0.5) };
  const r = { x: b.x - h * Math.cos(ang + 0.5), y: b.y - h * Math.sin(ang + 0.5) };
  return (
    <svg style={{ position: "absolute", inset: 0, width: fmt.W, height: fmt.H, overflow: "visible" }}>
      <path d={`M${a.x} ${a.y} Q${mx} ${my} ${b.x} ${b.y}`} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" />
      <path d={`M${l.x} ${l.y} L${b.x} ${b.y} L${r.x} ${r.y}`} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const Cover: React.FC<{ fmt: FmtName }> = ({ fmt: name }) => {
  const fmt = FORMATS[name];
  const L = per(
    fmt,
    {
      brand: 215, strike: 340, strikeFs: 46, head: 485, size: 104,
      orbitDy: 215, orbitK: 0.72, orbitY: 740,
      toastW: 700, toastS: 1, toasts: [{ x: 560, y: 1200 }, { x: 520, y: 1335 }, { x: 560, y: 1470 }],
      remi: { x: 935, y: 790, size: 170 }, bubble: { x: 640, y: 640 },
      sticker: { x: 175, y: 690 }, pill: { x: 470, y: 1640 }, pillFs: 46, arrow: { a: { x: 900, y: 1560 }, b: { x: 700, y: 1640 } }, url: 1730,
    },
    {
      brand: 52, strike: 135, strikeFs: 36, head: 245, size: 80,
      orbitDy: 150, orbitK: 0.64, orbitY: 520,
      toastW: 560, toastS: 0.8, toasts: [{ x: 560, y: 880 }, { x: 525, y: 985 }, { x: 560, y: 1090 }],
      remi: { x: 920, y: 500, size: 135 }, bubble: { x: 690, y: 385 },
      sticker: { x: 165, y: 470 }, pill: { x: 450, y: 1230 }, pillFs: 38, arrow: { a: { x: 880, y: 1170 }, b: { x: 670, y: 1232 } }, url: 1305,
    },
  );
  const remi = remiAt({ path: [{ f: 0, x: 0, y: 0 }], faces: [[0, "wave"]], stunts: [wave(0, 40)], noBlink: true }, 12);
  return (
    <FmtContext.Provider value={fmt}>
      <AbsoluteFill style={{ background: "#0b0a10", overflow: "hidden" }}>
        <Img src={staticFile("plate-night.jpg")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.16, filter: "blur(40px)" }} />
        <AbsoluteFill style={{ background: "radial-gradient(70% 55% at 50% 55%, rgba(112,99,190,0.32), rgba(0,0,0,0) 70%)" }} />
        {/* the orbit at full spin, a bit smaller, under everything */}
        <AbsoluteFill style={{ transform: `translateY(${L.orbitDy}px) scale(${L.orbitK})`, transformOrigin: `50% ${L.orbitY}px` }}>
          <Sequence from={-FRAME} layout="none">
            <Orbit cover />
          </Sequence>
        </AbsoluteFill>
        <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(8,8,12,0.95) 0%, rgba(8,8,12,0.8) ${per(fmt, 24, 22)}%, rgba(8,8,12,0) ${per(fmt, 36, 34)}%)` }} />

        {/* brand */}
        <div style={{ position: "absolute", left: 0, right: 0, top: L.brand, display: "flex", justifyContent: "center", alignItems: "center", gap: 14, transform: "translateY(-50%)" }}>
          <svg viewBox={MARK_VIEWBOX} width={per(fmt, 44, 36)} height={per(fmt, 44, 36)}>
            {MARK_PATHS.map((d, j) => (
              <path key={j} d={d} fill={palette.white} />
            ))}
          </svg>
          <div style={{ fontFamily: INTER, fontWeight: 600, fontSize: per(fmt, 40, 34), letterSpacing: "-0.04em", color: palette.white }}>Lynkk</div>
        </div>

        {/* the old habit, crossed out */}
        <div style={{ position: "absolute", left: 0, right: 0, top: L.strike, transform: "translateY(-50%)", textAlign: "center" }}>
          <span style={{ position: "relative", display: "inline-block", fontFamily: INTER, fontWeight: 600, fontSize: L.strikeFs, letterSpacing: "-0.02em", color: "rgba(255,255,255,0.78)", padding: "0 10px" }}>
            Typing call notes into the CRM
            <svg viewBox="0 0 100 20" preserveAspectRatio="none" style={{ position: "absolute", left: -6, right: -6, top: "38%", width: "calc(100% + 12px)", height: "40%", overflow: "visible" }}>
              <path d="M1 12 C 20 4, 35 16, 52 9 S 82 5, 99 10" fill="none" stroke={palette.orange} strokeWidth={4.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ strokeWidth: per(fmt, 5, 4) }} />
            </svg>
          </span>
        </div>

        {/* the hook */}
        <div
          style={{
            position: "absolute",
            left: 40,
            right: 40,
            top: L.head,
            transform: "translateY(-50%)",
            textAlign: "center",
            fontFamily: INTER,
            fontWeight: 800,
            fontSize: L.size,
            lineHeight: 1.0,
            letterSpacing: "-0.05em",
            color: palette.white,
            textShadow: "0 8px 40px rgba(0,0,0,0.6)",
          }}
        >
          Your CRM updates
          <br />
          <span style={{ color: palette.lavender }}>itself</span> now.
        </div>

        {/* FREE TO START sticker */}
        <div
          style={{
            position: "absolute",
            left: L.sticker.x,
            top: L.sticker.y,
            transform: "translate(-50%, -50%) rotate(-10deg)",
            padding: `${per(fmt, 14, 11)}px ${per(fmt, 22, 17)}px`,
            borderRadius: 14,
            background: palette.orange,
            color: palette.black,
            fontFamily: INTER,
            fontWeight: 800,
            fontSize: per(fmt, 32, 25),
            lineHeight: 1.05,
            textAlign: "center",
            letterSpacing: "-0.01em",
            boxShadow: "0 14px 40px rgba(245,123,58,0.45)",
            border: "3px solid #fff",
          }}
        >
          FREE
          <br />
          TO START
        </div>

        {/* Remi and its line */}
        <div
          style={{
            position: "absolute",
            left: L.bubble.x,
            top: L.bubble.y,
            transform: "translate(-50%, -50%)",
            padding: `${per(fmt, 16, 12)}px ${per(fmt, 24, 18)}px`,
            borderRadius: 26,
            borderBottomRightRadius: 6,
            background: palette.white,
            color: palette.black,
            fontFamily: INTER,
            fontWeight: 700,
            fontSize: per(fmt, 32, 25),
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
            boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
          }}
        >
          Done. You just sell.
        </div>
        <Remi s={{ ...remi, x: L.remi.x, y: L.remi.y, rot: -8 }} size={L.remi.size} id="remi-cover" glow={0.7} />

        {/* the notifications landing */}
        <Toast at={L.toasts[0]} w={L.toastW} s={L.toastS} rot={-2} logo="hubspot.svg" app="HubSpot" title="Deal updated" body="Summary, next steps and tasks logged" />
        <Toast at={L.toasts[1]} w={L.toastW} s={L.toastS} rot={1.5} logo="salesforce.svg" app="Salesforce" title="Opportunity updated" body="Call notes added after your Zoom call" />
        <Toast at={L.toasts[2]} w={L.toastW} s={L.toastS} rot={-1} logo="slack.svg" app="Slack" title="@Lynkk replied" body="Here's what they said, from your notes" />

        {/* the CTA */}
        <div
          style={{
            position: "absolute",
            left: L.pill.x,
            top: L.pill.y,
            transform: "translate(-50%, -50%)",
            padding: `${L.pillFs * 0.45}px ${L.pillFs * 1.1}px`,
            borderRadius: 999,
            background: palette.white,
            color: palette.black,
            fontFamily: INTER,
            fontWeight: 700,
            fontSize: L.pillFs,
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
            boxShadow: "0 0 0 6px rgba(190,180,251,0.35), 0 20px 60px rgba(112,99,190,0.6)",
          }}
        >
          Link in bio ↗
        </div>
        <Scribble fmt={fmt} a={L.arrow.a} b={L.arrow.b} bend={per(fmt, 60, 50)} color={palette.lavender} w={per(fmt, 7, 6)} />
        <div style={{ position: "absolute", left: L.pill.x, top: L.url, transform: "translate(-50%, -50%)", fontFamily: INTER, fontWeight: 500, fontSize: per(fmt, 30, 25), color: "rgba(255,255,255,0.7)" }}>lynkk.ai</div>
      </AbsoluteFill>
    </FmtContext.Provider>
  );
};
