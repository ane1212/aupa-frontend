import type { SavedItem } from './types';
import { CATEGORY_ORDER } from './data';
import SavedSection from './SavedSection';

interface SavedContentProps {
    visible: SavedItem[];
    categoryLabels: Record<string, string>;
    noItems: string;
    seeAll: string;
}

const SavedContent = ({ visible, categoryLabels, noItems, seeAll }: SavedContentProps) => {
    const categories = CATEGORY_ORDER.filter(cat => visible.some(i => i.category === cat));

    return (
        <div className="sv-content">
            {categories.length === 0 && (
                <p className="sv-empty">{noItems}</p>
            )}
            {categories.map(cat => (
                <SavedSection
                    key={cat}
                    cat={cat}
                    label={categoryLabels[cat] ?? cat.toUpperCase()}
                    items={visible.filter(i => i.category === cat)}
                    seeAll={seeAll}
                />
            ))}
        </div>
    );
};

export default SavedContent;
