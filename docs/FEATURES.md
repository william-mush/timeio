# Time.IO — Feature Documentation

Detailed descriptions of every feature in the application, how they work, and relevant implementation details.

---

## Homepage (`/`)

**File:** `src/app/page.tsx`

The landing page features:

1. **Hero section** — Large animated digital clock with the current local time, gradient background with animated radial pulses
2. **Smart search bar** — Database-powered city search (`SmartSearch.tsx` → `HomepageSearch.tsx`) that queries `/api/search-cities`
3. **Feature grid** — Two large primary cards (World Clock, Alarms) and four smaller cards (World Map, US Cities, Solar Clock, Time History)

All feature cards link to their respective routes and include hover animations (elevation, arrow slide).

---

## World Clock (`/world-clock`)

**Files:** `src/app/world-clock/page.tsx`, `src/components/WorldClock.tsx`, `src/components/CitySearch.tsx`

A personalized dashboard showing the current time in user-selected cities.

**Capabilities:**
- Add cities via search (queries the static `cities.ts` data or database)
- Remove cities with one click
- Real-time updates every second
- Respects 12/24-hour format preference
- Custom ordering (drag or manual reorder)
- Synced to database for authenticated users via `/api/time-zones`
- Falls back to localStorage for anonymous users

**Data source:** `src/data/cities.ts` (~100 major cities for the picker), user selections stored in `UserTimeZone` table.

---

## Alarms (`/alarms`)

**Files:** `src/app/alarms/page.tsx`, `src/components/Alarm.tsx`, `src/services/AlarmSound.ts`

A full-featured browser-based alarm clock.

**Capabilities:**
- Create alarms with hour, minute, label, and sound selection
- Repeat patterns — select specific days of the week (Mon-Fri, weekends, custom)
- Enable/disable toggle without deleting
- Browser notifications (requests `Notification.permission` on first use)
- Sound generation via Web Audio API oscillator nodes — no audio files needed
- Sound options: classic (sine wave), digital (square wave), gentle (sawtooth), and more
- Checks every 1 second against current time
- `lastTriggered` timestamp prevents duplicate firings
- When deleted, alarms are archived to `ArchivedAlarm` table with a reason field

**Authentication required:** Yes, for persistent storage. Anonymous users get in-memory alarms only.

---

## City Time (`/time-converter`)

**Files:** `src/app/time-converter/page.tsx`, `src/components/TimeZoneConverter.tsx`

Compare the current time across multiple cities simultaneously.

**Capabilities:**
- Select from 1,938 world cities (loaded from `src/data/world-cities.ts`)
- Side-by-side time display for selected cities
- Shows UTC offset, timezone abbreviation, and DST status
- Real-time updates
- Search and filter cities by name

**Note:** Previously named "Time Converter" — renamed to "City Time" in the nav for clarity.

---

## World Map (`/world-map`)

**Files:** `src/app/world-map/page.tsx`, `src/components/WorldMap.tsx`

An interactive SVG world map showing cities and timezone information.

**Capabilities:**
- Pan and zoom controls
- City markers at geographic coordinates
- Hover tooltips showing city name, timezone, and current time
- Built with react-simple-maps (renders TopoJSON geography data from jsdelivr CDN)
- d3-geo for geographic projections

**CDN dependency:** Map geometry data loaded from `cdn.jsdelivr.net` (added to CSP headers).

---

## Solar Clock (`/solar-clock`)

**Files:** `src/app/solar-clock/page.tsx`, `src/components/SolarClock.tsx`

A 2D animated visualization of the solar system showing planetary orbits and positions.

**Capabilities:**
- Animated orbital paths for planets
- Real-time rotation calculations
- Hover effects for planet information
- Responsive to window size
- Canvas/SVG rendering

---

## Solar Clock 3D (`/solar-clock-3d`)

**Files:** `src/app/solar-clock-3d/page.tsx`, `src/components/SolarClock3D.tsx`

A Three.js-powered 3D solar system visualization.

**Capabilities:**
- 3D planetary rendering with textures
- Orbital mechanics animation
- Interactive camera controls (orbit, zoom)
- Hover effects showing planet details
- Built with `@react-three/fiber` 9 beta and `@react-three/drei`

**Note:** Uses `// @ts-nocheck` due to incomplete JSX type definitions in the react-three-fiber beta. See [MAINTENANCE.md](../MAINTENANCE.md) for the upgrade tracking plan.

---

## Luxury Watches (`/luxury`)

**Files:** `src/app/luxury/page.tsx`, `src/components/LuxuryTimepieceCard.tsx`, `src/components/ImagePreview.tsx`, `src/components/PriceComparison.tsx`

A curated catalog of luxury timepieces.

**Capabilities:**
- Card grid displaying watch images, brand, model, and price
- Image carousel/preview for each watch
- Price comparison table showing market values
- Static data from `src/data/luxuryTimepieces.ts`

---

## Time History (`/history`)

**File:** `src/app/history/page.tsx`

An educational page tracing the evolution of timekeeping.

**Content covers:**
- Ancient methods (sundials, water clocks)
- Mechanical clocks and pendulums
- Marine chronometers and longitude
- Standard time zones and railroads
- Quartz revolution
- Atomic clocks and modern precision

---

## Browse Cities by Country (`/cities`)

**File:** `src/app/cities/page.tsx`

Browse time information organized by country and timezone.

**Capabilities:**
- 80+ countries listed with their timezones
- Links to individual timezone pages
- Organized by continent/region

---

## World Cities Search (`/world-cities`)

**File:** `src/app/world-cities/page.tsx`

Search interface for the full GeoNames city database.

**Capabilities:**
- Real-time search against 11M+ records via `/api/search-cities`
- Results sorted by population (most relevant first)
- Shows city name, country, timezone, population
- Fast prefix matching with substring fallback

---

## US Cities (`/us-cities`)

**Files:** `src/app/us-cities/page.tsx`, `src/app/us-cities/[slug]/page.tsx`

Browse and search all US cities with population over 24,000.

**Capabilities:**
- Main index page with all cities listed
- Filter by state or timezone
- Sort by population, name, or state
- Search by city name or state code
- Individual city pages at `/us-cities/[slug]` showing:
  - Real-time local clock
  - Population and geographic data
  - Timezone details with DST status
  - Coordinates (latitude/longitude)

**Data source:** `src/data/us-cities.ts` — includes population, coordinates, timezone, state, county.

---

## US Counties (`/us-counties`)

**Files:** `src/app/us-counties/page.tsx`, `src/app/us-counties/[slug]/page.tsx`

Browse all 3,143+ US counties.

**Capabilities:**
- Index page with all counties
- Filter by state, size category, population density
- Size categories: Very Large, Large, Medium, Small, Very Small
- Quick statistics dashboard
- Individual county pages showing:
  - Current local time
  - Population and density
  - FIPS code
  - Geographic/administrative info
  - Population ranking context

**Data source:** `src/data/us-counties.ts` — includes population, density, FIPS codes, coordinates, timezone.

---

## Dynamic Timezone Pages (`/timezone/[zone]`)

**File:** `src/app/timezone/[zone]/page.tsx`

Dedicated page for each IANA timezone identifier.

**Capabilities:**
- Current time in the timezone
- UTC offset (standard and DST)
- List of cities in this timezone
- SEO-optimized with dynamic metadata

**Example:** `/timezone/America/New_York`, `/timezone/Asia/Tokyo`

---

## City Time Difference (`/difference/[slug]`)

**File:** `src/app/difference/[slug]/page.tsx`

Compare time between two cities.

**Capabilities:**
- Shows current time in both cities
- Calculates hour/minute difference
- Indicates which city is ahead/behind
- Dynamic slug format (e.g., `new-york-to-london`)

---

## Settings (`/settings`)

**Files:** `src/app/settings/page.tsx`, `src/components/Settings.tsx`

User preferences panel.

**Options:**
| Setting | Values | Default |
|---------|--------|---------|
| Time format | 12-hour / 24-hour | 12-hour |
| Show seconds | On / Off | On |
| Show milliseconds | On / Off | Off |
| Timezone | Any IANA timezone | UTC |
| Date format | MM/dd/yyyy, dd/MM/yyyy, etc. | MM/dd/yyyy |
| Default clock count | 1-10 | 3 |
| Sort order | Name / Timezone / Added | Timezone |
| Theme | Light / Dark / System | Light |
| Clock style | Digital / Analog / Both | Digital |
| Color scheme | Blue / Purple / Green / Orange | Blue |

**Storage:** Dual storage — `localStorage` (all users) + `UserSettings` database table (authenticated users). Changes broadcast via `CustomEvent('timeSettingsChanged')`.

---

## Quick Search (`Cmd+K`)

**File:** `src/components/QuickSearch.tsx`

A global command palette accessible from any page.

**Capabilities:**
- Triggered by `Cmd+K` (Mac) or `Ctrl+K` (Windows)
- Built with `cmdk` library
- Searches cities and navigates to their timezone pages
- Fuzzy matching with keyboard navigation
- Available on every page (rendered in root layout)

---

## Authentication Pages

### Sign In (`/auth/signin`)

**Files:** `src/app/auth/signin/page.tsx`, `src/components/auth/SignInForm.tsx`

- Google OAuth button (one-click)
- Email + password form
- Error display for failed attempts
- Link to sign up page

### Sign Up (`/auth/signup`)

**Files:** `src/app/auth/signup/page.tsx`, `src/components/auth/SignUpForm.tsx`

- Name, email, password fields
- Optional phone number with validation (libphonenumber-js)
- Password hashed with bcryptjs before storage
- Redirects to sign in after successful registration

---

## Admin Dashboard (`/admin`)

**File:** `src/app/admin/page.tsx`

Authentication analytics dashboard.

**Displays:**
- Total signins, signups, failures
- Events by provider (Google vs email)
- Recent auth events timeline
- Data from `AuthEvent` table via `/api/admin/auth-stats`

---

## Theming

**Files:** `src/components/ThemeProvider.tsx`, `src/components/ThemeToggle.tsx`, `src/app/globals.css`

Three-mode theme system:

1. **Light** — White backgrounds, dark text
2. **Dark** — Dark gray/slate backgrounds, light text
3. **System** — Follows `prefers-color-scheme` media query

Implementation:
- `ThemeProvider` reads initial theme from localStorage, sets `data-theme` attribute on `<html>`
- `ThemeToggle` cycles through modes with icons (Sun/Moon/Monitor)
- CSS variables define color tokens for each theme
- Tailwind `dark:` classes handle component-level styling
- `suppressHydrationWarning` on `<html>` prevents flash-of-wrong-theme

---

## Analytics

### Vercel Analytics

**File:** `src/components/Analytics.tsx`

Automatic performance monitoring via `@vercel/analytics`. Loaded in a `<Suspense>` boundary in the root layout.

### Google Analytics 4

**File:** `src/components/GoogleAnalytics.tsx`

GA4 tracking script loaded via the `NEXT_PUBLIC_GA_ID` environment variable. Provides page view and event tracking.

### Auth Event Logging

**File:** `src/lib/auth-events.ts`

Custom logging that records every authentication event to the `AuthEvent` PostgreSQL table, enabling the admin dashboard.
