// Render every <section class="post"> in a post file to PNG.
//   node scripts/render.mjs posts/my-post              (reads posts/my-post/post.html)
//   node scripts/render.mjs posts/my-post --only s2,s3 (just those slide ids)
//   node scripts/render.mjs posts/my-post --pdf        (also a PDF carousel, one slide per page)
//   node scripts/render.mjs gallery/index.html         (any html file works)
//   --scale 1   export at 1x instead of 2x
//   --force     render even if the copy check finds errors
//
// Output: <folder>/out/<slide-id>.png. It also checks every slide for content
// that overflows its board or is clipped by a plate, and for text that is too
// small to read on a phone. Exit code 1 means something needs fixing.
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { lint, report } from "./check.mjs";

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : undefined; };
const target = args.find((a, i) => !a.startsWith("--") && !["--only", "--scale"].includes(args[i - 1]));
if (!target) {
  console.log("usage: node scripts/render.mjs posts/<name> [--only s1,s2] [--pdf] [--scale 1] [--force]");
  process.exit(2);
}
const file = path.resolve(fs.statSync(target).isDirectory() ? path.join(target, "post.html") : target);
const outDir = path.join(path.dirname(file), "out");
const only = opt("only")?.split(",").map((s) => s.trim());
const scale = Number(opt("scale") ?? 2);

console.log(`\n${path.relative(process.cwd(), file)}`);
const copy = lint(fs.readFileSync(file, "utf8"));
report(file, copy);
if (copy.errors.length && !flag("force")) {
  console.log("\nCopy check failed. Fix the errors above (or pass --force to render anyway).");
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1800, height: 2000 }, deviceScaleFactor: scale });
const pageWarnings = [];
page.on("console", (m) => { if (["warning", "error"].includes(m.type())) pageWarnings.push(m.text()); });
page.on("pageerror", (e) => pageWarnings.push(String(e)));
page.on("requestfailed", (r) => pageWarnings.push(`failed to load ${r.url()}`));

await page.goto(`file://${file}`, { waitUntil: "networkidle" });
await page.waitForFunction(() => document.documentElement.dataset.ready === "1", null, { timeout: 5000 })
  .catch(() => pageWarnings.push("kit/post.js did not run. Is <script src=\"../../kit/post.js\"></script> at the end of <body>?"));
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(150);

// Layout audit, run in the page.
const audit = await page.evaluate(() => {
  const describe = (el) => {
    const cls = [...el.classList].slice(0, 2).join(".");
    const txt = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40);
    return `<${el.tagName.toLowerCase()}${cls ? "." + cls : ""}>${txt ? ` "${txt}"` : ""}`;
  };
  return [...document.querySelectorAll("section.post")].map((post, i) => {
    const id = post.id || `slide-${i + 1}`;
    const issues = [];
    const body = post.querySelector(".post-body");
    if (!body) return { id, issues: ["no .post-body"] };
    const cs = getComputedStyle(body);
    const b = body.getBoundingClientRect();
    const box = { top: b.top + parseFloat(cs.paddingTop), bottom: b.bottom - parseFloat(cs.paddingBottom) + 2,
      left: b.left + parseFloat(cs.paddingLeft) - 2, right: b.right - parseFloat(cs.paddingRight) + 2 };
    if (body.scrollHeight > body.clientHeight + 1)
      issues.push(`content is ${body.scrollHeight - body.clientHeight}px taller than the slide. Cut copy or shrink a block.`);
    const seen = new Set();
    for (const el of body.querySelectorAll("*")) {
      if (el.closest(".gr-rings") || el.closest("svg")) continue;
      const plate = el.parentElement?.closest(".plate");
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      if (plate) {
        const p = plate.getBoundingClientRect();
        if (r.bottom > p.bottom + 2 || r.right > p.right + 2 || r.top < p.top - 2 || r.left < p.left - 2) {
          const key = describe(plate) + "clip";
          if (!seen.has(key)) { seen.add(key); issues.push(`${describe(el)} is clipped by its plate. Make the plate taller or the card shorter.`); }
        }
        continue;
      }
      if (r.bottom > box.bottom || r.right > box.right || r.left < box.left) {
        issues.push(`${describe(el)} runs outside the slide's margins.`);
        if (issues.length > 6) break;
      }
    }
    // Readability: text a reader needs, under 20px on the band or 15px in a mock.
    for (const el of body.querySelectorAll("*")) {
      if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
      const size = parseFloat(getComputedStyle(el).fontSize);
      const inMock = el.closest(".glass, .window, .plate");
      if (size < (inMock ? 15 : 20)) { issues.push(`${describe(el)} is ${size}px. Too small to read on a phone.`); break; }
    }
    // Headline or copy sitting on the outside of the column is a sign the body is overfull.
    return { id, issues, w: post.offsetWidth, h: post.offsetHeight };
  });
});

fs.mkdirSync(outDir, { recursive: true });
let problems = 0;
for (const [index, { id, issues, w, h }] of audit.entries()) {
  if (only && !only.includes(id)) continue;
  const png = path.join(outDir, `${id}.png`);
  await page.locator("section.post").nth(index).screenshot({ path: png });
  console.log(`  wrote ${path.relative(process.cwd(), png)}  (${w}x${h} @${scale}x)`);
  for (const i of issues) { console.log(`    \x1b[31mLAYOUT\x1b[0m ${i}`); problems++; }
}
for (const w of new Set(pageWarnings)) { console.log(`  \x1b[33mpage\x1b[0m  ${w}`); }

if (flag("pdf")) {
  const { w, h } = audit[0];
  await page.addStyleTag({ content: `@page { size: ${w}px ${h}px; margin: 0 }
    html, body { background: none !important } body { display: block !important; padding: 0 !important }
    section.post { break-after: page }` });
  const pdf = path.join(outDir, "carousel.pdf");
  await page.pdf({ path: pdf, width: `${w}px`, height: `${h}px`, printBackground: true });
  console.log(`  wrote ${path.relative(process.cwd(), pdf)}`);
}

await browser.close();
if (problems) {
  console.log(`\n${problems} layout problem(s). Open the PNGs, fix, and render again.`);
  process.exit(1);
}
console.log("\nDone. Look at every PNG before you call it finished.");
