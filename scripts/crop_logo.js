import fs from 'fs';
import zlib from 'zlib';

function crc32(buf) {
  let table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ -1) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = chunk.subarray(4, 8 + len);
  const crc = crc32(typeAndData);
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

const srcBuf = fs.readFileSync('Frame 2.png');
const origWidth = srcBuf.readUInt32BE(16);
const origHeight = srcBuf.readUInt32BE(20);

// Decompress IDAT
const idatParts = [];
let off = 8;
while (off < srcBuf.length) {
  const len = srcBuf.readUInt32BE(off);
  const type = srcBuf.toString('ascii', off + 4, off + 8);
  if (type === 'IDAT') idatParts.push(srcBuf.subarray(off + 8, off + 8 + len));
  off += 12 + len;
}
const decompressed = zlib.inflateSync(Buffer.concat(idatParts));

// Unfilter scanlines
const bpp = 4; // RGBA
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

    if (filterType === 0) {
      currentLine[x] = val;
    } else if (filterType === 1) { // Sub
      currentLine[x] = (val + a) & 0xFF;
    } else if (filterType === 2) { // Up
      currentLine[x] = (val + b) & 0xFF;
    } else if (filterType === 3) { // Average
      currentLine[x] = (val + Math.floor((a + b) / 2)) & 0xFF;
    } else if (filterType === 4) { // Paeth
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

// Find non-white bounds
let minY = origHeight, maxY = 0, minX = origWidth, maxX = 0;
for (let y = 0; y < origHeight; y++) {
  for (let x = 0; x < origWidth; x++) {
    const idx = (y * origWidth + x) * 4;
    const r = rawPixels[idx];
    const g = rawPixels[idx + 1];
    const b = rawPixels[idx + 2];
    const a = rawPixels[idx + 3];
    if (a > 30 && (r < 245 || g < 245 || b < 245)) {
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
    }
  }
}

console.log(`True Non-White Bounds: X: [${minX}, ${maxX}] width=${maxX - minX + 1}, Y: [${minY}, ${maxY}] height=${maxY - minY + 1}`);

// Add slight breathing padding (e.g. 15px)
const pad = 15;
const cropX = Math.max(0, minX - pad);
const cropY = Math.max(0, minY - pad);
const cropW = Math.min(origWidth - cropX, (maxX - minX + 1) + pad * 2);
const cropH = Math.min(origHeight - cropY, (maxY - minY + 1) + pad * 2);

console.log(`Cropped Box: ${cropW} x ${cropH} at (${cropX}, ${cropY})`);

// Create cropped uncompressed scanlines with filter 0
const croppedDecompressed = Buffer.alloc(cropH * (1 + cropW * 4));
for (let y = 0; y < cropH; y++) {
  const lineStart = y * (1 + cropW * 4);
  croppedDecompressed[lineStart] = 0; // Filter 0 (None)
  const srcLineStart = ((cropY + y) * origWidth + cropX) * 4;
  rawPixels.copy(croppedDecompressed, lineStart + 1, srcLineStart, srcLineStart + cropW * 4);
}

// Compress
const compressed = zlib.deflateSync(croppedDecompressed);

// Build IHDR
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(cropW, 0);
ihdr.writeUInt32BE(cropH, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 6; // RGBA
ihdr[10] = 0; // compression
ihdr[11] = 0; // filter
ihdr[12] = 0; // interlace

const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const croppedPng = Buffer.concat([
  pngSignature,
  createChunk('IHDR', ihdr),
  createChunk('IDAT', compressed),
  createChunk('IEND', Buffer.alloc(0))
]);

fs.writeFileSync('public/yenat-logo-cropped.png', croppedPng);
console.log('Saved public/yenat-logo-cropped.png successfully!');
