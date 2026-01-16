import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// DELETE /api/time-zones/[cityId] - Delete a time zone
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ cityId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) { // Check for user ID, more robust than email
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { cityId } = await params;

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