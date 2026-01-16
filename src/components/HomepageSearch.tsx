'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Globe, Loader2, MapPin } from 'lucide-react';

interface SearchResult {
    geonameid: number;
    name: string;
    asciiName: string;
    country: string;
    countryCode: string;
    timezone: string;
    latitude: number;
    longitude: number;
    population: number;
    continent: string;
}

export function HomepageSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Debounced search
    useEffect(() => {
        const controller = new AbortController();

        const searchCities = async () => {
            if (!query.trim()) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const params = new URLSearchParams({
                    q: query.trim(),
                    limit: '8',
                });

                const response = await fetch(`/api/search-cities?${params}`, {
                    signal: controller.signal,
                });

                if (response.ok) {
                    const data = await response.json();
                    setResults(data.results || []);
                    setIsOpen(true);
                }
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    console.error('Search failed:', error);
                }
            } finally {
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            searchCities();
        }, 200);

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [query]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen || results.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && results[selectedIndex]) {
                    navigateToCity(results[selectedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setSelectedIndex(-1);
                break;
        }
    };

    const navigateToCity = (city: SearchResult) => {
        const slug = `${city.asciiName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${city.countryCode.toLowerCase()}`;
        router.push(`/city/${slug}`);
        setQuery('');
        setIsOpen(false);
    };

    const formatPopulation = (pop: number) => {
        if (pop >= 1000000) return `${(pop / 1000000).toFixed(1)}M`;
        if (pop >= 1000) return `${Math.round(pop / 1000)}K`;
        return pop.toString();
    };

    return (
        <div className="w-full max-w-2xl mx-auto relative">
            {/* Search Input */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                    ) : (
                        <Search className="w-5 h-5 text-gray-400" />
                    )}
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.trim() && results.length > 0 && setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search 33,000+ cities worldwide..."
                    className="w-full pl-12 pr-4 py-4 text-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white transition-all hover:shadow-xl"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-700 rounded">
                        ⌘K
                    </kbd>
                </div>
            </div>

            {/* Dropdown Results - Appears ABOVE the search bar */}
            {isOpen && results.length > 0 && (
                <div
                    ref={dropdownRef}
                    className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50"
                >
                    <div className="max-h-96 overflow-y-auto">
                        {results.map((city, index) => (
                            <button
                                key={city.geonameid}
                                onClick={() => navigateToCity(city)}
                                onMouseEnter={() => setSelectedIndex(index)}
                                className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${index === selectedIndex
                                    ? 'bg-blue-50 dark:bg-blue-900/30'
                                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                    }`}
                            >
                                <div className="flex-shrink-0">
                                    <Globe className="w-5 h-5 text-blue-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 dark:text-white truncate">
                                        {city.name}
                                        <span className="text-gray-500 dark:text-gray-400 font-normal">
                                            , {city.country}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                        <MapPin className="w-3 h-3" />
                                        <span>{city.continent}</span>
                                        {city.population > 0 && (
                                            <>
                                                <span>•</span>
                                                <span>{formatPopulation(city.population)} pop</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="flex-shrink-0 text-xs text-gray-400 dark:text-gray-500">
                                    {city.timezone.split('/').pop()?.replace(/_/g, ' ')}
                                </div>
                            </button>
                        ))}
                    </div>
                    <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                            <span>↑↓ to navigate</span>
                            <span>•</span>
                            <span>↵ to select</span>
                            <span>•</span>
                            <span>esc to close</span>
                        </p>
                    </div>
                </div>
            )}

            {/* No results message - Also appears ABOVE */}
            {isOpen && query.trim() && results.length === 0 && !isLoading && (
                <div
                    ref={dropdownRef}
                    className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50 p-6 text-center"
                >
                    <Globe className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">No cities found for "{query}"</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try a different spelling</p>
                </div>
            )}
        </div>
    );
}
