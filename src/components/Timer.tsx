'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Flag, Timer as TimerIcon, Clock } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────

type Mode = 'timer' | 'stopwatch';

interface Lap {
  number: number;
  lapTime: number;   // ms for this lap
  totalTime: number; // ms cumulative
}

// ─── Audio helper ───────────────────────────────────────────────────

function playBeep() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.8);

    // Play a second beep after a short gap
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, ctx.currentTime + 1);
    gain2.gain.setValueAtTime(0.5, ctx.currentTime + 1);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.8);
    osc2.start(ctx.currentTime + 1);
    osc2.stop(ctx.currentTime + 1.8);

    // Third beep (longer)
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.connect(gain3);
    gain3.connect(ctx.destination);
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(1100, ctx.currentTime + 2);
    gain3.gain.setValueAtTime(0.6, ctx.currentTime + 2);
    gain3.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 3.5);
    osc3.start(ctx.currentTime + 2);
    osc3.stop(ctx.currentTime + 3.5);

    // Cleanup
    setTimeout(() => ctx.close(), 4000);
  } catch {
    // Audio not available — silently ignore
  }
}

function sendNotification(title: string, body: string) {
  if (typeof window === 'undefined') return;
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    new Notification(title, { body, icon: '/favicon.ico' });
  }
}

function requestNotificationPermission() {
  if (typeof window === 'undefined') return;
  if (!('Notification' in window)) return;
  if (Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

// ─── Formatting helpers ─────────────────────────────────────────────

function formatCountdown(ms: number): string {
  const totalSec = Math.ceil(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function formatStopwatch(ms: number): string {
  const totalCs = Math.floor(ms / 10);
  const m = Math.floor(totalCs / 6000);
  const s = Math.floor((totalCs % 6000) / 100);
  const cs = totalCs % 100;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
}

// ─── Presets ────────────────────────────────────────────────────────

const PRESETS = [
  { label: '1 min', ms: 60_000 },
  { label: '5 min', ms: 300_000 },
  { label: '10 min', ms: 600_000 },
  { label: '15 min', ms: 900_000 },
  { label: '30 min', ms: 1_800_000 },
  { label: '1 hr', ms: 3_600_000 },
];

// ─── SVG Progress Ring ──────────────────────────────────────────────

const RING_SIZE = 280;
const RING_STROKE = 8;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function ProgressRing({ progress }: { progress: number }) {
  const offset = RING_CIRCUMFERENCE * (1 - progress);
  return (
    <svg
      width={RING_SIZE}
      height={RING_SIZE}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90"
    >
      {/* Background track */}
      <circle
        cx={RING_SIZE / 2}
        cy={RING_SIZE / 2}
        r={RING_RADIUS}
        fill="none"
        stroke="rgb(var(--border-primary))"
        strokeWidth={RING_STROKE}
        opacity={0.3}
      />
      {/* Progress arc */}
      <circle
        cx={RING_SIZE / 2}
        cy={RING_SIZE / 2}
        r={RING_RADIUS}
        fill="none"
        stroke="rgb(var(--accent-primary))"
        strokeWidth={RING_STROKE}
        strokeLinecap="round"
        strokeDasharray={RING_CIRCUMFERENCE}
        strokeDashoffset={offset}
        className="transition-[stroke-dashoffset] duration-200 ease-linear"
      />
    </svg>
  );
}

// ─── Main Component ─────────────────────────────────────────────────

export const Timer = () => {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<Mode>('timer');

  // Countdown state
  const [totalTime, setTotalTime] = useState(0);       // ms — chosen duration
  const [timeLeft, setTimeLeft] = useState(0);          // ms — remaining
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  const timerRef = useRef<number | null>(null);
  const timerStartRef = useRef<number>(0);
  const timerRemainingRef = useRef<number>(0);

  // Custom input state
  const [inputH, setInputH] = useState('0');
  const [inputM, setInputM] = useState('5');
  const [inputS, setInputS] = useState('0');

  // Stopwatch state
  const [swElapsed, setSwElapsed] = useState(0);        // ms
  const [swRunning, setSwRunning] = useState(false);
  const [swPaused, setSwPaused] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const swRef = useRef<number | null>(null);
  const swStartRef = useRef<number>(0);
  const swAccumulatedRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
    requestNotificationPermission();
  }, []);

  // ── Countdown logic ───────────────────────────────────────────────

  const startCountdown = useCallback((durationMs: number) => {
    // Reset finished state
    setTimerFinished(false);

    setTotalTime(durationMs);
    setTimeLeft(durationMs);
    setTimerRunning(true);
    setTimerPaused(false);

    timerRemainingRef.current = durationMs;
    timerStartRef.current = performance.now();

    const tick = () => {
      const now = performance.now();
      const elapsed = now - timerStartRef.current;
      const remaining = timerRemainingRef.current - elapsed;

      if (remaining <= 0) {
        setTimeLeft(0);
        setTimerRunning(false);
        setTimerFinished(true);
        playBeep();
        sendNotification('Timer Complete', 'Your countdown timer has finished!');
        timerRef.current = null;
        return;
      }

      setTimeLeft(remaining);
      timerRef.current = requestAnimationFrame(tick);
    };

    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    timerRef.current = requestAnimationFrame(tick);
  }, []);

  const pauseCountdown = useCallback(() => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    timerRef.current = null;

    // Snapshot how much time is left
    const now = performance.now();
    const elapsed = now - timerStartRef.current;
    timerRemainingRef.current = Math.max(0, timerRemainingRef.current - elapsed);
    setTimeLeft(timerRemainingRef.current);

    setTimerPaused(true);
  }, []);

  const resumeCountdown = useCallback(() => {
    setTimerPaused(false);
    timerStartRef.current = performance.now();

    const tick = () => {
      const now = performance.now();
      const elapsed = now - timerStartRef.current;
      const remaining = timerRemainingRef.current - elapsed;

      if (remaining <= 0) {
        setTimeLeft(0);
        setTimerRunning(false);
        setTimerFinished(true);
        playBeep();
        sendNotification('Timer Complete', 'Your countdown timer has finished!');
        timerRef.current = null;
        return;
      }

      setTimeLeft(remaining);
      timerRef.current = requestAnimationFrame(tick);
    };

    timerRef.current = requestAnimationFrame(tick);
  }, []);

  const resetCountdown = useCallback(() => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    timerRef.current = null;
    setTimerRunning(false);
    setTimerPaused(false);
    setTimerFinished(false);
    setTimeLeft(0);
    setTotalTime(0);
    timerRemainingRef.current = 0;
  }, []);

  const handlePreset = useCallback((ms: number) => {
    startCountdown(ms);
  }, [startCountdown]);

  const handleCustomStart = useCallback(() => {
    const h = Math.max(0, Math.min(99, parseInt(inputH) || 0));
    const m = Math.max(0, Math.min(59, parseInt(inputM) || 0));
    const s = Math.max(0, Math.min(59, parseInt(inputS) || 0));
    const ms = (h * 3600 + m * 60 + s) * 1000;
    if (ms <= 0) return;
    startCountdown(ms);
  }, [inputH, inputM, inputS, startCountdown]);

  // ── Stopwatch logic ───────────────────────────────────────────────

  const startStopwatch = useCallback(() => {
    setSwRunning(true);
    setSwPaused(false);
    swStartRef.current = performance.now();

    const tick = () => {
      const now = performance.now();
      const elapsed = swAccumulatedRef.current + (now - swStartRef.current);
      setSwElapsed(elapsed);
      swRef.current = requestAnimationFrame(tick);
    };

    if (swRef.current) cancelAnimationFrame(swRef.current);
    swRef.current = requestAnimationFrame(tick);
  }, []);

  const pauseStopwatch = useCallback(() => {
    if (swRef.current) cancelAnimationFrame(swRef.current);
    swRef.current = null;

    const now = performance.now();
    swAccumulatedRef.current += now - swStartRef.current;
    setSwElapsed(swAccumulatedRef.current);

    setSwPaused(true);
  }, []);

  const resumeStopwatch = useCallback(() => {
    setSwPaused(false);
    swStartRef.current = performance.now();

    const tick = () => {
      const now = performance.now();
      const elapsed = swAccumulatedRef.current + (now - swStartRef.current);
      setSwElapsed(elapsed);
      swRef.current = requestAnimationFrame(tick);
    };

    swRef.current = requestAnimationFrame(tick);
  }, []);

  const resetStopwatch = useCallback(() => {
    if (swRef.current) cancelAnimationFrame(swRef.current);
    swRef.current = null;
    setSwRunning(false);
    setSwPaused(false);
    setSwElapsed(0);
    setLaps([]);
    swAccumulatedRef.current = 0;
  }, []);

  const addLap = useCallback(() => {
    const currentTotal = swElapsed;
    const prevTotal = laps.length > 0 ? laps[0].totalTime : 0;
    const lapTime = currentTotal - prevTotal;

    setLaps(prev => [
      { number: prev.length + 1, lapTime, totalTime: currentTotal },
      ...prev,
    ]);
  }, [swElapsed, laps]);

  // ── Cleanup on unmount ────────────────────────────────────────────

  useEffect(() => {
    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
      if (swRef.current) cancelAnimationFrame(swRef.current);
    };
  }, []);

  // ── Lap analysis ──────────────────────────────────────────────────

  let fastestLap = -1;
  let slowestLap = -1;
  if (laps.length >= 2) {
    let minTime = Infinity;
    let maxTime = -Infinity;
    for (const lap of laps) {
      if (lap.lapTime < minTime) { minTime = lap.lapTime; fastestLap = lap.number; }
      if (lap.lapTime > maxTime) { maxTime = lap.lapTime; slowestLap = lap.number; }
    }
  }

  // ── Render ────────────────────────────────────────────────────────

  if (!mounted) return null;

  const progress = totalTime > 0 ? timeLeft / totalTime : 0;
  const timerIdle = !timerRunning && !timerPaused && !timerFinished;

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      {/* Mode tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-xl p-1" style={{ backgroundColor: 'rgb(var(--bg-tertiary))' }}>
          <button
            onClick={() => setMode('timer')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              mode === 'timer'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            style={mode === 'timer' ? { backgroundColor: 'rgb(var(--bg-card))' } : undefined}
          >
            <TimerIcon className="w-4 h-4" />
            Timer
          </button>
          <button
            onClick={() => setMode('stopwatch')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              mode === 'stopwatch'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            style={mode === 'stopwatch' ? { backgroundColor: 'rgb(var(--bg-card))' } : undefined}
          >
            <Clock className="w-4 h-4" />
            Stopwatch
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'timer' ? (
          <motion.div
            key="timer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* ─── Countdown Timer ─────────────────────────────── */}
            <div className="flex flex-col items-center">
              {/* Progress ring + time display */}
              <div className="relative flex items-center justify-center" style={{ width: RING_SIZE, height: RING_SIZE }}>
                <ProgressRing progress={progress} />
                <div
                  className={`relative z-10 font-mono font-bold tabular-nums select-none ${
                    timerFinished ? 'animate-pulse text-red-500' : ''
                  }`}
                  style={{
                    fontSize: '3.25rem',
                    color: timerFinished ? undefined : 'rgb(var(--text-primary))',
                  }}
                >
                  {formatCountdown(timeLeft)}
                </div>
              </div>

              {/* Preset buttons — only show when idle */}
              {timerIdle && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6"
                >
                  <p className="text-sm font-medium text-center mb-3" style={{ color: 'rgb(var(--text-tertiary))' }}>
                    Quick presets
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {PRESETS.map((p) => (
                      <button
                        key={p.label}
                        onClick={() => handlePreset(p.ms)}
                        className="px-4 py-2 rounded-full text-sm font-medium transition-colors border hover:shadow-sm"
                        style={{
                          borderColor: 'rgb(var(--border-primary))',
                          color: 'rgb(var(--text-secondary))',
                          backgroundColor: 'rgb(var(--bg-secondary))',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgb(var(--accent-primary))';
                          e.currentTarget.style.color = '#fff';
                          e.currentTarget.style.borderColor = 'rgb(var(--accent-primary))';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgb(var(--bg-secondary))';
                          e.currentTarget.style.color = 'rgb(var(--text-secondary))';
                          e.currentTarget.style.borderColor = 'rgb(var(--border-primary))';
                        }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {/* Custom input */}
                  <div className="mt-6">
                    <p className="text-sm font-medium text-center mb-3" style={{ color: 'rgb(var(--text-tertiary))' }}>
                      Custom time
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex flex-col items-center">
                        <input
                          type="number"
                          min={0}
                          max={99}
                          value={inputH}
                          onChange={(e) => setInputH(e.target.value)}
                          className="w-16 text-center text-2xl font-mono rounded-lg p-2 input-field"
                          aria-label="Hours"
                        />
                        <span className="text-xs mt-1" style={{ color: 'rgb(var(--text-muted))' }}>hrs</span>
                      </div>
                      <span className="text-2xl font-bold" style={{ color: 'rgb(var(--text-muted))' }}>:</span>
                      <div className="flex flex-col items-center">
                        <input
                          type="number"
                          min={0}
                          max={59}
                          value={inputM}
                          onChange={(e) => setInputM(e.target.value)}
                          className="w-16 text-center text-2xl font-mono rounded-lg p-2 input-field"
                          aria-label="Minutes"
                        />
                        <span className="text-xs mt-1" style={{ color: 'rgb(var(--text-muted))' }}>min</span>
                      </div>
                      <span className="text-2xl font-bold" style={{ color: 'rgb(var(--text-muted))' }}>:</span>
                      <div className="flex flex-col items-center">
                        <input
                          type="number"
                          min={0}
                          max={59}
                          value={inputS}
                          onChange={(e) => setInputS(e.target.value)}
                          className="w-16 text-center text-2xl font-mono rounded-lg p-2 input-field"
                          aria-label="Seconds"
                        />
                        <span className="text-xs mt-1" style={{ color: 'rgb(var(--text-muted))' }}>sec</span>
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={handleCustomStart}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white transition-colors"
                        style={{ backgroundColor: 'rgb(var(--accent-primary))' }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgb(var(--accent-secondary))'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgb(var(--accent-primary))'; }}
                      >
                        <Play className="w-4 h-4" />
                        Start
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Control buttons — shown when running / paused / finished */}
              {!timerIdle && (
                <div className="flex items-center justify-center gap-3 mt-6">
                  {timerRunning && !timerPaused && !timerFinished && (
                    <button
                      onClick={pauseCountdown}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-amber-500 hover:bg-amber-600 transition-colors"
                    >
                      <Pause className="w-5 h-5" />
                      Pause
                    </button>
                  )}
                  {timerPaused && (
                    <button
                      onClick={resumeCountdown}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-green-500 hover:bg-green-600 transition-colors"
                    >
                      <Play className="w-5 h-5" />
                      Resume
                    </button>
                  )}
                  <button
                    onClick={resetCountdown}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors"
                    style={{
                      backgroundColor: 'rgb(var(--bg-tertiary))',
                      color: 'rgb(var(--text-secondary))',
                    }}
                  >
                    <RotateCcw className="w-5 h-5" />
                    Reset
                  </button>
                </div>
              )}

              {/* Finished message */}
              {timerFinished && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 text-lg font-semibold text-red-500"
                >
                  Time is up!
                </motion.p>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="stopwatch"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* ─── Stopwatch ──────────────────────────────────── */}
            <div className="flex flex-col items-center">
              {/* Time display */}
              <div
                className="font-mono font-bold tabular-nums select-none"
                style={{
                  fontSize: '4rem',
                  lineHeight: 1.1,
                  color: 'rgb(var(--text-primary))',
                }}
              >
                {formatStopwatch(swElapsed)}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3 mt-8">
                {!swRunning && !swPaused && (
                  <button
                    onClick={startStopwatch}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-green-500 hover:bg-green-600 transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    Start
                  </button>
                )}

                {swRunning && !swPaused && (
                  <>
                    <button
                      onClick={pauseStopwatch}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-amber-500 hover:bg-amber-600 transition-colors"
                    >
                      <Pause className="w-5 h-5" />
                      Pause
                    </button>
                    <button
                      onClick={addLap}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-colors"
                      style={{ backgroundColor: 'rgb(var(--accent-primary))' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgb(var(--accent-secondary))'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgb(var(--accent-primary))'; }}
                    >
                      <Flag className="w-5 h-5" />
                      Lap
                    </button>
                  </>
                )}

                {swPaused && (
                  <>
                    <button
                      onClick={resumeStopwatch}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-green-500 hover:bg-green-600 transition-colors"
                    >
                      <Play className="w-5 h-5" />
                      Resume
                    </button>
                    <button
                      onClick={resetStopwatch}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors"
                      style={{
                        backgroundColor: 'rgb(var(--bg-tertiary))',
                        color: 'rgb(var(--text-secondary))',
                      }}
                    >
                      <RotateCcw className="w-5 h-5" />
                      Reset
                    </button>
                  </>
                )}

                {swRunning && !swPaused && (
                  <button
                    onClick={resetStopwatch}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors"
                    style={{
                      backgroundColor: 'rgb(var(--bg-tertiary))',
                      color: 'rgb(var(--text-secondary))',
                    }}
                  >
                    <RotateCcw className="w-5 h-5" />
                    Reset
                  </button>
                )}
              </div>

              {/* Lap table */}
              {laps.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full mt-8 rounded-xl border overflow-hidden"
                  style={{ borderColor: 'rgb(var(--border-primary))' }}
                >
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ backgroundColor: 'rgb(var(--bg-secondary))' }}>
                        <th className="text-left px-4 py-3 font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                          Lap
                        </th>
                        <th className="text-right px-4 py-3 font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                          Lap Time
                        </th>
                        <th className="text-right px-4 py-3 font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {laps.map((lap) => {
                        const isFastest = lap.number === fastestLap;
                        const isSlowest = lap.number === slowestLap;
                        return (
                          <tr
                            key={lap.number}
                            className="border-t"
                            style={{
                              borderColor: 'rgb(var(--border-primary))',
                              backgroundColor: isFastest
                                ? 'rgba(34,197,94,0.08)'
                                : isSlowest
                                  ? 'rgba(239,68,68,0.08)'
                                  : undefined,
                            }}
                          >
                            <td className="px-4 py-2.5 font-medium" style={{ color: 'rgb(var(--text-primary))' }}>
                              <span className="flex items-center gap-2">
                                #{lap.number}
                                {isFastest && (
                                  <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-semibold">
                                    Fastest
                                  </span>
                                )}
                                {isSlowest && (
                                  <span className="text-xs px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-semibold">
                                    Slowest
                                  </span>
                                )}
                              </span>
                            </td>
                            <td
                              className="px-4 py-2.5 text-right font-mono tabular-nums"
                              style={{
                                color: isFastest
                                  ? 'rgb(34,197,94)'
                                  : isSlowest
                                    ? 'rgb(239,68,68)'
                                    : 'rgb(var(--text-secondary))',
                              }}
                            >
                              {formatStopwatch(lap.lapTime)}
                            </td>
                            <td className="px-4 py-2.5 text-right font-mono tabular-nums" style={{ color: 'rgb(var(--text-tertiary))' }}>
                              {formatStopwatch(lap.totalTime)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
