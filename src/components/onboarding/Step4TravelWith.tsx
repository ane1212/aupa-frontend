import React from 'react';
import type { CategoryOption } from './onboarding.types';

interface Step4TravelWithProps {
  categories: CategoryOption[];
  selection: string | null;
  setSelection: (id: string | null) => void;
  prefMap: Record<string, string>;
  onSkip: () => void;
  onFinish: () => void;
  isLoading: boolean;
  onDeletePreference: (prefId: string) => Promise<void>;
}

const Step4TravelWith: React.FC<Step4TravelWithProps> = ({
  categories,
  selection,
  setSelection,
  prefMap,
  onSkip,
  onFinish,
  isLoading,
  onDeletePreference,
}) => {
  const handleSelect = async (catId: string) => {
    if (selection === catId) {
      const prefId = prefMap[catId];
      if (prefId) await onDeletePreference(prefId);
      setSelection(null);
    } else {
      if (selection) {
        const oldPrefId = prefMap[selection];
        if (oldPrefId) await onDeletePreference(oldPrefId);
      }
      setSelection(catId);
    }
  };

  return (
    <div className="onboarding-step">
      <h2>Who are you traveling with?</h2>
      <span className="onboarding-subtitle">Choose only 1</span>
      <div className="onboarding-category-grid">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-chip single-select ${selection === cat.id ? 'selected' : ''}`}
            onClick={() => handleSelect(cat.id)}
          >
            <cat.icon size={24} />
            <span>{cat.description}</span>
          </button>
        ))}
      </div>
      <div className="onboarding-actions">
        <button className="onboarding-skip-btn" onClick={onSkip} disabled={isLoading}>Skip</button>
        <button className="onboarding-next-btn" onClick={onFinish} disabled={isLoading}>
          Finish {isLoading && '...'}
        </button>
      </div>
    </div>
  );
};

export default Step4TravelWith;