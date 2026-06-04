import { Plus } from 'lucide-react';
import type { TripItem } from './types';
import TripProgress from './TripProgress';
import TripListItem from './TripListItem';

interface TripListProps {
    tripList: TripItem[];
    completed: Set<number>;
    pct: number;
    completedCount: number;
    onToggle: (id: number) => void;
    onMenuOpen: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
    onNavigate: (id: number) => void;
}

const TripList = ({ tripList, completed, pct, completedCount, onToggle, onMenuOpen, onNavigate }: TripListProps) => (
    <div className="sv-trip">
        <TripProgress completedCount={completedCount} total={tripList.length} pct={pct} />
        <ul className="sv-trip-list">
            {tripList.map((item, idx) => (
                <TripListItem
                    key={item.id}
                    item={item}
                    idx={idx}
                    completed={completed}
                    onToggle={onToggle}
                    onMenuOpen={onMenuOpen}
                    onNavigate={onNavigate}
                />
            ))}
        </ul>
        <button className="sv-add-btn">
            <Plus size={15} />
            Add item to My Trip
        </button>
    </div>
);

export default TripList;
