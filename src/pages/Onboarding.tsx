import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryService, preferenceService } from '../services/API';
import { useAuth } from '../context';
import TopLogo from '../components/ui/TopLogo';
import Step1Language from '../components/onboarding/Step1Language';
import Step2Categories from '../components/onboarding/Step2Categories';
import Step3Duration from '../components/onboarding/Step3Duration';
import Step4TravelWith from '../components/onboarding/Step4TravelWith';
import type { Category, CategoryOption, OnboardingStep, Preference } from '../components/onboarding/onboarding.types';
import { STEP2_NAMES, STEP3_NAMES, STEP4_NAMES, CATEGORY_ICON_MAP } from '../components/onboarding/onboarding.constants';
import { Bookmark } from 'lucide-react';
import { getAppCopy } from '../i18n/copy';

const Onboarding: React.FC = () => {
  const { user } = useAuth();
  const copy = getAppCopy(user?.language);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [step2Selections, setStep2Selections] = useState<string[]>([]);
  const [step3Selection, setStep3Selection] = useState<string | null>(null);
  const [step4Selection, setStep4Selection] = useState<string | null>(null);

  const [step2Categories, setStep2Categories] = useState<CategoryOption[]>([]);
  const [step3Categories, setStep3Categories] = useState<CategoryOption[]>([]);
  const [step4Categories, setStep4Categories] = useState<CategoryOption[]>([]);
  const [prefMap, setPrefMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await categoryService.getAll({ limit: 100 });
        const allCategories = categoriesResponse.data ?? [];

        const step2Cats = allCategories
          .filter((cat: Category) => STEP2_NAMES.includes(cat.name))
          .map((cat: Category) => ({
            id: cat.id,
            name: cat.name,
            description: cat.description,
            icon: CATEGORY_ICON_MAP[cat.name] || Bookmark,
          }));
        setStep2Categories(step2Cats);

        const step3Cats = allCategories
          .filter((cat: Category) => STEP3_NAMES.includes(cat.name))
          .map((cat: Category) => ({
            id: cat.id,
            name: cat.name,
            description: cat.description,
            icon: CATEGORY_ICON_MAP[cat.name] || Bookmark,
          }));
        setStep3Categories(step3Cats);

        const step4Cats = allCategories
          .filter((cat: Category) => STEP4_NAMES.includes(cat.name))
          .map((cat: Category) => ({
            id: cat.id,
            name: cat.name,
            description: cat.description,
            icon: CATEGORY_ICON_MAP[cat.name] || Bookmark,
          }));
        setStep4Categories(step4Cats);

        try {
          const userPreferences = await preferenceService.getByUser(user!.id, { limit: 100 });
          const prefs: Preference[] = userPreferences.data ?? [];

          const prefMapTemp: Record<string, string> = {};
          prefs.forEach((p) => prefMapTemp[p.categoryId] = p.id);

          const selectedCategoryIds = prefs.map((p) => p.categoryId);

          setStep2Selections(
            step2Cats
              .filter((cat: Category) => selectedCategoryIds.includes(cat.id))
              .slice(0, 3)
              .map((cat: Category) => cat.id)
          );

          const step3Pref = step3Cats.find((cat: Category) => selectedCategoryIds.includes(cat.id));
          if (step3Pref) setStep3Selection(step3Pref.id);

          const step4Pref = step4Cats.find((cat: Category) => selectedCategoryIds.includes(cat.id));
          if (step4Pref) setStep4Selection(step4Pref.id);

          setPrefMap(prefMapTemp);
        } catch {
          setPrefMap({});
        }
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

    if (user?.id) fetchData();
  }, [user?.id]);

  const deletePreference = async (prefId: string) => {
    await preferenceService.delete(prefId);
  };

  const savePreferences = async (): Promise<boolean> => {
    const selections = [...step2Selections, step3Selection, step4Selection].filter(Boolean) as string[];
    if (selections.length === 0) return true;

    try {
      const promises = selections
        .filter((categoryId) => !prefMap[categoryId])
        .map((categoryId) => preferenceService.create({ categoryId }));
      await Promise.all(promises);
      return true;
    } catch {
      return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep((prev) => (prev + 1) as OnboardingStep);
  };

  const handleFinish = async () => {
    setIsLoading(true);
    await savePreferences();
    setIsLoading(false);
    navigate('/home');
  };

  const handleSkip = async () => {
    await savePreferences();
    navigate('/home');
  };

  return (
    <div className="register">
      <div className="register-header">
        <TopLogo />
        <h2>{copy.onboarding.introTitle}</h2>
        <span>{copy.onboarding.introSubtitle}</span>
      </div>
      <div className="onboarding-progress-container">
        <div className="onboarding-progress-bar">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className={`progress-step ${step === currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`} />
          ))}
        </div>
      </div>
      
      {currentStep === 1 && (
        <Step1Language
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          onNext={handleNext}
        />
      )}
      
      {currentStep === 2 && (
        <Step2Categories
          categories={step2Categories}
          selections={step2Selections}
          setSelections={setStep2Selections}
          prefMap={prefMap}
          onNext={handleNext}
          onDeletePreference={deletePreference}
        />
      )}
      
      {currentStep === 3 && (
        <Step3Duration
          categories={step3Categories}
          selection={step3Selection}
          setSelection={setStep3Selection}
          prefMap={prefMap}
          onNext={handleNext}
          onDeletePreference={deletePreference}
        />
      )}
      
      {currentStep === 4 && (
        <Step4TravelWith
          categories={step4Categories}
          selection={step4Selection}
          setSelection={setStep4Selection}
          prefMap={prefMap}
          onSkip={handleSkip}
          onFinish={handleFinish}
          isLoading={isLoading}
          onDeletePreference={deletePreference}
        />
      )}
    </div>
  );
};

export default Onboarding;