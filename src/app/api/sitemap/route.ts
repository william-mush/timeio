import { NextResponse } from 'next/server';

function generateSitemap(baseUrl: string) {
  const pages = [
    '',                  // home page
    '/auth/signin',      // sign in page
    '/auth/signup',      // sign up page
    '/settings',         // settings page
    '/world-clock',      // world clock page
    '/alarm',            // alarm page
    '/solar',            // solar clock page
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          return `
            <url>
              <loc>${baseUrl}${page}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>daily</changefreq>
              <priority>${page === '' ? '1.0' : '0.8'}</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>`;

  return sitemap;
}

export async function GET(request: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://timeio.app';
  
  // Generate sitemap
  const sitemap = generateSitemap(baseUrl);

  // Return the sitemap with appropriate headers
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
} 