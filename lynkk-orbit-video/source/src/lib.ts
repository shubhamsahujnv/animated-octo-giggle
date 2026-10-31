import { createContext, useContext } from "react";
import { Easing, continueRender, delayRender, interpolate, spring, staticFile } from "remotion";
import { FPS } from "./timing";

// Colour and motion come straight from the Grid design system and the brand
// mark source, so the teaser cannot drift from the site.
export { palette, motion } from "./brand/tokens";
export { MARK_PATHS, MARK_VIEWBOX } from "./brand/brand-mark";

// Inter (variable, latin) is served from public/ so renders never need Google Fonts.
export const INTER = "Inter";
if (typeof document !== "undefined" && !(globalThis as { __interLoading?: boolean }).__interLoading) {
  (globalThis as { __interLoading?: boolean }).__interLoading = true;
  const handle = delayRender("Inter font");
  const face = new FontFace(INTER, `url(${staticFile("inter-latin.woff2")}) format("woff2")`, { weight: "100 900" });
  face
    .load()
    .then(() => {
      document.fonts.add(face);
      continueRender(handle);
    })
    .catch((e) => {
      console.error("Inter failed to load", e);
      continueRender(handle);
    });
}

/** The Mac app's accent (Iris), used inside the drawn app UI only. */
export const IRIS = "#6E6BF0";
export const TIGHT = "-0.04em";
export const SNUG = "-0.02em";

// Grid's arrival and in-out curves, plus sharper ones for the big moves.
export const easeOut = Easing.bezier(0.22, 1, 0.36, 1);
export const inOut = Easing.bezier(0.65, 0, 0.35, 1);
export const expoOut = Easing.bezier(0.16, 1, 0.3, 1);
export const expoIn = Easing.bezier(0.7, 0, 0.84, 0);
export const expoInOut = Easing.bezier(0.87, 0, 0.13, 1);
export const backOut = Easing.bezier(0.34, 1.56, 0.64, 1);

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** 0..1 over [a, b] with an easing, clamped both sides. */
export const tween = (f: number, a: number, b: number, from = 0, to = 1, easing: (t: number) => number = easeOut) =>
  interpolate(f, [a, b], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });

/** A Remotion spring that starts on frame `at` (0 before it). */
export const springAt = (f: number, at: number, cfg: { stiffness?: number; damping?: number; mass?: number } = {}) =>
  f < at ? 0 : spring({ frame: f - at, fps: FPS, config: { stiffness: 220, damping: 18, mass: 0.9, ...cfg } });

/** Rises over `up` frames from `a`, falls back over `down`. */
export const pulse = (f: number, a: number, up = 3, down = 14) => tween(f, a, a + up) - tween(f, a + up, a + up + down, 0, 1, inOut);

// ----------------------------------------------------------------- formats

export type FmtName = "reel" | "post";

/**
 * One timeline, two frames. Every scene reads its camera and title boxes from
 * here. The reel keeps titles in the middle third, clear of the top 250 px and
 * bottom 420 px that Instagram and TikTok cover; the post puts them in the
 * lower third.
 */
export type Fmt = {
  name: FmtName;
  W: number;
  H: number;
  /** Where the camera's focus point lands on screen. */
  focus: { x: number; y: number };
  /** The title's centre line and type size. */
  title: { y: number; size: number; width: number };
  /** Remi's size on screen, px. */
  remi: number;
  /** Zoom at which the Mac screen fills the frame's height. */
  fill: number;
  /**
   * How far down the frame the screen's top edge may sit (px). The reel keeps
   * the menu bar, the notch and the call card below the top 250 px that the
   * apps cover, so the bezel shows above the screen there.
   */
  topPad: number;
};

export const SCREEN = { w: 1512, h: 982 } as const;

export const FORMATS: Record<FmtName, Fmt> = {
  reel: {
    name: "reel",
    W: 1080,
    H: 1920,
    focus: { x: 540, y: 690 },
    title: { y: 1370, size: 112, width: 960 },
    remi: 230,
    fill: 1920 / SCREEN.h,
    topPad: 290,
  },
  post: {
    name: "post",
    W: 1080,
    H: 1350,
    focus: { x: 540, y: 520 },
    title: { y: 1110, size: 92, width: 980 },
    remi: 180,
    fill: 1350 / SCREEN.h,
    topPad: 40,
  },
};

export const FmtContext = createContext<Fmt>(FORMATS.reel);
export const useFmt = () => useContext(FmtContext);
/** Pick a value per format. */
export const per = <A,>(fmt: Fmt, reel: A, post: A) => (fmt.name === "reel" ? reel : post);
