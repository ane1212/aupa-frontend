export interface WeatherData {
    temperature: number;
    unit: string;
}



export interface LocationData {
    name: string;
    city?: string;
    country?: string;
}



export const getWeather = async (latitude: number, longitude: number): Promise<WeatherData> => {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather');
        }
        
        const data = await response.json();
        
        return {
            temperature: Math.round(data.current_weather.temperature),
            unit: '°C',
        };
    } catch (error) {
        console.error('Weather fetch failed:', error);
        return { temperature: 18, unit: '°C' };
    }
};



export const getLocationFromCoords = async (latitude: number, longitude: number): Promise<LocationData> => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        
        if (!response.ok) {
            throw new Error('Failed to fetch location');
        }
        
        const data = await response.json();
        
        return {
            name: data.display_name || 'Unknown location',
            city: data.address?.city || data.address?.town || data.address?.village || '',
            country: data.address?.country || '',
        };
    } catch (error) {
        console.error('Location fetch failed:', error);
        return { name: 'Unknown location', city: '', country: '' };
    }
};