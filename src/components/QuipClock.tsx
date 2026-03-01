'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getQuipForTime } from '@/data/clock-quips';

const AnimatedDigit = ({ digit, size = 'normal' }: { digit: string; size?: 'normal' | 'large' }) => {
  const sizeClass = size === 'large'
    ? 'text-5xl sm:text-6xl md:text-7xl'
    : 'text-4xl sm:text-5xl md:text-6xl';
  return (
    <span className={`inline-block relative overflow-hidden ${sizeClass}`}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={digit}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            duration: 0.3,
          }}
          className="inline-block"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const ColonSeparator = () => {
  return (
    <motion.span
      animate={{ opacity: [1, 0.4, 1] }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="mx-0.5 sm:mx-1"
    >
      :
    </motion.span>
  );
};

function getOffsetTime(date: Date, offsetMinutes: number) {
  const d = new Date(date.getTime() + offsetMinutes * 60000);
  const h24 = d.getHours();
  const m = d.getMinutes();
  const s = d.getSeconds();
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 || 12;
  return {
    hourStr: h12.toString().padStart(2, '0'),
    minStr: m.toString().padStart(2, '0'),
    secStr: s.toString().padStart(2, '0'),
    period,
  };
}

function FlankClock({ date, offsetMinutes, label }: { date: Date; offsetMinutes: number; label: string }) {
  const { hourStr, minStr, secStr, period } = getOffsetTime(date, offsetMinutes);

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest">
        {label}
      </span>
      <div className="backdrop-blur-xl bg-white/50 dark:bg-gray-800/50 rounded-xl px-4 sm:px-6 py-4 sm:py-5 shadow-lg shadow-gray-200/30 dark:shadow-black/20 border border-white/40 dark:border-gray-700/40">
        <div className="font-mono font-light tracking-tight tabular-nums text-gray-500 dark:text-gray-400 flex items-baseline text-4xl sm:text-5xl md:text-6xl">
          <AnimatedDigit digit={hourStr[0]} />
          <AnimatedDigit digit={hourStr[1]} />
          <ColonSeparator />
          <AnimatedDigit digit={minStr[0]} />
          <AnimatedDigit digit={minStr[1]} />
          <ColonSeparator />
          <AnimatedDigit digit={secStr[0]} />
          <AnimatedDigit digit={secStr[1]} />
          <span className="ml-2 text-lg sm:text-xl md:text-2xl text-gray-400 dark:text-gray-500 font-medium">
            {period}
          </span>
        </div>
      </div>
    </div>
  );
}

export function QuipClock() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());
  const [minuteKey, setMinuteKey] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now);
      const newKey = `${now.getHours()}:${now.getMinutes()}`;
      setMinuteKey(newKey);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours24 = time.getHours();
  const minutes = time.getMinutes();

  const quip = useMemo(
    () => getQuipForTime(hours24, minutes),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [minuteKey]
  );

  const dateString = time.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (!mounted) {
    return (
      <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center">
        <div className="flex items-center gap-6">
          <div className="w-48 sm:w-64 h-20 sm:h-24 bg-gray-200/60 dark:bg-gray-700/60 rounded-xl animate-pulse" />
          <div className="w-64 sm:w-80 h-8 bg-gray-200/60 dark:bg-gray-700/60 rounded-full animate-pulse" />
          <div className="w-48 sm:w-64 h-20 sm:h-24 bg-gray-200/60 dark:bg-gray-700/60 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 dark:from-gray-900/50 dark:via-blue-950/30 dark:to-indigo-950/50 -z-10" />

      <div className="relative flex flex-col items-center gap-8 sm:gap-10 w-full max-w-6xl px-4">
        {/* Glow effect */}
        <div className="absolute -inset-20 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10 blur-3xl rounded-full -z-10" />

        {/* Main layout: prev clock | quip | next clock */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-10 w-full"
        >
          {/* Previous minute clock */}
          <FlankClock date={time} offsetMinutes={-1} label="One minute ago" />

          {/* Current time as quip — the invisible moment */}
          <div className="flex flex-col items-center gap-3 lg:flex-1 max-w-md">
            <span className="text-xs sm:text-sm font-medium text-blue-500 dark:text-blue-400 uppercase tracking-widest">
              Right now
            </span>
            <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl px-6 sm:px-8 py-6 sm:py-8 shadow-xl shadow-gray-200/50 dark:shadow-black/30 border border-blue-200/50 dark:border-blue-800/50">
              <div className="min-h-[3.5rem] sm:min-h-[4.5rem] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={minuteKey}
                    initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-200 italic text-center leading-relaxed"
                  >
                    &ldquo;{quip}&rdquo;
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Next minute clock */}
          <FlankClock date={time} offsetMinutes={1} label="One minute from now" />
        </motion.div>

        {/* Date display */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm md:text-base text-gray-400 dark:text-gray-500"
        >
          {dateString}
        </motion.p>
      </div>
    </div>
  );
}
