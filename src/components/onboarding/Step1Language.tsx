import React, { useEffect } from 'react';
import { LANGUAGE_OPTIONS } from './onboarding.constants';
import { userService } from '../../services/API';
import { useAuth } from '../../context';
import type { LanguageType } from '../../services/models';

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
  const { user } = useAuth();

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
      // Refrescar el user del contexto
      const updatedUser = await userService.getProfile();
      localStorage.setItem('user', JSON.stringify({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      }));
    } catch {
      console.error('Failed to update language');
    }
  };

  return (
    <div className="onboarding-step">
      <h2>Choose your language</h2>
      <span className="onboarding-subtitle">You can change this in the Settings</span>
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
        Next <span aria-hidden="true">→</span>
      </button>
    </div>
  );
};

export default Step1Language;