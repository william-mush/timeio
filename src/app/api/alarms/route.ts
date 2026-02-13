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
    const { id, ...updateData } = data;

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
