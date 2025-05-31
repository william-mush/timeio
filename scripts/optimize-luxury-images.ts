import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

async function optimizeImage(inputPath: string, outputPath: string) {
  try {
    await sharp(inputPath)
      .resize(1024, 1024, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .webp({
        quality: 80,
        effort: 6
      })
      .toFile(outputPath);
    
    console.log(`Optimized: ${path.basename(inputPath)}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
}

async function main() {
  const aiDir = path.join(process.cwd(), 'public', 'images', 'luxury', 'ai');
  const optimizedDir = path.join(process.cwd(), 'public', 'images', 'luxury', 'optimized');

  // Ensure directories exist
  await fs.mkdir(optimizedDir, { recursive: true });

  // Get all JPG files from the AI directory
  const files = await fs.readdir(aiDir);
  const jpgFiles = files.filter(file => file.endsWith('.jpg'));

  // Process each file
  for (const file of jpgFiles) {
    const inputPath = path.join(aiDir, file);
    const outputPath = path.join(optimizedDir, file.replace('.jpg', '.webp'));
    await optimizeImage(inputPath, outputPath);
  }
}

main().catch(console.error); 