// Report, per scene: bottom of the last content element, top of the source line, and the gap.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const html = process.argv[2] || 'video.html';
  const b = await chromium.launch();
  const page = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto('file://' + path.join(path.resolve(__dirname, '..'), html));
  await page.evaluate(() => document.fonts.ready);
  const rows = await page.evaluate(() => [...document.querySelectorAll('.scene')].map((s, i) => {
    renderAt(+s.dataset.start + Math.min(4.5, +s.dataset.dur - 0.5));
    const src = s.querySelector('.source'), foot = s.querySelector('.footer');
    const skip = new Set(['source', 'footer', 'endlogo']);
    let bottom = 0;
    s.querySelectorAll(':scope > *').forEach((el) => {
      if ([...skip].some((c) => el.classList.contains(c))) return;
      const r = el.getBoundingClientRect(); if (r.width) bottom = Math.max(bottom, r.bottom);
    });
    const srcTop = src ? src.getBoundingClientRect().top : (foot ? foot.getBoundingClientRect().top : 1920);
    return { scene: i + 1, bottom: Math.round(bottom), srcTop: Math.round(srcTop), gap: Math.round(srcTop - bottom) };
  }));
  await b.close();
  rows.forEach((r) => console.log(`scene ${r.scene}: content ends ${r.bottom}, source top ${r.srcTop}, gap ${r.gap}${r.gap < 24 ? '  <-- TIGHT' : ''}${r.gap > 360 ? '  <-- EMPTY BOTTOM' : ''}`));
})();
