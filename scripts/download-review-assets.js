const fs = require('fs');
const path = require('path');
const https = require('https');

const reviews = JSON.parse(fs.readFileSync('scripts/extracted_reviews.json', 'utf8'));

// Unique reviews by text
const uniqueReviews = [];
const seenTexts = new Set();
for (const r of reviews) {
  if (!seenTexts.has(r.text)) {
    seenTexts.add(r.text);
    uniqueReviews.push(r);
  }
}

console.log(`Unique reviews: ${uniqueReviews.length}`);

// Destination dir
const outDir = path.join(__dirname, '../public/assets/reviews');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    // High-res URL replacement
    const highResUrl = url.replace(/=w\d+-h\d+-p-k-no/, '=w1000-h800-p-k-no');
    const file = fs.createWriteStream(dest);
    https.get(highResUrl, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function downloadAll() {
  const downloadedData = [];
  let photoIndex = 1;

  for (const review of uniqueReviews) {
    const savedPhotos = [];
    for (const pUrl of review.photos) {
      const fileName = `review_photo_${photoIndex++}.jpg`;
      const filePath = path.join(outDir, fileName);
      try {
        console.log(`Downloading ${fileName}...`);
        await download(pUrl, filePath);
        savedPhotos.push(`/assets/reviews/${fileName}`);
      } catch (e) {
        console.error(`Failed ${fileName}:`, e.message);
      }
    }
    
    // Also save avatar if present
    let avatarPath = '';
    if (review.avatar) {
      const avatarName = `avatar_${photoIndex}.jpg`;
      const avatarFilePath = path.join(outDir, avatarName);
      try {
        await download(review.avatar, avatarFilePath);
        avatarPath = `/assets/reviews/${avatarName}`;
      } catch (e) {}
    }

    downloadedData.push({
      author: review.author,
      rating: 5,
      date: review.date,
      text: review.text,
      avatar: avatarPath || review.avatar,
      photos: savedPhotos
    });
  }

  // Also write cleaned JSON for Next.js app
  const targetDir = path.join(__dirname, '../src/data');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  fs.writeFileSync(path.join(targetDir, 'reviews.json'), JSON.stringify(downloadedData, null, 2));
  console.log("Successfully saved reviews.json and images!");
}

downloadAll().catch(console.error);
