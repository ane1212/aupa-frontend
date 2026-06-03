export interface Favorite {
    id: string
    userId: string
    eventId: string
    createdAt?: string
}

export interface CreateFavoriteForm {
    eventId: string
}
