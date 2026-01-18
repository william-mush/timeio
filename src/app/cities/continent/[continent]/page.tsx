import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ContinentClient } from './ContinentClient';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

interface PageProps {
    params: Promise<{ continent: string }>;
}

const CONTINENTS: Record<string, { name: string; icon: string; description: string }> = {
    'north-america': {
        name: 'North America',
        icon: '🌎',
        description: 'From New York to Los Angeles, Mexico City to Toronto'
    },
    'south-america': {
        name: 'South America',
        icon: '🌎',
        description: 'From São Paulo to Buenos Aires, Lima to Bogotá'
    },
    'europe': {
        name: 'Europe',
        icon: '🌍',
        description: 'From London to Moscow, Paris to Istanbul'
    },
    'asia': {
        name: 'Asia',
        icon: '🌏',
        description: 'From Tokyo to Mumbai, Shanghai to Dubai'
    },
    'africa': {
        name: 'Africa',
        icon: '🌍',
        description: 'From Cairo to Lagos, Johannesburg to Nairobi'
    },
    'oceania': {
        name: 'Oceania',
        icon: '🌏',
        description: 'From Sydney to Auckland, Melbourne to Fiji'
    },
};

async function getContinentData(slug: string) {
    const continentInfo = CONTINENTS[slug];
    if (!continentInfo) return null;

    // Get top cities for this continent
    const cities = await prisma.geoCity.findMany({
        where: { continent: continentInfo.name },
        select: {
            geonameid: true,
            name: true,
            asciiName: true,
            country: true,
            countryCode: true,
            timezone: true,
            latitude: true,
            longitude: true,
            population: true,
        },
        orderBy: { population: 'desc' },
        take: 100,
    });

    // Get country counts
    const countryCounts = await prisma.geoCity.groupBy({
        by: ['countryCode', 'country'],
        where: { continent: continentInfo.name },
        _count: true,
        orderBy: { _count: { countryCode: 'desc' } },
        take: 30,
    });

    // Get unique timezones
    const timezones = Array.from(new Set(cities.map(c => c.timezone)));

    return {
        ...continentInfo,
        slug,
        cities,
        countries: countryCounts.map(c => ({
            code: c.countryCode,
            name: c.country,
            cityCount: c._count,
        })),
        timezones,
        totalCities: cities.length,
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { continent } = await params;
    const data = await getContinentData(continent);

    if (!data) {
        return { title: 'Continent Not Found' };
    }

    return {
        title: `Current Time in ${data.name} - All Countries & Cities`,
        description: `What time is it in ${data.name}? View current local time across ${data.countries.length} countries and ${data.cities.length}+ major cities. ${data.description}.`,
        keywords: [
            `time in ${data.name}`,
            `${data.name} time zones`,
            `${data.name} current time`,
            ...data.countries.slice(0, 5).map(c => `time in ${c.name}`),
        ],
        openGraph: {
            title: `Current Time in ${data.name}`,
            description: `View current local time across ${data.name}`,
            type: 'website',
            url: `https://time.io/cities/continent/${continent}`,
        },
        alternates: {
            canonical: `https://time.io/cities/continent/${continent}`,
        },
    };
}

export default async function ContinentPage({ params }: PageProps) {
    const { continent } = await params;
    const data = await getContinentData(continent);

    if (!data) {
        notFound();
    }

    return (
        <div className="page-container">
            <div className="content-container">
                <ContinentClient
                    name={data.name}
                    icon={data.icon}
                    description={data.description}
                    countries={data.countries}
                    cities={data.cities}
                    timezones={data.timezones}
                />
            </div>
        </div>
    );
}
