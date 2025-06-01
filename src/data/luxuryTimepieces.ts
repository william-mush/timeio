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
    description: 'Founded in 2001, Richard Mille is known for their ultra-modern, high-tech timepieces often inspired by racing and sports.',
    history: 'A relatively new brand that has quickly risen to prominence through innovative materials and avant-garde designs.',
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
    imageUrl: '/images/luxury/richard-mille.jpg',
    standout: [],
    love: [],
    hate: []
  },
  {
    id: 'jaeger-lecoultre',
    name: 'Jaeger-LeCoultre',
    description: 'Founded in 1833 by Antoine LeCoultre, Jaeger-LeCoultre is known as the "watchmaker\'s watchmaker" for its exceptional movement manufacturing capabilities and technical innovations.',
    history: 'Based in the Vallée de Joux, Switzerland, Jaeger-LeCoultre has created over 1,200 different calibers and holds hundreds of patents. The brand\'s partnership with French watchmaker Edmond Jaeger in 1903 led to the creation of ultra-thin movements that revolutionized watchmaking. JLC has supplied movements to other prestigious brands, including Patek Philippe, Vacheron Constantin, and Audemars Piguet. The brand is known for its innovative complications, including the Atmos clock (which runs on temperature changes), the Reverso (with its reversible case), and the Gyrotourbillon (a multi-axis tourbillon).',
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
    description: 'Founded in 1845 by Ferdinand Adolph Lange, A. Lange & Söhne represents the pinnacle of German watchmaking, known for their exceptional finishing, innovative complications, and distinctive design language.',
    history: 'Based in Glashütte, Germany, the brand was nationalized during the Cold War and revived in 1990 by Walter Lange, the great-grandson of the founder. The brand\'s renaissance marked the rebirth of German watchmaking, with the first four watches (Lange 1, Saxonia, Arkade, and Tourbillon "Pour le Mérite") setting new standards in watchmaking. A. Lange & Söhne is known for their distinctive German design elements, including the three-quarter plate, hand-engraved balance cocks, and gold chatons. The brand produces only about 5,000 watches annually, each subject to rigorous quality control.',
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
    description: 'Founded in 1775 by Abraham-Louis Breguet, Breguet is one of the most influential watch manufacturers in history, known for numerous horological innovations and elegant designs that have shaped watchmaking for over two centuries.',
    history: 'Based in Paris, France, Breguet revolutionized watchmaking with inventions including the tourbillon (1801), the pare-chute shock protection system (1790), and the self-winding mechanism (1780). The brand\'s watches were favored by royalty, including Marie-Antoinette and Napoleon Bonaparte. Today, Breguet continues to produce watches that combine traditional craftsmanship with modern technology, maintaining the distinctive design elements created by its founder, such as the Breguet hands, guilloché dials, and coin-edge cases. The brand is owned by the Swatch Group but maintains its independence in terms of design and production.',
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
    description: 'Founded in 1735 by Jehan-Jacques Blancpain, Blancpain is the oldest watch brand in the world, known for their commitment to traditional watchmaking and the famous "Never an quartz" motto.',
    history: 'Based in Le Brassus, Switzerland, Blancpain has maintained its commitment to mechanical watchmaking throughout its history. The brand was revived in 1983 by Jean-Claude Biver and Jacques Piguet, who famously declared "Since 1735, there has never been a quartz Blancpain watch. And there never will be." Blancpain is credited with saving the mechanical watch industry during the quartz crisis. The brand is known for its Fifty Fathoms diving watch, which was the first modern diving watch (1953), and its commitment to traditional watchmaking techniques. Today, Blancpain produces about 30,000 watches annually, each subject to rigorous quality control.',
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
    description: 'Founded in 1874 by Georges-Édouard Piaget, Piaget is renowned for their ultra-thin movements and luxury jewelry watches, combining exceptional watchmaking with artistic craftsmanship.',
    history: 'Based in La Côte-aux-Fées, Switzerland, Piaget began as a movement manufacturer before becoming a complete watchmaker. The brand gained fame in the 1950s and 1960s for creating the world\'s thinnest movements, including the 2mm-thick 9P manual-wind movement (1957) and the 2.3mm-thick 12P automatic movement (1960). Piaget is also known for their expertise in hard stone dials, gold work, and gem-setting. The brand has been owned by the Richemont Group since 1988 but maintains its independence in terms of design and production. Today, Piaget produces about 40,000 watches annually, each subject to rigorous quality control.',
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
    description: 'Founded in 1791 by Jean-François Bautte, Girard-Perregaux is known for their innovative designs and high-quality movements, particularly the iconic Three Bridges tourbillon.',
    history: 'Based in La Chaux-de-Fonds, Switzerland, Girard-Perregaux has a rich history of innovation and craftsmanship. The brand gained fame in the 1860s with the creation of the Three Bridges tourbillon, a design that has become their signature. Girard-Perregaux is also known for their expertise in chronographs and high-frequency movements. The brand has been owned by the Kering Group since 2011 but maintains its independence in terms of design and production. Today, Girard-Perregaux produces about 12,000 watches annually, each subject to rigorous quality control.',
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
    description: 'Founded in 1847 by Louis-François Cartier, Cartier is one of the world\'s most prestigious jewelry and watch brands, known for their iconic designs and royal connections.',
    history: 'Based in Paris, France, Cartier began as a jewelry house before becoming one of the most influential watchmakers of the 20th century. The brand gained fame for creating the first wristwatch for men, the Santos, in 1904. Cartier has been owned by the Richemont Group since 1988 but maintains its unique design language and heritage. Today, Cartier produces about 500,000 watches annually, combining traditional craftsmanship with modern technology. The brand is known for their distinctive case designs, including the Tank, Santos, and Ballon Bleu.',
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
    description: 'Founded in 1848 by Louis Brandt, Omega is renowned for its precision, innovation, and association with space exploration, sports timing, and James Bond. Omega is one of the most recognized Swiss watch brands worldwide.',
    history: 'Omega began as La Generale Watch Co. in La Chaux-de-Fonds, Switzerland, and adopted the Omega name in 1903. The brand is famous for being the official timekeeper of the Olympic Games since 1932 and for the Speedmaster Professional "Moonwatch," the first watch worn on the moon during the Apollo 11 mission in 1969. Omega has pioneered numerous innovations, including the co-axial escapement, Master Chronometer certification, and significant advancements in anti-magnetic technology. The brand is also known for its association with James Bond films since 1995.',
    brandWebsite: 'https://www.omegawatches.com',
    notableModels: [
      {
        name: 'Speedmaster Professional Moonwatch',
        newPrice: '$6,500 - $8,000',
        usedPrice: '$4,500 - $7,000',
        description: 'The legendary chronograph that accompanied NASA astronauts to the moon. Features a hand-wound movement, Hesalite or sapphire crystal, and a classic black dial. The latest generation includes the caliber 3861 movement with Master Chronometer certification.',
        imageUrl: '/images/luxury/models/omega-speedmaster.jpg',
      },
      {
        name: 'Seamaster Diver 300M',
        newPrice: '$5,000 - $7,000',
        usedPrice: '$3,500 - $6,000',
        description: 'The iconic diving watch, known for its helium escape valve, wave-pattern dial, and association with James Bond. The latest generation features the co-axial Master Chronometer movement and ceramic bezel.',
        imageUrl: '/images/luxury/models/omega-seamaster.jpg',
      },
      {
        name: 'Constellation',
        newPrice: '$4,000 - $10,000',
        usedPrice: '$2,500 - $8,000',
        description: 'A classic dress watch collection featuring the signature "Griffes" or claws and integrated bracelet. The latest generation includes Master Chronometer movements and a variety of dial options.',
        imageUrl: '/images/luxury/models/omega-constellation.jpg',
      }
    ],
    imageUrl: '/images/luxury/omega.jpg',
    standout: [
      'First watch on the moon (Speedmaster)',
      'Official timekeeper of the Olympic Games',
      'Innovator in anti-magnetic and co-axial technology',
      'Strong association with James Bond',
      'Wide range of models and price points',
      'Master Chronometer certification',
      'Excellent value for money'
    ],
    love: [
      'Rich history and heritage',
      'Technical innovation and reliability',
      'Strong brand recognition',
      'Excellent finishing and quality control',
      'Wide variety of styles and complications',
      'Good investment value for certain models',
      'Strong after-sales service'
    ],
    hate: [
      'High production numbers reduce exclusivity',
      'Some models can be difficult to service',
      'Depreciation on less popular models',
      'Some collectors find the designs too commercial',
      'Limited availability of special editions',
      'Brand sometimes overshadowed by Rolex',
      'Complex pieces require regular maintenance'
    ]
  },
  {
    id: 'panerai',
    name: 'Panerai',
    description: 'Founded in 1860 by Giovanni Panerai in Florence, Italy, Panerai is celebrated for its bold Italian design, military heritage, and oversized cushion-shaped cases. The brand is known for its luminous dials and strong collector community, the "Paneristi."',
    history: 'Panerai began as a watch shop and workshop in Florence, supplying precision instruments to the Italian Navy. The brand developed the Radiomir and Luminor models for military divers, featuring large, legible dials and robust water resistance. Panerai introduced the first civilian models in the 1990s, quickly gaining a cult following. Today, Panerai combines Swiss watchmaking expertise with Italian design, producing both in-house and outsourced movements.',
    brandWebsite: 'https://www.panerai.com',
    notableModels: [
      {
        name: 'Luminor Marina',
        newPrice: '$8,000 - $12,000',
        usedPrice: '$6,000 - $10,000',
        description: 'The quintessential Panerai, featuring the signature crown protection device, sandwich dial, and robust water resistance. The latest generation includes in-house automatic movements and a variety of case materials.',
        imageUrl: '/images/luxury/models/panerai-luminor.jpg',
      },
      {
        name: 'Radiomir 1940',
        newPrice: '$7,000 - $11,000',
        usedPrice: '$5,000 - $9,000',
        description: 'A modern take on the original Radiomir, featuring a cushion-shaped case, wire lugs, and minimalist dial. The latest generation includes both hand-wound and automatic movements.',
        imageUrl: '/images/luxury/models/panerai-radiomir.jpg',
      },
      {
        name: 'Submersible',
        newPrice: '$9,000 - $15,000',
        usedPrice: '$7,000 - $12,000',
        description: 'Panerai\'s professional diving watch, featuring a unidirectional rotating bezel, high water resistance, and bold design. The latest generation includes in-house automatic movements and a variety of case materials.',
        imageUrl: '/images/luxury/models/panerai-submersible.jpg',
      }
    ],
    imageUrl: '/images/luxury/panerai.jpg',
    standout: [
      'Iconic Italian design and military heritage',
      'Oversized cushion-shaped cases',
      'Luminous sandwich dials',
      'Strong collector community (Paneristi)',
      'Wide range of case materials',
      'Distinctive crown protection device',
      'Limited production numbers'
    ],
    love: [
      'Bold, distinctive designs',
      'Rich military history',
      'Strong collector community',
      'Excellent water resistance',
      'Good value for money',
      'Wide range of options',
      'Strong resale value for limited editions'
    ],
    hate: [
      'Large case sizes may not suit all wrists',
      'Depreciation on some models',
      'Limited availability of special editions',
      'Some models use outsourced movements',
      'Brand sometimes seen as repetitive',
      'Complex pieces require regular maintenance',
      'High price point for in-house models'
    ]
  },
  {
    id: 'hublot',
    name: 'Hublot',
    description: 'Founded in 1980 by Carlo Crocco, Hublot is known for its "Art of Fusion" philosophy, combining traditional Swiss watchmaking with innovative materials and bold designs. The brand is famous for its disruptive marketing and celebrity partnerships.',
    history: 'Hublot introduced the first luxury watch with a natural rubber strap in 1980, revolutionizing the industry. The brand gained global recognition with the launch of the Big Bang in 2005, which combined gold, ceramic, and rubber. Hublot is a pioneer in using materials like Magic Gold, carbon fiber, and sapphire. The brand is also known for its high-profile sponsorships in sports and collaborations with artists and athletes.',
    brandWebsite: 'https://www.hublot.com',
    notableModels: [
      {
        name: 'Big Bang Unico',
        newPrice: '$18,000 - $30,000',
        usedPrice: '$14,000 - $25,000',
        description: 'The flagship chronograph, featuring an in-house Unico movement, modular case construction, and a wide range of materials and colors. The latest generation includes sapphire cases and skeletonized dials.',
        imageUrl: '/images/luxury/models/hublot-big-bang.jpg',
      },
      {
        name: 'Classic Fusion',
        newPrice: '$7,000 - $15,000',
        usedPrice: '$5,000 - $12,000',
        description: 'A more understated collection, blending classic design with modern materials. Available in a variety of sizes, complications, and case materials.',
        imageUrl: '/images/luxury/models/hublot-classic-fusion.jpg',
      },
      {
        name: 'Spirit of Big Bang',
        newPrice: '$20,000 - $40,000',
        usedPrice: '$16,000 - $30,000',
        description: 'A tonneau-shaped extension of the Big Bang line, featuring the Unico movement and bold design elements. Available in a wide range of materials and limited editions.',
        imageUrl: '/images/luxury/models/hublot-spirit-of-big-bang.jpg',
      }
    ],
    imageUrl: '/images/luxury/hublot.jpg',
    standout: [
      'Pioneer of the "Art of Fusion"',
      'Innovative use of materials',
      'Bold, disruptive designs',
      'Strong marketing and celebrity partnerships',
      'Wide range of limited editions',
      'In-house Unico movement',
      'Strong brand recognition among younger collectors'
    ],
    love: [
      'Bold, modern designs',
      'Innovative materials',
      'Wide range of options',
      'Strong resale value for limited editions',
      'Excellent customer service',
      'Good value for money',
      'Strong brand identity'
    ],
    hate: [
      'High price point for basic models',
      'Depreciation on some models',
      'Some collectors find designs too flashy',
      'Limited technical innovation in some lines',
      'Brand sometimes seen as marketing-driven',
      'Complex pieces require regular maintenance',
      'Limited availability of special editions'
    ]
  },
  {
    id: 'zenith',
    name: 'Zenith',
    description: 'Founded in 1865 by Georges Favre-Jacot, Zenith is celebrated for its high-frequency chronograph movements, especially the legendary El Primero. The brand is known for its technical innovation and precision.',
    history: 'Zenith was established in Le Locle, Switzerland, and quickly gained a reputation for precision and innovation. In 1969, Zenith introduced the El Primero, one of the world\'s first automatic chronograph movements, beating at 36,000 vibrations per hour. The brand has won over 2,300 chronometry prizes and continues to innovate with the Defy collection, featuring high-frequency and ultra-light movements.',
    brandWebsite: 'https://www.zenith-watches.com',
    notableModels: [
      {
        name: 'Chronomaster Sport',
        newPrice: '$10,000 - $14,000',
        usedPrice: '$8,000 - $12,000',
        description: 'A modern chronograph inspired by the original El Primero, featuring a ceramic bezel, tri-color subdials, and the latest El Primero 3600 movement.',
        imageUrl: '/images/luxury/models/zenith-chronomaster.jpg'
      },
      {
        name: 'Defy El Primero 21',
        newPrice: '$12,000 - $18,000',
        usedPrice: '$10,000 - $15,000',
        description: 'A cutting-edge chronograph capable of measuring 1/100th of a second, featuring a skeletonized dial and innovative materials.',
        imageUrl: '/images/luxury/models/zenith-defy.jpg'
      },
      {
        name: 'Pilot Type 20',
        newPrice: '$7,000 - $10,000',
        usedPrice: '$5,000 - $8,000',
        description: 'A vintage-inspired pilot\'s watch, featuring an oversized onion crown, bold Arabic numerals, and a robust case. The latest generation includes in-house movements and a variety of case materials.',
        imageUrl: '/images/luxury/models/zenith-pilot-type-20.jpg'
      }
    ],
    imageUrl: '/images/luxury/zenith.jpg',
    standout: [
      'Creator of the El Primero movement',
      'High-frequency chronograph innovation',
      'Strong focus on precision and accuracy',
      'Award-winning chronometry',
      'Distinctive design language',
      'Wide range of models and complications',
      'Rich heritage in Swiss watchmaking'
    ],
    love: [
      'Technical innovation and precision',
      'Rich history and heritage',
      'Strong value for money',
      'Excellent finishing and quality',
      'Wide range of options',
      'Strong collector following',
      'Good resale value for El Primero models'
    ],
    hate: [
      'Limited brand recognition compared to competitors',
      'Depreciation on some models',
      'Some collectors find designs too traditional',
      'Complex pieces require regular maintenance',
      'Limited availability of special editions',
      'Brand sometimes overshadowed by larger groups',
      'High price point for limited editions'
    ]
  },
  {
    id: 'ulysse-nardin',
    name: 'Ulysse Nardin',
    description: 'Founded in 1846 by Ulysse Nardin in Le Locle, Switzerland, the brand is renowned for its marine chronometers, innovative complications, and avant-garde designs. Ulysse Nardin is a pioneer in the use of silicon technology in watchmaking.',
    history: 'Ulysse Nardin began as a manufacturer of marine chronometers, supplying navies and shipping companies worldwide. The brand is known for its technical innovation, including the use of silicon escapements, the Freak collection with its revolutionary carousel movement, and the Marine collection inspired by traditional chronometers. Ulysse Nardin is also recognized for its bold, avant-garde designs and limited production numbers.',
    brandWebsite: 'https://www.ulysse-nardin.com',
    notableModels: [
      {
        name: 'Marine Chronometer',
        newPrice: '$10,000 - $20,000',
        usedPrice: '$8,000 - $15,000',
        description: 'A modern interpretation of the classic marine chronometer, featuring a power reserve indicator, small seconds, and date. The latest generation includes in-house movements and silicon technology.',
        imageUrl: '/images/luxury/models/ulysse-nardin-marine.jpg',
      },
      {
        name: 'Freak X',
        newPrice: '$25,000 - $35,000',
        usedPrice: '$20,000 - $30,000',
        description: 'A revolutionary watch with no traditional hands or crown, featuring a rotating movement to indicate the time. The Freak X is a more accessible version of the original Freak, featuring silicon technology and a bold design.',
        imageUrl: '/images/luxury/models/ulysse-nardin-freak.jpg',
      },
      {
        name: 'Diver',
        newPrice: '$8,000 - $12,000',
        usedPrice: '$6,000 - $10,000',
        description: 'A robust diving watch collection, featuring high water resistance, bold design, and in-house movements. The latest generation includes models with chronograph and GMT complications.',
        imageUrl: '/images/luxury/models/ulysse-nardin-diver.jpg'
      }
    ],
    imageUrl: '/images/luxury/ulysse-nardin.jpg',
    standout: [
      'Pioneer in marine chronometers',
      'Innovator in silicon technology',
      'Avant-garde designs',
      'Limited production numbers',
      'Strong focus on technical innovation',
      'Distinctive design language',
      'Rich heritage in marine watchmaking'
    ],
    love: [
      'Technical innovation and creativity',
      'Rich history and tradition',
      'Strong value for money',
      'Excellent finishing and quality',
      'Wide range of options',
      'Strong collector following',
      'Good resale value for limited editions'
    ],
    hate: [
      'Limited brand recognition compared to competitors',
      'Depreciation on some models',
      'Some collectors find designs too avant-garde',
      'Complex pieces require regular maintenance',
      'Limited availability of special editions',
      'Brand sometimes overshadowed by larger groups',
      'High price point for limited editions'
    ]
  },
  {
    id: 'glashutte-original',
    name: 'Glashütte Original',
    description: 'Founded in 1845 in Glashütte, Germany, Glashütte Original is celebrated for its traditional German watchmaking, in-house movements, and Saxon craftsmanship. The brand is known for its elegant designs and technical innovation.',
    history: 'Glashütte Original traces its roots to the founding of the watchmaking industry in Glashütte, Saxony. The brand survived nationalization during the Cold War and was revived after German reunification. Glashütte Original is known for its in-house movements, traditional three-quarter plate, and hand-engraved decorations. The brand produces a wide range of complications, including the PanoMaticLunar, Senator, and innovative chronographs.',
    brandWebsite: 'https://www.glashuette-original.com',
    notableModels: [
      {
        name: 'PanoMaticLunar',
        newPrice: '$12,000 - $15,000',
        usedPrice: '$10,000 - $12,000',
        description: 'A signature model featuring an off-center dial, moon phase complication, and panorama date. The latest generation includes in-house automatic movements and exquisite finishing.',
        imageUrl: '/images/luxury/models/glashutte-original-panomatic-lunar.jpg',
      },
      {
        name: 'Senator Chronograph Panorama Date',
        newPrice: '$15,000 - $25,000',
        usedPrice: '$12,000 - $20,000',
        description: 'An elegant chronograph with a large panorama date, flyback function, and in-house movement. The latest generation features hand-engraved decorations and a variety of dial options.',
        imageUrl: '/images/luxury/models/glashutte-original-senator.jpg',
      },
      {
        name: 'SeaQ',
        newPrice: '$10,000 - $14,000',
        usedPrice: '$8,000 - $12,000',
        description: 'A modern diving watch inspired by the brand\'s historic Spezimatic Type RP TS 200 from 1969. Features a unidirectional rotating bezel, high water resistance, and in-house movement.',
        imageUrl: '/images/luxury/models/glashutte-original-seaq.jpg'
      }
    ],
    imageUrl: '/images/luxury/glashutte-original.jpg',
    standout: [
      'Traditional German watchmaking',
      'In-house movements and complications',
      'Hand-engraved decorations',
      'Elegant, distinctive designs',
      'Rich Saxon heritage',
      'Wide range of complications',
      'Strong value for money'
    ],
    love: [
      'Exceptional finishing and craftsmanship',
      'Rich history and tradition',
      'Strong value for money',
      'Wide range of options',
      'Strong collector following',
      'Good resale value for limited editions',
      'Excellent after-sales service'
    ],
    hate: [
      'Limited brand recognition compared to Swiss competitors',
      'Depreciation on some models',
      'Some collectors find designs too traditional',
      'Complex pieces require regular maintenance',
      'Limited availability of special editions',
      'Brand sometimes overshadowed by larger groups',
      'High price point for limited editions'
    ]
  },
  {
    id: 'frank-muller',
    name: 'Franck Muller',
    description: 'Founded in 1991 by Franck Muller and Vartan Sirmakes, Franck Muller is known as the "Master of Complications" for its innovative, complex movements and bold, tonneau-shaped cases. The brand is celebrated for its avant-garde designs and technical prowess.',
    history: 'Franck Muller began as a small workshop in Geneva, quickly gaining fame for its highly complicated watches, including tourbillons, perpetual calendars, and unique time displays. The brand is known for its Crazy Hours, which features a jumping hour display, and the Vanguard collection, which combines sporty aesthetics with technical innovation. Franck Muller produces all movements in-house and is recognized for its colorful, artistic dials.',
    brandWebsite: 'https://www.frank-muller.com',
    notableModels: [
      {
        name: 'Crazy Hours',
        newPrice: '$30,000 - $50,000',
        usedPrice: '$25,000 - $40,000',
        description: 'A revolutionary watch featuring a jumping hour display, where the hour hand jumps to the next correct numeral in a non-sequential order. The latest generation includes a variety of case materials and dial colors.',
        imageUrl: '/images/luxury/models/frank-muller-crazy-hours.jpg',
      },
      {
        name: 'Vanguard',
        newPrice: '$20,000 - $40,000',
        usedPrice: '$15,000 - $30,000',
        description: 'A modern sports watch collection featuring bold, tonneau-shaped cases, colorful dials, and a variety of complications. The latest generation includes chronographs, tourbillons, and skeletonized models.',
        imageUrl: '/images/luxury/models/frank-muller-vanguard.jpg',
      },
      {
        name: 'Aeternitas Mega',
        newPrice: '$2,000,000+',
        usedPrice: 'Rarely available',
        description: 'The world\'s most complicated wristwatch, featuring 36 complications, 1,483 components, and a perpetual calendar good for 1,000 years. Produced in extremely limited numbers.',
        imageUrl: '/images/luxury/models/frank-muller-aeternitas-mega.jpg'
      }
    ],
    imageUrl: '/images/luxury/frank-muller.jpg',
    standout: [
      'Master of Complications',
      'Innovative, complex movements',
      'Bold, avant-garde designs',
      'Tonneau-shaped cases',
      'Colorful, artistic dials',
      'In-house movement manufacturing',
      'Limited production numbers'
    ],
    love: [
      'Technical innovation and creativity',
      'Bold, distinctive designs',
      'Strong collector following',
      'Good resale value for limited editions',
      'Excellent finishing and quality',
      'Wide range of complications',
      'Strong brand identity'
    ],
    hate: [
      'High price point for complicated models',
      'Depreciation on some models',
      'Some collectors find designs too bold',
      'Complex pieces require regular maintenance',
      'Limited availability of special editions',
      'Brand sometimes overshadowed by older houses',
      'High service costs for complicated pieces'
    ]
  },
  {
    id: 'fp-journe',
    name: 'F.P. Journe',
    description: 'Founded in 1999 by François-Paul Journe, F.P. Journe is a celebrated independent Swiss watchmaker renowned for its technical innovation, unique design language, and extremely limited production. The brand is revered by collectors for its in-house movements, creative complications, and the personal vision of its founder.',
    history: 'F.P. Journe began as the vision of François-Paul Journe, who had previously restored antique clocks and watches before launching his own brand in Geneva. The brand quickly gained acclaim for its inventive complications, such as the Chronomètre à Résonance (the first wristwatch to use resonance for improved accuracy), the Tourbillon Souverain (the first tourbillon wristwatch with a remontoir d\'égalité), and the Octa collection (featuring the first automatic movement with a 120-hour power reserve). F.P. Journe is known for its distinctive dial layouts, precious metal movements, and a philosophy of "Invenit et Fecit" (He invented it and made it). Production is extremely limited, with fewer than 1,000 watches made per year, making each piece highly sought after by connoisseurs.',
    brandWebsite: 'https://www.fpjourne.com',
    notableModels: [
      {
        name: 'Chronomètre à Résonance',
        newPrice: '$120,000 - $180,000',
        usedPrice: '$180,000 - $350,000',
        description: 'The world\'s first wristwatch to use resonance, featuring two balances that synchronize for improved accuracy. A technical marvel and a collector favorite.',
        imageUrl: '/images/luxury/models/fp-journe-resonance.jpg',
      },
      {
        name: 'Tourbillon Souverain',
        newPrice: '$150,000 - $200,000',
        usedPrice: '$200,000 - $400,000',
        description: 'A groundbreaking tourbillon wristwatch with a remontoir d\'égalité for constant force delivery. Known for its beautiful finishing and technical sophistication.',
        imageUrl: '/images/luxury/models/fp-journe-tourbillon.jpg',
      },
      {
        name: 'Octa Automatique Lune',
        newPrice: '$60,000 - $80,000',
        usedPrice: '$80,000 - $120,000',
        description: 'Part of the Octa collection, this model features a moonphase, large date, and a 120-hour power reserve. Praised for its practicality and elegant design.',
        imageUrl: '/images/luxury/models/fp-journe-octa.jpg',
      }
    ],
    imageUrl: '/images/luxury/fp-journe.jpg',
    standout: [
      'Independent Swiss watchmaker with a cult following',
      'Inventor of the resonance wristwatch',
      'Movements crafted from solid gold',
      'Extremely limited production (under 1,000 watches per year)',
      'Distinctive, instantly recognizable design language',
      'Personal involvement of François-Paul Journe in every watch',
      'Multiple Grand Prix d\'Horlogerie de Genève (GPHG) awards'
    ],
    love: [
      'Technical innovation and horological creativity',
      'Exquisite finishing and attention to detail',
      'Strong investment value and collector demand',
      'Unique complications not found elsewhere',
      'Personal touch and vision of the founder',
      'Movements made from precious metals',
      'Highly exclusive and rare'
    ],
    hate: [
      'Extremely difficult to acquire at retail',
      'High prices and strong secondary market premiums',
      'Very limited production and long waiting lists',
      'Design language may not appeal to everyone',
      'Servicing can be complex and costly',
      'Some collectors find the brand\'s cult status intimidating',
      'Limited model variety compared to larger brands'
    ]
  }
]; 