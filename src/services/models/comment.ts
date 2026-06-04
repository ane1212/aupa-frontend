export interface Comment {
    id: string
    userId: string
    eventId: string
    content: string
    rating: number
    createdAt?: string
    updatedAt?: string
}

export interface CreateCommentForm {
    eventId: string
    content: string
    rating: number
}

export interface UpdateCommentForm {
    content?: string
    rating?: number
}
