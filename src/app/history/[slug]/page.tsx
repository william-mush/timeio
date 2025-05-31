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

  const images = getImageUrl(item);

  // Expanded and structured content
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{item.title}</h1>
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
        <article className="prose dark:prose-invert max-w-none mb-8">
          {renderSection('Overview', item.description)}
          {renderSection('Key Points', item.keyPoints)}
          {renderSection('Historical Context', `Explore the origins, evolution, and historical significance of the ${item.title.toLowerCase()}. This device played a crucial role in the development of timekeeping, influencing societies and technologies for centuries. Its invention marked a turning point in how humans understood and measured time, and its legacy can still be seen in modern timekeeping devices.`)}
          {renderSection('Technical Details', [
            `Accuracy: ${item.technicalDetails.accuracy}`,
            `Materials: ${item.technicalDetails.materials}`,
            `Variations: ${item.technicalDetails.variations}`
          ])}
          {renderSection('Cultural Impact', `The ${item.title.toLowerCase()} was not just a tool for measuring time—it was a symbol of scientific progress, social organization, and cultural identity. Its presence in temples, public spaces, and homes reflected its importance in daily life and ritual. Over time, it became a source of inspiration for art, literature, and even philosophy, shaping the way people thought about the passage of time.`)}
          {renderSection('Fun Facts', [
            `Did you know? The ${item.title.toLowerCase()} was sometimes used for ceremonial purposes, marking important events or transitions in society.`,
            `Some versions of the ${item.title.toLowerCase()} were so advanced that they could account for seasonal changes, astronomical events, or even sound alarms at specific times.`,
            `Collectors and historians today prize surviving examples of the ${item.title.toLowerCase()} for their craftsmanship and historical value.`
          ])}
        </article>
      </div>
    </div>
  );
} 