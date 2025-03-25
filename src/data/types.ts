export interface CityMarker {
  id: string;
  type: 'city' | 'landmark';
  city: string;
  country: string;
  coordinates: [number, number];  // [longitude, latitude]
  offset: number;  // GMT offset in hours
  description?: string;
  state?: string;
  region?: string;
} 