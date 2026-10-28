// Teaser mode (?edl=teaser): replays the film from teaser_edl.json at 128 BPM and
// animates on top of it: a camera that frames and tilts every shot, punch-ins on
// cuts, kinetic act cards, word-by-word captions, highlight rings and drop flashes.
// Everything is a pure function of teaser time T.
(function () {
  if (new URLSearchParams(location.search).get("edl") !== "teaser") return;

  let EDL = null;
  const RINGS = [];        // { t0, t1, rect: [x, y, w, h] } in film space
  const W = 1920, H = 1080;

  // Camera per segment index: zoom range, focus point range (film space), tilt.
  const CAM = {
    0: { z: [1, 1], f: [[960, 540], [960, 540]], ry: [0, 0], rx: [0, 0], beatPunch: true },
    2: { z: [1.0, 1.75], f: [[960, 400], [1739, 27]], ry: [-4, 1], rx: [3, 0] },      // follows the mark into the menu bar
    4: { z: [1.55, 1.75], f: [[1560, 220], [1640, 170]], ry: [-7, -3], rx: [5, 2] },
    5: { z: [1.32, 1.45], f: [[1400, 520], [1520, 470]], ry: [-6, -2], rx: [3, 1] },
    6: { z: [1.38, 1.52], f: [[960, 330], [980, 300]], ry: [5, 1], rx: [5, 2] },
    8: { z: [1.42, 1.52], f: [[1300, 520], [1300, 470]], ry: [-5, -1], rx: [3, 1] },
    9: { z: [1.28, 1.44], f: [[1200, 440], [1260, 470]], ry: [4, 0], rx: [3, 1] },
    11: { z: [1.0, 1.06], f: [[900, 540], [900, 520]], ry: [6, -2], rx: [-3, 0] },
    12: { z: [1.22, 1.3], f: [[1180, 400], [1220, 400]], ry: [-6, -2], rx: [4, 1] },
    13: { z: [1.45, 1.55], f: [[1220, 440], [1260, 450]], ry: [5, 1], rx: [3, 1] },
    14: { z: [1.06, 1.0], f: [[880, 560], [1040, 560]], ry: [-7, 5], rx: [4, 1], beatPunch: true },
    15: { z: [1.0, 1.06], f: [[960, 540], [960, 520]], ry: [0, 0], rx: [0, 0] },
  };
  const DROPS = [7.5, 13.125, 18.28125, 22.5];

  // ------------------------------------------------------------------ DOM
  const DOTS = `<svg class="dots" width="1920" height="1080"><rect width="1920" height="1080" fill="url(#dots)"/></svg>`;
  const words = (line) => {
    const ink2 = line.startsWith("~");
    return line.replace(/^~/, "").split(" ").map((w) => `<span class="w"><span${ink2 ? ' class="ink2"' : ""}>${w}</span></span>`).join(" ");
  };
  function build() {
    const stage = $("#stage");
    const cam = document.createElement("div");
    cam.id = "cam";
    for (const el of [...stage.children]) if (el.id !== "grain") cam.appendChild(el);
    stage.insertBefore(cam, $("#grain"));
    cam.insertAdjacentHTML("beforeend", `<svg id="tz-rings" viewBox="0 0 1920 1080"></svg>`);

    const cards = EDL.cards.map((c, i) => c.kind === "stack"
      ? `<div class="tz-card" id="tzc${i}">${DOTS}<svg class="tz-rings" width="1920" height="1080"></svg>
           <div class="tz-mark">${$("#mark").innerHTML}</div>
           <div class="tz-stack">${c.lines.map((l) => `<div>${words(l)}</div>`).join("")}</div></div>`
      : `<div class="tz-card" id="tzc${i}">${DOTS}<svg class="tz-rings" width="1920" height="1080"></svg>
           <div class="tz-num">${c.num}</div><span class="eb tz-pill">${c.num}</span>
           <div class="tz-label">${words(c.text)}</div><div class="tz-rule"></div></div>`).join("");
    const caps = EDL.captions.map((c, i) => `<div class="tz-cap ${c.where || ""}" id="tzk${i}">
        <div class="hl">${c.lines.map((l) => `<div>${words(l)}</div>`).join("")}</div>
        ${c.sm ? `<div class="sm"><span class="chip-v" style="height:36px;font-size:18px;padding:0 14px">${c.sm}</span></div>` : ""}</div>`).join("");
    stage.insertBefore(Object.assign(document.createElement("div"), { id: "tz", innerHTML: cards + caps + `<div id="tz-flash"></div><div id="tz-black"></div>` }), $("#grain"));
    $$(".tz-card .tz-rings").forEach((svg) => (svg.innerHTML = Array.from({ length: 4 }, () => "<circle/>").join("")));

    // The film's own captions and chapter labels are replaced by the teaser's.
    for (const sel of ["#caps", "#ch-eb", "#h-brand", "#h-mac", "#fnhero .eb", "#wallsc .eb"]) $(sel).style.display = "none";
  }

  // Measure ring targets in film space, at the film time they are on screen.
  function measureRings(base) {
    const targets = [
      [8.9, 9.37, "#rec-btn", 14.2, 10],
      [9.7, 10.6, "#column .lv", 19.0, 10, true],
      [12.05, 12.6, "#spkeys", 25.0, 10],
      [16.45, 16.85, "#ask-c2", 52.6, 8],
      [20.18, 20.6, "#polish .clean", 39.6, 14],
    ];
    for (const [t0, t1, sel, src, pad, both] of targets) {
      base(src);
      let r;
      if (sel === "#spkeys") { const ks = $$("#spkeys .kc"); const a = ks[0].getBoundingClientRect(), b = ks[1].getBoundingClientRect(); r = { left: a.left, top: a.top, right: b.right, bottom: b.bottom }; }
      else if (both) { const ls = $$(sel); const a = ls[0].getBoundingClientRect(), b = ls[1].getBoundingClientRect(); r = { left: a.left, top: a.top, right: b.right, bottom: b.bottom }; }
      else r = $(sel).getBoundingClientRect();
      RINGS.push({ t0, t1, rect: [r.left - pad, r.top - pad, r.right - r.left + 2 * pad, r.bottom - r.top + 2 * pad] });
    }
    $("#tz-rings").innerHTML = RINGS.map(() => `<rect rx="18" ry="18"/>`).join("");
  }

  // ------------------------------------------------------------------ helpers
  const segIndex = (T) => { const s = EDL.segments; for (let i = 0; i < s.length; i++) if (T < s[i][1]) return i; return s.length - 1; };
  const vis = (T, a, b, fi = 0.18, fo = 0.15) => E.out(seg(T, a, a + fi)) * (1 - E.in(seg(T, b - fo, b)));
  // Words rise out of their masks one after another; they leave together, fast.
  function wordsIn(root, T, start, end, stagger = 0.05, dur = 0.28) {
    const ws = root.querySelectorAll(".w > span");
    ws.forEach((w, i) => {
      const p = E.out(seg(T, start + i * stagger, start + i * stagger + dur));
      const q = E.in(seg(T, end - 0.14, end));
      w.style.transform = `translateY(${(1 - p) * 105 - q * 105}%) rotate(${(1 - p) * 4}deg)`;
    });
  }

  // ------------------------------------------------------------------ per frame
  function camera(T, i) {
    const s = EDL.segments[i];
    const c = CAM[i];
    const cam = $("#cam");
    if (!c) { cam.style.transform = "none"; cam.style.filter = "none"; return; }
    const p = E.inOut(seg(T, s[0], s[1]));
    let z = lerp(c.z[0], c.z[1], p);
    const ry = lerp(c.ry[0], c.ry[1], p), rx = lerp(c.rx[0], c.rx[1], p);
    // Punch in on the cut, and on every beat where the segment asks for it.
    const sinceCut = T - s[0];
    let punch = 0.07 * Math.exp(-sinceCut / 0.09);
    if (c.beatPunch) { const sinceBeat = (T % EDL.beat); punch = Math.max(punch, 0.045 * Math.exp(-sinceBeat / 0.08)); }
    z *= 1 + punch;
    const over = 1 + (Math.abs(ry) + Math.abs(rx)) * 0.006;      // overscan so a tilt never shows an edge
    const zz = z * over;
    let fx = lerp(c.f[0][0], c.f[1][0], p), fy = lerp(c.f[0][1], c.f[1][1], p);
    fx = clamp(fx, W / 2 / zz, W - W / 2 / zz); fy = clamp(fy, H / 2 / zz, H - H / 2 / zz);
    const beatTilt = c.beatPunch ? (Math.floor(T / EDL.beat) % 2 ? 1.2 : -1.2) * Math.exp(-(T % EDL.beat) / 0.12) : 0;
    cam.style.transform = `translate(${W / 2}px, ${H / 2}px) perspective(2200px) rotateX(${rx}deg) rotateY(${ry + beatTilt}deg) scale(${zz}) translate(${-fx}px, ${-fy}px)`;
    const blur = 7 * (1 - E.out(seg(sinceCut, 0, 0.14)));
    cam.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "none";
  }

  function cards(T) {
    EDL.cards.forEach((c, i) => {
      const el = $(`#tzc${i}`);
      const on = T >= c.t0 && T < c.t1;
      el.style.opacity = on ? 1 : 0;
      if (!on) return;
      // Wipe in from the left on the cut.
      const wipe = E.out(seg(T, c.t0, c.t0 + 0.14));
      el.style.clipPath = `inset(0 ${(1 - wipe) * 100}% 0 0)`;
      // Rings pulse out from the centre on every beat.
      el.querySelectorAll(".tz-rings circle").forEach((r, k) => {
        const age = ((T - c.t0) - k * EDL.beat);
        const a = age >= 0 ? (age % (EDL.beat * 4)) / (EDL.beat * 4) : -1;
        if (a < 0) { r.setAttribute("r", 0); r.style.opacity = 0; return; }
        r.setAttribute("cx", c.kind === "stack" ? 960 : 1500); r.setAttribute("cy", c.kind === "stack" ? 210 : 560);
        r.setAttribute("r", 60 + a * 900); r.style.opacity = 0.22 * (1 - a); r.style.strokeWidth = 2;
      });
      if (c.kind === "stack") {
        // Each line lands on its beat; the sentence builds up.
        el.querySelectorAll(".tz-stack > div").forEach((line, k) => wordsIn(line, T, c.beats[k], c.t1 + 1, 0.04, 0.24));
        const paths = el.querySelectorAll(".tz-mark path");
        paths.forEach((pth, k) => { const q = E.out(seg(T, c.t0 + k * 0.025, c.t0 + k * 0.025 + 0.3)); pth.style.opacity = q; pth.style.transform = `translateX(${(1 - q) * -30}px)`; });
        el.querySelector(".tz-mark").style.transform = `rotate(${lerp(-25, 0, E.out(seg(T, c.t0, c.t0 + 0.6)))}deg) scale(${1 + 0.06 * Math.exp(-((T - c.t0) % EDL.beat) / 0.1)})`;
      } else {
        wordsIn(el.querySelector(".tz-label"), T, c.t0 + 0.04, c.t1 + 1, 0.07, 0.3);
        const n = el.querySelector(".tz-num");
        const np = E.out(seg(T, c.t0, c.t1));
        n.style.transform = `translateX(${lerp(160, 0, np)}px) scale(${lerp(1.25, 1, np)})`;
        el.querySelector(".tz-rule").style.width = `${E.out(seg(T, c.t0 + 0.12, c.t0 + 0.6)) * 1120}px`;
        const pill = el.querySelector(".tz-pill"); const pp = E.out(seg(T, c.t0, c.t0 + 0.2));
        pill.style.opacity = pp; pill.style.transform = `translateY(${(1 - pp) * 16}px)`;
      }
    });
  }

  function captions(T) {
    EDL.captions.forEach((c, i) => {
      const el = $(`#tzk${i}`);
      if (T < c.t0 - 0.02 || T > c.t1 + 0.02) { el.style.opacity = 0; return; }
      const box = E.out(seg(T, c.t0, c.t0 + 0.16)) * (1 - E.in(seg(T, c.t1 - 0.12, c.t1)));
      el.style.opacity = box;
      // The box wipes open from the left as its words rise, so it is never seen empty.
      el.style.clipPath = c.where ? "none" : `inset(0 ${(1 - E.out(seg(T, c.t0, c.t0 + 0.2))) * 100}% 0 0 round 24px)`;
      el.style.transform = "none";
      wordsIn(el, T, c.t0, c.t1, 0.045, 0.24);
    });
  }

  function rings(T) {
    $$("#tz-rings rect").forEach((r, i) => {
      const g = RINGS[i];
      const [x, y, w, h] = g.rect;
      const per = 2 * (w + h);
      const draw = E.out(seg(T, g.t0, g.t0 + 0.28));
      const out = 1 - seg(T, g.t1 - 0.12, g.t1);
      const pulse = 1 + 0.03 * Math.sin(Math.max(0, T - g.t0) * 18) * Math.exp(-Math.max(0, T - g.t0) * 3);
      r.setAttribute("x", x); r.setAttribute("y", y); r.setAttribute("width", w); r.setAttribute("height", h);
      r.style.strokeDasharray = per; r.style.strokeDashoffset = per * (1 - draw);
      r.style.opacity = T >= g.t0 && T < g.t1 ? out : 0;
      r.style.transformOrigin = `${x + w / 2}px ${y + h / 2}px`; r.style.transform = `scale(${pulse})`;
    });
  }

  function hits(T) {
    let f = 0;
    for (const d of DROPS) if (T >= d) f = Math.max(f, 0.42 * Math.exp(-(T - d) / 0.07));
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
    build();
    measureRings(base);
    window.renderFrame = function (T) {
      const i = segIndex(T);
      const s = EDL.segments[i];
      base(s[3] ? s[2] + (T - s[0]) * s[3] : s[2]);
      camera(T, i);
      cards(T);
      captions(T);
      rings(T);
      hits(T);
    };
    window.renderFrame(0);
    return true;
  })();
})();
