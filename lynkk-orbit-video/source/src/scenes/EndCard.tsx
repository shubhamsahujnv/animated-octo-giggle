import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { SCENES, T } from "../timing";
import { INTER, clamp, palette, per, springAt, tween, useFmt, type Fmt } from "../lib";
import { Flash } from "../fx/fx";

/**
 * The end card's type, 12 to 16 s. The sphere itself is the orbit's (it folds
 * up into place in Orbit.tsx); this layer sits under it and adds the name, the
 * tagline, the Start for free button, lynkk.ai and the fine print. Remi lands
 * on the button on 14.0 s (drawn in Orbit.tsx, above this layer).
 */

export const endLayout = (fmt: Fmt) =>
  per(
    fmt,
    { title: 790, size: 124, tagline: 885, tagSize: 46, button: { y: 1060, w: 560, h: 120, fs: 46 }, url: 1180, fine: 1268, fineSize: 26 },
    { title: 505, size: 100, tagline: 585, tagSize: 38, button: { y: 720, w: 520, h: 104, fs: 40 }, url: 830, fine: 905, fineSize: 22 },
  );

export const EndCard: React.FC = () => {
  const fmt = useFmt();
  const f = useCurrentFrame() + SCENES.end.from;
  const L = endLayout(fmt);
  const cx = fmt.W / 2;
  const name = springAt(f, T.logo, { stiffness: 300, damping: 20 });
  const tag = springAt(f, T.tagline, { stiffness: 300, damping: 22 });
  const button = springAt(f, T.button - 4, { stiffness: 300, damping: 16 });
  const url = tween(f, T.url, T.url + 8);
  const fine = tween(f, T.fine, T.fine + 10);
  const press = f >= T.button ? Math.exp(-(f - T.button) / 4) * 0.05 : 0;
  const text = (top: number, size: number, k: number, weight: number, color: string, content: string) => (
    <div
      style={{
        position: "absolute",
        left: 40,
        right: 40,
        top,
        transform: `translateY(-50%) translateY(${(1 - k) * 36}px)`,
        opacity: clamp(k * 2),
        textAlign: "center",
        fontFamily: INTER,
        fontWeight: weight,
        fontSize: size,
        letterSpacing: size > 60 ? "-0.045em" : "-0.02em",
        color,
      }}
    >
      {content}
    </div>
  );
  return (
    <AbsoluteFill>
      {text(L.title, L.size, name, 600, palette.white, "Lynkk")}
      {text(L.tagline, L.tagSize, tag, 500, palette.lavender, "Meeting memory for teams.")}
      {f >= T.button - 4 ? (
        <div
          style={{
            position: "absolute",
            left: cx - L.button.w / 2,
            top: L.button.y - L.button.h / 2,
            width: L.button.w,
            height: L.button.h,
            borderRadius: L.button.h / 2,
            background: palette.white,
            color: palette.black,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: INTER,
            fontWeight: 600,
            fontSize: L.button.fs,
            letterSpacing: "-0.02em",
            transform: `scale(${(0.6 + 0.4 * button) * (1 - press)})`,
            opacity: clamp(button * 2),
            boxShadow: `0 20px 60px rgba(112,99,190,${0.5 * button})`,
          }}
        >
          Start for free
          {f >= T.shine && f < T.shine + 18 ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: L.button.h / 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -20,
                  bottom: -20,
                  width: L.button.w * 0.22,
                  left: -L.button.w * 0.3 + tween(f, T.shine, T.shine + 18, 0, 1) * L.button.w * 1.4,
                  background: "linear-gradient(90deg, rgba(190,180,251,0), rgba(190,180,251,0.75), rgba(190,180,251,0))",
                  transform: "skewX(-20deg)",
                }}
              />
            </div>
          ) : null}
        </div>
      ) : null}
      {text(L.url, L.size * 0.4, url, 500, "rgba(255,255,255,0.78)", "lynkk.ai")}
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: L.fine,
          textAlign: "center",
          fontFamily: INTER,
          fontSize: L.fineSize,
          lineHeight: 1.4,
          color: "rgba(255,255,255,0.5)",
          opacity: fine,
        }}
      >
        Slack huddles, WhatsApp, FaceTime and Webex calls on Lynkk for Mac
        <br />
        CRM logging is set up with the Lynkk team
      </div>
      <Flash f={f} at={T.logo} peak={0.3} dur={10} color="#e2e0f2" />
    </AbsoluteFill>
  );
};
