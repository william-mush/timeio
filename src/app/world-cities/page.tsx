import { Metadata } from "next";
import Link from "next/link";
import { WORLD_CITIES, getUniqueCountries, getWorldCitiesByContinent } from "@/data/world-cities";
import { Clock, Globe, Users, MapPin } from "lucide-react";

export const metadata: Metadata = {
    title: "World Cities Time - Current Time in 200+ International Cities",
    description: "Find the current local time in major cities around the world. Browse by continent or country. Track time in Tokyo, London, Paris, Sydney, and hundreds more.",
    keywords: [
        "world cities time",
        "international time",
        "global time zones",
        "time around the world",
        "current time world cities",
        "Tokyo time",
        "London time",
        "Paris time",
        "Sydney time",
        "Dubai time",
    ],
    openGraph: {
        title: "World Cities Time - Time.IO",
        description: "Current local time in 200+ cities worldwide. Browse by continent.",
        type: "website",
        url: "https://time.io/world-cities",
    },
    alternates: {
        canonical: "https://time.io/world-cities",
    },
};

const continents = ['Asia', 'Europe', 'Africa', 'South America', 'North America', 'Oceania'];

export default function WorldCitiesPage() {
    const cityCount = WORLD_CITIES.length;
    const countries = getUniqueCountries();

    // Get top cities by population
    const topCities = [...WORLD_CITIES]
        .sort((a, b) => b.population - a.population)
        .slice(0, 20);

    return (
        <div className="page-container">
            <div className="content-container max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                        <Globe className="w-4 h-4" />
                        International
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        World Cities Time
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Find the current local time in {cityCount}+ major cities around the world.
                        Browse by continent or search for a specific city.
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-indigo-600">{cityCount}+</div>
                        <div className="text-sm text-gray-500">Cities</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-green-600">{countries.length}</div>
                        <div className="text-sm text-gray-500">Countries</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-purple-600">6</div>
                        <div className="text-sm text-gray-500">Continents</div>
                    </div>
                </div>

                {/* World's Largest Cities */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">World's Largest Cities</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {topCities.map((city) => (
                            <Link
                                key={city.id}
                                href={`/world-cities/${city.id}`}
                                className="group bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                                        <Clock className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                                            {city.city}
                                        </h3>
                                        <p className="text-sm text-gray-500 truncate">{city.country}</p>
                                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                            <Users className="w-3 h-3" />
                                            {(city.population / 1000000).toFixed(1)}M
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Browse by Continent */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Browse by Continent</h2>
                    <div className="space-y-8">
                        {continents.map((continent) => {
                            const continentCities = getWorldCitiesByContinent(continent)
                                .sort((a, b) => b.population - a.population)
                                .slice(0, 8);

                            if (continentCities.length === 0) return null;

                            return (
                                <div key={continent}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <MapPin className="w-5 h-5 text-gray-400" />
                                        <h3 className="text-lg font-semibold text-gray-800">{continent}</h3>
                                        <span className="text-sm text-gray-400">
                                            ({getWorldCitiesByContinent(continent).length} cities)
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                                        {continentCities.map((city) => (
                                            <Link
                                                key={city.id}
                                                href={`/world-cities/${city.id}`}
                                                className="bg-white rounded-lg p-3 text-center border border-gray-100 hover:border-indigo-200 hover:shadow-sm transition-all"
                                            >
                                                <div className="font-medium text-gray-900 text-sm truncate">{city.city}</div>
                                                <div className="text-xs text-gray-400 truncate">{city.country}</div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Top Countries */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Top Countries</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                        {countries.slice(0, 12).map((country) => (
                            <div
                                key={country.code}
                                className="bg-white rounded-lg p-3 text-center border border-gray-100"
                            >
                                <div className="font-medium text-gray-900 text-sm truncate">{country.name}</div>
                                <div className="text-xs text-gray-400">{country.count} cities</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SEO Content */}
                <div className="bg-gray-50 rounded-2xl p-8 mt-12">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">World Time Zones</h2>
                    <div className="grid md:grid-cols-2 gap-6 text-gray-600">
                        <div>
                            <p className="mb-4">
                                The world is divided into 24 time zones, each roughly 15 degrees of longitude wide.
                                Our world cities database covers major cities across all inhabited continents,
                                making it easy to find the current local time anywhere.
                            </p>
                            <p>
                                Whether you're planning international business calls, scheduling video conferences
                                with remote teams, or staying in touch with friends and family abroad, our city
                                time pages provide accurate, real-time local time information.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Popular Time Searches</h3>
                            <ul className="space-y-1 text-sm">
                                <li>• What time is it in Tokyo?</li>
                                <li>• Current time in London</li>
                                <li>• Paris local time</li>
                                <li>• Sydney Australia time zone</li>
                                <li>• Dubai time now</li>
                                <li>• Singapore current time</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Link to US Cities */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 mb-4">Looking for US cities?</p>
                    <Link
                        href="/us-cities"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors font-medium"
                    >
                        Browse US Cities →
                    </Link>
                </div>
            </div>
        </div>
    );
}
