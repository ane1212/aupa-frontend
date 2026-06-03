export const CategoryType = {
    FOOD: 'food',
    CULTURE: 'culture',
    NATURE: 'nature',
    BARS: 'bars',
    LOCAL_FAVORITES: 'local_favorites',
    SHOPPING: 'shopping',
    COFFEE_SHOPS: 'coffee_shops',
    WALKING_TOURS: 'walking_tours',
    FAMILY_FRIENDLY: 'family_friendly',
    VEGETARIAN_VEGAN: 'vegetarian_vegan',
    HISTORY: 'history',
    FESTIVALS_EVENTS: 'festivals_events',
    BEACHES: 'beaches',
    NIGHTLIFE: 'nightlife',
    BUDGET_FRIENDLY: 'budget_friendly',
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
