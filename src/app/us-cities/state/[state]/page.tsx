import { Metadata } from 'next';
import { US_CITIES } from '@/data/us-cities';
import { notFound } from 'next/navigation';
import { StatePageClient } from './StatePageClient';

interface PageProps {
    params: {
        state: string;
    };
}

// Map of state slugs to full names
const stateNames: Record<string, string> = {
    'alabama': 'Alabama', 'alaska': 'Alaska', 'arizona': 'Arizona', 'arkansas': 'Arkansas',
    'california': 'California', 'colorado': 'Colorado', 'connecticut': 'Connecticut',
    'delaware': 'Delaware', 'florida': 'Florida', 'georgia': 'Georgia', 'hawaii': 'Hawaii',
    'idaho': 'Idaho', 'illinois': 'Illinois', 'indiana': 'Indiana', 'iowa': 'Iowa',
    'kansas': 'Kansas', 'kentucky': 'Kentucky', 'louisiana': 'Louisiana', 'maine': 'Maine',
    'maryland': 'Maryland', 'massachusetts': 'Massachusetts', 'michigan': 'Michigan',
    'minnesota': 'Minnesota', 'mississippi': 'Mississippi', 'missouri': 'Missouri',
    'montana': 'Montana', 'nebraska': 'Nebraska', 'nevada': 'Nevada', 'new-hampshire': 'New Hampshire',
    'new-jersey': 'New Jersey', 'new-mexico': 'New Mexico', 'new-york': 'New York',
    'north-carolina': 'North Carolina', 'north-dakota': 'North Dakota', 'ohio': 'Ohio',
    'oklahoma': 'Oklahoma', 'oregon': 'Oregon', 'pennsylvania': 'Pennsylvania',
    'rhode-island': 'Rhode Island', 'south-carolina': 'South Carolina', 'south-dakota': 'South Dakota',
    'tennessee': 'Tennessee', 'texas': 'Texas', 'utah': 'Utah', 'vermont': 'Vermont',
    'virginia': 'Virginia', 'washington': 'Washington', 'west-virginia': 'West Virginia',
    'wisconsin': 'Wisconsin', 'wyoming': 'Wyoming', 'district-of-columbia': 'District of Columbia',
};

// Generate static params for all states
export async function generateStaticParams() {
    const states = Array.from(new Set(US_CITIES.map(c => c.state)));
    return states.map(state => ({
        state: state.toLowerCase().replace(/\s+/g, '-'),
    }));
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const stateName = stateNames[params.state];

    if (!stateName) {
        return { title: 'State Not Found' };
    }

    const cities = US_CITIES.filter(c =>
        c.state.toLowerCase().replace(/\s+/g, '-') === params.state
    );

    return {
        title: `Current Time in ${stateName} Cities - Local Time & Time Zones`,
        description: `Find the current local time in ${cities.length} cities across ${stateName}. Live clocks for every major city.`,
        keywords: [
            `${stateName} time`,
            `time in ${stateName}`,
            `${stateName} cities time`,
            `current time ${stateName}`,
            `${stateName} timezone`,
        ],
        openGraph: {
            title: `${stateName} City Times - Time.IO`,
            description: `Current local time in ${cities.length} ${stateName} cities`,
            type: 'website',
            url: `https://time.io/us-cities/state/${params.state}`,
        },
        alternates: {
            canonical: `https://time.io/us-cities/state/${params.state}`,
        },
    };
}

export default function StatePage({ params }: PageProps) {
    const stateName = stateNames[params.state];

    if (!stateName) {
        notFound();
    }

    const cities = US_CITIES.filter(c =>
        c.state.toLowerCase().replace(/\s+/g, '-') === params.state &&
        c.population >= 24000
    );

    if (cities.length === 0) {
        notFound();
    }

    return <StatePageClient state={stateName} cities={cities} />;
}
