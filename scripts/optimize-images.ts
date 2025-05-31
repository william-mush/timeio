import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const QUALITY = 80;
const WIDTH = 1024;
const HEIGHT = 768;

async function optimizeImage(inputPath: string, outputPath: string) {
  try {
    console.log(`Optimizing image: ${inputPath}`);
    
    // Create output directory if it doesn't exist
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // Process the image
    await sharp(inputPath)
      .resize(WIDTH, HEIGHT, {
        fit: 'cover',
        position: 'center'
      })
      .webp({
        quality: QUALITY,
        effort: 6
      })
      .toFile(outputPath);

    console.log(`Successfully optimized image to: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`Error optimizing image ${inputPath}:`, error);
    return false;
  }
}

async function processDirectory(inputDir: string, outputDir: string) {
  try {
    // Read all files from input directory
    const files = await fs.readdir(inputDir);
    
    // Process each image
    for (const file of files) {
      if (file.endsWith('.jpg') || file.endsWith('.png')) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file.replace(/\.(jpg|png)$/, '.webp'));
        await optimizeImage(inputPath, outputPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${inputDir}:`, error);
  }
}

async function main() {
  const baseDir = path.join(process.cwd(), 'public', 'images');
  
  // Process historical images
  const historyInputDir = path.join(baseDir, 'history', 'ai');
  const historyOutputDir = path.join(baseDir, 'history', 'optimized');
  await processDirectory(historyInputDir, historyOutputDir);
  
  // Process luxury watch images
  const luxuryInputDir = path.join(baseDir, 'luxury', 'ai');
  const luxuryOutputDir = path.join(baseDir, 'luxury', 'optimized');
  await processDirectory(luxuryInputDir, luxuryOutputDir);
}

main().catch(console.error); 