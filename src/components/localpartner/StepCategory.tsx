import { businessCategories } from './data';
import PartnerLayout from './PartnerLayout';

interface StepCategoryProps {
    value: string;
    customValue: string;
    onChange: (value: string) => void;
    onCustomChange: (value: string) => void;
    onNext: () => void;
    onBack: () => void;
    disabled?: boolean;
}

const StepCategory = ({ value, customValue, onChange, onCustomChange, onNext, onBack, disabled }: StepCategoryProps) => (
    <PartnerLayout onBack={onBack} onNext={onNext} disabled={disabled}>
        <h1 className="lp-title">What best describes you?</h1>
        <p className="lp-subtitle">Choose the category that fits your business or organization.</p>

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
                        <span className="lp-category-label">{cat.label}</span>
                        <span className={`lp-category-radio${value === cat.id ? ' checked' : ''}`} />
                    </div>
                    {cat.id === 'other' && value === 'other' && (
                        <input
                            className="lp-specify-input"
                            type="text"
                            placeholder="Specify:"
                            value={customValue}
                            onChange={e => onCustomChange(e.target.value)}
                        />
                    )}
                </li>
            ))}
        </ul>
    </PartnerLayout>
);

export default StepCategory;
