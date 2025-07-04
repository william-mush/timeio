'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CITIES } from '@/data/cities';
import { calculateSunTimes, formatCoordinates, SunTimes } from '@/lib/sunCalculations';

interface CityWithSunData {
  id: string;
  city: string;
  country: string;
  coordinates: [number, number];
  offset: number;
  region: string;
  sunTimes: SunTimes | null;
  coordinatesFormatted: { lat: string; lng: string };
  currentTime: Date;
}

export default function CitiesPage() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [format24Hour, setFormat24Hour] = useState(false);
  const [citiesData, setCitiesData] = useState<CityWithSunData[]>([]);

  const getRegion = (latitude: number): string => {
    if (latitude > 66.5) return 'Arctic';
    if (latitude > 23.5) return 'Northern Temperate';
    if (latitude > 0) return 'Northern Tropical';
    if (latitude > -23.5) return 'Southern Tropical';
    if (latitude > -66.5) return 'Southern Temperate';
    return 'Antarctic';
  };

  const getTimeInZone = (offset: number) => {
    const localTime = currentTime.getTime();
    const localOffset = currentTime.getTimezoneOffset() * 60000;
    const targetTime = new Date(localTime + localOffset + (offset * 3600000));
    return targetTime;
  };

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    let period = '';
    if (!format24Hour) {
      period = hours >= 12 ? ' PM' : ' AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // Convert 0 to 12
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes}${period}`;
  };

  const formatSunTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    let period = '';
    if (!format24Hour) {
      period = hours >= 12 ? ' PM' : ' AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // Convert 0 to 12
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes}${period}`;
  };

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Calculate sun data for all cities
  useEffect(() => {
    const calculateCitiesData = () => {
      const data: CityWithSunData[] = CITIES.map(city => {
        const [longitude, latitude] = city.coordinates;
        const localTime = getTimeInZone(city.offset);
        
        let sunTimes: SunTimes | null = null;
        try {
          sunTimes = calculateSunTimes(latitude, longitude, localTime);
        } catch (error) {
          console.error(`Error calculating sun times for ${city.city}:`, error);
        }

        return {
          id: city.id,
          city: city.city,
          country: city.country,
          coordinates: city.coordinates,
          offset: city.offset,
          region: getRegion(latitude),
          sunTimes,
          coordinatesFormatted: formatCoordinates(longitude, latitude),
          currentTime: localTime
        };
      });

      setCitiesData(data);
    };

    calculateCitiesData();
    setMounted(true);
  }, [currentTime]);

  const filteredCities = citiesData.filter(city => {
    const matchesSearch = city.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         city.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || city.region === selectedRegion;
    const matchesCountry = selectedCountry === 'all' || city.country === selectedCountry;
    
    return matchesSearch && matchesRegion && matchesCountry;
  });

  const uniqueRegions = Array.from(new Set(citiesData.map((city: CityWithSunData) => city.region)));
  const uniqueCountries = Array.from(new Set(citiesData.map((city: CityWithSunData) => city.country))).sort();

  if (!mounted) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="heading-1 text-3xl md:text-4xl mb-4">World Cities</h1>
            <p className="text-muted text-lg">Loading cities with sunrise, sunset, and coordinates...</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="card p-4 animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h1 className="heading-1 text-3xl md:text-4xl mb-4">World Cities</h1>
          <p className="text-muted text-lg">
            Explore {CITIES.length} cities worldwide with current time, sunrise, sunset, day length, and exact coordinates
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Cities
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cities or countries..."
                className="input-field w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="select-field w-full"
              >
                <option value="all">All Regions</option>
                {uniqueRegions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="select-field w-full"
              >
                <option value="all">All Countries</option>
                {uniqueCountries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time Format
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setFormat24Hour(!format24Hour)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    format24Hour
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  24H
                </button>
                <button
                  onClick={() => setFormat24Hour(!format24Hour)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    !format24Hour
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  12H
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="text-center text-muted">
          Showing {filteredCities.length} of {CITIES.length} cities
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCities.map((city) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-4 hover:shadow-lg transition-shadow"
            >
              {/* City Header */}
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{city.city}</h3>
                <p className="text-sm text-muted">{city.country}</p>
                <p className="text-xs text-muted">{city.region}</p>
              </div>

              {/* Current Time */}
              <div className="text-xl font-mono text-gray-900 dark:text-white mb-2">
                {formatTime(city.currentTime)}
              </div>
              <div className="text-xs text-muted mb-3">
                GMT {city.offset >= 0 ? '+' : ''}{city.offset}
              </div>

              {/* Coordinates */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mb-3">
                <div className="text-xs text-muted">
                  <span className="font-semibold">Coordinates:</span>
                  <div className="text-gray-900 dark:text-white font-mono text-sm">
                    {city.coordinatesFormatted.lat}
                  </div>
                  <div className="text-gray-900 dark:text-white font-mono text-sm">
                    {city.coordinatesFormatted.lng}
                  </div>
                </div>
              </div>

              {/* Sun Times */}
              {city.sunTimes && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="font-semibold text-yellow-600 dark:text-yellow-400">🌅 Sunrise:</span>
                      <span className="text-gray-900 dark:text-white font-mono">
                        {formatSunTime(city.sunTimes.sunrise)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-orange-600 dark:text-orange-400">🌇 Sunset:</span>
                      <span className="text-gray-900 dark:text-white font-mono">
                        {formatSunTime(city.sunTimes.sunset)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">☀️ Day Length:</span>
                      <span className="text-gray-900 dark:text-white font-mono">
                        {city.sunTimes.dayLengthFormatted}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {filteredCities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted text-lg">No cities found matching your search criteria.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}