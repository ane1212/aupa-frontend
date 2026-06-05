import { MapPin } from 'lucide-react';

interface MapInfoCardProps {
    name: string;
    subtitle: string;
}

const MapInfoCard = ({ name, subtitle }: MapInfoCardProps) => (
    <div className="map-card">
        <div className="map-card-icon">
            <MapPin size={18} color="#f2494d" />
        </div>
        <div className="map-card-text">
            <p className="map-card-name">{name}</p>
            {subtitle && <p className="map-card-subtitle">{subtitle}</p>}
        </div>
    </div>
);

export default MapInfoCard;
