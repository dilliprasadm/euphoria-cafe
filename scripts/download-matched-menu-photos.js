const fs = require('fs');
const path = require('path');
const https = require('https');

const outDir = path.join(__dirname, '../public/assets/menu-matched');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const foodPhotos = {
  'daily-toast.jpg': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200&q=85&auto=format&fit=crop', // Sourdough avocado & eggs toast
  'fresh-salads.jpg': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=85&auto=format&fit=crop', // Vibrant fresh colorful salad bowl
  'pizzas-burgers.jpg': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=85&auto=format&fit=crop', // Delicious stone-baked cheese pizza
  'refreshing-mojitos.jpg': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1200&q=85&auto=format&fit=crop', // Fresh berry citrus sparkling cooler mojito
  'coffee-specialties.jpg': 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=1200&q=85&auto=format&fit=crop', // Bright artisanal latte art coffee
  'savory-fries.jpg': 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=1200&q=85&auto=format&fit=crop', // Hot crispy golden seasoned french fries
  'chocolate-waffle.jpg': 'https://images.unsplash.com/photo-1588775404179-8260f38eb454?w=1200&q=85&auto=format&fit=crop', // Decadent Belgian waffle with molten chocolate
  'cheesecake-slice.jpg': 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=1200&q=85&auto=format&fit=crop', // Creamy berry topped New York cheesecake slice
  'waffle-sundae.jpg': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1200&q=85&auto=format&fit=crop', // Loaded ice cream waffle sundae with chocolate drizzle
};

function download(url, dest) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve);
      }
      if (res.statusCode !== 200) {
        console.log(`Failed status ${res.statusCode} for ${url}`);
        return resolve(false);
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        console.log(`Saved: ${path.basename(dest)}`);
        resolve(true);
      });
    }).on('error', (e) => {
      console.log('Error:', e.message);
      resolve(false);
    });
  });
}

async function run() {
  console.log('Downloading matched high-resolution food category images...');
  for (const [filename, url] of Object.entries(foodPhotos)) {
    const dest = path.join(outDir, filename);
    await download(url, dest);
  }
  console.log('All matched food photos downloaded successfully!');
}

run();
