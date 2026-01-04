import { Metadata } from "next";
import { US_CITIES } from "@/data/us-cities";
import { USCitiesClient } from "./USCitiesClient";

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

export default function USCitiesPage() {
  const eligibleCities = US_CITIES.filter(c => c.population >= 24000);
  const cityCount = eligibleCities.length;
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
            Search, browse by state, or explore by time zone.
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

        {/* Client Component with Search and Browse */}
        <USCitiesClient initialCities={US_CITIES} />

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