import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: 'dkcanqmko',
  api_key: '387626553315599',
  api_secret: 'G_sSuaBShFwP2KW7LXmAZWzLMQg',
  secure: true,
});

const newVanPath = 'C:/Users/For you/.gemini/antigravity-ide/brain/f4041f34-386f-433c-9313-b3f443a8664d/.user_uploaded/media_1792350282498.jpg';
const storeInsidePath = 'c:/Users/For you/OneDrive/Desktop/folders/website/Client_PROJECTS1/yenat-market-website/public/photo_2026-10-18_20-49-36.jpg';

async function run() {
  console.log('Uploading real delivery van...');
  const vanResult = await cloudinary.uploader.upload(newVanPath, {
    folder: 'yenat_market/delivery',
    public_id: 'yenat_real_delivery_van',
    overwrite: true,
  });
  console.log('Van uploaded:', vanResult.secure_url);

  console.log('Uploading inside store photo...');
  const storeResult = await cloudinary.uploader.upload(storeInsidePath, {
    folder: 'yenat_market/store',
    public_id: 'inside_yenat_market_store',
    overwrite: true,
  });
  console.log('Store uploaded:', storeResult.secure_url);

  const jsonPath = './cloudinary_urls.json';
  let urls = {};
  if (fs.existsSync(jsonPath)) {
    urls = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  }

  urls.delivery_van = {
    secure_url: vanResult.secure_url,
    resource_type: 'image',
    format: vanResult.format,
    width: vanResult.width,
    height: vanResult.height,
  };

  urls.store_inside = {
    secure_url: storeResult.secure_url,
    resource_type: 'image',
    format: storeResult.format,
    width: storeResult.width,
    height: storeResult.height,
  };

  fs.writeFileSync(jsonPath, JSON.stringify(urls, null, 2), 'utf8');
  console.log('cloudinary_urls.json updated successfully!');
}

run().catch((err) => {
  console.error('Upload failed:', err);
  process.exit(1);
});
