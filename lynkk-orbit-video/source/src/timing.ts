/**
 * The Orbit's clock. 120 BPM at 30 fps: one beat is 15 frames, one bar is
 * 60 frames (2 s), 8 bars is the whole film (16 s). Every ring, slam and pop
 * is written here as a bar or a beat; the scenes read their frames from this
 * file, so the picture and the sound cue list can never disagree.
 */

export const FPS = 30;
export const BPM = 120;
export const BEAT = (FPS * 60) / BPM; // 15 frames
export const BAR = BEAT * 4; // 60 frames
export const DURATION = BAR * 8; // 480 frames, 16 s

/** The first frame of bar n (0-based). */
export const bar = (n: number) => n * BAR;
/** The first frame of beat n (0-based, counted from the top of the film). */
export const beat = (n: number) => n * BEAT;

/** Where each scene starts and how long it runs, in absolute frames. */
export const SCENES = {
  orbit: { from: 0, dur: bar(8) },
  end: { from: bar(6), dur: bar(2) },
} as const;

/**
 * Key moments, absolute frames. Comments say what the eye sees on that frame
 * and which voiceover line sits there.
 */
export const T = {
  // Bar 0, 0 to 2 s. VO: "At the centre of every team..."
  sphereIn: 4, // the sphere's stripes light one by one in the dark
  centre: beat(2), // 1.0 s: the sphere pulses, a ripple goes out
  eyesOpen: 40, // Remi, asleep beside it, opens its eyes
  launch: 48, // Remi takes off for the top of the first ring

  // Bar 1 to 2, 2 to 6 s. VO: "...are its conversations. Lynkk captures each one."
  ring1From: bar(1) + 2, // Remi starts the inner circle; the trail draws the ring
  ring1To: bar(1) + 48, // the circle closes
  lock1: bar(2), // 4.0 s: the inner ring locks and starts to turn
  titleRecords: [bar(2), bar(2) + BEAT, bar(2) + BEAT * 2] as const, // "Records" "every" "call."
  streamOn: bar(2) + 4, // particles start flowing from the meeting apps into the sphere

  // Bar 3, 6 to 8 s. VO: "Connects them to your calendar, your Slack..."
  ring2From: bar(3) + 4, // counter-clockwise circle
  ring2To: bar(3) + 42,
  lock2: bar(3) + BEAT * 3, // 7.5 s
  titleCal: [bar(3), bar(3) + BEAT, bar(3) + BEAT * 2, bar(3) + BEAT * 3] as const, // "Your" "calendar." "Your" "Slack."
  chips: bar(3) + BEAT * 3 + 6, // "Auto-join" and "@Lynkk" chips pop

  // Bar 4, 8 to 10 s. VO: "...your CRM..."
  pull: bar(4), // the camera pulls back
  ring3From: bar(4) + 4,
  ring3To: bar(4) + 42,
  lock3: bar(4) + BEAT * 3, // 9.5 s, the biggest lock
  titleCrm: [bar(4) + BEAT, bar(4) + BEAT * 2] as const, // "Your" "CRM."
  noteFly: bar(4) + BEAT * 3 + 4, // a note card flies from the sphere into HubSpot
  noteLand: bar(5) - 1,

  // Bar 5, 10 to 12 s. VO: "...and turns them into memory." The music's drop.
  drop: bar(5),
  titleMemory: [bar(5), bar(5) + 8, bar(5) + BEAT * 2, bar(5) + BEAT * 3] as const, // "Every" "call." "One" "memory."
  loop: bar(5) + 2, // Remi loops for joy
  hops: [bar(5) + BEAT * 2, bar(5) + BEAT * 3] as const,

  // Bar 6 to 7, 12 to 16 s. VO: "Lynkk. Meeting memory for teams."
  collapse: bar(6), // the rings fold into the sphere
  titleWork: [bar(6), bar(6) + 7, bar(6) + BEAT, bar(6) + BEAT + 7] as const, // "Connects" "where" "you" "work."
  titleWorkOut: bar(6) + BEAT * 2 + 3,
  logo: bar(6) + BEAT * 3, // 13.5 s: the sphere locks, "Lynkk"
  tagline: bar(6) + BEAT * 3 + 7,
  button: bar(7), // 14.0 s: Start for free; Remi lands on it (the final chord)
  url: bar(7) + BEAT,
  fine: bar(7) + BEAT + 8,
  shine: bar(7) + BEAT * 2, // a light sweep crosses the button
} as const;

export type Cue = {
  f: number;
  kind: string;
  id: string;
  weight?: number;
  pan?: number;
  dur?: number;
  apexFrac?: number;
  variant?: string;
};

/** Every sound the picture asks for, on the frame the eye reads it. */
export const CUES: Cue[] = [
  // A soft background bed under the whole film (space air, a low shimmer).
  { f: 0, kind: "ambience", id: "amb:bed", dur: DURATION, weight: 0.5 },
  { f: 0, kind: "riser", id: "hook:swell", dur: T.centre, weight: 0.5 },
  { f: T.centre, kind: "hit", id: "hook:sphere:pulse", weight: 0.8, variant: "soft" },
  { f: T.eyesOpen, kind: "blip", id: "hook:remi:eyes", weight: 0.6 },
  { f: T.launch, kind: "whoosh", id: "hook:remi:launch", dur: 14, apexFrac: 0.5, weight: 0.7 },

  { f: T.ring1From, kind: "whoosh", id: "ring1:draw", dur: T.ring1To - T.ring1From, apexFrac: 0.5, weight: 0.6 },
  { f: T.lock1, kind: "hit", id: "ring1:lock", weight: 1, variant: "snap" },
  ...T.titleRecords.map((f, i) => ({ f, kind: "tick", id: `ring1:title:${i}`, weight: 0.35 })),

  { f: T.ring2From, kind: "whoosh", id: "ring2:draw", dur: T.ring2To - T.ring2From, apexFrac: 0.5, weight: 0.6, pan: -0.2 },
  { f: T.lock2, kind: "hit", id: "ring2:lock", weight: 1, variant: "snap" },
  { f: T.lock2 + 2, kind: "whoosh", id: "ring2:remi:roll", dur: 18, apexFrac: 0.5, weight: 0.4 },
  { f: T.chips + 3, kind: "pop", id: "ring2:chips", weight: 0.6, pan: 0.3 },

  { f: T.pull, kind: "whoosh", id: "ring3:pull", dur: 20, apexFrac: 0.4, weight: 0.8 },
  { f: T.ring3From, kind: "whoosh", id: "ring3:draw", dur: T.ring3To - T.ring3From, apexFrac: 0.5, weight: 0.6, pan: 0.2 },
  { f: T.lock3, kind: "hit", id: "ring3:lock", weight: 1.3, variant: "snap" },
  { f: T.noteLand, kind: "pop", id: "ring3:note:land", weight: 0.6, pan: 0.4 },

  { f: T.drop, kind: "drop", id: "drop:downbeat", weight: 1.5 },
  { f: T.loop, kind: "blip", id: "drop:remi:loop", weight: 0.5 },
  ...T.hops.map((f, i) => ({ f, kind: "blip", id: `drop:remi:hop:${i}`, weight: 0.35 })),

  { f: T.collapse, kind: "whoosh", id: "end:collapse", dur: T.logo - T.collapse, apexFrac: 0.85, weight: 0.8 },
  { f: T.logo, kind: "hit", id: "end:logo:impact", weight: 1.2 },
  { f: T.logo + 6, kind: "bell", id: "end:logo:note", weight: 0.7 },
  { f: T.logo + 1, kind: "shimmer", id: "end:logo:sparkles", dur: 24, weight: 0.6 },
  { f: T.shine, kind: "shimmer", id: "end:button:shine", dur: 16, weight: 0.4, pan: 0.2 },
  { f: T.button, kind: "blip", id: "end:remi:land", weight: 0.5 },
].sort((a, b) => a.f - b.f);
