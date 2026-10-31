import { T } from "../timing";
import { clamp, expoIn, expoInOut, expoOut, inOut, lerp, per, tween, type Fmt } from "../lib";

/**
 * The orbit's geometry. Everything is in screen px: a centre, a camera scale
 * S (how far in we are) and three rings whose radii are in "orbit units"
 * (px at S = 1). Remi, the trail, the tiles and the particles all read the
 * same functions, so they can never drift apart.
 */

export type Tile = {
  name: string;
  /** The app's own logo in public/logos/ (shown on a white tile). */
  logo?: string;
  /** The logo is already a full app icon (fills the tile). */
  full?: boolean;
  /** A wide wordmark: give it more of the tile. */
  wide?: boolean;
  /** Drawn tile for apps with no usable logo file (FaceTime). */
  bg?: string;
};

/** The apps, with their own logos (the client asked for the real logos in this "works with" film). */
export const RINGS: {
  r: number;
  dir: 1 | -1;
  from: number;
  to: number;
  lock: number;
  /** Degrees per frame once locked. */
  spin: number;
  /** When the labels fade out (the next ring takes the stage). */
  labelsOut: number;
  tiles: Tile[];
}[] = [
  {
    r: 210,
    dir: 1,
    from: T.ring1From,
    to: T.ring1To,
    lock: T.lock1,
    spin: 0.9,
    labelsOut: T.ring2From,
    tiles: [
      { name: "Zoom", logo: "zoom.svg", full: true },
      { name: "Google Meet", logo: "googlemeet.svg" },
      { name: "Teams", logo: "teams.svg" },
      { name: "Slack huddles", logo: "slack.svg" },
      { name: "WhatsApp", logo: "whatsapp.svg" },
      { name: "FaceTime", bg: "facetime" },
      { name: "Webex", logo: "webex.svg" },
    ],
  },
  {
    r: 330,
    dir: -1,
    from: T.ring2From,
    to: T.ring2To,
    lock: T.lock2,
    spin: -0.45,
    labelsOut: T.ring3From,
    tiles: [
      { name: "Google Calendar", logo: "googlecalendar.svg" },
      { name: "Slack", logo: "slack.svg" },
    ],
  },
  {
    r: 440,
    dir: 1,
    from: T.ring3From,
    to: T.ring3To,
    lock: T.lock3,
    spin: 0.22,
    labelsOut: T.drop + 20,
    tiles: [
      { name: "HubSpot", logo: "hubspot.svg" },
      { name: "Salesforce", logo: "salesforce.svg", wide: true },
      { name: "Pipedrive", logo: "pipedrive.png", full: true },
      { name: "Attio", logo: "attio.svg" },
      { name: "Zoho", logo: "zoho.svg", wide: true },
    ],
  },
];

/** The end card's sphere: where the orbit folds to. */
export const endSphere = (fmt: Fmt) => per(fmt, { y: 560, s: 270 }, { y: 330, s: 190 });

/** The orbit's centre on screen; it rises to the end card's sphere as the rings fold. */
export const centreAt = (fmt: Fmt, f: number) => {
  const home = per(fmt, 740, 520);
  const k = tween(f, T.collapse, T.logo, 0, 1, expoInOut);
  return { x: fmt.W / 2, y: lerp(home, endSphere(fmt).y, k) };
};

/** Camera scale keys: in close for the first ring, pulling back ring by ring, a push-in on the drop. */
const S_KEYS: { f: number; s: number; ease?: (t: number) => number }[] = [
  { f: 0, s: 1.5 },
  { f: T.ring2From - 4, s: 1.64 },
  { f: T.ring2From + 18, s: 1.2, ease: expoOut },
  { f: T.pull, s: 1.27 },
  { f: T.pull + 22, s: 0.98, ease: expoOut },
  { f: T.drop, s: 1.0 },
  { f: T.collapse, s: 1.08 },
];

export const scaleAt = (fmt: Fmt, f: number) => {
  let s = S_KEYS[S_KEYS.length - 1].s;
  if (f <= S_KEYS[0].f) s = S_KEYS[0].s;
  else
    for (let i = 1; i < S_KEYS.length; i++) {
      const a = S_KEYS[i - 1];
      const b = S_KEYS[i];
      if (f <= b.f) {
        const t = (b.ease ?? inOut)(clamp((f - a.f) / Math.max(1, b.f - a.f)));
        s = Math.exp(lerp(Math.log(a.s), Math.log(b.s), t));
        break;
      }
    }
  return s * per(fmt, 1, 0.8);
};

/** How far the rings have folded into the sphere: 1 open, 0 gone. */
export const foldAt = (f: number) => 1 - tween(f, T.collapse + 4, T.logo - 2, 0, 1, expoIn);

/** Sweep progress of a ring's drawing circle, 0..1. */
export const sweepAt = (i: number, f: number) => tween(f, RINGS[i].from, RINGS[i].to, 0, 1, expoInOut);

/** Each tile's offset along the sweep, degrees. Calendar and Slack sit top-left and bottom-right so their chips fit the reel. */
const PHASE = [0.5 * (360 / 7), 40, 0.5 * (360 / 5)];
const relDeg = (i: number, j: number) => PHASE[i] + (j * 360) / RINGS[i].tiles.length;

/** The frame a tile pops: when the sweep passes it. */
const POP: number[][] = RINGS.map((ring, i) =>
  ring.tiles.map((_, j) => {
    for (let f = ring.from; f <= ring.to; f++) if (sweepAt(i, f) * 360 >= relDeg(i, j)) return f;
    return ring.to;
  }),
);
export const popAt = (i: number, j: number) => POP[i][j];

/** The ring's turn since it locked, degrees (eases into the spin). */
export const spinAt = (i: number, f: number) => {
  const ring = RINGS[i];
  if (f <= ring.lock) return 0;
  const t = f - ring.lock;
  const ramp = 10;
  return ring.spin * (t < ramp ? (t * t) / (2 * ramp) : t - ramp / 2);
};

/** A tile's angle on screen, degrees (0 = right, -90 = top). */
export const tileDeg = (i: number, j: number, f: number) => -90 + RINGS[i].dir * relDeg(i, j) + spinAt(i, f);

/** A ring's radius on screen at frame f. */
export const ringR = (fmt: Fmt, i: number, f: number) => RINGS[i].r * scaleAt(fmt, f) * foldAt(f);

export const polar = (c: { x: number; y: number }, r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: c.x + Math.cos(a) * r, y: c.y + Math.sin(a) * r };
};

export const tilePos = (fmt: Fmt, i: number, j: number, f: number) => polar(centreAt(fmt, f), ringR(fmt, i, f), tileDeg(i, j, f));
