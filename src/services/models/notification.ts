export const NotificationType = {
    INFO: 'info',
    ALERT: 'alerta',
    SYSTEM: 'sistema',
} as const

export type NotificationType = typeof NotificationType[keyof typeof NotificationType]

export interface Notification {
    id: string
    userId: string
    title: string
    message: string
    read: boolean
    type: NotificationType
    createdAt?: string
}

export interface CreateNotificationForm {
    userId: string
    title: string
    message: string
    type?: NotificationType
}
