import fs from 'fs';
import zlib from 'zlib';

const srcBuf = fs.readFileSync('Frame 2.png');
const origWidth = srcBuf.readUInt32BE(16);
const origHeight = srcBuf.readUInt32BE(20);

const idatParts = [];
let off = 8;
while (off < srcBuf.length) {
  const len = srcBuf.readUInt32BE(off);
  const type = srcBuf.toString('ascii', off + 4, off + 8);
  if (type === 'IDAT') idatParts.push(srcBuf.subarray(off + 8, off + 8 + len));
  off += 12 + len;
}
const decompressed = zlib.inflateSync(Buffer.concat(idatParts));
const bpp = 4;
const stride = 1 + origWidth * bpp;
const rawPixels = Buffer.alloc(origWidth * origHeight * bpp);

for (let y = 0; y < origHeight; y++) {
  const filterType = decompressed[y * stride];
  const scanline = decompressed.subarray(y * stride + 1, (y + 1) * stride);
  const prevLine = y > 0 ? rawPixels.subarray((y - 1) * origWidth * bpp, y * origWidth * bpp) : null;
  const currentLine = rawPixels.subarray(y * origWidth * bpp, (y + 1) * origWidth * bpp);

  for (let x = 0; x < origWidth * bpp; x++) {
    const a = (x >= bpp) ? currentLine[x - bpp] : 0;
    const b = prevLine ? prevLine[x] : 0;
    const c = (prevLine && x >= bpp) ? prevLine[x - bpp] : 0;
    let val = scanline[x];

    if (filterType === 0) currentLine[x] = val;
    else if (filterType === 1) currentLine[x] = (val + a) & 0xFF;
    else if (filterType === 2) currentLine[x] = (val + b) & 0xFF;
    else if (filterType === 3) currentLine[x] = (val + Math.floor((a + b) / 2)) & 0xFF;
    else if (filterType === 4) {
      const p = a + b - c;
      const pa = Math.abs(p - a);
      const pb = Math.abs(p - b);
      const pc = Math.abs(p - c);
      let pr = c;
      if (pa <= pb && pa <= pc) pr = a;
      else if (pb <= pc) pr = b;
      currentLine[x] = (val + pr) & 0xFF;
    }
  }
}

let minX = origWidth, maxX = 0;
for (let y = 89; y <= 308; y++) {
  for (let x = 0; x < origWidth; x++) {
    const idx = (y * origWidth + x) * 4;
    const r = rawPixels[idx], g = rawPixels[idx+1], b = rawPixels[idx+2], a = rawPixels[idx+3];
    if (a > 30 && (r < 240 || g < 240 || b < 240)) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
    }
  }
}
console.log(`Cart Icon Bounds: X: [${minX}, ${maxX}] width=${maxX - minX + 1}, Y: [89, 308] height=${308 - 89 + 1}`);
