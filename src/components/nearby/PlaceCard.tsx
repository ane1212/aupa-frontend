import { Bookmark } from 'lucide-react';
import type { Place } from './types';

interface PlaceCardProps {
    place: Place;
}

const PlaceCard = ({ place }: PlaceCardProps) => (
    <li className="place-card">
        <div className="place-image-placeholder" aria-hidden="true" />
        <div className="place-info">
            <p className="place-name">{place.name}</p>
            <p className="place-meta">{place.type} &middot; {place.neighborhood}</p>
            <p className="place-distance">{place.distance} &middot; {place.walkTime}</p>
        </div>
        <div className="place-actions">
            <div className="score-row">
                <span className="score-badge">{place.score}</span>
                <button className="bookmark-btn" aria-label="Guardar lugar">
                    <Bookmark size={17} />
                </button>
            </div>
            <span className="score-label">Local Score</span>
        </div>
    </li>
);

export default PlaceCard;
