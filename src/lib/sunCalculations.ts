/**
 * Sun calculations based on astronomical algorithms
 * Based on sunrise-sunset-js library calculations
 */

export interface SunTimes {
  sunrise: Date;
  sunset: Date;
  dayLength: number; // in hours
  dayLengthFormatted: string; // formatted as "HH:MM"
}

function toRadians(degrees: number): number {
  return degrees * Math.PI / 180;
}

function toDegrees(radians: number): number {
  return radians * 180 / Math.PI;
}

function julianDay(date: Date): number {
  const a = Math.floor((14 - (date.getMonth() + 1)) / 12);
  const y = date.getFullYear() + 4800 - a;
  const m = (date.getMonth() + 1) + 12 * a - 3;
  
  return date.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function sunDeclination(julianDay: number): number {
  const n = julianDay - 2451545.0;
  const L = (280.460 + 0.9856474 * n) % 360;
  const g = toRadians((357.528 + 0.9856003 * n) % 360);
  const lambda = toRadians(L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g));
  
  const epsilon = toRadians(23.439 - 0.0000004 * n);
  return Math.asin(Math.sin(epsilon) * Math.sin(lambda));
}

function timeCorrection(julianDay: number, longitude: number): number {
  const n = julianDay - 2451545.0;
  const L = (280.460 + 0.9856474 * n) % 360;
  const g = toRadians((357.528 + 0.9856003 * n) % 360);
  const lambda = L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g);
  
  const alpha = toDegrees(Math.atan2(Math.cos(toRadians(23.439)) * Math.sin(toRadians(lambda)), Math.cos(toRadians(lambda))));
  let E = L - alpha;
  
  if (E > 180) E -= 360;
  if (E < -180) E += 360;
  
  return 4 * (longitude - E);
}

function hourAngle(latitude: number, declination: number): number {
  const latRad = toRadians(latitude);
  const cosHourAngle = -Math.tan(latRad) * Math.tan(declination);
  
  // Check for polar day or polar night
  if (cosHourAngle > 1) {
    return 0; // Polar night
  } else if (cosHourAngle < -1) {
    return Math.PI; // Polar day
  }
  
  return Math.acos(cosHourAngle);
}

export function calculateSunTimes(latitude: number, longitude: number, date: Date = new Date()): SunTimes {
  const jd = julianDay(date);
  const decl = sunDeclination(jd);
  const timeCorr = timeCorrection(jd, longitude);
  const hourAngleRad = hourAngle(latitude, decl);
  
  const hourAngleDeg = toDegrees(hourAngleRad);
  
  // Calculate sunrise and sunset times in decimal hours
  const sunriseTime = 12 - hourAngleDeg / 15 - timeCorr / 60;
  const sunsetTime = 12 + hourAngleDeg / 15 - timeCorr / 60;
  
  // Convert to Date objects
  const sunrise = new Date(date);
  const sunset = new Date(date);
  
  // Set hours and minutes
  const sunriseHours = Math.floor(sunriseTime);
  const sunriseMinutes = Math.floor((sunriseTime - sunriseHours) * 60);
  sunrise.setHours(sunriseHours, sunriseMinutes, 0, 0);
  
  const sunsetHours = Math.floor(sunsetTime);
  const sunsetMinutes = Math.floor((sunsetTime - sunsetHours) * 60);
  sunset.setHours(sunsetHours, sunsetMinutes, 0, 0);
  
  // Calculate day length in hours
  const dayLength = sunsetTime - sunriseTime;
  const dayLengthHours = Math.floor(dayLength);
  const dayLengthMinutes = Math.floor((dayLength - dayLengthHours) * 60);
  const dayLengthFormatted = `${dayLengthHours.toString().padStart(2, '0')}:${dayLengthMinutes.toString().padStart(2, '0')}`;
  
  return {
    sunrise,
    sunset,
    dayLength,
    dayLengthFormatted
  };
}

export function formatCoordinates(longitude: number, latitude: number): { lat: string; lng: string } {
  const latDirection = latitude >= 0 ? 'N' : 'S';
  const lngDirection = longitude >= 0 ? 'E' : 'W';
  
  const latFormatted = `${Math.abs(latitude).toFixed(4)}°${latDirection}`;
  const lngFormatted = `${Math.abs(longitude).toFixed(4)}°${lngDirection}`;
  
  return {
    lat: latFormatted,
    lng: lngFormatted
  };
}