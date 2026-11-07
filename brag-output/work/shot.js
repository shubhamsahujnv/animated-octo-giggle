const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('https://thegreensolve.com', { waitUntil: 'networkidle', timeout: 60000 });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: 'site-top.png' });
  await p.screenshot({ path: 'site-full.png', fullPage: true });
  const imgs = await p.$$eval('img, svg', els => els.slice(0,15).map(e => e.tagName + ' ' + (e.src || e.getAttribute('aria-label') || e.className?.baseVal || e.className) + ' ' + e.getBoundingClientRect().width));
  console.log(imgs.join('\n'));
  const h = await p.evaluate(() => document.body.scrollHeight); console.log('height', h);
  await b.close();
})();
