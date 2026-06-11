import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fastapiService, preferenceService, categoryService } from '../services/API';
import { getCategoryImage } from '../utils/categoryImages';
import { getUserLocation, TEST_LOCATION, formatDistance } from '../utils/location';
import { getAppCategoryFromSubcategory } from '../utils/categoryMapper';
import { generateRandomScore } from '../utils/randomScore';
import type { Recommendation } from '../services/models';
import { CATEGORY_ICON_MAP } from '../components/onboarding/onboarding.constants';
import { Bookmark } from 'lucide-react';
import NearbyMap from '../components/nearby/NearbyMap';
import { useAuth } from '../context';
import { getAppCopy, getCatLabel } from '../i18n/copy';
import type { Place } from '../components/nearby/types';
import ExperienceCard from '../components/experiences/ExperienceCard';
import SearchBar from '../components/experiences/SearchBar';

export const ALL_CATEGORIES = [
    'food', 'culture', 'nature', 'bars', 'local_favorites',
    'shopping',  'walking_tours', 'family_friendly',
    'history', 'beaches',
];

// keep old export name for any other file that imports it
export const categories = ALL_CATEGORIES;

const Nearby = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const copy = getAppCopy(user?.language);

    const [visibleCategories, setVisibleCategories] = useState<string[]>(ALL_CATEGORIES);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');

    // Load user preference categories
    useEffect(() => {
        if (!user) { setVisibleCategories(ALL_CATEGORIES); return; }
        Promise.all([
            preferenceService.getByUser(user.id, { limit: 100 }),
            categoryService.getAll({ limit: 100 }),
        ]).then(([prefsRes, catsRes]) => {
            const prefs = prefsRes.data ?? [];
            const cats = catsRes.data ?? [];
            if (prefs.length === 0) { setVisibleCategories(ALL_CATEGORIES); return; }
            const selectedNames = prefs
                .map(p => cats.find(c => c.id === p.categoryId)?.name as string | undefined)
                .filter((n): n is string => !!n && ALL_CATEGORIES.includes(n));
            setVisibleCategories(selectedNames.length > 0 ? selectedNames : ALL_CATEGORIES);
        }).catch(() => setVisibleCategories(ALL_CATEGORIES));
    }, [user?.id]);


    useEffect(() => {
        if (visibleCategories.length === 0) return;
        const fetchRecommendations = async () => {
            setLoading(true);
            try {
                const location = await getUserLocation() ?? TEST_LOCATION;

                let recs;

                if (!activeCategory) {
                    const responses = await Promise.all(
                        visibleCategories.map(cat =>
                            fastapiService.byCategory(cat, location.lat, location.lng)
                                .then(r => r.recommendations || [])
                                .catch(() => [])
                        )
                    );
                    // merge and deduplicate by name
                    const merged = responses.flat();
                    const seen = new Set<string>();
                    recs = merged.filter(r => {
                        if (seen.has(r.name)) return false;
                        seen.add(r.name);
                        return true;
                    });
                } else {
                    const response = await fastapiService.byCategory(
                        activeCategory,
                        location.lat,
                        location.lng
                    );
                    recs = response.recommendations || [];
                }

                const recsWithCategory = recs.map(rec => ({
                    ...rec,
                    appCategory: getAppCategoryFromSubcategory(rec.sub_category),
                }));

                setRecommendations(recsWithCategory);
            } catch (error) {
                console.error("Failed to load recommendations", error);
                setRecommendations([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [activeCategory, visibleCategories]);

    const filtered = query.trim()
        ? recommendations.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()) ||
            p.sub_category.toLowerCase().includes(query.toLowerCase())
        )
        : recommendations;

    const placesForMap: Place[] = filtered.map((rec, index) => ({
        id: index,
        name: rec.name,
        category: rec.sub_category,
        lat: rec.latitude ?? 43.2627,
        lng: rec.longitude ?? -2.9253,
        type: rec.description,
        distance: rec.distance_from_user != null ? formatDistance(rec.distance_from_user / 1000) : '0 m',
        walkTime: '',
        score: rec.local_score ?? 0,
    }));

    return (
        <div className="nearby">
            <div className="nearby-header">
                <h2 className="nearby-title">{copy.nearby.title}</h2>

                <div className="category-filters">
                    <button
                        type="button"
                        className={`category-chip ${!activeCategory ? 'selected' : ''}`}
                        onClick={() => setActiveCategory(null)}
                    >
                        <Bookmark size={20} />
                        <span>{copy.saved.filterAll}</span>
                    </button>

                    {visibleCategories.map((category) => {
                        const Icon = CATEGORY_ICON_MAP[category] || Bookmark;
                        const isSelected = activeCategory === category;

                        return (
                            <button
                                type="button"
                                key={category}
                                className={`category-chip ${isSelected ? 'selected' : ''}`}
                                onClick={() => setActiveCategory(isSelected ? null : category)}
                            >
                                <Icon size={20} />
                                <span>{getCatLabel(category, copy)}</span>
                            </button>
                        );
                    })}
                </div>
                <SearchBar
                    value={query}
                    onChange={setQuery}
                    placeholder={copy.nearby.searchPlaceholder}
                />
            </div>
            <div className="nearby-content">
                <div className='nearby-body'>
                    {loading && <p className="loading-text">Loading...</p>}
                    {!loading && filtered.length === 0 && (
                        <p className="exp-no-results">{copy.nearby.noResults}</p>
                    )}
                    {!loading && filtered.length > 0 && (
                        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {filtered.slice(0, 10).map((rec, index) => (
                                <ExperienceCard
                                    key={`${rec.name}-${index}`}
                                    id={rec.id ?? rec.name}
                                    name={rec.name}
                                    image={getCategoryImage(rec.sub_category)}
                                    duration={rec.address ?? ''}
                                    price=""
                                    score={generateRandomScore(rec.id ?? rec.name)}
                                    lang={user?.language}
                                    category={rec.sub_category}
                                    distance={rec.distance_from_user != null ? formatDistance(rec.distance_from_user / 1000) : undefined}
                                    onClickCard={() => navigate('/nearby-detail', { state: { rec } })}
                                />
                            ))}
                        </ul>
                    )}
                </div>
                <div className='nearby-footer'>
                    <NearbyMap places={placesForMap} />
                </div>
            </div>

        </div>
    );
};

export default Nearby;