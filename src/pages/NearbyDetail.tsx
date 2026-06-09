import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, MapPin, Star } from 'lucide-react';
import { generateRandomScore } from '../utils/randomScore';
import { formatDistance, getUserLocation, TEST_LOCATION } from '../utils/location';
import { getCategoryImage } from '../utils/categoryImages';
import { fastapiService, commentService } from '../services/API';
import type { Recommendation, Comment } from '../services/models';
import { useAuth } from '../context';
import { getAppCopy, getCatLabel } from '../i18n/copy';
import ExperienceCard from '../components/experiences/ExperienceCard';
import CommentForm, { toUUID } from '../components/common/CommentForm';
import IncidentForm from '../components/common/IncidentForm';

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
    const { user } = useAuth();
    const copy = getAppCopy(user?.language);

    const [similar, setSimilar] = useState<Recommendation[]>([]);
    const [dbComments, setDbComments] = useState<Comment[]>([]);

    useEffect(() => {
        if (!rec) return;
        const fetch = async () => {
            try {
                const loc = await getUserLocation() ?? TEST_LOCATION;
                const res = await fastapiService.byCategory(rec.sub_category, loc.lat, loc.lng);
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

    useEffect(() => {
        if (!rec) return;
        const key = toUUID(rec.id ?? rec.name);
        commentService.getByEvent(key, { limit: 50 })
            .then(r => setDbComments(r.data ?? []))
            .catch(() => {});
    }, [rec?.id, rec?.name]);

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
    const catLabel = getCatLabel(rec.sub_category, copy);
    const distStr = rec.distance_from_user != null
        ? formatDistance(rec.distance_from_user / 1000)
        : undefined;
    const heroImage = rec.image || getCategoryImage(rec.sub_category);

    const reviews = rec.reviews ?? [];
    const avgRating = reviews.length > 0 && reviews.every(r => r.rating != null)
        ? reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length
        : null;

    const dbAvgRating = dbComments.length > 0
        ? dbComments.reduce((s, c) => s + c.rating, 0) / dbComments.length
        : null;
    const dbStarCounts = [5, 4, 3, 2, 1].reduce((acc, n) => {
        acc[n] = dbComments.filter(c => Math.round(c.rating) === n).length;
        return acc;
    }, {} as Record<number, number>);
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
                            <span className="detail-score-label">{copy.detail.localScore}</span>
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
                            <h2 className="detail-section-title">{copy.detail.about}</h2>
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
                                <h2 className="detail-section-title">{copy.detail.reviews}</h2>
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

                    {/* ── User comments ── */}
                    {dbComments.length > 0 && (
                        <div className="detail-reviews">
                            <div className="detail-section-head">
                                <h2 className="detail-section-title">{copy.detail.reviews}</h2>
                                {dbAvgRating !== null && (
                                    <span className="detail-reviews-link">
                                        <Star size={13} fill="#f59e0b" color="#f59e0b" />
                                        <span>{dbAvgRating.toFixed(1)} ({dbComments.length})</span>
                                    </span>
                                )}
                            </div>
                            {dbAvgRating !== null && (
                                <div className="detail-stars-breakdown">
                                    {[5, 4, 3, 2, 1].map(n => (
                                        <StarRow key={n} rating={n} count={dbStarCounts[n] ?? 0} total={dbComments.length} />
                                    ))}
                                </div>
                            )}
                            <ul className="detail-comments">
                                {dbComments.map(c => (
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
                    {user && (
                        <div className="detail-reviews">
                            <h2 className="detail-section-title">{copy.detail.addReview}</h2>
                            <CommentForm
                                eventId={rec.id ?? rec.name}
                                lang={user?.language}
                                onAdded={c => setDbComments(prev => [c, ...prev])}
                            />
                        </div>
                    )}

                    {/* ── Report incident ── */}
                    {user && (
                        <IncidentForm eventId={rec.id ?? rec.name} lang={user?.language} />
                    )}

                    {/* Lugares similares cerca */}
                    {similar.length > 0 && (
                        <div className="detail-nearby">
                            <h2 className="detail-section-title">{copy.detail.similarPlaces}</h2>
                            <ul className="home-picks-grid">
                                {similar.map((item, i) => (
                                    <ExperienceCard
                                        key={item.name + i}
                                        id={item.id ?? item.name}
                                        name={item.name}
                                        image={item.image || getCategoryImage(item.sub_category)}
                                        duration=""
                                        price=""
                                        score={generateRandomScore(item.id ?? item.name)}
                                        category={item.sub_category}
                                        lang={user?.language}
                                        distance={item.distance_from_user != null ? formatDistance(item.distance_from_user / 1000) : undefined}
                                        onClickCard={() => navigate('/nearby-detail', { state: { rec: item } })}
                                    />
                                ))}
                            </ul>
                        </div>
                    )}

                    <div style={{ height: 8 }} />
                </div>
            </div>
        </div>
    );
};

export default NearbyDetail;
