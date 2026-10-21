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

function savePng(filename, width, height, rgbaBuffer) {
  const stride = 1 + width * 4;
  const scanlines = Buffer.alloc(height * stride);
  for (let y = 0; y < height; y++) {
    scanlines[y * stride] = 0; // Filter 0
    rgbaBuffer.copy(scanlines, y * stride + 1, y * width * 4, (y + 1) * width * 4);
  }
  const compressed = zlib.deflateSync(scanlines);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8 bits
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    createChunk('IHDR', ihdr),
    createChunk('IDAT', compressed),
    createChunk('IEND', Buffer.alloc(0))
  ]);
  fs.writeFileSync(filename, png);
  console.log(`Saved ${filename} (${width}x${height})`);
}

// 1. Read Frame 2.png
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

// Cart Icon bounds: X [145, 438], Y [89, 308]
const cartMinX = 145;
const cartMaxX = 438;
const cartMinY = 89;
const cartMaxY = 308;
const cartW = cartMaxX - cartMinX + 1; // 294
const cartH = cartMaxY - cartMinY + 1; // 220

console.log(`Cart dimension: ${cartW}x${cartH}`);

// Extract cart pixels with alpha transparency for white background
const cartRgba = Buffer.alloc(cartW * cartH * 4);
for (let cy = 0; cy < cartH; cy++) {
  for (let cx = 0; cx < cartW; cx++) {
    const srcX = cartMinX + cx;
    const srcY = cartMinY + cy;
    const srcIdx = (srcY * origWidth + srcX) * 4;
    const r = rawPixels[srcIdx];
    const g = rawPixels[srcIdx + 1];
    const b = rawPixels[srcIdx + 2];
    const a = rawPixels[srcIdx + 3];

    const dstIdx = (cy * cartW + cx) * 4;
    // Check if pixel is white/near white background
    if (a < 30 || (r > 235 && g > 235 && b > 235)) {
      cartRgba[dstIdx] = 0;
      cartRgba[dstIdx + 1] = 0;
      cartRgba[dstIdx + 2] = 0;
      cartRgba[dstIdx + 3] = 0; // transparent
    } else {
      cartRgba[dstIdx] = r;
      cartRgba[dstIdx + 1] = g;
      cartRgba[dstIdx + 2] = b;
      cartRgba[dstIdx + 3] = 255; // solid
    }
  }
}

// Save standalone tightly cropped cart icon
savePng('public/yenat-cart-icon.png', cartW, cartH, cartRgba);

// Create a Square 1:1 Favicon (320x320) with the cart icon perfectly centered
const squareSize = 320;
const squareRgba = Buffer.alloc(squareSize * squareSize * 4); // all 0 = transparent

const offsetX = Math.floor((squareSize - cartW) / 2); // 13px
const offsetY = Math.floor((squareSize - cartH) / 2); // 50px

for (let cy = 0; cy < cartH; cy++) {
  for (let cx = 0; cx < cartW; cx++) {
    const srcIdx = (cy * cartW + cx) * 4;
    const a = cartRgba[srcIdx + 3];
    if (a > 0) {
      const dstIdx = ((offsetY + cy) * squareSize + (offsetX + cx)) * 4;
      squareRgba[dstIdx] = cartRgba[srcIdx];
      squareRgba[dstIdx + 1] = cartRgba[srcIdx + 1];
      squareRgba[dstIdx + 2] = cartRgba[srcIdx + 2];
      squareRgba[dstIdx + 3] = a;
    }
  }
}

savePng('public/favicon.png', squareSize, squareSize, squareRgba);
savePng('public/yenat-favicon.png', squareSize, squareSize, squareRgba);

// Create Apple Touch Icon (solid white rounded background so it pops on dark & light devices)
const appleSize = 192;
const appleRgba = Buffer.alloc(appleSize * appleSize * 4);
// Fill with pure white
for (let i = 0; i < appleSize * appleSize; i++) {
  appleRgba[i * 4] = 255;
  appleRgba[i * 4 + 1] = 255;
  appleRgba[i * 4 + 2] = 255;
  appleRgba[i * 4 + 3] = 255;
}

// Scale cart to fit nicely inside 192x192 (with ~18px margin -> scale 0.52)
const targetCartW = 156;
const targetCartH = Math.round(cartH * (targetCartW / cartW)); // ~117
const appleOffX = Math.floor((appleSize - targetCartW) / 2);
const appleOffY = Math.floor((appleSize - targetCartH) / 2);

for (let y = 0; y < targetCartH; y++) {
  const srcY = Math.floor(y * (cartH / targetCartH));
  for (let x = 0; x < targetCartW; x++) {
    const srcX = Math.floor(x * (cartW / targetCartW));
    const srcIdx = (srcY * cartW + srcX) * 4;
    const a = cartRgba[srcIdx + 3];
    if (a > 100) {
      const dstIdx = ((appleOffY + y) * appleSize + (appleOffX + x)) * 4;
      appleRgba[dstIdx] = cartRgba[srcIdx];
      appleRgba[dstIdx + 1] = cartRgba[srcIdx + 1];
      appleRgba[dstIdx + 2] = cartRgba[srcIdx + 2];
      appleRgba[dstIdx + 3] = 255;
    }
  }
}

savePng('public/apple-touch-icon.png', appleSize, appleSize, appleRgba);

// Create standard ICO file containing a 32x32 bitmap
function createIco(png32Buf) {
  // Simple ICO with PNG payload
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // Reserved
  icoHeader.writeUInt16LE(1, 2); // Type 1 = ICO
  icoHeader.writeUInt16LE(1, 4); // 1 image

  const icoEntry = Buffer.alloc(16);
  icoEntry.writeUInt8(32, 0); // Width 32
  icoEntry.writeUInt8(32, 1); // Height 32
  icoEntry.writeUInt8(0, 2);  // Colors
  icoEntry.writeUInt8(0, 3);  // Reserved
  icoEntry.writeUInt16LE(1, 4); // Planes
  icoEntry.writeUInt16LE(32, 6); // Bits per pixel
  icoEntry.writeUInt32LE(png32Buf.length, 8); // Image size
  icoEntry.writeUInt32LE(6 + 16, 12); // Offset

  return Buffer.concat([icoHeader, icoEntry, png32Buf]);
}

// Generate 32x32 PNG for ICO
const ico32Rgba = Buffer.alloc(32 * 32 * 4);
const icoCartW = 28;
const icoCartH = Math.round(cartH * (icoCartW / cartW)); // ~21
const icoOffX = Math.floor((32 - icoCartW) / 2);
const icoOffY = Math.floor((32 - icoCartH) / 2);

for (let y = 0; y < icoCartH; y++) {
  const srcY = Math.floor(y * (cartH / icoCartH));
  for (let x = 0; x < icoCartW; x++) {
    const srcX = Math.floor(x * (cartW / icoCartW));
    const srcIdx = (srcY * cartW + srcX) * 4;
    const a = cartRgba[srcIdx + 3];
    if (a > 60) {
      const dstIdx = ((icoOffY + y) * 32 + (icoOffX + x)) * 4;
      ico32Rgba[dstIdx] = cartRgba[srcIdx];
      ico32Rgba[dstIdx + 1] = cartRgba[srcIdx + 1];
      ico32Rgba[dstIdx + 2] = cartRgba[srcIdx + 2];
      ico32Rgba[dstIdx + 3] = a;
    }
  }
}

// Save temporary 32x32 PNG to wrap into ICO
savePng('public/favicon-32x32.png', 32, 32, ico32Rgba);
const png32Buf = fs.readFileSync('public/favicon-32x32.png');
fs.writeFileSync('public/favicon.ico', createIco(png32Buf));
console.log('Saved public/favicon.ico successfully!');
