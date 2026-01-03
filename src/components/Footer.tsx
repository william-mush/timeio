'use client';

import Link from 'next/link';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white/60 backdrop-blur-xl border-t border-gray-200/50 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Logo & Copyright */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="font-semibold">
                            <span className="text-blue-500">time</span>
                            <span className="text-gray-500">.IO</span>
                        </Link>
                        <span className="text-gray-300">•</span>
                        <span>© {currentYear}</span>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6 text-sm">
                        <Link
                            href="/history"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            About Time
                        </Link>
                        <Link
                            href="/settings"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            Settings
                        </Link>
                        <a
                            href="mailto:support@time.io"
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
