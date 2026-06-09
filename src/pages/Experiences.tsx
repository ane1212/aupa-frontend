import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExperienceCard, SearchBar } from '../components/experiences';
import { useAuth } from '../context';
import { getAppCopy, getCatLabel } from '../i18n/copy';
import { itineraryService, eventService, favoriteService, categoryService } from '../services/API';
import type { ItineraryItem } from '../services/API';
import type { Event } from '../services/models';
import { getCategoryImage } from '../utils/categoryImages';
import { getAppCategoryFromSubcategory } from '../utils/categoryMapper';
import { removeFromTripCache, getTripMeta } from '../utils/tripCache';
import { generateRandomScore } from '../utils/randomScore';
import { getUserLocation, calcDistanceKm, formatDistance } from '../utils/location';
import { GripVertical, Trash2, Check } from 'lucide-react';
import { CATEGORY_ICON_MAP } from '../components/onboarding/onboarding.constants';
import { Bookmark } from 'lucide-react';
import { categories as nearbyCategories } from './Nearby';


interface Experience {
    id: number | string;
    name: string;
    duration: string;
    price: string;
    score: number;
    image: string;
    date?: string;
    category?: string;
    distance?: string;
}

interface TripCard extends ItineraryItem {
    event?: Event;
    meta?: { name: string; image: string; category?: string; score: number; distance?: string };
    distance?: string;
}

type ExpTab = 'all' | 'mytrips';

const Experiences = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const copy = getAppCopy(user?.language);
    const [activeTab, setActiveTab] = useState<ExpTab>('all');
    const [query, setQuery] = useState('');
    const [dbEvents, setDbEvents] = useState<Experience[]>([]);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
    const [savedFavMap, setSavedFavMap] = useState<Record<string, string>>({});
    const [tripItems, setTripItems] = useState<TripCard[]>([]);
    const [loadingAll, setLoadingAll] = useState(true);
    const [loadingTrips, setLoadingTrips] = useState(false);
    const [checkedIds, setCheckedIds] = useState<Set<string>>(() => {
        try {
            const stored = localStorage.getItem(`aupa_trip_checked_${user?.id ?? 'anon'}`);
            return stored ? new Set(JSON.parse(stored)) : new Set();
        } catch { return new Set(); }
    });

    const dragItem = useRef<number | null>(null);
    const dragOver = useRef<number | null>(null);
    const pointerDragIdx = useRef<number | null>(null);

    useEffect(() => {
        const fetchAll = async () => {
            const [eventsRes, favsRes, catsRes, userLoc] = await Promise.allSettled([
                eventService.getAll({ limit: 100 }),
                user ? favoriteService.getByUser(user.id, { limit: 200 }) : Promise.resolve(null),
                categoryService.getAll({ limit: 100 }),
                getUserLocation(),
            ]);
            const userCoords = userLoc.status === 'fulfilled' ? userLoc.value : null;

            const catMap: Record<string, string> = {};
            if (catsRes.status === 'fulfilled' && catsRes.value) {
                for (const cat of (catsRes.value.data ?? [])) {
                    catMap[cat.id] = cat.name;
                }
            }

            if (eventsRes.status === 'fulfilled') {
                const events = eventsRes.value.data ?? [];
                const formatTime = (t?: string) => t ? t.slice(0, 5) : '';
                const formatDate = (d?: string) => {
                    if (!d) return '';
                    const parts = d.split('T')[0].split('-').map(Number);
                    if (parts.length < 3 || parts.some(isNaN)) return '';
                    const [y, m, day] = parts;
                    return new Date(y, m - 1, day).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
                };
                setDbEvents(events.map(ev => {
                    const t1 = formatTime(ev.startTime);
                    const t2 = formatTime(ev.endTime);
                    const appCat = ev.categoryId ? catMap[ev.categoryId] : undefined;
                    let distance: string | undefined;
                    if (userCoords && ev.latitude != null && ev.longitude != null) {
                        const km = calcDistanceKm(userCoords.lat, userCoords.lng, ev.latitude, ev.longitude);
                        distance = formatDistance(km);
                    }
                    return {
                        id: ev.id,
                        name: ev.title,
                        duration: [t1, t2].filter(Boolean).join('–'),
                        date: formatDate(ev.date),
                        category: appCat,
                        distance,
                        price: ev.price === 0 ? 'Gratis' : `€${ev.price}`,
                        score: generateRandomScore(ev.id),
                        image: ev.image || getCategoryImage(getAppCategoryFromSubcategory(ev.categoryId || '')),
                    };
                }));
            }

            if (favsRes.status === 'fulfilled' && favsRes.value) {
                const favs = favsRes.value.data ?? [];
                setSavedIds(new Set(favs.map(f => f.eventId)));
                setSavedFavMap(Object.fromEntries(favs.map(f => [f.eventId, f.id])));
            }

            setLoadingAll(false);
        };
        fetchAll();
    }, [user]);

    useEffect(() => {
        if (activeTab !== 'mytrips') return;
        const fetchTrips = async () => {
            setLoadingTrips(true);
            try {
                const [res, userLoc] = await Promise.allSettled([
                    itineraryService.getMy({ limit: 50 }),
                    getUserLocation(),
                ]);
                const items = res.status === 'fulfilled' ? (res.value.data ?? []) : [];
                const userCoords = userLoc.status === 'fulfilled' ? userLoc.value : null;
                const withEvents = await Promise.all(
                    items.map(async (item) => {
                        try {
                            const event = await eventService.getById(item.eventId);
                            let distance: string | undefined;
                            if (userCoords && event.latitude != null && event.longitude != null) {
                                const km = calcDistanceKm(userCoords.lat, userCoords.lng, event.latitude, event.longitude);
                                distance = formatDistance(km);
                            }
                            return { ...item, event, distance } as TripCard;
                        } catch {
                            const meta = getTripMeta(item.eventId);
                            return { ...item, meta, distance: meta?.distance } as TripCard;
                        }
                    })
                );
                setTripItems(withEvents);
            } catch {
                setTripItems([]);
            } finally {
                setLoadingTrips(false);
            }
        };
        fetchTrips();
    }, [activeTab]);

    const PAGE_SIZE = 6;
    const [page, setPage] = useState(1);

    const filtered = dbEvents
        .filter(e => !query.trim() || e.name.toLowerCase().includes(query.toLowerCase()))
        .filter(e => !activeCategory || e.category === activeCategory);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const handleBookmark = async (eventId: string) => {
        if (!user) return;
        const isSaved = savedIds.has(eventId);
        if (isSaved) {
            const favId = savedFavMap[eventId];
            if (!favId) return;
            setSavedIds(prev => { const n = new Set(prev); n.delete(eventId); return n; });
            setSavedFavMap(prev => { const n = { ...prev }; delete n[eventId]; return n; });
            try { await favoriteService.delete(favId); } catch {
                setSavedIds(prev => new Set([...prev, eventId]));
            }
        } else {
            setSavedIds(prev => new Set([...prev, eventId]));
            try {
                const fav = await favoriteService.create({ eventId });
                setSavedFavMap(prev => ({ ...prev, [eventId]: fav.id }));
            } catch {
                setSavedIds(prev => { const n = new Set(prev); n.delete(eventId); return n; });
            }
        }
    };

    const handleDragStart = (idx: number) => {
        dragItem.current = idx;
    };

    const handleDragEnter = (idx: number) => {
        if (dragItem.current === null || dragItem.current === idx) return;
        setTripItems(prev => {
            const next = [...prev];
            const dragged = next.splice(dragItem.current!, 1)[0];
            next.splice(idx, 0, dragged);
            dragItem.current = idx;
            return next;
        });
    };

    const handleDragEnd = async () => {
        const reordered = tripItems.map((item, idx) => ({ id: item.id, itemIndex: idx }));
        dragItem.current = null;
        dragOver.current = null;
        try {
            await itineraryService.reorder(reordered);
        } catch {
            // orden local ya actualizado
        }
    };

    const handleGripPointerDown = (e: React.PointerEvent, idx: number) => {
        if (e.pointerType === 'mouse') return;
        e.preventDefault();
        e.stopPropagation();
        pointerDragIdx.current = idx;

        const onMove = (ev: PointerEvent) => {
            if (pointerDragIdx.current === null) return;
            const el = document.elementFromPoint(ev.clientX, ev.clientY);
            const card = el?.closest<HTMLElement>('[data-trip-idx]');
            if (!card) return;
            const targetIdx = parseInt(card.dataset.tripIdx ?? '', 10);
            if (isNaN(targetIdx) || targetIdx === pointerDragIdx.current) return;
            setTripItems(prev => {
                const next = [...prev];
                const [dragged] = next.splice(pointerDragIdx.current!, 1);
                next.splice(targetIdx, 0, dragged);
                pointerDragIdx.current = targetIdx;
                return next;
            });
        };

        const onUp = () => {
            pointerDragIdx.current = null;
            document.removeEventListener('pointermove', onMove);
            setTripItems(prev => {
                itineraryService.reorder(prev.map((item, i) => ({ id: item.id, itemIndex: i }))).catch(() => {});
                return prev;
            });
        };

        document.addEventListener('pointermove', onMove);
        document.addEventListener('pointerup', onUp, { once: true });
    };

    const handleRemove = async (id: string) => {
        const item = tripItems.find(i => i.id === id);
        setTripItems(prev => prev.filter(i => i.id !== id));
        setCheckedIds(prev => { const n = new Set(prev); n.delete(id); return n; });
        if (item?.eventId) removeFromTripCache(item.eventId);
        try {
            await itineraryService.remove(id);
        } catch {
            const res = await itineraryService.getMy({ limit: 50 }).catch(() => null);
            if (res) setTripItems(res.data ?? []);
        }
    };

    const toggleCheck = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setCheckedIds(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            try {
                localStorage.setItem(`aupa_trip_checked_${user?.id ?? 'anon'}`, JSON.stringify([...next]));
            } catch { /* */ }
            return next;
        });
    };

    if (loadingAll) {
        return (
            <div className="exp-loading">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500" />
            </div>
        );
    }

    return (
        <div className="experiences">
            <div className="exp-tabs">
                <button
                    className={`exp-tab${activeTab === 'all' ? ' active' : ''}`}
                    onClick={() => setActiveTab('all')}
                >
                    {copy?.experiences?.topExperiences || 'Top Experiences'}
                </button>
                <button
                    className={`exp-tab${activeTab === 'mytrips' ? ' active' : ''}`}
                    onClick={() => setActiveTab('mytrips')}
                >
                    {copy?.experiences?.myTrips || 'My Trips'}
                </button>
            </div>

            {activeTab === 'all' && (
                <>
                    <div className="category-filters">
                            <button
                                className={`category-chip${!activeCategory ? ' selected' : ''}`}
                                onClick={() => { setActiveCategory(null); setPage(1); }}
                            >
                                <span>{copy?.saved?.filterAll ?? 'All'}</span>
                            </button>
                            {nearbyCategories.map(cat => {
                                const Icon = CATEGORY_ICON_MAP[cat] || Bookmark;
                                return (
                                    <button
                                        key={cat}
                                        className={`category-chip${activeCategory === cat ? ' selected' : ''}`}
                                        onClick={() => { setActiveCategory(activeCategory === cat ? null : cat); setPage(1); }}
                                    >
                                        <Icon size={15} />
                                        <span>{getCatLabel(cat, copy)}</span>
                                    </button>
                                );
                            })}
                    </div>
                    <SearchBar
                        value={query}
                        onChange={v => { setQuery(v); setPage(1); setActiveCategory(null); }}
                        placeholder={copy?.experiences?.searchPlaceholder || 'Search'}
                    />
                    <h2 className="exp-title exp-section-title">{copy?.experiences?.topExperiences || 'Top Experiences'}</h2>
                    <ul className="exp-list">
                        {paginated.length > 0
                            ? paginated.map(exp => (
                                <ExperienceCard
                                    key={exp.id}
                                    {...exp}
                                    lang={user?.language}
                                    saved={savedIds.has(String(exp.id))}
                                    onBookmark={() => handleBookmark(String(exp.id))}
                                />
                            ))
                            : <li className="exp-no-results">{copy?.experiences?.noResults || 'No results'}</li>
                        }
                    </ul>
                    {totalPages > 1 && (
                        <div className="exp-pagination">
                            <button
                                className="exp-page-btn"
                                onClick={() => setPage(p => p - 1)}
                                disabled={page === 1}
                            >‹</button>
                            <span className="exp-page-info">{page} / {totalPages}</span>
                            <button
                                className="exp-page-btn"
                                onClick={() => setPage(p => p + 1)}
                                disabled={page === totalPages}
                            >›</button>
                        </div>
                    )}
                </>
            )}

            {activeTab === 'mytrips' && (
                <div className="exp-mytrips">
                    {loadingTrips ? (
                        <div className="exp-loading">
                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-green-500" />
                        </div>
                    ) : tripItems.length === 0 ? (
                        <p className="exp-no-results">{copy?.experiences?.noTrips || 'No trips added yet.'}</p>
                    ) : (() => {
                        const completedCount = tripItems.filter(i => checkedIds.has(i.id)).length;
                        const pct = tripItems.length > 0 ? Math.round((completedCount / tripItems.length) * 100) : 0;
                        return (
                            <>
                                <div className="exp-trip-progress">
                                    <div className="exp-trip-progress-header">
                                        <span className="exp-trip-progress-title">Tu progreso</span>
                                        <span className="exp-trip-progress-count">{completedCount} de {tripItems.length} completados</span>
                                    </div>
                                    <div className="exp-trip-progress-track">
                                        <div className="exp-trip-progress-fill" style={{ width: `${pct}%` }} />
                                    </div>
                                </div>
                                <ul className="exp-trip-list">
                                    {tripItems.map((item, idx) => (
                                        <li
                                            key={item.id}
                                            data-trip-idx={idx}
                                            className={`exp-trip-card${checkedIds.has(item.id) ? ' checked' : ''}`}
                                            draggable
                                            onDragStart={() => handleDragStart(idx)}
                                            onDragEnter={() => handleDragEnter(idx)}
                                            onDragEnd={handleDragEnd}
                                            onDragOver={e => e.preventDefault()}
                                            onClick={() => item.event ? navigate(`/detail/${item.eventId}`) : undefined}
                                        >
                                            <span
                                                className="exp-trip-drag"
                                                aria-hidden="true"
                                                onPointerDown={e => handleGripPointerDown(e, idx)}
                                                onClick={e => e.stopPropagation()}
                                            >
                                                <GripVertical size={18} />
                                            </span>
                                            <button
                                                className={`exp-trip-check${checkedIds.has(item.id) ? ' checked' : ''}`}
                                                aria-label={checkedIds.has(item.id) ? 'Marcar como pendiente' : 'Marcar como visitado'}
                                                onClick={e => toggleCheck(item.id, e)}
                                            >
                                                {checkedIds.has(item.id) && <Check size={12} strokeWidth={3} />}
                                            </button>
                                            {(item.event?.image || item.meta?.image) && (
                                                <div className="exp-card-img-wrap">
                                                    <img className="exp-card-img" src={item.event?.image ?? item.meta?.image} alt={item.event?.title ?? item.meta?.name ?? ''} />
                                                </div>
                                            )}
                                            <div className="exp-trip-info">
                                                <p className="exp-trip-name">
                                                    {item.event?.title ?? item.meta?.name ?? item.eventId}
                                                </p>
                                                {item.event?.address && (
                                                    <p className="exp-trip-meta">{item.event.address}</p>
                                                )}
                                                {item.distance && (
                                                    <p className="exp-trip-meta">{item.distance}</p>
                                                )}
                                            </div>
                                            <button
                                                className="exp-trip-delete"
                                                aria-label="Eliminar del viaje"
                                                onClick={e => { e.stopPropagation(); handleRemove(item.id); }}
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        );
                    })()}
                </div>
            )}
        </div>
    );
};

export default Experiences;
