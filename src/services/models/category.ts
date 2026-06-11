export const CategoryType = {
    FOOD: 'food',
    CULTURE: 'culture',
    NATURE: 'nature',
    BARS: 'bars',
    LOCAL_FAVORITES: 'local_favorites',
    SHOPPING: 'shopping',
    WALKING_TOURS: 'walking_tours',
    FAMILY_FRIENDLY: 'family_friendly',
    HISTORY: 'history',
    BEACHES: 'beaches',
    ONEDAY: 'oneday',
    THREEDAYS: 'threedays',
    ONEWEEK: 'oneweek',
    LONGSTAY: 'longstay',
    SOLO: 'solo',
    PARTNER: 'partner',
    FRIENDS: 'friends',
    FAMILY: 'family',
} as const

export type CategoryType = typeof CategoryType[keyof typeof CategoryType]

export interface Category {
    id: string
    name: CategoryType
    description?: string
    icon?: string
    createdAt?: string
    updatedAt?: string
}

export interface CreateCategoryForm {
    name: CategoryType
    description?: string
    icon?: string
}

export interface UpdateCategoryForm {
    name?: CategoryType
    description?: string
    icon?: string
}
