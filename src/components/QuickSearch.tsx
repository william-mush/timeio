'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from './ui/command';
import { Calculator, Clock, Globe, Loader2, Map, Search, Sun, Watch } from 'lucide-react';

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

export function QuickSearch() {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [results, setResults] = React.useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasSearched, setHasSearched] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    // Debounced search with API
    React.useEffect(() => {
        const controller = new AbortController();

        const searchCities = async () => {
            setIsLoading(true);
            try {
                const params = new URLSearchParams({
                    q: search.trim(),
                    limit: '30',
                });

                const response = await fetch(`/api/search-cities?${params}`, {
                    signal: controller.signal,
                });

                if (response.ok) {
                    const data = await response.json();
                    setResults(data.results || []);
                    setHasSearched(true);
                }
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    console.error('Search failed:', error);
                }
            } finally {
                setIsLoading(false);
            }
        };

        // Debounce: wait 300ms after user stops typing
        const timeoutId = setTimeout(() => {
            if (open) {
                searchCities();
            }
        }, 300);

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [search, open]);

    // Load initial results when dialog opens
    React.useEffect(() => {
        if (open && !hasSearched) {
            setIsLoading(true);
            fetch('/api/search-cities?limit=20')
                .then(res => res.json())
                .then(data => {
                    setResults(data.results || []);
                    setHasSearched(true);
                })
                .catch(console.error)
                .finally(() => setIsLoading(false));
        }
    }, [open, hasSearched]);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        setSearch('');
        setHasSearched(false);
        command();
    }, []);

    const getTimezoneDisplay = (tz: string) => {
        const parts = tz.split('/');
        return parts[parts.length - 1]?.replace(/_/g, ' ') || tz;
    };

    const formatPopulation = (pop: number) => {
        if (pop >= 1000000) return `${(pop / 1000000).toFixed(1)}M`;
        if (pop >= 1000) return `${Math.round(pop / 1000)}K`;
        return pop.toString();
    };

    // Generate city URL slug
    const getCityUrl = (city: SearchResult) => {
        const slug = `${city.asciiName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${city.countryCode.toLowerCase()}`;
        return `/city/${slug}`;
    };

    return (
        <>
            {/* Desktop search button */}
            <button
                onClick={() => setOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                <Search className="w-4 h-4" />
                <span className="hidden lg:inline">Search 13M+ places...</span>
                <span className="inline lg:hidden">Search...</span>
                <kbd className="hidden md:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border bg-gray-100 dark:bg-gray-900 px-1.5 font-mono text-[10px] font-medium text-gray-500">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>

            {/* Mobile search button */}
            <button
                onClick={() => setOpen(true)}
                className="sm:hidden p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Search cities"
            >
                <Search className="w-5 h-5" />
            </button>

            <CommandDialog open={open} onOpenChange={(isOpen) => {
                setOpen(isOpen);
                if (!isOpen) {
                    setSearch('');
                    setHasSearched(false);
                }
            }}>
                <CommandInput
                    placeholder="Search any city, town, or village..."
                    value={search}
                    onValueChange={setSearch}
                />
                <CommandList>
                    {isLoading && (
                        <div className="py-6 text-center">
                            <Loader2 className="mx-auto h-6 w-6 text-blue-500 animate-spin mb-2" />
                            <p className="text-sm text-gray-500">Searching 13 million places...</p>
                        </div>
                    )}

                    {!isLoading && results.length === 0 && hasSearched && (
                        <CommandEmpty>
                            <div className="py-6 text-center">
                                <Globe className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                <p className="text-gray-500">No places found for &quot;{search}&quot;</p>
                                <p className="text-sm text-gray-400 mt-1">Try a different spelling</p>
                            </div>
                        </CommandEmpty>
                    )}

                    {!search.trim() && !isLoading && (
                        <>
                            <CommandGroup heading="Quick Access">
                                <CommandItem onSelect={() => runCommand(() => router.push('/time-converter'))}>
                                    <Calculator className="mr-2 h-4 w-4" />
                                    <span>Time Converter</span>
                                </CommandItem>
                                <CommandItem onSelect={() => runCommand(() => router.push('/world-clock'))}>
                                    <Clock className="mr-2 h-4 w-4" />
                                    <span>World Clock</span>
                                </CommandItem>
                                <CommandItem onSelect={() => runCommand(() => router.push('/world-map'))}>
                                    <Map className="mr-2 h-4 w-4" />
                                    <span>Time Zone Map</span>
                                </CommandItem>
                                <CommandItem onSelect={() => runCommand(() => router.push('/solar-clock'))}>
                                    <Sun className="mr-2 h-4 w-4" />
                                    <span>Solar Clock</span>
                                </CommandItem>
                                <CommandItem onSelect={() => runCommand(() => router.push('/luxury'))}>
                                    <Watch className="mr-2 h-4 w-4" />
                                    <span>Luxury Watches</span>
                                </CommandItem>
                            </CommandGroup>
                            <CommandSeparator />
                        </>
                    )}

                    {!isLoading && results.length > 0 && (
                        <CommandGroup heading={search.trim() ? `🌍 Results (${results.length})` : "🌍 Major Cities"}>
                            {results.map((city) => (
                                <CommandItem
                                    key={city.geonameid}
                                    value={`${city.name} ${city.asciiName} ${city.country} ${city.countryCode}`}
                                    onSelect={() => runCommand(() => router.push(getCityUrl(city)))}
                                >
                                    <Globe className="mr-2 h-4 w-4 text-emerald-500 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <span className="font-medium">{city.name}</span>
                                        <span className="text-gray-500">, {city.country}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-400 flex-shrink-0">
                                        {city.population > 0 && (
                                            <span>{formatPopulation(city.population)}</span>
                                        )}
                                        <span className="hidden sm:inline">•</span>
                                        <span className="hidden sm:inline">{getTimezoneDisplay(city.timezone)}</span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                </CommandList>
            </CommandDialog>
        </>
    );
}
