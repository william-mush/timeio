'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { searchCitiesLocal } from '@/lib/searchCitiesLocal';

interface SelectedCity {
  id: number;
  name: string;
  country: string;
  timezone: string;
  countryCode: string;
}

interface HourBlock {
  hour: number; // 0-23 in local time for this city
  type: 'business' | 'night' | 'other';
}

interface OverlapSlot {
  utcHour: number;
  times: { city: string; hour: number; minute: number; label: string }[];
}

// ---------- helpers ----------

function getHourInTimezone(date: Date, timezone: string): number {
  const str = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    hour12: false,
  }).format(date);
  return parseInt(str, 10) % 24;
}

function getFormattedTime(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

function getFormattedTimeWithSeconds(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date);
}

function classifyHour(hour: number): HourBlock['type'] {
  if (hour >= 9 && hour < 17) return 'business';
  if (hour >= 22 || hour < 6) return 'night';
  return 'other';
}

function hourLabel(hour: number): string {
  if (hour === 0) return '12a';
  if (hour < 12) return `${hour}a`;
  if (hour === 12) return '12p';
  return `${hour - 12}p`;
}

function formatHour12(hour: number): string {
  const h = hour % 24;
  if (h === 0) return '12:00 AM';
  if (h < 12) return `${h}:00 AM`;
  if (h === 12) return '12:00 PM';
  return `${h - 12}:00 PM`;
}

// ---------- component ----------

export const MeetingPlanner = () => {
  const [selectedCities, setSelectedCities] = useState<SelectedCity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchCitiesLocal>>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Tick every second for the current-time indicator
  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Search cities when query changes
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    const results = searchCitiesLocal(searchQuery, 8);
    // Filter out already-selected cities
    const filtered = results.filter(
      (r) => !selectedCities.some((c) => c.id === r.geonameid)
    );
    setSearchResults(filtered);
    setShowDropdown(filtered.length > 0);
  }, [searchQuery, selectedCities]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const addCity = useCallback(
    (result: ReturnType<typeof searchCitiesLocal>[number]) => {
      if (selectedCities.length >= 5) return;
      if (selectedCities.some((c) => c.id === result.geonameid)) return;
      setSelectedCities((prev) => [
        ...prev,
        {
          id: result.geonameid,
          name: result.name,
          country: result.country,
          timezone: result.timezone,
          countryCode: result.countryCode,
        },
      ]);
      setSearchQuery('');
      setShowDropdown(false);
      inputRef.current?.focus();
    },
    [selectedCities]
  );

  const removeCity = useCallback((id: number) => {
    setSelectedCities((prev) => prev.filter((c) => c.id !== id));
  }, []);

  // Build a reference Date for the chosen date at 00:00 UTC
  const referenceDate = useMemo(() => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d, 0, 0, 0));
  }, [selectedDate]);

  // Calculate the UTC offset in hours for each city on the reference date
  const cityOffsets = useMemo(() => {
    return selectedCities.map((city) => {
      // Get the local hour at the reference date midnight UTC
      const localHourAtMidnightUTC = getHourInTimezone(referenceDate, city.timezone);
      // offset = localHour - 0 (UTC hour)
      // But we must handle the wrap-around: if localHour is 23 and UTC is 0, offset is -1 not 23
      let offset = localHourAtMidnightUTC;
      if (offset > 12) offset -= 24;
      return { city, offset };
    });
  }, [selectedCities, referenceDate]);

  // Compute overlapping business hours (9-17 in every city)
  const overlappingSlots = useMemo(() => {
    if (selectedCities.length < 2) return [];

    const slots: OverlapSlot[] = [];

    for (let utcHour = 0; utcHour < 24; utcHour++) {
      // For each UTC hour, compute the local hour in each city
      const times = cityOffsets.map(({ city, offset }) => {
        let localHour = (utcHour + offset) % 24;
        if (localHour < 0) localHour += 24;
        return {
          city: city.name,
          hour: localHour,
          minute: 0,
          label: formatHour12(localHour),
        };
      });

      // Check if ALL cities are within business hours (9-16, i.e., 9:00-17:00)
      const allBusiness = times.every((t) => t.hour >= 9 && t.hour < 17);
      if (allBusiness) {
        slots.push({ utcHour, times });
      }
    }
    return slots;
  }, [cityOffsets, selectedCities.length]);

  // Current time fraction (0-24) in each timezone for the red line
  const currentHourFraction = useCallback(
    (timezone: string) => {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      }).formatToParts(currentTime);
      const h = parseInt(parts.find((p) => p.type === 'hour')?.value ?? '0', 10) % 24;
      const m = parseInt(parts.find((p) => p.type === 'minute')?.value ?? '0', 10);
      return h + m / 60;
    },
    [currentTime]
  );

  // Check if the selected date is today
  const isToday = useMemo(() => {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    return selectedDate === today;
  }, [selectedDate, currentTime]);

  if (!mounted) return null;

  return (
    <div className="page-container">
      <div className="content-container">
        <h1 className="heading-1 mb-2">Meeting Planner</h1>
        <p className="text-muted mb-8">
          Find overlapping business hours across time zones
        </p>

        {/* Date selector */}
        <div className="mb-6">
          <label
            htmlFor="meeting-date"
            className="block text-sm font-medium mb-2"
            style={{ color: 'rgb(var(--text-secondary))' }}
          >
            Date
          </label>
          <input
            id="meeting-date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input-field w-full sm:w-auto"
          />
        </div>

        {/* City selector */}
        <div className="card mb-8">
          <h2 className="heading-2 mb-4">Select Cities (2-5)</h2>

          {/* Selected city chips */}
          {selectedCities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCities.map((city) => (
                <span
                  key={city.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                    bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200"
                >
                  {city.name}, {city.countryCode}
                  <button
                    onClick={() => removeCity(city.id)}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    aria-label={`Remove ${city.name}`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Search input */}
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (searchResults.length > 0) setShowDropdown(true);
              }}
              placeholder={
                selectedCities.length >= 5
                  ? 'Maximum 5 cities selected'
                  : 'Search for a city...'
              }
              disabled={selectedCities.length >= 5}
              className="input-field w-full"
            />

            {/* Dropdown results */}
            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute z-50 mt-1 w-full rounded-lg shadow-lg border overflow-hidden
                  bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                {searchResults.map((result) => (
                  <button
                    key={result.geonameid}
                    onClick={() => addCity(result)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700
                      transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {result.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {result.country} &middot; {result.timezone}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Timeline visualization */}
        {selectedCities.length > 0 && (
          <div className="card mb-8">
            <h2 className="heading-2 mb-6">24-Hour Timeline</h2>
            <div className="space-y-4">
              {selectedCities.map((city) => {
                const fraction = currentHourFraction(city.timezone);
                const localTimeStr = isToday
                  ? getFormattedTimeWithSeconds(currentTime, city.timezone)
                  : getFormattedTime(referenceDate, city.timezone);

                return (
                  <div key={city.id}>
                    {/* City label + current time */}
                    <div className="flex items-baseline justify-between mb-1.5">
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {city.name}
                        </span>
                        <span className="text-sm text-muted ml-2">
                          {city.countryCode}
                        </span>
                      </div>
                      <span className="text-sm font-mono font-medium text-gray-700 dark:text-gray-300">
                        {localTimeStr}
                      </span>
                    </div>

                    {/* Bar */}
                    <div className="relative h-8 rounded-lg overflow-hidden flex">
                      {Array.from({ length: 24 }, (_, h) => {
                        const type = classifyHour(h);
                        let bgClass = '';
                        if (type === 'business') {
                          bgClass =
                            'bg-emerald-400/80 dark:bg-emerald-600/70';
                        } else if (type === 'night') {
                          bgClass =
                            'bg-gray-600/60 dark:bg-gray-700/80';
                        } else {
                          bgClass =
                            'bg-gray-300/60 dark:bg-gray-500/40';
                        }
                        return (
                          <div
                            key={h}
                            className={`flex-1 ${bgClass} border-r border-white/20 dark:border-gray-900/30 relative group`}
                            title={`${hourLabel(h)} - ${type}`}
                          >
                            {/* Hour labels at key positions */}
                            {(h % 6 === 0) && (
                              <span className="absolute -bottom-5 left-0 text-[10px] text-muted leading-none">
                                {hourLabel(h)}
                              </span>
                            )}
                          </div>
                        );
                      })}

                      {/* Current time red line (only shown if today) */}
                      {isToday && (
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 pointer-events-none"
                          style={{ left: `${(fraction / 24) * 100}%` }}
                        >
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-500" />
                        </div>
                      )}
                    </div>
                    {/* Bottom spacer for hour labels */}
                    <div className="h-5" />
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-muted">
                <span className="inline-block w-4 h-4 rounded bg-emerald-400/80 dark:bg-emerald-600/70" />
                Business (9 AM - 5 PM)
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <span className="inline-block w-4 h-4 rounded bg-gray-300/60 dark:bg-gray-500/40" />
                Other hours
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <span className="inline-block w-4 h-4 rounded bg-gray-600/60 dark:bg-gray-700/80" />
                Night (10 PM - 6 AM)
              </div>
              {isToday && (
                <div className="flex items-center gap-2 text-sm text-muted">
                  <span className="inline-block w-1 h-4 rounded bg-red-500" />
                  Current time
                </div>
              )}
            </div>
          </div>
        )}

        {/* Best meeting times */}
        {selectedCities.length >= 2 && (
          <div className="card">
            <h2 className="heading-2 mb-6">Best Meeting Times</h2>

            {overlappingSlots.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {overlappingSlots.map((slot) => (
                  <div
                    key={slot.utcHour}
                    className="rounded-lg border p-4
                      bg-emerald-50 border-emerald-200
                      dark:bg-emerald-900/20 dark:border-emerald-800"
                  >
                    <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wide">
                      UTC {String(slot.utcHour).padStart(2, '0')}:00
                    </div>
                    <div className="space-y-1">
                      {slot.times.map((t) => (
                        <div
                          key={t.city}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {t.city}
                          </span>
                          <span className="font-mono text-gray-900 dark:text-white">
                            {t.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No overlapping business hours found
                </h3>
                <p className="text-muted max-w-md mx-auto">
                  The selected cities do not share any 9 AM - 5 PM business hours.
                  Try choosing cities in closer time zones, or consider early-morning
                  or late-evening slots.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Empty state when fewer than 2 cities */}
        {selectedCities.length < 2 && (
          <div className="card text-center py-12">
            <svg
              className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Add at least 2 cities to find meeting times
            </h3>
            <p className="text-muted">
              Search and select cities above to compare their business hours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
