import { Suspense } from 'react';
import { Metadata } from 'next';
import { TOP_CITIES } from '@/data/top-cities-search';
import { EmbedWidget } from '@/components/EmbedWidget';

export const dynamic = 'force-dynamic';

/**
 * Parse a city slug like "new-york-us" into { citySearch: "new york", countryCode: "us" }.
 * The last segment after the final hyphen is treated as the country code.
 */
function parseCitySlug(slug: string): { citySearch: string; countryCode: string } {
  const decoded = decodeURIComponent(slug).toLowerCase();
  const lastHyphen = decoded.lastIndexOf('-');
  if (lastHyphen === -1) {
    return { citySearch: decoded, countryCode: '' };
  }
  const possibleCode = decoded.slice(lastHyphen + 1);
  // Country codes are 2 letters
  if (possibleCode.length === 2 && /^[a-z]{2}$/.test(possibleCode)) {
    return {
      citySearch: decoded.slice(0, lastHyphen).replace(/-/g, ' '),
      countryCode: possibleCode,
    };
  }
  // No valid country code found, treat whole string as city name
  return { citySearch: decoded.replace(/-/g, ' '), countryCode: '' };
}

/**
 * Find a city in TOP_CITIES by name and optional country code.
 */
function findCity(citySearch: string, countryCode: string) {
  const search = citySearch.toLowerCase();

  // Try exact match with country code first
  if (countryCode) {
    const exactMatch = TOP_CITIES.find(
      (c) =>
        c.asciiName.toLowerCase() === search &&
        c.countryCode.toLowerCase() === countryCode
    );
    if (exactMatch) return exactMatch;
  }

  // Try exact name match without country code
  const nameMatch = TOP_CITIES.find(
    (c) => c.asciiName.toLowerCase() === search
  );
  if (nameMatch) return nameMatch;

  // Try partial match (city name starts with search)
  const partialMatch = TOP_CITIES.find(
    (c) => c.asciiName.toLowerCase().startsWith(search)
  );
  if (partialMatch) return partialMatch;

  // Try contains match
  const containsMatch = TOP_CITIES.find(
    (c) => c.asciiName.toLowerCase().includes(search)
  );
  if (containsMatch) return containsMatch;

  return null;
}

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const { citySearch } = parseCitySlug(city);
  const displayName = citySearch
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${displayName} Clock Widget`,
    description: `Embeddable clock widget for ${displayName}`,
  };
}

export default async function EmbedCityPage({ params }: PageProps) {
  const { city } = await params;
  const { citySearch, countryCode } = parseCitySlug(city);
  const found = findCity(citySearch, countryCode);

  const cityName = found
    ? found.name
    : citySearch
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
  const timezone = found ? found.timezone : 'UTC';
  const code = found ? found.countryCode : countryCode.toUpperCase() || '??';

  return (
    <Suspense fallback={<div style={{ width: '100%', height: '100vh' }} />}>
      <EmbedWidget cityName={cityName} timezone={timezone} countryCode={code} />
    </Suspense>
  );
}
