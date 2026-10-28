const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testMaps() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=en-US,en']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  console.log("Navigating to Google Maps...");
  await page.goto('https://www.google.com/maps/search/Euphoria+Cafe+880+6th+cross+Koramangala+Bengaluru', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  await page.screenshot({ path: 'scripts/maps_result.png' });
  console.log("Screenshot saved to scripts/maps_result.png");

  // Get title and content
  const title = await page.title();
  console.log("Page title:", title);

  await browser.close();
}

testMaps().catch(err => {
  console.error("Error:", err.message);
  process.exit(1);
});
