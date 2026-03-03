import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { authOptions } from '@/lib/auth';

// GET /api/alarms - Get all alarms for the current user
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const alarms = await prisma.alarm.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(alarms);
  } catch (error) {
    console.error('Failed to fetch alarms:', error);
    return NextResponse.json({ error: 'Failed to fetch alarms' }, { status: 500 });
  }
}

// POST /api/alarms - Create a new alarm
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const { hours, minutes, label, sound, isEnabled = true, repeatDays, timezone } = data;

    // Validate hours
    if (!Number.isInteger(hours) || hours < 0 || hours > 23) {
      return NextResponse.json({ error: 'hours must be an integer between 0 and 23' }, { status: 400 });
    }

    // Validate minutes
    if (!Number.isInteger(minutes) || minutes < 0 || minutes > 59) {
      return NextResponse.json({ error: 'minutes must be an integer between 0 and 59' }, { status: 400 });
    }

    // Validate sound
    if (typeof sound !== 'string' || sound.trim().length === 0) {
      return NextResponse.json({ error: 'sound must be a non-empty string' }, { status: 400 });
    }

    // Validate repeatDays
    if (repeatDays !== undefined && repeatDays !== null) {
      if (!Array.isArray(repeatDays) || !repeatDays.every((d: unknown) => Number.isInteger(d) && (d as number) >= 0 && (d as number) <= 6)) {
        return NextResponse.json({ error: 'repeatDays must be an array of integers between 0 and 6' }, { status: 400 });
      }
    }

    // Validate timezone (if provided)
    if (timezone !== undefined && timezone !== null) {
      try {
        Intl.DateTimeFormat(undefined, { timeZone: timezone });
      } catch {
        return NextResponse.json({ error: 'timezone must be a valid IANA timezone' }, { status: 400 });
      }
    }

    const alarm = await prisma.alarm.create({
      data: {
        userId: session.user.id,
        hours,
        minutes,
        label,
        sound,
        isEnabled,
        repeatDays: repeatDays || [],
        timezone: timezone || 'UTC',
      },
    });

    return NextResponse.json(alarm);
  } catch (error) {
    console.error('Failed to create alarm:', error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create alarm' }, { status: 500 });
  }
}

// PATCH /api/alarms/:id - Update an alarm
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const { id } = data;

    // Validate id
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid alarm id' }, { status: 400 });
    }

    // Build update payload from explicit allowlist only
    const ALLOWED_FIELDS = ['hours', 'minutes', 'label', 'sound', 'isEnabled', 'repeatDays', 'timezone', 'snoozeUntil'] as const;
    const updateData: Record<string, unknown> = {};
    for (const field of ALLOWED_FIELDS) {
      if (field in data) {
        updateData[field] = data[field];
      }
    }

    // Verify the alarm belongs to the user
    const existingAlarm = await prisma.alarm.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!existingAlarm) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const alarm = await prisma.alarm.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(alarm);
  } catch (error) {
    console.error('Failed to update alarm:', error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update alarm' }, { status: 500 });
  }
}

// DELETE /api/alarms/:id - Archive an alarm instead of deleting it
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing alarm ID' }, { status: 400 });
    }

    // Verify the alarm belongs to the user
    const existingAlarm = await prisma.alarm.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!existingAlarm) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Start a transaction to archive and delete the alarm
    await prisma.$transaction(async (tx) => {
      // Create an archived version
      await tx.archivedAlarm.create({
        data: {
          userId: existingAlarm.userId,
          hours: existingAlarm.hours,
          minutes: existingAlarm.minutes,
          label: existingAlarm.label,
          sound: existingAlarm.sound,
          repeatDays: existingAlarm.repeatDays,
          createdAt: existingAlarm.createdAt,
          lastTriggered: existingAlarm.lastTriggered,
          reason: 'deleted',
        },
      });

      // Delete the original alarm
      await tx.alarm.delete({
        where: { id },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete alarm:', error);
    return NextResponse.json({ error: 'Failed to delete alarm' }, { status: 500 });
  }
}
