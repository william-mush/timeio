'use client';

import { SessionProvider } from "@/components/SessionProvider";
import { AuthHeader } from '@/components/AuthHeader';
import { Navigation } from "@/components/Navigation";
import { useEffect, useState } from "react";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');

  useEffect(() => {
    // Load theme from settings
    const savedSettings = localStorage.getItem('timeSettings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setTheme(settings.theme || 'light');
      } catch (e) {
        console.error('Failed to parse saved settings:', e);
      }
    }

    // Listen for theme changes
    const handleSettingsChange = (event: CustomEvent<any>) => {
      if (event.detail.theme) {
        setTheme(event.detail.theme);
      }
    };

    window.addEventListener('timeSettingsChanged', handleSettingsChange as EventListener);
    return () => {
      window.removeEventListener('timeSettingsChanged', handleSettingsChange as EventListener);
    };
  }, []);

  // Determine actual theme based on system preference and settings
  const getActualTheme = () => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  };

  // Update data-theme attribute when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', getActualTheme());
  }, [theme]);

  return (
    <SessionProvider>
      <div className="min-h-screen bg-gradient-to-br from-primary-100/30 via-secondary-100/30 to-accent-100/30">
        <AuthHeader />
        <Navigation />
        <main className="pt-32">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
} 