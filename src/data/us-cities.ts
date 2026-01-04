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

// Comprehensive list of US cities
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
  },

  // Note: This is a sample subset. The full implementation would include
  // all US cities with population 24,000+ using data from sources like:
  // - US Census Bureau city population data
  // - SimpleMaps US Cities Database (Pro version with 109K+ cities)
  // - OpenDataSoft geographical datasets

  {
    id: 'houston-tx',
    city: "Houston",
    state: "Texas",
    state_code: 'TX',
    population: 2296224,
    coordinates: [-95.3698, 29.7604],
    timezone: 'America/Chicago'
  },
  {
    id: 'philadelphia-pa',
    city: "Philadelphia",
    state: "Pennsylvania",
    state_code: 'PA',
    population: 1567442,
    coordinates: [-75.1652, 39.9526],
    timezone: 'America/New_York'
  },
  {
    id: 'phoenix-az',
    city: "Phoenix",
    state: "Arizona",
    state_code: 'AZ',
    population: 1563025,
    coordinates: [-112.074, 33.4484],
    timezone: 'America/Phoenix'
  },
  {
    id: 'san-antonio-tx',
    city: "San Antonio",
    state: "Texas",
    state_code: 'TX',
    population: 1469845,
    coordinates: [-98.4936, 29.4241],
    timezone: 'America/Chicago'
  },
  {
    id: 'san-diego-ca',
    city: "San Diego",
    state: "California",
    state_code: 'CA',
    population: 1394928,
    coordinates: [-117.1611, 32.7157],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'dallas-tx',
    city: "Dallas",
    state: "Texas",
    state_code: 'TX',
    population: 1300092,
    coordinates: [-96.797, 32.7767],
    timezone: 'America/Chicago'
  },
  {
    id: 'san-jose-ca',
    city: "San Jose",
    state: "California",
    state_code: 'CA',
    population: 1026908,
    coordinates: [-121.8863, 37.3382],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'austin-tx',
    city: "Austin",
    state: "Texas",
    state_code: 'TX',
    population: 931830,
    coordinates: [-97.7431, 30.2672],
    timezone: 'America/Chicago'
  },
  {
    id: 'jacksonville-fl',
    city: "Jacksonville",
    state: "Florida",
    state_code: 'FL',
    population: 868031,
    coordinates: [-81.6557, 30.3322],
    timezone: 'America/New_York'
  },
  {
    id: 'san-francisco-ca',
    city: "San Francisco",
    state: "California",
    state_code: 'CA',
    population: 864816,
    coordinates: [-122.4194, 37.7749],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'columbus-oh',
    city: "Columbus",
    state: "Ohio",
    state_code: 'OH',
    population: 850106,
    coordinates: [-82.9988, 39.9612],
    timezone: 'America/New_York'
  },
  {
    id: 'fort-worth-tx',
    city: "Fort Worth",
    state: "Texas",
    state_code: 'TX',
    population: 833319,
    coordinates: [-97.3308, 32.7555],
    timezone: 'America/Chicago'
  },
  {
    id: 'indianapolis-in',
    city: "Indianapolis",
    state: "Indiana",
    state_code: 'IN',
    population: 829718,
    coordinates: [-86.1581, 39.7684],
    timezone: 'America/Indiana/Indianapolis'
  },
  {
    id: 'charlotte-nc',
    city: "Charlotte",
    state: "North Carolina",
    state_code: 'NC',
    population: 827097,
    coordinates: [-80.8431, 35.2271],
    timezone: 'America/New_York'
  },
  {
    id: 'seattle-wa',
    city: "Seattle",
    state: "Washington",
    state_code: 'WA',
    population: 684451,
    coordinates: [-122.3321, 47.6062],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'denver-co',
    city: "Denver",
    state: "Colorado",
    state_code: 'CO',
    population: 682545,
    coordinates: [-104.9903, 39.7392],
    timezone: 'America/Denver'
  },
  {
    id: 'el-paso-tx',
    city: "El Paso",
    state: "Texas",
    state_code: 'TX',
    population: 681124,
    coordinates: [-106.485, 31.7619],
    timezone: 'America/Denver'
  },
  {
    id: 'detroit-mi',
    city: "Detroit",
    state: "Michigan",
    state_code: 'MI',
    population: 677116,
    coordinates: [-83.0458, 42.3314],
    timezone: 'America/Detroit'
  },
  {
    id: 'boston-ma',
    city: "Boston",
    state: "Massachusetts",
    state_code: 'MA',
    population: 667137,
    coordinates: [-71.0589, 42.3601],
    timezone: 'America/New_York'
  },
  {
    id: 'memphis-tn',
    city: "Memphis",
    state: "Tennessee",
    state_code: 'TN',
    population: 655770,
    coordinates: [-90.049, 35.1495],
    timezone: 'America/Chicago'
  },
  {
    id: 'portland-or',
    city: "Portland",
    state: "Oregon",
    state_code: 'OR',
    population: 632309,
    coordinates: [-122.675, 45.5051],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'oklahoma-city-ok',
    city: "Oklahoma City",
    state: "Oklahoma",
    state_code: 'OK',
    population: 631346,
    coordinates: [-97.5164, 35.4676],
    timezone: 'America/Chicago'
  },
  {
    id: 'las-vegas-nv',
    city: "Las Vegas",
    state: "Nevada",
    state_code: 'NV',
    population: 623747,
    coordinates: [-115.1398, 36.1699],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'baltimore-md',
    city: "Baltimore",
    state: "Maryland",
    state_code: 'MD',
    population: 621849,
    coordinates: [-76.6122, 39.2904],
    timezone: 'America/New_York'
  },
  {
    id: 'washington-dc',
    city: "Washington",
    state: "District of Columbia",
    state_code: 'DC',
    population: 601723,
    coordinates: [-77.0369, 38.9072],
    timezone: 'America/New_York'
  },
  {
    id: 'milwaukee-wi',
    city: "Milwaukee",
    state: "Wisconsin",
    state_code: 'WI',
    population: 600155,
    coordinates: [-87.9065, 43.0389],
    timezone: 'America/Chicago'
  },
  {
    id: 'albuquerque-nm',
    city: "Albuquerque",
    state: "New Mexico",
    state_code: 'NM',
    population: 559121,
    coordinates: [-106.6504, 35.0844],
    timezone: 'America/Denver'
  },
  {
    id: 'tucson-az',
    city: "Tucson",
    state: "Arizona",
    state_code: 'AZ',
    population: 531641,
    coordinates: [-110.9747, 32.2226],
    timezone: 'America/Phoenix'
  },
  {
    id: 'nashville-tn',
    city: "Nashville",
    state: "Tennessee",
    state_code: 'TN',
    population: 530852,
    coordinates: [-86.7816, 36.1627],
    timezone: 'America/Chicago'
  },
  {
    id: 'fresno-ca',
    city: "Fresno",
    state: "California",
    state_code: 'CA',
    population: 520052,
    coordinates: [-119.7871, 36.7378],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'sacramento-ca',
    city: "Sacramento",
    state: "California",
    state_code: 'CA',
    population: 490712,
    coordinates: [-121.4944, 38.5816],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'kansas-city-mo',
    city: "Kansas City",
    state: "Missouri",
    state_code: 'MO',
    population: 475378,
    coordinates: [-94.5786, 39.0997],
    timezone: 'America/Chicago'
  },
  {
    id: 'long-beach-ca',
    city: "Long Beach",
    state: "California",
    state_code: 'CA',
    population: 474140,
    coordinates: [-118.1937, 33.7701],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'mesa-az',
    city: "Mesa",
    state: "Arizona",
    state_code: 'AZ',
    population: 471825,
    coordinates: [-111.8315, 33.4152],
    timezone: 'America/Phoenix'
  },
  {
    id: 'atlanta-ga',
    city: "Atlanta",
    state: "Georgia",
    state_code: 'GA',
    population: 463878,
    coordinates: [-84.388, 33.749],
    timezone: 'America/New_York'
  },
  {
    id: 'colorado-springs-co',
    city: "Colorado Springs",
    state: "Colorado",
    state_code: 'CO',
    population: 456568,
    coordinates: [-104.8214, 38.8339],
    timezone: 'America/Denver'
  },
  {
    id: 'virginia-beach-va',
    city: "Virginia Beach",
    state: "Virginia",
    state_code: 'VA',
    population: 452745,
    coordinates: [-75.978, 36.8529],
    timezone: 'America/New_York'
  },
  {
    id: 'raleigh-nc',
    city: "Raleigh",
    state: "North Carolina",
    state_code: 'NC',
    population: 451066,
    coordinates: [-78.6382, 35.7796],
    timezone: 'America/New_York'
  },
  {
    id: 'omaha-ne',
    city: "Omaha",
    state: "Nebraska",
    state_code: 'NE',
    population: 443885,
    coordinates: [-95.9345, 41.2565],
    timezone: 'America/Chicago'
  },
  {
    id: 'miami-fl',
    city: "Miami",
    state: "Florida",
    state_code: 'FL',
    population: 441003,
    coordinates: [-80.1918, 25.7617],
    timezone: 'America/New_York'
  },
  {
    id: 'oakland-ca',
    city: "Oakland",
    state: "California",
    state_code: 'CA',
    population: 419267,
    coordinates: [-122.2711, 37.8044],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'minneapolis-mn',
    city: "Minneapolis",
    state: "Minnesota",
    state_code: 'MN',
    population: 410939,
    coordinates: [-93.265, 44.9778],
    timezone: 'America/Chicago'
  },
  {
    id: 'tulsa-ok',
    city: "Tulsa",
    state: "Oklahoma",
    state_code: 'OK',
    population: 403505,
    coordinates: [-95.9928, 36.154],
    timezone: 'America/Chicago'
  },
  {
    id: 'wichita-ks',
    city: "Wichita",
    state: "Kansas",
    state_code: 'KS',
    population: 389965,
    coordinates: [-97.3375, 37.6872],
    timezone: 'America/Chicago'
  },
  {
    id: 'new-orleans-la',
    city: "New Orleans",
    state: "Louisiana",
    state_code: 'LA',
    population: 389617,
    coordinates: [-90.0715, 29.9511],
    timezone: 'America/Chicago'
  },
  {
    id: 'arlington-tx',
    city: "Arlington",
    state: "Texas",
    state_code: 'TX',
    population: 388125,
    coordinates: [-97.1081, 32.7357],
    timezone: 'America/Chicago'
  },
  {
    id: 'cleveland-oh',
    city: "Cleveland",
    state: "Ohio",
    state_code: 'OH',
    population: 388072,
    coordinates: [-81.6944, 41.4993],
    timezone: 'America/New_York'
  },
  {
    id: 'bakersfield-ca',
    city: "Bakersfield",
    state: "California",
    state_code: 'CA',
    population: 373640,
    coordinates: [-119.0187, 35.3733],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'tampa-fl',
    city: "Tampa",
    state: "Florida",
    state_code: 'FL',
    population: 369075,
    coordinates: [-82.4572, 27.9506],
    timezone: 'America/New_York'
  },
  {
    id: 'aurora-co',
    city: "Aurora",
    state: "Colorado",
    state_code: 'CO',
    population: 359407,
    coordinates: [-104.8319, 39.7294],
    timezone: 'America/Denver'
  },
  {
    id: 'honolulu-hi',
    city: "Honolulu",
    state: "Hawaii",
    state_code: 'HI',
    population: 371657,
    coordinates: [-157.8583, 21.3069],
    timezone: 'Pacific/Honolulu'
  },
  {
    id: 'anaheim-ca',
    city: "Anaheim",
    state: "California",
    state_code: 'CA',
    population: 350742,
    coordinates: [-117.9145, 33.8366],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'santa-ana-ca',
    city: "Santa Ana",
    state: "California",
    state_code: 'CA',
    population: 335400,
    coordinates: [-117.8678, 33.7455],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'corpus-christi-tx',
    city: "Corpus Christi",
    state: "Texas",
    state_code: 'TX',
    population: 324074,
    coordinates: [-97.3964, 27.8006],
    timezone: 'America/Chicago'
  },
  {
    id: 'riverside-ca',
    city: "Riverside",
    state: "California",
    state_code: 'CA',
    population: 322424,
    coordinates: [-117.3961, 33.9533],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'st.-louis-mo',
    city: "St. Louis",
    state: "Missouri",
    state_code: 'MO',
    population: 315685,
    coordinates: [-90.1994, 38.627],
    timezone: 'America/Chicago'
  },
  {
    id: 'lexington-ky',
    city: "Lexington",
    state: "Kentucky",
    state_code: 'KY',
    population: 314488,
    coordinates: [-84.5037, 38.0406],
    timezone: 'America/New_York'
  },
  {
    id: 'pittsburgh-pa',
    city: "Pittsburgh",
    state: "Pennsylvania",
    state_code: 'PA',
    population: 304391,
    coordinates: [-79.9959, 40.4406],
    timezone: 'America/New_York'
  },
  {
    id: 'anchorage-ak',
    city: "Anchorage",
    state: "Alaska",
    state_code: 'AK',
    population: 298695,
    coordinates: [-149.9003, 61.2181],
    timezone: 'America/Anchorage'
  },
  {
    id: 'stockton-ca',
    city: "Stockton",
    state: "California",
    state_code: 'CA',
    population: 305658,
    coordinates: [-121.2908, 37.9577],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'cincinnati-oh',
    city: "Cincinnati",
    state: "Ohio",
    state_code: 'OH',
    population: 296943,
    coordinates: [-84.512, 39.1031],
    timezone: 'America/New_York'
  },
  {
    id: 'st.-paul-mn',
    city: "St. Paul",
    state: "Minnesota",
    state_code: 'MN',
    population: 285068,
    coordinates: [-93.09, 44.9537],
    timezone: 'America/Chicago'
  },
  {
    id: 'toledo-oh',
    city: "Toledo",
    state: "Ohio",
    state_code: 'OH',
    population: 279789,
    coordinates: [-83.5379, 41.6528],
    timezone: 'America/New_York'
  },
  {
    id: 'greensboro-nc',
    city: "Greensboro",
    state: "North Carolina",
    state_code: 'NC',
    population: 285342,
    coordinates: [-79.792, 36.0726],
    timezone: 'America/New_York'
  },
  {
    id: 'newark-nj',
    city: "Newark",
    state: "New Jersey",
    state_code: 'NJ',
    population: 281944,
    coordinates: [-74.1724, 40.7357],
    timezone: 'America/New_York'
  },
  {
    id: 'plano-tx',
    city: "Plano",
    state: "Texas",
    state_code: 'TX',
    population: 283558,
    coordinates: [-96.6989, 33.0198],
    timezone: 'America/Chicago'
  },
  {
    id: 'henderson-nv',
    city: "Henderson",
    state: "Nevada",
    state_code: 'NV',
    population: 285667,
    coordinates: [-115.074, 36.0395],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'lincoln-ne',
    city: "Lincoln",
    state: "Nebraska",
    state_code: 'NE',
    population: 277348,
    coordinates: [-96.7026, 40.8258],
    timezone: 'America/Chicago'
  },
  {
    id: 'buffalo-ny',
    city: "Buffalo",
    state: "New York",
    state_code: 'NY',
    population: 258071,
    coordinates: [-78.8784, 42.8864],
    timezone: 'America/New_York'
  },
  {
    id: 'jersey-city-nj',
    city: "Jersey City",
    state: "New Jersey",
    state_code: 'NJ',
    population: 264290,
    coordinates: [-74.0431, 40.7178],
    timezone: 'America/New_York'
  },
  {
    id: 'chula-vista-ca',
    city: "Chula Vista",
    state: "California",
    state_code: 'CA',
    population: 265757,
    coordinates: [-117.0542, 32.6401],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'fort-wayne-in',
    city: "Fort Wayne",
    state: "Indiana",
    state_code: 'IN',
    population: 260326,
    coordinates: [-85.1394, 41.0793],
    timezone: 'America/Indiana/Indianapolis'
  },
  {
    id: 'orlando-fl',
    city: "Orlando",
    state: "Florida",
    state_code: 'FL',
    population: 270934,
    coordinates: [-81.3792, 28.5383],
    timezone: 'America/New_York'
  },
  {
    id: 'st.-petersburg-fl',
    city: "St. Petersburg",
    state: "Florida",
    state_code: 'FL',
    population: 257083,
    coordinates: [-82.6403, 27.7676],
    timezone: 'America/New_York'
  },
  {
    id: 'chandler-az',
    city: "Chandler",
    state: "Arizona",
    state_code: 'AZ',
    population: 260828,
    coordinates: [-111.8413, 33.3062],
    timezone: 'America/Phoenix'
  },
  {
    id: 'laredo-tx',
    city: "Laredo",
    state: "Texas",
    state_code: 'TX',
    population: 255473,
    coordinates: [-99.5075, 27.5306],
    timezone: 'America/Chicago'
  },
  {
    id: 'norfolk-va',
    city: "Norfolk",
    state: "Virginia",
    state_code: 'VA',
    population: 246393,
    coordinates: [-76.2859, 36.8508],
    timezone: 'America/New_York'
  },
  {
    id: 'durham-nc',
    city: "Durham",
    state: "North Carolina",
    state_code: 'NC',
    population: 257636,
    coordinates: [-78.8986, 35.994],
    timezone: 'America/New_York'
  },
  {
    id: 'madison-wi',
    city: "Madison",
    state: "Wisconsin",
    state_code: 'WI',
    population: 248951,
    coordinates: [-89.4012, 43.0731],
    timezone: 'America/Chicago'
  },
  {
    id: 'lubbock-tx',
    city: "Lubbock",
    state: "Texas",
    state_code: 'TX',
    population: 249042,
    coordinates: [-101.8552, 33.5779],
    timezone: 'America/Chicago'
  },
  {
    id: 'irvine-ca',
    city: "Irvine",
    state: "California",
    state_code: 'CA',
    population: 256927,
    coordinates: [-117.7947, 33.6846],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'winston-salem-nc',
    city: "Winston-Salem",
    state: "North Carolina",
    state_code: 'NC',
    population: 241218,
    coordinates: [-80.2442, 36.0999],
    timezone: 'America/New_York'
  },
  {
    id: 'glendale-az',
    city: "Glendale",
    state: "Arizona",
    state_code: 'AZ',
    population: 240126,
    coordinates: [-112.1859, 33.5387],
    timezone: 'America/Phoenix'
  },
  {
    id: 'garland-tx',
    city: "Garland",
    state: "Texas",
    state_code: 'TX',
    population: 236897,
    coordinates: [-96.6389, 32.9126],
    timezone: 'America/Chicago'
  },
  {
    id: 'hialeah-fl',
    city: "Hialeah",
    state: "Florida",
    state_code: 'FL',
    population: 237069,
    coordinates: [-80.2781, 25.8576],
    timezone: 'America/New_York'
  },
  {
    id: 'reno-nv',
    city: "Reno",
    state: "Nevada",
    state_code: 'NV',
    population: 241445,
    coordinates: [-119.8138, 39.5296],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'chesapeake-va',
    city: "Chesapeake",
    state: "Virginia",
    state_code: 'VA',
    population: 235429,
    coordinates: [-76.2875, 36.7682],
    timezone: 'America/New_York'
  },
  {
    id: 'gilbert-az',
    city: "Gilbert",
    state: "Arizona",
    state_code: 'AZ',
    population: 247542,
    coordinates: [-111.789, 33.3528],
    timezone: 'America/Phoenix'
  },
  {
    id: 'baton-rouge-la',
    city: "Baton Rouge",
    state: "Louisiana",
    state_code: 'LA',
    population: 228590,
    coordinates: [-91.1403, 30.4515],
    timezone: 'America/Chicago'
  },
  {
    id: 'irving-tx',
    city: "Irving",
    state: "Texas",
    state_code: 'TX',
    population: 236607,
    coordinates: [-96.9489, 32.814],
    timezone: 'America/Chicago'
  },
  {
    id: 'scottsdale-az',
    city: "Scottsdale",
    state: "Arizona",
    state_code: 'AZ',
    population: 236839,
    coordinates: [-111.9261, 33.4942],
    timezone: 'America/Phoenix'
  },
  {
    id: 'north-las-vegas-nv',
    city: "North Las Vegas",
    state: "Nevada",
    state_code: 'NV',
    population: 234807,
    coordinates: [-115.1175, 36.1989],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'fremont-ca',
    city: "Fremont",
    state: "California",
    state_code: 'CA',
    population: 232206,
    coordinates: [-121.9886, 37.5485],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'boise-id',
    city: "Boise",
    state: "Idaho",
    state_code: 'ID',
    population: 226570,
    coordinates: [-116.2146, 43.615],
    timezone: 'America/Boise'
  },
  {
    id: 'richmond-va',
    city: "Richmond",
    state: "Virginia",
    state_code: 'VA',
    population: 220289,
    coordinates: [-77.436, 37.5407],
    timezone: 'America/New_York'
  },
  {
    id: 'san-bernardino-ca',
    city: "San Bernardino",
    state: "California",
    state_code: 'CA',
    population: 216108,
    coordinates: [-117.2898, 34.1083],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'birmingham-al',
    city: "Birmingham",
    state: "Alabama",
    state_code: 'AL',
    population: 212461,
    coordinates: [-86.8025, 33.5186],
    timezone: 'America/Chicago'
  },
  {
    id: 'spokane-wa',
    city: "Spokane",
    state: "Washington",
    state_code: 'WA',
    population: 213272,
    coordinates: [-117.426, 47.6587],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'rochester-ny',
    city: "Rochester",
    state: "New York",
    state_code: 'NY',
    population: 209802,
    coordinates: [-77.6109, 43.1566],
    timezone: 'America/New_York'
  },
  {
    id: 'des-moines-ia',
    city: "Des Moines",
    state: "Iowa",
    state_code: 'IA',
    population: 210330,
    coordinates: [-93.6091, 41.6005],
    timezone: 'America/Chicago'
  },
  {
    id: 'modesto-ca',
    city: "Modesto",
    state: "California",
    state_code: 'CA',
    population: 211266,
    coordinates: [-120.9969, 37.6391],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'fayetteville-nc',
    city: "Fayetteville",
    state: "North Carolina",
    state_code: 'NC',
    population: 201963,
    coordinates: [-78.8784, 35.0527],
    timezone: 'America/New_York'
  },
  {
    id: 'tacoma-wa',
    city: "Tacoma",
    state: "Washington",
    state_code: 'WA',
    population: 207948,
    coordinates: [-122.44, 47.2529],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'oxnard-ca',
    city: "Oxnard",
    state: "California",
    state_code: 'CA',
    population: 207254,
    coordinates: [-119.1773, 34.1975],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'fontana-ca',
    city: "Fontana",
    state: "California",
    state_code: 'CA',
    population: 207460,
    coordinates: [-117.435, 34.0922],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'columbus-ga',
    city: "Columbus",
    state: "Georgia",
    state_code: 'GA',
    population: 200579,
    coordinates: [-84.9877, 32.461],
    timezone: 'America/New_York'
  },
  {
    id: 'montgomery-al',
    city: "Montgomery",
    state: "Alabama",
    state_code: 'AL',
    population: 200602,
    coordinates: [-86.2999, 32.3668],
    timezone: 'America/Chicago'
  },
  {
    id: 'moreno-valley-ca',
    city: "Moreno Valley",
    state: "California",
    state_code: 'CA',
    population: 204198,
    coordinates: [-117.2309, 33.9425],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'shreveport-la',
    city: "Shreveport",
    state: "Louisiana",
    state_code: 'LA',
    population: 197204,
    coordinates: [-93.7502, 32.5252],
    timezone: 'America/Chicago'
  },
  {
    id: 'aurora-il',
    city: "Aurora",
    state: "Illinois",
    state_code: 'IL',
    population: 200661,
    coordinates: [-88.3201, 41.7606],
    timezone: 'America/Chicago'
  },
  {
    id: 'yonkers-ny',
    city: "Yonkers",
    state: "New York",
    state_code: 'NY',
    population: 201116,
    coordinates: [-73.8987, 40.9312],
    timezone: 'America/New_York'
  },
  {
    id: 'akron-oh',
    city: "Akron",
    state: "Ohio",
    state_code: 'OH',
    population: 197542,
    coordinates: [-81.519, 41.0814],
    timezone: 'America/New_York'
  },
  {
    id: 'huntington-beach-ca',
    city: "Huntington Beach",
    state: "California",
    state_code: 'CA',
    population: 201899,
    coordinates: [-117.9989, 33.6595],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'little-rock-ar',
    city: "Little Rock",
    state: "Arkansas",
    state_code: 'AR',
    population: 197992,
    coordinates: [-92.2896, 34.7465],
    timezone: 'America/Chicago'
  },
  {
    id: 'augusta-ga',
    city: "Augusta",
    state: "Georgia",
    state_code: 'GA',
    population: 196939,
    coordinates: [-81.9675, 33.4735],
    timezone: 'America/New_York'
  },
  {
    id: 'amarillo-tx',
    city: "Amarillo",
    state: "Texas",
    state_code: 'TX',
    population: 198645,
    coordinates: [-101.8313, 35.222],
    timezone: 'America/Chicago'
  },
  {
    id: 'glendale-ca',
    city: "Glendale",
    state: "California",
    state_code: 'CA',
    population: 201020,
    coordinates: [-118.2551, 34.1425],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'mobile-al',
    city: "Mobile",
    state: "Alabama",
    state_code: 'AL',
    population: 194288,
    coordinates: [-88.0399, 30.6954],
    timezone: 'America/Chicago'
  },
  {
    id: 'grand-rapids-mi',
    city: "Grand Rapids",
    state: "Michigan",
    state_code: 'MI',
    population: 195097,
    coordinates: [-85.6681, 42.9634],
    timezone: 'America/Detroit'
  },
  {
    id: 'salt-lake-city-ut',
    city: "Salt Lake City",
    state: "Utah",
    state_code: 'UT',
    population: 192672,
    coordinates: [-111.891, 40.7608],
    timezone: 'America/Denver'
  },
  {
    id: 'tallahassee-fl',
    city: "Tallahassee",
    state: "Florida",
    state_code: 'FL',
    population: 189907,
    coordinates: [-84.2807, 30.4383],
    timezone: 'America/New_York'
  },
  {
    id: 'huntsville-al',
    city: "Huntsville",
    state: "Alabama",
    state_code: 'AL',
    population: 190582,
    coordinates: [-86.5861, 34.7304],
    timezone: 'America/Chicago'
  },
  {
    id: 'grand-prairie-tx',
    city: "Grand Prairie",
    state: "Texas",
    state_code: 'TX',
    population: 187809,
    coordinates: [-96.9978, 32.746],
    timezone: 'America/Chicago'
  },
  {
    id: 'knoxville-tn',
    city: "Knoxville",
    state: "Tennessee",
    state_code: 'TN',
    population: 185291,
    coordinates: [-83.9207, 35.9606],
    timezone: 'America/New_York'
  },
  {
    id: 'worcester-ma',
    city: "Worcester",
    state: "Massachusetts",
    state_code: 'MA',
    population: 184815,
    coordinates: [-71.8023, 42.2626],
    timezone: 'America/New_York'
  },
  {
    id: 'newport-news-va',
    city: "Newport News",
    state: "Virginia",
    state_code: 'VA',
    population: 182385,
    coordinates: [-76.473, 37.0871],
    timezone: 'America/New_York'
  },
  {
    id: 'brownsville-tx',
    city: "Brownsville",
    state: "Texas",
    state_code: 'TX',
    population: 183887,
    coordinates: [-97.4975, 25.9017],
    timezone: 'America/Chicago'
  },
  {
    id: 'overland-park-ks',
    city: "Overland Park",
    state: "Kansas",
    state_code: 'KS',
    population: 186515,
    coordinates: [-94.6708, 38.9822],
    timezone: 'America/Chicago'
  },
  {
    id: 'santa-clarita-ca',
    city: "Santa Clarita",
    state: "California",
    state_code: 'CA',
    population: 182371,
    coordinates: [-118.5426, 34.3917],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'providence-ri',
    city: "Providence",
    state: "Rhode Island",
    state_code: 'RI',
    population: 179207,
    coordinates: [-71.4128, 41.824],
    timezone: 'America/New_York'
  },
  {
    id: 'garden-grove-ca',
    city: "Garden Grove",
    state: "California",
    state_code: 'CA',
    population: 175393,
    coordinates: [-117.9414, 33.7739],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'chattanooga-tn',
    city: "Chattanooga",
    state: "Tennessee",
    state_code: 'TN',
    population: 176588,
    coordinates: [-85.3097, 35.0456],
    timezone: 'America/New_York'
  },
  {
    id: 'oceanside-ca',
    city: "Oceanside",
    state: "California",
    state_code: 'CA',
    population: 175691,
    coordinates: [-117.3795, 33.1959],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'jackson-ms',
    city: "Jackson",
    state: "Mississippi",
    state_code: 'MS',
    population: 170674,
    coordinates: [-90.1848, 32.2988],
    timezone: 'America/Chicago'
  },
  {
    id: 'fort-lauderdale-fl',
    city: "Fort Lauderdale",
    state: "Florida",
    state_code: 'FL',
    population: 178590,
    coordinates: [-80.1373, 26.1224],
    timezone: 'America/New_York'
  },
  {
    id: 'santa-rosa-ca',
    city: "Santa Rosa",
    state: "California",
    state_code: 'CA',
    population: 174972,
    coordinates: [-122.7141, 38.4405],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'rancho-cucamonga-ca',
    city: "Rancho Cucamonga",
    state: "California",
    state_code: 'CA',
    population: 175236,
    coordinates: [-117.5931, 34.1064],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'port-st.-lucie-fl',
    city: "Port St. Lucie",
    state: "Florida",
    state_code: 'FL',
    population: 164603,
    coordinates: [-80.3582, 27.273],
    timezone: 'America/New_York'
  },
  {
    id: 'tempe-az',
    city: "Tempe",
    state: "Arizona",
    state_code: 'AZ',
    population: 175826,
    coordinates: [-111.94, 33.4255],
    timezone: 'America/Phoenix'
  },
  {
    id: 'ontario-ca',
    city: "Ontario",
    state: "California",
    state_code: 'CA',
    population: 171214,
    coordinates: [-117.6509, 34.0633],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'vancouver-wa',
    city: "Vancouver",
    state: "Washington",
    state_code: 'WA',
    population: 172860,
    coordinates: [-122.6615, 45.6387],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'cape-coral-fl',
    city: "Cape Coral",
    state: "Florida",
    state_code: 'FL',
    population: 175229,
    coordinates: [-81.9495, 26.5629],
    timezone: 'America/New_York'
  },
  {
    id: 'sioux-falls-sd',
    city: "Sioux Falls",
    state: "South Dakota",
    state_code: 'SD',
    population: 171544,
    coordinates: [-96.7311, 43.546],
    timezone: 'America/Chicago'
  },
  {
    id: 'springfield-mo',
    city: "Springfield",
    state: "Missouri",
    state_code: 'MO',
    population: 166810,
    coordinates: [-93.2923, 37.209],
    timezone: 'America/Chicago'
  },
  {
    id: 'peoria-az',
    city: "Peoria",
    state: "Arizona",
    state_code: 'AZ',
    population: 171237,
    coordinates: [-112.2374, 33.5806],
    timezone: 'America/Phoenix'
  },
  {
    id: 'pembroke-pines-fl',
    city: "Pembroke Pines",
    state: "Florida",
    state_code: 'FL',
    population: 166611,
    coordinates: [-80.334, 26.0181],
    timezone: 'America/New_York'
  },
  {
    id: 'elk-grove-ca',
    city: "Elk Grove",
    state: "California",
    state_code: 'CA',
    population: 166913,
    coordinates: [-121.3716, 38.4088],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'salem-or',
    city: "Salem",
    state: "Oregon",
    state_code: 'OR',
    population: 164549,
    coordinates: [-123.0351, 44.9429],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'lancaster-ca',
    city: "Lancaster",
    state: "California",
    state_code: 'CA',
    population: 161103,
    coordinates: [-118.137, 34.6868],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'corona-ca',
    city: "Corona",
    state: "California",
    state_code: 'CA',
    population: 164226,
    coordinates: [-117.5664, 33.8753],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'eugene-or',
    city: "Eugene",
    state: "Oregon",
    state_code: 'OR',
    population: 163460,
    coordinates: [-123.0868, 44.0521],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'palmdale-ca',
    city: "Palmdale",
    state: "California",
    state_code: 'CA',
    population: 158351,
    coordinates: [-118.1165, 34.5794],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'salinas-ca',
    city: "Salinas",
    state: "California",
    state_code: 'CA',
    population: 157380,
    coordinates: [-121.6555, 36.6777],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'springfield-il',
    city: "Springfield",
    state: "Illinois",
    state_code: 'IL',
    population: 154341,
    coordinates: [-89.6501, 39.7817],
    timezone: 'America/Chicago'
  },
  {
    id: 'pasadena-tx',
    city: "Pasadena",
    state: "Texas",
    state_code: 'TX',
    population: 153784,
    coordinates: [-95.2091, 29.6911],
    timezone: 'America/Chicago'
  },
  {
    id: 'fort-collins-co',
    city: "Fort Collins",
    state: "Colorado",
    state_code: 'CO',
    population: 161175,
    coordinates: [-105.0844, 40.5853],
    timezone: 'America/Denver'
  },
  {
    id: 'hayward-ca',
    city: "Hayward",
    state: "California",
    state_code: 'CA',
    population: 158289,
    coordinates: [-122.0808, 37.6688],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'pomona-ca',
    city: "Pomona",
    state: "California",
    state_code: 'CA',
    population: 153266,
    coordinates: [-117.75, 34.0551],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'cary-nc',
    city: "Cary",
    state: "North Carolina",
    state_code: 'NC',
    population: 159769,
    coordinates: [-78.7811, 35.7915],
    timezone: 'America/New_York'
  },
  {
    id: 'rockford-il',
    city: "Rockford",
    state: "Illinois",
    state_code: 'IL',
    population: 148278,
    coordinates: [-89.094, 42.2711],
    timezone: 'America/Chicago'
  },
  {
    id: 'alexandria-va',
    city: "Alexandria",
    state: "Virginia",
    state_code: 'VA',
    population: 153511,
    coordinates: [-77.0469, 38.8048],
    timezone: 'America/New_York'
  },
  {
    id: 'escondido-ca',
    city: "Escondido",
    state: "California",
    state_code: 'CA',
    population: 151451,
    coordinates: [-117.0864, 33.1192],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'mckinney-tx',
    city: "McKinney",
    state: "Texas",
    state_code: 'TX',
    population: 162898,
    coordinates: [-96.6398, 33.1972],
    timezone: 'America/Chicago'
  },
  {
    id: 'kansas-city-ks',
    city: "Kansas City",
    state: "Kansas",
    state_code: 'KS',
    population: 151306,
    coordinates: [-94.6275, 39.1142],
    timezone: 'America/Chicago'
  },
  {
    id: 'joliet-il',
    city: "Joliet",
    state: "Illinois",
    state_code: 'IL',
    population: 147861,
    coordinates: [-88.0817, 41.525],
    timezone: 'America/Chicago'
  },
  {
    id: 'sunnyvale-ca',
    city: "Sunnyvale",
    state: "California",
    state_code: 'CA',
    population: 151754,
    coordinates: [-122.0363, 37.3688],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'torrance-ca',
    city: "Torrance",
    state: "California",
    state_code: 'CA',
    population: 148475,
    coordinates: [-118.3406, 33.8358],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'bridgeport-ct',
    city: "Bridgeport",
    state: "Connecticut",
    state_code: 'CT',
    population: 147629,
    coordinates: [-73.2048, 41.1792],
    timezone: 'America/New_York'
  },
  {
    id: 'lakewood-co',
    city: "Lakewood",
    state: "Colorado",
    state_code: 'CO',
    population: 152597,
    coordinates: [-105.0813, 39.7047],
    timezone: 'America/Denver'
  },
  {
    id: 'hollywood-fl',
    city: "Hollywood",
    state: "Florida",
    state_code: 'FL',
    population: 149728,
    coordinates: [-80.1495, 26.0112],
    timezone: 'America/New_York'
  },
  {
    id: 'paterson-nj',
    city: "Paterson",
    state: "New Jersey",
    state_code: 'NJ',
    population: 147754,
    coordinates: [-74.1718, 40.9168],
    timezone: 'America/New_York'
  },
  {
    id: 'naperville-il',
    city: "Naperville",
    state: "Illinois",
    state_code: 'IL',
    population: 147100,
    coordinates: [-88.1535, 41.7508],
    timezone: 'America/Chicago'
  },
  {
    id: 'syracuse-ny',
    city: "Syracuse",
    state: "New York",
    state_code: 'NY',
    population: 144142,
    coordinates: [-76.1474, 43.0481],
    timezone: 'America/New_York'
  },
  {
    id: 'mesquite-tx',
    city: "Mesquite",
    state: "Texas",
    state_code: 'TX',
    population: 144788,
    coordinates: [-96.5992, 32.7668],
    timezone: 'America/Chicago'
  },
  {
    id: 'dayton-oh',
    city: "Dayton",
    state: "Ohio",
    state_code: 'OH',
    population: 140599,
    coordinates: [-84.1916, 39.7589],
    timezone: 'America/New_York'
  },
  {
    id: 'savannah-ga',
    city: "Savannah",
    state: "Georgia",
    state_code: 'GA',
    population: 145674,
    coordinates: [-81.0998, 32.0809],
    timezone: 'America/New_York'
  },
  {
    id: 'clarksville-tn',
    city: "Clarksville",
    state: "Tennessee",
    state_code: 'TN',
    population: 149176,
    coordinates: [-87.3595, 36.5298],
    timezone: 'America/Chicago'
  },
  {
    id: 'orange-ca',
    city: "Orange",
    state: "California",
    state_code: 'CA',
    population: 140992,
    coordinates: [-117.8531, 33.7879],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'pasadena-ca',
    city: "Pasadena",
    state: "California",
    state_code: 'CA',
    population: 142250,
    coordinates: [-118.1445, 34.1478],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'fullerton-ca',
    city: "Fullerton",
    state: "California",
    state_code: 'CA',
    population: 140847,
    coordinates: [-117.9243, 33.8704],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'killeen-tx',
    city: "Killeen",
    state: "Texas",
    state_code: 'TX',
    population: 140806,
    coordinates: [-97.7278, 31.1171],
    timezone: 'America/Chicago'
  },
  {
    id: 'frisco-tx',
    city: "Frisco",
    state: "Texas",
    state_code: 'TX',
    population: 154407,
    coordinates: [-96.8236, 33.1507],
    timezone: 'America/Chicago'
  },
  {
    id: 'hampton-va',
    city: "Hampton",
    state: "Virginia",
    state_code: 'VA',
    population: 136454,
    coordinates: [-76.3452, 37.0299],
    timezone: 'America/New_York'
  },
  {
    id: 'mcallen-tx',
    city: "McAllen",
    state: "Texas",
    state_code: 'TX',
    population: 140269,
    coordinates: [-98.23, 26.2034],
    timezone: 'America/Chicago'
  },
  {
    id: 'warren-mi',
    city: "Warren",
    state: "Michigan",
    state_code: 'MI',
    population: 134056,
    coordinates: [-83.0147, 42.4775],
    timezone: 'America/Detroit'
  },
  {
    id: 'bellevue-wa',
    city: "Bellevue",
    state: "Washington",
    state_code: 'WA',
    population: 139820,
    coordinates: [-122.2006, 47.6101],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'west-valley-city-ut',
    city: "West Valley City",
    state: "Utah",
    state_code: 'UT',
    population: 136208,
    coordinates: [-112.0011, 40.6916],
    timezone: 'America/Denver'
  },
  {
    id: 'columbia-sc',
    city: "Columbia",
    state: "South Carolina",
    state_code: 'SC',
    population: 133803,
    coordinates: [-81.0348, 34.0007],
    timezone: 'America/New_York'
  },
  {
    id: 'olathe-ks',
    city: "Olathe",
    state: "Kansas",
    state_code: 'KS',
    population: 134305,
    coordinates: [-94.8191, 38.8814],
    timezone: 'America/Chicago'
  },
  {
    id: 'sterling-heights-mi',
    city: "Sterling Heights",
    state: "Michigan",
    state_code: 'MI',
    population: 132052,
    coordinates: [-83.0302, 42.5803],
    timezone: 'America/Detroit'
  },
  {
    id: 'new-haven-ct',
    city: "New Haven",
    state: "Connecticut",
    state_code: 'CT',
    population: 130322,
    coordinates: [-72.9282, 41.3083],
    timezone: 'America/New_York'
  },
  {
    id: 'miramar-fl',
    city: "Miramar",
    state: "Florida",
    state_code: 'FL',
    population: 137132,
    coordinates: [-80.2323, 25.986],
    timezone: 'America/New_York'
  },
  {
    id: 'waco-tx',
    city: "Waco",
    state: "Texas",
    state_code: 'TX',
    population: 132356,
    coordinates: [-97.1467, 31.5493],
    timezone: 'America/Chicago'
  },
  {
    id: 'thousand-oaks-ca',
    city: "Thousand Oaks",
    state: "California",
    state_code: 'CA',
    population: 129339,
    coordinates: [-118.837, 34.1705],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'cedar-rapids-ia',
    city: "Cedar Rapids",
    state: "Iowa",
    state_code: 'IA',
    population: 130405,
    coordinates: [-91.6656, 42.0083],
    timezone: 'America/Chicago'
  },
  {
    id: 'charleston-sc',
    city: "Charleston",
    state: "South Carolina",
    state_code: 'SC',
    population: 132609,
    coordinates: [-79.9311, 32.7765],
    timezone: 'America/New_York'
  },
  {
    id: 'visalia-ca',
    city: "Visalia",
    state: "California",
    state_code: 'CA',
    population: 130104,
    coordinates: [-119.2921, 36.3302],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'topeka-ks',
    city: "Topeka",
    state: "Kansas",
    state_code: 'KS',
    population: 127265,
    coordinates: [-95.689, 39.0473],
    timezone: 'America/Chicago'
  },
  {
    id: 'elizabeth-nj',
    city: "Elizabeth",
    state: "New Jersey",
    state_code: 'NJ',
    population: 129007,
    coordinates: [-74.2107, 40.664],
    timezone: 'America/New_York'
  },
  {
    id: 'gainesville-fl',
    city: "Gainesville",
    state: "Florida",
    state_code: 'FL',
    population: 130128,
    coordinates: [-82.3248, 29.6516],
    timezone: 'America/New_York'
  },
  {
    id: 'thornton-co',
    city: "Thornton",
    state: "Colorado",
    state_code: 'CO',
    population: 133451,
    coordinates: [-104.9719, 39.8681],
    timezone: 'America/Denver'
  },
  {
    id: 'roseville-ca',
    city: "Roseville",
    state: "California",
    state_code: 'CA',
    population: 130269,
    coordinates: [-121.288, 38.7521],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'carrollton-tx',
    city: "Carrollton",
    state: "Texas",
    state_code: 'TX',
    population: 133168,
    coordinates: [-96.8897, 32.9756],
    timezone: 'America/Chicago'
  },
  {
    id: 'coral-springs-fl',
    city: "Coral Springs",
    state: "Florida",
    state_code: 'FL',
    population: 129485,
    coordinates: [-80.2707, 26.2712],
    timezone: 'America/New_York'
  },
  {
    id: 'stamford-ct',
    city: "Stamford",
    state: "Connecticut",
    state_code: 'CT',
    population: 128874,
    coordinates: [-73.5387, 41.0534],
    timezone: 'America/New_York'
  },
  {
    id: 'simi-valley-ca',
    city: "Simi Valley",
    state: "California",
    state_code: 'CA',
    population: 126788,
    coordinates: [-118.7815, 34.2694],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'concord-ca',
    city: "Concord",
    state: "California",
    state_code: 'CA',
    population: 128667,
    coordinates: [-122.0311, 37.9779],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'hartford-ct',
    city: "Hartford",
    state: "Connecticut",
    state_code: 'CT',
    population: 124006,
    coordinates: [-72.6851, 41.7658],
    timezone: 'America/New_York'
  },
  {
    id: 'kent-wa',
    city: "Kent",
    state: "Washington",
    state_code: 'WA',
    population: 126952,
    coordinates: [-122.2348, 47.3809],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'lafayette-la',
    city: "Lafayette",
    state: "Louisiana",
    state_code: 'LA',
    population: 127657,
    coordinates: [-92.0198, 30.2241],
    timezone: 'America/Chicago'
  },
  {
    id: 'midland-tx',
    city: "Midland",
    state: "Texas",
    state_code: 'TX',
    population: 132950,
    coordinates: [-102.0779, 31.9973],
    timezone: 'America/Chicago'
  },
  {
    id: 'surprise-az',
    city: "Surprise",
    state: "Arizona",
    state_code: 'AZ',
    population: 128422,
    coordinates: [-112.452, 33.6292],
    timezone: 'America/Phoenix'
  },
  {
    id: 'denton-tx',
    city: "Denton",
    state: "Texas",
    state_code: 'TX',
    population: 131044,
    coordinates: [-97.1331, 33.2148],
    timezone: 'America/Chicago'
  },
  {
    id: 'victorville-ca',
    city: "Victorville",
    state: "California",
    state_code: 'CA',
    population: 122225,
    coordinates: [-117.2912, 34.5362],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'evansville-in',
    city: "Evansville",
    state: "Indiana",
    state_code: 'IN',
    population: 119943,
    coordinates: [-87.5711, 37.9716],
    timezone: 'America/Chicago'
  },
  {
    id: 'santa-clara-ca',
    city: "Santa Clara",
    state: "California",
    state_code: 'CA',
    population: 126215,
    coordinates: [-121.9552, 37.3541],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'abilene-tx',
    city: "Abilene",
    state: "Texas",
    state_code: 'TX',
    population: 121721,
    coordinates: [-99.7331, 32.4487],
    timezone: 'America/Chicago'
  },
  {
    id: 'athens-ga',
    city: "Athens",
    state: "Georgia",
    state_code: 'GA',
    population: 116714,
    coordinates: [-83.3833, 33.9608],
    timezone: 'America/New_York'
  },
  {
    id: 'vallejo-ca',
    city: "Vallejo",
    state: "California",
    state_code: 'CA',
    population: 121253,
    coordinates: [-122.2566, 38.1041],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'murfreesboro-tn',
    city: "Murfreesboro",
    state: "Tennessee",
    state_code: 'TN',
    population: 126118,
    coordinates: [-86.39, 35.8456],
    timezone: 'America/Chicago'
  },
  {
    id: 'burbank-ca',
    city: "Burbank",
    state: "California",
    state_code: 'CA',
    population: 105319,
    coordinates: [-118.309, 34.1808],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'ann-arbor-mi',
    city: "Ann Arbor",
    state: "Michigan",
    state_code: 'MI',
    population: 117070,
    coordinates: [-83.743, 42.2808],
    timezone: 'America/Detroit'
  },
  {
    id: 'allentown-pa',
    city: "Allentown",
    state: "Pennsylvania",
    state_code: 'PA',
    population: 120207,
    coordinates: [-75.4902, 40.6023],
    timezone: 'America/New_York'
  },
  {
    id: 'columbia-mo',
    city: "Columbia",
    state: "Missouri",
    state_code: 'MO',
    population: 119108,
    coordinates: [-92.3341, 38.9517],
    timezone: 'America/Chicago'
  },
  {
    id: 'fargo-nd',
    city: "Fargo",
    state: "North Dakota",
    state_code: 'ND',
    population: 118523,
    coordinates: [-96.7898, 46.8772],
    timezone: 'America/Chicago'
  },
  {
    id: 'odessa-tx',
    city: "Odessa",
    state: "Texas",
    state_code: 'TX',
    population: 118968,
    coordinates: [-102.3676, 31.8457],
    timezone: 'America/Chicago'
  },
  {
    id: 'berkeley-ca',
    city: "Berkeley",
    state: "California",
    state_code: 'CA',
    population: 120972,
    coordinates: [-122.2727, 37.8716],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'norman-ok',
    city: "Norman",
    state: "Oklahoma",
    state_code: 'OK',
    population: 120284,
    coordinates: [-97.4395, 35.2226],
    timezone: 'America/Chicago'
  },
  {
    id: 'beaumont-tx',
    city: "Beaumont",
    state: "Texas",
    state_code: 'TX',
    population: 118129,
    coordinates: [-94.1018, 30.0802],
    timezone: 'America/Chicago'
  },
  {
    id: 'independence-mo',
    city: "Independence",
    state: "Missouri",
    state_code: 'MO',
    population: 117255,
    coordinates: [-94.4155, 39.0911],
    timezone: 'America/Chicago'
  },
  {
    id: 'murrieta-ca',
    city: "Murrieta",
    state: "California",
    state_code: 'CA',
    population: 109830,
    coordinates: [-117.2139, 33.5539],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'round-rock-tx',
    city: "Round Rock",
    state: "Texas",
    state_code: 'TX',
    population: 115997,
    coordinates: [-97.6789, 30.5083],
    timezone: 'America/Chicago'
  },
  {
    id: 'springfield-ma',
    city: "Springfield",
    state: "Massachusetts",
    state_code: 'MA',
    population: 154341,
    coordinates: [-72.5898, 42.1015],
    timezone: 'America/New_York'
  },
  {
    id: 'wilmington-nc',
    city: "Wilmington",
    state: "North Carolina",
    state_code: 'NC',
    population: 115933,
    coordinates: [-77.9447, 34.2257],
    timezone: 'America/New_York'
  },
  {
    id: 'arvada-co',
    city: "Arvada",
    state: "Colorado",
    state_code: 'CO',
    population: 115368,
    coordinates: [-105.0875, 39.8028],
    timezone: 'America/Denver'
  },
  {
    id: 'provo-ut',
    city: "Provo",
    state: "Utah",
    state_code: 'UT',
    population: 115264,
    coordinates: [-111.6585, 40.2338],
    timezone: 'America/Denver'
  },
  {
    id: 'peoria-il',
    city: "Peoria",
    state: "Illinois",
    state_code: 'IL',
    population: 115070,
    coordinates: [-89.589, 40.6936],
    timezone: 'America/Chicago'
  },
  {
    id: 'lansing-mi',
    city: "Lansing",
    state: "Michigan",
    state_code: 'MI',
    population: 115056,
    coordinates: [-84.5555, 42.7325],
    timezone: 'America/Detroit'
  },
  {
    id: 'downey-ca',
    city: "Downey",
    state: "California",
    state_code: 'CA',
    population: 114219,
    coordinates: [-118.1328, 33.9401],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'carlsbad-ca',
    city: "Carlsbad",
    state: "California",
    state_code: 'CA',
    population: 113453,
    coordinates: [-117.3506, 33.1581],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'westminster-co',
    city: "Westminster",
    state: "Colorado",
    state_code: 'CO',
    population: 113130,
    coordinates: [-105.0372, 39.8367],
    timezone: 'America/Denver'
  },
  {
    id: 'clearwater-fl',
    city: "Clearwater",
    state: "Florida",
    state_code: 'FL',
    population: 113003,
    coordinates: [-82.8001, 27.9659],
    timezone: 'America/New_York'
  },
  {
    id: 'costa-mesa-ca',
    city: "Costa Mesa",
    state: "California",
    state_code: 'CA',
    population: 113204,
    coordinates: [-117.9187, 33.6411],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'miami-gardens-fl',
    city: "Miami Gardens",
    state: "Florida",
    state_code: 'FL',
    population: 113187,
    coordinates: [-80.2456, 25.942],
    timezone: 'America/New_York'
  },
  {
    id: 'fairfield-ca',
    city: "Fairfield",
    state: "California",
    state_code: 'CA',
    population: 112970,
    coordinates: [-122.0399, 38.2494],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'rochester-mn',
    city: "Rochester",
    state: "Minnesota",
    state_code: 'MN',
    population: 112225,
    coordinates: [-92.4802, 44.0121],
    timezone: 'America/Chicago'
  },
  {
    id: 'elgin-il',
    city: "Elgin",
    state: "Illinois",
    state_code: 'IL',
    population: 112111,
    coordinates: [-88.2825, 42.0354],
    timezone: 'America/Chicago'
  },
  {
    id: 'west-jordan-ut',
    city: "West Jordan",
    state: "Utah",
    state_code: 'UT',
    population: 111946,
    coordinates: [-111.9391, 40.6097],
    timezone: 'America/Denver'
  },
  {
    id: 'temecula-ca',
    city: "Temecula",
    state: "California",
    state_code: 'CA',
    population: 112011,
    coordinates: [-117.1484, 33.4936],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'inglewood-ca',
    city: "Inglewood",
    state: "California",
    state_code: 'CA',
    population: 111666,
    coordinates: [-118.3531, 33.9617],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'richardson-tx',
    city: "Richardson",
    state: "Texas",
    state_code: 'TX',
    population: 110815,
    coordinates: [-96.7297, 32.9483],
    timezone: 'America/Chicago'
  },
  {
    id: 'lowell-ma',
    city: "Lowell",
    state: "Massachusetts",
    state_code: 'MA',
    population: 110699,
    coordinates: [-71.3162, 42.6334],
    timezone: 'America/New_York'
  },
  {
    id: 'gresham-or',
    city: "Gresham",
    state: "Oregon",
    state_code: 'OR',
    population: 110553,
    coordinates: [-122.4302, 45.4988],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'antioch-ca',
    city: "Antioch",
    state: "California",
    state_code: 'CA',
    population: 110542,
    coordinates: [-121.8058, 38.0049],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'cambridge-ma',
    city: "Cambridge",
    state: "Massachusetts",
    state_code: 'MA',
    population: 110402,
    coordinates: [-71.1097, 42.3736],
    timezone: 'America/New_York'
  },
  {
    id: 'high-point-nc',
    city: "High Point",
    state: "North Carolina",
    state_code: 'NC',
    population: 110268,
    coordinates: [-79.9987, 35.9557],
    timezone: 'America/New_York'
  },
  {
    id: 'billings-mt',
    city: "Billings",
    state: "Montana",
    state_code: 'MT',
    population: 110263,
    coordinates: [-108.5007, 45.7833],
    timezone: 'America/Denver'
  },
  {
    id: 'manchester-nh',
    city: "Manchester",
    state: "New Hampshire",
    state_code: 'NH',
    population: 110229,
    coordinates: [-71.4548, 42.9956],
    timezone: 'America/New_York'
  },
  {
    id: 'richmond-ca',
    city: "Richmond",
    state: "California",
    state_code: 'CA',
    population: 109708,
    coordinates: [-122.3477, 37.9358],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'centennial-co',
    city: "Centennial",
    state: "Colorado",
    state_code: 'CO',
    population: 109741,
    coordinates: [-104.8772, 39.5807],
    timezone: 'America/Denver'
  },
  {
    id: 'pueblo-co',
    city: "Pueblo",
    state: "Colorado",
    state_code: 'CO',
    population: 109412,
    coordinates: [-104.6091, 38.2545],
    timezone: 'America/Denver'
  },
  {
    id: 'pearland-tx',
    city: "Pearland",
    state: "Texas",
    state_code: 'TX',
    population: 108821,
    coordinates: [-95.2861, 29.5636],
    timezone: 'America/Chicago'
  },
  {
    id: 'waterbury-ct',
    city: "Waterbury",
    state: "Connecticut",
    state_code: 'CT',
    population: 108802,
    coordinates: [-73.0515, 41.5582],
    timezone: 'America/New_York'
  },
  {
    id: 'west-covina-ca',
    city: "West Covina",
    state: "California",
    state_code: 'CA',
    population: 108484,
    coordinates: [-117.939, 34.0686],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'north-charleston-sc',
    city: "North Charleston",
    state: "South Carolina",
    state_code: 'SC',
    population: 108304,
    coordinates: [-79.9748, 32.8854],
    timezone: 'America/New_York'
  },
  {
    id: 'everett-wa',
    city: "Everett",
    state: "Washington",
    state_code: 'WA',
    population: 108010,
    coordinates: [-122.2021, 47.979],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'palm-bay-fl',
    city: "Palm Bay",
    state: "Florida",
    state_code: 'FL',
    population: 107888,
    coordinates: [-80.5887, 28.0345],
    timezone: 'America/New_York'
  },
  {
    id: 'college-station-tx',
    city: "College Station",
    state: "Texas",
    state_code: 'TX',
    population: 107889,
    coordinates: [-96.3344, 30.628],
    timezone: 'America/Chicago'
  },
  {
    id: 'pompano-beach-fl',
    city: "Pompano Beach",
    state: "Florida",
    state_code: 'FL',
    population: 107762,
    coordinates: [-80.1248, 26.2379],
    timezone: 'America/New_York'
  },
  {
    id: 'boulder-co',
    city: "Boulder",
    state: "Colorado",
    state_code: 'CO',
    population: 107349,
    coordinates: [-105.2705, 40.015],
    timezone: 'America/Denver'
  },
  {
    id: 'west-palm-beach-fl',
    city: "West Palm Beach",
    state: "Florida",
    state_code: 'FL',
    population: 106779,
    coordinates: [-80.0534, 26.7153],
    timezone: 'America/New_York'
  },
  {
    id: 'norwalk-ca',
    city: "Norwalk",
    state: "California",
    state_code: 'CA',
    population: 107140,
    coordinates: [-118.0815, 33.9022],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'broken-arrow-ok',
    city: "Broken Arrow",
    state: "Oklahoma",
    state_code: 'OK',
    population: 106563,
    coordinates: [-95.7975, 36.0609],
    timezone: 'America/Chicago'
  },
  {
    id: 'daly-city-ca',
    city: "Daly City",
    state: "California",
    state_code: 'CA',
    population: 106562,
    coordinates: [-122.4702, 37.6879],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'sandy-springs-ga',
    city: "Sandy Springs",
    state: "Georgia",
    state_code: 'GA',
    population: 105330,
    coordinates: [-84.3733, 33.9242],
    timezone: 'America/New_York'
  },
  {
    id: 'green-bay-wi',
    city: "Green Bay",
    state: "Wisconsin",
    state_code: 'WI',
    population: 105207,
    coordinates: [-88.0199, 44.5192],
    timezone: 'America/Chicago'
  },
  {
    id: 'santa-maria-ca',
    city: "Santa Maria",
    state: "California",
    state_code: 'CA',
    population: 105093,
    coordinates: [-120.4357, 34.953],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'lakeland-fl',
    city: "Lakeland",
    state: "Florida",
    state_code: 'FL',
    population: 104401,
    coordinates: [-81.9498, 28.0395],
    timezone: 'America/New_York'
  },
  {
    id: 'lewisville-tx',
    city: "Lewisville",
    state: "Texas",
    state_code: 'TX',
    population: 104039,
    coordinates: [-96.9942, 33.0462],
    timezone: 'America/Chicago'
  },
  {
    id: 'wichita-falls-tx',
    city: "Wichita Falls",
    state: "Texas",
    state_code: 'TX',
    population: 104710,
    coordinates: [-98.4934, 33.9137],
    timezone: 'America/Chicago'
  },
  {
    id: 'clovis-ca',
    city: "Clovis",
    state: "California",
    state_code: 'CA',
    population: 104180,
    coordinates: [-119.7029, 36.8252],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'tyler-tx',
    city: "Tyler",
    state: "Texas",
    state_code: 'TX',
    population: 103700,
    coordinates: [-95.301, 32.3513],
    timezone: 'America/Chicago'
  },
  {
    id: 'el-cajon-ca',
    city: "El Cajon",
    state: "California",
    state_code: 'CA',
    population: 103679,
    coordinates: [-116.9625, 32.7948],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'san-mateo-ca',
    city: "San Mateo",
    state: "California",
    state_code: 'CA',
    population: 103536,
    coordinates: [-122.3255, 37.563],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'brandon-fl',
    city: "Brandon",
    state: "Florida",
    state_code: 'FL',
    population: 103483,
    coordinates: [-82.2859, 27.9378],
    timezone: 'America/New_York'
  },
  {
    id: 'rialto-ca',
    city: "Rialto",
    state: "California",
    state_code: 'CA',
    population: 103132,
    coordinates: [-117.3703, 34.1064],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'davenport-ia',
    city: "Davenport",
    state: "Iowa",
    state_code: 'IA',
    population: 102582,
    coordinates: [-90.5776, 41.5236],
    timezone: 'America/Chicago'
  },
  {
    id: 'south-bend-in',
    city: "South Bend",
    state: "Indiana",
    state_code: 'IN',
    population: 101516,
    coordinates: [-86.252, 41.6764],
    timezone: 'America/Indiana/Indianapolis'
  },
  {
    id: 'edison-nj',
    city: "Edison",
    state: "New Jersey",
    state_code: 'NJ',
    population: 102548,
    coordinates: [-74.4121, 40.5187],
    timezone: 'America/New_York'
  },
  {
    id: 'hillsboro-or',
    city: "Hillsboro",
    state: "Oregon",
    state_code: 'OR',
    population: 102347,
    coordinates: [-122.9898, 45.5229],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'las-cruces-nm',
    city: "Las Cruces",
    state: "New Mexico",
    state_code: 'NM',
    population: 101643,
    coordinates: [-106.751, 32.3199],
    timezone: 'America/Denver'
  },
  {
    id: 'vista-ca',
    city: "Vista",
    state: "California",
    state_code: 'CA',
    population: 100890,
    coordinates: [-117.2425, 33.2],
    timezone: 'America/Los_Angeles'
  },
  {
    id: 'greeley-co',
    city: "Greeley",
    state: "Colorado",
    state_code: 'CO',
    population: 100883,
    coordinates: [-104.7091, 40.4233],
    timezone: 'America/Denver'
  },
  {
    id: 'davie-fl',
    city: "Davie",
    state: "Florida",
    state_code: 'FL',
    population: 100882,
    coordinates: [-80.2331, 26.0765],
    timezone: 'America/New_York'
  },
  {
    id: 'san-angelo-tx',
    city: "San Angelo",
    state: "Texas",
    state_code: 'TX',
    population: 100450,
    coordinates: [-100.437, 31.4638],
    timezone: 'America/Chicago'
  },
  {
    id: 'renton-wa',
    city: "Renton",
    state: "Washington",
    state_code: 'WA',
    population: 100242,
    coordinates: [-122.2171, 47.4829],
    timezone: 'America/Los_Angeles'
  }
];

// Filter cities with population >= 24,000 (though list is mostly >100k plus some smaller ones)
export const CITIES_OVER_24K = US_CITIES.filter(city => city.population >= 24000);

// Helper functions for city data
export function getCityById(id: string): USCity | undefined {
  return US_CITIES.find(city => city.id === id);
}

export function getCitiesByState(stateCode: string): USCity[] {
  return US_CITIES.filter(city => city.state_code === stateCode);
}

export function getCitiesByPopulation(minPop: number = 24000): USCity[] {
  return US_CITIES.filter(city => city.population >= minPop)
    .sort((a, b) => b.population - a.population);
}

export function searchCities(query: string): USCity[] {
  const lowercaseQuery = query.toLowerCase();
  return US_CITIES.filter(city =>
    city.city.toLowerCase().includes(lowercaseQuery) ||
    city.state.toLowerCase().includes(lowercaseQuery) ||
    city.state_code.toLowerCase().includes(lowercaseQuery)
  );
}
