import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: 'dkcanqmko',
  api_key: '387626553315599',
  api_secret: 'G_sSuaBShFwP2KW7LXmAZWzLMQg',
  secure: true,
});

const userUploadDir = 'C:/Users/For you/.gemini/antigravity-ide/brain/f4041f34-386f-433c-9313-b3f443a8664d/.user_uploaded';

const uploads = [
  // 1. Meat Cuts
  {
    key: 'chkna_tibs',
    path: path.join(userUploadDir, 'media_1792345842164.jpg'),
    resource_type: 'image',
    folder: 'yenat_market/meat',
    public_id: 'chkna_tibs_cut',
  },
  {
    key: 'kurt_tire',
    path: path.join(userUploadDir, 'media_1792345877413.jpg'),
    resource_type: 'image',
    folder: 'yenat_market/meat',
    public_id: 'kurt_tire_siga',
  },
  {
    key: 'tibs',
    path: path.join(userUploadDir, 'media_1792345903627.jpg'),
    resource_type: 'image',
    folder: 'yenat_market/meat',
    public_id: 'ye_tibs_siga',
  },
  {
    key: 'kitfo',
    path: path.join(userUploadDir, 'media_1792345929401.jpg'),
    resource_type: 'image',
    folder: 'yenat_market/meat',
    public_id: 'ye_kitfo_siga',
  },
  {
    key: 'sheep_goat_delivery',
    path: path.join(userUploadDir, 'media_1792345962601.jpg'),
    resource_type: 'image',
    folder: 'yenat_market/meat',
    public_id: 'sheep_goat_house_delivery',
  },

  // 2. Delivery Van
  {
    key: 'delivery_van',
    path: 'public/photo_2026-10-18_20-49-36.jpg',
    resource_type: 'image',
    folder: 'yenat_market/delivery',
    public_id: 'yenat_delivery_van',
  },

  // 3. Special Ceremonies & Catering (5 items: 3 photos + 2 videos)
  {
    key: 'ceremony_photo_1',
    path: 'public/photo_2026-10-18_20-49-16.jpg',
    resource_type: 'image',
    folder: 'yenat_market/ceremony',
    public_id: 'ceremony_roasting_1',
  },
  {
    key: 'ceremony_photo_2',
    path: 'public/photo_2026-10-18_20-49-32.jpg',
    resource_type: 'image',
    folder: 'yenat_market/ceremony',
    public_id: 'ceremony_roasting_2',
  },
  {
    key: 'ceremony_photo_3',
    path: 'public/photo_2026-10-18_20-50-08.jpg',
    resource_type: 'image',
    folder: 'yenat_market/ceremony',
    public_id: 'ceremony_roasting_3',
  },
  {
    key: 'ceremony_video_1',
    path: 'public/video_2026-10-18_20-49-49.mp4',
    resource_type: 'video',
    folder: 'yenat_market/ceremony',
    public_id: 'ceremony_video_roasting_1',
  },
  {
    key: 'ceremony_video_2',
    path: 'public/video_2026-10-18_20-50-02.mp4',
    resource_type: 'video',
    folder: 'yenat_market/ceremony',
    public_id: 'ceremony_video_roasting_2',
  },
];

async function run() {
  const results = {};
  for (const item of uploads) {
    if (!fs.existsSync(item.path)) {
      console.error(`File does not exist: ${item.path}`);
      continue;
    }
    console.log(`Uploading ${item.key} (${item.path}) to Cloudinary...`);
    try {
      const res = await cloudinary.uploader.upload(item.path, {
        resource_type: item.resource_type,
        folder: item.folder,
        public_id: item.public_id,
        overwrite: true,
      });
      console.log(`Uploaded ${item.key} -> ${res.secure_url}`);
      results[item.key] = {
        secure_url: res.secure_url,
        resource_type: item.resource_type,
        format: res.format,
        width: res.width,
        height: res.height,
        duration: res.duration || null,
      };
    } catch (e) {
      console.error(`Failed to upload ${item.key}:`, e.message || e);
    }
  }

  fs.writeFileSync('cloudinary_urls.json', JSON.stringify(results, null, 2));
  console.log('Saved all results to cloudinary_urls.json');
}

run();
