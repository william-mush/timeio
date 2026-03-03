'use client';

import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-[50vh] px-4">
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
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: 'rgb(var(--text-primary))' }}
            >
              Something went wrong
            </h2>
            <p
              className="text-sm mb-6"
              style={{ color: 'rgb(var(--text-secondary))' }}
            >
              An unexpected error occurred. Please try again.
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors"
              style={{ backgroundColor: 'rgb(var(--accent-primary))' }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgb(var(--accent-secondary))')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = 'rgb(var(--accent-primary))')
              }
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
