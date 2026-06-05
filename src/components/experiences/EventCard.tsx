import type { Event } from '../../services/models';
import PlaceholderImage from './PlaceholderImage';

interface EventCardProps {
    event: Event;
}

const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return isNaN(d.getTime())
        ? dateStr
        : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

const formatPrice = (price: number) =>
    price === 0 ? 'Free' : `€${price}`;

const EventCard = ({ event }: EventCardProps) => (
    <li className="exp-card">
        {event.image
            ? <img className="exp-card-img" src={event.image} alt={event.title} />
            : <PlaceholderImage className="exp-card-img" />
        }
        <div className="exp-card-info">
            <p className="exp-card-name">{event.title}</p>
            <p className="exp-card-meta">
                {formatDate(event.date)} · {event.startTime}{event.endTime ? `–${event.endTime}` : ''}
            </p>
            {event.address && (
                <p className="exp-card-meta">{event.address}</p>
            )}
        </div>
        <div className="exp-card-actions">
            <span className="exp-score-badge">{formatPrice(event.price)}</span>
            <span className="exp-score-label">Price</span>
        </div>
    </li>
);

export default EventCard;
