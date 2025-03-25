import { WorldMap } from '@/components/WorldMap';

export default function WorldMapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100/30 via-secondary-100/30 to-accent-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          World Map
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Explore time zones across the globe with our interactive visualization. Click on city markers to see local time information.
        </p>
        <WorldMap />
      </div>
    </div>
  );
} 