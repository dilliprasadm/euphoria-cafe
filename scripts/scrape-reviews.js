const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  console.log("Launching Chrome...");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1280, height: 800 });

  console.log("Searching Google for Euphoria Cafe Koramangala reviews...");
  const searchUrl = 'https://www.google.com/search?q=Euphoria+Cafe+Koramangala+reviews';
  
  await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  
  // Save screenshot of search results
  await page.screenshot({ path: 'scripts/google_search.png' });
  console.log("Saved scripts/google_search.png");

  // Extract text and reviews
  const data = await page.evaluate(() => {
    const title = document.title;
    // Extract any review snippets
    const reviews = [];
    const elements = document.querySelectorAll('div[data-attrid*="review"], div[class*="review"], div[role="article"]');
    elements.forEach(el => {
      const text = el.innerText;
      if (text && text.length > 20) {
        reviews.push(text);
      }
    });
    
    // Also grab all visible text snippets mentioning stars or ratings
    const allText = document.body.innerText;
    return { title, reviews, snippet: allText.slice(0, 3000) };
  });

  fs.writeFileSync('scripts/google_data.json', JSON.stringify(data, null, 2));
  console.log("Extracted data, title:", data.title);
  console.log("Snippet:", data.snippet.slice(0, 500));

  await browser.close();
}

run().catch(err => {
  console.error("Scraper error:", err);
  process.exit(1);
});
