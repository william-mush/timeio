import { WorldMap } from '@/components/WorldMap';

export default function WorldMapPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">World Time Map</h1>
        <p className="text-gray-600 mt-2">
          Interactive visualization of time zones across the globe. Click on city markers to see local time information.
        </p>
      </div>
      
      <WorldMap />
      
      <div className="mt-6 text-sm text-gray-500">
        Note: Time zones shown are approximate and may vary due to daylight savings and local regulations.
      </div>
    </div>
  );
} 