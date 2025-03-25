'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface TimeSettings {
  format24Hour: boolean;
  showSeconds: boolean;
  showMilliseconds: boolean;
  timeZone: string;
  dateFormat: string;
}

const DATE_FORMATS = [
  { id: 'full', name: 'Full', example: 'Monday, January 1, 2024' },
  { id: 'long', name: 'Long', example: 'January 1, 2024' },
  { id: 'medium', name: 'Medium', example: 'Jan 1, 2024' },
  { id: 'short', name: 'Short', example: '1/1/2024' },
];

export const Settings = () => {
  const [settings, setSettings] = useState<TimeSettings>({
    format24Hour: false,
    showSeconds: true,
    showMilliseconds: false,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    dateFormat: 'full',
  });

  const [showSaved, setShowSaved] = useState(false);

  const handleSettingChange = (key: keyof TimeSettings, value: any) => {
    setSettings({ ...settings, [key]: value });
    
    // Save to localStorage
    localStorage.setItem('timeSettings', JSON.stringify({ ...settings, [key]: value }));
    
    // Show saved indicator
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-6">Time Display</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">24-Hour Format</label>
                <p className="text-sm text-gray-500">Display time in 24-hour format</p>
              </div>
              <button
                onClick={() => handleSettingChange('format24Hour', !settings.format24Hour)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.format24Hour ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <motion.div
                  animate={{
                    x: settings.format24Hour ? 24 : 0,
                  }}
                  className="w-6 h-6 bg-white rounded-full shadow-md"
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Show Seconds</label>
                <p className="text-sm text-gray-500">Display seconds in time</p>
              </div>
              <button
                onClick={() => handleSettingChange('showSeconds', !settings.showSeconds)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.showSeconds ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <motion.div
                  animate={{
                    x: settings.showSeconds ? 24 : 0,
                  }}
                  className="w-6 h-6 bg-white rounded-full shadow-md"
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Show Milliseconds</label>
                <p className="text-sm text-gray-500">Display milliseconds in time</p>
              </div>
              <button
                onClick={() => handleSettingChange('showMilliseconds', !settings.showMilliseconds)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.showMilliseconds ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <motion.div
                  animate={{
                    x: settings.showMilliseconds ? 24 : 0,
                  }}
                  className="w-6 h-6 bg-white rounded-full shadow-md"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-6">Date Format</h3>
          
          <div className="space-y-4">
            {DATE_FORMATS.map(format => (
              <button
                key={format.id}
                onClick={() => handleSettingChange('dateFormat', format.id)}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  settings.dateFormat === format.id
                    ? 'bg-blue-50 border-2 border-blue-500'
                    : 'border-2 border-transparent hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">{format.name}</div>
                <div className="text-sm text-gray-500">{format.example}</div>
              </button>
            ))}
          </div>
        </div>

        {showSaved && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-8 right-8 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            Settings saved!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}; 