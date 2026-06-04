import type { Place } from './types';
import PlaceCard from './PlaceCard';

interface PlacesListProps {
    places: Place[];
}

const PlacesList = ({ places }: PlacesListProps) => (
    <ul className="places-list">
        {places.length > 0
            ? places.map(place => <PlaceCard key={place.id} place={place} />)
            : <li className="nearby-no-results">No places found.</li>
        }
    </ul>
);

export default PlacesList;
