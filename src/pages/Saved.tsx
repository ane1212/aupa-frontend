import { useState, useEffect } from 'react';
import { useAuth } from '../context';
import { getAppCopy } from '../i18n/copy';
import { favoriteService, eventService, categoryService } from '../services/API';
import { generateRandomScore } from '../utils/randomScore';
import { getCategoryImage } from '../utils/categoryImages';
import { getUserLocation, calcDistanceKm, formatDistance } from '../utils/location';
import { CATEGORY_ICON_MAP } from '../components/onboarding/onboarding.constants';
import { categories as nearbyCategories } from './Nearby';
import { Bookmark } from 'lucide-react';
import ExperienceCard from '../components/experiences/ExperienceCard';

const CATEGORY_LABELS: Record<string, string> = {
    food: 'Comida', bars: 'Bares', experiences: 'Experiencias', places: 'Lugares',
    culture: 'Cultura', nature: 'Naturaleza', shopping: 'Compras', nightlife: 'Noche',
    coffee_shops: 'Cafeterías', walking_tours: 'Rutas', family_friendly: 'Familia',
    history: 'Historia', festivals_events: 'Eventos', beaches: 'Playas',
    budget_friendly: 'Económico', local_favorites: 'Favoritos locales',
    vegetarian_vegan: 'Vegano',
};

interface SavedCard {
    id: string;
    favoriteId: string;
    name: string;
    duration: string;
    date: string;
    price: string;
    score: number;
    image: string;
    category: string;
    distance?: string;
}

const formatTime = (t?: string) => (t ? t.slice(0, 5) : '');
const formatDate = (d?: string) => {
    if (!d) return '';
    const parts = d.split('T')[0].split('-').map(Number);
    if (parts.length < 3 || parts.some(isNaN)) return '';
    const [y, m, day] = parts;
    return new Date(y, m - 1, day).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
};

const Saved = () => {
    const { user } = useAuth();
    const copy = getAppCopy(user?.language);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [savedList, setSavedList] = useState<SavedCard[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSaved = async () => {
            if (!user?.id) { setLoading(false); return; }
            try {
                const [favsRes, catsRes, userLoc] = await Promise.allSettled([
                    favoriteService.getByUser(user.id, { limit: 100 }),
                    categoryService.getAll({ limit: 100 }),
                    getUserLocation(),
                ]);
                const userCoords = userLoc.status === 'fulfilled' ? userLoc.value : null;

                const catMap: Record<string, string> = {};
                if (catsRes.status === 'fulfilled') {
                    for (const cat of (catsRes.value.data ?? [])) catMap[cat.id] = cat.name;
                }

                const favorites = favsRes.status === 'fulfilled' ? (favsRes.value.data ?? []) : [];

                const raw = await Promise.all(
                    favorites.map(async (fav): Promise<SavedCard | null> => {
                        try {
                            const ev = await eventService.getById(fav.eventId);
                            const category = (ev.categoryId && catMap[ev.categoryId]) || 'places';
                            const t1 = formatTime(ev.startTime);
                            const t2 = formatTime(ev.endTime);
                            let distance: string | undefined;
                            if (userCoords && ev.latitude != null && ev.longitude != null) {
                                const km = calcDistanceKm(userCoords.lat, userCoords.lng, ev.latitude, ev.longitude);
                                distance = formatDistance(km);
                            }
                            return {
                                id: ev.id,
                                favoriteId: fav.id,
                                name: ev.title,
                                duration: [t1, t2].filter(Boolean).join('–'),
                                date: formatDate(ev.date),
                                price: ev.price === 0 ? 'Gratis' : `€${ev.price}`,
                                score: generateRandomScore(ev.id),
                                image: ev.image || getCategoryImage(category),
                                category,
                                distance,
                            };
                        } catch { return null; }
                    })
                );
                const items = raw.filter((i): i is SavedCard => i !== null);

                setSavedList(items);
            } catch {
                setSavedList([]);
            } finally {
                setLoading(false);
            }
        };
        fetchSaved();
    }, [user?.id]);

    const handleUnsave = async (id: string) => {
        const item = savedList.find(i => i.id === id);
        if (!item) return;
        setSavedList(prev => prev.filter(i => i.id !== id));
        try {
            await favoriteService.delete(item.favoriteId);
        } catch {
            setSavedList(prev => [...prev, item]);
        }
    };

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

            {visible.length === 0 ? (
                <p className="sv-empty">{copy.saved.noItems}</p>
            ) : (
                <ul className="exp-list">
                    {visible.map(item => (
                        <ExperienceCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            duration={item.duration}
                            date={item.date}
                            price={item.price}
                            score={item.score}
                            image={item.image}
                            category={item.category}
                            distance={item.distance}
                            saved={true}
                            onBookmark={() => handleUnsave(item.id)}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Saved;
