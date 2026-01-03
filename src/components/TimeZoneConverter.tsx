'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { ArrowLeftRight, Plus, Trash2, Clock, Globe, Search, X } from 'lucide-react';

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

// City Search Modal
function CitySearchModal({
    isOpen,
    onClose,
    onSelect,
    excludeIds
}: {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (cityId: string) => void;
    excludeIds: string[];
}) {
    const [search, setSearch] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
        if (!isOpen) {
            setSearch('');
        }
    }, [isOpen]);

    const filteredCities = useMemo(() => {
        const query = search.toLowerCase();
        return WORLD_CITIES
            .filter(city => !excludeIds.includes(city.id))
            .filter(city =>
                city.city.toLowerCase().includes(query) ||
                city.country.toLowerCase().includes(query) ||
                city.timezone.toLowerCase().includes(query)
            )
            .slice(0, 20);
    }, [search, excludeIds]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[70vh] flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">Add City</h3>
                        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search cities..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Results */}
                <div className="flex-1 overflow-y-auto p-2">
                    {filteredCities.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No cities found matching "{search}"
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {filteredCities.map(city => (
                                <button
                                    key={city.id}
                                    onClick={() => {
                                        onSelect(city.id);
                                        onClose();
                                    }}
                                    className="w-full flex items-center justify-between p-3 hover:bg-blue-50 rounded-xl transition-colors text-left"
                                >
                                    <div>
                                        <div className="font-medium text-gray-900">{city.city}</div>
                                        <div className="text-sm text-gray-500">{city.country}</div>
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
    const [editingRowId, setEditingRowId] = useState<string | null>(null);

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

    // Convert time to target timezone
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

    const handleAddCity = () => {
        setEditingRowId(null);
        setIsModalOpen(true);
    };

    const handleCitySelect = (cityId: string) => {
        if (editingRowId) {
            // Editing existing row
            setRows(rows.map(r => r.id === editingRowId ? { ...r, cityId } : r));
        } else {
            // Adding new row
            setRows([...rows, { id: Date.now().toString(), cityId }]);
        }
        setEditingRowId(null);
    };

    const removeRow = (id: string) => {
        if (rows.length > 1) {
            setRows(rows.filter(r => r.id !== id));
        }
    };

    const swapTimezones = () => {
        if (rows.length > 0) {
            const firstRow = rows[0];
            const newSourceCityId = firstRow.cityId;
            setRows([{ ...firstRow, cityId: sourceCityId }, ...rows.slice(1)]);
            setSourceCityId(newSourceCityId);
        }
    };

    const sourceCity = getCity(sourceCityId);
    const usedCityIds = [sourceCityId, ...rows.map(r => r.cityId)];

    return (
        <div className="max-w-4xl mx-auto">
            {/* City Search Modal */}
            <CitySearchModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingRowId(null);
                }}
                onSelect={handleCitySelect}
                excludeIds={usedCityIds}
            />

            {/* Source Time Input */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 md:p-8 text-white mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">Convert From</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* City selector */}
                    <div>
                        <label className="block text-sm text-blue-100 mb-1">City</label>
                        <button
                            onClick={() => {
                                setEditingRowId('source');
                                setIsModalOpen(true);
                            }}
                            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl text-white border border-white/30 text-left hover:bg-white/30 transition-colors flex items-center justify-between"
                        >
                            <span>{sourceCity?.city}, {sourceCity?.country}</span>
                            <Search className="w-4 h-4 opacity-70" />
                        </button>
                    </div>

                    {/* Time input */}
                    <div>
                        <label className="block text-sm text-blue-100 mb-1">Time</label>
                        <input
                            type="time"
                            value={sourceTime}
                            onChange={(e) => setSourceTime(e.target.value)}
                            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                    </div>

                    {/* Date input */}
                    <div>
                        <label className="block text-sm text-blue-100 mb-1">Date</label>
                        <input
                            type="date"
                            value={sourceDate}
                            onChange={(e) => setSourceDate(e.target.value)}
                            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                    </div>
                </div>
            </div>

            {/* Swap button */}
            <div className="flex justify-center -my-3 relative z-10">
                <button
                    onClick={swapTimezones}
                    className="p-3 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    title="Swap timezones"
                >
                    <ArrowLeftRight className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            {/* Converted Times */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mt-6">
                <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-700">
                        <Globe className="w-5 h-5" />
                        <span className="font-medium">Convert To</span>
                    </div>
                    <button
                        onClick={handleAddCity}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        Add City
                    </button>
                </div>

                <div className="divide-y divide-gray-100">
                    {rows.map((row) => {
                        const city = getCity(row.cityId);
                        const converted = convertTime(row.cityId);

                        return (
                            <div key={row.id} className="p-4 md:p-6 flex items-center gap-4">
                                <div className="flex-1">
                                    <button
                                        onClick={() => {
                                            setEditingRowId(row.id);
                                            setIsModalOpen(true);
                                        }}
                                        className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                                    >
                                        <span className="font-medium text-gray-900">{city?.city}</span>
                                        <span className="text-gray-400 text-sm">{city?.country}</span>
                                        <Search className="w-3 h-3 text-gray-400 ml-1" />
                                    </button>
                                </div>

                                <div className="text-right">
                                    <div className="text-2xl md:text-3xl font-mono font-light text-gray-800">
                                        {converted.time}
                                    </div>
                                    <div className="text-sm text-gray-500 flex items-center justify-end gap-2">
                                        <span>{converted.date}</span>
                                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                                            {converted.diff}
                                        </span>
                                    </div>
                                </div>

                                {rows.length > 1 && (
                                    <button
                                        onClick={() => removeRow(row.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
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

            {/* Quick conversions */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                {['los-angeles', 'london', 'tokyo', 'sydney'].map(cityId => {
                    const city = getCity(cityId);
                    const converted = convertTime(cityId);
                    if (!city) return null;

                    return (
                        <div key={cityId} className="bg-gray-50 rounded-xl p-4 text-center">
                            <div className="text-sm text-gray-500 mb-1">{city.city}</div>
                            <div className="text-xl font-mono text-gray-800">{converted.time}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
