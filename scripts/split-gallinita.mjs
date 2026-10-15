// Separa la gallinita (assets/gallinita-color.png, 232×391) en capas para animarla cuadro a cuadro:
// cabeza (con cuello), cuerpo y las dos patas. Las capas se superponen unos px para que no se vean cortes.
import sharp from "sharp";
import { mkdirSync, readFileSync } from "node:fs";

const src = readFileSync("assets/gallinita-color.png");
const W = 232, H = 391;
mkdirSync("public/gallinita", { recursive: true });

// cada capa conserva el tamaño completo (transparente fuera de su zona) para alinearlas sin cálculos
async function layer(name, keep) {
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let y = 0; y < info.height; y++)
    for (let x = 0; x < info.width; x++) if (!keep(x, y)) data[(y * info.width + x) * 4 + 3] = 0;
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .resize({ width: W * 2, kernel: "lanczos3" })
    .webp({ quality: 88, alphaQuality: 90 })
    .toFile(`public/gallinita/${name}.webp`);
  console.log(name);
}

await layer("cabeza", (x, y) => y < 176);
await layer("cuerpo", (x, y) => y >= 150 && y < 302);
await layer("pata-izq", (x, y) => y >= 292 && x < 108);
await layer("pata-der", (x, y) => y >= 292 && x >= 108);
await layer("entera", () => true);
