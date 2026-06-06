import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Clock, MapPin, Bookmark, Plus } from 'lucide-react';
import { useAuth } from '../context';
import { getAppCopy } from '../i18n/copy';

interface Stop {
    id: number;
    name: string;
    type: string;
    neighborhood: string;
}

interface DetailData {
    id: number;
    name: string;
    category: string;
    subtitle: string;
    score: number;
    duration: string;
    stops: number;
    budget: string;
    description: string;
    places: Stop[];
}

const detailDb: DetailData[] = [
    {
        id: 1,
        name: 'Pintxo Crawl',
        category: 'Experience',
        subtitle: 'Food & Drink',
        score: 97,
        duration: '2-3 hours',
        stops: 3,
        budget: '€€',
        description: 'A handpicked route through 3 authentix pintxo bars locals love. Great food, local vibes and stories along the way.',
        places: [
            { id: 1, name: 'Bar El Globo', type: 'Pintxas bar', neighborhood: 'Casco Viejo' },
            { id: 2, name: 'Gure Toki', type: 'Wine bar', neighborhood: 'Ensanche' },
            { id: 3, name: 'La Viña del Ensanche', type: 'Wine bar', neighborhood: 'Ensanche' },
        ],
    },
    {
        id: 2,
        name: 'Gure Toki',
        category: 'Wine Bar',
        subtitle: 'Ensanche',
        score: 93,
        duration: '1-2 hours',
        stops: 1,
        budget: '€€',
        description: 'A beloved wine bar in the Ensanche district, known for its exceptional selection of Basque wines and handcrafted pintxos.',
        places: [
            { id: 1, name: 'Gure Toki', type: 'Wine bar', neighborhood: 'Ensanche' },
        ],
    },
    {
        id: 3,
        name: 'Puente Colgante',
        category: 'Place',
        subtitle: 'Portugalete',
        score: 91,
        duration: '1 hour',
        stops: 1,
        budget: '€',
        description: 'The iconic Hanging Bridge of Biscay, a UNESCO World Heritage Site connecting Getxo and Portugalete across the Nervión river.',
        places: [
            { id: 1, name: 'Puente Colgante', type: 'UNESCO Heritage', neighborhood: 'Portugalete' },
        ],
    },
    {
        id: 4,
        name: 'Guggenheim Museum',
        category: 'Culture',
        subtitle: 'Bilbao',
        score: 98,
        duration: '2-4 hours',
        stops: 1,
        budget: '€€€',
        description: "Frank Gehry's titanium masterpiece on the Nervión riverbank. World-class contemporary art in one of the world's most recognizable buildings.",
        places: [
            { id: 1, name: 'Guggenheim Bilbao', type: 'Museum', neighborhood: 'Abandoibarra' },
        ],
    },
];

const Detail = () => {
    const { user } = useAuth();
    const copy = getAppCopy(user?.language);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const item = detailDb.find(d => d.id === Number(id));

    if (!item) {
        return (
            <div className="detail">
                <div className="detail-scroll">
                    <button className="detail-hero-btn detail-hero-back" onClick={() => navigate(-1)}>
                        <ChevronLeft size={20} />
                    </button>
                    <p style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>{copy.detail.notFound}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="detail">
            {/* Scrollable area */}
            <div className="detail-scroll">
                {/* Hero image placeholder */}
                <div className="detail-hero">
                    <button
                        className="detail-hero-btn detail-hero-back"
                        onClick={() => navigate(-1)}
                        aria-label="Volver"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        className="detail-hero-btn detail-hero-share"
                        aria-label="Compartir"
                    >
                        <Share2 size={18} />
                    </button>
                </div>

                {/* Body content */}
                <div className="detail-body">
                    {/* Title + Score */}
                    <div className="detail-header">
                        <div className="detail-header-text">
                            <h1 className="detail-title">{item.name}</h1>
                            <p className="detail-subtitle">{item.category} · {item.subtitle}</p>
                        </div>
                        <div className="detail-score">
                            <span className="detail-score-badge">{item.score}</span>
                            <span className="detail-score-label">{copy.detail.localScore}</span>
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="detail-stats">
                        <div className="detail-stat">
                            <Clock size={14} />
                            <span>{item.duration}</span>
                        </div>
                        <div className="detail-stat">
                            <MapPin size={14} />
                            <span>{item.stops} {item.stops === 1 ? copy.detail.stop : copy.detail.stops}</span>
                        </div>
                        <div className="detail-stat">
                            <span className="detail-budget">{item.budget}</span>
                            <span>{copy.detail.budget}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="detail-description">{item.description}</p>

                    {/* You'll visit */}
                    <div className="detail-visits">
                        <h2 className="detail-section-title">{copy.detail.youllVisit}</h2>
                        <ul className="detail-stops">
                            {item.places.map((place, idx) => (
                                <li key={place.id} className="detail-stop">
                                    <span className="detail-stop-num">{idx + 1}</span>
                                    <div>
                                        <p className="detail-stop-name">{place.name}</p>
                                        <p className="detail-stop-sub">{place.type} · {place.neighborhood}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Sticky action bar */}
            <div className="detail-actions">
                <button className="detail-btn-save">
                    <Bookmark size={16} />
                    {copy.detail.save}
                </button>
                <button className="detail-btn-trip">
                    <Plus size={16} />
                    {copy.detail.addToTrip}
                </button>
            </div>
        </div>
    );
};

export default Detail;
