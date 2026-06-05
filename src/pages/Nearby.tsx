import { useState } from 'react';
import { CategoryFilters, PlacesList, NearbyMap, SearchBar, categories, places } from '../components/nearby';

const Nearby = () => {
    const [activeCategory, setActiveCategory] = useState('food');
    const [query, setQuery] = useState('');

    const filtered = query.trim()
        ? places.filter(p =>
            [p.name, p.type, p.neighborhood].some(field =>
                field.toLowerCase().includes(query.toLowerCase())
            )
          )
        : places;

    return (
        <div className="nearby">
            <div className="nearby-scroll">
                <h2 className="nearby-title">Places near you</h2>
                <CategoryFilters
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />
                <PlacesList places={filtered} />
            </div>
            <div className="nearby-bottom">
                <NearbyMap places={filtered} />
                <SearchBar value={query} onChange={setQuery} />
            </div>
        </div>
    );
};

export default Nearby;
