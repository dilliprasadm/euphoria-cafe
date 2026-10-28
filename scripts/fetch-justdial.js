const https = require('https');
const fs = require('fs');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    }, res => {
      let data = '';
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function scrapeJustdial() {
  console.log("Fetching Justdial page...");
  // Search URL on Justdial
  const searchUrl = 'https://www.justdial.com/Bangalore/Euphoria-Cafe-Near-Koramangala-Club-Koramangala-6th-Block/080PXX80-XX80-230504190825-L6D4_BZDET';
  try {
    const html = await fetch(searchUrl);
    fs.writeFileSync('scripts/justdial.html', html);
    console.log("Saved justdial.html, size:", html.length);
    
    // Extract review comments
    const reviewMatches = html.match(/class="[^"]*user-review[^"]*"[^>]*>([\s\S]*?)<\/div>/gi) || [];
    console.log("Found user-reviews:", reviewMatches.length);
    
    // Also look for quotes or review texts
    const textMatches = html.match(/<p class="[^"]*review[^"]*">([\s\S]*?)<\/p>/gi) || [];
    console.log("Found review p tags:", textMatches.length);
  } catch (e) {
    console.error("Justdial fetch error:", e.message);
  }
}

scrapeJustdial();
