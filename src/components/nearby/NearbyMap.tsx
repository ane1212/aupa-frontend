import { useEffect, useRef } from 'react';
import type { Place } from './types';

interface NearbyMapProps {
    places: Place[];
}

const BILBAO = [43.2627, -2.9253] as const;

const NearbyMap = ({ places }: NearbyMapProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);
    const markersRef = useRef<any[]>([]);

    // Inicializa el mapa una sola vez
    useEffect(() => {
        const L = (window as any).L;
        if (!L || !containerRef.current || mapRef.current) return;

        const map = L.map(containerRef.current, {
            zoomControl: false,
            attributionControl: false,
        }).setView(BILBAO, 14);

        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // Posición del usuario
        navigator.geolocation?.getCurrentPosition(
            ({ coords }) => {
                const userIcon = L.divIcon({
                    html: '<div class="map-user-marker"></div>',
                    className: '',
                    iconSize: [14, 14],
                    iconAnchor: [7, 7],
                });
                L.marker([coords.latitude, coords.longitude], { icon: userIcon })
                    .addTo(map)
                    .bindPopup('You are here');
            },
            () => {},
            { enableHighAccuracy: true, timeout: 8000 },
        );

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);

    // Actualiza los marcadores cuando cambia la lista filtrada
    useEffect(() => {
        const L = (window as any).L;
        const map = mapRef.current;
        if (!L || !map) return;

        markersRef.current.forEach(m => m.remove());
        markersRef.current = [];

        if (places.length === 0) return;

        const placeIcon = L.divIcon({
            html: '<div class="map-place-marker"></div>',
            className: '',
            iconSize: [22, 28],
            iconAnchor: [11, 28],
            popupAnchor: [0, -28],
        });

        const newMarkers = places.map(p =>
            L.marker([p.lat, p.lng], { icon: placeIcon })
                .addTo(map)
                .bindPopup(`<strong>${p.name}</strong><br>${p.type} · ${p.neighborhood}`),
        );

        markersRef.current = newMarkers;

        const group = L.featureGroup(newMarkers);
        map.fitBounds(group.getBounds(), { padding: [24, 24], maxZoom: 15 });
    }, [places]);

    return <div ref={containerRef} className="nearby-map" aria-label="Mapa de la zona" />;
};

export default NearbyMap;
