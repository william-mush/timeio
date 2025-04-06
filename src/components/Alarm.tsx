'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlarmSound, ALARM_SOUNDS, alarmSoundService } from '@/services/AlarmSound';
import { useSession, signIn } from 'next-auth/react';

interface AlarmTime {
  id?: string;
  hours: number;
  minutes: number;
  isEnabled: boolean;
  label: string;
  sound: string;
  repeatDays: number[];
  lastTriggered?: Date | null;
}

export const AlarmManager = () => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [alarms, setAlarms] = useState<AlarmTime[]>([]);
  const [showNewAlarm, setShowNewAlarm] = useState(false);
  const [activeAlarm, setActiveAlarm] = useState<AlarmTime | null>(null);
  const [loading, setLoading] = useState(true);

  const handleGoogleAuth = () => {
    signIn('google');
  };

  // Set mounted state once on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load alarms from API when session changes
  useEffect(() => {
    if (!mounted || !session?.user?.id) return;

    const loadAlarms = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/alarms');
        if (!response.ok) throw new Error('Failed to load alarms');
        const data = await response.json();
        setAlarms(data);
      } catch (e) {
        console.error('Failed to load alarms:', e);
      } finally {
        setLoading(false);
      }
    };

    loadAlarms();
  }, [session?.user?.id, mounted]);

  useEffect(() => {
    if (!mounted) return;

    const checkAlarms = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();

      alarms.forEach(alarm => {
        if (alarm.isEnabled && 
            alarm.hours === currentHours && 
            alarm.minutes === currentMinutes && 
            now.getSeconds() === 0) {
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
      
      // Update lastTriggered in database
      if (alarm.id) {
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

  const addAlarm = async (alarm: AlarmTime) => {
    try {
      const response = await fetch('/api/alarms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alarm),
      });
      
      if (!response.ok) throw new Error('Failed to create alarm');
      
      const newAlarm = await response.json();
      setAlarms(prev => [...prev, newAlarm]);
      setShowNewAlarm(false);
    } catch (e) {
      console.error('Failed to add alarm:', e);
    }
  };

  const toggleAlarm = async (alarm: AlarmTime) => {
    if (!alarm.id) return;
    
    try {
      const response = await fetch(`/api/alarms`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: alarm.id,
          isEnabled: !alarm.isEnabled,
        }),
      });
      
      if (!response.ok) throw new Error('Failed to update alarm');
      
      const updatedAlarm = await response.json();
      setAlarms(prev => prev.map(a => a.id === alarm.id ? updatedAlarm : a));
    } catch (e) {
      console.error('Failed to toggle alarm:', e);
    }
  };

  const deleteAlarm = async (alarm: AlarmTime) => {
    if (!alarm.id) return;
    
    try {
      const response = await fetch(`/api/alarms?id=${alarm.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete alarm');
      
      setAlarms(prev => prev.filter(a => a.id !== alarm.id));
    } catch (e) {
      console.error('Failed to delete alarm:', e);
    }
  };

  // Don't render anything on the server or before mounting
  if (!mounted) return null;

  if (!session) {
    return (
      <div className="max-w-2xl mx-auto p-6 mt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Alarms</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Please sign in to set and manage your alarms.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Sign in to create alarms and sync them across your devices.
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">My Alarms</h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
          Set and manage your alarms. Each alarm can be customized with different sounds and labels.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-8 space-y-4 md:space-y-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">Active Alarms</h2>
          <button
            onClick={() => setShowNewAlarm(true)}
            className="w-full sm:w-auto button-primary px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            + New Alarm
          </button>
        </div>

        <div className="space-y-3 md:space-y-4">
          {alarms.map((alarm) => (
            <motion.div
              key={alarm.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg gap-3"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                <div className="text-xl md:text-2xl font-mono text-gray-900 dark:text-white">
                  {alarm.hours.toString().padStart(2, '0')}:
                  {alarm.minutes.toString().padStart(2, '0')}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">{alarm.label}</span>
                  <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{alarm.sound}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <button
                  onClick={() => toggleAlarm(alarm)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    alarm.isEnabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Toggle alarm ${alarm.label} ${alarm.isEnabled ? 'off' : 'on'}`}
                  role="switch"
                  aria-checked={alarm.isEnabled}
                >
                  <motion.div
                    className="w-4 h-4 bg-white rounded-full shadow-sm mx-1"
                    animate={{ x: alarm.isEnabled ? '24px' : '0' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
                <button
                  onClick={() => deleteAlarm(alarm)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                  aria-label={`Delete alarm ${alarm.label}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {showNewAlarm && (
        <NewAlarmForm onSubmit={addAlarm} onCancel={() => setShowNewAlarm(false)} />
      )}

      {activeAlarm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4">Alarm!</h2>
            <p className="text-lg mb-6">{activeAlarm.label}</p>
            <button
              onClick={stopAlarm}
              className="w-full button-primary py-3"
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
  onSubmit: (alarm: AlarmTime) => void;
  onCancel: () => void;
}

const NewAlarmForm = ({ onSubmit, onCancel }: NewAlarmFormProps) => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [label, setLabel] = useState('');
  const [selectedSound, setSelectedSound] = useState(ALARM_SOUNDS[0].id);
  const [volume, setVolume] = useState(0.5);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [errors, setErrors] = useState<{
    hours?: string;
    minutes?: string;
    label?: string;
  }>({});

  const validateInputs = (): boolean => {
    const newErrors: typeof errors = {};
    
    const hoursNum = parseInt(hours);
    if (isNaN(hoursNum) || hoursNum < 0 || hoursNum > 23) {
      newErrors.hours = 'Please enter a valid hour (0-23)';
    }

    const minutesNum = parseInt(minutes);
    if (isNaN(minutesNum) || minutesNum < 0 || minutesNum > 59) {
      newErrors.minutes = 'Please enter a valid minute (0-59)';
    }

    if (label && label.length > 50) {
      newErrors.label = 'Label must be less than 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInputs()) {
      return;
    }

    try {
      onSubmit({
        hours: parseInt(hours),
        minutes: parseInt(minutes),
        isEnabled: true,
        label: label.trim() || 'Alarm',
        sound: selectedSound,
        repeatDays: [],
      });
    } catch (error) {
      console.error('Failed to create alarm:', error);
    }
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 23)) {
      setHours(value);
      setErrors(prev => ({ ...prev, hours: undefined }));
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 59)) {
      setMinutes(value);
      setErrors(prev => ({ ...prev, minutes: undefined }));
    }
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLabel(value);
    if (value.length <= 50) {
      setErrors(prev => ({ ...prev, label: undefined }));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (alarmSoundService) {
      alarmSoundService.setVolume(value);
    }
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6">New Alarm</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2" htmlFor="hours">
                Hour
              </label>
              <input
                type="number"
                id="hours"
                value={hours}
                onChange={handleHoursChange}
                className="input-field w-full"
                placeholder="0-23"
                min="0"
                max="23"
                required
                aria-invalid={errors.hours ? 'true' : undefined}
              />
              {errors.hours && (
                <div className="text-red-500 text-sm mt-1" role="alert">
                  {errors.hours}
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2" htmlFor="minutes">
                Minute
              </label>
              <input
                type="number"
                id="minutes"
                value={minutes}
                onChange={handleMinutesChange}
                className="input-field w-full"
                placeholder="0-59"
                min="0"
                max="59"
                required
                aria-invalid={errors.minutes ? 'true' : undefined}
              />
              {errors.minutes && (
                <div className="text-red-500 text-sm mt-1" role="alert">
                  {errors.minutes}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="label">
              Label
            </label>
            <input
              type="text"
              id="label"
              value={label}
              onChange={handleLabelChange}
              className="input-field w-full"
              placeholder="Alarm label"
              maxLength={50}
              aria-invalid={errors.label ? 'true' : undefined}
            />
            {errors.label && (
              <div className="text-red-500 text-sm mt-1" role="alert">
                {errors.label}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="sound">
              Sound
            </label>
            <div className="flex gap-4">
              <select
                id="sound"
                value={selectedSound}
                onChange={(e) => setSelectedSound(e.target.value)}
                className="input-field flex-1"
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
                className="button-secondary px-4"
              >
                {isPreviewPlaying ? 'Stop' : 'Preview'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="volume">
              Volume
            </label>
            <input
              type="range"
              id="volume"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onCancel}
              className="button-secondary px-6 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button-primary px-6 py-2"
            >
              Create Alarm
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}; 