// Editorial illustration kit for TheGreensolve Diwali pieces: refined, faceless, line-led.
// Every pose function is a pure function of its inputs, so frames are deterministic.
const SVGNS = 'http://www.w3.org/2000/svg';
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
function gEl(parent, html, cls) {
  const g = document.createElementNS(SVGNS, 'g');
  if (cls) g.setAttribute('class', cls);
  g.innerHTML = html;
  parent.appendChild(g);
  return g;
}
const q = (g, s) => g.querySelector(s);
const qa = (g, s) => [...g.querySelectorAll(s)];
function hexLerp(a, b, p) {
  const A = [1, 3, 5].map(i => parseInt(a.substr(i, 2), 16)), B = [1, 3, 5].map(i => parseInt(b.substr(i, 2), 16));
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * p)).join(',')})`;
}

function artDefs(svg) {
  gEl(svg, `<defs>
    <radialGradient id="gFlame" cx="0.5" cy="0.8" r="0.65">
      <stop offset="0" stop-color="#FFFBEA"/><stop offset="0.35" stop-color="#FFE07A"/>
      <stop offset="0.75" stop-color="#FFA537"/><stop offset="1" stop-color="#FF7A1F"/></radialGradient>
    <radialGradient id="gGlow">
      <stop offset="0" stop-color="#FFD678" stop-opacity="0.6"/><stop offset="0.3" stop-color="#E2FF4D" stop-opacity="0.24"/>
      <stop offset="0.6" stop-color="#E2FF4D" stop-opacity="0.06"/><stop offset="1" stop-color="#E2FF4D" stop-opacity="0"/></radialGradient>
    <radialGradient id="gLimeGlow">
      <stop offset="0" stop-color="#E2FF4D" stop-opacity="0.28"/><stop offset="0.5" stop-color="#E2FF4D" stop-opacity="0.07"/><stop offset="1" stop-color="#E2FF4D" stop-opacity="0"/></radialGradient>
    <linearGradient id="gClay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D2774A"/><stop offset="1" stop-color="#8A3B1E"/></linearGradient>
    <radialGradient id="gDisc" cx="0.4" cy="0.35" r="0.75"><stop offset="0" stop-color="#0E5A55"/><stop offset="1" stop-color="#01302E"/></radialGradient>
    <radialGradient id="gSmog"><stop offset="0" stop-color="#9AA6A3" stop-opacity="0.75"/><stop offset="0.6" stop-color="#7A8885" stop-opacity="0.32"/><stop offset="1" stop-color="#6E7C79" stop-opacity="0"/></radialGradient>
    <linearGradient id="gLeaf" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9DD43F"/><stop offset="1" stop-color="#E2FF4D"/></linearGradient>
  </defs>`);
}

const FLAME = `<path d="M0 -100 C 8 -76, 26 -50, 22 -28 C 19 -8, 10 0, 0 0 C -10 0, -19 -8, -22 -28 C -26 -50, -8 -76, 0 -100 Z" fill="url(#gFlame)"/>
  <path d="M0 -50 C 5 -38, 10 -26, 8 -16 C 6 -6, -6 -6, -8 -16 C -10 -26, -5 -38, 0 -50 Z" fill="#FFFDF3" opacity="0.9"/>`;
function flameTransform(t, seed, lit) {
  const k = cl(lit) < 1 ? (1 - Math.pow(1 - cl(lit), 3)) * (1 + 0.2 * Math.sin(Math.PI * cl(lit))) : 1;
  const f = 1 + 0.07 * Math.sin(t * 13.1 + seed) + 0.04 * Math.sin(t * 23.7 + seed * 2.3);
  const sx = 1 - 0.05 * Math.sin(t * 17.3 + seed * 1.7);
  const r = 3 * Math.sin(t * 7.9 + seed) + 1.5 * Math.sin(t * 19.1 + seed);
  return `rotate(${r * k}) scale(${sx * k} ${f * k})`;
}

// ---------------- Diya (no face) ----------------
// origin: bottom centre of the bowl
function Diya(parent) {
  const g = gEl(parent, `
    <circle class="glow" cx="0" cy="-150" r="240" fill="url(#gGlow)"/>
    <path d="M-122 -100 C -116 -24, -58 -2, 0 -2 C 58 -2, 116 -24, 122 -100 Z" fill="url(#gClay)"/>
    <path d="M-100 -58 C -50 -40, 50 -40, 100 -58" stroke="#E2FF4D" stroke-width="2.5" fill="none" opacity="0.55"/>
    <path d="M-90 -30 C -40 -16, 40 -16, 90 -30" stroke="#FFE8C9" stroke-width="4" fill="none" stroke-dasharray="1 14" stroke-linecap="round" opacity="0.8"/>
    <ellipse cx="0" cy="-100" rx="124" ry="22" fill="#B4592F"/>
    <ellipse cx="0" cy="-101" rx="102" ry="12" fill="#4A2412"/>
    <rect x="-4" y="-118" width="8" height="18" rx="4" fill="#3a2a20"/>
    <g transform="translate(0 -114)"><g class="flame">${FLAME}</g></g>`, 'diya');
  return { g, glow: q(g, '.glow'), flame: q(g, '.flame') };
}
function poseDiya(h, { x, y, s = 1, t = 0, seed = 0, lit = 1, opacity = 1, glow = 1 }) {
  h.g.setAttribute('transform', `translate(${x} ${y}) scale(${s})`);
  h.g.setAttribute('opacity', opacity);
  h.flame.setAttribute('transform', flameTransform(t, seed, lit));
  h.flame.setAttribute('opacity', cl(lit * 4));
  h.glow.setAttribute('opacity', glow * cl(lit * 1.4) * (0.85 + 0.15 * Math.sin(t * 11.3 + seed)));
}

// ---------------- Wireframe globe ----------------
function Globe(parent, R = 260) {
  const lats = [-60, -30, 0, 30, 60];
  let h = `<circle class="halo" r="${R * 1.7}" fill="url(#gLimeGlow)"/>
    <circle r="${R}" fill="url(#gDisc)"/>`;
  lats.forEach(p => {
    const rad = p * Math.PI / 180;
    h += `<ellipse class="gl ${p === 0 ? 'hi' : ''}" cx="0" cy="${-R * Math.sin(rad)}" rx="${R * Math.cos(rad)}" ry="${R * Math.cos(rad) * 0.16}" fill="none" stroke-width="${p === 0 ? 3 : 2}" pathLength="1"/>`;
  });
  for (let k = 0; k < 8; k++) h += `<ellipse class="gl mer ${k === 2 ? 'hi' : ''}" cx="0" cy="0" rx="10" ry="${R}" fill="none" stroke-width="${k === 2 ? 3 : 2}" pathLength="1"/>`;
  h += `<circle class="gl rim hi" r="${R}" fill="none" stroke-width="3.5" pathLength="1"/>
    <g transform="rotate(-16)"><ellipse class="orbit" rx="${R * 1.38}" ry="${R * 0.3}" fill="none" stroke="#E2FF4D" stroke-width="2" stroke-dasharray="2 10" stroke-linecap="round"/>
      <g class="sat"><circle r="22" fill="url(#gGlow)"/><circle r="6" fill="#FFE7A0"/></g></g>`;
  const g = gEl(parent, h, 'globe');
  return { g, R, halo: q(g, '.halo'), lines: qa(g, '.gl'), mers: qa(g, '.mer'), orbit: q(g, '.orbit'), sat: q(g, '.sat') };
}
// draw: 0..1 line draw-on, clear: 0 smoggy grey -> 1 lit lime/teal
function poseGlobe(h, { x, y, s = 1, t = 0, draw = 1, clear = 1, opacity = 1, orbit = 1 }) {
  h.g.setAttribute('transform', `translate(${x} ${y}) scale(${s})`);
  h.g.setAttribute('opacity', opacity);
  h.mers.forEach((m, k) => {
    const th = (k * 22.5 + t * 14) * Math.PI / 180;
    m.setAttribute('rx', Math.max(0.5, h.R * Math.abs(Math.cos(th))));
  });
  h.lines.forEach((l, i) => {
    const hi = l.classList.contains('hi');
    l.setAttribute('stroke', hi ? hexLerp('#6E7C79', '#E2FF4D', clear) : hexLerp('#4E5E5B', '#2E9A8C', clear));
    l.style.strokeDasharray = '1 1';
    l.style.strokeDashoffset = 1 - cl(draw * 1.3 - i * 0.02);
  });
  h.halo.setAttribute('opacity', clear);
  h.orbit.setAttribute('opacity', orbit * 0.8);
  const a = t * 1.1;
  h.sat.setAttribute('transform', `translate(${h.R * 1.38 * Math.cos(a)} ${h.R * 0.3 * Math.sin(a)})`);
  h.sat.setAttribute('opacity', orbit);
}

// soft smoke blobs
function Smog(parent, n, rnd) {
  const items = [];
  for (let i = 0; i < n; i++) {
    const c = gEl(parent, `<circle r="1" fill="url(#gSmog)"/>`);
    items.push({ c, a: rnd() * Math.PI * 2, d: 20 + rnd() * 240, r: 170 + rnd() * 170, f: 0.3 + rnd() * 0.6, ph: rnd() * 6 });
  }
  return items;
}
function poseSmog(items, { cx, cy, t, inn, clear }) {
  items.forEach(o => {
    const d = o.d + clear * 520 + Math.sin(t * o.f + o.ph) * 20;
    const x = cx + Math.cos(o.a + t * 0.08) * d, y = cy + Math.sin(o.a + t * 0.08) * d * 0.8;
    o.c.setAttribute('transform', `translate(${x} ${y}) scale(${o.r * (1 + clear * 0.8)})`);
    o.c.setAttribute('opacity', inn * (1 - clear));
  });
}

// ---------------- Botanical sprig ----------------
function Plant(parent) {
  const leaves = [[2, -95, -150, 1], [-6, -165, -28, 0.95], [-12, -230, -158, 1.05], [-2, -305, -24, 0.9], [8, -400, -150, 0.85], [3, -470, -30, 0.75]];
  const blossoms = [[-128, -388, 1], [118, -458, 0.9], [0, -566, 1.15]];
  const petals = (n, r, d, c) => Array.from({ length: n }, (_, i) => {
    const a = i * 2 * Math.PI / n; return `<circle cx="${Math.cos(a) * d}" cy="${Math.sin(a) * d}" r="${r}" fill="${c}"/>`; }).join('');
  let h = `<line x1="-200" y1="0" x2="200" y2="0" stroke="#2A6F69" stroke-width="2" class="ground"/>
    <path class="st" d="M0 0 C 10 -120, -20 -260, 0 -380 C 14 -460, 4 -520, 0 -566" stroke="#9DD43F" stroke-width="6" fill="none" stroke-linecap="round" pathLength="1"/>
    <path class="st" d="M-8 -250 C -40 -300, -90 -330, -128 -388" stroke="#9DD43F" stroke-width="4" fill="none" stroke-linecap="round" pathLength="1"/>
    <path class="st" d="M4 -340 C 40 -380, 80 -400, 118 -458" stroke="#9DD43F" stroke-width="4" fill="none" stroke-linecap="round" pathLength="1"/>`;
  leaves.forEach(([x, y, a, k]) => {
    h += `<g transform="translate(${x} ${y}) rotate(${a})"><g class="leaf" data-k="${k}">
      <path d="M0 0 C 24 -22, 82 -26, 118 0 C 82 26, 24 22, 0 0 Z" fill="url(#gLeaf)"/>
      <path d="M6 0 C 40 -2, 80 -2, 108 0" stroke="#02403D" stroke-width="2" fill="none" opacity="0.55"/></g></g>`;
  });
  blossoms.forEach(([x, y, k]) => {
    h += `<g transform="translate(${x} ${y})"><g class="bl" data-k="${k}"><circle r="56" fill="url(#gGlow)" opacity="0.6"/>
      ${petals(14, 12, 28, '#FF8A2A')}${petals(10, 10, 16, '#FFB43C')}<circle r="9" fill="#D9601A"/></g></g>`;
  });
  const g = gEl(parent, h, 'plant');
  return { g, stems: qa(g, '.st'), leaves: qa(g, '.leaf'), blooms: qa(g, '.bl'), ground: q(g, '.ground') };
}
function posePlant(h, { x, y, s = 1, t = 0, grow = 1, leaf = 1, bloom = 1, opacity = 1 }) {
  h.g.setAttribute('transform', `translate(${x} ${y}) scale(${s})`);
  h.g.setAttribute('opacity', opacity);
  h.stems.forEach((p, i) => { p.style.strokeDasharray = '1 1'; p.style.strokeDashoffset = 1 - cl(grow * 1.4 - (i ? 0.35 : 0)); });
  h.leaves.forEach((l, i) => {
    const p = cl(leaf * 1.6 - i * 0.12);
    const sway = Math.sin(t * 1.8 + i) * 4;
    l.setAttribute('transform', `rotate(${sway}) scale(${(p <= 0 ? 0 : 1 - Math.pow(1 - p, 3)) * +l.dataset.k})`);
  });
  h.blooms.forEach((b, i) => {
    const p = cl(bloom * 1.5 - i * 0.2);
    const e = p <= 0 ? 0 : 1 + 2.4 * Math.pow(p - 1, 3) + 1.4 * Math.pow(p - 1, 2);
    b.setAttribute('transform', `rotate(${t * 12 + i * 40}) scale(${e * +b.dataset.k})`);
  });
}

// ---------------- Hanging lights ----------------
function HangingLights(parent, xs, lens) {
  const items = xs.map((x, i) => {
    const g = gEl(parent, `<line x1="0" y1="0" x2="0" y2="${lens[i]}" stroke="#C9B48A" stroke-width="1.5" opacity="0.55"/>
      <g transform="translate(0 ${lens[i]})"><circle r="46" fill="url(#gGlow)"/>
      <path d="M0 -14 C 9 -6, 10 6, 0 16 C -10 6, -9 -6, 0 -14 Z" fill="#FFD66B"/><circle cy="-16" r="3" fill="#C9B48A"/></g>`);
    return { g, x, len: lens[i] };
  });
  return items;
}
function poseLights(items, t, drop) {
  items.forEach((o, i) => {
    o.g.setAttribute('transform', `translate(${o.x} ${-(1 - drop) * (o.len + 80)}) rotate(${2.5 * Math.sin(t * 1.4 + i * 1.3)})`);
  });
}

// expanding light ring
function Rings(parent, n) {
  return Array.from({ length: n }, () => gEl(parent, `<circle r="1" fill="none" stroke="#E2FF4D" stroke-width="2"/>`));
}
function poseRing(r, { x, y, p, maxR = 700 }) {
  const c = r.firstChild;
  c.setAttribute('cx', x); c.setAttribute('cy', y);
  c.setAttribute('r', 20 + maxR * (1 - Math.pow(1 - p, 2)));
  r.setAttribute('opacity', p > 0 && p < 1 ? 0.55 * (1 - p) : 0);
}
