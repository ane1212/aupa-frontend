import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { SavedItem } from './types';
import { favoriteService } from '../../services/API';

interface SavedPlaceCardProps {
    item: SavedItem;
    onRemove: (id: string) => void;
}

const BookmarkFilled = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" style={{ display: 'block', flexShrink: 0, overflow: 'hidden' }}>
        <path
            d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
            fill="#ef342a"
            stroke="#ef342a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const SavedPlaceCard = ({ item, onRemove }: SavedPlaceCardProps) => {
    const navigate = useNavigate();
    const [removing, setRemoving] = useState(false);

    const handleBookmark = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!item.favoriteId || removing) return;
        setRemoving(true);
        try {
            await favoriteService.delete(item.favoriteId);
            onRemove(item.id);
        } catch {
            setRemoving(false);
        }
    };

    return (
        <li className="exp-card" onClick={() => navigate(`/detail/${item.id}`)} style={{ cursor: 'pointer' }}>
            {item.image ? (
                <img className="exp-card-img" src={item.image} alt={item.name} />
            ) : (
                <div className="exp-card-img" aria-hidden="true" />
            )}
            <div className="exp-card-info">
                <p className="exp-card-name">{item.name}</p>
                <p className="exp-card-meta">{item.meta}</p>
                {item.sub && <p className="exp-card-meta">{item.sub}</p>}
            </div>
            <div className="exp-card-actions">
                <div className="exp-score-row">
                    {item.score > 0 && <span className="exp-score-badge">{item.score}</span>}
                    <button
                        className="exp-bookmark is-saved"
                        aria-label="Quitar de guardados"
                        onClick={handleBookmark}
                        disabled={removing}
                    >
                        {removing ? <Bookmark size={16} aria-hidden="true" /> : <BookmarkFilled />}
                    </button>
                </div>
                {item.score > 0 && <span className="exp-score-label">Local Score</span>}
            </div>
        </li>
    );
};

export default SavedPlaceCard;