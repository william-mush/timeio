'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeZone {
  id: string;
  name: string;
  offset: number;
  city: string;
  country: string;
  region: string;
}

const WORLD_TIMEZONES: TimeZone[] = [
  // North America
  { id: 'ny', name: 'America/New_York', offset: -4, city: 'New York', country: 'USA', region: 'North America' },
  { id: 'la', name: 'America/Los_Angeles', offset: -7, city: 'Los Angeles', country: 'USA', region: 'North America' },
  { id: 'ch', name: 'America/Chicago', offset: -5, city: 'Chicago', country: 'USA', region: 'North America' },
  { id: 'to', name: 'America/Toronto', offset: -4, city: 'Toronto', country: 'Canada', region: 'North America' },
  { id: 'mx', name: 'America/Mexico_City', offset: -5, city: 'Mexico City', country: 'Mexico', region: 'North America' },
  { id: 'vc', name: 'America/Vancouver', offset: -7, city: 'Vancouver', country: 'Canada', region: 'North America' },

  // Europe
  { id: 'ld', name: 'Europe/London', offset: 1, city: 'London', country: 'UK', region: 'Europe' },
  { id: 'pr', name: 'Europe/Paris', offset: 2, city: 'Paris', country: 'France', region: 'Europe' },
  { id: 'br', name: 'Europe/Berlin', offset: 2, city: 'Berlin', country: 'Germany', region: 'Europe' },
  { id: 'rm', name: 'Europe/Rome', offset: 2, city: 'Rome', country: 'Italy', region: 'Europe' },
  { id: 'md', name: 'Europe/Madrid', offset: 2, city: 'Madrid', country: 'Spain', region: 'Europe' },
  { id: 'am', name: 'Europe/Amsterdam', offset: 2, city: 'Amsterdam', country: 'Netherlands', region: 'Europe' },

  // Asia
  { id: 'tk', name: 'Asia/Tokyo', offset: 9, city: 'Tokyo', country: 'Japan', region: 'Asia' },
  { id: 'sg', name: 'Asia/Singapore', offset: 8, city: 'Singapore', country: 'Singapore', region: 'Asia' },
  { id: 'hk', name: 'Asia/Hong_Kong', offset: 8, city: 'Hong Kong', country: 'China', region: 'Asia' },
  { id: 'db', name: 'Asia/Dubai', offset: 4, city: 'Dubai', country: 'UAE', region: 'Asia' },
  { id: 'bk', name: 'Asia/Bangkok', offset: 7, city: 'Bangkok', country: 'Thailand', region: 'Asia' },
  { id: 'sl', name: 'Asia/Seoul', offset: 9, city: 'Seoul', country: 'South Korea', region: 'Asia' },

  // Oceania
  { id: 'sy', name: 'Australia/Sydney', offset: 10, city: 'Sydney', country: 'Australia', region: 'Oceania' },
  { id: 'ml', name: 'Australia/Melbourne', offset: 10, city: 'Melbourne', country: 'Australia', region: 'Oceania' },
  { id: 'ak', name: 'Pacific/Auckland', offset: 12, city: 'Auckland', country: 'New Zealand', region: 'Oceania' },
  { id: 'br', name: 'Australia/Brisbane', offset: 10, city: 'Brisbane', country: 'Australia', region: 'Oceania' },

  // South America
  { id: 'sp', name: 'America/Sao_Paulo', offset: -3, city: 'São Paulo', country: 'Brazil', region: 'South America' },
  { id: 'ba', name: 'America/Buenos_Aires', offset: -3, city: 'Buenos Aires', country: 'Argentina', region: 'South America' },
  { id: 'st', name: 'America/Santiago', offset: -4, city: 'Santiago', country: 'Chile', region: 'South America' },
  { id: 'li', name: 'America/Lima', offset: -5, city: 'Lima', country: 'Peru', region: 'South America' },
];

export const WorldClock = () => {
  const [selectedZones, setSelectedZones] = useState<TimeZone[]>(WORLD_TIMEZONES.slice(0, 3));
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAddZone, setShowAddZone] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

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
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date);
  };

  const addTimeZone = (zone: TimeZone) => {
    if (!selectedZones.find(z => z.id === zone.id)) {
      setSelectedZones([...selectedZones, zone]);
    }
    setShowAddZone(false);
  };

  const removeTimeZone = (zoneId: string) => {
    setSelectedZones(selectedZones.filter(z => z.id !== zoneId));
  };

  const filteredZones = WORLD_TIMEZONES
    .filter(zone => !selectedZones.find(z => z.id === zone.id))
    .filter(zone => 
      selectedRegion === 'all' || zone.region === selectedRegion)
    .filter(zone =>
      searchQuery === '' ||
      zone.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.country.toLowerCase().includes(searchQuery.toLowerCase()));

  const uniqueRegions = Array.from(new Set(WORLD_TIMEZONES.map(zone => zone.region)));

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">World Clock</h2>
          <button
            onClick={() => setShowAddZone(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            + Add City
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedZones.map((zone) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{zone.city}</h3>
                  <p className="text-gray-500">{zone.country}</p>
                  <p className="text-gray-400 text-sm">{zone.region}</p>
                </div>
                <button
                  onClick={() => removeTimeZone(zone.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  Remove
                </button>
              </div>
              <div className="text-3xl font-mono">
                {formatTime(getTimeInZone(zone.offset))}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                GMT {zone.offset >= 0 ? '+' : ''}{zone.offset}
              </div>
            </motion.div>
          ))}
        </div>

        {showAddZone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Add City</h3>
                <button
                  onClick={() => setShowAddZone(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Search cities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Regions</option>
                    {uniqueRegions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 max-h-[50vh] overflow-y-auto">
                {filteredZones.map(zone => (
                  <button
                    key={zone.id}
                    onClick={() => addTimeZone(zone)}
                    className="flex justify-between items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border"
                  >
                    <div>
                      <div className="font-medium">{zone.city}</div>
                      <div className="text-sm text-gray-500">{zone.country}</div>
                      <div className="text-xs text-gray-400">{zone.region}</div>
                    </div>
                    <div className="text-gray-500">
                      GMT {zone.offset >= 0 ? '+' : ''}{zone.offset}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}; 