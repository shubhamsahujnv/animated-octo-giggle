// Original cartoon characters for TheGreensolve Diwali pieces.
// Every pose function is a pure function of its inputs (time is passed in), so frames are deterministic.
const SVGNS = 'http://www.w3.org/2000/svg';
const OUT = '#012624';
const CLAY = '#C9693B';

function gEl(parent, html, cls) {
  const g = document.createElementNS(SVGNS, 'g');
  if (cls) g.setAttribute('class', cls);
  g.innerHTML = html;
  parent.appendChild(g);
  return g;
}
const q = (g, sel) => g.querySelector(sel);
const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));

function cartoonDefs(svg) {
  gEl(svg, `<defs>
    <radialGradient id="gFlame" cx="0.5" cy="0.8" r="0.65">
      <stop offset="0" stop-color="#FFFBEA"/><stop offset="0.35" stop-color="#FFE07A"/>
      <stop offset="0.75" stop-color="#FFA537"/><stop offset="1" stop-color="#FF7A1F"/></radialGradient>
    <radialGradient id="gGlow">
      <stop offset="0" stop-color="#FFD678" stop-opacity="0.65"/><stop offset="0.3" stop-color="#E2FF4D" stop-opacity="0.28"/>
      <stop offset="0.6" stop-color="#E2FF4D" stop-opacity="0.07"/><stop offset="1" stop-color="#E2FF4D" stop-opacity="0"/></radialGradient>
    <linearGradient id="gClay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DB7D4C"/><stop offset="1" stop-color="#A24A23"/></linearGradient>
    <linearGradient id="gPot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D9774A"/><stop offset="1" stop-color="#9E4522"/></linearGradient>
    <radialGradient id="gOcean" cx="0.38" cy="0.32" r="0.8"><stop offset="0" stop-color="#5BC2B2"/><stop offset="1" stop-color="#1E7469"/></radialGradient>
    <clipPath id="earthClip"><circle r="146"/></clipPath>
  </defs>`);
}

// blink: short closes every ~3s, offset by seed
function blinkAt(t, seed) {
  const p = ((t + seed * 1.37) % 3.1 + 3.1) % 3.1;
  return p < 0.16 ? Math.sin(Math.PI * p / 0.16) : 0;
}

function faceMarkup(eyeY, eyeDX, mouthY, cheekDX, scale = 1) {
  const e = (x) => `<g class="eye" data-x="${x}" data-y="${eyeY}">
      <ellipse cx="${x}" cy="${eyeY}" rx="${12 * scale}" ry="${16 * scale}" fill="${OUT}"/>
      <circle cx="${x + 4 * scale}" cy="${eyeY - 6 * scale}" r="${4.5 * scale}" fill="#fff"/></g>`;
  return `${e(-eyeDX)}${e(eyeDX)}
    <ellipse cx="${-cheekDX}" cy="${mouthY - 6}" rx="${15 * scale}" ry="${8 * scale}" fill="#FF8C7A" opacity="0.75"/>
    <ellipse cx="${cheekDX}" cy="${mouthY - 6}" rx="${15 * scale}" ry="${8 * scale}" fill="#FF8C7A" opacity="0.75"/>
    <path class="mouth" data-y="${mouthY}" data-w="${20 * scale}" fill="#5A1E12" stroke="${OUT}" stroke-width="${5 * scale}" stroke-linecap="round" stroke-linejoin="round"/>`;
}
function setFace(g, blink, smile) {
  g.querySelectorAll('.eye').forEach(e => {
    const x = +e.dataset.x, y = +e.dataset.y;
    e.setAttribute('transform', `translate(${x} ${y}) scale(1 ${Math.max(0.08, 1 - blink)}) translate(${-x} ${-y})`);
  });
  const m = q(g, '.mouth'), y = +m.dataset.y, w = +m.dataset.w;
  // smile in [-1, 1]; > 0.4 becomes an open happy mouth
  const c = y + 26 * smile;
  if (smile > 0.4) m.setAttribute('d', `M${-w} ${y} Q 0 ${c + 6} ${w} ${y} Z`), m.setAttribute('fill-opacity', 1);
  else m.setAttribute('d', `M${-w} ${y} Q 0 ${c} ${w} ${y}`), m.setAttribute('fill-opacity', 0);
}

const FLAME = `<path d="M0 -100 C 8 -76, 26 -50, 22 -28 C 19 -8, 10 0, 0 0 C -10 0, -19 -8, -22 -28 C -26 -50, -8 -76, 0 -100 Z" fill="url(#gFlame)"/>
  <path d="M0 -50 C 5 -38, 10 -26, 8 -16 C 6 -6, -6 -6, -8 -16 C -10 -26, -5 -38, 0 -50 Z" fill="#FFFDF3" opacity="0.9"/>`;
function flameTransform(t, seed, lit) {
  const k = cl(lit) < 1 ? (1 - Math.pow(1 - cl(lit), 3)) * (1 + 0.25 * Math.sin(Math.PI * cl(lit))) : 1;
  const f = 1 + 0.08 * Math.sin(t * 13.1 + seed) + 0.04 * Math.sin(t * 23.7 + seed * 2.3);
  const sx = 1 - 0.06 * Math.sin(t * 17.3 + seed * 1.7);
  const r = 4 * Math.sin(t * 7.9 + seed) + 2 * Math.sin(t * 19.1 + seed);
  return `rotate(${r * k}) scale(${sx * k} ${f * k})`;
}

// ---------------- Diya buddy ----------------
function DiyaBuddy(parent) {
  const arm = (side) => `<g class="arm${side}">
      <path d="M${side === 'L' ? -96 : 96} -58 Q ${side === 'L' ? -140 : 140} -60 ${side === 'L' ? -150 : 150} -96" stroke="${OUT}" stroke-width="22" stroke-linecap="round" fill="none"/>
      <path d="M${side === 'L' ? -96 : 96} -58 Q ${side === 'L' ? -140 : 140} -60 ${side === 'L' ? -150 : 150} -96" stroke="${CLAY}" stroke-width="11" stroke-linecap="round" fill="none"/></g>`;
  const g = gEl(parent, `
    <g class="glow"><circle cx="0" cy="-170" r="230" fill="url(#gGlow)"/></g>
    <g class="bod">
      <ellipse cx="-38" cy="2" rx="24" ry="11" fill="#8E3D1C" stroke="${OUT}" stroke-width="6"/>
      <ellipse cx="38" cy="2" rx="24" ry="11" fill="#8E3D1C" stroke="${OUT}" stroke-width="6"/>
      ${arm('L')}${arm('R')}
      <path d="M-122 -100 C -116 -24, -58 -2, 0 -2 C 58 -2, 116 -24, 122 -100 Z" fill="url(#gClay)" stroke="${OUT}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M-96 -22 C -40 -6, 40 -6, 96 -22" stroke="#FFE8C9" stroke-width="4" fill="none" stroke-dasharray="1 13" stroke-linecap="round" opacity="0.85"/>
      <ellipse cx="0" cy="-100" rx="124" ry="24" fill="#B8592E" stroke="${OUT}" stroke-width="7"/>
      <ellipse cx="0" cy="-101" rx="100" ry="13" fill="#4A2412"/>
      <rect x="-5" y="-122" width="10" height="22" rx="5" fill="#3a2a20"/>
      <g class="face">${faceMarkup(-58, 40, -34, 70)}</g>
      <g class="flamePos" transform="translate(0 -116)"><g class="flame">${FLAME}</g></g>
    </g>`, 'diyaBuddy');
  return { g, glow: q(g, '.glow'), bod: q(g, '.bod'), face: q(g, '.face'), flame: q(g, '.flame'), armL: q(g, '.armL'), armR: q(g, '.armR') };
}
function poseDiya(h, o) {
  const { x, y, s = 1, t = 0, seed = 0, lit = 1, blink = 0, smile = 0.8, squash = 1, waveL = 0, waveR = 0, opacity = 1, rot = 0 } = o;
  h.g.setAttribute('transform', `translate(${x} ${y}) rotate(${rot}) scale(${s})`);
  h.g.setAttribute('opacity', opacity);
  h.bod.setAttribute('transform', `scale(${2 - squash} ${squash})`);
  h.flame.setAttribute('transform', flameTransform(t, seed, lit));
  h.flame.setAttribute('opacity', cl(lit * 4));
  h.glow.setAttribute('opacity', cl(lit * 1.4) * (0.85 + 0.15 * Math.sin(t * 11.3 + seed)));
  h.armL.setAttribute('transform', `rotate(${waveL} -96 -58)`);
  h.armR.setAttribute('transform', `rotate(${-waveR} 96 -58)`);
  setFace(h.face, blink, smile);
}

// ---------------- Earth buddy ----------------
function EarthBuddy(parent) {
  const lands = `
    <path d="M-150 -60 C -110 -110, -50 -96, -40 -60 C -30 -26, -80 -10, -70 30 C -62 64, -110 80, -150 60 Z"/>
    <path d="M10 -150 C 60 -140, 110 -110, 96 -70 C 86 -40, 40 -50, 30 -20 C 22 6, -10 -10, -6 -50 C -2 -90, -30 -120, 10 -150 Z"/>
    <path d="M40 40 C 90 20, 150 40, 150 80 C 150 120, 100 150, 60 130 C 30 114, 0 70, 40 40 Z"/>
    <path d="M-60 110 C -30 96, -4 110, -10 136 C -16 160, -60 160, -70 140 C -76 126, -72 116, -60 110 Z"/>`;
  const armL = `<g class="armL"><path d="M-128 40 Q -190 50 -205 -10" stroke="${OUT}" stroke-width="24" stroke-linecap="round" fill="none"/>
      <path d="M-128 40 Q -190 50 -205 -10" stroke="#2E8F82" stroke-width="12" stroke-linecap="round" fill="none"/>
      <circle cx="-205" cy="-14" r="17" fill="#2E8F82" stroke="${OUT}" stroke-width="6"/></g>`;
  const armR = `<g class="armR"><path d="M128 40 Q 190 60 210 20" stroke="${OUT}" stroke-width="24" stroke-linecap="round" fill="none"/>
      <path d="M128 40 Q 190 60 210 20" stroke="#2E8F82" stroke-width="12" stroke-linecap="round" fill="none"/>
      <g class="mini" transform="translate(212 6) scale(0.32)">
        <circle cx="0" cy="-160" r="200" fill="url(#gGlow)" class="miniGlow"/>
        <path d="M-122 -100 C -116 -24, -58 -2, 0 -2 C 58 -2, 116 -24, 122 -100 Z" fill="url(#gClay)" stroke="${OUT}" stroke-width="12"/>
        <ellipse cx="0" cy="-100" rx="124" ry="24" fill="#B8592E" stroke="${OUT}" stroke-width="12"/>
        <g transform="translate(0 -112)"><g class="miniFlame">${FLAME}</g></g></g>
      <circle cx="210" cy="22" r="17" fill="#2E8F82" stroke="${OUT}" stroke-width="6"/></g>`;
  const g = gEl(parent, `
    <g class="glow"><circle r="300" fill="url(#gGlow)"/></g>
    <g class="bod">
      ${armL}${armR}
      <circle r="150" fill="url(#gOcean)"/>
      <g clip-path="url(#earthClip)"><g class="lands" fill="#C6EC45">${lands}</g></g>
      <circle r="150" fill="none" stroke="${OUT}" stroke-width="8"/>
      <path d="M-104 -70 A 120 120 0 0 1 -40 -122" stroke="#fff" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.45"/>
      <g class="face">${faceMarkup(-6, 48, 44, 84, 1.25)}</g>
    </g>`, 'earthBuddy');
  return { g, glow: q(g, '.glow'), bod: q(g, '.bod'), face: q(g, '.face'), lands: q(g, '.lands'), armL: q(g, '.armL'), armR: q(g, '.armR'),
           mini: q(g, '.miniFlame'), miniGlow: q(g, '.miniGlow'), miniG: q(g, '.mini') };
}
function poseEarth(h, o) {
  const { x, y, s = 1, t = 0, blink = 0, smile = 0.8, squash = 1, waveL = 0, waveR = 0, opacity = 1, glow = 0, miniLit = 1, rot = 0 } = o;
  h.g.setAttribute('transform', `translate(${x} ${y}) rotate(${rot}) scale(${s})`);
  h.g.setAttribute('opacity', opacity);
  h.bod.setAttribute('transform', `translate(0 150) scale(${2 - squash} ${squash}) translate(0 -150)`);
  h.lands.setAttribute('transform', `translate(${Math.sin(t * 0.6) * 10} 0)`);
  h.armL.setAttribute('transform', `rotate(${waveL} -128 40)`);
  h.armR.setAttribute('transform', `rotate(${-waveR} 128 40)`);
  h.miniG.setAttribute('transform', `translate(212 6) rotate(${waveR}) scale(0.32)`);
  h.mini.setAttribute('transform', flameTransform(t, 4.2, miniLit));
  h.miniGlow.setAttribute('opacity', cl(miniLit));
  h.glow.setAttribute('opacity', glow);
  setFace(h.face, blink, smile);
}

// ---------------- Sapling buddy ----------------
function SaplingBuddy(parent) {
  const petals = (n, rx, ry, d, fill) => Array.from({ length: n }, (_, i) =>
    `<ellipse cx="0" cy="${-d}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${OUT}" stroke-width="4" transform="rotate(${i * 360 / n})"/>`).join('');
  const g = gEl(parent, `
    <g class="bod">
      <path class="stem" d="M0 -150 C 14 -200, -14 -250, 0 -310" stroke="${OUT}" stroke-width="18" stroke-linecap="round" fill="none" pathLength="1"/>
      <path class="stem2" d="M0 -150 C 14 -200, -14 -250, 0 -310" stroke="#3E8A5C" stroke-width="9" stroke-linecap="round" fill="none" pathLength="1"/>
      <g transform="translate(2 -215)"><g class="leafL">
        <path d="M0 0 C -30 -46, -100 -50, -134 -14 C -96 22, -36 26, 0 0 Z" fill="#C6EC45" stroke="${OUT}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M-6 -4 C -46 -14, -84 -18, -116 -14" stroke="${OUT}" stroke-width="4" fill="none" stroke-linecap="round"/></g></g>
      <g transform="translate(-2 -262)"><g class="leafR">
        <path d="M0 0 C 30 -46, 100 -50, 134 -14 C 96 22, 36 26, 0 0 Z" fill="#9DD43F" stroke="${OUT}" stroke-width="6" stroke-linejoin="round"/>
        <path d="M6 -4 C 46 -14, 84 -18, 116 -14" stroke="${OUT}" stroke-width="4" fill="none" stroke-linecap="round"/></g></g>
      <g transform="translate(0 -318)"><g class="flower">
        ${petals(12, 18, 34, 34, '#FF8A2A')}${petals(10, 14, 24, 20, '#FFB43C')}
        <circle r="18" fill="#D9601A" stroke="${OUT}" stroke-width="4"/></g></g>
      <path d="M-96 -146 L 96 -146 L 74 0 L -74 0 Z" fill="url(#gPot)" stroke="${OUT}" stroke-width="7" stroke-linejoin="round"/>
      <rect x="-112" y="-172" width="224" height="38" rx="12" fill="#B8592E" stroke="${OUT}" stroke-width="7"/>
      <g class="face">${faceMarkup(-92, 36, -56, 62)}</g>
    </g>`, 'saplingBuddy');
  return { g, bod: q(g, '.bod'), face: q(g, '.face'), stem: q(g, '.stem'), stem2: q(g, '.stem2'), leafL: q(g, '.leafL'), leafR: q(g, '.leafR'), flower: q(g, '.flower') };
}
function poseSapling(h, o) {
  const { x, y, s = 1, t = 0, blink = 0, smile = 0.8, squash = 1, grow = 1, leaf = 1, bloom = 1, opacity = 1, rot = 0 } = o;
  h.g.setAttribute('transform', `translate(${x} ${y}) rotate(${rot}) scale(${s})`);
  h.g.setAttribute('opacity', opacity);
  h.bod.setAttribute('transform', `scale(${2 - squash} ${squash})`);
  [h.stem, h.stem2].forEach(p => { p.style.strokeDasharray = '1 1'; p.style.strokeDashoffset = 1 - grow; });
  const sway = Math.sin(t * 2.4) * 6;
  h.leafL.setAttribute('transform', `rotate(${sway}) scale(${leaf})`);
  h.leafR.setAttribute('transform', `rotate(${-sway}) scale(${Math.max(0, leaf * 1.15 - 0.15)})`);
  h.flower.setAttribute('transform', `rotate(${t * 20}) scale(${bloom})`);
  setFace(h.face, blink, smile);
}

// ---------------- Extras ----------------
function SmogCloud(parent, w) {
  const r = w / 4;
  return gEl(parent, `<g class="cloud">
    <ellipse cx="0" cy="${r * 0.4}" rx="${w * 0.62}" ry="${r * 0.9}" fill="#5F6E6B"/>
    <circle cx="${-w * 0.32}" cy="0" r="${r}" fill="#7E8F8C"/><circle cx="${w * 0.02}" cy="${-r * 0.55}" r="${r * 1.3}" fill="#8C9C99"/>
    <circle cx="${w * 0.36}" cy="${r * 0.05}" r="${r * 0.95}" fill="#7E8F8C"/>
    <ellipse cx="0" cy="${r * 0.45}" rx="${w * 0.6}" ry="${r * 0.65}" fill="#7E8F8C"/>
    <circle cx="${w * 0.08}" cy="${-r * 0.9}" r="${r * 0.35}" fill="#A9B6B3"/></g>`);
}
const SPARK = 'M0 -30 Q 4 -4 30 0 Q 4 4 0 30 Q -4 4 -30 0 Q -4 -4 0 -30 Z';
function Sparkle(parent, color) { return gEl(parent, `<path d="${SPARK}" fill="${color}"/>`); }

// Marigold toran (garland) across the top, swinging
function Toran(parent, n = 19) {
  const g = gEl(parent, `<path class="str" stroke="#6B3A1A" stroke-width="5" fill="none"/>`, 'toran');
  const beads = [];
  for (let i = 0; i < n; i++) {
    const leaf = i % 3 === 1;
    beads.push(gEl(g, leaf
      ? `<path d="M0 0 C 16 18, 14 52, 0 70 C -14 52, -16 18, 0 0 Z" fill="#3E8A5C" stroke="${OUT}" stroke-width="4"/><path d="M0 6 L0 62" stroke="${OUT}" stroke-width="3"/>`
      : `<circle r="30" fill="${i % 2 ? '#FFA537' : '#FFC23C'}" stroke="#B4551A" stroke-width="4"/><circle r="15" fill="${i % 2 ? '#FF8A2A' : '#FFA537'}"/><circle r="4" fill="#B4551A"/>`));
  }
  return { g, str: q(g, '.str'), beads, n };
}
function poseToran(h, t, drop, W = 1080, y0 = 70, sag = 70) {
  const pts = [];
  for (let i = 0; i < h.n; i++) {
    const u = i / (h.n - 1);
    const x = -20 + u * (W + 40);
    const sw = Math.sin(t * 2.2 + u * 3) * 6 * Math.sin(Math.PI * u);
    const y = y0 + sag * Math.sin(Math.PI * u) - (1 - drop) * 300 + sw;
    pts.push([x, y]);
    h.beads[i].setAttribute('transform', `translate(${x} ${y}) rotate(${Math.sin(t * 2.6 + i) * 8})`);
  }
  h.str.setAttribute('d', 'M' + pts.map(p => p.join(' ')).join(' L '));
}
