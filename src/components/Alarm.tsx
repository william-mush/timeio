'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlarmSound, ALARM_SOUNDS, alarmSoundService } from '@/services/AlarmSound';

interface AlarmTime {
  hours: number;
  minutes: number;
  enabled: boolean;
  label: string;
  sound: AlarmSound;
}

export const AlarmManager = () => {
  const [mounted, setMounted] = useState(false);
  const [alarms, setAlarms] = useState<AlarmTime[]>([]);
  const [showNewAlarm, setShowNewAlarm] = useState(false);
  const [activeAlarm, setActiveAlarm] = useState<AlarmTime | null>(null);

  // Load alarms from localStorage on mount
  useEffect(() => {
    const loadAlarms = () => {
      const savedAlarms = localStorage.getItem('alarms');
      if (savedAlarms) {
        try {
          const parsed = JSON.parse(savedAlarms);
          setAlarms(parsed);
        } catch (e) {
          console.error('Failed to load alarms:', e);
        }
      }
    };

    loadAlarms();
    setMounted(true);
  }, []);

  // Save alarms to localStorage whenever they change
  useEffect(() => {
    if (!mounted) return;

    try {
      localStorage.setItem('alarms', JSON.stringify(alarms));
    } catch (e) {
      console.error('Failed to save alarms:', e);
    }
  }, [alarms, mounted]);

  useEffect(() => {
    if (!mounted) return;

    const checkAlarms = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();

      alarms.forEach(alarm => {
        if (alarm.enabled && 
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

  const addAlarm = (alarm: AlarmTime) => {
    setAlarms(prev => [...prev, alarm]);
    setShowNewAlarm(false);
  };

  const toggleAlarm = (index: number) => {
    setAlarms(prev => {
      const newAlarms = [...prev];
      newAlarms[index] = { ...newAlarms[index], enabled: !newAlarms[index].enabled };
      return newAlarms;
    });
  };

  const deleteAlarm = (index: number) => {
    setAlarms(prev => prev.filter((_, i) => i !== index));
  };

  // Don't render anything on the server or before mounting
  if (!mounted) return null;

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {activeAlarm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold mb-4">{activeAlarm.label}</h3>
              <p className="text-4xl font-mono mb-6">
                {activeAlarm.hours.toString().padStart(2, '0')}:
                {activeAlarm.minutes.toString().padStart(2, '0')}
              </p>
              <button
                onClick={stopAlarm}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Stop Alarm
              </button>
            </div>
          </motion.div>
        )}

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">My Alarms</h2>
          <button
            onClick={() => setShowNewAlarm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            + New Alarm
          </button>
        </div>

        <div className="space-y-4">
          {alarms.map((alarm, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl font-mono">
                  {alarm.hours.toString().padStart(2, '0')}:
                  {alarm.minutes.toString().padStart(2, '0')}
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500">{alarm.label}</span>
                  <span className="text-gray-400 text-sm">{alarm.sound.name}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleAlarm(index)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    alarm.enabled ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <motion.div
                    animate={{
                      x: alarm.enabled ? 24 : 0,
                    }}
                    className="w-6 h-6 bg-white rounded-full shadow-md"
                  />
                </button>
                <button
                  onClick={() => deleteAlarm(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {showNewAlarm && (
          <NewAlarmForm
            onSubmit={addAlarm}
            onCancel={() => setShowNewAlarm(false)}
          />
        )}
      </motion.div>
    </div>
  );
};

interface NewAlarmFormProps {
  onSubmit: (alarm: AlarmTime) => void;
  onCancel: () => void;
}

const NewAlarmForm = ({ onSubmit, onCancel }: NewAlarmFormProps) => {
  const [hours, setHours] = useState(7);
  const [minutes, setMinutes] = useState(0);
  const [label, setLabel] = useState('');
  const [selectedSound, setSelectedSound] = useState<AlarmSound>(ALARM_SOUNDS[0]);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    return () => {
      // Clean up any playing sounds when component unmounts
      alarmSoundService.stopSound();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      hours,
      minutes,
      enabled: true,
      label: label || 'Alarm',
      sound: selectedSound,
    });
  };

  const previewSound = () => {
    if (isPreviewPlaying) {
      alarmSoundService.stopSound();
      setIsPreviewPlaying(false);
    } else {
      alarmSoundService.setVolume(volume);
      alarmSoundService.playSound(selectedSound);
      setIsPreviewPlaying(true);
      // Stop preview after 2 seconds
      setTimeout(() => {
        alarmSoundService.stopSound();
        setIsPreviewPlaying(false);
      }, 2000);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    alarmSoundService.setVolume(newVolume);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Hours
            </label>
            <input
              type="number"
              min="0"
              max="23"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Minutes
            </label>
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Label
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g., Wake up"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sound
          </label>
          <div className="flex space-x-2">
            <select
              value={selectedSound.id}
              onChange={(e) => {
                const sound = ALARM_SOUNDS.find(s => s.id === e.target.value);
                if (sound) setSelectedSound(sound);
              }}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {ALARM_SOUNDS.map(sound => (
                <option key={sound.id} value={sound.id}>
                  {sound.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={previewSound}
              className={`px-3 py-2 text-sm font-medium text-white rounded-md transition-colors ${
                isPreviewPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isPreviewPlaying ? 'Stop' : 'Preview'}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Volume
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
          >
            Add Alarm
          </button>
        </div>
      </div>
    </motion.form>
  );
}; 