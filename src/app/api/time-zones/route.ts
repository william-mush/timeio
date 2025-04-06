import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/time-zones - Get all time zones for the current user
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const timeZones = await prisma.userTimeZone.findMany({
      where: { userId: session.user.id },
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(timeZones);
  } catch (error) {
    console.error('Failed to fetch time zones:', error);
    return NextResponse.json({ error: 'Failed to fetch time zones' }, { status: 500 });
  }
}

// POST /api/time-zones - Add a new time zone
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { cityId, city, country, offset, region, order } = data;

    if (!cityId || !city || !country || offset === undefined || !region) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if time zone already exists for user
    const existing = await prisma.userTimeZone.findFirst({
      where: {
        userId: session.user.id,
        cityId: cityId
      }
    });

    if (existing) {
      return NextResponse.json({ error: 'Time zone already exists' }, { status: 409 });
    }

    const timeZone = await prisma.userTimeZone.create({
      data: {
        userId: session.user.id,
        cityId,
        cityName: city,
        country,
        offset,
        region,
        order: order || 0
      }
    });

    return NextResponse.json(timeZone);
  } catch (error) {
    console.error('Failed to create time zone:', error);
    return NextResponse.json({ error: 'Failed to create time zone' }, { status: 500 });
  }
}

// DELETE /api/time-zones/[id] - Delete a time zone
// export async function DELETE(request: Request) { <-- Remove this whole function
// ... function content ...
// } 