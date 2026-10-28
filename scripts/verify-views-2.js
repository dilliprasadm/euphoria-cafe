const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function waitForAllImages(page) {
  await page.evaluate(async () => {
    const selectors = Array.from(document.querySelectorAll("img"));
    await Promise.all(
      selectors.map((img) => {
        if (img.complete) return;
        return new Promise((resolve) => {
          img.addEventListener("load", resolve);
          img.addEventListener("error", resolve);
        });
      })
    );
  });
}

async function verify() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  console.log("Loading Home Page...");
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Scroll down to Google Reviews
  console.log("Scrolling to Google Reviews...");
  await page.evaluate(() => {
    document.getElementById('google-reviews')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 2000));
  await waitForAllImages(page);
  await page.screenshot({ path: 'scripts/verified_google_reviews.png' });
  console.log("Saved verified_google_reviews.png");

  // Scroll down to Instagram Feed
  console.log("Scrolling to Instagram Feed...");
  await page.evaluate(() => {
    document.getElementById('instagram-feed')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 2500));
  await waitForAllImages(page);
  await page.screenshot({ path: 'scripts/verified_instagram_feed.png' });
  console.log("Saved verified_instagram_feed.png");

  // Visit Gallery Page and click GUESTS & INSTAGRAM tab
  console.log("Visiting Gallery Page...");
  await page.goto('http://localhost:3000/gallery', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const socialBtn = buttons.find(b => b.innerText.includes('GUESTS & INSTAGRAM'));
    if (socialBtn) socialBtn.click();
  });
  await new Promise(r => setTimeout(r, 2000));
  await waitForAllImages(page);
  await page.screenshot({ path: 'scripts/verified_gallery_social.png' });
  console.log("Saved verified_gallery_social.png");

  await browser.close();
  console.log("All verifications complete!");
}

verify().catch(console.error);
