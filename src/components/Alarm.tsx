'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AlarmSound, ALARM_SOUNDS, alarmSoundService } from '@/services/AlarmSound';
import { useSession, signIn } from 'next-auth/react';
import { Bell, Plus, Trash2, Clock, Volume2 } from 'lucide-react';

interface AlarmTime {
  id: string;
  hours: number;
  minutes: number;
  isEnabled: boolean;
  label: string;
  sound: string;
  repeatDays: number[];
  lastTriggered?: Date | null;
  timezone?: string;
}

const STORAGE_KEY = 'timeio_alarms';

// Generate unique ID for local alarms
const generateId = () => `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const AlarmManager = () => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [alarms, setAlarms] = useState<AlarmTime[]>([]);
  const [showNewAlarm, setShowNewAlarm] = useState(false);
  const [activeAlarm, setActiveAlarm] = useState<AlarmTime | null>(null);
  const [loading, setLoading] = useState(true);
  const [userTimezone, setUserTimezone] = useState('');

  // Get user's timezone
  useEffect(() => {
    setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  // Set mounted state once on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load alarms - from API if authenticated, from localStorage if guest
  useEffect(() => {
    if (!mounted) return;

    const loadAlarms = async () => {
      setLoading(true);
      try {
        if (session?.user?.id) {
          // Load from API for authenticated users
          const response = await fetch('/api/alarms');
          if (response.ok) {
            const data = await response.json();
            setAlarms(data);
          }
        } else {
          // Load from localStorage for guests
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            setAlarms(JSON.parse(stored));
          }
        }
      } catch (e) {
        console.error('Failed to load alarms:', e);
      } finally {
        setLoading(false);
      }
    };

    loadAlarms();
  }, [session?.user?.id, mounted]);

  // Save to localStorage for guests
  const saveToLocalStorage = useCallback((newAlarms: AlarmTime[]) => {
    if (!session?.user?.id) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAlarms));
    }
  }, [session?.user?.id]);

  // Check alarms every second
  useEffect(() => {
    if (!mounted) return;

    const checkAlarms = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentSeconds = now.getSeconds();

      alarms.forEach(alarm => {
        if (alarm.isEnabled &&
          alarm.hours === currentHours &&
          alarm.minutes === currentMinutes &&
          currentSeconds === 0) {
          triggerAlarm(alarm);
        }
      });
    };

    const interval = setInterval(checkAlarms, 1000);
    return () => clearInterval(interval);
  }, [alarms, mounted]);

  const triggerAlarm = async (alarm: AlarmTime) => {
    try {
      setActiveAlarm(alarm);
      await alarmSoundService?.playSound(alarm.sound);

      // Request notification permission and show notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`⏰ ${alarm.label}`, {
          body: `It's ${alarm.hours.toString().padStart(2, '0')}:${alarm.minutes.toString().padStart(2, '0')}`,
          icon: '/favicon.ico'
        });
      }

      // Update lastTriggered
      if (session?.user?.id && alarm.id) {
        await fetch(`/api/alarms`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: alarm.id,
            lastTriggered: new Date(),
          }),
        });
      }
    } catch (e) {
      console.error('Failed to trigger alarm:', e);
    }
  };

  const stopAlarm = () => {
    try {
      alarmSoundService?.stopSound();
      setActiveAlarm(null);
    } catch (e) {
      console.error('Failed to stop alarm:', e);
    }
  };

  const addAlarm = async (alarm: Omit<AlarmTime, 'id'>) => {
    try {
      if (session?.user?.id) {
        // Save to API for authenticated users
        const response = await fetch('/api/alarms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(alarm),
        });

        if (!response.ok) throw new Error('Failed to create alarm');

        const newAlarm = await response.json();
        setAlarms(prev => [...prev, newAlarm]);
      } else {
        // Save to localStorage for guests
        const newAlarm: AlarmTime = {
          ...alarm,
          id: generateId(),
          timezone: userTimezone,
        };
        const newAlarms = [...alarms, newAlarm];
        setAlarms(newAlarms);
        saveToLocalStorage(newAlarms);
      }
      setShowNewAlarm(false);
    } catch (e) {
      console.error('Failed to add alarm:', e);
    }
  };

  const toggleAlarm = async (alarm: AlarmTime) => {
    try {
      const updatedAlarm = { ...alarm, isEnabled: !alarm.isEnabled };

      if (session?.user?.id) {
        const response = await fetch(`/api/alarms`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: alarm.id,
            isEnabled: !alarm.isEnabled,
          }),
        });

        if (!response.ok) throw new Error('Failed to update alarm');

        const result = await response.json();
        setAlarms(prev => prev.map(a => a.id === alarm.id ? result : a));
      } else {
        const newAlarms = alarms.map(a => a.id === alarm.id ? updatedAlarm : a);
        setAlarms(newAlarms);
        saveToLocalStorage(newAlarms);
      }
    } catch (e) {
      console.error('Failed to toggle alarm:', e);
    }
  };

  const deleteAlarm = async (alarm: AlarmTime) => {
    try {
      if (session?.user?.id) {
        const response = await fetch(`/api/alarms?id=${alarm.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete alarm');
      }

      const newAlarms = alarms.filter(a => a.id !== alarm.id);
      setAlarms(newAlarms);
      saveToLocalStorage(newAlarms);
    } catch (e) {
      console.error('Failed to delete alarm:', e);
    }
  };

  // Request notification permission
  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  // Don't render anything on the server or before mounting
  if (!mounted) return null;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      {/* Header with timezone info */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Bell className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">My Alarms</h2>
        </div>
        <p className="text-gray-600">
          Your timezone: <span className="font-medium text-gray-900">{userTimezone}</span>
        </p>
        {!session && (
          <p className="text-sm text-gray-500 mt-2">
            Alarms are saved locally in this browser.{' '}
            <button onClick={() => signIn('google')} className="text-blue-600 hover:underline">
              Sign in
            </button>{' '}
            to sync across devices.
          </p>
        )}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      >
        {/* Add alarm button */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Active Alarms ({alarms.length})
          </h3>
          <button
            onClick={() => {
              requestNotificationPermission();
              setShowNewAlarm(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            New Alarm
          </button>
        </div>

        {/* Alarms list */}
        {alarms.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No alarms set yet.</p>
            <p className="text-sm mt-2">Click "New Alarm" to create one.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alarms.map((alarm) => (
              <motion.div
                key={alarm.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${alarm.isEnabled
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`text-3xl font-mono font-bold ${alarm.isEnabled ? 'text-blue-600' : 'text-gray-400'}`}>
                    {alarm.hours.toString().padStart(2, '0')}:
                    {alarm.minutes.toString().padStart(2, '0')}
                  </div>
                  <div>
                    <div className={`font-medium ${alarm.isEnabled ? 'text-gray-900' : 'text-gray-500'}`}>
                      {alarm.label}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Volume2 className="w-3 h-3" />
                      {alarm.sound}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Toggle switch */}
                  <button
                    onClick={() => toggleAlarm(alarm)}
                    className={`relative w-14 h-7 rounded-full transition-colors ${alarm.isEnabled ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    aria-label={`Toggle alarm ${alarm.label}`}
                  >
                    <motion.div
                      className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm"
                      animate={{ x: alarm.isEnabled ? 28 : 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>

                  {/* Delete button */}
                  <button
                    onClick={() => deleteAlarm(alarm)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label={`Delete alarm ${alarm.label}`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* New Alarm Modal */}
      {showNewAlarm && (
        <NewAlarmForm
          onSubmit={addAlarm}
          onCancel={() => setShowNewAlarm(false)}
        />
      )}

      {/* Active Alarm Modal */}
      {activeAlarm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
          >
            <div className="text-6xl mb-4">⏰</div>
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Alarm!</h2>
            <p className="text-xl text-gray-600 mb-6">{activeAlarm.label}</p>
            <p className="text-4xl font-mono font-bold text-blue-600 mb-8">
              {activeAlarm.hours.toString().padStart(2, '0')}:
              {activeAlarm.minutes.toString().padStart(2, '0')}
            </p>
            <button
              onClick={stopAlarm}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl text-xl font-semibold transition-colors"
            >
              Stop Alarm
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

interface NewAlarmFormProps {
  onSubmit: (alarm: Omit<AlarmTime, 'id'>) => void;
  onCancel: () => void;
}

const NewAlarmForm = ({ onSubmit, onCancel }: NewAlarmFormProps) => {
  const [hours, setHours] = useState('08');
  const [minutes, setMinutes] = useState('00');
  const [label, setLabel] = useState('');
  const [selectedSound, setSelectedSound] = useState(ALARM_SOUNDS[0]?.id || 'default');
  const [volume, setVolume] = useState(0.5);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      hours: parseInt(hours),
      minutes: parseInt(minutes),
      isEnabled: true,
      label: label.trim() || 'Alarm',
      sound: selectedSound,
      repeatDays: [],
    });
  };

  const previewSound = () => {
    if (!alarmSoundService) return;

    if (!isPreviewPlaying) {
      alarmSoundService.setVolume(volume);
      alarmSoundService.playSound(selectedSound);
      setIsPreviewPlaying(true);
      setTimeout(() => {
        alarmSoundService.stopSound();
        setIsPreviewPlaying(false);
      }, 2000);
    } else {
      alarmSoundService.stopSound();
      setIsPreviewPlaying(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900">New Alarm</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Time picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value.padStart(2, '0'))}
                min="0"
                max="23"
                className="w-20 text-center text-3xl font-mono border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-3xl font-bold text-gray-400">:</span>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value.padStart(2, '0'))}
                min="0"
                max="59"
                className="w-20 text-center text-3xl font-mono border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Label */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Label
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Wake up, Meeting, etc."
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength={50}
            />
          </div>

          {/* Sound */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sound
            </label>
            <div className="flex gap-2">
              <select
                value={selectedSound}
                onChange={(e) => setSelectedSound(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {ALARM_SOUNDS.map((sound) => (
                  <option key={sound.id} value={sound.id}>
                    {sound.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={previewSound}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {isPreviewPlaying ? 'Stop' : 'Preview'}
              </button>
            </div>
          </div>

          {/* Volume */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Volume: {Math.round(volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setVolume(val);
                if (alarmSoundService) alarmSoundService.setVolume(val);
              }}
              className="w-full accent-blue-600"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              Create Alarm
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};