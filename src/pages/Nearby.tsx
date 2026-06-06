import { useState } from 'react';
import { CategoryFilters, PlacesList, NearbyMap, SearchBar, categories, places } from '../components/nearby';
import { useAuth } from '../context';
import { getAppCopy } from '../i18n/copy';

const Nearby = () => {
    const { user } = useAuth();
    const copy = getAppCopy(user?.language);
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
            <h2 className="nearby-title">{copy.nearby.title}</h2>
            <CategoryFilters
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />
            <PlacesList places={filtered} />
            <NearbyMap />
            <SearchBar value={query} onChange={setQuery} placeholder={copy.nearby.searchPlaceholder} />
        </div>
    );
};

export default Nearby;
