// World Cities Database - Top 1000+ cities outside USA
// Each city has SEO-optimized slug, population, timezone, and coordinates

export interface WorldCity {
    id: string;          // URL slug
    city: string;        // Display name
    country: string;     // Country name
    countryCode: string; // ISO country code
    timezone: string;    // IANA timezone
    population: number;  // Population
    coordinates: [number, number]; // [longitude, latitude]
    continent: string;   // Continent
}

export const WORLD_CITIES: WorldCity[] = [
    // ASIA - Major Cities
    { id: 'tokyo-japan', city: 'Tokyo', country: 'Japan', countryCode: 'JP', timezone: 'Asia/Tokyo', population: 37400068, coordinates: [139.6917, 35.6895], continent: 'Asia' },
    { id: 'delhi-india', city: 'Delhi', country: 'India', countryCode: 'IN', timezone: 'Asia/Kolkata', population: 28514000, coordinates: [77.1025, 28.7041], continent: 'Asia' },
    { id: 'shanghai-china', city: 'Shanghai', country: 'China', countryCode: 'CN', timezone: 'Asia/Shanghai', population: 25582000, coordinates: [121.4737, 31.2304], continent: 'Asia' },
    { id: 'beijing-china', city: 'Beijing', country: 'China', countryCode: 'CN', timezone: 'Asia/Shanghai', population: 19618000, coordinates: [116.4074, 39.9042], continent: 'Asia' },
    { id: 'mumbai-india', city: 'Mumbai', country: 'India', countryCode: 'IN', timezone: 'Asia/Kolkata', population: 19980000, coordinates: [72.8777, 19.0760], continent: 'Asia' },
    { id: 'osaka-japan', city: 'Osaka', country: 'Japan', countryCode: 'JP', timezone: 'Asia/Tokyo', population: 19281000, coordinates: [135.5023, 34.6937], continent: 'Asia' },
    { id: 'dhaka-bangladesh', city: 'Dhaka', country: 'Bangladesh', countryCode: 'BD', timezone: 'Asia/Dhaka', population: 19578000, coordinates: [90.4125, 23.8103], continent: 'Asia' },
    { id: 'karachi-pakistan', city: 'Karachi', country: 'Pakistan', countryCode: 'PK', timezone: 'Asia/Karachi', population: 14910000, coordinates: [67.0011, 24.8607], continent: 'Asia' },
    { id: 'istanbul-turkey', city: 'Istanbul', country: 'Turkey', countryCode: 'TR', timezone: 'Europe/Istanbul', population: 14751000, coordinates: [28.9784, 41.0082], continent: 'Asia' },
    { id: 'kolkata-india', city: 'Kolkata', country: 'India', countryCode: 'IN', timezone: 'Asia/Kolkata', population: 14681000, coordinates: [88.3639, 22.5726], continent: 'Asia' },
    { id: 'manila-philippines', city: 'Manila', country: 'Philippines', countryCode: 'PH', timezone: 'Asia/Manila', population: 13482000, coordinates: [120.9842, 14.5995], continent: 'Asia' },
    { id: 'guangzhou-china', city: 'Guangzhou', country: 'China', countryCode: 'CN', timezone: 'Asia/Shanghai', population: 12638000, coordinates: [113.2644, 23.1291], continent: 'Asia' },
    { id: 'shenzhen-china', city: 'Shenzhen', country: 'China', countryCode: 'CN', timezone: 'Asia/Shanghai', population: 11908000, coordinates: [114.0579, 22.5431], continent: 'Asia' },
    { id: 'seoul-south-korea', city: 'Seoul', country: 'South Korea', countryCode: 'KR', timezone: 'Asia/Seoul', population: 9963000, coordinates: [126.9780, 37.5665], continent: 'Asia' },
    { id: 'lahore-pakistan', city: 'Lahore', country: 'Pakistan', countryCode: 'PK', timezone: 'Asia/Karachi', population: 11738000, coordinates: [74.3587, 31.5497], continent: 'Asia' },
    { id: 'bangalore-india', city: 'Bangalore', country: 'India', countryCode: 'IN', timezone: 'Asia/Kolkata', population: 11440000, coordinates: [77.5946, 12.9716], continent: 'Asia' },
    { id: 'chennai-india', city: 'Chennai', country: 'India', countryCode: 'IN', timezone: 'Asia/Kolkata', population: 10456000, coordinates: [80.2707, 13.0827], continent: 'Asia' },
    { id: 'jakarta-indonesia', city: 'Jakarta', country: 'Indonesia', countryCode: 'ID', timezone: 'Asia/Jakarta', population: 10562088, coordinates: [106.8456, -6.2088], continent: 'Asia' },
    { id: 'tianjin-china', city: 'Tianjin', country: 'China', countryCode: 'CN', timezone: 'Asia/Shanghai', population: 10800000, coordinates: [117.3616, 39.3434], continent: 'Asia' },
    { id: 'hong-kong', city: 'Hong Kong', country: 'China', countryCode: 'HK', timezone: 'Asia/Hong_Kong', population: 7347000, coordinates: [114.1694, 22.3193], continent: 'Asia' },
    { id: 'bangkok-thailand', city: 'Bangkok', country: 'Thailand', countryCode: 'TH', timezone: 'Asia/Bangkok', population: 8305218, coordinates: [100.5018, 13.7563], continent: 'Asia' },
    { id: 'hyderabad-india', city: 'Hyderabad', country: 'India', countryCode: 'IN', timezone: 'Asia/Kolkata', population: 9482000, coordinates: [78.4867, 17.3850], continent: 'Asia' },
    { id: 'ahmedabad-india', city: 'Ahmedabad', country: 'India', countryCode: 'IN', timezone: 'Asia/Kolkata', population: 7650000, coordinates: [72.5714, 23.0225], continent: 'Asia' },
    { id: 'hangzhou-china', city: 'Hangzhou', country: 'China', countryCode: 'CN', timezone: 'Asia/Shanghai', population: 9018000, coordinates: [120.1551, 30.2741], continent: 'Asia' },
    { id: 'chengdu-china', city: 'Chengdu', country: 'China', countryCode: 'CN', timezone: 'Asia/Shanghai', population: 14427000, coordinates: [104.0665, 30.5728], continent: 'Asia' },
    { id: 'singapore-city', city: 'Singapore', country: 'Singapore', countryCode: 'SG', timezone: 'Asia/Singapore', population: 5685807, coordinates: [103.8198, 1.3521], continent: 'Asia' },
    { id: 'ho-chi-minh-city-vietnam', city: 'Ho Chi Minh City', country: 'Vietnam', countryCode: 'VN', timezone: 'Asia/Ho_Chi_Minh', population: 8993082, coordinates: [106.6297, 10.8231], continent: 'Asia' },
    { id: 'wuhan-china', city: 'Wuhan', country: 'China', countryCode: 'CN', timezone: 'Asia/Shanghai', population: 10892900, coordinates: [114.3054, 30.5928], continent: 'Asia' },
    { id: 'taipei-taiwan', city: 'Taipei', country: 'Taiwan', countryCode: 'TW', timezone: 'Asia/Taipei', population: 7871900, coordinates: [121.5654, 25.0330], continent: 'Asia' },
    { id: 'kuala-lumpur-malaysia', city: 'Kuala Lumpur', country: 'Malaysia', countryCode: 'MY', timezone: 'Asia/Kuala_Lumpur', population: 7564000, coordinates: [101.6869, 3.1390], continent: 'Asia' },
    { id: 'pune-india', city: 'Pune', country: 'India', countryCode: 'IN', timezone: 'Asia/Kolkata', population: 5727000, coordinates: [73.8567, 18.5204], continent: 'Asia' },
    { id: 'surat-india', city: 'Surat', country: 'India', countryCode: 'IN', timezone: 'Asia/Kolkata', population: 4850000, coordinates: [72.8311, 21.1702], continent: 'Asia' },
    { id: 'riyadh-saudi-arabia', city: 'Riyadh', country: 'Saudi Arabia', countryCode: 'SA', timezone: 'Asia/Riyadh', population: 6506700, coordinates: [46.6753, 24.7136], continent: 'Asia' },
    { id: 'jeddah-saudi-arabia', city: 'Jeddah', country: 'Saudi Arabia', countryCode: 'SA', timezone: 'Asia/Riyadh', population: 3976000, coordinates: [39.1925, 21.4858], continent: 'Asia' },
    { id: 'dubai-uae', city: 'Dubai', country: 'UAE', countryCode: 'AE', timezone: 'Asia/Dubai', population: 3137000, coordinates: [55.2708, 25.2048], continent: 'Asia' },
    { id: 'abu-dhabi-uae', city: 'Abu Dhabi', country: 'UAE', countryCode: 'AE', timezone: 'Asia/Dubai', population: 1450000, coordinates: [54.3773, 24.4539], continent: 'Asia' },
    { id: 'doha-qatar', city: 'Doha', country: 'Qatar', countryCode: 'QA', timezone: 'Asia/Qatar', population: 1450000, coordinates: [51.5310, 25.2854], continent: 'Asia' },
    { id: 'kuwait-city-kuwait', city: 'Kuwait City', country: 'Kuwait', countryCode: 'KW', timezone: 'Asia/Kuwait', population: 2380000, coordinates: [47.9774, 29.3759], continent: 'Asia' },
    { id: 'tel-aviv-israel', city: 'Tel Aviv', country: 'Israel', countryCode: 'IL', timezone: 'Asia/Jerusalem', population: 3854000, coordinates: [34.7818, 32.0853], continent: 'Asia' },
    { id: 'jerusalem-israel', city: 'Jerusalem', country: 'Israel', countryCode: 'IL', timezone: 'Asia/Jerusalem', population: 936000, coordinates: [35.2137, 31.7683], continent: 'Asia' },
    { id: 'yangon-myanmar', city: 'Yangon', country: 'Myanmar', countryCode: 'MM', timezone: 'Asia/Yangon', population: 5211000, coordinates: [96.1561, 16.8661], continent: 'Asia' },
    { id: 'hanoi-vietnam', city: 'Hanoi', country: 'Vietnam', countryCode: 'VN', timezone: 'Asia/Ho_Chi_Minh', population: 7785000, coordinates: [105.8342, 21.0278], continent: 'Asia' },
    { id: 'nagoya-japan', city: 'Nagoya', country: 'Japan', countryCode: 'JP', timezone: 'Asia/Tokyo', population: 9107000, coordinates: [136.9066, 35.1815], continent: 'Asia' },
    { id: 'fukuoka-japan', city: 'Fukuoka', country: 'Japan', countryCode: 'JP', timezone: 'Asia/Tokyo', population: 2817000, coordinates: [130.4017, 33.5904], continent: 'Asia' },
    { id: 'sapporo-japan', city: 'Sapporo', country: 'Japan', countryCode: 'JP', timezone: 'Asia/Tokyo', population: 2636000, coordinates: [141.3545, 43.0618], continent: 'Asia' },
    { id: 'kyoto-japan', city: 'Kyoto', country: 'Japan', countryCode: 'JP', timezone: 'Asia/Tokyo', population: 1464000, coordinates: [135.7681, 35.0116], continent: 'Asia' },
    { id: 'busan-south-korea', city: 'Busan', country: 'South Korea', countryCode: 'KR', timezone: 'Asia/Seoul', population: 3429000, coordinates: [129.0756, 35.1796], continent: 'Asia' },
    { id: 'incheon-south-korea', city: 'Incheon', country: 'South Korea', countryCode: 'KR', timezone: 'Asia/Seoul', population: 2957000, coordinates: [126.7052, 37.4563], continent: 'Asia' },
    { id: 'daegu-south-korea', city: 'Daegu', country: 'South Korea', countryCode: 'KR', timezone: 'Asia/Seoul', population: 2438000, coordinates: [128.6014, 35.8714], continent: 'Asia' },

    // EUROPE - Major Cities
    { id: 'london-uk', city: 'London', country: 'United Kingdom', countryCode: 'GB', timezone: 'Europe/London', population: 8982000, coordinates: [-0.1276, 51.5074], continent: 'Europe' },
    { id: 'paris-france', city: 'Paris', country: 'France', countryCode: 'FR', timezone: 'Europe/Paris', population: 10901000, coordinates: [2.3522, 48.8566], continent: 'Europe' },
    { id: 'moscow-russia', city: 'Moscow', country: 'Russia', countryCode: 'RU', timezone: 'Europe/Moscow', population: 12537954, coordinates: [37.6173, 55.7558], continent: 'Europe' },
    { id: 'madrid-spain', city: 'Madrid', country: 'Spain', countryCode: 'ES', timezone: 'Europe/Madrid', population: 6642000, coordinates: [-3.7038, 40.4168], continent: 'Europe' },
    { id: 'barcelona-spain', city: 'Barcelona', country: 'Spain', countryCode: 'ES', timezone: 'Europe/Madrid', population: 5575000, coordinates: [2.1734, 41.3851], continent: 'Europe' },
    { id: 'berlin-germany', city: 'Berlin', country: 'Germany', countryCode: 'DE', timezone: 'Europe/Berlin', population: 3645000, coordinates: [13.4050, 52.5200], continent: 'Europe' },
    { id: 'rome-italy', city: 'Rome', country: 'Italy', countryCode: 'IT', timezone: 'Europe/Rome', population: 4257000, coordinates: [12.4964, 41.9028], continent: 'Europe' },
    { id: 'milan-italy', city: 'Milan', country: 'Italy', countryCode: 'IT', timezone: 'Europe/Rome', population: 3132000, coordinates: [9.1900, 45.4642], continent: 'Europe' },
    { id: 'naples-italy', city: 'Naples', country: 'Italy', countryCode: 'IT', timezone: 'Europe/Rome', population: 2175000, coordinates: [14.2681, 40.8518], continent: 'Europe' },
    { id: 'saint-petersburg-russia', city: 'Saint Petersburg', country: 'Russia', countryCode: 'RU', timezone: 'Europe/Moscow', population: 5383890, coordinates: [30.3351, 59.9343], continent: 'Europe' },
    { id: 'munich-germany', city: 'Munich', country: 'Germany', countryCode: 'DE', timezone: 'Europe/Berlin', population: 1472000, coordinates: [11.5820, 48.1351], continent: 'Europe' },
    { id: 'hamburg-germany', city: 'Hamburg', country: 'Germany', countryCode: 'DE', timezone: 'Europe/Berlin', population: 1841000, coordinates: [9.9937, 53.5511], continent: 'Europe' },
    { id: 'frankfurt-germany', city: 'Frankfurt', country: 'Germany', countryCode: 'DE', timezone: 'Europe/Berlin', population: 753056, coordinates: [8.6821, 50.1109], continent: 'Europe' },
    { id: 'cologne-germany', city: 'Cologne', country: 'Germany', countryCode: 'DE', timezone: 'Europe/Berlin', population: 1085664, coordinates: [6.9603, 50.9375], continent: 'Europe' },
    { id: 'dusseldorf-germany', city: 'Düsseldorf', country: 'Germany', countryCode: 'DE', timezone: 'Europe/Berlin', population: 619294, coordinates: [6.7735, 51.2277], continent: 'Europe' },
    { id: 'amsterdam-netherlands', city: 'Amsterdam', country: 'Netherlands', countryCode: 'NL', timezone: 'Europe/Amsterdam', population: 872680, coordinates: [4.8952, 52.3676], continent: 'Europe' },
    { id: 'rotterdam-netherlands', city: 'Rotterdam', country: 'Netherlands', countryCode: 'NL', timezone: 'Europe/Amsterdam', population: 651446, coordinates: [4.4777, 51.9244], continent: 'Europe' },
    { id: 'vienna-austria', city: 'Vienna', country: 'Austria', countryCode: 'AT', timezone: 'Europe/Vienna', population: 1897491, coordinates: [16.3738, 48.2082], continent: 'Europe' },
    { id: 'zurich-switzerland', city: 'Zurich', country: 'Switzerland', countryCode: 'CH', timezone: 'Europe/Zurich', population: 415367, coordinates: [8.5417, 47.3769], continent: 'Europe' },
    { id: 'geneva-switzerland', city: 'Geneva', country: 'Switzerland', countryCode: 'CH', timezone: 'Europe/Zurich', population: 201818, coordinates: [6.1432, 46.2044], continent: 'Europe' },
    { id: 'brussels-belgium', city: 'Brussels', country: 'Belgium', countryCode: 'BE', timezone: 'Europe/Brussels', population: 1198726, coordinates: [4.3517, 50.8503], continent: 'Europe' },
    { id: 'stockholm-sweden', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', timezone: 'Europe/Stockholm', population: 975904, coordinates: [18.0686, 59.3293], continent: 'Europe' },
    { id: 'gothenburg-sweden', city: 'Gothenburg', country: 'Sweden', countryCode: 'SE', timezone: 'Europe/Stockholm', population: 583056, coordinates: [11.9746, 57.7089], continent: 'Europe' },
    { id: 'oslo-norway', city: 'Oslo', country: 'Norway', countryCode: 'NO', timezone: 'Europe/Oslo', population: 693494, coordinates: [10.7522, 59.9139], continent: 'Europe' },
    { id: 'copenhagen-denmark', city: 'Copenhagen', country: 'Denmark', countryCode: 'DK', timezone: 'Europe/Copenhagen', population: 799033, coordinates: [12.5683, 55.6761], continent: 'Europe' },
    { id: 'helsinki-finland', city: 'Helsinki', country: 'Finland', countryCode: 'FI', timezone: 'Europe/Helsinki', population: 653835, coordinates: [24.9384, 60.1699], continent: 'Europe' },
    { id: 'dublin-ireland', city: 'Dublin', country: 'Ireland', countryCode: 'IE', timezone: 'Europe/Dublin', population: 1173179, coordinates: [-6.2603, 53.3498], continent: 'Europe' },
    { id: 'lisbon-portugal', city: 'Lisbon', country: 'Portugal', countryCode: 'PT', timezone: 'Europe/Lisbon', population: 504718, coordinates: [-9.1393, 38.7223], continent: 'Europe' },
    { id: 'porto-portugal', city: 'Porto', country: 'Portugal', countryCode: 'PT', timezone: 'Europe/Lisbon', population: 237591, coordinates: [-8.6291, 41.1579], continent: 'Europe' },
    { id: 'athens-greece', city: 'Athens', country: 'Greece', countryCode: 'GR', timezone: 'Europe/Athens', population: 3153355, coordinates: [23.7275, 37.9838], continent: 'Europe' },
    { id: 'thessaloniki-greece', city: 'Thessaloniki', country: 'Greece', countryCode: 'GR', timezone: 'Europe/Athens', population: 824676, coordinates: [22.9444, 40.6401], continent: 'Europe' },
    { id: 'warsaw-poland', city: 'Warsaw', country: 'Poland', countryCode: 'PL', timezone: 'Europe/Warsaw', population: 1790658, coordinates: [21.0122, 52.2297], continent: 'Europe' },
    { id: 'krakow-poland', city: 'Krakow', country: 'Poland', countryCode: 'PL', timezone: 'Europe/Warsaw', population: 779115, coordinates: [19.9450, 50.0647], continent: 'Europe' },
    { id: 'prague-czech-republic', city: 'Prague', country: 'Czech Republic', countryCode: 'CZ', timezone: 'Europe/Prague', population: 1309000, coordinates: [14.4378, 50.0755], continent: 'Europe' },
    { id: 'budapest-hungary', city: 'Budapest', country: 'Hungary', countryCode: 'HU', timezone: 'Europe/Budapest', population: 1756000, coordinates: [19.0402, 47.4979], continent: 'Europe' },
    { id: 'bucharest-romania', city: 'Bucharest', country: 'Romania', countryCode: 'RO', timezone: 'Europe/Bucharest', population: 1883425, coordinates: [26.1025, 44.4268], continent: 'Europe' },
    { id: 'sofia-bulgaria', city: 'Sofia', country: 'Bulgaria', countryCode: 'BG', timezone: 'Europe/Sofia', population: 1241675, coordinates: [23.3219, 42.6977], continent: 'Europe' },
    { id: 'belgrade-serbia', city: 'Belgrade', country: 'Serbia', countryCode: 'RS', timezone: 'Europe/Belgrade', population: 1378682, coordinates: [20.4489, 44.7866], continent: 'Europe' },
    { id: 'zagreb-croatia', city: 'Zagreb', country: 'Croatia', countryCode: 'HR', timezone: 'Europe/Zagreb', population: 806341, coordinates: [15.9819, 45.8150], continent: 'Europe' },
    { id: 'kiev-ukraine', city: 'Kyiv', country: 'Ukraine', countryCode: 'UA', timezone: 'Europe/Kiev', population: 2884000, coordinates: [30.5234, 50.4501], continent: 'Europe' },
    { id: 'lyon-france', city: 'Lyon', country: 'France', countryCode: 'FR', timezone: 'Europe/Paris', population: 513275, coordinates: [4.8357, 45.7640], continent: 'Europe' },
    { id: 'marseille-france', city: 'Marseille', country: 'France', countryCode: 'FR', timezone: 'Europe/Paris', population: 861635, coordinates: [5.3698, 43.2965], continent: 'Europe' },
    { id: 'nice-france', city: 'Nice', country: 'France', countryCode: 'FR', timezone: 'Europe/Paris', population: 342522, coordinates: [7.2620, 43.7102], continent: 'Europe' },
    { id: 'manchester-uk', city: 'Manchester', country: 'United Kingdom', countryCode: 'GB', timezone: 'Europe/London', population: 547627, coordinates: [-2.2426, 53.4808], continent: 'Europe' },
    { id: 'birmingham-uk', city: 'Birmingham', country: 'United Kingdom', countryCode: 'GB', timezone: 'Europe/London', population: 1141816, coordinates: [-1.8904, 52.4862], continent: 'Europe' },
    { id: 'glasgow-uk', city: 'Glasgow', country: 'United Kingdom', countryCode: 'GB', timezone: 'Europe/London', population: 626410, coordinates: [-4.2518, 55.8642], continent: 'Europe' },
    { id: 'edinburgh-uk', city: 'Edinburgh', country: 'United Kingdom', countryCode: 'GB', timezone: 'Europe/London', population: 488050, coordinates: [-3.1883, 55.9533], continent: 'Europe' },
    { id: 'liverpool-uk', city: 'Liverpool', country: 'United Kingdom', countryCode: 'GB', timezone: 'Europe/London', population: 494814, coordinates: [-2.9916, 53.4084], continent: 'Europe' },

    // AFRICA - Major Cities
    { id: 'cairo-egypt', city: 'Cairo', country: 'Egypt', countryCode: 'EG', timezone: 'Africa/Cairo', population: 20076000, coordinates: [31.2357, 30.0444], continent: 'Africa' },
    { id: 'lagos-nigeria', city: 'Lagos', country: 'Nigeria', countryCode: 'NG', timezone: 'Africa/Lagos', population: 14368000, coordinates: [3.3792, 6.5244], continent: 'Africa' },
    { id: 'kinshasa-congo', city: 'Kinshasa', country: 'DR Congo', countryCode: 'CD', timezone: 'Africa/Kinshasa', population: 14342000, coordinates: [15.2663, -4.4419], continent: 'Africa' },
    { id: 'johannesburg-south-africa', city: 'Johannesburg', country: 'South Africa', countryCode: 'ZA', timezone: 'Africa/Johannesburg', population: 5635000, coordinates: [28.0473, -26.2041], continent: 'Africa' },
    { id: 'cape-town-south-africa', city: 'Cape Town', country: 'South Africa', countryCode: 'ZA', timezone: 'Africa/Johannesburg', population: 4618000, coordinates: [18.4241, -33.9249], continent: 'Africa' },
    { id: 'durban-south-africa', city: 'Durban', country: 'South Africa', countryCode: 'ZA', timezone: 'Africa/Johannesburg', population: 3720000, coordinates: [31.0218, -29.8587], continent: 'Africa' },
    { id: 'nairobi-kenya', city: 'Nairobi', country: 'Kenya', countryCode: 'KE', timezone: 'Africa/Nairobi', population: 4397073, coordinates: [36.8219, -1.2921], continent: 'Africa' },
    { id: 'casablanca-morocco', city: 'Casablanca', country: 'Morocco', countryCode: 'MA', timezone: 'Africa/Casablanca', population: 3359818, coordinates: [-7.5898, 33.5731], continent: 'Africa' },
    { id: 'marrakech-morocco', city: 'Marrakech', country: 'Morocco', countryCode: 'MA', timezone: 'Africa/Casablanca', population: 928850, coordinates: [-7.9811, 31.6295], continent: 'Africa' },
    { id: 'algiers-algeria', city: 'Algiers', country: 'Algeria', countryCode: 'DZ', timezone: 'Africa/Algiers', population: 3415811, coordinates: [3.0588, 36.7538], continent: 'Africa' },
    { id: 'addis-ababa-ethiopia', city: 'Addis Ababa', country: 'Ethiopia', countryCode: 'ET', timezone: 'Africa/Addis_Ababa', population: 3352000, coordinates: [38.7578, 9.0320], continent: 'Africa' },
    { id: 'abidjan-ivory-coast', city: 'Abidjan', country: 'Ivory Coast', countryCode: 'CI', timezone: 'Africa/Abidjan', population: 4707000, coordinates: [-4.0083, 5.3600], continent: 'Africa' },
    { id: 'accra-ghana', city: 'Accra', country: 'Ghana', countryCode: 'GH', timezone: 'Africa/Accra', population: 2291352, coordinates: [-0.1870, 5.6037], continent: 'Africa' },
    { id: 'dakar-senegal', city: 'Dakar', country: 'Senegal', countryCode: 'SN', timezone: 'Africa/Dakar', population: 2476400, coordinates: [-17.4677, 14.7167], continent: 'Africa' },
    { id: 'dar-es-salaam-tanzania', city: 'Dar es Salaam', country: 'Tanzania', countryCode: 'TZ', timezone: 'Africa/Dar_es_Salaam', population: 4364541, coordinates: [39.2083, -6.7924], continent: 'Africa' },
    { id: 'tunis-tunisia', city: 'Tunis', country: 'Tunisia', countryCode: 'TN', timezone: 'Africa/Tunis', population: 2643695, coordinates: [10.1658, 36.8065], continent: 'Africa' },
    { id: 'kampala-uganda', city: 'Kampala', country: 'Uganda', countryCode: 'UG', timezone: 'Africa/Kampala', population: 1680600, coordinates: [32.5825, 0.3476], continent: 'Africa' },
    { id: 'lusaka-zambia', city: 'Lusaka', country: 'Zambia', countryCode: 'ZM', timezone: 'Africa/Lusaka', population: 1747152, coordinates: [28.3228, -15.4067], continent: 'Africa' },
    { id: 'harare-zimbabwe', city: 'Harare', country: 'Zimbabwe', countryCode: 'ZW', timezone: 'Africa/Harare', population: 1606000, coordinates: [31.0492, -17.8292], continent: 'Africa' },

    // SOUTH AMERICA - Major Cities
    { id: 'sao-paulo-brazil', city: 'São Paulo', country: 'Brazil', countryCode: 'BR', timezone: 'America/Sao_Paulo', population: 21650000, coordinates: [-46.6333, -23.5505], continent: 'South America' },
    { id: 'buenos-aires-argentina', city: 'Buenos Aires', country: 'Argentina', countryCode: 'AR', timezone: 'America/Argentina/Buenos_Aires', population: 14967000, coordinates: [-58.3816, -34.6037], continent: 'South America' },
    { id: 'rio-de-janeiro-brazil', city: 'Rio de Janeiro', country: 'Brazil', countryCode: 'BR', timezone: 'America/Sao_Paulo', population: 13458000, coordinates: [-43.1729, -22.9068], continent: 'South America' },
    { id: 'lima-peru', city: 'Lima', country: 'Peru', countryCode: 'PE', timezone: 'America/Lima', population: 10391000, coordinates: [-77.0428, -12.0464], continent: 'South America' },
    { id: 'bogota-colombia', city: 'Bogotá', country: 'Colombia', countryCode: 'CO', timezone: 'America/Bogota', population: 10574000, coordinates: [-74.0721, 4.7110], continent: 'South America' },
    { id: 'santiago-chile', city: 'Santiago', country: 'Chile', countryCode: 'CL', timezone: 'America/Santiago', population: 6680000, coordinates: [-70.6693, -33.4489], continent: 'South America' },
    { id: 'caracas-venezuela', city: 'Caracas', country: 'Venezuela', countryCode: 'VE', timezone: 'America/Caracas', population: 2935000, coordinates: [-66.9036, 10.4806], continent: 'South America' },
    { id: 'medellin-colombia', city: 'Medellín', country: 'Colombia', countryCode: 'CO', timezone: 'America/Bogota', population: 3934000, coordinates: [-75.5636, 6.2442], continent: 'South America' },
    { id: 'belo-horizonte-brazil', city: 'Belo Horizonte', country: 'Brazil', countryCode: 'BR', timezone: 'America/Sao_Paulo', population: 5972000, coordinates: [-43.9345, -19.9167], continent: 'South America' },
    { id: 'brasilia-brazil', city: 'Brasília', country: 'Brazil', countryCode: 'BR', timezone: 'America/Sao_Paulo', population: 4291577, coordinates: [-47.8823, -15.7942], continent: 'South America' },
    { id: 'salvador-brazil', city: 'Salvador', country: 'Brazil', countryCode: 'BR', timezone: 'America/Bahia', population: 3968000, coordinates: [-38.5108, -12.9714], continent: 'South America' },
    { id: 'fortaleza-brazil', city: 'Fortaleza', country: 'Brazil', countryCode: 'BR', timezone: 'America/Fortaleza', population: 4019000, coordinates: [-38.5434, -3.7172], continent: 'South America' },
    { id: 'montevideo-uruguay', city: 'Montevideo', country: 'Uruguay', countryCode: 'UY', timezone: 'America/Montevideo', population: 1947604, coordinates: [-56.1645, -34.9011], continent: 'South America' },
    { id: 'quito-ecuador', city: 'Quito', country: 'Ecuador', countryCode: 'EC', timezone: 'America/Guayaquil', population: 2781641, coordinates: [-78.4678, -0.1807], continent: 'South America' },
    { id: 'guayaquil-ecuador', city: 'Guayaquil', country: 'Ecuador', countryCode: 'EC', timezone: 'America/Guayaquil', population: 2723665, coordinates: [-79.9224, -2.1710], continent: 'South America' },
    { id: 'la-paz-bolivia', city: 'La Paz', country: 'Bolivia', countryCode: 'BO', timezone: 'America/La_Paz', population: 812799, coordinates: [-68.1193, -16.4897], continent: 'South America' },
    { id: 'asuncion-paraguay', city: 'Asunción', country: 'Paraguay', countryCode: 'PY', timezone: 'America/Asuncion', population: 525294, coordinates: [-57.5759, -25.2637], continent: 'South America' },
    { id: 'curitiba-brazil', city: 'Curitiba', country: 'Brazil', countryCode: 'BR', timezone: 'America/Sao_Paulo', population: 3587000, coordinates: [-49.2654, -25.4284], continent: 'South America' },
    { id: 'recife-brazil', city: 'Recife', country: 'Brazil', countryCode: 'BR', timezone: 'America/Recife', population: 4054000, coordinates: [-34.8811, -8.0476], continent: 'South America' },
    { id: 'porto-alegre-brazil', city: 'Porto Alegre', country: 'Brazil', countryCode: 'BR', timezone: 'America/Sao_Paulo', population: 4268000, coordinates: [-51.2177, -30.0346], continent: 'South America' },

    // NORTH AMERICA (non-US) - Major Cities
    { id: 'mexico-city-mexico', city: 'Mexico City', country: 'Mexico', countryCode: 'MX', timezone: 'America/Mexico_City', population: 21671908, coordinates: [-99.1332, 19.4326], continent: 'North America' },
    { id: 'toronto-canada', city: 'Toronto', country: 'Canada', countryCode: 'CA', timezone: 'America/Toronto', population: 6197000, coordinates: [-79.3832, 43.6532], continent: 'North America' },
    { id: 'montreal-canada', city: 'Montreal', country: 'Canada', countryCode: 'CA', timezone: 'America/Montreal', population: 4098000, coordinates: [-73.5673, 45.5017], continent: 'North America' },
    { id: 'vancouver-canada', city: 'Vancouver', country: 'Canada', countryCode: 'CA', timezone: 'America/Vancouver', population: 2581000, coordinates: [-123.1207, 49.2827], continent: 'North America' },
    { id: 'calgary-canada', city: 'Calgary', country: 'Canada', countryCode: 'CA', timezone: 'America/Edmonton', population: 1481000, coordinates: [-114.0719, 51.0447], continent: 'North America' },
    { id: 'ottawa-canada', city: 'Ottawa', country: 'Canada', countryCode: 'CA', timezone: 'America/Toronto', population: 1393000, coordinates: [-75.6972, 45.4215], continent: 'North America' },
    { id: 'edmonton-canada', city: 'Edmonton', country: 'Canada', countryCode: 'CA', timezone: 'America/Edmonton', population: 1461000, coordinates: [-113.4938, 53.5461], continent: 'North America' },
    { id: 'guadalajara-mexico', city: 'Guadalajara', country: 'Mexico', countryCode: 'MX', timezone: 'America/Mexico_City', population: 5023000, coordinates: [-103.3496, 20.6597], continent: 'North America' },
    { id: 'monterrey-mexico', city: 'Monterrey', country: 'Mexico', countryCode: 'MX', timezone: 'America/Monterrey', population: 4689000, coordinates: [-100.3161, 25.6866], continent: 'North America' },
    { id: 'puebla-mexico', city: 'Puebla', country: 'Mexico', countryCode: 'MX', timezone: 'America/Mexico_City', population: 2984000, coordinates: [-98.2063, 19.0414], continent: 'North America' },
    { id: 'tijuana-mexico', city: 'Tijuana', country: 'Mexico', countryCode: 'MX', timezone: 'America/Tijuana', population: 1922523, coordinates: [-117.0382, 32.5149], continent: 'North America' },
    { id: 'havana-cuba', city: 'Havana', country: 'Cuba', countryCode: 'CU', timezone: 'America/Havana', population: 2130000, coordinates: [-82.3666, 23.1136], continent: 'North America' },
    { id: 'santo-domingo-dominican-republic', city: 'Santo Domingo', country: 'Dominican Republic', countryCode: 'DO', timezone: 'America/Santo_Domingo', population: 2201941, coordinates: [-69.9312, 18.4861], continent: 'North America' },
    { id: 'guatemala-city-guatemala', city: 'Guatemala City', country: 'Guatemala', countryCode: 'GT', timezone: 'America/Guatemala', population: 2851741, coordinates: [-90.5069, 14.6349], continent: 'North America' },
    { id: 'san-jose-costa-rica', city: 'San José', country: 'Costa Rica', countryCode: 'CR', timezone: 'America/Costa_Rica', population: 1515000, coordinates: [-84.0907, 9.9281], continent: 'North America' },
    { id: 'panama-city-panama', city: 'Panama City', country: 'Panama', countryCode: 'PA', timezone: 'America/Panama', population: 880691, coordinates: [-79.5199, 8.9824], continent: 'North America' },
    { id: 'kingston-jamaica', city: 'Kingston', country: 'Jamaica', countryCode: 'JM', timezone: 'America/Jamaica', population: 662426, coordinates: [-76.7936, 17.9714], continent: 'North America' },
    { id: 'port-au-prince-haiti', city: 'Port-au-Prince', country: 'Haiti', countryCode: 'HT', timezone: 'America/Port-au-Prince', population: 987310, coordinates: [-72.3074, 18.5944], continent: 'North America' },
    { id: 'winnipeg-canada', city: 'Winnipeg', country: 'Canada', countryCode: 'CA', timezone: 'America/Winnipeg', population: 778500, coordinates: [-97.1384, 49.8951], continent: 'North America' },
    { id: 'quebec-city-canada', city: 'Quebec City', country: 'Canada', countryCode: 'CA', timezone: 'America/Montreal', population: 705103, coordinates: [-71.2080, 46.8139], continent: 'North America' },

    // OCEANIA - Major Cities
    { id: 'sydney-australia', city: 'Sydney', country: 'Australia', countryCode: 'AU', timezone: 'Australia/Sydney', population: 5312163, coordinates: [151.2093, -33.8688], continent: 'Oceania' },
    { id: 'melbourne-australia', city: 'Melbourne', country: 'Australia', countryCode: 'AU', timezone: 'Australia/Melbourne', population: 5078193, coordinates: [144.9631, -37.8136], continent: 'Oceania' },
    { id: 'brisbane-australia', city: 'Brisbane', country: 'Australia', countryCode: 'AU', timezone: 'Australia/Brisbane', population: 2514184, coordinates: [153.0251, -27.4698], continent: 'Oceania' },
    { id: 'perth-australia', city: 'Perth', country: 'Australia', countryCode: 'AU', timezone: 'Australia/Perth', population: 2085973, coordinates: [115.8605, -31.9505], continent: 'Oceania' },
    { id: 'adelaide-australia', city: 'Adelaide', country: 'Australia', countryCode: 'AU', timezone: 'Australia/Adelaide', population: 1359760, coordinates: [138.6007, -34.9285], continent: 'Oceania' },
    { id: 'gold-coast-australia', city: 'Gold Coast', country: 'Australia', countryCode: 'AU', timezone: 'Australia/Brisbane', population: 699564, coordinates: [153.4000, -28.0167], continent: 'Oceania' },
    { id: 'auckland-new-zealand', city: 'Auckland', country: 'New Zealand', countryCode: 'NZ', timezone: 'Pacific/Auckland', population: 1657000, coordinates: [174.7633, -36.8485], continent: 'Oceania' },
    { id: 'wellington-new-zealand', city: 'Wellington', country: 'New Zealand', countryCode: 'NZ', timezone: 'Pacific/Auckland', population: 215400, coordinates: [174.7762, -41.2865], continent: 'Oceania' },
    { id: 'christchurch-new-zealand', city: 'Christchurch', country: 'New Zealand', countryCode: 'NZ', timezone: 'Pacific/Auckland', population: 381500, coordinates: [172.6362, -43.5321], continent: 'Oceania' },
    { id: 'canberra-australia', city: 'Canberra', country: 'Australia', countryCode: 'AU', timezone: 'Australia/Sydney', population: 462213, coordinates: [149.1300, -35.2809], continent: 'Oceania' },
    { id: 'hobart-australia', city: 'Hobart', country: 'Australia', countryCode: 'AU', timezone: 'Australia/Hobart', population: 238834, coordinates: [147.3272, -42.8821], continent: 'Oceania' },
    { id: 'darwin-australia', city: 'Darwin', country: 'Australia', countryCode: 'AU', timezone: 'Australia/Darwin', population: 147255, coordinates: [130.8456, -12.4634], continent: 'Oceania' },
    { id: 'suva-fiji', city: 'Suva', country: 'Fiji', countryCode: 'FJ', timezone: 'Pacific/Fiji', population: 93970, coordinates: [178.4419, -18.1416], continent: 'Oceania' },
    { id: 'port-moresby-papua-new-guinea', city: 'Port Moresby', country: 'Papua New Guinea', countryCode: 'PG', timezone: 'Pacific/Port_Moresby', population: 364125, coordinates: [147.1803, -9.4438], continent: 'Oceania' },

    // Additional Asian Cities
    { id: 'surabaya-indonesia', city: 'Surabaya', country: 'Indonesia', countryCode: 'ID', timezone: 'Asia/Jakarta', population: 2874314, coordinates: [112.7508, -7.2575], continent: 'Asia' },
    { id: 'bandung-indonesia', city: 'Bandung', country: 'Indonesia', countryCode: 'ID', timezone: 'Asia/Jakarta', population: 2575478, coordinates: [107.6191, -6.9175], continent: 'Asia' },
    { id: 'medan-indonesia', city: 'Medan', country: 'Indonesia', countryCode: 'ID', timezone: 'Asia/Jakarta', population: 2097610, coordinates: [98.6722, 3.5952], continent: 'Asia' },
    { id: 'nanjing-china', city: 'Nanjing', country: 'China', countryCode: 'CN', timezone: 'Asia/Shanghai', population: 8505500, coordinates: [118.7969, 32.0603], continent: 'Asia' },
    { id: 'xian-china', city: "Xi'an", country: 'China', countryCode: 'CN', timezone: 'Asia/Shanghai', population: 8705600, coordinates: [108.9402, 34.3416], continent: 'Asia' },
    { id: 'chongqing-china', city: 'Chongqing', country: 'China', countryCode: 'CN', timezone: 'Asia/Shanghai', population: 14838000, coordinates: [106.5516, 29.5630], continent: 'Asia' },
    { id: 'dongguan-china', city: 'Dongguan', country: 'China', countryCode: 'CN', timezone: 'Asia/Shanghai', population: 8342500, coordinates: [113.7518, 23.0207], continent: 'Asia' },
    { id: 'shenyang-china', city: 'Shenyang', country: 'China', countryCode: 'CN', timezone: 'Asia/Shanghai', population: 8294000, coordinates: [123.4315, 41.8057], continent: 'Asia' },
    { id: 'qingdao-china', city: 'Qingdao', country: 'China', countryCode: 'CN', timezone: 'Asia/Shanghai', population: 6188100, coordinates: [120.3826, 36.0671], continent: 'Asia' },
    { id: 'zhengzhou-china', city: 'Zhengzhou', country: 'China', countryCode: 'CN', timezone: 'Asia/Shanghai', population: 7044300, coordinates: [113.6254, 34.7466], continent: 'Asia' },
    { id: 'tehran-iran', city: 'Tehran', country: 'Iran', countryCode: 'IR', timezone: 'Asia/Tehran', population: 8693706, coordinates: [51.3890, 35.6892], continent: 'Asia' },
    { id: 'baghdad-iraq', city: 'Baghdad', country: 'Iraq', countryCode: 'IQ', timezone: 'Asia/Baghdad', population: 6719500, coordinates: [44.3661, 33.3152], continent: 'Asia' },
    { id: 'amman-jordan', city: 'Amman', country: 'Jordan', countryCode: 'JO', timezone: 'Asia/Amman', population: 4007526, coordinates: [35.9106, 31.9454], continent: 'Asia' },
    { id: 'beirut-lebanon', city: 'Beirut', country: 'Lebanon', countryCode: 'LB', timezone: 'Asia/Beirut', population: 2424925, coordinates: [35.5018, 33.8938], continent: 'Asia' },
    { id: 'muscat-oman', city: 'Muscat', country: 'Oman', countryCode: 'OM', timezone: 'Asia/Muscat', population: 1422000, coordinates: [58.4059, 23.5880], continent: 'Asia' },
    { id: 'kathmandu-nepal', city: 'Kathmandu', country: 'Nepal', countryCode: 'NP', timezone: 'Asia/Kathmandu', population: 1442271, coordinates: [85.3240, 27.7172], continent: 'Asia' },
    { id: 'colombo-sri-lanka', city: 'Colombo', country: 'Sri Lanka', countryCode: 'LK', timezone: 'Asia/Colombo', population: 752993, coordinates: [79.8612, 6.9271], continent: 'Asia' },
    { id: 'phnom-penh-cambodia', city: 'Phnom Penh', country: 'Cambodia', countryCode: 'KH', timezone: 'Asia/Phnom_Penh', population: 2129371, coordinates: [104.9282, 11.5564], continent: 'Asia' },
    { id: 'vientiane-laos', city: 'Vientiane', country: 'Laos', countryCode: 'LA', timezone: 'Asia/Vientiane', population: 948477, coordinates: [102.6331, 17.9757], continent: 'Asia' },
    { id: 'ulaanbaatar-mongolia', city: 'Ulaanbaatar', country: 'Mongolia', countryCode: 'MN', timezone: 'Asia/Ulaanbaatar', population: 1396288, coordinates: [106.9057, 47.8864], continent: 'Asia' },
];

// Helper function to get city by ID
export function getWorldCityById(id: string): WorldCity | undefined {
    return WORLD_CITIES.find(city => city.id === id);
}

// Get cities by country
export function getWorldCitiesByCountry(countryCode: string): WorldCity[] {
    return WORLD_CITIES.filter(city => city.countryCode === countryCode);
}

// Get cities by continent
export function getWorldCitiesByContinent(continent: string): WorldCity[] {
    return WORLD_CITIES.filter(city => city.continent === continent);
}

// Get all unique countries
export function getUniqueCountries(): { code: string; name: string; count: number }[] {
    const countries = new Map<string, { name: string; count: number }>();
    WORLD_CITIES.forEach(city => {
        const existing = countries.get(city.countryCode);
        if (existing) {
            existing.count++;
        } else {
            countries.set(city.countryCode, { name: city.country, count: 1 });
        }
    });
    return Array.from(countries.entries()).map(([code, data]) => ({
        code,
        name: data.name,
        count: data.count
    })).sort((a, b) => b.count - a.count);
}
