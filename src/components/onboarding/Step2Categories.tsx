import React from 'react';
import type { CategoryOption } from './onboarding.types';
import { MAX_STEP2_SELECTIONS } from './onboarding.constants';

interface Step2CategoriesProps {
  categories: CategoryOption[];
  selections: string[];
  setSelections: (ids: string[]) => void;
  prefMap: Record<string, string>;
  onNext: () => void;
  onDeletePreference: (prefId: string) => Promise<void>;
}

const Step2Categories: React.FC<Step2CategoriesProps> = ({
  categories,
  selections,
  setSelections,
  prefMap,
  onNext,
  onDeletePreference,
}) => {
  const handleSelect = async (catId: string) => {
    const isSelected = selections.includes(catId);
    
    if (isSelected) {
      const prefId = prefMap[catId];
      if (prefId) await onDeletePreference(prefId);
      setSelections(selections.filter((id) => id !== catId));
    } else if (selections.length < MAX_STEP2_SELECTIONS) {
      setSelections([...selections, catId]);
    }
  };

  return (
    <div className="onboarding-step">
      <h2>What are you looking for?</h2>
      <span className="onboarding-subtitle">Choose maximum of {MAX_STEP2_SELECTIONS}</span>
      <div className="onboarding-category-grid">
        {categories.map((cat) => {
          const isSelected = selections.includes(cat.id);
          const canSelect = selections.length < MAX_STEP2_SELECTIONS || isSelected;
          
          return (
            <button
              key={cat.id}
              className={`category-chip ${isSelected ? 'selected' : ''} ${!canSelect && !isSelected ? 'disabled' : ''}`}
              onClick={() => handleSelect(cat.id)}
              disabled={!canSelect && !isSelected}
            >
              <cat.icon size={24} />
              <span>{cat.description}</span>
            </button>
          );
        })}
      </div>
      <button className="onboarding-next-btn" onClick={onNext} disabled={selections.length === 0}>
        Next <span aria-hidden="true">→</span>
      </button>
    </div>
  );
};

export default Step2Categories;