'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clock, MapPin, Bell, Settings, Sun } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const TimeDisplay = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString());
    };
    
    updateTime(); // Initial update
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-sm text-gray-500">
      {time}
    </div>
  );
};

const navItems = [
  { href: '/', label: 'Home', icon: Clock },
  { href: '/alarms', label: 'Alarms', icon: Bell },
  { href: '/world-clock', label: 'World Clock', icon: Clock },
  { href: '/world-map', label: 'World Map', icon: MapPin },
  { href: '/solar-clock', label: 'Solar Clock 2D', icon: Sun },
  { href: '/solar-clock-3d', label: 'Solar Clock 3D', icon: Sun },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <nav className="fixed left-0 top-16 w-full bg-white/60 backdrop-blur-xl border-b border-gray-200/50 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors flex items-center gap-2 ${
                  pathname === item.href
                    ? 'text-blue-500 font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <TimeDisplay />

            {status === 'authenticated' && session?.user?.image && (
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User profile'}
                  width={32}
                  height={32}
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 