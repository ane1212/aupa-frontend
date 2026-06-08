import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Clock, MapPin, Bookmark, Plus, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { eventService, favoriteService, itineraryService } from '../services/API';
import { useAuth } from '../context';
import { generateRandomScore } from '../utils/randomScore';

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

const detailDb: DetailData[] = [
    {
        id: 1,
        name: 'Pintxo Crawl',
        category: 'Experience',
        subtitle: 'Food & Drink',
        score: 97,
        duration: '2-3 hours',
        stops: 3,
        budget: '€€',
        description: 'A handpicked route through 3 authentix pintxo bars locals love. Great food, local vibes and stories along the way.',
        places: [
            { id: 1, name: 'Bar El Globo', type: 'Pintxas bar', neighborhood: 'Casco Viejo' },
            { id: 2, name: 'Gure Toki', type: 'Wine bar', neighborhood: 'Ensanche' },
            { id: 3, name: 'La Viña del Ensanche', type: 'Wine bar', neighborhood: 'Ensanche' },
        ],
    },
    {
        id: 2,
        name: 'Gure Toki',
        category: 'Wine Bar',
        subtitle: 'Ensanche',
        score: 93,
        duration: '1-2 hours',
        stops: 1,
        budget: '€€',
        description: 'A beloved wine bar in the Ensanche district, known for its exceptional selection of Basque wines and handcrafted pintxos.',
        places: [
            { id: 1, name: 'Gure Toki', type: 'Wine bar', neighborhood: 'Ensanche' },
        ],
    },
    {
        id: 3,
        name: 'Puente Colgante',
        category: 'Place',
        subtitle: 'Portugalete',
        score: 91,
        duration: '1 hour',
        stops: 1,
        budget: '€',
        description: 'The iconic Hanging Bridge of Biscay, a UNESCO World Heritage Site connecting Getxo and Portugalete across the Nervión river.',
        places: [
            { id: 1, name: 'Puente Colgante', type: 'UNESCO Heritage', neighborhood: 'Portugalete' },
        ],
    },
    {
        id: 4,
        name: 'Guggenheim Museum',
        category: 'Culture',
        subtitle: 'Bilbao',
        score: 98,
        duration: '2-4 hours',
        stops: 1,
        budget: '€€€',
        description: "Frank Gehry's titanium masterpiece on the Nervión riverbank. World-class contemporary art in one of the world's most recognizable buildings.",
        places: [
            { id: 1, name: 'Guggenheim Bilbao', type: 'Museum', neighborhood: 'Abandoibarra' },
        ],
    },
];

const Detail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [item, setItem] = useState<DetailData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [saved, setSaved] = useState(false);
    const [favoriteId, setFavoriteId] = useState<string | null>(null);
    const [inTrip, setInTrip] = useState(false);
    const [itineraryId, setItineraryId] = useState<string | null>(null);
    const [savingFav, setSavingFav] = useState(false);
    const [savingTrip, setSavingTrip] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!id) return;

            // 1. Intentar buscar en la base de datos estática local
            const staticItem = detailDb.find(d => d.id === Number(id));
            if (staticItem) {
                setItem(staticItem);
                setLoading(false);
                return;
            }

            // 2. Si no es un ID numérico estático, buscar en la API del backend
            try {
                const event = await eventService.getById(id);
                if (event) {
                    setItem({
                        id: event.id,
                        name: event.title,
                        category: 'Event',
                        subtitle: event.address || 'Ubicación no especificada',
                        score: generateRandomScore(id),
                        duration: `${event.startTime} ${event.endTime ? `- ${event.endTime}` : ''}`,
                        stops: 1,
                        budget: event.price === 0 ? 'Gratis' : `${event.price}€`,
                        description: event.description || 'Sin descripción detallada.',
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

    useEffect(() => {
        if (!user || !id) return;
        // only check for real (UUID) events, not static demo items
        if (/^\d+$/.test(id)) return;

        const checkStatus = async () => {
            try {
                const [favsRes, tripRes] = await Promise.allSettled([
                    favoriteService.getByUser(user.id, { limit: 100 }),
                    itineraryService.getMy({ limit: 100 }),
                ]);
                if (favsRes.status === 'fulfilled') {
                    const match = favsRes.value.data.find(f => f.eventId === id);
                    if (match) { setSaved(true); setFavoriteId(match.id); }
                }
                if (tripRes.status === 'fulfilled') {
                    const match = tripRes.value.data.find(i => i.eventId === id);
                    if (match) { setInTrip(true); setItineraryId(match.id); }
                }
            } catch { /* silent */ }
        };
        checkStatus();
    }, [id, user]);

    const isRealEvent = item ? /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(item.id)) : false;

    const handleSave = async () => {
        if (savingFav || !item || !isRealEvent) return;
        setSavingFav(true);
        try {
            if (saved && favoriteId) {
                await favoriteService.delete(favoriteId);
                setSaved(false);
                setFavoriteId(null);
            } else {
                try {
                    const fav = await favoriteService.create({ eventId: String(item.id) });
                    setSaved(true);
                    setFavoriteId(fav.id);
                } catch (err: any) {
                    // 409 = ya estaba guardado, reflejar estado correcto
                    if (err?.code === 'FAVORITE_ALREADY_EXISTS' || err?.status === 409) {
                        setSaved(true);
                    }
                }
            }
        } catch { /* silent */ } finally {
            setSavingFav(false);
        }
    };

    const handleAddToTrip = async () => {
        if (savingTrip || !item || !isRealEvent) return;
        setSavingTrip(true);
        try {
            if (inTrip && itineraryId) {
                await itineraryService.remove(itineraryId);
                setInTrip(false);
                setItineraryId(null);
            } else {
                const entry = await itineraryService.addEvent(String(item.id));
                setInTrip(true);
                setItineraryId(entry.id);
            }
        } catch { /* silent */ } finally {
            setSavingTrip(false);
        }
    };

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
                    <p style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>Item not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="detail">
            {/* Scrollable area */}
            <div className="detail-scroll">
                {/* Hero image placeholder */}
                <div className="detail-hero">
                    <button
                        className="detail-hero-btn detail-hero-back"
                        onClick={() => navigate(-1)}
                        aria-label="Volver"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        className="detail-hero-btn detail-hero-share"
                        aria-label="Compartir"
                    >
                        <Share2 size={18} />
                    </button>
                </div>

                {/* Body content */}
                <div className="detail-body">
                    {/* Title + Score */}
                    <div className="detail-header">
                        <div className="detail-header-text">
                            <h1 className="detail-title">{item.name}</h1>
                            <p className="detail-subtitle">{item.category} · {item.subtitle}</p>
                        </div>
                        <div className="detail-score">
                            <span className="detail-score-badge">{item.score}</span>
                            <span className="detail-score-label">Local Score</span>
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="detail-stats">
                        <div className="detail-stat">
                            <Clock size={14} />
                            <span>{item.duration}</span>
                        </div>
                        {item.category !== 'Event' && (
                            <div className="detail-stat">
                                <MapPin size={14} />
                                <span>{item.stops} {item.stops === 1 ? 'stop' : 'stops'}</span>
                            </div>
                        )}
                        <div className="detail-stat">
                            <span className="detail-budget">{item.budget}</span>
                            <span>Budget</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="detail-description">{item.description}</p>

                    {/* You'll visit (Only for experiences, not events) */}
                    {item.category !== 'Event' && (
                        <div className="detail-visits">
                            <h2 className="detail-section-title">You'll visit</h2>
                            <ul className="detail-stops">
                                {item.places.map((place, idx) => (
                                    <li key={place.id} className="detail-stop">
                                        <span className="detail-stop-num">{idx + 1}</span>
                                        <div>
                                            <p className="detail-stop-name">{place.name}</p>
                                            <p className="detail-stop-sub">{place.type} · {place.neighborhood}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky action bar (Only shown for non-locals) */}
            {user?.role !== 'local' && (
                <div className="detail-actions">
                    <button
                        className={`detail-btn-save${saved ? ' active' : ''}`}
                        onClick={handleSave}
                        disabled={savingFav || !isRealEvent}
                    >
                        <Bookmark size={16} />
                        {saved ? 'Saved' : 'Save'}
                    </button>
                    <button
                        className={`detail-btn-trip${inTrip ? ' active' : ''}`}
                        onClick={handleAddToTrip}
                        disabled={savingTrip || !isRealEvent}
                    >
                        {inTrip ? <Check size={16} /> : <Plus size={16} />}
                        {inTrip ? 'In My Trip' : 'Add to My Trip'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Detail;
