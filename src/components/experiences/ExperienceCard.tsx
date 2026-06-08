import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAppCopy, getCatLabel } from '../../i18n/copy';

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
    lang?: string;
    onBookmark?: () => void;
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

const ExperienceCard = ({ id, name, duration, price, score, image, date, category, distance, saved = false, lang, onBookmark, onClickCard }: Props) => {
    const navigate = useNavigate();
    const copy = getAppCopy(lang);
    const catLabel = category ? getCatLabel(category, copy) : null;
    const timeMeta = [date, duration].filter(Boolean).join(' · ');
    const handleClick = onClickCard ?? (() => navigate(`/detail/${id}`));
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
                        className={`exp-bookmark${saved ? ' is-saved' : ''}`}
                        aria-label={saved ? 'Quitar de guardados' : 'Guardar experiencia'}
                        onClick={e => { e.stopPropagation(); onBookmark?.(); }}
                    >
                        {saved ? <BookmarkFilled /> : <Bookmark size={16} aria-hidden="true" />}
                    </button>
                </div>
                <span className="exp-score-label">Local Score</span>
            </div>
        </li>
    );
};

export default ExperienceCard;
