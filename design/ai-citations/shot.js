const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport:{width:1080,height:1350}, deviceScaleFactor:2 });
  await p.goto('file://' + __dirname + '/card.html');
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(600);
  await p.screenshot({ path:'pixorama-ai-citations.png' });
  await b.close();
})();
