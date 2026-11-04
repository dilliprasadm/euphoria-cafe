const https = require('https');

const url = 'https://core.service.elfsight.com/p/boot/?page=https%3A%2F%2Feuphoria.cafe%2F&w=5a42258c-a0c4-43ce-a74c-4c30f21e38b7';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://euphoria.cafe/' } }, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      const widget = Object.values(parsed.data.widgets)[0];
      console.log('Sources:', JSON.stringify(widget.data.settings?.sources, null, 2));
    } catch (e) {
      console.log('Error:', e.message);
    }
  });
});
