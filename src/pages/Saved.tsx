// Saved.tsx - CORREGIDO (aparecen en All)
import { useState, useEffect } from 'react';
import { FilterChips, SavedContent } from '../components/saved';
import type { Filter, SavedItem } from '../components/saved';
import { useAuth } from '../context';
import { getAppCopy } from '../i18n/copy';
import { eventService } from '../services/API';
import type { Event } from '../services/models';
import { getCategoryImage } from '../utils/categoryImages';
import { getAppCategoryFromSubcategory } from '../utils/categoryMapper';

const truncate = (str: string | null, max: number = 50) => {
    if (!str) return '';
    return str.length > max ? str.slice(0, max) + '...' : str;
};

const Saved = () => {
    const { user } = useAuth();
    const copy = getAppCopy(user?.language);
    const [activeFilter, setActiveFilter] = useState<Filter>('all');
    const [savedList, setSavedList] = useState<SavedItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSaved = async () => {
            if (!user?.id) {
                setLoading(false);
                return;
            }
            try {
                const response = await eventService.getAll({ limit: 50 });
                const events: Event[] = response.data || [];
                
                const savedItems: SavedItem[] = events.map(event => {
                    const category = getAppCategoryFromSubcategory(event.categoryId || 'event');
                    
                    return {
                        id: parseInt(event.id) || 0,
                        name: event.title,
                        meta: truncate(event.description, 50),
                        sub: event.subcategory || '',
                        score: 0,
                        category: 'places',
                        image: event.image || getCategoryImage(category),
                    };
                });
                
                setSavedList(savedItems);
            } catch (error) {
                console.error('Failed to fetch saved events:', error);
                setSavedList([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSaved();
    }, [user?.id]);

    const visible = activeFilter === 'all'
        ? savedList
        : savedList.filter(i => i.category === activeFilter);

    const translatedFilterDefs = [
        { id: 'all', label: copy.saved.filterAll },
        { id: 'places', label: copy.saved.filterPlaces },
        { id: 'food', label: copy.saved.filterFood },
        { id: 'bars', label: copy.saved.filterBars },
    ];

    const categoryLabelsTranslated = {
        food: copy.saved.catFood,
        bars: copy.saved.catBars,
        places: copy.saved.catPlaces,
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="saved">
            <h2 className="sv-title">{copy.saved.title}</h2>

            <FilterChips
                filterDefs={translatedFilterDefs}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
            />

            <SavedContent
                visible={visible}
                categoryLabels={categoryLabelsTranslated}
                noItems={copy.saved.noItems}
                seeAll={copy.saved.filterAll}
            />
        </div>
    );
};

export default Saved;