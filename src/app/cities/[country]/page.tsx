import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { CountryClient } from './CountryClient';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

// Country code to name mapping
const COUNTRY_NAMES: Record<string, string> = {
    'US': 'United States', 'GB': 'United Kingdom', 'JP': 'Japan', 'DE': 'Germany',
    'FR': 'France', 'IT': 'Italy', 'ES': 'Spain', 'CA': 'Canada', 'AU': 'Australia',
    'BR': 'Brazil', 'IN': 'India', 'CN': 'China', 'RU': 'Russia', 'MX': 'Mexico',
    'KR': 'South Korea', 'NL': 'Netherlands', 'SE': 'Sweden', 'CH': 'Switzerland',
    'BE': 'Belgium', 'AT': 'Austria', 'PL': 'Poland', 'PT': 'Portugal', 'NO': 'Norway',
    'DK': 'Denmark', 'FI': 'Finland', 'IE': 'Ireland', 'NZ': 'New Zealand',
    'SG': 'Singapore', 'HK': 'Hong Kong', 'TW': 'Taiwan', 'TH': 'Thailand',
    'MY': 'Malaysia', 'ID': 'Indonesia', 'PH': 'Philippines', 'VN': 'Vietnam',
    'AE': 'United Arab Emirates', 'SA': 'Saudi Arabia', 'IL': 'Israel', 'TR': 'Turkey',
    'ZA': 'South Africa', 'EG': 'Egypt', 'NG': 'Nigeria', 'KE': 'Kenya',
    'AR': 'Argentina', 'CL': 'Chile', 'CO': 'Colombia', 'PE': 'Peru',
    'GR': 'Greece', 'CZ': 'Czech Republic', 'HU': 'Hungary', 'RO': 'Romania',
    'UA': 'Ukraine', 'PK': 'Pakistan', 'BD': 'Bangladesh', 'LK': 'Sri Lanka',
};

// Country code to continent mapping
const COUNTRY_CONTINENTS: Record<string, string> = {
    'US': 'North America', 'CA': 'North America', 'MX': 'North America',
    'GB': 'Europe', 'DE': 'Europe', 'FR': 'Europe', 'IT': 'Europe', 'ES': 'Europe',
    'JP': 'Asia', 'CN': 'Asia', 'IN': 'Asia', 'KR': 'Asia', 'SG': 'Asia',
    'AU': 'Oceania', 'NZ': 'Oceania',
    'BR': 'South America', 'AR': 'South America',
    'ZA': 'Africa', 'EG': 'Africa', 'NG': 'Africa',
};

interface PageProps {
    params: Promise<{ country: string }>;
}

async function getCountryData(countryCode: string) {
    const code = countryCode.toUpperCase();

    // Get cities for this country
    const cities = await prisma.geoCity.findMany({
        where: { countryCode: code },
        select: {
            geonameid: true,
            name: true,
            asciiName: true,
            timezone: true,
            latitude: true,
            longitude: true,
            population: true,
            admin1: true,
        },
        orderBy: { population: 'desc' },
        take: 50,
    });

    if (cities.length === 0) return null;

    // Get unique timezones
    const timezones = Array.from(new Set(cities.map(c => c.timezone)));

    // Get total city count for this country
    const totalCities = await prisma.geoCity.count({
        where: { countryCode: code },
    });

    return {
        countryCode: code,
        countryName: COUNTRY_NAMES[code] || code,
        continent: COUNTRY_CONTINENTS[code] || 'Unknown',
        cities,
        timezones,
        totalCities,
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { country } = await params;
    const data = await getCountryData(country);

    if (!data) {
        return { title: 'Country Not Found' };
    }

    return {
        title: `Current Time in ${data.countryName} - All Cities & Time Zones`,
        description: `What time is it in ${data.countryName}? View current local time in ${data.cities.length}+ cities across ${data.timezones.length} time zone${data.timezones.length > 1 ? 's' : ''}. Find the exact time in ${data.cities[0]?.name}, ${data.cities[1]?.name}, and more.`,
        keywords: [
            `time in ${data.countryName}`,
            `${data.countryName} time`,
            `${data.countryName} current time`,
            `${data.countryName} time zones`,
            `what time is it in ${data.countryName}`,
            ...data.cities.slice(0, 5).map(c => `time in ${c.name}`),
        ],
        openGraph: {
            title: `Current Time in ${data.countryName}`,
            description: `View current local time across ${data.countryName}`,
            type: 'website',
            url: `https://time.io/cities/${country.toLowerCase()}`,
        },
        alternates: {
            canonical: `https://time.io/cities/${country.toLowerCase()}`,
        },
    };
}

export default async function CountryPage({ params }: PageProps) {
    const { country } = await params;
    const data = await getCountryData(country);

    if (!data) {
        notFound();
    }

    // JSON-LD structured data
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'Country',
            name: data.countryName,
            identifier: data.countryCode,
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://time.io' },
                { '@type': 'ListItem', position: 2, name: 'Cities', item: 'https://time.io/cities' },
                { '@type': 'ListItem', position: 3, name: data.countryName, item: `https://time.io/cities/${country.toLowerCase()}` },
            ],
        },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="page-container">
                <div className="content-container">
                    <CountryClient
                        countryCode={data.countryCode}
                        countryName={data.countryName}
                        continent={data.continent}
                        cities={data.cities}
                        timezones={data.timezones}
                        totalCities={data.totalCities}
                    />
                </div>
            </div>
        </>
    );
}
