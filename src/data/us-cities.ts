export interface USCity {
  id: string;
  city: string;
  state: string;
  state_code: string;
  population: number;
  coordinates: [number, number]; // [longitude, latitude]
  timezone: string;
  county?: string;
  elevation?: number;
}

// Sample of US cities with population over 24,000
// This would be expanded with the full dataset from census/demographic data
export const US_CITIES: USCity[] = [
  // Major cities (100,000+) - existing ones can be expanded
  { 
    id: 'new-york-ny', 
    city: 'New York', 
    state: 'New York', 
    state_code: 'NY', 
    population: 8405837, 
    coordinates: [-74.0059413, 40.7127837], 
    timezone: 'America/New_York',
    county: 'New York County'
  },
  { 
    id: 'los-angeles-ca', 
    city: 'Los Angeles', 
    state: 'California', 
    state_code: 'CA', 
    population: 3884307, 
    coordinates: [-118.2436849, 34.0522342], 
    timezone: 'America/Los_Angeles',
    county: 'Los Angeles County'
  },
  { 
    id: 'chicago-il', 
    city: 'Chicago', 
    state: 'Illinois', 
    state_code: 'IL', 
    population: 2718782, 
    coordinates: [-87.6297982, 41.8781136], 
    timezone: 'America/Chicago',
    county: 'Cook County'
  },
  
  // Smaller cities 24,000 - 100,000 range
  { 
    id: 'flower-mound-tx', 
    city: 'Flower Mound', 
    state: 'Texas', 
    state_code: 'TX', 
    population: 68609, 
    coordinates: [-97.0969769, 33.0145673], 
    timezone: 'America/Chicago',
    county: 'Denton County'
  },
  { 
    id: 'pflugerville-tx', 
    city: 'Pflugerville', 
    state: 'Texas', 
    state_code: 'TX', 
    population: 53752, 
    coordinates: [-97.6200043, 30.4393696], 
    timezone: 'America/Chicago',
    county: 'Travis County'
  },
  { 
    id: 'cedar-park-tx', 
    city: 'Cedar Park', 
    state: 'Texas', 
    state_code: 'TX', 
    population: 61238, 
    coordinates: [-97.8202888, 30.5051625], 
    timezone: 'America/Chicago',
    county: 'Williamson County'
  },
  { 
    id: 'mankato-mn', 
    city: 'Mankato', 
    state: 'Minnesota', 
    state_code: 'MN', 
    population: 40641, 
    coordinates: [-93.9993505, 44.1635775], 
    timezone: 'America/Chicago',
    county: 'Blue Earth County'
  },
  { 
    id: 'hagerstown-md', 
    city: 'Hagerstown', 
    state: 'Maryland', 
    state_code: 'MD', 
    population: 40612, 
    coordinates: [-77.7199932, 39.6417629], 
    timezone: 'America/New_York',
    county: 'Washington County'
  },
  { 
    id: 'prescott-az', 
    city: 'Prescott', 
    state: 'Arizona', 
    state_code: 'AZ', 
    population: 40590, 
    coordinates: [-112.4685025, 34.5400242], 
    timezone: 'America/Phoenix',
    county: 'Yavapai County'
  },
  { 
    id: 'campbell-ca', 
    city: 'Campbell', 
    state: 'California', 
    state_code: 'CA', 
    population: 40584, 
    coordinates: [-121.9499568, 37.2871651], 
    timezone: 'America/Los_Angeles',
    county: 'Santa Clara County'
  },
  { 
    id: 'cedar-falls-ia', 
    city: 'Cedar Falls', 
    state: 'Iowa', 
    state_code: 'IA', 
    population: 40566, 
    coordinates: [-92.4453796, 42.5348993], 
    timezone: 'America/Chicago',
    county: 'Black Hawk County'
  },
  { 
    id: 'beaumont-ca', 
    city: 'Beaumont', 
    state: 'California', 
    state_code: 'CA', 
    population: 40481, 
    coordinates: [-116.977248, 33.9294606], 
    timezone: 'America/Los_Angeles',
    county: 'Riverside County'
  },
  { 
    id: 'coppell-tx', 
    city: 'Coppell', 
    state: 'Texas', 
    state_code: 'TX', 
    population: 40342, 
    coordinates: [-97.0150038, 32.9545687], 
    timezone: 'America/Chicago',
    county: 'Dallas County'
  },
  
  // Mid-range cities
  { 
    id: 'bozeman-mt', 
    city: 'Bozeman', 
    state: 'Montana', 
    state_code: 'MT', 
    population: 39860, 
    coordinates: [-111.0429339, 45.6769979], 
    timezone: 'America/Denver',
    county: 'Gallatin County'
  },
  { 
    id: 'bentonville-ar', 
    city: 'Bentonville', 
    state: 'Arkansas', 
    state_code: 'AR', 
    population: 40167, 
    coordinates: [-94.2088172, 36.3728538], 
    timezone: 'America/Chicago',
    county: 'Benton County'
  },
  { 
    id: 'brentwood-tn', 
    city: 'Brentwood', 
    state: 'Tennessee', 
    state_code: 'TN', 
    population: 40021, 
    coordinates: [-86.7827919, 35.9517391], 
    timezone: 'America/Chicago',
    county: 'Williamson County'
  },
  
  // Add more cities from different states to reach 24,000+ threshold
  { 
    id: 'key-west-fl', 
    city: 'Key West', 
    state: 'Florida', 
    state_code: 'FL', 
    population: 24649, 
    coordinates: [-81.7800546, 24.5550593], 
    timezone: 'America/New_York',
    county: 'Monroe County'
  },
  { 
    id: 'steamboat-springs-co', 
    city: 'Steamboat Springs', 
    state: 'Colorado', 
    state_code: 'CO', 
    population: 13224, // This would be filtered out as under 24k
    coordinates: [-106.8317158, 40.4849769], 
    timezone: 'America/Denver',
    county: 'Routt County'
  },
  { 
    id: 'traverse-city-mi', 
    city: 'Traverse City', 
    state: 'Michigan', 
    state_code: 'MI', 
    population: 15678, // This would be filtered out as under 24k
    coordinates: [-85.6206317, 44.7630331], 
    timezone: 'America/Detroit',
    county: 'Grand Traverse County'
  }
  
  // Note: This is a sample subset. The full implementation would include
  // all US cities with population 24,000+ using data from sources like:
  // - US Census Bureau city population data
  // - SimpleMaps US Cities Database (Pro version with 109K+ cities)
  // - OpenDataSoft geographical datasets
];

// Filter cities with population >= 24,000
export const CITIES_OVER_24K = US_CITIES.filter(city => city.population >= 24000);

// Helper functions for city data
export function getCityById(id: string): USCity | undefined {
  return US_CITIES.find(city => city.id === id);
}

export function getCitiesByState(stateCode: string): USCity[] {
  return US_CITIES.filter(city => city.state_code === stateCode && city.population >= 24000);
}

export function getCitiesByPopulation(minPop: number = 24000): USCity[] {
  return US_CITIES.filter(city => city.population >= minPop)
    .sort((a, b) => b.population - a.population);
}

export function searchCities(query: string): USCity[] {
  const lowercaseQuery = query.toLowerCase();
  return US_CITIES.filter(city => 
    city.population >= 24000 && (
      city.city.toLowerCase().includes(lowercaseQuery) ||
      city.state.toLowerCase().includes(lowercaseQuery) ||
      city.state_code.toLowerCase().includes(lowercaseQuery)
    )
  );
}