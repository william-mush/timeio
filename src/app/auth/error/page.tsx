import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-lg mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          There was a problem authenticating your account. This could be due to:
        </p>
        <ul className="list-disc list-inside mb-6 text-gray-600 dark:text-gray-400">
          <li>Your session has expired</li>
          <li>You cancelled the authentication process</li>
          <li>There was a technical issue with the authentication service</li>
        </ul>
        <div className="flex justify-between items-center">
          <Link
            href="/api/auth/signin"
            className="button-primary"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="text-gray-600 dark:text-gray-400 hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </Card>
    </div>
  )
} 