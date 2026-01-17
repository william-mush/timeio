'use client';

import { algoliaConfig } from '@/lib/algolia';
import { AlgoliaSearch } from './AlgoliaSearch';
import { HomepageSearch as DatabaseSearch } from './HomepageSearch';

/**
 * Smart search component that uses:
 * - Algolia when configured (fast, typo-tolerant)
 * - Database search as fallback
 */
export function SmartSearch() {
    // Check if Algolia is configured
    const isAlgoliaConfigured = !!(algoliaConfig.appId && algoliaConfig.searchApiKey);

    if (isAlgoliaConfigured) {
        return <AlgoliaSearch />;
    }

    // Fallback to database search
    return <DatabaseSearch />;
}
