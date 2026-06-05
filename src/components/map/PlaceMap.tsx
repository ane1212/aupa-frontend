import { useEffect, useRef } from 'react';

interface PlaceMapProps {
    lat: number;
    lng: number;
    name: string;
}

const PlaceMap = ({ lat, lng, name }: PlaceMapProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);

    useEffect(() => {
        const L = (window as any).L;
        if (!L || !containerRef.current || mapRef.current) return;

        const map = L.map(containerRef.current).setView([lat, lng], 16);
        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 19,
        }).addTo(map);

        const placeIcon = L.divIcon({
            html: '<div class="map-place-marker"></div>',
            className: '',
            iconSize: [28, 36],
            iconAnchor: [14, 36],
            popupAnchor: [0, -36],
        });

        L.marker([lat, lng], { icon: placeIcon })
            .addTo(map)
            .bindPopup(`<strong>${name}</strong>`)
            .openPopup();

        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const { latitude, longitude } = coords;

                const userIcon = L.divIcon({
                    html: '<div class="map-user-marker"></div>',
                    className: '',
                    iconSize: [18, 18],
                    iconAnchor: [9, 9],
                });

                L.marker([latitude, longitude], { icon: userIcon })
                    .addTo(map)
                    .bindPopup('You are here');

                const bounds = L.latLngBounds(
                    [lat, lng],
                    [latitude, longitude],
                );
                map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
            },
            () => { /* permiso denegado — sólo se muestra el marcador del lugar */ },
            { enableHighAccuracy: true, timeout: 8000 },
        );

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, [lat, lng, name]);

    return <div ref={containerRef} className="map-frame" />;
};

export default PlaceMap;
