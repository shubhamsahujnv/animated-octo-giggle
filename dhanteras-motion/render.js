// Renders index.html frame-by-frame into an MP4 (H.264 + optional audio).
// Usage:
//   node render.js                      -> dhanteras-tgs.mp4
//   node render.js --stills 1,5,10,15   -> stills/frame-<t>.png only
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.png': 'image/png', '.woff2': 'font/woff2' };

function serve() {
  return new Promise(res => {
    const srv = http.createServer((req, rsp) => {
      const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
      if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { rsp.writeHead(404); return rsp.end(); }
      rsp.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
      fs.createReadStream(f).pipe(rsp);
    }).listen(0, () => res(srv));
  });
}

(async () => {
  const args = process.argv.slice(2);
  const stillsArg = args.includes('--stills') ? args[args.indexOf('--stills') + 1] : null;
  const srv = await serve();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto(`http://localhost:${srv.address().port}/index.html?capture=1`);
  await page.waitForFunction(() => window.__ready === true);
  const { DUR, FPS } = await page.evaluate(() => window.__meta);

  if (args.includes('--banners')) {
    for (const [size, w, h] of [['landscape', 1920, 1080], ['square', 1080, 1080]]) {
      const bp = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
      await bp.goto(`http://localhost:${srv.address().port}/banner.html?size=${size}`);
      await bp.waitForFunction(() => window.__ready === true);
      const b64 = await bp.evaluate(() => window.__png());
      const out = path.join(ROOT, `banner-${size}-${w}x${h}.png`);
      fs.writeFileSync(out, Buffer.from(b64, 'base64'));
      console.log('wrote', out);
    }
    await browser.close(); srv.close(); return;
  }

  if (stillsArg) {
    fs.mkdirSync(path.join(ROOT, 'stills'), { recursive: true });
    for (const s of stillsArg.split(',')) {
      const b64 = await page.evaluate(f => window.__frame(f), Math.round(parseFloat(s) * FPS));
      fs.writeFileSync(path.join(ROOT, 'stills', `frame-${s}.png`), Buffer.from(b64, 'base64'));
    }
  } else {
    const out = path.join(ROOT, 'dhanteras-tgs.mp4');
    const audio = path.join(ROOT, 'assets', 'soundtrack.wav');
    const ff = ['-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-'];
    if (fs.existsSync(audio)) ff.push('-i', audio, '-c:a', 'aac', '-b:a', '192k', '-shortest');
    ff.push('-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out);
    const proc = spawn('ffmpeg', ff, { stdio: ['pipe', 'ignore', 'inherit'] });
    const total = DUR * FPS;
    for (let f = 0; f < total; f++) {
      const b64 = await page.evaluate(n => window.__frame(n, 'image/jpeg'), f);
      if (!proc.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => proc.stdin.once('drain', r));
      if (f % 60 === 0) process.stdout.write(`frame ${f}/${total}\n`);
    }
    proc.stdin.end();
    await new Promise(r => proc.on('close', r));
    console.log('wrote', out);
  }
  await browser.close();
  srv.close();
})();
