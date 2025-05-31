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
    description: 'Founded in 1755, Vacheron Constantin is the world\'s oldest watch manufacturer in continuous operation, representing the pinnacle of traditional Swiss watchmaking.',
    history: 'Established by Jean-Marc Vacheron in Geneva, Switzerland, Vacheron Constantin has maintained uninterrupted production for over 265 years. The brand\'s partnership with François Constantin in 1819 led to the famous motto "Do better if possible, and that is always possible." Throughout its history, Vacheron Constantin has created some of the most complicated watches ever made, including the 57260 (the most complicated mechanical watch ever created) and the Tour de l\'Île (the most complicated wristwatch at its time of creation). The brand has been owned by the Richemont Group since 1996 but maintains its independence in terms of design and production.',
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
    description: 'Founded in 1833 by Antoine LeCoultre, Jaeger-LeCoultre is known as the "watchmaker\'s watchmaker" for its exceptional movement manufacturing capabilities and technical innovations.',
    history: 'Based in the Vallée de Joux, Switzerland, Jaeger-LeCoultre has created over 1,200 different calibers and holds hundreds of patents. The brand\'s partnership with French watchmaker Edmond Jaeger in 1903 led to the creation of ultra-thin movements that revolutionized watchmaking. JLC has supplied movements to other prestigious brands, including Patek Philippe, Vacheron Constantin, and Audemars Piguet. The brand is known for its innovative complications, including the Atmos clock (which runs on temperature changes), the Reverso (with its reversible case), and the Gyrotourbillon (a multi-axis tourbillon).',
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