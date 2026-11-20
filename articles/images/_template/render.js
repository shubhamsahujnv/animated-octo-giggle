const { chromium } = require('playwright'); const path=require('path');
const jobs = JSON.parse(process.argv[2]);
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
 await p.goto('file://'+path.resolve('template.html')); await p.evaluate(async()=>{await Promise.all([document.fonts.load('500 72px "Space Grotesk"'),document.fonts.load('400 24px "DM Sans"'),document.fonts.load('600 17px "IBM Plex Mono"')]); await document.fonts.ready;});
 for (const j of jobs){
  const fit = await p.evaluate(({t,a,d,j0})=>{ const el=document.getElementById('t'); el.textContent=t;
    document.getElementById('a').textContent=a; document.getElementById('d').textContent=d;
    let s, w; for (w of [760, 880]) { el.style.width=w+'px'; s=j0||73; el.style.fontSize=s+'px'; while(el.scrollHeight>300 && s>40){s-=1; el.style.fontSize=s+'px';} if (s>=58) break; }
    return {size:s,width:w,h:el.scrollHeight, fonts:[...document.fonts].filter(f=>f.status=='loaded').map(f=>f.family).join(',')}; }, j);
  await p.screenshot({path:j.out, type:j.out.endsWith('.png')?'png':'jpeg', quality:j.out.endsWith('.png')?undefined:92});
  console.log(j.out, JSON.stringify(fit));
 } await b.close(); })();
