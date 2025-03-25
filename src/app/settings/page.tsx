import { Settings } from '@/components/Settings';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Settings
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Customize your experience with personalized time formats, default locations, and notification preferences.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <Settings />
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            Your settings will sync across devices when you're signed in.
          </p>
        </div>
      </div>
    </div>
  );
} 