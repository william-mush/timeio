import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        alarms: true,
      },
    })

    if (!user) {
      // Create user if they don't exist
      const newUser = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        },
        include: {
          alarms: true,
        },
      })
      return NextResponse.json(newUser)
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('User API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 