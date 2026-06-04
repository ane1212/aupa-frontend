export interface Preference {
    id: string
    userId: string
    categoryId: string
    createdAt?: string
}

export interface CreatePreferenceForm {
    categoryId: string
}
