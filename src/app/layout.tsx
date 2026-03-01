import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";
import { Analytics } from "@/components/Analytics";
import { SessionProvider } from "@/components/SessionProvider";
import { Suspense } from 'react';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from "@/components/ThemeProvider";
import { QuickSearch } from "@/components/QuickSearch";

const inter = Inter({ subsets: ["latin"] });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-elegant",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://time.io'),
  title: {
    default: 'Time.IO - World Clock, Alarms & Time Zone Converter',
    template: '%s | Time.IO',
  },
  description: 'Track time across the globe with Time.IO. World clock, smart alarms, time zone converter, interactive maps, solar clock, and more. Your elegant time companion.',
  keywords: [
    'world clock',
    'time zones',
    'alarm clock',
    'time converter',
    'current time',
    'GMT',
    'UTC',
    'time zone map',
    'solar clock',
    'international time',
  ],
  authors: [{ name: 'Time.IO' }],
  creator: 'Time.IO',
  publisher: 'Time.IO',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://time.io',
    siteName: 'Time.IO',
    title: 'Time.IO - World Clock, Alarms & Time Zone Converter',
    description: 'Track time across the globe with Time.IO. World clock, smart alarms, time zone converter, interactive maps, and more.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Time.IO - Your elegant time companion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Time.IO - World Clock & Time Zone Converter',
    description: 'Track time across the globe. World clock, alarms, time zones, and more.',
    images: ['/og-image.png'],
    creator: '@timeio',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://time.io',
  },
  verification: {
    google: 'A3edmW2ty8WmjWG4-2ePkyHSdM3KiGI4Y41dmhJLClI',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Time.IO',
  url: 'https://time.io',
  description: 'Track time across the globe with Time.IO. World clock, smart alarms, time zone converter, interactive maps, and more.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Organization',
    name: 'Time.IO',
    url: 'https://time.io',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} ${cormorant.variable} bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen`}>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <SessionProvider>
          <ThemeProvider>
            <QuickSearch />
            <ClientLayout>
              {children}
            </ClientLayout>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
