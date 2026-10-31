// The Green Solve: motion-graphics engine for 1080×1920 explainer videos.
// render.js injects window.TL (timeline.json: duration, scenes[{id,start,end,caption,words[]}], sources).
// Every animation is a paused Web Animation; window.seek(t) scrubs all of them, so frames are deterministic.
const TL = window.TL;
const SC = {};
TL.scenes.forEach((s, i) => { SC[s.id] = { ...s, next: (TL.scenes[i + 1] || { start: TL.duration }).start, i }; });
const $ = (q, r = document) => (typeof q === 'string' ? r.querySelector(q) : q);
const $$ = (q, r = document) => [...r.querySelectorAll(q)];
const NS = 'http://www.w3.org/2000/svg';
const EASE = 'cubic-bezier(.22,1,.36,1)', BACK = 'cubic-bezier(.34,1.5,.64,1)', INOUT = 'cubic-bezier(.65,0,.35,1)', LIN = 'linear';
const hooks = [];
const C = { ink: '#02403D', accent: '#E2FF4D', surface: '#D8CAC3', muted: '#665458', paper: '#FFFDF8' };
// SVG groups that carry a transform attribute get wrapped, so CSS animations on them keep their position
document.querySelectorAll('svg g[id][transform]').forEach((g) => {
  const w = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  w.setAttribute('transform', g.getAttribute('transform')); g.removeAttribute('transform');
  g.parentNode.insertBefore(w, g); w.appendChild(g);
});
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// ---------- core ----------
function A(el, kf, t, d, o = {}) {
  el = $(el); if (!el) { console.warn('missing', kf); return; }
  return el.animate(kf, { delay: t * 1000, duration: d * 1000, fill: o.fill || 'both', easing: o.ease || EASE,
    iterations: o.it || 1, direction: o.dir || 'normal' });
}
const each = (q, fn) => $$(q).forEach(fn);
const fadeIn  = (el, t, d = .5) => A(el, [{ opacity: 0 }, { opacity: 1 }], t, d);
const fadeOut = (el, t, d = .4) => A(el, [{ opacity: 1 }, { opacity: 0 }], t, d, { fill: 'forwards' });
const fadeUp  = (el, t, d = .6, y = 40) => A(el, [{ opacity: 0, transform: `translateY(${y}px)` }, { opacity: 1, transform: 'none' }], t, d);
const popIn   = (el, t, d = .55) => A(el, [{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'scale(1)' }], t, d, { ease: BACK });
const slideIn = (el, t, dx = -160, d = .7) => A(el, [{ opacity: 0, transform: `translateX(${dx}px)` }, { opacity: 1, transform: 'none' }], t, d);
const grow    = (el, t, d = .9, axis = 'Y') => A(el, [{ transform: `scale${axis}(0)` }, { transform: `scale${axis}(1)` }], t, d);
const spin    = (el, t, period = 1, dir = 1) => A(el, [{ transform: 'rotate(0deg)' }, { transform: `rotate(${360 * dir}deg)` }], t, period, { it: Infinity, ease: LIN });
const bob     = (el, t, amp = 14, period = 2.4) => A(el, [{ transform: 'translateY(0)' }, { transform: `translateY(${-amp}px)` }], t, period / 2, { it: Infinity, dir: 'alternate', ease: 'ease-in-out', fill: 'forwards' });
const breathe = (el, t, s = 1.04, period = 2) => A(el, [{ transform: 'scale(1)' }, { transform: `scale(${s})` }], t, period / 2, { it: Infinity, dir: 'alternate', ease: 'ease-in-out', fill: 'forwards' });
// draw an SVG stroke from nothing
function draw(el, t, d = 1, ease = INOUT) {
  el = $(el); const L = Math.ceil(el.getTotalLength ? el.getTotalLength() : 1000);
  el.style.strokeDasharray = `${L} ${L}`;
  return A(el, [{ strokeDashoffset: L }, { strokeDashoffset: 0 }], t, d, { ease });
}
// endless flow along a dashed stroke (liquid in a pipe, airflow)
function flow(el, t, speed = 1, dash = '22 18') {
  el = $(el); el.style.strokeDasharray = dash;
  const p = dash.split(' ').map(Number).reduce((a, b) => a + b, 0);
  return A(el, [{ strokeDashoffset: 0 }, { strokeDashoffset: -p * 2 }], t, 0.8 / speed, { it: Infinity, ease: LIN, fill: 'forwards' });
}
// number counter (eased), formatted by fmt
function counter(el, t, d, to, fmt = (v) => Math.round(v).toLocaleString('en-US'), from = 0) {
  el = $(el);
  hooks.push((now) => { const p = Math.min(1, Math.max(0, (now - t) / d)); el.textContent = fmt(from + (to - from) * (1 - Math.pow(1 - p, 3))); });
}
// split a headline into words; each rises in, italic words last
function kinetic(el, t, stagger = .09, d = .55) {
  el = $(el);
  const walk = (node) => [...node.childNodes].forEach((n) => {
    if (n.nodeType === 3) {
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((p) => {
        if (!p) return;
        if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
        const s = document.createElement('span'); s.className = 'w'; s.textContent = p; frag.appendChild(s);
      });
      n.replaceWith(frag);
    } else if (n.nodeType === 1 && !n.classList.contains('w')) {
      if (n.classList.contains('it')) n.classList.add('w'); else walk(n);
    }
  });
  walk(el);
  $$('.w', el).forEach((w, i) => A(w, [{ opacity: 0, transform: 'translateY(60px) rotate(2deg)' }, { opacity: 1, transform: 'none' }], t + i * stagger, d, { ease: BACK }));
  return t + $$('.w', el).length * stagger + d;
}

// ---------- word cues from the voiceover (speech-recognition word timings) ----------
const norm = (w) => w.toLowerCase().replace(/[^a-z0-9]/g, '');
// time the n-th caption word (0-based) of a scene starts
const W = (id, n) => (SC[id].words && SC[id].words[n] ? SC[id].words[n].start : SC[id].start);
// time the first word containing `txt` (after optional index `after`) starts
function WF(id, txt, after = -1) {
  const ws = SC[id].words || []; const key = norm(txt);
  for (let i = after + 1; i < ws.length; i++) if (norm(ws[i].w) === key) return ws[i].start;      // exact word first
  for (let i = after + 1; i < ws.length; i++) if (norm(ws[i].w).includes(key)) return ws[i].start;
  console.warn('cue not found', id, txt); return SC[id].start;
}

// ---------- scenes and transitions ----------
// enter: 'cut' | 'fade' | 'wipe' | 'circle' | 'up' | 'zoom'; each scene also gets a slow camera push
function scene(id, enter = 'fade', o = {}) {
  const s = SC[id], el = $('#' + id), first = s.i === 0;
  const t0 = first ? 0 : s.start - .32, t1 = s.next - .3;
  el.style.zIndex = 2 + s.i;
  if (enter === 'circle') A(el, [{ opacity: 1, clipPath: `circle(0% at ${o.at || '50% 45%'})` }, { opacity: 1, clipPath: `circle(150% at ${o.at || '50% 45%'})` }], t0, .8, { ease: INOUT });
  else if (enter === 'up') A(el, [{ opacity: 1, transform: 'translateY(1920px)' }, { opacity: 1, transform: 'none' }], t0, .7, { ease: INOUT });
  else if (enter === 'zoom') A(el, [{ opacity: 0, transform: 'scale(1.35)' }, { opacity: 1, transform: 'none' }], t0, .7, { ease: EASE });
  else if (enter === 'wipe') { wipe(t0 - .25); A(el, [{ opacity: 0 }, { opacity: 1 }], t0 + .1, .01); }
  else A(el, [{ opacity: 0 }, { opacity: 1 }], t0, first ? .01 : .4);
  if (s.i < TL.scenes.length - 1 && !o.keep) A(el, [{ opacity: 1 }, { opacity: 0 }], t1 + .25, .3, { fill: 'forwards' });
  const cam = $('.cam', el);
  if (cam && !o.still) A(cam, [{ transform: 'scale(1)' }, { transform: `scale(${o.push || 1.05})` }], t0, s.next - t0 + .3, { ease: LIN });
  const dots = $('.dots', el);
  if (dots) A(dots, [{ transform: 'translate(0,0)' }, { transform: 'translate(54px,54px)' }], 0, 3.2, { it: Infinity, ease: LIN });
  return first ? 0 : s.start;
}
function wipe(t) {
  const w = document.createElement('div'); w.className = 'wipe'; $('#stage').appendChild(w);
  A(w, [{ transform: 'skewX(-14deg) translateX(0)' }, { transform: 'skewX(-14deg) translateX(4400px)' }], t, .75, { ease: INOUT });
}

// ---------- particles ----------
// rising heat specks inside a box (x,y,w,h) of a container
function heat(container, t, n, box, color = '#E2FF4D', speed = 1) {
  container = $(container);
  for (let i = 0; i < n; i++) {
    const d = document.createElement('i'), sz = 6 + rnd() * 10;
    d.style.cssText = `position:absolute;left:${box.x + rnd() * box.w}px;top:${box.y + box.h}px;width:${sz}px;height:${sz}px;border-radius:50%;background:${color};opacity:0`;
    container.appendChild(d);
    const life = (1.6 + rnd() * 1.4) / speed, delay = t + rnd() * life;
    A(d, [{ opacity: 0, transform: 'translate(0,0) scale(.6)' }, { opacity: .85, offset: .2 }, { opacity: 0, transform: `translate(${(rnd() - .5) * 80}px,${-box.h - 60}px) scale(1.1)` }], delay, life, { it: Infinity, ease: LIN });
  }
}
// twinkling stars over the whole stage
function stars(container, n, t = 0) {
  container = $(container);
  for (let i = 0; i < n; i++) {
    const d = document.createElement('i'), sz = 2 + rnd() * 4;
    d.style.cssText = `position:absolute;left:${rnd() * 1080}px;top:${rnd() * 1920}px;width:${sz}px;height:${sz}px;border-radius:50%;background:var(--paper)`;
    container.appendChild(d);
    A(d, [{ opacity: .15 }, { opacity: .8 }], t - rnd() * 3, 1.5 + rnd() * 2.5, { it: Infinity, dir: 'alternate', ease: 'ease-in-out', fill: 'forwards' });
    A(d, [{ transform: 'translateX(0)' }, { transform: 'translateX(-60px)' }], 0, 30, { ease: LIN });
  }
}

// ---------- chrome ----------
function chrome(series, episode) {
  const st = $('#stage');
  st.insertAdjacentHTML('beforeend', `<div id="chrome"><div id="progress"><i></i></div>
    <div id="brand"><img src="../../_engine/brand/logo-light-trimmed.png" alt=""><span>${series}</span></div>
    <div id="epi">${episode}</div><div id="captions"></div></div>`);
  A('#progress i', [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], 0, TL.duration, { ease: LIN });
  fadeUp('#brand', .1, .6, -30); fadeUp('#epi', .25, .6, -30);
}
// captions with true word timings; words matching `hl` turn accent once spoken
function captions(hl, max = 46) {
  TL.scenes.forEach((s, si) => {
    const ws = s.words; if (!ws || !ws.length) return;
    const nxt = SC[s.id].next;
    // chunk at punctuation, at most `max` characters per chunk (two lines)
    const chunks = []; let cur = [];
    ws.forEach((w, i) => {
      const len = cur.map((c) => c.w).join(' ').length + w.w.length + 1;
      if (cur.length && len > max) { chunks.push(cur); cur = []; }
      cur.push(w);
      if (/[.?!:]$/.test(w.w) && cur.map((c) => c.w).join(' ').length > 18) { chunks.push(cur); cur = []; }
    });
    if (cur.length) chunks.push(cur);
    chunks.forEach((ch, k) => {
      const t0 = ch[0].start - .08, t1 = k < chunks.length - 1 ? chunks[k + 1][0].start - .08 : Math.min(nxt - .1, s.end + .5);
      const box = document.createElement('div'); box.className = 'cap';
      const p = document.createElement('p'); box.appendChild(p); $('#captions').appendChild(box);
      ch.forEach((w) => {
        const sp = document.createElement('span'); sp.textContent = w.w + ' '; p.appendChild(sp);
        A(sp, [{ opacity: .4, color: C.paper }, { opacity: 1, color: hl.test(w.w) ? C.accent : C.paper }], w.start, .1, { fill: 'forwards' });
      });
      A(box, [{ opacity: 0, transform: 'translateY(18px) scale(.97)' }, { opacity: 1, transform: 'none' }], t0, .2);
      A(box, [{ opacity: 1 }, { opacity: 0 }], t1, .12, { fill: 'forwards' });
    });
  });
}

// ---------- svg helpers ----------
function svgEl(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  if (parent) $(parent).appendChild(e);
  return e;
}

// call last: pause everything and expose the seek API
function finish() {
  const anims = document.getAnimations();
  anims.forEach((a) => a.pause());
  window.seek = (t) => { const ms = t * 1000; anims.forEach((a) => (a.currentTime = ms)); hooks.forEach((h) => h(t)); };
  window.seek(0);
  window.READY = true;
}
