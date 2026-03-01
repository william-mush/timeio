'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getQuipForTime } from '@/data/clock-quips';

const AnimatedDigit = ({ digit }: { digit: string }) => {
  return (
    <span className="inline-block relative overflow-hidden">
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
      className="mx-1"
    >
      :
    </motion.span>
  );
};

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
  const seconds = time.getSeconds();
  const period = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12;

  const quip = useMemo(
    () => getQuipForTime(hours24, minutes),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [minuteKey]
  );

  const hourStr = hours12.toString().padStart(2, '0');
  const minStr = minutes.toString().padStart(2, '0');
  const secStr = seconds.toString().padStart(2, '0');

  const dateString = time.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (!mounted) {
    return (
      <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20 blur-3xl rounded-full animate-pulse" />
          <div className="relative text-7xl sm:text-8xl md:text-9xl font-mono font-light tracking-tight backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl px-6 sm:px-8 md:px-12 py-6 md:py-8 shadow-xl shadow-gray-200/50 dark:shadow-black/30 border border-white/50 dark:border-gray-700/50 flex items-baseline">
            <div className="flex items-baseline gap-1">
              <div className="w-12 sm:w-16 md:w-20 h-16 sm:h-20 md:h-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse" />
              <div className="w-12 sm:w-16 md:w-20 h-16 sm:h-20 md:h-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse" style={{ animationDelay: '0.1s' }} />
              <span className="mx-1 text-gray-300 dark:text-gray-600 animate-pulse">:</span>
              <div className="w-12 sm:w-16 md:w-20 h-16 sm:h-20 md:h-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-12 sm:w-16 md:w-20 h-16 sm:h-20 md:h-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse" style={{ animationDelay: '0.3s' }} />
              <span className="mx-1 text-gray-300 dark:text-gray-600 animate-pulse">:</span>
              <div className="w-12 sm:w-16 md:w-20 h-16 sm:h-20 md:h-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse" style={{ animationDelay: '0.4s' }} />
              <div className="w-12 sm:w-16 md:w-20 h-16 sm:h-20 md:h-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>
        <div className="mt-8 w-80 h-6 bg-gray-200/60 dark:bg-gray-700/60 rounded-full animate-pulse" />
        <div className="mt-4 w-48 h-4 bg-gray-200/40 dark:bg-gray-700/40 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 dark:from-gray-900/50 dark:via-blue-950/30 dark:to-indigo-950/50 -z-10" />

      <div className="relative flex flex-col items-center space-y-8">
        {/* Glow effect */}
        <div className="absolute -inset-20 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10 blur-3xl rounded-full -z-10" />

        {/* Clock display */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-2xl px-6 sm:px-8 md:px-12 py-6 md:py-8 shadow-xl shadow-gray-200/50 dark:shadow-black/30 border border-white/50 dark:border-gray-700/50"
        >
          <div className="text-7xl sm:text-8xl md:text-9xl font-mono font-light tracking-tight tabular-nums text-gray-700 dark:text-gray-200 flex items-baseline">
            <AnimatedDigit digit={hourStr[0]} />
            <AnimatedDigit digit={hourStr[1]} />
            <ColonSeparator />
            <AnimatedDigit digit={minStr[0]} />
            <AnimatedDigit digit={minStr[1]} />
            <ColonSeparator />
            <AnimatedDigit digit={secStr[0]} />
            <AnimatedDigit digit={secStr[1]} />
            <motion.span
              key={period}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="ml-3 sm:ml-4 text-3xl sm:text-4xl md:text-5xl text-gray-400 dark:text-gray-500 font-medium"
            >
              {period}
            </motion.span>
          </div>
        </motion.div>

        {/* Quip display */}
        <div className="min-h-[4.5rem] flex items-center justify-center px-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={minuteKey}
              initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="text-lg sm:text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 italic text-center max-w-xl leading-relaxed"
            >
              &ldquo;{quip}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>

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
