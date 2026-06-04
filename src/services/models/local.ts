export const LocalStatus = {
    PENDING: 'pendiente',
    APPROVED: 'aprobado',
    REJECTED: 'rechazado',
} as const

export type LocalStatus = typeof LocalStatus[keyof typeof LocalStatus]

export interface Local {
    id: string
    name: string
    description?: string
    address: string
    phone?: string
    image?: string
    userId: string
    status: LocalStatus
    reason?: string
    verifiedBy?: string
    verifiedAt?: string
    createdAt?: string
    updatedAt?: string
}

export interface CreateLocalForm {
    name: string
    address: string
    description?: string
    phone?: string
    image?: string
}

export interface UpdateLocalForm {
    name?: string
    address?: string
    description?: string
    phone?: string
    image?: string
}
