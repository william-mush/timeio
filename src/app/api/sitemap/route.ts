import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const BASE_URL = 'https://time.io';

// Generate sitemap with all cities from database
async function generateSitemap() {
  const now = new Date().toISOString();

  // Static pages with priorities
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/world-clock', priority: '0.9', changefreq: 'daily' },
    { url: '/time-converter', priority: '0.9', changefreq: 'daily' },
    { url: '/alarms', priority: '0.9', changefreq: 'daily' },
    { url: '/world-map', priority: '0.8', changefreq: 'weekly' },
    { url: '/world-cities', priority: '0.8', changefreq: 'weekly' },
    { url: '/us-cities', priority: '0.8', changefreq: 'weekly' },
    { url: '/solar-clock', priority: '0.7', changefreq: 'weekly' },
    { url: '/solar-clock-3d', priority: '0.7', changefreq: 'weekly' },
    { url: '/history', priority: '0.6', changefreq: 'monthly' },
    { url: '/luxury', priority: '0.6', changefreq: 'monthly' },
    { url: '/settings', priority: '0.5', changefreq: 'monthly' },
    { url: '/auth/signin', priority: '0.4', changefreq: 'monthly' },
  ];

  // Get all cities from database
  const cities = await prisma.geoCity.findMany({
    select: {
      geonameid: true,
      asciiName: true,
      population: true,
    },
    orderBy: { population: 'desc' },
  });

  // Generate city page URLs with priority based on population
  const cityPages = cities.map((city) => {
    const slug = `${city.asciiName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${city.geonameid}`;
    // Higher population = higher priority (0.5 to 0.8)
    let priority = '0.5';
    if (city.population > 5000000) priority = '0.8';
    else if (city.population > 1000000) priority = '0.7';
    else if (city.population > 100000) priority = '0.6';

    return {
      url: `/city/${slug}`,
      priority,
      changefreq: 'weekly' as const,
    };
  });

  const allPages = [...staticPages, ...cityPages];

  // Build sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}

export async function GET() {
  try {
    const sitemap = await generateSitemap();

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);

    // Fallback to basic sitemap on error
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new NextResponse(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
}