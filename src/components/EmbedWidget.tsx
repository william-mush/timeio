'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

interface EmbedWidgetProps {
  cityName: string;
  timezone: string;
  countryCode: string;
}

export function EmbedWidget({ cityName, timezone, countryCode }: EmbedWidgetProps) {
  const searchParams = useSearchParams();

  const theme = (searchParams.get('theme') === 'dark' ? 'dark' : 'light') as 'light' | 'dark';
  const format = (searchParams.get('format') === '24h' ? '24h' : '12h') as '12h' | '24h';
  const showDate = searchParams.get('showDate') !== 'false';
  const showSeconds = searchParams.get('showSeconds') !== 'false';

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeFormatter = useMemo(() => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: format === '12h',
    };
    if (showSeconds) {
      options.second = '2-digit';
    }
    return new Intl.DateTimeFormat('en-US', options);
  }, [timezone, format, showSeconds]);

  const dateFormatter = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, [timezone]);

  const tzAbbrevFormatter = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'short',
    });
  }, [timezone]);

  const timeString = timeFormatter.format(now);
  const dateString = showDate ? dateFormatter.format(now) : '';

  // Extract timezone abbreviation (e.g., "EST", "PST")
  const tzParts = tzAbbrevFormatter.formatToParts(now);
  const tzAbbrev = tzParts.find(p => p.type === 'timeZoneName')?.value ?? '';

  const isDark = theme === 'dark';

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        color: isDark ? '#f9fafb' : '#111827',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        margin: 0,
        padding: '12px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* City name */}
      <div
        style={{
          fontSize: 'clamp(11px, 2.5vw, 14px)',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: isDark ? '#9ca3af' : '#6b7280',
          marginBottom: '2px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '100%',
        }}
      >
        {cityName}, {countryCode.toUpperCase()}
      </div>

      {/* Time */}
      <div
        style={{
          fontSize: 'clamp(28px, 8vw, 56px)',
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        {timeString}
      </div>

      {/* Date */}
      {showDate && (
        <div
          style={{
            fontSize: 'clamp(10px, 2.2vw, 13px)',
            color: isDark ? '#9ca3af' : '#6b7280',
            marginTop: '4px',
          }}
        >
          {dateString}
        </div>
      )}

      {/* Timezone abbreviation */}
      <div
        style={{
          fontSize: 'clamp(9px, 2vw, 11px)',
          fontWeight: 600,
          color: isDark ? '#6b7280' : '#9ca3af',
          marginTop: '2px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {tzAbbrev}
      </div>

      {/* time.io branding link */}
      <a
        href="https://time.io"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'absolute',
          bottom: '4px',
          right: '8px',
          fontSize: '9px',
          color: isDark ? '#4b5563' : '#d1d5db',
          textDecoration: 'none',
          fontWeight: 500,
          letterSpacing: '0.02em',
        }}
      >
        time.io
      </a>
    </div>
  );
}
