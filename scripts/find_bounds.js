import fs from 'fs';
import zlib from 'zlib';

const buf = fs.readFileSync('Frame 2.png');
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);

// Find IDAT chunks
const idatBuffers = [];
let offset = 8;
while (offset < buf.length) {
  const len = buf.readUInt32BE(offset);
  const type = buf.toString('ascii', offset + 4, offset + 8);
  if (type === 'IDAT') {
    idatBuffers.push(buf.subarray(offset + 8, offset + 8 + len));
  }
  offset += 12 + len;
}

const idatConcat = Buffer.concat(idatBuffers);
const decompressed = zlib.inflateSync(idatConcat);

// bytes per pixel: for RGBA it's 4, RGB is 3
// Let's check bit depth and color type in IHDR
const bitDepth = buf[24];
const colorType = buf[25];
console.log(`BitDepth: ${bitDepth}, ColorType: ${colorType}`);

const bpp = colorType === 6 ? 4 : (colorType === 2 ? 3 : 1);
const stride = 1 + width * bpp;

let minY = height, maxY = 0, minX = width, maxX = 0;

for (let y = 0; y < height; y++) {
  const lineStart = y * stride + 1; // skip filter byte
  for (let x = 0; x < width; x++) {
    const px = lineStart + x * bpp;
    const r = decompressed[px];
    const g = decompressed[px + 1];
    const b = decompressed[px + 2];
    const a = bpp === 4 ? decompressed[px + 3] : 255;
    // Check if not white / not transparent
    if (a > 20 && (r < 240 || g < 240 || b < 240)) {
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
    }
  }
}

console.log(`Content Bounds: X: [${minX}, ${maxX}] (width ${maxX - minX}), Y: [${minY}, ${maxY}] (height ${maxY - minY})`);
