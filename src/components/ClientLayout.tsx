'use client';

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div
        className="min-h-screen flex flex-col transition-colors duration-300"
        style={{ backgroundColor: 'rgb(var(--bg-primary))' }}
      >
        <Navigation />
        <main
          className="flex-1 pt-20"
          style={{ backgroundColor: 'rgb(var(--bg-primary))' }}
        >
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}