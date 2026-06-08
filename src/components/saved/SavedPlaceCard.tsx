import { Bookmark } from 'lucide-react';
import type { SavedItem } from './types';
import { itineraryService } from '../../services/API';

interface SavedPlaceCardProps {
    item: SavedItem;
}

const SavedPlaceCard = ({ item }: SavedPlaceCardProps) => {
    const handleBookmark = async () => {
        try {
            await itineraryService.addEvent(item.id.toString());
        } catch (error) {
            console.error('Failed to add event:', error);
        }
    };

    return (
        <li className="sv-place-card">
            {item.image ? (
                <img className="sv-img-placeholder" src={item.image} alt={item.name} />
            ) : (
                <div className="sv-img-placeholder" aria-hidden="true" />
            )}
            <div className="sv-place-info">
                <p className="sv-place-name">{item.name}</p>
                <p className="sv-place-meta">{item.meta}</p>
                {item.sub && <p className="sv-place-dist">{item.sub}</p>}
            </div>
            <div className="sv-place-actions">
                <div className="sv-score-row">
                    {item.score > 0 && <span className="sv-score-badge">{item.score}</span>}
                    <button 
                        className="sv-bookmark" 
                        aria-label="Guardar lugar"
                        onClick={handleBookmark}
                    >
                        <Bookmark size={16} />
                    </button>
                </div>
                {item.score > 0 && <span className="sv-score-label">Local Score</span>}
            </div>
        </li>
    );
};

export default SavedPlaceCard;