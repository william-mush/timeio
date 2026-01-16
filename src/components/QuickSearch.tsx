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
import { Calculator, Calendar, Clock, Globe, Map, Moon, Search, Sun, Watch } from 'lucide-react';
import { ALL_WORLD_CITIES } from '@/data/all-world-cities';

export function QuickSearch() {
    const [open, setOpen] = React.useState(false);
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

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    // Limit cities to boost performance
    const topCities = ALL_WORLD_CITIES.slice(0, 50);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm text-gray-500 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                <Search className="w-4 h-4" />
                <span className="hidden lg:inline">Search cities...</span>
                <span className="inline lg:hidden">Search...</span>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-gray-100 px-1.5 font-mono text-[10px] font-medium text-gray-500 dark:bg-gray-900 opacity-100">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup heading="Tools">
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
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="Features">
                        <CommandItem onSelect={() => runCommand(() => router.push('/solar-clock'))}>
                            <Sun className="mr-2 h-4 w-4" />
                            <span>Solar System Clock</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push('/luxury'))}>
                            <Watch className="mr-2 h-4 w-4" />
                            <span>Luxury Timepieces</span>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="Cities">
                        {topCities.map((city) => (
                            <CommandItem
                                key={city.id}
                                onSelect={() => runCommand(() => router.push(`/world-cities/${city.id}`))}
                            >
                                <Globe className="mr-2 h-4 w-4" />
                                <span>{city.city}, {city.country}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
