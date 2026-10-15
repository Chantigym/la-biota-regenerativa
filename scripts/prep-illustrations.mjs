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
