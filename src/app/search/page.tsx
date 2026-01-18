import CitySearch from '@/components/CitySearch';

export const dynamic = 'force-dynamic';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CitySearch />
    </div>
  );
}