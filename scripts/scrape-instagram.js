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

async function scrapeInstagram() {
  console.log("Launching Chrome for Instagram...");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=en-US,en']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  console.log("Opening Instagram profile...");
  await page.goto('https://www.instagram.com/euphoria_cafe_koramangala/', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  await new Promise(r => setTimeout(r, 4000));
  await page.screenshot({ path: 'scripts/instagram_page.png' });
  console.log("Screenshot saved to scripts/instagram_page.png");

  // Extract all images
  const images = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('article img, main img'));
    return imgs.map(img => ({
      src: img.src,
      alt: img.alt || ''
    })).filter(i => i.src && (i.src.includes('cdninstagram') || i.src.includes('fbcdn')));
  });

  console.log(`Found ${images.length} Instagram images!`);
  fs.writeFileSync('scripts/instagram_data.json', JSON.stringify(images, null, 2));

  // Destination dir
  const outDir = path.join(__dirname, '../public/assets/instagram');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  let count = 1;
  const savedList = [];
  for (const img of images) {
    const filename = `instagram_post_${count++}.jpg`;
    const dest = path.join(outDir, filename);
    try {
      console.log(`Downloading ${filename}...`);
      await downloadFile(img.src, dest);
      savedList.push({
        image: `/assets/instagram/${filename}`,
        alt: img.alt || 'Euphoria Cafe Koramangala Instagram Post',
        caption: img.alt ? img.alt.slice(0, 100) : 'Euphoria moments in Koramangala'
      });
    } catch (e) {
      console.error(`Failed ${filename}:`, e.message);
    }
  }

  fs.writeFileSync(path.join(__dirname, '../src/data/instagram.json'), JSON.stringify(savedList, null, 2));
  console.log("Finished Instagram scrape & download!");

  await browser.close();
}

scrapeInstagram().catch(err => {
  console.error("IG scrape error:", err.message);
  process.exit(1);
});
