'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clock, MapPin, Bell, Settings, User } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export const Navigation = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

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
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              {new Date().toLocaleTimeString()}
            </div>

            {session ? (
              <div className="flex items-center space-x-4">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <User className="h-8 w-8 text-gray-400" />
                )}
                <button
                  onClick={() => signOut()}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}; 