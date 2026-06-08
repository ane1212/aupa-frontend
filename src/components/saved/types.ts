export type Tab = 'saved' | 'trip';
export type Filter = 'all' | 'places' | 'food' | 'bars';

export interface SavedItem {
    id: string;
    name: string;
    meta: string;
    sub?: string;
    score: number;
    category: string;
    image?: string;
}

export interface TripItem {
    id: number;
    name: string;
    category: string;
    subtitle: string;
}

export interface FilterDef {
    id: Filter;
    label: string;
    icon?: React.ComponentType<{ size?: number }>;
}