import { Cloud, CloudRain, CloudSnow, Sun, CloudLightning, CloudDrizzle, Wind } from 'lucide-react';

interface WeatherProps {
    lat: number;
    lng: number;
    className?: string;
}

interface WeatherData {
    temperature: number;
    weatherCode: number;
    windSpeed: number;
    isDay: number;
}

// WMO Weather interpretation codes (https://open-meteo.com/en/docs)
const getWeatherIcon = (code: number, isDay: number) => {
    // Clear sky
    if (code === 0) return <Sun className={`w-8 h-8 ${isDay ? 'text-yellow-500' : 'text-blue-400'}`} />;

    // Cloud / Fog
    if ([1, 2, 3, 45, 48].includes(code)) return <Cloud className="w-8 h-8 text-gray-400" />;

    // Drizzle
    if ([51, 53, 55, 56, 57].includes(code)) return <CloudDrizzle className="w-8 h-8 text-blue-300" />;

    // Rain
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return <CloudRain className="w-8 h-8 text-blue-500" />;

    // Snow
    if ([71, 73, 75, 77, 85, 86].includes(code)) return <CloudSnow className="w-8 h-8 text-cyan-200" />;

    // Thunderstorm
    if ([95, 96, 99].includes(code)) return <CloudLightning className="w-8 h-8 text-purple-500" />;

    return <Sun className="w-8 h-8 text-yellow-500" />;
};

const getWeatherDescription = (code: number) => {
    const codes: Record<number, string> = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        56: 'Light freezing drizzle',
        57: 'Dense freezing drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        66: 'Light freezing rain',
        67: 'Heavy freezing rain',
        71: 'Slight snow fall',
        73: 'Moderate snow fall',
        75: 'Heavy snow fall',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail',
    };
    return codes[code] || 'Unknown';
};

export async function CityWeather({ lat, lng, className = '' }: WeatherProps) {
    try {
        const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,is_day,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph`,
            { next: { revalidate: 1800 } } // Cache for 30 mins
        );

        if (!res.ok) return null;

        const data = await res.json();
        const current = data.current;

        if (!current) return null;

        return (
            <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-100 shadow-sm ${className}`}>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        {getWeatherIcon(current.weather_code, current.is_day)}
                        <div>
                            <div className="text-2xl font-bold text-gray-900">
                                {Math.round(current.temperature_2m)}°F
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {getWeatherDescription(current.weather_code)}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center justify-end gap-1 text-gray-500 text-sm">
                            <Wind className="w-4 h-4" />
                            {Math.round(current.wind_speed_10m)} mph
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (e) {
        console.error('Failed to load weather', e);
        return null; // Fail gracefully
    }
}
