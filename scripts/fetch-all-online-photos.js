const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function downloadFile(url, dest) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve);
      }
      if (res.statusCode !== 200) {
        console.log(`Failed status ${res.statusCode} for ${url}`);
        return resolve(false);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    }).on('error', (e) => {
      console.log('Error downloading:', e.message);
      resolve(false);
    });
  });
}

async function scrapeAll() {
  console.log("Launching browser to extract online photos for Euphoria Cafe...");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=en-US,en']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  const photoUrls = new Set();

  // 1. Google Maps direct place URL
  console.log("Navigating to Google Maps Place...");
  try {
    await page.goto('https://www.google.com/maps/search/Euphoria+Cafe+Koramangala+Bengaluru/@12.9349,77.6250,17z', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    await new Promise(r => setTimeout(r, 4000));

    // Click on photo button
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const photoBtn = btns.find(b => b.getAttribute('aria-label')?.includes('Photo') || b.querySelector('img'));
      if (photoBtn) photoBtn.click();
    });

    await new Promise(r => setTimeout(r, 4000));

    // Scroll gallery pane multiple times
    for (let i = 0; i < 8; i++) {
      await page.evaluate(() => {
        const panes = document.querySelectorAll('div[tabindex="-1"], div.m6QErb, div[role="region"]');
        panes.forEach(p => p.scrollTop += 2000);
      });
      await new Promise(r => setTimeout(r, 1500));
    }

    // Extract all googleusercontent photos
    const urls = await page.evaluate(() => {
      const found = [];
      document.querySelectorAll('img[src*="googleusercontent"]').forEach(img => {
        if (img.src) found.push(img.src);
      });
      document.querySelectorAll('[style*="googleusercontent"]').forEach(el => {
        const m = el.style.backgroundImage.match(/url\(['"]?(https:\/\/[^'"]+)['"]?\)/);
        if (m) found.push(m[1]);
      });
      return found;
    });

    console.log(`Google Maps returned ${urls.length} raw image URLs.`);
    urls.forEach(u => photoUrls.add(u));
  } catch (err) {
    console.error("Google Maps error:", err.message);
  }

  // 2. Magicpin / Justdial photos search
  console.log("Checking Magicpin / Web for Euphoria Cafe Koramangala photos...");
  try {
    await page.goto('https://magicpin.in/Bangalore/Koramangala/Restaurant/Euphoria-Cafe/photos/', {
      waitUntil: 'domcontentloaded',
      timeout: 20000
    });
    await new Promise(r => setTimeout(r, 3000));

    const magicpinUrls = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs
        .map(i => i.src || i.dataset.src)
        .filter(src => src && (src.includes('magicpin') || src.includes('static') || src.includes('media')) && !src.includes('icon') && !src.includes('logo'));
    });

    console.log(`Magicpin returned ${magicpinUrls.length} image URLs.`);
    magicpinUrls.slice(0, 15).forEach(u => photoUrls.add(u));
  } catch (e) {
    console.log("Magicpin attempt:", e.message);
  }

  console.log(`Total unique image URLs collected: ${photoUrls.size}`);

  const outDir = path.join(__dirname, '../public/assets/online-gallery');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  let downloadedCount = 0;
  const manifest = [];

  for (const rawUrl of Array.from(photoUrls)) {
    if (downloadedCount >= 30) break;
    if (rawUrl.includes('w32-h32') || rawUrl.includes('p-k-no') && rawUrl.includes('w36')) continue;

    let highResUrl = rawUrl;
    if (highResUrl.includes('googleusercontent.com')) {
      highResUrl = highResUrl.replace(/=w\d+-h\d+.*$/, '=w1200-h900-k-no');
    }

    const filename = `online_photo_${downloadedCount + 1}.jpg`;
    const dest = path.join(outDir, filename);

    console.log(`Downloading photo ${downloadedCount + 1}...`);
    const success = await downloadFile(highResUrl, dest);
    if (success) {
      downloadedCount++;
      manifest.push({
        id: `online-${downloadedCount}`,
        image: `/assets/online-gallery/${filename}`,
        title: `Euphoria Café Koramangala Experience ${downloadedCount}`,
        source: 'Verified Online Review / Place Photo'
      });
    }
  }

  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`Successfully downloaded ${downloadedCount} high-res online photos to ${outDir}!`);

  await browser.close();
}

scrapeAll().catch(e => {
  console.error("Scrape error:", e);
  process.exit(1);
});
