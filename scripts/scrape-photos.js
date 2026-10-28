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

async function scrapeMapsPhotos() {
  console.log("Launching Chrome for Google Maps Photos...");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=en-US,en']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 950 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  await page.goto('https://www.google.com/maps/search/Euphoria+Cafe+880+6th+cross+Koramangala+Bengaluru', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  await page.waitForSelector('button[aria-label*="Photo"], button.aoRNLd', { timeout: 10000 });

  console.log("Clicking photo thumbnail...");
  await page.evaluate(() => {
    const photoBtn = document.querySelector('button[aria-label*="Photo of Euphoria"], button.aoRNLd, button[jsaction*="pane.heroHeaderImage"]');
    if (photoBtn) photoBtn.click();
  });

  await new Promise(r => setTimeout(r, 4000));
  await page.screenshot({ path: 'scripts/maps_gallery_open.png' });

  // Scroll down in the photos gallery pane
  for (let i = 0; i < 4; i++) {
    await page.evaluate(() => {
      const scrollable = document.querySelector('div[role="region"]') || 
                         document.querySelector('div.m6QErb') ||
                         document.querySelector('div[tabindex="-1"]');
      if (scrollable) scrollable.scrollTop += 1200;
    });
    await new Promise(r => setTimeout(r, 1500));
  }

  // Extract all photo URLs
  const photoUrls = await page.evaluate(() => {
    // Collect all background-image or img src
    const urls = [];
    document.querySelectorAll('div[style*="background-image"]').forEach(el => {
      const match = el.style.backgroundImage.match(/url\(['"]?(https:\/\/[^'"]+)['"]?\)/);
      if (match && match[1].includes('googleusercontent')) urls.push(match[1]);
    });
    document.querySelectorAll('img[src*="googleusercontent"]').forEach(img => {
      if (img.src) urls.push(img.src);
    });
    return Array.from(new Set(urls));
  });

  console.log(`Discovered ${photoUrls.length} Google Maps place photos!`);
  fs.writeFileSync('scripts/maps_photos_urls.json', JSON.stringify(photoUrls, null, 2));

  // Download high-resolution versions into public/assets/social
  const outDir = path.join(__dirname, '../public/assets/social');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const socialGallery = [];
  let index = 1;
  for (const rawUrl of photoUrls.slice(0, 15)) {
    // Replace size parameters with =w1000-h1000-k-no or =s1200 for crystal-clear high quality
    let cleanUrl = rawUrl;
    if (cleanUrl.includes('=')) {
      cleanUrl = cleanUrl.replace(/=w\d+-h\d+.*$/, '=w1000-h1000-k-no');
    }
    const fileName = `cafe_moment_${index++}.jpg`;
    const dest = path.join(outDir, fileName);
    try {
      console.log(`Downloading ${fileName}...`);
      await downloadFile(cleanUrl, dest);
      socialGallery.push({
        image: `/assets/social/${fileName}`,
        title: `Euphoria Moment ${index - 1}`,
        platform: 'Google / Instagram'
      });
    } catch (e) {
      console.error(`Failed ${fileName}:`, e.message);
    }
  }

  fs.writeFileSync(path.join(__dirname, '../src/data/socialGallery.json'), JSON.stringify(socialGallery, null, 2));
  console.log("Successfully saved socialGallery.json!");

  await browser.close();
}

scrapeMapsPhotos().catch(err => {
  console.error("Photos error:", err.message);
  process.exit(1);
});
