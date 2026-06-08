export interface Category {
    id: string;
    label: string;
    icon: React.ComponentType<{ size?: number }>;
}

export interface Place {
    id: number;
    name: string;
    type: string;
    distance: string;
    walkTime: string;
    score: number;
    lat: number;
    lng: number;
    category?: string;
}
