import React from "react";
import { AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame } from "remotion";
import { SCENES, T } from "./timing";
import { FORMATS, FmtContext, type FmtName } from "./lib";
import { shakeAt } from "./fx/fx";
import { Orbit } from "./scenes/Orbit";
import { EndCard } from "./scenes/EndCard";

/** Every impact the camera feels, with how hard. Calm film: light shakes only. */
const HITS = [
  { f: T.lock1, amp: 0.3 },
  { f: T.lock2, amp: 0.3 },
  { f: T.lock3, amp: 0.55 },
  { f: T.drop, amp: 0.6 },
  { f: T.logo, amp: 0.45 },
];

/** The dark plate everything sits on. */
const Backdrop: React.FC = () => (
  <AbsoluteFill style={{ background: "#0b0a10" }}>
    <Img src={staticFile("plate-night.jpg")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.16, filter: "blur(40px)" }} />
    <AbsoluteFill style={{ background: "radial-gradient(70% 55% at 50% 40%, rgba(112,99,190,0.18), rgba(0,0,0,0) 70%)" }} />
  </AbsoluteFill>
);

/**
 * The Orbit: one timeline. The end card's type sits under the orbit layer so
 * Remi (drawn in Orbit) can land on the button.
 */
export const Teaser: React.FC<{ fmt: FmtName }> = ({ fmt }) => {
  const f = useCurrentFrame();
  return (
    <FmtContext.Provider value={FORMATS[fmt]}>
      <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
        <AbsoluteFill style={{ transform: `${shakeAt(f, HITS)} scale(1.03)` }}>
          <Backdrop />
          <Sequence from={SCENES.end.from} durationInFrames={SCENES.end.dur} name="End card">
            <EndCard />
          </Sequence>
          <Sequence from={SCENES.orbit.from} durationInFrames={SCENES.orbit.dur} name="Orbit">
            <Orbit />
          </Sequence>
        </AbsoluteFill>
      </AbsoluteFill>
    </FmtContext.Provider>
  );
};
