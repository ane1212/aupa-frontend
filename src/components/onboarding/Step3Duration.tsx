import React from 'react';
import type { CategoryOption } from './onboarding.types';
import { useAuth } from '../../context';
import { getAppCopy } from '../../i18n/copy';

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
  const { user } = useAuth();
  const copy = getAppCopy(user?.language);
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
      <h2>{copy.onboarding.step3Title}</h2>
      <span className="onboarding-subtitle">{copy.onboarding.step3Subtitle}</span>
      <div className="onboarding-option-list">
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
        {copy.onboarding.step3Next} <span aria-hidden="true">→</span>
      </button>
    </div>
  );
};

export default Step3Duration;