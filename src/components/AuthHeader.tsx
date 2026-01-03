'use client';

import Link from 'next/link';

export function AuthHeader() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/60 backdrop-blur-xl border-b border-gray-200/50 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-lg sm:text-xl font-semibold text-gray-800 hover:text-gray-900 transition-colors flex items-center"
          >
            <span className="text-blue-500">time</span>
            <span className="text-gray-500">.IO</span>
          </Link>
        </div>
      </div>
    </header>
  );
}