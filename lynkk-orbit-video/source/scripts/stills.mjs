// Renders stills for both formats from one bundle and tiles them into a sheet.
// node scripts/stills.mjs <name> <frame> [frame ...]   (env FMT=reel|post|both)
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";

const [name, ...frames] = process.argv.slice(2);
const fmts = (process.env.FMT ?? "both") === "both" ? ["Reel", "Post"] : [process.env.FMT === "post" ? "Post" : "Reel"];
const root = path.resolve(import.meta.dirname, "..");
mkdirSync(`${root}/out/stills`, { recursive: true });
const serveUrl = await bundle({ entryPoint: `${root}/src/index.tsx`, publicDir: `${root}/public` });
for (const id of fmts) {
  const browserExecutable = process.env.REMOTION_BROWSER ?? null;
  const composition = await selectComposition({ serveUrl, id, browserExecutable });
  const files = [];
  for (const fr of frames.map(Number)) {
    const output = `${root}/out/stills/${id.toLowerCase()}-${fr}.png`;
    await renderStill({ serveUrl, composition, frame: fr, output, scale: 0.5, browserExecutable });
    files.push(output);
  }
  const sheet = `${root}/out/stills/sheet-${name}-${id.toLowerCase()}.png`;
  const args = files.flatMap((f) => ["-i", f]);
  execFileSync("ffmpeg", ["-loglevel", "error", "-y", ...args, "-filter_complex", `${files.map((_, i) => `[${i}]`).join("")}hstack=${files.length}`, sheet]);
  console.log(sheet);
}
