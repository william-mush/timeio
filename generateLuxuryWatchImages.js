// generateLuxuryWatchImages.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const OUTPUT_DIR = path.join(__dirname, 'public/images/luxury/models');

if (!REPLICATE_API_TOKEN) {
  console.error('Missing REPLICATE_API_TOKEN in .env');
  process.exit(1);
}

const imagesToGenerate = [
  {
    filename: 'vacheron-constantin-222.png',
    prompt: "A photorealistic image of a Vacheron Constantin Historiques 222 wristwatch, gold case, integrated bracelet, minimalist gold dial, stick markers, front view, on a plain white background, luxury product photography."
  },
  {
    filename: 'rolex-gmt-master.png',
    prompt: "A photorealistic image of a Rolex GMT-Master II, stainless steel, black dial, red and blue 'Pepsi' bezel, oyster bracelet, Mercedes hands, date window at 3 o'clock, front view, on a plain white background, luxury product photography."
  },
  {
    filename: 'jaeger-lecoultre-polaris.png',
    prompt: "A photorealistic image of a Jaeger-LeCoultre Polaris, stainless steel, black dial, inner rotating bezel, three-crown design, leather strap, front view, on a plain white background, luxury product photography."
  },
  {
    filename: 'a-lange-sohne-zeitwerk.png',
    prompt: "A photorealistic image of an A. Lange & Söhne Zeitwerk, white gold case, silver dial, digital jumping hour and minute display, small seconds, black leather strap, front view, on a plain white background, luxury product photography."
  },
  {
    filename: 'breguet-type-xx.png',
    prompt: "A photorealistic image of a Breguet Type XX, stainless steel, black dial, Arabic numerals, bi-directional bezel, chronograph subdials, leather strap, front view, on a plain white background, luxury product photography."
  },
  {
    filename: 'blancpain-l-evolution.png',
    prompt: "A photorealistic image of a Blancpain L-evolution, stainless steel, skeletonized dial, sporty chronograph, black rubber strap, front view, on a plain white background, luxury product photography."
  },
  {
    filename: 'piaget-limelight.png',
    prompt: "A photorealistic image of a Piaget Limelight, white gold, diamond bezel, mother-of-pearl dial, elegant and feminine, luxury jewelry watch, front view, on a plain white background, luxury product photography."
  },
  {
    filename: 'girard-perregaux-three-bridges.png',
    prompt: "A photorealistic image of a Girard-Perregaux Three Bridges tourbillon, rose gold case, skeletonized dial with three gold bridges, black alligator strap, front view, on a plain white background, luxury product photography."
  },
  {
    filename: 'cartier-ballon-bleu.png',
    prompt: "A photorealistic image of a Cartier Ballon Bleu, stainless steel, round case, silver guilloché dial, blue sword-shaped hands, Roman numerals, blue cabochon crown, front view, on a plain white background, luxury product photography."
  },
  {
    filename: 'omega-constellation.png',
    prompt: "A photorealistic image of an Omega Constellation, stainless steel, silver dial, Roman numeral bezel, integrated bracelet, star logo at 6 o'clock, front view, on a plain white background, luxury product photography."
  },
  {
    filename: 'panerai-submersible.png',
    prompt: "A photorealistic image of a Panerai Submersible, stainless steel, black dial, large luminous markers, rotating bezel, rubber strap, front view, on a plain white background, luxury product photography."
  },
  {
    filename: 'hublot-spirit-of-big-bang.png',
    prompt: "A photorealistic image of a Hublot Spirit of Big Bang, tonneau-shaped case, skeletonized dial, chronograph subdials, rubber strap, front view, on a plain white background, luxury product photography."
  },
  {
    filename: 'zenith-pilot-type-20.png',
    prompt: "A photorealistic image of a Zenith Pilot Type 20, bronze case, large Arabic numerals, cathedral hands, oversized onion crown, brown leather strap, front view, on a plain white background, luxury product photography."
  },
  {
    filename: 'ulysse-nardin-diver.png',
    prompt: "A photorealistic image of a Ulysse Nardin Diver, stainless steel, blue dial, large luminous markers, rotating bezel, rubber strap, front view, on a plain white background, luxury product photography."
  },
  {
    filename: 'glashutte-original-seaq.png',
    prompt: "A photorealistic image of a Glashütte Original SeaQ, stainless steel, black dial, large Arabic numerals, unidirectional bezel, textile strap, front view, on a plain white background, luxury product photography."
  },
  {
    filename: 'frank-muller-aeternitas-mega.png',
    prompt: "A photorealistic image of a Franck Muller Aeternitas Mega, platinum case, highly complicated dial with multiple subdials and indicators, blue alligator strap, front view, on a plain white background, luxury product photography."
  },
  {
    filename: 'fp-journe-resonance.png',
    prompt: 'A photorealistic image of an F.P. Journe Chronomètre à Résonance wristwatch, dual time dials, elegant silver dial, rose gold case, hand-finished movement visible, luxury independent Swiss watch, on a leather strap, studio lighting, high detail.'
  },
  {
    filename: 'fp-journe-tourbillon.png',
    prompt: 'A photorealistic image of an F.P. Journe Tourbillon Souverain wristwatch, off-center time display, visible tourbillon cage, platinum case, intricate guilloché dial, high horology, on a leather strap, luxury Swiss independent watch, studio lighting.'
  },
  {
    filename: 'fp-journe-octa.png',
    prompt: 'A photorealistic image of an F.P. Journe Octa Automatique Lune wristwatch, moonphase display, large date, gold movement, silver dial, elegant and modern, on a leather strap, luxury independent Swiss watch, studio lighting.'
  },
  {
    filename: 'fp-journe.png',
    prompt: 'A photorealistic image of an F.P. Journe wristwatch collection, showing Chronomètre à Résonance, Tourbillon Souverain, and Octa Automatique Lune models together, elegant display, luxury Swiss independent watch brand, studio lighting.'
  }
];

async function generateImage(prompt) {
  try {
    const response = await axios.post(
      'https://api.replicate.com/v1/predictions',
      {
        version: '39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b', // SDXL 1.0
        input: {
          prompt,
          width: 1024,
          height: 1024,
          num_inference_steps: 30,
          guidance_scale: 7.5
        }
      },
      {
        headers: {
          Authorization: `Token ${REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    // Wait for prediction to complete
    let prediction = response.data;
    while (prediction.status !== 'succeeded' && prediction.status !== 'failed') {
      await new Promise(r => setTimeout(r, 2000));
      const poll = await axios.get(
        `https://api.replicate.com/v1/predictions/${prediction.id}`,
        { headers: { Authorization: `Token ${REPLICATE_API_TOKEN}` } }
      );
      prediction = poll.data;
    }
    if (prediction.status === 'succeeded') {
      return prediction.output[0];
    } else {
      throw new Error(`Image generation failed: ${JSON.stringify(prediction)}`);
    }
  } catch (error) {
    if (error.response) {
      throw new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
}

(async () => {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  for (const { filename, prompt } of imagesToGenerate) {
    const outPath = path.join(OUTPUT_DIR, filename);
    if (fs.existsSync(outPath)) {
      console.log(`${filename} already exists, skipping.`);
      continue;
    }
    try {
      console.log(`Generating: ${filename}`);
      const imageUrl = await generateImage(prompt);
      const imgResp = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      fs.writeFileSync(outPath, imgResp.data);
      console.log(`Saved: ${filename}`);
    } catch (err) {
      console.error(`Failed to generate ${filename}:`, err.message);
    }
  }
})(); 