import { LuxuryTimepiece } from '../types/luxuryTimepieces';

export const luxuryTimepieces: LuxuryTimepiece[] = [
  {
    id: 'patek-philippe',
    name: 'Patek Philippe',
    description: 'Founded in 1839, Patek Philippe is considered the most prestigious watch manufacturer in the world. Known for their exceptional craftsmanship and complex movements.',
    history: 'Established in Geneva, Switzerland, Patek Philippe has been creating timepieces for over 180 years. They are known for their perpetual calendar, minute repeater, and split-second chronograph complications.',
    notableModels: [
      {
        name: 'Nautilus 5711',
        newPrice: '$35,000 - $45,000',
        usedPrice: '$80,000 - $120,000',
        description: 'The iconic sports watch with a distinctive porthole design.',
        imageUrl: '/images/luxury/models/patek-philippe-nautilus-5711.jpg',
      },
      {
        name: 'Calatrava 5196',
        newPrice: '$22,000 - $28,000',
        usedPrice: '$18,000 - $25,000',
        description: 'Classic dress watch known for its elegant simplicity.',
        imageUrl: '/images/luxury/models/patek-philippe-calatrava-5196.jpg',
      }
    ],
    imageUrl: '/images/luxury/patek-philippe.jpg',
    standout: [
      'Unparalleled craftsmanship and finishing',
      'Family-owned independence',
      'Extremely limited production',
      'Most complicated mechanical watches ever made',
      'Highest auction prices in the world',
    ],
    love: [
      'Ultimate status symbol among collectors',
      'Incredible attention to detail',
      'Strong investment value',
      'Rich heritage and tradition',
    ],
    hate: [
      'Extremely difficult to purchase at retail',
      'Long waiting lists',
      'High entry price',
      'Some see the hype as excessive',
    ],
  },
  {
    id: 'audemars-piguet',
    name: 'Audemars Piguet',
    description: 'Founded in 1875, Audemars Piguet is renowned for their Royal Oak collection and innovative designs.',
    history: 'Based in Le Brassus, Switzerland, AP has been at the forefront of luxury watchmaking, particularly with their revolutionary Royal Oak design in 1972.',
    notableModels: [
      {
        name: 'Royal Oak 15500',
        newPrice: '$22,000 - $28,000',
        usedPrice: '$35,000 - $45,000',
        description: 'The iconic octagonal sports watch with integrated bracelet.',
        imageUrl: '/images/luxury/models/audemars-piguet-royal-oak-15500.jpg',
      },
      {
        name: 'Royal Oak Offshore',
        newPrice: '$30,000 - $45,000',
        usedPrice: '$25,000 - $40,000',
        description: 'Larger, more sporty version of the Royal Oak.',
        imageUrl: '/images/luxury/models/audemars-piguet-royal-oak-offshore.jpg',
      }
    ],
    imageUrl: '/images/luxury/audemars-piguet.jpg',
    standout: [
      'Inventor of the luxury sports watch (Royal Oak)',
      'Bold, instantly recognizable design',
      'Independent, family-owned',
      'Innovative use of materials',
    ],
    love: [
      'Royal Oak is a design icon',
      'Strong brand identity',
      'Excellent finishing and movement work',
    ],
    hate: [
      'Royal Oak hype overshadows other models',
      'Very high prices for steel watches',
      'Some dislike the angular design',
    ],
  },
  {
    id: 'vacheron-constantin',
    name: 'Vacheron Constantin',
    description: 'Founded in 1755, Vacheron Constantin is the oldest continuously operating watch manufacturer in the world.',
    history: 'Based in Geneva, Switzerland, Vacheron Constantin is known for their exceptional craftsmanship and complex movements.',
    notableModels: [
      {
        name: 'Overseas',
        newPrice: '$22,000 - $35,000',
        usedPrice: '$18,000 - $30,000',
        description: 'Luxury sports watch with interchangeable straps.',
        imageUrl: '/images/luxury/models/vacheron-constantin-overseas.jpg',
      },
      {
        name: 'Patrimony',
        newPrice: '$18,000 - $25,000',
        usedPrice: '$15,000 - $22,000',
        description: 'Classic dress watch with minimalist design.',
        imageUrl: '/images/luxury/models/vacheron-constantin-patrimony.jpg',
      }
    ],
    imageUrl: '/images/luxury/vacheron-constantin.jpg'
  },
  {
    id: 'rolex',
    name: 'Rolex',
    description: 'Founded in 1905, Rolex is the most recognized luxury watch brand globally, known for their reliability and prestige.',
    history: 'Based in Geneva, Switzerland, Rolex has pioneered numerous innovations in watchmaking, including the first waterproof watch case.',
    notableModels: [
      {
        name: 'Submariner',
        newPrice: '$9,100 - $10,100',
        usedPrice: '$12,000 - $20,000',
        description: 'Iconic diving watch with rotating bezel.',
        imageUrl: '/images/luxury/models/rolex-submariner.jpg',
      },
      {
        name: 'Daytona',
        newPrice: '$13,150 - $14,150',
        usedPrice: '$25,000 - $40,000',
        description: 'Legendary chronograph watch.',
        imageUrl: '/images/luxury/models/rolex-daytona.jpg',
      }
    ],
    imageUrl: '/images/luxury/rolex.jpg'
  },
  {
    id: 'richard-mille',
    name: 'Richard Mille',
    description: 'Founded in 2001, Richard Mille is known for their ultra-modern, high-tech timepieces often inspired by racing and sports.',
    history: 'A relatively new brand that has quickly risen to prominence through innovative materials and avant-garde designs.',
    notableModels: [
      {
        name: 'RM 011',
        newPrice: '$150,000 - $200,000',
        usedPrice: '$120,000 - $180,000',
        description: 'Flying tourbillon chronograph with annual calendar.',
        imageUrl: '/images/luxury/models/richard-mille-rm-011.jpg',
      },
      {
        name: 'RM 035',
        newPrice: '$80,000 - $100,000',
        usedPrice: '$70,000 - $90,000',
        description: 'Ultra-light automatic movement.',
        imageUrl: '/images/luxury/models/richard-mille-rm-035.jpg',
      }
    ],
    imageUrl: '/images/luxury/richard-mille.jpg'
  },
  {
    id: 'jaeger-lecoultre',
    name: 'Jaeger-LeCoultre',
    description: 'Founded in 1833, Jaeger-LeCoultre is known as the "watchmaker\'s watchmaker" for their exceptional movements.',
    history: 'Based in Le Sentier, Switzerland, JLC has created over 1,200 different calibers and holds hundreds of patents.',
    notableModels: [
      {
        name: 'Reverso',
        newPrice: '$7,000 - $15,000',
        usedPrice: '$5,000 - $12,000',
        description: 'Art Deco-inspired reversible watch.',
        imageUrl: '/images/luxury/models/jaeger-lecoultre-reverso.jpg',
      },
      {
        name: 'Master Ultra Thin',
        newPrice: '$8,000 - $12,000',
        usedPrice: '$6,000 - $10,000',
        description: 'Elegant dress watch with ultra-thin movement.',
        imageUrl: '/images/luxury/models/jaeger-lecoultre-master-ultra-thin.jpg',
      }
    ],
    imageUrl: '/images/luxury/jaeger-lecoultre.jpg'
  },
  {
    id: 'a-lange-sohne',
    name: 'A. Lange & Söhne',
    description: 'Founded in 1845, A. Lange & Söhne is Germany\'s premier watch manufacturer, known for their exceptional finishing.',
    history: 'Based in Glashütte, Germany, the brand was revived in 1990 after the fall of the Berlin Wall.',
    notableModels: [
      {
        name: 'Lange 1',
        newPrice: '$40,000 - $50,000',
        usedPrice: '$35,000 - $45,000',
        description: 'Iconic asymmetric dial design.',
        imageUrl: '/images/luxury/models/a-lange-sohne-lange-1.jpg',
      },
      {
        name: 'Datograph',
        newPrice: '$80,000 - $100,000',
        usedPrice: '$70,000 - $90,000',
        description: 'Highly regarded chronograph movement.',
        imageUrl: '/images/luxury/models/a-lange-sohne-datograph.jpg',
      }
    ],
    imageUrl: '/images/luxury/a-lange-sohne.jpg'
  },
  {
    id: 'breguet',
    name: 'Breguet',
    description: 'Founded in 1775, Breguet is one of the oldest and most prestigious watch manufacturers.',
    history: 'Founded by Abraham-Louis Breguet in Paris, the brand is known for numerous horological innovations.',
    notableModels: [
      {
        name: 'Classique',
        newPrice: '$20,000 - $30,000',
        usedPrice: '$15,000 - $25,000',
        description: 'Traditional dress watch with guilloché dial.',
        imageUrl: '/images/luxury/models/breguet-classique.jpg',
      },
      {
        name: 'Marine',
        newPrice: '$25,000 - $35,000',
        usedPrice: '$20,000 - $30,000',
        description: 'Sporty yet elegant timepiece.',
        imageUrl: '/images/luxury/models/breguet-marine.jpg',
      }
    ],
    imageUrl: '/images/luxury/breguet.jpg'
  },
  {
    id: 'blancpain',
    name: 'Blancpain',
    description: 'Founded in 1735, Blancpain is the oldest watch brand in the world.',
    history: 'Known for their commitment to traditional watchmaking and the famous "Never an quartz" motto.',
    notableModels: [
      {
        name: 'Fifty Fathoms',
        newPrice: '$15,000 - $20,000',
        usedPrice: '$12,000 - $18,000',
        description: 'Iconic diving watch.',
        imageUrl: '/images/luxury/models/blancpain-fifty-fathoms.jpg',
      },
      {
        name: 'Villeret',
        newPrice: '$10,000 - $15,000',
        usedPrice: '$8,000 - $12,000',
        description: 'Classic dress watch collection.',
        imageUrl: '/images/luxury/models/blancpain-villeret.jpg',
      }
    ],
    imageUrl: '/images/luxury/blancpain.jpg'
  },
  {
    id: 'piaget',
    name: 'Piaget',
    description: 'Founded in 1874, Piaget is known for their ultra-thin movements and luxury jewelry watches.',
    history: 'Started as a movement manufacturer before becoming a complete watchmaker.',
    notableModels: [
      {
        name: 'Altiplano',
        newPrice: '$20,000 - $30,000',
        usedPrice: '$15,000 - $25,000',
        description: 'Ultra-thin dress watch.',
        imageUrl: '/images/luxury/models/piaget-altiplano.jpg',
      },
      {
        name: 'Polo',
        newPrice: '$25,000 - $35,000',
        usedPrice: '$20,000 - $30,000',
        description: 'Sporty luxury watch with distinctive design.',
        imageUrl: '/images/luxury/models/piaget-polo.jpg',
      }
    ],
    imageUrl: '/images/luxury/piaget.jpg'
  },
  {
    id: 'girard-perregaux',
    name: 'Girard-Perregaux',
    description: 'Founded in 1791, Girard-Perregaux is known for their innovative designs and high-quality movements.',
    history: 'One of the oldest watch manufacturers, known for the iconic Three Bridges tourbillon.',
    notableModels: [
      {
        name: 'Laureato',
        newPrice: '$12,000 - $20,000',
        usedPrice: '$10,000 - $18,000',
        description: 'Sporty luxury watch with integrated bracelet.',
        imageUrl: '/images/luxury/models/girard-perregaux-laureato.jpg',
      },
      {
        name: '1966',
        newPrice: '$15,000 - $25,000',
        usedPrice: '$12,000 - $20,000',
        description: 'Classic dress watch collection.',
        imageUrl: '/images/luxury/models/girard-perregaux-1966.jpg',
      }
    ],
    imageUrl: '/images/luxury/girard-perregaux.jpg'
  },
  {
    id: 'cartier',
    name: 'Cartier',
    description: 'Founded in 1847, Cartier is known for their iconic watch designs and jewelry expertise.',
    history: 'Started as a jewelry house before becoming a major watch manufacturer.',
    notableModels: [
      {
        name: 'Tank',
        newPrice: '$3,000 - $8,000',
        usedPrice: '$2,500 - $7,000',
        description: 'Iconic rectangular watch design.',
        imageUrl: '/images/luxury/models/cartier-tank.jpg',
      },
      {
        name: 'Santos',
        newPrice: '$6,000 - $10,000',
        usedPrice: '$5,000 - $9,000',
        description: 'First pilot watch with distinctive square case.',
        imageUrl: '/images/luxury/models/cartier-santos.jpg',
      }
    ],
    imageUrl: '/images/luxury/cartier.jpg'
  },
  {
    id: 'omega',
    name: 'Omega',
    description: 'Founded in 1848, Omega is known for their precision and space exploration heritage.',
    history: 'Official timekeeper of the Olympic Games and NASA\'s choice for the moon missions.',
    notableModels: [
      {
        name: 'Speedmaster',
        newPrice: '$5,000 - $8,000',
        usedPrice: '$4,000 - $7,000',
        description: 'The Moonwatch, first watch on the moon.',
        imageUrl: '/images/luxury/models/omega-speedmaster.jpg',
      },
      {
        name: 'Seamaster',
        newPrice: '$4,000 - $7,000',
        usedPrice: '$3,000 - $6,000',
        description: 'Iconic diving watch collection.',
        imageUrl: '/images/luxury/models/omega-seamaster.jpg',
      }
    ],
    imageUrl: '/images/luxury/omega.jpg'
  },
  {
    id: 'iwc',
    name: 'IWC Schaffhausen',
    description: 'Founded in 1868, IWC is known for their pilot watches and engineering excellence.',
    history: 'Based in Schaffhausen, Switzerland, IWC combines traditional watchmaking with modern technology.',
    notableModels: [
      {
        name: 'Pilot\'s Watch',
        newPrice: '$5,000 - $10,000',
        usedPrice: '$4,000 - $8,000',
        description: 'Classic pilot watch collection.',
        imageUrl: '/images/luxury/models/iwc-pilots-watch.jpg',
      },
      {
        name: 'Portugieser',
        newPrice: '$7,000 - $15,000',
        usedPrice: '$6,000 - $12,000',
        description: 'Elegant watch with Portuguese heritage.',
        imageUrl: '/images/luxury/models/iwc-portugieser.jpg',
      }
    ],
    imageUrl: '/images/luxury/iwc.jpg'
  },
  {
    id: 'panerai',
    name: 'Panerai',
    description: 'Founded in 1860, Panerai is known for their distinctive Italian design and military heritage.',
    history: 'Originally supplied watches to the Italian Navy, now known for their large, distinctive cases.',
    notableModels: [
      {
        name: 'Luminor',
        newPrice: '$8,000 - $15,000',
        usedPrice: '$6,000 - $12,000',
        description: 'Iconic watch with crown protection device.',
        imageUrl: '/images/luxury/models/panerai-luminor.jpg',
      },
      {
        name: 'Radiomir',
        newPrice: '$7,000 - $12,000',
        usedPrice: '$5,000 - $10,000',
        description: 'Classic cushion-shaped case design.',
        imageUrl: '/images/luxury/models/panerai-radiomir.jpg',
      }
    ],
    imageUrl: '/images/luxury/panerai.jpg'
  },
  {
    id: 'hublot',
    name: 'Hublot',
    description: 'Founded in 1980, Hublot is known for their "Art of Fusion" combining traditional watchmaking with modern materials.',
    history: 'Revolutionized the industry with the first natural rubber strap on a gold watch.',
    notableModels: [
      {
        name: 'Big Bang',
        newPrice: '$15,000 - $30,000',
        usedPrice: '$12,000 - $25,000',
        description: 'Iconic modern sports watch.',
        imageUrl: '/images/luxury/models/hublot-big-bang.jpg',
      },
      {
        name: 'Classic Fusion',
        newPrice: '$8,000 - $15,000',
        usedPrice: '$6,000 - $12,000',
        description: 'Elegant fusion of classic and modern design.',
        imageUrl: '/images/luxury/models/hublot-classic-fusion.jpg',
      }
    ],
    imageUrl: '/images/luxury/hublot.jpg'
  },
  {
    id: 'zenith',
    name: 'Zenith',
    description: 'Founded in 1865, Zenith is known for their high-frequency chronograph movements.',
    history: 'Creator of the El Primero movement, one of the first automatic chronographs.',
    notableModels: [
      {
        name: 'Chronomaster',
        newPrice: '$8,000 - $12,000',
        usedPrice: '$6,000 - $10,000',
        description: 'Featuring the legendary El Primero movement.',
        imageUrl: '/images/luxury/models/zenith-chronomaster.jpg',
      },
      {
        name: 'Defy',
        newPrice: '$10,000 - $20,000',
        usedPrice: '$8,000 - $15,000',
        description: 'Modern collection with innovative materials.',
        imageUrl: '/images/luxury/models/zenith-defy.jpg',
      }
    ],
    imageUrl: '/images/luxury/zenith.jpg'
  },
  {
    id: 'ulysse-nardin',
    name: 'Ulysse Nardin',
    description: 'Founded in 1846, Ulysse Nardin is known for their marine chronometers and innovative complications.',
    history: 'Originally specialized in marine chronometers, now known for their innovative designs.',
    notableModels: [
      {
        name: 'Marine',
        newPrice: '$10,000 - $20,000',
        usedPrice: '$8,000 - $15,000',
        description: 'Modern interpretation of marine chronometers.',
        imageUrl: '/images/luxury/models/ulysse-nardin-marine.jpg',
      },
      {
        name: 'Freak',
        newPrice: '$50,000 - $100,000',
        usedPrice: '$40,000 - $80,000',
        description: 'Revolutionary design with carousel movement.',
        imageUrl: '/images/luxury/models/ulysse-nardin-freak.jpg',
      }
    ],
    imageUrl: '/images/luxury/ulysse-nardin.jpg'
  },
  {
    id: 'glashutte-original',
    name: 'Glashütte Original',
    description: 'Founded in 1845, Glashütte Original is one of Germany\'s finest watch manufacturers.',
    history: 'Based in Glashütte, Germany, known for their traditional German watchmaking.',
    notableModels: [
      {
        name: 'PanoMaticLunar',
        newPrice: '$12,000 - $15,000',
        usedPrice: '$10,000 - $12,000',
        description: 'Classic dress watch with moon phase.',
        imageUrl: '/images/luxury/models/glashutte-original-panomatic-lunar.jpg',
      },
      {
        name: 'Senator',
        newPrice: '$15,000 - $25,000',
        usedPrice: '$12,000 - $20,000',
        description: 'Elegant collection with various complications.',
        imageUrl: '/images/luxury/models/glashutte-original-senator.jpg',
      }
    ],
    imageUrl: '/images/luxury/glashutte-original.jpg'
  },
  {
    id: 'frank-muller',
    name: 'Franck Muller',
    description: 'Founded in 1991, Franck Muller is known for their complex movements and distinctive tonneau-shaped cases.',
    history: 'Known as the "Master of Complications" for their innovative watch designs.',
    notableModels: [
      {
        name: 'Crazy Hours',
        newPrice: '$30,000 - $50,000',
        usedPrice: '$25,000 - $40,000',
        description: 'Revolutionary jumping hours display.',
        imageUrl: '/images/luxury/models/frank-muller-crazy-hours.jpg',
      },
      {
        name: 'Vanguard',
        newPrice: '$20,000 - $40,000',
        usedPrice: '$15,000 - $30,000',
        description: 'Modern sports watch collection.',
        imageUrl: '/images/luxury/models/frank-muller-vanguard.jpg',
      }
    ],
    imageUrl: '/images/luxury/frank-muller.jpg'
  }
]; 