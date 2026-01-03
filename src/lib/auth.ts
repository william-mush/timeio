import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/prisma'
import { logAuthEvent } from '@/lib/auth-events'

// Log environment variable status (without exposing secrets)
const logAuthConfig = () => {
  const hasClientId = !!process.env.GOOGLE_CLIENT_ID
  const hasClientSecret = !!process.env.GOOGLE_CLIENT_SECRET
  const hasNextAuthUrl = !!process.env.NEXTAUTH_URL
  const hasNextAuthSecret = !!process.env.NEXTAUTH_SECRET
  const hasDatabaseUrl = !!process.env.DATABASE_URL

  console.log('[NextAuth] Configuration Check:')
  console.log(`  - GOOGLE_CLIENT_ID: ${hasClientId ? '✓ Set' : '✗ MISSING'}`)
  console.log(`  - GOOGLE_CLIENT_SECRET: ${hasClientSecret ? '✓ Set' : '✗ MISSING'}`)
  console.log(`  - NEXTAUTH_URL: ${hasNextAuthUrl ? `✓ Set (${process.env.NEXTAUTH_URL})` : '✗ MISSING'}`)
  console.log(`  - NEXTAUTH_SECRET: ${hasNextAuthSecret ? '✓ Set' : '✗ MISSING'}`)
  console.log(`  - DATABASE_URL: ${hasDatabaseUrl ? '✓ Set' : '✗ MISSING'}`)

  if (!hasClientId || !hasClientSecret) {
    console.error('[NextAuth] ERROR: Google OAuth credentials are missing!')
  }
  if (!hasNextAuthUrl) {
    console.warn('[NextAuth] WARNING: NEXTAUTH_URL is not set. This may cause redirect issues.')
  }
  if (!hasNextAuthSecret) {
    console.warn('[NextAuth] WARNING: NEXTAUTH_SECRET is not set. Sessions may not persist.')
  }
}

// Log on module load
logAuthConfig()

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // Enable debug mode for detailed logging
  debug: process.env.NODE_ENV === 'development' || process.env.NEXTAUTH_DEBUG === 'true',
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log('[NextAuth] signIn callback triggered:', {
        userId: user?.id,
        userEmail: user?.email,
        provider: account?.provider,
        accountType: account?.type,
      })
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log('[NextAuth] redirect callback:', { url, baseUrl })
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    session({ session, user }) {
      console.log('[NextAuth] session callback:', {
        sessionUserId: session?.user?.email,
        dbUserId: user?.id,
      })
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
  events: {
    async signIn({ user, account, isNewUser }) {
      console.log('[NextAuth] EVENT signIn:', {
        userId: user?.id,
        email: user?.email,
        provider: account?.provider,
        isNewUser,
      })

      // Log to database for analytics
      await logAuthEvent({
        type: isNewUser ? 'signup' : 'signin_success',
        provider: account?.provider,
        userId: user?.id,
        email: user?.email || undefined,
      })
    },
    async signOut({ session }) {
      const userId = (session as { userId?: string })?.userId
      console.log('[NextAuth] EVENT signOut:', { userId })

      // Log to database for analytics
      await logAuthEvent({
        type: 'signout',
        userId: userId || undefined,
      })
    },
    async createUser({ user }) {
      console.log('[NextAuth] EVENT createUser:', {
        userId: user?.id,
        email: user?.email,
      })
      // Note: signup is already logged in signIn event with isNewUser flag
    },
    async linkAccount({ user, account }) {
      console.log('[NextAuth] EVENT linkAccount:', {
        userId: user?.id,
        provider: account?.provider,
      })
    },
    async session({ session }) {
      console.log('[NextAuth] EVENT session:', {
        userEmail: session?.user?.email,
      })
    },
  },
  logger: {
    error(code, metadata) {
      console.error('[NextAuth] ERROR:', code, metadata)

      // Log auth failures to database
      // Extract error details from metadata if available
      const errorDetails = metadata as { message?: string; error?: { message?: string } }
      logAuthEvent({
        type: 'signin_failure',
        errorCode: typeof code === 'string' ? code : 'unknown',
        errorMsg: errorDetails?.message || errorDetails?.error?.message,
      }).catch(() => { }) // Fire and forget
    },
    warn(code) {
      console.warn('[NextAuth] WARNING:', code)
    },
    debug(code, metadata) {
      console.log('[NextAuth] DEBUG:', code, metadata)
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
}