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

    // Only include fields that are explicitly provided (not undefined)
    const updateData: Record<string, unknown> = {};
    if (settings.format24Hour !== undefined) updateData.format24Hour = settings.format24Hour;
    if (settings.showSeconds !== undefined) updateData.showSeconds = settings.showSeconds;
    if (settings.showMilliseconds !== undefined) updateData.showMilliseconds = settings.showMilliseconds;
    if (settings.timeZone !== undefined) updateData.timeZone = settings.timeZone;
    if (settings.dateFormat !== undefined) updateData.dateFormat = settings.dateFormat;
    if (settings.defaultClockCount !== undefined) updateData.defaultClockCount = settings.defaultClockCount;
    if (settings.sortOrder !== undefined) updateData.sortOrder = settings.sortOrder;
    if (settings.theme !== undefined) updateData.theme = settings.theme;
    if (settings.clockStyle !== undefined) updateData.clockStyle = settings.clockStyle;
    if (settings.colorScheme !== undefined) updateData.colorScheme = settings.colorScheme;

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
      update: updateData
    });

    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error('Failed to update settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
} 