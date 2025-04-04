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
  const GA_MEASUREMENT_ID = 'G-Z50WKQ64VD'; // Ensure this is your correct ID

  useEffect(() => {
    if (!pathname) return; // Ensure pathname is available

    const url = pathname + (searchParams ? searchParams.toString() : '');
    
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
        }}
      />
    </>
  );
} 