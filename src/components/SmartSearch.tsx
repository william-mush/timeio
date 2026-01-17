'use client';

import { HomepageSearch as DatabaseSearch } from './HomepageSearch';

/**
 * Smart search component
 * 
 * Previously supported Algolia but now uses database search exclusively
 * since we have 2M+ cities in the PostgreSQL database with proper indexing.
 * This is more reliable and doesn't require external API credentials.
 */
export function SmartSearch() {
    return <DatabaseSearch />;
}


