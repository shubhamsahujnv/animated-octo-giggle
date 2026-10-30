// Render review stills: node work/stills.js t1 t2 ... -> work/stills/still-<t>.png + work/stills/sheet.png
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs'), { execFileSync } = require('child_process');
(async () => {
  const dir = path.resolve(__dirname, '..'), out = path.join(__dirname, 'stills');
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  const missing = [];
  page.on('requestfailed', (r) => missing.push(r.url()));
  await page.goto('file://' + path.join(dir, 'video.html'));
  await page.evaluate(() => document.fonts.ready);
  const files = [];
  for (const t of process.argv.slice(2)) {
    await page.evaluate((t) => renderAt(t), +t);
    const f = path.join(out, `still-${t}.png`); await page.screenshot({ path: f }); files.push(f);
  }
  // overflow check per scene at settled time
  const over = await page.evaluate(() => [...document.querySelectorAll('.scene')].map((s, i) => {
    renderAt(+s.dataset.start + 4.5);
    const bad = [...s.querySelectorAll('*')].filter((el) => { const r = el.getBoundingClientRect(); return r.width && (r.right > 1081 || r.bottom > 1921); });
    return bad.length ? `scene ${i + 1}: ${bad.map((e) => e.className || e.tagName).slice(0, 3).join(',')}` : null;
  }).filter(Boolean));
  await b.close();
  execFileSync('python3', ['-c', `
import sys
from PIL import Image
files=sys.argv[2:]; imgs=[Image.open(f).convert('RGB') for f in files]
cols=min(4,len(imgs)); rows=-(-len(imgs)//cols); W,H=360,640
s=Image.new('RGB',(W*cols,H*rows),'white')
for i,im in enumerate(imgs): s.paste(im.resize((W,H)),((i%cols)*W,(i//cols)*H))
s.save(sys.argv[1])`, path.join(out, 'sheet.png'), ...files]);
  console.log('stills:', files.length, 'missing:', missing, 'overflow:', over);
})();
