const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 4 });
  await p.goto('https://thegreensolve.com', { waitUntil: 'networkidle', timeout: 60000 });
  const info = await p.$$eval('img', els => els.map(e => ({ src: e.src.slice(0, 40), len: e.src.length, w: e.naturalWidth, h: e.naturalHeight, alt: e.alt, r: e.getBoundingClientRect().toJSON() })));
  console.log(JSON.stringify(info, null, 1));
  const imgs = await p.$$('img');
  for (let i = 0; i < imgs.length; i++) {
    const src = await imgs[i].getAttribute('src');
    if (src && src.startsWith('data:image/png')) fs.writeFileSync('img' + i + '.png', Buffer.from(src.split(',')[1], 'base64'));
  }
  await p.screenshot({ path: 'site-mid.png', clip: { x: 0, y: 800, width: 1440, height: 1100 }, scale: 'css' });
  await b.close();
})();
