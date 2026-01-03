'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clock, MapPin, Bell, Settings, Sun, Menu, X, History, Building2, ChevronDown, Watch, Globe } from 'lucide-react';
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
    <div className="text-sm font-mono text-gray-600 tabular-nums whitespace-nowrap bg-gray-50 px-3 py-1.5 rounded-lg">
      {hours}:{minutes}:{seconds}
      {!format24Hour && <span className="text-gray-400 ml-1">{period}</span>}
    </div>
  );
};

// User avatar with error handling fallback
const UserAvatar = ({ image, name }: { image?: string | null; name?: string | null }) => {
  const [imageError, setImageError] = useState(false);
  const initial = name?.[0]?.toUpperCase() || 'U';

  if (!image || imageError) {
    return (
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 font-semibold text-sm border-2 border-blue-200">
        {initial}
      </div>
    );
  }

  return (
    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
      <Image
        src={image}
        alt={name || 'User profile'}
        width={32}
        height={32}
        className="object-cover w-full h-full"
        onError={() => setImageError(true)}
        unoptimized
      />
    </div>
  );
};
// Location dropdown items
const locationItems = [
  { href: '/world-clock', label: 'World Clock', icon: Clock },
  { href: '/time-converter', label: 'Time Converter', icon: Globe },
  { href: '/world-map', label: 'World Map', icon: MapPin },
  { href: '/world-cities', label: 'World Cities', icon: Globe },
  { href: '/us-cities', label: 'US Cities', icon: Building2 },
];

// Explore dropdown items
const exploreItems = [
  { href: '/solar-clock', label: 'Solar Clock 2D', icon: Sun },
  { href: '/solar-clock-3d', label: 'Solar Clock 3D', icon: Sun },
  { href: '/history', label: 'Time History', icon: History },
  { href: '/luxury', label: 'Luxury Watches', icon: Watch },
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
          ? 'text-blue-600 font-medium bg-blue-50'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
      >
        <Icon className="w-4 h-4" />
        {label}
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-1 min-w-[180px] z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${pathname === item.href
                ? 'text-blue-600 bg-blue-50'
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
    { href: '/', label: 'Home', icon: Globe },
    { href: '/world-clock', label: 'World Clock', icon: Clock },
    { href: '/world-map', label: 'World Map', icon: MapPin },
    { href: '/us-cities', label: 'US Cities', icon: Building2 },
    { href: '/alarms', label: 'Alarms', icon: Bell },
    { href: '/solar-clock', label: 'Solar Clock 2D', icon: Sun },
    { href: '/solar-clock-3d', label: 'Solar Clock 3D', icon: Sun },
    { href: '/history', label: 'Time History', icon: History },
    { href: '/luxury', label: 'Luxury Watches', icon: Watch },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Mobile menu button */}
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 -ml-2"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-semibold flex items-center hover:opacity-80 transition-opacity"
            >
              <span className="text-blue-600">time</span>
              <span className="text-gray-500">.IO</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Location Tools dropdown */}
            <NavDropdown
              label="Location"
              icon={MapPin}
              items={locationItems}
              pathname={pathname}
            />

            {/* Explore dropdown */}
            <NavDropdown
              label="Explore"
              icon={Globe}
              items={exploreItems}
              pathname={pathname}
            />
          </nav>

          {/* Right side: Quick actions + Time + User */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Alarms - Quick access */}
            <Link
              href="/alarms"
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${pathname === '/alarms'
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              title="Alarms"
            >
              <Bell className="w-4 h-4" />
              <span className="hidden md:inline">Alarms</span>
            </Link>

            {/* Settings - when not authenticated */}
            {status !== 'authenticated' && (
              <Link
                href="/settings"
                className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${pathname === '/settings'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                title="Settings"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden md:inline">Settings</span>
              </Link>
            )}

            {/* Divider */}
            <div className="hidden sm:block w-px h-6 bg-gray-200" />

            {/* Time Display */}
            <TimeDisplay />

            {/* User Menu / Sign In */}
            {status === 'loading' ? (
              <Link
                href="/auth/signin"
                className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 rounded-lg cursor-wait"
              >
                Sign In
              </Link>
            ) : status === 'authenticated' && session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <UserAvatar
                    image={session.user.image}
                    name={session.user.name}
                  />
                </button>

                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-40 animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {session.user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {session.user.email}
                        </p>
                      </div>
                      <Link
                        href="/alarms"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Bell className="w-4 h-4" />
                        My Alarms
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={async () => {
                            const { signOut } = await import('next-auth/react');
                            await signOut({ callbackUrl: '/' });
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 text-left"
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
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-gray-100">
            <div className="flex flex-col space-y-1">
              {allMobileItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors flex items-center gap-3 px-3 py-3 rounded-lg ${pathname === item.href
                    ? 'text-blue-600 font-medium bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}