import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { authOptions } from '@/lib/auth';

// GET /api/archived-alarms - Get all archived alarms for the current user
export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const archivedAlarms = await prisma.archivedAlarm.findMany({
      where: { userId: session.user.id },
      orderBy: { archivedAt: 'desc' },
    });

    return NextResponse.json(archivedAlarms);
  } catch (error) {
    console.error('Failed to fetch archived alarms:', error);
    return NextResponse.json({ error: 'Failed to fetch archived alarms' }, { status: 500 });
  }
} 