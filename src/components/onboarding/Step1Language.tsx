import React from 'react';
import { LANGUAGE_OPTIONS } from './onboarding.constants';

interface Step1LanguageProps {
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  onNext: () => void;
}

const Step1Language: React.FC<Step1LanguageProps> = ({
  selectedLanguage,
  setSelectedLanguage,
  onNext,
}) => {
  return (
    <div className="onboarding-step">
      <h2>Choose your language</h2>
      <span className="onboarding-subtitle">You can change this in the Settings</span>
      <div className="onboarding-options">
        {LANGUAGE_OPTIONS.map((lang) => (
          <button
            key={lang.code}
            className={`language-btn ${selectedLanguage === lang.code ? 'selected' : ''}`}
            onClick={() => setSelectedLanguage(lang.code)}
          >
            {lang.label}
          </button>
        ))}
      </div>
      <button className="onboarding-next-btn" onClick={onNext} disabled={!selectedLanguage}>
        Next <span aria-hidden="true">→</span>
      </button>
    </div>
  );
};

export default Step1Language;