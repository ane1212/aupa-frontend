import { useState, useEffect } from 'react';
import { ExperienceCard, SearchBar } from '../components/experiences';
import { TripList } from '../components/saved';
import type { TripItem } from '../components/saved';
import { useAuth } from '../context';
import { getAppCopy } from '../i18n/copy';
import { fastapiService } from '../services/API';
import { getUserLocation, TEST_LOCATION } from '../utils/location';
import { getCategoryImage } from '../utils/categoryImages';
import { getAppCategoryFromSubcategory } from '../utils/categoryMapper';

interface Experience {
    id: number;
    name: string;
    duration: string;
    price: string;
    score: number;
    image: string;
}

interface FastAPIRec {
    id: string;
    name: string;
    category: string;
    distance_from_user: number;
}

const Experiences = () => {
    const { user } = useAuth();
    const copy = getAppCopy(user?.language);
    const [query, setQuery] = useState('');
    const [topExperiences, setTopExperiences] = useState<Experience[]>([]);
    const [tripList, setTripList] = useState<TripItem[]>([
        { id: 1, name: 'Pintxo Crawl', category: 'Experience', subtitle: 'Food & Drink' },
        { id: 2, name: 'Gure Toki', category: 'Wine Bar', subtitle: 'Ensanche' },
        { id: 3, name: 'Puente Colgante', category: 'Places', subtitle: 'Portugalete' },
        { id: 4, name: 'Guggenheim Museum', category: 'Culture', subtitle: 'Bilbao' },
    ]);
    const [completed, setCompleted] = useState<Set<number>>(new Set([2]));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopExperiences = async () => {
            try {
                const location = await getUserLocation() ?? TEST_LOCATION;
                
                const nearestResponse = await fastapiService.nearest(location.lat, location.lng, 12);
                const nearestRecs: FastAPIRec[] = nearestResponse.recommendations || [];
                
                const top3 = nearestRecs.slice(0, 3);
                
                const experiences: Experience[] = top3.map((rec, idx) => ({
                    id: parseInt(rec.id) || idx + 1,
                    name: rec.name,
                    duration: `${Math.floor(rec.distance_from_user / 100)} min walk`,
                    price: '€10-30',
                    score: 90 + idx,
                    image: getCategoryImage(getAppCategoryFromSubcategory(rec.category)),
                }));
                
                setTopExperiences(experiences);
            } catch (error) {
                console.error('Failed to fetch top experiences:', error);
                setTopExperiences([
                    { id: 1, name: 'Basque food crawl', duration: '3.5 hours', price: '€25-40', score: 95, image: getCategoryImage('food') },
                    { id: 2, name: 'Sunday vermouth route', duration: '2.5 hours', price: '€10-20', score: 93, image: getCategoryImage('bars') },
                    { id: 3, name: 'Hidden viewpoints of Bilbao', duration: '2 hours', price: 'Free', score: 92, image: getCategoryImage('places') },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchTopExperiences();
    }, []);

    const filtered = query.trim()
        ? topExperiences.filter(e => e.name.toLowerCase().includes(query.toLowerCase()))
        : topExperiences;

    const toggle = (id: number) =>
        setCompleted(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });

    const pct = tripList.length > 0
        ? Math.round(([...completed].filter(id => tripList.some(i => i.id === id)).length / tripList.length) * 100)
        : 0;

    const completedCount = [...completed].filter(id => tripList.some(i => i.id === id)).length;

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="experiences">
            <h2 className="exp-title exp-top-title">{copy?.experiences?.topExperiences || 'Top Experiences'}</h2>

            <ul className="exp-list">
                {filtered.length > 0 ? filtered.map(exp => (
                    <ExperienceCard key={exp.id} {...exp} />
                )) : (
                    <li className="exp-no-results">{copy?.experiences?.noResults || 'No results'}</li>
                )}
            </ul>

            <SearchBar
                value={query}
                onChange={setQuery}
                placeholder={copy?.experiences?.searchPlaceholder || 'Search'}
            />

            <h2 className="exp-title" style={{ marginTop: '2rem', marginBottom: '1rem' }}>
                {copy?.saved?.tabTrip || 'My Trip'}
            </h2>

            <TripList
                tripList={tripList}
                completed={completed}
                pct={pct}
                completedCount={completedCount}
                onToggle={toggle}
                onMenuOpen={() => {}}
                onNavigate={(id) => window.location.href = `/detail/${id}`}
                progressTitle={copy?.saved?.tripProgress || 'Trip Progress'}
                completedTemplate={copy?.saved?.tripCompleted || '%/% completed'}
                addItemLabel={copy?.saved?.tabTrip || 'My Trip'}
            />
        </div>
    );
};

export default Experiences;