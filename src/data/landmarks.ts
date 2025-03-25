import { CityMarker } from './types';

export const LANDMARKS: CityMarker[] = [
  // Ancient Wonders and Historical Sites
  { id: 'pyramids', type: 'landmark', city: 'Pyramids of Giza', country: 'Egypt', coordinates: [31.1342, 29.9792], offset: 2, description: 'Ancient Egyptian pyramids built around 2560 BCE' },
  { id: 'petra', type: 'landmark', city: 'Petra', country: 'Jordan', coordinates: [35.4444, 30.3285], offset: 3, description: 'Ancient city carved into rose-colored rock faces' },
  { id: 'machu_picchu', type: 'landmark', city: 'Machu Picchu', country: 'Peru', coordinates: [-72.5450, -13.1631], offset: -5, description: 'Iconic 15th-century Inca citadel' },
  { id: 'taj_mahal', type: 'landmark', city: 'Taj Mahal', country: 'India', coordinates: [78.0422, 27.1751], offset: 5.5, description: 'Magnificent marble mausoleum built 1632-1653' },
  { id: 'great_wall', type: 'landmark', city: 'Great Wall of China', country: 'China', coordinates: [116.5704, 40.4319], offset: 8, description: 'Ancient defensive wall spanning thousands of miles' },
  { id: 'angkor_wat', type: 'landmark', city: 'Angkor Wat', country: 'Cambodia', coordinates: [103.8670, 13.4125], offset: 7, description: 'Largest religious monument in the world' },
  { id: 'colosseum', type: 'landmark', city: 'Colosseum', country: 'Italy', coordinates: [12.4924, 41.8902], offset: 2, description: 'Iconic ancient Roman amphitheater' },
  { id: 'acropolis', type: 'landmark', city: 'Acropolis', country: 'Greece', coordinates: [23.7262, 37.9715], offset: 3, description: 'Ancient citadel containing the Parthenon' },
  { id: 'stonehenge', type: 'landmark', city: 'Stonehenge', country: 'UK', coordinates: [-1.8262, 51.1789], offset: 1, description: 'Prehistoric monument of massive standing stones' },
  { id: 'easter_island', type: 'landmark', city: 'Easter Island', country: 'Chile', coordinates: [-109.3497, -27.1127], offset: -5, description: 'Famous for its monumental statues, called moai' },
  
  // Natural Wonders
  { id: 'grand_canyon', type: 'landmark', city: 'Grand Canyon', country: 'USA', coordinates: [-112.1401, 36.0544], offset: -7, description: 'Vast natural canyon carved by the Colorado River' },
  { id: 'victoria_falls', type: 'landmark', city: 'Victoria Falls', country: 'Zimbabwe/Zambia', coordinates: [25.8497, -17.9243], offset: 2, description: "World's largest sheet of falling water" },
  { id: 'great_barrier', type: 'landmark', city: 'Great Barrier Reef', country: 'Australia', coordinates: [146.8179, -16.7645], offset: 10, description: "World's largest coral reef system" },
  { id: 'everest', type: 'landmark', city: 'Mount Everest', country: 'Nepal/Tibet', coordinates: [86.9250, 27.9881], offset: 5.75, description: "Earth's highest mountain above sea level" },
  { id: 'aurora', type: 'landmark', city: 'Northern Lights', country: 'Iceland', coordinates: [-21.9426, 64.1466], offset: 0, description: 'Natural light display in the sky' },
  { id: 'sahara', type: 'landmark', city: 'Sahara Desert', country: 'Morocco', coordinates: [-5.6353, 31.7917], offset: 1, description: "World's largest hot desert" },
  { id: 'amazon', type: 'landmark', city: 'Amazon Rainforest', country: 'Brazil', coordinates: [-60.0000, -3.0000], offset: -4, description: "World's largest rainforest" },
  { id: 'niagara', type: 'landmark', city: 'Niagara Falls', country: 'Canada/USA', coordinates: [-79.0849, 43.0896], offset: -4, description: 'Massive group of three waterfalls' },
  { id: 'kilimanjaro', type: 'landmark', city: 'Mount Kilimanjaro', country: 'Tanzania', coordinates: [37.3556, -3.0674], offset: 3, description: "Africa's highest mountain" },
  { id: 'uluru', type: 'landmark', city: 'Uluru', country: 'Australia', coordinates: [131.0369, -25.3444], offset: 9.5, description: 'Sacred red rock formation in the Outback' },
  
  // Modern Landmarks
  { id: 'statue_liberty', type: 'landmark', city: 'Statue of Liberty', country: 'USA', coordinates: [-74.0445, 40.6892], offset: -4, description: 'Iconic symbol of freedom and democracy' },
  { id: 'christ_redeemer', type: 'landmark', city: 'Christ the Redeemer', country: 'Brazil', coordinates: [-43.2104, -22.9519], offset: -3, description: 'Art Deco statue of Jesus Christ' },
  { id: 'sydney_opera', type: 'landmark', city: 'Sydney Opera House', country: 'Australia', coordinates: [151.2153, -33.8568], offset: 11, description: 'Iconic performing arts venue' },
  { id: 'burj_khalifa', type: 'landmark', city: 'Burj Khalifa', country: 'UAE', coordinates: [55.2744, 25.1972], offset: 4, description: "World's tallest building" },
  { id: 'golden_gate', type: 'landmark', city: 'Golden Gate Bridge', country: 'USA', coordinates: [-122.4786, 37.8199], offset: -7, description: 'Iconic suspension bridge' },
  { id: 'eiffel_tower', type: 'landmark', city: 'Eiffel Tower', country: 'France', coordinates: [2.2945, 48.8584], offset: 2, description: 'Iron lattice tower on the Champ de Mars' },
  { id: 'big_ben', type: 'landmark', city: 'Big Ben', country: 'UK', coordinates: [-0.1246, 51.5007], offset: 1, description: 'Famous clock tower at Palace of Westminster' },
  { id: 'empire_state', type: 'landmark', city: 'Empire State Building', country: 'USA', coordinates: [-73.9857, 40.7484], offset: -4, description: 'Art Deco skyscraper in Manhattan' },
  { id: 'cn_tower', type: 'landmark', city: 'CN Tower', country: 'Canada', coordinates: [-79.3871, 43.6426], offset: -4, description: 'Communications and observation tower' },
  { id: 'space_needle', type: 'landmark', city: 'Space Needle', country: 'USA', coordinates: [-122.3493, 47.6205], offset: -7, description: 'Observation tower in Seattle' },
  
  // Religious and Cultural Sites
  { id: 'vatican', type: 'landmark', city: 'Vatican City', country: 'Vatican', coordinates: [12.4534, 41.9029], offset: 2, description: 'Center of the Roman Catholic Church' },
  { id: 'mecca', type: 'landmark', city: 'Mecca', country: 'Saudi Arabia', coordinates: [39.8579, 21.4225], offset: 3, description: 'Holiest city in Islam' },
  { id: 'jerusalem', type: 'landmark', city: 'Western Wall', country: 'Israel', coordinates: [35.2342, 31.7767], offset: 3, description: 'Ancient limestone wall in Jerusalem' },
  { id: 'golden_temple', type: 'landmark', city: 'Golden Temple', country: 'India', coordinates: [74.8765, 31.6200], offset: 5.5, description: 'Holiest Gurdwara of Sikhism' },
  { id: 'borobudur', type: 'landmark', city: 'Borobudur', country: 'Indonesia', coordinates: [110.2036, -7.6079], offset: 7, description: 'Largest Buddhist temple in the world' },
  { id: 'forbidden_city', type: 'landmark', city: 'Forbidden City', country: 'China', coordinates: [116.3972, 39.9169], offset: 8, description: 'Imperial palace complex' },
  { id: 'potala', type: 'landmark', city: 'Potala Palace', country: 'Tibet', coordinates: [91.1170, 29.6528], offset: 8, description: 'Winter palace of the Dalai Lamas' },
  { id: 'hagia_sophia', type: 'landmark', city: 'Hagia Sophia', country: 'Turkey', coordinates: [28.9784, 41.0086], offset: 3, description: 'Former Greek Orthodox church turned mosque' },
  { id: 'notre_dame', type: 'landmark', city: 'Notre-Dame', country: 'France', coordinates: [2.3499, 48.8529], offset: 2, description: 'Medieval Catholic cathedral' },
  { id: 'st_basils', type: 'landmark', city: "St. Basil's Cathedral", country: 'Russia', coordinates: [37.6230, 55.7525], offset: 3, description: 'Colorful Orthodox church in Moscow' },
  
  // Archaeological Sites
  { id: 'pompeii', type: 'landmark', city: 'Pompeii', country: 'Italy', coordinates: [14.4851, 40.7508], offset: 2, description: 'Ancient Roman city preserved by volcanic eruption' },
  { id: 'chichen_itza', type: 'landmark', city: 'Chichen Itza', country: 'Mexico', coordinates: [-88.5686, 20.6843], offset: -5, description: 'Ancient Maya city with pyramid temple' },
  { id: 'persepolis', type: 'landmark', city: 'Persepolis', country: 'Iran', coordinates: [52.8847, 29.9333], offset: 3.5, description: 'Ceremonial capital of ancient Persian Empire' },
  { id: 'mohenjo_daro', type: 'landmark', city: 'Mohenjo-daro', country: 'Pakistan', coordinates: [68.1376, 27.3255], offset: 5, description: 'Ancient Indus Valley Civilization city' },
  { id: 'terracotta', type: 'landmark', city: 'Terracotta Army', country: 'China', coordinates: [109.2866, 34.3844], offset: 8, description: 'Ancient clay warrior army of Emperor Qin' },
  { id: 'luxor', type: 'landmark', city: 'Luxor Temple', country: 'Egypt', coordinates: [32.6396, 25.6995], offset: 2, description: 'Ancient Egyptian temple complex' },
  { id: 'palmyra', type: 'landmark', city: 'Palmyra', country: 'Syria', coordinates: [38.2867, 34.5502], offset: 3, description: 'Ancient Semitic city ruins' },
  { id: 'carthage', type: 'landmark', city: 'Carthage', country: 'Tunisia', coordinates: [10.3233, 36.8526], offset: 1, description: 'Ancient Phoenician city-state ruins' },
  { id: 'mycenae', type: 'landmark', city: 'Mycenae', country: 'Greece', coordinates: [22.7583, 37.7306], offset: 3, description: 'Ancient Greek archaeological site' },
  { id: 'teotihuacan', type: 'landmark', city: 'Teotihuacan', country: 'Mexico', coordinates: [-98.8433, 19.6925], offset: -5, description: 'Ancient Mesoamerican pyramids' }
]; 