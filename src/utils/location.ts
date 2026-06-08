export const calcDistanceKm = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const formatDistance = (km: number): string => {
    if (km < 1) return `${Math.round(km * 1000)} m`;
    return `${km.toFixed(1)} km`;
};

export const TEST_LOCATION = {
    lat: 43.2687,
    lng: -2.9340,
};

export const getUserLocation = async (): Promise<{ lat: number; lng: number } | null> => {
    if (!navigator.geolocation) {
        console.warn('Geolocation no está disponible en este navegador');
        return TEST_LOCATION;
    }

    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => {
                console.warn('Error obteniendo ubicación GPS:', error);
                resolve(TEST_LOCATION);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    });
};

export const watchUserLocation = (
    onSuccess: (lat: number, lng: number) => void,
    onError?: (error: GeolocationPositionError) => void
): (() => void) => {
    if (!navigator.geolocation) {
        console.warn('Geolocation no está disponible');
        return () => {};
    }

    const watchId = navigator.geolocation.watchPosition(
        (position) => {
            onSuccess(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
            console.warn('GPS error:', error);
            if (onError) onError(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        }
    );

    return () => navigator.geolocation.clearWatch(watchId);
};

export const getLat = async (): Promise<number> => {
    const location = await getUserLocation();
    return location?.lat ?? TEST_LOCATION.lat;
};

export const getLng = async (): Promise<number> => {
    const location = await getUserLocation();
    return location?.lng ?? TEST_LOCATION.lng;
};