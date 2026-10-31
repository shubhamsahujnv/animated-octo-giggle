import React from "react";
import { REMI, RemiBody } from "./RemiBody";
import type { RemiState } from "./flight";

/**
 * Remi on screen: the body at (x, y), centred, `size` px square, with the
 * violet glow the site draws under it on dark bands.
 */
export const Remi: React.FC<{ s: RemiState; size: number; id?: string; glow?: number }> = ({ s, size, id = "remi", glow = 0.5 }) => (
  <div
    style={{
      position: "absolute",
      left: s.x - size / 2,
      top: s.y - size / 2,
      width: size,
      height: size,
      opacity: s.opacity,
      transform: `rotate(${s.rot}deg) scale(${s.scale})`,
      transformOrigin: "50% 55%",
      pointerEvents: "none",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: "-35%",
        borderRadius: "50%",
        background: `radial-gradient(closest-side, ${REMI.glow}66, ${REMI.glow}00)`,
        opacity: glow,
      }}
    />
    <div style={{ position: "absolute", inset: 0, filter: "drop-shadow(0 18px 24px rgba(0,0,0,0.35))" }}>
      <RemiBody rig={s.rig} id={id} />
    </div>
  </div>
);
