import { TimeZoneConverter } from "@/components/TimeZoneConverter";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Time Zone Converter - Convert Time Between Cities",
    description: "Free time zone converter. Convert time between cities and time zones instantly. Calculate time differences, schedule international meetings, and find the best time to call.",
    keywords: [
        "time zone converter",
        "time converter",
        "convert time zones",
        "time difference calculator",
        "world time converter",
        "meeting time planner",
        "international time converter",
        "time zone calculator",
        "what time is it in",
        "time difference between cities",
    ],
    openGraph: {
        title: "Time Zone Converter - Time.IO",
        description: "Convert time between any cities and time zones instantly.",
        type: "website",
        url: "https://time.io/time-converter",
    },
    alternates: {
        canonical: "https://time.io/time-converter",
    },
};

// JSON-LD for the converter tool
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Time Zone Converter',
    url: 'https://time.io/time-converter',
    description: 'Convert time between cities and time zones instantly.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
    },
};

export default function TimeConverterPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="page-container">
                <div className="content-container">
                    {/* Hero */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Time Zone Converter
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Convert time between cities and time zones. Perfect for scheduling
                            international meetings and coordinating across the globe.
                        </p>
                    </div>

                    <TimeZoneConverter />

                    {/* SEO Content */}
                    <div className="mt-16 max-w-3xl mx-auto">
                        <div className="bg-gray-50 rounded-2xl p-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                How to Use the Time Zone Converter
                            </h2>

                            <div className="space-y-6 text-gray-600">
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">1. Select Your Source Time</h3>
                                    <p>
                                        Choose the city or time zone you want to convert FROM. Enter the specific
                                        time and date you want to convert.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">2. Add Target Cities</h3>
                                    <p>
                                        Add one or more cities to see what time it will be there. Click "Add City"
                                        to compare multiple time zones at once.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">3. Schedule Your Meeting</h3>
                                    <p>
                                        Find a time that works for everyone by adjusting the source time until
                                        all target cities show reasonable hours.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl p-6 border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-3">Common Conversions</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• New York to London: +5 hours</li>
                                    <li>• Los Angeles to Tokyo: +17 hours</li>
                                    <li>• London to Sydney: +11 hours</li>
                                    <li>• New York to Los Angeles: -3 hours</li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-xl p-6 border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-3">Tips for International Meetings</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• Aim for morning hours in most time zones</li>
                                    <li>• Consider daylight saving changes</li>
                                    <li>• Rotate meeting times to share the burden</li>
                                    <li>• Account for lunch hours (12-1 PM)</li>
                                </ul>
                            </div>
                        </div>

                        {/* FAQ Section for SEO */}
                        <div className="mt-12">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                Frequently Asked Questions
                            </h2>

                            <div className="space-y-4">
                                <details className="bg-white rounded-xl border border-gray-200 p-4">
                                    <summary className="font-medium text-gray-900 cursor-pointer">
                                        What is a time zone converter?
                                    </summary>
                                    <p className="mt-3 text-gray-600">
                                        A time zone converter is a tool that helps you calculate what time it is
                                        in different parts of the world. It accounts for the hour differences
                                        between time zones and helps you schedule calls, meetings, and travel plans.
                                    </p>
                                </details>

                                <details className="bg-white rounded-xl border border-gray-200 p-4">
                                    <summary className="font-medium text-gray-900 cursor-pointer">
                                        How many time zones are there?
                                    </summary>
                                    <p className="mt-3 text-gray-600">
                                        There are 24 main time zones in the world, each roughly 15 degrees of
                                        longitude apart. However, some countries use half-hour or quarter-hour
                                        offsets, resulting in over 38 unique time zones in practice.
                                    </p>
                                </details>

                                <details className="bg-white rounded-xl border border-gray-200 p-4">
                                    <summary className="font-medium text-gray-900 cursor-pointer">
                                        Does this converter account for daylight saving time?
                                    </summary>
                                    <p className="mt-3 text-gray-600">
                                        Yes! Our converter uses your browser's built-in time zone database,
                                        which automatically handles daylight saving time (DST) changes for
                                        most regions.
                                    </p>
                                </details>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
