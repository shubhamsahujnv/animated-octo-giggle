#!/usr/bin/env node
/**
 * Deterministic frame renderer for Pixorama motion films.
 *
 * Loads a film HTML that exposes window.__motion = { width, height, fps, duration, seek(t) },
 * steps t = n / fps, screenshots #stage (or the viewport) each step, and encodes with ffmpeg.
 *
 *   node render.js film/index.html out/film.mp4 [--width 1080 --height 1920]
 *                                              [--fps 30] [--duration 15]
 *                                              [--scale 2] [--crf 16] [--keep-frames]
 */

const { chromium } = require('playwright');
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) flags[key] = true;
      else { flags[key] = next; i++; }
    } else positional.push(a);
  }
  return { positional, flags };
}

const { positional, flags } = parseArgs(process.argv.slice(2));

if (flags.help || positional.length < 2) {
  console.log(`Usage: node render.js <film.html> <out.mp4> [options]

Options:
  --width N         override stage width (default: from window.__motion)
  --height N        override stage height
  --fps N           override fps (default 30)
  --duration N      override duration in seconds
  --scale N         device scale factor for capture, downscaled on encode (default 2)
  --crf N           x264 CRF (default 16)
  --keep-frames     keep the PNG frames next to the output
  --frames-dir DIR  write frames here instead of a temp dir`);
  process.exit(positional.length < 2 ? 1 : 0);
}

const filmPath = path.resolve(positional[0]);
const outPath = path.resolve(positional[1]);
const scale = Number(flags.scale || 2);
const crf = String(flags.crf || 16);

if (!fs.existsSync(filmPath)) {
  console.error(`render: film not found: ${filmPath}`);
  process.exit(1);
}

const framesDir = flags['frames-dir']
  ? path.resolve(flags['frames-dir'])
  : fs.mkdtempSync(path.join(os.tmpdir(), 'pxmotion-'));
const keepFrames = Boolean(flags['keep-frames'] || flags['frames-dir']);

(async () => {
  fs.mkdirSync(framesDir, { recursive: true });
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const browser = await chromium.launch({ args: ['--no-sandbox', '--font-render-hinting=none'] });

  // First pass: read the contract at the film's own declared size.
  const probe = await browser.newPage();
  await probe.goto('file://' + filmPath, { waitUntil: 'load' });
  const declared = await probe.evaluate(() => {
    const m = window.__motion;
    if (!m) return null;
    return { width: m.width, height: m.height, fps: m.fps, duration: m.duration };
  });
  await probe.close();

  if (!declared) {
    await browser.close();
    console.error('render: window.__motion is missing. The film must expose ' +
      '{ width, height, fps, duration, seek(t) } — see references/motion-studio-rules.md');
    process.exit(1);
  }

  const width = Number(flags.width || declared.width || 1920);
  const height = Number(flags.height || declared.height || 1080);
  const fps = Number(flags.fps || declared.fps || 30);
  const duration = Number(flags.duration || declared.duration || 15);
  const total = Math.round(duration * fps);

  console.log(`render: ${width}x${height} @ ${fps}fps · ${duration}s · ${total} frames · scale ${scale}`);

  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: scale,
  });
  // Freeze anything that might still try to animate on its own.
  await page.addInitScript(() => {
    window.__RENDERING__ = true;
    Math.random = () => 0.5; // seeded randomness belongs in the film, not here
  });
  await page.goto('file://' + filmPath, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.evaluate(() => window.__motion.ready || null);

  const hasSeek = await page.evaluate(() => typeof window.__motion.seek === 'function');
  if (!hasSeek) {
    await browser.close();
    console.error('render: window.__motion.seek(t) is not a function.');
    process.exit(1);
  }

  const stage = (await page.$('#stage')) || null;
  const target = stage || page;
  const pad = String(total).length + 1;
  const t0 = Date.now();

  for (let n = 0; n < total; n++) {
    const t = n / fps;
    await page.evaluate((tt) => window.__motion.seek(tt), t);
    // Let layout and paint settle for this exact t, without advancing any clock.
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    await target.screenshot({
      path: path.join(framesDir, `f${String(n).padStart(pad, '0')}.png`),
      animations: 'disabled',
    });
    if (n % fps === 0 || n === total - 1) {
      const pct = Math.round(((n + 1) / total) * 100);
      process.stdout.write(`\rrender: ${pct}% (${n + 1}/${total})   `);
    }
  }
  process.stdout.write('\n');
  await browser.close();
  console.log(`render: frames in ${((Date.now() - t0) / 1000).toFixed(1)}s`);

  const ff = spawnSync('ffmpeg', [
    '-y', '-hide_banner', '-loglevel', 'error',
    '-framerate', String(fps),
    '-i', path.join(framesDir, `f%0${pad}d.png`),
    '-vf', `scale=${width}:${height}:flags=lanczos,format=yuv420p`,
    '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow', '-crf', crf,
    '-movflags', '+faststart',
    outPath,
  ], { stdio: 'inherit' });

  if (ff.status !== 0) {
    console.error('render: ffmpeg failed');
    process.exit(ff.status || 1);
  }

  if (!keepFrames) fs.rmSync(framesDir, { recursive: true, force: true });
  else console.log(`render: frames kept in ${framesDir}`);

  const size = (fs.statSync(outPath).size / 1e6).toFixed(2);
  console.log(`render: wrote ${outPath} (${size} MB)`);
})().catch((e) => {
  console.error('render:', e.message);
  process.exit(1);
});
