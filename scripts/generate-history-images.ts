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
    prompt: "A dramatic, cinematic scene of an ancient Egyptian sundial at sunrise, casting a long shadow across golden desert sands. The sundial is ornately carved, with hieroglyphics and a gleaming bronze gnomon. The Great Pyramids and palm trees are silhouetted in the background, with vibrant colors and atmospheric lighting. 8k, shot on Hasselblad, epic composition.",
    negative_prompt: "blurry, low quality, distorted, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details, boring, static"
  },
  sundial_2: {
    prompt: "A close-up, moody shot of a sundial in an ancient Egyptian temple courtyard, with priests in white linen robes performing a ritual. Sunbeams filter through columns, dust motes in the air, and the sundial's shadow falls on intricate hour lines. Warm, mystical lighting, 8k, shot on Hasselblad.",
    negative_prompt: "blurry, low quality, distorted, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details, boring, static"
  },
  waterClock: {
    prompt: "A visually stunning ancient Greek water clock (clepsydra) in action during a lively Athenian assembly. Water sparkles as it flows through the bronze vessel, surrounded by animated philosophers and orators in colorful togas. The Parthenon and marble columns rise in the background, with dramatic sunlight and dynamic composition. 8k, shot on Phase One, vibrant and energetic.",
    negative_prompt: "blurry, low quality, distorted, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details, boring, static"
  },
  waterClock_2: {
    prompt: "A night scene in ancient Athens: a clepsydra water clock illuminated by oil lamps, casting flickering shadows on marble walls. A judge times a passionate speech, while the city glows in the distance. Rich colors, cinematic lighting, 8k, shot on Phase One, atmospheric and immersive.",
    negative_prompt: "blurry, low quality, distorted, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details, boring, static"
  },
  candleClock: {
    prompt: "A medieval candle clock burning in a stone-walled monastery at midnight. Monks in hooded robes chant by candlelight, with the candle's wax dripping onto a metal plate. Stained glass windows cast colorful patterns, and the scene is filled with mystery and reverence. 8k, shot on Leica, moody and evocative.",
    negative_prompt: "blurry, low quality, distorted, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details, boring, static"
  },
  candleClock_2: {
    prompt: "A close-up of a candle clock in a medieval scriptorium, surrounded by illuminated manuscripts, quills, and ink pots. The candle's flame flickers, casting dramatic shadows on ancient parchment. Warm, intimate lighting, 8k, shot on Leica.",
    negative_prompt: "blurry, low quality, distorted, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details, boring, static"
  },
  incenseClock: {
    prompt: "A Song Dynasty incense clock burning in a lavish Chinese palace. Courtiers in silk robes admire the intricate wooden frame as fragrant smoke curls upward, illuminated by lanterns and moonlight. The scene is rich with color, texture, and cultural detail. 8k, shot on Fujifilm GFX, lush and atmospheric.",
    negative_prompt: "blurry, low quality, distorted, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details, boring, static"
  },
  incenseClock_2: {
    prompt: "A poetic scene of a scholar's study: an incense clock burns beside calligraphy scrolls, jade figurines, and a window overlooking a moonlit garden. Soft, ethereal lighting, 8k, shot on Fujifilm GFX, tranquil and inspiring.",
    negative_prompt: "blurry, low quality, distorted, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details, boring, static"
  },
  mechanicalClock: {
    prompt: "A grand 13th-century European clock tower at dawn, gears and weights visible through open panels. Townsfolk gather in the square as the clock chimes, with mist swirling around gothic arches and stained glass. Epic, cinematic lighting, 8k, shot on Canon EOS R5, full of life and movement.",
    negative_prompt: "blurry, low quality, distorted, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details, boring, static"
  },
  mechanicalClock_2: {
    prompt: "Inside a medieval clockmaker's workshop: a craftsman assembles a complex clock mechanism, surrounded by tools, blueprints, and candlelight. Brass gears gleam, and the atmosphere is one of invention and discovery. 8k, shot on Canon EOS R5, warm and detailed.",
    negative_prompt: "blurry, low quality, distorted, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details, boring, static"
  },
  pendulumClock: {
    prompt: "A stately 17th-century Dutch home with a grand pendulum clock as the centerpiece. Sunlight streams through leaded windows, illuminating the polished wood and brass. Family members gather, reflecting on the passage of time. 8k, shot on Nikon Z9, elegant and nostalgic.",
    negative_prompt: "blurry, low quality, distorted, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details, boring, static"
  },
  pendulumClock_2: {
    prompt: "A scientific demonstration of a pendulum clock in an 18th-century observatory, with astronomers recording data and celestial charts on the walls. The pendulum swings in perfect rhythm, bathed in cool, focused light. 8k, shot on Nikon Z9, intellectual and inspiring.",
    negative_prompt: "blurry, low quality, distorted, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details, boring, static"
  },
  pocketWatch: {
    prompt: "A Victorian-era train station bustling with travelers, a gentleman checks his ornate gold pocket watch as steam billows from a locomotive. The watch glints in the sunlight, and the scene is filled with energy and anticipation. 8k, shot on Sony A1, vibrant and cinematic.",
    negative_prompt: "blurry, low quality, distorted, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details, boring, static"
  },
  pocketWatch_2: {
    prompt: "A close-up of a pocket watch resting on a velvet cushion, gears exposed and ticking, surrounded by handwritten letters and a quill. Soft, nostalgic lighting, 8k, shot on Sony A1, intimate and detailed.",
    negative_prompt: "blurry, low quality, distorted, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details, boring, static"
  },
  atomicClock: {
    prompt: "A futuristic atomic clock laboratory with glowing blue LED panels, scientists in lab coats, and holographic displays showing nanosecond precision. The room is sleek, high-tech, and filled with a sense of discovery. 8k, shot on Hasselblad X2D, sci-fi and awe-inspiring.",
    negative_prompt: "blurry, low quality, distorted, cartoon, illustration, painting, drawing, sketch, outdated technology, messy environment, boring, static"
  },
  atomicClock_2: {
    prompt: "A dramatic close-up of an atomic clock's core, with cesium atoms suspended in a glowing magnetic field. Digital readouts and laser beams create a sense of cutting-edge science. 8k, shot on Hasselblad X2D, visually striking and modern.",
    negative_prompt: "blurry, low quality, distorted, cartoon, illustration, painting, drawing, sketch, outdated technology, messy environment, boring, static"
  },
  timeZones: {
    prompt: "A vibrant, interactive world map in a global control center, with time zones highlighted in neon colors. Operators monitor real-time data on massive digital screens, and the room buzzes with international activity. 8k, shot on Canon EOS R3, energetic and futuristic.",
    negative_prompt: "blurry, low quality, distorted, cartoon, illustration, painting, drawing, sketch, outdated design, cluttered interface, boring, static"
  },
  timeZones_2: {
    prompt: "A creative visualization of time zones: clocks from around the world float above a spinning globe, each showing a different time. The background is deep blue with stars, and the scene is imaginative and playful. 8k, shot on Canon EOS R3, whimsical and colorful.",
    negative_prompt: "blurry, low quality, distorted, cartoon, illustration, painting, drawing, sketch, outdated design, cluttered interface, boring, static"
  },
  digitalClock: {
    prompt: "A modern cityscape at night, skyscrapers illuminated by digital clocks and neon signs. The scene is lively, with people checking the time on smartwatches and phones. Reflections shimmer on wet pavement, and the atmosphere is urban and dynamic. 8k, shot on Leica Q3, vibrant and contemporary.",
    negative_prompt: "blurry, low quality, distorted, cartoon, illustration, painting, drawing, sketch, outdated design, cluttered environment, boring, static"
  },
  digitalClock_2: {
    prompt: "A close-up of a digital alarm clock on a minimalist bedside table, glowing softly in the early morning. A hand reaches to turn off the alarm, and sunlight streams through sheer curtains. 8k, shot on Leica Q3, peaceful and relatable.",
    negative_prompt: "blurry, low quality, distorted, cartoon, illustration, painting, drawing, sketch, outdated design, cluttered environment, boring, static"
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