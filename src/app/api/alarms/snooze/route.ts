import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { authOptions } from '@/lib/auth';

// POST /api/alarms/snooze - Snooze an alarm for 5 minutes
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    const { alarmId } = data;

    if (!alarmId) {
      return NextResponse.json({ error: 'Missing alarmId' }, { status: 400 });
    }

    // Verify the alarm belongs to the user
    const alarm = await prisma.alarm.findFirst({
      where: { id: alarmId, userId: session.user.id },
    });

    if (!alarm) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Set snoozeUntil to 5 minutes from now
    const snoozeUntil = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.alarm.update({
      where: { id: alarmId },
      data: { snoozeUntil },
    });

    return NextResponse.json({ success: true, snoozeUntil });
  } catch (error) {
    console.error('Failed to snooze alarm:', error);
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to snooze alarm' }, { status: 500 });
  }
}
