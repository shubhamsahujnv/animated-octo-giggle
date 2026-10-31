import React from "react";
import { AbsoluteFill, Img, Sequence, staticFile } from "remotion";
import { FORMATS, FmtContext, INTER, MARK_PATHS, MARK_VIEWBOX, palette, per, type FmtName } from "./lib";
import { Orbit } from "./scenes/Orbit";
import { T } from "./timing";

/**
 * Cover images for the two videos: the orbit at full spin (the drop), with a
 * hook headline, the Lynkk mark and a "Link in bio" pill. Rendered as stills.
 */
const FRAME = T.drop + 32; // every ring spinning, light streaming in, Remi mid-hop

export const Cover: React.FC<{ fmt: FmtName }> = ({ fmt: name }) => {
  const fmt = FORMATS[name];
  const L = per(
    fmt,
    { brand: 300, head: 470, size: 104, orbitDy: 265, orbitK: 0.86, pill: 1575, pillFs: 44, url: 1665 },
    { brand: 92, head: 235, size: 84, orbitDy: 225, orbitK: 0.8, pill: 1205, pillFs: 38, url: 1282 },
  );
  const cy = per(fmt, 740, 520);
  return (
    <FmtContext.Provider value={fmt}>
      <AbsoluteFill style={{ background: "#0b0a10", overflow: "hidden" }}>
        <Img src={staticFile("plate-night.jpg")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.16, filter: "blur(40px)" }} />
        <AbsoluteFill style={{ background: "radial-gradient(70% 55% at 50% 55%, rgba(112,99,190,0.28), rgba(0,0,0,0) 70%)" }} />
        <AbsoluteFill style={{ transform: `translateY(${L.orbitDy}px) scale(${L.orbitK})`, transformOrigin: `50% ${cy}px` }}>
          <Sequence from={-FRAME} layout="none">
            <Orbit cover />
          </Sequence>
        </AbsoluteFill>
        {/* top fade so the headline reads */}
        <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(8,8,12,0.92) 0%, rgba(8,8,12,0.75) ${per(fmt, 22, 20)}%, rgba(8,8,12,0) ${per(fmt, 36, 34)}%)` }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: L.brand, display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
          <svg viewBox={MARK_VIEWBOX} width={per(fmt, 52, 44)} height={per(fmt, 52, 44)}>
            {MARK_PATHS.map((d, j) => (
              <path key={j} d={d} fill={palette.white} />
            ))}
          </svg>
          <div style={{ fontFamily: INTER, fontWeight: 600, fontSize: per(fmt, 46, 40), letterSpacing: "-0.04em", color: palette.white }}>Lynkk</div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 50,
            right: 50,
            top: L.head,
            transform: "translateY(-50%)",
            textAlign: "center",
            fontFamily: INTER,
            fontWeight: 700,
            fontSize: L.size,
            lineHeight: 1.02,
            letterSpacing: "-0.045em",
            color: palette.white,
            textShadow: "0 8px 40px rgba(0,0,0,0.5)",
          }}
        >
          Your CRM updates<br />
          <span style={{ color: palette.lavender }}>itself</span> now.
        </div>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: L.pill,
            transform: "translate(-50%, -50%)",
            padding: `${L.pillFs * 0.45}px ${L.pillFs * 1.1}px`,
            borderRadius: 999,
            background: palette.white,
            color: palette.black,
            fontFamily: INTER,
            fontWeight: 600,
            fontSize: L.pillFs,
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
            boxShadow: "0 20px 60px rgba(112,99,190,0.55)",
          }}
        >
          Link in bio ↗
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: L.url, transform: "translateY(-50%)", textAlign: "center", fontFamily: INTER, fontWeight: 500, fontSize: per(fmt, 34, 28), color: "rgba(255,255,255,0.7)" }}>
          lynkk.ai
        </div>
      </AbsoluteFill>
    </FmtContext.Provider>
  );
};
