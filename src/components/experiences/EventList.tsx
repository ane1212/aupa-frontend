import { useState, useEffect } from 'react';
import { eventService } from '../../services/API';
import type { Event } from '../../services/models';
import EventCard from './EventCard';

const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        eventService.getAll()
            .then(res => setEvents(res.data || []))
            .catch(() => setEvents([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="exp-no-results">Loading events…</p>;
    if (events.length === 0) return <p className="exp-no-results">No events available.</p>;

    return (
        <ul className="exp-list">
            {events.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
        </ul>
    );
};

export default EventList;
