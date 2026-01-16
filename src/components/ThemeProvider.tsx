'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'system',
    setTheme: () => { },
    resolvedTheme: 'light',
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('system');
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
    const [mounted, setMounted] = useState(false);

    // Get system preference
    const getSystemTheme = (): 'light' | 'dark' => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    };

    // Apply theme to document
    const applyTheme = (newTheme: 'light' | 'dark') => {
        document.documentElement.setAttribute('data-theme', newTheme);
        // Also add/remove dark class for Tailwind CSS dark mode
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        setResolvedTheme(newTheme);
    };

    // Set theme and persist
    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newTheme);
        }

        if (newTheme === 'system') {
            applyTheme(getSystemTheme());
        } else {
            applyTheme(newTheme);
        }
    };

    // Initialize on mount
    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        const initialTheme = savedTheme || 'system';
        setThemeState(initialTheme);

        if (initialTheme === 'system') {
            applyTheme(getSystemTheme());
        } else {
            applyTheme(initialTheme);
        }

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            const currentTheme = localStorage.getItem('theme') as Theme | null || 'system';
            if (currentTheme === 'system') {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Update when theme changes
    useEffect(() => {
        if (!mounted) return;

        if (theme === 'system') {
            applyTheme(getSystemTheme());
        } else {
            applyTheme(theme);
        }
    }, [theme, mounted]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

