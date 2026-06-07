import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Clock, MapPin, Calendar, Euro, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { eventService } from '../../../services/API';
import { useAuth } from '../../../context';
import { getAppCopy } from '../../../i18n/copy';

const DATE_LOCALES: Record<string, string> = {
    en: 'en-GB',
    es: 'es-ES',
    eu: 'eu-ES',
    fr: 'fr-FR',
};

interface Stop {
    id: number | string;
    name: string;
    type: string;
    neighborhood: string;
}

interface DetailData {
    id: number | string;
    name: string;
    category: string;
    subtitle: string;
    score: number;
    duration: string;
    stops: number;
    budget: string;
    description: string;
    places: Stop[];
}

const LocalDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const t = getAppCopy(user?.language).localDash;
    const dateLocale = DATE_LOCALES[user?.language ?? 'en'] ?? 'en-GB';

    const [item, setItem] = useState<DetailData | null>(null);
    const [rawEvent, setRawEvent] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!id) return;

            try {
                const event = await eventService.getById(id);
                if (event) {
                    setRawEvent(event);
                    setItem({
                        id: event.id,
                        name: event.title,
                        category: 'Event',
                        subtitle: event.address || t.unspecifiedLocation,
                        score: 95,
                        duration: `${event.startTime} ${event.endTime ? `- ${event.endTime}` : ''}`,
                        stops: 1,
                        budget: event.price === 0 ? t.free : `${event.price}€`,
                        description: event.description || t.noDescription,
                        places: [
                            { id: event.id, name: event.title, type: 'Evento', neighborhood: event.address || '' }
                        ]
                    });
                }
            } catch (error) {
                console.error("Error al obtener detalles del evento desde API:", error);
                setItem(null);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="detail" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="detail">
                <div className="detail-scroll">
                    <button className="detail-hero-btn detail-hero-back" onClick={() => navigate(-1)}>
                        <ChevronLeft size={20} />
                    </button>
                    <p style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>{t.notFound}</p>
                </div>
            </div>
        );
    }

    const title = rawEvent ? rawEvent.title : item.name;
    const description = rawEvent ? rawEvent.description : item.description;
    const dateStr = rawEvent ? new Date(rawEvent.date).toLocaleDateString(dateLocale, { day: 'numeric', month: 'long', year: 'numeric' }) : '';
    const timeStr = rawEvent ? `${rawEvent.startTime.substring(0, 5)}${rawEvent.endTime ? ` - ${rawEvent.endTime.substring(0, 5)}` : ''}` : item.duration;
    const priceStr = rawEvent ? (rawEvent.price === 0 ? t.free : `${rawEvent.price}€`) : item.budget;
    const capacityStr = rawEvent && rawEvent.capacity ? `${rawEvent.capacity} ${t.people}` : undefined;
    const addressStr = rawEvent ? rawEvent.address : item.subtitle;
    const imageUrl = rawEvent ? rawEvent.image : undefined;

    return (
        <div className="detail" style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '2rem' }}>
            <div className="detail-scroll">
                {/* Header bar */}
                <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e2e8f0', background: 'white', position: 'sticky', top: 0, zIndex: 10 }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#1e293b' }}>
                        <ChevronLeft size={24} />
                    </button>
                    <span style={{ marginLeft: '1rem', fontWeight: 600, fontSize: '1.1rem', color: '#1e293b' }}>{t.eventDetailsTitle}</span>
                </div>

                {/* Image preview */}
                {imageUrl && (
                    <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                        <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                )}

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Title */}
                    <div>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>{title}</h1>
                        <span style={{ display: 'inline-block', background: '#dcfce7', color: '#15803d', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>{t.eventPublished}</span>
                    </div>

                    {/* Description */}
                    {description && (
                        <div style={{ background: 'white', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>{t.fieldDescription}</h3>
                            <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>{description}</p>
                        </div>
                    )}

                    {/* Info details list */}
                    <div style={{ background: 'white', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {dateStr && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{t.labelDate}</p>
                                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>{dateStr}</p>
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
                                <Clock size={18} />
                            </div>
                            <div>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{t.labelSchedule}</p>
                                <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>{timeStr}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
                                <Euro size={18} />
                            </div>
                            <div>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{t.labelPrice}</p>
                                <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>{priceStr}</p>
                            </div>
                        </div>

                        {capacityStr && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
                                    <Users size={18} />
                                </div>
                                <div>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{t.labelCapacity}</p>
                                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>{capacityStr}</p>
                                </div>
                            </div>
                        )}

                        {addressStr && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>{t.labelLocation}</p>
                                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>{addressStr}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocalDetail;
