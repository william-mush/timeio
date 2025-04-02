/*
  Warnings:

  - Added the required column `cityName` to the `UserTimeZone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `UserTimeZone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offset` to the `UserTimeZone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `UserTimeZone` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserSettings" ADD COLUMN     "clockStyle" TEXT NOT NULL DEFAULT 'digital',
ADD COLUMN     "colorScheme" TEXT NOT NULL DEFAULT 'blue',
ADD COLUMN     "defaultClockCount" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "sortOrder" TEXT NOT NULL DEFAULT 'timezone',
ADD COLUMN     "theme" TEXT NOT NULL DEFAULT 'light',
ADD COLUMN     "timeZone" TEXT NOT NULL DEFAULT 'UTC';

-- AlterTable
ALTER TABLE "UserTimeZone" 
ADD COLUMN     "cityName" TEXT NOT NULL DEFAULT 'Unknown City',
ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'Unknown Country',
ADD COLUMN     "offset" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "region" TEXT NOT NULL DEFAULT 'Unknown Region';

-- CreateIndex
CREATE INDEX "UserTimeZone_userId_order_idx" ON "UserTimeZone"("userId", "order");

-- Update existing UserTimeZone entries with correct data
UPDATE "UserTimeZone" ut
SET 
  "cityName" = CASE 
    WHEN ut."cityId" = 'new_york' THEN 'New York'
    WHEN ut."cityId" = 'los_angeles' THEN 'Los Angeles'
    WHEN ut."cityId" = 'chicago' THEN 'Chicago'
    ELSE 'Unknown City'
  END,
  "country" = CASE 
    WHEN ut."cityId" IN ('new_york', 'los_angeles', 'chicago') THEN 'United States'
    ELSE 'Unknown Country'
  END,
  "offset" = CASE 
    WHEN ut."cityId" = 'new_york' THEN -4
    WHEN ut."cityId" = 'los_angeles' THEN -7
    WHEN ut."cityId" = 'chicago' THEN -5
    ELSE 0
  END,
  "region" = 'Northern Temperate';
