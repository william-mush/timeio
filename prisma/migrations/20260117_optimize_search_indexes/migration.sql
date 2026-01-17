-- Add composite index for optimized search + sort operations
-- This index helps when we search by asciiName and sort by population

-- Composite index for prefix search + population sort
CREATE INDEX IF NOT EXISTS "geo_cities_asciiName_population_idx" 
ON "geo_cities" (LOWER("asciiName") text_pattern_ops, population DESC);

-- Composite index for name search + population sort  
CREATE INDEX IF NOT EXISTS "geo_cities_name_population_idx" 
ON "geo_cities" (LOWER("name") text_pattern_ops, population DESC);

-- Partial index for high-population cities (used for empty searches)
CREATE INDEX IF NOT EXISTS "geo_cities_high_pop_idx" 
ON "geo_cities" (population DESC) 
WHERE population > 100000;
