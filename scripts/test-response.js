const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    const cssLinks = data.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi) || [];
    console.log('CSS Links found:', cssLinks);
    const styleTags = data.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
    console.log('Style tags found count:', styleTags.length);
    console.log('HTML snippet (head):', data.slice(0, 1500));
  });
});
