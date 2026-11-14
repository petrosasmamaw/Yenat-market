// Edits the Las Vegas sign photo: replaces "TO Fabulous LAS VEGAS NEVADA"
// with "TO YENAT MARKET LAS VEGAS". Output: public/hero-yenat-sign.jpg
const sharp = require('sharp');
const SRC = 'photo_2026-11-14_20-13-43.jpg';
const OUT = process.argv[2] || 'public/hero-yenat-sign.jpg';
const SCALE = 2; // upscale for crisper text, output stays sharp

// Text boxes to erase (original 500x750 coords)
const BOXES = [
  [166, 263, 384, 298],
  [144, 289, 414, 338],
  [214, 333, 336, 361],
];

(async () => {
  const W = 500 * SCALE, H = 750 * SCALE;
  const { data } = await sharp(SRC).resize(W, H, { kernel: 'lanczos3' })
    .raw().toBuffer({ resolveWithObject: true });

  const lum = (i) => 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
  for (const [x0, y0, x1, y1] of BOXES.map(b => b.map(v => v * SCALE))) {
    for (let y = y0; y < y1; y++) {
      // average the paper-white pixels in this row (ignore paint)
      let r = 0, g = 0, b = 0, n = 0;
      for (let x = x0 - 6 * SCALE; x < x1 + 6 * SCALE; x++) {
        const i = (y * W + x) * 3;
        const sat = Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]);
        if (lum(i) > 205 && sat < 40) { r += data[i]; g += data[i + 1]; b += data[i + 2]; n++; }
      }
      if (!n) { r = 236; g = 244; b = 253; n = 1; }
      r /= n; g /= n; b /= n;
      for (let x = x0; x < x1; x++) {
        // feather 3px at box edges
        const e = Math.min(x - x0, x1 - 1 - x, y - y0, y1 - 1 - y);
        const a = Math.min(1, (e + 1) / (6 * SCALE));
        const i = (y * W + x) * 3;
        const nz = (Math.random() - 0.5) * 3;
        data[i] = data[i] * (1 - a) + (r + nz) * a;
        data[i + 1] = data[i + 1] * (1 - a) + (g + nz) * a;
        data[i + 2] = data[i + 2] * (1 - a) + (b + nz) * a;
      }
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 500 750">
    <defs><filter id="soft"><feGaussianBlur stdDeviation="0.25"/></filter></defs>
    <g filter="url(#soft)" text-anchor="middle">
      <text x="280" y="288" font-family="Arial, Helvetica, sans-serif" font-weight="700"
        font-size="17" letter-spacing="2" fill="rgb(33,83,148)">TO</text>
      <text x="281" y="327" font-family="Bahnschrift, Arial Narrow, Arial, sans-serif" font-weight="700"
        font-stretch="condensed" font-size="38" textLength="244" lengthAdjust="spacingAndGlyphs"
        fill="rgb(214,52,78)">YENAT MARKET</text>
      <text x="279" y="355" font-family="Arial, Helvetica, sans-serif" font-weight="700"
        font-size="15" letter-spacing="3.5" fill="rgb(40,124,196)">LAS VEGAS</text>
    </g></svg>`;

  await sharp(data, { raw: { width: W, height: H, channels: 3 } })
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(OUT);
  console.log('wrote', OUT);
})();
