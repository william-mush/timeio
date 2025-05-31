'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImagePreview from '@/components/ImagePreview';
import { sections } from '@/data/sections';

export default function HistoryPage() {
  const [activeSection, setActiveSection] = useState('ancient');

  const getImageUrl = (item: any) => {
    if (Array.isArray(item.imageKey)) {
      return item.imageKey.map((key: string) => `/images/luxury/optimized/${key}.webp`);
    }
    return `/images/history/optimized/${item.imageKey}.webp`;
  };

  const currentSection = sections.find((section) => section.id === activeSection);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            The History of Time
          </h1>
        </div>
        {/* Navigation */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>
        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {currentSection?.content.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <ImagePreview
                src={getImageUrl(item)}
                alt={item.title}
                title={item.title}
                description={item.description}
                technicalDetails={item.technicalDetails}
                slug={item.slug}
                section={currentSection.id === 'luxury' ? 'luxury' : 'history'}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
                  {item.period}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {item.description}
                </p>
                <div className="space-y-2 mb-4">
                  {item.keyPoints.map((point, i) => (
                    <div key={i} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-600 dark:text-gray-300 text-sm">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Technical Details
                  </h4>
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 