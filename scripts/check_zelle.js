import sharp from 'sharp';

async function checkZelle() {
  const image = sharp('public/card-zelle.jpg');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;

  // Print samples along center horizontal line and center vertical line
  const cy = Math.floor(h / 2);
  const cx = Math.floor(w / 2);

  // In card-zelle.jpg, the card is purple (high blue and red, low green)!
  // Background is neutral grey (r ≈ g ≈ b).
  // Let's find where the purple begins!
  function isPurple(x, y) {
    const idx = (y * w + x) * 3;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Purple has low green compared to red and blue, e.g., b > 80, r > 50, and (r - g) > 20 && (b - g) > 20
    return (b - g > 25) && (r - g > 15);
  }

  let top = 0, bottom = h - 1, left = 0, right = w - 1;
  for (let y = 0; y < h; y++) {
    if (isPurple(cx, y)) { top = y; break; }
  }
  for (let y = h - 1; y >= 0; y--) {
    if (isPurple(cx, y)) { bottom = y; break; }
  }
  for (let x = 0; x < w; x++) {
    if (isPurple(x, cy)) { left = x; break; }
  }
  for (let x = w - 1; x >= 0; x--) {
    if (isPurple(x, cy)) { right = x; break; }
  }

  console.log(`Zelle purple card: left=${left}, top=${top}, right=${right}, bottom=${bottom}`);
  console.log(`Zelle size: ${right - left}x${bottom - top}, ratio: ${(right - left) / (bottom - top)}`);
}

checkZelle();
