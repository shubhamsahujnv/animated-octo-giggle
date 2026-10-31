import React from "react";
import { clamp, inOut, lerp, SCREEN, useFmt, type Fmt } from "../lib";

/**
 * The camera over the Mac screen. The screen is a world in Mac points
 * (1512 x 982, a 14-inch MacBook Pro); a camera says which world point sits
 * on the format's focus and how far in it is (z = 1 fills the frame's height).
 * The reel and the post share every camera; only the frame around it differs.
 */
export type Cam = { x: number; y: number; z: number; rot?: number };
export type CamKey = { f: number; cam: Cam; ease?: (t: number) => number };

export const zoomOf = (fmt: Fmt, cam: Cam) => fmt.fill * cam.z;

/** Keep the frame inside the screen when the camera is in close. */
export const clampCam = (fmt: Fmt, cam: Cam): Cam => {
  const z = zoomOf(fmt, cam);
  const fit = (v: number, lo: number, hi: number) => (lo > hi ? (lo + hi) / 2 : clamp(v, lo, hi));
  return {
    ...cam,
    x: fit(cam.x, fmt.focus.x / z, SCREEN.w - (fmt.W - fmt.focus.x) / z),
    y: fit(cam.y, (fmt.focus.y - fmt.topPad) / z, SCREEN.h - (fmt.H - fmt.focus.y) / z),
  };
};

export const camAt = (keys: CamKey[], f: number): Cam => {
  if (f <= keys[0].f) return keys[0].cam;
  for (let i = 1; i < keys.length; i++) {
    const a = keys[i - 1];
    const b = keys[i];
    if (f <= b.f) {
      const t = (b.ease ?? inOut)(clamp((f - a.f) / Math.max(1, b.f - a.f)));
      // Zoom moves in log space so a push-in feels even all the way.
      const z = Math.exp(lerp(Math.log(a.cam.z), Math.log(b.cam.z), t));
      return { x: lerp(a.cam.x, b.cam.x, t), y: lerp(a.cam.y, b.cam.y, t), z, rot: lerp(a.cam.rot ?? 0, b.cam.rot ?? 0, t) };
    }
  }
  return keys[keys.length - 1].cam;
};

export const toScreen = (fmt: Fmt, cam: Cam, x: number, y: number) => {
  const z = zoomOf(fmt, cam);
  return { x: fmt.focus.x + (x - cam.x) * z, y: fmt.focus.y + (y - cam.y) * z };
};

/**
 * How fast the picture pans at the focus point, px per frame. A pure zoom
 * leaves the focus still, so only real pans and whips get the blur.
 */
export const camSpeed = (fmt: Fmt, keys: CamKey[], f: number, clamped = true) => {
  const c = (g: number) => (clamped ? clampCam(fmt, camAt(keys, g)) : camAt(keys, g));
  const a = c(f - 1);
  const b = c(f);
  const p = { x: a.x, y: a.y };
  const q = toScreen(fmt, b, p.x, p.y);
  return { dx: q.x - fmt.focus.x, dy: q.y - fmt.focus.y };
};

/** A directional blur along the camera's motion (whip pans). */
/** `z` is the world's scale: the filter runs before it, so the blur is divided by it. */
export const MotionBlur: React.FC<{ id: string; dx: number; dy: number; z: number }> = ({ id, dx, dy, z }) => (
  <svg width={0} height={0} style={{ position: "absolute" }}>
    <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation={`${(Math.min(30, Math.abs(dx) * 0.3) / z).toFixed(2)} ${(Math.min(30, Math.abs(dy) * 0.3) / z).toFixed(2)}`} />
    </filter>
  </svg>
);

/**
 * Children are drawn in Mac points; the world is moved and scaled so `cam`
 * lands on the focus. `blur` adds the whip-pan blur.
 */
export const World: React.FC<{ cam: Cam; blur?: { dx: number; dy: number }; id?: string; children: React.ReactNode }> = ({
  cam,
  blur,
  id = "world",
  children,
}) => {
  const fmt = useFmt();
  const z = zoomOf(fmt, cam);
  const tx = fmt.focus.x - cam.x * z;
  const ty = fmt.focus.y - cam.y * z;
  const blurOn = blur && Math.hypot(blur.dx, blur.dy) > 3;
  return (
    <>
      {blurOn ? <MotionBlur id={`${id}-mb`} dx={blur.dx} dy={blur.dy} z={z} /> : null}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: SCREEN.w,
          height: SCREEN.h,
          transformOrigin: "0 0",
          transform: `translate(${tx}px, ${ty}px) scale(${z}) rotate(${cam.rot ?? 0}deg)`,
          filter: blurOn ? `url(#${id}-mb)` : undefined,
        }}
      >
        {children}
      </div>
    </>
  );
};

export const fromScreen = (fmt: Fmt, cam: Cam, x: number, y: number) => {
  const z = zoomOf(fmt, cam);
  return { x: cam.x + (x - fmt.focus.x) / z, y: cam.y + (y - fmt.focus.y) / z };
};

/** A camera track, clamped to the screen, as one function of the frame. */
export const track = (fmt: Fmt, keys: CamKey[]) => (f: number) => clampCam(fmt, camAt(keys, f));

/** Push a camera track in by `k` from frame `from` on (the post's wider frame can afford it). */
export const boost = (keys: CamKey[], k: number, from = -1e9): CamKey[] =>
  keys.map((c) => (c.f > from ? { ...c, cam: { ...c.cam, z: c.cam.z * k } } : c));
