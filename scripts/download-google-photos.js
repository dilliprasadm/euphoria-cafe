const fs = require('fs');
const path = require('path');
const https = require('https');

const urls = JSON.parse(fs.readFileSync(path.join(__dirname, 'maps_photos_urls.json'), 'utf-8'));
const outDir = path.join(__dirname, '../public/assets/google-photos');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve);
      }
      if (res.statusCode !== 200) {
        console.log(`Status ${res.statusCode} for ${url}`);
        return resolve(false);
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        console.log(`Saved ${path.basename(dest)}`);
        resolve(true);
      });
    }).on('error', (e) => {
      console.log('Error:', e.message);
      resolve(false);
    });
  });
}

async function run() {
  console.log(`Downloading ${urls.length} Google Maps place photos in high resolution...`);
  const uniqueUrls = [...new Set(urls.map(u => u.split('=')[0]))];
  let idx = 1;
  const manifest = [];

  for (const baseUrl of uniqueUrls) {
    if (baseUrl.includes('w32-h32')) continue;
    // Request full high-res 1200x800
    const highResUrl = `${baseUrl}=w1200-h900-k-no`;
    const filename = `euphoria_google_photo_${idx++}.jpg`;
    const dest = path.join(outDir, filename);

    const ok = await download(highResUrl, dest);
    if (ok) {
      manifest.push({
        id: `gp-${idx}`,
        title: `Euphoria Café Koramangala Experience`,
        image: `/assets/google-photos/${filename}`,
        source: 'Google Verified Place Photo'
      });
    }
  }

  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`Downloaded ${manifest.length} photos!`);
}

run();
