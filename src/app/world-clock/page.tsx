import { WorldClock } from "@/components/WorldClock";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "World Clock - Current Time in Every Time Zone",
  description: "Check the current time anywhere in the world. Add multiple cities to track time zones, compare international times, and never miss a meeting across time zones.",
  keywords: [
    "world clock",
    "international time",
    "time zones",
    "current time",
    "global time",
    "time zone converter",
    "what time is it",
    "UTC time",
    "GMT time",
  ],
  openGraph: {
    title: "World Clock - Time.IO",
    description: "Track time across the globe with our beautiful world clock.",
    type: "website",
    url: "https://time.io/world-clock",
  },
  alternates: {
    canonical: "https://time.io/world-clock",
  },
};

export default function WorldClockPage() {
  return (
    <div className="page-container">
      <div className="content-container">
        <h1 className="heading-1 mb-8">World Clock</h1>
        <div className="card">
          <WorldClock />
        </div>

        {/* SEO Content */}
        <div className="mt-12 max-w-3xl mx-auto text-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Track Time Across the Globe</h2>
          <p className="mb-4">
            Our world clock lets you track the current time in multiple cities simultaneously.
            Whether you're scheduling international meetings, coordinating with remote teams,
            or staying connected with friends and family abroad, Time.IO makes it easy.
          </p>
          <p className="mb-4">
            Add any city to your world clock to see real-time updates. Compare time differences,
            understand time zone offsets, and plan your day across multiple locations.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Popular Time Zones</h3>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <li>• Eastern Time (ET)</li>
            <li>• Pacific Time (PT)</li>
            <li>• Central European Time (CET)</li>
            <li>• Greenwich Mean Time (GMT)</li>
            <li>• Japan Standard Time (JST)</li>
            <li>• Australian Eastern Time (AET)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}