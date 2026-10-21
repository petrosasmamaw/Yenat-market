import sharp from 'sharp';
import fs from 'fs';

async function analyze(filename) {
  const image = sharp(`public/${filename}`);
  const metadata = await image.metadata();
  console.log(`\n--- ${filename} (${metadata.width}x${metadata.height}) ---`);

  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  const channels = info.channels;

  // Top-left pixel is background
  const bgR = data[0];
  const bgG = data[1];
  const bgB = data[2];
  console.log(`Background sample: rgb(${bgR}, ${bgG}, ${bgB})`);

  function isDifferent(x, y) {
    const idx = (y * w + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const dist = Math.abs(r - bgR) + Math.abs(g - bgG) + Math.abs(b - bgB);
    return dist > 40; // threshold
  }

  // Scan from top
  let top = 0;
  topLoop: for (let y = 0; y < h; y++) {
    for (let x = Math.floor(w * 0.2); x < Math.floor(w * 0.8); x++) {
      if (isDifferent(x, y)) {
        top = y;
        break topLoop;
      }
    }
  }

  // Scan from bottom
  let bottom = h - 1;
  bottomLoop: for (let y = h - 1; y >= 0; y--) {
    for (let x = Math.floor(w * 0.2); x < Math.floor(w * 0.8); x++) {
      if (isDifferent(x, y)) {
        bottom = y;
        break bottomLoop;
      }
    }
  }

  // Scan from left
  let left = 0;
  leftLoop: for (let x = 0; x < w; x++) {
    for (let y = Math.floor(h * 0.2); y < Math.floor(h * 0.8); y++) {
      if (isDifferent(x, y)) {
        left = x;
        break leftLoop;
      }
    }
  }

  // Scan from right
  let right = w - 1;
  rightLoop: for (let x = w - 1; x >= 0; x--) {
    for (let y = Math.floor(h * 0.2); y < Math.floor(h * 0.8); y++) {
      if (isDifferent(x, y)) {
        right = x;
        break rightLoop;
      }
    }
  }

  const cardW = right - left;
  const cardH = bottom - top;
  const ratio = cardW / cardH;
  console.log(`Detected Card BBox: left=${left}, top=${top}, right=${right}, bottom=${bottom}`);
  console.log(`Card Size: ${cardW}x${cardH}, Aspect Ratio: ${ratio.toFixed(3)} (Standard credit card is 1.586)`);

  return { left, top, width: cardW, height: cardH };
}

async function run() {
  for (const f of ['card-ebt.jpg', 'card-zelle.jpg', 'card-mastercard.jpg']) {
    await analyze(f);
  }
}

run();
