const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

const targetDir = path.join(__dirname, '..', 'public', 'assets', 'sequence');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Clear any existing frames
for (const f of fs.readdirSync(targetDir)) {
  if (f.endsWith('.webp')) {
    fs.unlinkSync(path.join(targetDir, f));
  }
}

const inputVideo = path.join(__dirname, '..', 'public', 'videos', 'hero-dessert.mp4');
const outputPattern = path.join(targetDir, 'frame_%03d.webp');

console.log('Using ffmpeg at:', ffmpegPath);
console.log('Extracting from:', inputVideo);
console.log('Target directory:', targetDir);

// 12 fps extraction at 1280x720 with WebP quality 75
const cmd = `"${ffmpegPath}" -y -i "${inputVideo}" -vf "fps=12,scale=1280:720" -c:v libwebp -lossless 0 -compression_level 4 -q:v 75 "${outputPattern}"`;
console.log('Executing command...');
execSync(cmd, { stdio: 'inherit' });

const generated = fs.readdirSync(targetDir).filter(f => f.endsWith('.webp')).sort();
console.log(`Generated ${generated.length} frames.`);

let totalBytes = 0;
for (const f of generated) {
  totalBytes += fs.statSync(path.join(targetDir, f)).size;
}
console.log(`Total sequence size: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`);
console.log(`First frame: ${generated[0]}, Last frame: ${generated[generated.length - 1]}`);
