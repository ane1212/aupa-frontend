import type { Event } from '../../services/models';
import PlaceholderImage from './PlaceholderImage';
import { getAppCopy, getCatLabel } from '../../i18n/copy';

interface EventCardProps {
    event: Event;
    categoryName?: string;
    lang?: string;
}

const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return '';
    const parts = dateStr.split('T')[0].split('-').map(Number);
    if (parts.length < 3 || parts.some(isNaN)) return '';
    const [y, m, d] = parts;
    const local = new Date(y, m - 1, d);
    return local.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
};

const formatPrice = (price: number) =>
    price === 0 ? 'Gratis' : `€${price}`;

const EventCard = ({ event, categoryName, lang }: EventCardProps) => {
    const copy = getAppCopy(lang);
    const dateLabel = formatDate(event.date);
    const timeLabel = event.startTime ? `${event.startTime}${event.endTime ? `–${event.endTime}` : ''}` : '';
    const catLabel = categoryName ? getCatLabel(categoryName, copy) : null;

    return (
        <li className="exp-card">
            {event.image
                ? <img className="exp-card-img" src={event.image} alt={event.title} />
                : <PlaceholderImage className="exp-card-img" />
            }
            <div className="exp-card-info">
                <p className="exp-card-name">{event.title}</p>
                {(dateLabel || timeLabel) && (
                    <p className="exp-card-meta">
                        {[dateLabel, timeLabel].filter(Boolean).join(' · ')}
                    </p>
                )}
                {catLabel && <p className="exp-card-meta exp-card-cat">{catLabel}</p>}
                {event.address && (
                    <p className="exp-card-meta">{event.address}</p>
                )}
            </div>
            <div className="exp-card-actions">
                <span className="exp-score-badge">{formatPrice(event.price)}</span>
                <span className="exp-score-label">Precio</span>
            </div>
        </li>
    );
};

export default EventCard;
