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

// Sample corners (0,0) and cart colors
const cornerR = rawPixels[0], cornerG = rawPixels[1], cornerB = rawPixels[2], cornerA = rawPixels[3];
console.log(`Corner (0,0) RGBA: (${cornerR}, ${cornerG}, ${cornerB}, ${cornerA})`);

const colors = new Map();
for (let y = 89; y <= 308; y++) {
  for (let x = 145; x <= 438; x++) {
    const idx = (y * origWidth + x) * 4;
    const r = rawPixels[idx], g = rawPixels[idx+1], b = rawPixels[idx+2], a = rawPixels[idx+3];
    if (a > 30 && (r < 240 || g < 240 || b < 240)) {
      const hex = '#' + [r,g,b].map(v => v.toString(16).padStart(2, '0')).join('');
      colors.set(hex, (colors.get(hex) || 0) + 1);
    }
  }
}
const sortedColors = Array.from(colors.entries()).sort((a,b) => b[1] - a[1]).slice(0, 8);
console.log('Top cart colors:', sortedColors);
