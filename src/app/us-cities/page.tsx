'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { CITIES_OVER_24K, getCitiesByState, searchCities } from '@/data/us-cities';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export default function USCitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'population' | 'state'>('population');

  const filteredCities = useMemo(() => {
    let cities = CITIES_OVER_24K;

    // Filter by search query
    if (searchQuery) {
      cities = searchCities(searchQuery);
    }

    // Filter by state
    if (selectedState) {
      cities = cities.filter(city => city.state_code === selectedState);
    }

    // Sort cities
    switch (sortBy) {
      case 'name':
        cities = cities.sort((a, b) => a.city.localeCompare(b.city));
        break;
      case 'population':
        cities = cities.sort((a, b) => b.population - a.population);
        break;
      case 'state':
        cities = cities.sort((a, b) => a.state.localeCompare(b.state) || a.city.localeCompare(b.city));
        break;
    }

    return cities;
  }, [searchQuery, selectedState, sortBy]);

  const formatPopulation = (population: number) => {
    return population.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            US Cities & Towns
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            All incorporated cities and towns with populations over 24,000 people
          </p>
          <p className="text-sm text-gray-500">
            {CITIES_OVER_24K.length} cities • Current local time for each location
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Cities
              </label>
              <input
                type="text"
                placeholder="Search by city or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* State Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by State
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All States</option>
                {US_STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'population' | 'state')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="population">Population (High to Low)</option>
                <option value="name">City Name (A-Z)</option>
                <option value="state">State (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCities.length} cities
            {selectedState && ` in ${selectedState}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCities.map((city) => (
            <Link
              key={city.id}
              href={`/us-cities/${city.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 block"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                  {city.city}
                </h3>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {city.state_code}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{city.state}</p>
              
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Population:</span>
                  <span className="font-medium">{formatPopulation(city.population)}</span>
                </div>
                {city.county && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">County:</span>
                    <span className="font-medium text-xs">{city.county}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="text-xs text-blue-600 hover:text-blue-800">
                  View Current Time →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredCities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No cities found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedState('');
              }}
              className="mt-4 text-blue-600 hover:text-blue-800 underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Population data from US Census Bureau • Time zones from IANA database
          </p>
          <p className="mt-2">
            <Link href="/us-counties" className="text-blue-600 hover:text-blue-800 underline">
              View US Counties →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}