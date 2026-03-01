'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getQuipForTime } from '@/data/clock-quips';

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

  const distance = Math.abs(offsetMinutes);
  // Smooth exponential falloff — ghostly at the edges
  const opacity = isCurrent ? 1 : Math.max(0.03, Math.pow(0.72, distance));

  if (isCurrent) {
    return (
      <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 py-3 sm:py-4 my-1">
        {/* Previous minute with seconds — dim red numerals */}
        <span
          className="font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extralight tabular-nums shrink-0 tracking-tight"
          style={{ color: 'rgba(220, 38, 38, 0.25)' }}
        >
          {formatTimeWithSeconds(date, -1)}
        </span>

        {/* The current moment — only words */}
        <div className="min-h-[3.5rem] sm:min-h-[4rem] flex items-center justify-center flex-1 max-w-xl">
          <AnimatePresence mode="wait">
            <motion.p
              key={`${hours24}:${minutes}`}
              initial={{ opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-center leading-relaxed px-3"
              style={{
                fontFamily: 'var(--font-elegant), Georgia, serif',
                color: '#f5f5f5',
                fontStyle: 'italic',
                letterSpacing: '0.02em',
              }}
            >
              &ldquo;{quip}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Next minute with seconds — dim red numerals */}
        <span
          className="font-mono text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extralight tabular-nums shrink-0 tracking-tight"
          style={{ color: 'rgba(220, 38, 38, 0.25)' }}
        >
          {formatTimeWithSeconds(date, 1)}
        </span>
      </div>
    );
  }

  // Non-current rows: dark red, fading out
  const rowColor = `rgba(153, 27, 27, ${opacity * 0.5})`;
  const quipColor = `rgba(153, 27, 27, ${opacity * 0.35})`;

  return (
    <div
      className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 py-1 sm:py-1.5 transition-all duration-700"
    >
      <span
        className="font-mono text-base sm:text-lg md:text-xl lg:text-2xl font-extralight tabular-nums shrink-0 tracking-tight"
        style={{ color: rowColor }}
      >
        {timeStr}
      </span>
      <p
        className="text-xs sm:text-sm md:text-base text-center flex-1 max-w-xl leading-relaxed truncate px-3 font-light"
        style={{
          color: quipColor,
          fontFamily: 'var(--font-elegant), Georgia, serif',
          fontStyle: 'italic',
        }}
      >
        {quip}
      </p>
      <span
        className="font-mono text-base sm:text-lg md:text-xl lg:text-2xl font-extralight tabular-nums shrink-0 tracking-tight"
        style={{ color: rowColor }}
      >
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

  const offsets = useMemo(() => {
    const arr: number[] = [];
    for (let i = -STREAM_RANGE; i <= STREAM_RANGE; i++) {
      arr.push(i);
    }
    return arr;
  }, []);

  if (!mounted) {
    return (
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center"
        style={{ backgroundColor: '#0a0a0a' }}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Subtle red glow behind center */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[180px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(185, 28, 28, 0.08) 0%, transparent 70%)' }}
      />

      {/* Top fade to black */}
      <div
        className="absolute top-0 left-0 right-0 h-32 sm:h-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #0a0a0a 0%, transparent 100%)' }}
      />
      {/* Bottom fade to black */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0a0a0a 0%, transparent 100%)' }}
      />

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative w-full max-w-5xl px-4 sm:px-6 flex flex-col"
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
