// Render video.html frame by frame (30fps) and mux with the soundtrack.
// Frame 0 is the settled hook frame (poster), so every platform's thumbnail shows it.
// Usage: node work/render-video.js   (run python3 work/music.py work/music.wav first)
const { chromium } = require('playwright');
const path = require('path'), { spawn, execFileSync } = require('child_process');

const FPS = 30, POSTER_T = 5.0;
(async () => {
  const dir = path.resolve(__dirname, '..');
  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto('file://' + path.join(dir, 'video.html'));
  await page.evaluate(() => document.fonts.ready);
  const total = await page.evaluate(() => window.TOTAL);
  const frames = Math.round(total * FPS);

  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-i', path.join(__dirname, 'music.wav'),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-movflags', '+faststart',
    '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-shortest',
    path.join(dir, 'brag.mp4')], { stdio: ['pipe', 'inherit', 'inherit'] });

  for (let i = 0; i < frames; i++) {
    const t = i === 0 ? POSTER_T : i / FPS;
    await page.evaluate((t) => renderAt(t), t);
    const buf = await page.screenshot({ type: 'jpeg', quality: 94 });
    if (i === 0) require('fs').writeFileSync(path.join(dir, 'brag.jpg'), buf);
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (i % 150 === 0) console.log(`frame ${i}/${frames}`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  await b.close();
  console.log(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration:stream=codec_name,width,height,r_frame_rate', '-of', 'compact', path.join(dir, 'brag.mp4')]).toString());
})();
