// Chapters 01 to 06 (12 s to 78 s). Loaded after the main timeline script and
// uses its helpers (seg, lerp, E, $, $$, level, maskIn). Every function here is a
// pure function of t. Times follow shots.md and the approved score's grid.

const PLAY = `<svg viewBox="0 0 12 14"><path d="M1 1 L11 7 L1 13 Z" fill="currentColor"/></svg>`;
const SPARK = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/></svg>`;
const DOTS = `<svg class="dots" width="1920" height="1080"><rect width="1920" height="1080" fill="url(#dots)"/></svg>`;
const people = [["DR", "Dana Ruiz"], ["MB", "Marco Bell"], ["PN", "Priya Nair"], ["SO", "Sam Ortiz"]];
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

// --------------------------------------------------------------------- DOM
const DESKTOP_HTML = `
<div id="callwin" class="dk win">
  <div class="win-bar"><i></i><i></i><i></i><span class="win-title">Call</span><span class="win-right num" id="cw-timer">00:00</span></div>
  <div class="cw-layer cw-grid">${people.map(([i, n], k) => `<div class="cw-tile${k === 2 ? " on" : ""}"><div class="av">${i}</div><span>${n}</span></div>`).join("")}
    <div class="cw-foot"><i class="cw-ic"></i><i class="cw-ic"></i><i class="cw-ic"></i><span class="cw-leave" id="leave">Leave</span></div></div>
  <div class="cw-layer cw-huddle">${people.map(([i]) => `<div class="av">${i}</div>`).join("")}<b>Huddle</b></div>
  <div class="cw-layer cw-audio">${people.slice(0, 3).map(([i, n]) => `<div><span class="av">${i}</span>${n}</div>`).join("")}
    <div><span class="av">SO</span>Sam Ortiz<span class="wave">${Array.from({ length: 14 }, () => "<i></i>").join("")}</span></div></div>
</div>

<div id="card" class="dk">
  <div class="app-ic mk"></div>
  <div><h4>Call detected</h4><p>Record both sides? Nothing joins the call.</p><small>now · Lynkk</small></div>
  <div class="btns"><span class="pill-w" id="rec-btn">Record</span><span class="pill-d">Not now</span></div>
  <i class="drain"></i>
</div>

<div id="column" class="dk"><div class="inner">
  <div class="col-top"><i class="dot"></i><span class="num" id="col-clock">12:58</span><span class="ctl"><span>Pause</span><span>Stop</span></span></div>
  <div class="lv"><span>You</span><i><b id="lv-you"></b></i></div>
  <div class="lv"><span style="color:rgb(255 255 255 / .55)">Others</span><i><b id="lv-oth"></b></i></div>
  <div class="col-words">
    <div class="cw-line" id="w1"><em>Speaker B</em>Forty is fine. Security wants a review first.</div>
    <div class="cw-line you" id="w2"><em>You</em>Then I’ll book the review for Thursday and send the plan by Friday.</div>
  </div>
  <div class="col-note" id="col-note">Add a note</div>
  </div><div class="tab"><i></i><b></b></div>
</div>

<div id="spotter" class="dk">
  <div class="sp-head">${SPARK}Spotter<span class="chip-v">Early access</span><span class="right"><span class="chip-g">Sales</span><span class="chip-g">Me · Them</span></span></div>
  <div class="sp-them"><em>Them</em>Can you share the rollout plan on screen?</div>
  <div class="sp-input">Ask, or press ⌘↩ for help with what’s on screen<kbd>⌘↩</kbd></div>
  <div class="sp-ans"><span class="lab">Help with this moment</span><span id="sp-text"></span></div>
</div>
<div id="spkeys" class="dk" style="left:0;top:0;width:1920px;height:1080px">
  <div class="kc" style="left:820px;top:520px"><div class="b"></div><div class="t">⌘</div></div>
  <div class="kc" style="left:972px;top:520px"><div class="b"></div><div class="t">↩</div></div>
</div>
<div id="savecard" class="dk">The call ended. Saving in <span class="num">10</span> s.<small>Lynkk</small></div>

<div id="island" class="dk"></div>

<div id="dw-email" class="dk win dwin"><div class="win-bar"><i></i><i></i><i></i><span class="win-title">New message</span></div>
  <div class="dw-body"><div class="dw-row">To <b>Dana Ruiz</b></div><div class="dw-row">Subject <b>Pilot plan</b></div><div class="dw-text" id="dt-email"></div></div></div>
<div id="dw-doc" class="dk win dwin"><div class="win-bar"><i></i><i></i><i></i><span class="win-title">Rollout notes</span></div>
  <div class="dw-body"><div style="font:500 34px/1.2 Inter;letter-spacing:-.02em">Rollout notes</div><div class="dw-text" style="color:rgb(255 255 255/.55)">Pilot: forty seats, week of the sixth.</div><div class="dw-text" id="dt-doc" style="margin-top:12px"></div></div></div>
<div id="dw-chat" class="dk win dwin"><div class="win-bar"><i></i><i></i><i></i><span class="win-title"># launch</span></div>
  <div class="dw-body">
    <div class="dw-msg"><span class="av">PN</span><div><b>Priya Nair</b>Launch copy is in the doc. Comments welcome.</div></div>
    <div class="dw-msg"><span class="av">DR</span><div><b>Dana Ruiz</b>Is the pricing sheet final? Finance wants it before Thursday.</div></div>
  </div><div class="dw-compose" id="dt-chat"></div></div>
<div id="dw-pass" class="dk win dwin"><div class="win-bar"><i></i><i></i><i></i><span class="win-title">Sign in</span></div>
  <div class="dw-body" style="padding-top:60px"><div style="text-align:center;font:500 34px/1.2 Inter">Sign in</div><div class="pw-label">Password</div><div class="pw-field">•••••••<span class="caret"></span></div></div></div>
<div id="pwkey" class="dk" style="left:0;top:0;width:1920px;height:1080px"><div class="kc sm" style="left:1208px;top:800px"><div class="b"></div><div class="t">fn</div></div></div>

<div id="polish" class="dk"><div class="lab"><span class="chip-g">Polished</span><span class="chip-v">Pro</span></div>
  <div class="raw">so um we could, we should ship on friday</div><div class="clean">We should ship on Friday.</div></div>
<div id="modes" class="dk">
  <div class="mode"><h5>Instant<span class="chip-g">Free</span></h5><p>On your Mac, in English. Nothing is sent.</p></div>
  <div class="mode"><h5>Accurate<span class="chip-v">Pro</span></h5><p>Cloud dictation in 18 languages.</p></div>
  <div class="mode"><h5>Polished<span class="chip-v">Pro</span></h5><p>Accurate, without the ums and false starts.</p></div>
  <span class="tag chip-g" style="height:40px;padding:0 18px;font-size:19px;border-radius:20px">Hindi and Hinglish too</span>
</div>

<div id="cmdkeys" class="dk">
  <div class="kc sm" style="left:0"><div class="b"></div><div class="t">⌘1</div></div>
  <div class="kc sm" style="left:124px"><div class="b"></div><div class="t">⌘2</div></div>
  <div class="kc sm" style="left:248px"><div class="b"></div><div class="t">⌘3</div></div>
</div>

<div id="appwin" class="dk win">
  <div class="win-bar"><i></i><i></i><i></i><span class="win-title">Lynkk</span></div>
  <div class="side"><div class="brand"><span class="mk" style="width:22px;height:22px"></span>Lynkk</div>
    <div class="nav" id="nv-notes">Notes<kbd>⌘1</kbd></div>
    <div class="nav" id="nv-ask">Ask Lynkk <span class="chip-v" style="height:24px;font-size:13px;padding:0 8px">Pro</span><kbd>⌘2</kbd></div>
    <div class="nav" id="nv-dict">Dictation<kbd>⌘3</kbd></div>
    <div class="nav" id="nv-tasks">Tasks</div>
    <div class="me"><span class="av">SO</span>Sam Ortiz · Pro</div></div>
  <div class="pane">
    <div class="pv" id="pv-notes"><h3>Notes</h3>
      <div class="nl-sec">Today</div>
      <div class="nl" id="nl-hit"><b>Corvane Logistics · Discovery call<span class="open">3 open</span></b><span>41 min · 16:02 · A forty seat pilot, once the security review closes.</span></div>
      <div class="nl"><b>Pricing review<span class="open">3 open</span></b><span>32 min · 14:30 · Finance reviews the sheet on Thursday.</span></div>
      <div class="nl"><b>Standup<span class="open">2 open</span></b><span>15 min · 10:00 · The launch checklist is on track.</span></div>
      <div class="nl-sec">This week</div>
      <div class="nl"><b>Huddle with Maya<span class="open">1 open</span></b><span>12 min · Mon · Maya picks the onboarding copy.</span></div>
    </div>
    <div class="pv" id="pv-note"><h3>Corvane Logistics · Discovery call</h3><div class="meta">Today 16:02 · 41 min · 4 speakers</div>
      <div class="tabs"><span class="on">AI Summary</span><span>Transcript</span></div>
      <div class="sum r">Corvane agreed to a forty seat pilot starting the week of the sixth, once their security review closes.</div>
      <div class="nl-sec r">Key takeaways</div>
      <div class="kt r">The pilot is forty seats<span class="ts">04:12</span></div>
      <div class="kt r">Security review comes first<span class="ts">12:04</span></div>
      <div class="kt r">Rollout the week of the sixth<span class="ts">18:40</span></div>
      <div class="nl-sec r">Action items</div>
      <div class="ai r">Send the pilot plan to Dana and Marco<span class="who">You · Fri 2 Oct</span><span class="pri">High</span></div>
      <div class="ai r">Book the security review<span class="who">Marco Bell · Thu 1 Oct</span><span class="pri">Medium</span></div>
      <div class="ask-panel" id="askp"><div class="hd">Ask about this note <span class="chip-v" style="height:22px;font-size:12px;padding:0 7px">Pro</span><kbd>⌘J</kbd></div>
        <div class="q" id="askp-q"></div><div class="a" id="askp-a"></div>
        <span class="cite" id="askp-cite">${PLAY}Play from <span class="num">12:04</span></span>
        <div class="wavebar" id="askp-wave">${Array.from({ length: 70 }, () => "<i></i>").join("")}<span class="ph"></span></div></div>
    </div>
    <div class="pv" id="pv-ask"><h3>Ask Lynkk <span class="chip-v" style="vertical-align:middle">Pro</span></h3><div class="meta">All your notes</div>
      <div style="display:flex;flex-direction:column"><div class="ask-q" id="ask-q"></div></div>
      <div class="ask-a" id="ask-a"></div>
      <div class="ask-src"><span class="cite" id="ask-c1" style="background:#26262a;color:#fff;border-color:rgb(255 255 255/.14)">Corvane Logistics · Discovery call</span><span class="cite" id="ask-c2">${PLAY}Play from <span class="num">12:04</span></span></div>
    </div>
    <div class="pv" id="pv-tasks"><h3>Tasks</h3>
      <div class="kan">
        <div><h6>Open</h6><div class="kcard">Share the rollout checklist<span>Priya Nair · Wed</span></div></div>
        <div><h6>In progress</h6><div class="kcard" id="kc-src" style="visibility:hidden">Send the pilot plan to Dana and Marco<span>You · Fri</span></div><div class="kcard" id="kc-send">Book the security review<span>Marco Bell · Thu<span class="send" id="send-btn">Send</span></span></div></div>
        <div><h6>In review</h6><div class="kcard">Pricing sheet for Finance<span>Dana Ruiz · Thu</span></div></div>
        <div id="kan-done"><h6>Done</h6><div class="kcard">Pilot scope agreed<span>You · Mon</span></div><div class="kcard" id="kc-slot" style="visibility:hidden">Send the pilot plan to Dana and Marco<span>You · Fri</span></div></div>
      </div>
      <div class="kcard" id="dragcard">Send the pilot plan to Dana and Marco<span>You · Fri</span></div>
      <div class="pop" id="pop"><div class="r">Send as <b>Issue</b></div><div class="r">Project <b>Pilot</b></div><div class="r">Type <b>Task</b></div><div class="done" id="pop-done">Sent. One issue for this task.</div></div>
    </div>
    <div class="pv" id="pv-dict"><h3>Dictation</h3><span class="illus">Illustrative</span>
      <div class="stats"><div class="stat"><b>2,140</b><span>Words this week</span></div><div class="stat"><b>41 min</b><span>Time saved</span></div></div>
      <div class="hist"><div>Sure. I’ll send the pricing notes tonight.<em>Chat · 16:40</em></div><div>Security review moves to Thursday.<em>Doc · 16:34</em></div><div>Sending the pilot plan by Friday.<em>Email · 16:31</em></div></div>
    </div>
  </div>
  <div id="search" class="dk" style="position:absolute">⌕ <span id="search-q"></span><kbd>⌘K</kbd></div>
</div>

<div id="dmg" class="dk win"><div class="win-bar"><i></i><i></i><i></i><span class="win-title">Lynkk</span></div>
  <div class="icons">
    <div class="big-ic mk" id="dmg-app" style="left:150px;top:90px"></div><div class="ic-lab" style="left:115px;top:290px">Lynkk</div>
    <div class="arrow"></div>
    <div class="folder" id="dmg-folder" style="left:570px;top:100px"><div class="tabf"></div><div class="bodyf"></div></div><div class="ic-lab" style="left:545px;top:290px">Applications</div>
  </div></div>
<div id="tryvoice" class="dk"><h4>Try your voice</h4><small>Hold fn and talk. Let go and it’s typed.</small>
  <div class="said" id="tv-said"></div><div class="ok" id="tv-ok"><i></i>You’re set.</div></div>
<div id="stamps" class="dk"><span>About 6 MB</span><span>Apple silicon</span><span>macOS 14.2 or later</span><span>Free to install</span></div>
<div id="signed" class="dk">Signed and notarized by Apple. Updates only when you press Update.</div>
`;

const STAGE_HTML = `
<div id="fnhero" class="band2">${DOTS}
  <span class="eb">02 Dictation</span>
  <div class="key"><div class="base"></div><div class="top">fn</div></div>
  <div class="bars">${Array.from({ length: 9 }, () => "<i></i>").join("")}</div>
  <div class="lines"><span class="mask"><span>Hold fn.</span></span><span class="mask"><span>Talk.</span></span><span class="mask"><span>Let go.</span></span></div>
</div>
<div id="wallsc" class="band2">${DOTS}<span class="eb" style="top:120px">04 And more</span><div class="grid"></div></div>
<div id="ember"><div class="plate"></div><div class="scrim"></div>
  <div class="lock"><span class="m mk"></span>Lynkk</div>
  <div class="hl"><span class="mask"><span>Lynkk for Mac.</span></span><span class="mask"><span class="ink2">Your next call, noticed.</span></span><span class="mask"><span class="ink2">Your next message, spoken.</span></span></div>
  <div class="cta"><span class="btn">Download at lynkk.ai</span><span class="av">Available now</span></div>
  <div class="fine">Free to install · Apple silicon · macOS 14.2 or later</div>
  <div id="fadeout" style="position:absolute;inset:0;background:#000;opacity:0"></div>
</div>
<div id="ch-eb" style="position:absolute;left:120px;top:150px;opacity:0"><span class="eb" id="ch-eb-t"></span></div>
<div id="caps"></div>
<svg id="cur" viewBox="0 0 24 34"><path d="M2 2 L2 27 L8 21 L12 31 L16 29.5 L12 20 L20 20 Z" fill="#111" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/></svg>
`;

const WALL = [
  ["Same notes as lynkk.ai"], ["Stops after 5 min of silence"], ["Up to 2 h per recording"],
  ["Survives sleep and bad Wi-Fi"], ["Recording panel hides from screen shares", "macOS 15.4+"], ["17 transcription languages"],
  ["9 Summary Shapes", "Pro"], ["Ask drafts the follow-up. You send it."], ["Ask books a calendar event, after you confirm"],
  ["A briefing every morning you have meetings"], ["Everyone in a workspace gets Pro"], ["Notes stay personal when you choose"],
  ["Never trains on your conversations"],
];

// Captions: "~" marks a line in the second ink. n = the counting number in caption 2.
const CAPS = [
  { t0: 12.15, t1: 15.45, hl: ["It asks once.", "~No bot joins.", "~No calendar needed."] },
  { t0: 15.55, t1: 17.95, hl: ["It notices calls", "in <span class='num' id='appcount'>7</span> apps."] },
  { t0: 18.1, t1: 21.45, hl: ["Both sides,", "on two channels.", "~Your side is", "~labelled You."] },
  { t0: 21.55, t1: 23.45, hl: ["Fold it away", "into a tab."] },
  { t0: 23.6, t1: 28.45, hl: ["Ask Spotter", "during the call.", "~It reads your screen", "~when you ask."], sm: "Early access. Visible, and private." },
  { t0: 28.6, t1: 31.45, hl: ["It saves itself.", "~Bad Wi-Fi doesn’t", "~lose the file."] },
  { t0: 34.1, t1: 36.95, hl: ["The words land", "where your", "cursor is.", "~In any app."] },
  { t0: 37.05, t1: 38.45, hl: ["Not in", "password fields."] },
  { t0: 38.55, t1: 40.95, hl: ["Polished drops", "the ums and", "false starts."], sm: "Pro" },
  { t0: 43.1, t1: 46.95, hl: ["Every recording,", "with its summary", "and transcript."] },
  { t0: 47.05, t1: 49.95, hl: ["Ask about", "one note.", "~Hear the moment", "~it happened."], sm: "Pro" },
  { t0: 50.05, t1: 53.95, hl: ["Ask across", "all your notes.", "~Answers cite", "~the minute."], sm: "Ask Lynkk · Pro" },
  { t0: 54.05, t1: 56.95, hl: ["Tasks on a board.", "~Send any", "~as an issue."] },
  { t0: 57.05, t1: 59.45, hl: ["Your dictation", "history.", "~With the", "~time saved."] },
];
const CHAPTERS = [[12.1, 31.45, "01 Calls"], [34.05, 42.95, "02 Dictation"], [43.05, 59.45, "03 The app"]];

// Call window shapes, in screen space.
const CW = { grid: { x: 650, y: 150, w: 820, h: 620 }, huddle: { x: 790, y: 360, w: 720, h: 150 }, audio: { x: 860, y: 230, w: 580, h: 420 } };
const CW_SEQ = [[15.5, "grid", "huddle"], [16.0, "huddle", "audio"], [16.5, "audio", "grid"], [17.0, "grid", "huddle"], [17.5, "huddle", "audio"], [18.0, "audio", "grid"]];

const T = {};          // measured cursor targets (screen space)
let CURSOR = [];

// --------------------------------------------------------------------- init
window.initScenes = function () {
  $("#menubar").insertAdjacentHTML("beforebegin", DESKTOP_HTML);
  $("#mark").insertAdjacentHTML("beforebegin", STAGE_HTML);
  const markSvg = $("#mark").innerHTML;
  $$(".mk").forEach((el) => (el.innerHTML = markSvg));
  $("#slot").insertAdjacentHTML("beforeend", `<i id="recdot"></i>`);
  const wifi = $("#menubar .right > svg");
  wifi.insertAdjacentHTML("afterend", `<i id="wifislash"></i>`);
  const wr = wifi.getBoundingClientRect(), rr = $("#menubar .right").getBoundingClientRect();
  Object.assign($("#wifislash").style, { left: `${wr.left - rr.left + wr.width / 2 - 17}px`, top: `${wr.top - rr.top + wr.height / 2 - 1.5}px` });
  $("#caps").innerHTML = CAPS.map((c, i) => `<div class="cap" id="cap${i}"><div class="hl">${c.hl.map((l) =>
    `<span class="mask"><span${l[0] === "~" ? ' class="ink2"' : ""}>${l.replace(/^~/, "")}</span></span>`).join("")}</div>${c.sm ? `<div class="sm"><span class="mask"><span>${c.sm}</span></span></div>` : ""}</div>`).join("");
  $("#wallsc .grid").innerHTML = WALL.map(([a, b], i) => `<div class="wt${i === 12 ? " last" : ""}">${a}${b ? `<span class="${b === "Pro" ? "chip-v" : "chip-g"}">${b}</span>` : ""}</div>`).join("");

  // Measure cursor targets with every element at rest.
  const c = (sel) => { const r = $(sel).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
  for (const el of $$(".dk")) el.style.transform = "none";
  $("#callwin").style.cssText += `;left:${CW.grid.x}px;top:${CW.grid.y}px;width:${CW.grid.w}px;height:${CW.grid.h}px`;
  $("#card").style.cssText += ";right:22px;top:68px";
  T.record = c("#rec-btn"); T.leave = c("#leave");
  $("#pv-note").style.opacity = 1; T.cite = c("#askp-cite"); $("#pv-note").style.opacity = 0;
  $("#pv-tasks").style.opacity = 1; T.src = c("#kc-src"); T.slot = c("#kc-slot"); T.send = c("#send-btn"); $("#pv-tasks").style.opacity = 0;
  T.dmgApp = c("#dmg-app"); T.folder = c("#dmg-folder");
  const pane = $("#pv-tasks").getBoundingClientRect();
  T.pane = [pane.left, pane.top];
  const dc = $("#dragcard"); dc.style.width = `${$("#kc-src").getBoundingClientRect().width}px`;

  CURSOR = [
    { vis: [13.35, 14.95], pts: [[13.35, 1290, 820], [14.15, ...T.record], [14.6, T.record[0] + 60, T.record[1] + 90]], press: [14.25] },
    { vis: [29.85, 30.75], pts: [[29.85, T.leave[0] + 220, T.leave[1] + 130], [30.22, ...T.leave], [30.6, T.leave[0] + 40, T.leave[1] + 60]], press: [30.3] },
    { vis: [48.6, 49.6], pts: [[48.6, T.cite[0] + 180, T.cite[1] + 120], [49.0, ...T.cite], [49.5, T.cite[0] + 30, T.cite[1] + 50]], press: [49.1] },
    { vis: [54.15, 56.5], pts: [[54.15, T.src[0] + 120, T.src[1] + 160], [54.4, ...T.src], [55.0, ...T.slot], [55.45, T.send[0] - 40, T.send[1] + 50], [55.75, ...T.send], [56.3, T.send[0] + 30, T.send[1] + 60]], press: [55.85], hold: [54.42, 55.0] },
    { vis: [68.55, 69.75], pts: [[68.55, T.dmgApp[0] + 90, T.dmgApp[1] + 120], [68.75, ...T.dmgApp], [69.45, ...T.folder], [69.75, T.folder[0] + 30, T.folder[1] + 40]], hold: [68.77, 69.5] },
  ];
  for (const el of $$(".dk")) el.style.transform = "";
};

// --------------------------------------------------------------------- helpers
// Visible between a and b, easing in over fi and out over fo.
const vis = (t, a, b, fi = 0.3, fo = 0.25) => E.out(seg(t, a, a + fi)) * (1 - E.in(seg(t, b - fo, b)));
const on = (t, a, b) => (t >= a && t < b ? 1 : 0);
function show(sel, o, tr = "") { const el = typeof sel === "string" ? $(sel) : sel; el.style.opacity = o; el.style.transform = tr; }
function typed(el, text, p, t, caret = true) {
  const n = Math.round(text.length * clamp(p));
  const blink = Math.floor(t * 2.5) % 2 === 0;
  el.innerHTML = esc(text.slice(0, n)) + (caret && (p < 1 || blink) ? '<span class="caret"></span>' : "");
}
function path(pts, t) {
  if (t <= pts[0][0]) return [pts[0][1], pts[0][2]];
  for (let i = 1; i < pts.length; i++) {
    if (t <= pts[i][0]) {
      const p = E.inOut(seg(t, pts[i - 1][0], pts[i][0]));
      return [lerp(pts[i - 1][1], pts[i][1], p), lerp(pts[i - 1][2], pts[i][2], p)];
    }
  }
  const l = pts[pts.length - 1]; return [l[1], l[2]];
}

// --------------------------------------------------------------------- 01 calls
function sceneCalls(t) {
  const cw = $("#callwin");
  // 12.0 the call opens; 30.3 Leave; gone by 30.75.
  const appear = E.out(seg(t, 12.0, 12.45));
  const leave = E.in(seg(t, 30.35, 30.75));
  if (t < 12.0 || t >= 31.5) { cw.style.opacity = 0; } else {
    let g = CW.grid, from = "grid", to = "grid", p = 0;
    for (const [s, a, b] of CW_SEQ) if (t >= s) { from = a; to = b; p = E.out(seg(t, s, s + 0.26)); }
    const A = CW[from], B = CW[to];
    g = { x: lerp(A.x, B.x, p), y: lerp(A.y, B.y, p), w: lerp(A.w, B.w, p), h: lerp(A.h, B.h, p) };
    cw.style.left = `${g.x}px`; cw.style.top = `${g.y}px`; cw.style.width = `${g.w}px`; cw.style.height = `${g.h}px`;
    cw.style.opacity = appear * (1 - leave);
    cw.style.transform = `translateY(${(1 - appear) * 30}px) scale(${1 - 0.08 * leave})`;
    // Content swaps behind a short blur while the container changes shape.
    for (const k of ["grid", "huddle", "audio"]) {
      const layer = cw.querySelector(`.cw-${k}`);
      const o = from === to ? (k === to ? 1 : 0) : k === to ? seg(p, 0.35, 0.8) : (k === from ? 1 - seg(p, 0, 0.45) : 0);
      layer.style.opacity = o;
      layer.style.filter = p > 0 && p < 1 ? `blur(${6 * Math.sin(Math.PI * p)}px)` : "none";
    }
    // Call timer: runs fast to 00:03, the card arrives "three seconds in".
    const secs = t < 13.0 ? Math.min(3, Math.floor((t - 12.0) / 0.25)) : 3 + Math.floor(t - 13.0);
    $("#cw-timer").textContent = `00:${String(secs).padStart(2, "0")}`;
    $$("#callwin .wave i").forEach((w, i) => (w.style.height = `${6 + 22 * level(t + i * 0.13, i)}px`));
  }

  // The card: drops at 13.0, Record at 14.25, back into the menu bar by 15.0.
  const cin = E.out(seg(t, 13.0, 13.35)), cout = E.in(seg(t, 14.55, 14.95));
  const card = $("#card");
  card.style.opacity = t >= 13.0 && t < 15.0 ? cin * (1 - cout) : 0;
  card.style.transform = `translateY(${(1 - cin) * -40 - cout * 60}px) scale(${1 - 0.06 * cout})`;
  card.querySelector(".drain").style.width = `${476 * (1 - seg(t, 13.0, 43.0))}px`;
  const press = on(t, 14.25, 14.4);
  $("#rec-btn").style.background = press ? "#dcdcda" : "#fff";
  $("#rec-btn").style.transform = `scale(${press ? 0.95 : 1})`;
  $("#recdot").style.opacity = t >= 14.3 && t < 30.4 ? 1 : 0;

  // The column: slides in at 18.0, folds into a tab at 21.5, tab until Leave.
  const col = $("#column");
  const cin2 = E.out(seg(t, 18.0, 18.45));
  const fold = E.inOut(seg(t, 21.55, 22.05));
  const tabOut = E.in(seg(t, 30.35, 30.6));
  col.style.opacity = t >= 18.0 && t < 31.5 ? cin2 * (1 - tabOut) : 0;
  col.style.transform = `translateX(${(1 - cin2) * 440}px)`;
  col.style.width = `${lerp(400, 40, fold)}px`;
  col.style.right = `${lerp(22, 0, fold)}px`;
  col.style.borderRadius = fold > 0.5 ? "16px 0 0 16px" : "22px";
  col.style.height = `${lerp(820, 200, fold)}px`;
  col.style.top = `${lerp(76, 380, fold)}px`;
  col.querySelector(".inner").style.opacity = 1 - seg(fold, 0, 0.35);
  col.querySelector(".tab").style.opacity = seg(fold, 0.7, 1);
  // The tab's dot keeps pulsing, even while the Wi-Fi is down.
  col.querySelector(".tab i").style.opacity = 0.55 + 0.45 * Math.cos((t - 22) * Math.PI * 2);
  const cs = 12 * 60 + 58 + Math.floor(Math.max(0, t - 18.0));
  $("#col-clock").textContent = `${Math.floor(cs / 60)}:${String(cs % 60).padStart(2, "0")}`;
  $("#lv-you").style.width = `${level(t, 1.1) * 100}%`;
  $("#lv-oth").style.width = `${level(t, 3.7) * 85}%`;
  show("#w1", E.out(seg(t, 18.55, 18.85)), `translateY(${(1 - E.out(seg(t, 18.55, 18.85))) * 12}px)`);
  show("#w2", E.out(seg(t, 19.25, 19.55)), `translateY(${(1 - E.out(seg(t, 19.25, 19.55))) * 12}px)`);
  const note = $("#col-note");
  if (t >= 20.0) { note.classList.add("typing"); typed(note, "Security review first", seg(t, 20.0, 20.9), t); }
  else { note.classList.remove("typing"); note.textContent = "Add a note"; }

  // Spotter: 23.5 to 28.7, ⌘↩ at 25.0.
  const sp = $("#spotter");
  const sin = E.out(seg(t, 23.5, 23.85)), sout = E.in(seg(t, 28.4, 28.7));
  sp.style.opacity = t >= 23.5 && t < 28.7 ? sin * (1 - sout) : 0;
  sp.style.transform = `translateY(${(1 - sin) * -40 - sout * 40}px)`;
  sp.querySelector(".sp-them").style.opacity = E.out(seg(t, 23.9, 24.2));
  sp.querySelector(".sp-ans").style.opacity = t >= 25.05 ? 1 : 0;
  typed($("#sp-text"), "The rollout plan: forty seats, the week of the sixth, after the security review.", seg(t, 25.2, 26.5), t, t < 26.9);
  const k = $("#spkeys");
  k.style.opacity = vis(t, 24.5, 25.7, 0.2, 0.25);
  const kt = $$("#spkeys .t");
  kt[0].style.transform = `translateY(${on(t, 24.9, 25.4) * 10}px)`;
  kt[1].style.transform = `translateY(${on(t, 25.0, 25.4) * 10}px)`;

  // Wi-Fi drops at 28.8 and comes back at 30.0; the recording carries on.
  const down = on(t, 28.8, 30.0);
  $("#menubar .right > svg").style.opacity = down ? 0.3 : 1;
  $("#wifislash").style.opacity = down;

  // "The call ended. Saving in 10 s."
  const sv = $("#savecard");
  const svin = E.out(seg(t, 30.45, 30.75));
  sv.style.opacity = t >= 30.45 && t < 31.5 ? svin : 0;
  sv.style.transform = `translateX(${(1 - svin) * 30}px)`;
}

// --------------------------------------------------------------------- 02 dictation
function sceneDictation(t) {
  // 31.5 to 34.0: the fn keycap, full screen. Hard cuts in and out on the beat.
  const fh = $("#fnhero");
  fh.style.opacity = on(t, 31.5, 34.0);
  if (fh.style.opacity === "1") {
    const kin = E.out(seg(t, 31.5, 31.8));
    const key = fh.querySelector(".key");
    key.style.transform = `scale(${lerp(0.94, 1, kin)})`;
    const pressed = E.out(seg(t, 31.98, 32.04)) * (1 - E.out(seg(t, 32.5, 32.58)));
    fh.querySelector(".top").style.transform = `translateY(${pressed * 30}px)`;
    fh.querySelectorAll(".bars i").forEach((b, i) => (b.style.height = `${(10 + 56 * level(t + i * 0.11, i * 1.7)) * (0.15 + 0.85 * pressed)}px`));
    fh.querySelector(".bars").style.opacity = pressed;
    maskIn(fh.querySelector(".lines"), t, 31.55, { stagger: 0.47, dur: 0.4 });
  }

  // 34.0 to 37.0: email, doc, chat. Words land at the cursor; the island tracks it.
  const wins = [["#dw-email", "#dt-email", "Email", "Sending the pilot plan by Friday."],
    ["#dw-doc", "#dt-doc", "Doc", "Security review moves to Thursday."],
    ["#dw-chat", "#dt-chat", "Chat", "Sure. I’ll send the pricing notes tonight so you can read them before Thursday."]];
  wins.forEach(([w, txt, app, words], i) => {
    const s = 34.0 + i;
    const o = on(t, s, s + 1.0);
    show(w, o, `scale(${1 - 0.015 * (1 - E.out(seg(t, s, s + 0.2)))})`);
    const el = $(txt);
    if (t < s + 0.55) el.innerHTML = '<span class="caret"></span>';
    else el.innerHTML = esc(words) + '<span class="caret"></span>';
  });
  const isl = $("#island");
  if (t >= 34.0 && t < 38.5) {
    isl.style.opacity = 1;
    let w = 320, html = "";
    if (t < 37.0) {
      const i = Math.floor(t - 34.0), l = t - 34.0 - i;
      const app = ["Email", "Doc", "Chat"][i];
      if (l >= 0.1 && l < 0.55) { w = 560; html = `<span class="ic">${app[0]}</span>Listening · ${app}<span class="bars">${Array.from({ length: 6 }, (_, j) => `<i style="height:${5 + 13 * level(t + j * 0.09, j)}px"></i>`).join("")}</span>`; }
      else if (l >= 0.55) { w = 470; html = `<span class="ic">${app[0]}</span>Typed<span class="undo">Undo</span>`; }
    }
    isl.style.width = `${w}px`; isl.style.marginLeft = `${-w / 2}px`;
    isl.innerHTML = html;
  } else isl.style.opacity = 0;

  // 37.0 to 38.5: a password field. fn is held; nothing listens.
  show("#dw-pass", on(t, 37.0, 38.5));
  show("#pwkey", on(t, 37.0, 38.5));
  $("#pwkey .t").style.transform = `translateY(${on(t, 37.35, 38.3) * 9}px)`;

  // 38.5 to 41.0: Polished. The ums go in one frame, on the beat.
  const pol = $("#polish");
  show(pol, on(t, 38.5, 41.0) * E.out(seg(t, 38.5, 38.75)));
  pol.querySelector(".raw").style.opacity = t < 39.5 ? 1 : 0;
  pol.querySelector(".clean").style.opacity = t >= 39.5 ? 1 : 0;

  // 41.0 to 43.0: the three modes.
  const md = $("#modes");
  md.style.opacity = on(t, 41.0, 43.0);
  md.querySelectorAll(".mode").forEach((m, i) => {
    const p = E.out(seg(t, 41.0 + i * 0.25, 41.4 + i * 0.25));
    m.style.opacity = p; m.style.transform = `translateY(${(1 - p) * 26}px)`;
  });
  const tg = md.querySelector(".tag"); const tp = E.out(seg(t, 41.75, 42.1));
  tg.style.opacity = tp; tg.style.transform = `translateY(${(1 - tp) * 14}px)`;
}

// --------------------------------------------------------------------- 03 the app
function sceneApp(t) {
  const aw = $("#appwin");
  const ain = E.out(seg(t, 43.0, 43.4));
  aw.style.opacity = on(t, 43.0, 59.5) * ain;
  aw.style.transform = `scale(${lerp(0.97, 1, ain)})`;
  const ck = $("#cmdkeys");
  ck.style.opacity = on(t, 43.0, 59.5) * ain;
  const presses = [43.5, 50.0, 57.0];
  $$("#cmdkeys .t").forEach((k, i) => {
    const down = on(t, presses[i], presses[i] + 0.2);
    const active = [[43.5, 50.0], [50.0, 54.0], [57.0, 60]][i];
    k.style.transform = `translateY(${down * 10}px)`;
    k.style.background = t >= active[0] && t < active[1] ? "#f5f5f4" : "#2a2a2d";
    k.style.color = t >= active[0] && t < active[1] ? "#111" : "#fff";
  });
  if (t < 43.0 || t >= 59.5) return;

  const navOn = t < 50.0 ? "#nv-notes" : t < 54.0 ? "#nv-ask" : t < 57.0 ? "#nv-tasks" : "#nv-dict";
  for (const n of ["#nv-notes", "#nv-ask", "#nv-tasks", "#nv-dict"]) $(n).classList.toggle("on", n === navOn);

  // Notes list, then ⌘K, then the note.
  show("#pv-notes", t < 45.0 ? 1 : 1 - seg(t, 45.0, 45.15));
  const sr = $("#search");
  sr.style.opacity = vis(t, 44.0, 45.05, 0.15, 0.15);
  typed($("#search-q"), "Corvane", seg(t, 44.15, 44.6), t);
  $("#nl-hit").classList.toggle("hit", t >= 44.65);
  const note = $("#pv-note");
  show(note, t >= 45.0 && t < 50.0 ? E.out(seg(t, 45.0, 45.2)) * (1 - seg(t, 49.95, 50.0)) : 0);
  note.querySelectorAll(".r").forEach((r, i) => {
    const p = E.out(seg(t, 45.15 + i * 0.1, 45.45 + i * 0.1));
    r.style.opacity = p; r.style.transform = `translateY(${(1 - p) * 10}px)`;
  });

  // ⌘J: ask about this note, then play from the cited minute.
  const ap = $("#askp");
  const apIn = E.out(seg(t, 47.0, 47.3));
  ap.style.opacity = apIn; ap.style.transform = `translateY(${(1 - apIn) * 30}px)`;
  typed($("#askp-q"), "What did Marco need before the rollout?", seg(t, 47.3, 47.95), t, t < 48.05);
  typed($("#askp-a"), "For the security review to close first.", seg(t, 48.1, 48.5), t, false);
  const ci = E.out(seg(t, 48.6, 48.85));
  $("#askp-cite").style.opacity = ci;
  $("#askp-cite").style.transform = `scale(${on(t, 49.1, 49.22) ? 0.95 : lerp(0.9, 1, ci)})`;
  const wv = $("#askp-wave");
  const wvIn = E.out(seg(t, 49.15, 49.4));
  wv.style.opacity = wvIn; wv.style.height = `${54 * wvIn}px`; wv.style.marginTop = `${14 * wvIn}px`;
  wv.querySelectorAll("i").forEach((b, i) => {
    b.style.height = `${8 + 30 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6))}px`;
    b.style.background = i / 70 < lerp(0.4, 0.55, seg(t, 49.2, 50)) ? "rgb(180 171 224 / .9)" : "rgb(255 255 255 / .3)";
  });
  wv.querySelector(".ph").style.left = `${lerp(40, 55, seg(t, 49.2, 50.0))}%`;

  // ⌘2: Ask Lynkk across every note.
  show("#pv-ask", on(t, 50.0, 54.0) * E.out(seg(t, 50.0, 50.2)));
  typed($("#ask-q"), "What did we promise them?", seg(t, 50.3, 50.95), t, t < 51.05);
  $("#ask-q").style.opacity = t >= 50.25 ? 1 : 0;
  typed($("#ask-a"), "A pilot plan by Friday, after the security review.", seg(t, 51.1, 51.85), t, false);
  for (const [id, s] of [["#ask-c1", 52.05], ["#ask-c2", 52.3]]) { const p = E.out(seg(t, s, s + 0.25)); $(id).style.opacity = p; $(id).style.transform = `translateY(${(1 - p) * 10}px)`; }

  // Tasks: drag a card to Done, it drops where it is released; Send makes an issue.
  show("#pv-tasks", on(t, 54.0, 57.0) * E.out(seg(t, 54.0, 54.2)));
  const dc = $("#dragcard");
  let [cx, cy] = path(CURSOR[3].pts, t);
  if (t < 54.42) [cx, cy] = T.src; else if (t >= 55.0) [cx, cy] = T.slot;
  const lift = t >= 54.42 && t < 55.0 ? 1 : 0;
  const settle = 1 - E.out(seg(t, 55.0, 55.15));
  dc.style.left = `${cx - T.pane[0] - dc.offsetWidth / 2}px`;
  dc.style.top = `${cy - T.pane[1] - dc.offsetHeight / 2 + (t >= 55.0 ? -4 * settle : 0)}px`;
  dc.style.transform = `rotate(${lift ? -2.5 : 0}deg) scale(${lift ? 1.04 : 1})`;
  dc.style.background = lift ? "#2f2f33" : "#26262a";
  const pop = $("#pop");
  pop.style.left = `${T.send[0] - T.pane[0] - 290}px`; pop.style.top = `${T.send[1] - T.pane[1] + 28}px`;
  const pp = E.out(seg(t, 55.95, 56.2));
  pop.style.opacity = pp; pop.style.transform = `translateY(${(1 - pp) * 10}px)`;
  $("#pop-done").style.opacity = t >= 56.35 ? 1 : 0;
  $("#send-btn").style.transform = `scale(${on(t, 55.85, 55.97) ? 0.92 : 1})`;

  // ⌘3: dictation history.
  show("#pv-dict", on(t, 57.0, 59.5) * E.out(seg(t, 57.0, 57.2)));
  $$("#pv-dict .stat, #pv-dict .hist div").forEach((r, i) => {
    const p = E.out(seg(t, 57.15 + i * 0.1, 57.45 + i * 0.1));
    r.style.opacity = p; r.style.transform = `translateY(${(1 - p) * 10}px)`;
  });
}

// --------------------------------------------------------------------- 04 wall, 05 install, 06 lockup
function sceneEnd(t) {
  const ws = $("#wallsc");
  ws.style.opacity = on(t, 59.5, 68.5);
  if (t >= 59.5 && t < 68.5) {
    ws.querySelectorAll(".wt").forEach((el, i) => {
      const p = E.out(seg(t, 59.5 + i * 0.5, 59.85 + i * 0.5));
      el.style.opacity = p; el.style.transform = `translateY(${(1 - p) * 24}px)`;
    });
  }

  // Install: drag to Applications, try your voice, the facts stamp in.
  const dmg = $("#dmg");
  dmg.style.opacity = on(t, 68.5, 69.75) * E.out(seg(t, 68.5, 68.7)) * (1 - seg(t, 69.6, 69.75));
  const app = $("#dmg-app");
  if (t >= 68.77 && t < 69.5) {
    const [x, y] = path(CURSOR[4].pts, t);
    app.style.transform = `translate(${x - T.dmgApp[0]}px, ${y - T.dmgApp[1]}px) scale(0.92)`;
    app.style.opacity = 0.85;
  } else if (t >= 69.5) { app.style.transform = `translate(${T.folder[0] - T.dmgApp[0]}px, ${T.folder[1] - T.dmgApp[1]}px) scale(0)`; app.style.opacity = 0; }
  else { app.style.transform = "none"; app.style.opacity = 1; }
  $("#dmg-folder").style.transform = `scale(${1 + 0.06 * (1 - seg(t, 69.5, 69.7)) * on(t, 69.5, 69.7)})`;
  const tv = $("#tryvoice"); const tvi = E.out(seg(t, 69.75, 70.0));
  tv.style.opacity = on(t, 69.75, 71.5) * tvi; tv.style.transform = `translateY(${(1 - tvi) * 20}px)`;
  $("#tv-said").innerHTML = t >= 70.3 ? "Send the notes after the call." : '<span class="caret"></span>';
  $("#tv-ok").style.opacity = t >= 70.8 ? 1 : 0;
  const st = $("#stamps"); st.style.opacity = on(t, 69.5, 71.5);
  st.querySelectorAll("span").forEach((s, i) => { const p = E.out(seg(t, 69.5 + i * 0.5, 69.75 + i * 0.5)); s.style.opacity = p; s.style.transform = `scale(${lerp(1.15, 1, p)})`; });
  show("#signed", on(t, 69.85, 71.5) * E.out(seg(t, 69.85, 70.15)));

  // Lockup on ember: the mark lands on the final hit at 72.0.
  const em = $("#ember");
  em.style.opacity = E.out(seg(t, 71.5, 71.8));
  if (t >= 71.5) {
    em.querySelector(".plate").style.transform = `scale(${lerp(1.0, 1.05, seg(t, 71.5, 78))})`;
    const lk = em.querySelector(".lock"); const lp = E.out(seg(t, 71.7, 72.05));
    lk.style.opacity = lp; lk.style.transform = `scale(${lerp(0.92, 1, lp)})`;
    maskIn(em.querySelector(".hl"), t, 72.1, { stagger: 0.16, dur: 0.6 });
    const c = E.out(seg(t, 72.9, 73.2)); const cta = em.querySelector(".cta");
    cta.style.opacity = c; cta.style.transform = `translateY(${(1 - c) * 14}px)`;
    em.querySelector(".fine").style.opacity = E.out(seg(t, 73.2, 73.5));
    $("#fadeout").style.opacity = seg(t, 77.5, 78.0);
  }
}

// --------------------------------------------------------------------- captions and cursor
function sceneCaptions(t) {
  CAPS.forEach((c, i) => {
    const el = $(`#cap${i}`);
    if (t < c.t0 - 0.05 || t > c.t1 + 0.05) { el.style.opacity = 0; return; }
    maskIn(el, t, c.t0, { stagger: 0.1, dur: 0.5, outAt: c.t1 - 0.28, outDur: 0.26 });
  });
  // Caption 2 counts the call apps up to 7, one per 16th.
  const n = $("#appcount"); if (n) n.textContent = String(clamp(Math.floor((t - 15.6) / 0.125) + 1, 1, 7));
  const ch = CHAPTERS.find(([a, b]) => t >= a && t < b);
  const eb = $("#ch-eb");
  if (ch) { $("#ch-eb-t").textContent = ch[2]; eb.style.opacity = vis(t, ch[0], ch[1], 0.3, 0.2); }
  else eb.style.opacity = 0;
}

function sceneCursor(t) {
  const cur = $("#cur");
  const s = CURSOR.find((c) => t >= c.vis[0] && t < c.vis[1]);
  if (!s) { cur.style.opacity = 0; return; }
  const [x, y] = path(s.pts, t);
  const pressed = (s.press || []).some((p) => t >= p && t < p + 0.12) || (s.hold && t >= s.hold[0] && t < s.hold[1]);
  cur.style.opacity = vis(t, s.vis[0], s.vis[1], 0.12, 0.15);
  cur.style.transform = `translate(${x - 4}px, ${y - 4}px) scale(${pressed ? 0.86 : 1})`;
}

window.renderScenes = function (t) {
  sceneCalls(t);
  sceneDictation(t);
  sceneApp(t);
  sceneEnd(t);
  sceneCaptions(t);
  sceneCursor(t);
};
