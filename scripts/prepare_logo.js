import fs from 'fs';
import path from 'path';

const srcPath = path.resolve('Frame 2.png');
const publicDir = path.resolve('public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.copyFileSync(srcPath, path.join(publicDir, 'yenat-logo.png'));
console.log('Successfully copied Frame 2.png to public/yenat-logo.png');

const buf = fs.readFileSync(srcPath);
if (buf.toString('ascii', 1, 4) === 'PNG') {
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  console.log(`Dimensions: ${width} x ${height}`);
}
