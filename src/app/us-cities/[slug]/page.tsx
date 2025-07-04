'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCityById } from '@/data/us-cities';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function CityPage({ params }: PageProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  const city = getCityById(params.slug);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!city || city.population < 24000) {
    notFound();
  }

  const formatTime = (date: Date, timezone: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(date);
    } catch (error) {
      return date.toLocaleTimeString();
    }
  };

  const formatDate = (date: Date, timezone: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
    } catch (error) {
      return date.toLocaleDateString();
    }
  };

  const formatPopulation = (population: number) => {
    return population.toLocaleString();
  };

  const getPopulationRanking = () => {
    // Simple ranking logic based on population size
    if (city.population >= 1000000) return 'Major Metro';
    if (city.population >= 500000) return 'Large City';
    if (city.population >= 100000) return 'Medium City';
    if (city.population >= 50000) return 'Small City';
    return 'Town';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>•</span>
            <Link href="/us-cities" className="hover:text-blue-600">US Cities</Link>
            <span>•</span>
            <span className="text-gray-900">{city.city}, {city.state_code}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* City Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {city.city}
          </h1>
          <p className="text-xl text-gray-600">
            {city.state} ({city.state_code})
          </p>
          {city.county && (
            <p className="text-sm text-gray-500 mt-1">
              Located in {city.county}
            </p>
          )}
        </div>

        {/* Current Time Display */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Current Local Time</h2>
          <div className="text-5xl font-bold text-blue-600 mb-2">
            {formatTime(currentTime, city.timezone)}
          </div>
          <div className="text-lg text-gray-600">
            {formatDate(currentTime, city.timezone)}
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Timezone: {city.timezone}
          </div>
        </div>

        {/* City Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Population Data */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Population Data</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Population:</span>
                <span className="font-semibold">{formatPopulation(city.population)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">City Type:</span>
                <span className="font-semibold">{getPopulationRanking()}</span>
              </div>
              {city.county && (
                <div className="flex justify-between">
                  <span className="text-gray-600">County:</span>
                  <span className="font-semibold">{city.county}</span>
                </div>
              )}
            </div>
          </div>

          {/* Location Data */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">State:</span>
                <span className="font-semibold">{city.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Coordinates:</span>
                <span className="font-semibold text-sm">
                  {city.coordinates[1].toFixed(4)}°N, {Math.abs(city.coordinates[0]).toFixed(4)}°W
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time Zone:</span>
                <span className="font-semibold text-sm">{city.timezone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Time Zone Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Zone Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {formatTime(currentTime, city.timezone)}
              </div>
              <div className="text-sm text-gray-600">Current Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {formatTime(new Date(Date.now() + 12 * 60 * 60 * 1000), city.timezone)}
              </div>
              <div className="text-sm text-gray-600">12 Hours From Now</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {currentTime.toLocaleTimeString('en-US', { 
                  timeZone: 'UTC',
                  hour: '2-digit', 
                  minute: '2-digit'
                })}
              </div>
              <div className="text-sm text-gray-600">UTC Time</div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Pages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/us-cities"
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span>← Back to All US Cities</span>
            </Link>
            {city.county && (
              <Link
                href={`/us-counties/${city.state_code.toLowerCase()}`}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span>View {city.state} Counties →</span>
              </Link>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Population data from US Census Bureau • Time updated every second
          </p>
        </div>
      </div>
    </div>
  );
}