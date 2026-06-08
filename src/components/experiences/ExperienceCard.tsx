import { Bookmark } from 'lucide-react';

interface Props {
    name: string;
    duration: string;
    price: string;
    score: number;
    image: string;
    onBookmark?: () => void;
}

const ExperienceCard = ({ name, duration, price, score, image, onBookmark }: Props) => (
    <li className="exp-card">
        <img className="exp-card-img" src={image} alt={name} />
        <div className="exp-card-info">
            <p className="exp-card-name">{name}</p>
            <p className="exp-card-meta">{duration} · {price}</p>
        </div>
        <div className="exp-card-actions">
            <div className="exp-score-row">
                <span className="exp-score-badge">{score}</span>
                <button className="exp-bookmark" aria-label="Guardar experiencia" onClick={onBookmark}>
                    <Bookmark size={16} />
                </button>
            </div>
            <span className="exp-score-label">Local Score</span>
        </div>
    </li>
);

export default ExperienceCard;