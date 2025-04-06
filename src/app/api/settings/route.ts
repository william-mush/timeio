import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { authOptions } from '@/lib/auth';

// GET /api/settings - Get user settings
export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const settings = await prisma.userSettings.findUnique({
      where: { userId: session.user.id }
    });

    if (!settings) {
      return NextResponse.json({ error: 'Settings not found' }, { status: 404 });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to get settings:', error);
    return NextResponse.json({ error: 'Failed to get settings' }, { status: 500 });
  }
}

// PUT /api/settings - Update user settings
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const settings = await req.json();

    const updatedSettings = await prisma.userSettings.upsert({
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

    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error('Failed to update settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
} 