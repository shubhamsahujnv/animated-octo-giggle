// Renders composition/banner.html to ../banner-diwali-1200x628@2x.png
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 628 }, deviceScaleFactor: 2 });
  await p.goto('file://' + path.join(__dirname, 'composition', 'banner.html'));
  await p.evaluate(() => window.ready);
  await p.screenshot({ path: path.join(__dirname, '..', 'banner-diwali-1200x628@2x.png') });
  await b.close();
})();
