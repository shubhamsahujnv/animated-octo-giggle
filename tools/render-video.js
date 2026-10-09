// Renders a motion-graphics video.html frame by frame (deterministic seek) and pipes
// the frames into ffmpeg. Produces silent.mp4; tools/mix-audio.sh adds voice + music.
// Usage: NODE_PATH=$(npm root -g) node tools/render-video.js content/videos/<dir> [--fps 30] [--stills 1,5,9]
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
  page.on('pageerror', (e) => { console.error('PAGE ERROR', e.message); process.exitCode = 1; });
  await page.addInitScript(`window.TL = ${JSON.stringify(tl)};`);
  await page.goto('file://' + path.join(dir, 'video.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => window.READY === true);
  const stage = await page.$('#stage');

  if (stills) {   // quick preview: a few still frames at given seconds
    const out = path.join(dir, 'preview');
    fs.mkdirSync(out, { recursive: true });
    for (const s of stills.split(',').map(Number)) {
      await page.evaluate((t) => window.seek(t), s);
      await stage.screenshot({ path: path.join(out, `t${String(s).padStart(5, '0')}.png`) });
    }
    await browser.close();
    return;
  }

  const frames = Math.round(tl.duration * fps);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    path.join(dir, 'silent.mp4')], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = 0; f < frames; f++) {
    await page.evaluate((t) => window.seek(t), f / fps);
    const buf = await stage.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (f % 150 === 0) console.log(`frame ${f}/${frames}`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  await browser.close();
  console.log('wrote silent.mp4');
})();
