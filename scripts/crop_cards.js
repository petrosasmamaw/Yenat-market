import sharp from 'sharp';
import fs from 'fs';

async function cropCards() {
  console.log('Starting card cropping and standardizing...');

  // Standard credit card target dimensions: 1000 x 630 (aspect ratio ~ 1.587)
  const targetWidth = 1000;
  const targetHeight = 630;

  // 1. EBT Card
  // Detected: left=152, top=108, right=1112, bottom=739 (w=960, h=631)
  // Let's refine slightly to ensure no grey edge touches
  await sharp('public/card-ebt.jpg')
    .extract({ left: 154, top: 110, width: 955, height: 627 })
    .resize(targetWidth, targetHeight, { fit: 'fill' })
    .toFile('public/card-ebt-tight.png');
  console.log('card-ebt-tight.png created');

  // 2. Zelle Card
  // Detected: left=250, top=174, right=1016, bottom=674 (w=766, h=500)
  // 766 * (630 / 1000) = 482.5 height.
  await sharp('public/card-zelle.jpg')
    .extract({ left: 252, top: 176, width: 762, height: 496 })
    .resize(targetWidth, targetHeight, { fit: 'fill' })
    .toFile('public/card-zelle-tight.png');
  console.log('card-zelle-tight.png created');

  // 3. MasterCard
  // Detected: left=194, top=140, right=1068, bottom=718 (w=874, h=578)
  await sharp('public/card-mastercard.jpg')
    .extract({ left: 196, top: 142, width: 870, height: 574 })
    .resize(targetWidth, targetHeight, { fit: 'fill' })
    .toFile('public/card-mastercard-tight.png');
  console.log('card-mastercard-tight.png created');
}

cropCards().catch(console.error);
