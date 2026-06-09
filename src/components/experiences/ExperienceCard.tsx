import { useState, useCallback } from 'react';
import { isInTripCache, getTripItemId, addToTripCache, removeFromTripCache } from '../../utils/tripCache';
import { isInFavCache, getFavItemId, addToFavCache, removeFromFavCache } from '../../utils/favCache';
import { Bookmark, Luggage, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAppCopy, getCatLabel } from '../../i18n/copy';
import { useAuth } from '../../context';
import { itineraryService, favoriteService } from '../../services/API';

interface Props {
    id: number | string;
    name: string;
    duration: string;
    price: string;
    score: number;
    image: string;
    date?: string;
    category?: string;
    distance?: string;
    saved?: boolean;
    inTrip?: boolean;
    lang?: string;
    onBookmark?: () => void;
    onAddToTrip?: () => void;
    onClickCard?: () => void;
}

const BookmarkFilled = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" style={{ display: 'block', flexShrink: 0, overflow: 'hidden' }}>
        <path
            d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
            fill="#ef342a"
            stroke="#ef342a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const ExperienceCard = ({ id, name, duration, price, score, image, date, category, distance, saved = false, inTrip = false, lang, onBookmark, onAddToTrip, onClickCard }: Props) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const copy = getAppCopy(lang);
    const catLabel = category ? getCatLabel(category, copy) : null;
    const timeMeta = [date, duration].filter(Boolean).join(' · ');
    const handleClick = onClickCard ?? (() => navigate(`/detail/${id}`));

    const eventId = String(id);

    // Trip state
    const [localInTrip, setLocalInTrip] = useState(() => isInTripCache(eventId));
    const [togglingTrip, setTogglingTrip] = useState(false);
    const isInTrip = inTrip || localInTrip;

    // Saved/bookmark state — self-managed when no onBookmark callback provided
    const [localSaved, setLocalSaved] = useState(() => isInFavCache(eventId));
    const [togglingSaved, setTogglingSaved] = useState(false);
    const isSaved = saved || localSaved;

    const handleBookmark = useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!user) { navigate('/login'); return; }
        if (onBookmark) { onBookmark(); return; }
        if (togglingSaved) return;
        setTogglingSaved(true);
        try {
            if (isSaved) {
                const favId = getFavItemId(eventId);
                if (favId) await favoriteService.delete(favId);
                removeFromFavCache(eventId);
                setLocalSaved(false);
            } else {
                const fav = await favoriteService.create({ eventId });
                addToFavCache(eventId, fav.id, { name, image, category, score, distance });
                setLocalSaved(true);
            }
        } catch { /* already removed or FK issue */ }
        finally { setTogglingSaved(false); }
    }, [user, onBookmark, togglingSaved, isSaved, eventId, name, image, category, score, distance]);

    const handleAddToTrip = useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!user) { navigate('/login'); return; }
        if (onAddToTrip) { onAddToTrip(); return; }
        if (togglingTrip) return;
        setTogglingTrip(true);
        try {
            if (isInTrip) {
                const itemId = getTripItemId(eventId);
                if (itemId) await itineraryService.remove(itemId);
                removeFromTripCache(eventId);
                setLocalInTrip(false);
            } else {
                const item = await itineraryService.addEvent(eventId);
                addToTripCache(eventId, item.id, { name, image, category, score, distance });
                setLocalInTrip(true);
            }
        } catch { /* FK mismatch or already removed — sync state */ }
        finally { setTogglingTrip(false); }
    }, [user, onAddToTrip, togglingTrip, isInTrip, eventId, name, image, category, score, distance]);

    return (
        <li className="exp-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <div className="exp-card-img-wrap">
                <img className="exp-card-img" src={image} alt={name} />
            </div>
            <div className="exp-card-info">
                <p className="exp-card-name">{name}</p>
                {catLabel && <p className="exp-card-meta exp-card-cat">{catLabel}</p>}
                {timeMeta && <p className="exp-card-meta">{timeMeta}</p>}
                {distance && <p className="exp-card-meta">{distance}</p>}
            </div>
            <div className="exp-card-actions">
                <div className="exp-score-row">
                    <span className="exp-score-badge">{score}</span>
                    <button
                        className={`exp-bookmark${isSaved ? ' is-saved' : ''}`}
                        aria-label={isSaved ? 'Quitar de guardados' : 'Guardar experiencia'}
                        onClick={handleBookmark}
                        disabled={togglingSaved}
                    >
                        {isSaved ? <BookmarkFilled /> : <Bookmark size={16} aria-hidden="true" />}
                    </button>
                </div>
                <span className="exp-score-label">{copy.detail.localScore}</span>
                <button
                    className={`exp-trip-btn${isInTrip ? ' is-added' : ''}`}
                    aria-label={isInTrip ? copy.detail.inTrip : copy.detail.addToTrip}
                    onClick={handleAddToTrip}
                    disabled={togglingTrip}
                >
                    {isInTrip ? <Check size={13} /> : <Luggage size={13} />}
                    <span>{isInTrip ? copy.detail.inTrip : copy.detail.addToTrip}</span>
                </button>
            </div>
        </li>
    );
};

export default ExperienceCard;
