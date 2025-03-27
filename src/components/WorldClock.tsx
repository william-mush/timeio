'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CITIES } from '@/data/cities';

interface TimeZone {
  id: string;
  name: string;
  offset: number;
  city: string;
  country: string;
  region: string;
}

interface TimeSettings {
  format24Hour: boolean;
  showSeconds: boolean;
  showMilliseconds: boolean;
  timeZone: string;
  dateFormat: string;
}

const WORLD_TIMEZONES: TimeZone[] = CITIES.map(city => ({
  id: city.id,
  name: `${city.city.replace(/\s+/g, '_')}`,
  offset: city.offset,
  city: city.city,
  country: city.country,
  region: getRegion(city.coordinates[1])
}));

function getRegion(latitude: number): string {
  if (latitude > 66.5) return 'Arctic';
  if (latitude > 23.5) return 'Northern Temperate';
  if (latitude > 0) return 'Northern Tropical';
  if (latitude > -23.5) return 'Southern Tropical';
  if (latitude > -66.5) return 'Southern Temperate';
  return 'Antarctic';
}

export const WorldClock = () => {
  const [selectedZones, setSelectedZones] = useState<TimeZone[]>(WORLD_TIMEZONES.slice(0, 3));
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAddZone, setShowAddZone] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [format24Hour, setFormat24Hour] = useState(false);
  const [showSeconds, setShowSeconds] = useState(true);
  const [showMilliseconds, setShowMilliseconds] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load settings and listen for changes
  useEffect(() => {
    const loadSettings = () => {
      const savedSettings = localStorage.getItem('timeSettings');
      if (savedSettings) {
        try {
          const settings = JSON.parse(savedSettings);
          if (settings.format24Hour !== undefined) setFormat24Hour(settings.format24Hour);
          if (settings.showSeconds !== undefined) setShowSeconds(settings.showSeconds);
          if (settings.showMilliseconds !== undefined) setShowMilliseconds(settings.showMilliseconds);
        } catch (e) {
          console.error('Failed to parse saved settings:', e);
        }
      }
    };

    const handleSettingsChange = (event: CustomEvent<TimeSettings>) => {
      const { format24Hour, showSeconds, showMilliseconds } = event.detail;
      if (format24Hour !== undefined) setFormat24Hour(format24Hour);
      if (showSeconds !== undefined) setShowSeconds(showSeconds);
      if (showMilliseconds !== undefined) setShowMilliseconds(showMilliseconds);
    };

    loadSettings();
    window.addEventListener('timeSettingsChanged', handleSettingsChange as EventListener);
    setMounted(true);
    return () => {
      window.removeEventListener('timeSettingsChanged', handleSettingsChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, showMilliseconds ? 16 : 1000);

    return () => clearInterval(interval);
  }, [showMilliseconds]);

  const getTimeInZone = (offset: number) => {
    const localTime = currentTime.getTime();
    const localOffset = currentTime.getTimezoneOffset() * 60000;
    const targetTime = new Date(localTime + localOffset + (offset * 3600000));
    return targetTime;
  };

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ms = date.getMilliseconds().toString().padStart(3, '0');
    
    let period = '';
    if (!format24Hour) {
      period = hours >= 12 ? ' PM' : ' AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // Convert 0 to 12
    }
    
    const timeStr = [
      hours.toString().padStart(2, '0'),
      minutes
    ];

    if (showSeconds) {
      timeStr.push(seconds);
    }

    if (showMilliseconds) {
      timeStr.push(ms);
    }

    return timeStr.join(':') + (!format24Hour ? period : '');
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

  if (!mounted) return null;

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">World Clock</h2>
          <button
            onClick={() => setShowAddZone(true)}
            className="bg-primary-600 dark:bg-primary-400 text-white px-4 py-2 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-500 transition-colors"
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
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{zone.city}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{zone.country}</p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm">{zone.region}</p>
                </div>
                <button
                  onClick={() => removeTimeZone(zone.id)}
                  className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                >
                  Remove
                </button>
              </div>
              <div className="text-3xl font-mono whitespace-nowrap text-gray-900 dark:text-white">
                {formatTime(getTimeInZone(zone.offset))}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add City</h3>
                <button
                  onClick={() => setShowAddZone(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
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
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                    className="flex justify-between items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600 text-left"
                  >
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{zone.city}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{zone.country}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">{zone.region}</div>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
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