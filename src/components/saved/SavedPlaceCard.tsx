import { Bookmark } from 'lucide-react';
import type { SavedItem } from './types';
import ImgPlaceholder from './ImgPlaceholder';

interface SavedPlaceCardProps {
    item: SavedItem;
}

const SavedPlaceCard = ({ item }: SavedPlaceCardProps) => (
    <li className="sv-place-card">
        <ImgPlaceholder />
        <div className="sv-place-info">
            <p className="sv-place-name">{item.name}</p>
            <p className="sv-place-meta">{item.meta}</p>
            {item.sub && <p className="sv-place-dist">{item.sub}</p>}
        </div>
        <div className="sv-place-actions">
            <div className="sv-score-row">
                {item.score > 0 && <span className="sv-score-badge">{item.score}</span>}
                <button className="sv-bookmark" aria-label="Guardar lugar">
                    <Bookmark size={16} />
                </button>
            </div>
            {item.score > 0 && <span className="sv-score-label">Local Score</span>}
        </div>
    </li>
);

export default SavedPlaceCard;
