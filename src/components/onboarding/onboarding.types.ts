export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface CategoryOption {
  id: string;
  name: string;
  description?: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
}

export interface Preference {
  id: string;
  userId: string;
  categoryId: string;
}

export type OnboardingStep = 1 | 2 | 3 | 4;