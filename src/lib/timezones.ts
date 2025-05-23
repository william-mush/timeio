export interface Timezone {
  name: string;
  offset: number;
}

export interface TimezoneGroup {
  name: string;
  timezones: Timezone[];
}

export const TIMEZONE_GROUPS: TimezoneGroup[] = [
  {
    name: 'UTC-12',
    timezones: [
      { name: 'Baker_Island', offset: -12 },
      { name: 'Howland_Island', offset: -12 }
    ]
  },
  {
    name: 'UTC-11',
    timezones: [
      { name: 'Pago_Pago', offset: -11 },
      { name: 'Niue', offset: -11 },
      { name: 'Midway_Island', offset: -11 },
      { name: 'Samoa', offset: -11 }
    ]
  },
  {
    name: 'UTC-10',
    timezones: [
      { name: 'Honolulu', offset: -10 },
      { name: 'Tahiti', offset: -10 },
      { name: 'Rarotonga', offset: -10 },
      { name: 'Hawaii', offset: -10 }
    ]
  },
  {
    name: 'UTC-9',
    timezones: [
      { name: 'Anchorage', offset: -9 },
      { name: 'Juneau', offset: -9 },
      { name: 'Fairbanks', offset: -9 },
      { name: 'Nome', offset: -9 }
    ]
  },
  {
    name: 'UTC-8',
    timezones: [
      { name: 'Los_Angeles', offset: -8 },
      { name: 'Vancouver', offset: -8 },
      { name: 'Seattle', offset: -8 },
      { name: 'San_Francisco', offset: -8 }
    ]
  },
  {
    name: 'UTC-7',
    timezones: [
      { name: 'Denver', offset: -7 },
      { name: 'Phoenix', offset: -7 },
      { name: 'Calgary', offset: -7 },
      { name: 'Salt_Lake_City', offset: -7 }
    ]
  },
  {
    name: 'UTC-6',
    timezones: [
      { name: 'Chicago', offset: -6 },
      { name: 'Mexico_City', offset: -6 },
      { name: 'Winnipeg', offset: -6 },
      { name: 'Dallas', offset: -6 }
    ]
  },
  {
    name: 'UTC-5',
    timezones: [
      { name: 'New_York', offset: -5 },
      { name: 'Toronto', offset: -5 },
      { name: 'Miami', offset: -5 },
      { name: 'Atlanta', offset: -5 }
    ]
  },
  {
    name: 'UTC-4',
    timezones: [
      { name: 'Halifax', offset: -4 },
      { name: 'Santiago', offset: -4 },
      { name: 'Santo_Domingo', offset: -4 },
      { name: 'Caracas', offset: -4 }
    ]
  },
  {
    name: 'UTC-3',
    timezones: [
      { name: 'São_Paulo', offset: -3 },
      { name: 'Buenos_Aires', offset: -3 },
      { name: 'Montevideo', offset: -3 },
      { name: 'Rio_de_Janeiro', offset: -3 }
    ]
  },
  {
    name: 'UTC+0',
    timezones: [
      { name: 'London', offset: 0 },
      { name: 'Dublin', offset: 0 },
      { name: 'Lisbon', offset: 0 },
      { name: 'Casablanca', offset: 0 }
    ]
  },
  {
    name: 'UTC+1',
    timezones: [
      { name: 'Paris', offset: 1 },
      { name: 'Berlin', offset: 1 },
      { name: 'Rome', offset: 1 },
      { name: 'Madrid', offset: 1 }
    ]
  },
  {
    name: 'UTC+2',
    timezones: [
      { name: 'Cairo', offset: 2 },
      { name: 'Athens', offset: 2 },
      { name: 'Jerusalem', offset: 2 },
      { name: 'Helsinki', offset: 2 }
    ]
  },
  {
    name: 'UTC+3',
    timezones: [
      { name: 'Moscow', offset: 3 },
      { name: 'Istanbul', offset: 3 },
      { name: 'Riyadh', offset: 3 },
      { name: 'Nairobi', offset: 3 }
    ]
  },
  {
    name: 'UTC+4',
    timezones: [
      { name: 'Dubai', offset: 4 },
      { name: 'Baku', offset: 4 },
      { name: 'Tbilisi', offset: 4 },
      { name: 'Yerevan', offset: 4 }
    ]
  },
  {
    name: 'UTC+5',
    timezones: [
      { name: 'Karachi', offset: 5 },
      { name: 'Tashkent', offset: 5 },
      { name: 'Yekaterinburg', offset: 5 },
      { name: 'Islamabad', offset: 5 }
    ]
  },
  {
    name: 'UTC+6',
    timezones: [
      { name: 'Dhaka', offset: 6 },
      { name: 'Almaty', offset: 6 },
      { name: 'Omsk', offset: 6 },
      { name: 'Novosibirsk', offset: 6 }
    ]
  },
  {
    name: 'UTC+7',
    timezones: [
      { name: 'Bangkok', offset: 7 },
      { name: 'Jakarta', offset: 7 },
      { name: 'Ho_Chi_Minh_City', offset: 7 },
      { name: 'Hanoi', offset: 7 }
    ]
  },
  {
    name: 'UTC+8',
    timezones: [
      { name: 'Singapore', offset: 8 },
      { name: 'Hong_Kong', offset: 8 },
      { name: 'Beijing', offset: 8 },
      { name: 'Shanghai', offset: 8 }
    ]
  },
  {
    name: 'UTC+9',
    timezones: [
      { name: 'Tokyo', offset: 9 },
      { name: 'Seoul', offset: 9 },
      { name: 'Osaka', offset: 9 },
      { name: 'Sapporo', offset: 9 }
    ]
  },
  {
    name: 'UTC+10',
    timezones: [
      { name: 'Sydney', offset: 10 },
      { name: 'Melbourne', offset: 10 },
      { name: 'Brisbane', offset: 10 },
      { name: 'Canberra', offset: 10 }
    ]
  },
  {
    name: 'UTC+11',
    timezones: [
      { name: 'Solomon_Islands', offset: 11 },
      { name: 'New_Caledonia', offset: 11 },
      { name: 'Noumea', offset: 11 }
    ]
  },
  {
    name: 'UTC+12',
    timezones: [
      { name: 'Auckland', offset: 12 },
      { name: 'Wellington', offset: 12 },
      { name: 'Fiji', offset: 12 },
      { name: 'Christchurch', offset: 12 }
    ]
  }
]; 