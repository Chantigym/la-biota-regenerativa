// Build para GitHub Pages: castellano en /<repo>/ e inglés en /<repo>/en/.
// Uso: node scripts/build-pages.mjs  (deja todo en out/)
import { execSync } from "node:child_process";
import { existsSync, renameSync, rmSync } from "node:fs";

const ROOT = "/la-biota-regenerativa";
const build = (env) =>
  execSync("npx next build", { stdio: "inherit", env: { ...process.env, ...env, NEXT_PUBLIC_SITE_ROOT: ROOT } });

rmSync("out-en", { recursive: true, force: true });
build({ NEXT_PUBLIC_LOCALE: "en", NEXT_PUBLIC_BASE_PATH: `${ROOT}/en` });
renameSync("out", "out-en");
build({ NEXT_PUBLIC_LOCALE: "es", NEXT_PUBLIC_BASE_PATH: ROOT });
if (existsSync("out/en")) rmSync("out/en", { recursive: true, force: true });
renameSync("out-en", "out/en");
console.log("Listo: out/ (es) y out/en/ (en)");
