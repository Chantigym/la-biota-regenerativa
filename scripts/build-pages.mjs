// Build para GitHub Pages: castellano en /<repo>/ e inglés en /<repo>/en/.
// Uso: node scripts/build-pages.mjs  (deja todo en out/)
import { execSync } from "node:child_process";
import { cpSync, existsSync, rmSync } from "node:fs";

// copiar y borrar en lugar de renombrar: en Windows la carpeta puede quedar bloqueada por un rato
const move = (from, to) => {
  cpSync(from, to, { recursive: true });
  rmSync(from, { recursive: true, force: true, maxRetries: 5, retryDelay: 400 });
};

const ROOT = "/la-biota-regenerativa";
const build = (env) =>
  execSync("npx next build", { stdio: "inherit", env: { ...process.env, ...env, NEXT_PUBLIC_SITE_ROOT: ROOT } });

rmSync("out-en", { recursive: true, force: true });
build({ NEXT_PUBLIC_LOCALE: "en", NEXT_PUBLIC_BASE_PATH: `${ROOT}/en` });
move("out", "out-en");
build({ NEXT_PUBLIC_LOCALE: "es", NEXT_PUBLIC_BASE_PATH: ROOT });
if (existsSync("out/en")) rmSync("out/en", { recursive: true, force: true });
move("out-en", "out/en");
console.log("Listo: out/ (es) y out/en/ (en)");
