const urls = [
  { name: 'Teff Injera', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw17tDroj65Kx6IGJ90PzDRXNgon7JRlsfAp3q7C9z9A&s=10' },
  { name: 'Ambasha', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOQKgh-ZO77puWZp4otrZYzwjdp0YX9welQxF3Cf4fJA&s=10' },
  { name: 'Sheep & Goat', url: 'https://aljisrlivestock.com/assets/breeds/ethiopian/ethiopian_arsi_bale_sheep-800.webp' },
  { name: 'Berbere', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfISciMGFlQBdP7qR_SlcK1gVl2JzUB8lJVGIlkglBDg&s=10' },
  { name: 'Mitmita', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJpJ_8-DiHhnfDxMNn9XWK3-uOaVXz7tGVC_ZtMcTIlA&s=10' },
  { name: 'Shiro', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_93TsTzV4tVDVc9-CZZKuyiNjV6YFzj6ZTT3fMmTWhQ&s=10' },
  { name: 'Korerima', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKmRYlFgyhauS1MCLwLAXEHdxSuScQQryk4TOWUa_VJQ&s=10' },
  { name: 'Mekelesha', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQug5OuWubMmkEV4lzNXp1KP1PC3VEY-wAliePzxL1Q7w&s=10' },
  { name: 'Tikur Azmud', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuf2hm9krBpnQQ83wVb7UzxPgtfn2QEjNkEgNPlr6cgg&s=10' },
  { name: 'Besobila', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqzu5mbKrkK3_4OhvwxbL3dkrQm6Ny8vpKCx_gv9Ujdw&s' },
  { name: 'Niter Kibe', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF2Zi_3CuGSPJVxezgaz2xmfMHNwRdO4ma_XGT-amtWw&s=10' },
  { name: 'Teff', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgWwXuESqwHGZ7hpmY1eNYR9HkRaVD_kvpMc5pFTPnAw&s=10' },
  { name: 'Heineken', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZVWmFJkgIAwqE34kOlFYrx7ehdfTtSYXXjZ_yS6BSUQ&s=10' },
  { name: 'Ethiopian Beers', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXt90CaWLJdgtUkP-RPKWTiNd07Cq3fkem7bardDXnNoT5s6rK_WEQ08kU&s=10' },
  { name: 'Habesha Wine', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHKeRetpD9q9EQv8kEvUMRCCYL3abV6L0jDSYJ7v9B4Q&s=10' },
  { name: 'Sprite', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEESPkVN3t0PBRVmVwX0-7t1h0EDB2gp3hviDb91huaw&s=10' },
  { name: 'Jebena Sini', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeOlwXnjfWU2ZQ6EtBRENBNZFc3r7GOKsi9NFyurlgnw&s=10' }
];

async function checkUrls() {
  for (const item of urls) {
    try {
      const res = await fetch(item.url, { method: 'HEAD' });
      console.log(`${res.status === 200 ? 'OK 200' : res.status} - ${item.name}`);
    } catch (e) {
      console.log(`ERR - ${item.name}: ${e.message}`);
    }
  }
}

checkUrls();
