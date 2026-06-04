import type { Category } from './types';

interface CategoryFiltersProps {
    categories: Category[];
    activeCategory: string;
    onCategoryChange: (id: string) => void;
}

const CategoryFilters = ({ categories, activeCategory, onCategoryChange }: CategoryFiltersProps) => (
    <div className="category-filters">
        {categories.map(({ id, label, icon: Icon }) => (
            <button
                key={id}
                className={`category-btn${activeCategory === id ? ' active' : ''}`}
                onClick={() => onCategoryChange(id)}
            >
                <Icon size={21} />
                <span>{label}</span>
            </button>
        ))}
    </div>
);

export default CategoryFilters;
