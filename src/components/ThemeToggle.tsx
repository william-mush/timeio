'use client';

import { useTheme } from './ThemeProvider';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const themes = [
        { value: 'light' as const, label: 'Light', icon: Sun },
        { value: 'dark' as const, label: 'Dark', icon: Moon },
        { value: 'system' as const, label: 'System', icon: Monitor },
    ];

    const CurrentIcon = resolvedTheme === 'dark' ? Moon : Sun;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                style={{
                    backgroundColor: isOpen ? 'rgb(var(--bg-tertiary))' : 'transparent',
                }}
                aria-label="Toggle theme"
            >
                <CurrentIcon
                    className="w-5 h-5 transition-colors"
                    style={{ color: 'rgb(var(--text-secondary))' }}
                />
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 top-full mt-2 py-2 rounded-xl shadow-xl border z-50 min-w-[140px]"
                    style={{
                        backgroundColor: 'rgb(var(--bg-card))',
                        borderColor: 'rgb(var(--border-primary))',
                    }}
                >
                    {themes.map(({ value, label, icon: Icon }) => (
                        <button
                            key={value}
                            onClick={() => {
                                setTheme(value);
                                setIsOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors"
                            style={{
                                color: theme === value ? 'rgb(var(--accent-primary))' : 'rgb(var(--text-secondary))',
                                backgroundColor: theme === value ? 'rgba(var(--accent-primary), 0.1)' : 'transparent',
                            }}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{label}</span>
                            {theme === value && (
                                <span className="ml-auto text-xs">✓</span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// Simple toggle button (alternative)
export function ThemeToggleSimple() {
    const { resolvedTheme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full transition-colors duration-300"
            style={{
                backgroundColor: resolvedTheme === 'dark'
                    ? 'rgb(var(--accent-primary))'
                    : 'rgb(var(--bg-tertiary))',
            }}
            aria-label="Toggle theme"
        >
            <div
                className="absolute top-1 w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center"
                style={{
                    left: resolvedTheme === 'dark' ? 'calc(100% - 24px)' : '4px',
                    backgroundColor: 'rgb(var(--bg-primary))',
                }}
            >
                {resolvedTheme === 'dark' ? (
                    <Moon className="w-3 h-3" style={{ color: 'rgb(var(--accent-primary))' }} />
                ) : (
                    <Sun className="w-3 h-3" style={{ color: 'rgb(var(--text-tertiary))' }} />
                )}
            </div>
        </button>
    );
}
