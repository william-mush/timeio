import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getWebPush } from '@/lib/webpush';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function GET(req: Request) {
  // Verify cron secret (Vercel sends this automatically for cron jobs)
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const alarms = await prisma.alarm.findMany({
      where: { isEnabled: true },
      include: {
        user: {
          include: { pushSubscriptions: true },
        },
      },
    });

    let triggered = 0;
    let pushSent = 0;
    const expiredEndpoints: string[] = [];

    for (const alarm of alarms) {
      // Get current time in the alarm's timezone
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: alarm.timezone || 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        weekday: 'short',
        hour12: false,
      });
      const parts = formatter.formatToParts(now);
      const currentHour = parseInt(parts.find(p => p.type === 'hour')?.value || '0');
      const currentMinute = parseInt(parts.find(p => p.type === 'minute')?.value || '0');
      const weekdayStr = parts.find(p => p.type === 'weekday')?.value || '';

      // Map weekday string to number (0=Sun, 1=Mon, ..., 6=Sat)
      const weekdayMap: Record<string, number> = {
        Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
      };
      const currentDay = weekdayMap[weekdayStr] ?? new Date().getDay();

      // Check if alarm matches current time
      if (alarm.hours !== currentHour || alarm.minutes !== currentMinute) {
        continue;
      }

      // Check repeat days
      if (alarm.repeatDays.length > 0 && !alarm.repeatDays.includes(currentDay)) {
        continue;
      }

      // Dedup: skip if triggered within the last 60 seconds
      if (alarm.lastTriggered) {
        const elapsed = now.getTime() - new Date(alarm.lastTriggered).getTime();
        if (elapsed < 60_000) {
          continue;
        }
      }

      // Send push to all user subscriptions
      const subscriptions = alarm.user.pushSubscriptions;
      for (const sub of subscriptions) {
        try {
          await getWebPush().sendNotification(
            {
              endpoint: sub.endpoint,
              keys: { p256dh: sub.p256dh, auth: sub.auth },
            },
            JSON.stringify({
              title: `Alarm: ${alarm.label || 'Alarm'}`,
              body: `It's ${alarm.hours.toString().padStart(2, '0')}:${alarm.minutes.toString().padStart(2, '0')}`,
              url: '/alarms',
              sound: alarm.sound,
              alarmId: alarm.id,
              label: alarm.label || 'Alarm',
            })
          );
          pushSent++;
        } catch (err: unknown) {
          const pushErr = err as { statusCode?: number };
          if (pushErr.statusCode === 410 || pushErr.statusCode === 404) {
            expiredEndpoints.push(sub.endpoint);
          } else {
            console.error(`Push failed for ${sub.endpoint}:`, err);
          }
        }
      }

      // Update lastTriggered
      await prisma.alarm.update({
        where: { id: alarm.id },
        data: { lastTriggered: now },
      });

      // Disable non-repeating alarms after trigger
      if (alarm.repeatDays.length === 0) {
        await prisma.alarm.update({
          where: { id: alarm.id },
          data: { isEnabled: false },
        });
      }

      triggered++;
    }

    // Check for snoozed alarms that are due
    let snoozedTriggered = 0;
    const snoozedAlarms = await prisma.alarm.findMany({
      where: {
        snoozeUntil: { not: null, lte: new Date() },
      },
      include: {
        user: {
          include: { pushSubscriptions: true },
        },
      },
    });

    for (const alarm of snoozedAlarms) {
      const subscriptions = alarm.user.pushSubscriptions;
      for (const sub of subscriptions) {
        try {
          await getWebPush().sendNotification(
            {
              endpoint: sub.endpoint,
              keys: { p256dh: sub.p256dh, auth: sub.auth },
            },
            JSON.stringify({
              title: `Snoozed: ${alarm.label || 'Alarm'}`,
              body: `It's ${alarm.hours.toString().padStart(2, '0')}:${alarm.minutes.toString().padStart(2, '0')}`,
              url: '/alarms',
              sound: alarm.sound,
              alarmId: alarm.id,
              label: alarm.label || 'Alarm',
            })
          );
          pushSent++;
        } catch (err: unknown) {
          const pushErr = err as { statusCode?: number };
          if (pushErr.statusCode === 410 || pushErr.statusCode === 404) {
            expiredEndpoints.push(sub.endpoint);
          } else {
            console.error(`Push failed for snoozed alarm ${sub.endpoint}:`, err);
          }
        }
      }

      // Clear snoozeUntil and update lastTriggered
      await prisma.alarm.update({
        where: { id: alarm.id },
        data: { snoozeUntil: null, lastTriggered: new Date() },
      });

      snoozedTriggered++;
    }

    // Clean up expired subscriptions
    if (expiredEndpoints.length > 0) {
      await prisma.pushSubscription.deleteMany({
        where: { endpoint: { in: expiredEndpoints } },
      });
    }

    return NextResponse.json({
      ok: true,
      alarmsChecked: alarms.length,
      triggered,
      snoozedTriggered,
      pushSent,
      expiredCleaned: expiredEndpoints.length,
    });
  } catch (error) {
    console.error('Cron check-alarms failed:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
