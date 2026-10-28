const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

function optimizeDir(subDir) {
  const targetDir = path.join(__dirname, '..', 'public', 'assets', subDir);
  if (!fs.existsSync(targetDir)) return;
  const files = fs.readdirSync(targetDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  console.log(`Checking ${files.length} images in ${subDir}...`);

  for (const file of files) {
    const filePath = path.join(targetDir, file);
    const tempPath = path.join(targetDir, 'tmp_' + file);
    
    const originalSize = fs.statSync(filePath).size;
    if (originalSize > 500 * 1024) {
      try {
        const cmd = `"${ffmpegPath}" -y -i "${filePath}" -vf "scale='min(1280,iw)':-1" -q:v 3 "${tempPath}"`;
        execSync(cmd, { stdio: 'ignore' });
        
        const newSize = fs.statSync(tempPath).size;
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
        console.log(`${file}: ${(originalSize / 1024 / 1024).toFixed(1)}MB -> ${(newSize / 1024).toFixed(0)}KB`);
      } catch (e) {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    }
  }

  let total = 0;
  fs.readdirSync(targetDir).forEach(f => {
    total += fs.statSync(path.join(targetDir, f)).size;
  });
  console.log(`Total ${subDir} size: ${(total / (1024 * 1024)).toFixed(2)} MB`);
}

optimizeDir('menu');
optimizeDir('web-assets');
