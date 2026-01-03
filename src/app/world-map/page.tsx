import { WorldMap } from "@/components/WorldMap";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive World Time Zone Map",
  description: "Explore time zones visually with our interactive world map. Click any city to see local time, find time differences, and understand global time zones at a glance.",
  keywords: [
    "time zone map",
    "world map time zones",
    "interactive time zone map",
    "global time zones",
    "time zone finder",
    "world time map",
    "timezone map",
    "international date line",
  ],
  openGraph: {
    title: "World Time Zone Map - Time.IO",
    description: "Interactive map showing current time in cities around the world.",
    type: "website",
    url: "https://time.io/world-map",
  },
  alternates: {
    canonical: "https://time.io/world-map",
  },
};

export default function WorldMapPage() {
  return (
    <div className="page-container">
      <div className="content-container">
        <h1 className="heading-1 mb-8">World Time Zone Map</h1>
        <WorldMap />

        {/* SEO Content */}
        <div className="mt-12 max-w-3xl mx-auto text-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Explore Time Zones Visually</h2>
          <p className="mb-4">
            Our interactive world map makes it easy to understand time zones at a glance.
            Click on any city to instantly see its current local time, timezone offset,
            and how it compares to your location.
          </p>
          <p className="mb-4">
            Use the search feature to find specific cities, or explore by clicking markers
            on the map. Filter between major cities and famous landmarks to customize your view.
          </p>
        </div>
      </div>
    </div>
  );
}