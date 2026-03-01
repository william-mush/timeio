'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getQuipForTime } from '@/data/clock-quips';

// How many minutes before/after to show in the stream
const STREAM_RANGE = 8;

function getOffsetTime(date: Date, offsetMinutes: number) {
  const d = new Date(date.getTime() + offsetMinutes * 60000);
  const h24 = d.getHours();
  const m = d.getMinutes();
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 || 12;
  return {
    hours24: h24,
    minutes: m,
    hourStr: h12.toString().padStart(2, '0'),
    minStr: m.toString().padStart(2, '0'),
    period,
  };
}

function formatTimeWithSeconds(date: Date, offsetMinutes: number) {
  const d = new Date(date.getTime() + offsetMinutes * 60000);
  const h24 = d.getHours();
  const m = d.getMinutes();
  const s = d.getSeconds();
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 || 12;
  return `${h12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')} ${period}`;
}

function TimeStreamRow({
  date,
  offsetMinutes,
  isCurrent,
}: {
  date: Date;
  offsetMinutes: number;
  isCurrent: boolean;
}) {
  const { hours24, minutes, hourStr, minStr, period } = getOffsetTime(date, offsetMinutes);
  const quip = getQuipForTime(hours24, minutes);
  const timeStr = `${hourStr}:${minStr} ${period}`;

  // Closer to center = more visible, fades toward edges
  const distance = Math.abs(offsetMinutes);
  const opacity = isCurrent ? 1 : Math.max(0.08, 1 - distance * 0.13);

  if (isCurrent) {
    return (
      <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-8 py-2 sm:py-3">
        <span className="font-mono text-2xl sm:text-3xl md:text-4xl font-light tabular-nums text-gray-300 dark:text-gray-600 shrink-0 tracking-tight">
          {formatTimeWithSeconds(date, -1)}
        </span>
        <div className="min-h-[3rem] sm:min-h-[3.5rem] flex items-center justify-center flex-1 max-w-xl">
          <AnimatePresence mode="wait">
            <motion.p
              key={`${hours24}:${minutes}`}
              initial={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-800 dark:text-gray-100 italic text-center leading-relaxed px-2"
            >
              &ldquo;{quip}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>
        <span className="font-mono text-2xl sm:text-3xl md:text-4xl font-light tabular-nums text-gray-300 dark:text-gray-600 shrink-0 tracking-tight">
          {formatTimeWithSeconds(date, 1)}
        </span>
      </div>
    );
  }

  // Non-current rows: greyed out time + greyed out quip
  return (
    <div
      className="flex items-center justify-center gap-3 sm:gap-5 md:gap-8 py-1.5 sm:py-2 transition-opacity duration-500"
      style={{ opacity }}
    >
      <span className="font-mono text-lg sm:text-xl md:text-2xl font-light tabular-nums text-gray-300 dark:text-gray-700 shrink-0 tracking-tight">
        {timeStr}
      </span>
      <p className="text-sm sm:text-base md:text-lg text-gray-300 dark:text-gray-700 italic text-center flex-1 max-w-xl leading-relaxed truncate px-2">
        {quip}
      </p>
      <span className="font-mono text-lg sm:text-xl md:text-2xl font-light tabular-nums text-gray-300 dark:text-gray-700 shrink-0 tracking-tight">
        {timeStr}
      </span>
    </div>
  );
}

export function QuipClock() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());
  const [minuteKey, setMinuteKey] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Build the stream of minutes
  const offsets = useMemo(() => {
    const arr: number[] = [];
    for (let i = -STREAM_RANGE; i <= STREAM_RANGE; i++) {
      arr.push(i);
    }
    return arr;
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center gap-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="w-full max-w-3xl h-8 bg-gray-200/30 dark:bg-gray-700/30 rounded animate-pulse"
            style={{ opacity: 1 - Math.abs(i - 3) * 0.2 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30 dark:from-gray-900/50 dark:via-blue-950/20 dark:to-indigo-950/50 -z-10" />

      {/* Subtle glow behind center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-gradient-to-r from-blue-400/8 via-purple-400/8 to-blue-400/8 blur-3xl rounded-full -z-10" />

      {/* Top and bottom fade masks */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-5xl px-4 flex flex-col"
      >
        {offsets.map((offset) => (
          <TimeStreamRow
            key={`${minuteKey}-${offset}`}
            date={time}
            offsetMinutes={offset}
            isCurrent={offset === 0}
          />
        ))}
      </motion.div>
    </div>
  );
}
