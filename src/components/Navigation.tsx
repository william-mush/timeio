'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clock, MapPin, Bell, Settings, Sun, Home, Menu, X, History, Star, Globe } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const TimeDisplay = () => {
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [milliseconds, setMilliseconds] = useState('000');
  const [period, setPeriod] = useState('AM');
  const [format24Hour, setFormat24Hour] = useState(false);
  const [showMilliseconds, setShowMilliseconds] = useState(false);

  useEffect(() => {
    const loadSettings = () => {
      const savedSettings = localStorage.getItem('timeSettings');
      if (savedSettings) {
        try {
          const settings = JSON.parse(savedSettings);
          if (settings.format24Hour !== undefined) setFormat24Hour(settings.format24Hour);
          if (settings.showMilliseconds !== undefined) setShowMilliseconds(settings.showMilliseconds);
        } catch (e) {
          console.error('Failed to parse saved settings:', e);
        }
      }
    };

    loadSettings();

    const handleSettingsChange = (event: CustomEvent<any>) => {
      const { format24Hour, showMilliseconds } = event.detail;
      if (format24Hour !== undefined) setFormat24Hour(format24Hour);
      if (showMilliseconds !== undefined) setShowMilliseconds(showMilliseconds);
    };

    window.addEventListener('timeSettingsChanged', handleSettingsChange as EventListener);
    return () => {
      window.removeEventListener('timeSettingsChanged', handleSettingsChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const ms = now.getMilliseconds().toString().padStart(3, '0');
      
      let period = '';
      if (!format24Hour) {
        period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Convert 0 to 12
      }
      
      setHours(hours.toString().padStart(2, '0'));
      setMinutes(minutes);
      setSeconds(seconds);
      setMilliseconds(ms);
      setPeriod(period);
    };

    updateTime();
    const interval = setInterval(updateTime, showMilliseconds ? 16 : 1000);
    return () => clearInterval(interval);
  }, [format24Hour, showMilliseconds]);

  return (
    <div className="text-sm font-mono text-gray-500 tabular-nums whitespace-nowrap">
      {hours}:{minutes}:{seconds}
      {showMilliseconds && `:${milliseconds}`}
      {!format24Hour && ` ${period}`}
    </div>
  );
};

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/alarms', label: 'Alarms', icon: Bell },
  { href: '/world-clock', label: 'World Clock', icon: Clock },
  { href: '/cities', label: 'World Cities', icon: Globe },
  { href: '/world-map', label: 'World Map', icon: MapPin },
  { href: '/solar-clock', label: 'Solar Clock 2D', icon: Sun },
  { href: '/solar-clock-3d', label: 'Solar Clock 3D', icon: Sun },
  { href: '/history', label: 'History', icon: History },
  { href: '/luxury', label: 'Modern Luxury Timepieces', icon: Star },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed left-0 top-16 w-full bg-white/60 backdrop-blur-xl border-b border-gray-200/50 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100/50"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            )}
          </button>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap ${
                  pathname === item.href
                    ? 'text-blue-500 font-medium bg-blue-50/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 pl-2 sm:pl-4 border-l border-gray-200/50">
            <TimeDisplay />

            {status === 'authenticated' && session?.user?.image && (
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-gray-100">
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

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-2">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors flex items-center gap-2 px-3 py-2.5 rounded-lg ${
                    pathname === item.href
                      ? 'text-blue-500 font-medium bg-blue-50/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 