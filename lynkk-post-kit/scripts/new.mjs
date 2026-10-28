// Start a new post from the skeleton.
//   node scripts/new.mjs launch-week                    5 portrait slides
//   node scripts/new.mjs launch-week --slides 3 --size square
// Sizes: portrait 1080x1350 (default, Instagram and LinkedIn feed), square 1080x1080,
// story 1080x1920, wide 1600x900 (X, LinkedIn link image), linkedin 1200x1200.
// Writes posts/<name>/post.html and posts/<name>/captions.md. Every TODO must be
// replaced before render.mjs will export.
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : d; };
const name = args.find((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--"));
if (!name || !/^[a-z0-9-]+$/.test(name)) {
  console.log("usage: node scripts/new.mjs <kebab-name> [--slides 5] [--size portrait|square|story|wide|linkedin]");
  process.exit(2);
}
const n = Math.max(1, Math.min(10, Number(opt("slides", 5))));
const size = opt("size", "portrait");
if (!["portrait", "square", "story", "wide", "linkedin"].includes(size)) { console.log(`unknown size ${size}`); process.exit(2); }

const dir = path.join("posts", name);
if (fs.existsSync(dir)) { console.log(`${dir} already exists`); process.exit(1); }
fs.mkdirSync(dir, { recursive: true });

const pad = (i) => String(i).padStart(2, "0");
const next = (i) => (n === 1 ? "" : i === 1 ? "Swipe" : i === n - 1 ? "Last one" : i === n ? "Follow for more" : "Keep swiping");
const count = (i) => (n === 1 ? "" : `${pad(i)} / ${pad(n)}`);

const cover = (i) => `
<!-- ${pad(i)} · cover: quiet eyebrow, the display line in two inks, one supporting block, a lead. -->
<section class="post" id="s${i}" data-size="${size}" data-count="${count(i)}" data-next="${next(i)}">
  <main class="post-body" data-dots>
    <span class="eyebrow" data-tone="quiet">TODO eyebrow</span>
    <h1 class="t-display">TODO first half. <span class="ink-2">TODO second half.</span></h1>
    <div class="stages mt-l">
      <figure class="stage">
        <div class="plate plate-ember" data-rings>
          <div class="glass">
            <div class="glass-title">TODO</div>
            <div class="glass-body">
              <div class="m-row"><span class="m-k">TODO</span>TODO</div>
              <div class="m-row"><span class="m-k">TODO</span>TODO</div>
            </div>
          </div>
        </div>
        <figcaption><span>TODO</span><span class="ink-2">TODO</span></figcaption>
      </figure>
    </div>
    <p class="t-lead mt-auto">TODO what it means. <b>TODO the Lynkk line.</b></p>
  </main>
</section>`;

const middle = [
  (i) => `
<!-- ${pad(i)} · rows: eyebrow, h2, three icon rows. -->
<section class="post" id="s${i}" data-size="${size}" data-count="${count(i)}" data-next="${next(i)}">
  <main class="post-body">
    <span class="eyebrow">TODO eyebrow</span>
    <h2 class="t-h2">TODO statement. <span class="ink-2">TODO turn.</span></h2>
    <div class="rows mt-l">
      <div class="row"><span class="icon-chip" data-c="orange"><i data-icon="mic"></i></span>
        <div><p class="row-t">TODO</p><p class="row-b">TODO</p></div></div>
      <div class="row"><span class="icon-chip" data-c="lavender"><i data-icon="list-checks"></i></span>
        <div><p class="row-t">TODO</p><p class="row-b">TODO</p></div></div>
      <div class="row"><span class="icon-chip" data-c="violet"><i data-icon="lock"></i></span>
        <div><p class="row-t">TODO</p><p class="row-b">TODO</p></div></div>
    </div>
  </main>
</section>`,
  (i) => `
<!-- ${pad(i)} · scene + cells: a plate with one glass card, then ruled facts. -->
<section class="post" id="s${i}" data-size="${size}" data-count="${count(i)}" data-next="${next(i)}">
  <main class="post-body">
    <span class="eyebrow">TODO eyebrow</span>
    <h2 class="t-h2">TODO statement. <span class="ink-2">TODO turn.</span></h2>
    <div class="plate plate-meadow scene mt-l" data-rings>
      <div class="glass">
        <div class="glass-title">TODO</div>
        <div class="glass-body">
          <div class="m-option"><span class="m-radio on"></span><span>TODO</span><span class="m-chip">TODO</span></div>
          <div class="m-option"><span class="m-radio"></span><span>TODO</span></div>
        </div>
      </div>
    </div>
    <div class="cells mt-l">
      <div class="cell"><p class="cell-t">TODO</p><p class="cell-b">TODO</p></div>
      <div class="cell"><p class="cell-t">TODO</p><p class="cell-b">TODO</p></div>
    </div>
  </main>
</section>`,
  (i) => `
<!-- ${pad(i)} · compare: generic other side on the left, Lynkk raised on the right. -->
<section class="post" id="s${i}" data-size="${size}" data-count="${count(i)}" data-next="${next(i)}">
  <main class="post-body">
    <span class="eyebrow">TODO eyebrow</span>
    <h2 class="t-h2">TODO statement. <span class="ink-2">TODO turn.</span></h2>
    <div class="compare mt-l">
      <div class="row head"><span></span><span>A typical notetaker</span><span class="us"><span class="tile"><i data-mark></i></span>Lynkk</span></div>
      <div class="row"><span>TODO</span><span>TODO</span><span class="us">TODO</span></div>
      <div class="row"><span>TODO</span><span>TODO</span><span class="us">TODO</span></div>
      <div class="row"><span>TODO</span><span>TODO</span><span class="us">TODO</span></div>
    </div>
  </main>
</section>`,
];

const cta = (i) => `
<!-- ${pad(i)} · CTA: one ember plate, tag, display line, sub, one button, three facts. -->
<section class="post" id="s${i}" data-size="${size}" data-count="${count(i)}" data-next="${next(i)}">
  <main class="post-body">
    <div class="plate plate-ember cta" data-rings>
      <span class="cta-tag">Start free</span>
      <h2 class="t-display">TODO closing line.</h2>
      <p class="cta-sub">TODO one sentence of what Lynkk does.</p>
      <span class="btn">Try it free at lynkk.ai</span>
      <div class="facts">
        <div class="fact"><span class="fact-t">TODO</span><span class="fact-b">TODO</span></div>
        <div class="fact"><span class="fact-t">TODO</span><span class="fact-b">TODO</span></div>
        <div class="fact"><span class="fact-t">TODO</span><span class="fact-b">TODO</span></div>
      </div>
    </div>
  </main>
</section>`;


// Wide slides are 900 tall: copy on the left, the scene on the right.
const wideSlide = (i, { eyebrow = "TODO eyebrow", quiet = false, plate = "ember", dots = false, h = "t-h2" } = {}) => `
<!-- ${pad(i)} · split: copy left, one glass card on a plate right. -->
<section class="post" id="s${i}" data-size="wide" data-count="${count(i)}" data-next="${next(i)}">
  <main class="post-body"${dots ? " data-dots" : ""}>
    <div class="split">
      <div>
        <span class="eyebrow"${quiet ? ' data-tone="quiet"' : ""}>${eyebrow}</span>
        <h2 class="${h}">TODO statement. <span class="ink-2">TODO turn.</span></h2>
        <p class="t-lead mt-m">TODO one line.</p>
      </div>
      <div class="plate plate-${plate} scene" data-rings>
        <div class="glass" data-size="l">
          <div class="glass-title">TODO</div>
          <div class="glass-body">
            <div class="m-row"><span class="m-k">TODO</span>TODO</div>
            <div class="m-row"><span class="m-k">TODO</span>TODO</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</section>`;

const wideCta = (i) => `
<!-- ${pad(i)} · CTA, wide: the ember plate with the line and one button. -->
<section class="post" id="s${i}" data-size="wide" data-count="${count(i)}" data-next="${next(i)}">
  <main class="post-body">
    <div class="plate plate-ember cta" data-rings style="padding: 48px">
      <span class="cta-tag">Start free</span>
      <h2 class="t-display" style="margin-top: 28px">TODO closing line.</h2>
      <p class="cta-sub" style="margin-top: 20px">TODO one sentence of what Lynkk does.</p>
      <span class="btn" style="margin-top: 32px">Try it free at lynkk.ai</span>
    </div>
  </main>
</section>`;

const slides = [];
for (let i = 1; i <= n; i++) {
  if (size === "wide") {
    const plates = ["sky", "meadow", "dusk", "night", "field"];
    if (i === n && n > 1) slides.push(wideCta(i));
    else slides.push(wideSlide(i, i === 1 ? { quiet: true, dots: true, h: "t-display", plate: "ember" } : { plate: plates[(i - 2) % plates.length] }));
  } else if (i === 1) slides.push(cover(i));
  else if (i === n) slides.push(cta(i));
  else slides.push(middle[(i - 2) % middle.length](i));
}

fs.writeFileSync(path.join(dir, "post.html"), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${name} · Lynkk post</title>
<link rel="stylesheet" href="../../kit/post.css" />
<!-- Slide-specific CSS goes here, only when no kit block fits. Tokens only (var(--gr-*)), no hex. -->
<style></style>
</head>
<body>
${slides.join("\n")}

<script src="../../kit/post.js"></script>
</body>
</html>
`);

fs.writeFileSync(path.join(dir, "captions.md"), `# ${name}

Size: ${size}. ${n} slide(s). Render: \`node scripts/render.mjs posts/${name}${n > 1 ? " --pdf" : ""}\`

## Caption (Instagram)

TODO

## Caption (LinkedIn)

TODO

## Alt text

${Array.from({ length: n }, (_, i) => `${i + 1}. TODO`).join("\n")}
`);

console.log(`created ${dir}/post.html and ${dir}/captions.md
next: replace every TODO, then  node scripts/render.mjs ${dir}${n > 1 ? " --pdf" : ""}`);
