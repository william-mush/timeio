import { notFound } from 'next/navigation';
import ImagePreview from '@/components/ImagePreview';
import { sections } from '@/data/sections';

interface Params {
  params: { slug: string };
}

function renderSection(title: string, content: string | string[]) {
  if (!content) return null;
  if (Array.isArray(content)) {
    return (
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <ul className="list-disc pl-6 space-y-1">
          {content.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </section>
    );
  }
  return (
    <section className="mb-6">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p>{content}</p>
    </section>
  );
}

export default function HistoryDetailPage({ params }: Params) {
  // Find the item in any section except luxury
  const item = sections
    .filter((section: any) => section.id !== 'luxury')
    .flatMap((section: any) => section.content)
    .find((item: any) => item.slug === params.slug);

  if (!item) return notFound();

  // Use the same getImageUrl logic as in history/page.tsx
  const getImageUrl = (item: any) => {
    if (Array.isArray(item.imageKey)) {
      return item.imageKey.map((key: string) => `/images/history/optimized/${key}.webp`);
    }
    return `/images/history/optimized/${item.imageKey}.webp`;
  };
  const getSecondaryImageUrl = (item: any) => {
    if (item.secondaryImageKey) {
      return `/images/history/optimized/${item.secondaryImageKey}.webp`;
    }
    return null;
  };

  const images = getImageUrl(item);
  const secondaryImage = getSecondaryImageUrl(item);

  // Gather all items (excluding luxury)
  const allItems = sections
    .filter((section: any) => section.id !== 'luxury')
    .flatMap((section: any) => section.content);
  const currentIndex = allItems.findIndex((i: any) => i.slug === params.slug);
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  // Expanded and structured content
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation bar */}
        <nav className="flex flex-wrap gap-2 mb-6">
          {allItems.map((navItem: any) => (
            <a
              key={navItem.slug}
              href={`/history/${navItem.slug}`}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${navItem.slug === item.slug ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900'}`}
            >
              {navItem.title}
            </a>
          ))}
        </nav>
        {/* Previous/Next buttons */}
        <div className="flex justify-between mb-8">
          {prevItem ? (
            <a href={`/history/${prevItem.slug}`} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">← {prevItem.title}</a>
          ) : <span />}
          {nextItem ? (
            <a href={`/history/${nextItem.slug}`} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">{nextItem.title} →</a>
          ) : <span />}
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{item.title}</h1>
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1">
            {Array.isArray(images) ? (
              images.map((src: string, idx: number) => (
                <div key={src} className="mb-6">
                  <ImagePreview src={src} alt={item.title} title={item.title} description={item.description} technicalDetails={item.technicalDetails} slug={item.slug} section="history" />
                </div>
              ))
            ) : (
              <div className="mb-6">
                <ImagePreview src={images} alt={item.title} title={item.title} description={item.description} technicalDetails={item.technicalDetails} slug={item.slug} section="history" />
              </div>
            )}
          </div>
        </div>
        <article className="prose dark:prose-invert max-w-none mb-8 relative">
          {renderSection('Overview', item.description)}
          {renderSection('Key Points', item.keyPoints)}
          {secondaryImage && (
            <img
              src={secondaryImage}
              alt={`${item.title} - secondary view`}
              className="rounded-lg shadow-md object-cover w-full md:w-80 md:float-right md:ml-6 md:mb-2 mb-4 mt-2"
              style={{ objectFit: 'cover', maxHeight: '260px' }}
            />
          )}
          {renderSection('Historical Context', `Explore the origins, evolution, and historical significance of the ${item.title.toLowerCase()}. This device played a crucial role in the development of timekeeping, influencing societies and technologies for centuries. Its invention marked a turning point in how humans understood and measured time, and its legacy can still be seen in modern timekeeping devices.`)}
          {renderSection('Technical Details', [
            `Accuracy: ${item.technicalDetails.accuracy}`,
            `Materials: ${item.technicalDetails.materials}`,
            `Variations: ${item.technicalDetails.variations}`
          ])}
          {renderSection('Cultural Impact', `The ${item.title.toLowerCase()} was not just a tool for measuring time—it was a symbol of scientific progress, social organization, and cultural identity. Its presence in temples, public spaces, and homes reflected its importance in daily life and ritual. Over time, it became a source of inspiration for art, literature, and even philosophy, shaping the way people thought about the passage of time.`)}
          {renderSection('Fun Facts', [
            `Did you know? The ${item.title.toLowerCase()} were sometimes used for ceremonial purposes, marking important events or transitions in society.`,
            `Some versions of the ${item.title.toLowerCase()} were so advanced that they could account for seasonal changes, astronomical events, or even sound alarms at specific times.`,
            `Collectors and historians today prize surviving examples of the ${item.title.toLowerCase()} for their craftsmanship and historical value.`
          ])}
        </article>
      </div>
    </div>
  );
} 