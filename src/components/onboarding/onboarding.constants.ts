import {
  Utensils, Wine, Building2, TreePine, Bookmark,
  Map, Users, Landmark,
  Parasol,
  CalendarDays, CalendarClock, CalendarRange, Clock,
  User, UserCircle, Users2, Store
} from 'lucide-react';

export const LANGUAGE_OPTIONS = [
  { code: 'en', label: 'English' },
  { code: 'eu', label: 'Euskara' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
];

export const STEP2_NAMES = [
  'food', 'culture', 'nature', 'bars', 'local_favorites', 'shopping', 'walking_tours', 'family_friendly', 'history', 'beaches'
];

export const STEP3_NAMES = ['oneday', 'threedays', 'oneweek', 'longstay'];
export const STEP4_NAMES = ['solo', 'partner', 'friends', 'family'];

export const MAX_STEP2_SELECTIONS = 3;

export const CATEGORY_ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  food: Utensils, culture: Building2, nature: TreePine, bars: Wine,
  local_favorites: Bookmark, shopping: Store,
  walking_tours: Map, family_friendly: Users,
  history: Landmark, beaches: Parasol,
  oneday: CalendarDays, threedays: CalendarClock, oneweek: Clock,
  longstay: CalendarRange, solo: User, partner: UserCircle,
  friends: Users2, family: Users,
};