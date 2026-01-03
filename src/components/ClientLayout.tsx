'use client';

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Load theme from database settings
    const loadSettings = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch('/api/settings');
        if (response.ok) {
          const settings = await response.json();
          setTheme(settings.theme || 'light');
        }
      } catch (e) {
        console.error('Failed to load settings:', e);
      }
    };

    loadSettings();

    // Listen for theme changes
    const handleSettingsChange = (event: CustomEvent<any>) => {
      if (event.detail.theme) {
        setTheme(event.detail.theme);
      }
    };

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        updateThemeClass();
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    window.addEventListener('timeSettingsChanged', handleSettingsChange as EventListener);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
      window.removeEventListener('timeSettingsChanged', handleSettingsChange as EventListener);
    };
  }, [session]);

  // Determine actual theme based on system preference and settings
  const getActualTheme = () => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  };

  // Update theme classes
  const updateThemeClass = () => {
    const actualTheme = getActualTheme();
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(actualTheme);
  };

  // Update theme classes when theme changes
  useEffect(() => {
    if (mounted) {
      updateThemeClass();
    }
  }, [theme, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <div className="flex-1 bg-gradient-to-br from-primary-100/30 via-secondary-100/30 to-accent-100/30 dark:from-gray-800/50 dark:via-gray-800/30 dark:to-gray-900/50">
        <Navigation />
        <main className="pt-20 min-h-[calc(100vh-200px)]">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}