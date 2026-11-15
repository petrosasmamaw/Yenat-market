// Builds "on-dark" variants of the Yenat logo + cart mark.
// Same three brand hues (green · gold · red), lifted so they stay legible on deep forest green.
// Usage: node scripts/make_logo_on_dark.cjs
const sharp = require('sharp');
const path = require('path');

const PUB = path.join(__dirname, '..', 'public');

const TARGET = {
  green: [88, 201, 139], // leaf green  #58C98B
  gold: [237, 177, 47],  // gold        #EDB12F
  red: [240, 72, 86],    // berbere     #F04856
};

const hueOf = (r, g, b) => {
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  if (d === 0) return { h: 0, s: 0, max };
  let h;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h *= 60;
  if (h < 0) h += 360;
  return { h, s: d / max, max };
};

async function recolor(input, output) {
  const { data, info } = await sharp(path.join(PUB, input)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a === 0) continue;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const { h, s, max } = hueOf(r, g, b);
    // near-white fringe left over from background removal → fade it out
    if (s < 0.18 && max > 200) { data[i + 3] = 0; continue; }
    let t;
    if (h >= 75 && h <= 200) t = TARGET.green;
    else if (h >= 25 && h < 75) t = TARGET.gold;
    else t = TARGET.red;
    // washed-out edge pixels: keep the hue, turn the paleness into transparency
    const strength = Math.min(1, s / 0.6);
    data[i] = t[0]; data[i + 1] = t[1]; data[i + 2] = t[2];
    data[i + 3] = Math.round(a * strength);
  }
  await sharp(data, { raw: info }).png().toFile(path.join(PUB, output));
  console.log(`✓ ${output} (${info.width}×${info.height})`);
}

(async () => {
  await recolor('yenat-logo-transparent.png', 'yenat-logo-on-dark.png');
  await recolor('yenat-cart-mark.png', 'yenat-cart-on-dark.png');
})();
