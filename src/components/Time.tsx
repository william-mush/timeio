'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TimezoneGroup, Timezone, TIMEZONE_GROUPS } from '@/lib/timezones';

interface TimeDisplayProps {
  showMilliseconds?: boolean;
  initialFormat24Hour?: boolean;
}

export const TimeDisplay = ({
  showMilliseconds = false,
  initialFormat24Hour = false
}: TimeDisplayProps) => {
  const [mounted, setMounted] = useState(false);
  const [timeString, setTimeString] = useState('');
  const [format24Hour, setFormat24Hour] = useState(initialFormat24Hour);
  const [showTimezoneModal, setShowTimezoneModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
    
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: format24Hour ? '2-digit' : '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !format24Hour
      };
      
      let time = now.toLocaleTimeString(undefined, options);
      if (showMilliseconds) {
        time = time.replace(' ', ':' + now.getMilliseconds().toString().padStart(3, '0') + ' ');
      }
      setTimeString(time);
    };

    updateTime();
    const interval = setInterval(updateTime, showMilliseconds ? 1 : 1000);

    return () => clearInterval(interval);
  }, [showMilliseconds, format24Hour]);

  const getTimezoneDisplay = (timezone: string) => {
    const currentGroup = TIMEZONE_GROUPS.find((group: TimezoneGroup) => 
      group.timezones.some((tz: Timezone) => tz.name === timezone)
    );
    return currentGroup ? `${currentGroup.name} - ${timezone.replace(/_/g, ' ')}` : timezone.replace(/_/g, ' ');
  };

  // Don't render anything on the server or before mounting
  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-baseline justify-center space-x-2">
        <span className="text-8xl font-bold tracking-tighter text-gray-500/90 backdrop-blur-2xl bg-white/60 rounded-xl px-8 py-4">
          {timeString}
        </span>
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