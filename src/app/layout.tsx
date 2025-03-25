import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { SessionProvider } from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TimeIO - World Time Management",
  description: "Manage time across the world with TimeIO",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navigation />
          <main className="min-h-screen bg-gray-50 py-6">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
