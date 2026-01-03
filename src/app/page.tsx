'use client';

import { TimeDisplay } from '@/components/Time';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Clock, Bell, MapPin, Sun, Building2, History } from 'lucide-react';

export default function Home() {
  const [showMs, setShowMs] = useState(false);

  useEffect(() => {
    const settings = localStorage.getItem('timeSettings');
    if (settings) {
      const { showMilliseconds } = JSON.parse(settings);
      setShowMs(showMilliseconds);
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero Section with Animated Gradient */}
      <div className="relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-100/50 via-transparent to-transparent animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        </div>

        {/* Hero content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col items-center text-center">
            <div className="scale-90 md:scale-100">
              <TimeDisplay showMilliseconds={showMs} />
            </div>
            <p className="mt-6 text-gray-500 text-lg max-w-md">
              Your elegant time companion for tracking time around the world
            </p>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid gap-4 md:gap-6">
          {/* Primary Features - Large Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* World Clock - Primary */}
            <Link
              href="/world-clock"
              className="group relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 md:p-8 text-white overflow-hidden transition-all hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  World Clock
                  <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                </h2>
                <p className="text-white/80 text-base md:text-lg">
                  Track time across any city in the world with beautiful visualizations
                </p>
              </div>
            </Link>

            {/* Alarms - Primary */}
            <Link
              href="/alarms"
              className="group relative bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white overflow-hidden transition-all hover:shadow-xl hover:shadow-purple-500/25 hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Alarms
                  <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                </h2>
                <p className="text-white/80 text-base md:text-lg">
                  Set and manage your alarms with style and precision
                </p>
              </div>
            </Link>
          </div>

          {/* Secondary Features - Smaller Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* World Map */}
            <Link
              href="/world-map"
              className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-blue-200 transition-all hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                World Map
                <span className="inline-block ml-1 transition-transform group-hover:translate-x-0.5">→</span>
              </h3>
              <p className="text-sm text-gray-500">Visual time zone explorer</p>
            </Link>

            {/* US Cities */}
            <Link
              href="/us-cities"
              className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-emerald-200 transition-all hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                US Cities
                <span className="inline-block ml-1 transition-transform group-hover:translate-x-0.5">→</span>
              </h3>
              <p className="text-sm text-gray-500">Find time for any US city</p>
            </Link>

            {/* Solar Clock */}
            <Link
              href="/solar-clock"
              className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-amber-200 transition-all hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center mb-3">
                <Sun className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
                Solar Clock
                <span className="inline-block ml-1 transition-transform group-hover:translate-x-0.5">→</span>
              </h3>
              <p className="text-sm text-gray-500">Track celestial movements</p>
            </Link>

            {/* Time History */}
            <Link
              href="/history"
              className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-rose-200 transition-all hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 bg-rose-50 rounded-lg flex items-center justify-center mb-3">
                <History className="w-5 h-5 text-rose-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-rose-600 transition-colors">
                Time History
                <span className="inline-block ml-1 transition-transform group-hover:translate-x-0.5">→</span>
              </h3>
              <p className="text-sm text-gray-500">Explore timekeeping history</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
