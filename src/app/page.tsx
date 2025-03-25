import { TimeDisplay } from '@/components/Time';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-b from-white to-gray-50">
      <div className="z-10 w-full">
        <div className="fixed left-0 top-0 w-full border-b border-gray-300/20 bg-white/60 backdrop-blur-xl pb-6 pt-8">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <p>time.io</p>
            <div className="flex space-x-4">
              <button className="px-4 py-1.5 text-sm text-gray-500/90 hover:text-gray-600 transition-colors bg-white/40 backdrop-blur-xl rounded-lg">
                Sign in
              </button>
              <button className="px-4 py-1.5 text-sm text-gray-500/90 hover:text-gray-600 transition-colors bg-white/50 backdrop-blur-xl rounded-lg border border-gray-300/20">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex place-items-center">
        <TimeDisplay showMilliseconds={false} />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left gap-6">
        <Link
          href="/alarms"
          className="group rounded-xl border border-transparent px-5 py-4 transition-colors hover:border-gray-300/20 bg-white/60 backdrop-blur-2xl"
        >
          <h2 className="mb-3 text-2xl font-semibold text-gray-500/90">
            Alarms{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-gray-400">
            Set and manage your alarms with style.
          </p>
        </Link>

        <Link
          href="/world-clock"
          className="group rounded-xl border border-transparent px-5 py-4 transition-colors hover:border-gray-300/20 bg-white/60 backdrop-blur-2xl"
        >
          <h2 className="mb-3 text-2xl font-semibold text-gray-500/90">
            World Clock{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-gray-400">
            Track time across the globe.
          </p>
        </Link>

        <Link
          href="/world-map"
          className="group rounded-xl border border-transparent px-5 py-4 transition-colors hover:border-gray-300/20 bg-white/60 backdrop-blur-2xl"
        >
          <h2 className="mb-3 text-2xl font-semibold text-gray-500/90">
            World Map{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-gray-400">
            Visual time zone explorer.
          </p>
        </Link>

        <Link
          href="/solar-clock"
          className="group rounded-xl border border-transparent px-5 py-4 transition-colors hover:border-gray-300/20 bg-white/60 backdrop-blur-2xl"
        >
          <h2 className="mb-3 text-2xl font-semibold text-gray-500/90">
            Solar Clock 2D{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-gray-400">
            Track celestial movements in 2D.
          </p>
        </Link>

        <Link
          href="/solar-clock-3d"
          className="group rounded-xl border border-transparent px-5 py-4 transition-colors hover:border-gray-300/20 bg-white/60 backdrop-blur-2xl"
        >
          <h2 className="mb-3 text-2xl font-semibold text-gray-500/90">
            Solar Clock 3D{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-gray-400">
            Explore the solar system in 3D.
          </p>
        </Link>

        <Link
          href="/settings"
          className="group rounded-xl border border-transparent px-5 py-4 transition-colors hover:border-gray-300/20 bg-white/60 backdrop-blur-2xl"
        >
          <h2 className="mb-3 text-2xl font-semibold text-gray-500/90">
            Settings{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm text-gray-400">
            Customize your time experience.
          </p>
        </Link>
      </div>
    </main>
  );
}
