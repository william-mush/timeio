'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';

interface TimeSettings {
  format24Hour: boolean;
  showSeconds: boolean;
  showMilliseconds: boolean;
  timeZone: string;
  dateFormat: string;
  defaultClockCount: number;
  sortOrder: 'name' | 'timezone' | 'added';
  theme: 'light' | 'dark' | 'system';
  clockStyle: 'digital' | 'analog' | 'both';
  colorScheme: 'blue' | 'purple' | 'green' | 'orange';
}

const DATE_FORMATS = [
  { id: 'full', name: 'Full', example: 'Monday, January 1, 2024' },
  { id: 'long', name: 'Long', example: 'January 1, 2024' },
  { id: 'medium', name: 'Medium', example: 'Jan 1, 2024' },
  { id: 'short', name: 'Short', example: '1/1/2024' },
];

const SORT_OPTIONS = [
  { id: 'name', name: 'City Name', description: 'Sort cities alphabetically' },
  { id: 'timezone', name: 'Time Zone', description: 'Sort by GMT offset' },
  { id: 'added', name: 'Recently Added', description: 'Sort by when added' },
];

const COLOR_SCHEMES = [
  { id: 'blue', name: 'Ocean Blue', primary: 'bg-blue-500' },
  { id: 'purple', name: 'Royal Purple', primary: 'bg-purple-500' },
  { id: 'green', name: 'Forest Green', primary: 'bg-green-500' },
  { id: 'orange', name: 'Sunset Orange', primary: 'bg-orange-500' },
];

const defaultSettings: TimeSettings = {
  format24Hour: false,
  showSeconds: true,
  showMilliseconds: false,
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  dateFormat: 'MM/DD/YYYY',
  defaultClockCount: 3,
  sortOrder: 'timezone',
  theme: 'light',
  clockStyle: 'digital',
  colorScheme: 'blue',
};

export function Settings() {
  const [settings, setSettings] = useState<TimeSettings>(defaultSettings);
  const [mounted, setMounted] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('timeSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Failed to parse saved settings:', e);
      }
    }
    setMounted(true);
  }, []);

  const handleSettingChange = (key: keyof TimeSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('timeSettings', JSON.stringify(newSettings));
    
    // Dispatch event for other components
    const event = new CustomEvent('timeSettingsChanged', { detail: newSettings });
    window.dispatchEvent(event);

    // Show saved indicator
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  if (!mounted) return null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Settings</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Customize your experience with personalized time formats, default locations,
          and notification preferences.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Display Settings</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-lg font-medium text-gray-900 dark:text-white">24-hour format</label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Display time in 24-hour format</p>
            </div>
            <Switch
              checked={settings.format24Hour}
              onChange={(checked: boolean) => handleSettingChange('format24Hour', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-lg font-medium text-gray-900 dark:text-white">Show seconds</label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Display seconds in time</p>
            </div>
            <Switch
              checked={settings.showSeconds}
              onChange={(checked: boolean) => handleSettingChange('showSeconds', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-lg font-medium text-gray-900 dark:text-white">Show milliseconds</label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Display milliseconds in time</p>
            </div>
            <Switch
              checked={settings.showMilliseconds}
              onChange={(checked: boolean) => handleSettingChange('showMilliseconds', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-lg font-medium text-gray-900 dark:text-white">Theme</label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Choose your preferred theme</p>
            </div>
            <select
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value as TimeSettings['theme'])}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-lg font-medium text-gray-900 dark:text-white">Time Zone</label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Set your default time zone</p>
            </div>
            <select
              value={settings.timeZone}
              onChange={(e) => handleSettingChange('timeZone', e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Intl.supportedValuesOf('timeZone').map((zone) => (
                <option key={zone} value={zone}>
                  {zone.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-lg font-medium text-gray-900 dark:text-white">Date Format</label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Choose how dates are displayed</p>
            </div>
            <select
              value={settings.dateFormat}
              onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      <p className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
        Your settings will sync across devices when you're signed in.
      </p>

      {showSaved && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Settings saved!
        </div>
      )}
    </div>
  );
} 