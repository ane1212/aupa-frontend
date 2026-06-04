import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    SavedTabs, FilterChips, SavedContent, TripList, ContextMenu,
    filterDefs, savedItems, initialTripItems,
} from '../components/saved';
import type { Tab, Filter, TripItem } from '../components/saved';

const Saved = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('saved');
    const [activeFilter, setActiveFilter] = useState<Filter>('all');
    const [completed, setCompleted] = useState<Set<number>>(new Set([2]));
    const [tripList, setTripList] = useState<TripItem[]>(initialTripItems);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });

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

    const pct = tripList.length > 0
        ? Math.round(([...completed].filter(id => tripList.some(i => i.id === id)).length / tripList.length) * 100)
        : 0;

    const completedCount = [...completed].filter(id => tripList.some(i => i.id === id)).length;

    return (
        <div className="saved">
            <h2 className="sv-title">Saved</h2>

            <SavedTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <FilterChips filterDefs={filterDefs} activeFilter={activeFilter} onFilterChange={setActiveFilter} />

            {activeTab === 'saved' && <SavedContent visible={visible} />}

            {activeTab === 'trip' && (
                <TripList
                    tripList={tripList}
                    completed={completed}
                    pct={pct}
                    completedCount={completedCount}
                    onToggle={toggle}
                    onMenuOpen={openMenu}
                    onNavigate={id => navigate(`/detail/${id}`)}
                />
            )}

            {openMenuId !== null && (
                <ContextMenu
                    openMenuId={openMenuId}
                    menuPos={menuPos}
                    onDelete={deleteItem}
                    onClose={() => setOpenMenuId(null)}
                />
            )}
        </div>
    );
};

export default Saved;
