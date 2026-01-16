import Image from 'next/image';
import Link from 'next/link';
import { LuxuryTimepiece } from '../types/luxuryTimepieces';
import PriceComparison from './PriceComparison';
import { ExternalLink, ShoppingBag } from 'lucide-react';

interface LuxuryTimepieceCardProps {
  timepiece: LuxuryTimepiece;
}

export default function LuxuryTimepieceCard({ timepiece }: LuxuryTimepieceCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      {/* Hero Image Section */}
      <Link href={`/luxury/${timepiece.id}`} className="block relative h-72 w-full group overflow-hidden">
        <Image
          src={timepiece.imageUrl}
          alt={timepiece.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-3xl font-bold tracking-tight">{timepiece.name}</h2>
          <p className="text-sm text-gray-200 line-clamp-1">{timepiece.description}</p>
        </div>
      </Link>

      <div className="p-6 flex-grow flex flex-col">
        {/* Brand Actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          {timepiece.brandWebsite && (
            <a
              href={timepiece.brandWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              Official Site
            </a>
          )}
          {/* General Shop Link - Dynamic Jomashop Search if not explicit */}
          <a
            href={timepiece.shopLink || `https://www.jomashop.com/search?q=${encodeURIComponent(timepiece.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium ml-auto"
          >
            <ShoppingBag className="w-4 h-4" />
            Shop {timepiece.name}
          </a>
        </div>

        {/* Notable Models Grid */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">
            Notable Models
          </h3>
          <div className="grid gap-6">
            {timepiece.notableModels.map((model, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-4 bg-gray-50 dark:bg-gray-750 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50">
                <div className="flex-grow">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{model.name}</h4>
                    {/* Affiliate Button for Model */}
                    <a
                      href={model.affiliateLink || `https://www.jomashop.com/search?q=${encodeURIComponent(timepiece.name + ' ' + model.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors uppercase tracking-wide"
                    >
                      Check Price
                    </a>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{model.description}</p>

                  <PriceComparison
                    newPrice={model.newPrice}
                    usedPrice={model.usedPrice}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Details Link */}
        <Link
          href={`/luxury/${timepiece.id}`}
          className="mt-6 text-center text-sm text-gray-500 hover:text-blue-600 font-medium transition-colors"
        >
          View Full Brand History & Details →
        </Link>
      </div>
    </div>
  );
} 