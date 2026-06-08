import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExperienceCard, SearchBar } from '../components/experiences';
import { useAuth } from '../context';
import { getAppCopy } from '../i18n/copy';
import { itineraryService, eventService, favoriteService, categoryService } from '../services/API';
import type { ItineraryItem } from '../services/API';
import type { Event } from '../services/models';
import { getCategoryImage } from '../utils/categoryImages';
import { getAppCategoryFromSubcategory } from '../utils/categoryMapper';
import { generateRandomScore } from '../utils/randomScore';
import { getUserLocation, calcDistanceKm, formatDistance } from '../utils/location';
import { GripVertical, Trash2 } from 'lucide-react';

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
}

type ExpTab = 'all' | 'mytrips';

const Experiences = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const copy = getAppCopy(user?.language);
    const [activeTab, setActiveTab] = useState<ExpTab>('all');
    const [query, setQuery] = useState('');
    const [dbEvents, setDbEvents] = useState<Experience[]>([]);
    const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
    const [savedFavMap, setSavedFavMap] = useState<Record<string, string>>({});
    const [tripItems, setTripItems] = useState<TripCard[]>([]);
    const [loadingAll, setLoadingAll] = useState(true);
    const [loadingTrips, setLoadingTrips] = useState(false);

    const dragItem = useRef<number | null>(null);
    const dragOver = useRef<number | null>(null);

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
                const res = await itineraryService.getMy({ limit: 50 });
                const items = res.data ?? [];
                const withEvents = await Promise.all(
                    items.map(async (item) => {
                        try {
                            const event = await eventService.getById(item.eventId);
                            return { ...item, event };
                        } catch {
                            return item as TripCard;
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

    const filtered = query.trim()
        ? dbEvents.filter(e => e.name.toLowerCase().includes(query.toLowerCase()))
        : dbEvents;

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

    const handleRemove = async (id: string) => {
        setTripItems(prev => prev.filter(i => i.id !== id));
        try {
            await itineraryService.remove(id);
        } catch {
            const res = await itineraryService.getMy({ limit: 50 }).catch(() => null);
            if (res) setTripItems(res.data ?? []);
        }
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
                    <SearchBar
                        value={query}
                        onChange={setQuery}
                        placeholder={copy?.experiences?.searchPlaceholder || 'Search'}
                    />
                    <h2 className="exp-title exp-section-title">{copy?.experiences?.topExperiences || 'Top Experiences'}</h2>
                    <ul className="exp-list">
                        {filtered.length > 0
                            ? filtered.map(exp => (
                                <ExperienceCard
                                    key={exp.id}
                                    {...exp}
                                    saved={savedIds.has(String(exp.id))}
                                    onBookmark={() => handleBookmark(String(exp.id))}
                                />
                            ))
                            : <li className="exp-no-results">{copy?.experiences?.noResults || 'No results'}</li>
                        }
                    </ul>
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
                    ) : (
                        <ul className="exp-trip-list">
                            {tripItems.map((item, idx) => (
                                <li
                                    key={item.id}
                                    className="exp-trip-card"
                                    draggable
                                    onDragStart={() => handleDragStart(idx)}
                                    onDragEnter={() => handleDragEnter(idx)}
                                    onDragEnd={handleDragEnd}
                                    onDragOver={e => e.preventDefault()}
                                    onClick={() => navigate(`/detail/${item.eventId}`)}
                                >
                                    <span className="exp-trip-drag" aria-hidden="true" onClick={e => e.stopPropagation()}>
                                        <GripVertical size={18} />
                                    </span>
                                    <span className="exp-trip-index">{idx + 1}</span>
                                    {item.event?.image && (
                                        <img className="exp-card-img" src={item.event.image} alt={item.event?.title ?? ''} />
                                    )}
                                    <div className="exp-trip-info">
                                        <p className="exp-trip-name">
                                            {item.event?.title ?? item.eventId}
                                        </p>
                                        {item.event?.address && (
                                            <p className="exp-trip-meta">{item.event.address}</p>
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
                    )}
                </div>
            )}
        </div>
    );
};

export default Experiences;
