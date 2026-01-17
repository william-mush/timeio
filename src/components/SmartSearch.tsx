'use client';

import { HomepageSearch as DatabaseSearch } from './HomepageSearch';

/**
 * Smart search component - uses PostgreSQL database search
 */
export function SmartSearch() {
    return <DatabaseSearch />;
}



