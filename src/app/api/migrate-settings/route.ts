import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { authOptions } from '@/lib/auth';
import { CITIES } from '@/data/cities';

function getRegion(latitude: number): string {
  if (latitude > 66.5) return 'Arctic';
  if (latitude > 23.5) return 'Northern Temperate';
  if (latitude > 0) return 'Northern Tropical';
  if (latitude > -23.5) return 'Southern Tropical';
  if (latitude > -66.5) return 'Southern Temperate';
  return 'Antarctic';
}

// POST /api/migrate-settings - Migrate user settings from localStorage to database
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { settings, defaultCities } = await req.json();

    // Migrate user settings
    if (settings) {
      await prisma.userSettings.upsert({
        where: { userId: session.user.id },
        create: {
          userId: session.user.id,
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
    }

    // Migrate world clock cities
    if (defaultCities) {
      // Delete existing cities first
      await prisma.userTimeZone.deleteMany({
        where: { userId: session.user.id }
      });

      // Add new cities
      await Promise.all(defaultCities.map(async (cityId: string, index: number) => {
        const city = CITIES.find(c => c.id === cityId);
        if (!city) return;

        await prisma.userTimeZone.create({
          data: {
            userId: session.user.id,
            cityId: city.id,
            cityName: city.city,
            country: city.country,
            offset: city.offset,
            region: getRegion(city.coordinates[1]),
            order: index
          }
        });
      }));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Migration failed:', error);
    return NextResponse.json({ error: 'Migration failed' }, { status: 500 });
  }
} 