'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CITIES } from '@/data/cities';
import { useSession, signIn } from 'next-auth/react';

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
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [selectedZones, setSelectedZones] = useState<TimeZone[]>(WORLD_TIMEZONES.slice(0, 3));
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAddZone, setShowAddZone] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [format24Hour, setFormat24Hour] = useState(false);
  const [showSeconds, setShowSeconds] = useState(true);
  const [showMilliseconds, setShowMilliseconds] = useState(false);

  const handleGoogleAuth = () => {
    signIn('google');
  };

  // Load selected zones from localStorage on mount
  useEffect(() => {
    if (!session) {
      setSelectedZones(WORLD_TIMEZONES.slice(0, 3)); // Default zones for non-authenticated users
      setMounted(true);
      return;
    }

    const savedZones = localStorage.getItem(`worldClock_zones_${session.user?.email}`);
    if (savedZones) {
      try {
        const parsed = JSON.parse(savedZones);
        setSelectedZones(parsed);
      } catch (e) {
        console.error('Failed to load saved zones:', e);
      }
    }
    setMounted(true);
  }, [session]);

  // Save selected zones whenever they change
  useEffect(() => {
    if (!mounted || !session) return;

    try {
      localStorage.setItem(`worldClock_zones_${session.user?.email}`, JSON.stringify(selectedZones));
    } catch (e) {
      console.error('Failed to save zones:', e);
    }
  }, [selectedZones, mounted, session]);

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
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    let period = '';
    if (hours > 12) {
      period = ' PM';
      hours = hours % 12;
      hours = hours ? hours : 12; // Convert 0 to 12
    } else if (hours === 0) {
      hours = 12; // Convert 0 to 12
    } else if (hours === 12) {
      period = ' PM';
    }
    
    const timeStr = [
      hours.toString().padStart(2, '0'),
      minutes
    ];

    if (seconds) {
      timeStr.push(seconds);
    }

    return timeStr.join(':') + period;
  };

  const addTimeZone = (zone: TimeZone) => {
    if (!session) {
      signIn('google');
      return;
    }
    
    if (!selectedZones.find(z => z.id === zone.id)) {
      setSelectedZones([...selectedZones, zone]);
    }
    setShowAddZone(false);
  };

  const removeTimeZone = (zoneId: string) => {
    if (!session) {
      signIn('google');
      return;
    }
    
    setSelectedZones(selectedZones.filter(z => z.id !== zoneId));
  };

  const filteredZones = WORLD_TIMEZONES
    .filter(zone => !selectedZones.find(z => z.id === zone.id))
    .filter(zone => 
      selectedRegion === 'all' || zone.region === selectedRegion);

  const uniqueRegions = Array.from(new Set(WORLD_TIMEZONES.map(zone => zone.region)));

  if (!mounted) return null;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 md:space-y-8"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="heading-2 text-2xl md:text-3xl">World Clock</h2>
          {session ? (
            <button
              onClick={() => setShowAddZone(true)}
              className="w-full sm:w-auto button-primary px-4 py-2"
            >
              + Add City
            </button>
          ) : (
            <button
              onClick={handleGoogleAuth}
              className="w-full sm:w-auto button-primary flex items-center justify-center gap-2 px-4 py-2"
            >
              <img src="/google-icon.svg" alt="Google" className="w-5 h-5 md:w-6 md:h-6" />
              Sign in to Add Cities
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {selectedZones.map((zone) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-4 md:p-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3 md:mb-4">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{zone.city}</h3>
                  <p className="text-sm md:text-base text-muted">{zone.country}</p>
                  <p className="text-xs md:text-sm text-muted">{zone.region}</p>
                </div>
                {session && (
                  <button
                    onClick={() => removeTimeZone(zone.id)}
                    className="text-gray-400 hover:text-red-500 text-sm md:text-base"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="text-2xl md:text-3xl font-mono whitespace-nowrap text-gray-900 dark:text-white">
                {formatTime(getTimeInZone(zone.offset))}
              </div>
              <div className="text-xs md:text-sm text-muted mt-1">
                GMT {zone.offset >= 0 ? '+' : ''}{zone.offset}
              </div>
            </motion.div>
          ))}
        </div>

        {showAddZone && session && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="card max-w-2xl w-full mx-auto max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-800 shadow-lg p-4 md:p-6">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h3 className="heading-3 text-xl md:text-2xl">Add City</h3>
                <button
                  onClick={() => setShowAddZone(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="select-field flex-1"
                  >
                    <option value="all">All Regions</option>
                    {uniqueRegions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search cities..."
                    className="input-field flex-1"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto p-1">
                  {filteredZones
                    .filter(zone =>
                      zone.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      zone.country.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(zone => (
                      <button
                        key={zone.id}
                        onClick={() => addTimeZone(zone)}
                        className="text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="font-medium text-gray-900 dark:text-white">{zone.city}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{zone.country}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          GMT {zone.offset >= 0 ? '+' : ''}{zone.offset}
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}; 