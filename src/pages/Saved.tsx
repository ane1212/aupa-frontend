import { useState, useEffect } from 'react';
import { FilterChips, SavedContent } from '../components/saved';
import type { Filter, FilterDef, SavedItem } from '../components/saved';
import { useAuth } from '../context';
import { getAppCopy } from '../i18n/copy';
import { favoriteService, eventService } from '../services/API';
import { generateRandomScore } from '../utils/randomScore';
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

    const handleRemove = (eventId: string) => {
        setSavedList(prev => prev.filter(i => i.id !== eventId));
    };

    useEffect(() => {
        const fetchSaved = async () => {
            if (!user?.id) {
                setLoading(false);
                return;
            }
            try {
                const favsRes = await favoriteService.getByUser(user.id, { limit: 100 });
                const favorites = favsRes.data ?? [];

                const savedItems: SavedItem[] = (
                    await Promise.all(
                        favorites.map(async (fav) => {
                            try {
                                const event = await eventService.getById(fav.eventId);
                                const mapped = getAppCategoryFromSubcategory(event.categoryId || '');
                                const VALID_CATS = ['food', 'bars', 'experiences', 'places'];
                                const category = VALID_CATS.includes(mapped) ? mapped : 'places';
                                return {
                                    id: event.id,
                                    favoriteId: fav.id,
                                    name: event.title,
                                    meta: truncate(event.description ?? null, 50),
                                    sub: event.address || '',
                                    score: generateRandomScore(event.id),
                                    category,
                                    image: event.image || getCategoryImage(category),
                                } satisfies SavedItem;
                            } catch {
                                return null;
                            }
                        })
                    )
                ).filter((i): i is SavedItem => i !== null);

                setSavedList(savedItems);
            } catch {
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

    const translatedFilterDefs: FilterDef[] = [
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
                onRemove={handleRemove}
            />
        </div>
    );
};

export default Saved;