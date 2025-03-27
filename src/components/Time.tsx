'use client';

import { useState, useEffect } from 'react';

interface TimeSettings {
  format24Hour: boolean;
  showSeconds: boolean;
  showMilliseconds: boolean;
  timeZone: string;
  dateFormat: string;
}

interface TimeDisplayProps {
  showMilliseconds?: boolean;
  initialFormat24Hour?: boolean;
}

export const TimeDisplay = ({
  showMilliseconds: propShowMilliseconds = false,
  initialFormat24Hour: propFormat24Hour = false
}: TimeDisplayProps) => {
  // Initialize with default values immediately
  const [mounted, setMounted] = useState(true);
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [milliseconds, setMilliseconds] = useState('000');
  const [period, setPeriod] = useState('AM');
  const [format24Hour, setFormat24Hour] = useState(propFormat24Hour);
  const [showMilliseconds, setShowMilliseconds] = useState(propShowMilliseconds);
  const [showSeconds, setShowSeconds] = useState(true);

  // Load settings from localStorage on mount
  useEffect(() => {
    const loadSettings = () => {
      const savedSettings = localStorage.getItem('timeSettings');
      if (savedSettings) {
        try {
          const settings = JSON.parse(savedSettings);
          if (settings.format24Hour !== undefined) setFormat24Hour(settings.format24Hour);
          if (settings.showSeconds !== undefined) setShowSeconds(settings.showSeconds);
          if (settings.showMilliseconds !== undefined) setShowMilliseconds(settings.showMilliseconds);
        } catch (e) {
          console.error('Failed to parse saved settings:', e);
        }
      }
    };

    // Listen for settings changes
    const handleSettingsChange = (event: CustomEvent<TimeSettings>) => {
      const { format24Hour, showSeconds, showMilliseconds } = event.detail;
      if (format24Hour !== undefined) setFormat24Hour(format24Hour);
      if (showSeconds !== undefined) setShowSeconds(showSeconds);
      if (showMilliseconds !== undefined) setShowMilliseconds(showMilliseconds);
    };

    loadSettings();

    window.addEventListener('timeSettingsChanged', handleSettingsChange as EventListener);
    return () => {
      window.removeEventListener('timeSettingsChanged', handleSettingsChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const ms = now.getMilliseconds().toString().padStart(3, '0');
      
      let period = '';
      if (!format24Hour) {
        period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Convert 0 to 12
      }
      
      setHours(hours.toString().padStart(2, '0'));
      setMinutes(minutes);
      setSeconds(seconds);
      setMilliseconds(ms);
      setPeriod(period);
    };

    updateTime();
    const interval = setInterval(updateTime, showMilliseconds ? 16 : 1000);

    return () => clearInterval(interval);
  }, [showMilliseconds, format24Hour]);

  // Don't render anything on the server or before mounting
  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-baseline justify-center space-x-2">
        <div className="text-8xl font-mono tracking-tighter text-gray-500/90 backdrop-blur-2xl bg-white/60 rounded-xl px-8 py-4 tabular-nums flex items-baseline">
          <span>{hours}</span>
          <span>:</span>
          <span>{minutes}</span>
          {showSeconds && (
            <>
              <span>:</span>
              <span>{seconds}</span>
            </>
          )}
          {showMilliseconds && (
            <>
              <span className="mx-2 text-gray-400">:</span>
              <span className="text-gray-400">{milliseconds}</span>
            </>
          )}
          {!format24Hour && (
            <span className="ml-4 text-6xl">{period}</span>
          )}
        </div>
      </div>
      
      <div className="flex space-x-4">
        <button
          onClick={() => setFormat24Hour(!format24Hour)}
          className="px-4 py-2 text-sm text-gray-600 bg-white/40 hover:bg-white/60 rounded-lg transition-colors"
        >
          {format24Hour ? '12-hour' : '24-hour'}
        </button>
      </div>
    </div>
  );
}; 