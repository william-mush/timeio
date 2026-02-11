# Time.IO — Deployment Guide

This guide covers deploying time.io to production on **Vercel**.

---

## Prerequisites

Before deploying, ensure you have:

1. A **Neon PostgreSQL** database (or any PostgreSQL instance accessible from the deployment target)
2. A **Google OAuth** app configured in Google Cloud Console with the correct redirect URIs
3. All environment variables ready (see [Environment Variables](#environment-variables))
4. The database schema pushed: `npx prisma db push`

---

## Vercel (Primary — Production)

Time.IO is deployed to Vercel and served at **https://time.io**.

### Initial Setup

1. **Connect repository to Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import the GitHub repository
   - Vercel auto-detects Next.js as the framework

2. **Configure environment variables:**
   In the Vercel dashboard, go to **Project Settings > Environment Variables** and add:

   | Variable | Value | Environments |
   |----------|-------|-------------|
   | `DATABASE_URL` | Your Neon pooled connection string | Production, Preview |
   | `NEXTAUTH_SECRET` | A random secret (generate with `openssl rand -base64 32`) | Production, Preview |
   | `NEXTAUTH_URL` | `https://time.io` | Production |
   | `GOOGLE_CLIENT_ID` | Your Google OAuth client ID | Production, Preview |
   | `GOOGLE_CLIENT_SECRET` | Your Google OAuth client secret | Production, Preview |
   | `NEXT_PUBLIC_GA_ID` | Your GA4 measurement ID (e.g., `G-Z50WKQ64VD`) | Production |
   | `TWILIO_ACCOUNT_SID` | Twilio SID (optional) | Production |
   | `TWILIO_AUTH_TOKEN` | Twilio auth token (optional) | Production |
   | `TWILIO_PHONE_NUMBER` | Twilio phone number (optional) | Production |

3. **Configure custom domain:**
   - Go to **Project Settings > Domains**
   - Add `time.io`
   - Configure DNS: add a CNAME record pointing `time.io` to `cname.vercel-dns.com`

4. **Deploy:**
   - Push to `main` branch — Vercel automatically builds and deploys
   - Build command: `npm run build` (runs `prisma generate` then `next build` with 4GB heap)

### Deployment Flow

```
git push origin main
  → Vercel webhook triggered
  → npm install (runs postinstall → prisma generate)
  → npm run build (NODE_OPTIONS='--max-old-space-size=4096' next build)
  → Deploy to Vercel edge network
  → Live at https://time.io
```

### Vercel Project Details

| Setting | Value |
|---------|-------|
| **Project ID** | `prj_JH5eOr0EV8StgNRci7z15WygRXz1` |
| **Team** | `william-mushs-projects` |
| **Framework** | Next.js (auto-detected) |
| **Node.js version** | 20.x |
| **Build command** | `npm run build` |
| **Output directory** | `.next` |
| **Install command** | `npm install` |

### Preview Deployments

Every push to a non-main branch creates a preview deployment at a unique URL (e.g., `timeio-xyz-team.vercel.app`). This is useful for testing changes before merging to main.

**Important for previews:** Set `NEXTAUTH_URL` for preview environments to the Vercel preview URL, or use `VERCEL_URL` which Vercel sets automatically.

### Monitoring

- **Vercel Analytics** — Built-in performance monitoring (Web Vitals, page load times)
- **Vercel Logs** — Real-time function logs in the Vercel dashboard
- **Google Analytics 4** — User behavior and traffic analytics

---

## Environment Variables

Complete list of environment variables needed for deployment:

### Required

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (Neon pooled URL recommended) |
| `NEXTAUTH_SECRET` | Random secret for JWT signing (generate with `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Full URL of the deployed app (e.g., `https://time.io`) |
| `GOOGLE_CLIENT_ID` | Google OAuth 2.0 client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth 2.0 client secret |

### Optional

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_ALGOLIA_APP_ID` | Algolia application ID |
| `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY` | Algolia search-only API key |
| `TWILIO_ACCOUNT_SID` | Twilio account SID for SMS |
| `TWILIO_AUTH_TOKEN` | Twilio auth token |
| `TWILIO_PHONE_NUMBER` | Twilio sender phone number |

---

## Google OAuth Configuration

To enable Google sign-in, configure your Google Cloud OAuth consent screen and credentials:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **APIs & Services > Credentials**
3. Create an OAuth 2.0 Client ID (Web application)
4. Add authorized redirect URIs:
   - Production: `https://time.io/api/auth/callback/google`
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Preview: `https://*.vercel.app/api/auth/callback/google` (if needed)
5. Copy the Client ID and Client Secret to your environment variables

---

## Database Setup (Neon)

1. Create a free account at [neon.tech](https://neon.tech)
2. Create a new project and database
3. Copy the **pooled connection string** (the one with `-pooler` in the hostname)
4. Set it as `DATABASE_URL` in your environment
5. Run `npx prisma db push` to create all tables and indexes

### GeoCity Data

The `GeoCity` table needs to be populated with GeoNames data (11M+ records). This is a one-time data import:

1. Download data from [GeoNames](http://download.geonames.org/export/dump/)
2. Process and import into the `geo_cities` table
3. The import creates records with: geonameid, name, asciiName, countryCode, country, timezone, latitude, longitude, population, continent, featureCode, admin1, elevation

---

## Security Checklist

Before going to production, verify:

- [ ] `NEXTAUTH_SECRET` is a strong, unique random value
- [ ] `DATABASE_URL` uses SSL (`?sslmode=require`)
- [ ] Google OAuth redirect URIs are restricted to your domain
- [ ] Environment variables are not committed to git (`.env.local` in `.gitignore`)
- [ ] Security headers are applied (verify in browser dev tools → Network → Response Headers)
- [ ] No sensitive data in client-side `NEXT_PUBLIC_*` variables

---

## Troubleshooting

### Build Fails with Memory Error

The build uses `NODE_OPTIONS='--max-old-space-size=4096'` (4GB). The `build` script in `package.json` already sets this.

### Prisma Client Not Generated

If you see `PrismaClientInitializationError`:
- Run `npx prisma generate` manually
- Ensure `postinstall` script runs: `"postinstall": "prisma generate"`

### Google OAuth Redirect Mismatch

If you get a redirect_uri_mismatch error:
- Verify the callback URL in Google Cloud Console matches exactly: `https://your-domain/api/auth/callback/google`
- Check `NEXTAUTH_URL` is set correctly

### Database Connection Timeout

If database queries time out:
- Use Neon's pooled connection string (not the direct connection)
- Verify `@prisma/adapter-pg` is installed and configured in `db.ts`
- Check Neon dashboard for connection limits
