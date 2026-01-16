'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCountyById } from '@/data/us-counties';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CountyPage({ params }: PageProps) {
  const { slug } = await params;
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const county = getCountyById(slug);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!county) {
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

  const getCountyRanking = () => {
    if (county.population >= 1000000) return 'Very Large County';
    if (county.population >= 500000) return 'Large County';
    if (county.population >= 100000) return 'Medium County';
    if (county.population >= 25000) return 'Small County';
    return 'Very Small County';
  };

  const formatArea = (area: number | undefined) => {
    if (!area) return 'N/A';
    return `${area.toLocaleString()} sq mi`;
  };

  const formatDensity = (density: number | undefined) => {
    if (!density) return 'N/A';
    return `${Math.round(density)} people per sq mi`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-green-600">Home</Link>
            <span>•</span>
            <Link href="/us-counties" className="hover:text-green-600">US Counties</Link>
            <span>•</span>
            <span className="text-gray-900">{county.county}, {county.state_code}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* County Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {county.county}
          </h1>
          <p className="text-xl text-gray-600">
            {county.state} ({county.state_code})
          </p>
          <p className="text-sm text-gray-500 mt-1">
            FIPS Code: {county.fips_code}
          </p>
        </div>

        {/* Current Time Display */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Current Local Time</h2>
          <div className="text-5xl font-bold text-green-600 mb-2">
            {formatTime(currentTime, county.timezone)}
          </div>
          <div className="text-lg text-gray-600">
            {formatDate(currentTime, county.timezone)}
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Timezone: {county.timezone}
          </div>
        </div>

        {/* County Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Population Data */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Population Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Population:</span>
                <span className="font-semibold">{formatPopulation(county.population)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">County Size:</span>
                <span className="font-semibold">{getCountyRanking()}</span>
              </div>
              {county.area_sq_miles && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Area:</span>
                  <span className="font-semibold">{formatArea(county.area_sq_miles)}</span>
                </div>
              )}
              {county.population_density && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Density:</span>
                  <span className="font-semibold text-sm">{formatDensity(county.population_density)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Geographic Data */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">State:</span>
                <span className="font-semibold">{county.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">FIPS Code:</span>
                <span className="font-semibold">{county.fips_code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Coordinates:</span>
                <span className="font-semibold text-sm">
                  {county.coordinates[1].toFixed(4)}°N, {Math.abs(county.coordinates[0]).toFixed(4)}°W
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time Zone:</span>
                <span className="font-semibold text-sm">{county.timezone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Population Comparison */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Population Context</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {county.population >= 1000000 ? 'Top 0.1%' :
                  county.population >= 500000 ? 'Top 1%' :
                    county.population >= 100000 ? 'Top 10%' :
                      county.population >= 25000 ? 'Top 50%' : 'Bottom 50%'}
              </div>
              <div className="text-sm text-gray-600">US County Ranking</div>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {formatPopulation(county.population)}
              </div>
              <div className="text-sm text-gray-600">Total Population</div>
            </div>

            {county.population_density && (
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(county.population_density)}
                </div>
                <div className="text-sm text-gray-600">People per sq mi</div>
              </div>
            )}
          </div>
        </div>

        {/* Time Zone Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {formatTime(currentTime, county.timezone)}
              </div>
              <div className="text-sm text-gray-600">Current Local Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {formatTime(new Date(Date.now() + 6 * 60 * 60 * 1000), county.timezone)}
              </div>
              <div className="text-sm text-gray-600">6 Hours From Now</div>
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
              href="/us-counties"
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span>← Back to All US Counties</span>
            </Link>
            <Link
              href={`/us-cities?state=${county.state_code}`}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span>View {county.state} Cities →</span>
            </Link>
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