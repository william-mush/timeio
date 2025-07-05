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
      <div className="content-container flex flex-col items-center justify-center gap-8 md:gap-16 min-h-[calc(100vh-8rem)] px-4 md:px-6">
        <div className="relative flex place-items-center scale-75 md:scale-100">
          <TimeDisplay showMilliseconds={showMs} />
        </div>

        <div className="grid w-full text-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl">
          <Link href="/search" className="card card-hover p-4 md:p-6">
            <h2 className="heading-2 mb-2 md:mb-3 text-xl md:text-2xl">
              US Cities{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="text-muted text-sm md:text-base">Find current time for any US city with 100,000+ people.</p>
          </Link>

          <Link href="/alarms" className="card card-hover p-4 md:p-6">
            <h2 className="heading-2 mb-2 md:mb-3 text-xl md:text-2xl">
              Alarms{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="text-muted text-sm md:text-base">Set and manage your alarms with style.</p>
          </Link>

          <Link href="/world-clock" className="card card-hover p-4 md:p-6">
            <h2 className="heading-2 mb-2 md:mb-3 text-xl md:text-2xl">
              World Clock{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="text-muted text-sm md:text-base">Track time across the globe.</p>
          </Link>

          <Link href="/world-map" className="card card-hover p-4 md:p-6">
            <h2 className="heading-2 mb-2 md:mb-3 text-xl md:text-2xl">
              World Map{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="text-muted text-sm md:text-base">Visual time zone explorer.</p>
          </Link>

          <Link href="/solar-clock" className="card card-hover p-4 md:p-6">
            <h2 className="heading-2 mb-2 md:mb-3 text-xl md:text-2xl">
              Solar Clock 2D{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="text-muted text-sm md:text-base">Track celestial movements in 2D.</p>
          </Link>

          <Link href="/solar-clock-3d" className="card card-hover p-4 md:p-6">
            <h2 className="heading-2 mb-2 md:mb-3 text-xl md:text-2xl">
              Solar Clock 3D{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="text-muted text-sm md:text-base">Explore the solar system in 3D.</p>
          </Link>

          <Link href="/history" className="card card-hover p-4 md:p-6">
            <h2 className="heading-2 mb-2 md:mb-3 text-xl md:text-2xl">
              Time History{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="text-muted text-sm md:text-base">Explore the fascinating history of timekeeping.</p>
          </Link>

          <Link href="/settings" className="card card-hover p-4 md:p-6">
            <h2 className="heading-2 mb-2 md:mb-3 text-xl md:text-2xl">
              Settings{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="text-muted text-sm md:text-base">Customize your time experience.</p>
          </Link>

          <Link href="/luxury" className="card card-hover p-4 md:p-6">
            <h2 className="heading-2 mb-2 md:mb-3 text-xl md:text-2xl">
              Modern Luxury Timepieces{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="text-muted text-sm md:text-base">Discover the world's most prestigious watch brands and their iconic models.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
