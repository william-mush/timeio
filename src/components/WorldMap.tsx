'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';
import { Search, ZoomIn, ZoomOut, MapPin, Clock, Loader2, AlertCircle } from 'lucide-react';
import { CityMarker } from '@/data/types';
import { CITIES } from '@/data/cities';
import { LANDMARKS } from '@/data/landmarks';

// Use the Natural Earth 110m countries from reliable CDN
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const CITY_MARKERS = [...CITIES, ...LANDMARKS];

type FilterType = 'all' | 'city' | 'landmark';

interface Position {
  coordinates: [number, number];
  zoom: number;
}

export function WorldMap() {
  const [selectedCity, setSelectedCity] = useState<CityMarker | null>(null);
  const [hoveredCity, setHoveredCity] = useState<CityMarker | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [position, setPosition] = useState<Position>({ coordinates: [0, 20], zoom: 1 });
  const [mapLoaded, setMapLoaded] = useState(false);
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

  const handleZoom = (newZoom: number) => {
    setPosition(pos => ({ ...pos, zoom: Math.max(0.8, Math.min(4, newZoom)) }));
  };

  const formatTime = (offset: number) => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const cityTime = new Date(utc + (3600000 * offset));

    const options: Intl.DateTimeFormatOptions = {
      hour: timeSettings.format24Hour ? '2-digit' : 'numeric',
      minute: '2-digit',
      second: timeSettings.showSeconds ? '2-digit' : undefined,
      hour12: !timeSettings.format24Hour
    };

    return cityTime.toLocaleTimeString('en-US', options);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search cities or countries..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          {(['all', 'city', 'landmark'] as FilterType[]).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${filterType === type
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
            >
              {type === 'all' ? 'All' : type === 'city' ? 'Cities' : 'Landmarks'}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
        {/* Loading indicator */}
        {!mapLoaded && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-blue-50/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              <span className="text-sm text-gray-600">Loading map...</span>
            </div>
          </div>
        )}

        {/* Selected/Hovered City Info Panel */}
        {(selectedCity || hoveredCity) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-gray-100 min-w-[240px]"
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${(selectedCity || hoveredCity)?.type === 'city' ? 'bg-red-100' : 'bg-blue-100'}`}>
                <MapPin className={`w-5 h-5 ${(selectedCity || hoveredCity)?.type === 'city' ? 'text-red-600' : 'text-blue-600'}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{(selectedCity || hoveredCity)?.city}</h3>
                <p className="text-sm text-gray-500">{(selectedCity || hoveredCity)?.country}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="font-mono text-lg text-gray-900">
                {formatTime((selectedCity || hoveredCity)!.offset)}
              </span>
              <span className="text-sm text-gray-400">
                GMT{(selectedCity || hoveredCity)!.offset >= 0 ? '+' : ''}{(selectedCity || hoveredCity)?.offset}
              </span>
            </div>
            {(selectedCity || hoveredCity)?.description && (
              <p className="mt-2 text-xs text-gray-500">{(selectedCity || hoveredCity)?.description}</p>
            )}
          </motion.div>
        )}

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <button
            onClick={() => handleZoom(position.zoom * 1.5)}
            className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => handleZoom(position.zoom / 1.5)}
            className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-gray-100">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-gray-600">Cities</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-gray-600">Landmarks</span>
            </div>
          </div>
        </div>

        {/* The Map */}
        <div className="aspect-[2/1] min-h-[400px]">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 130,
              center: [0, 25]
            }}
            style={{ width: '100%', height: '100%' }}
          >
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates}
              minZoom={0.8}
              maxZoom={4}
              onMoveEnd={({ coordinates, zoom }: Position) => setPosition({ coordinates, zoom })}
            >
              {/* Ocean background */}
              <rect x="-1000" y="-500" width="3000" height="1500" fill="#e0f2fe" />

              <Geographies geography={geoUrl}>
                {({ geographies }) => {
                  // Set loaded state when geographies are available
                  if (geographies.length > 0 && !mapLoaded) {
                    setTimeout(() => setMapLoaded(true), 100);
                  }
                  return (
                    <>
                      {geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="#f1f5f9"
                          stroke="#94a3b8"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: 'none' },
                            hover: { fill: '#e2e8f0', outline: 'none', cursor: 'grab' },
                            pressed: { fill: '#cbd5e1', outline: 'none' },
                          }}
                        />
                      ))}
                    </>
                  );
                }}
              </Geographies>

              {/* City markers */}
              {filteredMarkers.map((marker) => (
                <Marker
                  key={marker.id}
                  coordinates={[marker.coordinates[0], marker.coordinates[1]]}
                  onClick={() => setSelectedCity(marker)}
                  onMouseEnter={() => setHoveredCity(marker)}
                  onMouseLeave={() => setHoveredCity(null)}
                >
                  <motion.g
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.3 }}
                    className="cursor-pointer"
                  >
                    {/* Outer glow */}
                    <circle
                      r={8}
                      fill={marker.type === 'city' ? '#ef4444' : '#3b82f6'}
                      fillOpacity={0.2}
                    />
                    {/* Inner circle */}
                    <circle
                      r={5}
                      fill={marker.type === 'city' ? '#ef4444' : '#3b82f6'}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  </motion.g>
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-6 text-sm text-gray-500">
        <span>{filteredMarkers.filter(m => m.type === 'city').length} cities</span>
        <span>•</span>
        <span>{filteredMarkers.filter(m => m.type === 'landmark').length} landmarks</span>
        <span>•</span>
        <span>Click any marker for details</span>
      </div>
    </div>
  );
}