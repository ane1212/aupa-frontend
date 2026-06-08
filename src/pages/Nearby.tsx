import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fastapiService } from '../services/API';
import { getCategoryImage } from '../utils/categoryImages';
import { getUserLocation, TEST_LOCATION, formatDistance } from '../utils/location';
import { getAppCategoryFromSubcategory } from '../utils/categoryMapper';
import { generateRandomScore } from '../utils/randomScore';
import type { Recommendation } from '../services/models';
import { CATEGORY_ICON_MAP } from '../components/onboarding/onboarding.constants';
import { Bookmark } from 'lucide-react';
import NearbyMap from '../components/nearby/NearbyMap';
import { useAuth } from '../context';
import { getAppCopy } from '../i18n/copy';
import type { Place } from '../components/nearby/types';
import ExperienceCard from '../components/experiences/ExperienceCard';
import SearchBar from '../components/experiences/SearchBar';

export const categories = [
    'food', 'culture', 'nature', 'bars', 'local_favorites',
    'shopping', 'coffee_shops', 'walking_tours', 'family_friendly',
    'vegetarian_vegan', 'history', 'festivals_events', 'beaches',
    'nightlife', 'budget_friendly'
];


const Nearby = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const copy = getAppCopy(user?.language);

    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');

    const categoryLabels: Record<string, string> = {
        food: 'Food',
        culture: 'Culture',
        nature: 'Nature',
        bars: 'Bars',
        local_favorites: 'Local experiences',
        shopping: 'Shopping',
        coffee_shops: 'Coffee shops',
        walking_tours: 'Walking',
        family_friendly: 'Family friendly',
        vegetarian_vegan: 'Vegetarian',
        history: 'History',
        festivals_events: 'Events',
        beaches: 'Beaches',
        nightlife: 'Nightlife',
        budget_friendly: 'Budget friendly',
    };

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true);
            try {
                const location = await getUserLocation() ?? TEST_LOCATION;

                let recs;

                if (!activeCategory) {
                    const response = await fastapiService.nearest(location.lat, location.lng, 24);
                    recs = response.recommendations || [];
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
                    appCategory: getAppCategoryFromSubcategory(rec.category),
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
    }, [activeCategory]);

    const filtered = query.trim()
        ? recommendations.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        )
        : recommendations;

    const placesForMap: Place[] = filtered.map((rec, index) => ({
        id: index,
        name: rec.name,
        category: rec.category,
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
                        <span>All</span>
                    </button>

                    {categories.map((category) => {
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
                                <span>{categoryLabels[category] || category}</span>
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
                    {!loading && (
                        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {filtered.slice(0, 10).map((rec, index) => (
                                <ExperienceCard
                                    key={`${rec.name}-${index}`}
                                    id={rec.id ?? String(index)}
                                    name={rec.name}
                                    image={getCategoryImage(rec.category)}
                                    duration={rec.address ?? ''}
                                    price=""
                                    score={generateRandomScore(rec.id ?? rec.name)}
                                    category={rec.category}
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