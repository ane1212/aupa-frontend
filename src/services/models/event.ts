export interface Event {
    id: string
    title: string
    description?: string
    date: string
    startTime: string
    endTime?: string
    image?: string
    price: number
    capacity?: number
    address?: string
    latitude?: number
    longitude?: number
    localId: string
    categoryId?: string
    active: boolean
    createdAt?: string
    updatedAt?: string
}

export interface CreateEventForm {
    title: string
    description?: string
    date: string
    startTime: string
    endTime?: string
    image?: string
    price?: number
    capacity?: number
    address?: string
    latitude?: number
    longitude?: number
    localId: string
    categoryId?: string
}

export interface UpdateEventForm {
    title?: string
    description?: string
    date?: string
    startTime?: string
    endTime?: string
    image?: string
    price?: number
    capacity?: number
    address?: string
    latitude?: number
    longitude?: number
    categoryId?: string
}
