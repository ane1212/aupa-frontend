import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    SavedTabs, FilterChips, SavedContent, TripList, ContextMenu,
    filterDefs, savedItems, initialTripItems, TRIP_CATEGORY_MAP, PLACE_COORDS,
} from '../components/saved';
import type { Tab, Filter, TripItem, SavedItem } from '../components/saved';
import { useAuth } from '../context';
import { getAppCopy } from '../i18n/copy';

const Saved = () => {
    const { user } = useAuth();
    const copy = getAppCopy(user?.language);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('saved');
    const [activeFilter, setActiveFilter] = useState<Filter>('all');
    const [completed, setCompleted] = useState<Set<number>>(new Set([2]));
    const [tripList, setTripList] = useState<TripItem[]>(initialTripItems);
    const [savedList, setSavedList] = useState<SavedItem[]>(savedItems);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });

    const translatedFilterDefs = [
        { ...filterDefs[0], label: copy.saved.filterAll },
        { ...filterDefs[1], label: copy.saved.filterPlaces },
        { ...filterDefs[2], label: copy.saved.filterFood },
        { ...filterDefs[3], label: copy.saved.filterBars },
    ];

    const categoryLabels: Record<string, string> = {
        food: copy.saved.catFood,
        bars: copy.saved.catBars,
        experiences: copy.saved.catExperiences,
        places: copy.saved.catPlaces,
    };

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

    const viewOnMaps = (id: number) => {
        const item = tripList.find(i => i.id === id);
        const coords = PLACE_COORDS[id];
        if (!item || !coords) return;
        setOpenMenuId(null);
        navigate(`/map?name=${encodeURIComponent(item.name)}&subtitle=${encodeURIComponent(item.subtitle)}&lat=${coords.lat}&lng=${coords.lng}`);
    };

    const moveToSaved = (id: number) => {
        const item = tripList.find(i => i.id === id);
        if (!item) return;
        const newSavedItem: SavedItem = {
            id: item.id,
            name: item.name,
            meta: `${item.category} · ${item.subtitle}`,
            score: 0,
            category: TRIP_CATEGORY_MAP[item.category] ?? 'experiences',
        };
        setSavedList(prev => [...prev, newSavedItem]);
        setTripList(prev => prev.filter(i => i.id !== id));
        setCompleted(prev => { const next = new Set(prev); next.delete(id); return next; });
        setOpenMenuId(null);
        setActiveTab('saved');
    };

    const visible = activeFilter === 'all'
        ? savedList
        : savedList.filter(i => i.category === activeFilter);

    const pct = tripList.length > 0
        ? Math.round(([...completed].filter(id => tripList.some(i => i.id === id)).length / tripList.length) * 100)
        : 0;

    const completedCount = [...completed].filter(id => tripList.some(i => i.id === id)).length;

    return (
        <div className="saved">
            <h2 className="sv-title">{copy.saved.title}</h2>

            <SavedTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                labels={{ saved: copy.saved.tabSaved, trip: copy.saved.tabTrip }}
            />
            <FilterChips
                filterDefs={translatedFilterDefs}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
            />

            {activeTab === 'saved' && (
                <SavedContent
                    visible={visible}
                    categoryLabels={categoryLabels}
                    noItems={copy.saved.noItems}
                    seeAll={copy.saved.filterAll}
                />
            )}

            {activeTab === 'trip' && (
                <TripList
                    tripList={tripList}
                    completed={completed}
                    pct={pct}
                    completedCount={completedCount}
                    onToggle={toggle}
                    onMenuOpen={openMenu}
                    onNavigate={id => navigate(`/detail/${id}`)}
                    progressTitle={copy.saved.tripProgress}
                    completedTemplate={copy.saved.tripCompleted}
                    addItemLabel={copy.saved.tabTrip}
                />
            )}

            {openMenuId !== null && (
                <ContextMenu
                    openMenuId={openMenuId}
                    menuPos={menuPos}
                    onViewOnMaps={viewOnMaps}
                    onDelete={deleteItem}
                    onMoveToSaved={moveToSaved}
                    labels={{
                        viewOnMaps: copy.saved.viewOnMaps,
                        delete: copy.saved.delete,
                        moveToSaved: copy.saved.moveToSaved,
                    }}
                />
            )}
        </div>
    );
};

export default Saved;
