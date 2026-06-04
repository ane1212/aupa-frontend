import { useState } from 'react';
import { Utensils, Wine, Building2, TreePine, CalendarDays, Bookmark, Search } from 'lucide-react';

interface Category {
    id: string;
    label: string;
    icon: React.ComponentType<{ size?: number }>;
}

interface Place {
    id: number;
    name: string;
    type: string;
    neighborhood: string;
    distance: string;
    walkTime: string;
    score: number;
}

const categories: Category[] = [
    { id: 'food', label: 'Food', icon: Utensils },
    { id: 'bars', label: 'Bars', icon: Wine },
    { id: 'culture', label: 'Culture', icon: Building2 },
    { id: 'nature', label: 'Nature', icon: TreePine },
    { id: 'events', label: 'Events', icon: CalendarDays },
];

const places: Place[] = [
    { id: 1, name: 'Bar El Globo', type: 'Pintxos bar', neighborhood: 'Casco Viejo', distance: '400m away', walkTime: '5 min walk', score: 97 },
    { id: 2, name: 'La Viña del Ensanche', type: 'Wine bar', neighborhood: 'Ensanche', distance: '600m away', walkTime: '8 min walk', score: 95 },
    { id: 3, name: 'Gure Toki', type: 'Restaurant', neighborhood: 'Indautxu', distance: '750m away', walkTime: '10 min walk', score: 93 },
];

const Nearby = () => {
    const [activeCategory, setActiveCategory] = useState('food');

    return (
        <div className="nearby">
            <h2 className="nearby-title">Places near you</h2>

            <div className="category-filters">
                {categories.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        className={`category-btn${activeCategory === id ? ' active' : ''}`}
                        onClick={() => setActiveCategory(id)}
                    >
                        <Icon size={21} />
                        <span>{label}</span>
                    </button>
                ))}
            </div>

            <ul className="places-list">
                {places.map(place => (
                    <li key={place.id} className="place-card">
                        <div className="place-image-placeholder" aria-hidden="true" />
                        <div className="place-info">
                            <p className="place-name">{place.name}</p>
                            <p className="place-meta">{place.type} &middot; {place.neighborhood}</p>
                            <p className="place-distance">{place.distance} &middot; {place.walkTime}</p>
                        </div>
                        <div className="place-actions">
                            <div className="score-row">
                                <span className="score-badge">{place.score}</span>
                                <button className="bookmark-btn" aria-label="Guardar lugar">
                                    <Bookmark size={17} />
                                </button>
                            </div>
                            <span className="score-label">Local Score</span>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="nearby-map" aria-label="Mapa de la zona" />

            <div className="nearby-search">
                <Search size={15} />
                <span>Where do you want to go?</span>
            </div>
        </div>
    );
};

export default Nearby;
