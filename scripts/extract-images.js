const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const BASE_URL = 'https://euphoria.cafe';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'live-site');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location.startsWith('http') 
          ? res.headers.location 
          : new URL(res.headers.location, url).toString();
        return resolve(fetchUrl(redirectUrl));
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode} for ${url}`));
      }

      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

function downloadFile(url, destPath) {
  return new Promise(async (resolve, reject) => {
    try {
      const buffer = await fetchUrl(url);
      fs.writeFileSync(destPath, buffer);
      console.log(`Saved: ${destPath} (${buffer.length} bytes)`);
      resolve(true);
    } catch (err) {
      console.error(`Error downloading ${url}:`, err.message);
      resolve(false);
    }
  });
}

async function run() {
  console.log('Extracting images from', BASE_URL);

  const imagesToDownload = new Set();

  // 1. Fetch homepage HTML
  try {
    const htmlBuffer = await fetchUrl(BASE_URL);
    const html = htmlBuffer.toString('utf-8');

    // Regex for img src and url()
    const imgSrcRegex = /<img[^>]+src=["']([^"']+)["']/gi;
    let match;
    while ((match = imgSrcRegex.exec(html)) !== null) {
      imagesToDownload.add(match[1]);
    }

    const bgUrlRegex = /url\(["']?([^"')]+)["']?\)/gi;
    while ((match = bgUrlRegex.exec(html)) !== null) {
      imagesToDownload.add(match[1]);
    }

    const hrefRegex = /href=["']([^"']+\.(?:png|jpg|jpeg|webp|svg))(?:\?[^"']*)?["']/gi;
    while ((match = hrefRegex.exec(html)) !== null) {
      imagesToDownload.add(match[1]);
    }
  } catch (err) {
    console.error('Error fetching home HTML:', err.message);
  }

  // 2. Fetch menu.php
  try {
    const menuBuffer = await fetchUrl(`${BASE_URL}/menu.php`);
    const menuText = menuBuffer.toString('utf-8');

    // Parse window.EUPHORIA_MENU
    const jsonMatch = menuText.match(/window\.EUPHORIA_MENU\s*=\s*(\{[\s\S]*?\});/);
    if (jsonMatch) {
      try {
        const menuObj = JSON.parse(jsonMatch[1]);
        if (menuObj.products && Array.isArray(menuObj.products)) {
          menuObj.products.forEach(p => {
            if (p.image) imagesToDownload.add(p.image);
          });
        }
      } catch (e) {
        console.error('Failed to parse menu JSON:', e.message);
      }
    }

    // Also look for assets/ in menuText
    const assetRegex = /assets\/[a-zA-Z0-9_\-\.\/]+\.(?:png|jpg|jpeg|webp|svg)/gi;
    let m;
    while ((m = assetRegex.exec(menuText)) !== null) {
      imagesToDownload.add(m[0]);
    }
  } catch (err) {
    console.error('Error fetching menu.php:', err.message);
  }

  // 3. Fetch styles.css
  try {
    const cssBuffer = await fetchUrl(`${BASE_URL}/styles.css`);
    const cssText = cssBuffer.toString('utf-8');
    const cssUrlRegex = /url\(["']?([^"')]+)["']?\)/gi;
    let m;
    while ((m = cssUrlRegex.exec(cssText)) !== null) {
      imagesToDownload.add(m[1]);
    }
  } catch (err) {
    console.error('Error fetching styles.css:', err.message);
  }

  console.log(`Found ${imagesToDownload.size} unique image references:`, Array.from(imagesToDownload));

  const downloaded = [];
  for (const rawUrl of imagesToDownload) {
    let cleanUrl = rawUrl.split('?')[0].trim();
    if (cleanUrl.startsWith('data:') || cleanUrl.startsWith('blob:')) continue;

    let fullUrl;
    if (cleanUrl.startsWith('http')) {
      fullUrl = cleanUrl;
    } else if (cleanUrl.startsWith('/')) {
      fullUrl = `${BASE_URL}${cleanUrl}`;
    } else {
      fullUrl = `${BASE_URL}/${cleanUrl}`;
    }

    const filename = path.basename(cleanUrl);
    const destPath = path.join(OUTPUT_DIR, filename);

    console.log(`Downloading ${fullUrl} -> ${filename}...`);
    const success = await downloadFile(fullUrl, destPath);
    if (success) {
      downloaded.push({
        original: rawUrl,
        filename,
        localPath: `/assets/live-site/${filename}`
      });
    }
  }

  // Write manifest
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'manifest.json'),
    JSON.stringify(downloaded, null, 2)
  );

  console.log(`Extraction complete! Saved ${downloaded.length} images to ${OUTPUT_DIR}`);
}

run();
