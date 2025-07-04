'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
  GeographyProps
} from 'react-simple-maps';
import { Search } from 'lucide-react';
import { CityMarker } from '@/data/types';
import { CITIES } from '@/data/cities';
import { LANDMARKS } from '@/data/landmarks';
import { getTimeInTimezone, getCurrentOffset, US_CITY_TIMEZONES } from '@/lib/timezones';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const CITY_MARKERS = [...CITIES, ...LANDMARKS];

type FilterType = 'all' | 'city' | 'landmark';

interface Position {
  coordinates: [number, number];
  zoom: number;
}

export function WorldMap() {
  const [selectedCity, setSelectedCity] = useState<CityMarker | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [position, setPosition] = useState<Position>({ coordinates: [0, 0], zoom: 1 });
  const [timeSettings, setTimeSettings] = useState({
    format24Hour: false,
    showSeconds: true,
    showMilliseconds: false
  });

  useEffect(() => {
    const loadSettings = () => {
      const savedSettings = localStorage.getItem('timeSettings');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          setTimeSettings({
            format24Hour: parsed.format24Hour,
            showSeconds: parsed.showSeconds,
            showMilliseconds: parsed.showMilliseconds
          });
        } catch (e) {
          console.error('Failed to parse saved settings:', e);
        }
      }
    };

    const handleSettingsChange = (event: CustomEvent<any>) => {
      const { format24Hour, showSeconds, showMilliseconds } = event.detail;
      setTimeSettings({ format24Hour, showSeconds, showMilliseconds });
    };

    loadSettings();
    window.addEventListener('timeSettingsChanged', handleSettingsChange as EventListener);
    return () => {
      window.removeEventListener('timeSettingsChanged', handleSettingsChange as EventListener);
    };
  }, []);

  const filteredMarkers = useMemo(() => {
    return CITY_MARKERS.filter(marker => {
      const matchesSearch = searchQuery === '' || 
        marker.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        marker.country.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = filterType === 'all' || marker.type === filterType;
      
      return matchesSearch && matchesType;
    });
  }, [searchQuery, filterType]);

  const handleZoom = (zoom: number) => {
    setPosition(pos => ({ ...pos, zoom }));
  };

  const formatTime = (cityId: string, offset: number) => {
    // Use proper timezone handling for US cities
    const cityTime = getTimeInTimezone(offset.toString(), cityId);
    
    const options: Intl.DateTimeFormatOptions = {
      hour: timeSettings.format24Hour ? '2-digit' : 'numeric',
      minute: '2-digit',
      second: timeSettings.showSeconds ? '2-digit' : undefined,
      hour12: !timeSettings.format24Hour
    };

    let time = cityTime.toLocaleTimeString('en-US', options);
    
    if (timeSettings.showMilliseconds) {
      const ms = cityTime.getMilliseconds().toString().padStart(3, '0');
      time = time.replace(' ', ' : ' + ms + ' ');
    }

    return time;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto bg-white/40 backdrop-blur-sm rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex flex-col space-y-4">
        {/* Selected City Info - Moved to top */}
        {selectedCity && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200/50"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{selectedCity.city}</h3>
                <p className="text-gray-600">{selectedCity.country}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedCity.coordinates[0].toFixed(2)}°, {selectedCity.coordinates[1].toFixed(2)}°
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-mono">{formatTime(selectedCity.id, selectedCity.offset)}</p>
                <p className="text-sm text-gray-500">GMT {getCurrentOffset(selectedCity.id, selectedCity.offset) >= 0 ? '+' : ''}{getCurrentOffset(selectedCity.id, selectedCity.offset)}</p>
              </div>
            </div>
            {selectedCity.description && (
              <p className="mt-2 text-sm text-gray-600">{selectedCity.description}</p>
            )}
          </motion.div>
        )}

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by city, country, region, or coordinates (lat,long)"
            className="w-full pl-10 pr-4 py-2 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterType === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100/50 text-gray-600 hover:bg-gray-200/50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('city')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterType === 'city'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100/50 text-gray-600 hover:bg-gray-200/50'
            }`}
          >
            Cities
          </button>
          <button
            onClick={() => setFilterType('landmark')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterType === 'landmark'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100/50 text-gray-600 hover:bg-gray-200/50'
            }`}
          >
            Landmarks
          </button>
        </div>
      </div>

      <div className="relative w-full aspect-[2/1] bg-transparent rounded-lg overflow-hidden mb-20">
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{
            scale: 130,
            center: [0, 0]
          }}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            minZoom={0.8}
            maxZoom={4}
            onMoveEnd={({ coordinates, zoom }: Position) => setPosition({ coordinates, zoom })}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#f1f5f9"
                    stroke="#e2e8f0"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: '#e2e8f0', outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>

            {filteredMarkers.map((marker) => (
              <Marker
                key={marker.id}
                coordinates={[marker.coordinates[0], marker.coordinates[1]]}
                onClick={() => setSelectedCity(marker)}
              >
                <motion.circle
                  r={4}
                  fill={marker.type === 'city' ? '#ef4444' : '#3b82f6'}
                  fillOpacity={0.8}
                  stroke="#fff"
                  strokeWidth={1}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.5 }}
                  className="cursor-pointer"
                />
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>

        {/* Zoom controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button
            onClick={() => handleZoom(Math.min(position.zoom * 1.5, 4))}
            className="p-2 bg-white/60 rounded-lg shadow-md hover:bg-white/80"
          >
            +
          </button>
          <button
            onClick={() => handleZoom(Math.max(position.zoom / 1.5, 1))}
            className="p-2 bg-white/60 rounded-lg shadow-md hover:bg-white/80"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
} 