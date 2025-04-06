import { prisma } from '@/lib/db';
import { CITIES } from '@/data/cities';

interface TimeZone {
  id: string;
  name: string;
  offset: number;
  city: string;
  country: string;
  region: string;
}

const WORLD_TIMEZONES: TimeZone[] = CITIES.map(city => ({
  id: city.id,
  name: `${city.city.replace(/\s+/g, '_')}`,
  offset: city.offset,
  city: city.city,
  country: city.country,
  region: getRegion(city.coordinates[1])
}));

function getRegion(latitude: number): string {
  if (latitude > 66.5) return 'Arctic';
  if (latitude > 23.5) return 'Northern Temperate';
  if (latitude > 0) return 'Northern Tropical';
  if (latitude > -23.5) return 'Southern Tropical';
  if (latitude > -66.5) return 'Southern Temperate';
  return 'Antarctic';
}

export async function migrateUserSettings(userId: string, email: string) {
  try {
    // Get settings from localStorage
    const savedSettings = localStorage.getItem(`timeSettings_${email}`);
    if (!savedSettings) return;

    const settings = JSON.parse(savedSettings);

    // Update or create user settings in database
    await prisma.userSettings.upsert({
      where: { userId },
      create: {
        userId,
        format24Hour: settings.format24Hour ?? false,
        showSeconds: settings.showSeconds ?? true,
        showMilliseconds: settings.showMilliseconds ?? false,
        timeZone: settings.timeZone ?? "UTC",
        dateFormat: settings.dateFormat ?? "MM/dd/yyyy",
        defaultClockCount: settings.defaultClockCount ?? 3,
        sortOrder: settings.sortOrder ?? "timezone",
        theme: settings.theme ?? "light",
        clockStyle: settings.clockStyle ?? "digital",
        colorScheme: settings.colorScheme ?? "blue"
      },
      update: {
        format24Hour: settings.format24Hour ?? false,
        showSeconds: settings.showSeconds ?? true,
        showMilliseconds: settings.showMilliseconds ?? false,
        timeZone: settings.timeZone ?? "UTC",
        dateFormat: settings.dateFormat ?? "MM/dd/yyyy",
        defaultClockCount: settings.defaultClockCount ?? 3,
        sortOrder: settings.sortOrder ?? "timezone",
        theme: settings.theme ?? "light",
        clockStyle: settings.clockStyle ?? "digital",
        colorScheme: settings.colorScheme ?? "blue"
      }
    });

    // After successful migration, remove from localStorage
    localStorage.removeItem(`timeSettings_${email}`);

    return true;
  } catch (error) {
    console.error('Failed to migrate user settings:', error);
    return false;
  }
}

export async function migrateWorldClockCities(userId: string) {
  try {
    // Get existing cities from database
    const existingCities = await prisma.userTimeZone.findMany({
      where: { userId }
    });

    if (existingCities.length > 0) {
      // Cities already migrated
      return true;
    }

    // Get default cities from CITIES data
    const defaultCities = WORLD_TIMEZONES.slice(0, 3);

    // Add default cities to database
    await Promise.all(defaultCities.map((city: TimeZone, index: number) => 
      prisma.userTimeZone.create({
        data: {
          userId,
          cityId: city.id,
          cityName: city.city,
          country: city.country,
          offset: city.offset,
          region: city.region,
          order: index
        }
      })
    ));

    return true;
  } catch (error) {
    console.error('Failed to migrate world clock cities:', error);
    return false;
  }
} 