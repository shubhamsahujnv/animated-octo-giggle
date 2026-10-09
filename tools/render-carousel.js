// Renders every <section class="slide"> in a carousel HTML file to PNG,
// then combines them into one PDF for LinkedIn document posts.
// Usage: NODE_PATH=$(npm root -g) node tools/render-carousel.js content/carousels/<dir>
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright');

(async () => {
  const dir = path.resolve(process.argv[2]);
  const outDir = path.join(dir, 'png');
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(dir, 'slides.html'));
  await page.evaluate(() => document.fonts.ready);

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
imgs = [Image.open(f).convert('RGB') for f in sys.argv[2:]]
imgs[0].save(sys.argv[1], save_all=True, append_images=imgs[1:], resolution=72)
`, path.join(dir, 'carousel.pdf'), ...files]);
  console.log(`Rendered ${files.length} slides + carousel.pdf in ${dir}`);
})();
