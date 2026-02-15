'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Copy, Check, Globe, MapPin, Code2 } from 'lucide-react';
import { searchCitiesLocal } from '@/lib/searchCitiesLocal';

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
  admin1: string | null;
}

type Theme = 'light' | 'dark';
type Format = '12h' | '24h';

export function EmbedBuilder() {
  // Selected city
  const [selectedCity, setSelectedCity] = useState<SearchResult | null>(null);

  // Search state
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Config state
  const [theme, setTheme] = useState<Theme>('light');
  const [format, setFormat] = useState<Format>('12h');
  const [showDate, setShowDate] = useState(true);
  const [showSeconds, setShowSeconds] = useState(true);

  // Copy state
  const [copied, setCopied] = useState(false);

  // Build the slug for the selected city
  const buildSlug = useCallback((city: SearchResult) => {
    const nameSlug = city.asciiName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    return `${nameSlug}-${city.countryCode.toLowerCase()}`;
  }, []);

  // Build the embed URL
  const buildEmbedUrl = useCallback(() => {
    if (!selectedCity) return '';
    const slug = buildSlug(selectedCity);
    const params = new URLSearchParams();
    if (theme !== 'light') params.set('theme', theme);
    if (format !== '12h') params.set('format', format);
    if (!showDate) params.set('showDate', 'false');
    if (!showSeconds) params.set('showSeconds', 'false');
    const qs = params.toString();
    return `https://time.io/embed/${slug}${qs ? `?${qs}` : ''}`;
  }, [selectedCity, theme, format, showDate, showSeconds, buildSlug]);

  // Build the embed HTML snippet
  const buildEmbedCode = useCallback(() => {
    const url = buildEmbedUrl();
    if (!url) return '';
    return `<iframe src="${url}" width="300" height="150" style="border:none;border-radius:8px;"></iframe>`;
  }, [buildEmbedUrl]);

  // Build the preview URL (relative, for the iframe)
  const buildPreviewUrl = useCallback(() => {
    if (!selectedCity) return '';
    const slug = buildSlug(selectedCity);
    const params = new URLSearchParams();
    if (theme !== 'light') params.set('theme', theme);
    if (format !== '12h') params.set('format', format);
    if (!showDate) params.set('showDate', 'false');
    if (!showSeconds) params.set('showSeconds', 'false');
    const qs = params.toString();
    return `/embed/${slug}${qs ? `?${qs}` : ''}`;
  }, [selectedCity, theme, format, showDate, showSeconds, buildSlug]);

  // Search effect
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const localResults = searchCitiesLocal(q, 8);
    setResults(localResults);
    setIsOpen(true);
    setSelectedIndex(-1);
  }, [query]);

  // Close dropdown on outside click
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

  // Keyboard nav
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          selectCity(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const selectCity = (city: SearchResult) => {
    setSelectedCity(city);
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleCopy = async () => {
    const code = buildEmbedCode();
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Step 1: City Search */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
            1
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Choose a City
          </h2>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim() && results.length > 0 && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search for a city..."
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />

          {/* Dropdown */}
          {isOpen && results.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl overflow-hidden z-50"
            >
              <div className="max-h-72 overflow-y-auto">
                {results.map((city, index) => (
                  <button
                    key={city.geonameid}
                    onClick={() => selectCity(city)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                      index === selectedIndex
                        ? 'bg-blue-50 dark:bg-blue-900/30'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <Globe className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {city.name}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        , {city.country}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">
                      {city.timezone.split('/').pop()?.replace(/_/g, ' ')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Selected city display */}
        {selectedCity && (
          <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span className="font-medium text-blue-900 dark:text-blue-100">
              {selectedCity.name}, {selectedCity.country}
            </span>
            <span className="text-sm text-blue-600 dark:text-blue-400">
              ({selectedCity.timezone})
            </span>
            <button
              onClick={() => setSelectedCity(null)}
              className="ml-auto text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 text-sm"
            >
              Change
            </button>
          </div>
        )}
      </div>

      {/* Step 2: Configuration */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
            2
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Customize
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Theme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Theme
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setTheme('light')}
                className={`flex-1 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  theme === 'light'
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex-1 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Dark
              </button>
            </div>
          </div>

          {/* Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Time Format
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setFormat('12h')}
                className={`flex-1 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  format === '12h'
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                12-Hour
              </button>
              <button
                onClick={() => setFormat('24h')}
                className={`flex-1 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  format === '24h'
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                24-Hour
              </button>
            </div>
          </div>

          {/* Show Date */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showDate}
                onChange={(e) => setShowDate(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Show Date
              </span>
            </label>
          </div>

          {/* Show Seconds */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showSeconds}
                onChange={(e) => setShowSeconds(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Show Seconds
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Step 3: Preview & Code */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
            3
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Preview & Embed
          </h2>
        </div>

        {selectedCity ? (
          <div className="space-y-6">
            {/* Live Preview */}
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                Live Preview
              </p>
              <div className="flex justify-center p-6 bg-gray-100 dark:bg-gray-900 rounded-lg">
                <iframe
                  src={buildPreviewUrl()}
                  width="300"
                  height="150"
                  style={{
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
                  }}
                  title={`${selectedCity.name} clock widget preview`}
                />
              </div>
            </div>

            {/* Embed Code */}
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                Embed Code
              </p>
              <div className="relative">
                <pre className="bg-gray-900 dark:bg-gray-950 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono">
                  <code>{buildEmbedCode()}</code>
                </pre>
                <button
                  onClick={handleCopy}
                  className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    copied
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Usage hints */}
            <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
              <p>
                Paste this code into your HTML to display a live clock for{' '}
                <strong className="text-gray-700 dark:text-gray-300">
                  {selectedCity.name}
                </strong>
                .
              </p>
              <p>
                Adjust the <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">width</code> and{' '}
                <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">height</code>{' '}
                attributes to fit your layout.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Code2 className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              Select a city above to see a live preview and get your embed code.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
