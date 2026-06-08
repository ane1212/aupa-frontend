import { useState } from 'react';
import type { SavedItem } from './types';
import { favoriteService } from '../../services/API';
import { getCategoryImage } from '../../utils/categoryImages';
import ExperienceCard from '../experiences/ExperienceCard';

interface SavedPlaceCardProps {
    item: SavedItem;
    onRemove: (id: string) => void;
}

const SavedPlaceCard = ({ item, onRemove }: SavedPlaceCardProps) => {
    const [removing, setRemoving] = useState(false);

    const handleBookmark = async () => {
        if (!item.favoriteId || removing) return;
        setRemoving(true);
        try {
            await favoriteService.delete(item.favoriteId);
            onRemove(item.id);
        } catch {
            setRemoving(false);
        }
    };

    return (
        <ExperienceCard
            id={item.id}
            name={item.name}
            image={item.image || getCategoryImage(item.category)}
            duration=""
            price=""
            score={item.score}
            category={item.category}
            saved
            onBookmark={handleBookmark}
        />
    );
};

export default SavedPlaceCard;
