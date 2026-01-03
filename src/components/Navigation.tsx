'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clock, MapPin, Bell, Settings, Sun, Home, Menu, X, History, Star, Building2, ChevronDown, Watch } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const TimeDisplay = () => {
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [period, setPeriod] = useState('AM');
  const [format24Hour, setFormat24Hour] = useState(false);

  useEffect(() => {
    const loadSettings = () => {
      const savedSettings = localStorage.getItem('timeSettings');
      if (savedSettings) {
        try {
          const settings = JSON.parse(savedSettings);
          if (settings.format24Hour !== undefined) setFormat24Hour(settings.format24Hour);
        } catch (e) {
          console.error('Failed to parse saved settings:', e);
        }
      }
    };

    loadSettings();

    const handleSettingsChange = (event: CustomEvent<any>) => {
      const { format24Hour } = event.detail;
      if (format24Hour !== undefined) setFormat24Hour(format24Hour);
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

      let period = '';
      if (!format24Hour) {
        period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
      }

      setHours(hours.toString().padStart(2, '0'));
      setMinutes(minutes);
      setSeconds(seconds);
      setPeriod(period);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [format24Hour]);

  return (
    <div className="text-sm font-mono text-gray-500 tabular-nums whitespace-nowrap">
      {hours}:{minutes}:{seconds}
      {!format24Hour && ` ${period}`}
    </div>
  );
};

// Primary nav items (always visible)
const primaryNavItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/world-clock', label: 'World Clock', icon: Clock },
  { href: '/alarms', label: 'Alarms', icon: Bell },
];

// Explore dropdown items
const exploreItems = [
  { href: '/us-cities', label: 'US Cities', icon: Building2 },
  { href: '/world-map', label: 'World Map', icon: MapPin },
  { href: '/history', label: 'Time History', icon: History },
  { href: '/luxury', label: 'Luxury Watches', icon: Watch },
];

// Solar dropdown items
const solarItems = [
  { href: '/solar-clock', label: '2D View', icon: Sun },
  { href: '/solar-clock-3d', label: '3D View', icon: Sun },
];

// Dropdown component
function NavDropdown({
  label,
  icon: Icon,
  items,
  pathname
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
  pathname: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isActive = items.some(item => pathname === item.href);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-sm transition-colors flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap ${isActive
            ? 'text-blue-500 font-medium bg-blue-50/50'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/50'
          }`}
      >
        <Icon className="w-4 h-4" />
        {label}
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-1 min-w-[160px] z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${pathname === item.href
                  ? 'text-blue-500 bg-blue-50/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // All items for mobile menu
  const allMobileItems = [
    ...primaryNavItems,
    { href: '/us-cities', label: 'US Cities', icon: Building2 },
    { href: '/world-map', label: 'World Map', icon: MapPin },
    { href: '/solar-clock', label: 'Solar Clock 2D', icon: Sun },
    { href: '/solar-clock-3d', label: 'Solar Clock 3D', icon: Sun },
    { href: '/history', label: 'Time History', icon: History },
    { href: '/luxury', label: 'Luxury Watches', icon: Star },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

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
            {/* Primary items */}
            {primaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap ${pathname === item.href
                  ? 'text-blue-500 font-medium bg-blue-50/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/50'
                  }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}

            {/* Divider */}
            <div className="w-px h-6 bg-gray-200 mx-1" />

            {/* Explore dropdown */}
            <NavDropdown
              label="Explore"
              icon={MapPin}
              items={exploreItems}
              pathname={pathname}
            />

            {/* Solar Clock dropdown */}
            <NavDropdown
              label="Solar Clock"
              icon={Sun}
              items={solarItems}
              pathname={pathname}
            />

            {/* Settings (visible when not authenticated) */}
            {status !== 'authenticated' && (
              <Link
                href="/settings"
                className={`text-sm transition-colors flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap ${pathname === '/settings'
                  ? 'text-blue-500 font-medium bg-blue-50/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/50'
                  }`}
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-4 pl-2 sm:pl-4 border-l border-gray-200/50">
            <TimeDisplay />

            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
            ) : status === 'authenticated' && session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || 'User profile'}
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-semibold text-xs">
                        {session.user.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                </button>

                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-40 animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {session.user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {session.user.email}
                        </p>
                      </div>
                      <Link
                        href="/settings"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <button
                        onClick={async () => {
                          const { signOut } = await import('next-auth/react');
                          await signOut({ callbackUrl: '/' });
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" x2="9" y1="12" y2="12" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm hover:shadow"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-2 border-t border-gray-200/50">
            <div className="flex flex-col space-y-1">
              {allMobileItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors flex items-center gap-2 px-3 py-2.5 rounded-lg ${pathname === item.href
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