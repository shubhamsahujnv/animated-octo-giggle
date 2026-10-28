const { chromium } = require('playwright');
const path = require('path');

const OUT = process.argv[2];

const SUB_LONG  = 'Your phones, answered at 9:42&nbsp;pm. PXO AI books the appointment, quotes from your own price list, and sends the confirmation &mdash; before the call ends.';
const SUB_SHORT = 'PXO AI answers after hours, books the appointment, and confirms on WhatsApp.';

const sizes = [
  { name:'x-header',        w:1500, h:500,  scale:1.00, padL:92,  textMax:880, subMax:690,
    orb:430, orbX:'80%', orbY:'46%', h1:76, h1gap:20, sub:20, subGap:30, chips:true, chipGap:34,
    markH:40, word:34, subtitle:SUB_LONG, layout:'left' },

  { name:'linkedin-profile',w:1584, h:396,  scale:0.92, padL:96,  textMax:900, subMax:700,
    orb:360, orbX:'81%', orbY:'50%', h1:64, h1gap:16, sub:19, subGap:26, chips:false, chipGap:0,
    markH:38, word:32, subtitle:SUB_SHORT, layout:'left' },

  { name:'linkedin-company',w:1128, h:191,  scale:0.62, padL:60,  textMax:760, subMax:620,
    orb:210, orbX:'85%', orbY:'50%', h1:58, h1gap:12, sub:19, subGap:18, chips:false, chipGap:0,
    markH:36, word:30, subtitle:SUB_SHORT, layout:'left' },

  { name:'youtube-channel', w:2560, h:1440, scale:1.22, padL:0,   textMax:1200, subMax:880,
    layout:'wide', orb:560, h1:76, h1gap:20, sub:20, subGap:30, chips:true, chipGap:34,
    markH:40, word:34, subtitle:SUB_LONG },

  { name:'og-card',         w:1200, h:630,  scale:1.00, padL:0,   textMax:1000, subMax:720,
    layout:'stacked', orb:150, orbGap:30, h1:62, h1gap:18, sub:19, subGap:28, chips:true, chipGap:32,
    markH:40, word:32, subtitle:SUB_SHORT },
];

(async () => {
  const browser = await chromium.launch({ args:['--no-sandbox','--force-color-profile=srgb'] });
  for (const cfg of sizes) {
    const page = await browser.newPage({
      viewport:{ width:cfg.w, height:cfg.h },
      deviceScaleFactor:1
    });
    await page.goto('file://' + path.join(__dirname, 'banner.html'));
    await page.evaluate(c => window.render(c), cfg);
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(OUT, `pxo-banner-${cfg.name}-${cfg.w}x${cfg.h}.png`) });
    await page.close();
    console.log('rendered', cfg.name, cfg.w + 'x' + cfg.h);
  }
  await browser.close();
})();
