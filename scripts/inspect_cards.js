import fs from 'fs';
import path from 'path';

// Let's check image dimensions by reading headers or installing sharp or jimp
console.log('Testing card images...');
['card-ebt.jpg', 'card-zelle.jpg', 'card-mastercard.jpg'].forEach(file => {
  const p = path.join('public', file);
  const stat = fs.statSync(p);
  console.log(file, 'size:', stat.size);
});
