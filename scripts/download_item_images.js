import fs from 'fs';
import path from 'path';

const items = [
  { file: 'teff-injera.jpg', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw17tDroj65Kx6IGJ90PzDRXNgon7JRlsfAp3q7C9z9A&s=10' },
  { file: 'ambasha.jpg', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOQKgh-ZO77puWZp4otrZYzwjdp0YX9welQxF3Cf4fJA&s=10' },
  { file: 'sheep-goat.webp', url: 'https://aljisrlivestock.com/assets/breeds/ethiopian/ethiopian_arsi_bale_sheep-800.webp' },
  { file: 'berbere.jpg', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfISciMGFlQBdP7qR_SlcK1gVl2JzUB8lJVGIlkglBDg&s=10' },
  { file: 'mitmita.jpg', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJpJ_8-DiHhnfDxMNn9XWK3-uOaVXz7tGVC_ZtMcTIlA&s=10' },
  { file: 'shiro.jpg', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_93TsTzV4tVDVc9-CZZKuyiNjV6YFzj6ZTT3fMmTWhQ&s=10' },
  { file: 'korerima.jpg', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKmRYlFgyhauS1MCLwLAXEHdxSuScQQryk4TOWUa_VJQ&s=10' },
  { file: 'mekelesha.jpg', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQug5OuWubMmkEV4lzNXp1KP1PC3VEY-wAliePzxL1Q7w&s=10' },
  { file: 'tikur-azmud.jpg', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuf2hm9krBpnQQ83wVb7UzxPgtfn2QEjNkEgNPlr6cgg&s=10' },
  { file: 'besobila.jpg', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqzu5mbKrkK3_4OhvwxbL3dkrQm6Ny8vpKCx_gv9Ujdw&s' },
  { file: 'niter-kibe.jpg', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF2Zi_3CuGSPJVxezgaz2xmfMHNwRdO4ma_XGT-amtWw&s=10' },
  { file: 'teff.jpg', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgWwXuESqwHGZ7hpmY1eNYR9HkRaVD_kvpMc5pFTPnAw&s=10' },
  { file: 'heineken.jpg', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZVWmFJkgIAwqE34kOlFYrx7ehdfTtSYXXjZ_yS6BSUQ&s=10' },
  { file: 'ethiopian-beers.jpg', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXt90CaWLJdgtUkP-RPKWTiNd07Cq3fkem7bardDXnNoT5s6rK_WEQ08kU&s=10' },
  { file: 'habesha-wine.jpg', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHKeRetpD9q9EQv8kEvUMRCCYL3abV6L0jDSYJ7v9B4Q&s=10' },
  { file: 'sprite.jpg', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEESPkVN3t0PBRVmVwX0-7t1h0EDB2gp3hviDb91huaw&s=10' },
  { file: 'jebena-sini.jpg', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeOlwXnjfWU2ZQ6EtBRENBNZFc3r7GOKsi9NFyurlgnw&s=10' },
];

const outDir = 'public/items';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function downloadAll() {
  for (const item of items) {
    try {
      const res = await fetch(item.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(path.join(outDir, item.file), buf);
      console.log(`Saved ${item.file} (${buf.length} bytes)`);
    } catch (e) {
      console.error(`Failed ${item.file}: ${e.message}`);
    }
  }
}

downloadAll();
