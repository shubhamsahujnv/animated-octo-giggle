// The Green Solve: shared motion-graphics engine for video.html files.
// The renderer injects window.TL = {duration, scenes:[{id,start,end,caption}], sources}.
// Every animation uses the Web Animations API and is paused; window.seek(t) scrubs them
// deterministically so tools/render-video.js can capture frame by frame.
const TL = window.TL;
const S = Object.fromEntries(TL.scenes.map((s, i) => [s.id, { ...s, next: (TL.scenes[i + 1] || { start: TL.duration }).start }]));
const $ = (q) => document.querySelector(q);
const NS = 'http://www.w3.org/2000/svg';
const EASE = 'cubic-bezier(.2,.8,.2,1)', BACK = 'cubic-bezier(.34,1.56,.64,1)', INOUT = 'cubic-bezier(.65,0,.35,1)';
const hooks = [];
let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// entrance anims fill backwards (hidden before they start); exits fill forwards only
function A(el, kf, t, d, o = {}) {
  if (typeof el === 'string') el = $(el);
  return el.animate(kf, { delay: t * 1000, duration: d * 1000, fill: o.fill || 'both', easing: o.ease || EASE, iterations: o.it || 1, direction: o.dir || 'normal' });
}
const popIn  = (el, t, d = .55) => A(el, [{ opacity: 0, transform: 'translateY(50px) scale(.92)' }, { opacity: 1, transform: 'none' }], t, d, { ease: BACK });
const fadeUp = (el, t, d = .6)  => A(el, [{ opacity: 0, transform: 'translateY(36px)' }, { opacity: 1, transform: 'none' }], t, d);
const scale0 = (el, t, d = .6)  => A(el, [{ opacity: 0, transform: 'scale(0)' }, { opacity: 1, transform: 'scale(1)' }], t, d, { ease: BACK });
const draw   = (el, from, t, d) => A(el, [{ strokeDashoffset: from }, { strokeDashoffset: 0 }], t, d, { ease: INOUT });
const words  = (el, t) => { el = $(el); el.style.display = 'inline-block'; popIn(el, t); };
const spin   = (el, t, d, o = {}) => A(el, [{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], t, d, { it: Infinity, ease: 'linear', ...o });

// scene visibility; returns the scene's voice start time (hook starts at 0 so frame 1 is never blank)
function scene(id) {
  const s = S[id], first = id === TL.scenes[0].id, last = id === TL.scenes[TL.scenes.length - 1].id;
  const t0 = first ? 0 : Math.max(0, s.start - .2), t1 = s.next - .12;
  A('#' + id, [{ opacity: 0 }, { opacity: 1 }], t0, first ? .01 : .35);
  if (!last) A('#' + id, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(1.05)' }], t1 - .3, .3, { fill: 'forwards', ease: 'ease-in' });
  return first ? 0 : s.start;
}
function counter(el, t, d, to, fmt) {
  if (typeof el === 'string') el = $(el);
  hooks.push((now) => { const p = Math.min(1, Math.max(0, (now - t) / d)); el.textContent = fmt(to * (1 - Math.pow(1 - p, 3))); });
}
function wipe(t) {
  const w = document.createElement('div'); w.className = 'wipe'; $('#stage').appendChild(w);
  A(w, [{ transform: 'skewX(-12deg) translateX(0)' }, { transform: 'skewX(-12deg) translateX(4800px)' }], t, .7, { ease: INOUT });
}

// background, progress bar, brand tag, floating particles
function chrome() {
  const st = $('#stage');
  st.insertAdjacentHTML('afterbegin', '<div class="layer"><div id="bgGrid"></div><div id="glow"></div><div id="particles" class="layer"></div></div>');
  st.insertAdjacentHTML('beforeend', '<div id="captions"></div><div id="chrome" class="layer"><div id="progress"><i></i></div>' +
    '<div id="brandTag"><img src="../../../brand/logo-light-trimmed.png" alt=""><span>Data centres &amp; the environment</span></div></div>');
  A('#progress i', [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], 0, TL.duration, { ease: 'linear' });
  A('#bgGrid', [{ transform: 'translate(0,0)' }, { transform: 'translate(54px,108px)' }], 0, 6, { it: Infinity, ease: 'linear' });
  A('#glow', [{ transform: 'translate(0,0) scale(1)' }, { transform: 'translate(-120px,140px) scale(1.15)' }], 0, 9, { it: Infinity, dir: 'alternate', ease: 'ease-in-out' });
  A('#chrome', [{ opacity: 1 }, { opacity: 0 }], TL.scenes[TL.scenes.length - 1].start - .4, .4, { fill: 'forwards' });
  const P = $('#particles');
  for (let i = 0; i < 22; i++) {
    const d = document.createElement('i'), sz = 4 + rnd() * 8;
    d.style.cssText = `position:absolute;left:${rnd() * 1080}px;top:${1920 + rnd() * 150}px;width:${sz}px;height:${sz}px;border-radius:50%;background:${rnd() > .6 ? '#E2FF4D' : '#D8CAC3'};opacity:${.2 + rnd() * .35}`;
    P.appendChild(d);
    A(d, [{ transform: 'translateY(0)' }, { transform: `translateY(-${2200 + rnd() * 200}px)` }], -rnd() * 14, 10 + rnd() * 8, { it: Infinity, ease: 'linear' });
  }
}

// captions with word-by-word highlight; words matching `hl` turn lime. Skips scenes in `skip`.
function captions(hl, skip = []) {
  TL.scenes.forEach((s, i) => {
    if (skip.includes(s.id) || i === TL.scenes.length - 1) return;
    const box = document.createElement('div'); box.className = 'cap';
    const p = document.createElement('p'); box.appendChild(p); $('#captions').appendChild(box);
    const total = s.caption.length; let acc = 0;
    s.caption.split(' ').forEach((w) => {
      const sp = document.createElement('span'); sp.textContent = w + ' '; p.appendChild(sp);
      const wt = s.start + (acc / total) * (s.end - s.start); acc += w.length + 1;
      A(sp, [{ opacity: .38, color: '#FFFDF8' }, { opacity: 1, color: hl.test(w) ? '#E2FF4D' : '#FFFDF8' }], wt, .12, { fill: 'forwards' });
    });
    const nxt = (TL.scenes[i + 1] || { start: TL.duration }).start;
    A(box, [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], s.start - .1, .25);
    A(box, [{ opacity: 1 }, { opacity: 0 }], nxt - .15, .15, { fill: 'forwards' });
  });
}

// standard logo end card (markup: #end scene with #endLogo, #endT1..3, #endSrc)
function endCard(id = 'end') {
  const t = scene(id);
  A('#' + id, [{ clipPath: 'circle(0% at 50% 45%)' }, { clipPath: 'circle(150% at 50% 45%)' }], t - .2, .7, { ease: INOUT });
  A('#endLogo', [{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'none' }], t + .3, .7);
  fadeUp('#endT1', t + .6); fadeUp('#endT2', t + .8); popIn('#endT3', t + 1.1);
  $('#endSrc').innerHTML = '<b>Sources:</b> ' + TL.sources.join(' · ');
  fadeUp('#endSrc', t + 1.2);
}

// call last: pause everything and expose the seek API
function finish() {
  const anims = document.getAnimations();
  anims.forEach((a) => a.pause());
  window.seek = (t) => { const ms = t * 1000; anims.forEach((a) => (a.currentTime = ms)); hooks.forEach((h) => h(t)); };
  window.seek(0);
  window.READY = true;
}
