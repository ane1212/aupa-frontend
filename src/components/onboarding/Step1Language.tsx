import React, { useEffect } from 'react';
import { LANGUAGE_OPTIONS } from './onboarding.constants';
import { userService } from '../../services/API';
import { useAuth } from '../../context';
import type { LanguageType } from '../../services/models';
import { getAppCopy } from '../../i18n/copy';

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
  const { user, refreshUser } = useAuth();
  const copy = getAppCopy(user?.language);

  useEffect(() => {
    if (!selectedLanguage && user?.language) {
      setSelectedLanguage(user.language);
    } else if (!selectedLanguage) {
      const browserLang = navigator.language.slice(0, 2);
      const matchingLang = LANGUAGE_OPTIONS.find(lang => lang.code === browserLang);
      if (matchingLang) {
        setSelectedLanguage(matchingLang.code);
      }
    }
  }, [selectedLanguage, setSelectedLanguage, user]);

  const handleLanguageChange = async (langCode: string) => {
    setSelectedLanguage(langCode);
    try {
      await userService.updateProfile({ language: langCode as LanguageType });
      await refreshUser();
    } catch {
      console.error('Failed to update language');
    }
  };

  return (
    <div className="onboarding-step">
      <h2>{copy.onboarding.step1Title}</h2>
      <span className="onboarding-subtitle">{copy.onboarding.step1Subtitle}</span>
      <div className="onboarding-options">
        {LANGUAGE_OPTIONS.map((lang) => (
          <button
            key={lang.code}
            className={`language-btn ${selectedLanguage === lang.code ? 'selected' : ''}`}
            onClick={() => handleLanguageChange(lang.code)}
          >
            {lang.label}
          </button>
        ))}
      </div>
      <button className="onboarding-next-btn" onClick={onNext} disabled={!selectedLanguage}>
        {copy.onboarding.step1Next} <span aria-hidden="true">→</span>
      </button>
    </div>
  );
};

export default Step1Language;