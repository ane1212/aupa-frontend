import { MapPin, Utensils, Wine } from 'lucide-react';
import type { FilterDef, SavedItem, TripItem } from './types';

export const filterDefs: FilterDef[] = [
    { id: 'all', label: 'All' },
    { id: 'places', label: 'Places', icon: MapPin },
    { id: 'food', label: 'Food', icon: Utensils },
    { id: 'bars', label: 'Bars', icon: Wine },
];

export const savedItems: SavedItem[] = [
    { id: 1, name: 'Bar El Globo', meta: 'Pintxos bar · Casco Viejo', sub: '400m away · 5 min walk', score: 97, category: 'food' },
    { id: 2, name: 'Gure Toki', meta: 'Restaurant · Indautxu', sub: '750m away · 10 min walk', score: 93, category: 'food' },
    { id: 3, name: 'La Viña del Ensanche', meta: 'Wine bar · Ensanche', sub: '600m away · 8 min walk', score: 95, category: 'bars' },
    { id: 4, name: 'Hidden viewpoints of Bilbao', meta: '2 hours · Free', score: 92, category: 'experiences' },
];

export const initialTripItems: TripItem[] = [
    { id: 1, name: 'Pintxo Crawl', category: 'Experience', subtitle: 'Food & Drink' },
    { id: 2, name: 'Gure Toki', category: 'Wine Bar', subtitle: 'Ensanche' },
    { id: 3, name: 'Puente Colgante', category: 'Places', subtitle: 'Portugalete' },
    { id: 4, name: 'Guggenheim Museum', category: 'Culture', subtitle: 'Bilbao' },
];

export const CATEGORY_ORDER = ['food', 'bars', 'experiences'];
export const CATEGORY_LABELS: Record<string, string> = {
    food: 'FOOD',
    bars: 'BARS',
    experiences: 'EXPERIENCES',
};
