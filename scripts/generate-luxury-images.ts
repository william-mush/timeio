import Replicate from 'replicate';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import sharp from 'sharp';

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

if (!process.env.REPLICATE_API_TOKEN) {
  console.error('Error: REPLICATE_API_TOKEN is not set in .env file');
  process.exit(1);
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Enhanced prompts for luxury watches with specific details and artistic direction
const prompts = {
  patek_philippe_1: {
    prompt: "A stunning Patek Philippe Nautilus 5711 in stainless steel, photographed in a luxurious setting. The watch features a blue sunburst dial, luminescent hands, and the iconic porthole design. Professional studio lighting highlights the exquisite finishing and craftsmanship. Shot on Hasselblad, 8k resolution, product photography style.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  patek_philippe_2: {
    prompt: "A magnificent Patek Philippe Grand Complications 5270P in platinum, featuring a perpetual calendar chronograph. The watch is displayed on a dark marble surface with dramatic lighting emphasizing its complex dial and precious metal finish. Professional studio photography, 8k resolution, shot on Phase One.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  lange_1: {
    prompt: "An exquisite A. Lange & Söhne Lange 1 in white gold, showcasing its iconic asymmetric dial layout and outsize date. The watch is photographed in a minimalist German-inspired setting with soft, directional lighting highlighting its hand-finished movement. Professional studio photography, 8k resolution, shot on Leica.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  lange_2: {
    prompt: "A sophisticated A. Lange & Söhne Zeitwerk in platinum, featuring its unique digital time display and constant force mechanism. The watch is displayed in a modern German interior with dramatic lighting emphasizing its architectural design. Professional studio photography, 8k resolution, shot on Hasselblad.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  ap_1: {
    prompt: "A striking Audemars Piguet Royal Oak in stainless steel with the iconic octagonal bezel and tapisserie dial. The watch is photographed in a contemporary luxury setting with dramatic lighting highlighting its distinctive design. Professional studio photography, 8k resolution, shot on Canon EOS R5.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  ap_2: {
    prompt: "An impressive Audemars Piguet Royal Oak Offshore in black ceramic, featuring its sporty design and complex chronograph functions. The watch is displayed in a modern luxury environment with dynamic lighting emphasizing its bold presence. Professional studio photography, 8k resolution, shot on Sony A1.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  vacheron_1: {
    prompt: "A magnificent Vacheron Constantin Overseas in rose gold, featuring its elegant design and world time complication. The watch is photographed in a sophisticated setting with warm lighting highlighting its precious metal finish. Professional studio photography, 8k resolution, shot on Hasselblad.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  vacheron_2: {
    prompt: "An exceptional Vacheron Constantin Patrimony in platinum, showcasing its ultra-thin design and minimalist aesthetic. The watch is displayed in a classic luxury environment with subtle lighting emphasizing its refined details. Professional studio photography, 8k resolution, shot on Leica.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  fp_journe_1: {
    prompt: "A remarkable F.P. Journe Chronomètre à Résonance in rose gold, featuring its unique dual balance wheel system. The watch is photographed in a contemporary art gallery setting with dramatic lighting highlighting its innovative design. Professional studio photography, 8k resolution, shot on Phase One.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  fp_journe_2: {
    prompt: "An extraordinary F.P. Journe Tourbillon Souverain in platinum, showcasing its tourbillon complication and elegant design. The watch is displayed in a modern luxury setting with artistic lighting emphasizing its technical sophistication. Professional studio photography, 8k resolution, shot on Hasselblad.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  jlc_1: {
    prompt: "A stunning Jaeger-LeCoultre Reverso in stainless steel, featuring its iconic reversible case and Art Deco design. The watch is photographed in a classic luxury setting with dramatic lighting highlighting its distinctive form. Professional studio photography, 8k resolution, shot on Canon EOS R5.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  jlc_2: {
    prompt: "An impressive Jaeger-LeCoultre Master Ultra Thin Perpetual in rose gold, showcasing its perpetual calendar complication and elegant design. The watch is displayed in a sophisticated environment with warm lighting emphasizing its refined details. Professional studio photography, 8k resolution, shot on Sony A1.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  }
};

// Cache management
const CACHE_FILE = path.join(process.cwd(), 'scripts', 'luxury-image-cache.json');

async function loadCache() {
  try {
    const cacheData = await fs.readFile(CACHE_FILE, 'utf-8');
    return JSON.parse(cacheData);
  } catch {
    return {};
  }
}

async function saveCache(cache: any) {
  await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2));
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateImage(key: string, prompt: any, outputPath: string, retryCount = 0) {
  try {
    console.log(`Generating image for: ${key}${retryCount > 0 ? ` (Attempt ${retryCount + 1}/${MAX_RETRIES})` : ''}`);
    
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: prompt.prompt,
          negative_prompt: prompt.negative_prompt,
          width: 1024,
          height: 768,
          num_outputs: 1,
          scheduler: "K_EULER",
          num_inference_steps: 50,
          guidance_scale: 7.5,
          refine: "expert_ensemble_refiner",
          high_noise_frac: 0.8,
        }
      }
    );

    if (Array.isArray(output) && output[0]) {
      const imageUrl = output[0];
      const response = await fetch(imageUrl);
      const buffer = await response.arrayBuffer();
      
      // Optimize the image using Sharp
      await sharp(Buffer.from(buffer))
        .resize(1024, 768, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .webp({
          quality: 80,
          effort: 6
        })
        .toFile(outputPath);
        
      console.log(`Successfully saved and optimized image to: ${outputPath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error generating image for ${key}:`, error);
    
    if (retryCount < MAX_RETRIES - 1) {
      console.log(`Retrying in ${RETRY_DELAY/1000} seconds...`);
      await sleep(RETRY_DELAY);
      return generateImage(key, prompt, outputPath, retryCount + 1);
    }
    
    return false;
  }
}

async function main() {
  const cache = await loadCache();
  const outputDir = path.join(process.cwd(), 'public', 'images', 'luxury', 'optimized');
  
  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  const failedImages: string[] = [];

  for (const [key, prompt] of Object.entries(prompts)) {
    const outputPath = path.join(outputDir, `${key}.webp`);
    
    // Skip if image already exists and is in cache
    if (cache[key] && await fs.access(outputPath).then(() => true).catch(() => false)) {
      console.log(`Skipping ${key} - already exists`);
      continue;
    }

    const success = await generateImage(key, prompt, outputPath);
    if (success) {
      cache[key] = true;
      await saveCache(cache);
    } else {
      failedImages.push(key);
    }
  }

  if (failedImages.length > 0) {
    console.error('\nFailed to generate the following images:');
    failedImages.forEach(key => console.error(`- ${key}`));
    process.exit(1);
  }
}

main().catch(console.error); 