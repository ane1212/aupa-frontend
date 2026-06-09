import type { SavedItem } from './types';
import SavedPlaceCard from './SavedPlaceCard';

interface SavedSectionProps {
    cat: string;
    label: string;
    items: SavedItem[];
    seeAll: string;
    onRemove: (id: number) => void;
}

const SavedSection = ({ cat, label, items, onRemove }: SavedSectionProps) => (
    <div key={cat} className="sv-section">
        <div className="sv-section-head">
            <span className="sv-section-label">{label}</span>
        </div>
        <ul className="sv-place-list">
            {items.map(item => (
                <SavedPlaceCard key={item.id} item={item} onRemove={onRemove} />
            ))}
        </ul>
    </div>
);

export default SavedSection;
