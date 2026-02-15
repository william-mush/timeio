import { TOP_CITIES, SEARCH_INDEX } from '@/data/top-cities-search';

interface SearchResult {
  geonameid: number;
  name: string;
  asciiName: string;
  country: string;
  countryCode: string;
  timezone: string;
  latitude: number;
  longitude: number;
  population: number;
  continent: string;
  admin1: string | null;
}

function toResult(c: typeof TOP_CITIES[number]): SearchResult {
  return {
    geonameid: c.geonameid,
    name: c.name,
    asciiName: c.asciiName,
    country: c.country,
    countryCode: c.countryCode,
    timezone: c.timezone,
    latitude: 0,
    longitude: 0,
    population: c.population,
    continent: c.continent,
    admin1: c.admin1,
  };
}

/** Extract bigrams (2-character pairs) from a string into a Map of bigram -> count. */
function getBigrams(s: string): Map<string, number> {
  const map = new Map<string, number>();
  for (let i = 0; i < s.length - 1; i++) {
    const pair = s.slice(i, i + 2);
    map.set(pair, (map.get(pair) ?? 0) + 1);
  }
  return map;
}

/** Dice coefficient: (2 * shared bigrams) / (total bigrams in both strings). */
function bigramSimilarity(a: string, b: string): number {
  if (a.length < 2 || b.length < 2) return 0;
  const bigramsA = getBigrams(a);
  const bigramsB = getBigrams(b);
  let shared = 0;
  bigramsA.forEach((countA, bigram) => {
    const countB = bigramsB.get(bigram);
    if (countB !== undefined) {
      shared += Math.min(countA, countB);
    }
  });
  const totalA = a.length - 1;
  const totalB = b.length - 1;
  return (2 * shared) / (totalA + totalB);
}

const FUZZY_THRESHOLD = 0.3;

export function searchCitiesLocal(query: string, limit = 30): SearchResult[] {
  if (!query) {
    // No query: return top cities by population (already sorted)
    return TOP_CITIES.slice(0, limit).map(toResult);
  }

  const q = query.toLowerCase();

  // --- Primary pass: prefix matching using precomputed lowercase index ---
  const matches: { city: typeof TOP_CITIES[number]; exact: boolean }[] = [];
  for (const entry of SEARCH_INDEX) {
    if (entry.ascii.startsWith(q) || entry.name.startsWith(q)) {
      const city = TOP_CITIES[entry.idx];
      matches.push({ city, exact: entry.ascii === q });
    }
  }

  // Sort: exact matches first, then by population (already desc in data)
  matches.sort((a, b) => {
    if (a.exact !== b.exact) return a.exact ? -1 : 1;
    return b.city.population - a.city.population;
  });

  const prefixResults = matches.slice(0, limit);

  // --- Secondary pass: fuzzy bigram search if prefix results are sparse ---
  if (prefixResults.length < 3) {
    // Build a set of geoname IDs already present in prefix results for dedup
    const seen = new Set<number>();
    for (const m of prefixResults) {
      seen.add(m.city.geonameid);
    }

    // Precompute query bigrams once
    const qBigrams = getBigrams(q);
    const qBigramTotal = q.length - 1;

    const fuzzy: { city: typeof TOP_CITIES[number]; score: number }[] = [];

    for (const entry of SEARCH_INDEX) {
      const city = TOP_CITIES[entry.idx];
      if (seen.has(city.geonameid)) continue;

      // Compute similarity against ascii name (most reliable for fuzzy)
      // Inline the hot path to avoid extra Map allocation when possible:
      // quick length-ratio check to skip clearly dissimilar strings early
      const target = entry.ascii;
      const lenRatio = q.length / target.length;
      if (lenRatio < 0.25 || lenRatio > 4) continue;

      const targetBigrams = getBigrams(target);
      const targetBigramTotal = target.length - 1;
      if (qBigramTotal === 0 || targetBigramTotal === 0) continue;

      let shared = 0;
      qBigrams.forEach((countA, bigram) => {
        const countB = targetBigrams.get(bigram);
        if (countB !== undefined) {
          shared += Math.min(countA, countB);
        }
      });
      const sim = (2 * shared) / (qBigramTotal + targetBigramTotal);

      if (sim >= FUZZY_THRESHOLD) {
        // Combined score: similarity weighted by log10(population)
        const pop = city.population > 0 ? city.population : 1;
        const combinedScore = sim * Math.log10(pop);
        fuzzy.push({ city, score: combinedScore });
      }
    }

    // Sort fuzzy results by combined score descending
    fuzzy.sort((a, b) => b.score - a.score);

    // Merge: prefix results first, then fuzzy results up to the limit
    const remaining = limit - prefixResults.length;
    const fuzzySlice = fuzzy.slice(0, remaining);

    return [
      ...prefixResults.map(m => toResult(m.city)),
      ...fuzzySlice.map(f => toResult(f.city)),
    ];
  }

  return prefixResults.map(m => toResult(m.city));
}
