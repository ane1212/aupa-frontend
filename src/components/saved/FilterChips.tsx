import type { Filter, FilterDef } from './types';

interface FilterChipsProps {
    filterDefs: FilterDef[];
    activeFilter: Filter;
    onFilterChange: (filter: Filter) => void;
}

const FilterChips = ({ filterDefs, activeFilter, onFilterChange }: FilterChipsProps) => (
    <div className="sv-filters">
        {filterDefs.map(({ id, label, icon: Icon }) => (
            <button
                key={id}
                className={`sv-chip${activeFilter === id ? ' active' : ''}`}
                onClick={() => onFilterChange(id)}
            >
                {Icon && <Icon size={13} />}
                {label}
            </button>
        ))}
    </div>
);

export default FilterChips;
