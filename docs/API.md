# Time.IO — API Reference

All API routes live under `src/app/api/` and use the Next.js App Router route handler convention (`route.ts` files).

---

## Authentication Routes

### `POST /api/auth/[...nextauth]`

NextAuth.js catch-all handler. Manages OAuth flows, credential login, session tokens, and signout.

- **Providers:** Google OAuth, Email/Password credentials
- **Session strategy:** JWT (30-day expiry)
- **Callbacks:** Custom `jwt` and `session` callbacks to include user ID in tokens
- **Configuration:** `src/lib/auth.ts`

### `POST /api/auth/signup`

Register a new user with email and password.

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "phoneNumber": "+1234567890"  // optional
}
```

**Response (201):**
```json
{
  "user": {
    "id": "cuid...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Errors:**
- `400` — Missing required fields
- `409` — Email already registered

### `POST /api/auth/send-code`

Send an SMS verification code to a phone number via Twilio.

**Request body:**
```json
{
  "phoneNumber": "+1234567890"
}
```

### `GET /api/auth/debug`

Returns current auth configuration details. Development/debugging use only.

---

## City Search

### `GET /api/search-cities`

Fast city search across 11M+ GeoCity records in PostgreSQL.

**Query parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `q` | string | required | Search query (city name) |
| `limit` | number | 20 | Max results to return (max 50) |

**Search strategy:**
1. First tries ILIKE prefix match (`asciiName ILIKE 'query%'`)
2. Falls back to substring match (`asciiName ILIKE '%query%'`) if no prefix results
3. Results sorted by population descending (most popular cities first)

**Response (200):**
```json
[
  {
    "geonameid": 1850147,
    "name": "Tokyo",
    "asciiName": "Tokyo",
    "countryCode": "JP",
    "country": "Japan",
    "timezone": "Asia/Tokyo",
    "latitude": 35.6895,
    "longitude": 139.6917,
    "population": 8336599,
    "continent": "Asia",
    "admin1": "40"
  }
]
```

**Example:** `GET /api/search-cities?q=tokyo&limit=10`

---

## User Timezone Management

All timezone endpoints require authentication via `getServerSession()`.

### `GET /api/time-zones`

List the authenticated user's tracked cities, ordered by the `order` field.

**Response (200):**
```json
[
  {
    "id": "cuid...",
    "cityId": "tokyo",
    "cityName": "Tokyo",
    "country": "Japan",
    "offset": 9.0,
    "region": "Asia",
    "order": 0
  }
]
```

### `POST /api/time-zones`

Add a city to the user's world clock.

**Request body:**
```json
{
  "cityId": "tokyo",
  "cityName": "Tokyo",
  "country": "Japan",
  "offset": 9.0,
  "region": "Asia"
}
```

**Response (201):** The created `UserTimeZone` object.

**Errors:**
- `401` — Not authenticated
- `409` — City already tracked (unique constraint on userId + cityId)

### `DELETE /api/time-zones/[cityId]`

Remove a city from the user's world clock.

**Response (200):**
```json
{ "success": true }
```

---

## Alarms

All alarm endpoints require authentication.

### `GET /api/alarms`

List all alarms for the authenticated user.

**Response (200):**
```json
[
  {
    "id": "cuid...",
    "hours": 7,
    "minutes": 30,
    "label": "Wake up",
    "sound": "classic",
    "isEnabled": true,
    "repeatDays": [1, 2, 3, 4, 5],
    "lastTriggered": null
  }
]
```

### `POST /api/alarms`

Create a new alarm.

**Request body:**
```json
{
  "hours": 7,
  "minutes": 30,
  "label": "Wake up",
  "sound": "classic",
  "repeatDays": [1, 2, 3, 4, 5]
}
```

**Fields:**
- `hours` (0-23) — Hour in 24h format
- `minutes` (0-59) — Minute
- `label` (string, optional) — Alarm label
- `sound` (string) — Sound type (classic, digital, gentle, etc.)
- `repeatDays` (int[]) — Days of week (0=Sunday through 6=Saturday), empty for one-time

### `PATCH /api/alarms`

Update an existing alarm (toggle enabled, change time, etc.).

**Request body:**
```json
{
  "id": "cuid...",
  "isEnabled": false
}
```

### `DELETE /api/alarms` (via PATCH with delete flag, or archive)

When an alarm is deleted, it is moved to the `ArchivedAlarm` table rather than permanently removed.

---

## Archived Alarms

### `GET /api/archived-alarms`

List the authenticated user's archived (deleted) alarms.

**Response (200):**
```json
[
  {
    "id": "cuid...",
    "hours": 7,
    "minutes": 30,
    "label": "Old alarm",
    "reason": "deleted",
    "archivedAt": "2025-01-15T10:30:00Z"
  }
]
```

---

## User Settings

### `GET /api/settings`

Get the authenticated user's preferences.

**Response (200):**
```json
{
  "format24Hour": false,
  "showSeconds": true,
  "showMilliseconds": false,
  "timeZone": "America/New_York",
  "dateFormat": "MM/dd/yyyy",
  "defaultClockCount": 3,
  "sortOrder": "timezone",
  "theme": "dark",
  "clockStyle": "digital",
  "colorScheme": "blue"
}
```

### `PUT /api/settings`

Update user settings. Accepts a partial object — only include fields to change.

**Request body:**
```json
{
  "format24Hour": true,
  "theme": "dark"
}
```

---

## User Profile

### `GET /api/user`

Get the authenticated user's profile information.

**Response (200):**
```json
{
  "id": "cuid...",
  "name": "John Doe",
  "email": "john@example.com",
  "image": "https://lh3.googleusercontent.com/...",
  "timezone": "UTC"
}
```

---

## Public City Data

### `GET /api/cities/top`

Returns the top 100 cities worldwide sorted by population.

**Response (200):** Array of city objects with name, country, timezone, population, coordinates.

### `GET /api/cities/nearby`

Find cities near given coordinates.

**Query parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `lat` | number | Latitude |
| `lng` | number | Longitude |
| `limit` | number | Max results (default 10) |

---

## Admin

### `GET /api/admin/auth-stats`

Authentication analytics dashboard data. Requires authentication.

Returns aggregated counts of auth events (signins, signups, failures) grouped by type, provider, and time period.

---

## Sitemap

### `GET /api/sitemap`

Returns an XML sitemap index. Also served at `/sitemap.xml` via Next.js rewrite.

### `GET /api/sitemap/cities/[page]`

Paginated city sitemap. Each page contains up to ~1,000 city URLs for a total of 66,866+ indexed pages.

---

## Error Handling

All API routes follow consistent error patterns:

| Status | Meaning |
|--------|---------|
| `200` | Success |
| `201` | Created |
| `400` | Bad request (missing/invalid parameters) |
| `401` | Not authenticated (missing or invalid session) |
| `404` | Resource not found |
| `409` | Conflict (duplicate resource) |
| `500` | Internal server error |

Error responses include a JSON body:
```json
{
  "error": "Description of what went wrong"
}
```
