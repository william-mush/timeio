export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100/30 via-secondary-100/30 to-accent-100/30">
      <div className="bg-white/60 backdrop-blur-xl p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Authentication Error</h1>
        <p className="text-gray-600 mb-6">
          There was an error during authentication. This could be due to:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
          <li>Invalid credentials</li>
          <li>Server configuration issues</li>
          <li>Network connectivity problems</li>
        </ul>
        <p className="text-gray-600 mb-4">
          Please try again or contact support if the problem persists.
        </p>
        <div className="flex justify-end">
          <a
            href="/"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
} 