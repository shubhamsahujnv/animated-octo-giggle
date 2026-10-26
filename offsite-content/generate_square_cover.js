/* Substack needs one square publication cover (documented minimum 600x600).
 * This is per-publication, not per-issue, so it is a single file. */
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const [STUDIO, OUT] = process.argv.slice(2);
(async () => {
  const src = fs.readFileSync(STUDIO, 'utf8');
  const tmp = path.join(path.dirname(STUDIO), 'studio-square.html');
  fs.writeFileSync(tmp, src.replace('render(cv, 1);', 'render(cv, window.__SCALE__ || 1);'));
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1400, height: 1200 } });
  await p.goto('file://' + tmp, { waitUntil: 'load' });
  await p.addScriptTag({ content: 'window.__SCALE__ = 1;' });   // 1080x1080 already
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(() => {
    const set = (id, v) => { const e = document.getElementById(id); e.value = v;
                             e.dispatchEvent(new Event('input', { bubbles: true })); };
    document.querySelector('#sizes button:nth-child(4)').click();    // Square
    document.querySelector('#styles button:nth-child(2)').click();   // Ink
    document.querySelector('#accents button:nth-child(1)').click();  // violet
    document.querySelector('#lockups button:nth-child(3)').click();  // mark only
    set('title', 'Notes from the *build*');
    set('eyebrow', 'Pixorama');
    set('sub', 'What engineering decisions actually cost');
    set('footL', 'pixoramagroup.com');
    set('footR', 'Fortnightly');
  });
  await p.waitForTimeout(250);
  const { d, w, h } = await p.evaluate(() => {
    const c = document.getElementById('cv');
    return { d: c.toDataURL('image/webp', 0.82), w: c.width, h: c.height };
  });
  const buf = Buffer.from(d.split(',')[1], 'base64');
  fs.writeFileSync(path.join(OUT, 'SUBSTACK-publication-cover.webp'), buf);
  console.log(`SUBSTACK-publication-cover.webp  ${w}x${h}  ${Math.round(buf.length/1024)} KB`);
  await b.close();
})();
