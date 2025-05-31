import fs from 'fs/promises';
import path from 'path';

async function createDirectory(dirPath: string) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  } catch (error) {
    console.error(`Error creating directory ${dirPath}:`, error);
  }
}

async function main() {
  const baseDir = path.join(process.cwd(), 'public', 'images');
  
  // Create directories for historical images
  await createDirectory(path.join(baseDir, 'history', 'ai'));
  await createDirectory(path.join(baseDir, 'history', 'optimized'));
  
  // Create directories for luxury watch images
  await createDirectory(path.join(baseDir, 'luxury', 'ai'));
  await createDirectory(path.join(baseDir, 'luxury', 'optimized'));
  
  console.log('Directory structure setup complete!');
}

main().catch(console.error); 