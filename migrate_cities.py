import re
import json

# State code to name mapping
state_map = {
    'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California',
    'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'FL': 'Florida', 'GA': 'Georgia',
    'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
    'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
    'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri',
    'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey',
    'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio',
    'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
    'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont',
    'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming',
    'DC': 'District of Columbia'
}

def parse_ts_object(content):
    # Very basic regex parsing for the specific format in these files
    # Expecting: { name: "New York", state: "NY", ... }
    # or: { \n id: 'new-york-ny', \n ... }
    
    # We will just treat the files as text and extract the list content manually
    pass

# Read original file (300+ cities)
with open('src/data/usCities.ts', 'r') as f:
    old_content = f.read()

# Extract list items
# Pattern: { name: "...", state: "...", ... }
old_cities = []
matches = re.finditer(r'{\s*name:\s*"([^"]+)",\s*state:\s*"([^"]+)",\s*population:\s*(\d+),\s*timezone:\s*"([^"]+)",\s*slug:\s*"([^"]+)"\s*}', old_content)

for m in matches:
    name, state_code, pop, tz, slug = m.groups()
    old_cities.append({
        'city': name,
        'state_code': state_code,
        'state': state_map.get(state_code, state_code),
        'population': int(pop),
        'timezone': tz,
        'slug': slug,
        'id': f"{name.lower().replace(' ', '-')}-{state_code.lower()}"
    })

# Read new file (high quality properties)
# We'll just read the file and extract items semi-manually to preserve coordinates
with open('src/data/us-cities.ts', 'r') as f:
    new_content = f.read()

# Pattern for new file is more complex (multi-line)
# We will cheat and construct the final file by string concatenation
# First, let's just create the list of cities in valid TS object format

merged_cities = {}

# Add high quality cities first
# Parsing src/data/us-cities.ts to get the list of existing high-quality cities is tricky with regex.
# Let's just hardcode the ones we saw in the view_file (or assume we want to keep them).
# Actually, the view_file output showed a good number of them.
# Providing a "smart" merge is better.

# Let's extract the array content from us-cities.ts
start_marker = "export const US_CITIES: USCity[] = ["
end_marker = "];"
start_idx = new_content.find(start_marker) + len(start_marker)
end_idx = new_content.find(end_marker, start_idx)
existing_array_content = new_content[start_idx:end_idx].strip()

# We will keep the existing array content string as is, removing the last comma if needed?
# Actually, let's just Append the migrated cities to it.
# But we need to avoid duplicates.

# Extract IDs from existing content to avoid dupes
existing_ids = set(re.findall(r"id:\s*'([^']+)'", existing_array_content))

to_append = []

for city in old_cities:
    if city['id'] in existing_ids:
        continue
    
    # Create object string
    obj_str = "  {\n"
    obj_str += f"    id: '{city['id']}',\n"
    obj_str += f"    city: \"{city['city']}\",\n"
    obj_str += f"    state: \"{city['state']}\",\n"
    obj_str += f"    state_code: '{city['state_code']}',\n"
    obj_str += f"    population: {city['population']},\n"
    obj_str += f"    coordinates: [0, 0], // Placeholder\n"
    obj_str += f"    timezone: '{city['timezone']}'\n"
    obj_str += "  }"
    to_append.append(obj_str)

# Join everything
final_array_content = existing_array_content
if to_append:
    if not final_array_content.strip().endswith(','):
        final_array_content += ","
    final_array_content += "\n" + ",\n".join(to_append)

# Construct final file
final_file = """export interface USCity {
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
""" + final_array_content + """
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
"""

with open('src/data/us-cities.ts', 'w') as f:
    f.write(final_file)

print("Migration complete.")
