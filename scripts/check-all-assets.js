const https = require('https');

https.get('https://euphoria.cafe', { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const assetMatches = data.match(/assets\/[^\s"'<>)]+/g) || [];
    const srcMatches = data.match(/src=["']([^"']+)["']/g) || [];
    console.log('Asset matches:', [...new Set(assetMatches)]);
    console.log('Src matches:', [...new Set(srcMatches)]);

    // Check small-art
    const smallArtMatch = data.match(/<[^>]+class=["'][^"']*small-art[^"']*["'][^>]*>/i);
    console.log('Small art tag:', smallArtMatch ? smallArtMatch[0] : 'None');
  });
});
