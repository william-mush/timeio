import { LuxuryTimepiece } from '../types/luxuryTimepieces';

export const luxuryTimepieces: LuxuryTimepiece[] = [
  {
    id: 'patek-philippe',
    name: 'Patek Philippe',
    description: 'Founded in 1839, Patek Philippe is considered the most prestigious watch manufacturer in the world. Known for their exceptional craftsmanship and complex movements.',
    history: 'Established in Geneva, Switzerland, Patek Philippe has been creating timepieces for over 180 years. They are known for their perpetual calendar, minute repeater, and split-second chronograph complications.',
    brandWebsite: 'https://www.patek.com',
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
    brandWebsite: 'https://www.audemarspiguet.com',
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
    description: 'Founded in 1755, Vacheron Constantin is the world\'s oldest watch manufacturer in continuous operation, representing the pinnacle of traditional Swiss watchmaking.',
    history: 'Established by Jean-Marc Vacheron in Geneva, Switzerland, Vacheron Constantin has maintained uninterrupted production for over 265 years. The brand\'s partnership with François Constantin in 1819 led to the famous motto "Do better if possible, and that is always possible." Throughout its history, Vacheron Constantin has created some of the most complicated watches ever made, including the 57260 (the most complicated mechanical watch ever created) and the Tour de l\'Île (the most complicated wristwatch at its time of creation). The brand has been owned by the Richemont Group since 1996 but maintains its independence in terms of design and production.',
    brandWebsite: 'https://www.vacheron-constantin.com',
    notableModels: [
      {
        name: 'Overseas',
        newPrice: '$22,000 - $35,000',
        usedPrice: '$18,000 - $30,000',
        description: 'The brand\'s luxury sports watch, featuring an interchangeable strap system and a distinctive Maltese cross-inspired bezel. The latest generation includes a 22K gold rotor and improved water resistance.',
        imageUrl: '/images/luxury/models/vacheron-constantin-overseas.jpg',
      },
      {
        name: 'Patrimony',
        newPrice: '$18,000 - $25,000',
        usedPrice: '$15,000 - $22,000',
        description: 'A collection of ultra-thin dress watches that embody classical elegance. The Patrimony Traditionnelle models feature traditional watchmaking techniques and the Geneva Seal.',
        imageUrl: '/images/luxury/models/vacheron-constantin-patrimony.jpg',
      },
      {
        name: 'Historiques 222',
        newPrice: '$65,000 - $75,000',
        usedPrice: '$55,000 - $65,000',
        description: 'A modern reissue of the iconic 1977 sports watch that predated the Royal Oak and Nautilus. Features a distinctive integrated bracelet and ultra-thin automatic movement.',
        imageUrl: '/images/luxury/models/vacheron-constantin-222.jpg',
      }
    ],
    imageUrl: '/images/luxury/vacheron-constantin.jpg',
    standout: [
      'World\'s oldest watch manufacturer in continuous operation',
      'Creator of the most complicated mechanical watch ever made (57260)',
      'Exceptional finishing and movement decoration',
      'Strong commitment to traditional watchmaking techniques',
      'Innovative complications while maintaining classical aesthetics',
      'Limited production of only about 20,000 watches annually',
      'Home to the Les Cabinotiers department for unique pieces'
    ],
    love: [
      'Unparalleled heritage and tradition',
      'Exceptional attention to detail and finishing',
      'Strong investment value for rare and complicated pieces',
      'Elegant, timeless designs that never go out of style',
      'Commitment to preserving traditional watchmaking techniques',
      'Excellent customer service and after-sales support',
      'Strong secondary market performance for limited editions'
    ],
    hate: [
      'Some models can be difficult to obtain at retail',
      'Limited production numbers mean long waiting lists',
      'High entry price point for basic models',
      'Some collectors find the designs too conservative',
      'Limited availability of sports models compared to competitors',
      'Complex pieces require regular maintenance',
      'Some see the Richemont ownership as diluting independence'
    ]
  },
  {
    id: 'rolex',
    name: 'Rolex',
    description: 'Founded in 1905 by Hans Wilsdorf, Rolex is the world\'s most recognized luxury watch brand, known for its reliability, innovation, and iconic designs that have defined entire watch categories.',
    history: 'Rolex revolutionized watchmaking with numerous industry firsts: the first waterproof watch case (Oyster, 1926), the first self-winding mechanism (Perpetual, 1931), and the first watch to show two time zones simultaneously (GMT-Master, 1954). The brand\'s watches have accompanied explorers to the highest peaks (Everest), deepest oceans (Mariana Trench), and even the moon (Apollo missions). Rolex maintains complete vertical integration, manufacturing nearly every component in-house, from the gold alloys to the synthetic rubies. The brand produces approximately 1 million watches annually, each subject to rigorous testing and quality control.',
    brandWebsite: 'https://www.rolex.com',
    notableModels: [
      {
        name: 'Submariner',
        newPrice: '$9,100 - $10,100',
        usedPrice: '$12,000 - $20,000',
        description: 'The world\'s most iconic diving watch, introduced in 1953. Features a unidirectional rotating bezel, luminescent markers, and water resistance to 300 meters. The latest generation (126610) includes the improved 3235 movement with 70-hour power reserve.',
        imageUrl: '/images/luxury/models/rolex-submariner.jpg',
      },
      {
        name: 'Daytona',
        newPrice: '$13,150 - $14,150',
        usedPrice: '$25,000 - $40,000',
        description: 'The legendary chronograph watch, named after the famous Florida race track. Features a tachymetric scale, three sub-dials, and a highly accurate chronograph movement. The latest generation (126500) includes the improved 4131 movement with enhanced chronograph performance.',
        imageUrl: '/images/luxury/models/rolex-daytona.jpg',
      },
      {
        name: 'GMT-Master II',
        newPrice: '$10,700 - $11,700',
        usedPrice: '$15,000 - $30,000',
        description: 'The ultimate travel watch, featuring a 24-hour rotating bezel and an additional hour hand for tracking a second time zone. The latest generation (126710) includes the improved 3285 movement with 70-hour power reserve and enhanced precision.',
        imageUrl: '/images/luxury/models/rolex-gmt-master.jpg',
      }
    ],
    imageUrl: '/images/luxury/rolex.jpg',
    standout: [
      'World\'s most recognized luxury watch brand',
      'Complete vertical integration of manufacturing',
      'Industry-leading quality control and testing',
      'Iconic designs that have defined watch categories',
      'Strong focus on reliability and durability',
      'Extensive research in materials science',
      'Unmatched brand recognition and resale value'
    ],
    love: [
      'Exceptional reliability and durability',
      'Strong investment value and resale market',
      'Timeless, iconic designs',
      'Excellent customer service and global support',
      'Consistent quality across all models',
      'Wide range of styles and complications',
      'Strong brand recognition and prestige'
    ],
    hate: [
      'Long waiting lists for popular models',
      'Limited availability at authorized dealers',
      'Some models trade significantly above retail',
      'Conservative design updates',
      'Limited customization options',
      'Strict authorized dealer policies',
      'Some see the brand as too mainstream'
    ]
  },
  {
    id: 'richard-mille',
    name: 'Richard Mille',
    description: 'Founded in 2001, Richard Mille is known for its ultra-modern, high-tech timepieces that push the boundaries of watchmaking.',
    history: 'Richard Mille revolutionized luxury watchmaking by incorporating advanced materials and innovative designs. The brand is known for its distinctive tonneau-shaped cases and use of materials like carbon fiber, titanium, and graphene.',
    brandWebsite: 'https://www.richardmille.com',
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
    description: 'Founded in 1833, Jaeger-LeCoultre is known as the "watchmaker\'s watchmaker" for its exceptional movements and technical innovations.',
    history: 'Based in the Vallée de Joux, Switzerland, Jaeger-LeCoultre has created over 1,200 different calibers and holds hundreds of patents. The brand is known for its Reverso, Master Control, and Atmos clock collections.',
    brandWebsite: 'https://www.jaeger-lecoultre.com',
    notableModels: [
      {
        name: 'Reverso',
        newPrice: '$7,000 - $15,000',
        usedPrice: '$5,000 - $12,000',
        description: 'The iconic Art Deco-inspired watch with a reversible case, originally designed for polo players. Features a unique swiveling case that protects the dial during sports. The latest generation includes complications like tourbillons, perpetual calendars, and minute repeaters.',
        imageUrl: '/images/luxury/models/jaeger-lecoultre-reverso.jpg',
      },
      {
        name: 'Master Ultra Thin',
        newPrice: '$8,000 - $12,000',
        usedPrice: '$6,000 - $10,000',
        description: 'A collection of elegant dress watches featuring ultra-thin movements. The Perpetual Calendar model is one of the thinnest perpetual calendars ever made, while the Tourbillon model showcases JLC\'s technical expertise.',
        imageUrl: '/images/luxury/models/jaeger-lecoultre-master-ultra-thin.jpg',
      },
      {
        name: 'Polaris',
        newPrice: '$9,000 - $15,000',
        usedPrice: '$7,000 - $12,000',
        description: 'A modern sports watch collection inspired by the 1968 Memovox Polaris. Features an inner rotating bezel, water resistance to 200 meters, and a distinctive three-crown design. The latest generation includes chronograph and perpetual calendar models.',
        imageUrl: '/images/luxury/models/jaeger-lecoultre-polaris.jpg',
      }
    ],
    imageUrl: '/images/luxury/jaeger-lecoultre.jpg',
    standout: [
      'Creator of over 1,200 different calibers',
      'Supplier of movements to other prestigious brands',
      'Innovator in ultra-thin watchmaking',
      'Home to the Atmos clock and Gyrotourbillon',
      'Strong focus on technical innovation',
      'Complete in-house manufacturing',
      'Rich heritage in the Vallée de Joux'
    ],
    love: [
      'Exceptional value for money',
      'Technical innovation and complexity',
      'Rich heritage and tradition',
      'Wide range of styles and complications',
      'Strong after-sales service',
      'Commitment to preserving watchmaking skills',
      'Excellent finishing and movement decoration'
    ],
    hate: [
      'Some models can be difficult to service',
      'Limited brand recognition compared to competitors',
      'Some collectors find the designs too traditional',
      'Complex pieces require regular maintenance',
      'Limited availability of sports models',
      'Some see the brand as too technical',
      'Richemont ownership may limit independence'
    ]
  },
  {
    id: 'a-lange-sohne',
    name: 'A. Lange & Söhne',
    description: 'Founded in 1845, A. Lange & Söhne is known for its German watchmaking excellence and precision.',
    history: 'A. Lange & Söhne represents the pinnacle of German watchmaking. The brand is known for its Lange 1, Zeitwerk, and Datograph collections.',
    brandWebsite: 'https://www.alange-soehne.com',
    notableModels: [
      {
        name: 'Lange 1',
        newPrice: '$40,000 - $50,000',
        usedPrice: '$35,000 - $45,000',
        description: 'The brand\'s iconic watch featuring an asymmetric dial layout and outsize date. The movement is known for its three-quarter plate and hand-engraved balance cock. The latest generation includes the improved L121.1 movement with 72-hour power reserve.',
        imageUrl: '/images/luxury/models/a-lange-sohne-lange-1.jpg',
      },
      {
        name: 'Datograph',
        newPrice: '$80,000 - $100,000',
        usedPrice: '$70,000 - $90,000',
        description: 'Considered by many collectors to be the finest chronograph ever made. Features a flyback function, jumping minute counter, and exceptional finishing. The latest generation (Datograph Up/Down) includes a power reserve indicator.',
        imageUrl: '/images/luxury/models/a-lange-sohne-datograph.jpg',
      },
      {
        name: 'Zeitwerk',
        newPrice: '$90,000 - $110,000',
        usedPrice: '$80,000 - $100,000',
        description: 'A revolutionary digital-mechanical watch with jumping hours and minutes. Features a constant-force escapement and remontoir mechanism for precise time display. The latest generation includes a date display and power reserve indicator.',
        imageUrl: '/images/luxury/models/a-lange-sohne-zeitwerk.jpg',
      }
    ],
    imageUrl: '/images/luxury/a-lange-sohne.jpg',
    standout: [
      'Distinctive German watchmaking tradition',
      'Exceptional movement finishing and decoration',
      'Innovative complications and designs',
      'Limited production of only about 5,000 watches annually',
      'Strong focus on technical innovation',
      'Complete in-house manufacturing',
      'Rich heritage in Glashütte'
    ],
    love: [
      'Exceptional finishing and attention to detail',
      'Distinctive German design language',
      'Strong investment value',
      'Innovative complications',
      'Excellent customer service',
      'Commitment to preserving watchmaking skills',
      'Strong secondary market performance'
    ],
    hate: [
      'Very high price point',
      'Limited availability at retail',
      'Some models can be difficult to service',
      'Complex pieces require regular maintenance',
      'Limited sports watch options',
      'Some see the designs as too traditional',
      'Richemont ownership may limit independence'
    ]
  },
  {
    id: 'breguet',
    name: 'Breguet',
    description: 'Founded in 1775, Breguet is known for its classical designs and numerous watchmaking innovations.',
    history: 'Abraham-Louis Breguet invented many watchmaking complications, including the tourbillon. The brand is known for its Classique, Marine, and Type XX collections.',
    brandWebsite: 'https://www.breguet.com',
    notableModels: [
      {
        name: 'Classique',
        newPrice: '$20,000 - $30,000',
        usedPrice: '$15,000 - $25,000',
        description: 'The brand\'s signature collection featuring traditional Breguet design elements. Includes models with complications like tourbillons, perpetual calendars, and minute repeaters. The latest generation features improved movements and enhanced finishing.',
        imageUrl: '/images/luxury/models/breguet-classique.jpg',
      },
      {
        name: 'Marine',
        newPrice: '$25,000 - $35,000',
        usedPrice: '$20,000 - $30,000',
        description: 'A modern sports watch collection inspired by Breguet\'s role as the official chronometer-maker to the French Royal Navy. Features water resistance to 100 meters, a distinctive wave-pattern dial, and robust construction.',
        imageUrl: '/images/luxury/models/breguet-marine.jpg',
      },
      {
        name: 'Type XX',
        newPrice: '$15,000 - $25,000',
        usedPrice: '$12,000 - $20,000',
        description: 'A modern interpretation of the military chronographs supplied to the French Air Force in the 1950s. Features a flyback chronograph function, rotating bezel, and robust construction suitable for aviation use.',
        imageUrl: '/images/luxury/models/breguet-type-xx.jpg',
      }
    ],
    imageUrl: '/images/luxury/breguet.jpg',
    standout: [
      'Inventor of the tourbillon and numerous other innovations',
      'Rich heritage dating back to 1775',
      'Distinctive design elements created by A.L. Breguet',
      'Strong focus on traditional craftsmanship',
      'Complete in-house manufacturing',
      'Extensive archive of historical documents',
      'Limited production numbers'
    ],
    love: [
      'Rich historical significance',
      'Elegant, timeless designs',
      'Exceptional finishing and craftsmanship',
      'Strong investment value for rare pieces',
      'Excellent customer service',
      'Commitment to preserving traditional techniques',
      'Distinctive Breguet design elements'
    ],
    hate: [
      'Some models can be difficult to obtain',
      'High price point for basic models',
      'Limited availability of sports watches',
      'Some collectors find the designs too traditional',
      'Complex pieces require regular maintenance',
      'Limited brand recognition compared to competitors',
      'Swatch Group ownership may limit independence'
    ]
  },
  {
    id: 'blancpain',
    name: 'Blancpain',
    description: 'Founded in 1735, Blancpain is known for its traditional watchmaking and the Fifty Fathoms diving watch.',
    history: 'Blancpain claims to be the world\'s oldest watch brand. The Fifty Fathoms, introduced in 1953, was one of the first modern diving watches.',
    brandWebsite: 'https://www.blancpain.com',
    notableModels: [
      {
        name: 'Fifty Fathoms',
        newPrice: '$15,000 - $20,000',
        usedPrice: '$12,000 - $18,000',
        description: 'The world\'s first modern diving watch, introduced in 1953. Features a unidirectional rotating bezel, luminescent markers, and water resistance to 300 meters. The latest generation includes the improved 1315 movement with 120-hour power reserve.',
        imageUrl: '/images/luxury/models/blancpain-fifty-fathoms.jpg',
      },
      {
        name: 'Villeret',
        newPrice: '$10,000 - $15,000',
        usedPrice: '$8,000 - $12,000',
        description: 'The brand\'s classic dress watch collection, named after Blancpain\'s original home. Features traditional watchmaking techniques, including hand-guilloché dials and hand-engraved movements. The latest generation includes models with complications like perpetual calendars and tourbillons.',
        imageUrl: '/images/luxury/models/blancpain-villeret.jpg',
      },
      {
        name: 'L-evolution',
        newPrice: '$20,000 - $30,000',
        usedPrice: '$15,000 - $25,000',
        description: 'A modern collection featuring innovative materials and complications. Includes models with tourbillons, chronographs, and annual calendars. The latest generation features improved movements and enhanced finishing.',
        imageUrl: '/images/luxury/models/blancpain-l-evolution.jpg',
      }
    ],
    imageUrl: '/images/luxury/blancpain.jpg',
    standout: [
      'World\'s oldest watch brand',
      'Creator of the first modern diving watch',
      'Commitment to mechanical watchmaking',
      'Strong focus on traditional techniques',
      'Complete in-house manufacturing',
      'Rich heritage and tradition',
      'Limited production numbers'
    ],
    love: [
      'Rich historical significance',
      'Commitment to mechanical watchmaking',
      'Exceptional finishing and craftsmanship',
      'Strong investment value for rare pieces',
      'Excellent customer service',
      'Distinctive design language',
      'Strong secondary market performance'
    ],
    hate: [
      'Some models can be difficult to obtain',
      'High price point for basic models',
      'Limited availability of sports watches',
      'Some collectors find the designs too traditional',
      'Complex pieces require regular maintenance',
      'Limited brand recognition compared to competitors',
      'Swatch Group ownership may limit independence'
    ]
  },
  {
    id: 'piaget',
    name: 'Piaget',
    description: 'Founded in 1874, Piaget is known for its ultra-thin movements and luxury jewelry watches.',
    history: 'Piaget revolutionized watchmaking with its ultra-thin movements in the 1950s. The brand is known for its Altiplano and Polo collections.',
    brandWebsite: 'https://www.piaget.com',
    notableModels: [
      {
        name: 'Altiplano',
        newPrice: '$20,000 - $30,000',
        usedPrice: '$15,000 - $25,000',
        description: 'The brand\'s signature ultra-thin watch collection. Features the world\'s thinnest automatic movement (2.3mm) and a minimalist design. The latest generation includes models with complications like perpetual calendars and tourbillons.',
        imageUrl: '/images/luxury/models/piaget-altiplano.jpg',
      },
      {
        name: 'Polo',
        newPrice: '$25,000 - $35,000',
        usedPrice: '$20,000 - $30,000',
        description: 'A modern sports watch collection featuring an integrated bracelet and distinctive design. The latest generation includes models with chronographs, perpetual calendars, and tourbillons.',
        imageUrl: '/images/luxury/models/piaget-polo.jpg',
      },
      {
        name: 'Limelight',
        newPrice: '$30,000 - $50,000',
        usedPrice: '$25,000 - $40,000',
        description: 'A collection of luxury jewelry watches featuring precious stones and artistic dials. Includes models with complications like moon phases and date displays.',
        imageUrl: '/images/luxury/models/piaget-limelight.jpg',
      }
    ],
    imageUrl: '/images/luxury/piaget.jpg',
    standout: [
      'Creator of the world\'s thinnest movements',
      'Expertise in hard stone dials and gem-setting',
      'Strong focus on artistic craftsmanship',
      'Complete in-house manufacturing',
      'Rich heritage in ultra-thin watchmaking',
      'Limited production numbers',
      'Distinctive design language'
    ],
    love: [
      'Exceptional finishing and craftsmanship',
      'Ultra-thin movements',
      'Strong investment value for rare pieces',
      'Excellent customer service',
      'Commitment to preserving traditional techniques',
      'Distinctive design language',
      'Strong secondary market performance'
    ],
    hate: [
      'Some models can be difficult to obtain',
      'High price point for basic models',
      'Limited availability of sports watches',
      'Some collectors find the designs too traditional',
      'Complex pieces require regular maintenance',
      'Limited brand recognition compared to competitors',
      'Richemont ownership may limit independence'
    ]
  },
  {
    id: 'girard-perregaux',
    name: 'Girard-Perregaux',
    description: 'Founded in 1791, Girard-Perregaux is known for its tourbillon watches and classical designs.',
    history: 'Girard-Perregaux has been creating tourbillon watches since the 1860s. The brand is known for its Laureato and 1966 collections.',
    brandWebsite: 'https://www.girard-perregaux.com',
    notableModels: [
      {
        name: 'Laureato',
        newPrice: '$12,000 - $20,000',
        usedPrice: '$10,000 - $18,000',
        description: 'The brand\'s signature sports watch collection, introduced in 1975. Features an integrated bracelet and distinctive octagonal bezel. The latest generation includes models with chronographs, perpetual calendars, and tourbillons.',
        imageUrl: '/images/luxury/models/girard-perregaux-laureato.jpg',
      },
      {
        name: '1966',
        newPrice: '$15,000 - $25,000',
        usedPrice: '$12,000 - $20,000',
        description: 'A collection of elegant dress watches featuring traditional watchmaking techniques. Includes models with complications like moon phases, perpetual calendars, and tourbillons.',
        imageUrl: '/images/luxury/models/girard-perregaux-1966.jpg',
      },
      {
        name: 'Three Bridges',
        newPrice: '$80,000 - $100,000',
        usedPrice: '$70,000 - $90,000',
        description: 'The brand\'s iconic tourbillon watch, featuring a distinctive three-bridge design. The latest generation includes models with automatic winding and enhanced finishing.',
        imageUrl: '/images/luxury/models/girard-perregaux-three-bridges.jpg',
      }
    ],
    imageUrl: '/images/luxury/girard-perregaux.jpg',
    standout: [
      'Creator of the iconic Three Bridges tourbillon',
      'Expertise in chronographs and high-frequency movements',
      'Strong focus on traditional craftsmanship',
      'Complete in-house manufacturing',
      'Rich heritage in watchmaking',
      'Limited production numbers',
      'Distinctive design language'
    ],
    love: [
      'Exceptional finishing and craftsmanship',
      'Innovative complications',
      'Strong investment value for rare pieces',
      'Excellent customer service',
      'Commitment to preserving traditional techniques',
      'Distinctive design language',
      'Strong secondary market performance'
    ],
    hate: [
      'Some models can be difficult to obtain',
      'High price point for basic models',
      'Limited availability of sports watches',
      'Some collectors find the designs too traditional',
      'Complex pieces require regular maintenance',
      'Limited brand recognition compared to competitors',
      'Kering Group ownership may limit independence'
    ]
  },
  {
    id: 'cartier',
    name: 'Cartier',
    description: 'Founded in 1847, Cartier is known for its elegant designs and iconic watch collections that blend jewelry and watchmaking.',
    history: 'Cartier revolutionized watch design with the Santos in 1904, the first wristwatch designed for men. The brand is known for its Tank, Santos, and Ballon Bleu collections.',
    brandWebsite: 'https://www.cartier.com',
    notableModels: [
      {
        name: 'Tank',
        newPrice: '$3,000 - $30,000',
        usedPrice: '$2,500 - $25,000',
        description: 'One of the most iconic watch designs ever created, introduced in 1917. Inspired by the Renault tanks of World War I, the Tank has been worn by numerous celebrities and dignitaries. Available in various sizes and complications.',
        imageUrl: '/images/luxury/models/cartier-tank.jpg',
      },
      {
        name: 'Santos',
        newPrice: '$6,000 - $15,000',
        usedPrice: '$5,000 - $12,000',
        description: 'The first purpose-designed men\'s wristwatch, created in 1904 for aviator Alberto Santos-Dumont. Features a distinctive square case with exposed screws and an integrated bracelet.',
        imageUrl: '/images/luxury/models/cartier-santos.jpg',
      },
      {
        name: 'Ballon Bleu',
        newPrice: '$5,000 - $20,000',
        usedPrice: '$4,000 - $15,000',
        description: 'A modern classic introduced in 2007. Features a distinctive round case with a unique crown guard and floating crown. Available in various sizes and complications.',
        imageUrl: '/images/luxury/models/cartier-ballon-bleu.jpg',
      }
    ],
    imageUrl: '/images/luxury/cartier.jpg',
    standout: [
      'Creator of iconic watch designs',
      'Strong jewelry heritage',
      'Royal connections',
      'Distinctive design language',
      'Wide range of price points',
      'Strong brand recognition',
      'Excellent resale value'
    ],
    love: [
      'Timeless, iconic designs',
      'Strong brand heritage',
      'Excellent finishing',
      'Wide range of options',
      'Strong secondary market',
      'Excellent customer service',
      'Good value for money'
    ],
    hate: [
      'Some models use basic movements',
      'Limited technical innovation',
      'High price for basic models',
      'Some collectors find designs too fashion-oriented',
      'Limited availability of complex pieces',
      'Some models lack water resistance',
      'Richemont Group ownership may limit independence'
    ]
  },
  {
    id: 'omega',
    name: 'Omega',
    description: 'Founded in 1848, Omega is known for its precision timekeeping and association with space exploration and sports timing.',
    history: 'Omega has been the official timekeeper of the Olympic Games since 1932 and was the first watch worn on the moon. The brand is known for its Speedmaster, Seamaster, and Constellation collections.',
    brandWebsite: 'https://www.omegawatches.com',
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
    description: 'Founded in 1868, IWC is known for its pilot\'s watches and engineering excellence.',
    history: 'IWC has been creating pilot\'s watches since the 1930s. The brand is known for its Portugieser, Pilot\'s Watch, and Ingenieur collections.',
    brandWebsite: 'https://www.iwc.com',
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
    description: 'Founded in 1860, Panerai is known for its distinctive Italian design and military heritage.',
    history: 'Panerai supplied watches to the Italian Navy before becoming a luxury brand. The brand is known for its Luminor and Radiomir collections.',
    brandWebsite: 'https://www.panerai.com',
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
    description: 'Founded in 1980, Hublot is known for its fusion of traditional watchmaking and innovative materials.',
    history: 'Hublot revolutionized watchmaking with its "Art of Fusion" philosophy, combining precious metals with rubber. The brand is known for its Big Bang collection.',
    brandWebsite: 'https://www.hublot.com',
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
    description: 'Founded in 1865, Zenith is known for its high-frequency movements and chronographs.',
    history: 'Zenith created the El Primero movement in 1969, one of the first automatic chronograph movements. The brand is known for its Defy and Chronomaster collections.',
    brandWebsite: 'https://www.zenith-watches.com',
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
    description: 'Founded in 1846, Ulysse Nardin is known for its marine chronometers and innovative materials.',
    history: 'Ulysse Nardin supplied marine chronometers to navies worldwide. The brand is known for its Marine and Freak collections.',
    brandWebsite: 'https://www.ulysse-nardin.com',
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
    description: 'Founded in 1845, Glashütte Original is known for its German watchmaking tradition and precision.',
    history: 'Glashütte Original represents the best of German watchmaking. The brand is known for its Pano and Senator collections.',
    brandWebsite: 'https://www.glashuette-original.com',
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
    description: 'Founded in 1991, Franck Muller is known for its bold designs and complex complications.',
    history: 'Franck Muller gained fame for his innovative designs and complex movements. The brand is known for its tonneau-shaped cases and colorful dials.',
    brandWebsite: 'https://www.franckmuller.com',
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
  },
  {
    id: 'fp-journe',
    name: 'F.P. Journe',
    description: 'Founded in 1999 by François-Paul Journe, F.P. Journe is a celebrated independent Swiss watchmaker renowned for its technical innovation, unique design language, and extremely limited production.',
    history: 'F.P. Journe began as the vision of François-Paul Journe, who had previously restored antique clocks and watches before launching his own brand in Geneva. The brand quickly gained acclaim for its inventive complications, such as the Chronomètre à Résonance (the first wristwatch to use resonance for improved accuracy), the Tourbillon Souverain (the first tourbillon wristwatch with a remontoir d\'égalité), and the Octa collection (featuring the first automatic movement with a 120-hour power reserve).',
    brandWebsite: 'https://www.fpjourne.com',
    notableModels: [
      {
        name: 'Chronomètre à Résonance',
        newPrice: '$30,000 - $50,000',
        usedPrice: '$25,000 - $40,000',
        description: 'Revolutionary jumping hours display.',
        imageUrl: '/images/luxury/models/fp-journe-chronometre-a-resonance.jpg',
      },
      {
        name: 'Tourbillon Souverain',
        newPrice: '$20,000 - $40,000',
        usedPrice: '$15,000 - $30,000',
        description: 'Modern sports watch collection.',
        imageUrl: '/images/luxury/models/fp-journe-tourbillon-souverain.jpg',
      }
    ],
    imageUrl: '/images/luxury/fp-journe.jpg'
  }
]; 