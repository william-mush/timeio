import { Timer } from '@/components/Timer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Timer & Stopwatch | time.io',
  description:
    'Countdown timer and stopwatch with lap tracking. Set custom timers or use presets.',
  keywords: [
    'countdown timer',
    'stopwatch',
    'online timer',
    'lap timer',
    'timer with presets',
    'stopwatch online',
    'free timer',
    'web stopwatch',
  ],
  openGraph: {
    title: 'Timer & Stopwatch - Time.IO',
    description:
      'Countdown timer and stopwatch with lap tracking. Set custom timers or use presets.',
    type: 'website',
    url: 'https://time.io/timer',
  },
  alternates: {
    canonical: 'https://time.io/timer',
  },
};

export default function TimerPage() {
  return (
    <div className="page-container">
      <div className="content-container">
        <h1 className="heading-1 mb-8">Timer & Stopwatch</h1>
        <div className="card">
          <Timer />
        </div>

        {/* SEO Content */}
        <div className="mt-12 max-w-3xl mx-auto text-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Free Online Timer & Stopwatch
          </h2>
          <p className="mb-4">
            Use Time.IO's countdown timer to set custom timers with preset
            options or enter your own duration. Switch to stopwatch mode for
            precise time tracking with lap splits.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            Features
          </h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Countdown timer with visual progress ring</li>
            <li>Quick presets: 1, 5, 10, 15, 30 minutes and 1 hour</li>
            <li>Stopwatch with lap tracking and split times</li>
            <li>Highlights fastest and slowest laps</li>
            <li>Browser notifications when timer completes</li>
            <li>Works on desktop, tablet, and mobile</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
