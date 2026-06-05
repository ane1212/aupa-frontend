import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, CircleUserRound, LogOut, Megaphone, type LucideIcon } from 'lucide-react';
import { categoryService, preferenceService, userService } from '../services/API';
import type { Category, Preference, LanguageType } from '../services/models';
import { useAuth } from '../context';
import { CATEGORY_ICON_MAP, LANGUAGE_OPTIONS, MAX_STEP2_SELECTIONS, STEP2_NAMES, STEP3_NAMES, STEP4_NAMES } from '../components/onboarding/onboarding.constants';
import type { CategoryOption } from '../components/onboarding/onboarding.types';
import { getAppCopy, LANGUAGE_NAMES } from '../i18n/copy';

interface PreferenceChip {
  key: string;
  label: string;
  icon: LucideIcon;
  tone: string;
}

const categoryLabels: Record<string, string> = {
  food: 'Food',
  culture: 'Culture',
  nature: 'Nature',
  bars: 'Bars',
  local_favorites: 'Local experiences',
  shopping: 'Shopping',
  coffee_shops: 'Coffee shops',
  walking_tours: 'Walking',
  family_friendly: 'Family friendly',
  vegetarian_vegan: 'Vegetarian',
  history: 'History',
  festivals_events: 'Events',
  beaches: 'Beaches',
  nightlife: 'Nightlife',
  budget_friendly: 'Budget friendly',
  oneday: 'One day',
  threedays: 'Three days',
  oneweek: 'One week',
  longstay: 'Long stay',
  solo: 'Solo',
  partner: 'Partner',
  friends: 'Friends',
  family: 'Family',
};

const categoryTones = ['pink', 'green', 'cream', 'blue', 'cream'];

const buildOptions = (categories: Category[], names: string[]) => {
  return categories
    .filter((cat: Category) => names.includes(cat.name))
    .map((cat: Category) => ({
      id: cat.id,
      name: cat.name,
      description: cat.description ?? categoryLabels[cat.name] ?? cat.name.replaceAll('_', ' '),
      icon: CATEGORY_ICON_MAP[cat.name] || Bookmark,
    }));
};

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, refreshUser } = useAuth();
  const copy = getAppCopy(user?.language);

  const [preferences, setPreferences] = useState<PreferenceChip[]>([]);
  const [avatarError, setAvatarError] = useState(false);

  const [step2Categories, setStep2Categories] = useState<CategoryOption[]>([]);
  const [step3Categories, setStep3Categories] = useState<CategoryOption[]>([]);
  const [step4Categories, setStep4Categories] = useState<CategoryOption[]>([]);
  const [prefMap, setPrefMap] = useState<Record<string, string>>({});

  const [step2Selections, setStep2Selections] = useState<string[]>([]);
  const [step3Selection, setStep3Selection] = useState<string | null>(null);
  const [step4Selection, setStep4Selection] = useState<string | null>(null);

  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [isEditingLanguage, setIsEditingLanguage] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>(user?.language ?? 'en');
  const [isSavingPreferences, setIsSavingPreferences] = useState(false);
  const [isSavingLanguage, setIsSavingLanguage] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const loadProfileData = async () => {
    if (!user?.id) return;

    const [categoriesResponse, userPreferencesResponse] = await Promise.all([
      categoryService.getAll({ limit: 100 }),
      preferenceService.getByUser(user.id, { limit: 100 }),
    ]);

    const allCategories = categoriesResponse.data ?? [];
    const prefs = userPreferencesResponse.data ?? [];
    const selectedCategoryIds = prefs.map((pref: Preference) => pref.categoryId);

    const nextStep2Categories = buildOptions(allCategories, STEP2_NAMES);
    const nextStep3Categories = buildOptions(allCategories, STEP3_NAMES);
    const nextStep4Categories = buildOptions(allCategories, STEP4_NAMES);

    const nextPrefMap: Record<string, string> = {};
    prefs.forEach((pref: Preference) => {
      nextPrefMap[pref.categoryId] = pref.id;
    });

    setStep2Categories(nextStep2Categories);
    setStep3Categories(nextStep3Categories);
    setStep4Categories(nextStep4Categories);
    setPrefMap(nextPrefMap);
    setStep2Selections(
      nextStep2Categories
        .filter((cat) => selectedCategoryIds.includes(cat.id))
        .slice(0, MAX_STEP2_SELECTIONS)
        .map((cat) => cat.id)
    );
    setStep3Selection(nextStep3Categories.find((cat) => selectedCategoryIds.includes(cat.id))?.id ?? null);
    setStep4Selection(nextStep4Categories.find((cat) => selectedCategoryIds.includes(cat.id))?.id ?? null);

    const selectedCategories = prefs
      .map((preference: Preference, index: number) => {
        const category = allCategories.find((item: Category) => item.id === preference.categoryId);
        if (!category) return null;

        return {
          key: category.id,
          label: categoryLabels[category.name] ?? category.name.replaceAll('_', ' '),
          icon: CATEGORY_ICON_MAP[category.name] ?? Bookmark,
          tone: categoryTones[index % categoryTones.length],
        };
      })
      .filter((chip): chip is PreferenceChip => Boolean(chip));

    setPreferences(selectedCategories);
  };

  useEffect(() => {
    if (!user?.id) return;

    loadProfileData().catch(() => {
      setPreferences([]);
      setStep2Categories([]);
      setStep3Categories([]);
      setStep4Categories([]);
      setPrefMap({});
    });
  }, [user?.id]);

  useEffect(() => {
    setSelectedLanguage((user?.language ?? 'en') as LanguageType);
  }, [user?.language]);

  const saveLanguage = async () => {
    if (!user?.id) return;
    if (selectedLanguage === user.language) {
      setIsEditingLanguage(false);
      return;
    }

    setIsSavingLanguage(true);
    try {
      await userService.updateProfile({ language: selectedLanguage });
      await refreshUser();
      setIsEditingLanguage(false);
    } finally {
      setIsSavingLanguage(false);
    }
  };

  const cancelLanguage = () => {
    setSelectedLanguage((user?.language ?? 'en') as LanguageType);
    setIsEditingLanguage(false);
  };

  const handleToggleStep2 = (categoryId: string) => {
    setStep2Selections((prev) => {
      const isSelected = prev.includes(categoryId);
      if (isSelected) {
        return prev.filter((id) => id !== categoryId);
      }
      if (prev.length >= MAX_STEP2_SELECTIONS) {
        return prev;
      }
      return [...prev, categoryId];
    });
  };

  const savePreferences = async () => {
    if (!user?.id) return;

    const selectedIds = [...step2Selections, step3Selection, step4Selection].filter(Boolean) as string[];
    const selectedSet = new Set(selectedIds);
    const currentIds = Object.keys(prefMap);

    const idsToCreate = selectedIds.filter((categoryId) => !prefMap[categoryId]);
    const prefIdsToDelete = currentIds
      .filter((categoryId) => !selectedSet.has(categoryId))
      .map((categoryId) => prefMap[categoryId]);

    setIsSavingPreferences(true);
    try {
      await Promise.all(idsToCreate.map((categoryId) => preferenceService.create({ categoryId })));
      await Promise.all(prefIdsToDelete.filter(Boolean).map((prefId) => preferenceService.delete(prefId)));
      await loadProfileData();
      setIsEditingPreferences(false);
    } finally {
      setIsSavingPreferences(false);
    }
  };

  const cancelPreferences = async () => {
    await loadProfileData();
    setIsEditingPreferences(false);
  };

  const renderCategoryChips = (items: CategoryOption[], selectedIds: string[], onToggle: (id: string) => void, limit?: number) => {
    return (
      <div className="profile-edit-grid">
        {items.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          const canSelect = limit === undefined || isSelected || selectedIds.length < limit;

          return (
            <button
              type="button"
              key={item.id}
              className={'profile-edit-chip' + (isSelected ? ' selected' : '') + (!canSelect && !isSelected ? ' disabled' : '')}
              onClick={() => onToggle(item.id)}
              disabled={!canSelect && !isSelected}
            >
              <item.icon size={20} />
              <span>{item.description}</span>
            </button>
          );
        })}
      </div>
    );
  };

  const renderLanguageButtons = () => {
    return (
      <div className="profile-language-grid">
        {LANGUAGE_OPTIONS.map((option) => {
          const isSelected = selectedLanguage === option.code;
          return (
            <button
              type="button"
              key={option.code}
              className={'profile-language-btn' + (isSelected ? ' active' : '')}
              onClick={() => setSelectedLanguage(option.code as LanguageType)}
            >
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="profile">
      <header className="profile-header">
        <h1>{copy.profile.title}</h1>
      </header>

      <section className="profile-summary" aria-label="Profile summary">
        <div className="profile-identity">
          {avatarError || !user?.avatar ? (
            <CircleUserRound className="profile-avatar-icon" size={68} strokeWidth={1.8} />
          ) : (
            <img
              className="profile-avatar"
              src={user.avatar}
              alt={user?.name || 'Avatar'}
              onError={() => setAvatarError(true)}
            />
          )}
          <h2>{user?.name || 'Aupa'}!</h2>
        </div>
      </section>

      <section className="profile-section">
        <div className="profile-section-head profile-section-head-row">
          <h2>{copy.profile.language}</h2>
          {!isEditingLanguage ? (
            <button type="button" className="profile-inline-action" onClick={() => setIsEditingLanguage(true)}>
              {copy.profile.edit}
            </button>
          ) : null}
        </div>

        {!isEditingLanguage ? (
          <p className="profile-language-value">{user?.language ? LANGUAGE_NAMES[user.language] : '—'}</p>
        ) : (
          <>
            {renderLanguageButtons()}
            <div className="profile-edit-actions">
              <button type="button" className="profile-save-btn" onClick={saveLanguage} disabled={isSavingLanguage}>
                {copy.profile.save}
              </button>
              <button type="button" className="profile-cancel-btn" onClick={cancelLanguage} disabled={isSavingLanguage}>
                {copy.profile.cancel}
              </button>
            </div>
          </>
        )}
      </section>

      <section className="profile-section">
        <div className="profile-section-head profile-section-head-row">
          <h2>{copy.profile.preferences}</h2>
          {!isEditingPreferences ? (
            <button type="button" className="profile-inline-action" onClick={() => setIsEditingPreferences(true)}>
              {copy.profile.edit}
            </button>
          ) : null}
        </div>

        {!isEditingPreferences ? (
          preferences.length > 0 ? (
            <div className="profile-preferences">
              {preferences.map(({ key, label, icon: Icon, tone }) => (
                <span className={'profile-chip ' + tone} key={key}>
                  <Icon size={15} />
                  {label}
                </span>
              ))}
            </div>
          ) : (
            <p className="profile-empty">{copy.profile.noPreferences}</p>
          )
        ) : (
          <div className="profile-edit-stack">
            <div className="profile-edit-block">
              <h3>{copy.profile.interests}</h3>
              <span className="profile-edit-hint">{copy.onboarding.step2Subtitle}</span>
              {renderCategoryChips(step2Categories, step2Selections, handleToggleStep2, MAX_STEP2_SELECTIONS)}
            </div>

            <div className="profile-edit-block">
              <h3>{copy.profile.duration}</h3>
              <span className="profile-edit-hint">{copy.onboarding.step3Subtitle}</span>
              {renderCategoryChips(step3Categories, step3Selection ? [step3Selection] : [], (id) => {
                setStep3Selection((prev) => (prev === id ? null : id));
              })}
            </div>

            <div className="profile-edit-block">
              <h3>{copy.profile.travelWith}</h3>
              <span className="profile-edit-hint">{copy.onboarding.step4Subtitle}</span>
              {renderCategoryChips(step4Categories, step4Selection ? [step4Selection] : [], (id) => {
                setStep4Selection((prev) => (prev === id ? null : id));
              })}
            </div>

            <div className="profile-edit-actions">
              <button type="button" className="profile-save-btn" onClick={savePreferences} disabled={isSavingPreferences}>
                {copy.profile.save}
              </button>
              <button type="button" className="profile-cancel-btn" onClick={cancelPreferences} disabled={isSavingPreferences}>
                {copy.profile.cancel}
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="profile-section">
        <button type="button" className="profile-partner-cta" onClick={() => navigate('/local-partner')}>
          <Megaphone size={23} />
          <span>
            {copy.profile.partnerTitle}
            <small>{copy.profile.partnerSubtitle}</small>
          </span>
        </button>
        <button className="profile-logout-btn" type="button" onClick={handleLogout}>
          <LogOut size={20} />
          <span>{copy.profile.logout}</span>
        </button>
      </section>
    </div>
  );
};

export default Profile;
