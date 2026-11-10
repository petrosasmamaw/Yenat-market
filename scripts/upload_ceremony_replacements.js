import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: 'dkcanqmko',
  api_key: '387626553315599',
  api_secret: 'G_sSuaBShFwP2KW7LXmAZWzLMQg',
  secure: true,
});

const userUploadDir = 'C:/Users/For you/.gemini/antigravity/brain/d4189bcb-21a1-4eb5-869d-9312647e9458/.user_uploaded';

const img1Path = path.join(userUploadDir, 'media_1794310349745_9444415b.jpg');
const img2Path = path.join(userUploadDir, 'media_1794310361500_ea5e40b5.jpg');

async function uploadImages() {
  console.log('Uploading Image 1 (Fresh Hanging Carcass Preparation)...');
  const res1 = await cloudinary.uploader.upload(img1Path, {
    folder: 'yenat_market/ceremony',
    public_id: 'ceremony_hanging_cuts',
    overwrite: true,
    resource_type: 'image',
  });
  console.log('Image 1 uploaded successfully:', res1.secure_url);

  console.log('Uploading Image 2 (Fresh Pre-portioned Ceremony Trays)...');
  const res2 = await cloudinary.uploader.upload(img2Path, {
    folder: 'yenat_market/ceremony',
    public_id: 'ceremony_event_meat_trays',
    overwrite: true,
    resource_type: 'image',
  });
  console.log('Image 2 uploaded successfully:', res2.secure_url);

  const jsonPath = './cloudinary_urls.json';
  let urls = {};
  if (fs.existsSync(jsonPath)) {
    urls = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  }

  urls.ceremony_photo_4 = {
    secure_url: res1.secure_url,
    resource_type: 'image',
    format: res1.format,
    width: res1.width,
    height: res1.height,
  };

  urls.ceremony_photo_5 = {
    secure_url: res2.secure_url,
    resource_type: 'image',
    format: res2.format,
    width: res2.width,
    height: res2.height,
  };

  fs.writeFileSync(jsonPath, JSON.stringify(urls, null, 2), 'utf8');
  console.log('Updated cloudinary_urls.json with ceremony_photo_4 and ceremony_photo_5!');
}

uploadImages().catch((err) => {
  console.error('Upload failed:', err);
  process.exit(1);
});

