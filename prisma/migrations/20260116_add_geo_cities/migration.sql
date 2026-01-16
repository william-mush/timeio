-- CreateTable
CREATE TABLE "geo_cities" (
    "geonameid" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "asciiName" TEXT NOT NULL,
    "countryCode" CHAR(2) NOT NULL,
    "country" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "population" INTEGER NOT NULL DEFAULT 0,
    "continent" TEXT NOT NULL,
    "featureCode" VARCHAR(10),
    "admin1" TEXT,
    "elevation" INTEGER,

    CONSTRAINT "geo_cities_pkey" PRIMARY KEY ("geonameid")
);

-- CreateIndex for fast text search
CREATE INDEX "geo_cities_asciiName_idx" ON "geo_cities"("asciiName");

-- CreateIndex for country filtering
CREATE INDEX "geo_cities_countryCode_idx" ON "geo_cities"("countryCode");

-- CreateIndex for sorting by population
CREATE INDEX "geo_cities_population_idx" ON "geo_cities"("population" DESC);

-- CreateIndex for continent filtering
CREATE INDEX "geo_cities_continent_idx" ON "geo_cities"("continent");

-- CreateIndex for timezone filtering  
CREATE INDEX "geo_cities_timezone_idx" ON "geo_cities"("timezone");

-- Enable pg_trgm extension for fast fuzzy search (if not already enabled)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create trigram index for fast substring/fuzzy matching
CREATE INDEX "geo_cities_asciiName_trgm_idx" ON "geo_cities" USING GIN ("asciiName" gin_trgm_ops);
CREATE INDEX "geo_cities_name_trgm_idx" ON "geo_cities" USING GIN ("name" gin_trgm_ops);
