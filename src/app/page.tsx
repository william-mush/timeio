'use client';

import { TimeDisplay } from '@/components/Time';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [showMs, setShowMs] = useState(false);

  useEffect(() => {
    const settings = localStorage.getItem('timeSettings');
    if (settings) {
      const { showMilliseconds } = JSON.parse(settings);
      setShowMs(showMilliseconds);
    }
  }, []);

  return (
    <div className="page-container">
      <div className="content-container flex flex-col items-center justify-center gap-16 min-h-[calc(100vh-8rem)]">
        <div className="relative flex place-items-center">
          <TimeDisplay showMilliseconds={showMs} />
        </div>

        <div className="grid text-center lg:max-w-5xl lg:w-full lg:grid-cols-3 gap-6">
          <Link href="/alarms" className="card card-hover">
            <h2 className="heading-2 mb-3">
              Alarms{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="text-muted">Set and manage your alarms with style.</p>
          </Link>

          <Link href="/world-clock" className="card card-hover">
            <h2 className="heading-2 mb-3">
              World Clock{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="text-muted">Track time across the globe.</p>
          </Link>

          <Link href="/world-map" className="card card-hover">
            <h2 className="heading-2 mb-3">
              World Map{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="text-muted">Visual time zone explorer.</p>
          </Link>

          <Link href="/solar-clock" className="card card-hover">
            <h2 className="heading-2 mb-3">
              Solar Clock 2D{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="text-muted">Track celestial movements in 2D.</p>
          </Link>

          <Link href="/solar-clock-3d" className="card card-hover">
            <h2 className="heading-2 mb-3">
              Solar Clock 3D{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="text-muted">Explore the solar system in 3D.</p>
          </Link>

          <Link href="/settings" className="card card-hover">
            <h2 className="heading-2 mb-3">
              Settings{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="text-muted">Customize your time experience.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
