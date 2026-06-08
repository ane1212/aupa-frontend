import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, MapPin, Star } from 'lucide-react';
import { generateRandomScore } from '../utils/randomScore';
import { formatDistance, getUserLocation, TEST_LOCATION } from '../utils/location';
import { getCategoryImage } from '../utils/categoryImages';
import { fastapiService } from '../services/API';
import type { Recommendation } from '../services/models';

const CATEGORY_LABELS: Record<string, string> = {
    food: 'Comida', bars: 'Bares', experiences: 'Experiencias', places: 'Lugares',
    culture: 'Cultura', nature: 'Naturaleza', shopping: 'Compras', nightlife: 'Noche',
    coffee_shops: 'Cafeterías', walking_tours: 'Rutas', family_friendly: 'Familia',
    history: 'Historia', festivals_events: 'Eventos', beaches: 'Playas',
    budget_friendly: 'Económico', local_favorites: 'Favoritos locales',
};

const StarRow = ({ rating, count, total }: { rating: number; count: number; total: number }) => (
    <div className="detail-star-row">
        <span className="detail-star-num">{rating}</span>
        <Star size={10} fill="#f59e0b" color="#f59e0b" />
        <div className="detail-star-track">
            <div className="detail-star-fill" style={{ width: total > 0 ? `${(count / total) * 100}%` : '0%' }} />
        </div>
        <span className="detail-star-count">{count}</span>
    </div>
);

const NearbyDetail = () => {
    const navigate = useNavigate();
    const { state } = useLocation() as { state: { rec: Recommendation } | null };
    const rec = state?.rec;

    const [similar, setSimilar] = useState<Recommendation[]>([]);

    useEffect(() => {
        if (!rec) return;
        const fetch = async () => {
            try {
                const loc = await getUserLocation() ?? TEST_LOCATION;
                const res = await fastapiService.byCategory(rec.category, loc.lat, loc.lng);
                setSimilar(
                    (res.recommendations ?? [])
                        .filter(r => r.name !== rec.name)
                        .slice(0, 6)
                );
            } catch {
                setSimilar([]);
            }
        };
        fetch();
    }, [rec?.name]);

    if (!rec) return (
        <div className="detail">
            <div className="detail-scroll">
                <div className="detail-hero">
                    <button className="detail-hero-btn detail-hero-back" onClick={() => navigate(-1)}>
                        <ChevronLeft size={20} />
                    </button>
                </div>
                <p style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>No encontrado</p>
            </div>
        </div>
    );

    const score = generateRandomScore(rec.id ?? rec.name);
    const catLabel = CATEGORY_LABELS[rec.category] ?? rec.category;
    const distStr = rec.distance_from_user != null
        ? formatDistance(rec.distance_from_user / 1000)
        : undefined;
    const heroImage = rec.image || getCategoryImage(rec.category);

    const reviews = rec.reviews ?? [];
    const avgRating = reviews.length > 0 && reviews.every(r => r.rating != null)
        ? reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length
        : null;
    const starCounts = [5, 4, 3, 2, 1].reduce((acc, n) => {
        acc[n] = reviews.filter(r => Math.round(r.rating ?? 0) === n).length;
        return acc;
    }, {} as Record<number, number>);

    return (
        <div className="detail">
            <div className="detail-scroll">

                {/* Hero */}
                <div className="detail-hero">
                    {heroImage && (
                        <img className="detail-hero-img" src={heroImage} alt={rec.name} />
                    )}
                    <button className="detail-hero-btn detail-hero-back" onClick={() => navigate(-1)} aria-label="Volver">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="detail-hero-btn detail-hero-share" aria-label="Compartir">
                        <Share2 size={18} />
                    </button>
                </div>

                <div className="detail-body">

                    {/* Header: título + score */}
                    <div className="detail-header">
                        <div className="detail-header-text">
                            <h1 className="detail-title">{rec.name}</h1>
                            <p className="detail-subtitle">
                                {catLabel}
                                {rec.address ? ` · ${rec.address}` : ''}
                            </p>
                        </div>
                        <div className="detail-score">
                            <span className="detail-score-badge">{score}</span>
                            <span className="detail-score-label">Local Score</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="detail-stats">
                        {distStr && (
                            <div className="detail-stat">
                                <MapPin size={14} className="detail-stat-icon" />
                                <div className="detail-stat-text">
                                    <span className="detail-stat-main">{distStr}</span>
                                </div>
                            </div>
                        )}
                        {rec.google_rating > 0 && (
                            <div className="detail-stat">
                                <Star size={14} fill="#f59e0b" color="#f59e0b" className="detail-stat-icon" />
                                <div className="detail-stat-text">
                                    <span className="detail-stat-main">{rec.google_rating.toFixed(1)}</span>
                                    <span className="detail-stat-sub">Google</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Descripción */}
                    {rec.description && (
                        <div className="detail-about">
                            <h2 className="detail-section-title">Sobre este lugar</h2>
                            <p
                                className="detail-description"
                                dangerouslySetInnerHTML={{ __html: rec.description }}
                            />
                        </div>
                    )}

                    {/* Reseñas — solo si hay */}
                    {reviews.length > 0 && avgRating !== null && (
                        <div className="detail-reviews">
                            <div className="detail-section-head">
                                <h2 className="detail-section-title">Reseñas</h2>
                                <span className="detail-reviews-link">
                                    <Star size={13} fill="#f59e0b" color="#f59e0b" />
                                    <span>{avgRating.toFixed(1)} ({reviews.length})</span>
                                </span>
                            </div>
                            <div className="detail-stars-breakdown">
                                {[5, 4, 3, 2, 1].map(n => (
                                    <StarRow key={n} rating={n} count={starCounts[n] ?? 0} total={reviews.length} />
                                ))}
                            </div>
                            <ul className="detail-comments">
                                {reviews.slice(0, 5).map((r, i) => (
                                    <li key={i} className="detail-comment">
                                        <div className="detail-comment-head">
                                            <div className="detail-comment-avatar">
                                                {(r.author ?? '?').slice(0, 1).toUpperCase()}
                                            </div>
                                            {r.rating != null && (
                                                <div className="detail-comment-stars">
                                                    {Array.from({ length: 5 }).map((_, j) => (
                                                        <Star
                                                            key={j}
                                                            size={11}
                                                            fill={j < Math.round(r.rating!) ? '#f59e0b' : 'none'}
                                                            color={j < Math.round(r.rating!) ? '#f59e0b' : '#ccc'}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        {r.text && <p className="detail-comment-text">{r.text}</p>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Lugares similares cerca */}
                    {similar.length > 0 && (
                        <div className="detail-nearby">
                            <h2 className="detail-section-title">Lugares similares cerca</h2>
                            <div className="detail-nearby-scroll">
                                {similar.map((item, i) => (
                                    <div
                                        key={item.name + i}
                                        className="detail-nearby-card"
                                        onClick={() => navigate('/nearby-detail', { state: { rec: item } })}
                                    >
                                        <div className="detail-nearby-img">
                                            <img
                                                src={item.image || getCategoryImage(item.category)}
                                                alt={item.name}
                                            />
                                        </div>
                                        <p className="detail-nearby-name">{item.name}</p>
                                        <p className="detail-nearby-meta">
                                            {CATEGORY_LABELS[item.category] ?? item.category}
                                            {item.distance_from_user != null
                                                ? ` · ${formatDistance(item.distance_from_user / 1000)}`
                                                : ''}
                                        </p>
                                        <p className="detail-nearby-price">
                                            {generateRandomScore(item.id ?? item.name)}
                                            <span style={{ fontWeight: 400, color: '#888', fontSize: '0.65rem' }}> score</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{ height: 8 }} />
                </div>
            </div>
        </div>
    );
};

export default NearbyDetail;
