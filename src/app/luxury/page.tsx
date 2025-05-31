import Link from 'next/link';
import { sections } from '@/data/sections';

export default function LuxuryPage() {
  const luxurySection = sections.find(section => section.id === 'luxury');
  
  if (!luxurySection) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Modern Luxury Timepieces
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {luxurySection.content.map((item: any) => (
            <Link
              key={item.slug}
              href={`/luxury/${item.slug}`}
              className="group block bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <img
                  src={`/images/luxury/optimized/${item.imageKey[0]}.webp`}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {item.period}
                </p>
                <div className="space-y-2">
                  {item.keyPoints.slice(0, 3).map((point: string, i: number) => (
                    <div key={i} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-600 dark:text-gray-300 text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 