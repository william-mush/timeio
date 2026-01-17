'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { algoliasearch } from 'algoliasearch';
import { Search, Globe, Loader2, MapPin } from 'lucide-react';
import { algoliaConfig, type AlgoliaCityRecord } from '@/lib/algolia';

// US State name mapping
const US_STATES: Record<string, string> = {
    'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
    'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
    'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho',
    'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
    'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
    'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
    'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
    'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
    'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma',
    'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
    'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
    'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
    'WI': 'Wisconsin', 'WY': 'Wyoming', 'DC': 'Washington D.C.',
};

function getStateName(admin1: string | null): string {
    if (!admin1) return '';
    return US_STATES[admin1] || admin1;
}

export function AlgoliaSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<AlgoliaCityRecord[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [algoliaClient, setAlgoliaClient] = useState<ReturnType<typeof algoliasearch> | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Initialize Algolia client
    useEffect(() => {
        if (algoliaConfig.appId && algoliaConfig.searchApiKey) {
            const client = algoliasearch(algoliaConfig.appId, algoliaConfig.searchApiKey);
            setAlgoliaClient(client);
        }
    }, []);

    // Debounced search
    useEffect(() => {
        if (!algoliaClient) return;

        const controller = new AbortController();

        const searchCities = async () => {
            if (!query.trim()) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const { results: searchResults } = await algoliaClient.search<AlgoliaCityRecord>({
                    requests: [{
                        indexName: algoliaConfig.indexName,
                        query: query.trim(),
                        hitsPerPage: 8,
                    }],
                });

                const hits = (searchResults[0] as { hits: AlgoliaCityRecord[] })?.hits || [];
                setResults(hits);
                setIsOpen(true);
            } catch (error) {
                console.error('Algolia search failed:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(searchCities, 150); // Fast debounce

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [query, algoliaClient]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !inputRef.current?.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navigateToCity = useCallback((city: AlgoliaCityRecord) => {
        const nameSlug = city.asciiName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const slug = `${nameSlug}-${city.geonameid}`;
        router.push(`/city/${slug}`);
        setIsOpen(false);
        setQuery('');
    }, [router]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen || results.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < results.length) {
                    navigateToCity(results[selectedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                break;
        }
    };

    // If Algolia is not configured, fall back to database search
    if (!algoliaConfig.appId || !algoliaConfig.searchApiKey) {
        // Import and use the original HomepageSearch as fallback
        return null;
    }

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            {/* Search Input */}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    {isLoading ? (
                        <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
                    ) : (
                        <Search className="h-5 w-5 text-gray-400" />
                    )}
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query && results.length > 0 && setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search any city worldwide..."
                    className="w-full pl-12 pr-4 py-4 text-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    aria-label="Search cities"
                    autoComplete="off"
                />
                {query && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            ⚡ Algolia
                        </span>
                    </div>
                )}
            </div>

            {/* Results Dropdown */}
            {isOpen && results.length > 0 && (
                <div
                    ref={dropdownRef}
                    className="absolute z-50 w-full bottom-full mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                    <div className="py-2 text-xs text-gray-500 dark:text-gray-400 px-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
                        <span>↑↓ to navigate</span>
                        <span>•</span>
                        <span>↵ to select</span>
                        <span>•</span>
                        <span>esc to close</span>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {results.map((city, index) => (
                            <button
                                key={city.objectID}
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
                                        {city.countryCode === 'US' && city.admin1 && (
                                            <span className="text-gray-500 dark:text-gray-400 font-normal">
                                                , {getStateName(city.admin1)}
                                            </span>
                                        )}
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
                                                <span>{(city.population / 1000).toFixed(0)}K pop</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* No results message */}
            {isOpen && query && results.length === 0 && !isLoading && (
                <div
                    ref={dropdownRef}
                    className="absolute z-50 w-full bottom-full mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 text-center"
                >
                    <Globe className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                    <p className="text-gray-600 dark:text-gray-400">
                        No cities found for "{query}"
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                        Try a different spelling
                    </p>
                </div>
            )}
        </div>
    );
}
