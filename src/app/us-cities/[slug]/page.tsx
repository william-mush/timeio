import { Metadata } from 'next';
import { getCityById, US_CITIES } from '@/data/us-cities';
import { notFound } from 'next/navigation';
import { CityTimeClient } from './CityTimeClient';

// ISR: Revalidate every hour, render dynamically on-demand
export const revalidate = 3600;
export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Pre-generate only top 20 cities by population; rest generated on-demand via ISR
export async function generateStaticParams() {
  return [...US_CITIES]
    .sort((a, b) => b.population - a.population)
    .slice(0, 20)
    .map((city) => ({
      slug: city.id,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityById(slug);

  if (!city || city.population < 24000) {
    return {
      title: 'City Not Found',
    };
  }

  const timezoneShort = city.timezone.split('/').pop()?.replace(/_/g, ' ') || city.timezone;

  return {
    title: `Current Time in ${city.city}, ${city.state_code} - ${timezoneShort} Time Zone`,
    description: `What time is it in ${city.city}, ${city.state}? Get the current local time, timezone info, and time difference for ${city.city}. Population: ${city.population.toLocaleString()}.`,
    keywords: [
      `${city.city} time`,
      `time in ${city.city}`,
      `${city.city} ${city.state_code} time`,
      `what time is it in ${city.city}`,
      `${city.city} timezone`,
      `${city.city} current time`,
      `${city.state} time`,
      `${timezoneShort} time zone`,
    ],
    openGraph: {
      title: `Current Time in ${city.city}, ${city.state_code}`,
      description: `Live local time in ${city.city}, ${city.state}. ${city.timezone} time zone.`,
      type: 'website',
      url: `https://time.io/us-cities/${city.id}`,
    },
    twitter: {
      card: 'summary',
      title: `Time in ${city.city}, ${city.state_code}`,
      description: `Current local time in ${city.city}, ${city.state}`,
    },
    alternates: {
      canonical: `https://time.io/us-cities/${city.id}`,
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { slug } = await params;
  const city = getCityById(slug);

  if (!city || city.population < 24000) {
    notFound();
  }

  // JSON-LD structured data for the city
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: `${city.city}, ${city.state}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.city,
      addressRegion: city.state_code,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: city.coordinates[1],
      longitude: city.coordinates[0],
    },
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: city.state,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CityTimeClient city={city} />
    </>
  );
}