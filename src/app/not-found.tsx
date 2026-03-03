import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div
        className="max-w-md w-full rounded-2xl border p-8 text-center shadow-lg"
        style={{
          backgroundColor: 'rgb(var(--bg-card))',
          borderColor: 'rgb(var(--border-primary))',
        }}
      >
        <div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: 'rgba(var(--accent-primary), 0.1)' }}
        >
          <svg
            className="h-7 w-7"
            style={{ color: 'rgb(var(--accent-primary))' }}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <h1
          className="text-5xl font-bold mb-2"
          style={{ color: 'rgb(var(--text-primary))' }}
        >
          404
        </h1>
        <h2
          className="text-xl font-semibold mb-2"
          style={{ color: 'rgb(var(--text-primary))' }}
        >
          Page not found
        </h2>
        <p
          className="text-sm mb-6"
          style={{ color: 'rgb(var(--text-secondary))' }}
        >
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors"
          style={{ backgroundColor: 'rgb(var(--accent-primary))' }}
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
