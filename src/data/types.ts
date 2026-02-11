export interface CityMarker {
  id: string;
  type: 'city' | 'landmark';
  city: string;
  country: string;
  coordinates: [number, number];  // [longitude, latitude]
  offset: number;  // GMT offset in hours
  timezone?: string;  // IANA timezone identifier (e.g., "America/New_York")
  description?: string;
  state?: string;
  region?: string;
} 