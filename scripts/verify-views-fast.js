const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function verify() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 950 });

  console.log("Loading Home Page...");
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });

  // Scroll to Google Reviews
  console.log("Scrolling to Google Reviews...");
  await page.evaluate(() => {
    document.getElementById('google-reviews')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 4000));
  await page.screenshot({ path: 'scripts/final_google_reviews.png' });
  console.log("Saved scripts/final_google_reviews.png");

  // Scroll to Instagram Feed
  console.log("Scrolling to Instagram Feed...");
  await page.evaluate(() => {
    document.getElementById('instagram-feed')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 4000));
  await page.screenshot({ path: 'scripts/final_instagram_feed.png' });
  console.log("Saved scripts/final_instagram_feed.png");

  // Visit Gallery Page and click GUESTS & INSTAGRAM
  console.log("Visiting Gallery Page...");
  await page.goto('http://localhost:3000/gallery', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const socialBtn = buttons.find(b => b.innerText.includes('GUESTS & INSTAGRAM'));
    if (socialBtn) socialBtn.click();
  });
  await new Promise(r => setTimeout(r, 4000));
  await page.screenshot({ path: 'scripts/final_gallery_social.png' });
  console.log("Saved scripts/final_gallery_social.png");

  await browser.close();
  console.log("All screenshots captured!");
}

verify().catch(console.error);
