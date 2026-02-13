// Service Worker for Web Push Notifications

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

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
