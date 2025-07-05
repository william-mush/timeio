export interface USCounty {
  id: string;
  county: string;
  state: string;
  state_code: string;
  fips_code: string;
  population: number;
  coordinates: [number, number]; // [longitude, latitude]
  timezone: string;
  area_sq_miles?: number;
  population_density?: number;
}

// Sample of US counties with population data
// This would be expanded with the full dataset from US Census Bureau
export const US_COUNTIES: USCounty[] = [
  // Major population centers
  { 
    id: 'los-angeles-ca', 
    county: 'Los Angeles County', 
    state: 'California', 
    state_code: 'CA', 
    fips_code: '06037',
    population: 9848406, 
    coordinates: [-118.2437, 34.0522], 
    timezone: 'America/Los_Angeles',
    area_sq_miles: 4751,
    population_density: 2074
  },
  { 
    id: 'cook-il', 
    county: 'Cook County', 
    state: 'Illinois', 
    state_code: 'IL', 
    fips_code: '17031',
    population: 5185812, 
    coordinates: [-87.6298, 41.8781], 
    timezone: 'America/Chicago',
    area_sq_miles: 1635,
    population_density: 3171
  },
  { 
    id: 'harris-tx', 
    county: 'Harris County', 
    state: 'Texas', 
    state_code: 'TX', 
    fips_code: '48201',
    population: 4758579, 
    coordinates: [-95.3698, 29.7604], 
    timezone: 'America/Chicago',
    area_sq_miles: 1777,
    population_density: 2678
  },
  { 
    id: 'maricopa-az', 
    county: 'Maricopa County', 
    state: 'Arizona', 
    state_code: 'AZ', 
    fips_code: '04013',
    population: 4491987, 
    coordinates: [-112.0740, 33.4484], 
    timezone: 'America/Phoenix',
    area_sq_miles: 9224,
    population_density: 487
  },
  { 
    id: 'san-diego-ca', 
    county: 'San Diego County', 
    state: 'California', 
    state_code: 'CA', 
    fips_code: '06073',
    population: 3282782, 
    coordinates: [-117.1611, 32.7157], 
    timezone: 'America/Los_Angeles',
    area_sq_miles: 4526,
    population_density: 725
  },
  { 
    id: 'orange-ca', 
    county: 'Orange County', 
    state: 'California', 
    state_code: 'CA', 
    fips_code: '06059',
    population: 3164063, 
    coordinates: [-117.8311, 33.7175], 
    timezone: 'America/Los_Angeles',
    area_sq_miles: 948,
    population_density: 3338
  },
  { 
    id: 'miami-dade-fl', 
    county: 'Miami-Dade County', 
    state: 'Florida', 
    state_code: 'FL', 
    fips_code: '12086',
    population: 2685296, 
    coordinates: [-80.1918, 25.7617], 
    timezone: 'America/New_York',
    area_sq_miles: 2431,
    population_density: 1105
  },
  { 
    id: 'kings-ny', 
    county: 'Kings County', 
    state: 'New York', 
    state_code: 'NY', 
    fips_code: '36047',
    population: 2646306, 
    coordinates: [-73.9442, 40.6782], 
    timezone: 'America/New_York',
    area_sq_miles: 251,
    population_density: 10545
  },
  { 
    id: 'dallas-tx', 
    county: 'Dallas County', 
    state: 'Texas', 
    state_code: 'TX', 
    fips_code: '48113',
    population: 2603816, 
    coordinates: [-96.7970, 32.7767], 
    timezone: 'America/Chicago',
    area_sq_miles: 908,
    population_density: 2867
  },
  { 
    id: 'queens-ny', 
    county: 'Queens County', 
    state: 'New York', 
    state_code: 'NY', 
    fips_code: '36081',
    population: 2405464, 
    coordinates: [-73.7949, 40.7282], 
    timezone: 'America/New_York',
    area_sq_miles: 178,
    population_density: 13510
  },
  
  // Medium-sized counties
  { 
    id: 'travis-tx', 
    county: 'Travis County', 
    state: 'Texas', 
    state_code: 'TX', 
    fips_code: '48453',
    population: 1290188, 
    coordinates: [-97.7431, 30.2672], 
    timezone: 'America/Chicago',
    area_sq_miles: 1023,
    population_density: 1261
  },
  { 
    id: 'santa-clara-ca', 
    county: 'Santa Clara County', 
    state: 'California', 
    state_code: 'CA', 
    fips_code: '06085',
    population: 1936259, 
    coordinates: [-121.8863, 37.3382], 
    timezone: 'America/Los_Angeles',
    area_sq_miles: 1291,
    population_density: 1500
  },
  { 
    id: 'wayne-mi', 
    county: 'Wayne County', 
    state: 'Michigan', 
    state_code: 'MI', 
    fips_code: '26163',
    population: 1749343, 
    coordinates: [-83.0458, 42.3314], 
    timezone: 'America/Detroit',
    area_sq_miles: 673,
    population_density: 2600
  },
  { 
    id: 'king-wa', 
    county: 'King County', 
    state: 'Washington', 
    state_code: 'WA', 
    fips_code: '53033',
    population: 2252782, 
    coordinates: [-122.3321, 47.6062], 
    timezone: 'America/Los_Angeles',
    area_sq_miles: 2307,
    population_density: 976
  },
  
  // Small counties
  { 
    id: 'loving-tx', 
    county: 'Loving County', 
    state: 'Texas', 
    state_code: 'TX', 
    fips_code: '48301',
    population: 64, 
    coordinates: [-103.5815, 31.8457], 
    timezone: 'America/Chicago',
    area_sq_miles: 673,
    population_density: 0.1
  },
  { 
    id: 'kalawao-hi', 
    county: 'Kalawao County', 
    state: 'Hawaii', 
    state_code: 'HI', 
    fips_code: '15005',
    population: 88, 
    coordinates: [-156.9719, 21.1958], 
    timezone: 'Pacific/Honolulu',
    area_sq_miles: 12,
    population_density: 7.3
  },
  { 
    id: 'king-tx', 
    county: 'King County', 
    state: 'Texas', 
    state_code: 'TX', 
    fips_code: '48269',
    population: 265, 
    coordinates: [-100.2732, 33.6137], 
    timezone: 'America/Chicago',
    area_sq_miles: 913,
    population_density: 0.3
  },
  
  // Rural counties
  { 
    id: 'blue-earth-mn', 
    county: 'Blue Earth County', 
    state: 'Minnesota', 
    state_code: 'MN', 
    fips_code: '27013',
    population: 68790, 
    coordinates: [-93.9994, 44.1636], 
    timezone: 'America/Chicago',
    area_sq_miles: 766,
    population_density: 90
  },
  { 
    id: 'washington-md', 
    county: 'Washington County', 
    state: 'Maryland', 
    state_code: 'MD', 
    fips_code: '24043',
    population: 154705, 
    coordinates: [-77.7200, 39.6418], 
    timezone: 'America/New_York',
    area_sq_miles: 458,
    population_density: 338
  },
  { 
    id: 'yavapai-az', 
    county: 'Yavapai County', 
    state: 'Arizona', 
    state_code: 'AZ', 
    fips_code: '04025',
    population: 236209, 
    coordinates: [-112.4685, 34.5400], 
    timezone: 'America/Phoenix',
    area_sq_miles: 8128,
    population_density: 29
  },
  
  // Note: This is a sample subset. The full implementation would include
  // all 3,143 US counties using data from sources like:
  // - US Census Bureau County Population Estimates
  // - SimpleMaps US Counties Database
  // - OpenDataSoft geographical datasets
];

// Helper functions for county data
export function getCountyById(id: string): USCounty | undefined {
  return US_COUNTIES.find(county => county.id === id);
}

export function getCountiesByState(stateCode: string): USCounty[] {
  return US_COUNTIES.filter(county => county.state_code === stateCode)
    .sort((a, b) => b.population - a.population);
}

export function getCountiesByPopulation(): USCounty[] {
  return US_COUNTIES.slice().sort((a, b) => b.population - a.population);
}

export function getLargestCounties(limit: number = 10): USCounty[] {
  return US_COUNTIES.slice()
    .sort((a, b) => b.population - a.population)
    .slice(0, limit);
}

export function getSmallestCounties(limit: number = 10): USCounty[] {
  return US_COUNTIES.slice()
    .sort((a, b) => a.population - b.population)
    .slice(0, limit);
}

export function searchCounties(query: string): USCounty[] {
  const lowercaseQuery = query.toLowerCase();
  return US_COUNTIES.filter(county => 
    county.county.toLowerCase().includes(lowercaseQuery) ||
    county.state.toLowerCase().includes(lowercaseQuery) ||
    county.state_code.toLowerCase().includes(lowercaseQuery)
  );
}

export function getCountyByFips(fipsCode: string): USCounty | undefined {
  return US_COUNTIES.find(county => county.fips_code === fipsCode);
}