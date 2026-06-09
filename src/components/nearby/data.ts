import { Utensils, Wine, Building2, TreePine, CalendarDays } from 'lucide-react';
import type { Category, Place } from './types';

export const categories: Category[] = [
    { id: 'food', label: 'Food', icon: Utensils },
    { id: 'bars', label: 'Bars', icon: Wine },
    { id: 'culture', label: 'Culture', icon: Building2 },
    { id: 'nature', label: 'Nature', icon: TreePine },
    { id: 'events', label: 'Events', icon: CalendarDays },
];

export const places: Place[] = [
    { id: 1, name: 'Bar El Globo', type: 'Pintxos bar', distance: '400m away', walkTime: '5 min walk', score: 97, lat: 43.2572, lng: -2.9237 },
    { id: 2, name: 'La Viña del Ensanche', type: 'Wine bar', distance: '600m away', walkTime: '8 min walk', score: 95, lat: 43.2627, lng: -2.9359 },
    { id: 3, name: 'Gure Toki', type: 'Restaurant',  distance: '750m away', walkTime: '10 min walk', score: 93, lat: 43.2638, lng: -2.9362 },
];
