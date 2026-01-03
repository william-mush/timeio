'use client';

import { useState, useEffect, useMemo } from 'react';
import { ArrowRight, ArrowLeftRight, Plus, Trash2, Clock, Globe } from 'lucide-react';

// Common time zones with display names
const TIME_ZONES = [
    { id: 'America/New_York', label: 'New York (ET)', city: 'New York', offset: -5 },
    { id: 'America/Chicago', label: 'Chicago (CT)', city: 'Chicago', offset: -6 },
    { id: 'America/Denver', label: 'Denver (MT)', city: 'Denver', offset: -7 },
    { id: 'America/Los_Angeles', label: 'Los Angeles (PT)', city: 'Los Angeles', offset: -8 },
    { id: 'America/Anchorage', label: 'Anchorage (AKT)', city: 'Anchorage', offset: -9 },
    { id: 'Pacific/Honolulu', label: 'Honolulu (HST)', city: 'Honolulu', offset: -10 },
    { id: 'UTC', label: 'UTC / GMT', city: 'UTC', offset: 0 },
    { id: 'Europe/London', label: 'London (GMT)', city: 'London', offset: 0 },
    { id: 'Europe/Paris', label: 'Paris (CET)', city: 'Paris', offset: 1 },
    { id: 'Europe/Berlin', label: 'Berlin (CET)', city: 'Berlin', offset: 1 },
    { id: 'Europe/Moscow', label: 'Moscow (MSK)', city: 'Moscow', offset: 3 },
    { id: 'Asia/Dubai', label: 'Dubai (GST)', city: 'Dubai', offset: 4 },
    { id: 'Asia/Kolkata', label: 'Mumbai (IST)', city: 'Mumbai', offset: 5.5 },
    { id: 'Asia/Bangkok', label: 'Bangkok (ICT)', city: 'Bangkok', offset: 7 },
    { id: 'Asia/Singapore', label: 'Singapore (SGT)', city: 'Singapore', offset: 8 },
    { id: 'Asia/Shanghai', label: 'Shanghai (CST)', city: 'Shanghai', offset: 8 },
    { id: 'Asia/Tokyo', label: 'Tokyo (JST)', city: 'Tokyo', offset: 9 },
    { id: 'Australia/Sydney', label: 'Sydney (AEST)', city: 'Sydney', offset: 11 },
    { id: 'Pacific/Auckland', label: 'Auckland (NZST)', city: 'Auckland', offset: 13 },
];

interface ConversionRow {
    id: string;
    timezone: string;
}

export function TimeZoneConverter() {
    const [sourceTimezone, setSourceTimezone] = useState('America/New_York');
    const [sourceTime, setSourceTime] = useState('');
    const [sourceDate, setSourceDate] = useState('');
    const [rows, setRows] = useState<ConversionRow[]>([
        { id: '1', timezone: 'Europe/London' },
        { id: '2', timezone: 'Asia/Tokyo' },
    ]);

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

    // Convert time to target timezone
    const convertTime = (targetTimezone: string) => {
        if (!sourceTime || !sourceDate) return { time: '--:--', date: '---', diff: '' };

        try {
            const [hours, minutes] = sourceTime.split(':').map(Number);
            const [year, month, day] = sourceDate.split('-').map(Number);

            // Create date in source timezone
            const sourceDate_ = new Date(year, month - 1, day, hours, minutes);

            // Format in target timezone
            const timeStr = sourceDate_.toLocaleTimeString('en-US', {
                timeZone: targetTimezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });

            const dateStr = sourceDate_.toLocaleDateString('en-US', {
                timeZone: targetTimezone,
                weekday: 'short',
                month: 'short',
                day: 'numeric',
            });

            // Calculate rough difference
            const sourceOffset = TIME_ZONES.find(tz => tz.id === sourceTimezone)?.offset || 0;
            const targetOffset = TIME_ZONES.find(tz => tz.id === targetTimezone)?.offset || 0;
            const diff = targetOffset - sourceOffset;
            const diffStr = diff >= 0 ? `+${diff}h` : `${diff}h`;

            return { time: timeStr, date: dateStr, diff: diffStr };
        } catch {
            return { time: '--:--', date: '---', diff: '' };
        }
    };

    const addRow = () => {
        const usedTimezones = new Set([sourceTimezone, ...rows.map(r => r.timezone)]);
        const availableTimezone = TIME_ZONES.find(tz => !usedTimezones.has(tz.id));
        if (availableTimezone) {
            setRows([...rows, { id: Date.now().toString(), timezone: availableTimezone.id }]);
        }
    };

    const removeRow = (id: string) => {
        if (rows.length > 1) {
            setRows(rows.filter(r => r.id !== id));
        }
    };

    const updateRowTimezone = (id: string, timezone: string) => {
        setRows(rows.map(r => r.id === id ? { ...r, timezone } : r));
    };

    const swapTimezones = () => {
        if (rows.length > 0) {
            const firstRow = rows[0];
            const newSourceTimezone = firstRow.timezone;
            setRows([{ ...firstRow, timezone: sourceTimezone }, ...rows.slice(1)]);
            setSourceTimezone(newSourceTimezone);
        }
    };

    const sourceZone = TIME_ZONES.find(tz => tz.id === sourceTimezone);

    return (
        <div className="max-w-4xl mx-auto">
            {/* Source Time Input */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 md:p-8 text-white mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">Convert From</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Timezone selector */}
                    <div>
                        <label className="block text-sm text-blue-100 mb-1">Timezone</label>
                        <select
                            value={sourceTimezone}
                            onChange={(e) => setSourceTimezone(e.target.value)}
                            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                        >
                            {TIME_ZONES.map(tz => (
                                <option key={tz.id} value={tz.id} className="text-gray-900">
                                    {tz.label}
                                </option>
                            ))}
                        </select>
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
                        onClick={addRow}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        Add City
                    </button>
                </div>

                <div className="divide-y divide-gray-100">
                    {rows.map((row, index) => {
                        const converted = convertTime(row.timezone);
                        const zone = TIME_ZONES.find(tz => tz.id === row.timezone);

                        return (
                            <div key={row.id} className="p-4 md:p-6 flex items-center gap-4">
                                <div className="flex-1">
                                    <select
                                        value={row.timezone}
                                        onChange={(e) => updateRowTimezone(row.id, e.target.value)}
                                        className="w-full md:w-auto px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                    >
                                        {TIME_ZONES.map(tz => (
                                            <option key={tz.id} value={tz.id}>
                                                {tz.label}
                                            </option>
                                        ))}
                                    </select>
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
                {['America/Los_Angeles', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'].map(tz => {
                    const zone = TIME_ZONES.find(t => t.id === tz);
                    const converted = convertTime(tz);
                    if (!zone) return null;

                    return (
                        <div key={tz} className="bg-gray-50 rounded-xl p-4 text-center">
                            <div className="text-sm text-gray-500 mb-1">{zone.city}</div>
                            <div className="text-xl font-mono text-gray-800">{converted.time}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
