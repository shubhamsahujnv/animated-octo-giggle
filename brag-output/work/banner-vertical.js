// Renders composition/banner-vertical.html to ../banner-diwali-reel-1080x1920.png
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await p.goto('file://' + path.join(__dirname, 'composition', 'banner-vertical.html'));
  await p.evaluate(() => window.ready);
  await p.screenshot({ path: path.join(__dirname, '..', 'banner-diwali-reel-1080x1920.png') });
  await b.close();
})();
