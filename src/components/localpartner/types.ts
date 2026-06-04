export type PartnerStep = 0 | 1 | 2 | 3 | 4;

export interface PartnerFormData {
    category: string;
    customCategory: string;
    businessName: string;
    address: string;
    phone: string;
    website: string;
    description: string;
}

export interface BusinessCategory {
    id: string;
    label: string;
}

export interface Benefit {
    icon: React.ComponentType<{ size?: number; color?: string }>;
    title: string;
    description: string;
}
