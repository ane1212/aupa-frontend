import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Utensils, Wine, Bookmark, GripVertical, MoreVertical, ChevronDown, Plus } from 'lucide-react';

type Tab = 'saved' | 'trip';
type Filter = 'all' | 'places' | 'food' | 'bars';

interface SavedItem {
    id: number;
    name: string;
    meta: string;
    sub?: string;
    score: number;
    category: string;
}

interface TripItem {
    id: number;
    name: string;
    category: string;
    subtitle: string;
}

interface FilterDef {
    id: Filter;
    label: string;
    icon?: React.ComponentType<{ size?: number }>;
}

const filterDefs: FilterDef[] = [
    { id: 'all', label: 'All' },
    { id: 'places', label: 'Places', icon: MapPin },
    { id: 'food', label: 'Food', icon: Utensils },
    { id: 'bars', label: 'Bars', icon: Wine },
];

const savedItems: SavedItem[] = [
    { id: 1, name: 'Bar El Globo', meta: 'Pintxos bar · Casco Viejo', sub: '400m away · 5 min walk', score: 97, category: 'food' },
    { id: 2, name: 'Gure Toki', meta: 'Restaurant · Indautxu', sub: '750m away · 10 min walk', score: 93, category: 'food' },
    { id: 3, name: 'La Viña del Ensanche', meta: 'Wine bar · Ensanche', sub: '600m away · 8 min walk', score: 95, category: 'bars' },
    { id: 4, name: 'Hidden viewpoints of Bilbao', meta: '2 hours · Free', score: 92, category: 'experiences' },
];

const initialTripItems: TripItem[] = [
    { id: 1, name: 'Pintxo Crawl', category: 'Experience', subtitle: 'Food & Drink' },
    { id: 2, name: 'Gure Toki', category: 'Wine Bar', subtitle: 'Ensanche' },
    { id: 3, name: 'Puente Colgante', category: 'Places', subtitle: 'Portugalete' },
    { id: 4, name: 'Guggenheim Museum', category: 'Culture', subtitle: 'Bilbao' },
];

const CATEGORY_ORDER = ['food', 'bars', 'experiences'];
const CATEGORY_LABELS: Record<string, string> = {
    food: 'FOOD',
    bars: 'BARS',
    experiences: 'EXPERIENCES',
};

const ImgPlaceholder = ({ small = false }: { small?: boolean }) => (
    <div className={`sv-img-placeholder${small ? ' small' : ''}`} aria-hidden="true" />
);

const Saved = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('saved');
    const [activeFilter, setActiveFilter] = useState<Filter>('all');
    const [completed, setCompleted] = useState<Set<number>>(new Set([2]));
    const [tripList, setTripList] = useState<TripItem[]>(initialTripItems);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });

    /* Close context menu on outside click */
    useEffect(() => {
        if (openMenuId === null) return;
        const close = () => setOpenMenuId(null);
        document.addEventListener('click', close);
        return () => document.removeEventListener('click', close);
    }, [openMenuId]);

    const toggle = (id: number) =>
        setCompleted(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });

    const openMenu = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        setMenuPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
        setOpenMenuId(prev => prev === id ? null : id);
    };

    const deleteItem = (id: number) => {
        setTripList(prev => prev.filter(i => i.id !== id));
        setCompleted(prev => { const next = new Set(prev); next.delete(id); return next; });
        setOpenMenuId(null);
    };

    const visible = activeFilter === 'all'
        ? savedItems
        : savedItems.filter(i => i.category === activeFilter);

    const categories = CATEGORY_ORDER.filter(cat => visible.some(i => i.category === cat));

    const pct = tripList.length > 0
        ? Math.round(([...completed].filter(id => tripList.some(i => i.id === id)).length / tripList.length) * 100)
        : 0;

    const completedCount = [...completed].filter(id => tripList.some(i => i.id === id)).length;

    return (
        <div className="saved">
            <h2 className="sv-title">Saved</h2>

            {/* Tabs */}
            <div className="sv-tabs">
                <button
                    className={`sv-tab${activeTab === 'saved' ? ' active' : ''}`}
                    onClick={() => setActiveTab('saved')}
                >
                    Saved
                </button>
                <button
                    className={`sv-tab${activeTab === 'trip' ? ' active' : ''}`}
                    onClick={() => setActiveTab('trip')}
                >
                    My Trip
                </button>
            </div>

            {/* Filter chips */}
            <div className="sv-filters">
                {filterDefs.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        className={`sv-chip${activeFilter === id ? ' active' : ''}`}
                        onClick={() => setActiveFilter(id)}
                    >
                        {Icon && <Icon size={13} />}
                        {label}
                    </button>
                ))}
            </div>

            {/* Saved tab */}
            {activeTab === 'saved' && (
                <div className="sv-content">
                    {categories.length === 0 && (
                        <p className="sv-empty">No items saved in this category.</p>
                    )}
                    {categories.map(cat => (
                        <div key={cat} className="sv-section">
                            <div className="sv-section-head">
                                <span className="sv-section-label">{CATEGORY_LABELS[cat]}</span>
                                <button className="sv-see-all">See all</button>
                            </div>
                            <ul className="sv-place-list">
                                {visible.filter(i => i.category === cat).map(item => (
                                    <li key={item.id} className="sv-place-card">
                                        <ImgPlaceholder />
                                        <div className="sv-place-info">
                                            <p className="sv-place-name">{item.name}</p>
                                            <p className="sv-place-meta">{item.meta}</p>
                                            {item.sub && <p className="sv-place-dist">{item.sub}</p>}
                                        </div>
                                        <div className="sv-place-actions">
                                            <div className="sv-score-row">
                                                <span className="sv-score-badge">{item.score}</span>
                                                <button className="sv-bookmark" aria-label="Guardar lugar">
                                                    <Bookmark size={16} />
                                                </button>
                                            </div>
                                            <span className="sv-score-label">Local Score</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            {/* My Trip tab */}
            {activeTab === 'trip' && (
                <div className="sv-trip">
                    <div className="sv-progress-card">
                        <p className="sv-progress-title">Your Trip Progress</p>
                        <p className="sv-progress-sub">{completedCount} of {tripList.length} completed</p>
                        <div className="sv-progress-row">
                            <div className="sv-progress-track">
                                <div className="sv-progress-fill" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="sv-progress-pct">{pct}%</span>
                        </div>
                    </div>

                    <ul className="sv-trip-list">
                        {tripList.map((item, idx) => (
                            <li
                                key={item.id}
                                className="sv-trip-item"
                                onClick={() => navigate(`/detail/${item.id}`)}
                            >
                                <span
                                    className="sv-drag"
                                    aria-hidden="true"
                                    onClick={e => e.stopPropagation()}
                                >
                                    <GripVertical size={16} />
                                </span>
                                <button
                                    className={`sv-checkbox${completed.has(item.id) ? ' checked' : ''}`}
                                    onClick={e => { e.stopPropagation(); toggle(item.id); }}
                                    aria-label={completed.has(item.id) ? 'Desmarcar' : 'Completar'}
                                >
                                    {completed.has(item.id) && (
                                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </button>
                                <ImgPlaceholder small />
                                <div className="sv-trip-info">
                                    <p className="sv-place-name">{item.name}</p>
                                    <p className="sv-place-meta">{item.category} · {item.subtitle}</p>
                                </div>
                                <div className="sv-trip-actions">
                                    <button
                                        className="sv-icon-btn"
                                        aria-label="Opciones"
                                        onClick={e => openMenu(e, item.id)}
                                    >
                                        <MoreVertical size={16} />
                                    </button>
                                    {idx === 0 && (
                                        <button
                                            className="sv-icon-btn"
                                            aria-label="Expandir"
                                            onClick={e => e.stopPropagation()}
                                        >
                                            <ChevronDown size={16} />
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>

                    <button className="sv-add-btn">
                        <Plus size={15} />
                        Add item to My Trip
                    </button>
                </div>
            )}

            {/* Context menu — fixed positioning, rendered once at component root */}
            {openMenuId !== null && (
                <div
                    className="sv-context-menu"
                    style={{ top: menuPos.top, right: menuPos.right }}
                    onClick={e => e.stopPropagation()}
                >
                    <button className="sv-menu-item">View on maps</button>
                    <button className="sv-menu-item sv-menu-danger" onClick={() => deleteItem(openMenuId)}>Delete</button>
                    <button className="sv-menu-item" onClick={() => setOpenMenuId(null)}>Move to Saved</button>
                </div>
            )}
        </div>
    );
};

export default Saved;
