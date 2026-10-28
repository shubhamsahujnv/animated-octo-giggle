#!/usr/bin/env node
/**
 * Beat map + music bed generator for Pixorama motion films.
 *
 *   node beats.js --bpm 120 --duration 15 --out audio/beats.json
 *   node beats.js --bpm 120 --duration 15 --out audio/beats.json --render-music audio/music.wav
 *
 * beats.json is the clock: the picture is retimed to it, not the other way round.
 * The music bed is deliberately sparse — sub pulse on downbeats, a held pad, and an
 * arpeggio from the proof section on. It is a bed, not a track.
 */

const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith('--')) continue;
    const key = argv[i].slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) flags[key] = true;
    else { flags[key] = next; i++; }
  }
  return flags;
}

const flags = parseArgs(process.argv.slice(2));
if (flags.help) {
  console.log(`Usage: node beats.js [options]

  --bpm N             tempo (default 120; pick one where 1800/bpm is a whole number of frames)
  --duration N        seconds (default 15)
  --fps N             frames per second, for the frame column (default 30)
  --beats-per-bar N   default 4
  --out FILE          write beats.json here (default audio/beats.json)
  --render-music FILE also synthesize a 16-bit PCM WAV music bed
  --key HZ            tonic of the pad (default 110 = A2)`);
  process.exit(0);
}

const bpm = Number(flags.bpm || 120);
const duration = Number(flags.duration || 15);
const fps = Number(flags.fps || 30);
const bpb = Number(flags['beats-per-bar'] || 4);
const outPath = path.resolve(flags.out || 'audio/beats.json');
const tonic = Number(flags.key || 110);

const spb = 60 / bpm;                       // seconds per beat
const framesPerBeat = spb * fps;
if (Math.abs(framesPerBeat - Math.round(framesPerBeat)) > 1e-9) {
  console.warn(`beats: warning — ${bpm} BPM at ${fps}fps is ${framesPerBeat.toFixed(3)} ` +
    `frames per beat, so boundaries will drift. Prefer 90/100/120/150.`);
}

const beats = [];
for (let t = 0, i = 0; t < duration - 1e-9; t += spb, i++) {
  beats.push({ t: Number(t.toFixed(6)), frame: Math.round(t * fps), bar: Math.floor(i / bpb) + 1, beat: (i % bpb) + 1 });
}
const downbeats = beats.filter(b => b.beat === 1);

const map = {
  bpm, fps, duration,
  beatsPerBar: bpb,
  secondsPerBeat: Number(spb.toFixed(6)),
  framesPerBeat: Math.round(framesPerBeat),
  beats: beats.map(b => b.t),
  downbeats: downbeats.map(b => b.t),
  grid: beats,
  // Fill these in from SHOTLIST.md. Every hit names the visible thing that causes it.
  hits: [],
};

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(map, null, 2) + '\n');
console.log(`beats: ${beats.length} beats, ${downbeats.length} downbeats -> ${outPath}`);
console.log(`beats: 1 beat = ${Math.round(framesPerBeat)} frames, 1 bar = ${Math.round(framesPerBeat * bpb)} frames`);

/* ---------- optional music bed ---------- */

if (typeof flags['render-music'] === 'string') {
  const wavPath = path.resolve(flags['render-music']);
  const rate = 48000;
  const n = Math.round(duration * rate);
  const buf = new Float32Array(n);

  const env = (x, a, d) => x < a ? x / a : Math.max(0, 1 - (x - a) / d);

  // sub pulse on every downbeat
  for (const d of map.downbeats) {
    const start = Math.round(d * rate);
    const len = Math.round(0.45 * rate);
    for (let i = 0; i < len && start + i < n; i++) {
      const x = i / rate;
      const f = 55 * (1 - 0.25 * (x / 0.45));            // slight pitch drop
      buf[start + i] += Math.sin(2 * Math.PI * f * x) * env(x, 0.004, 0.44) * 0.5;
    }
  }

  // held pad: tonic + fifth + octave, slow tremolo, fades in and out
  for (let i = 0; i < n; i++) {
    const x = i / rate;
    const fade = Math.min(1, x / 1.2) * Math.min(1, (duration - x) / 1.5);
    const trem = 0.85 + 0.15 * Math.sin(2 * Math.PI * (bpm / 240) * x);
    const pad =
      Math.sin(2 * Math.PI * tonic * x) * 0.30 +
      Math.sin(2 * Math.PI * tonic * 1.5 * x) * 0.18 +
      Math.sin(2 * Math.PI * tonic * 2 * x) * 0.10;
    buf[i] += pad * fade * trem * 0.18;
  }

  // arpeggio from the proof section (one third in), one note per beat
  const arpFrom = duration / 3;
  const ratios = [2, 3, 4, 3];
  let k = 0;
  for (const b of map.beats) {
    if (b < arpFrom) { k++; continue; }
    const start = Math.round(b * rate);
    const len = Math.round(0.22 * rate);
    const f = tonic * ratios[k++ % ratios.length];
    for (let i = 0; i < len && start + i < n; i++) {
      const x = i / rate;
      buf[start + i] += Math.sin(2 * Math.PI * f * x) * env(x, 0.006, 0.21) * 0.10;
    }
  }

  // one-pole low-pass to take the edge off, then a safety limiter
  let prev = 0;
  for (let i = 0; i < n; i++) {
    prev = prev + 0.35 * (buf[i] - prev);
    buf[i] = Math.tanh(prev * 1.1) * 0.9;
  }

  const bytes = Buffer.alloc(44 + n * 2);
  bytes.write('RIFF', 0);
  bytes.writeUInt32LE(36 + n * 2, 4);
  bytes.write('WAVE', 8);
  bytes.write('fmt ', 12);
  bytes.writeUInt32LE(16, 16);
  bytes.writeUInt16LE(1, 20);            // PCM
  bytes.writeUInt16LE(1, 22);            // mono
  bytes.writeUInt32LE(rate, 24);
  bytes.writeUInt32LE(rate * 2, 28);
  bytes.writeUInt16LE(2, 32);
  bytes.writeUInt16LE(16, 34);
  bytes.write('data', 36);
  bytes.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) {
    bytes.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(buf[i] * 32767))), 44 + i * 2);
  }

  fs.mkdirSync(path.dirname(wavPath), { recursive: true });
  fs.writeFileSync(wavPath, bytes);
  console.log(`beats: music bed -> ${wavPath} (${duration}s mono 48k)`);
}
