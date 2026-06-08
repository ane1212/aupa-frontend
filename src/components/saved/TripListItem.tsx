import { GripVertical, MoreVertical } from 'lucide-react';
import type { TripItem } from './types';
import ImgPlaceholder from './ImgPlaceholder';

interface TripListItemProps {
    item: TripItem;
    idx: number;
    completed: Set<number>;
    onToggle: (id: number) => void;
    onMenuOpen: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
    onNavigate: (id: number) => void;
}

const TripListItem = ({ item, completed, onToggle, onMenuOpen, onNavigate }: TripListItemProps) => (
    <li className="sv-trip-item" onClick={() => onNavigate(item.id)}>
        <span className="sv-drag" aria-hidden="true" onClick={e => e.stopPropagation()}>
            <GripVertical size={16} />
        </span>
        <button
            className={`sv-checkbox${completed.has(item.id) ? ' checked' : ''}`}
            onClick={e => { e.stopPropagation(); onToggle(item.id); }}
            aria-label={completed.has(item.id) ? 'Desmarcar' : 'Completar'}
        >
            {completed.has(item.id) && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
        </button>
        <ImgPlaceholder small />
        <div className="sv-trip-info">
            <p className="sv-place-name">{item.name}</p>
            <p className="sv-place-meta">{item.category} · {item.subtitle}</p>
        </div>
        <div className="sv-trip-actions">
            <button
                className="sv-icon-btn"
                aria-label="Opciones"
                onClick={e => onMenuOpen(e, item.id)}
            >
                <MoreVertical size={16} />
            </button>
        </div>
    </li>
);

export default TripListItem;