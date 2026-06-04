import { useState } from 'react';
import { Search, ChevronDown, Bookmark } from 'lucide-react';

interface Vibe {
    id: number;
    label: string;
    bg: string;
}

interface Experience {
    id: number;
    name: string;
    duration: string;
    price: string;
    score: number;
}

const vibes: Vibe[] = [
    { id: 1, label: 'For Foodies',        bg: '#fcf2e7' },
    { id: 2, label: 'For Culture Lovers', bg: '#e8f0fc' },
    { id: 3, label: 'For Families',       bg: '#ecf6eb' },
    { id: 4, label: 'For Rainy Days',     bg: '#e8f0fc' },
    { id: 5, label: 'For 1-Day Visits',   bg: '#fcf2e7' },
    { id: 6, label: 'For 3-Day Visits',   bg: '#ecf6eb' },
];

const topExperiences: Experience[] = [
    { id: 1, name: 'Basque food crawl',           duration: '3.5 hours', price: '€25-40', score: 95 },
    { id: 2, name: 'Sunday vermouth route',        duration: '2.5 hours', price: '€10-20', score: 93 },
    { id: 3, name: 'Hidden viewpoints of Bilbao',  duration: '2 hours',   price: 'Free',   score: 92 },
];

const ImgX = ({ className }: { className: string }) => (
    <div className={className} aria-hidden="true" />
);

const Experiences = () => {
    const [query, setQuery] = useState('');

    const filtered = query.trim()
        ? topExperiences.filter(e =>
            e.name.toLowerCase().includes(query.toLowerCase())
          )
        : topExperiences;

    return (
        <div className="experiences">

            {/* ── Browse by vibe ── */}
            <div className="exp-row-head">
                <h2 className="exp-title">Browse by vibe</h2>
                <button className="exp-view-all">
                    View all <ChevronDown size={14} />
                </button>
            </div>

            <div className="exp-vibe-grid">
                {vibes.map(({ id, label, bg }) => (
                    <button key={id} className="exp-vibe-card" style={{ backgroundColor: bg }}>
                        <ImgX className="exp-vibe-img" />
                        <span className="exp-vibe-label">{label}</span>
                    </button>
                ))}
            </div>

            {/* ── Top experiences ── */}
            <h2 className="exp-title exp-top-title">Top experiences</h2>

            <ul className="exp-list">
                {filtered.length > 0 ? filtered.map(exp => (
                    <li key={exp.id} className="exp-card">
                        <ImgX className="exp-card-img" />
                        <div className="exp-card-info">
                            <p className="exp-card-name">{exp.name}</p>
                            <p className="exp-card-meta">{exp.duration} · {exp.price}</p>
                        </div>
                        <div className="exp-card-actions">
                            <div className="exp-score-row">
                                <span className="exp-score-badge">{exp.score}</span>
                                <button className="exp-bookmark" aria-label="Guardar experiencia">
                                    <Bookmark size={16} />
                                </button>
                            </div>
                            <span className="exp-score-label">Local Score</span>
                        </div>
                    </li>
                )) : (
                    <li className="exp-no-results">No experiences found.</li>
                )}
            </ul>

            {/* ── Search ── */}
            <label className="exp-search">
                <Search size={15} aria-hidden="true" />
                <input
                    className="exp-search-input"
                    type="search"
                    placeholder="Search experiences"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
            </label>

        </div>
    );
};

export default Experiences;
