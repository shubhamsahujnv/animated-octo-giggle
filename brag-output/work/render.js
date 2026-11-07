// Usage:
//   node render.js stills 1.0 2.5 ...   -> stills/t-<t>.png
//   node render.js video out.mp4        -> pipes 30fps frames to ffmpeg (silent video)
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const FPS = 30;
const mode = process.argv[2];
const page_url = 'file://' + path.join(__dirname, 'composition', 'index.html');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto(page_url);
  await page.evaluate(() => window.ready);
  const dur = await page.evaluate(() => window.DUR);

  if (mode === 'stills') {
    fs.mkdirSync(path.join(__dirname, 'stills'), { recursive: true });
    for (const s of process.argv.slice(3)) {
      const t = parseFloat(s);
      await page.evaluate(t => window.render(t), t);
      await page.screenshot({ path: path.join(__dirname, 'stills', `t-${t.toFixed(3)}.png`) });
    }
  } else if (mode === 'video') {
    const out = process.argv[3];
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', String(FPS), out], { stdio: ['pipe', 'inherit', 'inherit'] });
    const n = Math.round(dur * FPS);
    for (let i = 0; i < n; i++) {
      const t = i / FPS;
      await page.evaluate(t => window.render(t), t);
      const buf = await page.screenshot({ type: 'png' });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % 60 === 0) process.stdout.write(`frame ${i}/${n}\n`);
    }
    ff.stdin.end();
    await new Promise(r => ff.on('close', r));
  }
  await browser.close();
})();
