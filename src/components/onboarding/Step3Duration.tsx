import React from 'react';
import type { CategoryOption } from './onboarding.types';

interface Step3DurationProps {
  categories: CategoryOption[];
  selection: string | null;
  setSelection: (id: string | null) => void;
  prefMap: Record<string, string>;
  onNext: () => void;
  onDeletePreference: (prefId: string) => Promise<void>;
}

const Step3Duration: React.FC<Step3DurationProps> = ({
  categories,
  selection,
  setSelection,
  prefMap,
  onNext,
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
      <h2>How long are you staying?</h2>
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
      <button className="onboarding-next-btn" onClick={onNext} disabled={!selection}>
        Next <span aria-hidden="true">→</span>
      </button>
    </div>
  );
};

export default Step3Duration;