'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { US_COUNTIES, getCountiesByState, getLargestCounties, getSmallestCounties, searchCounties } from '@/data/us-counties';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export default function USCountiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'population' | 'state' | 'density'>('population');
  const [viewMode, setViewMode] = useState<'all' | 'largest' | 'smallest'>('all');

  const filteredCounties = useMemo(() => {
    let counties = US_COUNTIES;

    // Apply view mode filter
    if (viewMode === 'largest') {
      counties = getLargestCounties(50);
    } else if (viewMode === 'smallest') {
      counties = getSmallestCounties(50);
    }

    // Filter by search query
    if (searchQuery) {
      counties = searchCounties(searchQuery);
    }

    // Filter by state
    if (selectedState) {
      counties = counties.filter(county => county.state_code === selectedState);
    }

    // Sort counties
    switch (sortBy) {
      case 'name':
        counties = counties.sort((a, b) => a.county.localeCompare(b.county));
        break;
      case 'population':
        counties = counties.sort((a, b) => b.population - a.population);
        break;
      case 'state':
        counties = counties.sort((a, b) => a.state.localeCompare(b.state) || a.county.localeCompare(b.county));
        break;
      case 'density':
        counties = counties.sort((a, b) => (b.population_density || 0) - (a.population_density || 0));
        break;
    }

    return counties;
  }, [searchQuery, selectedState, sortBy, viewMode]);

  const formatPopulation = (population: number) => {
    return population.toLocaleString();
  };

  const formatDensity = (density: number | undefined) => {
    if (!density) return 'N/A';
    return `${Math.round(density)} per sq mi`;
  };

  const getCountySize = (population: number) => {
    if (population >= 1000000) return 'Very Large';
    if (population >= 500000) return 'Large';
    if (population >= 100000) return 'Medium';
    if (population >= 25000) return 'Small';
    return 'Very Small';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            US Counties
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Population data and current time for all US counties
          </p>
          <p className="text-sm text-gray-500">
            {US_COUNTIES.length} counties across all 50 states, DC, and territories
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {getLargestCounties(1)[0]?.population.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Largest County Population</div>
            <div className="text-xs text-gray-500">{getLargestCounties(1)[0]?.county}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {getSmallestCounties(1)[0]?.population.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Smallest County Population</div>
            <div className="text-xs text-gray-500">{getSmallestCounties(1)[0]?.county}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(US_COUNTIES.reduce((sum, county) => sum + county.population, 0) / US_COUNTIES.length).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Average County Population</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {US_COUNTIES.length}
            </div>
            <div className="text-sm text-gray-600">Total Counties</div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Counties
              </label>
              <input
                type="text"
                placeholder="Search by county or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All States</option>
                {US_STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* View Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                View Mode
              </label>
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value as 'all' | 'largest' | 'smallest')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Counties</option>
                <option value="largest">50 Largest</option>
                <option value="smallest">50 Smallest</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'population' | 'state' | 'density')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="population">Population (High to Low)</option>
                <option value="name">County Name (A-Z)</option>
                <option value="state">State (A-Z)</option>
                <option value="density">Population Density</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCounties.length} counties
            {selectedState && ` in ${selectedState}`}
            {searchQuery && ` matching "${searchQuery}"`}
            {viewMode !== 'all' && ` (${viewMode} 50)`}
          </p>
        </div>

        {/* Counties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCounties.map((county) => (
            <Link
              key={county.id}
              href={`/us-counties/${county.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 block"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                  {county.county.replace(' County', '')}
                </h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {county.state_code}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{county.state}</p>
              
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Population:</span>
                  <span className="font-medium">{formatPopulation(county.population)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Size:</span>
                  <span className="font-medium">{getCountySize(county.population)}</span>
                </div>
                {county.population_density && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Density:</span>
                    <span className="font-medium text-xs">{formatDensity(county.population_density)}</span>
                  </div>
                )}
                {county.fips_code && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">FIPS:</span>
                    <span className="font-medium text-xs">{county.fips_code}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="text-xs text-green-600 hover:text-green-800">
                  View Current Time →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredCounties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No counties found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedState('');
                setViewMode('all');
              }}
              className="mt-4 text-green-600 hover:text-green-800 underline"
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
            <Link href="/us-cities" className="text-green-600 hover:text-green-800 underline">
              View US Cities →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}