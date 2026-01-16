import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { luxuryTimepieces } from '../../../data/luxuryTimepieces';
import PriceComparison from '../../../components/PriceComparison';

interface Params {
  params: Promise<{ slug: string }>;
}

export default async function LuxuryDetailPage({ params }: Params) {
  const { slug } = await params;
  const timepiece = luxuryTimepieces.find(tp => tp.id === slug);
  if (!timepiece) return notFound();

  const idx = luxuryTimepieces.findIndex(tp => tp.id === slug);
  const prev = idx > 0 ? luxuryTimepieces[idx - 1] : null;
  const next = idx < luxuryTimepieces.length - 1 ? luxuryTimepieces[idx + 1] : null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-shrink-0 w-full md:w-80 h-80 relative">
            <Image
              src={timepiece.imageUrl}
              alt={timepiece.name}
              fill
              className="object-cover rounded-lg shadow-lg"
              priority
            />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{timepiece.name}</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{timepiece.description}</p>
            {timepiece.brandWebsite && (
              <a
                href={timepiece.brandWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Visit Official Website
              </a>
            )}
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Brand History</h2>
              <p className="text-gray-600 dark:text-gray-300">{timepiece.history}</p>
            </div>
            {/* Add more detailed info here as you expand the data */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">What Makes {timepiece.name} Stand Out?</h3>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                {timepiece.standout && timepiece.standout.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Why People Love (and Hate) {timepiece.name}</h3>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                {timepiece.love && timepiece.love.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
                {timepiece.hate && timepiece.hate.map((point, i) => (
                  <li key={i} className="text-red-500">{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Notable Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {timepiece.notableModels.map((model, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow">
                {/* Model image if available */}
                {model.imageUrl && (
                  <div className="relative h-48 w-full mb-4">
                    <Image
                      src={model.imageUrl}
                      alt={model.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{model.name}</h3>
                <PriceComparison newPrice={model.newPrice} usedPrice={model.usedPrice} />
                <p className="text-gray-700 dark:text-gray-300 mt-2">{model.description}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Add more sections as needed for manufacturing, location, intricacies, etc. */}
        <div className="flex justify-between mt-12">
          {prev ? (
            <a href={`/luxury/${prev.id}`} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition">← {prev.name}</a>
          ) : <span />}
          {next ? (
            <a href={`/luxury/${next.id}`} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition">{next.name} →</a>
          ) : <span />}
        </div>
      </div>
    </div>
  );
} 