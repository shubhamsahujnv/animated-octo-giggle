/* Batch-export the 30 covers by driving the Cover Studio's own canvas.
 *
 * The studio renders client-side, so instead of reimplementing its design we
 * load its published page, set its controls, and read the canvas back. The one
 * local change is the export scale: draw() hardcodes render(cv, 1), so a patch
 * lets the preview canvas render at 2x and give us 2400x1260 directly.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const STUDIO = process.argv[2];
const CSV    = process.argv[3];
const OUT    = process.argv[4];
const SCALE  = 2;
const QUALITY = 0.82;

// control order matches the PRESETS / STYLES / ACCENTS / LOCKUPS arrays
const IDX = {
  format:     { og: 1, hero: 2, wide: 3, square: 4, portrait: 5 },
  background: { depth: 1, ink: 2, wash: 3, paper: 4 },
  accent:     { violet: 1, magenta: 2, cyan: 3, white: 4 },
  lockup:     { markword: 1, full: 2, mark: 3 },
};

function parseCsv(text) {
  const rows = []; let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
    else if (c !== '\r') cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const head = rows.shift();
  return rows.filter(r => r.length === head.length)
             .map(r => Object.fromEntries(head.map((h, i) => [h, r[i]])));
}

(async () => {
  // patch the local copy so the preview canvas renders at SCALE
  const src = fs.readFileSync(STUDIO, 'utf8');
  if (!src.includes('render(cv, 1);')) throw new Error('patch point render(cv, 1) not found');
  const patched = src.replace('render(cv, 1);', 'render(cv, window.__SCALE__ || 1);');
  const tmp = path.join(path.dirname(STUDIO), 'studio-batch.html');
  fs.writeFileSync(tmp, patched);

  const rows = parseCsv(fs.readFileSync(CSV, 'utf8'));
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1500, height: 1100 },
                                       deviceScaleFactor: 1 });
  const problems = [];
  page.on('console', m => { if (m.type() === 'error') problems.push('console: ' + m.text()); });
  page.on('requestfailed', r => problems.push('failed: ' + r.url()));

  await page.goto('file://' + tmp, { waitUntil: 'load' });
  await page.addScriptTag({ content: `window.__SCALE__ = ${SCALE};` });

  // Manrope must be loaded or the canvas silently falls back to sans-serif
  await page.evaluate(() => document.fonts.ready);
  const fontOk = await page.evaluate(() =>
    document.fonts.check('800 80px Manrope') && document.fonts.check('600 16px Manrope'));
  if (!fontOk) throw new Error('Manrope did not load — covers would render in a fallback face');
  console.log('Manrope loaded, rendering at ' + SCALE + 'x\n');

  const results = [];
  for (const r of rows) {
    const stem = path.basename(r.file || '', '.md') || r.id;
    const file = `${stem}.webp`;

    await page.evaluate(({ r, IDX }) => {
      const set = (id, v) => {
        const el = document.getElementById(id);
        el.value = v;
        el.dispatchEvent(new Event('input', { bubbles: true }));
      };
      const pick = (host, n) =>
        document.querySelector(`#${host} button:nth-child(${n})`).click();

      pick('sizes',    IDX.format[r.format_primary.trim().split(' ')[0]]);
      pick('styles',   IDX.background[r.background]);
      pick('accents',  IDX.accent[r.accent]);
      pick('lockups',  IDX.lockup[r.lockup]);
      set('title',   r.banner_title);
      set('eyebrow', r.kicker);
      set('sub',     r.standfirst || '');
      set('footL',   r.footer_left);
      set('footR',   r.footer_right);
      for (const t of ['grid', 'glow', 'rule']) {
        const el = document.getElementById(t);
        if (!el.checked) { el.checked = true; el.dispatchEvent(new Event('change', { bubbles: true })); }
      }
    }, { r, IDX });

    await page.waitForTimeout(140);   // let draw() settle

    const { dataUrl, w, h } = await page.evaluate((q) => {
      const c = document.getElementById('cv');
      return { dataUrl: c.toDataURL('image/webp', q), w: c.width, h: c.height };
    }, QUALITY);

    if (!dataUrl.startsWith('data:image/webp')) throw new Error(`${r.id}: webp encode failed`);
    const buf = Buffer.from(dataUrl.split(',')[1], 'base64');
    fs.writeFileSync(path.join(OUT, file), buf);
    results.push({ id: r.id, file, w, h, bytes: buf.length });
    console.log(`  ${r.id.padEnd(4)} ${String(w)}x${h}  ${String(Math.round(buf.length/1024)).padStart(4)} KB  ${file}`);
  }

  await browser.close();
  fs.writeFileSync(path.join(OUT, '_manifest.json'), JSON.stringify(results, null, 1));
  const over = results.filter(r => r.bytes > 300 * 1024);
  const sizes = new Set(results.map(r => `${r.w}x${r.h}`));
  console.log(`\n${results.length} covers written to ${OUT}/`);
  console.log(`  dimensions: ${[...sizes].join(', ')}`);
  console.log(`  total: ${(results.reduce((a, b) => a + b.bytes, 0) / 1048576).toFixed(2)} MB`);
  console.log(`  over the studio's 300KB guidance: ${over.length ? over.map(r => r.id).join(', ') : 'none'}`);
  if (problems.length) console.log('\nbrowser problems:\n  ' + [...new Set(problems)].join('\n  '));
})().catch(e => { console.error('FAILED: ' + e.message); process.exit(1); });
