const https = require('https');
const fs = require('fs');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function search() {
  const query = encodeURIComponent('"Euphoria Cafe" Koramangala review');
  const html = await fetch(`https://html.duckduckgo.com/html/?q=${query}`);
  fs.writeFileSync('scripts/ddg_results.html', html);
  console.log("Saved ddg_results.html, length:", html.length);
  
  // Extract snippets
  const regex = /<a class="result__snippet[^>]*>([\s\S]*?)<\/a>/g;
  let match;
  let count = 0;
  while ((match = regex.exec(html)) !== null && count < 10) {
    const text = match[1].replace(/<[^>]+>/g, '').trim();
    console.log(`[Result ${++count}]:`, text);
  }
}

search().catch(console.error);
