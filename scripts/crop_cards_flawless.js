import sharp from 'sharp';

async function cropFlawless() {
  const targetW = 1000;
  const targetH = 630; // standard 1.587 ratio

  // 1. EBT Card
  // Crop slightly inside so the blue security waves fill 100% of the box, zero grey anywhere
  await sharp('public/card-ebt.jpg')
    .extract({ left: 180, top: 130, width: 900, height: 567 })
    .resize(targetW, targetH)
    .jpeg({ quality: 95 })
    .toFile('public/card-ebt-fitted.jpg');
  console.log('card-ebt-fitted.jpg created');

  // 2. Zelle Card
  // Crop inside so purple background fills 100% of the box, zero grey anywhere
  await sharp('public/card-zelle.jpg')
    .extract({ left: 270, top: 190, width: 720, height: 454 })
    .resize(targetW, targetH)
    .jpeg({ quality: 95 })
    .toFile('public/card-zelle-fitted.jpg');
  console.log('card-zelle-fitted.jpg created');

  // 3. MasterCard
  // Crop right on the silver rim so black brushed metal and silver rim fill the frame
  await sharp('public/card-mastercard.jpg')
    .extract({ left: 204, top: 150, width: 852, height: 537 })
    .resize(targetW, targetH)
    .jpeg({ quality: 95 })
    .toFile('public/card-mastercard-fitted.jpg');
  console.log('card-mastercard-fitted.jpg created');
}

cropFlawless().catch(console.error);
