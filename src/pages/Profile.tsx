import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CircleHelp,
  CircleUserRound,
  CloudRain,
  Info,
  Landmark,
  Megaphone,
  PersonStanding,
  Settings,
  UsersRound,
  Utensils,
  type LucideIcon,
} from 'lucide-react';
import { categoryService, favoriteService, preferenceService } from '../services/API';
import type { CategoryType } from '../services/models';
import { useAuth } from '../context';

interface PreferenceChip {
  key: string;
  label: string;
  icon: LucideIcon;
  tone: string;
}

const fallbackPreferences: PreferenceChip[] = [
  { key: 'food', label: 'Food', icon: Utensils, tone: 'pink' },
  { key: 'culture', label: 'Culture', icon: Landmark, tone: 'green' },
  { key: 'walking_tours', label: 'Walking', icon: PersonStanding, tone: 'cream' },
  { key: 'rainy_days', label: 'Rainy days', icon: CloudRain, tone: 'blue' },
  { key: 'local_favorites', label: 'Local experiences', icon: UsersRound, tone: 'cream' },
];

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

const categoryIcons: Partial<Record<CategoryType, LucideIcon>> = {
  food: Utensils,
  culture: Landmark,
  walking_tours: PersonStanding,
  local_favorites: UsersRound,
};

const categoryTones = ['pink', 'green', 'cream', 'blue', 'cream'];

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [savedCount, setSavedCount] = useState(7);
  const [preferences, setPreferences] = useState<PreferenceChip[]>(fallbackPreferences);
  const [avatarError, setAvatarError] = useState(false);


  const seed = useMemo(() => {
    if (!user?.name) return ':)';
    return user.name.trim().split(' ')[0];
  }, [user?.name]);


  const avatarUrl = useMemo(() =>
    `https://api.dicebear.com/7.x/initials/svg?seed=${seed}`,
    [seed] // notionists, avataaars, initials
  );


  useEffect(() => {
    if (!user?.id) return;

    const loadProfileData = async () => {
      try {
        const favorites = await favoriteService.getByUser(user.id);
        setSavedCount(favorites.length);
      } catch {
        setSavedCount(7);
      }

      try {
        const [userPreferences, categories] = await Promise.all([
          preferenceService.getByUser(user.id),
          categoryService.getAll(),
        ]);

        const chips = userPreferences
          .map((preference, index) => {
            const category = categories.find((item) => item.id === preference.categoryId);
            if (!category) return null;

            return {
              key: category.id,
              label: categoryLabels[category.name] ?? category.name.replaceAll('_', ' '),
              icon: categoryIcons[category.name] ?? fallbackPreferences[index % fallbackPreferences.length].icon,
              tone: categoryTones[index % categoryTones.length],
            };
          })
          .filter((chip): chip is PreferenceChip => Boolean(chip))
          .slice(0, 5);

        if (chips.length > 0) setPreferences(chips);
      } catch {
        setPreferences(fallbackPreferences);
      }
    };

    loadProfileData();
  }, [user?.id]);

  const firstName = useMemo(() => user?.name?.trim().split(' ')[0] || ':)', [user?.name]);

  return (
    <div className="profile">
      <header className="profile-header">
        <h1>Profile</h1>
        <button className="profile-icon-btn" type="button" aria-label="Notifications">
          <Bell size={22} fill="currentColor" />
        </button>
      </header>

      <section className="profile-summary" aria-label="Profile summary">
        <div className="profile-identity">
          {avatarError ? (
            <CircleUserRound className="profile-avatar-icon" size={68} strokeWidth={1.8} />
          ) : (
            <img
              className="profile-avatar"
              src={avatarUrl}
              alt={user?.name || 'Avatar'}
              onError={() => setAvatarError(true)}
            />
          )}
          <h2>Aupa, {firstName}!</h2>
        </div>

        <dl className="profile-stats">
          <div>
            <dt>{savedCount} Places saved</dt>
          </div>
          <div>
            <dt>1 Trips visited</dt>
          </div>
          <div>
            <dt>4 Cities explored</dt>
          </div>
        </dl>
      </section>

      <section className="profile-section">
        <div className="profile-section-head">
          <h2>Your preferences</h2>
          <button type="button">Edit</button>
        </div>
        <div className="profile-preferences">
          {preferences.map(({ key, label, icon: Icon, tone }) => (
            <span className={`profile-chip ${tone}`} key={key}>
              <Icon size={15} />
              {label}
            </span>
          ))}
        </div>
      </section>

      <section className="profile-section">
        <div className="profile-section-head">
          <h2>Language</h2>
        </div>
        <div className="profile-language" role="group" aria-label="Language">
          <button className="active" type="button">English</button>
          <button type="button">Español</button>
        </div>
      </section>

      <section className="profile-section">
        <div className="profile-section-head">
          <h2>More</h2>
        </div>
        <nav className="profile-menu" aria-label="Profile options">
          <button type="button">
            <Settings size={23} />
            <span>Settings</span>
          </button>
          <button type="button">
            <CircleHelp size={23} />
            <span>Help & Support</span>
          </button>
          <button type="button">
            <Info size={23} />
            <span>About Aupa!</span>
          </button>
          <button type="button" onClick={() => navigate('/local-partner')}>
            <Megaphone size={23} />
            <span>
              Become a local partner!
              <small>Promote your local business on Aupa!</small>
            </span>
          </button>
        </nav>
      </section>
    </div>
  );
};

export default Profile;