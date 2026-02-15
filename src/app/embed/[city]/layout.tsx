import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function EmbedCityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Hide all app chrome (nav, footer, etc.) for clean iframe embedding */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            nav, footer, header,
            [class*="Navigation"], [class*="Footer"],
            .quick-search-overlay {
              display: none !important;
            }
            main {
              padding-top: 0 !important;
              margin: 0 !important;
            }
            body {
              margin: 0 !important;
              padding: 0 !important;
              overflow: hidden !important;
            }
            /* Hide everything except the embed widget */
            body > * > * > main {
              padding: 0 !important;
            }
          `,
        }}
      />
      {children}
    </>
  );
}
