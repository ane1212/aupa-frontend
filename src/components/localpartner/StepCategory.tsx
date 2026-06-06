import { businessCategories } from './data';
import PartnerLayout from './PartnerLayout';
import type { AppCopy } from '../../i18n/copy';

interface StepCategoryProps {
    value: string;
    customValue: string;
    onChange: (value: string) => void;
    onCustomChange: (value: string) => void;
    onNext: () => void;
    onBack: () => void;
    disabled?: boolean;
    lp: AppCopy['localPartner'];
}

const StepCategory = ({ value, customValue, onChange, onCustomChange, onNext, onBack, disabled, lp }: StepCategoryProps) => {
    const catLabels: Record<string, string> = {
        restaurant: lp.catRestaurant, bars: lp.catBars, coffee_shop: lp.catCoffeeShop,
        museum: lp.catMuseum, attraction: lp.catAttraction, shops: lp.catShops, other: lp.catOther,
    };
    return (
    <PartnerLayout onBack={onBack} onNext={onNext} disabled={disabled} btnLabel={lp.continue}>
        <h1 className="lp-title">{lp.categoryTitle}</h1>
        <p className="lp-subtitle">{lp.categorySubtitle}</p>

        <ul className="lp-category-list">
            {businessCategories.map(cat => (
                <li key={cat.id} className="lp-category-item">
                    <div
                        className={`lp-category-row${value === cat.id ? ' active' : ''}`}
                        onClick={() => onChange(cat.id)}
                        role="radio"
                        aria-checked={value === cat.id}
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && onChange(cat.id)}
                    >
                        <span className="lp-category-label">{catLabels[cat.id] ?? cat.label}</span>
                        <span className={`lp-category-radio${value === cat.id ? ' checked' : ''}`} />
                    </div>
                    {cat.id === 'other' && value === 'other' && (
                        <input
                            className="lp-specify-input"
                            type="text"
                            placeholder={lp.categorySpecify}
                            value={customValue}
                            onChange={e => onCustomChange(e.target.value)}
                        />
                    )}
                </li>
            ))}
        </ul>
    </PartnerLayout>
    );
};

export default StepCategory;
