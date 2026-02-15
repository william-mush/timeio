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

const WORLD_TIMEZONES: TimeZone[] = CITIES.map(city => ({
  id: city.id,
  name: `${city.city.replace(/\s+/g, '_')}`,
  offset: city.offset,
  city: city.city,
  country: city.country,
  region: getRegion(city.coordinates[1]),
  timezone: city.timezone || `Etc/GMT${city.offset <= 0 ? '+' : '-'}${Math.abs(city.offset)}`
}));

function getRegion(latitude: number): string {
  if (latitude > 66.5) return 'Arctic';
  if (latitude > 23.5) return 'Northern Temperate';
  if (latitude > 0) return 'Northern Tropical';
  if (latitude > -23.5) return 'Southern Tropical';
  if (latitude > -66.5) return 'Southern Temperate';
  return 'Antarctic';
}

function formatOffsetLabel(minutes: number): string {
  if (minutes === 0) return 'Now';
  const sign = minutes > 0 ? '+' : '-';
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  if (m === 0) return `${sign}${h}h`;
  if (h === 0) return `${sign}${m}m`;
  return `${sign}${h}h ${m}m`;
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
  const [timeOffset, setTimeOffset] = useState(0); // in minutes, range -720 to +720

  // Compute the offset time once, derived from currentTime + offset
  const offsetTime = new Date(currentTime.getTime() + timeOffset * 60000);

  const handleGoogleAuth = () => {
    signIn('google');
  };

  // Enhanced time formatting with proper timezone support
  const getTimeInZone = (timezone: string, offset: number) => {
    try {
      // Build a reference date that incorporates the slider offset
      const refDate = offsetTime;
      // Try to use the proper timezone first
      const timeInZone = refDate.toLocaleString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: showSeconds ? '2-digit' : undefined,
        hour12: !format24Hour,
      });
      return timeInZone;
    } catch (error) {
      // Fallback to offset calculation if timezone is not supported
      const localTime = offsetTime.getTime();
      const localOffset = offsetTime.getTimezoneOffset() * 60000;
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
      return offsetTime.toLocaleDateString('en-US', {
        timeZone: timezone,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      return offsetTime.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
    }
  };

  // Format the banner time string showing the computed offset time
  const getBannerTimeString = () => {
    return offsetTime.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: !format24Hour,
    });
  };

  // Load settings and time zones from database
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      if (!session) {
        // Check localStorage for saved cities
        const savedCities = localStorage.getItem('worldClockCities');
        if (savedCities) {
          try {
            const cityIds: string[] = JSON.parse(savedCities);
            const zones = cityIds
              .map(id => WORLD_TIMEZONES.find(z => z.id === id))
              .filter((z): z is TimeZone => z !== undefined);
            if (zones.length > 0) {
              setSelectedZones(zones);
              setIsLoading(false);
              setMounted(true);
              return;
            }
          } catch (e) {
            console.error('Failed to parse saved cities:', e);
          }
        }
        // Default to major world cities for brand-new anonymous visitors
        const defaultZones = WORLD_TIMEZONES.filter(zone =>
          ['nyc', 'london', 'tokyo', 'sydney', 'dubai', 'la'].includes(zone.id)
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
            const zones = timeZones.map((tz: any) => {
              const cityData = CITIES.find(c => c.id === tz.cityId);
              return {
                id: tz.cityId,
                name: tz.cityName,
                city: tz.cityName,
                country: tz.country,
                offset: tz.offset,
                region: tz.region,
                timezone: cityData?.timezone || `Etc/GMT${tz.offset <= 0 ? '+' : '-'}${Math.abs(tz.offset)}`
              };
            });
            setSelectedZones(zones);
          } else {
            // If no time zones found, set default world cities
            const defaultZones = WORLD_TIMEZONES.filter(zone =>
              ['nyc', 'london', 'tokyo', 'sydney', 'dubai', 'la'].includes(zone.id)
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
          ['nyc', 'london', 'tokyo', 'sydney', 'dubai', 'la'].includes(zone.id)
        );
        setSelectedZones(defaultZones);
      } finally {
        setIsLoading(false);
        setMounted(true);
      }
    };

    loadData();
  }, [session]);

  // Merge localStorage cities into database on sign-in
  useEffect(() => {
    if (!session || !mounted) return;
    const savedCities = localStorage.getItem('worldClockCities');
    if (!savedCities) return;

    try {
      const cityIds: string[] = JSON.parse(savedCities);
      const existingIds = selectedZones.map(z => z.id);
      const newCityIds = cityIds.filter(id => !existingIds.includes(id));

      if (newCityIds.length === 0) {
        localStorage.removeItem('worldClockCities');
        return;
      }

      const newZones = newCityIds
        .map(id => WORLD_TIMEZONES.find(z => z.id === id))
        .filter((z): z is TimeZone => z !== undefined);

      // Save to database and add to state
      Promise.all(newZones.map((zone, index) =>
        fetch('/api/time-zones', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cityId: zone.id,
            cityName: zone.city,
            country: zone.country,
            offset: zone.offset,
            region: zone.region,
            order: selectedZones.length + index
          })
        })
      )).then(() => {
        setSelectedZones(prev => [...prev, ...newZones]);
        localStorage.removeItem('worldClockCities');
      }).catch(e => console.error('Failed to merge cities:', e));
    } catch (e) {
      console.error('Failed to parse saved cities for merge:', e);
      localStorage.removeItem('worldClockCities');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, mounted]);

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
      // Save to localStorage for anonymous users
      setSelectedZones(prev => [...prev, zone]);
      const cityIds = [...selectedZones, zone].map(z => z.id);
      localStorage.setItem('worldClockCities', JSON.stringify(cityIds));
      setShowAddZone(false);
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
        timezone: zone.timezone || `Etc/GMT${newTimeZone.offset <= 0 ? '+' : '-'}${Math.abs(newTimeZone.offset)}`
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
    if (!session) {
      // Remove from localStorage for anonymous users
      setSelectedZones(prev => {
        const updated = prev.filter(zone => zone.id !== zoneId);
        const cityIds = updated.map(z => z.id);
        if (cityIds.length > 0) {
          localStorage.setItem('worldClockCities', JSON.stringify(cityIds));
        } else {
          localStorage.removeItem('worldClockCities');
        }
        return updated;
      });
      return;
    }

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
        </div>

        {/* Time Offset Slider */}
        <div className="card p-4 md:p-5 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex-1 w-full">
              <label htmlFor="time-offset-slider" className="block text-xs font-medium text-muted mb-1.5">
                Time Travel
              </label>
              <input
                id="time-offset-slider"
                type="range"
                min={-720}
                max={720}
                step={15}
                value={timeOffset}
                onChange={(e) => setTimeOffset(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700 accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-muted mt-0.5 px-0.5">
                <span>-12h</span>
                <span>-6h</span>
                <span>0</span>
                <span>+6h</span>
                <span>+12h</span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:pt-3 shrink-0">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 tabular-nums min-w-[5rem] text-right">
                {formatOffsetLabel(timeOffset)}
              </span>
              {timeOffset !== 0 && (
                <button
                  onClick={() => setTimeOffset(0)}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-900/60 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Offset Banner */}
        {timeOffset !== 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-sm text-blue-700 dark:text-blue-300"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Showing time at <strong>{getBannerTimeString()}</strong> ({formatOffsetLabel(timeOffset)} from now)
            </span>
          </motion.div>
        )}

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
                className={`card p-4 md:p-6 ${zone.country === 'United States'
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
                  <button
                    onClick={() => removeTimeZone(zone.id)}
                    className="text-gray-400 hover:text-red-500 text-sm md:text-base p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    title="Remove city"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl md:text-3xl font-mono font-bold text-gray-900 dark:text-white">
                    {getTimeInZone(zone.timezone, zone.offset)}
                  </div>
                  <div className="flex items-center justify-between text-xs md:text-sm text-muted">
                    <span>GMT {zone.offset >= 0 ? '+' : ''}{zone.offset}</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                      {zone.timezone.includes('/') ? zone.timezone.split('/').pop()?.replace(/_/g, ' ') : zone.timezone}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {showAddZone && (
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