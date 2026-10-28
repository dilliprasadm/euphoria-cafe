const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function scrapeMapsReviews() {
  console.log("Launching Chrome...");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=en-US,en']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 950 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  console.log("Navigating to Google Maps...");
  await page.goto('https://www.google.com/maps/search/Euphoria+Cafe+880+6th+cross+Koramangala+Bengaluru', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  // Click on Reviews tab
  console.log("Clicking Reviews tab...");
  const reviewTabSelector = 'button[aria-label*="Reviews"], button[data-tab-index="1"], div[role="tablist"] button:nth-child(2)';
  await page.waitForSelector('button[role="tab"]', { timeout: 10000 });
  
  // Find review button
  const clicked = await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('button[role="tab"]'));
    const reviewTab = tabs.find(t => t.innerText.includes('Reviews'));
    if (reviewTab) {
      reviewTab.click();
      return true;
    }
    return false;
  });
  console.log("Review tab clicked:", clicked);

  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: 'scripts/reviews_tab.png' });

  // Scroll the review panel
  console.log("Scrolling reviews...");
  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => {
      const scrollable = document.querySelector('div[class*="m6QErb DxyBCb"]') || 
                         document.querySelector('div[role="region"]') ||
                         document.querySelector('div[tabindex="-1"]');
      if (scrollable) {
        scrollable.scrollTop += 1000;
      } else {
        window.scrollBy(0, 1000);
      }
    });
    await new Promise(r => setTimeout(r, 1500));
  }

  // Click all "More" buttons to expand review text
  await page.evaluate(() => {
    const moreButtons = Array.from(document.querySelectorAll('button[aria-label="See more"], button.w8nwRe'));
    moreButtons.forEach(b => b.click());
  });
  await new Promise(r => setTimeout(r, 1000));

  // Extract reviews
  const reviewsData = await page.evaluate(() => {
    const reviewCards = Array.from(document.querySelectorAll('div[data-review-id], div[class*="jftiEf"]'));
    return reviewCards.map(card => {
      const author = card.querySelector('.d4r55, div[class*="WNxFfe"] .fontHeadlineSmall')?.innerText?.trim() || 'Euphoria Guest';
      const ratingEl = card.querySelector('span[role="img"][aria-label*="star"], span[class*="kvMYJc"]');
      const rating = ratingEl ? (ratingEl.getAttribute('aria-label') || '5 stars') : '5 stars';
      const date = card.querySelector('.rsqaWe, span[class*="bp9Aid"]')?.innerText?.trim() || 'Recent';
      const text = card.querySelector('.wiI7fc, div[class*="MyEned"] span')?.innerText?.trim() || '';
      
      // Look for reviewer photo
      const avatar = card.querySelector('img[src*="googleusercontent"]')?.src || '';
      
      // Look for attached review photos
      const photos = Array.from(card.querySelectorAll('div[class*="Tya61d"], button[style*="background-image"]'))
        .map(el => {
          const bg = el.style.backgroundImage;
          const match = bg.match(/url\(['"]?(.*?)['"]?\)/);
          return match ? match[1] : null;
        }).filter(Boolean);

      return { author, rating, date, text, avatar, photos };
    }).filter(r => r.text && r.text.length > 10);
  });

  console.log(`Extracted ${reviewsData.length} full reviews!`);
  fs.writeFileSync('scripts/extracted_reviews.json', JSON.stringify(reviewsData, null, 2));

  // Now let's also click on Photos tab or extract photos from the place!
  console.log("Navigating to photos...");
  const photoTabClicked = await page.evaluate(() => {
    // find photos button or back to overview then click main photo
    const mainPhoto = document.querySelector('button[aria-label*="Photo"], img[alt*="Euphoria"]');
    if (mainPhoto) {
      mainPhoto.click();
      return true;
    }
    return false;
  });

  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: 'scripts/photos_view.png' });

  // Extract photo URLs from the page
  const photoUrls = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img[src*="googleusercontent.com/p/"]'));
    return imgs.map(img => img.src).filter((v, i, a) => a.indexOf(v) === i);
  });
  console.log(`Found ${photoUrls.length} Google Maps place photos!`);
  fs.writeFileSync('scripts/place_photos.json', JSON.stringify(photoUrls, null, 2));

  await browser.close();
}

scrapeMapsReviews().catch(err => {
  console.error("Scraper error:", err);
  process.exit(1);
});
