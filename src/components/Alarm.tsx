'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AlarmSound, ALARM_SOUNDS, alarmSoundService } from '@/services/AlarmSound';
import { useSession, signIn } from 'next-auth/react';
import { Bell, Plus, Trash2, Clock, Volume2, Lock, BellRing, Pencil } from 'lucide-react';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray.buffer as ArrayBuffer;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

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

export const AlarmManager = () => {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [alarms, setAlarms] = useState<AlarmTime[]>([]);
  const [showNewAlarm, setShowNewAlarm] = useState(false);
  const [activeAlarm, setActiveAlarm] = useState<AlarmTime | null>(null);
  const [loading, setLoading] = useState(true);
  const [userTimezone, setUserTimezone] = useState('');
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [snoozeTimeout, setSnoozeTimeout] = useState<NodeJS.Timeout | null>(null);
  const [snoozeEndTime, setSnoozeEndTime] = useState<number | null>(null);
  const [snoozeTimeLeft, setSnoozeTimeLeft] = useState<number | null>(null);
  const [editingAlarm, setEditingAlarm] = useState<AlarmTime | null>(null);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [pushRegistering, setPushRegistering] = useState(false);

  // Get user's timezone
  useEffect(() => {
    setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  // Check if warning was dismissed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWarningDismissed(localStorage.getItem('alarmWarningDismissed') === 'true');
    }
  }, []);

  // Set mounted state once on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load alarms from API when session changes
  useEffect(() => {
    if (!mounted || !session?.user?.id) {
      setLoading(false);
      return;
    }

    const loadAlarms = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/alarms');
        if (response.ok) {
          const data = await response.json();
          setAlarms(data);
        }
      } catch (e) {
        console.error('Failed to load alarms:', e);
      } finally {
        setLoading(false);
      }
    };

    loadAlarms();
  }, [session?.user?.id, mounted]);

  // Register service worker and subscribe to push if already permitted
  useEffect(() => {
    if (!mounted || !session?.user?.id) return;
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;

    const setupPush = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        await navigator.serviceWorker.ready;

        if (Notification.permission === 'granted') {
          const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
          if (!vapidKey) return;

          let subscription = await registration.pushManager.getSubscription();
          if (!subscription) {
            subscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(vapidKey),
            });
          }

          await fetch('/api/push/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              endpoint: subscription.endpoint,
              keys: {
                p256dh: arrayBufferToBase64(subscription.getKey('p256dh')!),
                auth: arrayBufferToBase64(subscription.getKey('auth')!),
              },
            }),
          });

          setPushEnabled(true);
        }
      } catch (e) {
        console.error('Failed to setup push notifications:', e);
      }
    };

    setupPush();
  }, [mounted, session?.user?.id]);

  // Check alarms every second
  useEffect(() => {
    if (!mounted || !session) return;

    const checkAlarms = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentSeconds = now.getSeconds();
      const currentDay = now.getDay();

      alarms.forEach(alarm => {
        if (alarm.isEnabled &&
          alarm.hours === currentHours &&
          alarm.minutes === currentMinutes &&
          currentSeconds === 0) {
          // If repeatDays is set, only trigger on matching days
          if (alarm.repeatDays && alarm.repeatDays.length > 0) {
            if (alarm.repeatDays.includes(currentDay)) {
              triggerAlarm(alarm);
            }
          } else {
            triggerAlarm(alarm);
          }
        }
      });
    };

    const interval = setInterval(checkAlarms, 1000);
    return () => clearInterval(interval);
  }, [alarms, mounted, session]);

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
      if (snoozeTimeout) {
        clearTimeout(snoozeTimeout);
        setSnoozeTimeout(null);
        setSnoozeEndTime(null);
        setSnoozeTimeLeft(null);
      }
    } catch (e) {
      console.error('Failed to stop alarm:', e);
    }
  };

  const snoozeAlarm = () => {
    if (!activeAlarm) return;
    try {
      alarmSoundService?.stopSound();
      const snoozedAlarm = activeAlarm;
      setActiveAlarm(null);
      const endTime = Date.now() + 5 * 60 * 1000;
      setSnoozeEndTime(endTime);
      const timeout = setTimeout(() => {
        setSnoozeEndTime(null);
        setSnoozeTimeLeft(null);
        setSnoozeTimeout(null);
        triggerAlarm(snoozedAlarm);
      }, 5 * 60 * 1000);
      setSnoozeTimeout(timeout);
    } catch (e) {
      console.error('Failed to snooze alarm:', e);
    }
  };

  const addAlarm = async (alarm: Omit<AlarmTime, 'id'>) => {
    try {
      const response = await fetch('/api/alarms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...alarm, timezone: userTimezone }),
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

      const result = await response.json();
      setAlarms(prev => prev.map(a => a.id === alarm.id ? result : a));
    } catch (e) {
      console.error('Failed to toggle alarm:', e);
    }
  };

  const deleteAlarm = async (alarm: AlarmTime) => {
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

  const editAlarm = async (alarm: Omit<AlarmTime, 'id'>) => {
    if (!editingAlarm) return;
    try {
      const response = await fetch('/api/alarms', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingAlarm.id, ...alarm, timezone: userTimezone }),
      });
      if (!response.ok) throw new Error('Failed to update alarm');
      const updated = await response.json();
      setAlarms(prev => prev.map(a => a.id === editingAlarm.id ? updated : a));
      setEditingAlarm(null);
    } catch (e) {
      console.error('Failed to edit alarm:', e);
    }
  };

  const dismissWarning = () => {
    setWarningDismissed(true);
    localStorage.setItem('alarmWarningDismissed', 'true');
  };

  // Cleanup snooze timeout on unmount
  useEffect(() => {
    return () => {
      if (snoozeTimeout) clearTimeout(snoozeTimeout);
    };
  }, [snoozeTimeout]);

  // Snooze countdown timer
  useEffect(() => {
    if (!snoozeEndTime) return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((snoozeEndTime - Date.now()) / 1000));
      setSnoozeTimeLeft(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [snoozeEndTime]);

  // Listen for alarm triggers from the service worker (via postMessage)
  // and from URL search params (when a new window is opened by the SW)
  useEffect(() => {
    if (!mounted) return;

    // Handle service worker messages
    const handleSWMessage = (event: MessageEvent) => {
      if (event.data?.type === 'ALARM_TRIGGER') {
        const { sound, alarmId, label } = event.data;
        const now = new Date();
        const syntheticAlarm: AlarmTime = {
          id: alarmId || 'push-alarm',
          hours: now.getHours(),
          minutes: now.getMinutes(),
          isEnabled: true,
          label: label || 'Alarm',
          sound: sound || 'gentle',
          repeatDays: [],
        };
        setActiveAlarm(syntheticAlarm);
        alarmSoundService?.playSound(syntheticAlarm.sound);
      }
    };

    if ('serviceWorker' in navigator && navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('message', handleSWMessage);
    }

    // Check URL search params on mount (for when SW opens a new window)
    const params = new URLSearchParams(window.location.search);
    const alarmSound = params.get('alarmSound');
    const alarmId = params.get('alarmId');
    const alarmLabel = params.get('alarmLabel');

    if (alarmSound) {
      const now = new Date();
      const syntheticAlarm: AlarmTime = {
        id: alarmId || 'push-alarm',
        hours: now.getHours(),
        minutes: now.getMinutes(),
        isEnabled: true,
        label: alarmLabel || 'Alarm',
        sound: alarmSound,
        repeatDays: [],
      };
      setActiveAlarm(syntheticAlarm);
      alarmSoundService?.playSound(syntheticAlarm.sound);

      // Clean up the URL so the params don't persist on refresh
      window.history.replaceState({}, '', window.location.pathname);
    }

    return () => {
      if ('serviceWorker' in navigator && navigator.serviceWorker) {
        navigator.serviceWorker.removeEventListener('message', handleSWMessage);
      }
    };
  }, [mounted]);

  // Request notification permission and subscribe to push
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'default') {
      const result = await Notification.requestPermission();
      if (result !== 'granted') return;
    }
    if (Notification.permission !== 'granted') return;

    // Subscribe to push after permission granted
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        setPushRegistering(true);
        const registration = await navigator.serviceWorker.ready;
        const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
        if (!vapidKey) return;

        let subscription = await registration.pushManager.getSubscription();
        if (!subscription) {
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidKey),
          });
        }

        await fetch('/api/push/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            endpoint: subscription.endpoint,
            keys: {
              p256dh: arrayBufferToBase64(subscription.getKey('p256dh')!),
              auth: arrayBufferToBase64(subscription.getKey('auth')!),
            },
          }),
        });

        setPushEnabled(true);
      } catch (e) {
        console.error('Failed to subscribe to push:', e);
      } finally {
        setPushRegistering(false);
      }
    }
  };

  // Don't render anything on the server or before mounting
  if (!mounted) return null;

  // Show loading while checking auth status
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show sign-in prompt if not authenticated
  if (!session) {
    return (
      <div className="max-w-lg mx-auto p-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 text-center border border-blue-200">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Sign In Required
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Sign in to create and manage your alarms. Your alarms will sync across all your devices.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => signIn('google')}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors shadow-sm"
            >
              <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-blue-200">
            <h3 className="font-semibold text-gray-800 mb-3">Why sign in?</h3>
            <ul className="text-sm text-gray-600 space-y-2 text-left">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                Set unlimited alarms with custom labels
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                Sync alarms across all your devices
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                Choose from multiple alarm sounds
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                Get browser notifications
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while fetching alarms
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Authenticated user view
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      {!warningDismissed && (
        pushEnabled ? (
          <div className="mb-4 flex items-center justify-between bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            <div className="flex items-center gap-2">
              <BellRing className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">Push notifications enabled - alarms will work even when this tab is closed</span>
            </div>
            <button
              onClick={dismissWarning}
              className="text-green-600 hover:text-green-800 p-1"
              aria-label="Dismiss"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="mb-4 flex items-center justify-between bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">Enable notifications to receive alarms even when this tab is closed</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={requestNotificationPermission}
                disabled={pushRegistering}
                className="text-sm bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded-md transition-colors disabled:opacity-50"
              >
                {pushRegistering ? 'Enabling...' : 'Enable'}
              </button>
              <button
                onClick={dismissWarning}
                className="text-amber-600 hover:text-amber-800 p-1"
                aria-label="Dismiss warning"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )
      )}
      {/* Header with timezone info */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Bell className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">My Alarms</h2>
        </div>
        <p className="text-gray-600">
          Your timezone: <span className="font-medium text-gray-900">{userTimezone}</span>
        </p>
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
                    {alarm.repeatDays && alarm.repeatDays.length > 0 && (
                      <div className="text-xs text-gray-400 mt-1">
                        {alarm.repeatDays.map(d => DAY_NAMES[d]).join(', ')}
                      </div>
                    )}
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

                  {/* Edit button */}
                  <button
                    onClick={() => setEditingAlarm(alarm)}
                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    aria-label={`Edit alarm ${alarm.label}`}
                  >
                    <Pencil className="w-5 h-5" />
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
        <AlarmForm
          onSubmit={addAlarm}
          onCancel={() => setShowNewAlarm(false)}
        />
      )}

      {/* Edit Alarm Modal */}
      {editingAlarm && (
        <AlarmForm
          initialAlarm={editingAlarm}
          onSubmit={editAlarm}
          onCancel={() => setEditingAlarm(null)}
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
              onClick={snoozeAlarm}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl text-lg font-semibold transition-colors mb-3"
            >
              Snooze (5 min)
            </button>
            <button
              onClick={stopAlarm}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl text-xl font-semibold transition-colors"
            >
              Stop Alarm
            </button>
          </motion.div>
        </div>
      )}

      {/* Snooze indicator */}
      {snoozeTimeLeft !== null && snoozeTimeLeft > 0 && (
        <div className="fixed bottom-6 right-6 bg-amber-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50">
          <Bell className="w-5 h-5" />
          <div>
            <div className="text-sm font-medium">Alarm snoozed</div>
            <div className="text-xs opacity-90">
              Ringing in {Math.floor(snoozeTimeLeft / 60)}:{(snoozeTimeLeft % 60).toString().padStart(2, '0')}
            </div>
          </div>
          <button
            onClick={stopAlarm}
            className="ml-2 text-amber-200 hover:text-white"
            aria-label="Cancel snooze"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

interface AlarmFormProps {
  initialAlarm?: AlarmTime;
  onSubmit: (alarm: Omit<AlarmTime, 'id'>) => void;
  onCancel: () => void;
}

const AlarmForm = ({ initialAlarm, onSubmit, onCancel }: AlarmFormProps) => {
  const isEditing = !!initialAlarm;
  const [hours, setHours] = useState(initialAlarm ? initialAlarm.hours.toString().padStart(2, '0') : '08');
  const [minutes, setMinutes] = useState(initialAlarm ? initialAlarm.minutes.toString().padStart(2, '0') : '00');
  const [label, setLabel] = useState(initialAlarm?.label || '');
  const [selectedSound, setSelectedSound] = useState(initialAlarm?.sound || ALARM_SOUNDS[0]?.id || 'default');
  const [volume, setVolume] = useState(0.5);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [repeatDays, setRepeatDays] = useState<number[]>(initialAlarm?.repeatDays || []);

  const toggleDay = (dayIndex: number) => {
    setRepeatDays(prev =>
      prev.includes(dayIndex) ? prev.filter(d => d !== dayIndex) : [...prev, dayIndex].sort()
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      hours: parseInt(hours),
      minutes: parseInt(minutes),
      isEnabled: true,
      label: label.trim() || 'Alarm',
      sound: selectedSound,
      repeatDays,
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
        <h2 className="text-2xl font-bold mb-6 text-gray-900">{isEditing ? 'Edit Alarm' : 'New Alarm'}</h2>

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

          {/* Repeat Days */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Repeat
            </label>
            <div className="flex gap-2">
              {DAY_NAMES.map((day, index) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(index)}
                  className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                    repeatDays.includes(index)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
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
              {isEditing ? 'Save Changes' : 'Create Alarm'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};