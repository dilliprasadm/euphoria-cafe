const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const https = require('https');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function scrapeGoogleImages() {
  console.log("Searching Google Images for Euphoria Cafe Koramangala food, rooftop & instagram photos...");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 950 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  const queries = [
    'https://www.google.com/search?tbm=isch&q=Euphoria+Cafe+Koramangala+instagram',
    'https://www.google.com/search?tbm=isch&q=Euphoria+Cafe+Koramangala+rooftop+waffles',
  ];

  const outDir = path.join(__dirname, '../public/assets/instagram');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const allFound = [];
  let count = 1;

  for (const q of queries) {
    try {
      await page.goto(q, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await new Promise(r => setTimeout(r, 2500));

      const imgUrls = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.map(img => img.src).filter(src => src && (src.startsWith('https://encrypted-tbn0.gstatic.com/') || src.includes('googleusercontent') || src.includes('cdninstagram') || src.includes('fbcdn')));
      });

      console.log(`Query yielded ${imgUrls.length} images`);
      for (const u of imgUrls.slice(0, 8)) {
        if (allFound.includes(u)) continue;
        allFound.push(u);

        const filename = `ig_highlight_${count++}.jpg`;
        const dest = path.join(outDir, filename);
        try {
          await downloadFile(u, dest);
          console.log(`Saved ${filename}`);
        } catch (e) {}
      }
    } catch (e) {
      console.log('Query error:', e.message);
    }
  }

  // Update instagram.json
  const igList = [];
  const files = fs.readdirSync(outDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  files.forEach((f, idx) => {
    igList.push({
      id: `ig-${idx + 1}`,
      image: `/assets/instagram/${f}`,
      alt: `Euphoria Cafe Koramangala Moment ${idx + 1}`,
      caption: `Real moments, decadent creations and rooftop skies at Euphoria Café Koramangala.`,
      likes: Math.floor(80 + Math.random() * 140),
      comments: Math.floor(10 + Math.random() * 25)
    });
  });

  fs.writeFileSync(path.join(__dirname, '../src/data/instagram.json'), JSON.stringify(igList, null, 2));
  console.log(`Saved ${igList.length} items to instagram.json!`);

  await browser.close();
}

scrapeGoogleImages().catch(err => {
  console.error("Error:", err.message);
  process.exit(1);
});
