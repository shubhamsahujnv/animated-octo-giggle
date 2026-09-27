// Starts the production server built by `npm run build`.
// Loads .env when present (works on Node 20.12+ as well as 22+).
import { existsSync } from "node:fs";

if (existsSync(".env")) process.loadEnvFile(".env");

if (!existsSync(".output/server/index.mjs")) {
  console.error("No build found. Run `npm run build` first, then `npm start`.");
  process.exit(1);
}

await import("./.output/server/index.mjs");
