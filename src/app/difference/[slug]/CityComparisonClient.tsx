'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { WorldCity } from '@/data/world-cities';
import { ArrowLeftRight, Clock, Calendar, Sun, Moon, Briefcase, Globe } from 'lucide-react';

interface CityComparisonClientProps {
    city1: WorldCity;
    city2: WorldCity;
}

export default function CityComparisonClient({ city1, city2 }: CityComparisonClientProps) {
    const [currentTime, setCurrentTime] = useState<Date>(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date, timezone: string) => {
        return new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        }).format(date);
    };

    const formatDate = (date: Date, timezone: string) => {
        return new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        }).format(date);
    };

    // Calculate time difference in hours
    const getOffsetHours = (tz: string) => {
        const date = new Date();
        const str = date.toLocaleString('en-US', { timeZone: tz, timeZoneName: 'shortOffset' });
        const offsetPart = str.split('GMT')[1];
        if (!offsetPart) return 0;

        const [hours, minutes] = offsetPart.split(':').map(Number);
        return hours + (minutes || 0) / 60;
    };

    const diffHours = getOffsetHours(city2.timezone) - getOffsetHours(city1.timezone);
    const diffDisplay = diffHours === 0
        ? "Same time"
        : `${Math.abs(diffHours)} hours ${diffHours > 0 ? 'ahead' : 'behind'}`;

    // Generate meeting planner times (start 6am to 10pm for city1)
    const meetingTimes = Array.from({ length: 17 }, (_, i) => i + 6);

    const isWorkingHour = (hour: number) => hour >= 9 && hour <= 17;

    // Helper to calculate target city hour
    const getTargetHour = (baseHour: number) => {
        let hour = (baseHour + diffHours) % 24;
        if (hour < 0) hour += 24;
        return hour;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
                        <ArrowLeftRight className="w-4 h-4" /> Time Difference
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                        {city1.city} vs {city2.city}
                    </h1>
                    <p className="text-xl text-slate-600">
                        {city2.city} is <span className="font-bold text-blue-600">{diffDisplay}</span> {city1.city}
                    </p>
                </div>

                {/* Clock Comparison Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {/* City 1 */}
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 flex flex-col items-center">
                        <span className="text-slate-500 mb-2 uppercase tracking-wide text-sm font-semibold">{city1.country}</span>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">{city1.city}</h2>

                        <div className="text-6xl font-mono text-slate-800 font-light tracking-tighter mb-4">
                            {formatTime(currentTime, city1.timezone)}
                        </div>

                        <div className="flex items-center gap-2 text-slate-500">
                            <Calendar className="w-4 h-4" />
                            {formatDate(currentTime, city1.timezone)}
                        </div>
                    </div>

                    {/* City 2 */}
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 flex flex-col items-center relative overflow-hidden">
                        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
                        <span className="text-slate-500 mb-2 uppercase tracking-wide text-sm font-semibold">{city2.country}</span>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">{city2.city}</h2>

                        <div className="text-6xl font-mono text-blue-600 font-light tracking-tighter mb-4">
                            {formatTime(currentTime, city2.timezone)}
                        </div>

                        <div className="flex items-center gap-2 text-slate-500">
                            <Calendar className="w-4 h-4" />
                            {formatDate(currentTime, city2.timezone)}
                        </div>
                    </div>
                </div>

                {/* Meeting Planner */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-slate-500" />
                                Meeting Planner
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">Best times to call between {city1.city} and {city2.city}</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-medium">
                            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500" /> Good Time</span>
                            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-yellow-400" /> Stretch</span>
                            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-300" /> Sleeping/Off</span>
                        </div>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {meetingTimes.map((hour1) => {
                            const hour2 = getTargetHour(hour1);

                            // Determine overlapping status
                            // Green: Both 9-5
                            // Yellow: Both 7-10pm
                            // Gray: One is sleeping (11pm-6am)

                            const isWork1 = isWorkingHour(hour1);
                            const isWork2 = isWorkingHour(Math.floor(hour2));
                            const isAwake1 = hour1 >= 7 && hour1 <= 22;
                            const isAwake2 = hour2 >= 7 && hour2 <= 22;

                            let statusColor = "bg-slate-50 opacity-60"; // Bad
                            let textColor = "text-slate-400";

                            if (isWork1 && isWork2) {
                                statusColor = "bg-green-50 border-l-4 border-green-500";
                                textColor = "text-slate-900";
                            } else if (isAwake1 && isAwake2) {
                                statusColor = "bg-yellow-50 border-l-4 border-yellow-400";
                                textColor = "text-slate-700";
                            }

                            // Format times
                            const formatH = (h: number) => {
                                const ampm = h >= 12 && h < 24 ? 'PM' : 'AM';
                                const dH = h % 12 || 12;
                                return `${dH}:00 ${ampm}`;
                            };

                            return (
                                <div key={hour1} className={`flex items-center justify-between p-4 ${statusColor} transition-colors hover:bg-slate-100`}>
                                    <div className={`w-1/3 text-right font-medium ${isWork1 ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                                        {formatH(hour1)} <span className="text-xs text-slate-400 hidden sm:inline">{city1.city}</span>
                                    </div>

                                    <div className="px-4 text-slate-300">
                                        <ArrowLeftRight className="w-4 h-4" />
                                    </div>

                                    <div className={`w-1/3 text-left font-medium ${isWork2 ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                                        {formatH(Math.floor(hour2))} <span className="text-xs text-slate-400 hidden sm:inline">{city2.city}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8 text-center text-slate-500 text-sm">
                    <p>Current scheduled offset: {diffDisplay}. DST rules are automatically applied.</p>
                </div>
            </div>
        </div>
    );
}
