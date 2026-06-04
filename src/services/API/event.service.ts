import { apiClient } from "../http";
import type { CreateEventForm, UpdateEventForm } from "../models";


export const eventService = {
    getAll: () =>
        apiClient.get<Event[]>('/event'),

    getById: (id: string) =>
        apiClient.get<Event>(`/event/${id}`),

    create: (data: CreateEventForm) =>
        apiClient.post<Event>('/event', data),

    update: (id: string, data: UpdateEventForm) =>
        apiClient.put<Event>(`/event/${id}`, data),

    toggleActive: (id: string) =>
        apiClient.patch<Event>(`/event/${id}/active`),

    delete: (id: string) =>
        apiClient.delete<void>(`/event/${id}`),
}
