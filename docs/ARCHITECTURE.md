# Time.IO — Architecture

This document describes the architecture of time.io, including data flow, component hierarchy, key design decisions, and how the layers connect.

---

## High-Level Architecture

```
┌──────────────────────────────────────────────────────┐
│                      Vercel CDN                       │
│                 (Edge Network / HTTPS)                 │
└──────────────────────┬───────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────┐
│                  Next.js 16 (App Router)              │
│                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐ │
│  │   Pages /    │  │   API       │  │  Static      │ │
│  │   Layouts    │  │   Routes    │  │  Assets      │ │
│  │  (SSR/CSR)   │  │  (Server)   │  │  (public/)   │ │
│  └──────┬──────┘  └──────┬──────┘  └──────────────┘ │
│         │                │                            │
│  ┌──────▼──────┐  ┌──────▼──────┐                    │
│  │  React 19   │  │  Prisma 7.2 │                    │
│  │  Components │  │   ORM       │                    │
│  └──────┬──────┘  └──────┬──────┘                    │
│         │                │                            │
│  ┌──────▼──────┐  ┌──────▼──────┐                    │
│  │  Client     │  │  @prisma/   │                    │
│  │  State      │  │  adapter-pg │                    │
│  │ (localStorage│  └──────┬──────┘                    │
│  │  + Context)  │         │                           │
│  └─────────────┘  ┌──────▼──────┐                    │
│                   │  Neon        │                    │
│                   │  PostgreSQL  │                    │
│                   │  (Serverless)│                    │
│                   └─────────────┘                    │
└──────────────────────────────────────────────────────┘
```

---

## Framework: Next.js App Router

The application uses the **Next.js App Router** (not Pages Router). All routes live under `src/app/`.

### Rendering Strategy

| Route Type | Strategy | Examples |
|-----------|----------|---------|
| Homepage | Client-side (`'use client'`) | Real-time clock, animations |
| Feature pages | Client-side | World Clock, Alarms, Solar Clock, Settings |
| City browse pages | Server-side / Static | `/cities`, `/us-cities`, `/us-counties` |
| API routes | Server-side | All `/api/*` handlers |
| Auth pages | Client-side | `/auth/signin`, `/auth/signup` |

Most interactive pages use `'use client'` because they require real-time updates (clocks updating every second), browser APIs (Web Audio, Notifications), or client state (localStorage).

### Layout Hierarchy

```
RootLayout (src/app/layout.tsx)
├── <html> with suppressHydrationWarning (for theme flash)
├── JSON-LD structured data script
├── <Analytics /> (Vercel Analytics, lazy)
├── <SessionProvider> (NextAuth)
│   └── <ThemeProvider> (light/dark/system)
│       ├── <QuickSearch /> (Cmd+K palette, global)
│       └── <ClientLayout>
│           ├── <Navigation /> (fixed header)
│           ├── <main>{children}</main>
│           └── <Footer />
```

---

## Data Layer

### Database (PostgreSQL on Neon)

The database connection uses Prisma 7.2 with the `@prisma/adapter-pg` driver adapter for Neon's connection pooling. This is configured in `src/lib/db.ts`:

```
Pool (pg) → PrismaPg adapter → PrismaClient
```

The connection is pooled and reused across serverless function invocations via a global singleton pattern.

### Static Data Files (`src/data/`)

Large static datasets are bundled as TypeScript files rather than queried from the database at runtime:

| File | Records | Purpose |
|------|---------|---------|
| `cities.ts` | ~100 | Quick reference for world clock defaults |
| `world-cities.ts` | 1,938 | City Time converter options |
| `us-cities.ts` | 500+ | US Cities pages |
| `us-counties.ts` | 3,143+ | US Counties pages |
| `landmarks.ts` | ~50 | Map landmark pins |
| `luxuryTimepieces.ts` | ~30 | Watch catalog |

The `GeoCity` table (11M+ records) is only queried via the `/api/search-cities` endpoint for user-initiated searches.

### Search Architecture

City search uses a **tiered PostgreSQL strategy**:

1. **Prefix match** — `SELECT * FROM geo_cities WHERE "asciiName" ILIKE $1 || '%' ORDER BY population DESC LIMIT $2`
2. **Substring fallback** — `SELECT * FROM geo_cities WHERE "asciiName" ILIKE '%' || $1 || '%' ORDER BY population DESC LIMIT $2`

Results are always sorted by population so the most relevant cities appear first. Raw SQL with parameterized queries is used for performance (bypassing Prisma's query builder overhead).

---

## Component Architecture

### Navigation (`Navigation.tsx`)

The header is a fixed element with:
- **Desktop:** Logo + direct links (World Clock, Cities, City Time) + "More" dropdown + Alarms + Settings + Theme toggle + live clock + user menu
- **Mobile:** Hamburger menu with categorized sections (Time Tools, Explore Cities, Discover)

Navigation groups are defined as data arrays (`locationItems`, `exploreItems`, `mobileMenuCategories`) and rendered dynamically.

### Theme System

Three-layer theme approach:

1. **CSS variables** in `globals.css` — define colors for `[data-theme="light"]` and `[data-theme="dark"]`
2. **ThemeProvider** (React Context) — manages current theme state, reads system preference via `matchMedia`, persists to `localStorage`
3. **Tailwind `dark:` classes** — components use Tailwind's dark mode variant throughout

Theme changes are also broadcast via `CustomEvent('timeSettingsChanged')` so components like the nav clock can react without re-rendering the entire tree.

### Settings Synchronization

Settings follow a **dual-storage pattern**:

- **Unauthenticated users:** Settings stored in `localStorage` under the key `timeSettings`
- **Authenticated users:** Settings stored in the `UserSettings` database table AND mirrored to `localStorage`

When a user signs in, their database settings are loaded and written to localStorage. When settings change, both stores are updated. This ensures the app works offline and for anonymous users while providing cross-device sync for accounts.

### Alarm System

```
User creates alarm
  → POST /api/alarms (saves to DB)
  → Component polls every 1 second
  → When current time matches alarm:
      → AlarmSound.ts generates audio via Web Audio API
      → Browser Notification.requestPermission() → Notification shown
      → lastTriggered timestamp updated
  → On delete: alarm moved to ArchivedAlarm table
```

Sound generation uses the **Web Audio API** with oscillator nodes (sine, square, sawtooth waveforms) rather than audio files, keeping the bundle size zero for alarm sounds.

---

## Authentication Flow

```
User clicks "Sign In"
  → /auth/signin page loads
  → Option A: Google OAuth
      → Redirect to Google → callback → NextAuth creates/links Account + User
  → Option B: Email/Password
      → POST credentials to NextAuth authorize()
      → bcryptjs.compare() validates password
      → JWT token issued (30-day expiry)
  → Session available via useSession() (client) or getServerSession() (server)
  → Auth event logged to AuthEvent table
```

### Protected Routes

API routes check authentication with:
```typescript
const session = await getServerSession(authOptions);
if (!session?.user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

There is no middleware-based route protection — pages are accessible to everyone, but data-fetching API calls require authentication.

---

## SEO Architecture

### Metadata

Each page exports a `metadata` object or `generateMetadata()` function:
- `title` uses the template `%s | Time.IO`
- `description` is page-specific
- Open Graph and Twitter card data included
- Canonical URLs set

### Structured Data

The root layout includes JSON-LD (`WebApplication` schema) in a `<script>` tag.

### Sitemap

`/sitemap.xml` rewrites to `/api/sitemap` which generates an XML sitemap index. City pages are paginated across `/api/sitemap/cities/[page]` routes, covering 66,866+ URLs.

### Google Verification

Google Search Console verification token is set in the root metadata:
```typescript
verification: { google: 'A3edmW2ty8WmjWG4-2ePkyHSdM3KiGI4Y41dmhJLClI' }
```

---

## Security

### HTTP Headers (next.config.js)

Applied to all routes via `headers()`:

| Header | Value | Purpose |
|--------|-------|---------|
| X-Frame-Options | DENY | Prevent clickjacking |
| X-Content-Type-Options | nosniff | Prevent MIME sniffing |
| X-XSS-Protection | 1; mode=block | Legacy XSS filter |
| Referrer-Policy | strict-origin-when-cross-origin | Control referrer leakage |
| Permissions-Policy | camera=(), microphone=(), geolocation=(self) | Restrict browser APIs |

### Authentication Security

- Passwords hashed with **bcryptjs** (adaptive hash, salt rounds configured)
- JWT secrets via `NEXTAUTH_SECRET` environment variable
- OAuth tokens stored encrypted in the `Account` table
- Session cookies are httpOnly, secure, sameSite

### Database Security

- All queries use **parameterized inputs** (no string interpolation)
- Prisma ORM prevents SQL injection by default
- Raw SQL queries in search use `$1`, `$2` parameter placeholders

---

## External Service Integrations

| Service | File | Purpose |
|---------|------|---------|
| **Neon PostgreSQL** | `src/lib/db.ts` | Primary database |
| **Google OAuth** | `src/lib/auth.ts` | Authentication provider |
| **Twilio** | `src/lib/twilio.ts` | SMS code delivery |
| **Vercel Analytics** | `src/components/Analytics.tsx` | Performance monitoring |
| **Google Analytics 4** | `src/components/GoogleAnalytics.tsx` | User behavior tracking |
| **jsdelivr CDN** | `WorldMap.tsx` | GeoJSON world map data |
| **Google Fonts** | `layout.tsx` | Inter font family |

---

## Build & Bundle

### Build Process

```
npm run build
  → NODE_OPTIONS='--max-old-space-size=4096'  (4GB heap for large static data)
  → prisma generate  (create Prisma client)
  → next build  (compile pages, API routes, static assets)
```

The 4GB memory limit is needed because the static data files (50,000+ US cities, 1,938 world cities, county data) are large TypeScript modules.

### Code Splitting

Next.js automatically code-splits by route. Heavy libraries are only loaded on pages that use them:
- **Three.js** — only on `/solar-clock-3d`
- **react-simple-maps** — only on `/world-map`
- **react-leaflet** — only when `CityMapLeaflet` is rendered
- **Framer Motion** — on pages with animations (homepage, transitions)

### Path Aliases

TypeScript path alias `@/*` maps to `./src/*`, configured in `tsconfig.json`.
