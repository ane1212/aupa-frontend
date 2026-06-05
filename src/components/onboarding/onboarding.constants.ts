import {
  Utensils, Wine, Building2, TreePine, Bookmark,
  Eclipse, Coffee, Map, Users, Leaf, Landmark,
  Calendar, Parasol, DollarSign,
  CalendarDays, CalendarClock, CalendarRange, Clock,
  User, UserCircle, Users2, Store
} from 'lucide-react';

export const LANGUAGE_OPTIONS = [
  { code: 'en', label: 'English' },
  { code: 'eu', label: 'Euskera' },
  { code: 'fr', label: 'French' },
  { code: 'es', label: 'Spanish' },
];

export const STEP2_NAMES = [
  'food', 'culture', 'nature', 'bars', 'local_favorites',
  'shopping', 'coffee_shops', 'walking_tours', 'family_friendly',
  'vegetarian_vegan', 'history', 'festivals_events', 'beaches',
  'nightlife', 'budget_friendly'
];

export const STEP3_NAMES = ['oneday', 'threedays', 'oneweek', 'longstay'];
export const STEP4_NAMES = ['solo', 'partner', 'friends', 'family'];

export const MAX_STEP2_SELECTIONS = 3;

export const CATEGORY_ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  food: Utensils, culture: Building2, nature: TreePine, bars: Wine,
  local_favorites: Bookmark, shopping: Store, coffee_shops: Coffee,
  walking_tours: Map, family_friendly: Users, vegetarian_vegan: Leaf,
  history: Landmark, festivals_events: Calendar, beaches: Parasol,
  nightlife: Eclipse, budget_friendly: DollarSign,
  oneday: CalendarDays, threedays: CalendarClock, oneweek: Clock,
  longstay: CalendarRange, solo: User, partner: UserCircle,
  friends: Users2, family: Users,
};