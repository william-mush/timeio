// Service Worker for Web Push Notifications + Offline Caching

const CACHE_NAME = 'timeio-v1';

const APP_SHELL_URLS = [
  '/',
  '/world-clock',
  '/alarms',
  '/timer',
  '/meeting-planner',
  '/cities',
];

// ---------------------------------------------------------------------------
// Install — precache the app shell and skip waiting
// ---------------------------------------------------------------------------
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL_URLS))
  );
  self.skipWaiting();
});

// ---------------------------------------------------------------------------
// Activate — purge old caches and claim clients
// ---------------------------------------------------------------------------
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

// ---------------------------------------------------------------------------
// Fetch — offline caching strategies
// ---------------------------------------------------------------------------
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Don't cache non-GET requests
  if (request.method !== 'GET') return;

  // Don't intercept Chrome extension requests
  if (request.url.startsWith('chrome-extension://')) return;

  const url = new URL(request.url);

  // Skip /api/ routes — let them go to network normally
  // (edge caching handles API responses, not the SW)
  if (url.pathname.startsWith('/api/')) return;

  // --- Cache-first: static assets ---
  if (/\.(js|css|woff2|png|jpg|ico|svg)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }

  // --- Network-first: HTML page navigations ---
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => {
            // Return the cached version of the requested page, or fall back
            // to the cached root page as an ultimate fallback
            return cached || caches.match('/');
          })
        )
    );
    return;
  }
});

// ---------------------------------------------------------------------------
// Push — show alarm notification
// ---------------------------------------------------------------------------
self.addEventListener('push', (event) => {
  if (!event.data) return;

  let data;
  try {
    data = event.data.json();
  } catch {
    data = { title: 'Alarm', body: event.data.text() };
  }

  const options = {
    body: data.body || 'Your alarm is ringing!',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [200, 100, 200, 100, 200],
    requireInteraction: true,
    tag: data.alarmId || 'alarm',
    renotify: true,
    actions: [
      { action: 'open', title: 'Open' },
      { action: 'snooze', title: 'Snooze (5 min)' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
    data: {
      url: data.url || '/alarms',
      sound: data.sound || null,
      alarmId: data.alarmId || null,
      label: data.label || null,
    },
  };

  if (data.sound) {
    options.sound = '/' + data.sound + '.mp3';
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'Alarm', options)
  );
});

// ---------------------------------------------------------------------------
// Notification Click — handle alarm actions
// ---------------------------------------------------------------------------
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  if (event.action === 'snooze') {
    const alarmId = event.notification.data?.alarmId;
    if (alarmId) {
      event.waitUntil(
        fetch('/api/alarms/snooze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ alarmId }),
        }).catch((err) => {
          console.error('Failed to snooze alarm:', err);
        })
      );
    }
    return;
  }

  const notifData = event.notification.data || {};
  const sound = notifData.sound || '';
  const alarmId = notifData.alarmId || '';
  const label = notifData.label || '';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Try to find an existing alarms tab and post a message to it
      for (const client of clientList) {
        if (client.url.includes('/alarms') && 'focus' in client) {
          return client.focus().then((focusedClient) => {
            if (focusedClient) {
              focusedClient.postMessage({
                type: 'ALARM_TRIGGER',
                sound: sound,
                alarmId: alarmId,
                label: label,
              });
            }
            return focusedClient;
          });
        }
      }
      // No existing tab found — open a new window with query params so the page
      // can pick up the alarm data on load
      const params = new URLSearchParams();
      if (sound) params.set('alarmSound', sound);
      if (alarmId) params.set('alarmId', alarmId);
      if (label) params.set('alarmLabel', label);
      const qs = params.toString();
      const openUrl = '/alarms' + (qs ? '?' + qs : '');
      return self.clients.openWindow(openUrl);
    })
  );
});
