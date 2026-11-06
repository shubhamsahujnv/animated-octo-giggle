/* Shared drawing kit for the Green Dhanteras pieces (video + banners).
   Expects globals W, H and ctx to be defined by the page before this loads. */
const C = {
  teal:'#02403D', deep:'#01302E', deep2:'#012624', lime:'#E2FF4D', cream:'#FFFDF8',
  sand:'#F5F1EA', muted:'#665458', mint:'#8FD0A3', leaf:'#2F6B4F', leaf2:'#3F8A5F',
  hill1:'#155C57', hill2:'#0A4E4A', hill3:'#012B28', clay:'#C2622F', clayDark:'#7A3418',
  marigold:'#F59E0B', marigoldDeep:'#D9580F', gold:'#F2C94C', goldDark:'#B8860B'
};

/* ---------- maths & easing ---------- */
const clamp = (x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const lerp = (a,b,t)=>a+(b-a)*t;
const p = (t,a,b)=>clamp((t-a)/(b-a));
const eo = x=>1-Math.pow(1-x,3);
const eio = x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const ei = x=>x*x;
const eback = x=>{const c1=1.70158,c3=c1+1;return x<=0?0:1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2);};
const env = (t,a,b,c,d)=>Math.min(p(t,a,b), c===undefined?1:1-p(t,c,d));
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function hex(h){return [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];}
function mix(a,b,t){const A=hex(a),B=hex(b);return `rgb(${A.map((v,i)=>Math.round(lerp(v,B[i],t))).join(',')})`;}
function rgba(h,a){const [r,g,b]=hex(h);return `rgba(${r},${g},${b},${a})`;}

/* ---------- primitives ---------- */
function circle(x,y,r,fill){ctx.beginPath();ctx.arc(x,y,Math.max(0,r),0,Math.PI*2);ctx.fillStyle=fill;ctx.fill();}
function glow(x,y,r,col,a){const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,rgba(col,a));g.addColorStop(1,rgba(col,0));ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);}

// leaf: base at (x,y), pointing along angle (0 = down, PI = up)
function leaf(x,y,len,wid,ang,fill,rib){
  if(len<=0.5) return;
  ctx.save();ctx.translate(x,y);ctx.rotate(ang);
  ctx.beginPath();ctx.moveTo(0,0);
  ctx.bezierCurveTo(wid*.95,len*.18,wid*.75,len*.72,0,len);
  ctx.bezierCurveTo(-wid*.75,len*.72,-wid*.95,len*.18,0,0);
  ctx.fillStyle=fill;ctx.fill();
  if(rib){ctx.strokeStyle=rib;ctx.lineWidth=Math.max(1,wid*.07);ctx.lineCap='round';ctx.beginPath();ctx.moveTo(0,len*.06);ctx.quadraticCurveTo(wid*.1,len*.5,0,len*.9);ctx.stroke();}
  ctx.restore();
}

function marigold(x,y,r){
  for(let i=0;i<10;i++){const a=i/10*Math.PI*2;circle(x+Math.cos(a)*r*.55,y+Math.sin(a)*r*.55,r*.55,i%2?C.marigoldDeep:C.marigold);}
  circle(x,y,r*.6,C.marigold);circle(x,y,r*.22,C.marigoldDeep);
}

// clay diya; origin = centre of bowl rim. flame 0..1
function diya(x,y,s,flame,t,seed=0,glowOn=true){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  const fl = 1+.07*Math.sin(t*13+seed)+.05*Math.sin(t*29+seed*2.3);
  const fx = 70, fy = -22;
  if(flame>0 && glowOn){
    glow(fx,fy-40,190*fl,'#FFD27A',.42*flame);
    glow(fx,fy-40,320*fl,C.lime,.10*flame);
  }
  // body
  ctx.beginPath();
  ctx.moveTo(-82,-12);
  ctx.bezierCurveTo(-80,44,40,52,70,6);
  ctx.lineTo(94,-20);
  ctx.quadraticCurveTo(40,-2,-82,-12);
  const g=ctx.createLinearGradient(0,-20,0,46);g.addColorStop(0,'#D9773F');g.addColorStop(1,'#8E3D1B');
  ctx.fillStyle=g;ctx.fill();
  // oil well
  ctx.beginPath();ctx.ellipse(-4,-12,74,13,-.04,0,Math.PI*2);ctx.fillStyle=C.clayDark;ctx.fill();
  ctx.beginPath();ctx.ellipse(-4,-10,60,8,-.04,0,Math.PI*2);ctx.fillStyle='#E7B65A';ctx.globalAlpha=.85;ctx.fill();ctx.globalAlpha=1;
  // dotted band (brand lime + cream)
  for(let i=0;i<9;i++){circle(-58+i*14,16+Math.sin(i*.9)*1,3.4,i%2?C.cream:C.lime);}
  // foot
  ctx.beginPath();ctx.ellipse(-12,42,30,6,0,0,Math.PI*2);ctx.fillStyle='#6E2C12';ctx.fill();
  // wick
  ctx.strokeStyle='#3a1a0a';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(fx-6,fy+8);ctx.lineTo(fx,fy-2);ctx.stroke();
  if(flame>0){
    ctx.translate(fx,fy);ctx.rotate(.07*Math.sin(t*7+seed));
    const fh=78*flame*fl, fw=22*flame;
    ctx.beginPath();ctx.moveTo(0,-fh);ctx.bezierCurveTo(fw*1.25,-fh*.42,fw,0,0,2);ctx.bezierCurveTo(-fw,0,-fw*1.25,-fh*.42,0,-fh);
    const fg=ctx.createRadialGradient(0,-fh*.22,0,0,-fh*.3,fh*.8);
    fg.addColorStop(0,'#FFFDF8');fg.addColorStop(.35,'#FFE27A');fg.addColorStop(.8,'#F59E0B');fg.addColorStop(1,'rgba(217,88,15,.6)');
    ctx.fillStyle=fg;ctx.fill();
    ctx.beginPath();ctx.moveTo(0,-fh*.45);ctx.bezierCurveTo(fw*.5,-fh*.2,fw*.4,0,0,0);ctx.bezierCurveTo(-fw*.4,0,-fw*.5,-fh*.2,0,-fh*.45);
    ctx.fillStyle='rgba(226,255,77,.55)';ctx.fill();
  }
  ctx.restore();
}

function coin(x,y,r,spin,m){
  const sx=Math.max(.14,Math.abs(Math.cos(spin)));
  ctx.save();ctx.translate(x,y);ctx.scale(sx,1);
  const c1=mix(C.gold,C.lime,m), c2=mix(C.goldDark,'#7FA312',m);
  const g=ctx.createLinearGradient(-r,-r,r,r);g.addColorStop(0,c1);g.addColorStop(1,c2);
  circle(0,0,r,g);
  ctx.strokeStyle=c2;ctx.lineWidth=r*.1;ctx.beginPath();ctx.arc(0,0,r*.78,0,Math.PI*2);ctx.stroke();
  leaf(0,r*.42,r*.95,r*.7,Math.PI,c2);
  ctx.restore();
}

function pot(x,y,s){
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  // neck
  ctx.fillStyle='#A9481F';ctx.fillRect(-62,-170,124,50);
  // body
  ctx.beginPath();ctx.ellipse(0,0,150,132,0,0,Math.PI*2);
  const g=ctx.createRadialGradient(-50,-50,10,0,0,170);g.addColorStop(0,'#E08A4E');g.addColorStop(1,'#8A3818');
  ctx.fillStyle=g;ctx.fill();
  // band
  ctx.save();ctx.beginPath();ctx.ellipse(0,0,150,132,0,0,Math.PI*2);ctx.clip();
  ctx.fillStyle=C.teal;ctx.fillRect(-160,-48,320,40);
  for(let i=0;i<11;i++){const bx=-140+i*28;ctx.beginPath();ctx.moveTo(bx,-8);ctx.lineTo(bx+14,-28);ctx.lineTo(bx+28,-8);ctx.fillStyle=i%2?C.lime:C.cream;ctx.globalAlpha=.9;ctx.fill();ctx.globalAlpha=1;}
  for(let i=0;i<10;i++){circle(-126+i*28,-38,4,C.lime);}
  ctx.restore();
  // rim
  ctx.beginPath();ctx.ellipse(0,-172,92,22,0,0,Math.PI*2);ctx.fillStyle='#C2622F';ctx.fill();
  ctx.beginPath();ctx.ellipse(0,-170,72,14,0,0,Math.PI*2);ctx.fillStyle='#3A1607';ctx.fill();
  ctx.restore();
}

// sapling growing from (x,y) up; grow 0..1
function sapling(x,y,h,t,leafT){
  if(h<=1) return;
  const sway=Math.sin(t*1.7)*6;
  const tipX=x+sway, tipY=y-h;
  ctx.strokeStyle=C.mint;ctx.lineWidth=10;ctx.lineCap='round';
  ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x-14,y-h*.5,tipX,tipY);ctx.stroke();
  const nodes=[.38,.66,.96];
  nodes.forEach((f,k)=>{
    const g=eback(leafT[k]); if(g<=0) return;
    const nx=lerp(x,tipX,f)-14*Math.sin(Math.PI*f)*.9, ny=lerp(y,tipY,f);
    const L=(k===2?78:96)*g, Wd=(k===2?44:52)*g;
    leaf(nx,ny,L,Wd,Math.PI+1.0+Math.sin(t*2+k)*.05,k%2?C.lime:C.leaf2,k%2?C.leaf:C.mint);
    leaf(nx,ny,L,Wd,Math.PI-1.0+Math.sin(t*2+k+1)*.05,k%2?C.leaf2:C.lime,k%2?C.mint:C.leaf);
  });
}

function toran(t,a,yOff,onLight){
  if(a<=0) return;
  ctx.save();ctx.globalAlpha=a;
  const y0=70+yOff, sag=36, sy=x=>y0+sag*Math.sin(Math.PI*x/W);
  ctx.strokeStyle=onLight?rgba(C.teal,.6):rgba(C.cream,.55);ctx.lineWidth=3;
  ctx.beginPath();for(let x=0;x<=W;x+=20){x?ctx.lineTo(x,sy(x)):ctx.moveTo(x,sy(x));}ctx.stroke();
  const n=Math.ceil((W-24)/68.8);
  for(let i=0;i<n;i++){
    const x=24+i*68.8, y=sy(x), sw=.07*Math.sin(t*1.6+i*.7);
    if(i%3===1){
      ctx.strokeStyle=onLight?rgba(C.teal,.5):rgba(C.cream,.4);ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.sin(sw)*90,y+90);ctx.stroke();
      marigold(x+Math.sin(sw)*40,y+40,17);marigold(x+Math.sin(sw)*80,y+82,19);
    } else {
      leaf(x,y,118,46,sw,i%2?C.leaf2:C.leaf,onLight?C.lime:rgba(C.lime,.9));
    }
  }
  ctx.restore();
}

function turbine(x,base,h,t,off){
  ctx.fillStyle='#2A6F69';
  ctx.beginPath();ctx.moveTo(x-7,base);ctx.lineTo(x-2.5,base-h);ctx.lineTo(x+2.5,base-h);ctx.lineTo(x+7,base);ctx.fill();
  const hy=base-h, a=t*1.3+off;
  for(let k=0;k<3;k++){
    ctx.save();ctx.translate(x,hy);ctx.rotate(a+k*Math.PI*2/3);
    ctx.beginPath();ctx.moveTo(-5,0);ctx.quadraticCurveTo(-6,-h*.3,0,-h*.48);ctx.quadraticCurveTo(4,-h*.25,5,0);ctx.fillStyle='#3E8A82';ctx.fill();
    ctx.restore();
  }
  circle(x,hy,7,'#3E8A82');
  if(Math.sin(t*4+off)>.3) circle(x,hy-2,4,C.lime);
}

function solarRow(x0,y,n,t){
  for(let i=0;i<n;i++){
    const x=x0+i*92;
    ctx.strokeStyle='#2A6F69';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x+40,y);ctx.lineTo(x+40,y+26);ctx.stroke();
    ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+80,y);ctx.lineTo(x+96,y-46);ctx.lineTo(x+16,y-46);ctx.closePath();
    ctx.fillStyle='#0E3A46';ctx.fill();
    ctx.save();ctx.clip();
    ctx.strokeStyle=rgba(C.lime,.25);ctx.lineWidth=1.5;
    for(let k=1;k<4;k++){ctx.beginPath();ctx.moveTo(x+k*20,y);ctx.lineTo(x+16+k*20,y-46);ctx.stroke();}
    ctx.beginPath();ctx.moveTo(x+8,y-23);ctx.lineTo(x+88,y-23);ctx.stroke();
    const gx=((t*260+i*40)%900)-200+x0;
    const g=ctx.createLinearGradient(gx-40,0,gx+40,0);g.addColorStop(0,rgba(C.lime,0));g.addColorStop(.5,rgba(C.lime,.55));g.addColorStop(1,rgba(C.lime,0));
    ctx.fillStyle=g;ctx.fillRect(x,y-50,100,56);
    ctx.restore();
  }
}

function hillPath(yBase,amp,f,ph){
  ctx.beginPath();ctx.moveTo(0,H);
  for(let x=0;x<=W;x+=12){ctx.lineTo(x,yBase-amp*Math.sin(x/W*Math.PI*f+ph)-amp*.35*Math.sin(x/W*Math.PI*f*2.3+ph*1.7));}
  ctx.lineTo(W,H);ctx.closePath();
}
function hillY(x,yBase,amp,f,ph){return yBase-amp*Math.sin(x/W*Math.PI*f+ph)-amp*.35*Math.sin(x/W*Math.PI*f*2.3+ph*1.7);}

/* ---------- text ---------- */
function text(str,x,y,o){
  const a=o.alpha===undefined?1:o.alpha; if(a<=0) return;
  ctx.save();ctx.globalAlpha*=a;ctx.font=o.font;ctx.fillStyle=o.color;ctx.textAlign=o.align||'center';ctx.textBaseline='alphabetic';
  ctx.letterSpacing=(o.ls||0)+'px';ctx.fillText(str,x,y+(o.dy||0));ctx.restore();
}
// word-by-word rise
function words(str,cx,y,font,color,t,t0,stag=.08,dur=.5,out){
  ctx.save();ctx.font=font;ctx.letterSpacing='0px';
  const ws=str.split(' '), sp=ctx.measureText(' ').width, wd=ws.map(w=>ctx.measureText(w).width);
  let x=cx-(wd.reduce((a,b)=>a+b,0)+sp*(ws.length-1))/2;
  ws.forEach((w,i)=>{
    const k=eo(p(t,t0+i*stag,t0+i*stag+dur));
    const a=k*(out===undefined?1:out);
    if(a>0){ctx.globalAlpha=a;ctx.fillStyle=color;ctx.textAlign='left';ctx.fillText(w,x,y+(1-k)*46);}
    x+=wd[i]+sp;
  });
  ctx.restore();
}

/* ---------- icons for tip cards ---------- */
function iconSun(x,y){circle(x,y,13,C.teal);ctx.strokeStyle=C.teal;ctx.lineWidth=4;ctx.lineCap='round';
  for(let i=0;i<8;i++){const a=i/8*Math.PI*2;ctx.beginPath();ctx.moveTo(x+Math.cos(a)*19,y+Math.sin(a)*19);ctx.lineTo(x+Math.cos(a)*26,y+Math.sin(a)*26);ctx.stroke();}}
function iconSprout(x,y){ctx.strokeStyle=C.teal;ctx.lineWidth=4;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x,y+22);ctx.lineTo(x,y-4);ctx.stroke();
  leaf(x,y-2,28,20,Math.PI+1,C.teal);leaf(x,y-2,28,20,Math.PI-1,C.teal);ctx.fillStyle=C.teal;ctx.fillRect(x-16,y+20,32,5);}

function card(i,label,t,t0,out){
  const k=eo(p(t,t0,t0+.6)), a=k*out; if(a<=0) return;
  const x=90+(1-k)*140, y=410+i*158, w=900, h=128;
  ctx.save();ctx.globalAlpha=a;
  ctx.beginPath();ctx.roundRect(x,y,w,h,28);ctx.fillStyle=rgba(C.cream,.07);ctx.fill();
  ctx.strokeStyle=rgba(C.lime,.55);ctx.lineWidth=2;ctx.stroke();
  const ix=x+72, iy=y+h/2;
  circle(ix,iy,44,C.lime);
  if(i===0){ctx.save();ctx.translate(ix-6,iy+8);diya(0,0,.36,1,t,4,false);ctx.restore();}
  if(i===1) iconSun(ix,iy);
  if(i===2) iconSprout(ix,iy);
  ctx.font='500 40px "DM Sans"';ctx.fillStyle=C.cream;ctx.textAlign='left';ctx.textBaseline='middle';
  ctx.fillText(label,x+140,iy+2);
  ctx.restore();
}
