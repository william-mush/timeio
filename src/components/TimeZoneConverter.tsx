'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { ArrowRight, Plus, Trash2, Clock, Search, X, ChevronDown, Calendar } from 'lucide-react';

// Extended list of world cities with timezones
const WORLD_CITIES = [
    // Americas
    { id: 'new-york', city: 'New York', country: 'USA', timezone: 'America/New_York', offset: -5 },
    { id: 'los-angeles', city: 'Los Angeles', country: 'USA', timezone: 'America/Los_Angeles', offset: -8 },
    { id: 'chicago', city: 'Chicago', country: 'USA', timezone: 'America/Chicago', offset: -6 },
    { id: 'houston', city: 'Houston', country: 'USA', timezone: 'America/Chicago', offset: -6 },
    { id: 'phoenix', city: 'Phoenix', country: 'USA', timezone: 'America/Phoenix', offset: -7 },
    { id: 'miami', city: 'Miami', country: 'USA', timezone: 'America/New_York', offset: -5 },
    { id: 'denver', city: 'Denver', country: 'USA', timezone: 'America/Denver', offset: -7 },
    { id: 'seattle', city: 'Seattle', country: 'USA', timezone: 'America/Los_Angeles', offset: -8 },
    { id: 'boston', city: 'Boston', country: 'USA', timezone: 'America/New_York', offset: -5 },
    { id: 'san-francisco', city: 'San Francisco', country: 'USA', timezone: 'America/Los_Angeles', offset: -8 },
    { id: 'toronto', city: 'Toronto', country: 'Canada', timezone: 'America/Toronto', offset: -5 },
    { id: 'vancouver', city: 'Vancouver', country: 'Canada', timezone: 'America/Vancouver', offset: -8 },
    { id: 'mexico-city', city: 'Mexico City', country: 'Mexico', timezone: 'America/Mexico_City', offset: -6 },
    { id: 'sao-paulo', city: 'São Paulo', country: 'Brazil', timezone: 'America/Sao_Paulo', offset: -3 },
    { id: 'buenos-aires', city: 'Buenos Aires', country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires', offset: -3 },
    { id: 'bogota', city: 'Bogotá', country: 'Colombia', timezone: 'America/Bogota', offset: -5 },
    { id: 'lima', city: 'Lima', country: 'Peru', timezone: 'America/Lima', offset: -5 },
    { id: 'santiago', city: 'Santiago', country: 'Chile', timezone: 'America/Santiago', offset: -3 },

    // Europe
    { id: 'london', city: 'London', country: 'UK', timezone: 'Europe/London', offset: 0 },
    { id: 'paris', city: 'Paris', country: 'France', timezone: 'Europe/Paris', offset: 1 },
    { id: 'berlin', city: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin', offset: 1 },
    { id: 'madrid', city: 'Madrid', country: 'Spain', timezone: 'Europe/Madrid', offset: 1 },
    { id: 'rome', city: 'Rome', country: 'Italy', timezone: 'Europe/Rome', offset: 1 },
    { id: 'amsterdam', city: 'Amsterdam', country: 'Netherlands', timezone: 'Europe/Amsterdam', offset: 1 },
    { id: 'moscow', city: 'Moscow', country: 'Russia', timezone: 'Europe/Moscow', offset: 3 },
    { id: 'istanbul', city: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul', offset: 3 },
    { id: 'athens', city: 'Athens', country: 'Greece', timezone: 'Europe/Athens', offset: 2 },
    { id: 'vienna', city: 'Vienna', country: 'Austria', timezone: 'Europe/Vienna', offset: 1 },
    { id: 'zurich', city: 'Zurich', country: 'Switzerland', timezone: 'Europe/Zurich', offset: 1 },
    { id: 'stockholm', city: 'Stockholm', country: 'Sweden', timezone: 'Europe/Stockholm', offset: 1 },
    { id: 'oslo', city: 'Oslo', country: 'Norway', timezone: 'Europe/Oslo', offset: 1 },
    { id: 'copenhagen', city: 'Copenhagen', country: 'Denmark', timezone: 'Europe/Copenhagen', offset: 1 },
    { id: 'dublin', city: 'Dublin', country: 'Ireland', timezone: 'Europe/Dublin', offset: 0 },
    { id: 'lisbon', city: 'Lisbon', country: 'Portugal', timezone: 'Europe/Lisbon', offset: 0 },
    { id: 'warsaw', city: 'Warsaw', country: 'Poland', timezone: 'Europe/Warsaw', offset: 1 },
    { id: 'prague', city: 'Prague', country: 'Czech Republic', timezone: 'Europe/Prague', offset: 1 },
    { id: 'budapest', city: 'Budapest', country: 'Hungary', timezone: 'Europe/Budapest', offset: 1 },
    { id: 'brussels', city: 'Brussels', country: 'Belgium', timezone: 'Europe/Brussels', offset: 1 },

    // Asia
    { id: 'tokyo', city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', offset: 9 },
    { id: 'shanghai', city: 'Shanghai', country: 'China', timezone: 'Asia/Shanghai', offset: 8 },
    { id: 'beijing', city: 'Beijing', country: 'China', timezone: 'Asia/Shanghai', offset: 8 },
    { id: 'hong-kong', city: 'Hong Kong', country: 'China', timezone: 'Asia/Hong_Kong', offset: 8 },
    { id: 'singapore', city: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore', offset: 8 },
    { id: 'seoul', city: 'Seoul', country: 'South Korea', timezone: 'Asia/Seoul', offset: 9 },
    { id: 'mumbai', city: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata', offset: 5.5 },
    { id: 'delhi', city: 'Delhi', country: 'India', timezone: 'Asia/Kolkata', offset: 5.5 },
    { id: 'bangalore', city: 'Bangalore', country: 'India', timezone: 'Asia/Kolkata', offset: 5.5 },
    { id: 'bangkok', city: 'Bangkok', country: 'Thailand', timezone: 'Asia/Bangkok', offset: 7 },
    { id: 'jakarta', city: 'Jakarta', country: 'Indonesia', timezone: 'Asia/Jakarta', offset: 7 },
    { id: 'dubai', city: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai', offset: 4 },
    { id: 'riyadh', city: 'Riyadh', country: 'Saudi Arabia', timezone: 'Asia/Riyadh', offset: 3 },
    { id: 'tel-aviv', city: 'Tel Aviv', country: 'Israel', timezone: 'Asia/Jerusalem', offset: 2 },
    { id: 'manila', city: 'Manila', country: 'Philippines', timezone: 'Asia/Manila', offset: 8 },
    { id: 'kuala-lumpur', city: 'Kuala Lumpur', country: 'Malaysia', timezone: 'Asia/Kuala_Lumpur', offset: 8 },
    { id: 'taipei', city: 'Taipei', country: 'Taiwan', timezone: 'Asia/Taipei', offset: 8 },
    { id: 'ho-chi-minh', city: 'Ho Chi Minh City', country: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh', offset: 7 },

    // Oceania
    { id: 'sydney', city: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', offset: 11 },
    { id: 'melbourne', city: 'Melbourne', country: 'Australia', timezone: 'Australia/Melbourne', offset: 11 },
    { id: 'brisbane', city: 'Brisbane', country: 'Australia', timezone: 'Australia/Brisbane', offset: 10 },
    { id: 'perth', city: 'Perth', country: 'Australia', timezone: 'Australia/Perth', offset: 8 },
    { id: 'auckland', city: 'Auckland', country: 'New Zealand', timezone: 'Pacific/Auckland', offset: 13 },

    // Africa
    { id: 'cairo', city: 'Cairo', country: 'Egypt', timezone: 'Africa/Cairo', offset: 2 },
    { id: 'johannesburg', city: 'Johannesburg', country: 'South Africa', timezone: 'Africa/Johannesburg', offset: 2 },
    { id: 'lagos', city: 'Lagos', country: 'Nigeria', timezone: 'Africa/Lagos', offset: 1 },
    { id: 'nairobi', city: 'Nairobi', country: 'Kenya', timezone: 'Africa/Nairobi', offset: 3 },
    { id: 'casablanca', city: 'Casablanca', country: 'Morocco', timezone: 'Africa/Casablanca', offset: 1 },
];

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
    title = 'Select City'
}: {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (cityId: string) => void;
    excludeIds: string[];
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
            return WORLD_CITIES
                .filter(city => !excludeIds.includes(city.id))
                .slice(0, 15);
        }
        return WORLD_CITIES
            .filter(city => !excludeIds.includes(city.id))
            .filter(city =>
                city.city.toLowerCase().includes(query) ||
                city.country.toLowerCase().includes(query)
            )
            .slice(0, 20);
    }, [searchValue, excludeIds]);

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
    const [sourceCityId, setSourceCityId] = useState('new-york');
    const [sourceTime, setSourceTime] = useState('');
    const [sourceDate, setSourceDate] = useState('');
    const [rows, setRows] = useState<ConversionRow[]>([
        { id: '1', cityId: 'london' },
        { id: '2', cityId: 'tokyo' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'source' | 'target' | string>('source');
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Initialize with current time
    useEffect(() => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        setSourceTime(`${hours}:${minutes}`);

        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        setSourceDate(`${year}-${month}-${day}`);
    }, []);

    const getCity = (cityId: string) => WORLD_CITIES.find(c => c.id === cityId);

    const convertTime = (targetCityId: string) => {
        const targetCity = getCity(targetCityId);
        if (!sourceTime || !sourceDate || !targetCity) return { time: '--:--', date: '---', diff: '' };

        try {
            const [hours, minutes] = sourceTime.split(':').map(Number);
            const [year, month, day] = sourceDate.split('-').map(Number);

            const sourceDate_ = new Date(year, month - 1, day, hours, minutes);

            const timeStr = sourceDate_.toLocaleTimeString('en-US', {
                timeZone: targetCity.timezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });

            const dateStr = sourceDate_.toLocaleDateString('en-US', {
                timeZone: targetCity.timezone,
                weekday: 'short',
                month: 'short',
                day: 'numeric',
            });

            const sourceCity = getCity(sourceCityId);
            const sourceOffset = sourceCity?.offset || 0;
            const targetOffset = targetCity.offset;
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
            // Find if we're editing or adding
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
