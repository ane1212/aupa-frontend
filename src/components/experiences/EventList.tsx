import { useState, useEffect } from 'react';
import { eventService, categoryService } from '../../services/API';
import type { Event } from '../../services/models';
import EventCard from './EventCard';

const EventList: React.FC<{ lang?: string }> = ({ lang }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            eventService.getAll(),
            categoryService.getAll({ limit: 100 }),
        ])
            .then(([eventsRes, catsRes]) => {
                setEvents(eventsRes.data || []);
                const map: Record<string, string> = {};
                for (const cat of (catsRes.data || [])) {
                    map[cat.id] = cat.name;
                }
                setCategoryMap(map);
            })
            .catch(() => setEvents([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="exp-no-results">Loading events…</p>;
    if (events.length === 0) return <p className="exp-no-results">No events available.</p>;

    return (
        <ul className="exp-list">
            {events.map(event => (
                <EventCard key={event.id} event={event} categoryName={event.categoryId ? categoryMap[event.categoryId] : undefined} lang={lang} />
            ))}
        </ul>
    );
};

export default EventList;
