import 'dotenv/config';
import Replicate from 'replicate';
import path from 'path';
import fs from 'fs/promises';

if (!process.env.REPLICATE_API_TOKEN) {
  console.error('Error: REPLICATE_API_TOKEN is not set in .env file');
  process.exit(1);
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Enhanced prompts for luxury watches with specific details and artistic direction
const prompts = {
  patek_philippe: {
    prompt: "A stunning Patek Philippe Nautilus 5711 in stainless steel, photographed in a luxurious setting. The watch features a blue sunburst dial, luminescent hands, and the iconic porthole design. Professional studio lighting highlights the exquisite finishing and craftsmanship. Shot on Hasselblad, 8k resolution, product photography style.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  audemars_piguet: {
    prompt: "A striking Audemars Piguet Royal Oak in stainless steel with the iconic octagonal bezel and tapisserie dial. The watch is photographed in a contemporary luxury setting with dramatic lighting highlighting its distinctive design. Professional studio photography, 8k resolution, shot on Canon EOS R5.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  vacheron_constantin: {
    prompt: "A magnificent Vacheron Constantin Overseas in rose gold, featuring its elegant design and world time complication. The watch is photographed in a sophisticated setting with warm lighting highlighting its precious metal finish. Professional studio photography, 8k resolution, shot on Hasselblad.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  rolex: {
    prompt: "A classic Rolex Submariner in stainless steel, featuring its iconic diving bezel and luminescent markers. The watch is photographed in a professional studio setting with dramatic lighting highlighting its robust design. Professional studio photography, 8k resolution, shot on Canon EOS R5.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  richard_mille: {
    prompt: "A futuristic Richard Mille RM 011 in carbon fiber and titanium, featuring its complex chronograph movement. The watch is photographed in a high-tech environment with dramatic lighting highlighting its innovative design. Professional studio photography, 8k resolution, shot on Sony A1.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  jaeger_lecoultre: {
    prompt: "A stunning Jaeger-LeCoultre Reverso in stainless steel, featuring its iconic reversible case and Art Deco design. The watch is photographed in a classic luxury setting with dramatic lighting highlighting its distinctive form. Professional studio photography, 8k resolution, shot on Canon EOS R5.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  a_lange_sohne: {
    prompt: "An exquisite A. Lange & Söhne Lange 1 in white gold, showcasing its iconic asymmetric dial layout and outsize date. The watch is photographed in a minimalist German-inspired setting with soft, directional lighting highlighting its hand-finished movement. Professional studio photography, 8k resolution, shot on Leica.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  breguet: {
    prompt: "A magnificent Breguet Classique in rose gold, featuring its signature guilloché dial and Breguet hands. The watch is photographed in a classic luxury setting with warm lighting highlighting its traditional craftsmanship. Professional studio photography, 8k resolution, shot on Hasselblad.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  blancpain: {
    prompt: "A sophisticated Blancpain Fifty Fathoms in stainless steel, featuring its iconic diving bezel and luminescent markers. The watch is photographed in a modern luxury setting with dramatic lighting highlighting its sporty design. Professional studio photography, 8k resolution, shot on Canon EOS R5.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  piaget: {
    prompt: "An elegant Piaget Altiplano in white gold, showcasing its ultra-thin design and minimalist aesthetic. The watch is photographed in a sophisticated setting with soft lighting highlighting its refined details. Professional studio photography, 8k resolution, shot on Leica.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  girard_perregaux: {
    prompt: "A remarkable Girard-Perregaux Laureato in stainless steel, featuring its distinctive octagonal bezel and integrated bracelet. The watch is photographed in a contemporary luxury setting with dramatic lighting highlighting its sporty elegance. Professional studio photography, 8k resolution, shot on Sony A1.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  cartier: {
    prompt: "A classic Cartier Tank in rose gold, featuring its iconic rectangular case and Roman numerals. The watch is photographed in a timeless luxury setting with warm lighting highlighting its elegant design. Professional studio photography, 8k resolution, shot on Hasselblad.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  omega: {
    prompt: "A legendary Omega Speedmaster Professional in stainless steel, featuring its iconic chronograph design and moonwatch heritage. The watch is photographed in a professional studio setting with dramatic lighting highlighting its historical significance. Professional studio photography, 8k resolution, shot on Canon EOS R5.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  iwc: {
    prompt: "A sophisticated IWC Portugieser in rose gold, featuring its classic design and chronograph complication. The watch is photographed in a luxury setting with warm lighting highlighting its elegant details. Professional studio photography, 8k resolution, shot on Leica.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  panerai: {
    prompt: "A distinctive Panerai Luminor in stainless steel, featuring its iconic crown protection device and sandwich dial. The watch is photographed in a modern luxury setting with dramatic lighting highlighting its bold design. Professional studio photography, 8k resolution, shot on Sony A1.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  hublot: {
    prompt: "A bold Hublot Big Bang in black ceramic and titanium, featuring its distinctive porthole design and chronograph functions. The watch is photographed in a contemporary luxury setting with dramatic lighting highlighting its modern aesthetic. Professional studio photography, 8k resolution, shot on Canon EOS R5.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  zenith: {
    prompt: "A classic Zenith El Primero in stainless steel, featuring its iconic chronograph movement and tri-color subdials. The watch is photographed in a professional studio setting with dramatic lighting highlighting its technical sophistication. Professional studio photography, 8k resolution, shot on Hasselblad.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  ulysse_nardin: {
    prompt: "An innovative Ulysse Nardin Freak in platinum, featuring its revolutionary carousel movement and avant-garde design. The watch is photographed in a modern luxury setting with dramatic lighting highlighting its unique architecture. Professional studio photography, 8k resolution, shot on Phase One.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  glashutte_original: {
    prompt: "A refined Glashütte Original PanoMaticLunar in white gold, featuring its distinctive asymmetric dial and moon phase complication. The watch is photographed in a sophisticated German-inspired setting with soft lighting highlighting its traditional craftsmanship. Professional studio photography, 8k resolution, shot on Leica.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  },
  frank_muller: {
    prompt: "A distinctive Franck Muller Crazy Hours in rose gold, featuring its revolutionary jumping hours display and tonneau-shaped case. The watch is photographed in a luxury setting with dramatic lighting highlighting its unique design. Professional studio photography, 8k resolution, shot on Hasselblad.",
    negative_prompt: "blurry, low quality, distorted, unrealistic, cartoon, illustration, painting, drawing, sketch, modern elements, anachronistic details"
  }
};

// Cache management
const CACHE_FILE = path.join(process.cwd(), 'scripts', 'luxury-watch-image-cache.json');

async function loadCache() {
  try {
    const cacheData = await fs.readFile(CACHE_FILE, 'utf-8');
    return JSON.parse(cacheData);
  } catch {
    return {};
  }
}

async function saveCache(cache: Record<string, boolean>) {
  await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2));
}

async function generateImage(key: string, prompt: any) {
  console.log(`Generating image for ${key}...`);
  
  const output = await replicate.run(
    "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
    {
      input: {
        prompt: prompt.prompt,
        negative_prompt: prompt.negative_prompt,
        width: 1024,
        height: 1024,
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
    await fs.writeFile(
      path.join(process.cwd(), 'public', 'images', 'luxury', `${key}.jpg`),
      Buffer.from(buffer)
    );
    return true;
  }
  return false;
}

async function main() {
  const cache = await loadCache();
  
  for (const [key, prompt] of Object.entries(prompts)) {
    if (!cache[key]) {
      const success = await generateImage(key, prompt);
      if (success) {
        cache[key] = true;
        await saveCache(cache);
      }
    }
  }
}

main().catch(console.error); 