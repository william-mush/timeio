'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clock, MapPin, Bell, Settings } from 'lucide-react';

export const Navigation = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const links = [
    { href: '/', label: 'Time', icon: Clock },
    { href: '/world-map', label: 'World Map', icon: MapPin },
    { href: '/alarms', label: 'Alarms', icon: Bell },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive(href)
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5 mr-1.5" />
                {label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center">
            <div className="text-sm text-gray-500">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}; 