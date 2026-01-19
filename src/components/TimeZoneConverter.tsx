'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { ArrowRight, Plus, Trash2, Clock, Search, X, ChevronDown, Calendar } from 'lucide-react';

// City type definition
interface CityData {
    id: string;
    city: string;
    country: string;
    timezone: string;
}

// Fallback cities for instant loading (top 20 by population)
const FALLBACK_CITIES: CityData[] = [
    { id: 'tokyo-1850147', city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo' },
    { id: 'delhi-1273294', city: 'Delhi', country: 'India', timezone: 'Asia/Kolkata' },
    { id: 'shanghai-1796236', city: 'Shanghai', country: 'China', timezone: 'Asia/Shanghai' },
    { id: 'sao-paulo-3448439', city: 'Sao Paulo', country: 'Brazil', timezone: 'America/Sao_Paulo' },
    { id: 'mexico-city-3530597', city: 'Mexico City', country: 'Mexico', timezone: 'America/Mexico_City' },
    { id: 'cairo-360630', city: 'Cairo', country: 'Egypt', timezone: 'Africa/Cairo' },
    { id: 'mumbai-1275339', city: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata' },
    { id: 'beijing-1816670', city: 'Beijing', country: 'China', timezone: 'Asia/Shanghai' },
    { id: 'dhaka-1185241', city: 'Dhaka', country: 'Bangladesh', timezone: 'Asia/Dhaka' },
    { id: 'osaka-1853909', city: 'Osaka', country: 'Japan', timezone: 'Asia/Tokyo' },
    { id: 'new-york-5128581', city: 'New York', country: 'United States', timezone: 'America/New_York' },
    { id: 'karachi-1174872', city: 'Karachi', country: 'Pakistan', timezone: 'Asia/Karachi' },
    { id: 'buenos-aires-3435910', city: 'Buenos Aires', country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires' },
    { id: 'chongqing-1814906', city: 'Chongqing', country: 'China', timezone: 'Asia/Shanghai' },
    { id: 'istanbul-745044', city: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul' },
    { id: 'kolkata-1275004', city: 'Kolkata', country: 'India', timezone: 'Asia/Kolkata' },
    { id: 'manila-1701668', city: 'Manila', country: 'Philippines', timezone: 'Asia/Manila' },
    { id: 'lagos-2332459', city: 'Lagos', country: 'Nigeria', timezone: 'Africa/Lagos' },
    { id: 'rio-de-janeiro-3451190', city: 'Rio de Janeiro', country: 'Brazil', timezone: 'America/Sao_Paulo' },
    { id: 'london-2643743', city: 'London', country: 'United Kingdom', timezone: 'Europe/London' },
];

// Client-side cache for cities
let citiesCache: CityData[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

async function fetchTopCities(): Promise<CityData[]> {
    // Return cached cities if valid
    if (citiesCache && Date.now() - cacheTimestamp < CACHE_TTL) {
        return citiesCache;
    }

    try {
        const response = await fetch('/api/cities/top');
        if (!response.ok) throw new Error('Failed to fetch cities');
        const cities = await response.json();
        citiesCache = cities;
        cacheTimestamp = Date.now();
        return cities;
    } catch (error) {
        console.error('Error fetching cities:', error);
        return FALLBACK_CITIES;
    }
}

interface ConversionRow {
    id: string;
    cityId: string;
}

// City Search Modal - Kayak-style
function CitySearchModal({
    isOpen,
    onClose,
    onSelect,
    excludeIds,
    cities,
    title = 'Select City'
}: {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (cityId: string) => void;
    excludeIds: string[];
    cities: CityData[];
    title?: string;
}) {
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setSearchValue('');
            // Focus after a brief delay to ensure modal is rendered
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const filteredCities = useMemo(() => {
        const query = searchValue.toLowerCase().trim();
        if (!query) {
            // Show popular cities when no search
            return cities
                .filter(city => !excludeIds.includes(city.id))
                .slice(0, 15);
        }
        return cities
            .filter(city => !excludeIds.includes(city.id))
            .filter(city =>
                city.city.toLowerCase().includes(query) ||
                city.country.toLowerCase().includes(query)
            )
            .slice(0, 20);
    }, [searchValue, excludeIds, cities]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
                {/* Header with search */}
                <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Type a city name..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 text-lg text-gray-900 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                            autoFocus
                        />
                        {searchValue && (
                            <button
                                onClick={() => setSearchValue('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                            >
                                <X className="w-4 h-4 text-gray-400" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Results */}
                <div className="max-h-80 overflow-y-auto">
                    {filteredCities.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <p>No cities found for "{searchValue}"</p>
                            <p className="text-sm mt-1">Try a different spelling</p>
                        </div>
                    ) : (
                        <div className="py-2">
                            {!searchValue && (
                                <div className="px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wide">
                                    Popular Cities
                                </div>
                            )}
                            {filteredCities.map(city => (
                                <button
                                    key={city.id}
                                    onClick={() => {
                                        onSelect(city.id);
                                        onClose();
                                    }}
                                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-blue-50 transition-colors text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                                            🌍
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">{city.city}</div>
                                            <div className="text-sm text-gray-500">{city.country}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        {city.timezone.split('/').pop()?.replace(/_/g, ' ')}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export function TimeZoneConverter() {
    // Dynamic cities state - starts with fallback, loads full list from API
    const [cities, setCities] = useState<CityData[]>(FALLBACK_CITIES);
    const [isLoading, setIsLoading] = useState(true);

    const [sourceCityId, setSourceCityId] = useState('tokyo-1850147');
    const [sourceTime, setSourceTime] = useState('');
    const [sourceDate, setSourceDate] = useState('');
    const [rows, setRows] = useState<ConversionRow[]>([
        { id: '1', cityId: 'london-2643743' },
        { id: '2', cityId: 'new-york-5128581' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'source' | 'target' | string>('source');
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Fetch cities on mount
    useEffect(() => {
        fetchTopCities().then(fetchedCities => {
            setCities(fetchedCities);
            setIsLoading(false);
        });
    }, []);

    // Helper to get current time in a specific timezone
    const getCurrentTimeInTimezone = (timezone: string) => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
        const dateStr = now.toLocaleDateString('en-CA', { // YYYY-MM-DD format
            timeZone: timezone,
        });
        return { time: timeStr, date: dateStr };
    };

    // Initialize with current time in source city's timezone
    useEffect(() => {
        const sourceCity = cities.find((c: CityData) => c.id === sourceCityId);
        if (sourceCity) {
            const { time, date } = getCurrentTimeInTimezone(sourceCity.timezone);
            setSourceTime(time);
            setSourceDate(date);
        }
    }, [cities]); // Re-run when cities load

    // Update time when source city changes
    useEffect(() => {
        const sourceCity = cities.find((c: CityData) => c.id === sourceCityId);
        if (sourceCity) {
            const { time, date } = getCurrentTimeInTimezone(sourceCity.timezone);
            setSourceTime(time);
            setSourceDate(date);
        }
    }, [sourceCityId, cities]);

    const getCity = (cityId: string): CityData | undefined => cities.find((c: CityData) => c.id === cityId);

    const convertTime = (targetCityId: string) => {
        const sourceCity = getCity(sourceCityId);
        const targetCity = getCity(targetCityId);
        if (!sourceTime || !sourceDate || !targetCity || !sourceCity) return { time: '--:--', date: '---', diff: '' };

        try {
            const [hours, minutes] = sourceTime.split(':').map(Number);
            const [year, month, day] = sourceDate.split('-').map(Number);

            const dateInSourceTz = new Date(Date.UTC(year, month - 1, day, hours, minutes));

            const sourceFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: sourceCity.timezone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            });

            const sourceParts = sourceFormatter.formatToParts(dateInSourceTz);
            const getPartValue = (type: string) => parseInt(sourceParts.find(p => p.type === type)?.value || '0');

            const sourceHourInTz = getPartValue('hour');
            const sourceMinuteInTz = getPartValue('minute');
            const sourceDayInTz = getPartValue('day');

            const hourDiff = hours - sourceHourInTz;
            const minuteDiff = minutes - sourceMinuteInTz;

            const adjustedUtc = new Date(dateInSourceTz.getTime() + (hourDiff * 60 + minuteDiff) * 60 * 1000);

            if (sourceDayInTz !== day) {
                const dayDiff = day - sourceDayInTz;
                adjustedUtc.setTime(adjustedUtc.getTime() + dayDiff * 24 * 60 * 60 * 1000);
            }

            const timeStr = adjustedUtc.toLocaleTimeString('en-US', {
                timeZone: targetCity.timezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });

            const dateStr = adjustedUtc.toLocaleDateString('en-US', {
                timeZone: targetCity.timezone,
                weekday: 'short',
                month: 'short',
                day: 'numeric',
            });

            // Calculate offset diff using Intl (more accurate than static offsets)
            const now = new Date();
            const sourceOffset = -new Date(now.toLocaleString('en-US', { timeZone: sourceCity.timezone })).getTimezoneOffset() / 60;
            const targetOffset = -new Date(now.toLocaleString('en-US', { timeZone: targetCity.timezone })).getTimezoneOffset() / 60;
            const diff = targetOffset - sourceOffset;
            const diffStr = diff >= 0 ? `+${diff}h` : `${diff}h`;

            return { time: timeStr, date: dateStr, diff: diffStr };
        } catch {
            return { time: '--:--', date: '---', diff: '' };
        }
    };

    const openCityModal = (mode: 'source' | string) => {
        setModalMode(mode);
        setIsModalOpen(true);
    };

    const handleCitySelect = (cityId: string) => {
        if (modalMode === 'source') {
            setSourceCityId(cityId);
        } else {
            const existingRow = rows.find(r => r.id === modalMode);
            if (existingRow) {
                setRows(rows.map(r => r.id === modalMode ? { ...r, cityId } : r));
            } else {
                setRows([...rows, { id: Date.now().toString(), cityId }]);
            }
        }
    };

    const handleAddCity = () => {
        setModalMode('new');
        setIsModalOpen(true);
    };

    const removeRow = (id: string) => {
        if (rows.length > 1) {
            setRows(rows.filter(r => r.id !== id));
        }
    };

    const sourceCity = getCity(sourceCityId);
    const usedCityIds = [sourceCityId, ...rows.map(r => r.cityId)];

    const formatDisplayDate = () => {
        if (!sourceDate) return 'Today';
        const [year, month, day] = sourceDate.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        const today = new Date();
        if (date.toDateString() === today.toDateString()) return 'Today';
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* City Search Modal */}
            <CitySearchModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={handleCitySelect}
                excludeIds={modalMode === 'new' ? usedCityIds : usedCityIds.filter(id => id !== (modalMode === 'source' ? sourceCityId : rows.find(r => r.id === modalMode)?.cityId))}
                cities={cities}
                title={modalMode === 'source' ? 'From City' : 'To City'}
            />

            {/* Kayak-style converter - Main card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                {/* From section */}
                <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* City selector - PRIMARY */}
                        <button
                            onClick={() => openCityModal('source')}
                            className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 text-left transition-all group border border-white/20"
                        >
                            <div className="text-xs text-blue-100 uppercase tracking-wide mb-1">From</div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-semibold text-white">{sourceCity?.city}</div>
                                    <div className="text-blue-200">{sourceCity?.country}</div>
                                </div>
                                <ChevronDown className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                            </div>
                        </button>

                        {/* Time selector - PRIMARY */}
                        <div className="md:w-48 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="text-xs text-blue-100 uppercase tracking-wide mb-1">Time</div>
                            <input
                                type="time"
                                value={sourceTime}
                                onChange={(e) => setSourceTime(e.target.value)}
                                className="w-full text-2xl font-semibold text-white bg-transparent border-none outline-none cursor-pointer"
                            />
                        </div>

                        {/* Date - SECONDARY (collapsed by default) */}
                        <div className="relative">
                            <button
                                onClick={() => setShowDatePicker(!showDatePicker)}
                                className="h-full md:w-32 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-4 text-left transition-all border border-white/10 flex flex-col justify-center"
                            >
                                <div className="text-xs text-blue-200 uppercase tracking-wide mb-1 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    Date
                                </div>
                                <div className="text-sm text-blue-100">{formatDisplayDate()}</div>
                            </button>

                            {showDatePicker && (
                                <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl p-4 z-10">
                                    <input
                                        type="date"
                                        value={sourceDate}
                                        onChange={(e) => {
                                            setSourceDate(e.target.value);
                                            setShowDatePicker(false);
                                        }}
                                        className="text-gray-900"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Arrow divider */}
                <div className="flex justify-center -my-4 relative z-10">
                    <div className="w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-blue-600 rotate-90" />
                    </div>
                </div>

                {/* To section - Results */}
                <div className="p-6 pt-8">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">Convert To</span>
                        <button
                            onClick={handleAddCity}
                            className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                        >
                            <Plus className="w-4 h-4" />
                            Add City
                        </button>
                    </div>

                    <div className="space-y-3">
                        {rows.map((row) => {
                            const city = getCity(row.cityId);
                            const converted = convertTime(row.cityId);

                            return (
                                <div
                                    key={row.id}
                                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                                >
                                    <button
                                        onClick={() => openCityModal(row.id)}
                                        className="flex-1 flex items-center gap-3 text-left"
                                    >
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                                            🌍
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">{city?.city}</div>
                                            <div className="text-sm text-gray-500">{city?.country}</div>
                                        </div>
                                    </button>

                                    <div className="text-right">
                                        <div className="text-2xl font-mono font-light text-gray-800">
                                            {converted.time}
                                        </div>
                                        <div className="text-sm text-gray-500 flex items-center justify-end gap-2">
                                            <span>{converted.date}</span>
                                            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full font-medium">
                                                {converted.diff}
                                            </span>
                                        </div>
                                    </div>

                                    {rows.length > 1 && (
                                        <button
                                            onClick={() => removeRow(row.id)}
                                            className="p-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                            title="Remove"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Quick compare strip */}
            <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
                {['los-angeles', 'london', 'tokyo', 'sydney', 'dubai'].map(cityId => {
                    const city = getCity(cityId);
                    const converted = convertTime(cityId);
                    if (!city || usedCityIds.includes(cityId)) return null;

                    return (
                        <button
                            key={cityId}
                            onClick={() => setRows([...rows, { id: Date.now().toString(), cityId }])}
                            className="flex-shrink-0 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all text-left"
                        >
                            <div className="text-xs text-gray-400 mb-1">Quick add</div>
                            <div className="font-medium text-gray-900">{city.city}</div>
                            <div className="text-lg font-mono text-blue-600">{converted.time}</div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
