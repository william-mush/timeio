import Image from 'next/image';
import Link from 'next/link';
import { LuxuryTimepiece } from '../types/luxuryTimepieces';
import PriceComparison from './PriceComparison';

interface LuxuryTimepieceCardProps {
  timepiece: LuxuryTimepiece;
}

export default function LuxuryTimepieceCard({ timepiece }: LuxuryTimepieceCardProps) {
  return (
    <Link href={`/luxury/${timepiece.id}`} className="block group">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group-hover:shadow-2xl transition-shadow duration-200">
        <div className="relative h-64 w-full">
          <Image
            src={timepiece.imageUrl}
            alt={timepiece.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{timepiece.name}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{timepiece.description}</p>
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
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">History</h3>
            <p className="text-gray-600 dark:text-gray-300">{timepiece.history}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Notable Models</h3>
            <div className="space-y-4">
              {timepiece.notableModels.map((model, index) => (
                <div key={index} className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="font-medium text-lg mb-2 text-gray-900 dark:text-white">{model.name}</h4>
                  <PriceComparison
                    newPrice={model.newPrice}
                    usedPrice={model.usedPrice}
                  />
                  <p className="text-gray-600 dark:text-gray-300 mt-2">{model.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 