// Fails on anything a viewer could read that breaks docs/COPY.md: em dashes in
// strings and JSX text, and words that should never ship. Comments are skipped.
// node scripts/check-copy.mjs  (run from the film folder)
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const files = [];
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = path.join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|mts)$/.test(f) && !p.includes(`${path.sep}brand${path.sep}`)) files.push(p);
  }
};
walk(path.join(root, "src"));
for (const f of ["CREDITS.md", "out/CREDITS_description.txt", "CAPTION.md"]) if (existsSync(path.join(root, f))) files.push(path.join(root, f));

const BANNED = [/\bseamless(ly)?\b/i, /\brevolutioni[sz]e/i, /\bgame[- ]chang/i, /\bsupercharg/i, /\bunlock\b/i, /\$\d+\s*\/\s*mo/i];
let bad = 0;
for (const f of files) {
  const md = f.endsWith(".md") || f.endsWith(".txt");
  let inBlock = false;
  readFileSync(f, "utf8").split("\n").forEach((line, i) => {
    let code = line;
    if (!md) {
      if (inBlock) {
        if (code.includes("*/")) { inBlock = false; code = code.slice(code.indexOf("*/") + 2); } else return;
      }
      if (/^\s*\/\*/.test(code) && !code.includes("*/")) { inBlock = true; return; }
      if (/^\s*(\/\/|\*)/.test(code)) return;
      code = code.replace(/\/\*.*?\*\//g, "").replace(/\s\/\/.*$/, "").replace(/\{\/\*.*?\*\/\}/g, "");
    }
    const hits = [];
    if (code.includes("—")) hits.push("em dash");
    for (const b of BANNED) if (b.test(code)) hits.push(`banned word ${b}`);
    if (hits.length) {
      bad++;
      console.log(`${path.relative(root, f)}:${i + 1}: ${hits.join(", ")}\n    ${line.trim().slice(0, 140)}`);
    }
  });
}
console.log(bad ? `\n${bad} copy problem(s). Fix them before rendering.` : `copy check: clean (${files.length} files)`);
process.exit(bad ? 1 : 0);
