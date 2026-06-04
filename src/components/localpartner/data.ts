import { LayoutList, Megaphone, BarChart3 } from 'lucide-react';
import type { Benefit, BusinessCategory } from './types';

export const benefits: Benefit[] = [
    {
        icon: LayoutList,
        title: 'Showcase your business',
        description: 'Appear in local experiences and search results.',
    },
    {
        icon: Megaphone,
        title: 'Reach more travelers',
        description: 'Connect with thousands of people visiting Bilbao.',
    },
    {
        icon: BarChart3,
        title: 'Get valuable insights',
        description: 'Track views, saves and customer engagements.',
    },
];

export const businessCategories: BusinessCategory[] = [
    { id: 'restaurant', label: 'Restaurant' },
    { id: 'bars', label: 'Bars' },
    { id: 'coffee_shop', label: 'Coffee Shop' },
    { id: 'museum', label: 'Museum' },
    { id: 'attraction', label: 'Attraction' },
    { id: 'shops', label: 'Shops' },
    { id: 'other', label: 'Other' },
];
