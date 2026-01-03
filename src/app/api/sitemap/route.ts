import { NextResponse } from 'next/server';
import { US_CITIES } from '@/data/us-cities';
import { ALL_WORLD_CITIES } from '@/data/all-world-cities';

const BASE_URL = 'https://time.io';

function generateSitemap() {
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

  // Dynamic US city pages
  const usCityPages = US_CITIES.map((city) => ({
    url: `/us-cities/${city.id}`,
    priority: '0.6',
    changefreq: 'weekly' as const,
  }));

  // Dynamic World city pages
  const worldCityPages = ALL_WORLD_CITIES.map((city) => ({
    url: `/world-cities/${city.id}`,
    priority: '0.6',
    changefreq: 'weekly' as const,
  }));

  const allPages = [...staticPages, ...usCityPages, ...worldCityPages];

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
  const sitemap = generateSitemap();

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}