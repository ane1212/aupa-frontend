import type { SavedItem } from './types';
import { CATEGORY_ORDER, CATEGORY_LABELS } from './data';
import SavedSection from './SavedSection';

interface SavedContentProps {
    visible: SavedItem[];
}

const SavedContent = ({ visible }: SavedContentProps) => {
    const categories = CATEGORY_ORDER.filter(cat => visible.some(i => i.category === cat));

    return (
        <div className="sv-content">
            {categories.length === 0 && (
                <p className="sv-empty">No items saved in this category.</p>
            )}
            {categories.map(cat => (
                <SavedSection
                    key={cat}
                    cat={cat}
                    label={CATEGORY_LABELS[cat]}
                    items={visible.filter(i => i.category === cat)}
                />
            ))}
        </div>
    );
};

export default SavedContent;
