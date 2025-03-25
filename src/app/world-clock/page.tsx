import { WorldClock } from '@/components/WorldClock';

export default function WorldClockPage() {
  return (
    <div className="min-h-screen p-6 md:p-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-xl bg-white/60 backdrop-blur-2xl p-8 mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-500/90">World Clock</h1>
          <p className="text-lg text-gray-400">
            Track time across multiple cities and time zones. Add your frequently visited locations for quick access to local times.
          </p>
        </div>

        <div className="rounded-xl bg-white/60 backdrop-blur-2xl p-8">
          <WorldClock />
        </div>

        <div className="rounded-xl bg-white/60 backdrop-blur-2xl p-8 mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-500/90">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="px-4 py-2 rounded-lg text-gray-500/90 hover:text-gray-600 transition-colors bg-white/40 backdrop-blur-xl">
              Add New City
            </button>
            <button className="px-4 py-2 rounded-lg text-gray-500/90 hover:text-gray-600 transition-colors bg-white/40 backdrop-blur-xl">
              Sort by Time Zone
            </button>
          </div>
          <p className="text-gray-400 mt-4">
            Pro tip: Click on any city to see more details and options.
          </p>
        </div>
      </div>
    </div>
  );
} 