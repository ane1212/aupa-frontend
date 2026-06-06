import React from 'react';
import type { Event } from '../../../../services/models';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LocalEventCardProps {
    event: Event;
    onToggleActive?: (id: string) => void;
}

const LocalEventCard: React.FC<LocalEventCardProps> = ({ event, onToggleActive }) => {
    return (
        <Link 
            to={`/local/detail/${event.id}`} 
            className="local-event-card"
            style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: '1rem', cursor: 'pointer' }}
        >
            {event.image ? (
                <img src={event.image} alt={event.title} className="local-event-img" />
            ) : (
                <div className="local-event-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e2e8f0', color: '#94a3b8' }}>
                    Sin Imagen
                </div>
            )}
            <div className="local-event-info">
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 className="local-event-title">{event.title}</h3>
                        <span className={`local-event-badge ${event.active ? 'local-badge-active' : 'local-badge-inactive'}`}>
                            {event.active ? 'Activo' : 'Inactivo'}
                        </span>
                    </div>
                    
                    {event.description && (
                        <p style={{ margin: '4px 0', fontSize: '0.8rem', color: '#64748b', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {event.description}
                        </p>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} />
                        {new Date(event.date).toLocaleDateString()}
                    </span>
                    {event.address && (
                        <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={12} />
                            {event.address}
                        </span>
                    )}
                    <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Tag size={12} />
                        {event.price === 0 ? 'Gratis' : `${event.price}€`}
                    </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '8px', alignSelf: 'flex-end' }}>
                    <Link
                        to={`/local/edit/${event.id}`}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#64748b',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            textDecoration: 'none'
                        }}
                    >
                        Editar
                    </Link>
                    {onToggleActive && (
                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onToggleActive(event.id);
                            }}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#22c55e',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                padding: 0
                            }}
                        >
                            Cambiar Estado
                        </button>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default LocalEventCard;
