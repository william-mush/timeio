import Replicate from 'replicate';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

if (!process.env.REPLICATE_API_TOKEN) {
  console.error('Error: REPLICATE_API_TOKEN is not set in .env file');
  process.exit(1);
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Enhanced prompts with more specific details and artistic direction
const prompts = {
  sundial: {
    prompt: "A detailed, photorealistic ancient Egyptian sundial, made of polished limestone, with precise hour markings and a bronze gnomon casting a sharp shadow. The sundial is placed in a desert landscape with the Great Pyramids in the background. The scene is captured during golden hour, with dramatic shadows and warm lighting. Professional photography, 8k resolution, shot on Hasselblad.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  waterClock: {
    prompt: "A sophisticated ancient Greek water clock (clepsydra), crafted from bronze with intricate mythological engravings. Water flows gracefully through the mechanism, creating a mesmerizing effect. The clock is displayed in a classical Greek temple setting with marble columns and natural light streaming through. Professional photography, 8k resolution, museum quality lighting, shot on Phase One.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  candleClock: {
    prompt: "A medieval European candle clock with precisely marked intervals and ornate metal balls. The candle is partially burned, showing the passage of time through its elegant drips. Set in a medieval castle chamber with stone walls, torch lighting, and rich tapestries. Professional photography, 8k resolution, atmospheric lighting, shot on Leica.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  incenseClock: {
    prompt: "An ornate Chinese incense clock from the Song Dynasty, featuring delicately carved wooden frame and marked incense sticks. The incense burns with a subtle smoke effect, creating an ethereal atmosphere. Set in a traditional Chinese temple with red lacquered pillars and hanging lanterns. Professional photography, 8k resolution, ethereal lighting, shot on Fujifilm GFX.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  mechanicalClock: {
    prompt: "A large, intricate 13th-century European mechanical clock tower with visible brass gears and weights. The clock face shows Roman numerals and has astronomical indicators with celestial bodies. Set in a medieval cathedral with stained glass windows casting colorful light. Professional photography, 8k resolution, dramatic lighting, shot on Canon EOS R5.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  pendulumClock: {
    prompt: "A beautiful 17th-century pendulum clock by Christiaan Huygens, crafted from polished brass and rich mahogany. The pendulum swings with perfect precision, and the clock shows intricate craftsmanship with visible escapement mechanism. Set in a Dutch study with period furniture and natural light. Professional photography, 8k resolution, natural lighting, shot on Nikon Z9.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  pocketWatch: {
    prompt: "An elegant 19th-century pocket watch with gold casing and intricate engravings depicting maritime scenes. The watch is open, revealing the mechanical movement with visible balance wheel and jewels. Set on a velvet cushion in a Victorian study with leather-bound books. Professional photography, 8k resolution, studio lighting, shot on Sony A1.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  atomicClock: {
    prompt: "A modern atomic clock laboratory setup with the NIST-F1 cesium atomic clock. The room is immaculately clean and high-tech, with monitoring equipment displaying precise measurements. Blue LED indicators and holographic displays create a futuristic atmosphere. Professional photography, 8k resolution, clinical lighting, shot on Hasselblad X2D.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, outdated technology, messy environment"
  },
  timeZones: {
    prompt: "A modern world map showing time zones, with a clean, minimalist design. The map is displayed on a high-tech screen in a control room with multiple monitors showing real-time data. Blue LED lighting creates an immersive atmosphere. Professional photography, 8k resolution, ambient lighting, shot on Canon EOS R3.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, outdated design, cluttered interface"
  },
  digitalClock: {
    prompt: "A sleek, modern digital clock with LED display, showing the time in a minimalist design. The clock is placed in a contemporary home setting with clean lines and modern furniture. Ambient lighting creates a warm, inviting atmosphere. Professional photography, 8k resolution, natural lighting, shot on Leica Q3.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, outdated design, cluttered environment"
  }
};

// Cache management
const CACHE_FILE = path.join(process.cwd(), 'scripts', 'image-cache.json');

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

async function generateImage(key: string, prompt: any, outputPath: string) {
  try {
    console.log(`Generating image for: ${key}`);
    
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
      await fs.writeFile(outputPath, Buffer.from(buffer));
      console.log(`Successfully saved image to: ${outputPath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error generating image for ${key}:`, error);
    return false;
  }
}

async function main() {
  const outputDir = path.join(process.cwd(), 'public', 'images', 'history', 'ai');
  const cache = await loadCache();
  
  // Create output directory if it doesn't exist
  await fs.mkdir(outputDir, { recursive: true });

  // Generate images for each prompt
  for (const [key, prompt] of Object.entries(prompts)) {
    const outputPath = path.join(outputDir, `${key}.jpg`);
    
    // Check if image exists and is not in cache
    try {
      await fs.access(outputPath);
      if (!cache[key]) {
        cache[key] = { generated: true, timestamp: Date.now() };
        await saveCache(cache);
      }
      console.log(`Image already exists for: ${key}`);
    } catch {
      // Generate new image if it doesn't exist
      const success = await generateImage(key, prompt, outputPath);
      if (success) {
        cache[key] = { generated: true, timestamp: Date.now() };
        await saveCache(cache);
      }
    }
  }
}

main().catch(console.error); 