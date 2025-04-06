import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// DELETE /api/time-zones/[cityId] - Delete a time zone
export async function DELETE(
  request: Request, 
  { params }: { params: { cityId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) { // Check for user ID, more robust than email
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const cityId = params.cityId;

  if (!cityId) {
    // This check might be redundant as Next.js ensures params.cityId exists here
    return NextResponse.json({ error: 'Missing cityId' }, { status: 400 });
  }

  try {
    await prisma.userTimeZone.deleteMany({
      where: {
        userId: session.user.id,
        cityId: cityId
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete time zone:', error);
    return NextResponse.json({ error: 'Failed to delete time zone' }, { status: 500 });
  }
} 