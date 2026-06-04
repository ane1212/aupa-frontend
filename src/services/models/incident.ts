export const IncidentStatus = {
    PENDING: 'pendiente',
    REVIEWED: 'revisado',
    RESOLVED: 'resuelto',
} as const

export type IncidentStatus = typeof IncidentStatus[keyof typeof IncidentStatus]

export interface Incident {
    id: string
    userId: string
    eventId: string
    content: string
    status: IncidentStatus
    createdAt?: string
    updatedAt?: string
}

export interface CreateIncidentForm {
    eventId: string
    content: string
}
