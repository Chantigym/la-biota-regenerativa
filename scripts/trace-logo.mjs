// Vectoriza el logo PNG a SVGs monocromos (se usan como mask-image y toman el color del texto).
// La línea de la loma se superpone en altura con las letras, así que separamos por componentes conexas:
//   - logo-tractor: ilustración + loma (sin letras)
//   - logo-wordmark: solo "LA BIOTA REGENERATIVA"
//   - logo-full: el logo completo
import sharp from "sharp";
import potrace from "potrace";
import { writeFileSync, mkdirSync } from "node:fs";

const SCALE = 0.45;
const LETTERS_TOP = 1440; // en px del original; debajo de esto solo hay letras y la loma
const src = "assets/logo-original.png";
mkdirSync("public/brand", { recursive: true });

const { data, info } = await sharp(src)
  .flatten({ background: "#fff" }).grayscale()
  .resize({ width: Math.round(2957 * SCALE) })
  .raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height;
const dark = new Uint8Array(W * H);
for (let i = 0; i < W * H; i++) dark[i] = data[i] < 150 ? 1 : 0;

// etiquetado de componentes (4-vecinos, iterativo)
const label = new Int32Array(W * H).fill(-1);
const comps = [];
for (let i = 0; i < W * H; i++) {
  if (!dark[i] || label[i] >= 0) continue;
  const id = comps.length, stack = [i];
  let minX = W, minY = H, maxX = 0, maxY = 0, n = 0;
  label[i] = id;
  while (stack.length) {
    const p = stack.pop(), x = p % W, y = (p / W) | 0;
    n++; if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y;
    for (const q of [p - 1, p + 1, p - W, p + W]) {
      if (q < 0 || q >= W * H || label[q] >= 0 || !dark[q]) continue;
      if ((q === p - 1 && x === 0) || (q === p + 1 && x === W - 1)) continue;
      label[q] = id; stack.push(q);
    }
  }
  comps.push({ minX, minY, maxX, maxY, n });
}

const lettersTop = LETTERS_TOP * SCALE;
const isHill = (c) => c.maxX - c.minX > W * 0.5 && c.maxY - c.minY < H * 0.2;
const isSpeck = (c) => c.n < 40;
const isLetter = (c) => !isHill(c) && !isSpeck(c) && c.minY >= lettersTop - 30;

const variants = {
  "logo-full": (c) => !isSpeck(c),
  "logo-tractor": (c) => !isLetter(c) && !isSpeck(c),
  "logo-wordmark": (c) => isLetter(c),
};

const trace = (buf, opts) => new Promise((res, rej) => potrace.trace(buf, opts, (e, s) => (e ? rej(e) : res(s))));

for (const [name, keep] of Object.entries(variants)) {
  const keepIds = new Set(comps.map((c, i) => (keep(c) ? i : -1)).filter((i) => i >= 0));
  let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (const id of keepIds) { const c = comps[id]; x0 = Math.min(x0, c.minX); y0 = Math.min(y0, c.minY); x1 = Math.max(x1, c.maxX); y1 = Math.max(y1, c.maxY); }
  const pad = 4; x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad); x1 = Math.min(W - 1, x1 + pad); y1 = Math.min(H - 1, y1 + pad);
  const w = x1 - x0 + 1, h = y1 - y0 + 1;
  const out = Buffer.alloc(w * h, 255);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const p = (y + y0) * W + (x + x0);
    if (dark[p] && keepIds.has(label[p])) out[y * w + x] = 0;
  }
  const png = await sharp(out, { raw: { width: w, height: h, channels: 1 } }).png().toBuffer();
  let svg = await trace(png, { threshold: 128, turdSize: 6, optTolerance: 0.6 });
  svg = svg.replace(/(\d+\.\d+)/g, (n) => (+n).toFixed(1).replace(/\.0$/, ""))
    .replace(/fill="[^"]*"/g, 'fill="#000"').replace(/ stroke="none"/g, "");
  writeFileSync(`public/brand/${name}.svg`, svg);
  console.log(name, w, h, (svg.length / 1024).toFixed(0) + "KB");
}
