// Writes out/cues.json (the real-sound cue format) from src/timing.ts, so the
// sound frames come from the picture code. Run: npm run cues
import { writeFileSync, mkdirSync } from "node:fs";
import { BPM, CUES, DURATION, FPS, SCENES, T } from "../src/timing.ts";

const acts = Object.fromEntries(Object.entries(SCENES).map(([k, v]) => [k, { from: v.from, dur: v.dur }]));
const cue = { centre: T.centre, lock1: T.lock1, lock2: T.lock2, lock3: T.lock3, drop: T.drop, logo: T.logo, button: T.button };
mkdirSync(new URL("../out/", import.meta.url), { recursive: true });
writeFileSync(
  new URL("../out/cues.json", import.meta.url),
  JSON.stringify({ fps: FPS, bpm: BPM, total: DURATION, acts, cue, events: CUES }, null, 1),
);
console.log(`out/cues.json: ${CUES.length} events`);
