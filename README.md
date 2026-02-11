# Time.IO

**Your elegant time companion** — a modern web application for tracking, converting, and exploring time across the globe.

**Live:** [https://time.io](https://time.io)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Deployment](#deployment)
- [API Reference](#api-reference)
- [Authentication](#authentication)
- [Related Documentation](#related-documentation)

---

## Overview

Time.IO is a full-featured time management web application built with Next.js 16 and React 19. It serves as a world clock, alarm manager, timezone converter, and geographic time explorer with interactive visualizations including world maps and a 3D solar system.

The app supports user accounts (Google OAuth + email/password), persistent settings, a searchable database of 11M+ cities from GeoNames, and is deployed to Vercel with a Neon PostgreSQL database.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16.1 (App Router, canary) with TypeScript 5.9 |
| **UI** | React 19.2, Tailwind CSS 3.4, Framer Motion 12.5 |
| **Icons** | Lucide React 0.483 |
| **3D/Visualization** | Three.js 0.182 + @react-three/fiber 9 beta (Solar Clock 3D) |
| **Maps** | react-simple-maps 3.0, react-leaflet 5.0, d3-geo 3.1 |
| **Database** | PostgreSQL (Neon serverless) via Prisma 7.2 with `@prisma/adapter-pg` |
| **Auth** | NextAuth.js 4.24 (Google OAuth + email/password credentials) |
| **Search** | PostgreSQL ILIKE with trigram indexes across 11M+ GeoCity records |
| **SMS** | Twilio 5.5 |
| **Analytics** | Vercel Analytics 1.5 + Google Analytics 4 |
| **Hosting** | Vercel |
| **Font** | Inter (Google Fonts) |
| **Command Palette** | cmdk 1.1 |

---

## Features

### Core Tools

| Feature | Route | Description |
|---------|-------|-------------|
| **World Clock** | `/world-clock` | Add/remove cities, real-time display, custom ordering, synced with user account |
| **Alarms** | `/alarms` | Create alarms with repeat patterns (day-of-week), browser notifications, Web Audio sound generation |
| **City Time** | `/time-converter` | Compare current time across 1,938 world cities side by side |
| **World Map** | `/world-map` | Interactive SVG map with city markers, zoom, and pan (react-simple-maps) |

### Exploration

| Feature | Route | Description |
|---------|-------|-------------|
| **Solar Clock** | `/solar-clock` | 2D animated solar system with orbital visualization |
| **Solar Clock 3D** | `/solar-clock-3d` | Three.js 3D planetary system with interactive hover effects |
| **Time History** | `/history` | Evolution of timekeeping from sundials to atomic clocks |
| **Luxury Watches** | `/luxury` | Catalog of luxury timepieces with images and market data |

### City & Location Browsing

| Feature | Route | Description |
|---------|-------|-------------|
| **Browse by Country** | `/cities` | 80+ countries organized by timezone |
| **World Cities** | `/world-cities` | Search all GeoNames cities (11M+ database records) |
| **US Cities** | `/us-cities` | All US cities with population 24,000+, filterable by state and timezone |
| **US Counties** | `/us-counties` | All 3,143+ US counties with population density and FIPS codes |
| **Timezone Pages** | `/timezone/[zone]` | Dedicated page per IANA timezone (e.g., `/timezone/America/New_York`) |
| **City Comparisons** | `/difference/[slug]` | Time difference calculator between two cities |

### User Features

| Feature | Route | Description |
|---------|-------|-------------|
| **Settings** | `/settings` | 12/24h format, theme, clock style, date format, sort order, color scheme |
| **Sign In** | `/auth/signin` | Google OAuth or email/password login |
| **Sign Up** | `/auth/signup` | Account registration with optional phone number |
| **Quick Search** | `Cmd+K` | Global command palette to search any city instantly |
| **Admin** | `/admin` | Authentication analytics dashboard |

### Additional Capabilities

- **Dark mode** with system preference detection and manual toggle
- **Responsive design** from 360px (xs breakpoint) to widescreen desktop
- **SEO** — dynamic metadata, JSON-LD structured data, Open Graph, Twitter cards
- **XML Sitemap** with 66,866+ city pages, auto-generated via API route
- **PWA manifest** at `/manifest.json`
- **Security headers** — CSP, X-Frame-Options DENY, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Google Search Console** verified

---

## Project Structure

```
timeio-1/
├── prisma/
│   └── schema.prisma              # Database schema (10 models)
├── public/                        # Static assets (favicon, OG image, manifest)
├── src/
│   ├── @types/
│   │   └── next-auth.d.ts         # NextAuth type extensions
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx             # Root layout (metadata, providers, JSON-LD)
│   │   ├── page.tsx               # Homepage (hero clock, search bar, feature grid)
│   │   ├── globals.css            # Global styles, CSS custom properties, theming
│   │   ├── api/                   # 15+ API route handlers
│   │   ├── auth/                  # signin, signup, error pages
│   │   ├── world-clock/           # World Clock page
│   │   ├── alarms/                # Alarm manager page
│   │   ├── time-converter/        # City Time comparison page
│   │   ├── world-map/             # Interactive world map page
│   │   ├── solar-clock/           # 2D solar visualization page
│   │   ├── solar-clock-3d/        # 3D solar visualization page
│   │   ├── luxury/                # Luxury watches page
│   │   ├── history/               # Time history page
│   │   ├── cities/                # Browse by country (80+ countries)
│   │   ├── world-cities/          # GeoNames city search page
│   │   ├── us-cities/             # US cities index + [slug] pages
│   │   ├── us-counties/           # US counties index + [slug] pages
│   │   ├── timezone/[zone]/       # Dynamic timezone pages
│   │   ├── difference/[slug]/     # City comparison pages
│   │   ├── settings/              # User preferences page
│   │   └── admin/                 # Admin dashboard page
│   ├── components/                # ~30 React components
│   │   ├── Navigation.tsx         # Header with nav dropdowns + user menu
│   │   ├── Footer.tsx             # Site footer
│   │   ├── ClientLayout.tsx       # Client-side provider wrapper
│   │   ├── WorldClock.tsx         # Clock display + city management
│   │   ├── Alarm.tsx              # Alarm CRUD + trigger UI
│   │   ├── TimeZoneConverter.tsx  # Multi-city time comparison grid
│   │   ├── WorldMap.tsx           # react-simple-maps SVG map
│   │   ├── CityMap.tsx            # Individual city map
│   │   ├── CityMapLeaflet.tsx     # Leaflet-based city map variant
│   │   ├── SolarClock.tsx         # 2D canvas/SVG planetary animation
│   │   ├── SolarClock3D.tsx       # Three.js 3D scene (ts-nocheck, beta)
│   │   ├── SmartSearch.tsx        # Homepage search bar wrapper
│   │   ├── HomepageSearch.tsx     # Database-powered search component
│   │   ├── CitySearch.tsx         # City picker for world clock
│   │   ├── QuickSearch.tsx        # Cmd+K global command palette (cmdk)
│   │   ├── ThemeProvider.tsx      # Light/dark/system theme context
│   │   ├── ThemeToggle.tsx        # Theme switcher button
│   │   ├── SessionProvider.tsx    # NextAuth session wrapper
│   │   ├── Settings.tsx           # Settings form component
│   │   ├── Analytics.tsx          # Vercel Analytics loader
│   │   ├── GoogleAnalytics.tsx    # GA4 script tag
│   │   ├── LuxuryTimepieceCard.tsx # Watch card display
│   │   ├── ImagePreview.tsx       # Image carousel
│   │   ├── PriceComparison.tsx    # Watch price comparison table
│   │   ├── auth/                  # SignInForm.tsx, SignUpForm.tsx
│   │   └── ui/                    # card.tsx, command.tsx, switch.tsx
│   ├── data/                      # Static data files
│   │   ├── cities.ts              # ~100 major world cities (quick reference)
│   │   ├── world-cities.ts        # 1,938 world cities from GeoNames
│   │   ├── all-world-cities.ts    # Extended world city list
│   │   ├── geonames-top-cities.ts # Top cities sorted by population
│   │   ├── us-cities.ts           # US cities with pop. 24,000+
│   │   ├── us-counties.ts         # All 3,143+ US counties
│   │   ├── landmarks.ts           # Famous landmarks with coordinates
│   │   ├── luxuryTimepieces.ts    # Watch catalog data
│   │   ├── types.ts               # Shared interfaces (CityMarker, etc.)
│   │   └── sections.ts            # Page section metadata
│   ├── lib/                       # Utilities & configuration
│   │   ├── auth.ts                # NextAuth config (providers, JWT, callbacks)
│   │   ├── auth-events.ts         # Auth event logging to database
│   │   ├── db.ts                  # Prisma client with Neon connection pooling
│   │   ├── prisma.ts              # Prisma client re-export
│   │   ├── timezones.ts           # Timezone data and utilities
│   │   ├── timeUtils.ts           # Time formatting, DST detection, offset calc
│   │   ├── twilio.ts              # Twilio SMS integration
│   │   ├── utils.ts               # cn() classname helper (clsx + tailwind-merge)
│   │   └── migrations/            # Settings migration utilities
│   └── services/
│       └── AlarmSound.ts          # Web Audio API alarm sound generator
├── next.config.js                 # Images, rewrites, security headers
├── tailwind.config.ts             # Custom theme, xs breakpoint, forms plugin
├── tsconfig.json                  # TypeScript 5.9, strict mode, path aliases
├── jest.config.js                 # Jest + jsdom test config
├── MAINTENANCE.md                 # Scheduled maintenance tasks
└── package.json                   # Dependencies & scripts
```

---

## Getting Started

### Prerequisites

- **Node.js 20+**
- **npm**
- **PostgreSQL** database (Neon recommended for serverless compatibility)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd timeio-1

# Install dependencies (also runs prisma generate via postinstall hook)
npm install

# Copy and configure environment variables
cp .env.example .env.local
# Edit .env.local with your database URL, auth secrets, etc.

# Push database schema to your PostgreSQL instance
npx prisma db push

# Start development server (auto-kills any existing process on port 3000)
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (kills port 3000 first) |
| `npm run build` | Production build with 4GB memory limit |
| `npm run build:with-db` | Build + push schema to database |
| `npm run start` | Run production server |
| `npm run lint` | ESLint check |
| `npm run test` | Run Jest tests |
| `npm run test:watch` | Jest in watch mode |

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Database (Neon PostgreSQL - pooled connection string)
DATABASE_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require"

# NextAuth.js
NEXTAUTH_SECRET="generate-a-random-secret"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Google Analytics 4
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Algolia Search (optional — fallback uses PostgreSQL search)
NEXT_PUBLIC_ALGOLIA_APP_ID="your-app-id"
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY="your-search-key"

# Twilio SMS (optional)
TWILIO_ACCOUNT_SID="your-sid"
TWILIO_AUTH_TOKEN="your-token"
TWILIO_PHONE_NUMBER="+1234567890"
```

All environment variables must also be set in the **Vercel dashboard** (Project Settings > Environment Variables) for production.

---

## Database

### Provider

PostgreSQL hosted on **Neon** (serverless). Connection pooling is handled by `@prisma/adapter-pg` with the `pg` driver.

### Schema (10 Models)

| Model | Purpose |
|-------|---------|
| **User** | Registered users — name, email, hashed password, phone, timezone |
| **Account** | OAuth provider links (Google) — NextAuth standard |
| **Session** | Active session tokens — NextAuth standard |
| **VerificationToken** | Email verification — NextAuth standard |
| **Alarm** | User's active alarms — hours, minutes, label, sound, repeat days, enabled state |
| **ArchivedAlarm** | Soft-deleted alarms — preserved for audit trail with archival reason |
| **UserTimeZone** | User's tracked cities — cityId, name, country, offset, custom sort order |
| **UserSettings** | Preferences — 24h format, theme, clock style, date format, sort order, color scheme |
| **AuthEvent** | Auth analytics — event type, provider, user agent, IP, error codes |
| **GeoCity** | 11M+ cities from GeoNames — name, country, timezone, lat/lng, population, feature code |

### Key Indexes on GeoCity

- `asciiName` — primary search field for ILIKE prefix/substring queries
- `population DESC` — sort results by city size
- `countryCode`, `continent`, `timezone` — filtering dimensions

### Common Prisma Commands

```bash
npx prisma db push        # Sync schema to database (no migration files)
npx prisma generate        # Regenerate Prisma client
npx prisma studio          # Open visual database browser
npx prisma migrate dev     # Create a new migration (development only)
```

---

## Deployment

### Vercel (Primary — Production)

Time.IO deploys to **Vercel** and is live at **https://time.io**.

**Workflow:**

1. Push commits to the `main` branch on GitHub
2. Vercel detects the push and triggers an automatic build
3. Build runs: `npm install` (triggers `prisma generate`) then `next build`
4. Output is deployed to Vercel's global edge network
5. Domain `time.io` resolves via CNAME to Vercel

**Vercel Configuration:**
- **Project ID:** `prj_JH5eOr0EV8StgNRci7z15WygRXz1`
- **Team:** `william-mushs-projects`
- **Node.js:** 20
- **Framework:** Next.js (auto-detected)
- **Build command:** `npm run build` (includes prisma generate + next build with 4GB heap)
- **Output:** `.next`

**Important:** All environment variables from `.env.local` must be configured in Vercel's dashboard for the production deployment.

---

## API Reference

All routes are in `src/app/api/`. See [docs/API.md](docs/API.md) for complete request/response documentation.

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/[...nextauth]` | GET/POST | No | NextAuth handler (signin, signout, session, callbacks) |
| `/api/auth/signup` | POST | No | Register with email + password |
| `/api/auth/send-code` | POST | No | Send SMS verification code via Twilio |
| `/api/auth/debug` | GET | No | Debug auth configuration (dev only) |
| `/api/search-cities?q=tokyo&limit=50` | GET | No | Fast city search (ILIKE on 11M+ GeoCity records) |
| `/api/time-zones` | GET | Yes | List user's tracked cities (ordered) |
| `/api/time-zones` | POST | Yes | Add a city to user's world clock |
| `/api/time-zones/[cityId]` | DELETE | Yes | Remove a city from world clock |
| `/api/alarms` | GET | Yes | List user's alarms |
| `/api/alarms` | POST | Yes | Create a new alarm |
| `/api/alarms` | PATCH | Yes | Update an alarm (toggle, edit) |
| `/api/settings` | GET | Yes | Get user's settings |
| `/api/settings` | PUT | Yes | Update user's settings |
| `/api/cities/top` | GET | No | Top 100 cities by population |
| `/api/cities/nearby?lat=X&lng=Y` | GET | No | Cities near coordinates |
| `/api/archived-alarms` | GET | Yes | Archived (deleted) alarm history |
| `/api/user` | GET | Yes | Current user profile |
| `/api/admin/auth-stats` | GET | Yes | Auth event analytics |
| `/api/sitemap` | GET | No | XML sitemap index |
| `/api/sitemap/cities/[page]` | GET | No | Paginated city sitemap (66,866+ URLs) |

---

## Authentication

### Providers

1. **Google OAuth** — One-click sign in via Google account, automatic profile sync
2. **Email/Password** — Registration at `/auth/signup`, passwords hashed with bcryptjs

### How It Works

- **JWT sessions** with 30-day expiry (no server-side session table used at runtime)
- Prisma adapter persists `User` and `Account` records to PostgreSQL
- Protected API routes validate sessions via `getServerSession()`
- Settings and data (alarms, tracked cities) sync across devices for authenticated users
- Unauthenticated users can still use the app with localStorage-based settings

### Auth Event Logging

Every authentication event is recorded in the `AuthEvent` table:
- **Types:** `signin_success`, `signin_failure`, `signup`, `signout`
- **Data captured:** provider, user agent, IP address, error codes
- **Indexed** by type + timestamp and userId + timestamp for fast analytics queries

---

## Maintenance

See [MAINTENANCE.md](MAINTENANCE.md) for scheduled maintenance tasks, including tracking the `@react-three/fiber` v9 beta upgrade.

---

## Related Documentation

| Document | Description |
|----------|-------------|
| [docs/API.md](docs/API.md) | Complete API route reference with request/response details |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Architecture overview, data flow, component hierarchy, design decisions |
| [docs/FEATURES.md](docs/FEATURES.md) | Detailed feature descriptions and implementation notes |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Step-by-step Vercel deployment guide |
