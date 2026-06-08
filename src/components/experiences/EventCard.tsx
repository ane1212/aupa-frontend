import type { Event } from '../../services/models';
import PlaceholderImage from './PlaceholderImage';

interface EventCardProps {
    event: Event;
    categoryName?: string;
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

const CATEGORY_LABELS: Record<string, string> = {
    food: 'Comida',
    bars: 'Bares',
    experiences: 'Experiencias',
    places: 'Lugares',
    culture: 'Cultura',
    nature: 'Naturaleza',
    shopping: 'Compras',
    nightlife: 'Noche',
    coffee_shops: 'Cafeterías',
    walking_tours: 'Rutas',
    family_friendly: 'Familia',
    history: 'Historia',
    festivals_events: 'Eventos',
    beaches: 'Playas',
    budget_friendly: 'Económico',
    local_favorites: 'Favoritos',
};

const EventCard = ({ event, categoryName }: EventCardProps) => {
    const dateLabel = formatDate(event.date);
    const timeLabel = event.startTime ? `${event.startTime}${event.endTime ? `–${event.endTime}` : ''}` : '';
    const catLabel = categoryName ? (CATEGORY_LABELS[categoryName] ?? categoryName) : null;

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
