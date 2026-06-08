import { useState, useEffect } from 'react';
import { fastapiService } from '../services/API';
import { getCategoryImage } from '../utils/categoryImages';
import { getUserLocation, TEST_LOCATION } from '../utils/location';
import { getAppCategoryFromSubcategory } from '../utils/categoryMapper';
import type { Recommendation } from '../services/models';
import { CATEGORY_ICON_MAP } from '../components/onboarding/onboarding.constants';
import { Bookmark } from 'lucide-react';
import NearbyMap from '../components/nearby/NearbyMap';
import { useAuth } from '../context';
import { getAppCopy } from '../i18n/copy';
import type { Place } from '../components/nearby/types';

export const categories = [
    'food', 'culture', 'nature', 'bars', 'local_favorites',
    'shopping', 'coffee_shops', 'walking_tours', 'family_friendly',
    'vegetarian_vegan', 'history', 'festivals_events', 'beaches',
    'nightlife', 'budget_friendly'
];


const Nearby = () => {
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

    const placesForMap: Place[] = filtered.map(rec => ({
        id: rec.id || rec.name,
        name: rec.name,
        category: rec.category,
        lat: rec.latitude || 43.2627,
        lng: rec.longitude || -2.9253,
        type: rec.description,
        distance: rec.distance || rec.distance_from_user || 0,
        score: rec.local_score || rec.score || 0,
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
                <input
                    type="text"
                    className="search-bar"
                    placeholder={copy.nearby.searchPlaceholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <div className='nearby-body'>
                {loading && <p className="loading-text">Loading...</p>}
                {!loading && filtered.slice(0, 3).map((rec, index) => (
                    <div key={`${rec.name}-${index}`} className="place-item">
                        <img
                            src={getCategoryImage(rec.category)}
                            alt={rec.name}
                            style={{
                                width: '100%',
                                height: '144px',
                                objectFit: 'cover',
                            }}
                        />
                        <div className='place-item-content'>
                            <h3>{rec.name}</h3>
                            <p>{rec.description}</p>
                            <p>{rec.distance || rec.distance_from_user || 0}m</p>
                        </div>
                        {rec.local_score > 0 && <p>Score: {rec.local_score}</p>}
                    </div>
                ))}
            </div>
            <div className='nearby-footer'>

                <NearbyMap places={placesForMap} />
            </div>

        </div>
    );
};

export default Nearby;