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
  timezone: string;
}

interface TimeSettings {
  format24Hour: boolean;
  showSeconds: boolean;
  showMilliseconds: boolean;
  timeZone: string;
  dateFormat: string;
}

// Create timezone mappings for better time display
const getTimezoneFromOffset = (offset: number, country: string): string => {
  const timezoneMap: { [key: string]: string } = {
    // US Timezones
    'United States|-4': 'America/New_York',
    'United States|-5': 'America/Chicago',
    'United States|-6': 'America/Denver',
    'United States|-7': 'America/Los_Angeles',
    // Major international timezones
    'United Kingdom|1': 'Europe/London',
    'France|2': 'Europe/Paris',
    'Germany|2': 'Europe/Berlin',
    'Italy|2': 'Europe/Rome',
    'Spain|2': 'Europe/Madrid',
    'Japan|9': 'Asia/Tokyo',
    'China|8': 'Asia/Shanghai',
    'Australia|10': 'Australia/Sydney',
    'Australia|8': 'Australia/Perth',
    'India|5.5': 'Asia/Kolkata',
    'Brazil|-3': 'America/Sao_Paulo',
    'Canada|-4': 'America/Toronto',
    'Canada|-5': 'America/Winnipeg',
    'Canada|-6': 'America/Edmonton',
    'Canada|-7': 'America/Vancouver',
    'Russia|3': 'Europe/Moscow',
  };
  
  const key = `${country}|${offset}`;
  return timezoneMap[key] || 'UTC';
};

const WORLD_TIMEZONES: TimeZone[] = CITIES.map(city => ({
  id: city.id,
  name: `${city.city.replace(/\s+/g, '_')}`,
  offset: city.offset,
  city: city.city,
  country: city.country,
  region: getRegion(city.coordinates[1]),
  timezone: getTimezoneFromOffset(city.offset, city.country)
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
  const [selectedZones, setSelectedZones] = useState<TimeZone[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAddZone, setShowAddZone] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [format24Hour, setFormat24Hour] = useState(false);
  const [showSeconds, setShowSeconds] = useState(true);
  const [showMilliseconds, setShowMilliseconds] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleAuth = () => {
    signIn('google');
  };

  // Enhanced time formatting with proper timezone support
  const getTimeInZone = (timezone: string, offset: number) => {
    try {
      // Try to use the proper timezone first
      const timeInZone = new Date().toLocaleString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: showSeconds ? '2-digit' : undefined,
        hour12: !format24Hour,
      });
      return timeInZone;
    } catch (error) {
      // Fallback to offset calculation if timezone is not supported
      const localTime = currentTime.getTime();
      const localOffset = currentTime.getTimezoneOffset() * 60000;
      const targetTime = new Date(localTime + localOffset + (offset * 3600000));
      return formatTime(targetTime);
    }
  };

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = showSeconds ? date.getSeconds().toString().padStart(2, '0') : '';
    const milliseconds = showMilliseconds ? (date.getMilliseconds() / 1000).toFixed(3).slice(2) : '';
    
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

    if (showMilliseconds && showSeconds) {
      timeStr.push(milliseconds);
    }

    return timeStr.join(':') + period;
  };

  const getLocalDate = (timezone: string) => {
    try {
      return new Date().toLocaleDateString('en-US', {
        timeZone: timezone,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      return new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    }
  };

  // Load settings and time zones from database
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      if (!session) {
        // Default to US cities for non-authenticated users
        const defaultZones = WORLD_TIMEZONES.filter(zone => 
          ['nyc', 'la', 'chicago', 'miami', 'seattle', 'denver'].includes(zone.id)
        );
        setSelectedZones(defaultZones);
        setIsLoading(false);
        setMounted(true);
        return;
      }

      try {
        // Load settings
        const settingsResponse = await fetch('/api/settings');
        if (settingsResponse.ok) {
          const settings = await settingsResponse.json();
          setFormat24Hour(settings.format24Hour ?? false);
          setShowSeconds(settings.showSeconds ?? true);
          setShowMilliseconds(settings.showMilliseconds ?? false);
        }

        // Load time zones
        const timeZonesResponse = await fetch('/api/time-zones');
        if (timeZonesResponse.ok) {
          const timeZones = await timeZonesResponse.json();
          if (Array.isArray(timeZones) && timeZones.length > 0) {
            const zones = timeZones.map((tz: any) => ({
              id: tz.cityId,
              name: tz.cityName,
              city: tz.cityName,
              country: tz.country,
              offset: tz.offset,
              region: tz.region,
              timezone: getTimezoneFromOffset(tz.offset, tz.country)
            }));
            setSelectedZones(zones);
          } else {
            // If no time zones found, set default US cities
            const defaultZones = WORLD_TIMEZONES.filter(zone => 
              ['nyc', 'la', 'chicago', 'miami', 'seattle', 'denver'].includes(zone.id)
            );
            setSelectedZones(defaultZones);
            
            // Save default zones to database
            await Promise.all(defaultZones.map((zone, index) => 
              fetch('/api/time-zones', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  cityId: zone.id,
                  cityName: zone.city,
                  country: zone.country,
                  offset: zone.offset,
                  region: zone.region,
                  order: index
                })
              })
            ));
          }
        }
      } catch (error) {
        console.error('Failed to load data:', error);
        setError('Failed to load world clock data. Please try again.');
        const defaultZones = WORLD_TIMEZONES.filter(zone => 
          ['nyc', 'la', 'chicago', 'miami', 'seattle', 'denver'].includes(zone.id)
        );
        setSelectedZones(defaultZones);
      } finally {
        setIsLoading(false);
        setMounted(true);
      }
    };

    loadData();
  }, [session]);

  // Listen for settings changes
  useEffect(() => {
    const handleSettingsChange = (event: CustomEvent<TimeSettings>) => {
      const { format24Hour, showSeconds, showMilliseconds } = event.detail;
      setFormat24Hour(format24Hour);
      setShowSeconds(showSeconds);
      setShowMilliseconds(showMilliseconds);
    };

    window.addEventListener('timeSettingsChanged', handleSettingsChange as EventListener);
    return () => window.removeEventListener('timeSettingsChanged', handleSettingsChange as EventListener);
  }, []);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addTimeZone = async (zone: TimeZone) => {
    if (!session) {
      signIn('google');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/time-zones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cityId: zone.id,
          cityName: zone.city,
          country: zone.country,
          offset: zone.offset,
          region: zone.region,
          order: selectedZones.length
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to add time zone:', errorData);
        setError(`Failed to add ${zone.city}: ${errorData.error || response.statusText}`);
        return;
      }
      
      const newTimeZone = await response.json();
      console.log('Successfully added time zone:', newTimeZone);
      
      const newZone = {
        id: newTimeZone.cityId,
        name: newTimeZone.cityName,
        city: newTimeZone.cityName,
        country: newTimeZone.country,
        offset: newTimeZone.offset,
        region: newTimeZone.region,
        timezone: getTimezoneFromOffset(newTimeZone.offset, newTimeZone.country)
      };
      
      setSelectedZones(prev => [...prev, newZone]);
      setShowAddZone(false);
    } catch (error) {
      console.error('Error adding time zone:', error);
      setError(`Failed to add ${zone.city}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const removeTimeZone = async (zoneId: string) => {
    if (!session) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/time-zones/${zoneId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(`Failed to remove city: ${errorData.error || response.statusText}`);
        return;
      }

      setSelectedZones(prev => prev.filter(zone => zone.id !== zoneId));
    } catch (error) {
      console.error('Failed to remove time zone:', error);
      setError('Failed to remove city. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredZones = WORLD_TIMEZONES
    .filter(zone => !selectedZones.find(z => z.id === zone.id))
    .filter(zone => 
      selectedRegion === 'all' || zone.region === selectedRegion)
    .filter(zone =>
      zone.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.country.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Group zones by region for better display
  const groupedZones = filteredZones.reduce((acc, zone) => {
    const key = zone.country === 'United States' ? 'United States' : zone.region;
    if (!acc[key]) acc[key] = [];
    acc[key].push(zone);
    return acc;
  }, {} as { [key: string]: TimeZone[] });

  const uniqueRegions = Array.from(new Set(WORLD_TIMEZONES.map(zone => zone.region)));

  if (!mounted) return null;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 md:space-y-8"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="heading-2 text-2xl md:text-3xl">World Clock</h2>
            <p className="text-sm text-muted mt-1">
              Real-time display across major cities worldwide
            </p>
          </div>
          {session ? (
            <button
              onClick={() => setShowAddZone(true)}
              className="w-full sm:w-auto button-primary px-4 py-2 flex items-center gap-2"
              disabled={isLoading}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add City
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

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card p-4 md:p-6 animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {selectedZones.map((zone) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`card p-4 md:p-6 ${
                  zone.country === 'United States' 
                    ? 'ring-2 ring-blue-200 dark:ring-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20' 
                    : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3 md:mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                        {zone.city}
                      </h3>
                      {zone.country === 'United States' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          🇺🇸 US
                        </span>
                      )}
                    </div>
                    <p className="text-sm md:text-base text-muted">{zone.country}</p>
                    <p className="text-xs md:text-sm text-muted">{zone.region}</p>
                    <p className="text-xs text-muted mt-1">
                      {getLocalDate(zone.timezone)}
                    </p>
                  </div>
                  {session && (
                    <button
                      onClick={() => removeTimeZone(zone.id)}
                      className="text-gray-400 hover:text-red-500 text-sm md:text-base p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      title="Remove city"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="text-2xl md:text-3xl font-mono font-bold text-gray-900 dark:text-white">
                    {getTimeInZone(zone.timezone, zone.offset)}
                  </div>
                  <div className="flex items-center justify-between text-xs md:text-sm text-muted">
                    <span>GMT {zone.offset >= 0 ? '+' : ''}{zone.offset}</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                      {zone.timezone}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {showAddZone && session && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-start md:items-center justify-center z-50 p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative w-full max-w-4xl mx-auto my-8 md:my-0"
            >
              <div className="card bg-white dark:bg-gray-800 shadow-xl overflow-hidden">
                <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 px-4 py-3 md:p-6 border-b dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <h3 className="heading-3 text-xl md:text-2xl">Add City</h3>
                    <button
                      onClick={() => setShowAddZone(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                      aria-label="Close"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="select-field flex-1"
                      >
                        <option value="all">All Regions</option>
                        <option value="United States">🇺🇸 United States</option>
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
                  </div>
                </div>

                <div className="px-4 py-3 md:p-6">
                  <div className="max-h-[60vh] overflow-y-auto">
                    {Object.entries(groupedZones).map(([groupName, zones]) => (
                      <div key={groupName} className="mb-6">
                        <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white border-b pb-2">
                          {groupName === 'United States' ? '🇺🇸 ' : ''}{groupName}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {zones.map(zone => (
                            <button
                              key={zone.id}
                              onClick={() => addTimeZone(zone)}
                              className="text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
                            >
                              <div className="font-medium text-gray-900 dark:text-white">{zone.city}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{zone.country}</div>
                              <div className="text-xs text-gray-400 dark:text-gray-500">
                                GMT {zone.offset >= 0 ? '+' : ''}{zone.offset} • {zone.timezone}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}; 