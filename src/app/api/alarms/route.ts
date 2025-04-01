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

  const alarms = await prisma.alarm.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'asc' },
  });

  return NextResponse.json(alarms);
}

// POST /api/alarms - Create a new alarm
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await req.json();
  const { hours, minutes, label, sound, isEnabled = true } = data;

  const alarm = await prisma.alarm.create({
    data: {
      userId: session.user.id,
      hours,
      minutes,
      label,
      sound,
      isEnabled,
      repeatDays: [],
    },
  });

  return NextResponse.json(alarm);
}

// PATCH /api/alarms/:id - Update an alarm
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
}

// DELETE /api/alarms/:id - Delete an alarm
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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

  await prisma.alarm.delete({ where: { id } });

  return NextResponse.json({ success: true });
} 