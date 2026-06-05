import React from 'react';
import type { CategoryOption } from './onboarding.types';
import { useAuth } from '../../context';
import { getAppCopy } from '../../i18n/copy';

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
      <h2>{copy.onboarding.step4Title}</h2>
      <span className="onboarding-subtitle">{copy.onboarding.step4Subtitle}</span>
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
        <button className="onboarding-skip-btn" onClick={onSkip} disabled={isLoading}>{copy.onboarding.step4Skip}</button>
        <button className="onboarding-next-btn" onClick={onFinish} disabled={isLoading}>
          {copy.onboarding.step4Finish} {isLoading && '...'}
        </button>
      </div>
    </div>
  );
};

export default Step4TravelWith;