// Render the film frame by frame in headless Chromium and encode with ffmpeg.
//
//   node render.mjs --out out/film.mp4                     whole film
//   node render.mjs --range 0:12 --scale 0.5 --out out/t.mp4   a slice, half size
//   node render.mjs --audio out/score.wav --out out/film.mp4   mux a score
//   node render.mjs --stills 0.2,3.4,9 --outdir stills         PNG stills only
//
// The page must expose window.renderFrame(t), DURATION, FPS, WIDTH, HEIGHT and
// resolve window.__ready once fonts and images are loaded.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require("playwright")); }
catch { ({ chromium } = require("/opt/node22/lib/node_modules/playwright")); }

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const root = path.dirname(fileURLToPath(import.meta.url));
const html = opt("html", "index.html");
const scale = Number(opt("scale", 1));
const stills = opt("stills");

// Static server for the project folder.
const types = { ".html": "text/html", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2", ".json": "application/json", ".js": "text/javascript", ".css": "text/css" };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": types[path.extname(p)] || "application/octet-stream" });
  fs.createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const url = `http://127.0.0.1:${server.address().port}/${html}`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: scale });
const problems = [];
page.on("pageerror", (e) => problems.push(String(e)));
page.on("requestfailed", (r) => problems.push(`failed: ${r.url()}`));
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => window.__ready);
const meta = await page.evaluate(() => ({ d: window.DURATION, fps: window.FPS, w: window.WIDTH, h: window.HEIGHT }));
if (problems.length) { console.error(problems.join("\n")); }

async function frameAt(t) {
  await page.evaluate((t) => window.renderFrame(t), t);
  return page.screenshot({ type: "png" });
}

if (stills) {
  const outdir = path.resolve(root, opt("outdir", "stills"));
  fs.mkdirSync(outdir, { recursive: true });
  for (const s of stills.split(",")) {
    const t = Number(s);
    const f = path.join(outdir, `t${t.toFixed(2).padStart(6, "0")}.png`);
    fs.writeFileSync(f, await frameAt(t));
    console.log("still", f);
  }
} else {
  const fps = Number(opt("fps", meta.fps));
  const [a, b] = (opt("range") ?? `0:${meta.d}`).split(":").map(Number);
  const out = path.resolve(root, opt("out", "out/film.mp4"));
  const audio = opt("audio");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const n = Math.round((b - a) * fps);
  const ff = [
    "-y", "-loglevel", "error",
    "-f", "image2pipe", "-framerate", String(fps), "-c:v", "png", "-i", "-",
    ...(audio ? ["-ss", String(a), "-t", String(b - a), "-i", path.resolve(root, audio)] : []),
    "-c:v", "libx264", "-preset", "medium", "-crf", "16", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    ...(audio ? ["-c:a", "aac", "-b:a", "256k", "-shortest"] : []),
    out,
  ];
  const enc = spawn("ffmpeg", ff, { stdio: ["pipe", "inherit", "inherit"] });
  const t0 = Date.now();
  for (let i = 0; i < n; i++) {
    const t = a + i / fps;
    const buf = await frameAt(t);
    if (!enc.stdin.write(buf)) await new Promise((r) => enc.stdin.once("drain", r));
    if (i % 30 === 0) process.stdout.write(`\r  frame ${i}/${n}  t=${t.toFixed(2)}s  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  enc.stdin.end();
  await new Promise((r) => enc.on("close", r));
  console.log(`\n  wrote ${path.relative(root, out)}  (${n} frames, ${(n / fps).toFixed(2)}s)`);
}

await browser.close();
server.close();
