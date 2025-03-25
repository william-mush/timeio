'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface CityMarker {
  id: string;
  city: string;
  country: string;
  coordinates: [number, number];
  offset: number;
  type: 'city' | 'landmark';
  description?: string;
  state?: string;
  region?: string;
}

// City coordinates [longitude, latitude]
const CITY_MARKERS: CityMarker[] = [
  // Major Cities (keeping existing ones)
  { id: 'nyc', type: 'city', city: 'New York', country: 'USA', coordinates: [-74.006, 40.7128], offset: -4 },
  { id: 'london', type: 'city', city: 'London', country: 'UK', coordinates: [-0.1276, 51.5074], offset: 1 },
  { id: 'paris', type: 'city', city: 'Paris', country: 'France', coordinates: [2.3522, 48.8566], offset: 2 },
  { id: 'tokyo', type: 'city', city: 'Tokyo', country: 'Japan', coordinates: [139.6917, 35.6895], offset: 9 },
  
  // Famous Historical Sites
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
  
  // Modern Landmarks
  { id: 'statue_liberty', type: 'landmark', city: 'Statue of Liberty', country: 'USA', coordinates: [-74.0445, 40.6892], offset: -4, description: 'Iconic symbol of freedom and democracy' },
  { id: 'christ_redeemer', type: 'landmark', city: 'Christ the Redeemer', country: 'Brazil', coordinates: [-43.2104, -22.9519], offset: -3, description: 'Art Deco statue of Jesus Christ' },
  { id: 'sydney_opera', type: 'landmark', city: 'Sydney Opera House', country: 'Australia', coordinates: [151.2153, -33.8568], offset: 11, description: 'Iconic performing arts venue' },
  { id: 'burj_khalifa', type: 'landmark', city: 'Burj Khalifa', country: 'UAE', coordinates: [55.2744, 25.1972], offset: 4, description: "World's tallest building" },
  { id: 'golden_gate', type: 'landmark', city: 'Golden Gate Bridge', country: 'USA', coordinates: [-122.4786, 37.8199], offset: -7, description: 'Iconic suspension bridge' },
  
  // Cultural Sites
  { id: 'forbidden_city', type: 'landmark', city: 'Forbidden City', country: 'China', coordinates: [116.3972, 39.9169], offset: 8, description: 'Imperial palace complex of Chinese emperors' },
  { id: 'vatican', type: 'landmark', city: 'Vatican City', country: 'Vatican', coordinates: [12.4534, 41.9029], offset: 2, description: 'Center of the Roman Catholic Church' },
  { id: 'red_square', type: 'landmark', city: 'Red Square', country: 'Russia', coordinates: [37.6205, 55.7539], offset: 3, description: 'City square in Moscow with iconic architecture' },
  { id: 'petra_treasury', type: 'landmark', city: 'Petra Treasury', country: 'Jordan', coordinates: [35.4444, 30.3285], offset: 3, description: 'Ancient temple carved into rose-colored rock' },
  { id: 'alhambra', type: 'landmark', city: 'Alhambra', country: 'Spain', coordinates: [-3.5886, 37.1760], offset: 2, description: 'Palace and fortress complex from Islamic period' },
  
  // Archaeological Sites
  { id: 'pompeii', type: 'landmark', city: 'Pompeii', country: 'Italy', coordinates: [14.4851, 40.7508], offset: 2, description: 'Ancient Roman city preserved by volcanic eruption' },
  { id: 'chichen_itza', type: 'landmark', city: 'Chichen Itza', country: 'Mexico', coordinates: [-88.5686, 20.6843], offset: -5, description: 'Ancient Maya city with pyramid temple' },
  { id: 'persepolis', type: 'landmark', city: 'Persepolis', country: 'Iran', coordinates: [52.8847, 29.9333], offset: 3.5, description: 'Ceremonial capital of ancient Persian Empire' },
  { id: 'mohenjo_daro', type: 'landmark', city: 'Mohenjo-daro', country: 'Pakistan', coordinates: [68.1376, 27.3255], offset: 5, description: 'Ancient Indus Valley Civilization city' },
  { id: 'terracotta', type: 'landmark', city: 'Terracotta Army', country: 'China', coordinates: [109.2866, 34.3844], offset: 8, description: 'Ancient clay warrior army of Emperor Qin' }
];

export const WorldMap = () => {
  const [selectedCity, setSelectedCity] = useState<CityMarker | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [filter, setFilter] = useState<'all' | 'city' | 'landmark'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCoordinateSearch, setIsCoordinateSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<CityMarker[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTimeInZone = (offset: number) => {
    const localTime = currentTime.getTime();
    const localOffset = currentTime.getTimezoneOffset() * 60000;
    const targetTime = new Date(localTime + localOffset + (offset * 3600000));
    return targetTime;
  };

  const formatTime = (date: Date) => {
    const time12h = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);

    const time24h = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);

    return { time12h, time24h };
  };

  const longToX = (long: number): number => {
    return ((long + 180) * 800) / 360;
  };

  const latToY = (lat: number): number => {
    return ((90 - lat) * 400) / 180;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setShowSearchResults(false);
      return;
    }

    // Check for coordinate search first
    const coordPattern = /^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/;
    const coordMatch = query.match(coordPattern);

    if (coordMatch) {
      const lat = parseFloat(coordMatch[1]);
      const long = parseFloat(coordMatch[2]);
      
      if (lat >= -90 && lat <= 90 && long >= -180 && long <= 180) {
        setIsCoordinateSearch(true);
        const nearest = findNearestLocation(lat, long);
        if (nearest) {
          setSelectedCity(nearest);
          setSearchResults([nearest]);
          setShowSearchResults(true);
        }
        return;
      }
    }

    setIsCoordinateSearch(false);
    
    // Regular search
    const searchLower = query.toLowerCase();
    const results = CITY_MARKERS.filter(marker => 
      marker.city.toLowerCase().includes(searchLower) ||
      marker.country.toLowerCase().includes(searchLower) ||
      marker.state?.toLowerCase().includes(searchLower) ||
      marker.region?.toLowerCase().includes(searchLower) ||
      marker.description?.toLowerCase().includes(searchLower)
    );

    setSearchResults(results);
    setShowSearchResults(true);
  };

  const findNearestLocation = (lat: number, long: number) => {
    return CITY_MARKERS.reduce((nearest, marker) => {
      const distance = Math.sqrt(
        Math.pow(marker.coordinates[1] - lat, 2) + 
        Math.pow(marker.coordinates[0] - long, 2)
      );
      
      if (!nearest || distance < nearest.distance) {
        return { marker, distance };
      }
      return nearest;
    }, null as { marker: CityMarker; distance: number } | null)?.marker;
  };

  const filteredMarkers = useMemo(() => {
    const filtered = CITY_MARKERS.filter(marker => {
      if (filter !== 'all' && marker.type !== filter) return false;
      
      if (!searchQuery) return true;

      const searchLower = searchQuery.toLowerCase();
      return (
        marker.city.toLowerCase().includes(searchLower) ||
        marker.country.toLowerCase().includes(searchLower) ||
        marker.state?.toLowerCase().includes(searchLower) ||
        marker.region?.toLowerCase().includes(searchLower) ||
        marker.description?.toLowerCase().includes(searchLower)
      );
    });

    return filtered;
  }, [filter, searchQuery]);

  return (
    <div className="relative w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by city, country, region, or coordinates (lat,long)"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => {
              if (searchQuery) setShowSearchResults(true);
            }}
          />
          
          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-start space-x-3"
                  onClick={() => {
                    setSelectedCity(result);
                    setShowSearchResults(false);
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{result.city}</div>
                    <div className="text-sm text-gray-500 truncate">{result.country}</div>
                    {result.description && (
                      <div className="text-xs text-gray-400 truncate">{result.description}</div>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    GMT {result.offset >= 0 ? '+' : ''}{result.offset}
                  </div>
                </button>
              ))}
            </div>
          )}

          {showSearchResults && searchResults.length === 0 && searchQuery && (
            <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg p-4 text-center text-gray-500">
              No results found
            </div>
          )}
        </div>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('city')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'city' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Cities
          </button>
          <button
            onClick={() => setFilter('landmark')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'landmark' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Landmarks
          </button>
        </div>
      </div>

      <div className="relative">
        <svg
          viewBox="0 0 800 400"
          className="w-full h-auto border rounded-lg"
          style={{ background: '#f8fafc' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Add map boundary */}
          <rect
            x="0"
            y="0"
            width="800"
            height="400"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="2"
          />

          {/* Longitude lines */}
          {Array.from({ length: 24 }, (_, i) => {
            const x = (i * 800) / 24;
            return (
              <line
                key={i}
                x1={x}
                y1={0}
                x2={x}
                y2={400}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
            );
          })}

          {/* Latitude lines */}
          {Array.from({ length: 12 }, (_, i) => {
            const y = (i * 400) / 12;
            return (
              <line
                key={`lat-${i}`}
                x1={0}
                y1={y}
                x2={800}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
            );
          })}

          {/* Equator line (highlighted) */}
          <line
            x1={0}
            y1={200}
            x2={800}
            y2={200}
            stroke="#94a3b8"
            strokeWidth="1.5"
          />

          {/* Prime meridian (highlighted) */}
          <line
            x1={400}
            y1={0}
            x2={400}
            y2={400}
            stroke="#94a3b8"
            strokeWidth="1.5"
          />

          {filteredMarkers.map((marker) => (
            <g key={marker.id}>
              <motion.circle
                cx={longToX(marker.coordinates[0])}
                cy={latToY(marker.coordinates[1])}
                r={6}
                fill={selectedCity?.id === marker.id 
                  ? '#3b82f6' 
                  : marker.type === 'landmark' ? '#ef4444' : '#64748b'}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer"
                onClick={() => setSelectedCity(marker)}
                whileHover={{ scale: 1.5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
            </g>
          ))}
        </svg>

        {selectedCity && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bg-white rounded-lg shadow-lg p-4 border"
            style={{
              left: `${longToX(selectedCity.coordinates[0])}px`,
              top: `${latToY(selectedCity.coordinates[1]) + 20}px`,
              transform: 'translate(-50%, 0)',
              zIndex: 10,
            }}
          >
            <h3 className="font-semibold">{selectedCity.city}</h3>
            <p className="text-gray-600">{selectedCity.country}</p>
            {selectedCity.description && (
              <p className="text-gray-500 text-sm">{selectedCity.description}</p>
            )}
            <div className="mt-2">
              <p className="text-2xl font-mono">{formatTime(getTimeInZone(selectedCity.offset)).time24h}</p>
              <p className="text-lg font-mono text-gray-600">{formatTime(getTimeInZone(selectedCity.offset)).time12h}</p>
            </div>
            <p className="text-sm text-gray-500">
              GMT {selectedCity.offset >= 0 ? '+' : ''}{selectedCity.offset}
            </p>
          </motion.div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {filteredMarkers.map((marker) => (
          <motion.button
            key={marker.id}
            onClick={() => setSelectedCity(marker)}
            className={`p-2 rounded-lg text-left transition-colors ${
              selectedCity?.id === marker.id
                ? 'bg-blue-50 border-blue-500'
                : 'hover:bg-gray-50'
            } border text-sm`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="font-medium truncate">{marker.city}</div>
            <div className="text-xs text-gray-500 truncate">{marker.country}</div>
            {marker.description && (
              <div className="text-xs text-gray-400 truncate">{marker.description}</div>
            )}
            <div className="mt-1 space-y-0.5">
              <div className="font-mono">{formatTime(getTimeInZone(marker.offset)).time24h}</div>
              <div className="text-xs text-gray-500 font-mono">{formatTime(getTimeInZone(marker.offset)).time12h}</div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}; 