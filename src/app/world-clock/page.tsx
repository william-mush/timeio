import { WorldClock } from '@/components/WorldClock';

export default function WorldClockPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">World Clock</h1>
          <p className="text-lg text-gray-600">
            Track time across different cities and time zones
          </p>
        </div>
        
        <WorldClock />
      </div>
    </main>
  );
} 