// Render a slides page frame by frame (30fps) and mux with audio.
// Frame 0 is the settled hook frame (poster), so every platform's thumbnail shows it.
// Usage: node work/render-video.js [page.html] [audio.wav] [out.mp4] [posterSeconds]
//   defaults: video.html  work/music.wav  brag.mp4  5.0
// With work/vo/narration.wav present and an audio arg of "mix", music is ducked under the voice-over.
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs'), { spawn, execFileSync } = require('child_process');

const FPS = 30;
(async () => {
  const dir = path.resolve(__dirname, '..');
  const [html = 'video.html', audio = 'work/music.wav', out = 'brag.mp4', posterArg] = process.argv.slice(2);
  const POSTER_T = posterArg ? +posterArg : 5.0;
  const poster = path.join(dir, out.replace(/\.mp4$/, '.jpg'));
  const vo = path.join(dir, 'work/vo/narration.wav');
  const useVo = fs.existsSync(vo) && audio.includes('explainer');

  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto('file://' + path.join(dir, html));
  await page.evaluate(() => document.fonts.ready);
  const total = await page.evaluate(() => window.TOTAL);
  const frames = Math.round(total * FPS);

  // music ducks under the narration (sidechain), then the whole mix is normalised
  const audioArgs = useVo
    ? ['-i', path.join(dir, audio), '-i', vo,
       '-filter_complex',
       // input 0 is the frame pipe, 1 is the music, 2 is the narration
       '[2:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo,volume=2.2[vo];' +
       '[vo]asplit=2[vo1][sc];' +
       '[1:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo,volume=0.62[mus];' +
       '[mus][sc]sidechaincompress=threshold=0.03:ratio=9:attack=12:release=420:makeup=1[duck];' +
       '[vo1][duck]amix=inputs=2:normalize=0:dropout_transition=0[mixed];' +
       '[mixed]loudnorm=I=-16:TP=-1.5:LRA=11[aout]',
       '-map', '0:v', '-map', '[aout]']
    : ['-i', path.join(dir, audio), '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11'];

  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    ...audioArgs,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-movflags', '+faststart',
    '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-shortest', path.join(dir, out)], { stdio: ['pipe', 'inherit', 'inherit'] });

  for (let i = 0; i < frames; i++) {
    const t = i === 0 ? POSTER_T : i / FPS;
    await page.evaluate((t) => renderAt(t), t);
    const buf = await page.screenshot({ type: 'jpeg', quality: 94 });
    if (i === 0) fs.writeFileSync(poster, buf);
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (i % 300 === 0) console.log(`frame ${i}/${frames}`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  await b.close();
  console.log(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration:stream=codec_name,width,height,r_frame_rate', '-of', 'compact', path.join(dir, out)]).toString());
})();
