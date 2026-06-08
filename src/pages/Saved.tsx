import { useState, useEffect } from 'react';
import { SavedContent } from '../components/saved';
import type { SavedItem } from '../components/saved';
import { useAuth } from '../context';
import { getAppCopy } from '../i18n/copy';
import { favoriteService, eventService, categoryService } from '../services/API';
import { generateRandomScore } from '../utils/randomScore';
import { getCategoryImage } from '../utils/categoryImages';
import { CATEGORY_ICON_MAP } from '../components/onboarding/onboarding.constants';
import { categories as nearbyCategories } from './Nearby';
import { Bookmark } from 'lucide-react';

const CATEGORY_LABELS: Record<string, string> = {
    food: 'Comida', bars: 'Bares', experiences: 'Experiencias', places: 'Lugares',
    culture: 'Cultura', nature: 'Naturaleza', shopping: 'Compras', nightlife: 'Noche',
    coffee_shops: 'Cafeterías', walking_tours: 'Rutas', family_friendly: 'Familia',
    history: 'Historia', festivals_events: 'Eventos', beaches: 'Playas',
    budget_friendly: 'Económico', local_favorites: 'Favoritos locales',
    vegetarian_vegan: 'Vegano',
};

const truncate = (str: string | null, max: number = 50) => {
    if (!str) return '';
    return str.length > max ? str.slice(0, max) + '...' : str;
};

const Saved = () => {
    const { user } = useAuth();
    const copy = getAppCopy(user?.language);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [savedList, setSavedList] = useState<SavedItem[]>([]);
    const [loading, setLoading] = useState(true);

    const handleRemove = (eventId: string) => {
        setSavedList(prev => prev.filter(i => i.id !== eventId));
    };

    useEffect(() => {
        const fetchSaved = async () => {
            if (!user?.id) { setLoading(false); return; }
            try {
                const [favsRes, catsRes] = await Promise.allSettled([
                    favoriteService.getByUser(user.id, { limit: 100 }),
                    categoryService.getAll({ limit: 100 }),
                ]);

                const catMap: Record<string, string> = {};
                if (catsRes.status === 'fulfilled') {
                    for (const cat of (catsRes.value.data ?? [])) catMap[cat.id] = cat.name;
                }

                const favorites = favsRes.status === 'fulfilled' ? (favsRes.value.data ?? []) : [];

                const savedItems: SavedItem[] = (
                    await Promise.all(
                        favorites.map(async (fav) => {
                            try {
                                const event = await eventService.getById(fav.eventId);
                                const category = (event.categoryId && catMap[event.categoryId]) || 'places';
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
                            } catch { return null; }
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

    const visible = activeCategory
        ? savedList.filter(i => i.category === activeCategory)
        : savedList;

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500" />
            </div>
        );
    }

    return (
        <div className="saved">
            <h2 className="sv-title">{copy.saved.title}</h2>

            <div className="category-filters">
                <button
                    className={`category-chip${!activeCategory ? ' selected' : ''}`}
                    onClick={() => setActiveCategory(null)}
                >
                    <span>Todos</span>
                </button>
                {nearbyCategories.map(cat => {
                    const Icon = CATEGORY_ICON_MAP[cat] || Bookmark;
                    return (
                        <button
                            key={cat}
                            className={`category-chip${activeCategory === cat ? ' selected' : ''}`}
                            onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                        >
                            <Icon size={15} />
                            <span>{CATEGORY_LABELS[cat] ?? cat}</span>
                        </button>
                    );
                })}
            </div>

            <SavedContent
                visible={visible}
                categoryLabels={CATEGORY_LABELS}
                noItems={copy.saved.noItems}
                seeAll={copy.saved.filterAll}
                onRemove={handleRemove}
            />
        </div>
    );
};

export default Saved;
