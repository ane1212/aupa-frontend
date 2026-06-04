import { apiClient } from "../http";
import type { CreateNotificationForm } from "../models";


export const notificationService = {
    getAll: () =>
        apiClient.get<Notification[]>('/notification'),

    markAsRead: (id: string) =>
        apiClient.patch<Notification>(`/notification/${id}/read`),

    markAllAsRead: () =>
        apiClient.patch<void>('/notification/read-all'),

    delete: (id: string) =>
        apiClient.delete<void>(`/notification/${id}`),

    // Admin
    create: (data: CreateNotificationForm) =>
        apiClient.post<Notification>('/notification', data),
}
