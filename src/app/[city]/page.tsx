import { getCityBySlug } from '@/data/usCities';
import { notFound } from 'next/navigation';
import CityTimeDisplay from '@/components/CityTimeDisplay';

interface CityPageProps {
  params: {
    city: string;
  };
}

export default function CityPage({ params }: CityPageProps) {
  const city = getCityBySlug(params.city);

  if (!city) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CityTimeDisplay city={city} />
    </div>
  );
}

export async function generateStaticParams() {
  // This will generate static pages for all cities
  // You can limit this if needed for performance
  const { US_CITIES_OVER_100K } = await import('@/data/usCities');
  
  return US_CITIES_OVER_100K.map((city) => ({
    city: city.slug,
  }));
}