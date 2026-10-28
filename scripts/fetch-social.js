const fs = require('fs');
const https = require('https');

function fetchUrl(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        ...headers
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location, headers).then(resolve).catch(reject);
      }
      let chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve({ status: res.statusCode, headers: res.headers, body: buffer.toString('utf-8') });
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function main() {
  const igRes = await fetchUrl('https://www.instagram.com/euphoria_cafe_koramangala/');
  fs.writeFileSync('scripts/ig-dump.html', igRes.body);
  console.log("Saved ig-dump.html");
  
  // Search for mentions of euphoria or images in dump
  const matches = igRes.body.match(/https?:\/\/[^"'\s\\]+(?:cdninstagram|fbcdn)[^"'\s\\]+/gi) || [];
  console.log(`Found ${matches.length} cdn images`);
  matches.slice(0, 10).forEach(m => console.log(m));
}

main();
