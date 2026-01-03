'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

// Animated digit component
const AnimatedDigit = ({ digit, className = '' }: { digit: string; className?: string }) => {
  return (
    <span className={`inline-block relative overflow-hidden ${className}`}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={digit}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            duration: 0.3
          }}
          className="inline-block"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

// Colon separator with subtle pulse animation
const ColonSeparator = ({ show = true }: { show?: boolean }) => {
  if (!show) return null;
  return (
    <motion.span
      animate={{ opacity: [1, 0.4, 1] }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className="mx-1"
    >
      :
    </motion.span>
  );
};

export const TimeDisplay = ({
  showMilliseconds: propShowMilliseconds = false,
  initialFormat24Hour: propFormat24Hour = false
}: TimeDisplayProps) => {
  const [mounted, setMounted] = useState(false);
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [milliseconds, setMilliseconds] = useState('000');
  const [period, setPeriod] = useState('AM');
  const [format24Hour, setFormat24Hour] = useState(propFormat24Hour);
  const [showMilliseconds, setShowMilliseconds] = useState(propShowMilliseconds);
  const [showSeconds, setShowSeconds] = useState(true);

  useEffect(() => {
    setMounted(true);

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
        hours = hours ? hours : 12;
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

  // Split digits for individual animation
  const hourDigits = useMemo(() => hours.split(''), [hours]);
  const minuteDigits = useMemo(() => minutes.split(''), [minutes]);
  const secondDigits = useMemo(() => seconds.split(''), [seconds]);

  if (!mounted) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="text-8xl font-mono tracking-tighter text-gray-300 bg-white/60 rounded-2xl px-8 py-6 tabular-nums">
          --:--:--
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Main clock display */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20 blur-3xl rounded-full" />

        <div className="relative text-8xl md:text-9xl font-mono font-light tracking-tight text-gray-700 backdrop-blur-xl bg-white/70 rounded-2xl px-8 md:px-12 py-6 md:py-8 tabular-nums shadow-xl shadow-gray-200/50 border border-white/50 flex items-baseline">
          {/* Hours */}
          <AnimatedDigit digit={hourDigits[0]} />
          <AnimatedDigit digit={hourDigits[1]} />

          <ColonSeparator />

          {/* Minutes */}
          <AnimatedDigit digit={minuteDigits[0]} />
          <AnimatedDigit digit={minuteDigits[1]} />

          {/* Seconds */}
          {showSeconds && (
            <>
              <ColonSeparator />
              <AnimatedDigit digit={secondDigits[0]} />
              <AnimatedDigit digit={secondDigits[1]} />
            </>
          )}

          {/* Milliseconds */}
          {showMilliseconds && (
            <>
              <span className="mx-2 text-gray-300">.</span>
              <span className="text-4xl text-gray-400">{milliseconds}</span>
            </>
          )}

          {/* AM/PM */}
          {!format24Hour && (
            <motion.span
              key={period}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="ml-4 text-4xl md:text-5xl text-gray-400 font-medium"
            >
              {period}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setFormat24Hour(!format24Hour)}
        className="px-5 py-2 text-sm font-medium text-gray-600 bg-white/60 hover:bg-white/80 rounded-full transition-colors shadow-sm border border-gray-200/50"
      >
        Switch to {format24Hour ? '12-hour' : '24-hour'}
      </motion.button>
    </div>
  );
};