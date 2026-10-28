// Copy and claims check for a post file.
//   node scripts/check.mjs posts/my-post/post.html
// Errors break the rules in docs/COPY.md or docs/TRUTHS.md and must be fixed.
// Warnings need a human look. render.mjs runs this too.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// [pattern, message]. Patterns run on the visible text unless noted.
// Written as an escape so this file passes its own check.
const EM_DASH = /\u2014/;

const ERRORS = [
  [EM_DASH, "Em dash (U+2014). Use a comma, colon, period, or 'and'."],
  [/\s\u2013\s/, "En dash used as a dash. Rewrite the sentence."],
  [/\bTODO\b/, "Placeholder text left in (TODO)."],
  [/\b(otter|fireflies|fathom|gong|granola|tl;?dv|read\.ai|avoma|krisp|wispr|superwhisper|zoom ai companion|copilot|gemini)\b/i,
    "Competitor or other AI product named. Keep the comparison generic ('a typical notetaker'). See docs/COPY.md."],
  [/\b(iphone|ipad|android|ios app|mobile app|phone app|play store|app store)\b/i, "Phones are not supported. No phone or mobile app claims."],
  [/\d+(\.\d+)?\s*%\s*(accura|accurate|precision)|accura\w*\s+(of|at)\s+\d/i, "Accuracy percentages are not claimed."],
  [/\b(crm|salesforce|hubspot|pipedrive)\b/i, "There is no CRM integration."],
  [/[$€£₹]\s?\d/, "Do not print prices."],
  [/\b(20|15\+|16|19|30|50|100)\+?\s+languages\b/i, "Language count is 17 for meeting transcription (13 + 4 in beta) or 18 for Mac dictation."],
  [/\b(speaks? (up|when|in the)|answers? out loud|talks back|joins and answers|by voice)\b/i, "Lynkk does not speak in meetings."],
  [/\b(your region|pick a region|choose (a|your) region|data residency|region[- ]pinned|stays in your country)\b/i, "No region or residency claim. There is no region setting."],
  [/\b(knowledge graph|graph view|browse the graph)\b/i, "No graph screen exists. Say 'Ask across your notes' instead."],
  [/\b(automatic(ally)?\s+(creates?|syncs?|files?|sends?)\s+\w*\s*(jira|tickets?|issues?)|auto[- ]?sync)/i, "Jira send is manual, from the note. Not automatic."],
  [/\b(asana|linear|trello|clickup|monday\.com|notion sync|hubspot)\b/i, "Only Jira (and Google/Outlook calendar from Ask) are integrations for tasks."],
  [/\b(team-?wide (memory|ask)|one memory for (the|your) (whole )?team|teammates'? notes)\b/i, "Ask only answers from your own notes."],
  [/\b(summar(y|ies) (posted|sent) to slack|slack digest|reads? your (slack )?channels)\b/i, "Slack only answers questions; it does not post summaries or read channels."],
];

const WARNINGS = [
  [/\boffline\b/i, "'Offline': only true as 'the Mac app saves to disk and uploads when you are back'. No offline web recording."],
  [/\bunlimited\b/i, "'Unlimited': plan limits are in flux. Check docs/TRUTHS.md > Plans before using."],
  [/\bno credit card\b/i, "'No credit card': fine for the Free plan, but keep it off anything implying a trial. There is no trial."],
  [/\bfree trial\b/i, "There is no free trial. Say 'Start free' or 'Free plan'."],
  [/\b(soc ?2|hipaa|iso ?27001|aes-?256|gdpr[- ]compliant|end-to-end encrypt)/i, "Compliance or encryption claim. Not verified; needs sign-off."],
  [/\b(not just|isn'?t just|more than just)\b/i, "'Not just X' cadence reads as machine-written."],
  [/\b(seamless(ly)?|supercharge|revolutioni[sz]e|game[- ]?chang|unlock|effortless(ly)?|elevate|empower|delve|cutting[- ]edge|next[- ]level)\b/i, "Marketing filler. Say what the product does."],
  [/!/, "Exclamation mark. The voice is calm."],
  [/\b(customers?|teams?) (love|trust)|trusted by|\d+[kK]?\+? (users|teams|companies)\b/i, "Social proof needs a real, approved source."],
  [/\b(\d+\s?s|seconds?) (to|from)\b/i, "Timing claim. Only use timings listed in docs/TRUTHS.md."],
];

// Checks on the raw source (styles), not the visible text.
const SOURCE_WARNINGS = [
  [/box-shadow\s*:(?!\s*none)/i, "box-shadow: Grid has no shadows."],
  [/font-family\s*:(?![^;]*var\(--gr-font\))/i, "font-family: posts use Inter only (it is already set)."],
  [/font-weight\s*:\s*(600|700|800|900|bold|300|200|100)/i, "font-weight: Inter 400 and 500 only. No bold, no light."],
  [/linear-gradient\((?![^)]*var\(--gr-ink\))/i, "Gradient: colour comes from photo plates, not CSS gradients."],
];

export function visibleText(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/\s+/g, " ");
}

export function lint(html) {
  const allow = (html.match(/<meta\s+name="lynkk-allow"\s+content="([^"]*)"/i)?.[1] ?? "").split(/[,\s]+/);
  const text = visibleText(html);
  const styles = [...html.matchAll(/<style[\s\S]*?<\/style>|style="[^"]*"/gi)].map((m) => m[0]).join("\n");
  const errors = [];
  const warnings = [];
  const hit = (re, src) => {
    const m = src.match(re);
    if (!m) return null;
    const i = m.index ?? 0;
    return src.slice(Math.max(0, i - 40), i + m[0].length + 40).trim();
  };
  for (const [re, msg] of ERRORS) {
    if (allow.includes("competitors") && msg.startsWith("Competitor")) continue;
    // Em dashes are banned in the whole file, comments included.
    const ctx = re === EM_DASH ? hit(re, html) : hit(re, text);
    if (ctx) errors.push(`${msg}\n      ...${ctx}...`);
  }
  for (const [re, msg] of WARNINGS) {
    const ctx = hit(re, text);
    if (ctx) warnings.push(`${msg}\n      ...${ctx}...`);
  }
  for (const [re, msg] of SOURCE_WARNINGS) {
    const ctx = hit(re, styles);
    if (ctx) warnings.push(`${msg}\n      ...${ctx}...`);
  }
  const accents = (html.match(/class="[^"]*\bbtn-accent\b/g) ?? []).length;
  if (accents > 1) warnings.push(`${accents} violet buttons. Violet is a label: one accent button per carousel at most.`);
  const hexes = [...styles.matchAll(/#[0-9a-f]{3,8}\b/gi)].map((m) => m[0]);
  if (hexes.length) warnings.push(`Raw colours in styles (${[...new Set(hexes)].join(", ")}). Use --gr-* tokens.`);
  return { errors, warnings };
}

export function report(file, { errors, warnings }) {
  const name = path.relative(process.cwd(), file);
  for (const e of errors) console.log(`  \x1b[31mERROR\x1b[0m ${e}`);
  for (const w of warnings) console.log(`  \x1b[33mwarn\x1b[0m  ${w}`);
  if (!errors.length && !warnings.length) console.log(`  copy check clean: ${name}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const files = process.argv.slice(2);
  if (!files.length) {
    console.log("usage: node scripts/check.mjs posts/<name>/post.html [...more]");
    process.exit(2);
  }
  let failed = false;
  for (const f of files) {
    const target = fs.statSync(f).isDirectory() ? path.join(f, "post.html") : f;
    console.log(`\n${target}`);
    const r = lint(fs.readFileSync(target, "utf8"));
    report(target, r);
    failed ||= r.errors.length > 0;
  }
  process.exit(failed ? 1 : 0);
}
