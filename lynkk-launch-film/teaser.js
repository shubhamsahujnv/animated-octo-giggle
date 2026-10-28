// Teaser mode (?edl=teaser): replays the film from teaser_edl.json at 128 BPM.
// Hook and reveal play full frame. Each feature plays in a tilted window on the
// right while the left column explains it: act label, headline, one plain line,
// and a progress bar for the act. Act cards, highlight rings, punch-ins and drop
// flashes on top. Everything is a pure function of teaser time T.
(function () {
  if (new URLSearchParams(location.search).get("edl") !== "teaser") return;

  let EDL = null;
  const RINGS = [];
  const W = 1920, H = 1080;
  const FULL = { x: 0, y: 0, w: 1920, h: 1080, r: 0 };
  const SPLIT = { x: 760, y: 100, w: 1060, h: 880, r: 28 };

  const DOTS = `<svg class="dots" width="1920" height="1080"><rect width="1920" height="1080" fill="url(#dots)"/></svg>`;
  const words = (line) => line.split(" ").map((w) => `<span class="w"><span>${w}</span></span>`).join(" ");
  const vis = (T, a, b, fi = 0.18, fo = 0.15) => E.out(seg(T, a, a + fi)) * (1 - E.in(seg(T, b - fo, b)));
  const segIndex = (T) => { const s = EDL.segments; for (let i = 0; i < s.length; i++) if (T < s[i][1]) return i; return s.length - 1; };
  const at = (src) => { for (const s of EDL.segments) if (s[3] && src >= s[2] && src <= s[2] + (s[1] - s[0]) * s[3] + 1e-9) return s[0] + (src - s[2]) / s[3]; return null; };
  function wordsIn(root, T, start, end, stagger = 0.05, dur = 0.28) {
    root.querySelectorAll(".w > span").forEach((w, i) => {
      const p = E.out(seg(T, start + i * stagger, start + i * stagger + dur));
      const q = E.in(seg(T, end - 0.16, end));
      w.style.transform = `translateY(${(1 - p) * 105 - q * 105}%) rotate(${(1 - p) * 4}deg)`;
    });
  }

  // ------------------------------------------------------------------ DOM
  function measureRings(base) {
    for (const [src, sel, pad] of EDL.rings) {
      base(src);
      const els = $$(sel);
      const a = els[0].getBoundingClientRect(), z = els[els.length - 1].getBoundingClientRect();
      const t0 = at(src);
      const s = EDL.segments[segIndex(t0)];
      RINGS.push({ t0, t1: Math.min(t0 + 0.75, s[1]), rect: [a.left - pad, a.top - pad, z.right - a.left + 2 * pad, z.bottom - a.top + 2 * pad] });
    }
  }

  function build() {
    const stage = $("#stage");
    const win = Object.assign(document.createElement("div"), { id: "win" });
    const cam = Object.assign(document.createElement("div"), { id: "cam" });
    for (const el of [...stage.children]) if (el.id !== "grain") cam.appendChild(el);
    cam.insertAdjacentHTML("beforeend", `<svg id="tz-rings" viewBox="0 0 1920 1080">${RINGS.map(() => '<rect rx="18" ry="18"/>').join("")}</svg>`);
    win.appendChild(cam);
    const bg = Object.assign(document.createElement("div"), { id: "tz-bg", innerHTML: DOTS });
    stage.insertBefore(bg, $("#grain"));
    stage.insertBefore(win, $("#grain"));

    const cards = EDL.cards.map((c, i) => `<div class="tz-card" id="tzc${i}">${DOTS}<svg class="tz-rings" width="1920" height="1080">${"<circle/>".repeat(4)}</svg>
        <div class="tz-num">${c.num}</div><span class="eb tz-pill">${c.num}</span>
        <div class="tz-label">${words(c.text)}</div><div class="tz-rule"></div></div>`).join("");
    const feats = EDL.features.map((f, i) => `<div class="tz-feat" id="tzf${i}">
        <div class="tz-h">${words(f.h).replace("#", `<b class="num" id="tzn${i}">${f.count || ""}</b>`)}</div>
        <div class="tz-d"><span class="tz-dl">${f.d}</span>${f.chip ? ` <span class="chip-v">${f.chip}</span>` : ""}</div></div>`).join("");
    stage.insertBefore(Object.assign(document.createElement("div"), { id: "tz", innerHTML:
      `<div id="tz-title"><div id="tz-logo"><svg class="rings" width="400" height="400" viewBox="-200 -200 400 400"><circle/><circle/><circle/></svg><span class="m">${$("#mark").innerHTML}</span><span class="wm">${words("Lynkk")}</span></div><div class="t1">${words("Lynkk for Mac.")}</div><div class="t2">${words("Records your calls. Types what you say.")}</div></div><div id="tzp"><span class="eb" id="tz-act"></span>${feats}<div id="tz-prog"><i></i><i></i><i></i></div></div>` +
      cards + `<div id="tz-cta"><div class="btn"><i class="ripple"></i><svg class="dl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><g class="arrow"><path d="M12 3v11"/><path d="M7 9.5l5 5 5-5"/></g><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></svg><span>Download for Mac</span></div>
        <div class="url"></div><div class="facts">Free to install · Apple silicon · macOS 14.2 or later</div></div>
      <svg id="tz-cur" viewBox="0 0 24 34"><path d="M2 2 L2 27 L8 21 L12 31 L16 29.5 L12 20 L20 20 Z" fill="#111" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/></svg>` +
      `<div id="tz-flash"></div><div id="tz-black"></div>` }), $("#grain"));

    // The film's own captions and labels give way to the teaser's.
    for (const sel of ["#caps", "#ch-eb", "#h-brand", "#h-mac", "#fnhero .eb", "#fnhero .lines", "#wallsc .eb", "#callout", "#ember .cta", "#ember .fine"]) $(sel).style.display = "none";
    // Spotter is not in the teaser: the cmd-return fragment becomes cmd-K (search).
    $$("#f-cmd .top")[1].textContent = "K";
    // Lift the end screen's logo and headline to make room for the download call to action.
    $("#ember .lock").style.top = "150px";
    $("#ember .hl").style.top = "300px";
    const tile = $$(".tile")[4]; if (tile) { const ks = tile.querySelectorAll(".t-key"); if (ks[1]) ks[1].textContent = "K"; }
  }

  // ------------------------------------------------------------------ per frame
  function geometry(T, i) {
    const s = EDL.segments[i], prev = EDL.segments[i - 1];
    const lay = s[4] === "split" ? SPLIT : FULL;
    if (!prev) return { ...lay };
    // Shrink into the window when an act's first feature starts; grow back out at the end.
    const from = prev[4] === "split" ? SPLIT : FULL;
    if (from === lay || s[4] === "card") return { ...lay };
    const p = E.out(seg(T, s[0], s[0] + 0.42));
    const g = {}; for (const k of ["x", "y", "w", "h", "r"]) g[k] = lerp(from[k], lay[k], p);
    return g;
  }

  function camera(T, i) {
    const s = EDL.segments[i], c = s[5];
    const win = $("#win"), cam = $("#cam");
    if (!c) { win.style.opacity = 0; return; }
    win.style.opacity = 1;
    const g = geometry(T, i);
    const p = E.inOut(seg(T, s[0], s[1]));
    const ry = c.ry ? lerp(c.ry[0], c.ry[1], p) : 0, rx = c.rx ? lerp(c.rx[0], c.rx[1], p) : 0;
    const split = s[4] === "split";
    Object.assign(win.style, { left: `${g.x}px`, top: `${g.y}px`, width: `${g.w}px`, height: `${g.h}px`, borderRadius: `${g.r}px` });
    win.classList.toggle("framed", g.r > 1);
    const sinceCut = T - s[0];
    let punch = 0.07 * Math.exp(-sinceCut / 0.09);
    if (c.beatPunch) punch = Math.max(punch, 0.045 * Math.exp(-(T % EDL.beat) / 0.08));
    const beatTilt = c.beatPunch ? (Math.floor(T / EDL.beat) % 2 ? 1.2 : -1.2) * Math.exp(-(T % EDL.beat) / 0.12) : 0;
    win.style.transform = `perspective(2400px) rotateY(${ry + beatTilt}deg) rotateX(${rx}deg)`;
    const zMin = Math.max(g.w / W, g.h / H);
    const over = split ? 1 : 1 + (Math.abs(ry) + Math.abs(rx)) * 0.006;
    const z = Math.max(lerp(c.z[0], c.z[1], p), zMin) * (1 + punch) * over;
    let fx = lerp(c.f[0][0], c.f[1][0], p), fy = lerp(c.f[0][1], c.f[1][1], p);
    fx = clamp(fx, g.w / 2 / z, W - g.w / 2 / z); fy = clamp(fy, g.h / 2 / z, H - g.h / 2 / z);
    cam.style.transform = `translate(${g.w / 2}px, ${g.h / 2}px) scale(${z}) translate(${-fx}px, ${-fy}px)`;
    const blur = 6 * (1 - E.out(seg(sinceCut, 0, 0.14)));
    cam.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "none";
  }

  function panel(T, i) {
    const s = EDL.segments[i];
    const p = $("#tzp");
    const split = s[4] === "split";
    const prevSplit = i > 0 && EDL.segments[i - 1][4] === "split";
    const enter = split && !prevSplit ? E.out(seg(T, s[0] + 0.05, s[0] + 0.45)) : 1;
    p.style.opacity = split ? enter : 0;
    p.style.transform = `translateX(${(1 - enter) * -60}px)`;
    if (!split) return;
    const f = EDL.features.findIndex((x) => T >= x.t0 && T < x.t1);
    const F = EDL.features[f];
    $("#tz-act").textContent = F.act;
    EDL.features.forEach((x, k) => {
      const el = $(`#tzf${k}`);
      if (k !== f) { el.style.opacity = 0; return; }
      el.style.opacity = 1;
      wordsIn(el.querySelector(".tz-h"), T, x.t0 + 0.04, x.t1, 0.06, 0.3);
      const d = el.querySelector(".tz-d");
      const dp = E.out(seg(T, x.t0 + 0.32, x.t0 + 0.7)) * (1 - E.in(seg(T, x.t1 - 0.16, x.t1)));
      d.style.opacity = dp; d.style.transform = `translateY(${(1 - dp) * 18}px)`;
      if (x.count) $(`#tzn${k}`).textContent = String(clamp(Math.floor((T - x.t0) / (EDL.beat / 4)) + 1, 1, x.count));
    });
    // Progress: one bar per feature in this act, filling as the feature plays.
    const act = EDL.features.filter((x) => x.act === F.act);
    $$("#tz-prog i").forEach((bar, k) => {
      const x = act[k];
      const fill = !x ? 0 : T >= x.t1 ? 1 : T < x.t0 ? 0 : (T - x.t0) / (x.t1 - x.t0);
      bar.style.setProperty("--fill", fill);
      bar.style.opacity = x ? 1 : 0;
    });
  }

  function cards(T) {
    EDL.cards.forEach((c, i) => {
      const el = $(`#tzc${i}`);
      const on = T >= c.t0 && T < c.t1;
      el.style.opacity = on ? 1 : 0;
      if (!on) return;
      el.style.clipPath = `inset(0 ${(1 - E.out(seg(T, c.t0, c.t0 + 0.14))) * 100}% 0 0)`;
      el.querySelectorAll(".tz-rings circle").forEach((r, k) => {
        const age = T - c.t0 - k * EDL.beat * 0.5;
        const a = age >= 0 ? (age % (EDL.beat * 2)) / (EDL.beat * 2) : -1;
        r.setAttribute("cx", 1500); r.setAttribute("cy", 560);
        r.setAttribute("r", a < 0 ? 0 : 60 + a * 900); r.style.opacity = a < 0 ? 0 : 0.22 * (1 - a); r.style.strokeWidth = 2;
      });
      wordsIn(el.querySelector(".tz-label"), T, c.t0 + 0.04, c.t1 + 1, 0.07, 0.3);
      const np = E.out(seg(T, c.t0, c.t1));
      el.querySelector(".tz-num").style.transform = `translateX(${lerp(160, 0, np)}px) scale(${lerp(1.25, 1, np)})`;
      el.querySelector(".tz-rule").style.width = `${E.out(seg(T, c.t0 + 0.12, c.t0 + 0.6)) * 1120}px`;
      const pill = el.querySelector(".tz-pill"), pp = E.out(seg(T, c.t0, c.t0 + 0.2));
      pill.style.opacity = pp; pill.style.transform = `translateY(${(1 - pp) * 16}px)`;
    });
  }

  function rings(T) {
    $$("#tz-rings rect").forEach((r, i) => {
      const g = RINGS[i], [x, y, w, h] = g.rect, per = 2 * (w + h);
      const draw = E.out(seg(T, g.t0, g.t0 + 0.28));
      r.setAttribute("x", x); r.setAttribute("y", y); r.setAttribute("width", w); r.setAttribute("height", h);
      r.style.strokeDasharray = per; r.style.strokeDashoffset = per * (1 - draw);
      r.style.opacity = T >= g.t0 && T < g.t1 ? 1 - seg(T, g.t1 - 0.12, g.t1) : 0;
    });
  }

  // The reveal's title: lands as the mark docks, holds, leaves before the act card.
  function title(T) {
    const el = $("#tz-title"), a = 4.6875, z = 7.45;
    el.style.opacity = T >= a - 0.02 && T < z ? 1 : 0;
    if (T < a - 0.02 || T >= z) return;
    // Logo: the stripes assemble one by one while the mark spins and scales in,
    // rings pulse out on the beat, then the wordmark rises beside it.
    const lg = el.querySelector("#tz-logo"), m = lg.querySelector(".m");
    const mp = E.out(seg(T, a, a + 0.55));
    m.style.transform = `rotate(${lerp(-90, 0, mp)}deg) scale(${lerp(0.4, 1, mp) * (1 + 0.06 * Math.exp(-((T - a) % EDL.beat) / 0.1))})`;
    const paths = m.querySelectorAll("path");
    paths.forEach((pth, k) => {
      const q = E.out(seg(T, a + k * 0.025, a + k * 0.025 + 0.32));
      pth.style.opacity = q; pth.style.transform = `translateX(${(1 - q) * -34}px)`;
    });
    lg.querySelectorAll(".rings circle").forEach((r, k) => {
      const age = T - a - k * EDL.beat;
      const q = age >= 0 ? (age % (EDL.beat * 3)) / (EDL.beat * 3) : -1;
      r.setAttribute("r", q < 0 ? 0 : 50 + q * 150); r.style.opacity = q < 0 ? 0 : 0.35 * (1 - q);
    });
    wordsIn(lg.querySelector(".wm"), T, a + 0.22, z, 0.06, 0.34);
    wordsIn(el.querySelector(".t1"), T, a + 0.38, z, 0.08, 0.32);
    wordsIn(el.querySelector(".t2"), T, a + 0.8, z, 0.05, 0.28);
  }

  // End screen call to action: the button pops in on beat 74, its arrow drops on
  // every beat, a cursor clicks it on beat 76, then the address types out.
  function cta(T) {
    const el = $("#tz-cta"), cur = $("#tz-cur"), b = EDL.beat;
    const pop = 74 * b, click = 76 * b, end = EDL.duration;
    if (T < pop - 0.02) { el.style.opacity = 0; cur.style.opacity = 0; return; }
    el.style.opacity = 1;
    const btn = el.querySelector(".btn");
    const pp = E.out(seg(T, pop, pop + 0.35));
    const press = T >= click && T < click + 0.12 ? 0.94 : 1;
    btn.style.transform = `scale(${lerp(0.6, 1, pp) * (1 + 0.08 * Math.exp(-Math.max(0, T - pop) / 0.12)) * press})`;
    btn.style.opacity = pp;
    const sinceBeat = (T - pop) % b;
    btn.querySelector(".arrow").style.transform = `translateY(${4 * Math.sin(Math.PI * clamp(sinceBeat / (b * 0.6)))}px)`;
    const rp = seg(T, click, click + 0.6);
    const rip = btn.querySelector(".ripple");
    rip.style.opacity = T >= click ? 0.5 * (1 - rp) : 0;
    rip.style.transform = `scale(${1 + rp * 0.35})`;
    // Cursor glides in from the lower right, clicks, eases away.
    const r = btn.getBoundingClientRect();
    const tx = r.left + r.width * 0.72, ty = r.top + r.height * 0.62;
    const cin = E.inOut(seg(T, click - 0.55, click - 0.02)), cout = E.inOut(seg(T, click + 0.25, click + 0.75));
    cur.style.opacity = vis(T, click - 0.55, click + 0.75, 0.15, 0.2);
    cur.style.transform = `translate(${lerp(tx + 260, tx, cin) + cout * 40}px, ${lerp(ty + 180, ty, cin) + cout * 60}px) scale(${T >= click && T < click + 0.12 ? 0.86 : 1})`;
    const url = "lynkk.ai/download";
    const n = Math.round(url.length * seg(T, click + 0.15, click + 0.75));
    el.querySelector(".url").innerHTML = url.slice(0, n) + (T < end - 0.2 && Math.floor(T * 2.5) % 2 === 0 ? '<span class="caret"></span>' : "");
    const fp = E.out(seg(T, click + 0.7, click + 1.0));
    const facts = el.querySelector(".facts");
    facts.style.opacity = fp; facts.style.transform = `translateY(${(1 - fp) * 12}px)`;
  }

  function hits(T) {
    let f = 0;
    for (const d of EDL.drops) if (T >= d) f = Math.max(f, 0.4 * Math.exp(-(T - d) / 0.07));
    $("#tz-flash").style.opacity = f;
    $("#tz-black").style.opacity = seg(T, EDL.duration - 0.45, EDL.duration);
  }

  // ------------------------------------------------------------------ wiring
  const ready = window.__ready;
  window.__ready = (async () => {
    await ready;
    EDL = await (await fetch("teaser_edl.json")).json();
    window.DURATION = EDL.duration;
    const base = window.renderFrame;
    measureRings(base);
    build();
    window.renderFrame = function (T) {
      const i = segIndex(T);
      const s = EDL.segments[i];
      base(s[3] ? s[2] + (T - s[0]) * s[3] : s[2]);
      camera(T, i);
      panel(T, i);
      cards(T);
      rings(T);
      title(T);
      cta(T);
      hits(T);
    };
    window.renderFrame(0);
    return true;
  })();
})();
