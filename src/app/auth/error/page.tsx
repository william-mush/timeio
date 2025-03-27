export default function AuthError() {
  return (
    <div className="page-container">
      <div className="content-container flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="card max-w-md w-full">
          <h1 className="heading-2 mb-4">Authentication Error</h1>
          <p className="text-body mb-6">
            There was an error during authentication. This could be due to:
          </p>
          <ul className="list-disc list-inside text-body space-y-2 mb-6">
            <li>Invalid credentials</li>
            <li>Server configuration issues</li>
            <li>Network connectivity problems</li>
          </ul>
          <p className="text-body mb-4">
            Please try again or contact support if the problem persists.
          </p>
          <div className="flex justify-end">
            <a href="/" className="button-primary">
              Return Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 