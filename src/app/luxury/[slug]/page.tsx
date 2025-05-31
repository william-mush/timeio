import { notFound } from 'next/navigation';
import ImagePreview from '@/components/ImagePreview';
import { sections } from '@/data/sections';

interface Params {
  params: { slug: string };
}

export default function LuxuryDetailPage({ params }: Params) {
  // Find the item in the luxury section
  const luxurySection = sections.find(section => section.id === 'luxury');
  const item = luxurySection?.content.find((item: any) => item.slug === params.slug);

  if (!item) return notFound();

  // Use the same getImageUrl logic as in history/page.tsx
  const getImageUrl = (item: any) => {
    if (Array.isArray(item.imageKey)) {
      return item.imageKey.map((key: string) => `/images/luxury/optimized/${key}.webp`);
    }
    return `/images/luxury/optimized/${item.imageKey}.webp`;
  };

  const images = getImageUrl(item);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{item.title}</h1>
        {Array.isArray(images) ? (
          images.map((src: string, idx: number) => (
            <div key={src} className="mb-6">
              <ImagePreview src={src} alt={item.title} title={item.title} description={item.description} technicalDetails={item.technicalDetails} slug={item.slug} section="luxury" />
            </div>
          ))
        ) : (
          <div className="mb-6">
            <ImagePreview src={images} alt={item.title} title={item.title} description={item.description} technicalDetails={item.technicalDetails} slug={item.slug} section="luxury" />
          </div>
        )}
        <div className="prose dark:prose-invert max-w-none mb-8">
          <p>{item.description}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-8">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Technical Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Accuracy</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{item.technicalDetails.accuracy}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Materials</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{item.technicalDetails.materials}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Variations</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{item.technicalDetails.variations}</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {item.keyPoints && item.keyPoints.map((point: string, i: number) => (
            <div key={i} className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span className="text-gray-600 dark:text-gray-300 text-sm">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 