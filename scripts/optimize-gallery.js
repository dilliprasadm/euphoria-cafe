const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

const galleryDir = path.join(__dirname, '..', 'public', 'assets', 'gallery');
const files = fs.readdirSync(galleryDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

console.log(`Optimizing ${files.length} gallery images...`);

for (const file of files) {
  const filePath = path.join(galleryDir, file);
  const tempPath = path.join(galleryDir, 'tmp_' + file);
  
  const originalSize = fs.statSync(filePath).size;
  if (originalSize > 500 * 1024) { // only resize if > 500KB
    try {
      // Scale to max width 1280 (preserving aspect ratio) with high JPEG quality (qscale 3)
      const cmd = `"${ffmpegPath}" -y -i "${filePath}" -vf "scale='min(1280,iw)':-1" -q:v 3 "${tempPath}"`;
      execSync(cmd, { stdio: 'ignore' });
      
      const newSize = fs.statSync(tempPath).size;
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);
      console.log(`${file}: ${(originalSize / 1024 / 1024).toFixed(1)}MB -> ${(newSize / 1024).toFixed(0)}KB`);
    } catch (e) {
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      console.error(`Failed to optimize ${file}:`, e.message);
    }
  }
}

let total = 0;
fs.readdirSync(galleryDir).forEach(f => {
  total += fs.statSync(path.join(galleryDir, f)).size;
});
console.log('New total gallery folder size:', (total / (1024 * 1024)).toFixed(2), 'MB');
