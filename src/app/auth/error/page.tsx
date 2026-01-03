'use client'

import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { AlertCircle, RefreshCcw, Home, Bug } from 'lucide-react'
import { Suspense } from 'react'

const errorDescriptions: Record<string, { title: string; description: string; suggestion: string }> = {
  Configuration: {
    title: 'Server Configuration Error',
    description: 'There is a problem with the server authentication configuration.',
    suggestion: 'Please contact support or try again later.',
  },
  AccessDenied: {
    title: 'Access Denied',
    description: 'You do not have permission to sign in.',
    suggestion: 'If you believe this is an error, please contact support.',
  },
  Verification: {
    title: 'Verification Error',
    description: 'The verification link may have expired or already been used.',
    suggestion: 'Please request a new verification link.',
  },
  OAuthSignin: {
    title: 'OAuth Sign-in Error',
    description: 'There was a problem starting the OAuth sign-in process.',
    suggestion: 'This often happens due to a misconfigured redirect URI. Please try again or contact support.',
  },
  OAuthCallback: {
    title: 'OAuth Callback Error',
    description: 'There was a problem processing the OAuth response.',
    suggestion: 'Please try signing in again. If the problem persists, contact support.',
  },
  OAuthCreateAccount: {
    title: 'Account Creation Failed',
    description: 'There was a problem creating your account through OAuth.',
    suggestion: 'Please try again or use a different sign-in method.',
  },
  OAuthAccountNotLinked: {
    title: 'Account Not Linked',
    description: 'This email is already associated with a different sign-in method.',
    suggestion: 'Please sign in using your original sign-in method.',
  },
  Callback: {
    title: 'Callback Error',
    description: 'There was an error during the authentication callback.',
    suggestion: 'Please try signing in again.',
  },
  Default: {
    title: 'Authentication Error',
    description: 'An unexpected error occurred during authentication.',
    suggestion: 'Please try again. If the problem persists, contact support.',
  },
}

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const errorCode = searchParams.get('error') || 'Default'
  const errorInfo = errorDescriptions[errorCode] || errorDescriptions.Default

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
      <Card className="max-w-lg mx-auto p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-red-100 rounded-full">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{errorInfo.title}</h1>
            <p className="text-sm text-gray-500">Error code: {errorCode}</p>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {errorInfo.description}
        </p>

        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm bg-gray-50 p-3 rounded-lg">
          💡 <strong>Suggestion:</strong> {errorInfo.suggestion}
        </p>

        {/* Technical details for debugging */}
        <details className="mb-6 text-sm">
          <summary className="cursor-pointer text-gray-500 hover:text-gray-700 flex items-center gap-2">
            <Bug className="w-4 h-4" />
            Technical Details
          </summary>
          <div className="mt-3 p-3 bg-gray-100 rounded-lg font-mono text-xs overflow-x-auto">
            <p><strong>Error Code:</strong> {errorCode}</p>
            <p><strong>Timestamp:</strong> {new Date().toISOString()}</p>
            <p><strong>URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
            <p className="mt-2 text-gray-600">
              For support, please provide this information when reporting the issue.
            </p>
          </div>
        </details>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/auth/signin"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </Link>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <Card className="max-w-lg mx-auto p-8">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        </Card>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  )
}