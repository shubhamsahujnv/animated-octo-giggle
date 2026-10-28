#!/usr/bin/env node
/**
 * Capture real screenshots for a film's assets — never invent UI.
 *
 *   node shoot_site.js https://pixoramagroup.com assets/shots/
 *   node shoot_site.js https://pixoramagroup.com assets/shots/ --width 1440 --full
 *   node shoot_site.js https://pixoramagroup.com assets/shots/ --paths /,/services,/contact
 *
 * Deterministic: fixed viewport, animations disabled, scroll settled, fonts awaited.
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) flags[key] = true;
      else { flags[key] = next; i++; }
    } else positional.push(a);
  }
  return { positional, flags };
}

const { positional, flags } = parseArgs(process.argv.slice(2));
if (flags.help || positional.length < 2) {
  console.log(`Usage: node shoot_site.js <base-url> <out-dir> [options]

  --paths a,b,c   paths to capture (default "/")
  --width N       viewport width (default 1440)
  --height N      viewport height (default 900)
  --scale N       device scale factor (default 2)
  --full          full-page capture instead of viewport
  --dark          request prefers-color-scheme: dark`);
  process.exit(positional.length < 2 ? 1 : 0);
}

const base = positional[0].replace(/\/$/, '');
const outDir = path.resolve(positional[1]);
const paths = String(flags.paths || '/').split(',').map(s => s.trim()).filter(Boolean);
const width = Number(flags.width || 1440);
const height = Number(flags.height || 900);

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: Number(flags.scale || 2),
    colorScheme: flags.dark ? 'dark' : 'light',
    reducedMotion: 'reduce',
  });

  const manifest = [];
  for (const p of paths) {
    const url = base + (p.startsWith('/') ? p : '/' + p);
    const page = await ctx.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.evaluate(() => document.fonts && document.fonts.ready);
      // settle scroll-triggered reveals, then return to the top
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
          window.scrollTo(0, y);
          await new Promise(r => setTimeout(r, 150));
        }
        window.scrollTo(0, 0);
        await new Promise(r => setTimeout(r, 300));
      });
      const name = (p === '/' ? 'home' : p.replace(/^\//, '').replace(/[\/]/g, '-')) +
        (flags.dark ? '-dark' : '') + '.png';
      const file = path.join(outDir, name);
      await page.screenshot({ path: file, fullPage: Boolean(flags.full), animations: 'disabled' });
      manifest.push({ url, file: path.relative(process.cwd(), file) });
      console.log(`shoot: ${url} -> ${file}`);
    } catch (e) {
      console.error(`shoot: ${url} failed — ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  // provenance, so CREDITS.md can be written from fact
  const creditsPath = path.join(outDir, 'SOURCES.json');
  fs.writeFileSync(creditsPath, JSON.stringify({
    capturedAt: new Date().toISOString(), base, shots: manifest,
  }, null, 2) + '\n');
  console.log(`shoot: ${manifest.length} shots, provenance in ${creditsPath}`);
})().catch((e) => {
  console.error('shoot:', e.message);
  process.exit(1);
});
