import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, MapPin, Bookmark, Plus, Check, Clock, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { eventService, favoriteService, itineraryService, commentService, categoryService } from '../services/API';
import { useAuth } from '../context';
import { getAppCopy, getCatLabel, type AppCopy } from '../i18n/copy';
import CommentForm from '../components/common/CommentForm';
import { generateRandomScore } from '../utils/randomScore';
import { getUserLocation, calcDistanceKm, formatDistance } from '../utils/location';
import type { Comment } from '../services/models';

// ─── helpers ─────────────────────────────────────────────────────────────────

const fmt = (t?: string) => t ? t.slice(0, 5) : '';

const openNow = (start?: string, end?: string): boolean | null => {
    if (!start) return null;
    const toMin = (s: string) => { const [h, m] = s.split(':').map(Number); return h * 60 + (m || 0); };
    const now = new Date().getHours() * 60 + new Date().getMinutes();
    const s = toMin(start);
    if (!end) return now >= s;
    const e = toMin(end);
    return e > s ? now >= s && now < e : now >= s || now < e;
};

const walkTime = (km: number) => {
    const m = Math.round(km * 12);
    return m < 60 ? `${m} min a pie` : `${Math.floor(m / 60)}h ${m % 60}min a pie`;
};


// ─── sub-components ───────────────────────────────────────────────────────────

const StarBar = ({ star, count, total }: { star: number; count: number; total: number }) => (
    <div className="detail-star-row">
        <span className="detail-star-num">{star}</span>
        <Star size={10} fill="#f59e0b" color="#f59e0b" />
        <div className="detail-star-track">
            <div className="detail-star-fill" style={{ width: total > 0 ? `${(count / total) * 100}%` : '0%' }} />
        </div>
        <span className="detail-star-count">{count}</span>
    </div>
);

interface NearbyItem { id: string; name: string; image?: string; categoryName?: string; price: number; distance?: string; }

const NearbyCard = ({ item, onClick, copy }: { item: NearbyItem; onClick: () => void; copy: AppCopy }) => (
    <div className="detail-nearby-card" onClick={onClick}>
        <div className="detail-nearby-img">
            {item.image ? <img src={item.image} alt={item.name} /> : <div className="detail-nearby-placeholder" />}
        </div>
        <p className="detail-nearby-name">{item.name}</p>
        <p className="detail-nearby-meta">
            {item.categoryName ? getCatLabel(item.categoryName, copy) : ''}
            {item.distance ? ` · ${item.distance}` : ''}
        </p>
        <p className="detail-nearby-price">{item.price === 0 ? 'Gratis' : `€${item.price}`}</p>
    </div>
);

// ─── legacy static demo items ─────────────────────────────────────────────────

const staticItems = [
    {
        id: 1, name: 'Pintxo Crawl', category: 'Experiencia', subtitle: 'Comida & Bebida', score: 97,
        duration: '2-3 horas', budget: '€€',
        description: 'Ruta handpicked por 3 bares de pintxos que aman los locales. Buena comida, ambiente local e historias por el camino.',
        stops: [
            { id: 1, name: 'Bar El Globo', type: 'Bar de pintxos', neighborhood: 'Casco Viejo' },
            { id: 2, name: 'Gure Toki', type: 'Wine bar', neighborhood: 'Ensanche' },
            { id: 3, name: 'La Viña del Ensanche', type: 'Wine bar', neighborhood: 'Ensanche' },
        ],
    },
    {
        id: 2, name: 'Gure Toki', category: 'Wine Bar', subtitle: 'Ensanche', score: 93,
        duration: '1-2 horas', budget: '€€',
        description: 'Querido wine bar en el Ensanche, conocido por su excepcional selección de vinos vascos y pintxos artesanales.',
        stops: [{ id: 1, name: 'Gure Toki', type: 'Wine bar', neighborhood: 'Ensanche' }],
    },
    {
        id: 3, name: 'Puente Colgante', category: 'Lugar', subtitle: 'Portugalete', score: 91,
        duration: '1 hora', budget: '€',
        description: 'El icónico Puente Bizkaia, Patrimonio de la Humanidad UNESCO que conecta Getxo y Portugalete sobre la ría del Nervión.',
        stops: [{ id: 1, name: 'Puente Colgante', type: 'Patrimonio UNESCO', neighborhood: 'Portugalete' }],
    },
    {
        id: 4, name: 'Guggenheim Museum', category: 'Cultura', subtitle: 'Bilbao', score: 98,
        duration: '2-4 horas', budget: '€€€',
        description: "La obra maestra de titanio de Frank Gehry a orillas del Nervión. Arte contemporáneo de clase mundial en uno de los edificios más reconocibles del mundo.",
        stops: [{ id: 1, name: 'Guggenheim Bilbao', type: 'Museo', neighborhood: 'Abandoibarra' }],
    },
];

// ─── main component ───────────────────────────────────────────────────────────

const Detail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const copy = getAppCopy(user?.language);

    const [eventData, setEventData] = useState<any | null>(null);
    const [staticItem, setStaticItem] = useState<typeof staticItems[0] | null>(null);
    const [catLabel, setCatLabel] = useState<string | undefined>();
    const [distStr, setDistStr] = useState<string | undefined>();
    const [walkStr, setWalkStr] = useState<string | undefined>();
    const [score, setScore] = useState(0);
    const [comments, setComments] = useState<Comment[]>([]);
    const [nearby, setNearby] = useState<NearbyItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);

    const [saved, setSaved] = useState(false);
    const [favoriteId, setFavoriteId] = useState<string | null>(null);
    const [inTrip, setInTrip] = useState(false);
    const [itineraryId, setItineraryId] = useState<string | null>(null);
    const [savingFav, setSavingFav] = useState(false);
    const [savingTrip, setSavingTrip] = useState(false);

    const isRealEvent = !!eventData;

    useEffect(() => {
        if (!id) return;

        // Static demo items (legacy numeric IDs)
        const numId = Number(id);
        if (!isNaN(numId)) {
            const found = staticItems.find(s => s.id === numId);
            if (found) {
                setStaticItem(found);
                setScore(found.score);
                setLoading(false);
                return;
            }
        }

        // Real API event
        const load = async () => {
            try {
                const [evRes, catsRes, commRes, allRes, locRes, favsRes, tripRes] = await Promise.allSettled([
                    eventService.getById(id),
                    categoryService.getAll({ limit: 100 }),
                    commentService.getByEvent(id, { limit: 50 }),
                    eventService.getAll({ limit: 20 }),
                    getUserLocation(),
                    user ? favoriteService.getByUser(user.id, { limit: 200 }) : Promise.resolve(null),
                    user ? itineraryService.getMy({ limit: 100 }) : Promise.resolve(null),
                ]);

                if (evRes.status !== 'fulfilled') { setLoading(false); return; }
                const ev = evRes.value;
                setEventData(ev);
                setScore(generateRandomScore(id));

                // Category label
                const catMap: Record<string, string> = {};
                if (catsRes.status === 'fulfilled') {
                    for (const c of (catsRes.value.data ?? [])) catMap[c.id] = c.name;
                }
                if (ev.categoryId && catMap[ev.categoryId]) {
                    setCatLabel(getCatLabel(catMap[ev.categoryId], copy));
                }

                // Distance
                const loc = locRes.status === 'fulfilled' ? locRes.value : null;
                if (loc && ev.latitude != null && ev.longitude != null) {
                    const km = calcDistanceKm(loc.lat, loc.lng, ev.latitude, ev.longitude);
                    setDistStr(formatDistance(km));
                    setWalkStr(walkTime(km));
                }

                // Comments / reviews
                if (commRes.status === 'fulfilled') setComments(commRes.value.data ?? []);

                // Nearby events
                if (allRes.status === 'fulfilled') {
                    const others = (allRes.value.data ?? []).filter(e => e.id !== id).slice(0, 4);
                    setNearby(others.map(e => ({
                        id: e.id,
                        name: e.title,
                        image: e.image,
                        categoryName: e.categoryId ? catMap[e.categoryId] : undefined,
                        price: e.price,
                        distance: (loc && e.latitude != null && e.longitude != null)
                            ? formatDistance(calcDistanceKm(loc.lat, loc.lng, e.latitude, e.longitude))
                            : undefined,
                    })));
                }

                // Save / trip status
                if (favsRes.status === 'fulfilled' && favsRes.value) {
                    const m = favsRes.value.data.find(f => f.eventId === id);
                    if (m) { setSaved(true); setFavoriteId(m.id); }
                }
                if (tripRes.status === 'fulfilled' && tripRes.value) {
                    const m = tripRes.value.data.find(i => i.eventId === id);
                    if (m) { setInTrip(true); setItineraryId(m.id); }
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id, user]);

    const handleSave = async () => {
        if (savingFav || !isRealEvent || !user) return;
        setSavingFav(true);
        try {
            if (saved && favoriteId) {
                await favoriteService.delete(favoriteId);
                setSaved(false); setFavoriteId(null);
            } else {
                try {
                    const fav = await favoriteService.create({ eventId: String(eventData!.id) });
                    setSaved(true); setFavoriteId(fav.id);
                } catch (err: any) {
                    if (err?.code === 'FAVORITE_ALREADY_EXISTS' || err?.status === 409) {
                        setSaved(true);
                    }
                }
            }
        } catch { /* delete error, silent */ } finally { setSavingFav(false); }
    };

    const handleAddToTrip = async () => {
        if (savingTrip || !isRealEvent || !user) return;
        setSavingTrip(true);
        try {
            if (inTrip && itineraryId) {
                await itineraryService.remove(itineraryId);
                setInTrip(false); setItineraryId(null);
            } else {
                const entry = await itineraryService.addEvent(String(eventData!.id));
                setInTrip(true); setItineraryId(entry.id);
            }
        } catch { /* silent */ } finally { setSavingTrip(false); }
    };

    // Derived
    const openStatus = eventData ? openNow(eventData.startTime, eventData.endTime) : null;
    const avgRating = comments.length > 0
        ? comments.reduce((s, c) => s + c.rating, 0) / comments.length
        : null;
    const starCounts = [5, 4, 3, 2, 1].reduce((acc, n) => {
        acc[n] = comments.filter(c => Math.round(c.rating) === n).length;
        return acc;
    }, {} as Record<number, number>);

    const descText: string = eventData?.description || (staticItem as any)?.description || '';

    if (loading) return (
        <div className="detail detail-loading">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500" />
        </div>
    );

    if (!eventData && !staticItem) return (
        <div className="detail">
            <div className="detail-scroll">
                <div className="detail-hero">
                    <button className="detail-hero-btn detail-hero-back" onClick={() => navigate(-1)}><ChevronLeft size={20} /></button>
                </div>
                <p style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>No encontrado</p>
            </div>
        </div>
    );

    return (
        <div className="detail">
            <div className="detail-scroll">

                {/* ── Hero ── */}
                <div className="detail-hero">
                    {eventData?.image && (
                        <img className="detail-hero-img" src={eventData.image} alt={eventData.title} />
                    )}
                    <button className="detail-hero-btn detail-hero-back" onClick={() => navigate(-1)} aria-label="Volver">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="detail-hero-btn detail-hero-share" aria-label="Compartir">
                        <Share2 size={18} />
                    </button>
                </div>

                <div className="detail-body">

                    {/* ── Header: title + score ── */}
                    <div className="detail-header">
                        <div className="detail-header-text">
                            <h1 className="detail-title">{eventData?.title ?? staticItem?.name}</h1>
                            <p className="detail-subtitle">
                                {catLabel ?? staticItem?.category}
                                {(eventData?.address || staticItem?.subtitle)
                                    ? ` · ${eventData?.address ?? staticItem?.subtitle}`
                                    : ''}
                            </p>
                        </div>
                        <div className="detail-score">
                            <span className="detail-score-badge">{score}</span>
                            <span className="detail-score-label">Local Score</span>
                        </div>
                    </div>

                    {/* ── Stats row ── */}
                    <div className="detail-stats">
                        {/* col 1: distance / time */}
                        {eventData && distStr ? (
                            <div className="detail-stat">
                                <MapPin size={14} className="detail-stat-icon" />
                                <div className="detail-stat-text">
                                    <span className="detail-stat-main">{distStr}</span>
                                    {walkStr && <span className="detail-stat-sub">{walkStr}</span>}
                                </div>
                            </div>
                        ) : (
                            <div className="detail-stat">
                                <Clock size={14} className="detail-stat-icon" />
                                <div className="detail-stat-text">
                                    <span className="detail-stat-main">
                                        {eventData ? fmt(eventData.startTime) : staticItem?.duration}
                                    </span>
                                    {eventData?.endTime && (
                                        <span className="detail-stat-sub">hasta {fmt(eventData.endTime)}</span>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* col 2: price */}
                        <div className="detail-stat">
                            <div className="detail-stat-text">
                                <span className="detail-stat-main detail-budget">
                                    {eventData
                                        ? (eventData.price === 0 ? 'Gratis' : `€${eventData.price}`)
                                        : staticItem?.budget}
                                </span>
                                <span className="detail-stat-sub">
                                    {eventData?.price === 0 ? 'Entrada libre' : 'Precio'}
                                </span>
                            </div>
                        </div>

                        {/* col 3: open status / stops */}
                        {eventData ? (
                            <div className="detail-stat">
                                <span className={`detail-open-dot${openStatus === true ? ' open' : openStatus === false ? ' closed' : ''}`} />
                                <div className="detail-stat-text">
                                    <span className="detail-stat-main">
                                        {openStatus === true ? 'Abierto' : openStatus === false ? 'Cerrado' : 'Horario'}
                                    </span>
                                    {eventData.endTime && (
                                        <span className="detail-stat-sub">Cierra {fmt(eventData.endTime)}</span>
                                    )}
                                </div>
                            </div>
                        ) : staticItem && (
                            <div className="detail-stat">
                                <MapPin size={14} className="detail-stat-icon" />
                                <div className="detail-stat-text">
                                    <span className="detail-stat-main">{staticItem.stops.length} {staticItem.stops.length === 1 ? 'parada' : 'paradas'}</span>
                                </div>
                            </div>
                        )}
                    </div>


                    {/* ── About / description ── */}
                    {descText && (
                        <div className="detail-about">
                            <h2 className="detail-section-title">Sobre este lugar</h2>
                            <p className={`detail-description${expanded ? '' : ' detail-description-clamped'}`}>
                                {descText}
                            </p>
                            {descText.length > 160 && (
                                <button className="detail-show-more" onClick={() => setExpanded(v => !v)}>
                                    {expanded ? 'Ver menos ∧' : 'Ver más ∨'}
                                </button>
                            )}
                        </div>
                    )}

                    {/* ── Reviews ── */}
                    {comments.length > 0 && avgRating !== null && (
                        <div className="detail-reviews">
                            <div className="detail-section-head">
                                <h2 className="detail-section-title">Reseñas</h2>
                                <span className="detail-reviews-link">
                                    <Star size={13} fill="#f59e0b" color="#f59e0b" />
                                    <span>{avgRating.toFixed(1)} ({comments.length})</span>
                                </span>
                            </div>
                            <div className="detail-stars-breakdown">
                                {[5, 4, 3, 2, 1].map(n => (
                                    <StarBar key={n} star={n} count={starCounts[n] ?? 0} total={comments.length} />
                                ))}
                            </div>
                            <ul className="detail-comments">
                                {comments.slice(0, 5).map(c => (
                                    <li key={c.id} className="detail-comment">
                                        <div className="detail-comment-head">
                                            <div className="detail-comment-avatar">
                                                {c.userId.slice(0, 1).toUpperCase()}
                                            </div>
                                            <div className="detail-comment-stars">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={11}
                                                        fill={i < Math.round(c.rating) ? '#f59e0b' : 'none'}
                                                        color={i < Math.round(c.rating) ? '#f59e0b' : '#ccc'}
                                                    />
                                                ))}
                                            </div>
                                            {c.createdAt && (
                                                <span className="detail-comment-date">
                                                    {new Date(c.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                                                </span>
                                            )}
                                        </div>
                                        {c.content && <p className="detail-comment-text">{c.content}</p>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* ── Add comment ── */}
                    {isRealEvent && user && (
                        <div className="detail-reviews">
                            <h2 className="detail-section-title">Añadir reseña</h2>
                            <CommentForm
                                eventId={String(eventData.id)}
                                onAdded={c => setComments(prev => [c, ...prev])}
                            />
                        </div>
                    )}

                    {/* ── Static stops (legacy experiences) ── */}
                    {staticItem && staticItem.stops.length > 0 && (
                        <div className="detail-visits">
                            <h2 className="detail-section-title">Visitarás</h2>
                            <ul className="detail-stops">
                                {staticItem.stops.map((stop, idx) => (
                                    <li key={stop.id} className="detail-stop">
                                        <span className="detail-stop-num">{idx + 1}</span>
                                        <div>
                                            <p className="detail-stop-name">{stop.name}</p>
                                            <p className="detail-stop-sub">{stop.type} · {stop.neighborhood}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* ── Nearby similar places ── */}
                    {nearby.length > 0 && (
                        <div className="detail-nearby">
                            <h2 className="detail-section-title">Lugares similares cerca</h2>
                            <div className="detail-nearby-scroll">
                                {nearby.map(item => (
                                    <NearbyCard
                                        key={item.id}
                                        item={item}
                                        copy={copy}
                                        onClick={() => navigate(`/detail/${item.id}`)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{ height: 8 }} />
                </div>
            </div>

            {/* ── Action bar ── */}
            {user && user.role !== 'local' && (
                <div className="detail-actions">
                    <button
                        className={`detail-btn-save${saved ? ' active' : ''}`}
                        onClick={handleSave}
                        disabled={savingFav || !isRealEvent}
                    >
                        <Bookmark size={16} />
                        {saved ? 'Guardado' : 'Guardar'}
                    </button>
                    <button
                        className={`detail-btn-trip${inTrip ? ' active' : ''}`}
                        onClick={handleAddToTrip}
                        disabled={savingTrip || !isRealEvent}
                    >
                        {inTrip ? <Check size={16} /> : <Plus size={16} />}
                        {inTrip ? 'En mi viaje' : '+ Añadir al viaje'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Detail;
