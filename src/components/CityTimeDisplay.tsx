'use client';

import { useState, useEffect } from 'react';
import { USCity } from '@/data/usCities';
import { 
  getCityTimeInfo, 
  formatTimeDisplay, 
  createTimeUpdater, 
  TimeInfo 
} from '@/lib/timeUtils';
import { Clock, MapPin, Globe } from 'lucide-react';

interface CityTimeDisplayProps {
  city: USCity;
}

export default function CityTimeDisplay({ city }: CityTimeDisplayProps) {
  const [timeInfo, setTimeInfo] = useState<TimeInfo | null>(null);

  useEffect(() => {
    // Set up time updater
    const cleanup = createTimeUpdater(setTimeInfo, city);

    // Cleanup interval on unmount
    return () => clearInterval(cleanup);
  }, [city]);

  if (!timeInfo) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const formattedTime = formatTimeDisplay(timeInfo);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {city.name}, {city.state}
          </h1>
          <div className="flex items-center justify-center text-gray-600 mb-4">
            <MapPin className="w-5 h-5 mr-2" />
            <span>Population: {city.population.toLocaleString()}</span>
          </div>
        </div>

        {/* Time Display */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Current Time</h2>
            </div>
            
            <div className="text-6xl font-bold text-blue-600 mb-2 font-mono">
              {formattedTime.time}
            </div>
            
            <div className="text-xl text-gray-700 mb-4">
              {formattedTime.date}
            </div>
          </div>
        </div>

        {/* Timezone Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <Globe className="w-6 h-6 text-indigo-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Timezone</h3>
            </div>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Zone:</span> {formattedTime.timezone}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">IANA:</span> {timeInfo.timeZone}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <Clock className="w-6 h-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Daylight Saving</h3>
            </div>
            <p className="text-gray-700">
              {formattedTime.dstStatus}
            </p>
            <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              timeInfo.isDST 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {timeInfo.isDST ? 'DST Active' : 'Standard Time'}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">About {city.name}</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div>
              <span className="font-medium">State:</span> {city.state}
            </div>
            <div>
              <span className="font-medium">Population:</span> {city.population.toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Timezone:</span> {timeInfo.timeZoneName}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <a 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            ← Back to Search
          </a>
        </div>
      </div>
    </div>
  );
}