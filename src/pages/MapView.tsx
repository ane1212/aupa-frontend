import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ExternalLink } from 'lucide-react';
import { PlaceMap, MapInfoCard } from '../components/map';

const MapView = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const name = params.get('name') ?? '';
    const subtitle = params.get('subtitle') ?? '';
    const lat = parseFloat(params.get('lat') ?? '43.2627');
    const lng = parseFloat(params.get('lng') ?? '-2.9253');

    const osmUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}&zoom=17#map=17/${lat}/${lng}`;

    return (
        <div className="mapview">
            {/* Frame primero → ocupa la pantalla en mobile sin trucos de order */}
            <PlaceMap lat={lat} lng={lng} name={name} />

            {/* Sidebar: en mobile → info card al fondo; en desktop → columna izquierda */}
            <aside className="mapview-sidebar">
                <button className="mapview-back" onClick={() => navigate(-1)} aria-label="Volver">
                    <ChevronLeft size={22} />
                    <span className="mapview-back-label">Back</span>
                </button>
                <MapInfoCard name={name} subtitle={subtitle} />
                <a
                    className="mapview-external"
                    href={osmUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ExternalLink size={14} />
                    Open in OpenStreetMap
                </a>
            </aside>
        </div>
    );
};

export default MapView;
