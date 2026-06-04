import { useState } from 'react';
import { ExperienceCard, SearchBar, SectionHeader, VibeCard } from '../components/experiences';

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

const Experiences = () => {
    const [query, setQuery] = useState('');

    const filtered = query.trim()
        ? topExperiences.filter(e =>
            e.name.toLowerCase().includes(query.toLowerCase())
          )
        : topExperiences;

    return (
        <div className="experiences">

            <SectionHeader title="Browse by vibe" onAction={() => {}} />

            <div className="exp-vibe-grid">
                {vibes.map(({ id, label, bg }) => (
                    <VibeCard key={id} label={label} bg={bg} />
                ))}
            </div>

            <h2 className="exp-title exp-top-title">Top experiences</h2>

            <ul className="exp-list">
                {filtered.length > 0 ? filtered.map(exp => (
                    <ExperienceCard key={exp.id} {...exp} />
                )) : (
                    <li className="exp-no-results">No experiences found.</li>
                )}
            </ul>

            <SearchBar
                value={query}
                onChange={setQuery}
                placeholder="Search experiences"
            />

        </div>
    );
};

export default Experiences;
