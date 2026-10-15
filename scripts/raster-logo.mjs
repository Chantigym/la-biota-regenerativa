// Rasteriza los SVG del logo a máscaras WebP con alpha: pintar una máscara SVG con miles de nodos
// es caro en celulares; una máscara raster es casi gratis.
import sharp from "sharp";

const sizes = { "logo-wordmark": 520, "logo-tractor": 1500, "logo-full": 640 };
for (const [name, width] of Object.entries(sizes)) {
  const { data, info } = await sharp(`public/brand/${name}.svg`, { density: 300 })
    .resize({ width }).flatten({ background: "#fff" }).grayscale().raw().toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) rgba[i * 4 + 3] = 255 - data[i];
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .webp({ quality: 85, alphaQuality: 80 }).toFile(`public/brand/${name}.webp`);
  console.log(name, info.width, info.height);
}

// Tractor solo (sin la loma) para el tractor que cruza las secciones. La loma toca las ruedas, así que
// se recorta por coordenadas del SVG del tractor: justo debajo de las ruedas.
{
  const SRC_W = 1233, SCALE = 2;
  const crop = { left: 170 * SCALE, top: 0, width: 870 * SCALE, height: 592 * SCALE };
  const big = await sharp("public/brand/logo-tractor.svg", { density: 72 * SCALE }).resize({ width: SRC_W * SCALE }).png().toBuffer();
  const { data, info } = await sharp(big).extract(crop).resize({ width: 360 })
    .flatten({ background: "#fff" }).grayscale().raw().toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) rgba[i * 4 + 3] = 255 - data[i];
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .webp({ quality: 85, alphaQuality: 80 }).toFile("public/brand/logo-tractor-solo.webp");
  console.log("logo-tractor-solo", info.width, info.height);
}
