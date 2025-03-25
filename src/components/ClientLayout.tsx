'use client';

import { SessionProvider } from "@/components/SessionProvider";
import { AuthHeader } from '@/components/AuthHeader';
import { Navigation } from "@/components/Navigation";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gradient-to-br from-primary-100/30 via-secondary-100/30 to-accent-100/30">
        <AuthHeader />
        <Navigation />
        <main className="pt-40 pb-12">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
} 