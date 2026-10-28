const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function verify() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.message));

  console.log("Loading Home Page...");
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Scroll down to Google Reviews section
  console.log("Scrolling to Google Reviews...");
  await page.evaluate(() => {
    const el = document.getElementById('google-reviews');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'scripts/screenshot_google_reviews.png' });
  console.log("Saved scripts/screenshot_google_reviews.png");

  // Scroll down to Instagram Feed section
  console.log("Scrolling to Instagram Feed...");
  await page.evaluate(() => {
    const el = document.getElementById('instagram-feed');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: 'scripts/screenshot_instagram_feed.png' });
  console.log("Saved scripts/screenshot_instagram_feed.png");

  // Check Gallery Page
  console.log("Loading Gallery Page...");
  await page.goto('http://localhost:3000/gallery', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'scripts/screenshot_gallery.png' });
  console.log("Saved scripts/screenshot_gallery.png");

  await browser.close();
  console.log("Verification complete!");
}

verify().catch(err => {
  console.error("Verification error:", err);
  process.exit(1);
});
