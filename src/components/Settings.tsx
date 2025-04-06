'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { useSession, signIn } from 'next-auth/react';

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
  const { data: session } = useSession();
  const [settings, setSettings] = useState<TimeSettings>(defaultSettings);
  const [mounted, setMounted] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);

  const handleGoogleAuth = () => {
    signIn('google');
  };

  useEffect(() => {
    if (!session) {
      setMounted(true);
      return;
    }

    const loadSettings = async () => {
      try {
        // First try to load from database
        const response = await fetch('/api/settings');
        if (response.ok) {
          const dbSettings = await response.json();
          setSettings(dbSettings);
          setMounted(true);
          return;
        }

        // If no database settings, try localStorage and migrate
        const savedSettings = localStorage.getItem(`timeSettings_${session.user?.email}`);
        if (savedSettings) {
          const localSettings = JSON.parse(savedSettings);
          setSettings(localSettings);
          
          // Migrate to database
          setIsMigrating(true);
          await fetch('/api/migrate-settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              settings: localSettings,
              defaultCities: ['new_york', 'los_angeles', 'chicago'] 
            })
          });
          setIsMigrating(false);
        }
      } catch (e) {
        console.error('Failed to load settings:', e);
      }
      setMounted(true);
    };

    loadSettings();
  }, [session]);

  const handleSettingChange = async (key: keyof TimeSettings, value: any) => {
    if (!session) return;
    
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);

    try {
      // Update database
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });

      if (!response.ok) throw new Error('Failed to update settings');
      
      // Dispatch event for other components
      const event = new CustomEvent('timeSettingsChanged', { detail: newSettings });
      window.dispatchEvent(event);

      // Show saved indicator
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  if (!mounted) return null;

  if (!session) {
    return (
      <div className="max-w-2xl mx-auto p-6 mt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Settings</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Please sign in to access and customize your settings.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Sign in to save your preferences and sync them across devices.
          </p>
          <button
            onClick={handleGoogleAuth}
            className="button-primary flex items-center justify-center gap-2 mx-auto px-6 py-3 text-lg"
          >
            <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
            Continue with Google
          </button>
        </div>
      </div>
    );
  }

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
          <div>
            <h3 className="heading-3 mb-4">Time Format</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  24-hour format
                </label>
                <Switch
                  checked={settings.format24Hour}
                  onChange={(checked: boolean) => handleSettingChange('format24Hour', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Show seconds
                </label>
                <Switch
                  checked={settings.showSeconds}
                  onChange={(checked: boolean) => handleSettingChange('showSeconds', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Show milliseconds
                </label>
                <Switch
                  checked={settings.showMilliseconds}
                  onChange={(checked: boolean) => handleSettingChange('showMilliseconds', checked)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-lg font-medium text-gray-900 dark:text-white">Theme</label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Choose your preferred theme</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSettingChange('theme', 'light')}
                className={`px-4 py-2 rounded-lg ${
                  settings.theme === 'light'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => handleSettingChange('theme', 'dark')}
                className={`px-4 py-2 rounded-lg ${
                  settings.theme === 'dark'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => handleSettingChange('theme', 'system')}
                className={`px-4 py-2 rounded-lg ${
                  settings.theme === 'system'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                System
              </button>
            </div>
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