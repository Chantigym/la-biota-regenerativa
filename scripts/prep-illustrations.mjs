// Convierte las ilustraciones (tinta negra sobre blanco) en máscaras WebP con alpha.
// El color lo pone CSS (mask-image + background-color), así respetan el tema claro/oscuro.
import sharp from "sharp";
import { readdirSync } from "node:fs";

const SIZE = 720;
for (const f of readdirSync("assets/illustrations").filter((f) => f.endsWith(".png"))) {
  const name = f.replace(".png", "");
  const gray = await sharp(`assets/illustrations/${f}`).flatten({ background: "#fff" }).grayscale()
    .trim({ threshold: 20 }).resize({ width: SIZE, height: SIZE, fit: "contain", background: "#fff" })
    .raw().toBuffer({ resolveWithObject: true });
  const { width, height } = gray.info;
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    // curva para limpiar el gris del fondo y mantener la tinta sólida
    const ink = Math.max(0, Math.min(255, Math.round((235 - gray.data[i]) * 1.4)));
    rgba[i * 4 + 3] = ink;
  }
  await sharp(rgba, { raw: { width, height, channels: 4 } }).webp({ quality: 80, alphaQuality: 70 })
    .toFile(`public/illustrations/${name}.webp`);
  console.log(name, width, height);
}

// Imágenes no cuadradas (mapa del predio, corte del suelo): mismo tratamiento, conservando la proporción.
import { existsSync } from "node:fs";
const wide = { mapa: 1400, suelo: 900, traslasierra: 1400 };
for (const [name, width] of Object.entries(wide)) {
  const src = `assets/wide/${name}.png`;
  if (!existsSync(src)) continue;
  const gray = await sharp(src).flatten({ background: "#fff" }).grayscale().trim({ threshold: 20 }).resize({ width })
    .raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = gray.info;
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) rgba[i * 4 + 3] = Math.max(0, Math.min(255, Math.round((235 - gray.data[i]) * 1.4)));
  await sharp(rgba, { raw: { width: w, height: h, channels: 4 } }).webp({ quality: 80, alphaQuality: 70 }).toFile(`public/illustrations/${name}.webp`);
  console.log(name, w, h);
}

// compost.png trae un círculo dibujado alrededor: se recorta con una máscara circular.
// (se trabaja en memoria: en Windows sharp deja el archivo de entrada bloqueado)
{
  const { readFileSync, writeFileSync } = await import("node:fs");
  const input = readFileSync("public/illustrations/compost.webp");
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.455;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (Math.hypot(x - cx, y - cy) > r) data[(y * w + x) * 4 + 3] = 0;
  const out = await sharp(data, { raw: { width: w, height: h, channels: 4 } }).webp({ quality: 80, alphaQuality: 70 }).toBuffer();
  writeFileSync("public/illustrations/compost.webp", out);
  console.log("compost recortado");
}
