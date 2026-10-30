// Render every <section class="slide"> in <carousel-dir>/slides.html to PNG,
// plus one PDF (for LinkedIn document posts) and a contact sheet for review.
// Usage: node render.js <carousel-dir>
// Needs Playwright with Chromium. If `require('playwright')` fails, run with
// NODE_PATH="$(npm root -g)" or install it: npm i -D playwright && npx playwright install chromium
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');

let chromium;
try { ({ chromium } = require('playwright')); }
catch (e) {
  try { ({ chromium } = require(path.join(execFileSync('npm', ['root', '-g']).toString().trim(), 'playwright'))); }
  catch (e2) { console.error('Playwright not found. Install it: npm i -D playwright && npx playwright install chromium'); process.exit(1); }
}

(async () => {
  const dir = path.resolve(process.argv[2] || '.');
  const html = path.join(dir, 'slides.html');
  if (!fs.existsSync(html)) { console.error(`No slides.html in ${dir}`); process.exit(1); }
  const outDir = path.join(dir, 'png');
  fs.mkdirSync(outDir, { recursive: true });
  for (const f of fs.readdirSync(outDir)) if (/^slide-\d+\.png$/.test(f)) fs.unlinkSync(path.join(outDir, f));

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  const problems = [];
  page.on('requestfailed', (r) => problems.push(`missing file: ${r.url()}`));
  await page.goto('file://' + html);
  await page.evaluate(() => document.fonts.ready);

  // flag text that spills outside its slide (a common layout bug)
  const overflow = await page.evaluate(() => [...document.querySelectorAll('section.slide')].map((s, i) => {
    const r = s.getBoundingClientRect();
    const bad = [...s.querySelectorAll('*')].some((el) => { const b = el.getBoundingClientRect(); return b.width && (b.right > r.right + 1 || b.bottom > r.bottom + 1); });
    return bad ? i + 1 : null;
  }).filter(Boolean));
  if (overflow.length) problems.push(`content runs off slide(s): ${overflow.join(', ')}`);

  const slides = await page.$$('section.slide');
  const files = [];
  for (let i = 0; i < slides.length; i++) {
    const file = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    await slides[i].screenshot({ path: file });
    files.push(file);
  }
  await browser.close();

  execFileSync('python3', ['-c', `
import sys
from PIL import Image
out_pdf, sheet, files = sys.argv[1], sys.argv[2], sys.argv[3:]
imgs = [Image.open(f).convert('RGB') for f in files]
imgs[0].save(out_pdf, save_all=True, append_images=imgs[1:], resolution=72)
cols = min(5, len(imgs)); rows = -(-len(imgs) // cols); W, H = 432, 540
s = Image.new('RGB', (W * cols, H * rows), 'white')
for i, im in enumerate(imgs): s.paste(im.resize((W, H)), ((i % cols) * W, (i // cols) * H))
s.save(sheet)
`, path.join(dir, 'carousel.pdf'), path.join(dir, 'contact-sheet.png'), ...files]);

  console.log(`Rendered ${files.length} slides -> ${outDir}, carousel.pdf, contact-sheet.png`);
  if (problems.length) { console.log('CHECK:'); problems.forEach((p) => console.log('  - ' + p)); }
})();
