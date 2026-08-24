import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateFavicons() {
  const svgPath = path.join(process.cwd(), 'public', 'favicon.svg');
  const publicDir = path.join(process.cwd(), 'public');

  const svgBuffer = fs.readFileSync(svgPath);

  // Generate PNG sizes
  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
    { name: 'favicon.png', size: 512 },
  ];

  for (const item of sizes) {
    const outputPath = path.join(publicDir, item.name);
    await sharp(svgBuffer)
      .resize(item.size, item.size)
      .png()
      .toFile(outputPath);
    console.log(`Generated ${item.name} (${item.size}x${item.size})`);
  }

  // Generate favicon.ico (using 48x48 PNG format inside ico container)
  const icoPath = path.join(publicDir, 'favicon.ico');
  await sharp(svgBuffer)
    .resize(48, 48)
    .toFormat('png')
    .toFile(icoPath);
  console.log('Generated favicon.ico');
}

generateFavicons().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
