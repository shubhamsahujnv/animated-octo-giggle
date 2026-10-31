// Renders a motion-graphics video.html frame by frame (deterministic seek) into silent.mp4.
// Usage: node render.js <film dir> [--fps 30] [--stills 1,5,9] [--from 0 --to 10]
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const { chromium } = require('playwright');

(async () => {
  const dir = path.resolve(process.argv[2]);
  const arg = (k, d) => (process.argv.includes(k) ? process.argv[process.argv.indexOf(k) + 1] : d);
  const fps = Number(arg('--fps', 30));
  const stills = arg('--stills', null);
  const tl = JSON.parse(fs.readFileSync(path.join(dir, 'timeline.json'), 'utf8'));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'warning' || m.type() === 'error') errors.push(m.text()); });
  await page.addInitScript(`window.TL = ${JSON.stringify(tl)};`);
  await page.goto('file://' + path.join(dir, 'video.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => window.READY === true, null, { timeout: 20000 });
  if (errors.length) { console.error('PAGE ISSUES:\n' + errors.join('\n')); }
  const stage = await page.$('#stage');

  if (stills) {
    const out = path.join(dir, 'preview');
    fs.mkdirSync(out, { recursive: true });
    for (const s of stills.split(',').map(Number)) {
      await page.evaluate((t) => window.seek(t), s);
      await stage.screenshot({ path: path.join(out, `t${s.toFixed(2).padStart(6, '0')}.png`) });
    }
    await browser.close();
    console.log('stills written to', out);
    return;
  }
  const t0 = Number(arg('--from', 0)), t1 = Number(arg('--to', tl.duration));
  const out = arg('--out', 'silent.mp4');
  const frames = Math.round((t1 - t0) * fps);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(fps), '-movflags', '+faststart',
    path.join(dir, out)], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = 0; f < frames; f++) {
    await page.evaluate((t) => window.seek(t), t0 + f / fps);
    const buf = await stage.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (f % 300 === 0) console.log(`frame ${f}/${frames}`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  await browser.close();
  console.log('wrote', out);
})();
