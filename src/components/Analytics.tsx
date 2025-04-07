'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from "react";

// Declare gtag and dataLayer on the window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Use environment variable
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (!pathname || !GA_MEASUREMENT_ID) return; // Ensure pathname and ID are available

    const url = pathname + (searchParams ? searchParams.toString() : '');
    
    // Log the type of gtag when the effect runs
    console.log(`Analytics useEffect: typeof window.gtag is ${typeof window.gtag}`);

    // Check if gtag is defined (script loaded)
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      // Send page view event
      window.gtag('event', 'page_view', {
        page_path: url,
        page_location: window.location.href, // Send full URL
        page_title: document.title // Optionally send page title
      });
      
      // Log for debugging (optional)
      console.log(`GA Pageview: ${url}`);
    } else {
      console.warn('gtag not defined, Analytics script might not be loaded yet or blocked.');
    }
  }, [pathname, searchParams]); // Rerun effect when path or search params change

  // Don't render script if ID is missing
  if (!GA_MEASUREMENT_ID) {
    console.warn("Google Analytics MEASUREMENT ID is missing.");
    return null;
  }

  return (
    <>
      <Script
        id="gtag-js"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onLoad={() => {
          // Initialize dataLayer and gtag config after script loads
          window.dataLayer = window.dataLayer || [];
          // Define gtag function correctly for use within onLoad
          function gtag(...args: any[]){ window.dataLayer?.push(args); }
          gtag('js', new Date());
          gtag('config', GA_MEASUREMENT_ID, {
            // Send initial page view on load
            page_path: window.location.pathname + window.location.search,
          });
          // Log confirmation that onLoad completed
          console.log('Analytics Script onLoad completed and gtag configured.');
        }}
      />
    </>
  );
} 