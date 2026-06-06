const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '../public/images');

// Recursive function to get all PNG, JPG, JPEG files
function getImagesRecursive(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getImagesRecursive(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        fileList.push(filePath);
      }
    }
  });
  return fileList;
}

async function convertToWebp() {
  console.log('Starting WebP conversion...');
  const images = getImagesRecursive(IMAGES_DIR);
  console.log(`Found ${images.length} images to convert.`);

  for (const imagePath of images) {
    const parsed = path.parse(imagePath);
    const destPath = path.join(parsed.dir, `${parsed.name}.webp`);
    
    try {
      console.log(`Converting: ${path.relative(IMAGES_DIR, imagePath)} -> ${parsed.name}.webp`);
      await sharp(imagePath)
        .webp({ quality: 80 }) // 80% quality compression
        .toFile(destPath);
      console.log(`Success: ${parsed.name}.webp created.`);
    } catch (err) {
      console.error(`Failed to convert ${imagePath}:`, err);
    }
  }
  console.log('WebP conversion complete!');
}

convertToWebp();
