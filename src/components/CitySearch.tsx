'use client';

import { useState } from 'react';
import { searchCities, USCity, getCityById } from '@/data/us-cities';
import { Search, MapPin, Users, Clock } from 'lucide-react';

export default function CitySearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<USCity[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setIsSearching(true);

    if (searchQuery.trim().length > 0) {
      const searchResults = searchCities(searchQuery);
      setResults(searchResults.slice(0, 10)); // Limit to top 10 results
    } else {
      setResults([]);
    }

    setIsSearching(false);
  };

  const handleCityClick = (city: USCity) => {
    window.location.href = `/us-cities/${city.id}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          US City Time Finder
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Find current time, timezone, and daylight saving information for any US city.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for a city (e.g., 'New York', 'Los Angeles', 'Chicago')"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>
      </div>

      {/* Loading State */}
      {isSearching && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Search Results */}
      {!isSearching && results.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Search Results ({results.length} cities found)
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {results.map((city) => (
              <div
                key={city.id}
                onClick={() => handleCityClick(city)}
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {city.city}, {city.state}
                    </h3>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{city.population.toLocaleString()} people</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{city.timezone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-blue-600">
                    <Clock className="w-5 h-5 mr-2" />
                    <span className="font-medium">View Time</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {!isSearching && query.length > 0 && results.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No cities found</h3>
          <p className="text-gray-600">
            Try searching for a different city name or state abbreviation.
          </p>
        </div>
      )}

      {/* Popular Cities */}
      {!query && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Popular Cities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'new-york-ny',
              'los-angeles-ca',
              'chicago-il',
              'houston-tx',
              'phoenix-az',
              'philadelphia-pa',
            ].map(id => getCityById(id)).filter((c): c is USCity => c !== undefined).map((city) => (
              <button
                key={city.id}
                onClick={() => handleCityClick(city)}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all text-left"
              >
                <div className="font-semibold text-gray-900">
                  {city.city}
                </div>
                <div className="text-sm text-gray-600">
                  {city.state}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-16 text-center text-gray-600">
        <p className="mb-2">
          Displaying time information for {searchCities('').length} US cities
        </p>
        <p className="text-sm">
          Data includes current time, timezone, and daylight saving time status
        </p>
      </div>
    </div>
  );
}