import { Metadata } from "next";
import Link from "next/link";
import { US_CITIES, type USCity } from "@/data/us-cities";
import { Clock, MapPin, Users, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Current Time in US Cities - All Time Zones",
  description: "Find the current local time in any US city. Browse 300+ cities across all American time zones including Eastern, Central, Mountain, Pacific, Alaska, and Hawaii.",
  keywords: [
    "US cities time",
    "American time zones",
    "current time USA",
    "time in US cities",
    "Eastern time",
    "Pacific time",
    "Central time",
    "Mountain time",
    "Alaska time",
    "Hawaii time",
  ],
  openGraph: {
    title: "US City Times - Time.IO",
    description: "Current local time in 300+ US cities across all American time zones.",
    type: "website",
    url: "https://time.io/us-cities",
  },
  alternates: {
    canonical: "https://time.io/us-cities",
  },
};

// Group cities by state
function groupCitiesByState(cities: USCity[]) {
  const grouped: Record<string, USCity[]> = {};
  cities.forEach(city => {
    if (!grouped[city.state]) {
      grouped[city.state] = [];
    }
    grouped[city.state].push(city);
  });
  // Sort each state's cities by population
  Object.keys(grouped).forEach(state => {
    grouped[state].sort((a, b) => b.population - a.population);
  });
  return grouped;
}

// Get top cities
function getTopCities(cities: USCity[], count: number) {
  return [...cities]
    .filter(c => c.population >= 24000)
    .sort((a, b) => b.population - a.population)
    .slice(0, count);
}

export default function USCitiesPage() {
  const eligibleCities = US_CITIES.filter(c => c.population >= 24000);
  const topCities = getTopCities(eligibleCities, 20);
  const cityCount = eligibleCities.length;

  // Get unique states
  const states = Array.from(new Set(eligibleCities.map(c => c.state))).sort();

  return (
    <div className="page-container">
      <div className="content-container max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Current Time in US Cities
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the current local time in {cityCount}+ American cities across all time zones.
            Select a city to see detailed time information.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">{cityCount}+</div>
            <div className="text-sm text-gray-500">Cities</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600">{states.length}</div>
            <div className="text-sm text-gray-500">States</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-purple-600">6</div>
            <div className="text-sm text-gray-500">Time Zones</div>
          </div>
        </div>

        {/* Top Cities */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Major US Cities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topCities.map((city) => (
              <Link
                key={city.id}
                href={`/us-cities/${city.id}`}
                className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {city.city}
                    </h3>
                    <p className="text-sm text-gray-500">{city.state_code}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Pop: {city.population.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Browse by State */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Browse by State</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {states.map((state) => {
              const count = eligibleCities.filter(c => c.state === state).length;
              return (
                <div
                  key={state}
                  className="bg-white rounded-lg p-3 text-center border border-gray-100 hover:border-blue-200 transition-colors"
                >
                  <div className="font-medium text-gray-900 text-sm truncate">{state}</div>
                  <div className="text-xs text-gray-400">{count} cities</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SEO Content */}
        <div className="bg-gray-50 rounded-2xl p-8 mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">US Time Zones Explained</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Continental US Time Zones</h3>
              <ul className="space-y-2 text-sm">
                <li><strong>Eastern Time (ET)</strong> - New York, Miami, Atlanta</li>
                <li><strong>Central Time (CT)</strong> - Chicago, Houston, Dallas</li>
                <li><strong>Mountain Time (MT)</strong> - Denver, Phoenix, Salt Lake City</li>
                <li><strong>Pacific Time (PT)</strong> - Los Angeles, Seattle, San Francisco</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Non-Continental Zones</h3>
              <ul className="space-y-2 text-sm">
                <li><strong>Alaska Time (AKT)</strong> - Anchorage, Fairbanks, Juneau</li>
                <li><strong>Hawaii Time (HST)</strong> - Honolulu, Maui, Hilo</li>
              </ul>
              <p className="mt-4 text-sm">
                Note: Arizona does not observe Daylight Saving Time, except for the Navajo Nation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}