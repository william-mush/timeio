import { USCity } from '@/data/usCities';

export interface TimeInfo {
  currentTime: string;
  timeZone: string;
  isDST: boolean;
  utcOffset: string;
  timeZoneName: string;
}

// Get current time information for a city
export function getCityTimeInfo(city: USCity): TimeInfo {
  const now = new Date();
  
  // Create Intl.DateTimeFormat for the city's timezone
  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: city.timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: city.timezone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Get current time in city's timezone
  const currentTime = timeFormatter.format(now);
  const currentDate = dateFormatter.format(now);

  // Determine if DST is in effect
  const isDST = isDaylightSavingTime(now, city.timezone);

  // Get timezone offset
  const utcOffset = getTimezoneOffset(now, city.timezone);

  // Get timezone name
  const timeZoneName = getTimezoneName(city.timezone, isDST);

  return {
    currentTime: `${currentDate} at ${currentTime}`,
    timeZone: city.timezone,
    isDST,
    utcOffset,
    timeZoneName,
  };
}

// Check if DST is currently in effect for a timezone
export function isDaylightSavingTime(date: Date, timezone: string): boolean {
  // Get the timezone offset in January (standard time)
  const januaryOffset = getTimezoneOffsetMinutes(new Date(date.getFullYear(), 0, 1), timezone);
  
  // Get the timezone offset in July (likely DST if applicable)
  const julyOffset = getTimezoneOffsetMinutes(new Date(date.getFullYear(), 6, 1), timezone);
  
  // Get current offset
  const currentOffset = getTimezoneOffsetMinutes(date, timezone);
  
  // If January and July offsets are different, DST is observed
  if (januaryOffset !== julyOffset) {
    // DST is in effect if current offset matches the summer offset
    return currentOffset === Math.min(januaryOffset, julyOffset);
  }
  
  // No DST observed in this timezone
  return false;
}

// Get timezone offset in minutes
function getTimezoneOffsetMinutes(date: Date, timezone: string): number {
  const utc = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  const local = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
  return (local.getTime() - utc.getTime()) / (1000 * 60);
}

// Get formatted timezone offset (e.g., "UTC-8", "UTC+5")
export function getTimezoneOffset(date: Date, timezone: string): string {
  const offsetMinutes = getTimezoneOffsetMinutes(date, timezone);
  const offsetHours = offsetMinutes / 60;
  
  if (offsetHours === 0) return 'UTC+0';
  
  const sign = offsetHours > 0 ? '+' : '';
  const hours = Math.floor(Math.abs(offsetHours));
  const minutes = Math.abs(offsetMinutes) % 60;
  
  if (minutes === 0) {
    return `UTC${sign}${offsetHours}`;
  } else {
    return `UTC${sign}${hours}:${minutes.toString().padStart(2, '0')}`;
  }
}

// Get timezone display name
export function getTimezoneName(timezone: string, isDST: boolean): string {
  // Common US timezone mappings
  const timezoneNames: Record<string, { standard: string; daylight: string }> = {
    'America/New_York': { standard: 'EST', daylight: 'EDT' },
    'America/Chicago': { standard: 'CST', daylight: 'CDT' },
    'America/Denver': { standard: 'MST', daylight: 'MDT' },
    'America/Los_Angeles': { standard: 'PST', daylight: 'PDT' },
    'America/Phoenix': { standard: 'MST', daylight: 'MST' }, // Arizona doesn't observe DST
    'America/Anchorage': { standard: 'AKST', daylight: 'AKDT' },
    'Pacific/Honolulu': { standard: 'HST', daylight: 'HST' }, // Hawaii doesn't observe DST
    'America/Detroit': { standard: 'EST', daylight: 'EDT' },
    'America/Indiana/Indianapolis': { standard: 'EST', daylight: 'EDT' },
    'America/Boise': { standard: 'MST', daylight: 'MDT' },
  };

  const names = timezoneNames[timezone];
  if (names) {
    return isDST ? names.daylight : names.standard;
  }

  // Fallback: try to determine from timezone string
  const parts = timezone.split('/');
  const city = parts[parts.length - 1].replace(/_/g, ' ');
  return `${city} Time`;
}

// Format time for display
export function formatTimeDisplay(timeInfo: TimeInfo): {
  time: string;
  date: string;
  timezone: string;
  dstStatus: string;
} {
  const [datePart, timePart] = timeInfo.currentTime.split(' at ');
  
  return {
    time: timePart,
    date: datePart,
    timezone: `${timeInfo.timeZoneName} (${timeInfo.utcOffset})`,
    dstStatus: timeInfo.isDST 
      ? 'Currently observing Daylight Saving Time' 
      : 'Currently on Standard Time'
  };
}

// Get time zone abbreviation for common US timezones
export function getTimezoneAbbreviation(timezone: string, isDST: boolean): string {
  const abbreviations: Record<string, { standard: string; daylight: string }> = {
    'America/New_York': { standard: 'EST', daylight: 'EDT' },
    'America/Chicago': { standard: 'CST', daylight: 'CDT' },
    'America/Denver': { standard: 'MST', daylight: 'MDT' },
    'America/Los_Angeles': { standard: 'PST', daylight: 'PDT' },
    'America/Phoenix': { standard: 'MST', daylight: 'MST' },
    'America/Anchorage': { standard: 'AKST', daylight: 'AKDT' },
    'Pacific/Honolulu': { standard: 'HST', daylight: 'HST' },
    'America/Detroit': { standard: 'EST', daylight: 'EDT' },
    'America/Indiana/Indianapolis': { standard: 'EST', daylight: 'EDT' },
    'America/Boise': { standard: 'MST', daylight: 'MDT' },
  };

  const abbrev = abbreviations[timezone];
  if (abbrev) {
    return isDST ? abbrev.daylight : abbrev.standard;
  }

  return 'Local Time';
}

// Update time every second
export function createTimeUpdater(
  callback: (timeInfo: TimeInfo) => void,
  city: USCity
): ReturnType<typeof setInterval> {
  const updateTime = () => {
    callback(getCityTimeInfo(city));
  };

  // Update immediately
  updateTime();

  // Then update every second
  return setInterval(updateTime, 1000);
}